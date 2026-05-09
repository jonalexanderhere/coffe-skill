"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, BookOpen, TrendingUp, Award, Mail, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCourseStore } from "@/lib/store";
import { useEnrollmentStore } from "@/lib/store";
import { useUserStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function MentorStudentsPage() {
  const { user } = useAuth();
  const { courses, getCoursesByMentor } = useCourseStore();
  const { enrollments, getEnrollmentsByCourse } = useEnrollmentStore();
  const { users } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  const myCourses = user ? getCoursesByMentor(user.id) : [];
  
  const studentEnrollments = selectedCourse === "all" 
    ? enrollments.filter(e => myCourses.some(c => c.id === e.courseId))
    : getEnrollmentsByCourse(selectedCourse);

  const getUserName = (userId: string) => {
    const found = users.find(u => u.id === userId);
    return found?.name || "Unknown";
  };

  const getCourseTitle = (courseId: string) => {
    const found = courses.find(c => c.id === courseId);
    return found?.title || "Unknown Course";
  };

  const filteredStudents = studentEnrollments.filter(enrollment => {
    const studentName = getUserName(enrollment.userId).toLowerCase();
    return studentName.includes(searchQuery.toLowerCase());
  });

  const stats = {
    totalStudents: new Set(studentEnrollments.map(e => e.userId)).size,
    activeStudents: studentEnrollments.filter(e => e.progress > 0 && e.progress < 100).length,
    completedStudents: studentEnrollments.filter(e => e.progress === 100).length,
    avgProgress: studentEnrollments.length > 0 
      ? Math.round(studentEnrollments.reduce((acc, e) => acc + e.progress, 0) / studentEnrollments.length)
      : 0,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Siswa Saya
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
          Pantau progress dan kelola siswa di kursus Anda
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Siswa", value: stats.totalStudents, icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
          { label: "Aktif Belajar", value: stats.activeStudents, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
          { label: "Telah Selesai", value: stats.completedStudents, icon: CheckCircle, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
          { label: "Avg Progress", value: `${stats.avgProgress}%`, icon: BookOpen, color: "text-accent", bg: "bg-accent/10" },
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

      {/* Filters */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
          <input
            type="text"
            placeholder="Cari nama siswa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-transparent rounded-xl text-coffee-800 dark:text-white focus:outline-none"
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-3 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-700 dark:text-coffee-300 outline-none cursor-pointer"
        >
          <option value="all">Semua Kursus</option>
          {myCourses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={48} className="mx-auto text-coffee-300 mb-4" />
            <h3 className="text-lg font-semibold text-coffee-700 dark:text-white mb-2">
              {selectedCourse === "all" ? "Belum ada siswa" : "Tidak ada siswa di kursus ini"}
            </h3>
            <p className="text-sm text-coffee-500">
              {selectedCourse === "all" 
                ? "Siswa akan muncul setelah mereka mendaftar di kursus Anda"
                : "Kursus ini belum memiliki siswa yang terdaftar"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-coffee-50/50 dark:bg-charcoal-200/50 text-coffee-500 dark:text-coffee-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Siswa</th>
                  <th className="px-6 py-4 font-medium">Kursus</th>
                  <th className="px-6 py-4 font-medium">Progress</th>
                  <th className="px-6 py-4 font-medium">Terakhir Aktif</th>
                  <th className="px-6 py-4 font-medium">Sertifikat</th>
                  <th className="px-6 py-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-coffee-100 dark:divide-charcoal-200">
                {filteredStudents.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-coffee-50/50 dark:hover:bg-charcoal-200/50 transition-colors text-coffee-700 dark:text-coffee-300">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-coffee-100 dark:bg-charcoal-300 flex items-center justify-center text-sm font-bold text-coffee-600">
                          {getUserName(enrollment.userId).charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-coffee-800 dark:text-white">{getUserName(enrollment.userId)}</p>
                          <p className="text-xs text-coffee-500">ID: {enrollment.userId.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-coffee-700 dark:text-white max-w-[200px] truncate">
                        {getCourseTitle(enrollment.courseId)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[100px] h-2 bg-coffee-100 dark:bg-charcoal-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              enrollment.progress === 100 ? "bg-emerald-500" : "bg-accent"
                            }`}
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-coffee-700 dark:text-white w-12">
                          {enrollment.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-coffee-500">
                        <Clock size={14} />
                        <span className="text-sm">
                          {enrollment.lastAccessedAt 
                            ? new Date(enrollment.lastAccessedAt).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })
                            : '-'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {enrollment.certificateIssued ? (
                        <span className="flex items-center gap-1.5 text-emerald-600">
                          <Award size={16} /> Terbit
                        </span>
                      ) : (
                        <span className="text-coffee-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-coffee-500 hover:bg-coffee-50 rounded-lg transition-colors">
                        <Mail size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}