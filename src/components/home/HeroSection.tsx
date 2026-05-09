"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Code2,
  BarChart3,
  Layers,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-50/50 to-white dark:from-charcoal dark:to-charcoal" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 text-xs font-medium text-accent bg-accent-light dark:bg-accent/10 rounded-full border border-accent/10">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              Platform dari Lampung Barat
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-coffee-900 dark:text-white mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Brew Your Skills,{" "}
              <span className="gradient-text">Build Your Future</span>
            </h1>

            <p className="text-lg text-coffee-500 dark:text-coffee-300 leading-relaxed mb-8 max-w-lg">
              Platform pembelajaran teknologi terdepan dari dataran tinggi Lampung Barat. 
              Kuasai skill digital bersama mentor berpengalaman, dapatkan sertifikat yang 
              diakui industri.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Mulai Belajar
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-coffee-700 dark:text-coffee-200 bg-white dark:bg-charcoal-light border border-coffee-200 dark:border-charcoal-200 hover:border-coffee-300 dark:hover:border-charcoal-300 rounded-xl transition-all duration-200"
              >
                <Play size={16} />
                Explore Course
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 text-sm text-coffee-500 dark:text-coffee-400">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-accent" />
                <span><strong className="text-coffee-700 dark:text-white">Community</strong> Terbuka</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-accent" />
                <span><strong className="text-coffee-700 dark:text-white">Sertifikat</strong> Resmi</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Platform Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 shadow-xl overflow-hidden">
              {/* Mock window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-coffee-100 dark:border-charcoal-200 bg-coffee-50/50 dark:bg-charcoal">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="mx-auto max-w-xs h-6 bg-coffee-100 dark:bg-charcoal-200 rounded-md flex items-center justify-center">
                    <span className="text-[10px] text-coffee-400 dark:text-coffee-500 font-medium">coffeeskill.id/explore</span>
                  </div>
                </div>
              </div>

              {/* Mock content placeholder */}
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code2 size={32} className="text-accent" />
                </div>
                <h3 className="text-lg font-bold text-coffee-800 dark:text-white mb-2">Siap untuk Belajar?</h3>
                <p className="text-sm text-coffee-500 dark:text-coffee-400 mb-6">
                  Akses puluhan materi teknologi terbaru dan kembangkan karir digitalmu sekarang.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-coffee-50 dark:bg-charcoal rounded-xl border border-coffee-100 dark:border-charcoal-200">
                    <BarChart3 size={20} className="text-blue-500 mb-2 mx-auto" />
                    <p className="text-xs font-semibold text-coffee-700 dark:text-white">Track Progress</p>
                  </div>
                  <div className="p-4 bg-coffee-50 dark:bg-charcoal rounded-xl border border-coffee-100 dark:border-charcoal-200">
                    <Layers size={20} className="text-emerald-500 mb-2 mx-auto" />
                    <p className="text-xs font-semibold text-coffee-700 dark:text-white">Materi Lengkap</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-charcoal-light rounded-xl border border-coffee-100 dark:border-charcoal-200 shadow-lg p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                <Award size={16} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-coffee-700 dark:text-white">Get Certified</p>
                <p className="text-[10px] text-coffee-400">Official Certification</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
