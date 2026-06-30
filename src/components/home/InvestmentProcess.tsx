"use client";

import { motion } from "framer-motion";
import { Briefcase, Search, MapPinned, FileText, KeyRound } from "lucide-react";
import { SectionContainer } from "../ui/section-container";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover & Shortlist",
    description:
      "Browse verified plots across our projects and shortlist what fits your budget and goals.",
  },
  {
    number: "02",
    icon: MapPinned,
    title: "Site Visit & Verification",
    description:
      "Walk the plot boundary with our team and review the RAJUK approval and deed in person.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Booking & Documentation",
    description:
      "Reserve your plot with a transparent agreement and a flexible installment plan.",
  },
  {
    number: "04",
    icon: KeyRound,
    title: "Registration & Handover",
    description:
      "Our legal team completes registration and hands over your deed with full support.",
  },
];

export function InvestmentProcess() {
  return (
    <section className="section-y  relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />

      <SectionContainer className="relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-display-md font-medium text-foreground">
            From First Visit to{" "}
            <span className="text-gold">Registered Deed</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground text-lg font-light leading-relaxed">
            Four clear steps — the same transparent process for every client.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-8 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gradient-to-r from-border via-accent/30 to-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="relative group">
                {/* Step icon — sits on connector line */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-luxury group-hover:bg-accent transition-colors duration-500 flex-shrink-0">
                    <step.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-4xl font-medium text-border/60 select-none">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-medium text-base text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {step.description}
                </p>

                {/* Bottom gold accent on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
