"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Award, 
  Globe,
  CheckCircle2,
  Lock,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BecomeMentorPage() {
  const { user, updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleApply = async () => {
    if (!user) {
      router.push("/login?redirect=/become-mentor");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call to upgrade user
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update role and status
      updateUser({
        role: 'mentor',
        status: 'pending'
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to apply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-20 min-h-screen bg-white dark:bg-charcoal flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl w-full mx-4 text-center p-12 bg-white dark:bg-charcoal-light rounded-[3rem] border border-coffee-100 dark:border-charcoal-200 shadow-2xl"
          >
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={40} className="text-emerald-500" />
            </div>
            <h1 className="text-3xl font-black text-coffee-800 dark:text-white mb-4">Pendaftaran Terkirim!</h1>
            <p className="text-coffee-500 dark:text-coffee-400 mb-10 leading-relaxed">
              Terima kasih telah bergabung dengan komunitas mentor CoffeeSkill. Tim kami akan meninjau profil Anda dalam 1-2 hari kerja.
            </p>
            <button 
              onClick={() => router.push("/dashboard")}
              className="px-10 py-4 bg-accent text-white font-black rounded-2xl hover:bg-accent-hover transition-all"
            >
              Kembali ke Dashboard
            </button>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-white dark:bg-charcoal overflow-hidden">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center py-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-black uppercase tracking-widest text-accent mb-8">
                <Star size={14} /> Join the Expert Community
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-coffee-800 dark:text-white leading-[1.1] tracking-tight mb-8" style={{ fontFamily: "var(--font-poppins)" }}>
                Bagikan Ilmu, <br />
                <span className="text-accent">Bangun Karir</span> <br />
                Bersama CoffeeSkill.
              </h1>
              <p className="text-xl text-coffee-500 dark:text-coffee-400 leading-relaxed mb-10 max-w-lg">
                Jadilah bagian dari revolusi pendidikan teknologi. CoffeeSkill memberikan platform terbaik bagi para ahli untuk mengajar ribuan siswa di seluruh Indonesia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleApply}
                  disabled={isSubmitting}
                  className="px-10 py-5 bg-accent text-white rounded-[2rem] font-black text-lg hover:bg-accent-hover transition-all shadow-2xl shadow-accent/20 active:scale-95 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? "Memproses..." : "Daftar Jadi Mentor"}
                  <ArrowRight size={20} />
                </button>
                <div className="flex items-center gap-4 px-6 py-4 bg-coffee-50 dark:bg-charcoal-light rounded-[2rem] border border-coffee-100 dark:border-charcoal-200">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-charcoal-light bg-coffee-100 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i+50}`} alt="mentor" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-bold text-coffee-600 dark:text-coffee-300">
                    Join <span className="text-accent">200+</span> Other Mentors
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 grid grid-cols-2 gap-6">
                {[
                  { label: "Earnings", val: "10M+", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                  { label: "Students", val: "5k+", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
                  { label: "Rating", val: "4.9/5", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
                  { label: "Support", val: "24/7", icon: ShieldCheck, color: "text-purple-500", bg: "bg-purple-500/10" },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 shadow-xl shadow-coffee-950/5">
                    <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6`}>
                      <item.icon size={24} />
                    </div>
                    <h4 className="text-2xl font-black text-coffee-800 dark:text-white mb-1">{item.val}</h4>
                    <p className="text-[10px] font-black text-coffee-400 uppercase tracking-widest">{item.label}</p>
                  </div>
                ))}
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/10 rounded-full blur-[80px]" />
            </motion.div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="py-24 bg-coffee-50 dark:bg-surface-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black text-coffee-800 dark:text-white mb-4 tracking-tight">Mengapa Mengajar di CoffeeSkill?</h2>
              <p className="text-coffee-500 dark:text-coffee-400 max-w-2xl mx-auto">Kami menyediakan segala yang Anda butuhkan untuk sukses sebagai pengajar digital.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: "Sistem Bagi Hasil Adil", desc: "Dapatkan penghasilan kompetitif dengan sistem bagi hasil yang transparan dan otomatis.", icon: Zap },
                { title: "Full Creator Control", desc: "Anda memiliki kendali penuh atas materi, harga, dan cara Anda mengajar.", icon: Globe },
                { title: "Marketing Support", desc: "Kami bantu mempromosikan kursus Anda ke ribuan calon siswa di seluruh Indonesia.", icon: Award },
              ].map((benefit, i) => (
                <div key={i} className="group p-10 bg-white dark:bg-charcoal-light rounded-[3rem] border border-coffee-100 dark:border-charcoal-200 hover:border-accent/40 transition-all">
                  <div className="w-16 h-16 bg-accent/10 rounded-[2rem] flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform">
                    <benefit.icon size={32} />
                  </div>
                  <h3 className="text-xl font-black text-coffee-800 dark:text-white mb-4">{benefit.title}</h3>
                  <p className="text-coffee-500 dark:text-coffee-400 leading-relaxed text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-charcoal text-white rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <ShieldCheck size={120} />
              </div>
              <h3 className="text-3xl font-black mb-10 tracking-tight">Persyaratan Mentor</h3>
              <div className="space-y-6 mb-12">
                {[
                  "Memiliki pengalaman minimal 2 tahun di bidang terkait.",
                  "Mampu berkomunikasi dengan baik dan jelas.",
                  "Memiliki portofolio atau bukti keahlian yang nyata.",
                  "Berkomitmen untuk memberikan update materi secara berkala.",
                  "Siap menjawab pertanyaan siswa di forum diskusi."
                ].map((req, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                      <ChevronRight size={14} />
                    </div>
                    <p className="text-coffee-300 leading-relaxed">{req}</p>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleApply}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-12 py-5 bg-accent text-white rounded-2xl font-black text-lg hover:bg-accent-hover transition-all shadow-xl shadow-accent/30 active:scale-95"
              >
                {isSubmitting ? "Memproses..." : "Daftar Sekarang"}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
