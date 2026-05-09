"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, CheckCircle, XCircle, Eye, Star, Users, BookOpen, AlertCircle, MessageSquare, ChevronDown, Clock } from "lucide-react";
import Link from "next/link";
import { useCourseStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Course, CourseStatus } from "@/lib/types";

export default function CourseApprovalPage() {
  const { courses, approveCourse, rejectCourse } = useCourseStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus | "all">("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.mentorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCourses = courses.filter(c => c.status === 'pending_review');
  const publishedCourses = courses.filter(c => c.status === 'published');
  const rejectedCourses = courses.filter(c => c.status === 'rejected');

  const handleApprove = (courseId: string) => {
    approveCourse(courseId);
  };

  const handleReject = () => {
    if (selectedCourse && rejectReason.trim()) {
      rejectCourse(selectedCourse.id, rejectReason);
      setShowRejectModal(false);
      setSelectedCourse(null);
      setRejectReason("");
    }
  };

  const openRejectModal = (course: Course) => {
    setSelectedCourse(course);
    setShowRejectModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Persetujuan Kursus
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
          Review dan setujui kursus yang diajukan mentor
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Kursus", value: courses.length, color: "text-coffee-600" },
          { label: "Menunggu Review", value: pendingCourses.length, color: "text-amber-500" },
          { label: "Published", value: publishedCourses.length, color: "text-emerald-500" },
          { label: "Ditolak", value: rejectedCourses.length, color: "text-red-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-charcoal-light rounded-xl border border-coffee-100 dark:border-charcoal-200 p-4"
          >
            <p className="text-2xl font-bold text-coffee-800 dark:text-white">{stat.value}</p>
            <p className={`text-xs font-medium ${stat.color} mt-1`}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
          <input
            type="text"
            placeholder="Cari kursus atau mentor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-transparent rounded-xl text-coffee-800 dark:text-white focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as CourseStatus | "all")}
          className="px-3 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-700 dark:text-coffee-300 outline-none cursor-pointer"
        >
          <option value="all">Semua Status</option>
          <option value="pending_review">Menunggu Review</option>
          <option value="approved">Disetujui</option>
          <option value="rejected">Ditolak</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-12 text-center">
            <AlertCircle size={40} className="mx-auto text-coffee-300 mb-3" />
            <p className="text-coffee-500">Tidak ada kursus yang cocok dengan filter</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-coffee-100 to-coffee-50 dark:from-charcoal-200 dark:to-charcoal flex items-center justify-center shrink-0">
                    <BookOpen size={24} className="text-coffee-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-coffee-800 dark:text-white">{course.title}</h3>
                        <p className="text-sm text-coffee-500 mt-0.5">oleh {course.mentorName}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full shrink-0 ${
                        course.status === 'pending_review' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                        course.status === 'published' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                        course.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' :
                        course.status === 'approved' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                        'bg-coffee-100 text-coffee-700 dark:bg-charcoal-300 dark:text-coffee-300'
                      }`}>
                        {course.status === 'pending_review' ? 'Menunggu Review' :
                         course.status === 'published' ? 'Published' :
                         course.status === 'rejected' ? 'Ditolak' :
                         course.status === 'approved' ? 'Disetujui' : 'Draft'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-coffee-600 dark:text-coffee-400 mt-3 line-clamp-2">{course.description}</p>

                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center gap-4 text-xs text-coffee-500">
                        <span className="flex items-center gap-1">
                          <BookOpen size={14} /> {course.lessons} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={14} /> {course.studentCount} siswa
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-coffee-700 dark:text-white">
                        {course.isFree ? 'Gratis' : formatCurrency(course.price)}
                      </span>
                    </div>

                    {course.rejectedReason && (
                      <div className="mt-3 p-3 bg-red-50 dark:bg-red-500/10 rounded-lg">
                        <p className="text-xs font-medium text-red-700 dark:text-red-400">Alasan penolakan:</p>
                        <p className="text-xs text-red-600 dark:text-red-500 mt-1">{course.rejectedReason}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              {course.status === 'pending_review' && (
                <div className="px-5 py-4 border-t border-coffee-100 dark:border-charcoal-200 flex flex-wrap items-center justify-between gap-3 bg-coffee-50/50 dark:bg-charcoal-200/30">
                  <div className="flex items-center gap-2 text-xs text-coffee-500">
                    <span className="px-2 py-0.5 bg-coffee-200 dark:bg-charcoal-300 rounded">{course.category}</span>
                    <span className="px-2 py-0.5 bg-coffee-200 dark:bg-charcoal-300 rounded">{course.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-coffee-600 dark:text-coffee-300 bg-white dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-lg hover:bg-coffee-50 transition-colors">
                      <Eye size={14} /> Preview
                    </button>
                    <button 
                      onClick={() => openRejectModal(course)}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-500/10 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <XCircle size={14} /> Tolak
                    </button>
                    <button 
                      onClick={() => handleApprove(course.id)}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <CheckCircle size={14} /> Setujui
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowRejectModal(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-charcoal-light rounded-2xl p-6 w-full max-w-md shadow-xl"
          >
            <h3 className="text-lg font-semibold text-coffee-800 dark:text-white mb-4">Tolak Kursus</h3>
            <p className="text-sm text-coffee-500 mb-4">
              Berikan alasan penolakan untuk kursus "{selectedCourse.title}"
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Contoh: Konten kurang lengkap, harga terlalu tinggi, dll..."
              className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none resize-none"
              rows={4}
            />
            <div className="flex items-center justify-end gap-3 mt-4">
              <button 
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-sm font-medium text-coffee-600 dark:text-coffee-300 hover:bg-coffee-50 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Tolak Kursus
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}