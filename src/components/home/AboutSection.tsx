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
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const highlights = [
  "RAJUK & Govt. Approved Projects",
  "100% Legal & Transparent Documentation",
  "Easy Installment Facilities",
  "Prime Locations with High ROI",
];

export function AboutSection() {
  return (
    <section className="py-32 relative">
      <Container>
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/5 border border-primary/15">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                About Us
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Building <span className="text-accent">Future-Ready</span>{" "}
              Communities
            </h2>

            <p className="text-muted-foreground leading-relaxed text-lg font-light">
              Silicon Real Estate (Pvt.) Ltd. is a trusted name in land
              development across Dhaka. We deliver high-yield plots backed by
              legal verification, RAJUK approval, and a fully transparent
              process from booking to registration.
            </p>

            <div className="space-y-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-foreground font-medium text-[15px]">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 rounded-md text-sm font-semibold transition-all duration-300">
              <Link href="/about">
                Learn More About Us
                <ChevronRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-5">
            <div className="space-y-5">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"
                  alt="Architecture"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all duration-500">
                <Sparkles className="h-7 w-7 text-accent mb-3" />
                <p className="font-semibold text-foreground text-sm">
                  Our Mission
                </p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Make verified, high-yield land ownership accessible and
                  secure.
                </p>
              </div>
            </div>
            <div className="space-y-5 pt-10">
              <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all duration-500">
                <Award className="h-7 w-7 text-accent mb-3" />
                <p className="font-semibold text-foreground text-sm">
                  Our Vision
                </p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Be the country's most transparent land development agency.
                </p>
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
                  alt="Team at a site visit"
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
