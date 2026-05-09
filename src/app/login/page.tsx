"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Coffee } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGoogle, isAuthenticated, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === 'superadmin' ? '/superadmin' : user.role === 'mentor' ? '/mentor' : '/dashboard';
      router.push(redirectPath);
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const success = await login({ email, password });
      if (success) {
        // Redirection is partially handled by the useEffect above, 
        // but we can force it here for faster response if needed.
        // The auth context's internal state update will trigger the useEffect.
      } else {
        setError("Email atau password salah.");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <Image src="/coffeskill.png" alt="CoffeeSkill" width={32} height={32} className="rounded-lg" />
            <span className="text-xl font-bold tracking-tight text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
              Coffee<span className="text-accent">Skill</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-coffee-800 dark:text-white mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
            Selamat Datang Kembali
          </h1>
          <p className="text-sm text-coffee-500 dark:text-coffee-400 mb-8">
            Masuk ke akun Anda untuk melanjutkan belajar
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white dark:bg-charcoal-light border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-300 dark:placeholder:text-coffee-500 focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-11 py-3 text-sm bg-white dark:bg-charcoal-light border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-300 dark:placeholder:text-coffee-500 focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-coffee-400 hover:text-coffee-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-coffee-300 text-accent focus:ring-accent/20" />
                <span className="text-sm text-coffee-500 dark:text-coffee-400">Ingat saya</span>
              </label>
              <Link href="#" className="text-sm font-medium text-accent hover:text-accent-hover">
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Masuk
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-coffee-100 dark:border-charcoal-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs text-coffee-400 bg-white dark:bg-charcoal">atau masuk dengan</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => loginWithGoogle()}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-coffee-600 dark:text-coffee-300 bg-white dark:bg-charcoal-light border border-coffee-200 dark:border-charcoal-200 rounded-xl hover:bg-coffee-50 dark:hover:bg-charcoal-200 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-coffee-600 dark:text-coffee-300 bg-white dark:bg-charcoal-light border border-coffee-200 dark:border-charcoal-200 rounded-xl hover:bg-coffee-50 dark:hover:bg-charcoal-200 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </button>
          </div>

          <p className="mt-8 text-sm text-center text-coffee-500 dark:text-coffee-400">
            Belum punya akun?{" "}
            <Link href="/register" className="font-semibold text-accent hover:text-accent-hover">
              Daftar Gratis
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right: Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-coffee-800 to-coffee-900 p-12">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center">
            <Coffee size={28} className="text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
            Brew Your Skills
          </h2>
          <p className="text-coffee-300 text-sm leading-relaxed mb-8">
            Seperti secangkir kopi robusta Lampung Barat yang kaya rasa, 
            setiap skill baru yang Anda pelajari akan memperkaya perjalanan karir Anda.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">Community</p>
              <p className="text-xs text-coffee-400">Terbuka</p>
            </div>
            <div className="w-px h-10 bg-coffee-600" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">Sertifikat</p>
              <p className="text-xs text-coffee-400">Resmi</p>
            </div>
            <div className="w-px h-10 bg-coffee-600" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">Karir</p>
              <p className="text-xs text-coffee-400">Digital</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
