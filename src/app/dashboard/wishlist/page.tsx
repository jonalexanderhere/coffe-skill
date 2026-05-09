"use client";

import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Wishlist
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
          Kursus yang Anda simpan untuk dipelajari nanti
        </p>
      </motion.div>

      <div className="text-center py-20 bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 border-dashed">
        <Heart size={32} className="mx-auto text-coffee-200 dark:text-charcoal-200 mb-3" />
        <p className="text-sm text-coffee-600 dark:text-coffee-300">Wishlist Anda masih kosong</p>
        <Link href="/explore" className="inline-block mt-4 text-xs font-bold text-accent hover:underline">
          Cari Kursus
        </Link>
      </div>
    </div>
  );
}
