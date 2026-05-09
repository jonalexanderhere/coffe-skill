"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Search, 
  Mail, 
  Calendar, 
  MoreVertical,
  Shield,
  ShieldAlert,
  UserCheck
} from "lucide-react";
import { useUserStore } from "@/lib/store";
import { User } from "@/lib/types";

export default function MentorApprovalPage() {
  const { users, updateUserStatus } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  
  const mentors = users.filter(u => u.role === 'mentor');
  const filteredMentors = mentors.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = mentors.filter(m => m.status === 'pending').length;

  const handleApprove = (id: string) => {
    updateUserStatus(id, 'active');
  };

  const handleReject = (id: string) => {
    updateUserStatus(id, 'suspended');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
            Manajemen Mentor
          </h1>
          <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
            Setujui atau tolak pengajuan pendaftaran mentor baru
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
              {pendingCount} Menunggu Persetujuan
            </p>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-charcoal-light p-6 rounded-3xl border border-coffee-100 dark:border-charcoal-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-emerald-500">
            <UserCheck size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Total Mentor Aktif</span>
          </div>
          <p className="text-3xl font-bold text-coffee-800 dark:text-white">
            {mentors.filter(m => m.status === 'active').length}
          </p>
        </div>
        <div className="bg-white dark:bg-charcoal-light p-6 rounded-3xl border border-coffee-100 dark:border-charcoal-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-amber-500">
            <ShieldAlert size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Menunggu</span>
          </div>
          <p className="text-3xl font-bold text-coffee-800 dark:text-white">{pendingCount}</p>
        </div>
        <div className="bg-white dark:bg-charcoal-light p-6 rounded-3xl border border-coffee-100 dark:border-charcoal-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-red-500">
            <Shield size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Ditolak/Suspend</span>
          </div>
          <p className="text-3xl font-bold text-coffee-800 dark:text-white">
            {mentors.filter(m => m.status === 'suspended' || m.status === 'inactive').length}
          </p>
        </div>
      </div>

      {/* Main List */}
      <div className="bg-white dark:bg-charcoal-light rounded-3xl border border-coffee-100 dark:border-charcoal-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-coffee-100 dark:border-charcoal-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
            <input 
              type="text" 
              placeholder="Cari mentor berdasarkan nama atau email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-sm text-coffee-800 dark:text-white focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-coffee-50/50 dark:bg-charcoal/50 text-coffee-500 dark:text-coffee-400 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-coffee-100 dark:border-charcoal-200">
                <th className="px-6 py-4">Informasi Mentor</th>
                <th className="px-6 py-4">Tanggal Daftar</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-50 dark:divide-charcoal-200/50">
              {filteredMentors.length > 0 ? (
                filteredMentors.map((mentor) => (
                  <motion.tr 
                    layout
                    key={mentor.id} 
                    className="hover:bg-coffee-50/30 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold">
                          {mentor.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-coffee-800 dark:text-white">{mentor.name}</h3>
                          <p className="text-xs text-coffee-500">{mentor.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-xs text-coffee-600 dark:text-coffee-400">
                        <Calendar size={14} />
                        {mentor.joinedDate}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        mentor.status === 'active' 
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                          : mentor.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                      }`}>
                        {mentor.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        {mentor.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleApprove(mentor.id)}
                              className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"
                              title="Setujui"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button 
                              onClick={() => handleReject(mentor.id)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Tolak"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button className="p-2 text-coffee-400 hover:bg-coffee-50 dark:hover:bg-charcoal rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-coffee-500">
                    Tidak ada mentor yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
