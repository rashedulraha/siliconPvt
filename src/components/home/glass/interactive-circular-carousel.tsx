"use client";

/**
 * InteractiveCircularCarousel
 * ------------------------------------------------------------------
 * Horizontal rotating ring of small project images (light theme).
 *  - Ring auto-rotates; far side fades, near side is vivid
 *  - Hover any small image → big centered preview (title / subtitle /
 *    "CLICK TO ENLARGE +"), rotation pauses while hovering
 *  - Click "enlarge" → lightbox
 *  - `items` prop maps 1:1 to GET /api/hero-slides (HeroSlide type)
 * No Tailwind config or global styles are touched.
 */

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ---------------------------- data contract ---------------------------- */
export interface HeroSlide {
  id: string | number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  tag?: string;
  ctaUrl?: string;
}

interface Props {
  items?: HeroSlide[];
  speed?: number; // ring rotation, degrees per second
  className?: string;
}

/* ---------------------------- design tokens ---------------------------- */
const ACCENT = "#76a518"; // approved green from the mock
const TILT = 18; // camera elevation (deg) — flat ellipse
const RADIUS = 450; // ring radius inside the 1100px canvas
const CARD_W = 56;
const CARD_H = 96;
const CANVAS_W = 1100;
const INNER_H = Math.round(
  RADIUS * 2 * Math.sin((TILT * Math.PI) / 180) + CARD_H + 110,
);

/* --------------------- fallback data (API replaces) -------------------- */
const NAMES = [
  "Belmont Towers",
  "Silicon Tower One",
  "Innovation Hub",
  "Circuit Park",
  "Skyline Residences",
  "Data Garden Pavilion",
  "Foundry District",
  "Neon Plaza",
  "Meridian Gate",
  "Palm Crescent",
  "Quartz Heights",
  "Aurora Business Bay",
  "Vertex Labs",
  "Ivory Court",
  "Skybridge Lofts",
  "Emerald Mile",
];
const TYPES = [
  "Villas",
  "Commercial",
  "Landmark",
  "Residences",
  "Tech Campus",
  "Public Space",
];

const FALLBACK_SLIDES: HeroSlide[] = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  title: NAMES[i % NAMES.length],
  subtitle: `${TYPES[i % TYPES.length]} · Silicon City`,
  imageUrl: `https://picsum.photos/seed/silicon-city-${i}/480/600`,
}));

/* ------------------------------ ring item ------------------------------ */
interface RingItemProps {
  slide: HeroSlide;
  index: number;
  step: number;
  rotation: MotionValue<number>;
  refCb: (el: HTMLDivElement | null) => void;
  onHover: () => void;
  onLeave: () => void;
  onEnlarge: () => void;
}

function RingItem({
  slide,
  index,
  step,
  rotation,
  refCb,
  onHover,
  onLeave,
  onEnlarge,
}: RingItemProps) {
  const angle = index * step;

  // 1 = facing viewer (near), -1 = far side
  const facing = useTransform(rotation, (r) =>
    Math.cos(((angle + r) * Math.PI) / 180),
  );
  const opacity = useTransform(facing, [-1, 0, 1], [0.25, 0.65, 1]);
  const brightness = useTransform(facing, [-1, 1], [0.72, 1.05]);
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
        // initial pose (s = 0); the rAF/change handler rewrites this per frame
        transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) rotateY(${-angle}deg) rotateX(${TILT}deg)`,
      }}
    >
      <motion.button
        type="button"
        onPointerEnter={onHover}
        onPointerLeave={onLeave}
        onClick={onEnlarge}
        aria-label={`Preview ${slide.title}`}
        className="block h-full w-full cursor-pointer overflow-hidden rounded-[3px] bg-white shadow-md shadow-black/10 outline-none transition-transform duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#76a518]"
        style={{ opacity, filter }}
      >
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

/* ------------------------------- component ------------------------------ */
export default function InteractiveCircularCarousel({
  items,
  speed = 6,
  className = "",
}: Props) {
  const slides = items && items.length > 0 ? items : FALLBACK_SLIDES;
  const count = slides.length;
  const step = 360 / count;

  const rotation = useMotionValue(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef = useRef(false);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hovered, setHovered] = useState<HeroSlide | null>(null);
  const [enlarged, setEnlarged] = useState<HeroSlide | null>(null);
  const [scale, setScale] = useState(1);

  /* responsive: shrink the whole 1100px canvas to fit */
  useEffect(() => {
    const update = () => {
      const W = wrapRef.current?.clientWidth ?? CANVAS_W;
      setScale(Math.min(1, Math.max(0.5, W / CANVAS_W)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* pause whenever a preview or the lightbox is open */
  useEffect(() => {
    pausedRef.current = hovered !== null || enlarged !== null;
  }, [hovered, enlarged]);

  /* continuous rotation loop */
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

  /* per-frame transforms: ring spin + perfect upright billboards */
  useEffect(() => {
    const update = () => {
      const s = rotation.get();
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateX(${-TILT}deg) rotateY(${s}deg)`;
      }
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = i * step;
        // place on ring, then counter-rotate so every card stays upright
        el.style.transform = `rotateY(${a}deg) translateZ(${RADIUS}px) rotateY(${-(s + a)}deg) rotateX(${TILT}deg)`;
      });
    };
    update();
    return rotation.on("change", update);
  }, [step, rotation]);

  /* hover bookkeeping (small grace period so the pointer can reach the preview) */
  const handleHover = (s: HeroSlide) => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    setHovered(s);
  };
  const handleLeave = () => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setHovered(null), 160);
  };
  const cancelClear = () => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
  };

  const outerH = Math.round(INNER_H * scale);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full overflow-hidden bg-[#f5f5f3] ${className}`}
    >
      {/* ------------------------------ ring scene ------------------------------ */}
      <div
        className="relative mx-auto w-full"
        style={{ height: outerH }}
        onPointerLeave={handleLeave}
      >
        <div
          className="absolute left-1/2 top-0"
          style={{
            width: CANVAS_W,
            height: INNER_H,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
            perspective: 1000,
          }}
        >
          {/* soft floor shadow */}
          <div
            aria-hidden
            className="absolute bottom-6 left-1/2 h-12 w-[72%] -translate-x-1/2 rounded-full bg-black/10 blur-2xl"
          />

          <div
            ref={ringRef}
            className="absolute left-1/2 top-1/2 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
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
                onEnlarge={() => setEnlarged(slide)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --------------------------- hover preview card -------------------------- */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.id}
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onPointerEnter={cancelClear}
            onPointerLeave={handleLeave}
            className="absolute left-1/2 top-1/2 z-20 flex flex-col items-center"
            style={{ x: "-50%", y: "-52%" }}
          >
            <div className="relative bg-white p-2 shadow-2xl shadow-black/25">
              <span
                aria-hidden
                className="absolute -left-1.5 -top-1.5 h-4 w-4"
                style={{ background: ACCENT }}
              />
              <img
                src={hovered.imageUrl}
                alt={hovered.title}
                className="h-[210px] w-[290px] object-cover sm:h-[250px] sm:w-[340px]"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-neutral-900">
              {hovered.title}
            </h3>
            {hovered.subtitle && (
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                {hovered.subtitle}
              </p>
            )}
            <button
              type="button"
              onClick={() => setEnlarged(hovered)}
              className="mt-2 cursor-pointer text-[11px] font-bold uppercase tracking-[0.25em] hover:underline"
              style={{ color: ACCENT }}
            >
              Click to Enlarge +
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------- lightbox ------------------------------- */}
      <AnimatePresence>
        {enlarged && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setEnlarged(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative w-full max-w-3xl bg-white p-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close preview"
                onClick={() => setEnlarged(null)}
                className="absolute -right-3 -top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ background: ACCENT }}
              >
                ✕
              </button>
              <img
                src={enlarged.imageUrl}
                alt={enlarged.title}
                className="max-h-[70vh] w-full object-cover"
              />
              <div className="flex items-end justify-between px-1 pb-1 pt-3">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    {enlarged.title}
                  </h3>
                  {enlarged.subtitle && (
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                      {enlarged.subtitle}
                    </p>
                  )}
                </div>
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: ACCENT }}
                >
                  {enlarged.tag ?? "Silicon City"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
