"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/lib/mock-data";

export default function TeamSection() {
  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2
          className="text-2xl font-bold text-coffee-800 dark:text-white mb-4"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Tim Pengembang CoffeeSkill
        </h2>
        <p className="text-coffee-500 dark:text-coffee-400 max-w-2xl mx-auto">
          Para developer berbakat yang berdedikasi membangun platform pembelajaran teknologi terbaik untuk Indonesia.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-charcoal-light rounded-2xl border border-coffee-100 dark:border-charcoal-200 overflow-hidden hover:shadow-md dark:hover:shadow-lg transition-shadow"
          >
            {/* Avatar */}
            <div className="relative h-48 bg-gradient-to-b from-coffee-50 to-coffee-100 dark:from-charcoal-200 dark:to-charcoal-300">
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                className="object-cover object-center"
                unoptimized
              />
            </div>

            {/* Info */}
            <div className="p-6">
              <h3
                className="text-lg font-semibold text-coffee-800 dark:text-white mb-1"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {member.name}
              </h3>
              <p className="text-sm text-accent font-medium mb-3">{member.role}</p>
              <p className="text-sm text-coffee-600 dark:text-coffee-300 mb-4">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <Link
                  href={`mailto:${member.email}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium text-coffee-600 dark:text-coffee-300 bg-coffee-50 dark:bg-charcoal hover:bg-coffee-100 dark:hover:bg-charcoal-200 rounded-lg transition-colors"
                  title="Email"
                >
                  <Mail size={14} />
                  Email
                </Link>
                <Link
                  href={`https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium text-coffee-600 dark:text-coffee-300 bg-coffee-50 dark:bg-charcoal hover:bg-coffee-100 dark:hover:bg-charcoal-200 rounded-lg transition-colors"
                  title="GitHub"
                >
                  <ExternalLink size={14} />
                  GitHub
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
