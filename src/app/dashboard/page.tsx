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
} from "lucide-react";
import Link from "next/link";
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
      progress: e.progress || 0,
      lastAccessed: e.lastAccessedAt,
      nextLesson: course?.chapters?.[0]?.materials?.[0]?.title || "Pelajari materi",
    };
  });

  // Calculate stats from real data
  const stats = {
    coursesEnrolled: userEnrollments.length,
    coursesCompleted: userEnrollments.filter(e => e.progress === 100).length,
    certificates: userEnrollments.filter(e => e.certificateIssued).length,
    currentStreak: userEnrollments.length > 0 ? 1 : 0, 
    hoursLearned: userEnrollments.reduce((acc, curr) => acc + (curr.progress > 0 ? 2 : 0), 0),
  };

  const recentActivity = userEnrollments.length > 0 ? [
    { type: "lesson", title: "Berhasil terdaftar di kursus", time: "Baru saja", icon: "CheckCircle" },
  ] : [];

  const achievements = [
    { name: "Pemula Cerdas", description: "Daftar di kursus pertama", unlocked: userEnrollments.length > 0 },
    { name: "Pembelajar Aktif", description: "Selesaikan 5 lesson", unlocked: userEnrollments.some(e => e.progress > 50) },
    { name: "Sertifikat Pertama", description: "Selesaikan satu kursus penuh", unlocked: stats.certificates > 0 },
  ];

  // Calculate Weekly Activity from real dailyActivity log
  const getWeeklyActivity = () => {
    const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    const today = new Date();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
    });

    return last7Days.map((dateStr, i) => {
      const dayName = days[new Date(dateStr).getDay() === 0 ? 6 : new Date(dateStr).getDay() - 1];
      let totalCompletions = 0;
      userEnrollments.forEach(e => {
        const dayData = e.dailyActivity?.find(d => d.date === dateStr);
        if (dayData) totalCompletions += dayData.count;
      });
      return { day: dayName, hours: totalCompletions * 0.5 }; // Assume 0.5 hours per material
    });
  };

  const weeklyActivityData = getWeeklyActivity();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-bold text-coffee-800 dark:text-white tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
            Halo, {user?.name?.split(" ")[0] || "Siswa"}! 👋
          </h1>
          <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
            {userEnrollments.length > 0 
              ? `Kamu sudah menyelesaikan ${stats.coursesCompleted} kursus sejauh ini. Terus semangat!` 
              : "Siap untuk mempelajari skill baru hari ini?"}
          </p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Link 
              href="/explore" 
              className="relative flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-2xl font-bold text-sm hover:bg-accent-hover transition-all active:scale-95 shadow-lg shadow-accent/25"
            >
              Explore Kursus Baru
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards with Premium Look */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Kursus Diikuti", value: stats.coursesEnrolled, icon: BookOpen, color: "from-blue-500 to-indigo-600", lightColor: "text-blue-500" },
          { label: "Menit Belajar", value: stats.hoursLearned * 60, icon: Clock, color: "from-emerald-500 to-teal-600", lightColor: "text-emerald-500" },
          { label: "Sertifikat", value: stats.certificates, icon: Award, color: "from-amber-500 to-orange-600", lightColor: "text-amber-500" },
          { label: "Daily Streak", value: stats.currentStreak, icon: Flame, color: "from-red-500 to-rose-600", lightColor: "text-red-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white dark:bg-charcoal-light rounded-[2rem] border border-coffee-100 dark:border-charcoal-200 p-6 overflow-hidden hover:shadow-xl hover:shadow-coffee-100/50 dark:hover:shadow-none transition-all duration-500"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-bl-[4rem]`} />
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} p-3 mb-4 shadow-lg shadow-black/5`}>
              <stat.icon size={24} className="text-white" />
            </div>
            <div>
              <p className="text-3xl font-black text-coffee-800 dark:text-white tracking-tight">{stat.value}</p>
              <p className="text-xs font-bold text-coffee-400 dark:text-coffee-500 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content: Progress Path */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-coffee-800 dark:text-white tracking-tight">Lanjutkan Belajar</h2>
              <Link href="/dashboard/courses" className="text-xs font-bold text-accent uppercase tracking-widest hover:underline">
                Lihat Semua
              </Link>
            </div>

            <div className="grid gap-4">
              {userEnrollments.length > 0 ? (
                enrolledCoursesData.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Link
                      href={`/course/${course.id}`}
                      className="group relative flex items-center gap-6 p-6 bg-white dark:bg-charcoal-light rounded-[2rem] border border-coffee-100 dark:border-charcoal-200 hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-500"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-coffee-50 dark:bg-charcoal flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 border border-coffee-100 dark:border-charcoal-200">
                        <Code2 size={28} className="text-accent" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">In Progress</span>
                          <span className="text-[10px] text-coffee-400">•</span>
                          <span className="text-[10px] text-coffee-400 font-bold uppercase tracking-widest">Update 2j yang lalu</span>
                        </div>
                        <h3 className="text-lg font-bold text-coffee-800 dark:text-white truncate group-hover:text-accent transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs text-coffee-500 mt-1">
                          Selanjutnya: <span className="font-semibold text-coffee-700 dark:text-coffee-300">{course.nextLesson}</span>
                        </p>
                        
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex-1 h-2 bg-coffee-50 dark:bg-charcoal rounded-full overflow-hidden border border-coffee-100 dark:border-charcoal-200">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-accent to-accent-hover rounded-full" 
                            />
                          </div>
                          <span className="text-sm font-black text-accent">{course.progress}%</span>
                        </div>
                      </div>

                      <div className="hidden sm:flex w-12 h-12 rounded-full bg-accent/5 items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                        <Play size={20} className="ml-1" />
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="p-12 text-center bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 border-dashed">
                  <div className="w-20 h-20 bg-coffee-50 dark:bg-charcoal rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <BookOpen size={32} className="text-coffee-200 dark:text-charcoal-200" />
                  </div>
                  <h3 className="text-xl font-bold text-coffee-800 dark:text-white mb-2">Belum ada kursus aktif</h3>
                  <p className="text-sm text-coffee-500 mb-8 max-w-xs mx-auto">Mulai perjalanan belajarmu hari ini dan kuasai skill masa depan.</p>
                  <Link href="/explore" className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-2xl font-bold text-sm hover:bg-accent-hover transition-all">
                    Explore Kursus
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Activity Visualization */}
          <section className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-coffee-800 dark:text-white tracking-tight">Aktivitas Belajar</h3>
                <p className="text-xs text-coffee-400 mt-1 uppercase tracking-widest font-bold">Minggu Terakhir • Total {stats.hoursLearned} Jam</p>
              </div>
              <div className="p-3 bg-coffee-50 dark:bg-charcoal rounded-2xl text-accent">
                <BarChart3 size={20} />
              </div>
            </div>
            
            <div className="flex items-end justify-between gap-4 h-40 pt-4">
              {weeklyActivityData.map((item, i) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-3 group">
                  <div className="w-full relative h-full flex flex-col justify-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${item.hours > 0 ? Math.min((item.hours / 6) * 100, 100) : 5}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.8 }}
                      className="w-full max-w-[40px] mx-auto relative"
                    >
                      <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                        item.hours > 0 ? "bg-accent/20 group-hover:bg-accent/30" : "bg-coffee-100 dark:bg-charcoal-200"
                      }`} />
                      {item.hours > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent to-accent-hover rounded-xl shadow-[0_0_15px_rgba(212,163,115,0.3)]" style={{ height: "100%" }} />
                      )}
                    </motion.div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-coffee-400 group-hover:text-accent transition-colors">{item.day}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Social & Challenges */}
        <div className="space-y-8">
          {/* Recent Events/Activity Feed */}
          <div className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 p-8">
            <h3 className="text-lg font-bold text-coffee-800 dark:text-white mb-6">Aktivitas Terakhir</h3>
            {recentActivity.length > 0 ? (
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-coffee-100 dark:before:bg-charcoal-200">
                {recentActivity.map((activity, i) => {
                  const IconComp = activity.icon === "CheckCircle" ? CheckCircle : activity.icon === "Award" ? Award : MessageCircle;
                  return (
                    <div key={i} className="flex items-start gap-4 relative z-10">
                      <div className="p-1.5 rounded-full bg-white dark:bg-charcoal-light border border-coffee-100 dark:border-charcoal-200 shadow-sm text-accent">
                        <IconComp size={12} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-coffee-700 dark:text-coffee-200 leading-snug">{activity.title}</p>
                        <p className="text-[10px] text-coffee-400 mt-1 uppercase tracking-widest font-black">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs text-coffee-400 italic">Belum ada aktivitas baru</p>
              </div>
            )}
          </div>

          {/* Gamification: Achievements */}
          <div className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 p-8 overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/5 blur-[50px] rounded-full" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-coffee-800 dark:text-white">Achievements</h3>
              <Trophy size={18} className="text-amber-500" />
            </div>
            <div className="space-y-4">
              {achievements.map((badge) => (
                <div
                  key={badge.name}
                  className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                    badge.unlocked 
                      ? "bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10" 
                      : "bg-coffee-50 dark:bg-charcoal-200 border-transparent opacity-50 grayscale"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                    badge.unlocked ? "bg-amber-500/20 text-amber-500" : "bg-coffee-200 dark:bg-charcoal-300 text-coffee-400"
                  }`}>
                    {badge.unlocked ? <Trophy size={18} /> : <Lock size={18} />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-coffee-800 dark:text-white">{badge.name}</p>
                    <p className="text-[10px] text-coffee-500 leading-tight mt-0.5">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 rounded-2xl bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 text-xs font-bold text-coffee-600 dark:text-coffee-400 uppercase tracking-widest hover:bg-coffee-100 dark:hover:bg-charcoal-light transition-all">
              Lihat Semua Badge
            </button>
          </div>

          {/* Social: Live Community */}
          <div className="bg-gradient-to-br from-coffee-800 to-coffee-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live Community</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Butuh Bantuan?</h3>
              <p className="text-xs text-coffee-300 leading-relaxed mb-6">Bergabung dengan diskusi materi bersama 12.000+ siswa lainnya di Forum.</p>
              <Link href="/community" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-coffee-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-coffee-100 transition-all">
                Buka Community
                <MessageCircle size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
