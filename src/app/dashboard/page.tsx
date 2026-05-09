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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Selamat Datang, {user?.name?.split(" ")[0] || "Siswa"}! 👋
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
          {userEnrollments.length > 0 
            ? "Lanjutkan belajar dan raih target minggu ini" 
            : "Mulai perjalanan belajarmu hari ini"}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Kursus Diikuti", value: stats.coursesEnrolled, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
          { label: "Jam Belajar", value: stats.hoursLearned, icon: Clock, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
          { label: "Sertifikat", value: stats.certificates, icon: Award, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
          { label: "Streak Hari", value: stats.currentStreak, icon: Flame, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5"
          >
            <div className={`inline-flex p-2.5 rounded-xl ${stat.bg} mb-3`}>
              <stat.icon size={18} className={stat.color} />
            </div>
            <p className="text-2xl font-bold text-coffee-800 dark:text-white">{stat.value}</p>
            <p className="text-xs text-coffee-400 dark:text-coffee-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-coffee-800 dark:text-white">Lanjutkan Belajar</h2>
            {userEnrollments.length > 0 && (
              <Link href="/dashboard/courses" className="text-xs font-medium text-accent hover:text-accent-hover flex items-center gap-1">
                Lihat Semua <ArrowRight size={12} />
              </Link>
            )}
          </div>

          <div className="space-y-3">
            {userEnrollments.length > 0 ? (
              enrolledCoursesData.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <Link
                    href={`/course/${course.id}`}
                    className="group flex items-center gap-4 p-4 bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 hover:border-coffee-200 dark:hover:border-charcoal-300 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coffee-100 to-coffee-50 dark:from-charcoal-200 dark:to-charcoal flex items-center justify-center shrink-0">
                      <Code2 size={20} className="text-coffee-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-coffee-800 dark:text-white truncate group-hover:text-accent transition-colors">
                        {course.title}
                      </p>
                      <p className="text-xs text-coffee-400 dark:text-coffee-500 mt-0.5">
                        Selanjutnya: {course.nextLesson}
                      </p>
                      <div className="mt-2 w-full h-1.5 bg-coffee-100 dark:bg-charcoal-200 rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-accent">{course.progress}%</span>
                      <div className="mt-2">
                        <Play size={16} className="text-coffee-400 group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 border-dashed">
                <BookOpen size={32} className="mx-auto text-coffee-200 dark:text-charcoal-200 mb-3" />
                <p className="text-sm text-coffee-600 dark:text-coffee-300">Belum ada kursus yang diikuti</p>
                <Link href="/explore" className="inline-block mt-4 text-xs font-bold text-accent hover:underline">
                  Cari Kursus Sekarang
                </Link>
              </div>
            )}
          </div>

          {/* Weekly Activity Chart - Only show if has data or keep as generic placeholder */}
          <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5">
            <h3 className="text-sm font-semibold text-coffee-700 dark:text-white mb-4">Aktivitas Mingguan</h3>
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyActivityData.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative" style={{ height: "100px" }}>
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 bg-accent/15 rounded-md hover:bg-accent/30 transition-colors"
                      style={{ height: `${item.hours > 0 ? Math.min((item.hours / 6) * 100, 100) : 5}%` }}
                    >
                      {item.hours > 0 && (
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-accent rounded-md"
                          style={{ height: "100%" }}
                        />
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-coffee-400 font-medium">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-4">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5">
            <h3 className="text-sm font-semibold text-coffee-700 dark:text-white mb-4">Aktivitas Terakhir</h3>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, i) => {
                  const IconComp = activity.icon === "CheckCircle" ? CheckCircle : activity.icon === "Award" ? Award : MessageCircle;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 p-1.5 rounded-lg bg-coffee-50 dark:bg-charcoal-200 shrink-0">
                        <IconComp size={14} className="text-coffee-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-coffee-700 dark:text-coffee-200 leading-snug">{activity.title}</p>
                        <p className="text-[10px] text-coffee-400 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[10px] text-coffee-400 italic">Belum ada aktivitas baru</p>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5">
            <h3 className="text-sm font-semibold text-coffee-700 dark:text-white mb-4">Achievements</h3>
            <div className="space-y-3">
              {achievements.map((badge) => (
                <div
                  key={badge.name}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    badge.unlocked ? "bg-accent-light dark:bg-accent/10" : "bg-coffee-50 dark:bg-charcoal-200 opacity-60"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${badge.unlocked ? "bg-accent/20" : "bg-coffee-100 dark:bg-charcoal-300"}`}>
                    {badge.unlocked ? (
                      <Trophy size={14} className="text-accent" />
                    ) : (
                      <Lock size={14} className="text-coffee-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-coffee-700 dark:text-white">{badge.name}</p>
                    <p className="text-[10px] text-coffee-400 dark:text-coffee-500 mt-0.5">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
