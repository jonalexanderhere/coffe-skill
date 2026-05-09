"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Calendar, BookOpen, X, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CertificateTemplate from "@/components/shared/CertificateTemplate";
import { useAuth, ProtectedRoute } from "@/lib/auth-context";
import { useEnrollmentStore, useCourseStore } from "@/lib/store";

export default function CertificatePage() {
  const { user } = useAuth();
  const { getEnrollmentsByUser } = useEnrollmentStore();
  const { getCourseById } = useCourseStore();
  const [selectedCert, setSelectedCert] = useState<any>(null);
  
  const userEnrollments = user ? getEnrollmentsByUser(user.id) : [];
  const certificates = userEnrollments
    .filter(e => e.certificateIssued)
    .map(e => {
      const course = getCourseById(e.courseId);
      return {
        id: e.id,
        recipientName: user?.name || "Student",
        course: course?.title || "Unknown Course",
        date: e.enrolledAt, // Using enrollment date as placeholder for completion date
        grade: "A", // Default grade
        instructor: course?.mentorName || "CoffeeSkill Mentor"
      };
    });

  const handleDownload = async (cert: any) => {
    const { default: html2canvas } = await import("html2canvas");
    const { default: jsPDF } = await import("jspdf");
    
    // We need to render the template to capture it
    const element = document.getElementById(`cert-template-${cert.id}`);
    if (!element) {
      alert("Template sertifikat tidak ditemukan! Sedang menyiapkan...");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 3, // Even higher quality for printing
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });
      
      const imgWidth = 297; // A4 Landscape
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      pdf.save(`Sertifikat-${cert.course.replace(/\s+/g, "-")}.pdf`);
      
      alert("Sertifikat berhasil diunduh!");
    } catch (error) {
      console.error("Download error:", error);
      alert("Gagal mengunduh sertifikat. Silakan coba lagi.");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["student", "mentor", "superadmin"]}>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-charcoal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-poppins)" }}>Sertifikat Saya</h1>
            <p className="text-coffee-400">Koleksi sertifikat digital Anda dari kursus yang telah diselesaikan</p>
          </motion.div>

          {certificates.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-charcoal-light rounded-2xl border border-charcoal-200 overflow-hidden hover:border-accent/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-charcoal via-coffee-900/30 to-charcoal p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30 mb-3">
                      <span className="text-lg font-bold text-accent">CS</span>
                    </div>
                    <p className="text-[10px] font-semibold text-accent uppercase tracking-wider mb-2">Certificate of Completion</p>
                    <p className="text-sm font-bold text-white leading-tight">{cert.course}</p>
                    <p className="text-xs text-coffee-400 mt-2">CoffeeSkill Platform</p>
                    <div className="absolute top-3 right-3 px-2 py-0.5 text-xs font-bold text-accent bg-charcoal rounded-md border border-accent/30">
                      {cert.grade}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-coffee-400 mb-4">
                      <span className="flex items-center gap-1"><Calendar size={12} />{cert.date}</span>
                      <span className="flex items-center gap-1"><BookOpen size={12} />{cert.instructor}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={async (e) => { 
                          e.stopPropagation(); 
                          setSelectedCert(cert);
                          // Wait for React to render the hidden template
                          setTimeout(() => handleDownload(cert), 500);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors"
                      >
                        <Download size={14} /> Download
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); }}
                        className="px-4 py-2.5 text-xs font-medium text-coffee-400 border border-charcoal-200 rounded-xl hover:bg-charcoal-200 transition-colors"
                      >
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-charcoal-light rounded-3xl border border-charcoal-200">
              <Search size={40} className="mx-auto text-coffee-200 dark:text-charcoal-300 mb-4" />
              <p className="text-white font-medium">Belum ada sertifikat</p>
              <p className="text-sm text-coffee-400 mt-1">Selesaikan kursus untuk mendapatkan sertifikat resmi</p>
              <Link href="/explore" className="inline-block mt-6 px-6 py-2.5 text-sm font-semibold text-white bg-accent rounded-xl">
                Cari Kursus
              </Link>
            </div>
          )}
        </div>

        {/* Hidden Capture Area */}
        <div className="fixed -left-[9999px] top-0 opacity-100 pointer-events-none">
          {selectedCert && (
            <div>
              <CertificateTemplate
                recipientName={selectedCert.recipientName}
                courseName={selectedCert.course}
                completionDate={selectedCert.date}
                instructorName={selectedCert.instructor}
                certificateId={selectedCert.id}
                grade={selectedCert.grade}
              />
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-accent transition-colors"
              >
                <X size={24} />
              </button>
              <CertificateTemplate
                recipientName={selectedCert.recipientName}
                courseName={selectedCert.course}
                completionDate={selectedCert.date}
                instructorName={selectedCert.instructor}
                certificateId={selectedCert.id}
                grade={selectedCert.grade}
              />
              <div className="flex justify-center gap-3 mt-6">
                <button 
                  onClick={() => handleDownload(selectedCert)}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors"
                >
                  <Download size={16} /> Download Certificate
                </button>
                <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-charcoal-light border border-charcoal-200 hover:bg-charcoal-200 rounded-xl transition-colors">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </ProtectedRoute>
  );
}
