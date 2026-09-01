"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
	ArrowRight,
	ArrowUpRight,
	CheckCircle2,
	Mail,
	Phone,
	ChevronRight,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useServices } from "@/hooks/useServices";
import { useLanguage } from "@/context/LanguageContext";

const SERVICE_FEATURES_EN = [
	{
		num: "01",
		title: "100% Legal Security",
		desc: "Fully vetted paperwork, authentic deed history, and risk-free investment guarantees.",
	},
	{
		num: "02",
		title: "Planned Urban Infrastructure",
		desc: "Wide internal concrete roads (30ft & 40ft), green breathing spaces, and standard civic lifestyle facilities.",
	},
	{
		num: "03",
		title: "Transparent Transactions",
		desc: "Every transaction is properly accounted for, with clear money receipts, fair pricing, and no hidden costs.",
	},
	{
		num: "04",
		title: "Expert Consulting Team",
		desc: "Seamless coordination handled by expert planners, structural engineers, and legal advisors.",
	},
];

const SERVICE_FEATURES_BN = [
	{
		num: "০১",
		title: "১০০% আইনগত নিরাপত্তা",
		desc: "সিএস, এসএ, আরএস ও বিএস খতিয়ান যাচাইকৃত নির্ভেজাল ও নিষ্কণ্টক জমির পূর্ণ নিশ্চয়তা।",
	},
	{
		num: "০২",
		title: "পরিকল্পিত নগর অবকাঠামো",
		desc: "৩০ ও ৪০ ফুট প্রশস্ত আরসিসি সড়ক, পর্যাপ্ত সবুজ উন্মুক্ত চত্বর এবং আধুনিক ড্রেনেজ ব্যবস্থা।",
	},
	{
		num: "০৩",
		title: "স্বচ্ছ চুক্তি ও লেনদেন",
		desc: "প্রতিটি পেমেন্টে অফিসিয়াল মানি রিসিট, ন্যায্য মূল্য নির্ধারণ এবং কোনো গোপন বা অতিরিক্ত চার্জ নেই।",
	},
	{
		num: "০৪",
		title: "অভিজ্ঞ বিশেষজ্ঞ টিম",
		desc: "দক্ষ নগর পরিকল্পনাবিদ, স্ট্রাকচারাল ইঞ্জিনিয়ার ও প্রবীণ আইনজীবীদের সার্বিক তত্ত্বাবধান।",
	},
];

const SERVICES_BN = [
	{
		id: "serv-1",
		num: "০১",
		title: "আবাসিক প্লট বিক্রয়",
		tag: "প্রাইম প্লট বরাদ্দ",
		description:
			"আমরা বিভিন্ন আকারের শতভাগ নিষ্কণ্টক, তাৎক্ষণিক রেজিস্ট্রেশন ও সীমানা প্রস্তুত আবাসিক প্লট অফার করি। প্রতিটি প্লট চমৎকার যোগাযোগ ব্যবস্থা, আলো-বাতাস ও উচ্চ ভবিষ্যৎ মূল্যবৃদ্ধির সম্ভাবনা বিবেচনা করে বিন্যস্ত।",
		benefits: [
			"১০০% ঝুঁকিমুক্ত নিরাপদ জমি বিনিয়োগ",
			"তাৎক্ষণিক সাব-রেজিস্ট্রি ও নামজারি প্রস্তুত",
			"মোহাম্মদপুর সংলগ্ন দ্রুত বর্ধনশীল প্রাইম জোন",
		],
		order: 1,
		active: true,
	},
	{
		id: "serv-2",
		num: "০২",
		title: "পরিকল্পিত হাউজিং টাউনশিপ",
		tag: "আধুনিক আবাসন নগরী",
		description:
			"প্রাকৃতিক সৌন্দর্য ও আধুনিক নাগরিক সুবিধার সমন্বয়ে আমরা গড়ে তুলছি 'সিলিকন সিটি'। আমাদের মেগা টাউনশিপে রয়েছে সেন্ট্রাল মসজিদ, খেলার মাঠ, পার্ক ও উন্নত জীবনযাত্রার সকল অনুসঙ্গ।",
		benefits: [
			"গ্র্যান্ড সেন্ট্রাল জামে মসজিদ ও ব্লকভিত্তিক মসজিদ",
			"সবুজ খেলার মাঠ, পার্ক ও ফুটবল-ক্রিকেট ফিল্ড",
			"স্কুল, কলেজ, হাসপাতাল ও লোকাল মার্কেট জোন",
		],
		order: 2,
		active: true,
	},
	{
		id: "serv-3",
		num: "০৩",
		title: "ভূমি অধিগ্রহণ ও উন্নয়ন",
		tag: "১৬–১৮ ফুট বালু ভরাট",
		description:
			"কৌশলগত জমি নির্বাচন, নিষ্কণ্টক দলিল যাচাই এবং পূর্ণাঙ্গ ভূমি উন্নয়ন। আমাদের অভিজ্ঞ ইঞ্জিনিয়ারিং টিম স্থায়ী বাড়ি নির্মাণের উপযোগী করতে ১৬–১৮ ফুট উঁচু বালু ভরাট সম্পন্ন করেছে।",
		benefits: [
			"১৬ থেকে ১৮ ফুট উঁচু মাটি ও বালু ভরাট",
			"ব্লকের অভ্যন্তরে ৩০ ও ৪০ ফুট প্রশস্ত আরসিসি রাস্তা",
			"মৌসুমী বন্যা থেকে শতভাগ সুরক্ষার নিশ্চয়তা",
		],
		order: 3,
		active: true,
	},
	{
		id: "serv-4",
		num: "০৪",
		title: "আইনি দলিলপত্র ও রেজিস্ট্রেশন",
		tag: "রেকর্ড ও খতিয়ান যাচাই",
		description:
			"জমি ক্রয়ে দলিলপত্র যাচাই অত্যন্ত গুরুত্বপূর্ণ। আমাদের নিজস্ব লিগ্যাল টিম সিএস, এসএ, আরএস, বিএস রেকর্ড পরীক্ষণ, নির্ঝঞ্ঝাট সাব-রেজিস্ট্রি এবং নামজারি (মিউটেশন) সম্পন্ন করে দেয়।",
		benefits: [
			"গভীর দলিল তল্লাশি ও স্বত্ব যাচাই",
			"সহজ সাব-রেজিস্ট্রি ও মিউটেশন প্রসেসিং",
			"আইনি ক্লিয়ারেন্স সনদ ও শতভাগ নিরাপত্তা",
		],
		order: 4,
		active: true,
	},
	{
		id: "serv-5",
		num: "০৫",
		title: "রিয়েল এস্টেট বিনিয়োগ পরামর্শ",
		tag: "উচ্চ মুনাফামুখী পরামর্শ",
		description:
			"আপনার বাজেট, আবাসন পরিকল্পনা ও আর্থিক লক্ষ্যের সাথে সামঞ্জস্য রেখে আমরা ব্যক্তিগত প্রপার্টি পরামর্শ প্রদান করি, যাতে আপনার প্রতিটি টাকা থাকে সম্পূর্ণ নিরাপদ ও সর্বাধিক লাভজনক।",
		benefits: [
			"বাজেট অনুযায়ী উপযুক্ত প্লট নির্বাচন",
			"প্রথমবার জমি ক্রেতাদের জন্য সহজ আইনি গাইড",
			"সর্বাধিক মূল্যায়িত লাভজনক প্লট সেগমেন্ট চিহ্নিতকরণ",
		],
		order: 5,
		active: true,
	},
	{
		id: "serv-6",
		num: "০৬",
		title: "সহজ দীর্ঘমেয়াদী কিস্তি সুবিধা",
		tag: "নমনীয় পেমেন্ট প্ল্যান",
		description:
			"মধ্যবিত্ত ও পেশাজীবীদের কথা মাথায় রেখে কোনো গোপন সুদ বা বাড়তি ফি ছাড়াই ২৪ থেকে ৬০ মাসের সহজ কিস্তির সুযোগ। এককালীন মূল্যে রয়েছে বিশেষ আকর্ষণীয় ছাড়।",
		benefits: [
			"স্বল্প বুকিং মানি দিয়ে নিশ্চিত বুকিং",
			"কোনো ধরনের গোপন চার্জ বা অতিরিক্ত সুদ নেই",
			"এককালীন পরিশোধে আকর্ষণীয় ক্যাশব্যাক ডিসকাউন্ট",
		],
		order: 6,
		active: true,
	},
];

export default function ServicesPage() {
	const { services: rawServices, loading } = useServices();
	const { isBn } = useLanguage();
	const [activeTab, setActiveTab] = useState(0);

	useEffect(() => {
		document.title = isBn
			? "আমাদের সেবাসমূহ | সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ"
			: "Our Services | Silicon Real Estate (Pvt.) Ltd.";
	}, [isBn]);

	const services = isBn
		? SERVICES_BN
		: rawServices && rawServices.length > 0
			? rawServices
			: SERVICES_BN;
	const currentService = services[activeTab] || services[0];
	const serviceFeatures = isBn ? SERVICE_FEATURES_BN : SERVICE_FEATURES_EN;

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden">
			{/* ── 1. CLEAN ARCHITECTURAL HERO HEADER ── */}
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
					<div className="max-w-3xl space-y-4 text-left">
						{/* Breadcrumbs */}
						<div className="flex items-center gap-2 text-xs font-mono font-medium text-white/60">
							<Link href="/" className="hover:text-accent transition-colors">
								{isBn ? "হোম" : "Home"}
							</Link>
							<ChevronRight className="w-3.5 h-3.5 text-white/40" />
							<span className="text-accent font-semibold">
								{isBn ? "সেবাসমূহ" : "Services"}
							</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
							{isBn ? "আমাদের আবাসন পণ্য ও " : "Our Products & "}
							<span className="text-accent font-semibold">
								{isBn ? "পেশাদার সেবাসমূহ" : "Professional Services"}
							</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
							{isBn
								? "সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ আইনগতভাবে সুরক্ষিত, নিখুঁতভাবে পরিকল্পিত এবং উচ্চ মূল্যসম্পন্ন আবাসন সুবিধা নিশ্চিত করে। নিরাপদ জমি ক্রয় থেকে শুরু করে রেজিস্ট্রি ও নামজারি পর্যন্ত আমরা প্রদান করি নির্ভরযোগ্য পূর্ণাঙ্গ সেবা।"
								: "Silicon Real Estate (Pvt.) Ltd. offers legally sound, meticulously planned, and value-driven property solutions. We provide end-to-end support, from secure land purchase to flawless legal documentation, ensuring your investment is safe and highly profitable."}
						</p>

						<div className="pt-2 flex flex-wrap items-center gap-4">
							<Link
								href="/contact"
								className="group bg-primary text-primary-foreground h-12 px-7 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/20 shadow-lg gap-2"
							>
								{isBn ? "পরামর্শের জন্য যোগাযোগ করুন" : "SCHEDULE CONSULTATION"}
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							</Link>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── 2. INTERACTIVE 2-COLUMN TABBED SHOWCASE FOR CORE SERVICES ── */}
			<section className="py-20 sm:py-24 bg-background border-b border-border/50 overflow-hidden">
				<SectionContainer className="space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "প্রধান সেবাসমূহ" : "CORE OFFERINGS"}
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							{isBn
								? "পূর্ণাঙ্গ রিয়েল এস্টেট সেবাসমূহ"
								: "Comprehensive Real Estate Services"}
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							{isBn
								? "আমাদের বিশেষায়িত সেবা স্তম্ভগুলো নির্বাচন করে বিস্তারিত সুবিধা জানুন।"
								: "Click through our specialized service pillars to explore detailed benefits and features."}
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
						{/* Left Column: Interactive Vertical Service Tabs */}
						<div className="lg:col-span-5 space-y-3 text-left">
							{services.map((serv, idx) => {
								const isActive = activeTab === idx;
								return (
									<div
										key={serv.id || idx}
										onClick={() => setActiveTab(idx)}
										className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
											isActive
												? "bg-card border-primary/50 shadow-md pl-6 border-l-4 border-l-primary"
												: "bg-card/60 border-border/50 hover:bg-card hover:border-border"
										}`}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<span className="text-xs font-mono font-medium text-primary">
													{serv.num || (isBn ? `০${idx + 1}` : `0${idx + 1}`)}
												</span>
												<h3 className="text-sm sm:text-base font-semibold font-heading text-foreground">
													{serv.title}
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

						{/* Right Column: Dynamic Service Feature Showcase Panel */}
						{currentService && (
							<div className="lg:col-span-7 bg-card border border-border/60 rounded-3xl p-8 sm:p-10 shadow-xs flex flex-col justify-between relative overflow-hidden space-y-6 text-left">
								<div
									className="absolute inset-0 opacity-[0.03] pointer-events-none"
									style={{
										backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
										backgroundSize: "24px 24px",
									}}
								/>

								<AnimatePresence mode="wait">
									<motion.div
										key={activeTab}
										initial={{ opacity: 0, y: 12 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -12 }}
										transition={{ duration: 0.35, ease: "easeOut" }}
										className="space-y-6 relative z-10"
									>
										{/* Header Row */}
										<div className="flex items-center justify-between border-b border-border/40 pb-4">
											<span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
												{isBn
													? `সার্ভিস ${currentService.num || `০${activeTab + 1}`} (মোট ${services.length}টির মধ্যে)`
													: `SERVICE ${currentService.num || `0${activeTab + 1}`} OF 0${services.length}`}
											</span>
											<span className="text-xs font-medium font-heading text-accent">
												{isBn ? "সিলিকন স্ট্যান্ডার্ড" : "Silicon Standard Verified"}
											</span>
										</div>

										{/* Title & Description */}
										<div className="space-y-3">
											<span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary">
												{currentService.tag}
											</span>

											<h3 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground">
												{currentService.title}
											</h3>
											<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
												{currentService.description}
											</p>
										</div>

										{/* Key Benefits */}
										{currentService.benefits &&
											currentService.benefits.length > 0 && (
												<div className="space-y-3 pt-2">
													<span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground font-heading block">
														{isBn
															? "প্রধান সুবিধাসমূহ ও বৈশিষ্ট্য:"
															: "KEY HIGHLIGHTS & BENEFITS:"}
													</span>
													<div className="space-y-2">
														{currentService.benefits.map((b) => (
															<div
																key={b}
																className="bg-muted/40 border border-border/40 rounded-2xl p-3.5 flex items-start gap-2.5"
															>
																<CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
																<span className="text-xs text-foreground font-light leading-relaxed">
																	{b}
																</span>
															</div>
														))}
													</div>
												</div>
											)}

										{/* Action Button */}
										<div className="pt-4 border-t border-border/40">
											<Link
												href="/contact"
												className="group bg-primary text-primary-foreground h-11 px-6 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-xs gap-2"
											>
												{isBn
													? "এই সেবা সম্পর্কে জানতে চান?"
													: "ENQUIRE ABOUT THIS SERVICE"}
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

			{/* ── 3. SERVICE FEATURES & ULTIMATE BENEFITS ── */}
			<section className="py-20 sm:py-24 bg-muted/30 border-b border-border/50">
				<SectionContainer className="space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "আমাদের বিশেষত্ব" : "WHY CHOOSE US"}
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							{isBn
								? "কার্যকরী সুবিধা ও সেবার শক্তি"
								: "Service Features & Ultimate Benefits"}
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							{isBn
								? "চারটি মূল স্তম্ভ যা সিলিকন রিয়েল এস্টেটকে আপনার সবচেয়ে বিশ্বস্ত আবাসন অংশীদার করে তুলেছে।"
								: "Four core operational strengths that make Silicon Real Estate your most trusted housing partner."}
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
						{serviceFeatures.map((f) => (
							<div
								key={f.title}
								className="bg-card border border-border/60 rounded-3xl p-7 shadow-xs space-y-3 flex flex-col justify-between"
							>
								<div className="space-y-2">
									<span className="text-xs font-mono font-medium text-primary block">
										{f.num}
									</span>
									<h3 className="text-base sm:text-lg font-semibold font-heading text-foreground">
										{f.title}
									</h3>
									<p className="text-xs text-muted-foreground font-light leading-relaxed">
										{f.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 4. OFFLINE BOOKING PROCEDURE NOTICE ── */}
			<section className="py-20 sm:py-24 bg-background border-b border-border/50">
				<SectionContainer className="space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "অফলাইন বুকিং নির্দেশিকা" : "OFFLINE BOOKING GUIDELINE"}
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							{isBn
								? "আপনার নিরাপদ জমির যাত্রা শুরু করতে প্রস্তুত?"
								: "Ready to Start Your Secure Property Journey?"}
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							{isBn
								? "সহজ ৪টি ধাপে আপনার পছন্দের প্লট বরাদ্দ নিশ্চিত করুন।"
								: "Follow our simple 4-step office booking procedure to secure your plot allotment."}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
						{[
							{
								step: isBn ? "০১" : "01",
								title: isBn ? "প্লট বা সেবা নির্বাচন" : "Select Your Service / Plot",
								desc: isBn
									? "আমাদের উপলব্ধ প্লট তালিকা ব্রাউজ করুন এবং আপনার পছন্দের লোকেশন ও সাইজ বেছে নিন।"
									: "Browse through our available residential plots and select your desired location.",
							},
							{
								step: isBn ? "০২" : "02",
								title: isBn ? "আবেদন ফরম প্রিন্ট" : "Download and Print Form",
								desc: isBn
									? "আমাদের অফিসিয়াল আবেদন ফরম সংগ্রহ করুন এবং প্রয়োজনীয় তথ্যাদি পূরণ করুন।"
									: "Head over to our Membership page, download the official application form, and print it.",
							},
							{
								step: isBn ? "০৩" : "03",
								title: isBn ? "অফিসে সরাসরি জমা" : "Physical Submission",
								desc: isBn
									? "এনআইডি কপি, ২ কপি ছবি ও বুকিং ফিসহ মোহাম্মদপুর প্রধান কার্যালয়ে জমা দিন।"
									: "Visit our Corporate Office at Mohammadpur, Dhaka, with NID copies, 2 photos, deeds, and BDT 1,000 fee.",
							},
							{
								step: isBn ? "০৪" : "04",
								title: isBn ? "যাচাইকরণ ও বরাদ্দ" : "Verification & Allocation",
								desc: isBn
									? "আইনগত পরীক্ষা শেষে আনুষ্ঠানিকভাবে আপনার অনুকূলে প্লটের দলিল ও বরাদ্দ নিশ্চিত হবে।"
									: "Our legal department will verify the files and initiate the official physical plot allocation process.",
							},
						].map((st) => (
							<div
								key={st.step}
								className="bg-card border border-border/60 rounded-3xl p-7 shadow-xs space-y-3 flex flex-col justify-between"
							>
								<div className="space-y-2">
									<span className="text-xs font-mono font-medium text-accent block">
										{isBn ? `ধাপ ${st.step}` : `Step ${st.step}`}
									</span>
									<h3 className="text-base font-semibold font-heading text-foreground">
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

			{/* ── 5. FAST CONTACT & ACTION BAR ── */}
			<section className="py-20 sm:py-24 bg-background">
				<SectionContainer>
					<div className="bg-dark-hero rounded-3xl p-8 sm:p-12 text-white shadow-2xl space-y-10 relative overflow-hidden border border-white/15 text-left">
						<div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

						<div
							className="absolute inset-0 opacity-[0.08] pointer-events-none"
							style={{
								backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
								backgroundSize: "24px 24px",
							}}
						/>

						<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/15 pb-8">
							<div className="lg:col-span-8 space-y-3">
								<div className="flex items-center gap-2">
									<span className="inline-block px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-mono font-medium text-accent uppercase tracking-wider">
										{isBn
											? "তাৎক্ষণিক সহায়তা ডেস্ক"
											: "IMMEDIATE SERVICE ASSISTANCE"}
									</span>
								</div>

								<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-heading text-white tracking-tight">
									{isBn
										? "জরুরি প্রপার্টি ও আইনি সহায়তা প্রয়োজন?"
										: "Need Immediate Property & Legal Support?"}
								</h2>
								<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl">
									{isBn
										? "প্লট বুকিং, দলিলপত্র পরীক্ষণ কিংবা সরজমিনে সাইট পরিদর্শনের জন্য আমাদের মোহাম্মদপুর কর্পোরেট কাস্টমার ডেস্কে সরাসরি যোগাযোগ করুন।"
										: "Need immediate assistance regarding plot bookings, title vetting, or physical site visits? Our corporate customer desk in Mohammadpur is ready to assist you."}
								</p>
							</div>

							<div className="lg:col-span-4 flex flex-wrap items-center justify-start lg:justify-end gap-3">
								<Link
									href="/contact"
									className="group bg-primary text-primary-foreground h-12 px-6 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/20 shadow-lg gap-2"
								>
									{isBn ? "যোগাযোগ করুন" : "CONTACT OUR DESK"}
									<Mail className="w-4 h-4" />
								</Link>
								<Link
									href="/contact?type=visit"
									className="group bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 hover:border-accent h-12 px-6 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center transition-all gap-2"
								>
									{isBn ? "সাইট ভিজিট বুক করুন" : "SCHEDULE SITE VISIT"}
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</div>

						{/* Integrated Contact Details Grid */}
						<div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 space-y-1.5">
								<span className="text-[11px] font-mono font-medium text-accent uppercase tracking-wider block">
									{isBn ? "হটলাইন নম্বরসমূহ" : "HOTLINE NUMBERS"}
								</span>
								<div className="flex items-center gap-2">
									<Phone className="w-4 h-4 text-accent shrink-0" />
									<span className="text-xs sm:text-sm font-semibold font-heading text-white">
										+880 12 345 678 / +880 1712 345 678
									</span>
								</div>
							</div>

							<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 space-y-1.5">
								<span className="text-[11px] font-mono font-medium text-accent uppercase tracking-wider block">
									{isBn ? "অফিসিয়াল ইমেইল" : "OFFICIAL EMAIL SUPPORT"}
								</span>
								<div className="flex items-center gap-2">
									<Mail className="w-4 h-4 text-accent shrink-0" />
									<span className="text-xs sm:text-sm font-semibold font-heading text-white">
										info@siliconrealestatepvtltd.com
									</span>
								</div>
							</div>

							<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 space-y-1.5 sm:col-span-2 lg:col-span-1">
								<span className="text-[11px] font-mono font-medium text-accent uppercase tracking-wider block">
									{isBn ? "প্রধান কর্পোরেট অফিস" : "CORPORATE HEADQUARTERS"}
								</span>
								<span className="text-xs text-white/80 font-light leading-relaxed block">
									{isBn
										? "২/৩ (২য় তলা), ব্লক # এ, ইকবাল রোড, মোহাম্মদপুর, ঢাকা-১২০৭"
										: "2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur, Dhaka-1207"}
								</span>
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>
		</div>
	);
}
