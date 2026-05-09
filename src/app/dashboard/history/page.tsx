"use client";

import { motion } from "framer-motion";
import { History, Search } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Riwayat Belajar
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
          Lacak aktivitas dan materi yang telah Anda pelajari
        </p>
      </motion.div>

      <div className="text-center py-20 bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 border-dashed">
        <History size={32} className="mx-auto text-coffee-200 dark:text-charcoal-200 mb-3" />
        <p className="text-sm text-coffee-600 dark:text-coffee-300">Belum ada riwayat aktivitas</p>
        <Link href="/dashboard" className="inline-block mt-4 text-xs font-bold text-accent hover:underline">
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
