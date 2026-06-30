"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Shield,
  Landmark,
  CheckCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "../ui/section-container";

/* ── Slide Data ──────────────────────────────── */
const slides = [
  {
    id: 1,
    videoSrc: "/siliconpvt2.mp4",
  },
  {
    id: 2,
    videoSrc: "/siliconpvt2.mp4",
  },
  {
    id: 3,
    videoSrc: "/siliconpvt2.mp4",
  },
];

const heroStats = [
  { value: 25, suffix: "+", label: "Projects Delivered" },
  { value: 1500, suffix: "+", label: "Happy Clients" },
  { value: 800, suffix: "+", label: "Acres Developed" },
];

const trustBadges = [
  { icon: Shield, label: "RAJUK Approved" },
  { icon: Landmark, label: "Bank Partnered" },
  { icon: CheckCircle, label: "Zero Hidden Costs" },
];

/* ── Animated Counter ── */
function AnimatedCounter({
  target,
  suffix,
  duration = 2.2,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let t0: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (t0 === null) t0 = ts;
      const p = Math.min((ts - t0) / (duration * 1000), 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Hero Section ────────────────────────────── */
export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [videosReady, setVideosReady] = useState<boolean[]>(
    new Array(slides.length).fill(false),
  );

  const markVideoReady = useCallback((index: number) => {
    setVideosReady((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);

  // Auto-slide Timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  // Video Play/Pause Control
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === currentSlide) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full text-foreground py-6 md:py-12 lg:py-16 overflow-hidden">
      <div className="relative z-10">
        <SectionContainer>
          {/* ── Outer Device Frame ── */}
          <div
            className="relative w-full rounded-[38px] p-0.75 border border-border/40 bg-background/50 backdrop-blur-3xl shadow-soft-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}>
            {/* ── Inner Canvas ── */}
            <div
              className="relative w-full rounded-[35px] overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "#0D1B3E", minHeight: "600px" }}>
              <div className="sm:min-h-165! lg:min-h-180! xl:min-h-195! w-full h-full absolute inset-0" />

              {/* 1 ── Video Layers (Crossfade) ── */}
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="absolute inset-0 w-full h-full z-0"
                  style={{
                    opacity: currentSlide === index ? 1 : 0,
                    transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}>
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={slide.videoSrc}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    onCanPlayThrough={() => markVideoReady(index)}
                    onError={() => markVideoReady(index)}
                  />
                  {!videosReady[index] && currentSlide === index && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: "#0D1B3E" }}>
                      <Loader2
                        className="w-5 h-5 animate-spin"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* 2 ── Enhanced Gradient Overlay for Text Readability ── */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, 
                  rgba(13, 27, 62, 0.70) 0%, 
                  rgba(13, 27, 62, 0.20) 30%, 
                  rgba(13, 27, 62, 0.20) 50%,
                  rgba(13, 27, 62, 0.40) 70%,
                  rgba(13, 27, 62, 0.85) 100%
                )`,
                }}
              />

              {/* 3 ── Live Indicator ── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 px-3 py-1.5 rounded-full flex items-center gap-2 select-none"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-medium text-white/80">
                  Live Drone Scan
                </span>
              </motion.div>

              {/* 4 ── Content (Text now more prominent) ── */}
              <div className="relative z-20 w-full max-w-4xl px-6 sm:px-12 lg:px-16 py-12 sm:py-16 flex flex-col items-center text-center space-y-8 sm:space-y-10">
                {/* Identity Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  <span
                    className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] uppercase tracking-widest font-medium text-white/90"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                    }}>
                    Silicon Real Estate (Pvt.) Ltd.
                  </span>
                </motion.div>

                {/* Typography Block - Increased contrast and size for readability */}
                <div className="space-y-6 max-w-3xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.05] text-white drop-shadow-xl">
                    Build Your Legacy
                    <br />
                    <span className="font-normal text-white/80 drop-shadow-lg">
                      on Verified Land.
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-normal text-white/80 drop-shadow-md">
                    Secure, fully-documented premium plots with 100% transparent
                    deeds in prime Dhaka corridors. Plan your future in
                    master-planned communities.
                  </motion.p>
                </div>

                {/* Trust Badges - Enhanced visibility */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-wrap justify-center gap-3">
                  {trustBadges.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-normal tracking-wide text-white/90 cursor-default transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.22)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.12)";
                      }}>
                      <Icon className="w-3.5 h-3.5 text-white/70" />
                      <span>{label}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-2">
                  <Link href="/properties" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-12 px-8 rounded-full font-medium text-sm tracking-wide transition-all duration-300 ease-out cursor-pointer group hover:scale-105 shadow-xl"
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#0D1B3E",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                      }}>
                      Explore Plots
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto h-12 px-8 rounded-full font-medium text-sm tracking-wide transition-all duration-300 ease-out cursor-pointer hover:scale-105"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        color: "#FFFFFF",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                      }}>
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Advisors
                    </Button>
                  </Link>
                </motion.div>

                {/* Stats - Increased contrast */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="grid grid-cols-3 gap-8 sm:gap-16 pt-10 w-full max-w-2xl mt-4"
                  style={{ borderTop: "1px solid rgba(255, 255, 255, 0.15)" }}>
                  {heroStats.map(({ value, suffix, label }) => (
                    <div key={label} className="space-y-2">
                      <span className="block text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white drop-shadow-lg">
                        <AnimatedCounter target={value} suffix={suffix} />
                      </span>
                      <span className="block text-[11px] uppercase tracking-widest font-medium text-white/60 leading-none">
                        {label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* 5 ── Sleek Carousel Controls ── */}
              <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
                {/* Dots */}
                <div className="flex items-center gap-1.5 mr-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className="transition-all duration-300 rounded-full cursor-pointer"
                      style={{
                        height: "6px",
                        width: currentSlide === index ? "20px" : "6px",
                        backgroundColor:
                          currentSlide === index
                            ? "#FFFFFF"
                            : "rgba(255, 255, 255, 0.4)",
                      }}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white/15 border border-white/25 text-white/80 hover:bg-white/25 hover:text-white transition-all duration-200 backdrop-blur-md cursor-pointer">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white/15 border border-white/25 text-white/80 hover:bg-white/25 hover:text-white transition-all duration-200 backdrop-blur-md cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>
    </section>
  );
}
