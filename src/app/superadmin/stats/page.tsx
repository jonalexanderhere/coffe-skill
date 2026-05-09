"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Shield, 
  Zap, 
  Globe, 
  Lock, 
  AlertTriangle, 
  Server, 
  Cpu, 
  HardDrive, 
  Database,
  BarChart3,
  Terminal,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useSystemStore, useUserStore, useEnrollmentStore } from "@/lib/store";
import { AuditLog } from "@/lib/types";

export default function PlatformStatsPage() {
  const { logs, health, updateHealth, clearLogs } = useSystemStore();
  const { users, deleteDuplicateUsers } = useUserStore();
  const { enrollments, deleteDuplicateEnrollments } = useEnrollmentStore();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'security'>('overview');
  const [isCleaning, setIsCleaning] = useState(false);
  const [filterCategory, setFilterCategory] = useState<AuditLog['category'] | 'all'>('all');

  // Simulate real-time health updates
  useEffect(() => {
    const interval = setInterval(() => {
      updateHealth({
        cpuUsage: Math.max(5, Math.min(95, health.cpuUsage + (Math.random() - 0.5) * 5)),
        activeRequests: Math.max(10, Math.min(200, health.activeRequests + Math.floor((Math.random() - 0.5) * 10)))
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [health.cpuUsage, health.activeRequests, updateHealth]);

  const handleFullCleanup = async () => {
    setIsCleaning(true);
    // Simulate cleanup process
    await new Promise(resolve => setTimeout(resolve, 1500));
    deleteDuplicateUsers();
    deleteDuplicateEnrollments();
    setIsCleaning(false);
    alert("Platform data has been fully optimized and duplicates removed.");
  };

  const filteredLogs = logs.filter(log => filterCategory === 'all' || log.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* Platform Meta Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3" style={{ fontFamily: "var(--font-poppins)" }}>
            <Activity className="text-accent animate-pulse" /> Platform <span className="text-accent">Intelligence</span>
          </h1>
          <p className="text-coffee-400 mt-1">Real-time infrastructure monitoring and audit control center</p>
        </div>
        <div className="flex items-center gap-3 bg-charcoal-light/50 p-1.5 rounded-2xl border border-charcoal-200 backdrop-blur-md">
          {(['overview', 'logs', 'security'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                activeTab === tab 
                  ? "bg-accent text-white shadow-lg shadow-accent/20" 
                  : "text-coffee-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Core Infrastructure Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "CPU Compute", value: `${health.cpuUsage.toFixed(1)}%`, icon: Cpu, color: "text-blue-400", sub: "Load balancing active" },
                { label: "RAM Usage", value: `${health.memoryUsage}MB`, icon: Database, color: "text-purple-400", sub: "Allocated: 2GB" },
                { label: "Network IO", value: `${(health.totalTraffic / 1024).toFixed(1)}GB`, icon: Globe, color: "text-emerald-400", sub: "Throughput stable" },
                { label: "Platform Uptime", value: health.uptime, icon: Clock, color: "text-amber-400", sub: "Last restart: 14d ago" },
              ].map((stat, i) => (
                <div key={stat.label} className="bg-charcoal-light/30 border border-charcoal-200 p-6 rounded-3xl backdrop-blur-sm group hover:border-accent/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-charcoal/50 ${stat.color}`}>
                      <stat.icon size={20} />
                    </div>
                    <TrendingUp size={16} className="text-emerald-500/50" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{stat.value}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-coffee-500">{stat.label}</p>
                  <p className="text-[10px] text-coffee-600 mt-2">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Traffic & Growth Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-charcoal-light/30 border border-charcoal-200 rounded-3xl p-8 backdrop-blur-md">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white">Traffic Analysis</h3>
                    <p className="text-sm text-coffee-500">Hourly request distribution</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-[10px] font-bold text-coffee-400 uppercase">Incoming</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[10px] font-bold text-coffee-400 uppercase">Cached</span>
                    </div>
                  </div>
                </div>
                
                {/* Simulated Chart */}
                <div className="h-64 flex items-end gap-2 px-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 40, 75, 50, 85, 65, 90, 45, 100, 60, 80, 55, 70, 40, 60].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.02, duration: 0.8 }}
                      className="flex-1 rounded-t-lg relative group"
                    >
                      <div className="absolute inset-0 bg-accent/40 group-hover:bg-accent rounded-t-lg transition-colors" />
                      <div className="absolute inset-0 bg-blue-500/20 w-1/2 rounded-t-lg" />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between px-2 text-[10px] font-bold text-coffee-600 uppercase tracking-widest">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:59</span>
                </div>
              </div>

              <div className="bg-charcoal-light/30 border border-charcoal-200 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Database Health</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className="text-coffee-400 uppercase tracking-wider">Students Registry</span>
                        <span className="text-white">{users.filter(u => u.role === 'student').length}</span>
                      </div>
                      <div className="h-2 bg-charcoal rounded-full overflow-hidden border border-white/5">
                        <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-accent" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className="text-coffee-400 uppercase tracking-wider">Course Enrollments</span>
                        <span className="text-white">{enrollments.length}</span>
                      </div>
                      <div className="h-2 bg-charcoal rounded-full overflow-hidden border border-white/5">
                        <motion.div initial={{ width: 0 }} animate={{ width: '62%' }} className="h-full bg-blue-500" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className="text-coffee-400 uppercase tracking-wider">Duplicate Records</span>
                        <span className="text-red-400">Detected</span>
                      </div>
                      <div className="h-2 bg-charcoal rounded-full overflow-hidden border border-white/5">
                        <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} className="h-full bg-red-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleFullCleanup}
                  disabled={isCleaning}
                  className="w-full mt-8 flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw size={18} className={isCleaning ? "animate-spin" : ""} />
                  {isCleaning ? "Cleaning Registry..." : "Optimize Platform Registry"}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'logs' && (
          <motion.div
            key="logs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Log Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-charcoal-light/30 border border-charcoal-200 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-sm group">
                  <Terminal size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-500 group-focus-within:text-accent" />
                  <input 
                    type="text" 
                    placeholder="Search logs pattern..." 
                    className="w-full pl-11 pr-4 py-2.5 bg-charcoal/50 border border-charcoal-200 rounded-xl text-sm text-white focus:outline-none focus:border-accent/50 transition-all"
                  />
                </div>
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as any)}
                  className="bg-charcoal/50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-sm text-coffee-300 outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="security">Security</option>
                  <option value="auth">Auth</option>
                  <option value="system">System</option>
                  <option value="content">Content</option>
                </select>
              </div>
              <button onClick={clearLogs} className="flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest px-4">
                <Trash2 size={14} /> Clear History
              </button>
            </div>

            {/* Logs Terminal */}
            <div className="bg-charcoal-light/30 border border-charcoal-200 rounded-3xl overflow-hidden backdrop-blur-md">
              <div className="p-4 bg-charcoal/40 border-b border-charcoal-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  <span className="text-xs font-mono text-coffee-500 ml-2">platform_audit_stream.log</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-500/70 animate-pulse">LIVE STREAMING</span>
              </div>
              <div className="max-h-[600px] overflow-y-auto font-mono text-xs">
                {filteredLogs.length === 0 ? (
                  <div className="py-20 text-center text-coffee-600">No logs matching criteria</div>
                ) : (
                  <table className="w-full border-collapse">
                    <tbody className="divide-y divide-charcoal-200/50">
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap text-coffee-600 w-48">
                            {new Date(log.timestamp).toLocaleString('id-ID', { hour12: false })}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-tight ${
                              log.severity === 'critical' || log.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                              log.severity === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                              'bg-blue-500/10 text-blue-400'
                            }`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-coffee-300">
                            {log.details}
                          </td>
                          <td className="px-6 py-4 text-coffee-500 text-right font-bold text-[10px]">
                            {log.ipAddress}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div
            key="security"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            {/* WAF & Firewall Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-charcoal-light/30 border border-charcoal-200 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-4 rounded-3xl bg-emerald-500/10 text-emerald-400">
                      <ShieldCheck size={32} />
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/30">
                      Active
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Advanced Firewall</h3>
                  <p className="text-sm text-coffee-500 leading-relaxed">System-wide protection is fully operational. Layer 7 WAF is filtering all incoming requests.</p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-charcoal/50 p-4 rounded-2xl border border-white/5">
                      <p className="text-2xl font-bold text-white tracking-tight">{health.blockedIps}</p>
                      <p className="text-[10px] font-bold text-coffee-500 uppercase tracking-widest mt-1">Blocked IPs</p>
                    </div>
                    <div className="bg-charcoal/50 p-4 rounded-2xl border border-white/5">
                      <p className="text-2xl font-bold text-white tracking-tight">99.9%</p>
                      <p className="text-[10px] font-bold text-coffee-500 uppercase tracking-widest mt-1">Threat Mitig.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-charcoal-light/30 border border-charcoal-200 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 blur-[100px]" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-4 rounded-3xl bg-amber-500/10 text-amber-400">
                      <ShieldAlert size={32} />
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
                      Normal
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Threat Intelligence</h3>
                  <p className="text-sm text-coffee-500 leading-relaxed">Monitoring global threat patterns. No targeted attacks detected in the last 24 hours.</p>
                  
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-charcoal/50 rounded-xl border border-white/5">
                      <span className="text-xs text-coffee-400">DDOS Protection</span>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Running</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2.5 bg-charcoal/50 rounded-xl border border-white/5">
                      <span className="text-xs text-coffee-400">Brute Force Def.</span>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Running</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-charcoal-light/30 border border-charcoal-200 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[100px]" />
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">TLS/SSL Encryption</h3>
                    <p className="text-sm text-coffee-500 mb-6">Enforcing 256-bit AES encryption on all data transmission.</p>
                    <div className="flex items-center gap-4 p-4 bg-charcoal/50 rounded-2xl border border-white/5">
                      <Lock className="text-blue-400" size={24} />
                      <div>
                        <p className="text-sm font-bold text-white tracking-tight">TLS 1.3 Active</p>
                        <p className="text-[10px] text-coffee-500">Certificate valid: 342 days left</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-widest hover:bg-blue-500/20 transition-all">
                    Security Audit Report
                  </button>
                </div>
              </div>
            </div>

            {/* Suspicious Traffic Map Placeholder */}
            <div className="bg-charcoal-light/30 border border-charcoal-200 rounded-3xl p-8 backdrop-blur-md h-96 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe size={400} className="absolute -top-20 -right-20 text-coffee-500" />
              </div>
              <Shield size={48} className="text-coffee-700 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Global Access Monitoring</h3>
              <p className="text-sm text-coffee-500 max-w-sm">Interactive access map is being optimized for your region. All global ingress points are currently under surveillance.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
