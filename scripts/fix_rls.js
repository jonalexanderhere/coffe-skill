const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function runSql() {
  const envPath = path.join(process.cwd(), '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const postgresUrlMatch = envContent.match(/POSTGRES_URL="?([^"\s]+)"?/);
  
  if (!postgresUrlMatch) {
    console.error("Could not find POSTGRES_URL in .env.local");
    return;
  }
  
  const connectionString = postgresUrlMatch[1];
  console.log("Connecting to Supabase Postgres to fix RLS...");

  const client = new Client({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log("Connected successfully.");

    const schemaSql = fs.readFileSync(path.join(process.cwd(), 'supabase_schema.sql'), 'utf8');
    
    // We need to drop existing policies first to avoid conflict if they exist
    console.log("Cleaning up existing policies...");
    await client.query(`
      DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.users;
      DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
      DROP POLICY IF EXISTS "Superadmins can do everything" ON public.users;
      DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
      DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
      DROP POLICY IF EXISTS "Superadmins can view all users" ON public.users;
    `);

    console.log("Executing updated supabase_schema.sql...");
    await client.query(schemaSql);
    console.log("Successfully fixed RLS and Schema.");

  } catch (err) {
    console.error("Error executing SQL:", err);
  } finally {
    await client.end();
  }
}

runSql();
