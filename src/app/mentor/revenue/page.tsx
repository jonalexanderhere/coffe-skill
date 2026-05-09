"use client";

import { motion } from "motion/react";
import { DollarSign, TrendingUp, ArrowUpRight, Download } from "lucide-react";

export default function RevenuePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Pendapatan
        </h1>
        <p className="text-sm text-coffee-400 mt-1">
          Pantau penghasilan dan performa penjualan kursus Anda
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Total Saldo", value: "Rp 0", icon: DollarSign, color: "text-emerald-400" },
          { label: "Bulan Ini", value: "Rp 0", icon: TrendingUp, color: "text-blue-400" },
          { label: "Penjualan", value: "0", icon: ArrowUpRight, color: "text-accent" },
        ].map((stat, i) => (
          <div key={i} className="bg-charcoal-light p-6 rounded-2xl border border-charcoal-200">
            <stat.icon size={20} className={`${stat.color} mb-3`} />
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-coffee-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-charcoal-light p-8 rounded-2xl border border-charcoal-200 text-center">
        <p className="text-coffee-400 mb-4">Belum ada data pendapatan tersedia</p>
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-charcoal border border-charcoal-200 rounded-lg opacity-50 cursor-not-allowed">
          <Download size={16} /> Unduh Laporan
        </button>
      </div>
    </div>
  );
}
