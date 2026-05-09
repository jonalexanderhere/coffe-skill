"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/shared/CourseCard";
import { useCourseStore } from "@/lib/store";
import { useCategoryStore } from "@/lib/store";

const levels = ["Semua", "Pemula", "Menengah", "Lanjutan"];
const sortOptions = ["Terpopuler", "Terbaru", "Rating Tertinggi", "Harga Terendah"];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedLevel, setSelectedLevel] = useState("Semua");
  const [sortBy, setSortBy] = useState("Terpopuler");
  const [showFilters, setShowFilters] = useState(false);
  
  const { getPublishedCourses } = useCourseStore();
  const { categories } = useCategoryStore();
  
  const publishedCourses = getPublishedCourses();
  
  const filteredCourses = publishedCourses.filter((c) => {
    if (selectedCategory !== "Semua" && c.category !== selectedCategory) return false;
    if (selectedLevel !== "Semua" && c.level !== selectedLevel) return false;
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-coffee-800 dark:text-white mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
              Explore Kursus
            </h1>
            <p className="text-coffee-500 dark:text-coffee-400">
              Temukan kursus yang sesuai dengan minat dan tujuan karir Anda
            </p>
          </motion.div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kursus, topik, atau mentor..."
                className="w-full pl-11 pr-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal-light border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-400 focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-coffee-600 dark:text-coffee-300 bg-coffee-50 dark:bg-charcoal-light border border-coffee-100 dark:border-charcoal-200 rounded-xl hover:bg-coffee-100 dark:hover:bg-charcoal-200 transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filter
            </button>
          </div>

          {/* Filter Bar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-8 p-5 bg-coffee-50 dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200"
            >
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-coffee-600 dark:text-coffee-300 mb-2">Kategori</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-white dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-700 dark:text-white outline-none"
                  >
                    <option value="Semua">Semua Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-coffee-600 dark:text-coffee-300 mb-2">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-white dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-700 dark:text-white outline-none"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-coffee-600 dark:text-coffee-300 mb-2">Urutkan</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-white dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-700 dark:text-white outline-none"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-coffee-500 dark:text-coffee-400">
              Menampilkan <strong className="text-coffee-700 dark:text-white">{filteredCourses.length}</strong> kursus
            </p>
            {(selectedCategory !== "Semua" || selectedLevel !== "Semua" || searchQuery) && (
              <button
                onClick={() => { setSelectedCategory("Semua"); setSelectedLevel("Semua"); setSearchQuery(""); }}
                className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover"
              >
                <X size={14} /> Reset Filter
              </button>
            )}
          </div>

          {/* Course Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <Search size={40} className="mx-auto text-coffee-200 dark:text-charcoal-300 mb-4" />
              <p className="text-coffee-500 dark:text-coffee-400">Tidak ada kursus yang ditemukan</p>
              <p className="text-sm text-coffee-400 dark:text-coffee-500 mt-1">Coba ubah kata kunci atau filter Anda</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
