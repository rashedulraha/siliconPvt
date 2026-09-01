"use client";

import Link from "next/link";
import {
	ArrowRight,
	Trees,
	Building,
	ShieldCheck,
	Gamepad2,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useHomeContent } from "@/hooks/useHomeContent";
import { useLanguage } from "@/context/LanguageContext";

export function MasterPlanAmenities() {
	const { data } = useHomeContent();
	const { isBn } = useLanguage();

	return (
		<section className="py-16 sm:py-20 bg-muted/30 text-foreground border-y border-border/50 relative overflow-hidden">
			{/* Subtle Dot Grid Overlay */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
					backgroundSize: "24px 24px",
				}}
			/>

			<SectionContainer className="relative z-10">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
					{/* ── LEFT CARD: MASTER PLAN ── */}
					<div className="bg-card border border-border/80 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row items-stretch">
						{/* Text Side */}
						<div className="p-8 sm:p-10 flex-1 flex flex-col justify-between space-y-6 text-left">
							<div className="space-y-3">
								<span className="text-xs font-semibold font-heading uppercase tracking-widest text-accent">
									{isBn ? "মাস্টার প্ল্যান" : data.masterPlanBadge || "MASTER PLAN"}
								</span>
								<h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight leading-tight">
									{isBn
										? "এক নজরে: আধুনিক টাউনশিপ লেআউট"
										: data.masterPlanTitle || "At a Glance: Township Layout"}
								</h3>
								<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
									{isBn
										? "৩০ ও ৪০ ফুট প্রশস্ত প্রশস্ত রাস্তা, পর্যাপ্ত আলো-বাতাস চলাচলের নিশ্চয়তা এবং প্রতিটি প্লটের জন্য পরিবেশবান্ধব জোনিং সহ সুপরিকল্পিত লেআউট।"
										: data.masterPlanDesc ||
											"Meticulously planned master layout featuring 30ft & 40ft wide avenues, optimal sunlight orientation, and eco-zoning for every plot."}
								</p>
							</div>

							<div>
								<Link
									href="/projects"
									className="inline-flex items-center justify-center h-11 px-7 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium font-heading text-xs tracking-wider uppercase transition-all gap-2"
								>
									{isBn ? "লেআউট ম্যাপ দেখুন" : "EXPLORE LAYOUT"}{" "}
									<ArrowRight className="w-3.5 h-3.5" />
								</Link>
							</div>
						</div>

						{/* Aerial Master Plan Image Side */}
						<div className="relative w-full md:w-1/2 min-h-[300px] overflow-hidden bg-transparent">
							<img
								src={
									data.masterPlanImage ||
									"https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200"
								}
								alt="Silicon City Master Plan Layout Top View"
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
									objectPosition: "center",
								}}
								className="absolute inset-0 w-full h-full object-cover object-center"
							/>
							<div className="absolute inset-0 bg-black/10 pointer-events-none" />
						</div>
					</div>

					{/* ── RIGHT CARD: LIFESTYLE AMENITIES ── */}
					<div className="bg-card border border-border/80 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col md:flex-row items-stretch">
						{/* Text & Icons Side */}
						<div className="p-8 sm:p-10 flex-1 flex flex-col justify-between space-y-6 text-left">
							<div className="space-y-4">
								<span className="text-xs font-semibold font-heading uppercase tracking-widest text-accent">
									{isBn
										? "নাগরিক সুযোগ-সুবিধা"
										: data.amenitiesBadge || "LIFESTYLE AMENITIES"}
								</span>
								<h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight leading-tight">
									{isBn
										? "সকল আধুনিক নাগরিক ও লাইফস্টাইল সুবিধা"
										: data.amenitiesTitle || "All Modern Lifestyle Amenities"}
								</h3>

								{/* 4 Amenities Icon Grid */}
								<div className="grid grid-cols-2 gap-4 pt-2">
									<div className="flex items-center gap-2.5">
										<div className="w-8 h-8 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
											<Trees className="w-4 h-4 text-primary" />
										</div>
										<span className="text-xs font-semibold font-heading text-foreground">
											{isBn ? "পার্ক ও সবুজ চত্বর" : "Parks & Greenery"}
										</span>
									</div>

									<div className="flex items-center gap-2.5">
										<div className="w-8 h-8 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
											<Building className="w-4 h-4 text-primary" />
										</div>
										<span className="text-xs font-semibold font-heading text-foreground">
											{isBn ? "কমিউনিটি ও মসজিদ" : "Club & Mosque"}
										</span>
									</div>

									<div className="flex items-center gap-2.5">
										<div className="w-8 h-8 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
											<ShieldCheck className="w-4 h-4 text-primary" />
										</div>
										<span className="text-xs font-semibold font-heading text-foreground">
											{isBn ? "২৪/৭ নিরাপত্তা" : "24/7 Security"}
										</span>
									</div>

									<div className="flex items-center gap-2.5">
										<div className="w-8 h-8 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
											<Gamepad2 className="w-4 h-4 text-primary" />
										</div>
										<span className="text-xs font-semibold font-heading text-foreground">
											{isBn ? "খেলার মাঠ ও স্পোর্টস" : "Sports & Play Zone"}
										</span>
									</div>
								</div>
							</div>

							<div>
								<Link
									href="/projects"
									className="inline-flex items-center justify-center h-11 px-7 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium font-heading text-xs tracking-wider uppercase transition-all gap-2"
								>
									{isBn ? "সব সুবিধা দেখুন" : "VIEW ALL AMENITIES"}{" "}
									<ArrowRight className="w-3.5 h-3.5" />
								</Link>
							</div>
						</div>

						{/* Residential Park Image Side */}
						<div className="relative w-full md:w-1/2 min-h-[300px] overflow-hidden bg-transparent">
							<img
								src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1200"
								alt="Silicon City Eco Park & Amenities"
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
									objectPosition: "center",
								}}
								className="absolute inset-0 w-full h-full object-cover object-center"
							/>
							<div className="absolute inset-0 bg-black/10 pointer-events-none" />
						</div>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
