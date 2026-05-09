"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useFAQStore } from "@/lib/store";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faqs } = useFAQStore();

  if (faqs.length === 0) {
    return null; // Don't show the section if no FAQs
  }

  return (
    <section id="faq" className="py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Pertanyaan Umum
          </h2>
          <p className="text-coffee-500 dark:text-coffee-400 max-w-xl mx-auto">
            Jawaban untuk pertanyaan yang sering diajukan tentang CoffeeSkill
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-charcoal-light rounded-xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-sm font-semibold text-coffee-700 dark:text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-coffee-400 shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-sm text-coffee-500 dark:text-coffee-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
