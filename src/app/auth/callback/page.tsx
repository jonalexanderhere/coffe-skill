"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        // User is signed in
        router.push("/dashboard");
      } else if (error) {
        console.error("Auth callback error:", error.message);
        router.push("/login?error=auth_callback_failed");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-charcoal">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-coffee-600 dark:text-coffee-300">Menyelesaikan autentikasi...</p>
      </div>
    </div>
  );
}
