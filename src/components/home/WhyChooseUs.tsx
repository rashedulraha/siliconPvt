"use client";

import { motion } from "framer-motion";
import { Shield, MapPin, CreditCard, UserCheck, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";

const features = [
  {
    icon: Shield,
    title: "Legal Security",
    description: "Every project is legally verified and approved by RAJUK and relevant government authorities.",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Strategically positioned in high-growth corridors with provable appreciation history.",
  },
  {
    icon: CreditCard,
    title: "Easy Payment Plans",
    description: "Flexible installment schedules designed around your financial timeline.",
  },
  {
    icon: UserCheck,
    title: "Expert Guidance",
    description: "Dedicated advisors who support you from shortlisting through deed registration.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-y bg-secondary/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/2 via-transparent to-primary/3 pointer-events-none" />

      <Container className="relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/12 flex items-center justify-center">
              <Star className="h-4 w-4 text-accent fill-accent/60" />
            </div>
            <span className="text-label text-accent">Core Advantages</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-serif text-display-md font-bold text-foreground"
          >
            Why Investors{" "}
            <span className="text-gold">Choose Us</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground text-lg font-light leading-relaxed"
          >
            We prioritise disciplined, well-documented development over
            attractive renders and empty promises.
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group relative bg-card rounded-xl p-7 border border-border card-lift shadow-luxury overflow-hidden"
            >
              {/* Top accent line — revealed on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-500">
                <feature.icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-500" />
              </div>

              <h3 className="font-serif font-bold text-[1.05rem] text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
