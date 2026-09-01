"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { useProjects } from "@/hooks/useProjects";
import { useProperties } from "@/hooks/useProperties";
import { useProjectsContent } from "@/hooks/useProjectsContent";
import { useLanguage } from "@/context/LanguageContext";
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
	Phone,
	Mail,
} from "lucide-react";

type StatusFilter = "all" | Property["status"];
type CategoryFilter = "all" | Property["category"];
type SortOption = "newest" | "price-asc" | "price-desc" | "area-desc";

const AMENITY_ICONS: Record<number, any> = {
	0: Landmark,
	1: Trees,
	2: Compass,
	3: GraduationCap,
	4: HeartPulse,
	5: ShoppingBag,
};

export function ProjectsClient() {
	const { data: content } = useProjectsContent();
	const { projects } = useProjects();
	const { properties } = useProperties();
	const { isBn } = useLanguage();

	// Inventory Filters State
	const [searchQuery, setSearchQuery] = useState("");
	const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
	const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
	const [sortBy, setSortBy] = useState<SortOption>("newest");

	const statusFilters = [
		{ value: "all" as StatusFilter, label: isBn ? "সকল স্ট্যাটাস" : "All Status" },
		{
			value: "available" as StatusFilter,
			label: isBn ? "চলমান / বুকিং উন্মুক্ত" : "Ongoing / Open",
		},
		{
			value: "pending" as StatusFilter,
			label: isBn ? "আসন্ন প্রকল্প" : "Upcoming",
		},
		{
			value: "sold" as StatusFilter,
			label: isBn ? "সম্পন্ন প্রকল্প" : "Completed",
		},
	];

	const categoryFilters = [
		{ value: "all" as CategoryFilter, label: isBn ? "সকল প্রকার" : "All Types" },
		{
			value: "residential" as CategoryFilter,
			label: isBn ? "আবাসিক প্লট" : "Residential Plots",
		},
		{
			value: "commercial" as CategoryFilter,
			label: isBn ? "বাণিজ্যিক প্লট" : "Commercial Plots",
		},
	];

	const sortOptions = [
		{ value: "newest" as SortOption, label: isBn ? "নতুনতম" : "Newest" },
		{
			value: "price-asc" as SortOption,
			label: isBn ? "মূল্য: কম থেকে বেশি" : "Price: Low to High",
		},
		{
			value: "price-desc" as SortOption,
			label: isBn ? "মূল্য: বেশি থেকে কম" : "Price: High to Low",
		},
		{
			value: "area-desc" as SortOption,
			label: isBn ? "আয়তন: বড় থেকে ছোট" : "Area: Large to Small",
		},
	];

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
			result.sort((a, b) => (b.area || 0) - (a.area || 0));
		} else {
			result.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			);
		}

		return result;
	}, [properties, searchQuery, activeStatus, activeCategory, sortBy]);

	const trustMetrics = isBn
		? [
				{ value: "১৫০+ একর", label: "পরিকল্পিত টাউনশিপ এলাকা" },
				{ value: "১৬–১৮ ফুট", label: "উঁচু বালু ভরাটকৃত জমি" },
				{ value: "৩০ ও ৪০ ফুট", label: "প্রশস্ত অভ্যন্তরীণ রাস্তা" },
				{ value: "১০০% রেডি", label: "নিষ্কণ্টক মালিকানা ও মিউটেশন" },
			]
		: content.trustMetrics;

	const specs = isBn
		? [
				{
					num: "০১",
					title: "১৬ থেকে ১৮ ফুট উঁচু মাটি ভরাট",
					desc: "বন্যা সীমা থেকে ১৬–১৮ ফুট উঁচু বালু ভরাটকৃত স্থায়ী সমতল ভূমি যা সম্পূর্ণ জলাবদ্ধতামুক্ত।",
				},
				{
					num: "০২",
					title: "৩০ ও ৪০ ফুট প্রশস্ত আরসিসি সড়ক",
					desc: "মসৃণ ও নিরবচ্ছিন্ন যানবাহন চলাচলের জন্য সুপরিকল্পিত আরসিসি রাস্তা নেটওয়ার্ক।",
				},
				{
					num: "০৩",
					title: "১০০% নিষ্কণ্টক নামজারি ও সাব-রেজিস্ট্রি",
					desc: "সিএস, এসএ, আরএস ও বিএস রেকর্ড যাচাইকৃত স্বচ্ছ দলিল ও তাৎক্ষণিক রেজিস্ট্রেশন সুবিধা।",
				},
				{
					num: "০৪",
					title: "মোহাম্মদপুর থেকে মাত্র ১৫ মিনিটের দূরত্ব",
					desc: "তুরাগ নদীর তীরে কৌশলগত যোগাযোগ করিডোরে অবস্থিত হওয়ায় ঢাকার কেন্দ্রস্থলে দ্রুত যাতায়াত।",
				},
			]
		: content.specs;

	const amenities = isBn
		? [
				{
					title: "গ্র্যান্ড সেন্ট্রাল জামে মসজিদ",
					desc: "সুবিশাল দৃষ্টিনন্দন সেন্ট্রাল মসজিদ এবং প্রতিটি ব্লকে নামাজের পৃথক ব্যবস্থা।",
					tag: "আধ্যাত্মিক কেন্দ্র",
				},
				{
					title: "খেলার মাঠ ও বিনোদন পার্ক",
					desc: "সন্তানদের খেলাধুলা ও পারিবারিক বিনোদনের জন্য সবুজ খোলা মাঠ ও পার্ক।",
					tag: "শারীরিক বিকাশ",
				},
				{
					title: "নদীতীরবর্তী গ্রিন করিডোর",
					desc: "তুরাগ নদীর তীরে প্রাকৃতিক নির্মল পরিবেশ ও দৃষ্টিনন্দন ওয়াকওয়ে।",
					tag: "প্রাকৃতিক শোভা",
				},
				{
					title: "স্কুল ও কলেজ ক্যাম্পাস",
					desc: "টাউনশিপের অভ্যন্তরে মানসম্মত শিক্ষা নিশ্চিতকরণে সংরক্ষিত শিক্ষা জোন।",
					tag: "শিক্ষা সুবিধা",
				},
				{
					title: "হাসপাতাল ও ডায়াগনস্টিক সেন্টার",
					desc: "২৪/৭ জরুরি স্বাস্থ্যসেবা ও আধুনিক চিকিৎসা সুবিধা নিশ্চিত করার পরিকল্পনা।",
					tag: "চিকিৎসা কেন্দ্র",
				},
				{
					title: "শপিং মল ও কমিউনিটি মার্কেট",
					desc: "নিত্যপ্রয়োজনীয় কেনাকাটা ও বাণিজ্যিক কার্যক্রমের জন্য সুবিন্যস্ত শপিং কমপ্লেক্স।",
					tag: "বাণিজ্যিক জোন",
				},
			]
		: content.amenities;

	const proximities = isBn
		? [
				{
					category: "প্রধান সংযোগ সড়ক ও যোগাযোগ",
					items: [
						{ name: "মোহাম্মদপুর বেড়িবাঁধ ও বাস স্ট্যান্ড", dist: "১৫ মিনিট" },
						{ name: "ধানমন্ডি ২৭ / সোবহানবাগ", dist: "২৫ মিনিট" },
						{ name: "গাবতলী বাস টার্মিনাল", dist: "২০ মিনিট" },
					],
				},
				{
					category: "গুরুত্বপূর্ণ নগর কেন্দ্র",
					items: [
						{ name: "উত্তরা / শাহজালাল আন্তর্জাতিক বিমানবন্দর", dist: "৩৫ মিনিট" },
						{ name: "মিরপুর ১০ মেট্রো রেল স্টেশন", dist: "২৫ মিনিট" },
						{ name: "ঢাকা বিশ্ববিদ্যালয় ও মতিঝিল জোন", dist: "৪০ মিনিট" },
					],
				},
			]
		: content.proximities;

	const roadmap = isBn
		? [
				{
					step: "০১",
					title: "জমি অধিগ্রহণ ও নিষ্কণ্টককরণ",
					desc: "১০০% ভেরিফাইড দলিলপত্রসহ বড় বাদেশী মৌজায় জমি অধিগ্রহণ সম্পন্ন।",
				},
				{
					step: "০২",
					title: "মেগা বালু ভরাট ও ভূমি উন্নয়ন",
					desc: "১৬–১৮ ফুট উচ্চতায় মাটি ও বালু ভরাট করে নিরাপদ সমতল ভূমি তৈরি।",
				},
				{
					step: "০৩",
					title: "অভ্যন্তরীণ সড়ক ও ড্রেনেজ নেটওয়ার্ক",
					desc: "৩০ ও ৪০ ফুট প্রশস্ত আরসিসি সড়ক এবং উন্নত ড্রেনেজ কাঠামোর কাজ চলমান।",
				},
				{
					step: "০৪",
					title: "নাগরিক সুবিধা ও চূড়ান্ত হস্তান্তর",
					desc: "মসজিদ, পার্ক, বিদ্যুৎ সংযোগ এবং ব্লকভিত্তিক প্লট সীমানা ও দখল হস্তান্তর।",
				},
			]
		: content.roadmap;

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden text-left">
			{/* ── 1. ARCHITECTURAL HERO HEADER ── */}
			<section className="relative pt-28 pb-20 bg-dark-hero text-white overflow-hidden">
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
								{isBn ? "হোম" : "Home"}
							</Link>
							<ChevronRight className="w-3 h-3 text-white/40" />
							<span className="text-accent font-semibold">
								{isBn ? "প্রকল্পসমূহ" : "Projects"}
							</span>
						</nav>

						<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white tracking-tight leading-snug mb-3">
							{isBn ? "পরিকল্পিত আধুনিক মেগা টাউনশিপ ও" : content.heroTitle} <br />
							<span className="text-gold">
								{isBn ? "নিরাপদ প্রাইম ল্যান্ড ডেভেলপমেন্ট" : content.heroSubtitle}
							</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mb-7">
							{isBn
								? "সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ আইনি সুরক্ষা, পরিবেশবান্ধব অবকাঠামো এবং বন্যা প্রতিরোধী আধুনিক মেগা টাউনশিপ বাস্তবায়নে শীর্ষস্থানীয়।"
								: content.heroDesc}
						</p>

						{/* Action Buttons */}
						<div className="flex flex-wrap items-center gap-3">
							<a
								href="#inventory-section"
								className="inline-flex items-center justify-center bg-primary text-primary-foreground h-11 px-6 rounded-xl font-semibold font-heading text-xs sm:text-sm hover:bg-primary/90 transition-all border border-white/20 shadow-md gap-2"
							>
								{isBn ? "উপলব্ধ প্লটসমূহ দেখুন" : "BROWSE AVAILABLE PLOTS"}
								<ArrowRight className="w-4 h-4" />
							</a>
							<Link
								href="/contact"
								className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 h-11 px-6 rounded-xl font-semibold font-heading text-xs sm:text-sm transition-all gap-2"
							>
								{isBn ? "সাইট ভিজিট বুক করুন" : "SCHEDULE SITE VISIT"}
								<CalendarCheck className="w-4 h-4 text-accent" />
							</Link>
						</div>
					</motion.div>

					{/* 4 Quick Value Trust Metrics Strip */}
					<div className="pt-5 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-3.5">
						{trustMetrics.map((tm, idx) => (
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
							{isBn ? "ফ্ল্যাগশিপ মেগা প্রজেক্ট" : content.spotlightBadge}
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{isBn
								? "সিলিকন সিটি — পরিকল্পিত নিরাপদ আবাসন নগরী"
								: content.spotlightTitle}
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed">
							{isBn
								? "সাভার বড় বাদেশী মৌজায়, তুরাগ নদীর তীরে এবং মোহাম্মদপুর বেড়িবাঁধ সংলগ্ন সুরক্ষিত প্রাকৃতিক পরিবেশে অবস্থিত।"
								: content.spotlightDesc}
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
									{isBn ? "চলমান মেগা টাউনশিপ" : content.spotlightTag}
								</span>
								<h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
									{isBn
										? "রাজউক মাস্টারপ্ল্যান আওতাভুক্ত ও বাঁধ সুরক্ষিত"
										: content.spotlightBoxTitle}
								</h3>
								<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
									{isBn
										? "সিলিকন সিটি রাজউকের প্রস্তাবিত সম্প্রসারিত নগর মহাপরিকল্পনার সাথে সংগতিপূর্ণ এবং ঢাকা বন্যা নিয়ন্ত্রণ বাঁধের সুরক্ষিত এলাকায় অবস্থিত।"
										: content.spotlightBoxDesc}
								</p>
							</div>

							<div className="relative z-10 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs font-heading">
								<div className="flex items-center gap-1.5 text-white/70">
									<MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
									<span>
										{isBn ? "সাভার (বড় বাদেশী মৌজা)" : content.spotlightLocation}
									</span>
								</div>
								<span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold text-[11px]">
									{isBn ? "১০০% রেডি মিউটেশন" : content.spotlightBadge2}
								</span>
							</div>
						</div>

						{/* Right 4 Engineering & Legal Highlights */}
						<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
							{specs.map((spec) => (
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

			{/* ── 3. DYNAMIC TOWNSHIPS & PORTFOLIO PROJECTS ── */}
			<section className="py-16 sm:py-20 bg-background overflow-hidden border-b border-border/50 relative">
				<SectionContainer className="space-y-10">
					<div className="max-w-3xl space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "ডেভেলপমেন্ট পোর্টফোলিও" : "DEVELOPMENT PORTFOLIO"}
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{isBn
								? "আমাদের মেগা টাউনশিপ ও প্রকল্পসমূহ"
								: "Master Townships & Landmark Projects"}
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm font-light leading-relaxed">
							{isBn
								? "আমাদের চলমান ও আসন্ন আধুনিক আবাসন এবং বাণিজ্যিক প্রকল্পসমূহ দেখুন।"
								: "Discover our premier residential townships and commercial hubs under active execution."}
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
											{proj.num || (isBn ? `০${idx + 1}` : `0${idx + 1}`)}
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
										{proj.type ||
											(isBn ? "টাউনশিপ উন্নয়ন" : "Township Development")}
									</span>
									<a
										href="#inventory-section"
										className="text-xs font-semibold text-foreground hover:text-primary inline-flex items-center gap-1 font-heading"
									>
										{isBn ? "উপলব্ধ প্লট দেখুন" : "View Available Plots"}{" "}
										<ArrowRight className="w-3.5 h-3.5" />
									</a>
								</div>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 4. INTEGRATED CIVIC AMENITIES ── */}
			<section className="py-16 sm:py-20 bg-muted/30 overflow-hidden border-b border-border/50 relative">
				<SectionContainer className="space-y-10">
					<div className="max-w-3xl space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "নাগরিক সুবিধাসমূহ" : "LIFESTYLE & CIVIC AMENITIES"}
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{isBn
								? "পরিপূর্ণ আধুনিক নাগরিক সুযোগ-সুবিধা"
								: "Integrated Modern Civic Infrastructure"}
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{amenities.map((item, idx) => {
							const IconComp = AMENITY_ICONS[idx % 6] || Landmark;
							return (
								<div
									key={item.title}
									className="bg-card border border-border/60 rounded-2xl p-6 shadow-xs space-y-3 hover:border-primary/40 transition-all flex flex-col justify-between"
								>
									<div className="space-y-2.5">
										<div className="flex items-center justify-between">
											<div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
												<IconComp className="w-5 h-5" />
											</div>
											<span className="text-[10px] font-semibold text-accent uppercase font-heading px-2 py-0.5 rounded-md bg-accent/10">
												{item.tag}
											</span>
										</div>
										<h3 className="text-base font-bold font-heading text-foreground">
											{item.title}
										</h3>
										<p className="text-xs text-muted-foreground font-light leading-relaxed">
											{item.desc}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</SectionContainer>
			</section>

			{/* ── 5. STRATEGIC PROXIMITY & DISTANCE MATRIX ── */}
			<section className="py-16 sm:py-20 bg-background overflow-hidden border-b border-border/50 relative">
				<SectionContainer className="space-y-10">
					<div className="max-w-3xl space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "যোগাযোগ ও দূরত্ব" : "STRATEGIC PROXIMITY"}
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{isBn
								? "ঢাকার প্রধান পয়েন্টসমূহ থেকে দূরত্ব"
								: "Travel Time & Key Connectivity Matrix"}
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{proximities.map((cat) => (
							<div
								key={cat.category}
								className="bg-card border border-border/60 rounded-2xl p-6 shadow-xs space-y-4"
							>
								<h3 className="text-sm font-bold font-heading text-primary uppercase tracking-wider border-b border-border/40 pb-3">
									{cat.category}
								</h3>
								<div className="space-y-3">
									{cat.items.map((it) => (
										<div
											key={it.name}
											className="flex items-center justify-between text-xs py-1 border-b border-border/20 last:border-0"
										>
											<span className="text-foreground font-medium">
												{it.name}
											</span>
											<span className="font-mono font-bold text-accent px-2.5 py-0.5 rounded-md bg-muted">
												{it.dist}
											</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 6. DEVELOPMENT ROADMAP ── */}
			<section className="py-16 sm:py-20 bg-muted/30 overflow-hidden border-b border-border/50 relative">
				<SectionContainer className="space-y-10">
					<div className="max-w-3xl space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "উন্নয়ন রোডম্যাপ" : "DEVELOPMENT ROADMAP"}
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{isBn
								? "ধাপে ধাপে প্রকল্প বাস্তবায়ন অগ্রগতি"
								: "Masterplan Execution Milestones"}
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{roadmap.map((st) => (
							<div
								key={st.step}
								className="bg-card border border-border/60 rounded-2xl p-6 shadow-xs space-y-2.5 relative"
							>
								<span className="text-xs font-mono font-bold text-accent block">
									{isBn ? `পর্যায় ${st.step}` : `Phase ${st.step}`}
								</span>
								<h3 className="text-base font-bold font-heading text-foreground">
									{st.title}
								</h3>
								<p className="text-xs text-muted-foreground font-light leading-relaxed">
									{st.desc}
								</p>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 7. LIVE VERIFIED PLOT INVENTORY SECTION ── */}
			<section
				id="inventory-section"
				className="py-16 sm:py-20 bg-background overflow-hidden relative"
			>
				<SectionContainer className="space-y-8">
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
						<div className="space-y-2 max-w-2xl">
							<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
								{isBn ? "লাইভ প্লট ইনভেন্টরি" : "LIVE PLOT INVENTORY"}
							</span>
							<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
								{isBn
									? "উপলব্ধ ভেরিফাইড প্লটসমূহ"
									: "Available Verified Plots for Allotment"}
							</h2>
							<p className="text-muted-foreground text-xs sm:text-sm font-light">
								{isBn
									? "নিচের ফিল্টার ব্যবহার করে আপনার বাজেটের উপযুক্ত প্লট খুঁজুন।"
									: "Filter by size, category, and price to find your perfect plot."}
							</p>
						</div>

						{/* Search Input */}
						<div className="relative w-full md:w-72">
							<Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
							<input
								type="text"
								placeholder={
									isBn
										? "প্লটের নাম বা লোকেশন খুঁজুন..."
										: "Search plots or location..."
								}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full h-10 pl-9 pr-8 rounded-xl bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
							/>
							{searchQuery && (
								<button
									onClick={() => setSearchQuery("")}
									className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								>
									<X className="w-3.5 h-3.5" />
								</button>
							)}
						</div>
					</div>

					{/* Filter Pills */}
					<div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-muted/40 border border-border/60">
						<div className="flex flex-wrap items-center gap-2">
							{categoryFilters.map((f) => (
								<button
									key={f.value}
									onClick={() => setActiveCategory(f.value)}
									className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
										activeCategory === f.value
											? "bg-primary text-primary-foreground shadow-xs"
											: "bg-card text-muted-foreground hover:text-foreground border border-border/60"
									}`}
								>
									{f.label}
								</button>
							))}
						</div>

						{/* Sort Dropdown */}
						<div className="flex items-center gap-2">
							<span className="text-xs text-muted-foreground hidden sm:inline">
								{isBn ? "সর্ট করুন:" : "Sort:"}
							</span>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value as SortOption)}
								className="h-8 px-3 rounded-xl bg-card border border-border/80 text-xs font-medium text-foreground focus:outline-none"
							>
								{sortOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Plot Cards Grid */}
					{filteredProjects.length === 0 ? (
						<div className="p-12 text-center bg-card rounded-2xl border border-border/60 space-y-3">
							<p className="text-sm font-semibold text-foreground">
								{isBn
									? "কোনো প্লট পাওয়া যায়নি।"
									: "No plots matched your search criteria."}
							</p>
							<button
								onClick={() => {
									setSearchQuery("");
									setActiveStatus("all");
									setActiveCategory("all");
								}}
								className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold"
							>
								{isBn ? "সব ফিল্টার রিসেট করুন" : "Reset All Filters"}
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{filteredProjects.map((prop) => (
								<div
									key={prop.id}
									className="group bg-card border border-border/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
								>
									<div className="relative h-48 w-full overflow-hidden bg-muted">
										<img
											src={
												prop.images[0] ||
												"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200"
											}
											alt={prop.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
										<div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
											{prop.category}
										</div>
										<div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
											{prop.status}
										</div>
									</div>

									<div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
										<div className="space-y-2">
											<h3 className="text-base font-bold font-heading text-foreground group-hover:text-primary transition-colors line-clamp-1">
												{prop.title}
											</h3>
											<p className="text-xs text-muted-foreground flex items-center gap-1 font-light truncate">
												<MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
												{prop.location}
											</p>
											<p className="text-xs text-muted-foreground line-clamp-2 font-light">
												{prop.description}
											</p>
										</div>

										<div className="pt-3 border-t border-border/40 flex items-center justify-between">
											<div>
												<span className="text-[10px] text-muted-foreground block font-mono uppercase">
													{isBn ? "মূল্য" : "PRICE"}
												</span>
												<span className="text-base font-bold font-heading text-primary">
													{formatCurrency(prop.price)}
												</span>
											</div>
											<Link
												href="/contact"
												className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold font-heading transition-all"
											>
												{isBn ? "বুকিং করুন" : "Book Plot"}
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</SectionContainer>
			</section>

			{/* ── 8. DIRECT CONSULTATION DESK CTA ── */}
			<section className="py-16 bg-muted/40 border-t border-border/50">
				<SectionContainer>
					<div className="bg-dark-hero rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/15">
						<div className="space-y-2 max-w-xl text-left">
							<span className="text-xs font-mono font-bold text-accent uppercase tracking-wider block">
								{isBn ? "সরাসরি পরামর্শ ডেস্ক" : content.ctaBadge}
							</span>
							<h3 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
								{isBn ? "সিলিকন সিটিতে প্লট বরাদ্দ নিতে প্রস্তুত?" : content.ctaTitle}
							</h3>
							<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
								{isBn
									? "আমাদের মোহাম্মদপুর প্রধান কার্যালয়ে অভিজ্ঞ প্রপার্টি উপদেষ্টার সাথে সরাসরি কথা বলুন বা সাইট ভিজিট শিডিউল করুন।"
									: content.ctaDesc}
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-3 shrink-0">
							<Link
								href="/contact"
								className="h-12 px-7 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold font-heading text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-md"
							>
								<span>{isBn ? "যোগাযোগ করুন" : "CONTACT US"}</span>
								<ArrowRight className="w-4 h-4" />
							</Link>
						</div>
					</div>
				</SectionContainer>
			</section>
		</div>
	);
}
