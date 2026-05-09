"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, BookOpen, Users, DollarSign, Star, MoreVertical, Eye, Edit, Trash2, Archive, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCourseStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function MentorCoursesPage() {
  const { user } = useAuth();
  const { courses, getCoursesByMentor } = useCourseStore();
  const [filter, setFilter] = useState<"all" | "published" | "draft" | "pending_review">("all");

  const myCourses = user ? getCoursesByMentor(user.id) : [];
  
  const filteredCourses = myCourses.filter(course => {
    if (filter === "all") return true;
    return course.status === filter;
  });

  const stats = {
    total: myCourses.length,
    published: myCourses.filter(c => c.status === 'published').length,
    students: myCourses.reduce((acc, c) => acc + c.studentCount, 0),
    revenue: myCourses.reduce((acc, c) => acc + (c.price * c.studentCount), 0),
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
            Kursus Saya
          </h1>
          <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
            Kelola dan pantau kursus yang Anda buat
          </p>
        </div>
        <Link 
          href="/mentor/courses/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors shrink-0"
        >
          <Plus size={18} /> Buat Kursus Baru
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Kursus", value: stats.total, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
          { label: "Published", value: stats.published, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
          { label: "Total Siswa", value: stats.students.toLocaleString(), icon: Users, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
          { label: "Total Pendapatan", value: formatCurrency(stats.revenue), icon: DollarSign, color: "text-accent", bg: "bg-accent/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5"
          >
            <div className={`inline-flex p-2.5 rounded-xl ${stat.bg} mb-3`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="text-2xl font-bold text-coffee-800 dark:text-white">{stat.value}</p>
            <p className="text-xs text-coffee-500 dark:text-coffee-400 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-coffee-50 dark:bg-charcoal-light rounded-xl w-fit">
        {[
          { key: "all", label: "Semua" },
          { key: "published", label: "Published" },
          { key: "pending_review", label: "Pending" },
          { key: "draft", label: "Draft" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === tab.key
                ? "bg-white dark:bg-charcoal text-coffee-800 dark:text-white shadow-sm"
                : "text-coffee-500 dark:text-coffee-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course List */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-12 text-center">
          <BookOpen size={48} className="mx-auto text-coffee-300 mb-4" />
          <h3 className="text-lg font-semibold text-coffee-700 dark:text-white mb-2">
            {filter === "all" ? "Belum ada kursus" : `Tidak ada kursus ${filter}`}
          </h3>
          <p className="text-sm text-coffee-500 mb-6">
            {filter === "all" 
              ? "Mulai buat kursus pertama Anda dan bagikan ilmu kepada dunia"
              : "Kursus dengan status ini tidak ditemukan"}
          </p>
          <Link 
            href="/mentor/courses/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors"
          >
            <Plus size={16} /> Buat Kursus Baru
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden hover:border-coffee-200 dark:hover:border-charcoal-300 transition-colors"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coffee-100 to-coffee-50 dark:from-charcoal-200 dark:to-charcoal flex items-center justify-center shrink-0">
                    <BookOpen size={20} className="text-coffee-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-coffee-800 dark:text-white truncate">
                        {course.title}
                      </h3>
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full shrink-0 ${
                        course.status === 'published' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                        course.status === 'pending_review' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                        'bg-coffee-100 text-coffee-700 dark:bg-charcoal-300 dark:text-coffee-300'
                      }`}>
                        {course.status === 'published' ? 'Published' :
                         course.status === 'pending_review' ? 'Pending' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-xs text-coffee-500 mt-1 line-clamp-2">{course.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-2 bg-coffee-50 dark:bg-charcoal-200 rounded-lg">
                    <p className="text-sm font-bold text-coffee-800 dark:text-white">{course.studentCount}</p>
                    <p className="text-[10px] text-coffee-500">Siswa</p>
                  </div>
                  <div className="text-center p-2 bg-coffee-50 dark:bg-charcoal-200 rounded-lg">
                    <p className="text-sm font-bold text-coffee-800 dark:text-white">{course.lessons}</p>
                    <p className="text-[10px] text-coffee-500">Lessons</p>
                  </div>
                  <div className="text-center p-2 bg-coffee-50 dark:bg-charcoal-200 rounded-lg">
                    <p className="text-sm font-bold text-coffee-800 dark:text-white flex items-center justify-center gap-1">
                      <Star size={12} className="text-amber-500 fill-amber-500" /> {course.rating || "0"}
                    </p>
                    <p className="text-[10px] text-coffee-500">Rating</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-coffee-100 dark:border-charcoal-200">
                  <span className="text-sm font-semibold text-coffee-700 dark:text-white">
                    {course.isFree ? 'Gratis' : formatCurrency(course.price)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link 
                      href={`/course/${course.id}`}
                      className="p-2 text-coffee-500 hover:bg-coffee-50 rounded-lg transition-colors"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link 
                      href={`/mentor/courses/${course.id}/edit`}
                      className="p-2 text-coffee-500 hover:bg-coffee-50 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </Link>
                    <button className="p-2 text-coffee-400 hover:text-coffee-600">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}