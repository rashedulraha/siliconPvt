"use client";

/**
 * Interactive Ring Carousel - Premium Version
 * Dense 3D ring with centered hover preview card
 * Ring cards: sharp corners (no rounding), portrait (taller than wide)
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

const ACCENT = "#76a518";
const TILT = 18;
const RADIUS = 450;
const CARD_W = 48; // narrow (was 64)
const CARD_H = 92; // tall portrait (was 64) — like the reference mock
const CANVAS_W = 1100;
const INNER_H = Math.round(
  RADIUS * 2 * Math.sin((TILT * Math.PI) / 180) + CARD_H + 110,
);

// No fallback slides needed; data comes from the database via props.

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
        transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) rotateY(${-angle}deg) rotateX(${TILT}deg)`,
      }}
    >
      <motion.button
        type="button"
        onPointerEnter={onHover}
        onPointerLeave={onLeave}
        aria-label={`Preview ${slide.title}`}
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        /* SHARP corners (rounded removed) + thin white edge like the mock */
        className="block h-full w-full cursor-pointer overflow-hidden rounded-none bg-white shadow-md shadow-black/10 outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

export default function InteractiveCarouselRing({
  className = "",
  items,
  speed = 6,
}: {
  className?: string;
  items?: CylinderSlide[];
  speed?: number;
}) {
  // Always use exactly 48 slots for a dense ring, by repeating provided items
  // If no items provided, just return an empty array (wait for items to load)
  if (!items || items.length === 0) {
    return null; // Return null or a loading state until items are passed
  }
  
  const slides = Array.from({ length: 48 }).map((_, i) => ({
    ...items[i % items.length],
    // Ensure unique IDs when duplicating
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
    clearTimer.current = setTimeout(() => setHovered(null), 250);
  };

  const cancelClear = () => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
  };

  const outerH = Math.round(INNER_H * scale);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full bg-transparent ${className}`}
    >
      {/* Ring Container - Isolated for proper z-indexing */}
      <div
        className="relative mx-auto w-full"
        style={{ height: outerH, perspective: "1200px" }}
        onPointerLeave={handleLeave}
      >
        {/* Ring Content */}
        <div
          className="absolute top-0"
          style={{
            left: "50%",
            width: CANVAS_W,
            height: INNER_H,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
            perspective: 1000,
          }}
        >
          {/* Floor shadow */}
          <div
            aria-hidden
            className="absolute bottom-6 left-1/2 h-12 w-[72%] -translate-x-1/2 rounded-full bg-black/10 blur-2xl"
          />

          {/* Ring */}
          <div
            ref={ringRef}
            className="absolute top-1/2 will-change-transform"
            style={{ left: "50%", transformStyle: "preserve-3d" }}
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
              />
            ))}
          </div>
        </div>

        {/* Centered Hover Preview - Inside Ring Container */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.65 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                type: "spring",
                stiffness: 160,
                damping: 18,
              }}
              onPointerEnter={cancelClear}
              onPointerLeave={handleLeave}
              className="absolute z-30 pointer-events-auto"
              style={{ left: "50%", top: "35%" }}
            >
              <motion.div
                initial={{ opacity: 0, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.2 }}
                className="relative overflow-hidden bg-background/80 backdrop-blur-xl rounded-md w-[480px] h-[180px] pointer-events-auto border border-border/40 flex flex-row"
              >
                {/* Image Section */}
                <div className="relative w-[40%] h-full shrink-0">
                  <img
                    src={hovered.imageUrl}
                    alt={hovered.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details Section */}
                <div className="flex flex-col items-start justify-center p-5 w-[60%]">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary mb-2">
                    {hovered.tag || "Featured"}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">
                    {hovered.title}
                  </h3>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-2 line-clamp-1">
                    {hovered.subtitle}
                  </p>
                  <p className="text-[11px] text-muted-foreground/80 font-light line-clamp-2 mb-3">
                    {hovered.description}
                  </p>
                  <button
                    className="text-[10px] font-bold uppercase tracking-widest transition-colors text-primary hover:text-primary/80 flex items-center gap-1 mt-auto"
                    onClick={() => console.log("Enlarge clicked")}
                  >
                    View Details
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
