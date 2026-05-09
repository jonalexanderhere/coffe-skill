"use client";

import { motion } from "framer-motion";
import { MessageCircle, Construction } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-charcoal flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 bg-white dark:bg-charcoal-light rounded-3xl border border-coffee-100 dark:border-charcoal-200 shadow-sm max-w-lg mx-auto"
          >
            <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Construction size={40} className="text-accent" />
            </div>
            
            <h1 className="text-2xl font-bold text-coffee-800 dark:text-white mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
              Community Under Maintenance
            </h1>
            
            <p className="text-coffee-500 dark:text-coffee-400 mb-8 leading-relaxed">
              Kami sedang mempersiapkan ruang diskusi yang lebih seru untuk Anda. 
              Fitur Community akan segera hadir kembali dengan pengalaman yang lebih baik.
            </p>
            
            <div className="flex flex-col gap-3">
              <div className="p-4 bg-coffee-50 dark:bg-charcoal rounded-2xl text-sm text-coffee-600 dark:text-coffee-300 flex items-center gap-3">
                <MessageCircle size={18} className="text-accent" />
                <span>Nantikan fitur Tanya Jawab & Mentor Chat</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
