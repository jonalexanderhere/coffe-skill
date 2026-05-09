"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCourseStore } from "@/lib/store";
import CourseCard from "@/components/shared/CourseCard";

export default function CoursesSection() {
  const { getPublishedCourses } = useCourseStore();
  const publishedCourses = getPublishedCourses().slice(0, 6);

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2
              className="text-3xl lg:text-4xl font-bold text-coffee-800 dark:text-white mb-3"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Kursus Populer
            </h2>
            <p className="text-coffee-500 dark:text-coffee-400 max-w-lg">
              Kursus terpopuler yang dipilih ribuan siswa untuk membangun karir digital
            </p>
          </div>
          <Link
            href="/explore"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            Lihat Semua
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>

        {publishedCourses.length === 0 && (
          <div className="text-center py-12 text-coffee-400">
            <p>Belum ada kursus yang tersedia saat ini.</p>
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-accent border border-accent/20 hover:bg-accent-light dark:hover:bg-accent/10 rounded-xl transition-colors"
          >
            Lihat Semua Kursus
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
