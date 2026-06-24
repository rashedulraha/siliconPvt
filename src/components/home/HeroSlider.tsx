"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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
import { Container } from "@/components/layout/Container";

/* ── Data ─────────────────────────────────────────────────────────────── */
const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    eyebrow: "RAJUK Approved · Dhaka",
    title: "Build Your Legacy",
    highlight: "on Verified Land",
    description:
      "Secure, fully-documented plots with transparent paperwork and exceptional growth potential in prime Dhaka corridors.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    eyebrow: "Master Planned Community",
    title: "High-ROI Living,",
    highlight: "Carefully Surveyed",
    description:
      "Infrastructure and plot layouts designed around real growth corridors with 10–15% annual appreciation.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80",
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

/* ── Animation variants ───────────────────────────────────────────────── */
const imgVariants = {
  enter: { opacity: 0, scale: 1.06 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: [0.32, 0, 0.2, 1] as const } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.9 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ── Component ────────────────────────────────────────────────────────── */
export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % heroSlides.length);
    }, 5500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (idx: number) => { setCurrent(idx); startTimer(); };
  const prev = () => go((current - 1 + heroSlides.length) % heroSlides.length);
  const next = () => go((current + 1) % heroSlides.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Request received! Our team will contact you within 24 hours.");
    setFormData({ name: "", phone: "", email: "" });
    setIsSubmitting(false);
  };

  const slide = heroSlides[current];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-dark-hero">

      {/* ── Cinematic background ───────────────────────────────────────── */}
      <div className="absolute inset-0">
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
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer cinematic gradient — dark left, fade right */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-hero/96 via-dark-hero/80 to-dark-hero/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-hero/60 via-transparent to-dark-hero/20" />

        {/* Ambient gold orb — upper right */}
        <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <Container className="relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 xl:gap-16 items-center w-full py-20 lg:py-24">

          {/* LEFT — Headline + copy */}
          <div className="space-y-7 max-w-2xl">

            {/* Eyebrow pill */}
            <motion.div
              key={`eyebrow-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase bg-accent/15 text-accent border border-accent/25">
                <Star className="w-3 h-3 fill-accent" />
                {slide.eyebrow}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              key={`h1-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-serif text-[clamp(2.6rem,5.5vw,5rem)] leading-[1.06] tracking-[-0.03em] text-white"
            >
              {slide.title}
              <br />
              <span className="text-gold">{slide.highlight}</span>
            </motion.h1>

            {/* Gold divider */}
            <motion.div
              key={`div-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <div className="divider-gold" />
            </motion.div>

            {/* Description */}
            <motion.p
              key={`desc-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-white/70 text-base sm:text-lg max-w-lg leading-[1.75] font-light"
            >
              {slide.description}
            </motion.p>

            {/* Trust badges */}
            <motion.div
              key={`trust-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap gap-3"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/8 border border-white/12 text-white/80 text-xs font-medium backdrop-blur-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-accent" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              key={`stats-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex gap-8 pt-2"
            >
              {heroStats.map(({ value, label }) => (
                <div key={label}>
                  <div className="font-serif font-bold text-2xl sm:text-3xl text-white leading-none">
                    {value}
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50 mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              key={`cta-${current}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={6}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-7 h-12 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-luxury-gold"
              >
                Explore Properties <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 h-12 rounded-lg border border-white/25 text-white/90 font-medium text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
              >
                <Phone className="h-4 w-4" /> Contact Us
              </Link>
            </motion.div>

            {/* Slide controls */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={7}
              className="flex items-center gap-4 pt-2"
            >
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-accent/60 hover:text-accent hover:bg-accent/10 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2 items-center">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => go(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className="rounded-full transition-all duration-500 h-1.5"
                    style={{
                      width: idx === current ? "28px" : "7px",
                      backgroundColor: idx === current ? "var(--accent)" : "rgba(255,255,255,0.25)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-accent/60 hover:text-accent hover:bg-accent/10 transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="ml-1 text-xs text-white/35 font-mono tabular-nums">
                {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          {/* RIGHT — Lead capture form (glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div className="glass-dark rounded-2xl overflow-hidden shadow-luxury-gold">
              {/* Form header */}
              <div className="px-6 pt-6 pb-4 border-b border-white/8">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-base leading-tight">
                      Book a Free Visit
                    </h3>
                    <p className="text-white/45 text-xs mt-0.5">
                      Our expert will call you within 2 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
                {(
                  [
                    { type: "text",  placeholder: "Full Name *",     field: "name",  autoComplete: "name" },
                    { type: "tel",   placeholder: "Phone Number *",  field: "phone", autoComplete: "tel" },
                    { type: "email", placeholder: "Email Address",   field: "email", autoComplete: "email" },
                  ] as const
                ).map(({ type, placeholder, field, autoComplete }) => (
                  <div key={field} className="relative">
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={formData[field]}
                      onChange={(e) => setFormData((p) => ({ ...p, [field]: e.target.value }))}
                      autoComplete={autoComplete}
                      required={field !== "email"}
                      disabled={isSubmitting}
                      className="w-full h-11 px-4 rounded-lg bg-white/6 border border-white/12 text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/10 transition-all duration-300 disabled:opacity-50"
                    />
                  </div>
                ))}

                <select
                  className="w-full h-11 px-4 rounded-lg bg-white/6 border border-white/12 text-white/70 text-sm focus:outline-none focus:border-accent/60 transition-all duration-300 appearance-none"
                  disabled={isSubmitting}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-dark-hero">Select Project Interest</option>
                  {["Silicon Green City", "Silicon Village", "Silicon Smart City", "Residential Plot", "Commercial Plot"].map((p) => (
                    <option key={p} value={p} className="bg-dark-hero">{p}</option>
                  ))}
                </select>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed gold-shimmer text-accent-foreground shadow-luxury-gold"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send My Request</>
                  )}
                </button>
              </form>

              {/* Trust footer */}
              <div className="px-6 pb-5 flex items-center justify-center gap-5 text-[11px] text-white/35">
                <span>🔒 Secure</span>
                <span className="w-px h-3 bg-white/12" />
                <span>🕐 24/7 Support</span>
                <span className="w-px h-3 bg-white/12" />
                <span>🆓 Free Site Visit</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
