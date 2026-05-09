"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-24 bg-coffee-50/50 dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-coffee-800 to-coffee-900 dark:from-charcoal-light dark:to-charcoal p-10 sm:p-14 lg:p-20 text-center"
        >
          {/* Subtle bg circles */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/5 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-accent/5 translate-y-1/2 -translate-x-1/3" />

          <div className="relative">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Mulai Perjalanan Belajar<br className="hidden sm:block" /> Anda Hari Ini
            </h2>
            <p className="text-coffee-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Bergabung dengan 12.500+ siswa yang sudah membangun karir digital mereka bersama CoffeeSkill.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Daftar Gratis Sekarang
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold text-white border border-white/20 hover:bg-white/10 rounded-xl transition-all duration-200"
              >
                Lihat Kursus
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
