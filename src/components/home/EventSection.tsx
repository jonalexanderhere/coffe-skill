"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, ArrowRight, Video, Wrench, MapPin } from "lucide-react";
import { useEventStore } from "@/lib/store";
import Link from "next/link";

const typeConfig = {
  webinar: { icon: Video, label: "Webinar", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  workshop: { icon: Wrench, label: "Workshop", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  meetup: { icon: MapPin, label: "Meetup", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
};

export default function EventSection() {
  const { events } = useEventStore();

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2
              className="text-3xl lg:text-4xl font-bold text-coffee-800 dark:text-white mb-3"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Event & Webinar
            </h2>
            <p className="text-coffee-500 dark:text-coffee-400 max-w-lg">
              Ikuti event dan webinar eksklusif bersama para ahli di bidangnya
            </p>
          </div>
          <Link
            href="/events"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            Semua Event
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => {
            const config = typeConfig[event.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/events`}
                  className="group block bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 p-6 hover:shadow-sm hover:border-coffee-200 dark:hover:border-charcoal-300 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`p-2 rounded-lg ${config.bg}`}>
                      <Icon size={16} className={config.color} />
                    </div>
                    <span className={`text-xs font-medium ${config.color}`}>
                      {config.label}
                    </span>
                    {event.isUpcoming && (
                      <span className="ml-auto px-2 py-0.5 text-[10px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 rounded-md">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-coffee-800 dark:text-white mb-2 group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-coffee-500 dark:text-coffee-400 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-coffee-400 dark:text-coffee-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(event.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={12} />
                      {event.attendees}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
