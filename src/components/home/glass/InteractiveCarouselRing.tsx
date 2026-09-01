"use client";

/**
 * Interactive Ring Carousel - Ultra-Luxury Architectural Edition
 * - 28 spacious 3D spatial depth cylinder slots with breathing room
 * - Crisp, high-contrast hover preview modal with smooth spring entrance
 * - 100% full-height cover images inside every 3D cylinder card
 * - Dynamic round-robin repetition for seamless 360-degree coverage
 * - Uncluttered, pure architectural presentation with full Bengali and English bilingual support
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
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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

// Comprehensive dictionary for high-fidelity Bengali translations of slides
const BN_SLIDE_MAPPINGS: Record<
	string,
	{ title: string; subtitle: string; badge: string; btn: string }
> = {
	"Your Trusted Partner in Land Investment": {
		badge: "সিলিকন সিটি টাউনশিপ",
		title: "জমি বিনিয়োগে আপনার বিশ্বস্ত প্রতিষ্ঠান",
		subtitle:
			"মোহাম্মদপুর সংলগ্ন সাভারে ৩০ ও ৪০ ফুট প্রশস্ত অভ্যন্তরীণ রাস্তাসহ পরিকল্পিত পরিবেশ-বান্ধব আবাসিক প্লট।",
		btn: "বিস্তারিত দেখুন",
	},
	"A Secure Home for Future Generations": {
		badge: "নিষ্কণ্টক জমি",
		title: "ভবিষ্যৎ প্রজন্মের জন্য নিরাপদ স্থায়ী ঠিকানা",
		subtitle:
			"১০০% নিষ্কণ্টক দলিল, তাৎক্ষণিক রেজিস্ট্রেশন, রাজউক মাস্টারপ্ল্যান আওতাভুক্ত এবং বন্যা-সুরক্ষিত উঁচু জমি।",
		btn: "বিস্তারিত দেখুন",
	},
	"Experience Peaceful Eco Township Living": {
		badge: "প্রাকৃতিক নদী তীরবর্তী পরিবেশ",
		title: "শান্তিময় পরিকল্পিত ইকো-টাউনশিপ জীবনযাপন",
		subtitle:
			"তুরাগ নদীর মনোরম তীরে সবুজ পার্ক, কেন্দ্রীয় মসজিদ, শিক্ষা প্রতিষ্ঠান ও সার্বক্ষণিক নিরাপত্তায় ঘেরা আদর্শ আবাসন।",
		btn: "বিস্তারিত দেখুন",
	},
	"Modern Architectural Excellence & Infrastructure": {
		badge: "রেডি রেজিস্ট্রেশন",
		title: "আধুনিক স্থাপত্য নকশা ও সুপরিকল্পিত অবকাঠামো",
		subtitle:
			"১৬–১৮ ফুট উঁচু বালু ভরাটকৃত জমি, যা সম্পূর্ণ মৌসুমী বন্যা থেকে সুরক্ষিত ও দীর্ঘমেয়াদী স্থায়ী।",
		btn: "বিস্তারিত দেখুন",
	},
	"15 Minutes from Mohammadpur Beribadh": {
		badge: "কৌশলগত অবস্থান",
		title: "মোহাম্মদপুর বেড়িবাঁধ থেকে মাত্র ১৫ মিনিট",
		subtitle:
			"ঢাকা শহরের প্রধান প্রধান সড়ক ও বাণিজ্যিক এলাকার সাথে চমৎকার ও মসৃণ সরাসরি যোগাযোগ ব্যবস্থা।",
		btn: "বিস্তারিত দেখুন",
	},
	"Silicon City — Master Planned Township": {
		badge: "ফ্ল্যাগশিপ টাউনশিপ",
		title: "সিলিকন সিটি — মাস্টার প্ল্যানড মেগা টাউনশিপ",
		subtitle:
			"১৬–১৮ ফুট উঁচু মাটি ভরাট, ৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ রাস্তা এবং শতভাগ নিষ্কণ্টক মালিকানা।",
		btn: "বিস্তারিত দেখুন",
	},
	"100% Legal & Mutation Ready Plots": {
		badge: "আইনগত নিরাপত্তা",
		title: "১০০% নিষ্কণ্টক ও মিউটেশন প্রস্তুত প্লট",
		subtitle:
			"সিএস, এসএ, আরএস ও বিএস খতিয়ান যাচাইকৃত এবং তাৎক্ষণিক রেজিস্ট্রি ও সীমানা হস্তান্তর সুবিধা।",
		btn: "বিস্তারিত দেখুন",
	},
	"Turag Riverfront Ecological Corridor": {
		badge: "চমৎকার যোগাযোগ",
		title: "তুরাগ রিভারফ্রন্ট ইকোলজিক্যাল করিডোর",
		subtitle:
			"মনোরম নদী তীরবর্তী আবাসন এবং মোহাম্মদপুর থেকে মাত্র ১০ মিনিটের সহজ যোগাযোগ ব্যবস্থা।",
		btn: "বিস্তারিত দেখুন",
	},
};

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

const FALLBACK_ITEMS: CylinderSlide[] = [
	{
		id: "fallback-1",
		title: "Your Trusted Partner in Land Investment",
		subtitle:
			"Meticulously planned eco-township in Savar, adjacent to Mohammadpur",
		imageUrl:
			"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
		badge: "SILICON CITY",
		link: "/projects",
	},
	{
		id: "fallback-2",
		title: "A Secure Home for Future Generations",
		subtitle: "100% legally sound land deeds with immediate registration",
		imageUrl:
			"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
		badge: "DISPUTE-FREE",
		link: "/projects",
	},
	{
		id: "fallback-3",
		title: "Experience Peaceful Eco Township Living",
		subtitle:
			"Located next to the scenic Turag River with green parks & central mosque",
		imageUrl:
			"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
		badge: "RIVERFRONT",
		link: "/about",
	},
	{
		id: "fallback-4",
		title: "Modern Architectural Excellence & Infrastructure",
		subtitle: "16–18ft soil elevation above historical high flood marks",
		imageUrl:
			"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
		badge: "FLOOD-SAFE",
		link: "/projects",
	},
	{
		id: "fallback-5",
		title: "15 Minutes from Mohammadpur Beribadh",
		subtitle: "Prime connectivity to major arterial roads of Dhaka city",
		imageUrl:
			"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
		badge: "PRIME LOCATION",
		link: "/contact",
	},
];

export default function InteractiveCarouselRing({
	className = "",
	items,
	speed: baseSpeed = 5,
}: Props) {
	const { isBn } = useLanguage();
	const activeItems = items && items.length > 0 ? items : FALLBACK_ITEMS;

	// 28 evenly-spaced slots for optimal breathing room and spatial clarity
	const TOTAL_SLOTS = 28;
	const slides = Array.from({ length: TOTAL_SLOTS }).map((_, i) => ({
		...activeItems[i % activeItems.length],
		id: `${activeItems[i % activeItems.length].id}-dup-${i}`,
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

	// Determine localized content for currently hovered slide
	const translation = hovered ? BN_SLIDE_MAPPINGS[hovered.title] : null;
	const displayBadge = isBn
		? translation?.badge ||
			(hovered?.badge
				? hovered.badge === "FEATURED"
					? "ফিচারড"
					: hovered.badge
				: "সিলিকন সিটি")
		: hovered?.badge || hovered?.tag || "FEATURED";
	const displayTitle = isBn
		? translation?.title || hovered?.title
		: hovered?.title;
	const displaySubtitle = isBn
		? translation?.subtitle || hovered?.subtitle || hovered?.description
		: hovered?.subtitle || hovered?.description;
	const displayBtn = isBn ? translation?.btn || "বিস্তারিত দেখুন" : "View Details";

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
							<div className="relative -translate-x-1/2 -translate-y-1/2 overflow-hidden w-[90vw] max-w-[620px] min-h-[250px] pointer-events-auto flex flex-col sm:flex-row rounded-3xl bg-white text-slate-900 border border-slate-200/80 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.5)] text-left backdrop-blur-xl">
								{/* Left Side: Photo Showcase */}
								<div className="relative w-full sm:w-[44%] h-48 sm:h-auto overflow-hidden bg-slate-100 shrink-0 border-b sm:border-b-0 sm:border-r border-slate-200/60">
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
									<div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
								</div>

								{/* Right Side: High-Contrast Pure Light Details */}
								<div className="w-full sm:w-[56%] p-6 sm:p-7 flex flex-col justify-between text-left bg-white space-y-4">
									<div className="space-y-2.5">
										{/* Tag / Badge */}
										{displayBadge && (
											<div>
												<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-wider font-heading">
													<Sparkles className="w-3 h-3 text-primary" />
													<span>{displayBadge}</span>
												</span>
											</div>
										)}

										{/* Title */}
										<h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 tracking-tight leading-snug line-clamp-2">
											{displayTitle}
										</h3>

										{/* Subtitle / Description */}
										{displaySubtitle && (
											<p className="text-xs sm:text-[13px] text-slate-600 font-light leading-relaxed line-clamp-3">
												{displaySubtitle}
											</p>
										)}
									</div>

									{/* CTA Button */}
									<div className="pt-2">
										<Link
											href={hovered.link || "/projects"}
											className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-bold font-heading transition-all shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] w-fit"
										>
											<span>{displayBtn}</span>
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
