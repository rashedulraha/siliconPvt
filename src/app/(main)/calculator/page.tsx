"use client";

import { Container } from "@/components/layout/Container";
import { EMICalculator } from "@/components/calculator/EMICalculator";
import { PageSEO } from "@/components/seo/PageSEO";

export default function CalculatorPage() {
  return (
    <>
      <PageSEO
        title="EMI Calculator — Silicon Real Estate"
        description="Calculate your monthly land payment installments with our easy-to-use EMI calculator."
      />

      <section className="relative pt-28 pb-16 bg-dark-hero overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-accent/5 blur-[100px] pointer-events-none" />
        <Container className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="divider-gold" />
            <span className="text-label text-accent">Financial Tools</span>
          </div>
          <h1 className="font-heading font-bold text-display-lg text-white leading-[1.08] mb-4">
            EMI <span className="text-gold">Calculator</span>
          </h1>
          <p className="text-white/65 text-lg font-light max-w-xl">
            Plan your land investment with confidence. Calculate monthly installments,
            total interest, and view a full payment breakdown.
          </p>
        </Container>
      </section>

      <Container className="py-12">
        <div className="max-w-2xl mx-auto">
          <EMICalculator />
        </div>
      </Container>
    </>
  );
}
