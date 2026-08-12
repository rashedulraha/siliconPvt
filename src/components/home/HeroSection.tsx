"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

import {
  ArrowRight,
  Phone,
  Shield,
  Landmark,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionContainer } from "../ui/section-container";

const slides = [
  { id: 1, imageSrc: "/slide1.jpg" },
  { id: 2, imageSrc: "/slide2.jpg" },
  { id: 3, imageSrc: "/slide3.jpg" },
  { id: 4, imageSrc: "/slide4.jpg" },
];

const heroStats = [
  { value: "25+", label: "Projects Delivered" },
  { value: "1500+", label: "Happy Clients" },
  { value: "800+", label: "Acres Developed" },
];

const trustBadges = [
  { icon: Shield, label: "RAJUK Approved" },
  { icon: Landmark, label: "Bank Partnered" },
  { icon: CheckCircle, label: "Zero Hidden Costs" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <SectionContainer
      as="section"
      className="relative w-full pb-12 pt-14 md:pt-10 font-sans"
    >
      {/* ── Outer Container: Top Sharp, Bottom Rounded [60px] with Global Web BG ── */}
      <div className="relative w-full rounded-t-none rounded-b-[60px] overflow-hidden border border-border bg-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 p-6 sm:p-10 lg:p-16 xl:p-20 items-center">
          {/* ── LEFT COLUMN: Apple Minimal Content ── */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Identity Brand Badge — Pure Border, Dynamic Text */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-border text-[10px] md:text-[11px] font-semibold tracking-[0.18em] text-foreground/90 uppercase bg-transparent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                Silicon Real Estate (Pvt.) Ltd.
              </div>
            </motion.div>

            {/* Apple High-Fidelity Responsive Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-foreground tracking-tight leading-[1.05]"
              variants={itemVariants}
            >
              Build Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70">
                Legacy
              </span>{" "}
              on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-amber-500 dark:from-blue-400 dark:via-teal-400 dark:to-amber-400">
                Verified Land.
              </span>
            </motion.h1>

            {/* Description — Adapts to Light/Dark automatically */}
            <motion.p
              className="max-w-xl text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide"
              variants={itemVariants}
            >
              Secure, fully-documented premium plots with 100% transparent deeds
              in Dhaka's prime corridors. Plan your future in master-planned
              communities.
            </motion.p>

            {/* Trust Badges — Transparent, Border Only */}
            <motion.div
              className="flex flex-wrap gap-2.5"
              variants={itemVariants}
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-muted-foreground text-xs font-medium bg-transparent transition-colors duration-300 hover:border-foreground/40 hover:text-foreground"
                >
                  <Icon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons — No heavy background shadows, pure Apple design */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
              variants={itemVariants}
            >
              <Link href="/properties" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                  Explore Properties
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 rounded-full border border-border text-foreground hover:bg-foreground/5 bg-transparent text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  Contact Sales
                </Button>
              </Link>
            </motion.div>

            {/* Stats — Premium Minimal Separated Grid */}
            <motion.div
              className="grid grid-cols-3 gap-6 sm:gap-12 pt-6 w-full border-t border-border"
              variants={itemVariants}
            >
              {heroStats.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="text-foreground text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: Sharp Cornerless Image Slider ── */}
          <div className="lg:col-span-5 w-full relative">
            <div
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-[32px] overflow-hidden border border-border"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Image Slides Stack */}
              {slides.map((slide, index) => {
                const isActive = currentSlide === index;
                return (
                  <div
                    key={slide.id}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition:
                        "opacity 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                  >
                    <Image
                      src={slide.imageSrc}
                      alt={`Slide ${slide.id}`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className={`object-cover pointer-events-none select-none transition-transform duration-[6000ms] ease-out ${
                        isActive ? "scale-100" : "scale-105"
                      }`}
                    />
                  </div>
                );
              })}

              {/* Minimal Bottom Edge Shadow just for Text/Icon Contrast inside image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Live Badge Inside Image (No blur background, clean standard border) */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/40 text-[9px] uppercase tracking-wider font-semibold text-white">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                </span>
                Live Drone Scan
              </div>

              {/* Slider Arrows (Clean Border Layer over Image) */}
              <div className="absolute z-20 bottom-4 right-4 flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2.5 rounded-full border border-white/20 bg-black/30 hover:bg-black/50 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2.5 rounded-full border border-white/20 bg-black/30 hover:bg-black/50 text-white transition-all duration-300 hover:scale-105 active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Timeline Indicators */}
              <div className=" hidden md:flex absolute z-20 bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-500 rounded-full h-1 ${
                      currentSlide === index
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
