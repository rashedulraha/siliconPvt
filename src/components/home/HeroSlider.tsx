"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Phone,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Landmark,
  Star,
  Send,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/* ── Asset Data Array ─────────────────────────────────────────────────── */
const heroSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    eyebrow: "RAJUK Approved · Dhaka",
    title: "Build Your Legacy",
    highlight: "on Verified Land",
    description:
      "Secure, fully-documented plots with transparent paperwork and exceptional growth potential in prime Dhaka corridors.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    eyebrow: "Master Planned Community",
    title: "High-ROI Living,",
    highlight: "Carefully Surveyed",
    description:
      "Infrastructure and plot layouts designed around real growth corridors with 10–15% annual appreciation.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80",
    eyebrow: "100% Transparent Process",
    title: "Own Land You Can",
    highlight: "Actually Verify",
    description:
      "Clean deeds, flexible installments, and a dedicated team that walks every plot boundary with you.",
  },
];

const trustBadges = [
  { icon: Shield, label: "RAJUK Approved" },
  { icon: Landmark, label: "Bank Partnered" },
  { icon: CheckCircle, label: "No Hidden Costs" },
];

const heroStats = [
  { value: "25+", label: "Projects" },
  { value: "1,500+", label: "Clients" },
  { value: "800+", label: "Acres" },
];

/* ── Fluid Semantic Motion Presets ────────────────────────────────────── */
const imgVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.8 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
};

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % heroSlides.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const go = (idx: number) => {
    setCurrent(idx);
    startTimer();
  };
  const prev = () => go((current - 1 + heroSlides.length) % heroSlides.length);
  const next = () => go((current + 1) % heroSlides.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success(
      "Request received! Our team will contact you within 24 hours.",
    );
    setFormData({ name: "", phone: "", email: "" });
    setIsSubmitting(false);
  };

  const slide = heroSlides[current];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-background border-b border-border">
      {/* ── Background Media Canvas Layer ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-85 dark:opacity-40 select-none pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Unified Masking Overlays — Intercepting Light/Dark blending shifts flawlessly */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/20 lg:from-background lg:via-background/90 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/5" />
      </div>

      {/* ── Core Layout Grid Interface ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 xl:gap-12 items-center w-full pt-24 pb-16 md:pt-28 md:pb-20">
          {/* LEFT PANELS: Content Flow Engine */}
          <div className="space-y-6 text-left">
            {/* Eyebrow Segment */}
            <motion.div
              key={`eyebrow-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium tracking-wider uppercase bg-muted text-muted-foreground border border-border">
                <Star className="w-3 h-3 text-primary fill-primary" />
                {slide.eyebrow}
              </span>
            </motion.div>

            {/* Typography Header Stack */}
            <motion.h1
              key={`h1-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground leading-[1.1]"
            >
              {slide.title} <br />
              <span className="font-medium text-neutral-500 dark:text-neutral-400">
                {slide.highlight}
              </span>
            </motion.h1>

            {/* Premium Soft Under-line Rule Alternative */}
            <motion.div
              key={`div-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <div className="w-12 h-0.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
            </motion.div>

            {/* Description Subtext */}
            <motion.p
              key={`desc-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-muted-foreground text-sm sm:text-base max-w-lg leading-relaxed font-light"
            >
              {slide.description}
            </motion.p>

            {/* Structural Contrast Trust Badges */}
            <motion.div
              key={`trust-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap gap-2"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-card border border-border text-neutral-600 dark:text-neutral-300 text-xs shadow-xs"
                >
                  <Icon className="w-3.5 h-3.5 text-neutral-400" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Statistical Matrix Components */}
            <motion.div
              key={`stats-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex gap-8 pt-1"
            >
              {heroStats.map(({ value, label }) => (
                <div key={label}>
                  <div className="font-medium text-2xl text-foreground tracking-tight">
                    {value}
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Call To Actions Row */}
            <motion.div
              key={`cta-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={6}
              className="flex flex-wrap items-center gap-2.5 pt-2"
            >
              <Link href="/properties">
                <Button className="h-11 px-5 rounded-lg text-xs bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 gap-1.5 shadow-sm">
                  Explore Properties <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="h-11 px-5 rounded-lg text-xs border-border bg-transparent text-foreground hover:bg-muted"
                >
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />{" "}
                  Contact Us
                </Button>
              </Link>
            </motion.div>

            {/* Minimal Dynamic Sliding Controller Slats */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={7}
              className="flex items-center gap-3 pt-4"
            >
              <Button
                onClick={prev}
                variant="outline"
                size="icon"
                className="w-8 h-8 rounded-md border-border bg-card hover:bg-muted text-muted-foreground"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>

              <div className="flex gap-1.5 items-center">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => go(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className="rounded-full transition-all duration-300 h-1"
                    style={{
                      width: idx === current ? "20px" : "5px",
                      backgroundColor:
                        idx === current
                          ? "var(--fallback-p, currentColor)"
                          : "rgba(128,128,128,0.2)",
                    }}
                  />
                ))}
              </div>

              <Button
                onClick={next}
                variant="outline"
                size="icon"
                className="w-8 h-8 rounded-md border-border bg-card hover:bg-muted text-muted-foreground"
                aria-label="Next slide"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
          </div>

          {/* RIGHT PANEL: Pure Light/Dark Neutral Asset Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full"
          >
            <div className="bg-card/75 backdrop-blur-md border border-border/50 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border/50 bg-muted/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-background flex items-center justify-center border border-border/50">
                    <Star className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 fill-current" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-foreground text-xs leading-tight">
                      Book a Free Visit
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Response protocol path within 2 hours
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-5 space-y-3 bg-transparent"
              >
                {[
                  { type: "text", placeholder: "Full Name *", field: "name" },
                  {
                    type: "tel",
                    placeholder: "Phone Number *",
                    field: "phone",
                  },
                  {
                    type: "email",
                    placeholder: "Email Address",
                    field: "email",
                  },
                ].map(({ type, placeholder, field }) => (
                  <input
                    key={field}
                    type={type}
                    placeholder={placeholder}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, [field]: e.target.value }))
                    }
                    required={field !== "email"}
                    disabled={isSubmitting}
                    className="w-full h-10 px-3 rounded-lg bg-background/50 focus:bg-background border border-border/40 text-foreground placeholder:text-muted-foreground/50 text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all disabled:opacity-50"
                  />
                ))}

                <div className="relative">
                  <select
                    className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border/40 text-muted-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 appearance-none cursor-pointer"
                    disabled={isSubmitting}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Project Interest
                    </option>
                    {[
                      "Silicon Orchard",
                      "Silicon Commercial Square",
                      "Silicon Royal Heights",
                    ].map((p) => (
                      <option
                        key={p}
                        value={p}
                        className="bg-card text-foreground"
                      >
                        {p}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/60 text-[10px]">
                    &darr;
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-10 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-primary/10"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />{" "}
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Send My Request
                    </>
                  )}
                </Button>
              </form>

              <div className="px-5 py-3.5 flex items-center justify-between text-[10px] text-muted-foreground bg-muted/20 border-t border-border">
                <span>🔒 Secure Panel</span>
                <span className="w-px h-2.5 bg-border" />
                <span>🕐 24/7 Support</span>
                <span className="w-px h-2.5 bg-border" />
                <span>🆓 Free Visit</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
