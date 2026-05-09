"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Coffee, GraduationCap } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"student" | "mentor">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Semua field harus diisi");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Password tidak cocok");
      return;
    }
    
    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }
    
    if (!agreed) {
      setError("Anda harus menyetujui Syarat & Ketentuan");
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await register({ name, email, password, role });
      if (!success) {
        setError("Email sudah terdaftar");
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-coffee-800 to-coffee-900 p-12">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center">
            <GraduationCap size={28} className="text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
            Mulai Perjalanan Anda
          </h2>
          <p className="text-coffee-300 text-sm leading-relaxed mb-8">
            Bergabunglah dengan komunitas learner dari dataran tinggi Lampung Barat. 
            Belajar skill digital, raih sertifikat, dan bangun karir impian Anda.
          </p>
          <div className="space-y-3">
            {[
              "Akses 200+ kursus berkualitas",
              "Sertifikat diakui industri",
              "Belajar dari mentor berpengalaman",
              "Komunitas 12.500+ siswa aktif",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-left">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <span className="text-sm text-coffee-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
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
            Buat Akun Baru
          </h1>
          <p className="text-sm text-coffee-500 dark:text-coffee-400 mb-8">
            Daftar gratis dan mulai belajar hari ini
          </p>

          {/* Role Selector */}
          <div className="flex p-1 mb-6 bg-coffee-50 dark:bg-charcoal-light rounded-xl border border-coffee-100 dark:border-charcoal-200">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                role === "student"
                  ? "bg-white dark:bg-charcoal text-coffee-800 dark:text-white shadow-sm"
                  : "text-coffee-500 dark:text-coffee-400"
              }`}
            >
              Siswa
            </button>
            <button
              onClick={() => setRole("mentor")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                role === "mentor"
                  ? "bg-white dark:bg-charcoal text-coffee-800 dark:text-white shadow-sm"
                  : "text-coffee-500 dark:text-coffee-400"
              }`}
            >
              Mentor
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl">
                <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
                <input type="text" placeholder="Masukkan nama lengkap" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 text-sm bg-white dark:bg-charcoal-light border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-300 dark:placeholder:text-coffee-500 focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
                <input type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 text-sm bg-white dark:bg-charcoal-light border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-300 dark:placeholder:text-coffee-500 focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
                <input type={showPassword ? "text" : "password"} placeholder="Min. 8 karakter" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-11 py-3 text-sm bg-white dark:bg-charcoal-light border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-300 dark:placeholder:text-coffee-500 focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-coffee-400 hover:text-coffee-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Konfirmasi Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
                <input type="password" placeholder="Ulangi password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 text-sm bg-white dark:bg-charcoal-light border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-300 dark:placeholder:text-coffee-500 focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors" />
              </div>
            </div>

            <label className="flex items-start gap-2.5 pt-1">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-coffee-300 text-accent focus:ring-accent/20" />
              <span className="text-xs text-coffee-500 dark:text-coffee-400 leading-relaxed">
                Saya menyetujui{" "}
                <Link href="#" className="text-accent hover:text-accent-hover font-medium">Syarat & Ketentuan</Link> dan{" "}
                <Link href="#" className="text-accent hover:text-accent-hover font-medium">Kebijakan Privasi</Link> CoffeeSkill
              </span>
            </label>

            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors shadow-sm disabled:opacity-50">
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Buat Akun
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-center text-coffee-500 dark:text-coffee-400">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold text-accent hover:text-accent-hover">
              Masuk
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
