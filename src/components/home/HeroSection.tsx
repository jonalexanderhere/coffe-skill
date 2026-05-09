"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Code2,
  BarChart3,
  Layers,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-50/50 to-white dark:from-charcoal dark:to-charcoal" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 text-xs font-medium text-accent bg-accent-light dark:bg-accent/10 rounded-full border border-accent/10">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              Platform dari Lampung Barat
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-coffee-900 dark:text-white mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Brew Your Skills,{" "}
              <span className="gradient-text">Build Your Future</span>
            </h1>

            <p className="text-lg text-coffee-500 dark:text-coffee-300 leading-relaxed mb-8 max-w-lg">
              Platform pembelajaran teknologi terdepan dari dataran tinggi Lampung Barat. 
              Kuasai skill digital bersama mentor berpengalaman, dapatkan sertifikat yang 
              diakui industri.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Mulai Belajar
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-coffee-700 dark:text-coffee-200 bg-white dark:bg-charcoal-light border border-coffee-200 dark:border-charcoal-200 hover:border-coffee-300 dark:hover:border-charcoal-300 rounded-xl transition-all duration-200"
              >
                <Play size={16} />
                Explore Course
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 text-sm text-coffee-500 dark:text-coffee-400">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-accent" />
                <span><strong className="text-coffee-700 dark:text-white">12.5k+</strong> Siswa Aktif</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-accent" />
                <span><strong className="text-coffee-700 dark:text-white">200+</strong> Kursus</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 shadow-xl overflow-hidden">
              {/* Mock window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-coffee-100 dark:border-charcoal-200 bg-coffee-50/50 dark:bg-charcoal">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="mx-auto max-w-xs h-6 bg-coffee-100 dark:bg-charcoal-200 rounded-md flex items-center justify-center">
                    <span className="text-[10px] text-coffee-400 dark:text-coffee-500 font-medium">coffeeskill.id/dashboard</span>
                  </div>
                </div>
              </div>

              {/* Mock dashboard content */}
              <div className="p-5">
                {/* Top stats row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Courses", value: "8", icon: BookOpen, color: "text-blue-500" },
                    { label: "Hours", value: "124", icon: TrendingUp, color: "text-emerald-500" },
                    { label: "Certificates", value: "4", icon: Award, color: "text-amber-500" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-coffee-50 dark:bg-charcoal rounded-xl p-3.5"
                    >
                      <stat.icon size={16} className={`${stat.color} mb-2`} />
                      <p className="text-lg font-bold text-coffee-800 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs text-coffee-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Course progress */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-coffee-600 dark:text-coffee-300">
                    Continue Learning
                  </p>
                  {[
                    { title: "Next.js Full-Stack", progress: 75, color: "bg-accent" },
                    { title: "Python Data Science", progress: 45, color: "bg-blue-500" },
                  ].map((course) => (
                    <div
                      key={course.title}
                      className="flex items-center gap-3 p-3 bg-coffee-50 dark:bg-charcoal rounded-xl"
                    >
                      <div className="w-9 h-9 rounded-lg bg-coffee-100 dark:bg-charcoal-200 flex items-center justify-center shrink-0">
                        <Code2 size={16} className="text-coffee-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-coffee-700 dark:text-white truncate">
                          {course.title}
                        </p>
                        <div className="mt-1.5 w-full h-1.5 bg-coffee-100 dark:bg-charcoal-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${course.color} rounded-full`}
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-medium text-coffee-400 shrink-0">
                        {course.progress}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mini chart placeholder */}
                <div className="mt-4 p-3 bg-coffee-50 dark:bg-charcoal rounded-xl">
                  <p className="text-xs font-semibold text-coffee-600 dark:text-coffee-300 mb-3">
                    Weekly Activity
                  </p>
                  <div className="flex items-end justify-between gap-1.5 h-12">
                    {[40, 65, 35, 80, 55, 90, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-accent/20 rounded-sm relative overflow-hidden"
                        style={{ height: "100%" }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-accent rounded-sm transition-all duration-500"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {["S", "S", "R", "K", "J", "S", "M"].map((d, i) => (
                      <span key={i} className="text-[9px] text-coffee-400 flex-1 text-center">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-charcoal-light rounded-xl border border-coffee-100 dark:border-charcoal-200 shadow-lg p-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                <Award size={16} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-coffee-700 dark:text-white">Sertifikat Baru!</p>
                <p className="text-[10px] text-coffee-400">UI/UX Design Mastery</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
