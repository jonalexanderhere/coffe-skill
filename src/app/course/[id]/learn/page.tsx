"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Play, 
  CheckCircle, 
  Lock, 
  FileText, 
  BookOpen, 
  MoreVertical,
  Settings,
  MessageSquare,
  ChevronDown,
  Clock,
  ArrowLeft,
  Star,
  Download,
  ExternalLink,
  FileDigit,
  Share2
} from "lucide-react";
import { useCourseStore, useEnrollmentStore } from "@/lib/store";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function CourseLearnPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { getCourseById } = useCourseStore();
  const { getEnrollment, updateProgress } = useEnrollmentStore();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMaterialId, setActiveMaterialId] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const courseId = params.id as string;
  const course = getCourseById(courseId);
  const { addReview: submitReview } = useCourseStore();
  const enrollment = user ? getEnrollment(user.id, courseId) : null;

  // Check if already reviewed
  const userReview = course?.reviews?.find(r => r.userId === user?.id);
  const [isReviewed, setIsReviewed] = useState(!!userReview);

  // Initial setup
  useEffect(() => {
    if (course && course.chapters.length > 0) {
      // Find first material or first chapter
      const firstChapter = course.chapters[0];
      setExpandedChapters([firstChapter.id]);
      if (firstChapter.materials.length > 0) {
        setActiveMaterialId(firstChapter.materials[0].id);
      }
    }
  }, [course]);

  // Show rating modal when 100%
  useEffect(() => {
    if (enrollment?.progress === 100 && !isReviewed && !userReview) {
      setShowRatingModal(true);
    }
  }, [enrollment?.progress, isReviewed, userReview]);

  const handleRate = () => {
    if (course && user) {
      submitReview(course.id, { 
        userId: user.id, 
        userName: user.name || "Anonymous", 
        rating, 
        comment: reviewText 
      });
      setIsReviewed(true);
      setShowRatingModal(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `/course/${courseId}`);
    alert("Link kursus berhasil disalin!");
  };

  if (!course || !enrollment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-charcoal">
        <div className="text-center">
          <Lock size={48} className="mx-auto text-coffee-300 mb-4" />
          <h2 className="text-xl font-bold text-coffee-800 dark:text-white">Akses Terbatas</h2>
          <p className="text-coffee-500 mt-2">Anda harus terdaftar untuk mengakses materi ini.</p>
          <button 
            onClick={() => router.push(`/course/${courseId}`)}
            className="mt-6 px-6 py-2 bg-accent text-white rounded-xl font-semibold"
          >
            Kembali ke Detail Kursus
          </button>
        </div>
      </div>
    );
  }

  // Find active material
  const activeMaterial = course.chapters
    .flatMap(ch => ch.materials)
    .find(m => m.id === activeMaterialId);

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const totalMaterials = course.chapters.reduce((acc, ch) => acc + ch.materials.length, 0);

  const handleMaterialComplete = () => {
    if (user && activeMaterialId) {
      updateProgress(user.id, courseId, activeMaterialId, totalMaterials);
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-charcoal overflow-hidden font-sans">
      
      {/* Sidebar - Curriculum */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full border-r border-coffee-100 dark:border-charcoal-200 bg-[#FDFCFB] dark:bg-charcoal-light shrink-0 relative flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-coffee-100 dark:border-charcoal-200 flex items-center justify-between">
              <Link href="/dashboard/courses" className="flex items-center gap-2 text-coffee-500 hover:text-accent transition-colors">
                <ArrowLeft size={18} />
                <span className="text-sm font-bold">Dashboard</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 text-coffee-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 border-b border-coffee-100 dark:border-charcoal-200">
              <h2 className="text-sm font-bold text-coffee-800 dark:text-white line-clamp-2 leading-tight">
                {course.title}
              </h2>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-coffee-500">
                  <span>Progres Anda</span>
                  <span className="font-bold text-accent">{enrollment.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-coffee-100 dark:bg-charcoal rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-500" 
                    style={{ width: `${enrollment.progress}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Curriculum List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
              {course.chapters.map((chapter, idx) => (
                <div key={chapter.id} className="mb-1">
                  <button 
                    onClick={() => toggleChapter(chapter.id)}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-coffee-50 dark:hover:bg-charcoal transition-colors ${
                      expandedChapters.includes(chapter.id) ? "bg-coffee-50/50 dark:bg-charcoal/30" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-coffee-300">{(idx + 1).toString().padStart(2, '0')}</span>
                      <span className="text-xs font-bold text-coffee-700 dark:text-coffee-200 text-left line-clamp-1">{chapter.title}</span>
                    </div>
                    <ChevronDown size={14} className={`text-coffee-400 transition-transform ${expandedChapters.includes(chapter.id) ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {expandedChapters.includes(chapter.id) && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        {chapter.materials.map((mat) => {
                          const isCompleted = enrollment.completedMaterials.includes(mat.id);
                          const isActive = activeMaterialId === mat.id;
                          
                          return (
                            <button
                              key={mat.id}
                              onClick={() => setActiveMaterialId(mat.id)}
                              className={`w-full pl-11 pr-4 py-3 flex items-center gap-3 transition-all ${
                                isActive 
                                  ? "bg-accent/5 text-accent border-r-2 border-accent" 
                                  : "text-coffee-600 dark:text-coffee-400 hover:bg-coffee-50 dark:hover:bg-charcoal"
                              }`}
                            >
                              <div className="shrink-0">
                                {isCompleted ? (
                                  <CheckCircle size={16} className="text-emerald-500 fill-emerald-500/10" />
                                ) : mat.type === 'video' ? (
                                  <Play size={16} className={isActive ? "text-accent" : "text-coffee-300"} />
                                ) : (
                                  <FileText size={16} className={isActive ? "text-accent" : "text-coffee-300"} />
                                )}
                              </div>
                              <div className="flex flex-col items-start overflow-hidden">
                                <span className={`text-xs text-left truncate w-full ${isActive ? "font-bold" : "font-medium"}`}>
                                  {mat.title}
                                </span>
                                {mat.duration && (
                                  <span className="text-[9px] text-coffee-400 flex items-center gap-1">
                                    <Clock size={8} /> {mat.duration}
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-white dark:bg-charcoal overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-14 border-b border-coffee-100 dark:border-charcoal-200 px-4 flex items-center justify-between shrink-0 bg-white/80 dark:bg-charcoal/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="p-2 text-coffee-500 hover:bg-coffee-50 dark:hover:bg-charcoal-light rounded-lg transition-colors">
                <Menu size={20} />
              </button>
            )}
            <h1 className="text-sm font-bold text-coffee-800 dark:text-white hidden sm:block">
              {activeMaterial?.title || "Memuat materi..."}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {enrollment.progress === 100 && isReviewed && (
              <Link
                href="/certificate"
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-bold rounded-lg hover:bg-emerald-600 transition-all animate-bounce shadow-lg shadow-emerald-500/20"
              >
                <Download size={14} /> DOWNLOAD SERTIFIKAT
              </Link>
            )}
            <button 
              onClick={handleShare}
              className="p-2 text-coffee-400 hover:text-coffee-600 dark:hover:text-white"
            >
              <Share2 size={18} />
            </button>
            <button className="p-2 text-coffee-400 hover:text-coffee-600 dark:hover:text-white">
              <MessageSquare size={18} />
            </button>
            <button className="p-2 text-coffee-400 hover:text-coffee-600 dark:hover:text-white">
              <Settings size={18} />
            </button>
            <div className="w-px h-6 bg-coffee-100 dark:border-charcoal-200 mx-2" />
            <button 
              onClick={() => router.push(`/course/${courseId}`)}
              className="p-1.5 rounded-lg text-coffee-500 hover:bg-coffee-50 dark:hover:bg-charcoal-light"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Player / Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-4xl mx-auto py-8 px-6">
            
            {activeMaterial ? (
              <motion.div
                key={activeMaterialId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Content based on type */}
                {activeMaterial.type === 'video' ? (
                  <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
                    <iframe 
                      src={activeMaterial.content.includes("youtube.com") 
                        ? activeMaterial.content.replace("watch?v=", "embed/") 
                        : activeMaterial.content}
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  </div>
                ) : activeMaterial.type === 'pdf' ? (
                  <div className="w-full aspect-[3/4] md:aspect-[16/10] bg-coffee-50 dark:bg-charcoal rounded-3xl overflow-hidden border border-coffee-100 dark:border-charcoal-200 shadow-lg relative">
                    <iframe 
                      src={activeMaterial.content.includes("drive.google.com") 
                        ? activeMaterial.content.replace("/view", "/preview")
                        : activeMaterial.content}
                      className="w-full h-full border-0"
                      allow="autoplay"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <a 
                        href={activeMaterial.content} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-white/80 dark:bg-charcoal/80 backdrop-blur-md rounded-xl text-coffee-600 dark:text-white shadow-sm hover:text-accent transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-charcoal-light rounded-[32px] p-8 md:p-12 border border-coffee-100 dark:border-charcoal-200 shadow-sm min-h-[400px]">
                    <div className="prose dark:prose-invert max-w-none">
                      <h2 className="text-3xl font-bold mb-6 text-coffee-800 dark:text-white">{activeMaterial.title}</h2>
                      <div className="text-coffee-600 dark:text-coffee-300 space-y-4 leading-relaxed">
                        {activeMaterial.content.split('\n').map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-coffee-50 dark:border-charcoal-200">
                  <div>
                    <h3 className="text-lg font-bold text-coffee-800 dark:text-white">{activeMaterial.title}</h3>
                    <p className="text-sm text-coffee-500">CoffeeSkill Platform · Premium Course Content</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleMaterialComplete}
                      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                        enrollment.completedMaterials.includes(activeMaterialId!)
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20 active:scale-95"
                      }`}
                    >
                      {enrollment.completedMaterials.includes(activeMaterialId!) ? (
                        <>
                          <CheckCircle size={18} />
                          Selesai
                        </>
                      ) : (
                        "Tandai Selesai"
                      )}
                    </button>
                    <button className="p-3 bg-coffee-50 dark:bg-charcoal-light rounded-2xl text-coffee-600 dark:text-coffee-300 border border-coffee-100 dark:border-charcoal-200">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Discussion Placeholder */}
                <div className="mt-12 p-8 bg-coffee-50 dark:bg-charcoal-light rounded-[32px] border border-coffee-100 dark:border-charcoal-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-base font-bold text-coffee-800 dark:text-white">Diskusi & Tanya Jawab</h3>
                    <span className="text-xs text-accent font-bold">12 Komentar</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-bold">
                      {user?.name?.[0] || "U"}
                    </div>
                    <div className="flex-1">
                      <textarea 
                        className="w-full bg-white dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-accent/50 resize-none"
                        placeholder="Tanyakan sesuatu tentang materi ini..."
                        rows={2}
                      />
                      <div className="mt-3 flex justify-end">
                        <button className="px-5 py-2 bg-coffee-200 dark:bg-charcoal text-coffee-600 dark:text-coffee-400 text-xs font-bold rounded-xl">
                          Kirim Pertanyaan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent" />
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Completion & Rating Modal */}
      <AnimatePresence>
        {showRatingModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowRatingModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-charcoal-light rounded-[40px] p-8 md:p-12 max-w-lg w-full shadow-2xl text-center border border-coffee-100 dark:border-charcoal-200 overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-amber-400 to-emerald-400" />
              
              <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-emerald-500" />
              </div>

              <h2 className="text-2xl font-bold text-coffee-800 dark:text-white mb-2">Selamat! Anda Lulus</h2>
              <p className="text-coffee-500 dark:text-coffee-400 mb-8">
                Anda telah menyelesaikan semua materi dalam kursus "{course.title}". Sertifikat Anda sudah tersedia!
              </p>

              <div className="bg-coffee-50 dark:bg-charcoal rounded-3xl p-6 mb-8 border border-coffee-100 dark:border-charcoal-200">
                <p className="text-sm font-bold text-coffee-700 dark:text-white mb-4">Berikan Rating Kursus</p>
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star 
                        size={32} 
                        className={`${star <= rating ? "text-amber-400 fill-amber-400" : "text-coffee-200"}`} 
                      />
                    </button>
                  ))}
                </div>
                <textarea 
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Ceritakan pengalaman belajar Anda..."
                  className="w-full bg-white dark:bg-charcoal-light border border-coffee-100 dark:border-charcoal-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-accent/50 resize-none"
                  rows={3}
                />
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleRate}
                  className="w-full py-4 bg-accent text-white rounded-2xl font-bold hover:bg-accent-hover transition-all shadow-lg shadow-accent/20"
                >
                  Kirim & Selesaikan
                </button>
                <Link 
                  href="/certificate"
                  className="w-full py-4 text-coffee-600 dark:text-coffee-400 font-bold hover:text-coffee-800 dark:hover:text-white transition-colors"
                >
                  Lihat Sertifikat Saya
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Add Star to lucide-react imports

