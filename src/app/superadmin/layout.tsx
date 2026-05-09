"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  DollarSign,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  Menu,
  MessageSquare,
  Award,
  LogOut,
  Shield,
  BarChart3,
  FileText,
} from "lucide-react";

const sidebarLinks = [
  { label: "Overview", href: "/superadmin", icon: LayoutDashboard },
  { label: "Manajemen User", href: "/superadmin/users", icon: Users },
  { label: "Persetujuan Kursus", href: "/superadmin/courses", icon: BookOpen },
  { label: "Kategori", href: "/superadmin/categories", icon: FileText },
  { label: "Statistik", href: "/superadmin/stats", icon: BarChart3 },
  { label: "Transaksi", href: "/superadmin/transactions", icon: DollarSign },
  { label: "Pengaturan", href: "/superadmin/settings", icon: Settings },
];

function SidebarContent({ 
  collapsed, 
  pathname, 
  logout, 
  setMobileOpen 
}: { 
  collapsed: boolean; 
  pathname: string; 
  logout: () => void;
  setMobileOpen: (open: boolean) => void;
}) {
  return (
    <>
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="w-10 h-10 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 shrink-0">
          <Image src="/coffeskill.png" alt="CoffeeSkill" width={24} height={24} className="brightness-0 invert" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tighter text-coffee-800 dark:text-white leading-none" style={{ fontFamily: "var(--font-poppins)" }}>
              COFFEE<span className="text-accent">SKILL</span>
            </span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[8px] font-black text-red-500 uppercase tracking-[0.2em]">
                System Override
              </span>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {!collapsed && <p className="text-[9px] font-black text-coffee-300 uppercase tracking-[0.3em] mb-4 ml-4">Core Management</p>}
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/superadmin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center gap-4 px-4 py-3.5 rounded-[1.25rem] transition-all duration-300 ${
                isActive
                  ? "bg-accent text-white shadow-xl shadow-accent/20 translate-x-1"
                  : "text-coffee-500 dark:text-coffee-400 hover:bg-coffee-50 dark:hover:bg-charcoal-200 hover:text-accent"
              }`}
            >
              <link.icon size={20} className={`shrink-0 transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:rotate-12'}`} />
              {!collapsed && <span className="text-xs font-black uppercase tracking-widest">{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all group"
        >
          <LogOut size={20} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
          {!collapsed && <span>Terminate Session</span>}
        </button>
      </div>
    </>
  );
}

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-coffee-50/50 dark:bg-charcoal">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-white dark:bg-charcoal-light border-r border-coffee-100 dark:border-charcoal-200 transition-all duration-300 shrink-0 ${collapsed ? "w-[72px]" : "w-[260px]"}`}>
        <SidebarContent 
          collapsed={collapsed} 
          pathname={pathname} 
          logout={logout} 
          setMobileOpen={setMobileOpen} 
        />
        <button onClick={() => setCollapsed(!collapsed)} className="p-3 border-t border-coffee-100 dark:border-charcoal-200 text-coffee-400 hover:text-coffee-600 flex items-center justify-center">
          <ChevronLeft size={16} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-white dark:bg-charcoal-light flex flex-col shadow-xl">
            <SidebarContent 
              collapsed={false} 
              pathname={pathname} 
              logout={logout} 
              setMobileOpen={setMobileOpen} 
            />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-charcoal-light/80 backdrop-blur-md border-b border-coffee-100 dark:border-charcoal-200 px-4 lg:px-8 py-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-coffee-500 hover:bg-coffee-50 rounded-xl">
              <Menu size={20} />
            </button>
            <div className="flex-1 max-w-md relative hidden sm:block">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-400" />
              <input type="text" placeholder="Cari data platform..." className="w-full pl-10 pr-4 py-2 text-sm bg-coffee-50 dark:bg-charcoal border border-transparent rounded-xl text-coffee-800 dark:text-white focus:outline-none" />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button className="relative p-2 text-coffee-500 hover:bg-coffee-50 dark:hover:bg-charcoal-200 rounded-xl">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                  {user?.name?.charAt(0) || "SA"}
                </div>
                <span className="text-sm font-medium text-coffee-700 dark:text-white hidden sm:block">{user?.name}</span>
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