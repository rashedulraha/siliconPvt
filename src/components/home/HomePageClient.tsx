"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeroGlassCarousel } from "./glass/HeroGlassCarousel";
import { IntroCoreValuesGlassGrid } from "./glass/IntroCoreValuesGlassGrid";
import { SiliconCityShowcase } from "./glass/SiliconCityShowcase";
import { LeadershipGlassBlocks } from "./glass/LeadershipGlassBlocks";
import { OfflineMembershipGlassBanner } from "./glass/OfflineMembershipGlassBanner";
import { SectionContainer } from "../layout/SectionContainer";

export function HomePageClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  const trustCounters = [
    {
      value: "10+",
      label: "Years of Professional Experience & Ethics",
      detail: "10+ Years Dedicated Service",
    },
    {
      value: "1000+",
      label: "Happy Clients Secured Future Address",
      detail: "1,000+ Plot Allotments",
    },
    {
      value: "15+",
      label: "Completed & Ongoing Development Projects",
      detail: "15+ Flagship Townships",
    },
    {
      value: "100%",
      label: "Legally Sound Deed Registries Completed",
      detail: "100% Legal Ownership",
    },
  ];

  const accreditations = [
    "RAJUK Compliant Planning",
    "REHAB Member Organization",
    "ISO 9001:2015 Certified Management",
    "Government Authorized Land Developer",
    "100% Legal Ownership Clearance Certified",
  ];

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden flex flex-col">
      {/* ── SECTION 1: Hero Carousel / Slider ── */}
      <HeroGlassCarousel />

      {/* ── SECTION 2 & SECTION 4: Welcome & Introduction + Core Values ── */}
      <IntroCoreValuesGlassGrid />

      {/* ── SECTION 3 & SECTION 5: Silicon City Highlight + Summary of Services ── */}
      <SiliconCityShowcase />

      {/* ── SECTION 8: REDESIGNED OUR TRACK RECORD (No Icons) ── */}
      <section className="py-20 sm:py-24 bg-dark-hero text-white relative overflow-hidden">
        {/* Subtle Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <SectionContainer className="relative z-10 space-y-12">
          {/* Header */}
          <div className="max-w-3xl text-left space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium uppercase tracking-widest text-accent font-heading">
              OUR TRACK RECORD
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold font-heading text-white tracking-tight">
              Proven Trust & Excellence in Numbers
            </h2>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              Over a decade of ethical land development, legally verified ownership, and planned community building.
            </p>
          </div>

          {/* Metric Bar Grid (Clean Typography, No Icons) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustCounters.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/[0.06] backdrop-blur-xl border border-white/12 rounded-3xl p-7 flex flex-col justify-between space-y-4 hover:border-accent/60 transition-all duration-300 shadow-lg">
                <div className="space-y-3">
                  <span className="text-3xl sm:text-4xl font-extrabold font-heading text-accent tracking-tight block">
                    {s.value}
                  </span>
                  <p className="text-xs sm:text-sm text-white/90 font-medium font-heading leading-relaxed">
                    {s.label}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-heading">
                  <span>{s.detail}</span>
                  <span className="text-accent font-medium">Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── SECTION 6: Leadership Statements (Chairman & MD) ── */}
      <LeadershipGlassBlocks />

      {/* ── SECTION 9: Trust Badges & Accreditations ── */}
      <section className="py-14 bg-muted/40 border-y border-border/50 relative overflow-hidden">
        <SectionContainer>
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-medium uppercase tracking-widest text-primary font-heading">
              ACCREDITATIONS & RECOGNITIONS
            </span>
            <h3 className="text-base sm:text-lg font-semibold font-heading text-foreground">
              Official Regulatory Compliance & Certifications
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {accreditations.map((badge) => (
              <div
                key={badge}
                className="bg-card px-4 py-2 rounded-full border border-border/60 text-xs font-medium font-heading text-foreground/90 shadow-2xs">
                {badge}
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── SECTION 7: Offline Membership Guide & Printable CTA ── */}
      <OfflineMembershipGlassBanner />
    </div>
  );
}
