"use client";

import { motion } from "framer-motion";
import { User, Bell, Lock, Globe, Palette, Shield, Camera, Save } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const tabs = [
  { label: "Profil", icon: User },
  { label: "Notifikasi", icon: Bell },
  { label: "Keamanan", icon: Lock },
  { label: "Tampilan", icon: Palette },
];

export default function SettingsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-coffee-800 dark:text-white mb-2" style={{ fontFamily: "var(--font-poppins)" }}>Pengaturan</h1>
            <p className="text-coffee-500 dark:text-coffee-400">Kelola profil dan preferensi akun Anda</p>
          </motion.div>

          <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
            {/* Profile Header */}
            <div className="p-6 border-b border-coffee-100 dark:border-charcoal-200">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center text-xl font-bold text-accent">
                    GA
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center shadow-sm">
                    <Camera size={12} />
                  </button>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-coffee-800 dark:text-white">Ghifari Azhar</h2>
                  <p className="text-sm text-coffee-500 dark:text-coffee-400">ghifari@coffeeskill.id</p>
                  <p className="text-xs text-coffee-400 mt-1">Bergabung sejak Januari 2025</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="p-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Nama Lengkap</label>
                  <input type="text" defaultValue="Ghifari Azhar" className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Username</label>
                  <input type="text" defaultValue="ghifariazhar" className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:border-accent outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Email</label>
                <input type="email" defaultValue="ghifari@coffeeskill.id" className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:border-accent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Bio</label>
                <textarea rows={3} defaultValue="Student at CoffeeSkill. Learning full-stack development." className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:border-accent outline-none resize-none" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Lokasi</label>
                  <input type="text" defaultValue="Lampung Barat, Indonesia" className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:border-accent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Website</label>
                  <input type="text" placeholder="https://..." className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-400 focus:border-accent outline-none" />
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="pt-5 border-t border-coffee-100 dark:border-charcoal-200">
                <h3 className="text-sm font-semibold text-coffee-700 dark:text-white mb-4">Preferensi Notifikasi</h3>
                <div className="space-y-3">
                  {["Email untuk kursus baru", "Reminder belajar harian", "Update komunitas", "Newsletter mingguan"].map((item) => (
                    <label key={item} className="flex items-center justify-between">
                      <span className="text-sm text-coffee-600 dark:text-coffee-300">{item}</span>
                      <div className="relative w-10 h-5 bg-coffee-200 dark:bg-charcoal-300 rounded-full cursor-pointer">
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-5 flex justify-end">
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors">
                  <Save size={16} /> Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
