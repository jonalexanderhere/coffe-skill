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

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Event", href: "/events" },
  { label: "Community", href: "/community" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
