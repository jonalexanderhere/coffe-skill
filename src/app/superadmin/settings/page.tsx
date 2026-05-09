"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, DollarSign, Mail, Bell, Shield, Save, RotateCcw } from "lucide-react";
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Pengaturan Platform
        </h1>
        <p className="text-sm text-coffee-500 dark:text-coffee-400 mt-1">
          Konfigurasi umum dan pengaturan platform CoffeeSkill
        </p>
      </div>

      {/* General Settings */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
        <div className="p-5 border-b border-coffee-100 dark:border-charcoal-200 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-coffee-100 dark:bg-charcoal-200">
            <Settings size={18} className="text-coffee-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-coffee-800 dark:text-white">Pengaturan Umum</h2>
            <p className="text-xs text-coffee-500">Informasi dasar platform</p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
              Nama Platform
            </label>
            <input
              type="text"
              value={formData.platformName}
              onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
              className="w-full px-4 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
              Email Support
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-coffee-50 dark:bg-charcoal-200 rounded-xl">
            <div>
              <p className="text-sm font-medium text-coffee-700 dark:text-white">Mode Maintenance</p>
              <p className="text-xs text-coffee-500">Aktifkan untuk menonaktifkan akses user</p>
            </div>
            <button
              onClick={() => setFormData({ ...formData, maintenanceMode: !formData.maintenanceMode })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                formData.maintenanceMode ? 'bg-red-500' : 'bg-coffee-300'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                formData.maintenanceMode ? 'right-1' : 'left-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Commission Settings */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
        <div className="p-5 border-b border-coffee-100 dark:border-charcoal-200 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
            <DollarSign size={18} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-coffee-800 dark:text-white">Pengaturan Komisi</h2>
            <p className="text-xs text-coffee-500">Komisi platform dari penjualan kursus</p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
              Rate Komisi (%)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="50"
                value={formData.commissionRate}
                onChange={(e) => setFormData({ ...formData, commissionRate: parseInt(e.target.value) })}
                className="flex-1 h-2 bg-coffee-200 dark:bg-charcoal-300 rounded-full appearance-none cursor-pointer"
              />
              <span className="w-16 text-center text-sm font-bold text-coffee-800 dark:text-white">
                {formData.commissionRate}%
              </span>
            </div>
            <p className="text-xs text-coffee-500 mt-2">
              Mentor akan mendapatkan {(100 - formData.commissionRate)}% dari harga kursus
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
              Minimum Pencairan
            </label>
            <input
              type="number"
              value={formData.minimumPayout}
              onChange={(e) => setFormData({ ...formData, minimumPayout: parseInt(e.target.value) })}
              className="w-full px-4 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
            />
            <p className="text-xs text-coffee-500 mt-1">
              Minimum: {formatCurrency(formData.minimumPayout)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-700 dark:text-coffee-300 mb-1.5">
              Jadwal Pencairan
            </label>
            <select
              value={formData.payoutSchedule}
              onChange={(e) => setFormData({ ...formData, payoutSchedule: e.target.value as 'weekly' | 'monthly' })}
              className="w-full px-4 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
            >
              <option value="weekly"> Mingguan</option>
              <option value="monthly"> Bulanan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Management */}
      <div className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden">
        <div className="p-5 border-b border-coffee-100 dark:border-charcoal-200 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/20">
            <Shield size={18} className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-coffee-800 dark:text-white">Kategori Kursus</h2>
            <p className="text-xs text-coffee-500">Kelola kategori yang tersedia di platform</p>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              placeholder="Nama kategori baru..."
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="flex-1 px-4 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-coffee-200 dark:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white focus:outline-none"
            />
            <input
              type="color"
              value={newCategory.color}
              onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
              className="w-10 h-10 rounded-lg border-0 cursor-pointer"
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2.5 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors"
            >
              Tambah
            </button>
          </div>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between p-3 bg-coffee-50 dark:bg-charcoal-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm font-medium text-coffee-700 dark:text-white">{cat.name}</span>
                  <span className="text-xs text-coffee-400">{cat.courseCount} kursus</span>
                </div>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-coffee-600 dark:text-coffee-300 hover:bg-coffee-50 rounded-xl transition-colors"
        >
          <RotateCcw size={16} /> Reset ke Default
        </button>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors ${
            saved ? 'bg-emerald-500' : 'bg-accent hover:bg-accent-hover'
          }`}
        >
          <Save size={16} /> {saved ? 'Tersimpan!' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
}