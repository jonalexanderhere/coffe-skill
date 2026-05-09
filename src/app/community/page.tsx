"use client";

import { motion } from "framer-motion";
import { MessageCircle, Users, TrendingUp, Search, ThumbsUp, MessageSquare, Eye } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const threads = [
  { title: "Tips belajar Next.js untuk pemula", author: "Andi W.", category: "Web Dev", replies: 24, views: 340, likes: 18, time: "2 jam lalu" },
  { title: "Rekomendasi laptop untuk programming 2026", author: "Maya P.", category: "General", replies: 45, views: 890, likes: 32, time: "5 jam lalu" },
  { title: "Sharing pengalaman interview di startup", author: "Reno S.", category: "Career", replies: 38, views: 560, likes: 28, time: "1 hari lalu" },
  { title: "Bagaimana cara memulai karir Data Science?", author: "Lina M.", category: "Data Science", replies: 19, views: 280, likes: 15, time: "1 hari lalu" },
  { title: "Resources belajar UI/UX Design gratis", author: "Bagus P.", category: "Design", replies: 31, views: 420, likes: 22, time: "2 hari lalu" },
  { title: "Deploy project pertama ke Vercel", author: "Siti N.", category: "Web Dev", replies: 12, views: 180, likes: 9, time: "3 hari lalu" },
];

const categoryColors: Record<string, string> = {
  "Web Dev": "text-blue-500 bg-blue-50 dark:bg-blue-500/10",
  "General": "text-coffee-500 bg-coffee-50 dark:bg-coffee-500/10",
  "Career": "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
  "Data Science": "text-purple-500 bg-purple-50 dark:bg-purple-500/10",
  "Design": "text-amber-500 bg-amber-50 dark:bg-amber-500/10",
};

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-coffee-800 dark:text-white mb-2" style={{ fontFamily: "var(--font-poppins)" }}>Community</h1>
            <p className="text-coffee-500 dark:text-coffee-400">Diskusi, berbagi ilmu, dan terhubung dengan sesama learner</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Members", value: "12.5k", icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
              { label: "Diskusi", value: "3.2k", icon: MessageCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
              { label: "Topik Trending", value: "48", icon: TrendingUp, color: "text-accent", bg: "bg-accent-light dark:bg-accent/10" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5 text-center">
                <div className={`inline-flex p-2.5 rounded-xl ${stat.bg} mb-2`}><stat.icon size={18} className={stat.color} /></div>
                <p className="text-xl font-bold text-coffee-800 dark:text-white">{stat.value}</p>
                <p className="text-xs text-coffee-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400" />
            <input type="text" placeholder="Cari diskusi..." className="w-full pl-11 pr-4 py-3 text-sm bg-coffee-50 dark:bg-charcoal-light border border-coffee-100 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-400 focus:border-accent outline-none" />
          </div>

          {/* Threads */}
          <div className="space-y-3">
            {threads.map((thread, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-start gap-4 p-5 bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 hover:border-coffee-200 dark:hover:border-charcoal-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coffee-100 to-coffee-200 dark:from-charcoal-200 dark:to-charcoal-300 flex items-center justify-center text-xs font-bold text-coffee-500 dark:text-coffee-300 shrink-0">
                  {thread.author.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-md ${categoryColors[thread.category] || ""}`}>
                      {thread.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-coffee-800 dark:text-white group-hover:text-accent transition-colors">{thread.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-coffee-400">
                    <span>{thread.author}</span>
                    <span>{thread.time}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={11} />{thread.replies}</span>
                    <span className="flex items-center gap-1"><Eye size={11} />{thread.views}</span>
                    <span className="flex items-center gap-1"><ThumbsUp size={11} />{thread.likes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
