"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, CheckCircle, XCircle, Ban, Mail, UserCheck, AlertCircle } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { User, UserRole, UserStatus } from "@/lib/types";

export default function UserManagementPage() {
  const { users, updateUserStatus } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleApproveMentor = (userId: string) => {
    updateUserStatus(userId, "active");
  };

  const handleRejectMentor = (userId: string) => {
    updateUserStatus(userId, "suspended");
  };

  const handleToggleStatus = (userId: string, currentStatus: UserStatus) => {
    updateUserStatus(userId, currentStatus === "active" ? "inactive" : "active");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Manajemen Pengguna
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
          Kelola semua user di platform CoffeeSkill
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-transparent rounded-xl text-coffee-800 dark:text-white focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
            className="px-3 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-700 dark:text-coffee-300 outline-none cursor-pointer"
          >
            <option value="all">Semua Role</option>
            <option value="student">Siswa</option>
            <option value="mentor">Mentor</option>
            <option value="superadmin">Super Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as UserStatus | "all")}
            className="px-3 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-700 dark:text-coffee-300 outline-none cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="pending">Pending</option>
            <option value="inactive">Nonaktif</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length, color: "text-blue-500" },
          { label: "Siswa", value: users.filter(u => u.role === 'student').length, color: "text-emerald-500" },
          { label: "Mentor", value: users.filter(u => u.role === 'mentor').length, color: "text-purple-500" },
          { label: "Pending", value: users.filter(u => u.status === 'pending').length, color: "text-amber-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-charcoal-light rounded-xl border border-coffee-100 dark:border-charcoal-200 p-4"
          >
            <p className="text-2xl font-bold text-coffee-800 dark:text-white">{stat.value}</p>
            <p className={`text-xs font-medium ${stat.color} mt-1`}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-coffee-50/50 dark:hover:bg-charcoal-200/50 transition-colors text-coffee-700 dark:text-coffee-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-coffee-100 dark:bg-charcoal-300 flex items-center justify-center text-sm font-bold text-coffee-600">
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
                    <span className={`flex items-center gap-1.5 ${
                      user.status === 'active' ? 'text-emerald-600' : 
                      user.status === 'pending' ? 'text-amber-600' : 
                      user.status === 'suspended' ? 'text-red-600' : 'text-coffee-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        user.status === 'active' ? 'bg-emerald-500' : 
                        user.status === 'pending' ? 'bg-amber-500' : 
                        user.status === 'suspended' ? 'bg-red-500' : 'bg-coffee-400'
                      }`} />
                      {user.status === 'active' ? 'Aktif' : 
                       user.status === 'pending' ? 'Pending' :
                       user.status === 'suspended' ? 'Suspended' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-coffee-500">
                    {new Date(user.joinedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.role === 'mentor' && user.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApproveMentor(user.id)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Approve Mentor"
                          >
                            <UserCheck size={16} />
                          </button>
                          <button
                            onClick={() => handleRejectMentor(user.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject Mentor"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      {user.role !== 'superadmin' && (
                        <button
                          onClick={() => handleToggleStatus(user.id, user.status)}
                          className="p-1.5 text-coffee-500 hover:bg-coffee-50 rounded-lg transition-colors"
                          title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          <Ban size={16} />
                        </button>
                      )}
                      <button className="p-1.5 text-coffee-500 hover:bg-coffee-50 rounded-lg transition-colors">
                        <Mail size={16} />
                      </button>
                      <button className="p-1.5 text-coffee-400 hover:text-coffee-600">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <AlertCircle size={40} className="mx-auto text-coffee-300 mb-3" />
            <p className="text-coffee-500">Tidak ada user yang cocok dengan filter</p>
          </div>
        )}
      </div>
    </div>
  );
}