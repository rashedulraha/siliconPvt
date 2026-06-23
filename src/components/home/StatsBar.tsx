"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Building2, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/Container";

const stats = [
  { icon: Calendar, value: "10+", label: "Years of Excellence" },
  { icon: Users, value: "1500+", label: "Happy Clients" },
  { icon: Building2, value: "25+", label: "Projects Completed" },
  { icon: TrendingUp, value: "800+", label: "Acres Developed" },
];

export function StatsBar() {
  return (
    <section className="relative -mt-20 z-30">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`bg-card rounded-lg p-6 text-center shadow-lg border-t-4 ${
                i % 2 === 0 ? "border-primary" : "border-accent"
              } hover:-translate-y-1 transition-all duration-500`}>
              <stat.icon className="h-7 w-7 text-primary mx-auto mb-3" />
              <div className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-2 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
