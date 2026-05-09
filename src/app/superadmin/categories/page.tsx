"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, BookOpen, DollarSign, Eye, Download } from "lucide-react";
import { useCourseStore } from "@/lib/store";
import { useUserStore } from "@/lib/store";
import { useEnrollmentStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function SuperAdminStatsPage() {
  const { courses } = useCourseStore();
  const { users } = useUserStore();
  const { enrollments } = useEnrollmentStore();

  const stats = {
    totalUsers: users.length,
    totalCourses: courses.length,
    totalEnrollments: enrollments.length,
    totalRevenue: courses.reduce((acc, c) => acc + (c.price * c.studentCount), 0),
    avgRating: courses.length > 0 
      ? (courses.reduce((acc, c) => acc + c.rating, 0) / courses.filter(c => c.rating > 0).length || 0).toFixed(1)
      : "0",
    completionRate: 78,
  };

  const topCourses = [...courses]
    .sort((a, b) => b.studentCount - a.studentCount)
    .slice(0, 5);

  const recentEnrollments = [...enrollments]
    .sort((a, b) => new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Statistik Platform
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
          Analisis performa dan pertumbuhan platform CoffeeSkill
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats.totalUsers.toLocaleString(), icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", trend: "+12%" },
          { label: "Total Kursus", value: stats.totalCourses, icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", trend: "+5%" },
          { label: "Total Enrollments", value: stats.totalEnrollments.toLocaleString(), icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10", trend: "+18%" },
          { label: "Total Pendapatan", value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: "text-accent", bg: "bg-accent/10", trend: "+24%" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-coffee-800 dark:text-white">{stat.value}</p>
            <p className="text-xs text-coffee-500 dark:text-coffee-400 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/20">
              <BarChart3 size={18} className="text-amber-600" />
            </div>
            <span className="text-sm font-medium text-coffee-600 dark:text-coffee-400">Rating Rata-rata</span>
          </div>
          <p className="text-3xl font-bold text-coffee-800 dark:text-white">{stats.avgRating} <span className="text-lg text-amber-500">★</span></p>
          <p className="text-xs text-coffee-500 mt-1">Berdasarkan {courses.filter(c => c.rating > 0).length} kursus</p>
        </div>
        <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
              <TrendingUp size={18} className="text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-coffee-600 dark:text-coffee-400">Completion Rate</span>
          </div>
          <p className="text-3xl font-bold text-coffee-800 dark:text-white">{stats.completionRate}%</p>
          <p className="text-xs text-coffee-500 mt-1">Siswa menyelesaikan kursus</p>
        </div>
        <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/20">
              <BookOpen size={18} className="text-blue-600" />
            </div>
            <span className="text-sm font-medium text-coffee-600 dark:text-coffee-400">Avg Lessons/Course</span>
          </div>
          <p className="text-3xl font-bold text-coffee-800 dark:text-white">
            {courses.length > 0 ? Math.round(courses.reduce((acc, c) => acc + c.lessons, 0) / courses.length) : 0}
          </p>
          <p className="text-xs text-coffee-500 mt-1">Materi per kursus</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Courses */}
        <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
          <div className="p-5 border-b border-coffee-100 dark:border-charcoal-200 flex items-center justify-between">
            <h2 className="text-base font-semibold text-coffee-800 dark:text-white">Kursus Terpopuler</h2>
            <button className="p-2 text-coffee-500 hover:bg-coffee-50 rounded-lg">
              <Download size={16} />
            </button>
          </div>
          <div className="divide-y divide-coffee-100 dark:divide-charcoal-200">
            {topCourses.length === 0 ? (
              <div className="p-8 text-center text-coffee-400">
                <p>Belum ada data kursus</p>
              </div>
            ) : (
              topCourses.map((course, idx) => (
                <div key={course.id} className="p-4 hover:bg-coffee-50/50 dark:hover:bg-charcoal-200/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-coffee-100 dark:bg-charcoal-200 flex items-center justify-center text-xs font-bold text-coffee-600">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-coffee-800 dark:text-white truncate">{course.title}</p>
                      <p className="text-xs text-coffee-400">{course.studentCount} siswa • {course.rating} ★</p>
                    </div>
                    <span className="text-sm font-semibold text-coffee-700 dark:text-white">
                      {formatCurrency(course.price * course.studentCount)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Enrollments */}
        <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
          <div className="p-5 border-b border-coffee-100 dark:border-charcoal-200 flex items-center justify-between">
            <h2 className="text-base font-semibold text-coffee-800 dark:text-white">Enrollments Terbaru</h2>
            <button className="p-2 text-coffee-500 hover:bg-coffee-50 rounded-lg">
              <Eye size={16} />
            </button>
          </div>
          <div className="divide-y divide-coffee-100 dark:divide-charcoal-200">
            {recentEnrollments.length === 0 ? (
              <div className="p-8 text-center text-coffee-400">
                <p>Belum ada enrollments</p>
              </div>
            ) : (
              recentEnrollments.map((enrollment) => {
                const course = courses.find(c => c.id === enrollment.courseId);
                const student = users.find(u => u.id === enrollment.userId);
                return (
                  <div key={enrollment.id} className="p-4 hover:bg-coffee-50/50 dark:hover:bg-charcoal-200/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-coffee-100 dark:bg-charcoal-300 flex items-center justify-center text-xs font-bold text-coffee-600">
                        {student?.name?.charAt(0) || "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-coffee-800 dark:text-white truncate">{student?.name || "Unknown"}</p>
                        <p className="text-xs text-coffee-400 truncate">{course?.title || "Unknown Course"}</p>
                      </div>
                      <span className="text-xs text-coffee-500">
                        {new Date(enrollment.enrolledAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}