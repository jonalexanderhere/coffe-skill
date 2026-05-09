"use client";

import { motion } from "framer-motion";
import { Award, Coffee, CheckCircle, Star } from "lucide-react";

interface CertificateTemplateProps {
  recipientName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
  certificateId: string;
  grade?: string;
}

export default function CertificateTemplate({
  recipientName,
  courseName,
  completionDate,
  instructorName,
  certificateId,
  grade,
}: CertificateTemplateProps) {
  return (
    <motion.div
      id={`cert-template-${certificateId}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Outer decorative frame */}
      <div className="relative bg-gradient-to-br from-charcoal-light via-charcoal to-charcoal-light rounded-2xl p-[3px]">
        {/* Inner frame */}
        <div className="relative bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal rounded-xl p-1">
          {/* Certificate content */}
          <div className="relative bg-gradient-to-br from-charcoal via-coffee-900/50 to-charcoal rounded-lg p-8 lg:p-12 text-center overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent/30 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent/30 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-accent/30 rounded-br-lg" />

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-accent blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-emerald-500 blur-3xl" />
            </div>

            {/* Header */}
            <div className="relative z-10 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                  <Coffee size={24} className="text-accent" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-lg font-bold text-white tracking-wider" style={{ fontFamily: "var(--font-poppins)" }}>
                  COFFEE
                </span>
                <span className="text-lg font-bold text-accent tracking-wider" style={{ fontFamily: "var(--font-poppins)" }}>
                  SKILL
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 text-coffee-400 text-xs">
                <CheckCircle size={12} />
                <span>Liwa Technology Excellence Community</span>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="relative z-10 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award size={20} className="text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-[0.3em]">
                  Certificate of Completion
                </span>
                <Award size={20} className="text-accent" />
              </div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
            </div>

            {/* This certifies that */}
            <p className="relative z-10 text-coffee-400 text-sm mb-4">
              This is to certify that
            </p>

            {/* Recipient Name */}
            <h2 className="relative z-10 text-3xl lg:text-4xl font-bold text-white mb-4 tracking-wide" style={{ fontFamily: "var(--font-poppins)" }}>
              {recipientName}
            </h2>

            {/* Has completed */}
            <p className="relative z-10 text-coffee-400 text-sm mb-4">
              has successfully completed the course
            </p>

            {/* Course Name */}
            <h3 className="relative z-10 text-xl lg:text-2xl font-semibold text-accent mb-6 leading-snug" style={{ fontFamily: "var(--font-poppins)" }}>
              {courseName}
            </h3>

            {/* Grade badge */}
            {grade && (
              <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6">
                <Star size={14} className="text-accent fill-accent" />
                <span className="text-sm font-semibold text-accent">Grade: {grade}</span>
              </div>
            )}

            {/* Date and Instructor */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 pt-8 border-t border-charcoal-300/30">
              <div className="text-center">
                <p className="text-xs text-coffee-500 mb-1">Date of Completion</p>
                <p className="text-sm font-medium text-coffee-200">{completionDate}</p>
              </div>
              <div className="w-px h-10 bg-charcoal-300/30 hidden sm:block" />
              <div className="text-center">
                <p className="text-xs text-coffee-500 mb-1">Instructor</p>
                <p className="text-sm font-medium text-coffee-200">{instructorName}</p>
              </div>
            </div>

            {/* Certificate ID */}
            <div className="relative z-10 mt-6 pt-4 border-t border-charcoal-300/20">
              <p className="text-[10px] text-coffee-500">
                Certificate ID: {certificateId}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}