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
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-coffee-100 dark:border-charcoal-200">
        <Image src="/coffeskill.png" alt="CoffeeSkill" width={28} height={28} className="rounded-lg shrink-0" />
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-coffee-800 dark:text-white leading-none" style={{ fontFamily: "var(--font-poppins)" }}>
              Coffee<span className="text-accent">Skill</span>
            </span>
            <span className="text-[10px] font-semibold text-red-500 uppercase tracking-wider mt-1 flex items-center gap-1">
              <Shield size={10} /> Super Admin
            </span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/superadmin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                  : "text-coffee-600 dark:text-coffee-400 hover:bg-coffee-50 dark:hover:bg-charcoal-200 hover:text-coffee-800 dark:hover:text-white"
              }`}
            >
              <link.icon size={18} className="shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-coffee-100 dark:border-charcoal-200">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span>Keluar</span>}
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