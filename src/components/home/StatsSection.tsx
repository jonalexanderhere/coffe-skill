"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, BookOpen, Award, GraduationCap } from "lucide-react";
import { platformStats } from "@/lib/mock-data";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count >= 1000
        ? (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + "k"
        : count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    label: "Siswa Aktif",
    value: platformStats.students,
    suffix: "+",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    label: "Kursus Tersedia",
    value: platformStats.courses,
    suffix: "+",
    icon: BookOpen,
    color: "text-accent",
    bg: "bg-accent-light dark:bg-accent/10",
  },
  {
    label: "Mentor Expert",
    value: platformStats.mentors,
    suffix: "+",
    icon: GraduationCap,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    label: "Sertifikat Diterbitkan",
    value: platformStats.certificates,
    suffix: "+",
    icon: Award,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 lg:p-8 rounded-2xl bg-white dark:bg-charcoal-light border border-coffee-100 dark:border-charcoal-200"
            >
              <div className={`inline-flex p-3 rounded-xl ${stat.bg} mb-4`}>
                <stat.icon size={22} className={stat.color} />
              </div>
              <p className="text-3xl lg:text-4xl font-bold text-coffee-800 dark:text-white mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-coffee-400 dark:text-coffee-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
