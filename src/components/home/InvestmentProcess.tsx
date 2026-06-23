"use client";

import { motion } from "framer-motion";
import { Briefcase, Search, MapPinned, FileText, KeyRound } from "lucide-react";
import { Container } from "@/components/layout/Container";

const investmentProcess = [
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
    <section className="py-32 bg-secondary/60">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/5 border border-primary/15">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              How It Works
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            From First Visit To{" "}
            <span className="text-accent">Registered Deed</span>
          </h2>
          <p className="text-muted-foreground font-light text-lg">
            Four clear steps, the same way for every client — no shortcuts, no
            surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {investmentProcess.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-serif text-4xl font-bold text-primary/20">
                  {step.number}
                </span>
                <div className="w-11 h-11 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
                  <step.icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-serif font-bold text-lg text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
