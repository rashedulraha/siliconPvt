"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ArrowRight, Download } from "lucide-react";

interface HeroSlide {
  id: string;
  slogan: string;
  englishSlogan: string;
  title: string;
  description: string;
  image: string;
  ctaText1: string;
  ctaLink1: string;
  ctaText2: string;
  ctaLink2: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    slogan: "Secure Investment",
    englishSlogan: "Secure Investment",
    title: "Your Trusted Partner in Land Investment",
    description:
      "Offering legally sound, meticulously planned, and eco-friendly residential plots adjacent to Mohammadpur, Dhaka.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    ctaText1: "EXPLORE PROJECTS",
    ctaLink1: "/projects",
    ctaText2: "DOWNLOAD APPLICATION",
    ctaLink2: "/contact",
  },
  {
    id: "slide-2",
    slogan: "A Secure Future",
    englishSlogan: "A Secure Future",
    title: "A Secure Home for Future Generations",
    description:
      "Build your dream home in 'Silicon City'—a modern, eco-friendly community developed under experienced engineering management.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
    ctaText1: "DOWNLOAD MEMBERSHIP FORM",
    ctaLink1: "/membership",
    ctaText2: "CONTACT US",
    ctaLink2: "/contact",
  },
  {
    id: "slide-3",
    slogan: "Natural Living",
    englishSlogan: "Natural Living",
    title: "Experience Peaceful Living Amidst Nature",
    description:
      "Located next to the scenic Turag River, escaping the noise of the city while remaining just minutes away from central Dhaka.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
    ctaText1: "PLAN SITE VISIT",
    ctaLink1: "/contact",
    ctaText2: "OUR LOCATION",
    ctaLink2: "/about#location",
  },
];

export function HeroGlassCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function fetchSlides() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const res = await fetch(`${backendUrl}/api/hero-slides`);
        if (res.ok) {
          const json = await res.json();
          const data = json.data || json;
          if (Array.isArray(data) && data.length > 0 && isMounted) {
            setSlides(data);
          }
        }
      } catch {
        // Fallback
      }
    }
    fetchSlides();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto carousel effect every 6 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[currentIndex] || DEFAULT_SLIDES[0];

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden pt-20 pb-16 bg-dark-hero text-white">
      {/* ── Background Subtle Dot Grid ───────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-10"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Background Image Zoom & Fade ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id || currentIndex}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.45, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0">
          <Image
            src={activeSlide.image}
            alt={activeSlide.title}
            fill
            priority={currentIndex === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-hero via-dark-hero/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-hero via-transparent to-dark-hero/50" />
        </motion.div>
      </AnimatePresence>

      {/* ── Architectural Hero Content ── */}
      <SectionContainer className="relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-9 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id || currentIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-5">
                
                {/* Category Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium uppercase tracking-widest text-accent font-heading">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  {activeSlide.slogan || "Secure Investment"}
                </div>

                {/* Title (Medium Font Weight) */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-heading text-white tracking-tight leading-[1.14]">
                  {activeSlide.title}
                </h1>

                {/* Description */}
                <p className="text-white/80 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
                  {activeSlide.description}
                </p>

                {/* Action Buttons (Action Icons only for button links) */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link
                    href={activeSlide.ctaLink1 || "/projects"}
                    className="group bg-primary text-primary-foreground h-12 px-7 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/20 shadow-lg gap-2">
                    {activeSlide.ctaText1 || "EXPLORE PROJECTS"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={activeSlide.ctaLink2 || "/contact"}
                    className="group bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 hover:border-accent h-12 px-7 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center transition-all gap-2">
                    {activeSlide.ctaText2 || "DOWNLOAD APPLICATION"}
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SectionContainer>

      {/* ── Slide Progress Bar & Indicators ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-6 sm:left-12 z-30 flex items-center gap-3">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="group text-left transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[11px] font-mono font-medium ${idx === currentIndex ? "text-accent" : "text-white/40"}`}>
                  0{idx + 1}
                </span>
                <span className={`text-xs font-heading font-medium hidden sm:inline ${idx === currentIndex ? "text-white" : "text-white/40"}`}>
                  {slide.slogan}
                </span>
              </div>
              <div className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-16 sm:w-28 bg-accent"
                  : "w-6 sm:w-10 bg-white/20 group-hover:bg-white/40"
              }`} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
