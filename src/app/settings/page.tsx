"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Palette, 
  Shield, 
  Camera, 
  Save, 
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
  Link as LinkIcon,
  LogOut,
  ChevronRight,
  Mail,
  UserCircle
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const tabs = [
  { id: "profile", label: "Profil", icon: UserCircle },
  { id: "notifications", label: "Notifikasi", icon: Bell },
  { id: "security", label: "Keamanan", icon: Shield },
  { id: "display", label: "Tampilan", icon: Palette },
];

export default function SettingsPage() {
  const { user, updateUser, logout, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    avatar: "",
    username: "",
  });

  // Sync user data to form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        location: "", // Assuming not in type yet but we can add
        avatar: user.avatar || "",
        username: user.email?.split('@')[0] || "",
      });
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-charcoal">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      updateUser({
        name: formData.name,
        bio: formData.bio,
        avatar: formData.avatar,
      });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError("Gagal memperbarui profil. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-[#FDFCFB] dark:bg-charcoal transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-72 shrink-0">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-charcoal-light rounded-3xl border border-coffee-100 dark:border-charcoal-200 p-3 shadow-sm sticky top-28"
              >
                <div className="px-4 py-4 mb-2">
                  <h1 className="text-2xl font-bold text-coffee-800 dark:text-white tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
                    Settings
                  </h1>
                </div>
                
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-medium transition-all group ${
                        activeTab === tab.id
                          ? "bg-accent text-white shadow-lg shadow-accent/20"
                          : "text-coffee-500 dark:text-coffee-400 hover:bg-coffee-50 dark:hover:bg-charcoal hover:text-accent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <tab.icon size={20} className={activeTab === tab.id ? "text-white" : "group-hover:scale-110 transition-transform"} />
                        {tab.label}
                      </div>
                      <ChevronRight size={14} className={activeTab === tab.id ? "opacity-100" : "opacity-0 group-hover:opacity-40 transition-opacity"} />
                    </button>
                  ))}
                  
                  <div className="my-4 border-t border-coffee-100 dark:border-charcoal-200 mx-2" />
                  
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                  >
                    <LogOut size={20} />
                    Keluar Akun
                  </button>
                </nav>
              </motion.div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-charcoal-light rounded-[32px] border border-coffee-100 dark:border-charcoal-200 shadow-xl shadow-charcoal/5 dark:shadow-none overflow-hidden"
                >
                  {activeTab === "profile" && (
                    <div className="p-8 md:p-10">
                      <div className="flex flex-col sm:flex-row items-center gap-8 mb-10 pb-10 border-b border-coffee-50 dark:border-charcoal-200">
                        <div className="relative group">
                          <div className="w-28 h-28 rounded-[32px] overflow-hidden bg-gradient-to-br from-accent/10 to-accent/30 flex items-center justify-center border-4 border-white dark:border-charcoal shadow-2xl shadow-accent/10">
                            {formData.avatar ? (
                              <img src={formData.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-3xl font-bold text-accent">{getInitials(user.name)}</span>
                            )}
                          </div>
                          <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-accent text-white flex items-center justify-center shadow-xl border-4 border-white dark:border-charcoal-light hover:scale-110 transition-transform active:scale-95">
                            <Camera size={18} />
                          </button>
                        </div>
                        
                        <div className="text-center sm:text-left">
                          <h2 className="text-2xl font-bold text-coffee-800 dark:text-white mb-1">{user.name}</h2>
                          <p className="text-coffee-500 dark:text-coffee-400 mb-2">{user.email}</p>
                          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                            <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full border border-accent/20">
                              {user.role}
                            </span>
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-500/20">
                              {user.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleSave} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-coffee-400 dark:text-coffee-500 uppercase tracking-widest flex items-center gap-2 px-1">
                              Nama Lengkap <span className="text-accent">*</span>
                            </label>
                            <div className="relative group">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-300 group-focus-within:text-accent transition-colors" size={18} />
                              <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full pl-12 pr-4 py-4 bg-coffee-50/50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-2xl text-coffee-800 dark:text-white focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-coffee-400 dark:text-coffee-500 uppercase tracking-widest flex items-center gap-2 px-1">
                              Username
                            </label>
                            <div className="relative group">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-300 font-bold group-focus-within:text-accent">@</span>
                              <input 
                                type="text" 
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="w-full pl-10 pr-4 py-4 bg-coffee-50/50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-2xl text-coffee-800 dark:text-white focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-coffee-400 dark:text-coffee-500 uppercase tracking-widest flex items-center gap-2 px-1">
                            Email Address
                          </label>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-300 group-focus-within:text-accent transition-colors" size={18} />
                            <input 
                              type="email" 
                              value={formData.email}
                              disabled
                              className="w-full pl-12 pr-4 py-4 bg-coffee-50/20 dark:bg-charcoal/50 border border-coffee-100 dark:border-charcoal-200 rounded-2xl text-coffee-400 dark:text-coffee-600 cursor-not-allowed italic"
                            />
                          </div>
                          <p className="text-[10px] text-coffee-400 px-1">Email cannot be changed for security reasons.</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-coffee-400 dark:text-coffee-500 uppercase tracking-widest flex items-center gap-2 px-1">
                            Bio / About Me
                          </label>
                          <textarea 
                            rows={4} 
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            placeholder="Tell the community about yourself..."
                            className="w-full px-5 py-4 bg-coffee-50/50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-2xl text-coffee-800 dark:text-white focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-coffee-400 dark:text-coffee-500 uppercase tracking-widest flex items-center gap-2 px-1">
                              Location
                            </label>
                            <div className="relative group">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-300 group-focus-within:text-accent transition-colors" size={18} />
                              <input 
                                type="text" 
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                placeholder="e.g. Jakarta, Indonesia"
                                className="w-full pl-12 pr-4 py-4 bg-coffee-50/50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-2xl text-coffee-800 dark:text-white focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-coffee-400 dark:text-coffee-500 uppercase tracking-widest flex items-center gap-2 px-1">
                              Website
                            </label>
                            <div className="relative group">
                              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-300 group-focus-within:text-accent transition-colors" size={18} />
                              <input 
                                type="text" 
                                placeholder="https://yourwebsite.com"
                                className="w-full pl-12 pr-4 py-4 bg-coffee-50/50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-2xl text-coffee-800 dark:text-white focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-10 flex items-center justify-between border-t border-coffee-50 dark:border-charcoal-200">
                          <div className="flex items-center gap-3">
                            <AnimatePresence>
                              {showSuccess && (
                                <motion.div 
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  className="flex items-center gap-2 text-emerald-500 font-bold text-sm"
                                >
                                  <CheckCircle size={18} />
                                  Profil berhasil diperbarui!
                                </motion.div>
                              )}
                              {error && (
                                <motion.div 
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  className="flex items-center gap-2 text-red-500 font-bold text-sm"
                                >
                                  <AlertCircle size={18} />
                                  {error}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          
                          <button 
                            type="submit" 
                            disabled={isSaving}
                            className="relative inline-flex items-center gap-3 px-10 py-4 bg-accent text-white font-bold rounded-2xl hover:bg-accent-hover transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-xl shadow-accent/20"
                          >
                            {isSaving ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <Save size={20} />
                            )}
                            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {activeTab === "notifications" && (
                    <div className="p-8 md:p-10 h-[600px] flex flex-col items-center justify-center text-center">
                      <div className="p-6 rounded-[32px] bg-accent/10 text-accent mb-6">
                        <Bell size={48} />
                      </div>
                      <h3 className="text-2xl font-bold text-coffee-800 dark:text-white mb-2">Notification Preferences</h3>
                      <p className="text-coffee-500 dark:text-coffee-400 max-w-sm">Manage how you want to be notified about your learning journey.</p>
                      <button className="mt-8 px-8 py-3 bg-coffee-100 dark:bg-charcoal text-coffee-600 dark:text-coffee-400 font-bold rounded-2xl hover:bg-coffee-200 transition-all">
                        Configure Channels
                      </button>
                    </div>
                  )}

                  {activeTab === "security" && (
                    <div className="p-8 md:p-10 h-[600px] flex flex-col items-center justify-center text-center">
                      <div className="p-6 rounded-[32px] bg-red-500/10 text-red-500 mb-6">
                        <Shield size={48} />
                      </div>
                      <h3 className="text-2xl font-bold text-coffee-800 dark:text-white mb-2">Account Security</h3>
                      <p className="text-coffee-500 dark:text-coffee-400 max-w-sm">Protect your account with Two-Factor Authentication and password management.</p>
                      <button className="mt-8 px-8 py-3 bg-red-500/10 text-red-500 font-bold rounded-2xl hover:bg-red-500/20 transition-all">
                        Change Password
                      </button>
                    </div>
                  )}

                  {activeTab === "display" && (
                    <div className="p-8 md:p-10 h-[600px] flex flex-col items-center justify-center text-center">
                      <div className="p-6 rounded-[32px] bg-blue-500/10 text-blue-500 mb-6">
                        <Palette size={48} />
                      </div>
                      <h3 className="text-2xl font-bold text-coffee-800 dark:text-white mb-2">Display & Theme</h3>
                      <p className="text-coffee-500 dark:text-coffee-400 max-w-sm">Customize the appearance of CoffeeSkill to match your style.</p>
                      <div className="flex gap-4 mt-8">
                        <button className="px-6 py-3 bg-white border border-coffee-200 text-coffee-800 font-bold rounded-2xl shadow-sm">Light</button>
                        <button className="px-6 py-3 bg-charcoal text-white font-bold rounded-2xl shadow-lg shadow-charcoal/20">Dark</button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
