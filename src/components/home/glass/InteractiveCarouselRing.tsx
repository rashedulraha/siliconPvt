"use client";

/**
 * Interactive Ring Carousel - Ultra-Luxury Architectural Edition
 * - 28 spacious 3D spatial depth cylinder slots with breathing room
 * - Crisp, high-contrast hover preview modal with smooth spring entrance
 * - 100% full-height cover images inside every 3D cylinder card
 * - Dynamic round-robin repetition for seamless 360-degree coverage
 * - Uncluttered, pure architectural presentation
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useTransform,
	type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface CylinderSlide {
	id: string | number;
	title: string;
	subtitle?: string;
	imageUrl: string;
	badge?: string;
	tag?: string;
	description?: string;
	link?: string;
}

interface Props {
	items?: CylinderSlide[];
	speed?: number;
	className?: string;
}

const TILT = 11;
const RADIUS = 440;
const CARD_W = 68; // Width of card in ring
const CARD_H = 114; // Tall portrait with full-height cover
const CANVAS_W = 1100;
const INNER_H = Math.round(
	RADIUS * 2 * Math.sin((TILT * Math.PI) / 180) + CARD_H + 40,
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
	const opacity = useTransform(facing, [-1, 0, 1], [0.4, 0.8, 1]);
	const brightness = useTransform(facing, [-1, 1], [0.85, 1.0]);
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
				whileHover={{ scale: 1.1, y: -4 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
				className="block h-full w-full cursor-pointer overflow-hidden outline-none rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.35)] border border-white/80 bg-slate-900 relative group"
				style={{ opacity, filter }}
			>
				{/* 100% Full-height cover image filling the complete card frame */}
				<img
					src={slide.imageUrl}
					alt={slide.title}
					draggable={false}
					loading="lazy"
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
						objectPosition: "center",
					}}
					className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center group-hover:scale-108 transition-transform duration-500"
				/>
				<div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
			</motion.button>
		</div>
	);
}

export default function InteractiveCarouselRing({
	className = "",
	items,
	speed: baseSpeed = 5,
}: Props) {
	if (!items || items.length === 0) {
		return null;
	}

	// 28 evenly-spaced slots for optimal breathing room and spatial clarity
	const TOTAL_SLOTS = 28;
	const slides = Array.from({ length: TOTAL_SLOTS }).map((_, i) => ({
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
				rotation.set(rotation.get() - baseSpeed * dt);
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [rotation, baseSpeed]);

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
			className={`relative w-full bg-transparent flex flex-col items-center justify-center ${className}`}
		>
			<div
				style={{ height: outerH }}
				className="relative w-full flex items-center justify-center select-none"
			>
				{/* ── AMBIENT LUXURY 3D SPATIAL ORBITAL RINGS ── */}
				<div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[740px] h-[260px] bg-primary/15 rounded-full blur-3xl opacity-60" />
				<div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[240px] rounded-full border border-white/15 scale-y-50 opacity-40" />

				<div
					style={{
						width: CANVAS_W,
						height: INNER_H,
						transform: `scale(${scale})`,
						transformOrigin: "center center",
					}}
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [perspective:1000px]"
				>
					<div
						ref={ringRef}
						className="relative h-full w-full [transform-style:preserve-3d]"
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

				{/* ── CRISP PURE-LIGHT LUXURY HOVER PREVIEW MODAL ── */}
				<AnimatePresence>
					{hovered && (
						<motion.div
							key={hovered.id}
							initial={{ opacity: 0, y: 15, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 15, scale: 0.95 }}
							transition={{ duration: 0.25, ease: "easeOut" }}
							onPointerEnter={cancelClear}
							onPointerLeave={handleLeave}
							className="absolute z-50 pointer-events-auto"
							style={{ left: "50%", top: "50%" }}
						>
							<div className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden w-[90vw] max-w-[620px] h-[250px] pointer-events-auto flex flex-row rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.4)] text-left">
								{/* Left Side: Photo Showcase */}
								<div className="relative w-[44%] h-full overflow-hidden bg-slate-100 shrink-0 border-r border-slate-200/60">
									<img
										src={hovered.imageUrl}
										alt={hovered.title}
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
											objectPosition: "center",
										}}
										className="h-full w-full object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
								</div>

								{/* Right Side: High-Contrast Pure Light Details */}
								<div className="w-[56%] p-6 flex flex-col justify-between text-left bg-white">
									<div className="space-y-2">
										{/* Tag / Badge */}
										{(hovered.badge || hovered.tag) && (
											<div>
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider font-heading">
													{hovered.badge || hovered.tag}
												</span>
											</div>
										)}

										{/* Title */}
										<h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 tracking-tight leading-snug line-clamp-2">
											{hovered.title}
										</h3>

										{/* Subtitle / Description */}
										{(hovered.subtitle || hovered.description) && (
											<p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-2">
												{hovered.subtitle || hovered.description}
											</p>
										)}
									</div>

									{/* CTA Button */}
									<div className="pt-2">
										<Link
											href={hovered.link || "/projects"}
											className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold font-heading hover:bg-primary/90 transition-all shadow-xs w-fit"
										>
											<span>View Details</span>
											<ArrowRight className="w-3.5 h-3.5" />
										</Link>
									</div>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
