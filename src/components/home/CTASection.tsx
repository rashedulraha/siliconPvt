"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { BlueprintGrid } from "./BlueprintGrid";

export function CTASection() {
  return (
    <section className="py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-primary rounded-2xl p-12 sm:p-16 md:p-20 overflow-hidden">
          <BlueprintGrid className="text-background" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-background tracking-tight leading-[1.1]">
              Ready to Invest in Your{" "}
              <span className="text-accent">Future?</span>
            </h2>
            <p className="text-background/65 font-light text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Join 1,500+ investors who chose transparent, RAJUK-approved land
              across our projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 h-14 rounded-md font-semibold text-base transition-all duration-300">
                <Link href="/contact">Get Started Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-background/10 text-background border-background/30 hover:bg-background/20 hover:text-background px-8 h-14 rounded-md font-medium text-base transition-all duration-300">
                <Link href="/projects">View Specifications</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
