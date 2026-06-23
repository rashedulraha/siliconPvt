"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Building2, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/Container";

const stats = [
  { icon: Calendar,   value: "10+",    label: "Years of Excellence", color: "text-accent" },
  { icon: Users,      value: "1,500+", label: "Happy Clients",       color: "text-accent" },
  { icon: Building2,  value: "25+",    label: "Projects Delivered",  color: "text-accent" },
  { icon: TrendingUp, value: "800+",   label: "Acres Developed",     color: "text-accent" },
];

export function StatsBar() {
  return (
    <section className="relative z-20 -mt-10">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className="group relative bg-card border border-border rounded-xl p-5 sm:p-6 text-center card-lift shadow-luxury overflow-hidden"
            >
              {/* Gold top accent line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

              {/* Icon */}
              <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors duration-300">
                <stat.icon className="h-5 w-5 text-accent" />
              </div>

              {/* Value */}
              <div className="font-serif font-bold text-[clamp(1.6rem,3vw,2.25rem)] leading-none text-foreground mb-1">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {stat.label}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-luxury-gold" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
