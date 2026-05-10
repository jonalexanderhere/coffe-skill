"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Star, 
  ArrowUpRight, 
  Plus, 
  Video, 
  Play, 
  TrendingUp, 
  FileText, 
  Bell,
  BarChart3,
  Layers,
  ChevronRight,
  ShieldCheck,
  Award,
  Zap
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
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
  
  // Real-time calculated stats
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

  const recentEnrollments = enrollments
    .filter(e => myCourses.some(c => c.id === e.courseId))
    .sort((a, b) => new Date(b.enrolledAt || 0).getTime() - new Date(a.enrolledAt || 0).getTime())
    .slice(0, 5);

  const getStudentName = (userId: string) => {
    const found = users.find(u => u.id === userId);
    return found?.name || "Student";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Mentor Console Header */}
      <section className="mt-8 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                MENTOR CONSOLE
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-500">
                <ShieldCheck size={12} /> Terverifikasi
              </div>
            </div>
            <h1 className="text-4xl font-black text-coffee-800 dark:text-white tracking-tight leading-tight" style={{ fontFamily: "var(--font-poppins)" }}>
              Welcome back, <span className="text-accent">{user?.name?.split(" ")[0]}!</span>
            </h1>
            <p className="text-coffee-500 dark:text-coffee-400 mt-2 text-lg">
              Siap membagikan ilmu baru hari ini?
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            <Link 
              href="/mentor/courses/create" 
              className="px-8 py-4 bg-accent text-white rounded-2xl font-black text-sm hover:bg-accent-hover transition-all shadow-xl shadow-accent/30 active:scale-95 flex items-center gap-2 group"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              Buat Kursus Baru
            </Link>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Main Content: Stats & Analytics */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* High-Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Students", value: totalStudents.toLocaleString(), icon: Users, color: "from-blue-500 to-indigo-600", trend: "+12%" },
              { label: "Courses", value: myCourses.length, icon: BookOpen, color: "from-emerald-500 to-teal-600", trend: "Active" },
              { label: "Total Revenue", value: formatCurrency(totalEarnings), icon: DollarSign, color: "from-accent to-accent-hover", trend: "+8.5%" },
              { label: "Avg Rating", value: avgRating, icon: Star, color: "from-amber-500 to-orange-600", trend: "Top 5%" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white dark:bg-charcoal-light rounded-[2.5rem] p-8 border border-coffee-100 dark:border-charcoal-200 relative overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-bl-[4rem]`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} p-3.5 mb-6 shadow-xl shadow-black/5 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-coffee-800 dark:text-white tracking-tight">{stat.value}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] font-black text-coffee-400 uppercase tracking-widest">{stat.label}</p>
                    <span className="text-[10px] font-black text-emerald-500">{stat.trend}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Revenue Intelligence Section */}
          <section className="bg-white dark:bg-charcoal-light rounded-[3rem] border border-coffee-100 dark:border-charcoal-200 p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h3 className="text-2xl font-black text-coffee-800 dark:text-white tracking-tight">Revenue Intelligence</h3>
                <p className="text-[10px] font-black text-coffee-400 uppercase tracking-[0.2em] mt-1">Laporan pendapatan 7 bulan terakhir</p>
              </div>
              <div className="flex gap-3 p-1.5 bg-coffee-50 dark:bg-charcoal rounded-2xl border border-coffee-100 dark:border-charcoal-200">
                <button className="px-6 py-2 bg-white dark:bg-charcoal-light shadow-sm text-[10px] font-black uppercase tracking-widest text-coffee-800 dark:text-white rounded-xl transition-all">Monthly</button>
                <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-coffee-400 hover:text-accent transition-all">Yearly</button>
              </div>
            </div>

            <div className="h-72 flex items-end justify-between gap-6 relative px-4">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-12 pt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-full h-px border-t border-dashed border-coffee-100 dark:border-charcoal-200" />
                ))}
              </div>

              {[45, 62, 58, 85, 75, 98, 88].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group relative z-10">
                  <div className="w-full relative h-full flex flex-col justify-end min-h-[20px]">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 1.2, ease: "easeOut" }}
                      className="w-full max-w-[56px] mx-auto relative group"
                    >
                      <div className="absolute inset-0 bg-accent/10 rounded-t-[1.5rem] group-hover:bg-accent/20 transition-all" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent to-accent-hover rounded-t-[1.5rem] shadow-[0_0_30px_rgba(212,163,115,0.15)] group-hover:shadow-[0_0_40px_rgba(212,163,115,0.3)] transition-all" style={{ height: "100%" }} />
                      
                      {/* Floating Tooltip */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-coffee-800 text-white text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-2xl">
                        {val}M IDR
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-coffee-400 group-hover:text-accent transition-colors">
                    {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"][i]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Action Hub */}
          <section className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Upload Video", desc: "Tambah materi video HD", icon: Video, color: "text-blue-500", bg: "bg-blue-500/10" },
              { label: "Create Quiz", desc: "Tes pemahaman siswa", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { label: "New Event", desc: "Jadwalkan sesi live", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
            ].map((action, i) => (
              <button 
                key={i}
                className="group p-8 bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 text-left hover:border-accent/40 hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${action.bg} ${action.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <action.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-coffee-800 dark:text-white mb-1">{action.label}</h3>
                <p className="text-xs text-coffee-500 leading-relaxed">{action.desc}</p>
              </button>
            ))}
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          
          {/* Mentor Progress / Rank */}
          <div className="bg-charcoal text-white rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl shadow-charcoal/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                <Award size={32} className="text-accent" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2">Mentor Level</p>
              <h3 className="text-3xl font-black mb-6 tracking-tight">Silver Pro</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-coffee-400">
                  <span>Progress to Gold</span>
                  <span>82%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[82%]" />
                </div>
                <p className="text-[10px] text-coffee-500 italic">Dapatkan 50 siswa lagi untuk naik level.</p>
              </div>
            </div>
          </div>

          {/* Real-time Activity Feed */}
          <div className="bg-white dark:bg-charcoal-light rounded-[3rem] border border-coffee-100 dark:border-charcoal-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-coffee-800 dark:text-white tracking-tight">Aktivitas Siswa</h3>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            
            <div className="space-y-8">
              {recentEnrollments.length > 0 ? recentEnrollments.map((enrollment, i) => {
                const studentName = getStudentName(enrollment.userId);
                return (
                  <div key={i} className="group flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-coffee-50 dark:bg-charcoal flex items-center justify-center shrink-0 border border-coffee-100 dark:border-charcoal-200 font-black text-accent text-xs transition-transform group-hover:scale-110">
                      {studentName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-coffee-800 dark:text-white truncate">{studentName}</p>
                      <p className="text-[10px] text-coffee-500 mt-0.5">Baru saja mendaftar kursus</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-[8px] font-black text-accent uppercase tracking-widest px-2 py-0.5 bg-accent/10 rounded-full">New Student</span>
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
            
            <Link href="/mentor/students" className="w-full mt-10 py-3 bg-coffee-50 dark:bg-charcoal rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-coffee-500 hover:bg-accent hover:text-white transition-all">
              Manage All Students <ChevronRight size={14} />
            </Link>
          </div>

          {/* Expert Tips */}
          <div className="bg-white dark:bg-charcoal-light rounded-[3rem] border border-coffee-100 dark:border-charcoal-200 p-8">
            <h3 className="text-sm font-black text-coffee-800 dark:text-white mb-6 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={16} className="text-accent" /> Expert Insight
            </h3>
            <div className="p-6 bg-coffee-50 dark:bg-charcoal rounded-[2rem] border border-coffee-100 dark:border-charcoal-200">
              <p className="text-xs text-coffee-600 dark:text-coffee-300 leading-relaxed italic">
                "Siswa yang mendapatkan feedback pada tugas pertama cenderung 60% lebih berpeluang menyelesaikan kursus hingga akhir."
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
