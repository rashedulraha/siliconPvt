"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useCMS } from "@/context/CMSContext";
import { formatCompactCurrency } from "@/lib/utils";
import type { Property } from "@/types";
import {
	ArrowRight,
	ArrowUpRight,
	CheckCircle2,
	Download,
	Search,
	X,
} from "lucide-react";
import { useProjects } from "@/hooks/useProjects";

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
	available: "Ongoing",
	pending: "Upcoming",
	sold: "Completed",
	rented: "Rented",
};

export function ProjectsClient() {
	const { state } = useCMS();
	const { projects: portfolioProjects } = useProjects();

	// Inventory Filters State
	const [searchQuery, setSearchQuery] = useState("");
	const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
	const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
	const [sortBy, setSortBy] = useState<SortOption>("newest");
	const [activePortfolioTab, setActivePortfolioTab] = useState(0);

	// Filtered Inventory
	const filteredProjects = useMemo(() => {
		let result = [...state.properties];

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
	}, [state.properties, searchQuery, activeStatus, activeCategory, sortBy]);

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden">
			{/* ── 1. ARCHITECTURAL HERO SECTION WITH TOP INVENTORY NAVIGATION ── */}
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
					<div className="max-w-3xl space-y-5">
						{/* Breadcrumbs */}
						<div className="flex items-center gap-2 text-xs font-mono font-medium text-white/60">
							<Link href="/" className="hover:text-accent transition-colors">
								Home
							</Link>
							<span>&gt;</span>
							<span className="text-accent font-semibold">Projects</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium font-heading text-white tracking-tight leading-tight">
							Our Premier Property{" "}
							<span className="text-accent font-semibold">Developments</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Explore our meticulously planned, eco-friendly, and legally secure
							residential housing projects designed to offer a peaceful living
							environment and high-yielding asset value in Dhaka.
						</p>

						{/* TOP ACTION BUTTON: Quick Link to Live Searchable Inventory Page */}
						<div className="pt-2 flex flex-wrap items-center gap-4">
							<Link
								href="/properties"
								className="group bg-primary text-primary-foreground h-12 px-7 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/20 shadow-lg gap-2"
							>
								EXPLORE LIVE AVAILABLE PROPERTIES
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Link>
							<Link
								href="/membership"
								className="group bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 hover:border-accent h-12 px-7 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center transition-all gap-2"
							>
								DOWNLOAD APPLICATION FORM
								<Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
							</Link>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── 2. FLAGSHIP PROJECT SPOTLIGHT - SILICON CITY ── */}
			<section className="py-20 sm:py-24 bg-background overflow-hidden border-b border-border/50">
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
						backgroundSize: "28px 28px",
					}}
				/>

				<SectionContainer className="relative z-10 space-y-14">
					<div className="max-w-3xl text-left space-y-3">
						<span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium uppercase tracking-widest text-primary font-heading">
							FLAGSHIP DEVELOPMENT
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Silicon City – Planned Residential Township
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Located in Bara Badeshi Mouza, Savar, Dhaka — strategically
							positioned adjacent to Mohammadpur Beribadh along the scenic Turag
							River.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
						{/* Left Main Overview Box */}
						<div className="lg:col-span-5 bg-dark-hero rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-xl">
							<div
								className="absolute inset-0 opacity-[0.08] pointer-events-none"
								style={{
									backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
									backgroundSize: "20px 20px",
								}}
							/>
							<div className="relative z-10 space-y-4">
								<span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-accent font-heading uppercase tracking-wider">
									Ongoing Status
								</span>
								<h3 className="text-2xl font-semibold font-heading text-white">
									RAJUK Extended Masterplan & Embankment Protected
								</h3>
								<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
									Falling under the proposed extended urban master plan of RAJUK
									and fully secured within the proposed Dhaka Flood Protection
									Embankment for complete legal and environmental security.
								</p>
							</div>

							<div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs font-heading">
								<span className="text-white/60">
									Location: Savar (Bara Badeshi)
								</span>
								<span className="text-accent font-semibold">
									100% Ready Mutation
								</span>
							</div>
						</div>

						{/* Right 4 Engineering Highlights Grid */}
						<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
							{[
								{
									num: "01",
									title: "16 to 18 Feet Elevation",
									desc: "High-quality earth-filling and soil development carried out up to a safe height of 16 to 18 feet.",
								},
								{
									num: "02",
									title: "30ft & 40ft Internal Roads",
									desc: "Meticulously designed wide internal road networks to ensure zero traffic congestion within the township.",
								},
								{
									num: "03",
									title: "Turag River Bridge Link",
									desc: "A dedicated bridge is under processing over the Turag River to establish direct connectivity to Mohammadpur.",
								},
								{
									num: "04",
									title: "100% Legal Ownership",
									desc: "Legally verified ownership history with completely hassle-free, secure, and ready-to-register plot handovers.",
								},
							].map((spec) => (
								<div
									key={spec.title}
									className="bg-card border border-border/60 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-3"
								>
									<div className="space-y-2">
										<span className="text-xs font-mono font-medium text-primary block">
											{spec.num}
										</span>
										<h4 className="text-base font-semibold font-heading text-foreground">
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

			{/* ── 3. PROPERTY CATEGORIES OFFERED ── */}
			<section className="py-20 sm:py-24 bg-muted/30 border-b border-border/50">
				<SectionContainer className="space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							OFFERED CATEGORIES
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Property Types Available
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Explore property categories tailored to residential living,
							commercial ventures, and apartment investments.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{
								title: "Residential Plots",
								desc: "Secure and ready-to-register plots of various sizes (3, 5, or more decimals) inside highly planned blocks.",
								tag: "Plots",
							},
							{
								title: "Commercial Plots",
								desc: "Separate designated plots for commercial buildings, retail spaces, and corporate office developments.",
								tag: "Commercial",
							},
							{
								title: "Ready Flats",
								desc: "Planned modern apartment spaces featuring contemporary architectural designs, elevators, and river views.",
								tag: "Apartments",
							},
						].map((cat) => (
							<motion.div
								key={cat.title}
								whileHover={{ y: -4, transition: { duration: 0.2 } }}
								className="bg-card border border-border/60 rounded-3xl p-8 shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between space-y-4"
							>
								<div className="space-y-2">
									<span className="text-xs font-medium uppercase tracking-wider text-accent font-heading block">
										{cat.tag}
									</span>
									<h3 className="text-xl font-semibold font-heading text-foreground">
										{cat.title}
									</h3>
									<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
										{cat.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 4. DEVELOPMENT PORTFOLIO CLASSIFICATION SHOWCASE ── */}
			<section className="py-20 sm:py-24 bg-background border-b border-border/50 overflow-hidden">
				{/* Subtle Dot Grid */}
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>

				<SectionContainer className="relative z-10 space-y-12">
					{/* Header */}
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							PORTFOLIO CLASSIFICATION
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Project Portfolio Groups
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Explore our ongoing, upcoming, and successfully completed real
							estate ventures.
						</p>
					</div>

					{/* 2-Column Showcase Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
						{/* Left Column: Interactive Vertical Project Tabs */}
						<div className="lg:col-span-5 space-y-3 text-left">
							{portfolioProjects.map((proj, idx) => {
								const isActive = activePortfolioTab === idx;
								return (
									<div
										key={proj.id || idx}
										onClick={() => setActivePortfolioTab(idx)}
										className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
											isActive
												? "bg-card border-primary/50 shadow-md pl-6 border-l-4 border-l-primary"
												: "bg-card/60 border-border/50 hover:bg-card hover:border-border"
										}`}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<span className="text-xs font-mono font-medium text-primary">
													{proj.num || `0${idx + 1}`}
												</span>
												<h3 className="text-sm sm:text-base font-semibold font-heading text-foreground">
													{proj.title}
												</h3>
											</div>
											<ArrowUpRight
												className={`w-4 h-4 transition-transform ${
													isActive
														? "text-primary rotate-45"
														: "text-muted-foreground opacity-50"
												}`}
											/>
										</div>
									</div>
								);
							})}
						</div>

						{/* Right Column: Dynamic Project Feature Showcase Panel */}
						{portfolioProjects[activePortfolioTab] && (
							<div className="lg:col-span-7 bg-card border border-border/60 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden space-y-6 text-left">
								<div
									className="absolute inset-0 opacity-[0.03] pointer-events-none"
									style={{
										backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
										backgroundSize: "24px 24px",
									}}
								/>

								<AnimatePresence mode="wait">
									<motion.div
										key={activePortfolioTab}
										initial={{ opacity: 0, y: 12 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -12 }}
										transition={{ duration: 0.35, ease: "easeOut" }}
										className="space-y-6 relative z-10"
									>
										{/* Top Header Row */}
										<div className="flex items-center justify-between border-b border-border/40 pb-4">
											<span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
												PROJECT {portfolioProjects[activePortfolioTab].num || `0${activePortfolioTab + 1}`} OF 0{portfolioProjects.length}
											</span>
											<span className="text-xs font-medium font-heading text-accent">
												Silicon Portfolio Verified
											</span>
										</div>

										{/* Title & Description */}
										<div className="space-y-3">
											<div className="flex flex-wrap items-center gap-2">
												<span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary">
													{portfolioProjects[activePortfolioTab].status}
												</span>
												<span className="text-xs text-muted-foreground font-medium">
													Location:{" "}
													{portfolioProjects[activePortfolioTab].location}
												</span>
											</div>

											<h3 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground">
												{portfolioProjects[activePortfolioTab].title}
											</h3>
											<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
												{portfolioProjects[activePortfolioTab].description}
											</p>
										</div>

										{/* Key Highlights & Specifications Badges */}
										{portfolioProjects[activePortfolioTab].highlights && portfolioProjects[activePortfolioTab].highlights.length > 0 && (
											<div className="space-y-2 pt-2">
												<span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground font-heading block">
													KEY HIGHLIGHTS & SPECIFICATIONS:
												</span>
												<div className="flex flex-wrap gap-2">
													{portfolioProjects[activePortfolioTab].highlights.map(
														(tag) => (
															<span
																key={tag}
																className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary"
															>
																<CheckCircle2 className="w-3.5 h-3.5 text-primary" />
																{tag}
															</span>
														),
													)}
												</div>
											</div>
										)}

										{/* Action Button */}
										<div className="pt-4 border-t border-border/40">
											<Link
												href={portfolioProjects[activePortfolioTab].demoUrl || "/properties"}
												className="group bg-primary text-primary-foreground h-11 px-6 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-xs gap-2"
											>
												EXPLORE PROJECT DETAILS
												<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
											</Link>
										</div>
									</motion.div>
								</AnimatePresence>
							</div>
						)}
					</div>
				</SectionContainer>
			</section>

			{/* ── 5. SILICON CITY CIVIC AMENITIES ── */}
			<section className="py-20 sm:py-24 bg-muted/30 border-b border-border/50">
				<SectionContainer className="space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							COMMUNITY INFRASTRUCTURE
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Silicon City Amenities & Civic Infrastructure
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Planned social and civic facilities designed for comfortable
							living and healthy community growth.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								title: "Grand Central Mosque",
								desc: "Beautifully constructed central grand mosque along with block-based mosques for daily prayers.",
								tag: "Religious Center",
							},
							{
								title: "Sports & Athletics Fields",
								desc: "Standard Football Field and Cricket Field designed for an active lifestyle and community sports.",
								tag: "Sports Grounds",
							},
							{
								title: "Green Parks & Playgrounds",
								desc: "Dedicated open green spaces, children's play zones, and riverfront walkways.",
								tag: "Eco Parks",
							},
							{
								title: "Proposed Education Centers",
								desc: "Planned top-tier School & College campuses reserved inside the township boundaries.",
								tag: "Schools & College",
							},
							{
								title: "Healthcare Facilities",
								desc: "Modern Hospital & Medical Center space reserved for instant medical emergency support.",
								tag: "Medical Center",
							},
							{
								title: "Commercial Zones & Markets",
								desc: "Dedicated shopping hubs, grocery markets, and corporate retail spaces for everyday needs.",
								tag: "Shopping Market",
							},
						].map((am, idx) => (
							<div
								key={am.title}
								className="bg-card border border-border/60 rounded-3xl p-7 shadow-xs flex flex-col justify-between space-y-4"
							>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-xs font-mono font-medium text-primary">
											0{idx + 1}
										</span>
										<span className="text-[11px] font-medium font-heading text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
											{am.tag}
										</span>
									</div>
									<h3 className="text-base sm:text-lg font-semibold font-heading text-foreground">
										{am.title}
									</h3>
									<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
										{am.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 6. STRATEGIC LOCATION PROXIMITY ── */}
			<section className="py-20 sm:py-24 bg-background border-b border-border/50">
				<SectionContainer className="space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							STRATEGIC LOCATION
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Proximity to Key Administrative & Cultural Hubs
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Located just 2 to 3 Kilometers from Mohammadpur and key national
							administrative centers.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-card border border-border/60 rounded-3xl p-7 space-y-4">
							<span className="text-xs font-semibold font-heading uppercase tracking-wider text-primary block">
								Administrative & Commercial Hubs
							</span>
							<ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground font-light">
								<li className="flex items-center justify-between border-b border-border/40 pb-2">
									<span>National Parliament House</span>
									<span className="text-foreground font-medium">3.0 km</span>
								</li>
								<li className="flex items-center justify-between border-b border-border/40 pb-2">
									<span>Agargaon Administrative Area</span>
									<span className="text-foreground font-medium">3.5 km</span>
								</li>
								<li className="flex items-center justify-between border-b border-border/40 pb-2">
									<span>Japan Garden City</span>
									<span className="text-foreground font-medium">2.0 km</span>
								</li>
								<li className="flex items-center justify-between border-b border-border/40 pb-2">
									<span>Mohammadpur Town Hall</span>
									<span className="text-foreground font-medium">2.2 km</span>
								</li>
								<li className="flex items-center justify-between">
									<span>Historic Shia Mosque</span>
									<span className="text-foreground font-medium">2.5 km</span>
								</li>
							</ul>
						</div>

						<div className="bg-card border border-border/60 rounded-3xl p-7 space-y-4">
							<span className="text-xs font-semibold font-heading uppercase tracking-wider text-primary block">
								Educational Institutions
							</span>
							<ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground font-light">
								<li className="flex items-center justify-between border-b border-border/40 pb-2">
									<span>Mohammadpur Model College</span>
									<span className="text-foreground font-medium">2.5 km</span>
								</li>
								<li className="flex items-center justify-between border-b border-border/40 pb-2">
									<span>St. Joseph Higher Secondary School</span>
									<span className="text-foreground font-medium">2.8 km</span>
								</li>
								<li className="flex items-center justify-between border-b border-border/40 pb-2">
									<span>Mohammadpur Preparatory School</span>
									<span className="text-foreground font-medium">2.3 km</span>
								</li>
								<li className="flex items-center justify-between">
									<span>Green Herald School</span>
									<span className="text-foreground font-medium">3.1 km</span>
								</li>
							</ul>
						</div>

						<div className="bg-card border border-border/60 rounded-3xl p-7 space-y-4">
							<span className="text-xs font-semibold font-heading uppercase tracking-wider text-primary block">
								Healthcare Institutes
							</span>
							<ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground font-light">
								<li className="flex items-center justify-between border-b border-border/40 pb-2">
									<span>Cardiovascular Diseases Institute</span>
									<span className="text-foreground font-medium">3.2 km</span>
								</li>
								<li className="flex items-center justify-between border-b border-border/40 pb-2">
									<span>National Eye Science Hospital</span>
									<span className="text-foreground font-medium">3.0 km</span>
								</li>
								<li className="flex items-center justify-between">
									<span>NITOR / Pongu Hospital</span>
									<span className="text-foreground font-medium">3.3 km</span>
								</li>
							</ul>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── 7. WHY INVEST IN OUR PROJECTS? ── */}
			<section className="py-20 sm:py-24 bg-muted/30 border-b border-border/50">
				<SectionContainer className="space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							INVESTMENT ADVANTAGE
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Why Invest in Silicon Real Estate Projects?
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Three core pillars that guarantee complete legal security and
							long-term asset value growth.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-card border border-border/60 rounded-3xl p-8 space-y-3">
							<span className="text-xs font-mono font-medium text-primary block">
								Pillar 01
							</span>
							<h3 className="text-lg font-semibold font-heading text-foreground">
								Perfect RAJUK Alternative
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
								For those who did not receive plot allotments in government
								RAJUK projects, Silicon City stands as the most secure,
								well-planned, and promising residential alternative.
							</p>
						</div>

						<div className="bg-card border border-border/60 rounded-3xl p-8 space-y-3">
							<span className="text-xs font-mono font-medium text-primary block">
								Pillar 02
							</span>
							<h3 className="text-lg font-semibold font-heading text-foreground">
								Protected Embankment
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
								Fully protected by the Dhaka Flood Protection Embankment,
								ensuring 100% safety from seasonal flooding and soil erosion.
							</p>
						</div>

						<div className="bg-card border border-border/60 rounded-3xl p-8 space-y-3">
							<span className="text-xs font-mono font-medium text-primary block">
								Pillar 03
							</span>
							<h3 className="text-lg font-semibold font-heading text-foreground">
								Guaranteed Asset Growth
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
								Highly appreciating land value driven by rapid urban expansion
								in Mohammadpur and upcoming Turag River bridge infrastructure.
							</p>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── 8. LIVE SEARCHABLE INVENTORY SECTION WITH DIRECT QUICK LINK ── */}
			<section
				id="inventory-search"
				className="py-20 sm:py-24 bg-background border-b border-border/50"
			>
				<SectionContainer className="space-y-8">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<div className="max-w-2xl text-left space-y-2">
							<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
								SEARCHABLE INVENTORY
							</span>
							<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
								Explore Live Available Properties
							</h2>
							<p className="text-muted-foreground text-xs sm:text-sm font-light">
								Search by title, location, category, or status.
							</p>
						</div>

						<Link
							href="/properties"
							className="group bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 h-11 px-5 rounded-xl text-xs font-medium font-heading inline-flex items-center gap-2 shrink-0 transition-all"
						>
							VIEW DEDICATED PROPERTIES PAGE
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>

					{/* Search Controls Bar */}
					<div className="p-6 rounded-3xl border border-border/60 bg-card shadow-xs space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-4">
							<div className="relative">
								<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<input
									type="text"
									placeholder="Search by title, sector, or location..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full h-11 pl-11 pr-10 rounded-xl border border-border/60 bg-background text-sm font-light placeholder:text-muted-foreground focus:outline-none focus:border-primary"
								/>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery("")}
										className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
									>
										<X className="h-3.5 w-3.5" />
									</button>
								)}
							</div>

							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value as SortOption)}
								className="w-full h-11 px-4 rounded-xl border border-border/60 bg-background text-xs font-medium text-foreground cursor-pointer"
							>
								<option value="newest">Sort: Newest</option>
								<option value="price-asc">Price: Low to High</option>
								<option value="price-desc">Price: High to Low</option>
								<option value="area-desc">Area: Largest Size</option>
							</select>
						</div>

						<div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/40">
							<div className="flex flex-wrap gap-1.5">
								{CATEGORY_FILTERS.map(({ value, label }) => (
									<button
										key={value}
										onClick={() => setActiveCategory(value)}
										className={`h-8 px-4 rounded-full text-xs font-medium transition-all ${
											activeCategory === value
												? "bg-primary text-primary-foreground shadow-xs"
												: "bg-background border border-border/60 text-muted-foreground hover:text-foreground"
										}`}
									>
										{label}
									</button>
								))}
							</div>

							<div className="flex flex-wrap gap-1.5">
								{STATUS_FILTERS.map(({ value, label }) => (
									<button
										key={value}
										onClick={() => setActiveStatus(value)}
										className={`h-8 px-4 rounded-full text-xs font-medium transition-all ${
											activeStatus === value
												? "bg-accent text-dark-hero font-semibold shadow-xs"
												: "bg-background border border-border/60 text-muted-foreground hover:text-foreground"
										}`}
									>
										{label}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Properties Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<AnimatePresence mode="popLayout">
							{filteredProjects.map((property) => (
								<motion.div
									key={property.id}
									layout
									initial={{ opacity: 0, y: 16 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 16 }}
									className="bg-card border border-border/60 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 group hover:border-primary/40 transition-all"
								>
									<div className="space-y-3">
										<div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
											{property.images.length > 0 ? (
												<Image
													src={property.images[0]}
													alt={property.title}
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-500"
												/>
											) : (
												<div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
													Image Unavailable
												</div>
											)}
											<div className="absolute top-3 left-3">
												<span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 bg-black/60 backdrop-blur-md text-white rounded-full">
													{STATUS_LABELS[property.status]}
												</span>
											</div>
										</div>

										<h3 className="text-base font-semibold font-heading text-foreground group-hover:text-primary transition-colors">
											{property.title}
										</h3>
										<p className="text-xs text-muted-foreground font-light">
											Location: {property.location}
										</p>
									</div>

									<div className="pt-3 border-t border-border/40 flex items-center justify-between">
										<div>
											<span className="text-[10px] text-muted-foreground uppercase font-medium block">
												Starting Price
											</span>
											<span className="text-sm font-semibold font-heading text-primary">
												{formatCompactCurrency(property.price)}
											</span>
										</div>
										<Link
											href={`/projects/${property.slug}`}
											className="bg-primary text-primary-foreground h-9 px-4 rounded-xl text-xs font-medium font-heading inline-flex items-center justify-center hover:bg-primary/90 transition-all"
										>
											View Details
										</Link>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</SectionContainer>
			</section>

			{/* ── 9. OFFLINE BOOKING CTA BANNER ── */}
			<section className="py-20 sm:py-24 bg-background">
				<SectionContainer>
					<div className="bg-dark-hero rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-10 relative overflow-hidden">
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
									OFFLINE BOOKING GUIDE
								</span>
								<h2 className="text-2xl sm:text-3xl font-semibold font-heading text-white tracking-tight">
									Secure Your Dream Plot in Silicon City
								</h2>
								<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
									Follow our simple office booking guideline to secure your plot
									allotment.
								</p>
							</div>

							<div className="lg:col-span-4 flex flex-wrap items-center justify-start lg:justify-end gap-3">
								<Link
									href="/membership"
									className="group bg-primary text-primary-foreground h-12 px-6 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-md gap-2"
								>
									DOWNLOAD FORM
									<Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
								</Link>
								<Link
									href="/contact"
									className="group bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 h-12 px-6 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center transition-all gap-2"
								>
									SITE VISIT PLAN
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</div>

						<div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 space-y-2">
								<span className="text-xs font-mono font-medium text-accent block">
									Step 01
								</span>
								<h4 className="text-sm font-semibold font-heading text-white">
									Choose Desired Plot
								</h4>
								<p className="text-xs text-white/70 font-light leading-relaxed">
									Check out our project layout and choose your desired plot size
									(3, 5, or 10 Kathas).
								</p>
							</div>

							<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 space-y-2">
								<span className="text-xs font-mono font-medium text-accent block">
									Step 02
								</span>
								<h4 className="text-sm font-semibold font-heading text-white">
									Download Application
								</h4>
								<p className="text-xs text-white/70 font-light leading-relaxed">
									Download the official Membership Application Form from our
									Membership page.
								</p>
							</div>

							<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 space-y-2">
								<span className="text-xs font-mono font-medium text-accent block">
									Step 03
								</span>
								<h4 className="text-sm font-semibold font-heading text-white">
									Office Submission
								</h4>
								<p className="text-xs text-white/70 font-light leading-relaxed">
									Visit our Corporate Office in Mohammadpur with NID copies, 2
									photos, and BDT 1,000 application fee.
								</p>
							</div>
						</div>

						<div className="relative z-10 pt-4 text-xs text-white/70 font-heading">
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
		</div>
	);
}
