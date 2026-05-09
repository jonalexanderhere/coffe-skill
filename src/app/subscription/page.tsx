"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatCurrency } from "@/lib/utils";

const plans = [
  {
    name: "Basic",
    price: 0,
    description: "Sempurna untuk pemula yang ingin mulai belajar.",
    icon: Star,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    features: [
      "Akses ke 50+ kursus gratis",
      "Sertifikat penyelesaian dasar",
      "Akses forum komunitas",
      "Update materi reguler",
    ],
    buttonText: "Mulai Gratis",
    popular: false,
  },
  {
    name: "Pro",
    price: 99000,
    period: "/bulan",
    description: "Untuk profesional yang ingin meningkatkan karir.",
    icon: Zap,
    color: "text-accent",
    bg: "bg-accent-light dark:bg-accent/10",
    features: [
      "Akses SEMUA kursus premium",
      "Sertifikat terverifikasi industri",
      "Mentoring 1-on-1 (1x/bulan)",
      "Akses eksklusif ke job board",
      "Download materi offline",
      "Prioritas support",
    ],
    buttonText: "Pilih Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 299000,
    period: "/bulan",
    description: "Solusi lengkap untuk tim dan perusahaan.",
    icon: Crown,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    features: [
      "Segala fitur di paket Pro",
      "Mentoring unlimited",
      "Dashboard analitik tim",
      "Custom learning path",
      "Dedicated account manager",
      "Akses API (coming soon)",
    ],
    buttonText: "Hubungi Sales",
    popular: false,
  },
];

export default function SubscriptionPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen bg-white dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 max-w-2xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-coffee-800 dark:text-white mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
              Investasi Terbaik untuk Masa Depan Anda
            </h1>
            <p className="text-coffee-500 dark:text-coffee-400 text-lg">
              Pilih paket belajar yang sesuai dengan kebutuhan dan target karir Anda. Batalkan kapan saja.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white dark:bg-charcoal-light rounded-3xl border p-8 ${
                  plan.popular 
                    ? "border-accent shadow-lg shadow-accent/5 dark:shadow-none scale-105 z-10" 
                    : "border-coffee-100 dark:border-charcoal-200 hover:border-coffee-200 dark:hover:border-charcoal-300"
                } transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold text-white bg-accent rounded-full shadow-sm">
                    Paling Populer
                  </div>
                )}
                
                <div className={`inline-flex p-3 rounded-xl ${plan.bg} mb-5`}>
                  <plan.icon size={24} className={plan.color} />
                </div>
                
                <h3 className="text-xl font-bold text-coffee-800 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-coffee-500 dark:text-coffee-400 mb-6 min-h-[40px]">{plan.description}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-bold text-coffee-800 dark:text-white">Gratis</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-coffee-800 dark:text-white">{formatCurrency(plan.price)}</span>
                      <span className="text-coffee-500 dark:text-coffee-400">{plan.period}</span>
                    </>
                  )}
                </div>
                
                <button 
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold mb-8 transition-colors ${
                    plan.popular
                      ? "bg-accent text-white hover:bg-accent-hover"
                      : "bg-coffee-50 dark:bg-charcoal-200 text-coffee-800 dark:text-white hover:bg-coffee-100 dark:hover:bg-charcoal-300"
                  }`}
                >
                  {plan.buttonText}
                </button>
                
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-coffee-800 dark:text-white uppercase tracking-wider">Termasuk:</p>
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="p-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 shrink-0 mt-0.5">
                        <Check size={12} className="text-emerald-500" />
                      </div>
                      <span className="text-sm text-coffee-600 dark:text-coffee-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-coffee-500 dark:text-coffee-400 mb-4">Butuh bantuan memilih paket?</p>
            <button className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-hover transition-colors">
              Hubungi Tim Support <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
