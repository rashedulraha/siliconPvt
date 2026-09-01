"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { PageSEO } from "@/components/seo/PageSEO";
import { SectionContainer } from "@/components/ui/section-container";
import { useAboutContent } from "@/hooks/useAboutContent";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
	const { data, loading } = useAboutContent();
	const { isBn } = useLanguage();

	const trustBadgesEn = [
		{
			title: "Trusted Company",
			desc: "Earning absolute customer trust by fulfilling our commitments on time.",
		},
		{
			title: "Legal Projects",
			desc: "Providing 100% legally verified ownership and dispute-free plots.",
		},
		{
			title: "Experienced Team",
			desc: "Guided by experienced management, engineers, and professional urban planners.",
		},
		{
			title: "Customer Focused",
			desc: "Dedicated to long-term relationships and providing hassle-free services at every step.",
		},
	];

	const trustBadgesBn = [
		{
			title: "বিশ্বস্ত প্রতিষ্ঠান",
			desc: "সময়ানুযায়ী প্রতিশ্রুতি পূরণের মাধ্যমে গ্রাহকদের পূর্ণ আস্থা ও ভালোবাসা অর্জন।",
		},
		{
			title: "আইনগত নিশ্চয়তা",
			desc: "১০০% যাচাইকৃত ও নির্ভেজাল দলিলপত্র সহ নিষ্কণ্টক জমির প্লট মালিকানা প্রদান।",
		},
		{
			title: "অভিজ্ঞ বিশেষজ্ঞ টিম",
			desc: "অভিজ্ঞ পরিচালনা পর্ষদ, নগর পরিকল্পনাবিদ ও দক্ষ প্রকৌশলীদের সার্বিক তত্ত্বাবধান।",
		},
		{
			title: "গ্রাহকবান্ধব সেবা",
			desc: "দীর্ঘমেয়াদী নির্ভরযোগ্য সম্পর্ক এবং বুকিং থেকে রেজিস্ট্রেশন পর্যন্ত নির্ঝঞ্ঝাট সেবা।",
		},
	];

	const workProcessEn = [
		{
			step: "01",
			title: "Planning & Scouting",
			desc: "Strategic land selection in prime zones, environment-friendly design, and master-plan plotting.",
		},
		{
			step: "02",
			title: "Legal Verification",
			desc: "Comprehensive title search, deed vetting, and obtaining clearance from regulatory bodies.",
		},
		{
			step: "03",
			title: "Land Development",
			desc: "Soil development/earth-filling up to 16–18 feet height and laying out wide internal road networks.",
		},
		{
			step: "04",
			title: "Quality Inspection",
			desc: "Rigorous supervising by our engineering team to ensure high-standard utility layout.",
		},
		{
			step: "05",
			title: "Project Handover",
			desc: "Proper demarcation of plots, executing registration deeds, and delivering possession on time.",
		},
	];

	const workProcessBn = [
		{
			step: "০১",
			title: "পরিকল্পনা ও নির্বাচন",
			desc: "প্রাইম জোনে কৌশলগত জমি নির্বাচন, পরিবেশবান্ধব মাস্টারপ্ল্যান ও ব্লকিং লেআউট।",
		},
		{
			step: "০২",
			title: "আইনগত দলিল পরীক্ষণ",
			desc: "সিএস, এসএ, আরএস, বিএস খতিয়ান ও রেকর্ড যাচাই করে শতভাগ নিষ্কণ্টকতা নিশ্চিতকরণ।",
		},
		{
			step: "০৩",
			title: "ভূমি উন্নয়ন ও ভরাট",
			desc: "১৬–১৮ ফুট উঁচু বালু ভরাট এবং ৩০ ও ৪০ ফুট প্রশস্ত অভ্যন্তরীণ সড়ক নেটওয়ার্ক নির্মাণ।",
		},
		{
			step: "০৪",
			title: "মান নিয়ন্ত্রণ ও তদারকি",
			desc: "প্রকৌশলী দল দ্বারা নাগরিক অবকাঠামো, ড্রেনেজ ও ড্রাইভওয়ের মান নিখুঁতভাবে পরীক্ষণ।",
		},
		{
			step: "০৫",
			title: "প্লট সীমানা ও দলিল হস্তান্তর",
			desc: "নির্দিষ্ট প্লটের সীমানা পিলার স্থাপন, সাব-রেজিস্ট্রি সম্পাদন এবং সময়মতো দখল হস্তান্তর।",
		},
	];

	const certificationsEn = [
		"RAJUK Compliant / Approved Planning",
		"REHAB Member Organization",
		"ISO 9001:2015 Certified Company",
		"Government Authorized Land Developer",
		"100% Legal Land Approval Certification",
	];

	const certificationsBn = [
		"রাজউক মাস্টারপ্ল্যান আওতাভুক্ত পরিকল্পনা",
		"রিহ্যাব (REHAB) সদস্য প্রতিষ্ঠান",
		"আইএসও ৯০০১:২০১৫ সার্টিফাইড কোম্পানি",
		"সরকারি অনুমোদিত ল্যান্ড ডেভেলপার",
		"১০০% লিগ্যাল ল্যান্ড ক্লিয়ারেন্স সনদ",
	];

	const coreValuesEn = [
		{
			title: "Trust & Integrity",
			desc: "Maintaining the highest levels of honesty, transparency, and ethics in every transaction.",
		},
		{
			title: "Transparency",
			desc: "Keeping complete transparency in all information, pricing, contracts, and project management.",
		},
		{
			title: "High Quality",
			desc: "Committing to the highest standards through planned infrastructure and modern architectural integration.",
		},
		{
			title: "Client Commitment",
			desc: "Delivering on our commitments on schedule and ensuring hassle-free property ownership.",
		},
	];

	const coreValuesBn = [
		{
			title: "আস্থা ও সততা",
			desc: "গ্রাহকের পূর্ণ বিশ্বাস অর্জনে প্রতিটি পদক্ষেপে সর্বোচ্চ সততা, স্বচ্ছতা ও নৈতিকতা বজায় রাখা।",
		},
		{
			title: "স্বচ্ছতা ও স্পষ্টতা",
			desc: "তথ্য, মূল্য নির্ধারণ, চুক্তিপত্র ও প্রকল্প পরিচালনায় শতভাগ স্বচ্ছতা নিশ্চিতকরণ।",
		},
		{
			title: "উন্নত মান ও নিরাপত্তা",
			desc: "পরিকল্পিত অবকাঠামো ও আধুনিক স্থাপত্যের মাধ্যমে শ্রেষ্ঠ মানের নাগরিক জীবনযাত্রা নিশ্চিত করা।",
		},
		{
			title: "দৃঢ় অঙ্গীকার",
			desc: "গ্রাহকের সন্তুষ্টি ও সময়মতো প্লট হস্তান্তরের প্রতিশ্রুতি শতভাগ বাস্তবায়ন করা।",
		},
	];

	const timelineEn = [
		{ year: "2014", title: "Inception & Foundation", desc: "Started ethical real estate development with transparency." },
		{ year: "2017", title: "Silicon City Acquisition", desc: "Acquired prime riverside lands in Bara Badeshi, Savar." },
		{ year: "2020", title: "Mega Soil Earthwork", desc: "Executed 16-18ft high elevation and 40ft road foundations." },
		{ year: "2023", title: "Block A Handover", desc: "Successfully handed over demarcation possession to 500+ clients." },
		{ year: "2026", title: "Expanded Township", desc: "Implementing Turag Bridge link & civic amenity complexes." },
	];

	const timelineBn = [
		{ year: "২০১৪", title: "প্রতিষ্ঠা ও সূচনা", desc: "সততা ও স্বচ্ছতার অঙ্গীকার নিয়ে রিয়েল এস্টেট খাতে যাত্রা শুরু।" },
		{ year: "২০১৭", title: "সিলিকন সিটি অধিগ্রহণ", desc: "সাভার বড় বাদেশী মৌজায় তুরাগ নদীতীরবর্তী প্রাইম জমি অধিগ্রহণ।" },
		{ year: "২০২০", title: "মেগা বালু ভরাট", desc: "১৬–১৮ ফুট উঁচু বালু ভরাট ও ৪০ ফুট প্রধান সড়কের অবকাঠামো নির্মাণ।" },
		{ year: "২০২৩", title: "ব্লক-এ প্লট হস্তান্তর", desc: "৫০০+ সম্মানিত গ্রাহকের নিকট রেজিস্ট্রেশন ও বাউন্ডারি হস্তান্তর সম্পন্ন।" },
		{ year: "২০২৬", title: "সম্প্রসারিত মেগা টাউনশিপ", desc: "তুরাগ সেতু সংযোগ ও পূর্ণাঙ্গ আধুনিক নাগরিক সুযোগ-সুবিধা বাস্তবায়ন।" },
	];

	const whyChooseUsEn = [
		{ title: "100% Legal Ownership", desc: "Dispute-free plots with complete CS, SA, RS, BS mutation deeds." },
		{ title: "Flood-Protected Ground", desc: "16 to 18 feet elevated soil filling above historical flood marks." },
		{ title: "Spacious Road Network", desc: "30ft & 40ft wide internal concrete roads for effortless access." },
		{ title: "Flexible Installments", desc: "Zero hidden cost installment facilities tailored to your income." },
	];

	const whyChooseUsBn = [
		{ title: "১০০% নিষ্কণ্টক মালিকানা", desc: "সিএস, এসএ, আরএস ও বিএস নামজারি সম্পন্ন নির্ভেজাল প্লট।" },
		{ title: "বন্যা সুরক্ষিত উঁচু জমি", desc: "বন্যা সীমা থেকে ১৬–১৮ ফুট উঁচু বালু ভরাটকৃত স্থায়ী জমি।" },
		{ title: "প্রশস্ত অভ্যন্তরীণ সড়ক", desc: "৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ আরসিসি রাস্তা নেটওয়ার্ক।" },
		{ title: "সহজ দীর্ঘমেয়াদী কিস্তি", desc: "কোনো গোপন চার্জ ছাড়া সুবিধাজনক কিস্তিতে প্লট ক্রয়ের সুযোগ।" },
	];

	const trustBadges = isBn ? trustBadgesBn : trustBadgesEn;
	const workProcess = isBn ? workProcessBn : workProcessEn;
	const certifications = isBn ? certificationsBn : certificationsEn;
	const coreValues = isBn ? coreValuesBn : coreValuesEn;
	const timeline = isBn ? timelineBn : timelineEn;
	const whyChooseUs = isBn ? whyChooseUsBn : whyChooseUsEn;

	return (
		<>
			<PageSEO
				title={isBn ? "আমাদের সম্পর্কে | সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ" : "About Us | Silicon Real Estate (Pvt.) Ltd."}
				description={isBn ? "আস্থা ও নির্ভরযোগ্যতার প্রতীক। সিলিকন রিয়েল এস্টেটের লক্ষ্য, নেতৃত্ব ও পথচলা সম্পর্কে জানুন।" : "Building Trust. Creating Sustainable Communities. Learn about Silicon Real Estate's mission, leadership, core values, and journey."}
			/>

			{/* ── BLOCK 1: Page Header (Hero with Subtle Dot Grid) ───────────────── */}
			<section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden text-left">
				{/* Subtle Dot Grid Background Pattern */}
				<div
					className="absolute inset-0 opacity-[0.06] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>

				<SectionContainer className="relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="max-w-3xl"
					>
						{/* Breadcrumbs */}
						<nav className="flex items-center gap-2 text-xs text-white/60 mb-4 font-heading uppercase tracking-wider">
							<Link href="/" className="hover:text-accent transition-colors">
								{isBn ? "হোম" : "Home"}
							</Link>
							<ChevronRight className="w-3 h-3 text-white/40" />
							<span className="text-accent font-semibold">{isBn ? "আমাদের সম্পর্কে" : "About Us"}</span>
						</nav>

						<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white tracking-tight leading-snug mb-4">
							{isBn ? "আস্থার সাথে এগিয়ে চলা।" : data.heroTitle} <br />
							<span className="text-gold">
								{isBn ? "একটি পরিকল্পিত ও টেকসই আগামীর অঙ্গীকার।" : data.heroSubtitle}
							</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mb-7">
							{isBn
								? "সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ বাংলাদেশে আধুনিক, পরিবেশবান্ধব ও শতভাগ আইনগত সুরক্ষাসম্পন্ন আবাসন প্রকল্প বাস্তবায়নে নিবেদিত।"
								: data.heroDesc}
						</p>

						<Link
							href="/projects"
							className="inline-flex items-center justify-center bg-primary text-primary-foreground h-11 px-7 rounded-xl font-semibold font-heading text-xs sm:text-sm hover:bg-primary/90 transition-all border border-white/20 shadow-md"
						>
							{isBn ? "প্রকল্পসমূহ দেখুন" : "EXPLORE PROJECTS"}
						</Link>
					</motion.div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 2: Who We Are & Trust Badges ──────────────────────────── */}
			<section className="py-16 sm:py-20 bg-background relative overflow-hidden text-left">
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
						backgroundSize: "28px 28px",
					}}
				/>

				<SectionContainer className="relative z-10">
					<div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "আমরা কারা" : "WHO WE ARE"}
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{isBn ? "পরিকল্পিত ও পরিবেশবান্ধব আবাসন উন্নয়নের অগ্রদূত" : data.whoWeAreTitle}
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light max-w-2xl mx-auto">
							{isBn
								? "সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ একটি অত্যন্ত বিশ্বস্ত, পরিবেশবান্ধব এবং পরিকল্পিত আবাসন উন্নয়ন প্রতিষ্ঠান। সততা, স্বচ্ছতা, মান এবং শতভাগ আইনি নিরাপত্তাকে সর্বোচ্চ অগ্রাধিকার দিয়ে আমরা গড়ে তুলছি সিলিকন সিটি।"
								: data.whoWeAreDesc}
						</p>
					</div>

					{/* 4 Trust Badges */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{trustBadges.map((badge, idx) => (
							<motion.div
								key={badge.title}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: idx * 0.08 }}
								whileHover={{ y: -3, transition: { duration: 0.2 } }}
								className="bg-card border border-border/60 rounded-2xl p-6 shadow-xs hover:border-primary/40 transition-all duration-300"
							>
								<span className="text-xs font-mono font-bold text-primary block mb-2">
									0{idx + 1}
								</span>
								<h3 className="text-base font-bold font-heading text-foreground mb-1.5">
									{badge.title}
								</h3>
								<p className="text-xs text-muted-foreground font-light leading-relaxed">
									{badge.desc}
								</p>
							</motion.div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 3: Mission, Vision & Core Values ────────────────────── */}
			<section
				className="py-16 sm:py-20 bg-muted/30 border-y border-border/50 relative overflow-hidden text-left"
				id="mission"
			>
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>

				<SectionContainer className="relative z-10">
					{/* Mission & Vision Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="bg-card border border-border/60 border-t-2 border-t-primary rounded-2xl p-7 sm:p-9 space-y-3 shadow-xs"
						>
							<span className="text-xs font-bold uppercase tracking-widest text-primary font-heading">
								{isBn ? "আমাদের লক্ষ্য (MISSION)" : "MISSION"}
							</span>
							<h3 className="text-lg sm:text-xl font-bold font-heading text-foreground">
								{isBn ? "আমাদের উদ্দেশ্য ও অঙ্গীকার" : data.missionTitle}
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
								{isBn
									? "সততা, গুণগত মান, উদ্ভাবন ও পেশাদারিত্বের সমন্বয়ে গ্রাহকদের বিনিয়োগের সর্বোচ্চ মূল্য নিশ্চিত করা। আমরা স্বচ্ছ ব্যবসায়িক নীতি ও উন্নত নাগরিক সুযোগ-সুবিধা প্রদানে প্রতিশ্রুতিবদ্ধ।"
									: data.missionDesc}
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="bg-card border border-border/60 border-t-2 border-t-accent rounded-2xl p-7 sm:p-9 space-y-3 shadow-xs"
						>
							<span className="text-xs font-bold uppercase tracking-widest text-accent font-heading">
								{isBn ? "আমাদের ভিশন (VISION)" : "VISION"}
							</span>
							<h3 className="text-lg sm:text-xl font-bold font-heading text-foreground">
								{isBn ? "ভবিষ্যৎ দৃষ্টিভঙ্গি" : data.visionTitle}
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
								{isBn
									? "দেশের অন্যতম শীর্ষ বিশ্বস্ত ও পরিবেশবান্ধব আবাসন নির্মাতা হিসেবে প্রতিষ্ঠিত হওয়া, যেখানে প্রতিটি মানুষের স্বপ্নের নিরাপদ আবাসন রূপ নেবে সফল বাস্তবে।"
									: data.visionDesc}
							</p>
						</motion.div>
					</div>

					{/* Core Values */}
					<div className="max-w-2xl mx-auto text-center space-y-2 mb-10">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "মূল স্তম্ভসমূহ" : "CORE VALUES"}
						</span>
						<h3 className="text-2xl font-bold font-heading text-foreground tracking-tight">
							{isBn ? "আমাদের উৎকর্ষের ৪টি মূল ভিত্তি" : "Our Pillars of Excellence"}
						</h3>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{coreValues.map((val, idx) => (
							<motion.div
								key={val.title}
								whileHover={{ y: -3, transition: { duration: 0.2 } }}
								className="bg-card border border-border/60 rounded-2xl p-6 space-y-2 shadow-xs hover:border-primary/40 transition-all"
							>
								<span className="text-xs font-mono font-bold text-primary block">
									{isBn ? `স্তম্ভ ০${idx + 1}` : `Pillar 0${idx + 1}`}
								</span>
								<h4 className="text-base font-bold font-heading text-foreground">
									{val.title}
								</h4>
								<p className="text-xs text-muted-foreground font-light leading-relaxed">
									{val.desc}
								</p>
							</motion.div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 4: Our Journey (Timeline) ───────────────────────────── */}
			<section
				className="py-16 sm:py-20 bg-background relative overflow-hidden text-left"
				id="journey"
			>
				<SectionContainer>
					<div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "আমাদের পথচলা" : "OUR JOURNEY"}
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{isBn ? "আস্থা ও অগ্রগতির অনন্য মাইলফলক" : "Milestones of Trust & Growth"}
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
						{timeline.map((item, idx) => (
							<motion.div
								key={item.year || idx}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: idx * 0.08 }}
								whileHover={{ y: -3, transition: { duration: 0.2 } }}
								className="bg-card border border-border/60 rounded-2xl p-6 space-y-2 relative hover:border-primary/40 transition-all shadow-xs"
							>
								<span className="text-xl sm:text-2xl font-extrabold font-heading text-primary block">
									{item.year}
								</span>
								<h3 className="text-sm font-bold font-heading text-foreground">
									{item.title}
								</h3>
								<p className="text-xs text-muted-foreground font-light leading-relaxed">
									{item.desc}
								</p>
							</motion.div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 5: Message From Chairman ────────────────────────────── */}
			<section
				className="py-16 sm:py-20 bg-muted/40 border-y border-border/50 relative overflow-hidden text-left"
				id="chairman"
			>
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>

				<SectionContainer className="relative z-10">
					<div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
						<div className="lg:col-span-4 text-center lg:text-left space-y-3">
							<div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-primary/30 shadow-md mx-auto lg:mx-0">
								<Image
									src={data.chairmanImage}
									alt={data.chairmanName}
									fill
									className="object-cover"
									sizes="144px"
								/>
							</div>
							<div>
								<span className="text-[11px] font-semibold uppercase tracking-widest text-primary font-heading block">
									{isBn ? "চেয়ারম্যানের বাণী" : "MESSAGE FROM CHAIRMAN"}
								</span>
								<h3 className="text-lg font-bold font-heading text-foreground">
									{isBn ? "মো: আহমেদ কবীর" : data.chairmanName}
								</h3>
								<p className="text-xs text-muted-foreground">
									{isBn ? "প্রতিষ্ঠাতা ও চেয়ারম্যান" : data.chairmanRole}
								</p>
							</div>
						</div>

						<div className="lg:col-span-8 bg-card border border-border/60 rounded-2xl p-7 sm:p-9 space-y-4 shadow-xs">
							<blockquote className="text-xs sm:text-sm font-semibold font-heading text-primary italic border-l-2 border-primary pl-4">
								"{isBn ? "গ্রাহকের বিনিয়োগকে শতভাগ ঝুঁকিমুক্ত ও সমৃদ্ধিময় করাই আমাদের প্রধান ব্রত।" : `${data.chairmanSpeech.slice(0, 100)}...`}"
							</blockquote>
							<p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed whitespace-pre-line">
								{isBn
									? "সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ-এ আপনাকে আন্তরিক শুভেচ্ছা। আমাদের একমাত্র লক্ষ্য হলো আইনগতভাবে সম্পূর্ণ নিরাপদ, কৌশলগত অবস্থানে অবস্থিত এবং ভবিষ্যৎ সম্ভাবনাময় আবাসন প্রকল্প উপস্থাপন করা। আপনার কষ্টার্জিত সঞ্চয়ের সর্বোচ্চ নিরাপত্তা নিশ্চিত করতে আমরা প্রতিনিয়ত কাজ করছি।"
									: data.chairmanSpeech}
							</p>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 6: Message From Managing Director ──────────────────── */}
			<section
				className="py-16 sm:py-20 bg-background relative overflow-hidden text-left"
				id="md"
			>
				<SectionContainer>
					<div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
						<div className="lg:col-span-8 bg-card border border-border/60 rounded-2xl p-7 sm:p-9 space-y-4 shadow-xs order-2 lg:order-1">
							<blockquote className="text-xs sm:text-sm font-semibold font-heading text-primary italic border-l-2 border-primary pl-4">
								"{isBn ? "আমরা শুধু জমি বিক্রি নয়, ভবিষ্যৎ প্রজন্মের জন্য একটি পরিকল্পিত স্বপ্নের আবাস গড়ে তুলছি।" : `${data.mdSpeech.slice(0, 100)}...`}"
							</blockquote>
							<p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed whitespace-pre-line">
								{isBn
									? "প্রতিটি মানুষের স্বপ্ন থাকে একটি সুন্দর, নিরাপদ ও সুপরিকল্পিত স্থায়ী ঠিকানা। সেই স্বপ্নকে সফল করতেই রাজউকের বিধিবিধান ও আন্তর্জাতিক নগর পরিকল্পনার নীতি অনুসরণ করে অভিজ্ঞ প্রকৌশলীদের দ্বারা বাস্তবায়িত হচ্ছে সিলিকন সিটি।"
									: data.mdSpeech}
							</p>
						</div>

						<div className="lg:col-span-4 text-center lg:text-right space-y-3 order-1 lg:order-2">
							<div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-primary/30 shadow-md mx-auto lg:ml-auto lg:mr-0">
								<Image
									src={data.mdImage}
									alt={data.mdName}
									fill
									className="object-cover"
									sizes="144px"
								/>
							</div>
							<div>
								<span className="text-[11px] font-semibold uppercase tracking-widest text-primary font-heading block">
									{isBn ? "ব্যবস্থাপনা পরিচালকের বার্তা" : "MESSAGE FROM MANAGING DIRECTOR"}
								</span>
								<h3 className="text-lg font-bold font-heading text-foreground">
									{isBn ? "ইঞ্জি. মো: সরোয়ার খালেদ" : data.mdName}
								</h3>
								<p className="text-xs text-muted-foreground">
									{isBn ? "ব্যবস্থাপনা পরিচালক" : data.mdRole}
								</p>
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 7: Company At A Glance ───────────────────────────── */}
			<section className="py-14 bg-dark-hero text-white relative overflow-hidden text-left">
				<div
					className="absolute inset-0 opacity-[0.06] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>

				<SectionContainer className="relative z-10">
					<div className="max-w-2xl mx-auto text-center space-y-2 mb-10">
						<span className="text-xs font-semibold uppercase tracking-widest text-accent font-heading">
							{isBn ? "এক নজরে কোম্পানি" : "COMPANY AT A GLANCE"}
						</span>
						<h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
							{isBn ? "সাফল্য ও সুনামের দৃঢ় পদচিহ্ন" : "Proven Track Record of Excellence"}
						</h3>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{[
							{ value: isBn ? "১৫+" : "15+", label: isBn ? "সম্পন্ন প্রকল্প" : "Projects Completed" },
							{ value: isBn ? "১,০০০+" : "1000+", label: isBn ? "সন্তুষ্ট গ্রাহক" : "Happy Clients" },
							{ value: isBn ? "১২+" : "12+", label: isBn ? "প্রাইম লোকেশন" : "Prime Locations" },
							{ value: isBn ? "১০+" : "10+", label: isBn ? "বছরের অভিজ্ঞতা" : "Years Experience" },
						].map((s) => (
							<div
								key={s.label}
								className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-center space-y-1"
							>
								<span className="text-2xl sm:text-3xl font-extrabold font-heading text-accent block">
									{s.value}
								</span>
								<span className="text-xs font-medium text-white/80 font-heading uppercase tracking-wider">
									{s.label}
								</span>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 8: Why Choose Silicon Real Estate? ──────────────────── */}
			<section className="py-16 sm:py-20 bg-background relative overflow-hidden text-left">
				<SectionContainer>
					<div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "কেন সিলিকন বেছে নেবেন?" : "WHY CHOOSE SILICON REAL ESTATE?"}
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{isBn ? "আমাদের স্বাতন্ত্র্য ও বিশেষ সুবিধাসমূহ" : "Our Distinctive Advantages"}
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{whyChooseUs.map((item, idx) => (
							<motion.div
								key={item.title}
								whileHover={{ y: -3, transition: { duration: 0.2 } }}
								className="bg-card border border-border/60 rounded-2xl p-6 space-y-2 shadow-xs hover:border-primary/40 transition-all"
							>
								<span className="text-xs font-mono font-bold text-primary block">
									0{idx + 1}
								</span>
								<h3 className="text-base font-bold font-heading text-foreground">
									{item.title}
								</h3>
								<p className="text-xs text-muted-foreground font-light leading-relaxed">
									{item.desc}
								</p>
							</motion.div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 10: Our Work Process ─────────────────────────────────── */}
			<section
				className="py-16 sm:py-20 bg-muted/30 border-y border-border/50 relative overflow-hidden text-left"
				id="process"
			>
				<SectionContainer>
					<div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "আমাদের কর্মপদ্ধতি" : "OUR WORK PROCESS"}
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{isBn ? "প্লট হস্তান্তরের ৫টি কার্যকর ধাপ" : "5 Steps to Plot Handover"}
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
						{workProcess.map((proc, idx) => (
							<motion.div
								key={proc.step}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: idx * 0.08 }}
								whileHover={{ y: -3, transition: { duration: 0.2 } }}
								className="bg-card border border-border/60 rounded-2xl p-6 space-y-2 hover:border-primary/40 transition-all shadow-xs"
							>
								<span className="text-xs font-mono font-bold text-primary block">
									{isBn ? `ধাপ ${proc.step}` : `Step ${proc.step}`}
								</span>
								<h3 className="text-sm font-bold font-heading text-foreground">
									{proc.title}
								</h3>
								<p className="text-xs text-muted-foreground font-light leading-relaxed">
									{proc.desc}
								</p>
							</motion.div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 11: Certifications & Recognitions ───────────────────── */}
			<section className="py-12 bg-muted/40 border-b border-border/50 relative overflow-hidden text-left">
				<SectionContainer className="relative z-10">
					<div className="text-center space-y-2 mb-8">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "অনুমোদন ও সনদসমূহ" : "CERTIFICATIONS & RECOGNITIONS"}
						</span>
						<h3 className="text-base sm:text-lg font-bold font-heading text-foreground">
							{isBn ? "আইনি স্বীকৃতি ও সরকারি অনুমোদন" : "Official Approvals & Regulatory Compliance"}
						</h3>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-3">
						{certifications.map((cert) => (
							<div
								key={cert}
								className="bg-card px-4 py-2 rounded-full border border-border/60 text-xs font-semibold font-heading text-foreground/90 shadow-2xs"
							>
								{cert}
							</div>
						))}
					</div>
				</SectionContainer>
			</section>
		</>
	);
}
