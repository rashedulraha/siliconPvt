"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

const galleryItems = [
	{
		id: 1,
		title: "Silicon City Township Master Plan",
		subtitle:
			"Discover modern eco-township living adjacent to Mohammadpur, Dhaka.",
		category: "Flagship Layout",
		src: "https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1400",
		link: "/projects",
	},
	{
		id: 2,
		title: "30ft & 40ft Internal Avenue Roads",
		subtitle:
			"Wide communication networks engineered for smooth and congestion-free vehicle movement.",
		category: "Infrastructure",
		src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1400",
		link: "/projects",
	},
	{
		id: 3,
		title: "16–18ft Soil Earthwork Elevation",
		subtitle:
			"Extensive land-filling ensuring flood-protected, high-level residential plot foundations.",
		category: "Soil Earthwork",
		src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400",
		link: "/projects",
	},
	{
		id: 4,
		title: "Turag Riverfront Ecological Corridor",
		subtitle:
			"Scenic natural riverfront parklands and recreational green belts.",
		category: "Green Spaces",
		src: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1400",
		link: "/about#amenities",
	},
	{
		id: 5,
		title: "Central Mosque & Civic Complex",
		subtitle:
			"Modern central mosque, schools, healthcare center and community markets.",
		category: "Civic Amenities",
		src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400",
		link: "/about#civic",
	},
];

export function ProjectGallerySection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const lastWheelTime = useRef(0);
	const isCenteredRef = useRef(false);

	// ── BUTTER-SMOOTH WHEEL SCROLL LOCK WITH AUTO-CENTERING ──
	useEffect(() => {
		const handleWindowWheel = (e: WheelEvent) => {
			const section = sectionRef.current;
			if (!section) return;

			const rect = section.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			// Check if section is in viewport bounds
			const isInView =
				rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.55;

			if (isInView) {
				// Smoothly auto-center the section in viewport on first lock entry
				if (
					!isCenteredRef.current &&
					Math.abs(rect.top - (windowHeight - rect.height) / 2) > 60
				) {
					isCenteredRef.current = true;
					section.scrollIntoView({ behavior: "smooth", block: "center" });
				}

				const now = Date.now();
				if (now - lastWheelTime.current < 280) {
					if (
						(e.deltaY > 0 && activeIndex < galleryItems.length - 1) ||
						(e.deltaY < 0 && activeIndex > 0)
					) {
						e.preventDefault();
					}
					return;
				}

				if (e.deltaY > 0 && activeIndex < galleryItems.length - 1) {
					// Lock page scroll & step to next card
					e.preventDefault();
					setActiveIndex((prev) => prev + 1);
					lastWheelTime.current = now;
				} else if (e.deltaY < 0 && activeIndex > 0) {
					// Lock page scroll & step to previous card
					e.preventDefault();
					setActiveIndex((prev) => prev - 1);
					lastWheelTime.current = now;
				}
			} else {
				isCenteredRef.current = false;
			}
		};

		window.addEventListener("wheel", handleWindowWheel, { passive: false });
		return () => window.removeEventListener("wheel", handleWindowWheel);
	}, [activeIndex]);

	const handleNext = () => {
		setActiveIndex((prev) => (prev + 1) % galleryItems.length);
	};

	const handlePrev = () => {
		setActiveIndex(
			(prev) => (prev - 1 + galleryItems.length) % galleryItems.length,
		);
	};

	return (
		<section
			ref={sectionRef}
			className="py-16 sm:py-20 bg-background text-foreground relative border-t border-border/50 overflow-hidden"
		>
			{/* Subtle Dot Grid */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
					backgroundSize: "24px 24px",
				}}
			/>

			<SectionContainer className="relative z-10 space-y-10 max-w-7xl mx-auto">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto space-y-2">
					<span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium uppercase tracking-widest text-primary font-heading">
						DEVELOPMENT WORK & INFRASTRUCTURE
					</span>
					<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
						On-Ground Progress Showcase
					</h2>
					<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
						Scroll down to step through Silicon City's on-ground landmarks.
					</p>
				</div>

				{/* ── ULTRA-PREMIUM FROSTED GLASSMORPHISM FRAME (Reduced Compact Padding) ── */}
				<div className="bg-card/40 backdrop-blur-md border border-border/60 rounded-[32px] sm:rounded-[36px] p-3 sm:p-4 md:p-5 relative overflow-hidden">
					{/* Ambient Radial Glow Gradients */}
					<div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
					<div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

					<div className="flex flex-col md:flex-row h-[420px] sm:h-[450px] md:h-[430px] gap-3.5 sm:gap-4 w-full items-stretch justify-center relative z-10">
						{galleryItems.map((item, idx) => {
							const isExpanded = activeIndex === idx;
							return (
								<motion.div
									key={item.id}
									layout
									onClick={() => setActiveIndex(idx)}
									transition={{ type: "spring", stiffness: 280, damping: 28 }}
									className={`relative h-full min-h-[420px] overflow-hidden cursor-pointer bg-transparent transition-all duration-500 ${
										isExpanded
											? "flex-[3.5] rounded-[32px] border border-white/40 ring-1 ring-white/20"
											: "flex-[0.65] rounded-full hover:scale-[1.02] opacity-90 hover:opacity-100 border border-white/20 dark:border-white/10"
									}`}
								>
									{/* Background Photo Wrapper (Direct inline 100% height & width guarantees full cover) */}
									<div className="absolute inset-0 w-full h-full pointer-events-none">
										<img
											src={item.src}
											alt={item.title}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
												objectPosition: "center",
											}}
											className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
										/>
									</div>

									{/* Gradient Overlay for Full Photo Pill */}
									<div
										className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
											isExpanded
												? "bg-gradient-to-t from-black/85 via-black/35 to-black/10"
												: "bg-gradient-to-t from-black/60 via-black/20 to-black/10"
										}`}
									/>

									{/* Expanded Active Card Content */}
									{isExpanded && (
										<motion.div
											initial={{ opacity: 0, y: 15 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 15 }}
											transition={{ duration: 0.3 }}
											className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-left text-white z-10"
										>
											{/* Category Badge */}
											<div className="flex items-center gap-2">
												<span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wider font-heading text-white border border-white/25">
													{item.category}
												</span>
											</div>

											{/* Title, Subtitle & White Action Button */}
											<div className="flex items-end justify-between gap-4">
												<div className="space-y-1.5 max-w-xl">
													<h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight leading-tight drop-shadow-md">
														{item.title}
													</h3>
													<p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed line-clamp-2">
														{item.subtitle}
													</p>
												</div>

												<Link
													href={item.link}
													className="w-12 h-12 rounded-full bg-white text-neutral-950 flex items-center justify-center shrink-0 hover:bg-primary hover:text-white transition-all group cursor-pointer"
												>
													<ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
												</Link>
											</div>
										</motion.div>
									)}
								</motion.div>
							);
						})}
					</div>
				</div>

				{/* ── BOTTOM NAVIGATION CONTROLS & PROGRESS INDICATOR ── */}
				<div className="pt-2 flex items-center justify-between text-xs font-mono text-muted-foreground">
					<div className="flex items-center gap-3">
						<span className="font-bold text-primary text-sm">
							0{activeIndex + 1}
						</span>
						<div className="w-32 sm:w-48 h-1.5 rounded-full bg-muted overflow-hidden">
							<div
								className="h-full bg-primary rounded-full transition-all duration-300"
								style={{
									width: `${((activeIndex + 1) / galleryItems.length) * 100}%`,
								}}
							/>
						</div>
						<span>0{galleryItems.length}</span>
					</div>

					{/* Left / Right Chevron Navigation Buttons */}
					<div className="flex items-center gap-2">
						<button
							onClick={handlePrev}
							className="w-9 h-9 rounded-full border border-border/80 bg-card hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer"
							aria-label="Previous landmark"
						>
							<ChevronLeft className="w-4 h-4" />
						</button>
						<button
							onClick={handleNext}
							className="w-9 h-9 rounded-full border border-border/80 bg-card hover:bg-muted text-foreground flex items-center justify-center transition-all cursor-pointer"
							aria-label="Next landmark"
						>
							<ChevronRight className="w-4 h-4" />
						</button>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
