"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-coffee-800 dark:text-white mb-3" style={{ fontFamily: "var(--font-poppins)" }}>Hubungi Kami</h1>
            <p className="text-coffee-500 dark:text-coffee-400">Punya pertanyaan? Kami siap membantu Anda</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "hello@coffeeskill.id", desc: "Balas dalam 24 jam" },
                { icon: MapPin, label: "Lokasi", value: "Lampung Barat, Indonesia", desc: "Dataran tinggi Liwa" },
                { icon: Phone, label: "Telepon", value: "+62 812 3456 7890", desc: "Sen-Jum, 09:00-17:00" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-5 bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200">
                  <div className="p-2.5 rounded-xl bg-accent-light dark:bg-accent/10 shrink-0">
                    <item.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-coffee-700 dark:text-white">{item.label}</p>
                    <p className="text-sm text-coffee-600 dark:text-coffee-300">{item.value}</p>
                    <p className="text-xs text-coffee-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Nama</label>
                    <input type="text" placeholder="Nama Anda" className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-400 focus:border-accent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Email</label>
                    <input type="email" placeholder="nama@email.com" className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-400 focus:border-accent outline-none" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Subjek</label>
                  <input type="text" placeholder="Topik pesan Anda" className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-400 focus:border-accent outline-none" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">Pesan</label>
                  <textarea rows={5} placeholder="Tulis pesan Anda..." className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-400 focus:border-accent outline-none resize-none" />
                </div>
                <button type="submit" className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors">
                  <Send size={16} /> Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
