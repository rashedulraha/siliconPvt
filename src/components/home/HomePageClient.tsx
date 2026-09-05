"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MasterPlanAmenities } from "./glass/MasterPlanAmenities";
import { WhyChooseUs } from "./WhyChooseUs";
import { SiliconCityShowcase } from "./glass/SiliconCityShowcase";
import { ProjectGallerySection } from "./glass/ProjectGallerySection";
import { InvestmentProcess } from "./InvestmentProcess";
import { CompanyNewsSection } from "./glass/CompanyNewsSection";
import { LeadershipGlassBlocks } from "./glass/LeadershipGlassBlocks";
import { OfflineMembershipGlassBanner } from "./glass/OfflineMembershipGlassBanner";
import { SectionContainer } from "../layout/SectionContainer";
import { useProperties } from "@/hooks/useProperties";
import { useHomeContent } from "@/hooks/useHomeContent";
import { useSlides } from "@/hooks/useSlides";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/utils";
import { MapPin, ArrowRight } from "lucide-react";
import InteractiveCarouselRing from "./glass/InteractiveCarouselRing";

// Soft, lightweight modern architectural real estate photo for hero background
const HERO_BG_IMAGE =
	"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=75";

export function HomePageClient() {
	const [mounted, setMounted] = useState(false);
	const router = useRouter();
	const { properties } = useProperties();
	const { data: homeData } = useHomeContent();
	const { slides } = useSlides();
	const { isBn } = useLanguage();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="min-h-screen bg-background" />;
	}

	const featuredList = properties.filter((p) => p.featured);
	const featuredPlots =
		featuredList.length >= 3
			? featuredList.slice(0, 3)
			: properties.slice(0, 3);
	const trustCounters = homeData.trustCounters;
	const accreditations = homeData.accreditations;

	const bnTrustCounters = [
		{
			value: "১৫০+ একর",
			label: "পরিকল্পিত টাউনশিপ এলাকা",
			detail: "মোট মাস্টারপ্ল্যান সাইজ",
		},
		{
			value: "১৬–১৮ ফুট",
			label: "উঁচু বালু ভরাটকৃত জমি",
			detail: "মৌসুমী বন্যা প্রতিরোধী",
		},
		{
			value: "৩০ ও ৪০ ফুট",
			label: "প্রশস্ত অভ্যন্তরীণ রাস্তা",
			detail: "মসৃণ যানবাহন চলাচল",
		},
		{
			value: "১০০% রেডি",
			label: "নিষ্কণ্টক মালিকানা ও মিউটেশন",
			detail: "তাৎক্ষণিক দলিল রেজিস্ট্রি",
		},
	];

	const bnAccreditations = [
		"রাজউক মাস্টারপ্ল্যান আওতাভুক্ত",
		"বন্যা নিয়ন্ত্রণ বাঁধ সুরক্ষিত জোন",
		"সিএস, এসএ, আরএস ও বিএস খতিয়ান মিউটেশন",
		"মোহাম্মদপুর ব্রিজ সরাসরি সংযোগ",
		"সেন্ট্রাল মসজিদ ও স্পোর্টস কমপ্লেক্স",
		"আধুনিক হাসপাতাল ও স্কুল সংরক্ষিত জোন",
	];

	return (
		<div className="bg-background text-foreground min-h-screen overflow-x-hidden flex flex-col">
			{/* ── SECTION 1: WORLD-CLASS LUXURY ARCHITECTURAL HERO ── */}
			<section className="relative w-full h-[calc(100dvh-64px)] mt-16 overflow-hidden flex flex-col justify-between items-center select-none">
				{/* ── BACKGROUND LAYER: SOFT LIGHTWEIGHT REAL ESTATE IMAGE ── */}
				<div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
					<div
						className="absolute inset-0 w-full h-full bg-cover bg-center opacity-45 scale-105 transition-all duration-700"
						style={{
							backgroundImage: `url("${HERO_BG_IMAGE}")`,
						}}
					/>

					{/* Soft Ambient Vignette Overlay for Crisp Contrast */}
					<div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/55 pointer-events-none" />
					<div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/50 pointer-events-none" />
				</div>

				{/* ── TOP UTILITY STRIP ── */}
				<div className="relative z-30 w-full flex items-center justify-start px-6 sm:px-12 pt-3">
					<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-widest text-white/80 uppercase shadow-xs">
						<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
						{isBn
							? "সাভার, ঢাকা • মোহাম্মদপুর থেকে মাত্র ১৫ মিনিট"
							: "SAVAR, DHAKA • 15 MIN FROM MOHAMMADPUR"}
					</div>
				</div>

				{/* ── CENTER ASSEMBLY: 3D CYLINDER RING + NESTED BELLY HEADLINE ── */}
				<div className="relative z-10 w-full flex items-center justify-center my-auto">
					{/* 1. 3D Rotating Cylinder Ring */}
					<InteractiveCarouselRing
						className="w-full max-w-300 mx-auto"
						items={slides.map((s) => ({
							id: s.id,
							title: s.title,
							subtitle: s.subtitle,
							imageUrl: s.image,
							badge: s.badge || (isBn ? "ফিচারড" : "FEATURED"),
							link: s.link,
							active: s.active,
							order: s.order,
						}))}
					/>

					{/* 2. Nestled Center Headline Text */}
					<div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center px-4 w-full max-w-md sm:max-w-lg pointer-events-none space-y-1.5">
						{/* Badge Tag */}
						<motion.div
							initial={{ opacity: 0, y: -6 }}
							animate={{ opacity: 1, y: 0 }}
						>
							<span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-300 font-heading shadow-md">
								<span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
								{isBn
									? "পরিকল্পিত ইকো-টাউনশিপ ও নিষ্কণ্টক প্লট"
									: homeData.heroBadge ||
										"PLANNED ECO-TOWNSHIPS & RESIDENTIAL PLOTS"}
							</span>
						</motion.div>

						{/* Main Headline Title */}
						<motion.h1
							initial={{ opacity: 0, scale: 0.96 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.1 }}
							className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight leading-tight drop-shadow-xl"
						>
							{isBn
								? "সিলিকন সিটি — মাস্টার প্ল্যানড মেগা টাউনশিপ"
								: homeData.heroTitle ||
									"Silicon City — Master Planned Township"}
						</motion.h1>

						{/* Narrative Subtitle */}
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
							className="text-[11px] sm:text-xs text-white/90 font-light max-w-xs sm:max-w-md mx-auto leading-relaxed line-clamp-2 drop-shadow-md"
						>
							{isBn
								? "১৬–১৮ ফুট উঁচু বালু ভরাট, ৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ আরসিসি রাস্তা এবং শতভাগ নিষ্কণ্টক মালিকানায় মোহাম্মদপুর সংলগ্ন সাভারে আপনার স্থায়ী ঠিকানা।"
								: homeData.heroDesc ||
									"Experience modern urban planning with 16–18ft high elevation, 30ft/40ft wide internal concrete roads, and clear legal title mutation in Savar, adjacent to Mohammadpur, Dhaka."}
						</motion.p>

						{/* Key Highlights Micro-Pill Strip */}
						<div className="hidden sm:flex items-center gap-2 pt-0.5">
							<span className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-xs border border-white/15 text-[10px] font-medium text-white/90">
								{isBn ? "১৬-১৮ ফুট উঁচু মাটি ভরাট" : "16-18ft High Elevation"}
							</span>
							<span className="text-white/40">•</span>
							<span className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-xs border border-white/15 text-[10px] font-medium text-white/90">
								{isBn ? "৪০ ফুট প্রধান সংযোগ সড়ক" : "40ft Main Concrete Roads"}
							</span>
							<span className="text-white/40">•</span>
							<span className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-xs border border-white/15 text-[10px] font-medium text-white/90">
								{isBn
									? "১০০% মিউটেশন ও রেজিস্ট্রেশন প্রস্তুত"
									: "100% Mutation Ready"}
							</span>
						</div>
					</div>
				</div>

				{/* ── BOTTOM DOCK: KEY TOWNSHIP HIGHLIGHTS & DIRECT ACTION BUTTONS ── */}
				<div className="relative z-30 w-full max-w-5xl mx-auto px-4 pb-4">
					<div className="p-3 sm:p-3.5 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
						{/* 3 Quick Real Estate Stats */}
						<div className="grid grid-cols-3 gap-3 divide-x divide-white/15 w-full sm:w-auto text-left">
							<div className="px-2">
								<span className="text-xs sm:text-sm font-bold font-heading text-amber-300 block leading-tight">
									{isBn ? "১৫০+ একর" : "150+ Acres"}
								</span>
								<span className="text-[9px] sm:text-[10px] text-white/70 font-light block uppercase tracking-wider">
									{isBn ? "মাস্টারপ্ল্যান" : "Masterplan"}
								</span>
							</div>
							<div className="px-2 pl-3">
								<span className="text-xs sm:text-sm font-bold font-heading text-white block leading-tight">
									{isBn ? "১৫ মিনিট" : "15 Mins"}
								</span>
								<span className="text-[9px] sm:text-[10px] text-white/70 font-light block uppercase tracking-wider">
									{isBn ? "মোহাম্মদপুর থেকে" : "To Mohammadpur"}
								</span>
							</div>
							<div className="px-2 pl-3">
								<span className="text-xs sm:text-sm font-bold font-heading text-emerald-400 block leading-tight">
									{isBn ? "রেডি প্লট" : "Ready Plot"}
								</span>
								<span className="text-[9px] sm:text-[10px] text-white/70 font-light block uppercase tracking-wider">
									{isBn ? "তাৎক্ষণিক হস্তান্তর" : "Immediate Handover"}
								</span>
							</div>
						</div>

						{/* CTA Action Buttons */}
						<div className="flex items-center gap-2 w-full sm:w-auto justify-end">
							<Link
								href="/projects"
								className="flex-1 sm:flex-initial px-4 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold font-heading hover:bg-primary/90 transition-all shadow-md inline-flex items-center justify-center gap-1.5"
							>
								<span>{isBn ? "প্লট দেখুন" : "Explore Plots"}</span>
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>

							<Link
								href="/contact"
								className="flex-1 sm:flex-initial px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold font-heading border border-white/20 transition-all inline-flex items-center justify-center gap-1.5"
							>
								<span>{isBn ? "সাইট ভিজিট বুক করুন" : "Book Site Visit"}</span>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* ── SECTION 2: MASTER PLAN & LIFESTYLE AMENITIES CARDS ── */}
			<MasterPlanAmenities />

			{/* ── SECTION 3: LIVE DATABASE FEATURED PLOTS & PROJECTS ── */}
			<section className="py-20 bg-background text-foreground relative">
				<SectionContainer className="space-y-12">
					<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
						<div className="space-y-2 max-w-2xl">
							<span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium uppercase tracking-widest text-primary font-heading">
								{isBn ? "বিশেষ প্লট ইনভেন্টরি" : "FEATURED PLOT INVENTORY"}
							</span>
							<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
								{isBn
									? "সিলিকন সিটির সেরা ভেরিফাইড প্লটসমূহ"
									: "Prime Verified Plots in Silicon City"}
							</h2>
							<p className="text-xs sm:text-sm md:text-base text-muted-foreground font-light leading-relaxed">
								{isBn
									? "তাৎক্ষণিক রেজিস্ট্রেশন, স্পষ্ট সীমানা চিহ্নিতকরণ এবং সহজ কিস্তির সুবিধা সহ বাছাইকৃত আবাসিক ও বাণিজ্যিক প্লট।"
									: "Handpicked RAJUK-compliant residential and commercial plots with immediate registration, clear boundary demarcation, and flexible installments."}
							</p>
						</div>
						<Link
							href="/projects"
							className="text-xs font-semibold font-heading text-primary hover:underline inline-flex items-center gap-1 shrink-0"
						>
							{isBn ? "সব প্লট ও প্রজেক্ট দেখুন" : "View All Plots & Projects"}{" "}
							<ArrowRight className="w-3.5 h-3.5" />
						</Link>
					</div>

					{/* Plots Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{featuredPlots.map((prop) => {
							const kathaCount =
								prop.katha || (prop.bedrooms && prop.bedrooms > 0 ? prop.bedrooms : 3);
							const blockName =
								prop.block ||
								prop.location.match(/Block-[A-D]|Main Boulevard/i)?.[0] ||
								"Block-A";

							return (
								<div
									key={prop.id}
									className="group bg-card border border-border/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col justify-between text-left"
								>
									<div className="relative h-52 w-full overflow-hidden bg-muted">
										<img
											src={
												prop.images[0] ||
												"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200"
											}
											alt={prop.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
										<div className="absolute top-3 left-3 flex items-center gap-1.5">
											<span className="bg-dark-hero/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
												{blockName}
											</span>
											<span className="bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
												{isBn ? `${kathaCount} কাঠা` : `${kathaCount} Katha`}
											</span>
										</div>
										<div className="absolute top-3 right-3">
											<span
												className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs ${
													prop.status === "available"
														? "bg-emerald-600 text-white"
														: prop.status === "pending"
															? "bg-amber-600 text-white"
															: "bg-rose-600 text-white"
												}`}
											>
												{prop.status}
											</span>
										</div>
									</div>

									<div className="p-6 space-y-3.5 flex-1 flex flex-col justify-between">
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
												href={`/projects/${prop.slug}`}
												className="px-4 py-2 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground text-xs font-semibold font-heading transition-all"
											>
												{isBn ? "বিস্তারিত দেখুন" : "Details"}
											</Link>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</SectionContainer>
			</section>

			{/* ── SECTION 4: WHY CHOOSE US / TRUST BENTO GRID ── */}
			<WhyChooseUs />

			{/* ── SECTION 5: SILICON CITY HIGHLIGHT + SUMMARY OF SERVICES ── */}
			<SiliconCityShowcase />

			{/* ── SECTION 6: PROJECT PHOTO GALLERY SHOWCASE ── */}
			<ProjectGallerySection />

			{/* ── SECTION 7: 4-STEP TRANSPARENT INVESTMENT PROCESS ── */}
			<InvestmentProcess />

			{/* ── SECTION 8: OUR TRACK RECORD & TRUST COUNTERS ── */}
			<section className="py-20 sm:py-24 bg-dark-hero text-white relative overflow-hidden">
				<div
					className="absolute inset-0 opacity-[0.08] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>

				<SectionContainer className="relative z-10 space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="inline-block px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium uppercase tracking-widest text-accent font-heading">
							{isBn ? "আমাদের ট্র্যাক রেকর্ড" : "OUR TRACK RECORD"}
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-white tracking-tight">
							{isBn
								? "বিশ্বস্ততা ও সাফল্যের বাস্তব পরিসংখ্যান"
								: homeData.trackRecordTitle}
						</h2>
						<p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
							{isBn
								? "এক দশকেরও বেশি সময় ধরে আধুনিক নগর পরিকল্পনা, আইনগত স্বচ্ছতা এবং গ্রাহক সন্তুষ্টির সাথে আমরা বাস্তবায়ন করছি নিরাপদ আবাসন।"
								: homeData.trackRecordDesc}
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
						{(isBn ? bnTrustCounters : trustCounters).map((s, idx) => (
							<motion.div
								key={s.label}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: idx * 0.08 }}
								whileHover={{ y: -4, transition: { duration: 0.2 } }}
								className="bg-white/[0.06] backdrop-blur-xl border border-white/12 rounded-3xl p-7 flex flex-col justify-between space-y-4 hover:border-accent/60 transition-all duration-300 shadow-lg"
							>
								<div className="space-y-3">
									<span className="text-3xl sm:text-4xl font-extrabold font-heading text-accent tracking-tight block">
										{s.value}
									</span>
									<p className="text-xs sm:text-sm text-white/90 font-medium font-heading leading-relaxed">
										{s.label}
									</p>
								</div>

								<div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-heading">
									<span>{s.detail}</span>
									<span className="text-accent font-medium">
										{isBn ? "যাচাইকৃত" : "Verified"}
									</span>
								</div>
							</motion.div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── SECTION 9: LEADERSHIP STATEMENTS ── */}
			<LeadershipGlassBlocks />

			{/* ── SECTION 10: TRUST BADGES & ACCREDITATIONS ── */}
			<section className="py-14 bg-muted/40 border-y border-border/50 relative overflow-hidden">
				<SectionContainer>
					<div className="text-center space-y-2 mb-8">
						<span className="text-xs font-medium uppercase tracking-widest text-primary font-heading">
							{isBn ? "অনুমোদন ও স্বীকৃতি" : "ACCREDITATIONS & RECOGNITIONS"}
						</span>
						<h3 className="text-base sm:text-lg font-semibold font-heading text-foreground">
							{isBn
								? "সরকারি অনুমোদন ও আইনগত স্বীকৃতি"
								: "Official Regulatory Compliance & Certifications"}
						</h3>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-3">
						{(isBn ? bnAccreditations : accreditations).map((badge) => (
							<div
								key={badge}
								className="bg-card px-4 py-2 rounded-full border border-border/60 text-xs font-medium font-heading text-foreground/90 shadow-2xs"
							>
								{badge}
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── SECTION 11: DYNAMIC DATABASE COMPANY NEWS & ARTICLES ── */}
			<CompanyNewsSection />

			{/* ── SECTION 12: OFFLINE MEMBERSHIP GUIDE & CTA BANNER ── */}
			<OfflineMembershipGlassBanner />
		</div>
	);
}
