"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCourseStore, useEnrollmentStore } from "@/lib/store";
import { useAuth } from "@/lib/auth-context";
import { formatCurrency } from "@/lib/utils";
import {
  Star,
  Clock,
  BookOpen,
  Users,
  Play,
  Award,
  Globe,
  CheckCircle,
  Heart,
  Share2,
  ChevronDown,
  MessageCircle,
  FileText,
  Video,
  Lock,
} from "lucide-react";

const tabs = ["Overview", "Kurikulum", "Review", "Diskusi"];

const curriculum = [
  {
    title: "Pengenalan & Setup",
    lessons: [
      { title: "Pengenalan Course", duration: "8:30", isFree: true },
      { title: "Setup Environment", duration: "15:20", isFree: true },
      { title: "Project Structure", duration: "12:45", isFree: false },
    ],
  },
  {
    title: "Fundamental Concepts",
    lessons: [
      { title: "Core Concepts Overview", duration: "20:10", isFree: false },
      { title: "Hands-on Practice", duration: "25:30", isFree: false },
      { title: "Quiz: Fundamental", duration: "10:00", isFree: false },
    ],
  },
  {
    title: "Advanced Techniques",
    lessons: [
      { title: "Advanced Patterns", duration: "30:15", isFree: false },
      { title: "Real-world Project", duration: "45:20", isFree: false },
      { title: "Best Practices", duration: "18:40", isFree: false },
    ],
  },
  {
    title: "Final Project",
    lessons: [
      { title: "Project Planning", duration: "15:00", isFree: false },
      { title: "Implementation", duration: "60:00", isFree: false },
      { title: "Deployment & Review", duration: "20:00", isFree: false },
    ],
  },
];

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const { user } = useAuth();
  const { getCourseById } = useCourseStore();
  const { enrollUser, isUserEnrolled } = useEnrollmentStore();

  const course = getCourseById(params.id as string);
  const isEnrolled = user && course ? isUserEnrolled(user.id, course.id) : false;

  if (!course) {
    return (
      <>
        <Navbar />
        <main className="pt-20 pb-16 min-h-screen bg-white dark:bg-charcoal flex items-center justify-center">
          <div className="text-center">
            <BookOpen size={48} className="mx-auto text-coffee-300 mb-4" />
            <h2 className="text-xl font-semibold text-coffee-800 dark:text-white">Kursus tidak ditemukan</h2>
            <p className="text-coffee-500 mt-2">Kursus yang Anda cari tidak tersedia.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen bg-white dark:bg-charcoal">
        {/* Hero */}
        <div className="bg-coffee-800 dark:bg-charcoal-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 text-xs font-medium text-accent bg-accent/10 rounded-md">
                    {course.category}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-medium text-coffee-300 bg-coffee-700/50 rounded-md">
                    {course.level}
                  </span>
                  {course.status === 'published' && course.studentCount > 1000 && (
                    <span className="px-2.5 py-1 text-xs font-semibold text-white bg-accent rounded-md">
                      Popular
                    </span>
                  )}
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
                  {course.title}
                </h1>
                <p className="text-coffee-300 text-sm leading-relaxed mb-5 max-w-xl">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-coffee-300 mb-5">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <strong className="text-white">{course.rating > 0 ? course.rating.toFixed(1) : "-"}</strong>
                    <span className="text-coffee-400">({course.reviewCount} reviews)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {course.studentCount.toLocaleString()} siswa
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} />
                    {course.lessons} lessons
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-coffee-600 flex items-center justify-center text-xs font-bold text-white">
                    {course.mentorName?.split(" ").map(n => n[0]).join("") || "M"}
                  </div>
                  <span className="text-sm text-coffee-300">
                    Dibuat oleh <strong className="text-white">{course.mentorName}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden mb-6">
                <div className="flex border-b border-coffee-100 dark:border-charcoal-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3.5 text-sm font-medium transition-colors relative ${
                        activeTab === tab
                          ? "text-accent"
                          : "text-coffee-500 dark:text-coffee-400 hover:text-coffee-700 dark:hover:text-white"
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {activeTab === "Overview" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-coffee-800 dark:text-white mb-3">Tentang Kursus Ini</h3>
                        <p className="text-sm text-coffee-600 dark:text-coffee-300 leading-relaxed">
                          {course.description} Kursus ini dirancang untuk memberikan pemahaman mendalam
                          dengan pendekatan praktis. Anda akan belajar melalui proyek nyata yang bisa langsung
                          diterapkan di industri.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-coffee-800 dark:text-white mb-3">Yang Akan Anda Pelajari</h3>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {[
                            "Memahami konsep fundamental",
                            "Membangun proyek dari nol",
                            "Best practices industri",
                            "Deployment & production",
                            "Testing & debugging",
                            "Performance optimization",
                          ].map((item) => (
                            <div key={item} className="flex items-start gap-2.5 text-sm text-coffee-600 dark:text-coffee-300">
                              <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-coffee-800 dark:text-white mb-3">Prasyarat</h3>
                        <ul className="space-y-2 text-sm text-coffee-600 dark:text-coffee-300">
                          <li className="flex items-start gap-2.5"><span className="text-coffee-300">•</span>Pengetahuan dasar programming</li>
                          <li className="flex items-start gap-2.5"><span className="text-coffee-300">•</span>Laptop/PC dengan koneksi internet</li>
                          <li className="flex items-start gap-2.5"><span className="text-coffee-300">•</span>Semangat untuk belajar</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === "Kurikulum" && (
                    <div className="space-y-3">
                      <p className="text-sm text-coffee-500 dark:text-coffee-400 mb-4">
                        {course.lessons} lessons · {course.duration} total
                      </p>
                      {course.chapters.length > 0 ? course.chapters.map((chapter, i) => (
                        <div key={chapter.id} className="border border-coffee-100 dark:border-charcoal-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                            className="w-full flex items-center justify-between p-4 hover:bg-coffee-50 dark:hover:bg-charcoal-200 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-md bg-coffee-100 dark:bg-charcoal-200 flex items-center justify-center text-xs font-semibold text-coffee-500">
                                {i + 1}
                              </span>
                              <span className="text-sm font-semibold text-coffee-700 dark:text-white">{chapter.title}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-coffee-400">{chapter.materials.length} lessons</span>
                              <ChevronDown size={16} className={`text-coffee-400 transition-transform ${expandedModule === i ? "rotate-180" : ""}`} />
                            </div>
                          </button>
                          {expandedModule === i && (
                            <div className="border-t border-coffee-100 dark:border-charcoal-200">
                              {chapter.materials.map((material) => (
                                <div key={material.id} className="flex items-center gap-3 px-4 py-3 hover:bg-coffee-50/50 dark:hover:bg-charcoal-200/50 border-b last:border-b-0 border-coffee-50 dark:border-charcoal-200">
                                  {material.isPreview ? (
                                    <Play size={14} className="text-accent shrink-0" />
                                  ) : (
                                    <Lock size={14} className="text-coffee-300 dark:text-charcoal-300 shrink-0" />
                                  )}
                                  <span className="text-sm text-coffee-600 dark:text-coffee-300 flex-1">{material.title}</span>
                                  {material.isPreview && (
                                    <span className="px-2 py-0.5 text-[10px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 rounded">Gratis</span>
                                  )}
                                  {material.duration && (
                                    <span className="text-xs text-coffee-400">{material.duration}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )) : (
                        <div className="text-center py-8 text-coffee-400">
                          <p>Kurikulum masih dalam pengembangan</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "Review" && (
                    <div className="space-y-4">
                      {[
                        { name: "Andi W.", rating: 5, text: "Kursus yang sangat terstruktur dan mudah dipahami. Sangat recommended!" },
                        { name: "Maya P.", rating: 5, text: "Materi selalu up-to-date dan relevan dengan industri. Instructor-nya juga sangat responsif." },
                        { name: "Reno S.", rating: 4, text: "Bagus secara keseluruhan. Berharap ada lebih banyak proyek practise." },
                      ].map((review, i) => (
                        <div key={i} className="p-4 bg-coffee-50 dark:bg-charcoal rounded-xl">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-coffee-200 dark:bg-charcoal-200 flex items-center justify-center text-xs font-bold text-coffee-500">
                              {review.name[0]}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-coffee-700 dark:text-white">{review.name}</p>
                              <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                  <Star key={idx} size={10} className={idx < review.rating ? "text-amber-400 fill-amber-400" : "text-coffee-200"} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-coffee-600 dark:text-coffee-300">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "Diskusi" && (
                    <div className="text-center py-10">
                      <MessageCircle size={32} className="mx-auto text-coffee-200 dark:text-charcoal-300 mb-3" />
                      <p className="text-sm text-coffee-500 dark:text-coffee-400">Diskusi tersedia setelah mendaftar kursus ini</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Enrollment */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-6 shadow-sm">
                {/* Thumbnail */}
                <div className="aspect-video rounded-xl bg-gradient-to-br from-coffee-100 to-coffee-50 dark:from-charcoal-200 dark:to-charcoal mb-5 flex items-center justify-center">
                  <Play size={32} className="text-coffee-300 dark:text-charcoal-300" />
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-5">
                  {course.isFree ? (
                    <span className="text-2xl font-bold text-emerald-600">Gratis</span>
                  ) : (
                    <>
                      <span className="text-2xl font-bold text-coffee-800 dark:text-white">{formatCurrency(course.price)}</span>
                      {course.originalPrice && (
                        <span className="text-sm text-coffee-400 line-through">{formatCurrency(course.originalPrice)}</span>
                      )}
                    </>
                  )}
                </div>

                <button 
                  onClick={async () => {
                    if (!user) {
                      router.push("/login");
                      return;
                    }
                    if (course.isFree) {
                      enrollUser(user.id, course.id);
                      alert("Berhasil terdaftar di kursus!");
                      router.push(`/course/${course.id}/learn`);
                    } else {
                      alert("Sistem pembayaran sedang dalam pemeliharaan (Maintenance). Silakan coba kursus gratis.");
                    }
                  }}
                  className="w-full py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors mb-3"
                >
                  {isEnrolled ? "Lanjutkan Belajar" : course.isFree ? "Daftar Gratis" : "Beli Kursus"}
                </button>
                <button className="w-full py-3 text-sm font-semibold text-coffee-700 dark:text-coffee-200 border border-coffee-200 dark:border-charcoal-200 hover:bg-coffee-50 dark:hover:bg-charcoal-200 rounded-xl transition-colors mb-5">
                  Tambah ke Wishlist
                </button>

                <div className="space-y-3 text-sm">
                  {[
                    { icon: Video, label: `${course.lessons} video lessons` },
                    { icon: Clock, label: `${course.duration} total durasi` },
                    { icon: FileText, label: "Materi & resource downloadable" },
                    { icon: Award, label: "Sertifikat penyelesaian" },
                    { icon: Globe, label: "Akses selamanya" },
                    { icon: MessageCircle, label: "Forum diskusi" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5 text-coffee-600 dark:text-coffee-300">
                      <item.icon size={16} className="text-coffee-400 shrink-0" />
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-coffee-100 dark:border-charcoal-200 flex gap-2">
                  <button className="flex-1 py-2 text-xs font-medium text-coffee-500 dark:text-coffee-400 hover:text-coffee-700 dark:hover:text-white border border-coffee-100 dark:border-charcoal-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                    <Heart size={14} /> Wishlist
                  </button>
                  <button className="flex-1 py-2 text-xs font-medium text-coffee-500 dark:text-coffee-400 hover:text-coffee-700 dark:hover:text-white border border-coffee-100 dark:border-charcoal-200 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                    <Share2 size={14} /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
