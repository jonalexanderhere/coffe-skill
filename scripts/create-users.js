const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Make sure to run with --env-file=.env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const usersToCreate = [
  {
    email: 'fahriazhar148@gmail.com',
    password: 'CoffeeSkill2026!',
    name: 'Ghifari Azhar',
    role: 'superadmin'
  },
  {
    email: 'rikoiqbal36@gmail.com',
    password: 'CoffeeSkill2026!',
    name: 'Rico',
    role: 'superadmin'
  },
  {
    email: 'mentor1@coffeeskill.id',
    password: 'CoffeeSkill2026!',
    name: 'Mentor 1',
    role: 'mentor'
  }
];

async function createUsers() {
  for (const user of usersToCreate) {
    console.log(`Creating user: ${user.name} (${user.email})...`);
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { name: user.name, role: user.role }
    });

    if (error) {
      console.error(`Error creating ${user.email}:`, error.message);
    } else {
      console.log(`Successfully created ${user.email}`);
    }
  }
}

createUsers();
