"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import Link from "next/link";

export default function CalendarPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Kalender Belajar
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
          Jadwal kelas, webinar, dan deadline tugas Anda
        </p>
      </motion.div>

      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-8">
        <div className="text-center py-10">
          <CalendarIcon size={48} className="mx-auto text-accent/20 mb-4" />
          <p className="text-coffee-600 dark:text-coffee-300">Kalender akan menampilkan jadwal kursus Anda</p>
          <p className="text-xs text-coffee-400 mt-2">Segera hadir fitur sinkronisasi dengan Google Calendar</p>
        </div>
      </div>
    </div>
  );
}
