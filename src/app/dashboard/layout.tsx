"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  MessageCircle,
  Calendar,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  LogOut,
  Heart,
  History,
  Menu,
  X,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Kursus Saya", href: "/dashboard/courses", icon: BookOpen },
  { label: "Sertifikat", href: "/certificate", icon: Award },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { label: "Riwayat", href: "/dashboard/history", icon: History },
  { label: "Diskusi", href: "/community", icon: MessageCircle },
  { label: "Kalender", href: "/dashboard/calendar", icon: Calendar },
  { label: "Pengaturan", href: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-coffee-100 dark:border-charcoal-200">
        <Image src="/coffeskill.png" alt="CoffeeSkill" width={28} height={28} className="rounded-lg shrink-0" />
        {!collapsed && (
          <span className="text-base font-bold tracking-tight text-coffee-800 dark:text-white" style={{ fontFamily: "var(--font-poppins)" }}>
            Coffee<span className="text-accent">Skill</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-coffee-500 dark:text-coffee-400 hover:bg-coffee-50 dark:hover:bg-charcoal-200 hover:text-coffee-700 dark:hover:text-white"
              }`}
            >
              <link.icon size={18} className="shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-coffee-100 dark:border-charcoal-200">
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/40 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
            {user?.name?.charAt(0) || "S"}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-coffee-700 dark:text-white truncate">{user?.name || "Student"}</p>
              <p className="text-xs text-coffee-400 truncate capitalize">{user?.role || "student"}</p>
            </div>
          )}
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-coffee-50/50 dark:bg-charcoal">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white dark:bg-charcoal-light border-r border-coffee-100 dark:border-charcoal-200 transition-all duration-300 shrink-0 ${
          collapsed ? "w-[72px]" : "w-[260px]"
        }`}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 border-t border-coffee-100 dark:border-charcoal-200 text-coffee-400 hover:text-coffee-600 dark:hover:text-white flex items-center justify-center"
        >
          <ChevronLeft size={16} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-white dark:bg-charcoal-light flex flex-col shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-charcoal-light/80 backdrop-blur-md border-b border-coffee-100 dark:border-charcoal-200 px-4 lg:px-8 py-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-coffee-500 hover:bg-coffee-50 dark:hover:bg-charcoal-200 rounded-xl">
              <Menu size={20} />
            </button>
            <div className="flex-1 max-w-md relative hidden sm:block">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
              <input
                type="text"
                placeholder="Cari kursus, mentor..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-coffee-50 dark:bg-charcoal border border-transparent focus:border-coffee-200 dark:focus:border-charcoal-200 rounded-xl text-coffee-800 dark:text-white placeholder:text-coffee-400 outline-none transition-colors"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="relative p-2.5 text-coffee-500 hover:bg-coffee-50 dark:hover:bg-charcoal-200 rounded-xl transition-colors">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/40 flex items-center justify-center text-xs font-bold text-emerald-400">
                {user?.name?.charAt(0) || "S"}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
