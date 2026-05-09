"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, Calendar, BookOpen, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CertificateTemplate from "@/components/shared/CertificateTemplate";

const certificates = [
  { id: "CS-2026-001", recipientName: "Ghifari Azhar", course: "Full-Stack Web Development dengan Next.js", date: "15 April 2026", grade: "A", instructor: "Ahmad Fauzan" },
  { id: "CS-2026-002", recipientName: "Ghifari Azhar", course: "UI/UX Design Mastery dengan Figma", date: "20 Maret 2026", grade: "A+", instructor: "Rizky Pratama" },
  { id: "CS-2026-003", recipientName: "Ghifari Azhar", course: "Python untuk Data Science & AI", date: "10 Februari 2026", grade: "B+", instructor: "Sari Dewi" },
  { id: "CS-2026-004", recipientName: "Ghifari Azhar", course: "Cyber Security Fundamentals", date: "5 Januari 2026", grade: "A", instructor: "Fajar Hidayat" },
];

export default function CertificatePage() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-charcoal">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-poppins)" }}>Sertifikat Saya</h1>
            <p className="text-coffee-400">Koleksi sertifikat digital Anda dari kursus yang telah diselesaikan</p>
          </motion.div>

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
                {/* Certificate Preview */}
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

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-coffee-400 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} />{cert.date}</span>
                    <span className="flex items-center gap-1"><BookOpen size={12} />{cert.instructor}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
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
        </div>
      </main>

      {/* Certificate Modal */}
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
                <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors">
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
    </>
  );
}
