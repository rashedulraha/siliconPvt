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
				{/* ── BACKGROUND LAYER: CLEAR VIBRANT HERO REAL ESTATE IMAGE ── */}
				<div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
					<div
						className="absolute inset-0 w-full h-full bg-cover bg-center opacity-95 scale-105 transition-all duration-700"
						style={{
							backgroundImage: `url("${homeData.heroBgImage || HERO_BG_IMAGE}")`,
						}}
					/>

					{/* Minimal Ultra-Light Overlay: Keeps background image crisp and clearly visible */}
					<div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
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
							title: isBn ? s.titleBn || s.title : s.title,
							subtitle: isBn ? s.subtitleBn || s.subtitle : s.subtitle,
							imageUrl: s.image,
							badge:
								(isBn ? s.badgeBn || s.badge : s.badge) ||
								(isBn ? "ফিচার্ড" : "FEATURED"),
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
									? homeData.heroBadgeBn || "পরিকল্পিত ইকো-টাউনশিপ ও নিষ্কণ্টক প্লট"
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
								? homeData.heroTitleBn || "সিলিকন সিটি — মাস্টার প্ল্যানড মেগা টাউনশিপ"
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
								? homeData.heroDescBn ||
									"১৬–১৮ ফুট উঁচু বালু ভরাট, ৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ আরসিসি রাস্তা এবং শতভাগ নিষ্কণ্টক মালিকানায় মোহাম্মদপুর সংলগ্ন সাভারে আপনার স্থায়ী ঠিকানা।"
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
		</div>
	);
}
