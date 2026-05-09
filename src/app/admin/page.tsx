"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, DollarSign, Activity, ArrowUpRight, Search, Filter, MoreVertical } from "lucide-react";
import { adminStats, adminUsers } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Admin Overview
        </h1>
        <div className="flex items-center gap-2 text-sm text-coffee-500">
          <span>Periode:</span>
          <select className="bg-transparent font-medium text-coffee-800 dark:text-white outline-none">
            <option>Bulan Ini</option>
            <option>Bulan Lalu</option>
            <option>Tahun Ini</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: adminStats.totalUsers.toLocaleString(), icon: Users, color: "text-blue-500", trend: "+12%" },
          { label: "Total Kursus", value: adminStats.totalCourses, icon: BookOpen, color: "text-emerald-500", trend: "+3%" },
          { label: "Total Pendapatan", value: formatCurrency(adminStats.totalRevenue), icon: DollarSign, color: "text-accent", trend: "+24%" },
          { label: "Active Users", value: adminStats.activeUsers.toLocaleString(), icon: Activity, color: "text-purple-500", trend: "+8%" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl bg-coffee-50 dark:bg-charcoal-200 ${stat.color}`}>
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

      {/* User Table */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
        <div className="p-5 border-b border-coffee-100 dark:border-charcoal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-coffee-800 dark:text-white">Manajemen Pengguna Terakhir</h2>
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
                <th className="px-6 py-4 font-medium">Kursus</th>
                <th className="px-6 py-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-100 dark:divide-charcoal-200">
              {adminUsers.map((user) => (
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
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300' :
                      user.role === 'mentor' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300' :
                      'bg-coffee-100 text-coffee-700 dark:bg-charcoal-300 dark:text-coffee-300'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 ${user.status === 'active' ? 'text-emerald-600' : 'text-red-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-coffee-500">{new Date(user.joinDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td className="px-6 py-4">{user.coursesEnrolled}</td>
                  <td className="px-6 py-4">
                    <button className="text-coffee-400 hover:text-coffee-600">
                      <MoreVertical size={16} />
                    </button>
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
