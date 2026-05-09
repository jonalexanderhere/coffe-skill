"use client";

import { motion } from "motion/react";
import { FileText, Plus } from "lucide-react";

export default function AssignmentsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Kuis & Tugas
        </h1>
        <p className="text-sm text-coffee-400 mt-1">
          Kelola kuis dan tugas untuk semua kursus Anda
        </p>
      </motion.div>

      <div className="bg-charcoal-light p-12 rounded-2xl border border-charcoal-200 text-center">
        <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText size={24} className="text-coffee-500" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Belum ada kuis atau tugas</h2>
        <p className="text-sm text-coffee-400 mb-8 max-w-xs mx-auto">
          Mulai buat kuis atau tugas pertama Anda untuk membantu siswa menguji pemahaman mereka.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-all shadow-sm">
          <Plus size={18} /> Buat Kuis Baru
        </button>
      </div>
    </div>
  );
}
