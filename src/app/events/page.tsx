"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, Video, Wrench, MapPin, ArrowRight, Filter } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { events } from "@/lib/mock-data";

const typeConfig: Record<string, { icon: React.ElementType; label: string; color: string; bg: string }> = {
  webinar: { icon: Video, label: "Webinar", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  workshop: { icon: Wrench, label: "Workshop", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  meetup: { icon: MapPin, label: "Meetup", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-white dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-3xl font-bold text-coffee-800 dark:text-white mb-2" style={{ fontFamily: "var(--font-poppins)" }}>Event & Webinar</h1>
            <p className="text-coffee-500 dark:text-coffee-400">Ikuti event, webinar, dan workshop dari para ahli di bidangnya</p>
          </motion.div>

          {/* Featured Event */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10 p-8 bg-gradient-to-r from-coffee-800 to-coffee-900 dark:from-charcoal-light dark:to-charcoal rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-accent rounded-lg">Featured</span>
              <span className="px-3 py-1 text-xs font-medium text-coffee-300 bg-coffee-700/50 rounded-lg">Upcoming</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
              {events[0].title}
            </h2>
            <p className="text-coffee-300 text-sm mb-5 max-w-xl">{events[0].description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-coffee-300 mb-6">
              <span className="flex items-center gap-1.5"><Calendar size={14} />{events[0].date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{events[0].time}</span>
              <span className="flex items-center gap-1.5"><Users size={14} />{events[0].attendees} peserta</span>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors">
              Daftar Sekarang <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* All Events */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => {
              const config = typeConfig[event.type];
              const Icon = config.icon;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-6 hover:shadow-sm hover:border-coffee-200 dark:hover:border-charcoal-300 transition-all"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`p-2 rounded-lg ${config.bg}`}><Icon size={16} className={config.color} /></div>
                    <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                  </div>
                  <h3 className="text-base font-semibold text-coffee-800 dark:text-white mb-2">{event.title}</h3>
                  <p className="text-sm text-coffee-500 dark:text-coffee-400 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-3 text-xs text-coffee-400 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12} />{event.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{event.time}</span>
                  </div>
                  <button className="w-full py-2.5 text-sm font-medium text-accent border border-accent/20 hover:bg-accent-light dark:hover:bg-accent/10 rounded-xl transition-colors">
                    Daftar
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
