"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ArrowRight, ChevronLeft, ChevronRight, FileText } from "lucide-react";

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
		slogan: "Silicon City Township",
		englishSlogan: "Silicon City Township",
		title: "Your Trusted Partner in Land Investment",
		description:
			"Meticulously planned, eco-friendly residential plots with 30ft & 40ft wide avenues adjacent to Mohammadpur, Dhaka.",
		image:
			"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
		ctaText1: "EXPLORE PLOTS",
		ctaLink1: "/projects",
		ctaText2: "DOWNLOAD BROCHURE",
		ctaLink2: "/contact",
	},
	{
		id: "slide-2",
		slogan: "Dispute-Free Land",
		englishSlogan: "Dispute-Free Land",
		title: "A Secure Home for Future Generations",
		description:
			"100% legally sound land deeds with immediate registration, RAJUK masterplan compliance, and flood-proof elevation.",
		image:
			"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
		ctaText1: "VIEW INVENTORY",
		ctaLink1: "/projects",
		ctaText2: "BOOK SITE VISIT",
		ctaLink2: "/contact",
	},
	{
		id: "slide-3",
		slogan: "Natural Riverfront Living",
		englishSlogan: "Natural Riverfront Living",
		title: "Experience Peaceful Eco Township Living",
		description:
			"Located next to the scenic Turag River with green parks, central mosque, schools, and 24/7 security services.",
		image:
			"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
		ctaText1: "EXPLORE AMENITIES",
		ctaLink1: "/about#amenities",
		ctaText2: "CONTACT SALES",
		ctaLink2: "/contact",
	},
];

const slideVariants = {
	enter: (direction: number) => ({
		x: direction > 0 ? "100%" : "-100%",
		opacity: 1,
	}),
	center: {
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		x: direction < 0 ? "100%" : "-100%",
		opacity: 1,
	}),
};

export function HeroGlassCarousel() {
	const [slides, setSlides] = useState<HeroSlide[]>(DEFAULT_SLIDES);
	const [[currentIndex, direction], setPage] = useState<[number, number]>([
		0, 0,
	]);

	useEffect(() => {
		let isMounted = true;
		async function fetchSlides() {
			try {
				const { apiFetch } = await import("@/lib/api-client");
				const res = await apiFetch<{ success: boolean; slides?: any[] }>(
					"/slides",
				);
				if (
					res &&
					res.success &&
					Array.isArray(res.slides) &&
					res.slides.length > 0 &&
					isMounted
				) {
					const mapped: HeroSlide[] = res.slides.map((s: any, idx: number) => ({
						id: s.id || `slide-${idx}`,
						slogan: s.badge || "Silicon City Township",
						englishSlogan: s.badge || "Silicon City Township",
						title: s.title || "Your Trusted Partner in Land Investment",
						description:
							s.subtitle ||
							"Legally sound, planned, and eco-friendly land plots.",
						image:
							s.image ||
							"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600",
						ctaText1: "EXPLORE PLOTS",
						ctaLink1: s.link || "/projects",
						ctaText2: "CONTACT SALES",
						ctaLink2: "/contact",
					}));
					setSlides(mapped);
				}
			} catch {
				// Fallback to default slides
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
			paginate(1);
		}, 6000);
		return () => clearInterval(interval);
	}, [slides.length, currentIndex]);

	const paginate = (newDirection: number) => {
		setPage(([prevIndex]) => [
			(prevIndex + newDirection + slides.length) % slides.length,
			newDirection,
		]);
	};

	const activeSlide = slides[currentIndex] || DEFAULT_SLIDES[0];

	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-4">
			<section className="relative h-[520px] sm:h-[580px] md:h-[620px] flex items-center overflow-hidden rounded-[36px] sm:rounded-[44px] border border-border/80 bg-background text-foreground">
				{/* ── Bright Photo Slide with Right-to-Left Horizontal Transition ── */}
				<AnimatePresence initial={false} custom={direction}>
					<motion.div
						key={activeSlide.id || currentIndex}
						custom={direction}
						variants={slideVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={{
							x: { type: "spring", stiffness: 300, damping: 32 },
							opacity: { duration: 0.2 },
						}}
						className="absolute inset-0 w-full h-full"
					>
						<Image
							src={activeSlide.image}
							alt={activeSlide.title}
							fill
							priority={currentIndex === 0}
							className="object-cover object-center"
							sizes="100vw"
						/>
					</motion.div>
				</AnimatePresence>

				{/* ── True Translucent Frosted Glass Overlay Card (Photo is visible through glass) ── */}
				<SectionContainer className="relative z-20 w-full max-w-7xl mx-auto p-4 sm:p-8">
					<div className="max-w-xl text-left">
						<AnimatePresence mode="wait">
							<motion.div
								key={activeSlide.id || currentIndex}
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -15 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								className="bg-white/25 dark:bg-black/30 backdrop-blur-xl border border-white/50 dark:border-white/15 rounded-[32px] p-6 sm:p-9 space-y-4 shadow-none"
							>
								{/* Category Pill Badge */}
								<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-xs font-semibold uppercase tracking-widest text-primary font-heading backdrop-blur-md">
									{activeSlide.slogan || "Silicon City Township"}
								</div>

								{/* Title */}
								<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-foreground tracking-tight leading-[1.15] drop-shadow-xs">
									{activeSlide.title}
								</h1>

								{/* Description */}
								<p className="text-foreground/90 text-xs sm:text-sm font-medium leading-relaxed drop-shadow-xs">
									{activeSlide.description}
								</p>

								{/* Call to Action Buttons */}
								<div className="pt-2 flex flex-wrap items-center gap-3">
									<Link
										href={activeSlide.ctaLink1 || "/projects"}
										className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-6 rounded-xl font-medium font-heading text-xs uppercase tracking-wider inline-flex items-center justify-center transition-all gap-2 cursor-pointer"
									>
										{activeSlide.ctaText1 || "EXPLORE PLOTS"}
										<ArrowRight className="w-4 h-4" />
									</Link>
									<Link
										href={activeSlide.ctaLink2 || "/contact"}
										className="bg-white/80 dark:bg-neutral-900/80 hover:bg-white text-foreground border border-border/80 backdrop-blur-md h-11 px-6 rounded-xl font-medium font-heading text-xs uppercase tracking-wider inline-flex items-center justify-center transition-all gap-2 cursor-pointer"
									>
										{activeSlide.ctaText2 || "DOWNLOAD BROCHURE"}
										<FileText className="w-4 h-4" />
									</Link>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</SectionContainer>

				{/* ── Slide Progress Bar & Clean Chevron Indicators ── */}
				{slides.length > 1 && (
					<div className="absolute bottom-6 right-6 sm:right-10 z-30 flex items-center gap-4 bg-white/25 dark:bg-black/30 backdrop-blur-xl border border-white/50 dark:border-white/15 rounded-2xl px-5 py-3">
						{/* Slide Progress Counter */}
						<div className="flex items-center gap-3 text-xs font-mono text-foreground font-semibold">
							<span className="font-bold text-primary text-sm">
								0{currentIndex + 1}
							</span>
							<div className="w-20 sm:w-32 h-1.5 rounded-full bg-muted/80 overflow-hidden">
								<div
									className="h-full bg-primary rounded-full transition-all duration-300"
									style={{
										width: `${((currentIndex + 1) / slides.length) * 100}%`,
									}}
								/>
							</div>
							<span>0{slides.length}</span>
						</div>

						{/* Left / Right Chevron Controls */}
						<div className="flex items-center gap-1.5 border-l border-border/60 pl-3">
							<button
								onClick={() => paginate(-1)}
								aria-label="Previous slide"
								className="w-8 h-8 rounded-full border border-border/80 bg-background/80 hover:bg-background text-foreground flex items-center justify-center transition-all cursor-pointer"
							>
								<ChevronLeft className="w-4 h-4" />
							</button>
							<button
								onClick={() => paginate(1)}
								aria-label="Next slide"
								className="w-8 h-8 rounded-full border border-border/80 bg-background/80 hover:bg-background text-foreground flex items-center justify-center transition-all cursor-pointer"
							>
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				)}
			</section>
		</div>
	);
}
