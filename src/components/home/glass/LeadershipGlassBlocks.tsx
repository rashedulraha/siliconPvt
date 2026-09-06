"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Award, Quote, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useHomeContent } from "@/hooks/useHomeContent";
import { useAboutContent } from "@/hooks/useAboutContent";

interface LeaderData {
	id: string;
	name: string;
	role: string;
	title: string;
	quote?: string;
	image: string;
	message: string;
}

const DEFAULT_LEADERS_EN: LeaderData[] = [
	{
		id: "chair-1",
		name: "MD. AHMED KABIR",
		role: "Founder & Chairman",
		title: "Chairman's Insight",
		quote:
			"Our mission is to create secure investment opportunities and deliver lasting value.",
		image: "",
		message:
			"Welcome to Silicon Real Estate. Our ultimate goal is to present legally sound, strategically positioned, and promising real estate ventures. We work tirelessly to maximize your asset value so that our respected clients can invest in their future with complete peace of mind.",
	},
	{
		id: "md-1",
		name: "MD. SAROWAR KHALED",
		role: "Managing Director",
		title: "Managing Director's Vision",
		quote:
			"We build more than properties; we build trust and long-term relationships.",
		image: "",
		message:
			"Silicon City is being developed by a premium panel of architects, urban planners, structural engineers, and environmentalists. Our community offers wide 30ft and 40ft roads, lush playgrounds, and a proposed bridge over the Turag River, creating a highly modern and RAJUK-compliant ecosystem.",
	},
];

const DEFAULT_LEADERS_BN: LeaderData[] = [
	{
		id: "chair-1",
		name: "মো: আহমেদ কবীর",
		role: "প্রতিষ্ঠাতা ও চেয়ারম্যান",
		title: "চেয়ারম্যানের অভিমত",
		quote:
			"আমাদের মূল লক্ষ্য প্রতিটি পরিবারের জন্য শতভাগ নিরাপদ ও লাভজনক জমির নিশ্চয়তা প্রদান করা।",
		image: "",
		message:
			"সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ-এ আপনাকে স্বাগতম। আমাদের উদ্দেশ্য সততা ও স্বচ্ছতার সাথে আইনগতভাবে সম্পূর্ণ ঝুঁকিমুক্ত আবাসন প্রকল্প উপস্থাপন করা। আপনার কষ্টার্জিত বিনিয়োগের সর্বোচ্চ ভবিষ্যৎ মূল্য নিশ্চিত করাই আমাদের প্রধান অঙ্গীকার।",
	},
	{
		id: "md-1",
		name: "মো: সরোয়ার খালেদ",
		role: "ব্যবস্থাপনা পরিচালক",
		title: "ব্যবস্থাপনা পরিচালকের বার্তা",
		quote:
			"আমরা শুধু জমি বা প্রপার্টি নয়, মানুষের আস্থা ও প্রজন্মের জন্য নিরাপদ ভবিষ্যৎ গড়ে তুলি।",
		image: "",
		message:
			"সিলিকন সিটি অভিজ্ঞ স্থপতি, নগর পরিকল্পনাবিদ ও প্রকৌশলীদের সার্বিক তত্ত্বাবধানে বাস্তবায়িত হচ্ছে। ১৬–১৮ ফুট উঁচু বালু ভরাট, ৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ রাস্তা এবং তুরাগ নদীর মনোরম পরিবেশ এই প্রকল্পকে করেছে আধুনিক ঢাকার শ্রেষ্ঠ আবাসন ঠিকানা।",
	},
];

export function LeadershipGlassBlocks() {
	const { isBn } = useLanguage();
	const { data: homeData } = useHomeContent();
	const { data: aboutData } = useAboutContent();

	const exec = homeData.executive || {};

	const chairman: LeaderData = {
		id: "chair-1",
		name: isBn
			? exec.chairmanNameBn || aboutData.chairmanNameBn || "মো: আহমেদ কবীর"
			: exec.chairmanName || aboutData.chairmanName || "MD. AHMED KABIR",
		role: isBn
			? exec.chairmanRoleBn || aboutData.chairmanRoleBn || "প্রতিষ্ঠাতা ও চেয়ারম্যান"
			: exec.chairmanRole || aboutData.chairmanRole || "Founder & Chairman",
		title: isBn ? "চেয়ারম্যানের অভিমত" : "Chairman's Insight",
		quote: isBn
			? exec.chairmanQuoteBn ||
				"আমাদের মূল লক্ষ্য প্রতিটি পরিবারের জন্য শতভাগ নিরাপদ ও লাভজনক জমির নিশ্চয়তা প্রদান করা।"
			: exec.chairmanQuote ||
				"Our mission is to create secure investment opportunities and deliver lasting value.",
		image: exec.chairmanImage || aboutData.chairmanImage || "",
		message: isBn
			? exec.chairmanSpeechBn ||
				aboutData.chairmanSpeechBn ||
				"সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ-এ আপনাকে স্বাগতম। আমাদের উদ্দেশ্য সততা ও স্বচ্ছতার সাথে আইনগতভাবে সম্পূর্ণ ঝুঁকিমুক্ত আবাসন প্রকল্প উপস্থাপন করা। আপনার কষ্টার্জিত বিনিয়োগের সর্বোচ্চ ভবিষ্যৎ মূল্য নিশ্চিত করাই আমাদের প্রধান অঙ্গীকার।"
			: exec.chairmanSpeech ||
				aboutData.chairmanSpeech ||
				"Welcome to Silicon Real Estate. Our ultimate goal is to present legally sound, strategically positioned, and promising real estate ventures. We work tirelessly to maximize your asset value so that our respected clients can invest in their future with complete peace of mind.",
	};

	const md: LeaderData = {
		id: "md-1",
		name: isBn
			? exec.mdNameBn || aboutData.mdNameBn || "মো: সরোয়ার খালেদ"
			: exec.mdName || aboutData.mdName || "MD. SAROWAR KHALED",
		role: isBn
			? exec.mdRoleBn || aboutData.mdRoleBn || "ব্যবস্থাপনা পরিচালক"
			: exec.mdRole || aboutData.mdRole || "Managing Director",
		title: isBn ? "ব্যবস্থাপনা পরিচালকের বার্তা" : "Managing Director's Vision",
		quote: isBn
			? exec.mdQuoteBn ||
				"আমরা শুধু জমি বা প্রপার্টি নয়, মানুষের আস্থা ও প্রজন্মের জন্য নিরাপদ ভবিষ্যৎ গড়ে তুলি।"
			: exec.mdQuote ||
				"We build more than properties; we build trust and long-term relationships.",
		image: exec.mdImage || aboutData.mdImage || "",
		message: isBn
			? exec.mdSpeechBn ||
				aboutData.mdSpeechBn ||
				"সিলিকন সিটি অভিজ্ঞ স্থপতি, নগর পরিকল্পনাবিদ ও প্রকৌশলীদের সার্বিক তত্ত্বাবধানে বাস্তবায়িত হচ্ছে। ১৬–১৮ ফুট উঁচু বালু ভরাট, ৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ রাস্তা এবং তুরাগ নদীর মনোরম পরিবেশ এই প্রকল্পকে করেছে আধুনিক ঢাকার শ্রেষ্ঠ আবাসন ঠিকানা।"
			: exec.mdSpeech ||
				aboutData.mdSpeech ||
				"Silicon City is being developed by a premium panel of architects, urban planners, structural engineers, and environmentalists. Our community offers wide 30ft and 40ft roads, lush playgrounds, and a proposed bridge over the Turag River, creating a highly modern and RAJUK-compliant ecosystem.",
	};

	const leaders = [chairman, md];

	return (
		<section className="relative py-20 sm:py-24 bg-background overflow-hidden">
			{/* Subtle Dot Grid Background Pattern */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
					backgroundSize: "28px 28px",
				}}
			/>

			<SectionContainer className="relative z-10 space-y-14">
				{/* Section Header */}
				<div className="max-w-3xl text-left space-y-2">
					<span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium uppercase tracking-widest text-primary font-heading">
						<Award className="w-3.5 h-3.5 text-primary" />
						{isBn ? "শীর্ষ পরিচালনা পর্ষদ" : "EXECUTIVE LEADERSHIP"}
					</span>
					<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
						{isBn
							? "দূরদর্শী নেতৃত্বের দিকনির্দেশনা"
							: "Guided By Visionary Leadership"}
					</h2>
					<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light">
						{isBn
							? "পরিকল্পিত, পরিবেশবান্ধব ও শতভাগ নিষ্কণ্টক আবাসন গড়ার অঙ্গীকার।"
							: "Pioneering planned, eco-friendly, and legally secure housing developments across Bangladesh."}
					</p>
				</div>

				{/* Executive Cards Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
					{leaders.map((leader, idx) => (
						<motion.div
							key={leader.id || leader.name}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							whileHover={{ y: -4, transition: { duration: 0.2 } }}
							className="bg-card border border-border/60 rounded-3xl p-8 sm:p-10 shadow-xs hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group"
						>
							{/* Subtle Top Accent Line */}
							<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-40 group-hover:opacity-100 transition-opacity" />

							<div className="space-y-6">
								{/* Executive Profile Header */}
								<div className="flex items-center gap-4">
									<div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 shrink-0 shadow-sm bg-muted/40 flex items-center justify-center">
										{leader.image ? (
											<img
												src={leader.image}
												alt={leader.name}
												className="w-full h-full object-cover object-center"
												onError={(e) => {
													const target = e.currentTarget;
													target.style.display = "none";
													const parent = target.parentElement;
													if (parent) {
														const fallback =
															parent.querySelector(".initials-fallback");
														if (fallback)
															(fallback as HTMLElement).style.display = "flex";
													}
												}}
											/>
										) : null}
										<div
											className={`initials-fallback w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center text-primary font-bold text-lg font-heading ${
												leader.image ? "hidden" : "flex"
											}`}
										>
											{leader.name
												.split(" ")
												.slice(0, 2)
												.map((n) => n[0])
												.join("")}
										</div>
									</div>
									<div className="space-y-1">
										<span className="text-[11px] font-mono font-medium uppercase tracking-widest text-accent font-heading">
											{leader.title}
										</span>
										<h3 className="text-xl font-semibold font-heading text-foreground">
											{leader.name}
										</h3>
										<p className="text-xs text-muted-foreground font-medium font-heading">
											{leader.role}
										</p>
									</div>
								</div>

								{/* Quote Callout */}
								{leader.quote && (
									<div className="bg-muted/40 border-l-4 border-primary rounded-r-2xl p-4 sm:p-5 space-y-1">
										<Quote className="w-4 h-4 text-primary opacity-60 mb-1" />
										<blockquote className="text-xs sm:text-sm font-semibold font-heading text-foreground italic leading-relaxed">
											"{leader.quote}"
										</blockquote>
									</div>
								)}

								{/* Executive Statement Text */}
								<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
									"{leader.message}"
								</p>
							</div>

							{/* Footer Verification Badge */}
							<div className="pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-heading font-medium text-muted-foreground">
								<span className="flex items-center gap-1.5 text-foreground/80">
									<ShieldCheck className="w-3.5 h-3.5 text-primary" />
									{isBn
										? "সিলিকন রিয়েল এস্টেট গর্ভন্যান্স"
										: "Silicon Real Estate Governance"}
								</span>
								<span className="text-primary font-medium">
									{isBn ? "এক্সিকিউটিভ বোর্ড" : "Executive Board"}
								</span>
							</div>
						</motion.div>
					))}
				</div>
			</SectionContainer>
		</section>
	);
}
