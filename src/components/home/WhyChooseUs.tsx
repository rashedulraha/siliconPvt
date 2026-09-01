"use client";

import { motion } from "framer-motion";
import { Shield, MapPin, CreditCard, UserCheck } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useLanguage } from "@/context/LanguageContext";

export function WhyChooseUs() {
	const { isBn } = useLanguage();

	return (
		<section className="py-20 sm:py-24 bg-background text-foreground relative overflow-hidden border-t border-border/50">
			{/* Subtle Dot Grid */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
					backgroundSize: "24px 24px",
				}}
			/>

			<SectionContainer className="relative z-10 space-y-12">
				{/* Section Header */}
				<div className="max-w-3xl text-left space-y-2">
					<span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium uppercase tracking-widest text-primary font-heading">
						{isBn ? "কেন সিলিকন রিয়েল এস্টেট" : "WHY CHOOSE SILICON"}
					</span>
					<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
						{isBn
							? "বিনিয়োগকারীরা কেন সিলিকন রিয়েল এস্টেটে আস্থা রাখেন"
							: "Why Investors Trust Silicon Real Estate"}
					</h2>
					<p className="text-xs sm:text-sm md:text-base text-muted-foreground font-light leading-relaxed">
						{isBn
							? "আমরা কোনো অসত্য প্রতিশ্রুতি নয়, বরং কঠোর নিয়মানুবর্তিতা, ১৬–১৮ ফুট উঁচু বালু ভরাট ও শতভাগ নিষ্কণ্টক আইনি মালিকানা নিশ্চিত করি।"
							: "We prioritise disciplined, legally vetted development, 16–18ft high elevation, and transparent registry over empty promises."}
					</p>
				</div>

				{/* Bento Grid layout */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Card 1: Legal Security (span 2) */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: 0.1 }}
						whileHover={{ y: -4, transition: { duration: 0.2 } }}
						className="group relative bg-card rounded-3xl p-7 sm:p-9 border border-border/60 shadow-xs hover:border-primary/40 transition-all duration-300 md:col-span-2 overflow-hidden flex flex-col justify-between"
					>
						<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-30 group-hover:opacity-100 transition-opacity" />
						<div>
							<div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
								<Shield className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-bold font-heading text-foreground mb-3">
								{isBn
									? "১০০% আইনগত নিরাপত্তা ও নির্ভেজাল দলিলপত্র"
									: "100% Legal Security & Title Verification"}
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light max-w-xl">
								{isBn
									? "প্রতিটি প্রজেক্ট রাজউকের মহাপরিকল্পনার সাথে সংগতিপূর্ণ। আমরা শতভাগ স্পষ্ট সিএস, এসএ, আরএস ও বিএস খতিয়ান ও মিউটেশনসহ নিষ্কণ্টক জমির নিশ্চয়তা দেই।"
									: "Every project is strictly aligned with RAJUK's extended master plan and government planning guidelines. We guarantee clean CS, SA, RS, BS title deeds, mutation records, and completely dispute-free properties."}
							</p>
						</div>

						{/* Visual Indicators */}
						<div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-border/40 pt-6">
							{[
								{
									title: isBn ? "রাজউক মাস্টারপ্ল্যান" : "RAJUK Compliant",
									desc: isBn ? "১০০% কমপ্লায়েন্ট লেআউট" : "100% compliant layout",
								},
								{
									title: isBn ? "মিউটেশন সম্পন্ন" : "Mutated Deeds",
									desc: isBn ? "স্পষ্ট মালিকানা রেকর্ড" : "Clear chain of ownership",
								},
								{
									title: isBn ? "নিষ্কণ্টক জমি" : "Zero Dispute",
									desc: isBn
										? "লিগ্যাল টিম দ্বারা যাচাইকৃত"
										: "Vetted by in-house legal team",
								},
							].map((item, idx) => (
								<div
									key={idx}
									className="bg-muted/40 rounded-2xl p-3.5 border border-border/40"
								>
									<div className="text-xs font-semibold font-heading text-foreground flex items-center gap-1.5">
										<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
										{item.title}
									</div>
									<div className="text-[11px] text-muted-foreground mt-1 font-light">
										{item.desc}
									</div>
								</div>
							))}
						</div>
					</motion.div>

					{/* Card 2: Prime Locations (span 1) */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: 0.2 }}
						whileHover={{ y: -4, transition: { duration: 0.2 } }}
						className="group relative bg-card rounded-3xl p-7 sm:p-9 border border-border/60 shadow-xs hover:border-primary/40 transition-all duration-300 md:col-span-1 overflow-hidden flex flex-col justify-between"
					>
						<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-30 group-hover:opacity-100 transition-opacity" />
						<div>
							<div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
								<MapPin className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-bold font-heading text-foreground mb-3">
								{isBn ? "কৌশলগত প্রাইম লোকেশন" : "Strategic Prime Locations"}
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
								{isBn
									? "ঢাকার মোহাম্মদপুর বেড়িবাঁধ সংলগ্ন তুরাগ নদীর তীরে দ্রুত বিকাশমান বড় বাদেশী মৌজা, সাভারে অবস্থিত।"
									: "Positioned in high-growth corridors in Savar, adjacent to Mohammadpur, Dhaka, along the scenic Turag River."}
							</p>
						</div>

						{/* Visual Indicator */}
						<div className="mt-8 bg-muted/40 rounded-2xl p-4 border border-border/40 flex flex-col gap-2">
							<div className="text-[10px] font-bold uppercase tracking-wider text-accent font-heading">
								{isBn ? "সরাসরি যোগাযোগ" : "Active Connectivity"}
							</div>
							<div className="flex items-center justify-between text-xs text-foreground font-medium font-heading">
								<span>
									{isBn ? "মোহাম্মদপুর বেড়িবাঁধ থেকে" : "To Mohammadpur Beribadh"}
								</span>
								<span className="font-mono text-primary font-bold">
									{isBn ? "১৫ মিনিট" : "15 Mins"}
								</span>
							</div>
							<div className="w-full bg-border/50 h-1.5 rounded-full overflow-hidden">
								<div className="bg-primary h-full w-[90%] rounded-full" />
							</div>
						</div>
					</motion.div>

					{/* Card 3: Easy Payment Plans (span 1) */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: 0.3 }}
						whileHover={{ y: -4, transition: { duration: 0.2 } }}
						className="group relative bg-card rounded-3xl p-7 sm:p-9 border border-border/60 shadow-xs hover:border-primary/40 transition-all duration-300 md:col-span-1 overflow-hidden flex flex-col justify-between"
					>
						<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-30 group-hover:opacity-100 transition-opacity" />
						<div>
							<div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
								<CreditCard className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-bold font-heading text-foreground mb-3">
								{isBn ? "সহজ কিস্তি সুবিধা" : "Flexible Payment Plans"}
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
								{isBn
									? "কোনো গোপন চার্জ ছাড়াই আপনার সুবিধাজনক বাজেট অনুযায়ী ২৪ থেকে ৬০ মাসের সহজ কিস্তি পরিকল্পনা।"
									: "Customized installment schedules designed around your financial timeline with zero hidden fees."}
							</p>
						</div>

						{/* Payment Milestone Trail */}
						<div className="mt-8 flex items-center justify-between gap-2 relative pt-4 border-t border-border/40">
							{[
								{ name: isBn ? "বুকিং" : "Booking", pct: "20%" },
								{ name: isBn ? "কিস্তিসমূহ" : "Installments", pct: "50%" },
								{ name: isBn ? "রেজিস্ট্রেশন" : "Deed", pct: "30%" },
							].map((mile, i) => (
								<div
									key={i}
									className="flex-1 text-center bg-muted/40 rounded-xl p-2 border border-border/40"
								>
									<div className="text-xs font-bold text-primary font-mono">
										{mile.pct}
									</div>
									<div className="text-[10px] text-muted-foreground mt-0.5 font-heading">
										{mile.name}
									</div>
								</div>
							))}
						</div>
					</motion.div>

					{/* Card 4: Expert Guidance (span 2) */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: 0.4 }}
						whileHover={{ y: -4, transition: { duration: 0.2 } }}
						className="group relative bg-card rounded-3xl p-7 sm:p-9 border border-border/60 shadow-xs hover:border-primary/40 transition-all duration-300 md:col-span-2 overflow-hidden flex flex-col justify-between"
					>
						<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-30 group-hover:opacity-100 transition-opacity" />
						<div>
							<div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
								<UserCheck className="h-6 w-6" />
							</div>
							<h3 className="text-xl font-bold font-heading text-foreground mb-3">
								{isBn
									? "অভিজ্ঞ পরামর্শ ও ফ্রি সাইট ভিজিট ব্যবস্থা"
									: "Dedicated Advisory & Free Site Visits"}
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light max-w-xl">
								{isBn
									? "আমাদের মোহাম্মদপুর কর্পোরেট অফিস থেকে নিজস্ব গাড়িতে সম্পূর্ণ বিনামূল্যে সাইট ভিজিট এবং বিশেষজ্ঞ প্রপার্টি উপদেষ্টার মাধ্যমে সরাসরি প্লট পরিদর্শন ও দলিল যাচাই।"
									: "Our experienced real estate advisors provide free executive transport from our Mohammadpur corporate office to conduct on-ground plot boundary walkthroughs and legal registry consultations."}
							</p>
						</div>

						{/* Path Steps */}
						<div className="mt-8 grid grid-cols-3 gap-3 border-t border-border/40 pt-6">
							{[
								{ step: "01", label: isBn ? "পরামর্শ" : "Consultation" },
								{ step: "02", label: isBn ? "সাইট পরিদর্শন" : "Site Visit" },
								{ step: "03", label: isBn ? "দলিল রেজিস্ট্রি" : "Deed Registry" },
							].map((item, idx) => (
								<div
									key={idx}
									className="flex items-center gap-2.5 bg-muted/40 rounded-2xl p-3 border border-border/40"
								>
									<span className="font-mono text-xs text-accent font-bold">
										{item.step}
									</span>
									<span className="text-xs text-foreground font-medium font-heading">
										{item.label}
									</span>
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</SectionContainer>
		</section>
	);
}
