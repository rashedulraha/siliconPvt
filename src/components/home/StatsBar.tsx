"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Building2, TrendingUp } from "lucide-react";

const stats = [
  { icon: Calendar,   value: "10+",    label: "Years of Excellence" },
  { icon: Users,      value: "1,500+", label: "Happy Clients" },
  { icon: Building2,  value: "25+",    label: "Projects Delivered" },
  { icon: TrendingUp, value: "800+",   label: "Acres Developed" },
];

export function StatsBar() {
  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Container holding apple minimalism subtle bounding lines */}
      <div className="bg-card border border-border/80 rounded-xl shadow-sm overflow-hidden divide-y divide-border/60 md:divide-y-0 md:divide-x divide-border/60 grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 1, 0.5, 1] }}
            className="group relative p-6 sm:p-7 text-center bg-card hover:bg-muted/40 transition-colors duration-200"
          >
            {/* Minimal Icon Core Layout */}
            <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center mx-auto mb-3.5 border border-border group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800 transition-colors duration-200">
              <stat.icon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
            </div>

            {/* Premium Numeric Value — Stripped out broken Serif logic */}
            <div className="font-sans font-normal text-2xl sm:text-3xl tracking-tight text-foreground mb-0.5">
              {stat.value}
            </div>

            {/* Micro Balanced Sub-label */}
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}