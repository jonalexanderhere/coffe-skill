"use client";

import { motion } from "framer-motion";
import { Book, Search, Filter, ArrowRight, Download, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCourseStore } from "@/lib/store";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function EbooksPage() {
  const { courses } = useCourseStore();
  
  // Filter courses that have an ebook
  const ebookCourses = courses.filter(c => c.ebookUrl && c.status === 'published');

  return (
    <div className="min-h-screen bg-charcoal text-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-6"
            >
              <Book size={16} /> Digital Library
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Koleksi <span className="text-accent">E-book</span> Eksklusif
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-coffee-400 max-w-2xl mx-auto text-lg"
            >
              Perdalam wawasan Anda dengan berbagai referensi digital premium yang disusun oleh para mentor ahli.
            </motion.p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-500" size={20} />
              <input
                type="text"
                placeholder="Cari judul e-book atau topik..."
                className="w-full pl-12 pr-6 py-4 bg-charcoal-light border border-charcoal-200 rounded-2xl focus:outline-none focus:border-accent transition-all text-sm"
              />
            </div>
            <button className="px-6 py-4 bg-charcoal-light border border-charcoal-200 rounded-2xl flex items-center gap-2 text-sm font-bold hover:bg-charcoal-300 transition-all">
              <Filter size={18} /> Filter
            </button>
          </div>

          {/* E-book Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ebookCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-charcoal-light rounded-[2rem] border border-charcoal-200 overflow-hidden hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5"
              >
                {/* Book Cover / Thumbnail */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={course.thumbnail || "/course-placeholder.jpg"}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-60" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                      PDF E-BOOK
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-coffee-400 mb-6 line-clamp-2">
                    {course.shortDescription || "Pelajari materi ini lebih mendalam melalui e-book eksklusif kami."}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-charcoal-200 flex items-center justify-center">
                        <FileText size={14} className="text-accent" />
                      </div>
                      <span className="text-[10px] font-bold text-coffee-300 uppercase tracking-widest">
                        Digital Format
                      </span>
                    </div>
                    
                    <Link
                      href={`/course/${course.id}`}
                      className="p-3 bg-accent/10 text-accent rounded-xl group-hover:bg-accent group-hover:text-white transition-all"
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {ebookCourses.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <div className="w-20 h-20 bg-charcoal-200 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                  <Book size={40} className="text-coffee-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Belum Ada E-book</h3>
                <p className="text-coffee-400">Kembali lagi nanti untuk koleksi buku digital terbaru kami.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
