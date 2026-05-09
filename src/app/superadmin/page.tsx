"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, DollarSign, Activity, ArrowUpRight, Search, Filter, MoreVertical, Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/lib/store";
import { useCourseStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function SuperAdminOverviewPage() {
  const { users } = useUserStore();
  const { courses } = useCourseStore();

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalCourses: courses.length,
    publishedCourses: courses.filter(c => c.status === 'published').length,
    pendingCourses: courses.filter(c => c.status === 'pending_review').length,
    totalMentors: users.filter(u => u.role === 'mentor').length,
    pendingMentors: users.filter(u => u.role === 'mentor' && u.status === 'pending').length,
    totalRevenue: 450000000,
  };

  const recentUsers = users.slice(0, 5);
  const pendingCourses = courses.filter(c => c.status === 'pending_review');
  const pendingMentors = users.filter(u => u.role === 'mentor' && u.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
            Dashboard Super Admin
          </h1>
          <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
            Kelola seluruh aspek platform CoffeeSkill
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-coffee-500">
          <span>Periode:</span>
          <select className="bg-transparent font-medium text-coffee-800 dark:text-white outline-none cursor-pointer">
            <option>Bulan Ini</option>
            <option>Bulan Lalu</option>
            <option>Tahun Ini</option>
          </select>
        </div>
      </div>

      {/* Alert for pending items */}
      {(pendingCourses.length > 0 || pendingMentors.length > 0) && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 flex items-center gap-4"
        >
          <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/20">
            <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              Ada yang perlu disetujui
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-500">
              {pendingCourses.length} kursus dan {pendingMentors.length} mentor menunggu persetujuan
            </p>
          </div>
          <Link 
            href="/superadmin/courses" 
            className="text-xs font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center gap-1"
          >
            Lihat Sekarang <ArrowUpRight size={12} />
          </Link>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats.totalUsers.toLocaleString(), icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", trend: "+12%" },
          { label: "Total Kursus", value: stats.totalCourses, icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", trend: "+3%" },
          { label: "Total Pendapatan", value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: "text-accent", bg: "bg-accent/10", trend: "+24%" },
          { label: "Active Users", value: stats.activeUsers.toLocaleString(), icon: Activity, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10", trend: "+8%" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
                <ArrowUpRight size={12} /> {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-coffee-800 dark:text-white mb-1">{stat.value}</p>
            <p className="text-xs text-coffee-500 dark:text-coffee-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-charcoal-light rounded-xl border border-coffee-100 dark:border-charcoal-200 p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
            <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-coffee-800 dark:text-white">{stats.publishedCourses}</p>
            <p className="text-xs text-coffee-500">Kursus Published</p>
          </div>
        </div>
        <div className="bg-white dark:bg-charcoal-light rounded-xl border border-coffee-100 dark:border-charcoal-200 p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/20">
            <Clock size={18} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-coffee-800 dark:text-white">{stats.pendingCourses}</p>
            <p className="text-xs text-coffee-500">Menunggu Review</p>
          </div>
        </div>
        <div className="bg-white dark:bg-charcoal-light rounded-xl border border-coffee-100 dark:border-charcoal-200 p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/20">
            <Shield size={18} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-coffee-800 dark:text-white">{stats.totalMentors}</p>
            <p className="text-xs text-coffee-500">Total Mentor</p>
          </div>
        </div>
        <div className="bg-white dark:bg-charcoal-light rounded-xl border border-coffee-100 dark:border-charcoal-200 p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/20">
            <Users size={18} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-coffee-800 dark:text-white">{stats.pendingMentors}</p>
            <p className="text-xs text-coffee-500">Mentor Pending</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Course Approvals */}
        <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
          <div className="p-5 border-b border-coffee-100 dark:border-charcoal-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-coffee-800 dark:text-white">Kursus Menunggu Persetujuan</h2>
            <Link href="/superadmin/courses" className="text-xs font-medium text-accent hover:text-accent-hover">Lihat Semua</Link>
          </div>
          <div className="divide-y divide-coffee-100 dark:divide-charcoal-200">
            {pendingCourses.length === 0 ? (
              <div className="p-8 text-center text-coffee-400">
                <CheckCircle size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Semua kursus sudah diproses</p>
              </div>
            ) : (
              pendingCourses.slice(0, 4).map((course) => (
                <div key={course.id} className="p-4 hover:bg-coffee-50/50 dark:hover:bg-charcoal-200/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-coffee-100 dark:bg-charcoal-300 flex items-center justify-center shrink-0">
                      <BookOpen size={18} className="text-coffee-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-coffee-800 dark:text-white truncate">{course.title}</p>
                      <p className="text-xs text-coffee-400 mt-0.5">oleh {course.mentorName}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 rounded-md">
                          Pending Review
                        </span>
                        <span className="text-[10px] text-coffee-400">{course.lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Mentor Approvals */}
        <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
          <div className="p-5 border-b border-coffee-100 dark:border-charcoal-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-coffee-800 dark:text-white">Mentor Menunggu Persetujuan</h2>
            <Link href="/superadmin/users" className="text-xs font-medium text-accent hover:text-accent-hover">Lihat Semua</Link>
          </div>
          <div className="divide-y divide-coffee-100 dark:divide-charcoal-200">
            {pendingMentors.length === 0 ? (
              <div className="p-8 text-center text-coffee-400">
                <CheckCircle size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Semua mentor sudah diverifikasi</p>
              </div>
            ) : (
              pendingMentors.slice(0, 4).map((mentor) => (
                <div key={mentor.id} className="p-4 hover:bg-coffee-50/50 dark:hover:bg-charcoal-200/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-coffee-100 dark:bg-charcoal-300 flex items-center justify-center text-sm font-bold text-coffee-600 shrink-0">
                      {mentor.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-coffee-800 dark:text-white">{mentor.name}</p>
                      <p className="text-xs text-coffee-400 mt-0.5">{mentor.email}</p>
                      {mentor.bio && (
                        <p className="text-xs text-coffee-500 mt-1 truncate">{mentor.bio}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 rounded-md">
                          Pending Approval
                        </span>
                        <span className="text-[10px] text-coffee-400">Bergabung {new Date(mentor.joinedDate).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
        <div className="p-5 border-b border-coffee-100 dark:border-charcoal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-coffee-800 dark:text-white">User Terbaru</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" />
              <input type="text" placeholder="Cari user..." className="w-full pl-9 pr-4 py-2 text-sm bg-coffee-50 dark:bg-charcoal border border-transparent rounded-lg outline-none" />
            </div>
            <button className="p-2 text-coffee-500 bg-coffee-50 dark:bg-charcoal rounded-lg hover:bg-coffee-100 transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-coffee-50/50 dark:bg-charcoal-200/50 text-coffee-500 dark:text-coffee-400">
              <tr>
                <th className="px-6 py-4 font-medium">Pengguna</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tgl Gabung</th>
                <th className="px-6 py-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-100 dark:divide-charcoal-200">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-coffee-50/50 dark:hover:bg-charcoal-200/50 transition-colors text-coffee-700 dark:text-coffee-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-coffee-100 dark:bg-charcoal-300 flex items-center justify-center text-xs font-bold text-coffee-600">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-coffee-800 dark:text-white">{user.name}</p>
                        <p className="text-xs text-coffee-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                      user.role === 'superadmin' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300' :
                      user.role === 'mentor' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' :
                      'bg-coffee-100 text-coffee-700 dark:bg-charcoal-300 dark:text-coffee-300'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 ${user.status === 'active' ? 'text-emerald-600' : user.status === 'pending' ? 'text-amber-600' : 'text-red-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        user.status === 'active' ? 'bg-emerald-500' : 
                        user.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      {user.status === 'active' ? 'Aktif' : user.status === 'pending' ? 'Pending' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-coffee-500">{new Date(user.joinedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td className="px-6 py-4">
                    <Link href={`/superadmin/users?id=${user.id}`} className="text-coffee-400 hover:text-coffee-600">
                      <MoreVertical size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}