"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
	X,
	ChevronLeft,
	ChevronRight,
	Maximize2,
	Phone,
	ArrowRight,
	Play,
	MapPin,
	Sparkles,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

interface GalleryImageItem {
	id: string;
	category: "project" | "infrastructure" | "office" | "handovers";
	categoryLabel: string;
	title: string;
	altText: string;
	image: string;
	location: string;
}

interface VideoItem {
	id: string;
	title: string;
	description: string;
	videoUrl: string;
	thumbnail: string;
}

const GALLERY_IMAGES: GalleryImageItem[] = [
	// Category 1: Silicon City Project
	{
		id: "img-1",
		category: "project",
		categoryLabel: "Silicon City Project",
		title: "Aerial View of Silicon City Layout",
		altText:
			"Scenic drone view of the planned residential blocks of Silicon City next to the Turag River",
		image:
			"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
		location: "Bara Badeshi Mouza, Savar",
	},
	{
		id: "img-2",
		category: "project",
		categoryLabel: "Silicon City Project",
		title: "Earth-Filling Work in Progress (Phase 2)",
		altText:
			"Heavy machinery conducting professional soil development up to 16–18 feet height",
		image:
			"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
		location: "Phase 2 Development Zone",
	},
	{
		id: "img-3",
		category: "project",
		categoryLabel: "Silicon City Project",
		title: "Natural Landscape of Bara Badeshi Mouza",
		altText:
			"Eco-friendly green surroundings near the Savar-Mohammadpur boundary",
		image:
			"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
		location: "Turag Riverside Belt",
	},

	// Category 2: Infrastructure & Amenities
	{
		id: "img-4",
		category: "infrastructure",
		categoryLabel: "Infrastructure & Amenities",
		title: "Proposed Bridge over Turag River",
		altText:
			"Architectural 3D design of the bridge under processing to connect Silicon City directly with Mohammadpur Beribadh",
		image:
			"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
		location: "Turag River Bridge Point",
	},
	{
		id: "img-5",
		category: "infrastructure",
		categoryLabel: "Infrastructure & Amenities",
		title: "Grand Central Mosque Architecture",
		altText:
			"Digital model of the beautifully planned grand central mosque inside Silicon City",
		image:
			"https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80",
		location: "Central Civic Zone",
	},
	{
		id: "img-6",
		category: "infrastructure",
		categoryLabel: "Infrastructure & Amenities",
		title: "Youth Sports Fields & Playgrounds",
		altText:
			"Green fields designated for Football and Cricket tournaments within the residential area",
		image:
			"https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80",
		location: "Community Sports Complex",
	},
	{
		id: "img-7",
		category: "infrastructure",
		categoryLabel: "Infrastructure & Amenities",
		title: "40-Feet Wide Internal Road Network",
		altText:
			"Meticulously developed spacious internal concrete roads for easy vehicle movement",
		image:
			"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
		location: "Main Avenue Road",
	},

	// Category 3: Corporate Office (Mohammadpur)
	{
		id: "img-8",
		category: "office",
		categoryLabel: "Corporate Office",
		title: "Silicon Real Estate Corporate Front Desk",
		altText:
			"Elegant reception area at our main branch in Iqbal Road, Mohammadpur, Dhaka-1207",
		image:
			"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
		location: "Iqbal Road, Mohammadpur",
	},
	{
		id: "img-9",
		category: "office",
		categoryLabel: "Corporate Office",
		title: "Executive Meeting Room & Advisory Board",
		altText:
			"The main discussion room where legal advisors and management verify client document titles",
		image:
			"https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
		location: "Legal Verification Lounge",
	},

	// Category 4: Client Trust & Handovers
	{
		id: "img-10",
		category: "handovers",
		categoryLabel: "Client Handovers",
		title: "Plot Demarcation and Handover Ceremony",
		altText:
			"Silicon Real Estate team executing hassle-free plot demarcation and physical handover to a happy investor",
		image:
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
		location: "Silicon City Site Handover",
	},
	{
		id: "img-11",
		category: "handovers",
		categoryLabel: "Client Handovers",
		title: "Legal Deed Registry and Signing",
		altText:
			"Landowners securely signing their official registration agreements and receiving mutations",
		image:
			"https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
		location: "Sub-Registry Office, Dhaka",
	},
];

const VIDEOS: VideoItem[] = [
	{
		id: "vid-1",
		title: '"Silicon City" 3D Animation Tour',
		description:
			"Watch the complete 3D animation video showing the 21st-century modern amenities, schools, parks, and hospitals planned inside the township.",
		videoUrl:
			"https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d850d99efe29930f5313936&profile_id=165&oauth2_token_id=57447761",
		thumbnail:
			"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "vid-2",
		title: "On-Site Project Walkthrough",
		description:
			"A real-time walkthrough video of our earth-filling progress, developed roads, and active demarcated blocks.",
		videoUrl:
			"https://player.vimeo.com/external/434045526.sd.mp4?s=c27d2ab2d0d0f588c5efb0e356230abf62804d9c&profile_id=165&oauth2_token_id=57447761",
		thumbnail:
			"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
	},
];

const FILTER_TABS = [
	{ key: "all", label: "ALL PHOTOS" },
	{ key: "project", label: "SILICON CITY PROJECT" },
	{ key: "infrastructure", label: "INFRASTRUCTURE & AMENITIES" },
	{ key: "office", label: "CORPORATE OFFICE" },
	{ key: "handovers", label: "CLIENT HANDOVERS" },
];

export default function GalleryPage() {
	const [activeTab, setActiveTab] = useState("all");
	const [lightbox, setLightbox] = useState<GalleryImageItem | null>(null);
	const [lightboxIdx, setLightboxIdx] = useState(-1);
	const [videoModal, setVideoModal] = useState<VideoItem | null>(null);

	useEffect(() => {
		document.title = "Visual Gallery | Silicon Real Estate (Pvt.) Ltd.";
	}, []);

	const filteredImages = GALLERY_IMAGES.filter((img) =>
		activeTab === "all" ? true : img.category === activeTab,
	);

	const openLightbox = (img: GalleryImageItem) => {
		const idx = filteredImages.findIndex((x) => x.id === img.id);
		setLightbox(img);
		setLightboxIdx(idx);
	};

	const prevLightbox = () => {
		if (filteredImages.length === 0) return;
		const prevIdx =
			(lightboxIdx - 1 + filteredImages.length) % filteredImages.length;
		setLightbox(filteredImages[prevIdx]);
		setLightboxIdx(prevIdx);
	};

	const nextLightbox = () => {
		if (filteredImages.length === 0) return;
		const nextIdx = (lightboxIdx + 1) % filteredImages.length;
		setLightbox(filteredImages[nextIdx]);
		setLightboxIdx(nextIdx);
	};

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden">
			{/* ── 1. ARCHITECTURAL HERO HEADER (NO GAP UNDER NAVBAR) ── */}
			<section className="relative pt-28 pb-20 sm:pb-24 bg-dark-hero text-white overflow-hidden">
				{/* Subtle Dot Grid */}
				<div
					className="absolute inset-0 opacity-[0.08] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>

				<SectionContainer className="relative z-10">
					<div className="max-w-3xl space-y-4">
						{/* Breadcrumbs */}
						<div className="flex items-center gap-2 text-xs font-mono font-medium text-white/60">
							<Link href="/" className="hover:text-accent transition-colors">
								Home
							</Link>
							<span>&gt;</span>
							<span className="text-accent font-semibold">Gallery</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
							Visualizing Your{" "}
							<span className="text-accent font-semibold">Dream Community</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Take a visual tour of "Silicon City." Explore our high-resolution
							site photos, ongoing soil development works, planned amenities,
							and our corporate office environment.
						</p>
					</div>
				</SectionContainer>
			</section>

			{/* ── 2. FILTER CATEGORY PILLS BAR ── */}
			<section className="py-8 bg-muted/30 border-b border-border/50 sticky top-16 z-20 backdrop-blur-md">
				<SectionContainer>
					<div className="flex flex-wrap items-center gap-2 sm:gap-3">
						{FILTER_TABS.map((tab) => {
							const count =
								tab.key === "all"
									? GALLERY_IMAGES.length
									: GALLERY_IMAGES.filter((i) => i.category === tab.key).length;
							const isActive = activeTab === tab.key;
							return (
								<button
									key={tab.key}
									onClick={() => setActiveTab(tab.key)}
									className={`h-10 px-5 rounded-xl text-xs font-medium font-heading transition-all flex items-center gap-2 ${
										isActive
											? "bg-primary text-primary-foreground shadow-xs"
											: "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:bg-card/80"
									}`}
								>
									<span>{tab.label}</span>
									<span
										className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
											isActive
												? "bg-white/20 text-white"
												: "bg-muted text-muted-foreground"
										}`}
									>
										{count}
									</span>
								</button>
							);
						})}
					</div>
				</SectionContainer>
			</section>

			{/* ── 3. HIGH-IMPACT ARCHITECTURAL IMAGE GRID ── */}
			<section className="py-20 sm:py-24 bg-background border-b border-border/50">
				<SectionContainer className="space-y-12">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<AnimatePresence mode="popLayout">
							{filteredImages.map((item) => (
								<motion.div
									key={item.id}
									layout
									initial={{ opacity: 0, scale: 0.98 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.98 }}
									transition={{ duration: 0.3 }}
									onClick={() => openLightbox(item)}
									className="group bg-card border border-border/60 rounded-3xl overflow-hidden shadow-xs hover:border-primary/40 transition-all cursor-pointer flex flex-col justify-between"
								>
									<div className="relative aspect-[16/10] bg-muted overflow-hidden">
										<Image
											src={item.image}
											alt={item.altText}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-500"
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
										/>
										<div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
											<div className="w-11 h-11 rounded-full bg-white/95 text-foreground flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
												<Maximize2 className="w-4 h-4 text-primary" />
											</div>
										</div>
										<div className="absolute top-3 left-3">
											<span className="text-[10px] font-medium uppercase tracking-wider px-3 py-1 bg-black/60 backdrop-blur-md text-white rounded-full font-heading">
												{item.categoryLabel}
											</span>
										</div>
									</div>

									<div className="p-6 space-y-2">
										<div className="flex items-center gap-1 text-[11px] text-primary font-medium">
											<MapPin className="w-3 h-3" />
											<span>{item.location}</span>
										</div>
										<h3 className="text-base font-semibold font-heading text-foreground group-hover:text-primary transition-colors">
											{item.title}
										</h3>
										<p className="text-xs text-muted-foreground font-light leading-relaxed">
											{item.altText}
										</p>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</SectionContainer>
			</section>

			{/* ── 4. FEATURED VIDEO SHOWCASE ── */}
			<section className="py-20 sm:py-24 bg-muted/30 border-b border-border/50">
				<SectionContainer className="space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							VIDEO FOOTAGE & ANIMATIONS
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Interactive Video Gallery
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Watch our 3D animation tours and real-time on-site development
							walkthroughs.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{VIDEOS.map((vid) => (
							<div
								key={vid.id}
								onClick={() => setVideoModal(vid)}
								className="group bg-card border border-border/60 rounded-3xl overflow-hidden shadow-xs hover:border-primary/40 transition-all cursor-pointer space-y-4 p-6 flex flex-col justify-between"
							>
								<div className="relative aspect-video rounded-2xl overflow-hidden bg-dark-hero">
									<Image
										src={vid.thumbnail}
										alt={vid.title}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
									/>
									<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
										<div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
											<Play className="w-6 h-6 fill-current ml-1" />
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<span className="text-[10px] font-mono font-medium text-accent uppercase tracking-wider block">
										FEATURED VIDEO STREAM
									</span>
									<h3 className="text-xl font-semibold font-heading text-foreground group-hover:text-primary transition-colors">
										{vid.title}
									</h3>
									<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
										{vid.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 5. SITE VISIT BOOKING CTA BANNER ── */}
			<section className="py-20 sm:py-24 bg-background">
				<SectionContainer>
					<div className="bg-dark-hero rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8 relative overflow-hidden">
						<div
							className="absolute inset-0 opacity-[0.08] pointer-events-none"
							style={{
								backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
								backgroundSize: "24px 24px",
							}}
						/>

						<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/15 pb-8">
							<div className="lg:col-span-8 space-y-3">
								<span className="inline-block px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium uppercase tracking-widest text-accent font-heading">
									PHYSICAL SITE VISIT
								</span>
								<h2 className="text-2xl sm:text-3xl font-semibold font-heading text-white tracking-tight">
									Experience Silicon City in Person
								</h2>
								<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
									Photos and videos only show half the beauty. Join our guided
									tour and experience the fresh air, open sky, and scenic
									riverside views of your future address.
								</p>
								<p className="text-xs text-white/60 font-light pt-1">
									Contact our corporate desk to schedule a physical site visit.
									Transportation from our Mohammadpur office to the project
									location is fully arranged by the company.
								</p>
							</div>

							<div className="lg:col-span-4 flex flex-wrap items-center justify-start lg:justify-end gap-3">
								<a
									href="tel:+88012345678"
									className="group bg-primary text-primary-foreground h-12 px-6 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-md gap-2"
								>
									CALL NOW
									<Phone className="w-4 h-4" />
								</a>
								<Link
									href="/contact"
									className="group bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 h-12 px-6 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center transition-all gap-2"
								>
									PLAN VISIT
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</div>

						<div className="relative z-10 pt-2 text-xs text-white/70 font-heading">
							Hotlines:{" "}
							<span className="text-accent font-semibold">
								+880 12 345 678 / +880 1712 345 678
							</span>{" "}
							| Corporate Office: 2/3 (2nd Floor), Block # A, Iqbal Road,
							Mohammadpur, Dhaka-1207
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── IMAGE LIGHTBOX MODAL ── */}
			<AnimatePresence>
				{lightbox && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
						onClick={() => setLightbox(null)}
					>
						<button
							onClick={() => setLightbox(null)}
							className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
						>
							<X className="w-5 h-5" />
						</button>

						<div
							className="relative max-w-4xl w-full bg-card border border-border/60 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-6"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted">
								<Image
									src={lightbox.image}
									alt={lightbox.altText}
									fill
									className="object-contain"
								/>
							</div>

							<div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium font-heading">
											{lightbox.categoryLabel}
										</span>
										<span className="text-xs text-primary font-medium">
											{lightbox.location}
										</span>
									</div>
									<h3 className="text-base sm:text-lg font-semibold font-heading text-foreground">
										{lightbox.title}
									</h3>
									<p className="text-xs font-light text-muted-foreground">
										{lightbox.altText}
									</p>
								</div>
								<span className="text-xs font-mono font-medium text-muted-foreground">
									{lightboxIdx + 1} / {filteredImages.length}
								</span>
							</div>

							{/* Prev / Next Navigation Controls */}
							<button
								onClick={prevLightbox}
								className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
							>
								<ChevronLeft className="w-5 h-5" />
							</button>

							<button
								onClick={nextLightbox}
								className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
							>
								<ChevronRight className="w-5 h-5" />
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* ── VIDEO POPUP MODAL ── */}
			<AnimatePresence>
				{videoModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
						onClick={() => setVideoModal(null)}
					>
						<button
							onClick={() => setVideoModal(null)}
							className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
						>
							<X className="w-5 h-5" />
						</button>

						<div
							className="relative max-w-4xl w-full bg-card border border-border/60 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
								<video
									src={videoModal.videoUrl}
									controls
									autoPlay
									className="w-full h-full object-contain"
								/>
							</div>

							<div className="space-y-1">
								<h3 className="text-lg font-semibold font-heading text-foreground">
									{videoModal.title}
								</h3>
								<p className="text-xs text-muted-foreground font-light">
									{videoModal.description}
								</p>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
