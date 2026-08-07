"use client";

import Link from "next/link";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { EMICalculator } from "@/components/calculator/EMICalculator";
import { PageSEO } from "@/components/seo/PageSEO";

export default function CalculatorPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden">
      <PageSEO
        title="EMI Calculator | Silicon Real Estate (Pvt.) Ltd."
        description="Calculate your monthly land payment installments with our easy-to-use EMI calculator."
      />

      {/* ── 1. ARCHITECTURAL HERO HEADER (NO GAP UNDER NAVBAR) ── */}
      <section className="relative pt-28 pb-20 sm:pb-24 bg-dark-hero text-white overflow-hidden">
        {/* Subtle Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <SectionContainer className="relative z-10">
          <div className="max-w-3xl space-y-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-white/60">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="text-accent font-semibold">Calculator</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
              EMI Installment{" "}
              <span className="text-accent font-semibold">Calculator</span>
            </h1>

            <p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              Plan your plot investment with clarity. Estimate your monthly
              payment installments, down-payment percentage, and structured
              payment schedules.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* ── 2. CALCULATOR TOOL ── */}
      <SectionContainer className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto">
          <EMICalculator />
        </div>
      </SectionContainer>
    </div>
  );
}
