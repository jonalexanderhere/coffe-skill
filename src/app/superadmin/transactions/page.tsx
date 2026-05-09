"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, DollarSign, ArrowUpRight, ArrowDownRight, Download, CreditCard, Wallet, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Mock transactions data
const mockTransactions = [
  { id: "tx-1", userId: "student-1", userName: "Ghifari Azhar", courseId: "course-1", courseName: "Full-Stack Web Development dengan Next.js", amount: 299000, type: "purchase", status: "completed", date: "2026-05-08" },
  { id: "tx-2", userId: "student-2", userName: "Andi Wijaya", courseId: "course-1", courseName: "Full-Stack Web Development dengan Next.js", amount: 299000, type: "purchase", status: "completed", date: "2026-05-07" },
  { id: "tx-3", userId: "mentor-1", userName: "Ahmad Fauzan", amount: 209300, type: "payout", status: "completed", date: "2026-05-06" },
  { id: "tx-4", userId: "student-3", userName: "Maya Putri", courseId: "course-2", courseName: "Python untuk Data Science & AI", amount: 349000, type: "purchase", status: "pending", date: "2026-05-05" },
  { id: "tx-5", userId: "mentor-2", userName: "Sari Dewi", amount: 244300, type: "payout", status: "pending", date: "2026-05-04" },
];

export default function SuperAdminTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "purchase" | "payout">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = tx.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.courseName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    totalRevenue: mockTransactions.filter(t => t.type === "purchase" && t.status === "completed").reduce((acc, t) => acc + t.amount, 0),
    totalPayout: mockTransactions.filter(t => t.type === "payout" && t.status === "completed").reduce((acc, t) => acc + t.amount, 0),
    pendingTransactions: mockTransactions.filter(t => t.status === "pending").length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Transaksi
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
          Kelola transaksi dan payout mentor
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
              <ArrowUpRight size={18} className="text-emerald-600" />
            </div>
            <span className="text-sm text-coffee-500">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-coffee-800 dark:text-white">{formatCurrency(stats.totalRevenue)}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/20">
              <ArrowDownRight size={18} className="text-blue-600" />
            </div>
            <span className="text-sm text-coffee-500">Total Payout</span>
          </div>
          <p className="text-2xl font-bold text-coffee-800 dark:text-white">{formatCurrency(stats.totalPayout)}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/20">
              <Clock size={18} className="text-amber-600" />
            </div>
            <span className="text-sm text-coffee-500">Pending</span>
          </div>
          <p className="text-2xl font-bold text-coffee-800 dark:text-white">{stats.pendingTransactions}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
          <input
            type="text"
            placeholder="Cari transaksi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-transparent rounded-xl text-coffee-800 dark:text-white focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
            className="px-3 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-700 dark:text-coffee-300 outline-none cursor-pointer"
          >
            <option value="all">Semua Tipe</option>
            <option value="purchase">Purchase</option>
            <option value="payout">Payout</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-700 dark:text-coffee-300 outline-none cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-coffee-600 dark:text-coffee-300 bg-coffee-50 dark:bg-charcoal-200 rounded-xl hover:bg-coffee-100 transition-colors">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-coffee-50/50 dark:bg-charcoal-200/50 text-coffee-500 dark:text-coffee-400">
              <tr>
                <th className="px-6 py-4 font-medium">ID Transaksi</th>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Tipe</th>
                <th className="px-6 py-4 font-medium">Jumlah</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-100 dark:divide-charcoal-200">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-coffee-50/50 dark:hover:bg-charcoal-200/50 transition-colors text-coffee-700 dark:text-coffee-300">
                  <td className="px-6 py-4 font-mono text-xs">{tx.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-coffee-800 dark:text-white">{tx.userName}</p>
                      {tx.courseName && (
                        <p className="text-xs text-coffee-500 truncate max-w-[200px]">{tx.courseName}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 ${
                      tx.type === "purchase" ? "text-emerald-600" : "text-blue-600"
                    }`}>
                      {tx.type === "purchase" ? (
                        <CreditCard size={14} />
                      ) : (
                        <Wallet size={14} />
                      )}
                      {tx.type === "purchase" ? "Purchase" : "Payout"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${
                      tx.type === "purchase" ? "text-emerald-600" : "text-blue-600"
                    }`}>
                      {tx.type === "purchase" ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                      tx.status === "completed" 
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                    }`}>
                      {tx.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-coffee-500">
                    {new Date(tx.date).toLocaleDateString('id-ID')}
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