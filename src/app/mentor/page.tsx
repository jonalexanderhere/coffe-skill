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
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-bold text-coffee-800 dark:text-white tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
            Mentor <span className="text-accent">Console</span>
          </h1>
          <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
            Pantau pertumbuhan akademik dan finansial kursus Anda
          </p>
        </motion.div>
        <Link 
          href="/mentor/courses/create" 
          className="group flex items-center gap-2 px-6 py-3.5 bg-accent text-white rounded-2xl font-bold text-sm hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 active:scale-95"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> 
          Buat Kursus Baru
        </Link>
      </div>

      {/* Stats Grid with Glassmorphism */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Siswa", value: totalStudents.toLocaleString(), icon: Users, color: "from-blue-500 to-indigo-600", trend: "+12.4%", trendUp: true },
          { label: "Kursus Aktif", value: myCourses.length, icon: BookOpen, color: "from-emerald-500 to-teal-600", trend: "Stable", trendUp: true },
          { label: "Pendapatan", value: formatCurrency(totalEarnings), icon: DollarSign, color: "from-accent to-accent-hover", trend: "+8.2%", trendUp: true },
          { label: "Rating Avg", value: avgRating, icon: Star, color: "from-amber-500 to-orange-600", trend: `${myCourses.reduce((acc, c) => acc + (c.reviewCount || 0), 0)} reviews`, trendUp: true },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white dark:bg-charcoal-light rounded-[2rem] border border-coffee-100 dark:border-charcoal-200 p-6 relative overflow-hidden hover:shadow-xl transition-all duration-500"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-bl-[3rem] transition-opacity group-hover:opacity-[0.06]`} />
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${stat.color} p-2.5 mb-4 shadow-lg shadow-black/5`}>
              <stat.icon size={22} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-coffee-800 dark:text-white tracking-tight">{stat.value}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[10px] font-bold text-coffee-400 uppercase tracking-widest">{stat.label}</p>
                <span className={`text-[10px] font-black ${stat.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>{stat.trend}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Upload Video", desc: "Tambah materi video baru", icon: Video, color: "bg-blue-500", light: "bg-blue-50 dark:bg-blue-500/10" },
              { label: "Buat Kuis", desc: "Uji pemahaman siswa", icon: FileText, color: "bg-emerald-500", light: "bg-emerald-50 dark:bg-emerald-500/10" },
              { label: "Pengumuman", desc: "Kirim pesan ke siswa", icon: Bell, color: "bg-amber-500", light: "bg-amber-50 dark:bg-amber-500/10" },
            ].map((action, i) => (
              <button
                key={i}
                className="group flex flex-col p-6 bg-white dark:bg-charcoal-light rounded-[2rem] border border-coffee-100 dark:border-charcoal-200 hover:border-accent/30 transition-all duration-300 text-left"
              >
                <div className={`w-12 h-12 rounded-2xl ${action.light} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <action.icon size={22} className={action.color.replace('bg-', 'text-')} />
                </div>
                <h3 className="text-sm font-bold text-coffee-800 dark:text-white">{action.label}</h3>
                <p className="text-[10px] text-coffee-400 mt-1">{action.desc}</p>
              </button>
            ))}
          </div>

          {/* Revenue Analytics Chart */}
          <section className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 p-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-bold text-coffee-800 dark:text-white tracking-tight">Revenue Analytics</h3>
                <p className="text-[10px] text-coffee-400 mt-1 font-bold uppercase tracking-widest">Total Earnings: {formatCurrency(totalEarnings)}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-coffee-50 dark:bg-charcoal rounded-xl text-[10px] font-bold text-coffee-600 dark:text-coffee-400 border border-coffee-100 dark:border-charcoal-200 uppercase tracking-widest hover:bg-coffee-100 transition-all">Monthly</button>
                <button className="px-4 py-1.5 bg-accent text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-accent/20">Yearly</button>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-4 pt-10 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="w-full h-px border-t border-dashed border-coffee-100 dark:border-charcoal-200" />
                ))}
              </div>
              
              {[45, 60, 55, 80, 70, 95, 85].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group relative z-10">
                  <div className="w-full relative h-full flex flex-col justify-end">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      className="w-full max-w-[48px] mx-auto relative"
                    >
                      <div className="absolute inset-0 bg-accent/20 rounded-t-xl group-hover:bg-accent/30 transition-all" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent to-accent-hover rounded-t-xl" style={{ height: "100%" }} />
                      
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-coffee-800 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {val}M IDR
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-[10px] font-bold text-coffee-400 group-hover:text-accent transition-colors">
                    {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"][i]}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Student Activity Feed */}
          <div className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-coffee-800 dark:text-white">Aktivitas Siswa</h3>
              <Link href="/mentor/students" className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline">View All</Link>
            </div>
            
            <div className="space-y-6">
              {recentEnrollments.length > 0 ? recentEnrollments.map((enrollment, i) => {
                const studentName = getStudentName(enrollment.userId);
                const courseTitle = getCourseTitle(enrollment.courseId);
                return (
                  <div key={i} className="group flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-coffee-50 dark:bg-charcoal flex items-center justify-center shrink-0 border border-coffee-100 dark:border-charcoal-200 font-bold text-accent transition-transform group-hover:scale-110">
                      {studentName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-coffee-800 dark:text-white truncate">{studentName}</p>
                      <p className="text-[10px] text-coffee-400 truncate mt-0.5">{courseTitle}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-coffee-50 dark:bg-charcoal rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${enrollment.progress}%` }} />
                        </div>
                        <span className="text-[8px] font-black text-coffee-500">{enrollment.progress}%</span>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="py-10 text-center">
                  <p className="text-xs text-coffee-400 italic">Belum ada aktivitas baru</p>
                </div>
              )}
            </div>
          </div>

          {/* Mentor Pro Tips */}
          <div className="bg-gradient-to-br from-coffee-800 to-coffee-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-coffee-900/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[60px] rounded-full" />
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-3">Mentor Pro Tip</h3>
              <p className="text-xs text-coffee-300 leading-relaxed mb-6">
                Siswa yang mendapatkan feedback dalam 24 jam pertama cenderung 40% lebih mungkin untuk menyelesaikan seluruh kursus.
              </p>
              <button className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-accent-hover transition-all">
                Buka Analytics Center
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* System Notifications */}
          <div className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 p-8">
            <h3 className="text-sm font-bold text-coffee-800 dark:text-white mb-6">Pesan Sistem</h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-1">Status Akun</p>
                <p className="text-xs text-coffee-700 dark:text-coffee-300">Profil Anda telah terverifikasi sebagai Top Mentor bulan ini.</p>
              </div>
              <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">Update Fitur</p>
                <p className="text-xs text-coffee-700 dark:text-coffee-300">Sekarang Anda bisa menambahkan preview PDF dari Google Drive.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
