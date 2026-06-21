"use client";

import { Container } from "@/components/layout/Container";
import { EMICalculator } from "@/components/calculator/EMICalculator";
import { PageSEO } from "@/components/seo/PageSEO";

export default function CalculatorPage() {
  return (
    <>
      <PageSEO
        title="Mortgage Calculator - EstateHub"
        description="Calculate your monthly mortgage payments with our easy-to-use EMI calculator."
      />

      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <p className="text-sm font-medium text-secondary mb-3">
            FINANCIAL TOOLS
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Mortgage Calculator
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Plan your home purchase with confidence. Calculate monthly payments,
            total interest, and see a full breakdown of your mortgage.
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
