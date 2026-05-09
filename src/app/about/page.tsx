"use client";

import { motion } from "framer-motion";
import { Target, Heart, Coffee, Users, MapPin, Award, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TeamSection from "@/components/about/TeamSection";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-accent bg-accent-light dark:bg-accent/10 rounded-full mb-6">
              <Coffee size={12} />
              Dari Lampung Barat untuk Indonesia
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-coffee-800 dark:text-white mb-5" style={{ fontFamily: "var(--font-poppins)" }}>
              Tentang CoffeeSkill
            </h1>
            <p className="text-lg text-coffee-500 dark:text-coffee-400 leading-relaxed">
              Lahir dari semangat dataran tinggi Lampung Barat, CoffeeSkill hadir untuk menjembatani
              gap pendidikan teknologi di Indonesia. Seperti kopi robusta yang kaya rasa, kami percaya setiap
              orang berhak mendapatkan pendidikan berkualitas.
            </p>
          </motion.div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: Target, title: "Misi Kami", desc: "Menyediakan pendidikan teknologi berkualitas yang terjangkau dan mudah diakses oleh semua kalangan di Indonesia." },
              { icon: Heart, title: "Nilai Kami", desc: "Kualitas, inklusivitas, dan semangat komunitas. Kami percaya belajar bersama lebih baik dari belajar sendiri." },
              { icon: Award, title: "Visi Kami", desc: "Menjadi platform pembelajaran teknologi terdepan di Indonesia yang mencetak talenta digital berkualitas global." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-8 text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-accent-light dark:bg-accent/10 mb-4">
                  <item.icon size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-coffee-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-coffee-500 dark:text-coffee-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-coffee-800 dark:bg-charcoal-light rounded-3xl p-10 lg:p-14 mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "12.5k+", label: "Siswa Aktif" },
                { value: "200+", label: "Kursus Tersedia" },
                { value: "45+", label: "Mentor Expert" },
                { value: "94%", label: "Tingkat Kelulusan" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-poppins)" }}>{stat.value}</p>
                  <p className="text-sm text-coffee-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Origin Story */}
          <div className="max-w-3xl mx-auto mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-coffee-800 dark:text-white mb-4 text-center" style={{ fontFamily: "var(--font-poppins)" }}>
                Dari Dataran Tinggi ke Dunia Digital
              </h2>
              <div className="prose prose-sm text-coffee-600 dark:text-coffee-300 space-y-4 text-center">
                <p>
                  CoffeeSkill lahir dari sebuah ide sederhana di SMK Negeri 1 Liwa, Lampung Barat — sebuah
                  daerah yang dikenal dengan perkebunan kopi robusta terbaiknya. Kami percaya bahwa seperti kopi
                  yang perlu proses untuk menghasilkan rasa terbaik, skill teknologi juga perlu dipupuk dan dikembangkan
                  dengan metode yang tepat.
                </p>
                <p>
                  Didukung oleh LTEC (Liwa Technology Excellence Community) SMK Negeri 1 Liwa, CoffeeSkill
                  berkembang menjadi platform yang digunakan oleh ribuan learner di seluruh Indonesia.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Team Section */}
          <TeamSection />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors">
              Bergabung Sekarang <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
