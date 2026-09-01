"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { useProjects } from "@/hooks/useProjects";
import { useProperties } from "@/hooks/useProperties";
import { useProjectsContent } from "@/hooks/useProjectsContent";
import { formatCurrency } from "@/lib/utils";
import type { Property } from "@/types";
import {
	ArrowRight,
	CheckCircle2,
	Search,
	X,
	MapPin,
	CalendarCheck,
	Compass,
	Trees,
	GraduationCap,
	HeartPulse,
	ShoppingBag,
	Landmark,
	ChevronRight,
	Sparkles,
	Building2,
} from "lucide-react";

type StatusFilter = "all" | Property["status"];
type CategoryFilter = "all" | Property["category"];
type SortOption = "newest" | "price-asc" | "price-desc" | "area-desc";

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
	{ value: "all", label: "All Status" },
	{ value: "available", label: "Ongoing" },
	{ value: "pending", label: "Upcoming" },
	{ value: "sold", label: "Completed" },
];

const CATEGORY_FILTERS: { value: CategoryFilter; label: string }[] = [
	{ value: "all", label: "All Types" },
	{ value: "land", label: "Residential Plots" },
	{ value: "apartment", label: "Ready Flats" },
	{ value: "commercial", label: "Commercial Plots" },
];

const STATUS_LABELS: Record<Property["status"], string> = {
	available: "Ongoing Project",
	pending: "Upcoming Project",
	sold: "Completed",
	rented: "Rented",
};

const AMENITY_ICONS: Record<number, any> = {
	0: Landmark,
	1: Compass,
	2: Trees,
	3: GraduationCap,
	4: HeartPulse,
	5: ShoppingBag,
};

export function ProjectsClient() {
	const { data: content } = useProjectsContent();
	const { projects } = useProjects();
	const { properties } = useProperties();

	// Inventory Filters State
	const [searchQuery, setSearchQuery] = useState("");
	const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
	const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
	const [sortBy, setSortBy] = useState<SortOption>("newest");

	// Filtered Inventory
	const filteredProjects = useMemo(() => {
		let result = [...properties];

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			result = result.filter(
				(p) =>
					p.title.toLowerCase().includes(q) ||
					p.location.toLowerCase().includes(q) ||
					p.description.toLowerCase().includes(q),
			);
		}

		if (activeStatus !== "all") {
			result = result.filter((p) => p.status === activeStatus);
		}

		if (activeCategory !== "all") {
			result = result.filter((p) => p.category === activeCategory);
		}

		if (sortBy === "price-asc") {
			result.sort((a, b) => a.price - b.price);
		} else if (sortBy === "price-desc") {
			result.sort((a, b) => b.price - a.price);
		} else if (sortBy === "area-desc") {
			result.sort((a, b) => b.area - a.area);
		} else {
			result.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			);
		}

		return result;
	}, [properties, searchQuery, activeStatus, activeCategory, sortBy]);

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden text-left">
			{/* ── 1. ARCHITECTURAL HERO HEADER ── */}
			<section className="relative pt-28 pb-20 bg-dark-hero text-white overflow-hidden">
				{/* Subtle Dot Grid Pattern */}
				<div
					className="absolute inset-0 opacity-[0.06] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>

				<SectionContainer className="relative z-10 space-y-7">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="max-w-3xl"
					>
						{/* Breadcrumbs */}
						<nav className="flex items-center gap-2 text-xs text-white/60 mb-4 font-heading uppercase tracking-wider">
							<Link href="/" className="hover:text-accent transition-colors">
								Home
							</Link>
							<ChevronRight className="w-3 h-3 text-white/40" />
							<span className="text-accent font-semibold">Projects</span>
						</nav>

						<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white tracking-tight leading-snug mb-3">
							{content.heroTitle} <br />
							<span className="text-gold">{content.heroSubtitle}</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mb-7">
							{content.heroDesc}
						</p>

						{/* Action Buttons */}
						<div className="flex flex-wrap items-center gap-3">
							<a
								href="#inventory-section"
								className="inline-flex items-center justify-center bg-primary text-primary-foreground h-11 px-6 rounded-xl font-semibold font-heading text-xs sm:text-sm hover:bg-primary/90 transition-all border border-white/20 shadow-md gap-2"
							>
								BROWSE AVAILABLE PLOTS
								<ArrowRight className="w-4 h-4" />
							</a>
							<Link
								href="/contact"
								className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 h-11 px-6 rounded-xl font-semibold font-heading text-xs sm:text-sm transition-all gap-2"
							>
								SCHEDULE SITE VISIT
								<CalendarCheck className="w-4 h-4 text-accent" />
							</Link>
						</div>
					</motion.div>

					{/* 4 Quick Value Trust Metrics Strip */}
					<div className="pt-5 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-3.5">
						{content.trustMetrics.map((tm, idx) => (
							<div
								key={idx}
								className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-xl p-4 space-y-1"
							>
								<span className="text-lg sm:text-xl font-bold font-heading text-accent block">
									{tm.value}
								</span>
								<span className="text-[11px] text-white/70 font-heading">
									{tm.label}
								</span>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 2. FLAGSHIP SPOTLIGHT (SILICON CITY) ── */}
			<section className="py-16 sm:py-20 bg-background overflow-hidden border-b border-border/50 relative">
				{/* Subtle Dot Pattern */}
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
						backgroundSize: "28px 28px",
					}}
				/>

				<SectionContainer className="relative z-10 space-y-10">
					<div className="max-w-3xl space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{content.spotlightBadge}
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{content.spotlightTitle}
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed">
							{content.spotlightDesc}
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
						{/* Left Highlight Box */}
						<div className="lg:col-span-5 bg-dark-hero rounded-2xl p-7 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-md border border-white/15">
							<div
								className="absolute inset-0 opacity-[0.06] pointer-events-none"
								style={{
									backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
									backgroundSize: "20px 20px",
								}}
							/>
							<div className="relative z-10 space-y-3.5">
								<span className="inline-block px-3 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-[10px] font-medium text-accent font-mono uppercase tracking-wider">
									{content.spotlightTag}
								</span>
								<h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
									{content.spotlightBoxTitle}
								</h3>
								<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
									{content.spotlightBoxDesc}
								</p>
							</div>

							<div className="relative z-10 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs font-heading">
								<div className="flex items-center gap-1.5 text-white/70">
									<MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
									<span>{content.spotlightLocation}</span>
								</div>
								<span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold text-[11px]">
									{content.spotlightBadge2}
								</span>
							</div>
						</div>

						{/* Right 4 Engineering & Legal Highlights */}
						<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
							{content.specs.map((spec) => (
								<div
									key={spec.num}
									className="bg-card border border-border/60 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-2 hover:border-primary/40 transition-all"
								>
									<div className="space-y-1.5">
										<span className="text-xs font-mono font-bold text-primary block">
											{spec.num}
										</span>
										<h4 className="text-sm sm:text-base font-bold font-heading text-foreground">
											{spec.title}
										</h4>
										<p className="text-xs text-muted-foreground font-light leading-relaxed">
											{spec.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── 3. DYNAMIC TOWNSHIPS & PORTFOLIO PROJECTS (MANAGED VIA ADMIN CMS) ── */}
			<section className="py-16 sm:py-20 bg-background overflow-hidden border-b border-border/50 relative">
				<SectionContainer className="space-y-10">
					<div className="max-w-3xl space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							DEVELOPMENT PORTFOLIO
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							Master Townships & Landmark Projects
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed">
							Discover our premier residential townships and commercial hubs under active execution.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{projects.map((proj, idx) => (
							<div
								key={proj.id || idx}
								className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between group"
							>
								<div className="space-y-4">
									{/* Photo Container */}
									<div className="relative h-56 w-full overflow-hidden bg-muted">
										<img
											src={
												proj.images && proj.images.length > 0 && proj.images[0]
													? proj.images[0]
													: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
											}
											alt={proj.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
										<div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
											{proj.num || `0${idx + 1}`}
										</div>
										<div className="absolute top-3 right-3 bg-dark-hero/85 backdrop-blur-md text-accent border border-white/15 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
											{proj.status}
										</div>
									</div>

									{/* Details */}
									<div className="p-6 space-y-2.5">
										<h3 className="text-lg sm:text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors">
											{proj.title}
										</h3>
										<p className="text-xs text-muted-foreground flex items-center gap-1.5 font-light">
											<MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
											<span>{proj.location}</span>
										</p>
										<p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-3">
											{proj.description}
										</p>

										{/* Highlights */}
										{proj.highlights && proj.highlights.length > 0 && (
											<div className="pt-2 flex flex-wrap gap-1.5">
												{proj.highlights.map((h, i) => (
													<span
														key={i}
														className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium"
													>
														{h}
													</span>
												))}
											</div>
										)}
									</div>
								</div>

								<div className="p-6 pt-3 border-t border-border/40 flex items-center justify-between">
									<span className="text-xs font-semibold text-primary font-heading">
										{proj.type || "Township Development"}
									</span>
									<a
										href="#inventory-section"
										className="text-xs font-semibold text-foreground hover:text-primary inline-flex items-center gap-1 font-heading"
									>
										View Available Plots <ArrowRight className="w-3.5 h-3.5" />
									</a>
								</div>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 4. LIVE SEARCHABLE INVENTORY & PLOT LISTINGS ── */}
			<section
				id="inventory-section"
				className="py-16 sm:py-20 bg-background border-b border-border/50 scroll-mt-20 relative"
			>
				<SectionContainer className="space-y-7">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
						<div className="max-w-2xl space-y-1.5">
							<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
								LIVE PLOT INVENTORY
							</span>
							<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
								Explore Available Plots & Units
							</h2>
							<p className="text-muted-foreground text-xs sm:text-sm font-light">
								Filter by property category, development status, or search by sector and plot size.
							</p>
						</div>

						<div className="text-xs font-mono text-muted-foreground bg-muted/50 px-3.5 py-1.5 rounded-xl border border-border/60 self-start md:self-auto">
							Showing <span className="font-bold text-primary">{filteredProjects.length}</span> plots
						</div>
					</div>

					{/* Filter & Search Console */}
					<div className="p-5 rounded-2xl border border-border/60 bg-card shadow-xs space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-3">
							<div className="relative">
								<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<input
									type="text"
									placeholder="Search plots by title, block, or location..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full h-10 pl-10 pr-9 rounded-xl border border-border/60 bg-background text-xs sm:text-sm font-light placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary"
								/>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery("")}
										className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground cursor-pointer"
									>
										<X className="h-3.5 w-3.5" />
									</button>
								)}
							</div>

							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value as SortOption)}
								className="w-full h-10 px-3.5 rounded-xl border border-border/60 bg-background text-xs font-medium text-foreground cursor-pointer focus:outline-none focus:border-primary"
							>
								<option value="newest">Sort: Newest First</option>
								<option value="price-asc">Price: Low to High</option>
								<option value="price-desc">Price: High to Low</option>
								<option value="area-desc">Area: Largest Size</option>
							</select>
						</div>

						<div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40">
							{/* Category Tabs */}
							<div className="flex flex-wrap gap-1.5">
								{CATEGORY_FILTERS.map(({ value, label }) => (
									<button
										key={value}
										onClick={() => setActiveCategory(value)}
										className={`h-8 px-3.5 rounded-xl text-xs font-medium font-heading transition-all cursor-pointer ${
											activeCategory === value
												? "bg-primary text-primary-foreground shadow-xs"
												: "bg-background border border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
										}`}
									>
										{label}
									</button>
								))}
							</div>

							{/* Status Tabs */}
							<div className="flex flex-wrap gap-1.5">
								{STATUS_FILTERS.map(({ value, label }) => (
									<button
										key={value}
										onClick={() => setActiveStatus(value)}
										className={`h-8 px-3.5 rounded-xl text-xs font-medium font-heading transition-all cursor-pointer ${
											activeStatus === value
												? "bg-accent text-dark-hero font-semibold shadow-xs"
												: "bg-background border border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
										}`}
									>
										{label}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Property / Plot Cards Grid */}
					{filteredProjects.length === 0 ? (
						<div className="py-12 text-center bg-card border border-border/60 rounded-2xl p-6 space-y-2">
							<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
								<Search className="w-5 h-5" />
							</div>
							<h3 className="text-sm font-bold font-heading text-foreground">
								No Properties Match Your Search
							</h3>
							<p className="text-xs text-muted-foreground max-w-sm mx-auto font-light">
								Try resetting your filters or adjusting your search term to see available plots.
							</p>
							<button
								onClick={() => {
									setSearchQuery("");
									setActiveCategory("all");
									setActiveStatus("all");
								}}
								className="mt-1 text-xs font-semibold text-primary underline cursor-pointer"
							>
								Reset All Filters
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
							<AnimatePresence mode="popLayout">
								{filteredProjects.map((property) => (
									<motion.div
										key={property.id}
										layout
										initial={{ opacity: 0, y: 12 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 12 }}
										className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
									>
										<div className="space-y-3">
											{/* Property Image Container */}
											<div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
												{property.images.length > 0 ? (
													<img
														src={property.images[0]}
														alt={property.title}
														className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
													/>
												) : (
													<div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
														Plot Image Unavailable
													</div>
												)}
												<div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
													<span className="text-[9px] font-semibold font-heading uppercase tracking-wider px-2.5 py-0.5 bg-primary text-primary-foreground rounded-full shadow-xs">
														{property.category === "land" ? "Plot" : property.category}
													</span>
												</div>
												<div className="absolute top-2.5 right-2.5">
													<span className="text-[9px] font-semibold font-heading uppercase tracking-wider px-2.5 py-0.5 bg-dark-hero/85 backdrop-blur-md text-accent border border-white/15 rounded-full">
														{STATUS_LABELS[property.status] || property.status}
													</span>
												</div>
											</div>

											{/* Property Details */}
											<div className="px-5 space-y-1.5">
												<h3 className="text-sm sm:text-base font-bold font-heading text-foreground group-hover:text-primary transition-colors line-clamp-1">
													{property.title}
												</h3>
												<p className="text-xs text-muted-foreground flex items-center gap-1.5 font-light truncate">
													<MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
													{property.location}
												</p>
												<p className="text-xs text-muted-foreground line-clamp-2 font-light leading-relaxed">
													{property.description}
												</p>
											</div>
										</div>

										{/* Card Footer */}
										<div className="p-5 pt-3.5 border-t border-border/40 mt-3 flex items-center justify-between">
											<div>
												<span className="text-[9px] font-mono text-muted-foreground uppercase block">
													Starting Price
												</span>
												<span className="text-sm font-bold font-heading text-primary">
													{formatCurrency(property.price)}
												</span>
											</div>
											<Link
												href={`/projects/${property.slug}`}
												className="bg-primary text-primary-foreground h-8.5 px-3.5 rounded-lg text-xs font-semibold font-heading inline-flex items-center justify-center hover:bg-primary/90 transition-all shadow-xs gap-1"
											>
												View Details
												<ArrowRight className="w-3 h-3" />
											</Link>
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					)}
				</SectionContainer>
			</section>

			{/* ── 5. OFFERED PROPERTY CATEGORIES & SPECIFICATIONS ── */}
			<section className="py-16 sm:py-20 bg-muted/30 border-b border-border/50">
				<SectionContainer className="space-y-10">
					<div className="max-w-3xl space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							OFFERED CATEGORIES
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							Property Types & Plot Specifications
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed">
							Choose from tailored plot allocations matching individual family homes, commercial ventures, or ready luxury flats.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{content.categories.map((cat) => (
							<div
								key={cat.title}
								className="bg-card border border-border/60 rounded-2xl p-6 sm:p-7 shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between space-y-5"
							>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-[10px] font-mono font-semibold uppercase text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
											{cat.tag}
										</span>
										<Sparkles className="w-3.5 h-3.5 text-accent" />
									</div>
									<h3 className="text-base sm:text-lg font-bold font-heading text-foreground">
										{cat.title}
									</h3>
									<p className="text-xs text-muted-foreground font-light leading-relaxed">
										{cat.desc}
									</p>
								</div>

								<div className="pt-3.5 border-t border-border/40 space-y-1.5">
									{cat.features.map((feat) => (
										<div
											key={feat}
											className="flex items-center gap-2 text-xs text-foreground/90 font-light"
										>
											<CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
											<span>{feat}</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 6. CIVIC AMENITIES & MASTER INFRASTRUCTURE ── */}
			<section className="py-16 sm:py-20 bg-background border-b border-border/50">
				<SectionContainer className="space-y-10">
					<div className="max-w-3xl space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							COMMUNITY FACILITIES
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							Integrated Civic Infrastructure
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed">
							Silicon City incorporates comprehensive civic facilities ensuring a self-sufficient, high-standard community lifestyle.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{content.amenities.map((am, idx) => {
							const IconComponent = AMENITY_ICONS[idx % 6] || Landmark;
							return (
								<div
									key={am.title}
									className="bg-card border border-border/60 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-3 hover:border-primary/40 transition-all"
								>
									<div className="space-y-2.5">
										<div className="flex items-center justify-between">
											<div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
												<IconComponent className="w-4 h-4" />
											</div>
											<span className="text-[10px] font-medium font-heading text-accent px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
												{am.tag}
											</span>
										</div>
										<h3 className="text-sm sm:text-base font-bold font-heading text-foreground">
											{am.title}
										</h3>
										<p className="text-xs text-muted-foreground font-light leading-relaxed">
											{am.desc}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</SectionContainer>
			</section>

			{/* ── 7. STRATEGIC LOCATION & PROXIMITY MATRIX ── */}
			<section className="py-16 sm:py-20 bg-muted/30 border-b border-border/50">
				<SectionContainer className="space-y-10">
					<div className="max-w-3xl space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							STRATEGIC CONNECTIVITY
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							Proximity to Central Dhaka & Landmarks
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed">
							Positioned only 2 to 3.5 Kilometers from Mohammadpur and key national administrative, educational, and healthcare centers.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{content.proximities.map((group) => (
							<div
								key={group.category}
								className="bg-card border border-border/60 rounded-2xl p-6 space-y-4 shadow-xs"
							>
								<div className="border-b border-border/40 pb-2.5">
									<span className="text-xs font-bold font-heading uppercase tracking-wider text-primary block">
										{group.category}
									</span>
								</div>
								<ul className="space-y-2.5 text-xs text-muted-foreground font-light">
									{group.items.map((item, idx) => (
										<li
											key={item.name}
											className={`flex items-center justify-between ${
												idx !== group.items.length - 1
													? "border-b border-border/30 pb-2"
													: ""
											}`}
										>
											<span className="text-foreground/90">{item.name}</span>
											<span className="text-primary font-semibold font-mono shrink-0 ml-2">
												{item.dist}
											</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 8. 4-STEP HASSLE-FREE PLOT ALLOTMENT ROADMAP ── */}
			<section className="py-16 sm:py-20 bg-background border-b border-border/50">
				<SectionContainer className="space-y-10">
					<div className="max-w-3xl space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							ALLOTMENT ROADMAP
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							4 Simple Steps to Plot Ownership
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed">
							Our streamlined office allotment procedure ensures 100% legal security and on-time physical handover.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{content.roadmap.map((st) => (
							<div
								key={st.step}
								className="bg-card border border-border/60 rounded-2xl p-5 shadow-xs space-y-2 flex flex-col justify-between hover:border-primary/40 transition-all"
							>
								<div className="space-y-1.5">
									<span className="text-xs font-mono font-bold text-accent block">
										STEP {st.step}
									</span>
									<h3 className="text-sm sm:text-base font-bold font-heading text-foreground">
										{st.title}
									</h3>
									<p className="text-xs text-muted-foreground font-light leading-relaxed">
										{st.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 9. GUIDED SITE VISIT & CORPORATE DESK CTA ── */}
			<section className="py-16 sm:py-20 bg-background">
				<SectionContainer>
					<div className="bg-dark-hero rounded-2xl p-7 sm:p-10 text-white space-y-8 relative overflow-hidden border border-white/15 shadow-xl">
						<div
							className="absolute inset-0 opacity-[0.06] pointer-events-none"
							style={{
								backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
								backgroundSize: "20px 20px",
							}}
						/>

						<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-white/15 pb-7">
							<div className="lg:col-span-8 space-y-2">
								<span className="inline-block px-3 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-[10px] font-mono font-medium text-accent uppercase tracking-wider">
									{content.ctaBadge}
								</span>
								<h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-white tracking-tight">
									{content.ctaTitle}
								</h2>
								<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
									{content.ctaDesc}
								</p>
							</div>

							<div className="lg:col-span-4 flex flex-wrap items-center justify-start lg:justify-end gap-2.5">
								<Link
									href="/contact"
									className="bg-primary text-primary-foreground h-11 px-5 rounded-xl font-semibold font-heading text-xs inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/20 shadow-md gap-2"
								>
									BOOK SITE VISIT
									<CalendarCheck className="w-4 h-4" />
								</Link>
								<Link
									href="/contact"
									className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 hover:border-accent h-11 px-5 rounded-xl font-semibold font-heading text-xs inline-flex items-center justify-center transition-all gap-1.5"
								>
									CONTACT LEGAL DESK
									<ArrowRight className="w-3.5 h-3.5" />
								</Link>
							</div>
						</div>

						<div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-white/80">
							<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 space-y-1">
								<span className="text-[10px] font-mono font-medium text-accent uppercase tracking-wider block">
									DIRECT HOTLINE
								</span>
								<p className="font-semibold text-xs sm:text-sm text-white">
									{content.ctaHotline}
								</p>
							</div>
							<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 space-y-1">
								<span className="text-[10px] font-mono font-medium text-accent uppercase tracking-wider block">
									EMAIL ASSISTANCE
								</span>
								<p className="font-semibold text-xs sm:text-sm text-white">
									{content.ctaEmail}
								</p>
							</div>
							<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 space-y-1 sm:col-span-2 lg:col-span-1">
								<span className="text-[10px] font-mono font-medium text-accent uppercase tracking-wider block">
									CORPORATE OFFICE
								</span>
								<p className="font-light text-white/80 leading-relaxed text-xs">
									{content.ctaOffice}
								</p>
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>
		</div>
	);
}
