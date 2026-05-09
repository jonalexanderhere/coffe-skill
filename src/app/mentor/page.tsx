"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, DollarSign, Star, ArrowUpRight, Plus, Video, Play, TrendingUp, FileText, Bell } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCourseStore } from "@/lib/store";
import { useEnrollmentStore } from "@/lib/store";
import { useUserStore } from "@/lib/store";

export default function MentorDashboardPage() {
  const { user } = useAuth();
  const { courses, getCoursesByMentor } = useCourseStore();
  const { enrollments } = useEnrollmentStore();
  const { users } = useUserStore();

  const myCourses = user ? getCoursesByMentor(user.id) : [];
  
  // Calculate real stats
  const totalStudents = new Set(
    enrollments.filter(e => myCourses.some(c => c.id === e.courseId)).map(e => e.userId)
  ).size;
  
  const totalEarnings = myCourses.reduce((acc, course) => {
    const courseEnrollments = enrollments.filter(e => e.courseId === course.id).length;
    return acc + (course.price * courseEnrollments);
  }, 0);

  const avgRating = myCourses.length > 0 
    ? (myCourses.reduce((acc, c) => acc + (c.rating || 0), 0) / myCourses.filter(c => c.rating).length).toFixed(1) || "0"
    : "0";

  // Get recent students from enrollments
  const recentEnrollments = enrollments
    .filter(e => myCourses.some(c => c.id === e.courseId))
    .sort((a, b) => new Date(b.lastAccessedAt || 0).getTime() - new Date(a.lastAccessedAt || 0).getTime())
    .slice(0, 5);

  const getStudentName = (userId: string) => {
    const found = users.find(u => u.id === userId);
    return found?.name || "Unknown";
  };

  const getCourseTitle = (courseId: string) => {
    const found = courses.find(c => c.id === courseId);
    return found?.title || "Unknown Course";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
            Overview Mentor
          </h1>
          <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
            Pantau performa kursus dan perkembangan siswa Anda
          </p>
        </div>
        <Link href="/mentor/courses/create" className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors shrink-0">
          <Plus size={18} /> Buat Kursus Baru
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Siswa", value: totalStudents.toLocaleString(), icon: Users, color: "text-blue-500", trend: "+12% bln ini" },
          { label: "Total Kursus", value: myCourses.length, icon: BookOpen, color: "text-emerald-500", trend: "Aktif" },
          { label: "Total Pendapatan", value: formatCurrency(totalEarnings), icon: DollarSign, color: "text-accent", trend: "+15% bln ini" },
          { label: "Rating Rata-rata", value: avgRating, icon: Star, color: "text-amber-500", trend: `${myCourses.reduce((acc, c) => acc + (c.reviewCount || 0), 0)} review` },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5"
          >
            <div className={`inline-flex p-2.5 rounded-xl bg-coffee-50 dark:bg-charcoal-200 ${stat.color} mb-3`}>
              <stat.icon size={20} className={stat.label === "Rating Rata-rata" ? "fill-amber-500" : ""} />
            </div>
            <p className="text-2xl font-bold text-coffee-800 dark:text-white mb-1">{stat.value}</p>
            <p className="text-xs font-medium text-coffee-500 dark:text-coffee-400 mb-2">{stat.label}</p>
            <div className="flex items-center gap-1.5 text-[10px] text-coffee-400">
              {stat.label !== "Rating Rata-rata" && stat.label !== "Total Kursus" && (
                <ArrowUpRight size={12} className="text-emerald-500" />
              )}
              {stat.trend}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Courses & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Upload Video", icon: Video, color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" },
              { label: "Buat Kuis", icon: FileText, color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" },
              { label: "Beri Pengumuman", icon: Bell, color: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" },
            ].map((action, i) => (
              <button
                key={i}
                className="flex items-center gap-3 p-4 bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 hover:border-coffee-200 dark:hover:border-charcoal-300 transition-all text-left"
              >
                <div className={`p-2 rounded-lg shrink-0 ${action.color}`}>
                  <action.icon size={18} />
                </div>
                <span className="text-sm font-medium text-coffee-700 dark:text-white">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-coffee-800 dark:text-white">Performa Pendapatan</h2>
              <select className="text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-lg px-3 py-1.5 outline-none text-coffee-700 dark:text-coffee-300">
                <option>6 Bulan Terakhir</option>
                <option>Tahun Ini</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-2 pt-4 border-b border-coffee-100 dark:border-charcoal-200 relative">
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pointer-events-none">
                {[100, 75, 50, 25, 0].map((line, i) => (
                  <div key={i} className="w-full h-px bg-coffee-50 dark:bg-charcoal-200 flex items-center">
                    <span className="text-[10px] text-coffee-400 -mt-3 absolute right-0">{line === 0 ? "0" : `${line}M`}</span>
                  </div>
                ))}
              </div>
              
              {[45, 60, 55, 80, 70, 95].map((val, i) => (
                <div key={i} className="w-1/6 flex justify-center relative z-10 group">
                  <div 
                    className="w-12 bg-accent rounded-t-lg opacity-80 group-hover:opacity-100 transition-opacity" 
                    style={{ height: `${val}%` }}
                  ></div>
                  <div className="absolute -bottom-6 text-[10px] text-coffee-500 font-medium">
                    {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"][i]}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-xs text-coffee-500">Pendapatan Kotor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Students */}
          <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
            <div className="p-5 border-b border-coffee-100 dark:border-charcoal-200 flex items-center justify-between">
              <h2 className="text-base font-semibold text-coffee-800 dark:text-white">Aktivitas Siswa Terkini</h2>
              <Link href="/mentor/students" className="text-xs font-medium text-accent hover:text-accent-hover">Lihat Semua</Link>
            </div>
            <div className="divide-y divide-coffee-50 dark:divide-charcoal-200">
              {recentEnrollments.length > 0 ? recentEnrollments.map((enrollment, i) => {
                const studentName = getStudentName(enrollment.userId);
                const courseTitle = getCourseTitle(enrollment.courseId);
                return (
                  <div key={i} className="p-4 hover:bg-coffee-50/50 dark:hover:bg-charcoal-200/50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-coffee-100 dark:bg-charcoal-300 flex items-center justify-center text-xs font-bold text-coffee-600">
                        {studentName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-coffee-800 dark:text-white truncate">{studentName}</p>
                        <p className="text-xs text-coffee-400 truncate">{courseTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pl-11">
                      <div className="flex-1 max-w-[100px]">
                        <div className="w-full h-1.5 bg-coffee-100 dark:bg-charcoal-300 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${enrollment.progress}%` }} />
                        </div>
                      </div>
                      <span className="text-[10px] text-coffee-400">{enrollment.progress}%</span>
                    </div>
                  </div>
                );
              }) : (
                <div className="p-8 text-center text-coffee-400">Belum ada siswa terdaftar</div>
              )}
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-gradient-to-br from-coffee-800 to-coffee-900 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <TrendingUp size={24} className="text-accent mb-4 relative z-10" />
            <h3 className="text-base font-bold text-white mb-2 relative z-10">Tingkatkan Penjualan Anda</h3>
            <p className="text-sm text-coffee-300 leading-relaxed relative z-10 mb-4">
              Menambahkan subtitle pada video dapat meningkatkan engagement siswa hingga 30%. Coba fitur auto-subtitle baru kami.
            </p>
            <button className="text-xs font-medium text-white px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors relative z-10">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
