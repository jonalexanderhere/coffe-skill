"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Minus, GripVertical, Video, FileText, HelpCircle, Link as LinkIcon, Check, ChevronRight, ChevronLeft, X, AlertTriangle, FileDigit } from "lucide-react";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { useAuth } from "@/lib/auth-context";
import { useCourseStore, useDraftCourseStore, useSystemStore } from "@/lib/store";
import { useCategoryStore } from "@/lib/store";
import { CourseLevel } from "@/lib/types";

type Step = 1 | 2 | 3 | 4;

export default function CreateCoursePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addCourse } = useCourseStore();
  const { categories } = useCategoryStore();
  
  // Connect to global draft store
  const { 
    currentStep, 
    basicInfo, 
    chapters, 
    setStep, 
    updateBasicInfo, 
    setChapters, 
    resetDraft 
  } = useDraftCourseStore();

  const [errors, setErrors] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [materialForm, setMaterialForm] = useState({
    type: "video" as "video" | "article" | "quiz" | "pdf",
    title: "",
    content: "",
    duration: "",
    isPreview: false,
  });

  // Warn on tab close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (basicInfo.title || chapters.length > 0) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [basicInfo.title, chapters.length]);

  const steps = [
    { num: 1, label: "Info Dasar" },
    { num: 2, label: "Kurikulum" },
    { num: 3, label: "Materi" },
    { num: 4, label: "Review" },
  ];

  const addChapter = () => {
    setChapters([
      ...chapters,
      { id: `ch-${Date.now()}`, title: `Chapter ${chapters.length + 1}`, materials: [] },
    ]);
  };

  const updateChapterTitle = (id: string, title: string) => {
    setChapters(chapters.map(ch => ch.id === id ? { ...ch, title } : ch));
  };

  const deleteChapter = (id: string) => {
    setChapters(chapters.filter(ch => ch.id !== id));
  };

  const addMaterialToChapter = (chapterId: string) => {
    if (!materialForm.title.trim()) return;

    const newMaterial = {
      id: `mat-${Date.now()}`,
      chapterId,
      courseId: "",
      type: materialForm.type,
      title: materialForm.title,
      description: "",
      content: materialForm.content,
      duration: materialForm.duration,
      order: chapters.find(ch => ch.id === chapterId)?.materials.length || 0 + 1,
      isPreview: materialForm.isPreview,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setChapters(chapters.map(ch =>
      ch.id === chapterId ? { ...ch, materials: [...ch.materials, newMaterial] } : ch
    ));

    setMaterialForm({ type: "video", title: "", content: "", duration: "", isPreview: false });
  };

  const deleteMaterial = (chapterId: string, materialId: string) => {
    setChapters(chapters.map(ch =>
      ch.id === chapterId ? { ...ch, materials: ch.materials.filter((m: any) => m.id !== materialId) } : ch
    ));
  };

  const addTag = () => {
    if (tagInput.trim() && !basicInfo.tags.includes(tagInput.trim())) {
      updateBasicInfo({ tags: [...basicInfo.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    updateBasicInfo({ tags: basicInfo.tags.filter((t: string) => t !== tag) });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: string[] = [];
    
    if (step === 1) {
      if (!basicInfo.title.trim()) newErrors.push("Judul kursus harus diisi");
      if (!basicInfo.description.trim()) newErrors.push("Deskripsi kursus harus diisi");
      if (!basicInfo.category) newErrors.push("Kategori harus dipilih");
    }
    
    if (step === 2) {
      if (chapters.length === 0) newErrors.push("Minimal harus ada 1 chapter");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setStep(currentStep + 1);
        setErrors([]);
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
      setErrors([]);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    if (!user) return;

    const courseId = `course-${Date.now()}`;
    const totalLessons = chapters.reduce((acc, ch) => acc + ch.materials.length, 0);

    const courseData = {
      id: courseId,
      mentorId: user.id,
      mentorName: user.name,
      title: basicInfo.title,
      description: basicInfo.description,
      shortDescription: basicInfo.shortDescription,
      thumbnail: basicInfo.thumbnail,
      ebookUrl: basicInfo.ebookUrl,
      category: basicInfo.category,
      level: basicInfo.level,
      price: basicInfo.isFree ? 0 : basicInfo.price,
      isFree: basicInfo.isFree,
      status: "pending_review" as const,
      rating: 0,
      reviewCount: 0,
      studentCount: 0,
      duration: `${Math.ceil(totalLessons * 0.5)} jam`,
      lessons: totalLessons,
      tags: basicInfo.tags,
      chapters: chapters.map((ch, idx) => ({
        id: ch.id,
        courseId,
        title: ch.title,
        order: idx + 1,
        materials: ch.materials.map((m: any, mIdx: number) => ({ ...m, courseId, order: mIdx + 1 })),
        isPublished: true,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const { addLog } = useSystemStore.getState();
    addLog({
      action: "Course Created",
      category: "content",
      details: `Mentor ${user.name} created a new course: ${basicInfo.title}`,
      ipAddress: "127.0.0.1", // In real app, get from server
      status: "success",
      severity: "info",
      userId: user.id,
      userName: user.name
    });

    addCourse(courseData);
    resetDraft(); // Important: clear draft after success
    router.push("/mentor/courses");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
            Buat Kursus Baru
          </h1>
          <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
            Langkah {currentStep} dari 4: {steps.find(s => s.num === currentStep)?.label}
          </p>
        </div>
        <button onClick={() => router.back()} className="p-2 text-coffee-500 hover:bg-coffee-50 rounded-lg">
          <X size={20} />
        </button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <div key={step.num} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              currentStep >= step.num 
                ? "bg-accent text-white" 
                : "bg-coffee-100 dark:bg-charcoal-200 text-coffee-400"
            }`}>
              {currentStep > step.num ? <Check size={16} /> : step.num}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${
              currentStep >= step.num ? "text-coffee-800 dark:text-white" : "text-coffee-400"
            }`}>
              {step.label}
            </span>
            {idx < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-2 ${
                currentStep > step.num ? "bg-accent" : "bg-coffee-200 dark:bg-charcoal-300"
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4">
          {errors.map((err, idx) => (
            <p key={idx} className="text-sm text-red-700 dark:text-red-400">• {err}</p>
          ))}
        </div>
      )}

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                Judul Kursus *
              </label>
              <input
                type="text"
                value={basicInfo.title}
                onChange={(e) => updateBasicInfo({ title: e.target.value })}
                placeholder="Contoh: Full-Stack Web Development dengan Next.js"
                className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                Deskripsi Singkat
              </label>
              <input
                type="text"
                value={basicInfo.shortDescription}
                onChange={(e) => updateBasicInfo({ shortDescription: e.target.value })}
                placeholder="Ringkasan singkat kursus (maks 100 karakter)"
                className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                E-book Preview (Google Drive Link)
              </label>
              <div className="relative">
                <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
                <input
                  type="url"
                  value={basicInfo.ebookUrl}
                  onChange={(e) => updateBasicInfo({ ebookUrl: e.target.value })}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full pl-10 pr-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
                />
              </div>
              <p className="mt-1 text-[10px] text-coffee-400">
                Gunakan link &quot;Share&quot; dari Google Drive agar siswa dapat membaca cuplikan buku.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                Deskripsi Lengkap *
              </label>
              <textarea
                value={basicInfo.description}
                onChange={(e) => updateBasicInfo({ description: e.target.value })}
                placeholder="Jelaskan detail kursus, apa yang akan dipelajari, dan target siswa..."
                rows={5}
                className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                  Kategori *
                </label>
                <select
                  value={basicInfo.category}
                  onChange={(e) => updateBasicInfo({ category: e.target.value })}
                  className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                  Level
                </label>
                <select
                  value={basicInfo.level}
                  onChange={(e) => updateBasicInfo({ level: e.target.value as CourseLevel })}
                  className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
                >
                  <option value="Pemula">Pemula</option>
                  <option value="Menengah">Menengah</option>
                  <option value="Lanjutan">Lanjutan</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={basicInfo.isFree}
                  onChange={(e) => updateBasicInfo({ isFree: e.target.checked })}
                  className="w-4 h-4 rounded border-coffee-300 text-accent"
                />
                <span className="text-sm text-coffee-700 dark:text-coffee-300">Kursus Gratis</span>
              </label>
              {!basicInfo.isFree && (
                <div className="flex-1">
                  <input
                    type="number"
                    value={basicInfo.price || ""}
                    onChange={(e) => updateBasicInfo({ price: parseInt(e.target.value) || 0 })}
                    placeholder="Harga (IDR)"
                    className="w-full px-4 py-2 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {basicInfo.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-coffee-100 dark:bg-charcoal-200 text-coffee-700 dark:text-coffee-300 rounded-lg text-xs">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Tambah tag..."
                  className="flex-1 px-4 py-2 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
                />
                <button onClick={addTag} className="px-4 py-2 text-sm bg-coffee-100 dark:bg-charcoal-200 rounded-xl">Add</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 2: Curriculum */}
      {currentStep === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-coffee-800 dark:text-white">Kurikulum Kursus</h3>
              <button
                onClick={addChapter}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-accent bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors"
              >
                <Plus size={16} /> Tambah Chapter
              </button>
            </div>

            {chapters.length === 0 ? (
              <div className="text-center py-8 text-coffee-400">
                <p>Belum ada chapter. Klik &quot;Tambah Chapter&quot; untuk memulai.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {chapters.map((chapter, idx) => (
                  <div key={chapter.id} className="bg-coffee-50 dark:bg-charcoal-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <GripVertical size={16} className="text-coffee-400 cursor-move" />
                      <span className="text-xs text-coffee-500 font-medium">Chapter {idx + 1}</span>
                      <input
                        type="text"
                        value={chapter.title}
                        onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                        placeholder="Nama chapter..."
                        className="flex-1 px-3 py-2 text-sm bg-white dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-lg text-coffee-800 dark:text-white focus:outline-none"
                      />
                      <button onClick={() => deleteChapter(chapter.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <Minus size={16} />
                      </button>
                    </div>
                    <div className="ml-8 mt-2 flex items-center gap-2 text-xs text-coffee-500">
                      <span>{chapter.materials.length} materi</span>
                      <button 
                        onClick={() => { setSelectedChapter(chapter.id); setStep(3); }}
                        className="text-accent hover:underline"
                      >
                        + Tambah materi
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Step 3: Materials */}
      {currentStep === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5">
            <h3 className="text-base font-semibold text-coffee-800 dark:text-white mb-4">Tambah Materi</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                Pilih Chapter
              </label>
              <select
                value={selectedChapter || ""}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
              >
                <option value="">Pilih Chapter</option>
                {chapters.map((ch, idx) => (
                  <option key={ch.id} value={ch.id}>Chapter {idx + 1}: {ch.title}</option>
                ))}
              </select>
            </div>

            {selectedChapter && (
              <>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                      Tipe Materi
                    </label>
                    <div className="flex gap-2">
                      {[
                        { key: "video", label: "Video", icon: Video },
                        { key: "article", label: "Artikel", icon: FileText },
                        { key: "pdf", label: "PDF/Drive", icon: FileDigit },
                        { key: "quiz", label: "Kuis", icon: HelpCircle },
                      ].map(type => (
                        <button
                          key={type.key}
                          onClick={() => setMaterialForm({ ...materialForm, type: type.key as any })}
                          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm rounded-xl transition-colors ${
                            materialForm.type === type.key
                              ? "bg-accent text-white"
                              : "bg-coffee-50 dark:bg-charcoal-200 text-coffee-600 dark:text-coffee-300"
                          }`}
                        >
                          <type.icon size={16} /> {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                      Judul Materi *
                    </label>
                    <input
                      type="text"
                      value={materialForm.title}
                      onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                      placeholder="Nama materi..."
                      className="w-full px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                {materialForm.type === "video" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                      URL Video (YouTube/Vimeo/Google Drive)
                    </label>
                    <div className="relative">
                      <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
                      <input
                        type="url"
                        value={materialForm.content}
                        onChange={(e) => setMaterialForm({ ...materialForm, content: e.target.value })}
                        placeholder="https://youtube.com/watch?v=... atau https://drive.google.com/file/d/..."
                        className="w-full pl-10 pr-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
                      />
                    </div>
                    <p className="mt-1 text-xs text-coffee-400">
                      Supported: YouTube, Vimeo, Google Drive
                    </p>
                    <input
                      type="text"
                      value={materialForm.duration}
                      onChange={(e) => setMaterialForm({ ...materialForm, duration: e.target.value })}
                      placeholder="Durasi (contoh: 15 menit)"
                      className="w-full mt-2 px-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
                    />
                  </div>
                )}

                {materialForm.type === "pdf" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                      Link PDF (Google Drive/S3)
                    </label>
                    <div className="relative">
                      <LinkIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
                      <input
                        type="url"
                        value={materialForm.content}
                        onChange={(e) => setMaterialForm({ ...materialForm, content: e.target.value })}
                        placeholder="https://drive.google.com/file/d/..."
                        className="w-full pl-10 pr-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
                      />
                    </div>
                    <p className="mt-1 text-xs text-coffee-400">
                      Gunakan link share publik dari Google Drive untuk hasil terbaik.
                    </p>
                  </div>
                )}

                {materialForm.type === "article" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
                      Konten Artikel
                    </label>
                    <div className="bg-white dark:bg-charcoal rounded-xl overflow-hidden border border-coffee-200 dark:border-charcoal-200">
                      <ReactQuill
                        theme="snow"
                        value={materialForm.content}
                        onChange={(content) => setMaterialForm({ ...materialForm, content })}
                        placeholder="Tulis konten artikel di sini..."
                        className="h-64 dark:text-white"
                        modules={{
                          toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            ['link', 'blockquote', 'code-block'],
                            ['clean']
                          ],
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={materialForm.isPreview}
                      onChange={(e) => setMaterialForm({ ...materialForm, isPreview: e.target.checked })}
                      className="w-4 h-4 rounded border-coffee-300 text-accent"
                    />
                    <span className="text-sm text-coffee-700 dark:text-coffee-300">Materi preview (gratis)</span>
                  </label>
                </div>

                <button
                  onClick={() => selectedChapter && addMaterialToChapter(selectedChapter)}
                  disabled={!materialForm.title.trim()}
                  className="w-full py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors disabled:opacity-50"
                >
                  <Plus size={16} className="inline mr-2" /> Tambah Materi
                </button>

                {/* Materials in selected chapter */}
                {selectedChapter && (chapters.find(ch => ch.id === selectedChapter)?.materials.length || 0) > 0 && (
                  <div className="mt-6 pt-6 border-t border-coffee-100 dark:border-charcoal-200">
                    <h4 className="text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-3">
                      Materi di Chapter Ini
                    </h4>
                    <div className="space-y-2">
                      {chapters.find(ch => ch.id === selectedChapter)?.materials.map((mat: any) => (
                        <div key={mat.id} className="flex items-center justify-between p-3 bg-coffee-50 dark:bg-charcoal-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            {mat.type === "video" && <Video size={16} className="text-blue-500" />}
                            {mat.type === "article" && <FileText size={16} className="text-emerald-500" />}
                            {mat.type === "pdf" && <FileDigit size={16} className="text-amber-500" />}
                            {mat.type === "quiz" && <HelpCircle size={16} className="text-purple-500" />}
                            <span className="text-sm text-coffee-700 dark:text-white">{mat.title}</span>
                            {mat.isPreview && (
                              <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded">Preview</span>
                            )}
                          </div>
                          <button 
                            onClick={() => deleteMaterial(selectedChapter, mat.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Step 4: Review */}
      {currentStep === 4 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
          <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5">
            <h3 className="text-base font-semibold text-coffee-800 dark:text-white mb-4">Review Kursus</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-coffee-50 dark:bg-charcoal-200 rounded-xl">
                <h4 className="text-sm font-medium text-coffee-500 mb-1">Judul</h4>
                <p className="text-base font-semibold text-coffee-800 dark:text-white">{basicInfo.title || "-"}</p>
              </div>
              <div className="p-4 bg-coffee-50 dark:bg-charcoal-200 rounded-xl">
                <h4 className="text-sm font-medium text-coffee-500 mb-1">Kategori / Level</h4>
                <p className="text-base text-coffee-700 dark:text-white">{basicInfo.category} • {basicInfo.level}</p>
              </div>
              <div className="p-4 bg-coffee-50 dark:bg-charcoal-200 rounded-xl">
                <h4 className="text-sm font-medium text-coffee-500 mb-1">Harga</h4>
                <p className="text-base font-semibold text-coffee-800 dark:text-white">
                  {basicInfo.isFree ? "GRATIS" : `Rp ${basicInfo.price.toLocaleString("id-ID")}`}
                </p>
              </div>
              <div className="p-4 bg-coffee-50 dark:bg-charcoal-200 rounded-xl">
                <h4 className="text-sm font-medium text-coffee-500 mb-1">Chapters & Materi</h4>
                <p className="text-base text-coffee-700 dark:text-white">
                  {chapters.length} chapters, {chapters.reduce((acc, ch) => acc + ch.materials.length, 0)} materi
                </p>
              </div>
              {chapters.map((ch, idx) => (
                <div key={ch.id} className="p-3 bg-coffee-50 dark:bg-charcoal-200 rounded-lg ml-4">
                  <p className="text-sm font-medium text-coffee-700 dark:text-white">Chapter {idx + 1}: {ch.title}</p>
                  <p className="text-xs text-coffee-500 ml-4">{ch.materials.length} materi</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                ⚠️ Setelah submit, kursus akan masuk ke proses review oleh admin sebelum dipublikasikan.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-coffee-600 dark:text-coffee-300 hover:bg-coffee-50 rounded-xl transition-colors disabled:opacity-50"
        >
          <ChevronLeft size={16} /> Sebelumnya
        </button>
        
        {currentStep < 4 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors"
          >
            Selanjutnya <ChevronRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
          >
            <Check size={16} /> Submit Kursus
          </button>
        )}
      </div>
    </div>
  );
}