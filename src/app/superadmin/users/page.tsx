"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Ban, 
  Mail, 
  UserCheck, 
  AlertCircle, 
  Trash2, 
  UserPlus, 
  Download,
  RefreshCw,
  ChevronRight,
  Users,
  Shield,
  Award
} from "lucide-react";
import { useUserStore } from "@/lib/store";
import { User, UserRole, UserStatus } from "@/lib/types";

export default function UserManagementPage() {
  const { users, updateUserStatus, deleteUser, deleteDuplicateUsers } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [isCleaning, setIsCleaning] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCleanDuplicates = () => {
    setIsCleaning(true);
    setTimeout(() => {
      deleteDuplicateUsers();
      setIsCleaning(false);
      alert("Data berhasil dibersihkan dari duplikat!");
    }, 1000);
  };

  const handleToggleStatus = (userId: string, currentStatus: UserStatus) => {
    updateUserStatus(userId, currentStatus === "active" ? "inactive" : "active");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
            User <span className="text-accent">Ecosystem</span>
          </h1>
          <p className="text-coffee-400 mt-1 flex items-center gap-2">
            <Users size={14} /> Total {users.length} pengguna terdaftar di platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCleanDuplicates}
            disabled={isCleaning}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-coffee-300 bg-charcoal-light border border-charcoal-200 rounded-xl hover:bg-charcoal-200 transition-all hover:border-accent/30 disabled:opacity-50"
          >
            <RefreshCw size={16} className={isCleaning ? "animate-spin" : ""} />
            {isCleaning ? "Membersihkan..." : "Bersihkan Duplikat"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl shadow-lg shadow-accent/20 transition-all active:scale-95">
            <UserPlus size={18} /> Tambah User
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Students", value: users.filter(u => u.role === 'student' && u.status === 'active').length, color: "from-emerald-500/20 to-emerald-500/5", textColor: "text-emerald-400", icon: UserCheck },
          { label: "Verified Mentors", value: users.filter(u => u.role === 'mentor' && u.status === 'active').length, color: "from-blue-500/20 to-blue-500/5", textColor: "text-blue-400", icon: Award },
          { label: "Pending Requests", value: users.filter(u => u.status === 'pending').length, color: "from-amber-500/20 to-amber-500/5", textColor: "text-amber-400", icon: AlertCircle },
          { label: "Suspended Users", value: users.filter(u => u.status === 'suspended').length, color: "from-red-500/20 to-red-500/5", textColor: "text-red-400", icon: Ban },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.color} border border-white/5 rounded-2xl p-6 backdrop-blur-sm group hover:border-white/10 transition-colors`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={64} />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className={`text-xs font-semibold uppercase tracking-wider ${stat.textColor}`}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-charcoal-light/50 backdrop-blur-md border border-charcoal-200 p-4 rounded-2xl flex flex-col lg:flex-row items-center gap-4 shadow-xl">
        <div className="relative flex-1 w-full group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-500 group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Cari nama, email, atau ID pengguna..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-sm bg-charcoal/50 border border-charcoal-200 rounded-xl text-white placeholder:text-coffee-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 px-3 py-1 bg-charcoal/30 rounded-xl border border-charcoal-200">
            <Filter size={14} className="text-coffee-500" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
              className="bg-transparent py-2 text-sm text-coffee-300 outline-none cursor-pointer"
            >
              <option value="all">Semua Role</option>
              <option value="student">Siswa</option>
              <option value="mentor">Mentor</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-charcoal/30 rounded-xl border border-charcoal-200">
            <RefreshCw size={14} className="text-coffee-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as UserStatus | "all")}
              className="bg-transparent py-2 text-sm text-coffee-300 outline-none cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="pending">Pending</option>
              <option value="inactive">Nonaktif</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-charcoal-light/30 backdrop-blur-sm border border-charcoal-200 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-charcoal-200 bg-charcoal/40">
                <th className="px-8 py-5 font-semibold text-coffee-400 uppercase tracking-widest text-[10px]">User Profile</th>
                <th className="px-6 py-5 font-semibold text-coffee-400 uppercase tracking-widest text-[10px]">Security Role</th>
                <th className="px-6 py-5 font-semibold text-coffee-400 uppercase tracking-widest text-[10px]">Platform Status</th>
                <th className="px-6 py-5 font-semibold text-coffee-400 uppercase tracking-widest text-[10px]">Registration</th>
                <th className="px-8 py-5 font-semibold text-coffee-400 uppercase tracking-widest text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-200/50">
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((user) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={user.id} 
                    className="group hover:bg-white/[0.02] transition-all"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-lg font-bold text-white shadow-lg ${
                            user.role === 'superadmin' ? 'from-red-500 to-rose-600' :
                            user.role === 'mentor' ? 'from-blue-500 to-indigo-600' :
                            'from-coffee-600 to-charcoal-300'
                          }`}>
                            {user.name.charAt(0)}
                          </div>
                          {user.status === 'active' && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-charcoal rounded-full" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white group-hover:text-accent transition-colors">{user.name}</p>
                          <p className="text-xs text-coffee-500 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-tighter ${
                        user.role === 'superadmin' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        user.role === 'mentor' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-coffee-500/10 text-coffee-400 border border-coffee-500/20'
                      }`}>
                        {user.role === 'superadmin' && <Shield size={12} />}
                        {user.role === 'mentor' && <Award size={12} />}
                        {user.role}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`flex items-center gap-2 font-medium ${
                        user.status === 'active' ? 'text-emerald-400' : 
                        user.status === 'pending' ? 'text-amber-400' : 
                        user.status === 'suspended' ? 'text-red-400' : 'text-coffee-500'
                      }`}>
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          user.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                          user.status === 'pending' ? 'bg-amber-500' : 
                          user.status === 'suspended' ? 'bg-red-500' : 'bg-coffee-500'
                        }`} />
                        <span className="text-xs capitalize">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs text-coffee-400 font-medium">
                        {new Date(user.joinedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleToggleStatus(user.id, user.status)}
                          className="p-2.5 text-coffee-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                          title="Toggle Status"
                        >
                          <Ban size={18} />
                        </button>
                        <button 
                          className="p-2.5 text-coffee-400 hover:text-accent hover:bg-accent/10 rounded-xl transition-all"
                          title="Message User"
                        >
                          <Mail size={18} />
                        </button>
                        <button 
                          onClick={() => { if(confirm('Hapus user ini?')) deleteUser(user.id); }}
                          className="p-2.5 text-coffee-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="w-px h-4 bg-charcoal-200 mx-1" />
                        <button className="p-2 text-coffee-400 hover:text-white">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-20 text-center bg-charcoal/20">
            <div className="w-20 h-20 bg-charcoal-light rounded-3xl flex items-center justify-center mx-auto mb-6 border border-charcoal-200">
              <Search size={32} className="text-coffee-500" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No users matching your criteria</h3>
            <p className="text-coffee-500 max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
            <button 
              onClick={() => { setSearchQuery(""); setRoleFilter("all"); setStatusFilter("all"); }}
              className="mt-6 px-6 py-2.5 bg-accent/10 text-accent hover:bg-accent/20 rounded-xl font-semibold transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}