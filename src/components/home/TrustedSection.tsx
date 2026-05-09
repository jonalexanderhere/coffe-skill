"use client";

import { motion } from "framer-motion";

interface Partner {
  name: string;
  shortName: string;
}

const partners: Partner[] = [
  { name: "Liwa Technology Excellence Community", shortName: "LTEC" },
];

export default function TrustedSection() {
  return (
    <section className="py-14 border-y border-charcoal-200 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium text-coffee-500 uppercase tracking-widest mb-10">
          Dipercaya oleh berbagai institusi & sertifikasi
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-xl bg-charcoal-light border border-transparent hover:border-accent/30 hover:bg-charcoal transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center border border-accent/20">
                  <span className="text-sm font-bold text-accent">{partner.shortName.charAt(0)}</span>
                </div>
                <span className="text-xs font-semibold text-coffee-400 group-hover:text-coffee-200 transition-colors text-center leading-tight">
                  {partner.shortName}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
