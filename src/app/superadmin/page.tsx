"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, DollarSign, Activity, ArrowUpRight, Search, Filter, MoreVertical, Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useUserStore, useCourseStore, useEnrollmentStore, useTransactionStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function SuperAdminOverviewPage() {
  const { users } = useUserStore();
  const { courses } = useCourseStore();
  const { enrollments } = useEnrollmentStore();
  const { transactions } = useTransactionStore();

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalCourses: courses.length,
    publishedCourses: courses.filter(c => c.status === 'published').length,
    pendingCourses: courses.filter(c => c.status === 'pending_review').length,
    totalMentors: users.filter(u => u.role === 'mentor').length,
    pendingMentors: users.filter(u => u.role === 'mentor' && u.status === 'pending').length,
    totalRevenue: transactions
      .filter(t => t.status === 'completed' && t.type === 'purchase')
      .reduce((acc, t) => acc + t.amount, 0),
  };

  const recentUsers = users.slice(0, 5);
  const pendingCourses = courses.filter(c => c.status === 'pending_review');
  const pendingMentors = users.filter(u => u.role === 'mentor' && u.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header with Search & Command Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-bold text-coffee-800 dark:text-white tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
            Platform <span className="text-accent">Control Center</span>
          </h1>
          <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
            Manajemen infrastruktur, user, dan pertumbuhan konten CoffeeSkill
          </p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400" />
            <input 
              type="text" 
              placeholder="Cari user, kursus, atau transaksi..." 
              className="pl-12 pr-6 py-3 bg-white dark:bg-charcoal-light border border-coffee-100 dark:border-charcoal-200 rounded-2xl text-sm focus:outline-none focus:border-accent transition-all w-full md:w-80 shadow-sm"
            />
          </div>
          <button className="p-3 bg-white dark:bg-charcoal-light border border-coffee-100 dark:border-charcoal-200 rounded-2xl text-coffee-500 hover:text-accent transition-colors shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Critical System Alerts */}
      {(pendingCourses.length > 0 || pendingMentors.length > 0) && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 blur-xl group-hover:opacity-75 transition-opacity" />
          <div className="relative bg-white dark:bg-charcoal-light border-2 border-amber-500/30 dark:border-amber-500/20 rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-amber-500/5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0 animate-pulse">
              <AlertTriangle size={28} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-black text-amber-800 dark:text-amber-300 uppercase tracking-tight">Persetujuan Tertunda</h3>
              <p className="text-sm text-amber-700/70 dark:text-amber-500/70 mt-0.5">
                Terdapat <span className="font-bold">{pendingCourses.length} kursus baru</span> dan <span className="font-bold">{pendingMentors.length} pendaftaran mentor</span> yang memerlukan verifikasi admin.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link 
                href="/superadmin/mentors" 
                className="flex-1 md:flex-none px-6 py-3 bg-amber-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 text-center"
              >
                Review Mentor
              </Link>
              <Link 
                href="/superadmin/courses" 
                className="flex-1 md:flex-none px-6 py-3 bg-white dark:bg-charcoal border border-amber-500/30 text-amber-600 dark:text-amber-400 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-amber-50 transition-all text-center"
              >
                Review Kursus
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Metrics Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Market Growth", value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: "from-accent to-accent-hover", trend: "+24.8%" },
          { label: "Active Nodes", value: stats.activeUsers.toLocaleString(), icon: Activity, color: "from-purple-500 to-indigo-600", trend: "+12.1%" },
          { label: "Total Inventory", value: stats.totalCourses, icon: BookOpen, color: "from-emerald-500 to-teal-600", trend: "+5.4%" },
          { label: "Community", value: stats.totalUsers.toLocaleString(), icon: Users, color: "from-blue-500 to-indigo-600", trend: "+18.2%" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white dark:bg-charcoal-light rounded-[2rem] border border-coffee-100 dark:border-charcoal-200 p-8 overflow-hidden hover:shadow-2xl transition-all duration-500"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-bl-[4rem]`} />
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} p-3 shadow-lg shadow-black/5`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/10">
                <ArrowUpRight size={10} /> {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-coffee-800 dark:text-white tracking-tight">{stat.value}</p>
              <p className="text-[10px] font-black text-coffee-400 uppercase tracking-[0.2em] mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Course Queue */}
        <section className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-coffee-50 dark:border-charcoal-200 flex items-center justify-between bg-coffee-50/30 dark:bg-charcoal/30">
            <div>
              <h2 className="text-xl font-black text-coffee-800 dark:text-white tracking-tight">Antrian Kursus</h2>
              <p className="text-xs text-coffee-400 font-bold uppercase tracking-widest mt-1">Pending Review</p>
            </div>
            <Link href="/superadmin/courses" className="p-3 bg-white dark:bg-charcoal rounded-2xl text-accent hover:scale-110 transition-transform border border-coffee-100 dark:border-charcoal-200">
              <ArrowUpRight size={20} />
            </Link>
          </div>
          <div className="p-2">
            {pendingCourses.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-emerald-500" />
                </div>
                <p className="text-sm font-bold text-coffee-400">Semua kursus telah diverifikasi</p>
              </div>
            ) : (
              <div className="space-y-1">
                {pendingCourses.slice(0, 4).map((course) => (
                  <div key={course.id} className="p-6 hover:bg-coffee-50/50 dark:hover:bg-white/[0.02] rounded-[1.5rem] transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-charcoal flex items-center justify-center shrink-0 border border-coffee-100 dark:border-charcoal-200 group-hover:border-accent/30 transition-colors">
                        <BookOpen size={24} className="text-coffee-300 group-hover:text-accent transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-coffee-800 dark:text-white truncate">{course.title}</h4>
                        <p className="text-xs text-coffee-400 mt-1">oleh <span className="text-coffee-600 dark:text-coffee-300">{course.mentorName}</span></p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-[9px] px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black uppercase tracking-widest rounded-lg border border-amber-500/10">
                            Review Required
                          </span>
                          <span className="text-[9px] font-black text-coffee-400 uppercase tracking-widest">{course.lessons} lessons</span>
                        </div>
                      </div>
                      <button className="p-2 text-coffee-400 opacity-0 group-hover:opacity-100 transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Mentor Queue */}
        <section className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-coffee-50 dark:border-charcoal-200 flex items-center justify-between bg-coffee-50/30 dark:bg-charcoal/30">
            <div>
              <h2 className="text-xl font-black text-coffee-800 dark:text-white tracking-tight">Verifikasi Mentor</h2>
              <p className="text-xs text-coffee-400 font-bold uppercase tracking-widest mt-1">Identity Check</p>
            </div>
            <Link href="/superadmin/mentors" className="p-3 bg-white dark:bg-charcoal rounded-2xl text-accent hover:scale-110 transition-transform border border-coffee-100 dark:border-charcoal-200">
              <ArrowUpRight size={20} />
            </Link>
          </div>
          <div className="p-2">
            {pendingMentors.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} className="text-blue-500" />
                </div>
                <p className="text-sm font-bold text-coffee-400">Database mentor bersih</p>
              </div>
            ) : (
              <div className="space-y-1">
                {pendingMentors.slice(0, 4).map((mentor) => (
                  <div key={mentor.id} className="p-6 hover:bg-coffee-50/50 dark:hover:bg-white/[0.02] rounded-[1.5rem] transition-all group">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-full bg-white dark:bg-charcoal flex items-center justify-center shrink-0 border-2 border-coffee-50 dark:border-charcoal-200 group-hover:border-accent/30 transition-all font-black text-accent text-lg">
                        {mentor.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-coffee-800 dark:text-white">{mentor.name}</h4>
                        <p className="text-xs text-coffee-400 mt-1">{mentor.email}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-[9px] px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest rounded-lg border border-blue-500/10">
                            Verification Pending
                          </span>
                          <span className="text-[9px] font-black text-coffee-400 uppercase tracking-widest">Joined {new Date(mentor.joinedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button className="p-2 text-coffee-400 opacity-0 group-hover:opacity-100 transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Global User Intelligence */}
      <section className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-coffee-100 dark:border-charcoal-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-black text-coffee-800 dark:text-white tracking-tight">Pengguna Terbaru</h2>
            <p className="text-xs text-coffee-400 font-bold uppercase tracking-widest mt-1">Real-time Directory Feed</p>
          </div>
          <Link href="/superadmin/users" className="px-6 py-3 bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-coffee-600 dark:text-coffee-400 hover:bg-coffee-100 transition-all">
            Lihat Database Lengkap
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-coffee-50/30 dark:bg-charcoal/30 text-coffee-500 dark:text-coffee-400 border-b border-coffee-50 dark:border-charcoal-200">
                <th className="px-8 py-5 font-black uppercase tracking-[0.2em] text-[10px]">Informasi User</th>
                <th className="px-8 py-5 font-black uppercase tracking-[0.2em] text-[10px]">Platform Role</th>
                <th className="px-8 py-5 font-black uppercase tracking-[0.2em] text-[10px]">Access Status</th>
                <th className="px-8 py-5 font-black uppercase tracking-[0.2em] text-[10px]">Joined Date</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-50 dark:divide-charcoal-200/50">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-coffee-50/30 dark:hover:bg-white/[0.01] transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-coffee-50 dark:bg-charcoal flex items-center justify-center text-xs font-black text-accent border border-coffee-100 dark:border-charcoal-200">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-coffee-800 dark:text-white group-hover:text-accent transition-colors">{user.name}</p>
                        <p className="text-xs text-coffee-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg border ${
                      user.role === 'superadmin' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/10' :
                      user.role === 'mentor' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/10' :
                      'bg-coffee-100 text-coffee-600 dark:bg-charcoal-300 dark:text-coffee-400 border-transparent'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        user.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 
                        user.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      <span className="text-[10px] font-bold text-coffee-700 dark:text-coffee-300 uppercase tracking-widest">
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs text-coffee-500 font-medium">
                    {new Date(user.joinedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-coffee-400 hover:text-accent transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}