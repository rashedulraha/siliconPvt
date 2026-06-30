"use client";

import { motion } from "framer-motion";
import { Shield, MapPin, CreditCard, UserCheck, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionContainer } from "../ui/section-container";

export function WhyChooseUs() {
  return (
    <section className="section-y bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-accent/2 via-transparent to-primary/3 pointer-events-none" />

      <SectionContainer className="relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3">
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
            className="text-display-md font-medium text-foreground">
            Why Investors <span className="text-gold">Choose Us</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground text-lg font-light leading-relaxed">
            We prioritise disciplined, well-documented development over
            attractive renders and empty promises.
          </motion.p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Legal Security (span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative bg-card rounded-2xl p-6 sm:p-8 border border-border/50 card-lift shadow-xs md:col-span-2 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors duration-500">
                <Shield className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-500" />
              </div>
              <h3 className="font-medium text-lg text-foreground mb-3">
                Legal Security &amp; Verification
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-xl">
                Every project is legally verified and approved by RAJUK and
                relevant government authorities. We guarantee clean title deeds
                and litigation-free properties.
              </p>
            </div>

            {/* Visual Indicators */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-border/40 pt-6">
              {[
                { title: "RAJUK Approved", desc: "100% compliant layouts" },
                { title: "Mutated Deeds", desc: "Clear chain of custody" },
                { title: "Zero Litigation", desc: "Legally vetted & secure" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-muted/40 rounded-xl p-3 border border-border/40">
                  <div className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    {item.title}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Prime Locations (span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative bg-card rounded-2xl p-6 sm:p-8 border border-border/50 card-lift shadow-xs md:col-span-1 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors duration-500">
                <MapPin className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-500" />
              </div>
              <h3 className="font-medium text-lg text-foreground mb-3">
                Prime Locations
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Strategically positioned in high-growth corridors with provable
                appreciation history.
              </p>
            </div>

            {/* Visual Indicator */}
            <div className="mt-8 bg-muted/40 rounded-xl p-4 border border-border/40 flex flex-col gap-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-accent">
                Active Corridors
              </div>
              <div className="flex items-center justify-between text-xs text-foreground font-medium">
                <span>Dhaka-Mawa Expressway</span>
                <span className="font-mono text-teal">12.5% YoY</span>
              </div>
              <div className="w-full bg-border/50 h-1 rounded-full overflow-hidden">
                <div className="bg-teal h-full w-[85%] rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Easy Payment Plans (span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative bg-card rounded-2xl p-6 sm:p-8 border border-border/50 card-lift shadow-xs md:col-span-1 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors duration-500">
                <CreditCard className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-500" />
              </div>
              <h3 className="font-medium text-lg text-foreground mb-3">
                Flexible Payment
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Flexible installment schedules designed around your financial
                timeline.
              </p>
            </div>

            {/* Payment Milestone Trail */}
            <div className="mt-8 flex items-center justify-between gap-1 relative pt-4 border-t border-border/40">
              {[
                { name: "Booking", pct: "20%" },
                { name: "Installments", pct: "50%" },
                { name: "Deed", pct: "30%" },
              ].map((mile, i) => (
                <div key={i} className="flex-1 text-center relative z-10">
                  <div className="text-[10px] font-bold text-primary font-mono">
                    {mile.pct}
                  </div>
                  <div className="text-[9px] text-muted-foreground mt-0.5">
                    {mile.name}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Expert Guidance (span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative bg-card rounded-2xl p-6 sm:p-8 border border-border/50 card-lift shadow-xs md:col-span-2 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors duration-500">
                <UserCheck className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-500" />
              </div>
              <h3 className="font-medium text-lg text-foreground mb-3">
                Expert Guidance &amp; Support
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-xl">
                Our dedicated advisors support you through every phase: from
                initial shortlisting and site visits to legal due diligence and
                final deed registration.
              </p>
            </div>

            {/* Path Steps */}
            <div className="mt-8 grid grid-cols-3 gap-2 border-t border-border/40 pt-6">
              {[
                { step: "01", label: "Consultation" },
                { step: "02", label: "Site Visit" },
                { step: "03", label: "Handover" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-muted/40 rounded-xl p-2.5 border border-border/40">
                  <span className="font-mono text-xs text-accent font-bold">
                    {item.step}
                  </span>
                  <span className="text-[10px] text-foreground font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}
