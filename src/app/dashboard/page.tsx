"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Award,
  Flame,
  TrendingUp,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Code2,
  BarChart3,
  Play,
  Trophy,
  Lock,
  Search,
  Sparkles,
  Calendar,
  Zap
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useCourseStore } from "@/lib/store";
import { useEnrollmentStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useAuth();
  const { courses, getCourseById } = useCourseStore();
  const { enrollments, getEnrollmentsByUser } = useEnrollmentStore();

  const userEnrollments = user ? getEnrollmentsByUser(user.id) : [];
  const enrolledCoursesData = userEnrollments.map(e => {
    const course = getCourseById(e.courseId);
    return {
      id: e.courseId,
      title: course?.title || "Unknown Course",
      thumbnail: course?.thumbnail,
      progress: e.progress || 0,
      lastAccessed: e.lastAccessedAt,
      nextLesson: course?.chapters?.[0]?.materials?.[0]?.title || "Pelajari materi",
    };
  });

  const stats = {
    coursesEnrolled: userEnrollments.length,
    coursesCompleted: userEnrollments.filter(e => e.progress === 100).length,
    certificates: userEnrollments.filter(e => e.certificateIssued).length,
    currentStreak: userEnrollments.length > 0 ? 1 : 0, 
    hoursLearned: userEnrollments.reduce((acc, curr) => acc + (curr.progress > 0 ? 2 : 0), 0),
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Premium Hero Header */}
      <section className="relative mt-8 mb-12 rounded-[3rem] overflow-hidden bg-coffee-900 text-white p-8 md:p-12 shadow-2xl shadow-coffee-950/20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                STUDENT DASHBOARD
              </span>
              <span className="w-1 h-1 rounded-full bg-coffee-400" />
              <span className="text-[10px] font-bold text-coffee-400 uppercase tracking-widest flex items-center gap-1">
                <Calendar size={12} /> {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
              {getGreeting()}, <span className="text-accent">{user?.name?.split(" ")[0]}!</span>
            </h1>
            <p className="text-coffee-300 max-w-lg text-lg leading-relaxed mb-8">
              {userEnrollments.length > 0 
                ? "Lanjutkan perjalanan belajarmu. Kamu sudah berada di jalur yang tepat untuk menjadi expert!" 
                : "Ayo mulai belajar hari ini. Pilih kursus favoritmu dan raih sertifikat pertamamu."}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/dashboard/courses" 
                className="px-8 py-4 bg-accent text-white rounded-2xl font-black text-sm hover:bg-accent-hover transition-all shadow-xl shadow-accent/30 active:scale-95 flex items-center gap-2"
              >
                <Play size={18} fill="currentColor" />
                Lanjutkan Belajar
              </Link>
              <Link 
                href="/explore" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black text-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <Search size={18} />
                Explore Materi
              </Link>
            </div>
          </motion.div>

          {/* Featured Achievement Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-80 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 relative group"
          >
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-accent rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                <Trophy size={24} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Rank Saat Ini</p>
                <h4 className="text-lg font-bold">Rising Scholar</h4>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-xs text-coffee-400 font-bold uppercase">Progress Level</p>
                <p className="text-sm font-black text-accent">75%</p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full w-3/4" />
              </div>
              <p className="text-[10px] text-coffee-400 italic">250 XP lagi untuk naik ke level Senior Learner</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid Content */}
      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Left Column: Courses & Stats */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* Real-time Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Courses", value: stats.coursesEnrolled, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
              { label: "Learning Minutes", value: stats.hoursLearned * 60, icon: Clock, color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { label: "Certificates", value: stats.certificates, icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
              { label: "Day Streak", value: stats.currentStreak, icon: Flame, color: "text-red-500", bg: "bg-red-500/10" },
            ].map((s, i) => (
              <motion.div 
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-white dark:bg-charcoal-light rounded-[2rem] p-6 border border-coffee-100 dark:border-charcoal-200 flex flex-col items-center text-center group hover:border-accent/30 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <s.icon size={24} />
                </div>
                <h3 className="text-2xl font-black text-coffee-800 dark:text-white">{s.value}</h3>
                <p className="text-[10px] font-bold text-coffee-400 uppercase tracking-widest mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Continue Learning Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-accent rounded-full" />
                <h2 className="text-2xl font-black text-coffee-800 dark:text-white tracking-tight">Kursus Berjalan</h2>
              </div>
              <Link href="/dashboard/courses" className="px-4 py-2 bg-coffee-50 dark:bg-charcoal rounded-xl text-[10px] font-black text-coffee-500 uppercase tracking-widest border border-coffee-100 dark:border-charcoal-200 hover:bg-accent/10 hover:text-accent hover:border-accent/20 transition-all">
                Lihat Semua
              </Link>
            </div>

            {userEnrollments.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {enrolledCoursesData.slice(0, 4).map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="group bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 overflow-hidden hover:border-accent/40 transition-all duration-500"
                  >
                    <div className="flex p-5 gap-5">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                        <Image 
                          src={course.thumbnail || "/course-placeholder.jpg"} 
                          alt={course.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play size={24} fill="white" className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h3 className="text-md font-bold text-coffee-800 dark:text-white truncate group-hover:text-accent transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-[10px] text-coffee-400 font-bold uppercase mt-1 truncate">
                            Next: {course.nextLesson}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-accent">{course.progress}% Completed</span>
                          </div>
                          <div className="h-1.5 bg-coffee-50 dark:bg-charcoal rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              className="h-full bg-accent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link 
                      href={`/course/${course.id}`}
                      className="w-full py-3 bg-coffee-50 dark:bg-charcoal-200/50 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-coffee-500 hover:bg-accent hover:text-white transition-all"
                    >
                      Buka Materi <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white dark:bg-charcoal-light rounded-[3rem] border-2 border-dashed border-coffee-100 dark:border-charcoal-200">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Belum ada kursus aktif</h3>
                <p className="text-coffee-500 mb-8">Ambil langkah pertamamu sekarang.</p>
                <Link href="/explore" className="px-8 py-3 bg-accent text-white rounded-2xl font-bold">Explore Kursus</Link>
              </div>
            )}
          </section>

          {/* Daily Challenge / Activity Visualization */}
          <section className="bg-white dark:bg-charcoal-light rounded-[3rem] border border-coffee-100 dark:border-charcoal-200 p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Sparkles size={120} />
            </div>
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  <Zap size={12} /> Daily Quest
                </div>
                <h3 className="text-2xl font-black text-coffee-800 dark:text-white mb-3 tracking-tight">Kuasai satu materi hari ini!</h3>
                <p className="text-coffee-500 dark:text-coffee-400 mb-6 leading-relaxed">
                  Konsistensi adalah kunci kesuksesan. Selesaikan minimal satu lesson hari ini untuk mempertahankan streak belajarmu.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-charcoal-light bg-coffee-100 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" />
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white dark:border-charcoal-light bg-accent flex items-center justify-center text-[10px] font-black text-white">
                      +12k
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-coffee-400 uppercase tracking-widest">Siswa lain sedang belajar</p>
                </div>
              </div>
              <div className="w-full md:w-64 flex flex-col items-center text-center p-8 bg-coffee-50 dark:bg-charcoal rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 shadow-inner">
                <div className="relative w-24 h-24 mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-coffee-100 dark:text-charcoal-300" />
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.4)} className="text-accent" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-black text-coffee-800 dark:text-white">40%</span>
                  </div>
                </div>
                <p className="text-[10px] font-black text-coffee-400 uppercase tracking-widest">Progress Hari Ini</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-8">
          
          {/* Quick Actions Card */}
          <div className="bg-accent rounded-[3rem] p-8 text-white shadow-2xl shadow-accent/20 group">
            <h3 className="text-xl font-black mb-6 tracking-tight">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/dashboard/calendar" className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5">
                <div className="flex items-center gap-3">
                  <Calendar size={18} />
                  <span className="text-xs font-bold">Jadwal Belajar</span>
                </div>
                <ArrowRight size={14} className="opacity-40" />
              </Link>
              <Link href="/dashboard/wishlist" className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/5">
                <div className="flex items-center gap-3">
                  <Sparkles size={18} />
                  <span className="text-xs font-bold">Daftar Keinginan</span>
                </div>
                <ArrowRight size={14} className="opacity-40" />
              </Link>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white dark:bg-charcoal-light rounded-[3rem] border border-coffee-100 dark:border-charcoal-200 p-8">
            <h3 className="text-lg font-bold text-coffee-800 dark:text-white mb-8">Aktivitas Baru</h3>
            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-coffee-50 dark:before:bg-charcoal-200">
              {[
                { title: "Daftar Kursus", desc: "Cyber Security Mastery", time: "Baru saja", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { title: "Badge Terbuka", desc: "Pemula Cerdas", time: "2 jam yang lalu", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className={`w-6 h-6 rounded-full ${activity.bg} ${activity.color} flex items-center justify-center z-10 shrink-0 border-4 border-white dark:border-charcoal-light`}>
                    <activity.icon size={10} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-coffee-800 dark:text-white">{activity.title}</h4>
                    <p className="text-[10px] text-coffee-500 mt-0.5">{activity.desc}</p>
                    <p className="text-[9px] font-black text-coffee-300 uppercase tracking-widest mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gamification: Badges */}
          <div className="bg-white dark:bg-charcoal-light rounded-[3rem] border border-coffee-100 dark:border-charcoal-200 p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-coffee-800 dark:text-white">Badges</h3>
              <Trophy size={18} className="text-amber-500" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${
                  i <= 3 ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-coffee-50 dark:bg-charcoal grayscale opacity-30 border border-transparent"
                }`}>
                  <Award size={24} />
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-coffee-50 dark:bg-charcoal rounded-2xl text-[10px] font-black uppercase tracking-widest text-coffee-500 hover:bg-accent hover:text-white transition-all">
              Lihat Koleksi
            </button>
          </div>

          {/* Community Pulse */}
          <div className="bg-charcoal text-white rounded-[3rem] p-8 relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-1000">
              <MessageCircle size={100} />
            </div>
            <h3 className="text-lg font-bold mb-2">Community Pulse</h3>
            <p className="text-[10px] text-coffee-400 mb-6 uppercase tracking-widest font-black flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 1.2k Siswa Online
            </p>
            <Link href="/community" className="w-full py-4 bg-white text-coffee-950 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-coffee-100 transition-all">
              Join Forum <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
