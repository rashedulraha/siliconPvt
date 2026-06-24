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
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const highlights = [
  "RAJUK & Government Approved Projects",
  "100% Legal & Transparent Documentation",
  "Flexible Installment Payment Plans",
  "Prime Locations with High ROI Potential",
];

export function AboutSection() {
  return (
    <section className="relative w-full py-20 bg-background border-b border-border overflow-hidden">
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 xl:gap-16 items-center">

          {/* ── LEFT PANEL: Clean Modern Typographic Architecture ── */}
          <div className="space-y-6 text-left">

            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2"
            >

              {/*  about page  */}
              <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center border border-border">
                <Building2 className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-400" />
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                About Silicon Real Estate
              </span>
            </motion.div>

            {/* Headline — Stripped out serif and gold text accents */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-[1.15]"
            >
              Building Secure, <br />
              <span className="font-medium text-neutral-500 dark:text-neutral-400">Future-Ready Communities</span>
            </motion.h2>

            {/* Minimalist Divider line asset */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ originX: 0 }}
            >
              <div className="w-12 h-0.5 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
            </motion.div>

            {/* Body Corporate Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light"
            >
              Silicon Real Estate (Pvt.) Ltd. is a verified framework authority in land development across Dhaka. We deliver high-yield architectural plots backed by secure transparent legal registry from booking straight to full demarcation.
            </motion.p>

            {/* Production Quality Sitemapped Checklist */}
            <ul className="space-y-2.5">
              {highlights.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                  className="flex items-start gap-2.5"
                >
                  <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-md bg-muted flex items-center justify-center border border-border">
                    <CheckCircle className="h-3 w-3 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <span className="text-foreground text-xs font-normal">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Actions Route Block */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="pt-2"
            >
              <Link href="/about">
                <Button className="h-10 px-5 text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 rounded-lg shadow-xs flex items-center gap-1 group">
                  Discover Our Story
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT PANEL: Unified Card-Image Contrast Matrix ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Column 1 Layout */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border bg-muted"
              >
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"
                  alt="Silicon Real Estate architectural layout grid"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-90 dark:opacity-75 select-none pointer-events-none"
                />
              </motion.div>

              {/* Mission Premium Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="bg-card border border-border rounded-xl p-5 shadow-xs text-left"
              >
                <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center border border-border mb-3">
                  <Sparkles className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <p className="text-xs font-medium text-foreground mb-1">Our Mission</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                  Make verified, high-yield land investment tracks accessible and secure across Bangladesh.
                </p>
              </motion.div>
            </div>

            {/* Column 2 Layout (Offset layout architecture for crisp design feel) */}
            <div className="space-y-4 sm:pt-8">
              
              {/* Chairman Strategic Target Mapping Card — (Crucial context fix for IMG-20260620-WA0003(1).jpg) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-5 shadow-xs text-left"
              >
                <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center border border-border mb-3">
                  <UserCheck className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <p className="text-xs font-medium text-foreground mb-1">Chairman Message</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                  "Delivering transparent infrastructure assets because customer trust remains our highest currency."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="bg-card border border-border rounded-xl p-5 shadow-xs text-left"
              >
                <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center border border-border mb-3">
                  <Award className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <p className="text-xs font-medium text-foreground mb-1">Our Vision</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                  Establish an uncompromised standard of absolute transparency inside regional real estate.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border bg-muted"
              >
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
                  alt="Silicon Real Estate execution team asset"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-90 dark:opacity-75 select-none pointer-events-none"
                />
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}