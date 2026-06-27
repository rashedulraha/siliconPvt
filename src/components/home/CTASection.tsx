"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Star, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";

const trustPoints = [
  { icon: Star, label: "RAJUK Approved" },
  { icon: Sparkles, label: "Bank Partnered" },
  { icon: Star, label: "1,500+ Happy Clients" },
  { icon: Sparkles, label: "10+ Years Experience" },
];

export function CTASection() {
  return (
    <section className="section-y bg-transparent">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-primary rounded-2xl overflow-hidden"
        >
          {/* Ambient gold glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-accent/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] bg-accent/8 rounded-full blur-[80px] pointer-events-none" />

          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          {/* Gold top border */}
          <div className="absolute top-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 md:px-20">
            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {trustPoints.map(({ icon: Icon, label }, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/12 text-white/70 text-xs font-medium"
                >
                  <Icon className="w-3 h-3 text-accent" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="text-center space-y-6 max-w-3xl mx-auto"
            >
              <h2 className="font-medium text-white leading-[1.08]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
              >
                Ready to Invest in Your{" "}
                <span className="text-gold">Future?</span>
              </h2>

              <p className="text-white/60 font-light text-lg sm:text-xl leading-relaxed max-w-xl mx-auto">
                Join 1,500+ investors who chose transparent, RAJUK-approved land
                across our prime projects.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-9 h-13 rounded-xl font-bold text-accent-foreground text-sm hover:brightness-110 hover:scale-[1.02] transition-all duration-300 gold-shimmer shadow-luxury-gold"
                  style={{ height: "52px" }}
                >
                  Get Started Today
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 rounded-xl border border-white/25 text-white/85 font-medium text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  style={{ height: "52px" }}
                >
                  <Phone className="h-4 w-4" />
                  View Specifications
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Gold bottom border */}
          <div className="absolute bottom-0 left-16 right-16 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </motion.div>
      </Container>
    </section>
  );
}
