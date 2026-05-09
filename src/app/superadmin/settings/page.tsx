"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, DollarSign, Mail, Bell, Shield, Save, RotateCcw, Users, BookOpen } from "lucide-react";
import { useSettingsStore } from "@/lib/store";
import { useCategoryStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function SettingsPage() {
  const { settings, updateSettings } = useSettingsStore();
  const { categories, addCategory, updateCategory, deleteCategory } = useCategoryStore();
  
  const [formData, setFormData] = useState({
    platformName: settings.platformName,
    commissionRate: settings.commissionRate,
    minimumPayout: settings.minimumPayout,
    payoutSchedule: settings.payoutSchedule,
    supportEmail: settings.supportEmail,
    maintenanceMode: settings.maintenanceMode,
    mentorRegistrationOpen: settings.mentorRegistrationOpen ?? true,
  });

  const [newCategory, setNewCategory] = useState({ name: "", color: "#3B82F6" });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setFormData({
      platformName: 'CoffeeSkill',
      commissionRate: 30,
      minimumPayout: 100000,
      payoutSchedule: 'monthly',
      supportEmail: 'support@coffeeskill.id',
      maintenanceMode: false,
      mentorRegistrationOpen: true,
    });
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      addCategory({
        id: `cat-${Date.now()}`,
        name: newCategory.name,
        icon: 'BookOpen',
        color: newCategory.color,
        courseCount: 0,
      });
      setNewCategory({ name: "", color: "#3B82F6" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-coffee-800 dark:text-white tracking-tight" style={{ fontFamily: "var(--font-poppins)" }}>
          Platform <span className="text-accent">Config Suite</span>
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
          Konfigurasi infrastruktur, ekonomi platform, dan ekosistem konten
        </p>
      </motion.div>

      <div className="grid gap-8">
        {/* General Settings Section */}
        <section className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-coffee-50 dark:border-charcoal-200 flex items-center gap-4 bg-coffee-50/30 dark:bg-charcoal/30">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-charcoal flex items-center justify-center shadow-sm border border-coffee-100 dark:border-charcoal-200">
              <Settings size={22} className="text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-black text-coffee-800 dark:text-white tracking-tight uppercase tracking-widest text-xs">Identitas & Akses</h2>
              <p className="text-[10px] text-coffee-400 font-bold uppercase tracking-widest mt-0.5">Global Platform Parameters</p>
            </div>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-coffee-400 uppercase tracking-widest ml-1">Nama Platform</label>
                <input
                  type="text"
                  value={formData.platformName}
                  onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
                  className="w-full px-5 py-4 bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-[1.25rem] text-sm font-bold text-coffee-800 dark:text-white focus:outline-none focus:border-accent transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-coffee-400 uppercase tracking-widest ml-1">Support Endpoint</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-300" />
                  <input
                    type="email"
                    value={formData.supportEmail}
                    onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                    className="w-full pl-12 pr-5 py-4 bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-[1.25rem] text-sm font-bold text-coffee-800 dark:text-white focus:outline-none focus:border-accent transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setFormData({ ...formData, maintenanceMode: !formData.maintenanceMode })}
                className={`group flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all ${
                  formData.maintenanceMode 
                    ? 'bg-red-500/5 border-red-500/20' 
                    : 'bg-coffee-50/50 dark:bg-charcoal/50 border-transparent hover:border-coffee-200 dark:hover:border-charcoal-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${formData.maintenanceMode ? 'bg-red-500 text-white' : 'bg-white dark:bg-charcoal text-coffee-400 border border-coffee-100 dark:border-charcoal-200'}`}>
                    <Shield size={18} />
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-black uppercase tracking-widest ${formData.maintenanceMode ? 'text-red-600' : 'text-coffee-600 dark:text-coffee-300'}`}>Maintenance</p>
                    <p className="text-[10px] text-coffee-400 mt-0.5 font-medium">{formData.maintenanceMode ? 'Platform Locked' : 'Public Access Active'}</p>
                  </div>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.maintenanceMode ? 'bg-red-500' : 'bg-coffee-200 dark:bg-charcoal-200'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${formData.maintenanceMode ? 'right-1' : 'left-1'}`} />
                </div>
              </button>

              <button
                onClick={() => setFormData({ ...formData, mentorRegistrationOpen: !formData.mentorRegistrationOpen })}
                className={`group flex items-center justify-between p-6 rounded-[1.5rem] border-2 transition-all ${
                  formData.mentorRegistrationOpen 
                    ? 'bg-emerald-500/5 border-emerald-500/20' 
                    : 'bg-coffee-50/50 dark:bg-charcoal/50 border-transparent hover:border-coffee-200 dark:hover:border-charcoal-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${formData.mentorRegistrationOpen ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-charcoal text-coffee-400 border border-coffee-100 dark:border-charcoal-200'}`}>
                    <Users size={18} />
                  </div>
                  <div className="text-left">
                    <p className={`text-xs font-black uppercase tracking-widest ${formData.mentorRegistrationOpen ? 'text-emerald-600' : 'text-coffee-600 dark:text-coffee-300'}`}>Mentor Inbound</p>
                    <p className="text-[10px] text-coffee-400 mt-0.5 font-medium">{formData.mentorRegistrationOpen ? 'Registration Open' : 'Registration Closed'}</p>
                  </div>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.mentorRegistrationOpen ? 'bg-emerald-500' : 'bg-coffee-200 dark:bg-charcoal-200'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${formData.mentorRegistrationOpen ? 'right-1' : 'left-1'}`} />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Economic Model Section */}
        <section className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-coffee-50 dark:border-charcoal-200 flex items-center gap-4 bg-coffee-50/30 dark:bg-charcoal/30">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-charcoal flex items-center justify-center shadow-sm border border-coffee-100 dark:border-charcoal-200">
              <DollarSign size={22} className="text-emerald-500" />
            </div>
            <div>
              <h2 className="text-lg font-black text-coffee-800 dark:text-white tracking-tight uppercase tracking-widest text-xs">Model Ekonomi</h2>
              <p className="text-[10px] text-coffee-400 font-bold uppercase tracking-widest mt-0.5">Revenue & Payout Logic</p>
            </div>
          </div>

          <div className="p-8 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-coffee-400 uppercase tracking-widest">Platform Commission Rate</label>
                <span className="text-lg font-black text-accent">{formData.commissionRate}%</span>
              </div>
              <div className="relative h-2 bg-coffee-100 dark:bg-charcoal rounded-full group">
                <div className="absolute inset-y-0 left-0 bg-accent rounded-full transition-all duration-300" style={{ width: `${formData.commissionRate * 2}%` }} />
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={formData.commissionRate}
                  onChange={(e) => setFormData({ ...formData, commissionRate: parseInt(e.target.value) })}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-coffee-300 uppercase tracking-tighter">
                <span>0% (Free)</span>
                <span>Mentor Retention: {100 - formData.commissionRate}%</span>
                <span>50% (Max)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-coffee-400 uppercase tracking-widest ml-1">Minimum Payout</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-xs font-black text-coffee-400">IDR</div>
                  <input
                    type="number"
                    value={formData.minimumPayout}
                    onChange={(e) => setFormData({ ...formData, minimumPayout: parseInt(e.target.value) })}
                    className="w-full pl-14 pr-5 py-4 bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-[1.25rem] text-sm font-bold text-coffee-800 dark:text-white focus:outline-none focus:border-accent transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-coffee-400 uppercase tracking-widest ml-1">Payout Frequency</label>
                <select
                  value={formData.payoutSchedule}
                  onChange={(e) => setFormData({ ...formData, payoutSchedule: e.target.value as 'weekly' | 'monthly' })}
                  className="w-full px-5 py-4 bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-[1.25rem] text-sm font-bold text-coffee-800 dark:text-white focus:outline-none focus:border-accent transition-all appearance-none"
                >
                  <option value="weekly">Mingguan (Setiap Senin)</option>
                  <option value="monthly">Bulanan (Tanggal 1)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Content Ecosystem Section */}
        <section className="bg-white dark:bg-charcoal-light rounded-[2.5rem] border border-coffee-100 dark:border-charcoal-200 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-coffee-50 dark:border-charcoal-200 flex items-center gap-4 bg-coffee-50/30 dark:bg-charcoal/30">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-charcoal flex items-center justify-center shadow-sm border border-coffee-100 dark:border-charcoal-200">
              <BookOpen size={22} className="text-purple-500" />
            </div>
            <div>
              <h2 className="text-lg font-black text-coffee-800 dark:text-white tracking-tight uppercase tracking-widest text-xs">Ekosistem Konten</h2>
              <p className="text-[10px] text-coffee-400 font-bold uppercase tracking-widest mt-0.5">Categories & Taxonomy</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Nama kategori baru..."
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="flex-1 px-5 py-4 bg-coffee-50 dark:bg-charcoal border border-coffee-100 dark:border-charcoal-200 rounded-[1.25rem] text-sm font-bold text-coffee-800 dark:text-white focus:outline-none focus:border-accent transition-all"
              />
              <div className="w-14 h-14 rounded-[1.25rem] border border-coffee-100 dark:border-charcoal-200 overflow-hidden relative group shrink-0">
                <input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="absolute inset-0 scale-150 cursor-pointer"
                />
              </div>
              <button
                onClick={handleAddCategory}
                className="px-8 bg-accent text-white rounded-[1.25rem] font-black text-xs uppercase tracking-widest hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 active:scale-95"
              >
                Add
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <div key={cat.id} className="group flex items-center justify-between p-4 bg-coffee-50/50 dark:bg-charcoal/30 border border-coffee-100 dark:border-charcoal-200 rounded-2xl hover:border-accent/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-xs" style={{ backgroundColor: cat.color }}>
                      {cat.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-black text-coffee-800 dark:text-white uppercase tracking-tight">{cat.name}</p>
                      <p className="text-[10px] text-coffee-400 font-bold uppercase tracking-widest">{cat.courseCount} Courses</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="p-2 text-coffee-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <RotateCcw size={16} className="rotate-45" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Action Bar */}
        <div className="flex items-center justify-between p-6 bg-coffee-800 dark:bg-charcoal-light rounded-[2.5rem] shadow-2xl">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 text-xs font-black text-coffee-300 uppercase tracking-widest hover:text-white transition-colors"
          >
            <RotateCcw size={16} /> Reset
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
              saved 
                ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                : 'bg-accent text-white hover:bg-accent-hover shadow-accent/20'
            }`}
          >
            <Save size={18} />
            {saved ? 'Platform Updated' : 'Push Global Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}