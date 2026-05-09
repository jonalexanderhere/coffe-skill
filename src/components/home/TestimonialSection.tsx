"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTestimonialStore } from "@/lib/store";

export default function TestimonialSection() {
  const { testimonials } = useTestimonialStore();

  if (testimonials.length === 0) {
    return null;
  }

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
            Kata Mereka
          </h2>
          <p className="text-coffee-500 dark:text-coffee-400 max-w-xl mx-auto">
            Cerita sukses dari para alumni CoffeeSkill yang sudah berkarir di industri teknologi
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-6"
            >
              <Quote size={20} className="text-coffee-200 dark:text-charcoal-200 mb-4" />

              <p className="text-sm text-coffee-600 dark:text-coffee-300 leading-relaxed mb-5">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={12}
                    className={
                      idx < testimonial.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-coffee-200 dark:text-charcoal-300"
                    }
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-coffee-50 dark:border-charcoal-200">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-coffee-100 to-coffee-200 dark:from-charcoal-200 dark:to-charcoal-300 flex items-center justify-center text-xs font-bold text-coffee-500 dark:text-coffee-300">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-coffee-700 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-coffee-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
