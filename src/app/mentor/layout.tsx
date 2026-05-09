"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  BookOpen,
  DollarSign,
  Users,
  Video,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  Menu,
  LogOut,
  Award
} from "lucide-react";

const sidebarLinks = [
  { label: "Overview", href: "/mentor", icon: LayoutDashboard },
  { label: "Kursus Saya", href: "/mentor/courses", icon: BookOpen },
  { label: "Buat Kursus", href: "/mentor/courses/create", icon: Video },
  { label: "Siswa Saya", href: "/mentor/students", icon: Users },
  { label: "Kuis & Tugas", href: "/mentor/assignments", icon: FileText },
  { label: "Sertifikat", href: "/certificate", icon: Award },
  { label: "Pendapatan", href: "/mentor/revenue", icon: DollarSign },
  { label: "Pengaturan", href: "/settings", icon: Settings },
];

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-charcoal-200">
        <Image src="/coffeskill.png" alt="CoffeeSkill" width={28} height={28} className="rounded-lg shrink-0" />
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white leading-none" style={{ fontFamily: "var(--font-poppins)" }}>
              Coffee<span className="text-accent">Skill</span>
            </span>
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mt-1">Mentor Hub</span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/mentor" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-coffee-400 hover:bg-charcoal-200 hover:text-white"
              }`}
            >
              <link.icon size={18} className="shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-charcoal-200">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-charcoal">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-charcoal-light border-r border-charcoal-200 transition-all duration-300 shrink-0 ${collapsed ? "w-[72px]" : "w-[260px]"}`}>
        <SidebarContent />
        <button onClick={() => setCollapsed(!collapsed)} className="p-3 border-t border-charcoal-200 text-coffee-400 hover:text-white flex items-center justify-center">
          <ChevronLeft size={16} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-charcoal-light flex flex-col shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-charcoal-light/90 backdrop-blur-md border-b border-charcoal-200 px-4 lg:px-8 py-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-coffee-400 hover:bg-charcoal-200 rounded-xl">
              <Menu size={20} />
            </button>
            <div className="flex-1 max-w-md relative hidden sm:block">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
              <input type="text" placeholder="Cari materi, siswa..." className="w-full pl-10 pr-4 py-2 text-sm bg-charcoal border border-transparent rounded-xl text-white placeholder:text-coffee-500 focus:outline-none" />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/mentor/courses/create" className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-lg transition-colors">
                <Video size={16} /> Buat Kursus
              </Link>
              <button className="relative p-2 text-coffee-400 hover:bg-charcoal-200 rounded-xl">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0) || "M"}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
