"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Settings,
  BookOpen,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "E-books", href: "/explore/ebooks" },
  { label: "Event", href: "/events" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <Image
                src="/coffeskill.png"
                alt="CoffeeSkill"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span
                className="text-xl font-bold tracking-tight text-coffee-800 dark:text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Coffee<span className="text-accent">Skill</span>
              </span>
              <span className="px-1.5 py-0.5 text-[8px] font-bold text-accent bg-accent/10 border border-accent/20 rounded-md">
                BETA
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-coffee-600 hover:text-coffee-800 dark:text-coffee-300 dark:hover:text-white rounded-lg hover:bg-coffee-50 dark:hover:bg-charcoal-200 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                className="p-2.5 text-coffee-400 hover:text-white hover:bg-charcoal-200 rounded-xl transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <button
                className="relative p-2.5 text-coffee-500 hover:text-coffee-700 dark:text-coffee-300 dark:hover:text-white hover:bg-coffee-50 dark:hover:bg-charcoal-200 rounded-xl transition-colors"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
              </button>

              <div className="w-px h-6 bg-coffee-200 dark:bg-charcoal-200 mx-1" />

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl border border-coffee-100 dark:border-charcoal-200 hover:bg-coffee-50 dark:hover:bg-charcoal-light transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-bold text-xs">
                      {user?.name?.[0].toUpperCase() || "S"}
                    </div>
                    <ChevronDown size={14} className={`text-coffee-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 p-2 bg-white dark:bg-charcoal shadow-xl border border-coffee-100 dark:border-charcoal-200 rounded-2xl"
                      >
                        <div className="px-3 py-3 border-b border-coffee-50 dark:border-charcoal-200 mb-2">
                          <p className="text-sm font-bold text-coffee-800 dark:text-white">{user?.name}</p>
                          <p className="text-[10px] text-coffee-400 truncate">{user?.email}</p>
                        </div>
                        
                        <Link
                          href={user?.role === 'superadmin' ? '/superadmin' : user?.role === 'mentor' ? '/mentor' : '/dashboard'}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-coffee-600 dark:text-coffee-300 hover:bg-coffee-50 dark:hover:bg-charcoal-light rounded-xl transition-colors"
                        >
                          <LayoutDashboard size={16} /> Dashboard
                        </Link>
                        <Link
                          href="/dashboard/courses"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-coffee-600 dark:text-coffee-300 hover:bg-coffee-50 dark:hover:bg-charcoal-light rounded-xl transition-colors"
                        >
                          <BookOpen size={16} /> Kursus Saya
                        </Link>
                        <Link
                          href="/dashboard/settings"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-coffee-600 dark:text-coffee-300 hover:bg-coffee-50 dark:hover:bg-charcoal-light rounded-xl transition-colors"
                        >
                          <Settings size={16} /> Pengaturan
                        </Link>
                        
                        <div className="h-px bg-coffee-50 dark:bg-charcoal-200 my-2" />
                        
                        <button
                          onClick={() => { logout(); setProfileOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                          <LogOut size={16} /> Keluar
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-coffee-700 dark:text-coffee-200 hover:text-coffee-800 dark:hover:text-white transition-colors"
                  >
                    Masuk
                  </Link>

                  <Link
                    href="/register"
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors shadow-sm"
                  >
                    Daftar Gratis
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-coffee-600 dark:text-coffee-300 hover:bg-coffee-50 dark:hover:bg-charcoal-200 rounded-xl transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute top-0 left-0 right-0 bg-white dark:bg-charcoal shadow-lg pt-20 pb-6 px-4">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-coffee-700 dark:text-coffee-200 hover:bg-coffee-50 dark:hover:bg-charcoal-200 rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-coffee-100 dark:border-charcoal-200 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-center text-sm font-medium text-coffee-700 dark:text-coffee-200 hover:bg-coffee-50 dark:hover:bg-charcoal-200 rounded-xl transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-center text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors"
                >
                  Daftar Gratis
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
