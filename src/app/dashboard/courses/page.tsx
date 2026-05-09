"use client";

import { motion } from "framer-motion";
import { BookOpen, Play, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useCourseStore, useEnrollmentStore } from "@/lib/store";

export default function MyCoursesPage() {
  const { user } = useAuth();
  const { getCourseById } = useCourseStore();
  const { getEnrollmentsByUser } = useEnrollmentStore();

  const userEnrollments = user ? getEnrollmentsByUser(user.id) : [];
  const enrolledCourses = userEnrollments.map(e => ({
    ...e,
    course: getCourseById(e.courseId)
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Kursus Saya
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-2">
          Kelola progres belajar dan akses materi kursus Anda
        </p>
      </motion.div>

      {enrolledCourses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden hover:border-accent/30 transition-all duration-300"
            >
              <div className="aspect-video bg-coffee-100 dark:bg-charcoal relative overflow-hidden">
                {item.course?.thumbnail ? (
                  <img src={item.course.thumbnail} alt={item.course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-coffee-300">
                    <BookOpen size={40} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link 
                    href={`/course/${item.courseId}`}
                    className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    <Play size={20} className="fill-current" />
                  </Link>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-bold text-accent bg-accent/10 rounded-md">
                    {item.course?.category || "Tech"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-coffee-800 dark:text-white mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                  {item.course?.title}
                </h3>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-coffee-500 dark:text-coffee-400">Progres Belajar</span>
                    <span className="font-bold text-accent">{item.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-coffee-100 dark:bg-charcoal rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-500" 
                      style={{ width: `${item.progress}%` }} 
                    />
                  </div>
                </div>

                <Link 
                  href={`/course/${item.courseId}`}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors shadow-sm"
                >
                  Lanjutkan Belajar
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-charcoal-light rounded-3xl border border-coffee-100 dark:border-charcoal-200 border-dashed">
          <div className="w-20 h-20 bg-coffee-50 dark:bg-charcoal rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} className="text-coffee-300" />
          </div>
          <h2 className="text-xl font-bold text-coffee-800 dark:text-white mb-2">Belum ada kursus</h2>
          <p className="text-coffee-500 dark:text-coffee-400 mb-8 max-w-xs mx-auto">
            Anda belum terdaftar di kursus apapun. Temukan kursus menarik dan mulai belajar sekarang!
          </p>
          <Link 
            href="/explore" 
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-all shadow-sm"
          >
            Explore Kursus
            <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}
