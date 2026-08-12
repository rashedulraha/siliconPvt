"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ---------------------------- data contract ---------------------------- */
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
  speed?: number; // ring rotation, degrees per second
  className?: string;
}

/* ---------------------------- design tokens ---------------------------- */
const ACCENT = "#76a518"; // approved brand green
const TILT = 18; // camera elevation (deg) — flat ellipse
const RADIUS = 450; // ring radius inside the 1100px canvas
const CARD_W = 48; // reduced for tighter ring (was 56)
const CARD_H = 88; // reduced for tighter ring (was 96)
const CANVAS_W = 1100;
const INNER_H = Math.round(
  RADIUS * 2 * Math.sin((TILT * Math.PI) / 180) + CARD_H + 110,
);

/* --------------------- premium unsplash placeholder data -------------------- */
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
const LOCATIONS = [
  "Mumbai",
  "Downtown",
  "Silicon City",
  "Smart District",
  "City Center",
  "Green Space",
  "Tech Hub",
  "Waterfront",
  "Midtown",
  "North Bay",
  "South Ridge",
  "East Plaza",
];
const DESCRIPTIONS = [
  "Modern architectural marvel with premium amenities and panoramic views",
  "State-of-the-art facility designed for innovation and collaboration",
  "Iconic landmark featuring world-class infrastructure and design",
  "Integrated community space with residential and commercial zones",
  "Luxury living with cutting-edge sustainability features",
  "Green space pavilion combining tech and nature",
  "Industrial district transformed into vibrant creative hub",
  "Contemporary plaza with mixed-use development",
  "Gateway to the city with landmark architecture",
  "Crescent-shaped development with premium finishes",
  "High-rise residential tower with luxury apartments",
  "Business district with premium office space",
  "Innovation laboratory with research facilities",
  "Heritage building with modern renovation",
  "Lifestyle destination with residential towers",
  "Emerald-rated eco-friendly development",
];

const UNSPLASH_SLIDES: CylinderSlide[] = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  title: NAMES[i % NAMES.length],
  subtitle: `${TYPES[i % TYPES.length]} · ${LOCATIONS[i % LOCATIONS.length]}`,
  description: DESCRIPTIONS[i % DESCRIPTIONS.length],
  imageUrl: `https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=800&fit=crop&q=${50 + (i % 30)}`,
  tag: i % 8 === 0 ? "Featured" : i % 5 === 0 ? "Premium" : undefined,
}));

/* ------------------------------ ring item ------------------------------ */
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
        aria-label={`Preview ${slide.title}`}
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="block h-full w-full cursor-pointer overflow-hidden rounded-lg bg-white/90 outline-none focus-visible:ring-2 focus-visible:ring-[#76a518]"
        style={{
          opacity,
          filter,
          boxShadow:
            "0 4px 15px rgba(0, 0, 0, 0.15), inset 0 0 1px rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(4px)",
        }}
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
export default function InteractiveRingCarousel({
  items,
  speed = 6,
  className = "",
}: Props) {
  const slides = items && items.length > 0 ? items : UNSPLASH_SLIDES;
  const count = slides.length;
  const step = 360 / count;

  const rotation = useMotionValue(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef = useRef(false);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hovered, setHovered] = useState<CylinderSlide | null>(null);
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

  /* pause whenever a preview is open */
  useEffect(() => {
    pausedRef.current = hovered !== null;
  }, [hovered]);

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
      className={`relative w-full overflow-hidden bg-[#f5f5f3] ${className}`}
    >
      {/* Section header — theme: Cinzel heading + green eyebrow */}
      <div className="text-center px-4 pt-8 pb-4">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.35em]"
          style={{ color: ACCENT }}
        >
          Silicon City
        </p>
        <h2 className="mt-3 font-cinzel text-3xl sm:text-4xl font-extrabold text-neutral-900">
          Projects &amp; Landmarks in Motion
        </h2>
      </div>

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
              />
            ))}
          </div>
        </div>
      </div>

      {/* --------------------- hover preview card (light-theme glass) --------------------- */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.id}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            onPointerEnter={cancelClear}
            onPointerLeave={handleLeave}
            className="absolute left-1/2 top-1/2 z-20"
            style={{ x: "-50%", y: "-50%" }}
          >
            {/* Frosted LIGHT glass — readable on the #f5f5f3 theme background */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                backdropFilter: "blur(30px)",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.72) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow:
                  "0 8px 32px 0 rgba(118, 165, 24, 0.18), 0 2px 12px rgba(0, 0, 0, 0.08), inset 0 0 20px rgba(255, 255, 255, 0.6)",
              }}
            >
              {/* Card Container - Image + Details */}
              <div className="flex flex-col md:flex-row gap-0 max-w-4xl">
                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="relative overflow-hidden flex-shrink-0"
                >
                  <div className="relative h-72 w-72 md:h-80 md:w-96 bg-gradient-to-br from-gray-200 to-gray-300">
                    <span
                      aria-hidden
                      className="absolute top-3 left-3 h-5 w-5 rounded-full"
                      style={{ background: ACCENT }}
                    />
                    <img
                      src={hovered.imageUrl}
                      alt={hovered.title}
                      className="h-full w-full object-cover"
                    />
                    {/* light gradient veil — keeps photo crisp on light theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                </motion.div>

                {/* Details Section — dark Cinzel/Poppins type on light glass */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="flex flex-col justify-between p-8 md:p-10 flex-1 min-w-xs"
                >
                  {/* Tag */}
                  {hovered.tag && (
                    <div className="mb-2 flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ background: ACCENT }}
                      />
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: ACCENT }}
                      >
                        {hovered.tag}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="font-cinzel text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                      {hovered.title}
                    </h3>
                    {hovered.subtitle && (
                      <p className="text-sm md:text-base font-poppins text-neutral-500 uppercase tracking-wider">
                        {hovered.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {hovered.description && (
                    <p className="font-poppins text-sm md:text-base text-neutral-600 leading-relaxed mb-6 line-clamp-4">
                      {hovered.description}
                    </p>
                  )}

                  {/* Action Button — brand green CTA */}
                  <motion.button
                    type="button"
                    onClick={() => handleLeave()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="self-start px-6 py-3 rounded-lg font-poppins font-bold text-sm uppercase tracking-widest text-white transition-all duration-200"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT}dd 100%)`,
                      boxShadow: `0 4px 15px ${ACCENT}40`,
                    }}
                  >
                    ✕ Close
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
