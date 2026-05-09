"use client";

import { motion } from "framer-motion";
import { Star, BookOpen, Users } from "lucide-react";
import { mentors } from "@/lib/mock-data";

export default function MentorSection() {
  return (
    <section className="py-20 lg:py-24 bg-coffee-50/50 dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl lg:text-4xl font-bold text-coffee-800 dark:text-white mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Mentor Berpengalaman
          </h2>
          <p className="text-coffee-500 dark:text-coffee-400 max-w-xl mx-auto">
            Belajar langsung dari praktisi industri yang sudah berpengalaman bertahun-tahun
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, i) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-6 text-center hover:shadow-sm hover:border-coffee-200 dark:hover:border-charcoal-300 transition-all duration-300"
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-coffee-100 to-coffee-200 dark:from-charcoal-200 dark:to-charcoal-300 flex items-center justify-center text-xl font-bold text-coffee-500 dark:text-coffee-300">
                {mentor.name.split(" ").map(n => n[0]).join("")}
              </div>

              <h3 className="text-base font-semibold text-coffee-800 dark:text-white mb-1">
                {mentor.name}
              </h3>
              <p className="text-xs text-coffee-400 dark:text-coffee-500 mb-4">
                {mentor.role}
              </p>

              <div className="flex items-center justify-center gap-3 text-xs text-coffee-500 dark:text-coffee-400">
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  {mentor.rating}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={12} />
                  {mentor.courseCount}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {(mentor.studentCount / 1000).toFixed(1)}k
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
