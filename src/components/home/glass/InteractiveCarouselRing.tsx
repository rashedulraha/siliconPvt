"use client";

/**
 * Interactive Ring Carousel - Premium Clean Version
 * - No heavy animations (smooth ease-out only)
 * - Pure images in the ring (no white bg/shadows)
 * - Larger, cleaner hover preview modal
 */

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

export interface CylinderSlide {
  id: string | number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  tag?: string;
  description?: string;
}

interface Props {
  items?: CylinderSlide[];
  speed?: number;
  className?: string;
}

const TILT = 18;
const RADIUS = 450;
const CARD_W = 52; // Slightly wider for better pure-image look
const CARD_H = 92; // Tall portrait
const CANVAS_W = 1100;
const INNER_H = Math.round(
  RADIUS * 2 * Math.sin((TILT * Math.PI) / 180) + CARD_H + 110,
);

interface RingItemProps {
  slide: CylinderSlide;
  index: number;
  step: number;
  rotation: MotionValue<number>;
  refCb: (el: HTMLDivElement | null) => void;
  onHover: () => void;
  onLeave: () => void;
}

function RingItem({
  slide,
  index,
  step,
  rotation,
  refCb,
  onHover,
  onLeave,
}: RingItemProps) {
  const angle = index * step;

  const facing = useTransform(rotation, (r) =>
    Math.cos(((angle + r) * Math.PI) / 180),
  );
  const opacity = useTransform(facing, [-1, 0, 1], [0.3, 0.7, 1]);
  const brightness = useTransform(facing, [-1, 1], [0.6, 1.0]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <div
      ref={refCb}
      className="absolute left-1/2 top-1/2"
      style={{
        width: CARD_W,
        height: CARD_H,
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) rotateY(${-angle}deg) rotateX(${TILT}deg)`,
      }}>
      <motion.button
        type="button"
        onPointerEnter={onHover}
        onPointerLeave={onLeave}
        aria-label={`Preview ${slide.title}`}
        // Clean, subtle hover without heavy spring bounce
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        // REMOVED: bg-white, shadow, rounded-none. Now it's purely the image.
        className="block h-full w-full cursor-pointer overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
        style={{ opacity, filter }}>
        <img
          src={slide.imageUrl}
          alt={slide.title}
          draggable={false}
          loading="lazy"
          className="pointer-events-none h-full w-full select-none object-cover"
        />
      </motion.button>
    </div>
  );
}

export default function InteractiveCarouselRing({
  className = "",
  items,
  speed = 6,
}: Props) {
  if (!items || items.length === 0) {
    return null;
  }

  const slides = Array.from({ length: 48 }).map((_, i) => ({
    ...items[i % items.length],
    id: `${items[i % items.length].id}-dup-${i}`,
  }));

  const totalSlides = slides.length;
  const step = 360 / totalSlides;

  const rotation = useMotionValue(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef = useRef(false);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hovered, setHovered] = useState<CylinderSlide | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const W = wrapRef.current?.clientWidth ?? CANVAS_W;
      setScale(Math.min(1, Math.max(0.5, W / CANVAS_W)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    pausedRef.current = hovered !== null;
  }, [hovered]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!pausedRef.current && !reduced && !document.hidden) {
        rotation.set(rotation.get() - speed * dt);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rotation, speed]);

  useEffect(() => {
    const update = () => {
      const s = rotation.get();
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateX(${-TILT}deg) rotateY(${s}deg)`;
      }
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = i * step;
        el.style.transform = `rotateY(${a}deg) translateZ(${RADIUS}px) rotateY(${-(s + a)}deg) rotateX(${TILT}deg)`;
      });
    };
    update();
    return rotation.on("change", update);
  }, [step, rotation]);

  const handleHover = (s: CylinderSlide) => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    setHovered(s);
  };

  const handleLeave = () => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setHovered(null), 200);
  };

  const cancelClear = () => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
  };

  const outerH = Math.round(INNER_H * scale);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full bg-transparent ${className}`}>
      <div
        className="relative mx-auto w-full"
        style={{ height: outerH, perspective: "1200px" }}
        onPointerLeave={handleLeave}>
        <div
          className="absolute top-0"
          style={{
            left: "50%",
            width: CANVAS_W,
            height: INNER_H,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
            perspective: 1000,
          }}>
          {/* Subtle Floor Shadow */}
          <div
            aria-hidden
            className="absolute bottom-6 left-1/2 h-8 w-[60%] -translate-x-1/2 rounded-full bg-black/20 blur-2xl"
          />

          {/* 3D Ring */}
          <div
            ref={ringRef}
            className="absolute top-1/2 will-change-transform"
            style={{ left: "50%", transformStyle: "preserve-3d" }}>
            {slides.map((slide, i) => (
              <RingItem
                key={slide.id}
                slide={slide}
                index={i}
                step={step}
                rotation={rotation}
                refCb={(el) => {
                  itemRefs.current[i] = el;
                }}
                onHover={() => handleHover(slide)}
                onLeave={handleLeave}
              />
            ))}
          </div>
        </div>

        {/* Centered Hover Preview Modal - Clean, Larger, No Heavy Animation */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onPointerEnter={cancelClear}
              onPointerLeave={handleLeave}
              className="absolute z-30 pointer-events-auto"
              style={{ left: "50%", top: "35%" }}>
              <motion.div
                initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.98 }}
                animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
                exit={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                // Apple-inspired premium glassmorphism card
                className="relative overflow-hidden w-[90vw] max-w-[640px] h-[260px] pointer-events-auto flex flex-row">
                {/* Glassmorphism Background Layers */}
                <div className="absolute inset-0 bg-white/70 dark:bg-black/60 backdrop-blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 dark:from-white/20 dark:to-black/40" />

                {/* Subtle Border Glow Effect */}
                <div className="absolute inset-0 rounded-2xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)]" />

                {/* Content Container */}
                <div className="relative z-10 flex flex-row h-full w-full">
                  {/* Image Section - Luxury Treatment */}
                  <div className="relative w-[42%] h-full overflow-hidden">
                    <img
                      src={hovered.imageUrl}
                      alt={hovered.title}
                      className="h-full w-full object-cover"
                    />
                    {/* Multi-layer gradient overlays for depth */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-black/20" />
                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/95 dark:from-background/95 via-white/40 dark:via-background/40 to-transparent" />
                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-30" />
                  </div>

                  {/* Details Section - Apple Typography */}
                  <div className="flex flex-col justify-center px-7 py-6 w-[58%]">
                    {/* Tag Badge - Minimal & Clean */}
                    {hovered.tag && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="mb-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gradient-to-br from-primary/15 to-primary/5 dark:from-primary/20 dark:to-primary/10 text-primary text-[10px] font-semibold uppercase tracking-[0.15em] border border-primary/15 dark:border-primary/20 shadow-sm">
                          {hovered.tag}
                        </span>
                      </motion.div>
                    )}

                    {/* Title - SF Pro Display Style */}
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="text-2xl font-semibold text-foreground tracking-tight mb-1.5 leading-[1.2]"
                      style={{
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                      }}>
                      {hovered.title}
                    </motion.h3>

                    {/* Subtitle - Elegant & Minimal */}
                    {hovered.subtitle && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.2em] mb-3">
                        {hovered.subtitle}
                      </motion.p>
                    )}

                    {/* Description - Light & Readable */}
                    {hovered.description && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.3 }}
                        className="text-sm text-muted-foreground/70 font-light leading-relaxed line-clamp-2 mb-4">
                        {hovered.description}
                      </motion.p>
                    )}

                    {/* CTA Button - Apple Style */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="mt-auto">
                      <button
                        className="group inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-all duration-200 tracking-[0.05em] uppercase"
                        onClick={() => console.log("Navigate to details")}>
                        <span>View Details</span>
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Elements - Subtle Luxury Touch */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-tr-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-black/5 to-transparent rounded-bl-2xl pointer-events-none dark:from-white/5" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
