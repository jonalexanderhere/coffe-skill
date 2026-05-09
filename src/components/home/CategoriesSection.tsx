"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  BarChart3,
  Palette,
  Cloud,
  Shield,
  Brain,
  Settings,
} from "lucide-react";
import { useCategoryStore } from "@/lib/store";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  BarChart3,
  Palette,
  Cloud,
  Shield,
  Brain,
  Settings,
};

export default function CategoriesSection() {
  const { categories } = useCategoryStore();

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-24 bg-coffee-50/50 dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl lg:text-4xl font-bold text-coffee-800 dark:text-white mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Kategori Pembelajaran
          </h2>
          <p className="text-coffee-500 dark:text-coffee-400 max-w-xl mx-auto">
            Pilih jalur belajar sesuai minat dan tujuan karir Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Globe;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/explore?category=${cat.name}`}
                  className="group block p-5 rounded-2xl bg-white dark:bg-charcoal-light border border-coffee-100 dark:border-charcoal-200 hover:border-coffee-200 dark:hover:border-charcoal-300 hover:shadow-sm transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: cat.color + "10" }}
                  >
                    <Icon size={20} style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-sm font-semibold text-coffee-700 dark:text-white mb-1 group-hover:text-accent transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-coffee-400">{cat.courseCount} kursus</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
