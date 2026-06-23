"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Award,
} from "lucide-react";
import { Container } from "@/components/layout/Container";

const highlights = [
  "RAJUK & Government Approved Projects",
  "100% Legal & Transparent Documentation",
  "Flexible Installment Payment Plans",
  "Prime Locations with High ROI Potential",
];

const cards = [
  {
    icon: Sparkles,
    title: "Our Mission",
    body: "Make verified, high-yield land ownership accessible, secure, and completely transparent for every investor.",
  },
  {
    icon: Award,
    title: "Our Vision",
    body: "Become Bangladesh's most trusted land development agency, known for integrity over marketing.",
  },
];

export function AboutSection() {
  return (
    <section className="section-y bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/3 via-transparent to-primary/3 pointer-events-none" />

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── LEFT — Copy ─────────────────────────────────────── */}
          <div className="space-y-7">

            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/12 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-accent" />
              </div>
              <span className="text-label text-accent">About Silicon Real Estate</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-serif text-display-md font-bold text-foreground leading-[1.12]"
            >
              Building <span className="text-gold">Future-Ready</span>{" "}
              Communities
            </motion.h2>

            {/* Gold divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ originX: 0 }}
            >
              <div className="divider-gold" />
            </motion.div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-muted-foreground text-base sm:text-lg leading-relaxed font-light"
            >
              Silicon Real Estate (Pvt.) Ltd. is a trusted name in land
              development across Dhaka. We deliver high-yield plots backed by
              legal verification, RAJUK approval, and a fully transparent process
              from booking to registration.
            </motion.p>

            {/* Checklist */}
            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.22 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center">
                    <CheckCircle className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <span className="text-foreground font-medium text-[15px] leading-snug">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-7 h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300 shadow-luxury"
              >
                Discover Our Story
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT — Image mosaic ─────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-4">
              {/* Tall image */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-luxury-lg group"
              >
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"
                  alt="Silicon Real Estate architecture"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              </motion.div>

              {/* Mission card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="bg-card border border-border rounded-xl p-5 card-lift shadow-luxury"
              >
                <Sparkles className="h-6 w-6 text-accent mb-3" />
                <p className="font-serif font-bold text-foreground text-sm mb-1.5">
                  Our Mission
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Make verified, high-yield land ownership accessible and secure.
                </p>
              </motion.div>
            </div>

            <div className="space-y-4 pt-10">
              {/* Vision card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.3 }}
                className="bg-card border border-border rounded-xl p-5 card-lift shadow-luxury"
              >
                <Award className="h-6 w-6 text-accent mb-3" />
                <p className="font-serif font-bold text-foreground text-sm mb-1.5">
                  Our Vision
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Be Bangladesh's most transparent land development agency.
                </p>
              </motion.div>

              {/* Tall image */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.18 }}
                className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-luxury-lg group"
              >
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
                  alt="Silicon Real Estate team"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
