"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { CheckCircle2, ShieldCheck } from "lucide-react";

interface CoreValue {
	id: string;
	title: string;
	description: string;
}

const DEFAULT_7_VALUES: CoreValue[] = [
	{
		id: "val-1",
		title: "Integrity",
		description:
			"Maintaining the highest level of honesty, ethical standards, and transparency in every transaction to win your trust.",
	},
	{
		id: "val-2",
		title: "Customer Trust",
		description:
			"Earning your confidence, fulfilling promises, and establishing permanent mutual relationships is our highest priority.",
	},
	{
		id: "val-3",
		title: "Legal Security",
		description:
			"Every single plot sold by our company undergoes 100% legal verification, ensuring risk-free registry and authentic ownership.",
	},
	{
		id: "val-4",
		title: "Quality",
		description:
			"Committed to top-tier planning, premium infrastructure development, and sustainable urban engineering.",
	},
	{
		id: "val-5",
		title: "Transparency",
		description:
			"Complete openness in all transactions, pricing models, contracts, and project updates. No hidden costs.",
	},
	{
		id: "val-6",
		title: "Planned Development",
		description:
			"Adhering strictly to standard structural design to create environment-friendly, long-term high-yielding land value.",
	},
	{
		id: "val-7",
		title: "Social Responsibility",
		description:
			"Contributing to the nation's green and planned expansion to build a sustainable habitat for future generations.",
	},
];

export function IntroCoreValuesGlassGrid() {
	const [isHovered, setIsHovered] = useState(false);
	const [profile, setProfile] = useState({
		companyName: "Silicon Real Estate (Pvt.) Ltd.",
		tagline: "WELCOME TO SILICON REAL ESTATE",
		mainTitle: "Turning Your Housing Dreams Into Secure Realities",
		overview:
			"Having a piece of land, a safe shelter, and a clean environment in Dhaka is a deeply cherished dream for everyone. With the rapid growth of population and unplanned urbanization, finding livable and legally secure land has become increasingly difficult. Silicon Real Estate (Pvt.) Ltd. was founded with a commitment to bridge this gap. We do not just sell plots; we build your peace of mind, future security, and generational asset value. Under highly skilled and professional management, we are developing 'Silicon City'—a beautifully planned residential township that blends modern citizen amenities with the serene touch of nature.",
		coreValues: DEFAULT_7_VALUES,
	});

	useEffect(() => {
		let isMounted = true;
		async function fetchProfile() {
			try {
				const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";
				const res = await fetch(`${backendUrl}/api/company-profile`);
				if (res.ok) {
					const json = await res.json();
					const data = json.data || json;
					if (data && isMounted) {
						setProfile({
							companyName: data.companyName || profile.companyName,
							tagline: data.tagline || profile.tagline,
							mainTitle: data.mainTitle || profile.mainTitle,
							overview: data.overview || profile.overview,
							coreValues:
								Array.isArray(data.coreValues) && data.coreValues.length > 0
									? data.coreValues
									: DEFAULT_7_VALUES,
						});
					}
				}
			} catch {
				// Fallback
			}
		}
		fetchProfile();
		return () => {
			isMounted = false;
		};
	}, []);

	// Duplicate items for seamless infinite marquee scroll
	const marqueeItems = [...profile.coreValues, ...profile.coreValues];

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

			<SectionContainer className="relative z-10 space-y-20">
				{/* ── SECTION 2: Asymmetric Editorial Welcome Showcase ── */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
					<div className="lg:col-span-5 space-y-3">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{profile.tagline}
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight leading-snug">
							{profile.mainTitle}
						</h2>
						<div className="w-16 h-1 bg-primary rounded-full mt-2" />
					</div>

					<div className="lg:col-span-7 bg-card border border-border/60 rounded-3xl p-8 sm:p-10 shadow-xs relative">
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed font-light text-justify">
							"{profile.overview}"
						</p>
						<div className="pt-6 mt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4 text-xs font-medium font-heading text-foreground">
							<span className="flex items-center gap-1.5 text-primary uppercase tracking-wider">
								<CheckCircle2 className="w-4 h-4 text-primary" /> 100% RAJUK
								Compliant
							</span>
							<span className="flex items-center gap-1.5 text-primary uppercase tracking-wider">
								<CheckCircle2 className="w-4 h-4 text-primary" /> Verified Title
								& Registry
							</span>
						</div>
					</div>
				</div>

				{/* ── SECTION 4: INFINITE MARQUEE CAROUSEL ── */}
				<div className="space-y-8">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							OUR CORE VALUES
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							The Pillars of Our Commitment
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light">
							We operate with absolute integrity and transparency at every
							single phase of our development.
						</p>
					</div>

					{/* Marquee Carousel Container */}
					<div
						className="relative w-full overflow-hidden py-2 rounded-3xl"
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						{/* Left Edge Mask Gradient */}
						<div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />

						{/* Right Edge Mask Gradient */}
						<div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

						{/* Framer Motion Infinite Scroll Track */}
						<motion.div
							className="flex gap-6 w-max"
							animate={{
								x: isHovered ? undefined : ["0%", "-50%"],
							}}
							transition={{
								x: {
									repeat: Infinity,
									repeatType: "loop",
									duration: 30,
									ease: "linear",
								},
							}}
						>
							{marqueeItems.map((val, idx) => {
								const originalIndex = (idx % profile.coreValues.length) + 1;
								return (
									<div
										key={`${val.id || val.title}-${idx}`}
										className="w-[280px] sm:w-[320px] shrink-0 bg-card border border-border/60 rounded-3xl p-6 shadow-xs hover:border-primary/50 transition-all duration-300 flex flex-col justify-between space-y-4 group"
									>
										<div className="space-y-2.5">
											<div className="flex items-center justify-between">
												<span className="text-xs font-mono font-medium text-primary">
													Pillar 0{originalIndex}
												</span>
												<span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground">
													<ShieldCheck className="w-3.5 h-3.5 text-accent" />
													Verified
												</span>
											</div>
											<h3 className="text-base sm:text-lg font-semibold font-heading text-foreground group-hover:text-primary transition-colors">
												{val.title}
											</h3>
											<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
												{val.description}
											</p>
										</div>

										<div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-heading font-medium text-muted-foreground">
											<span>Silicon Standard</span>
											<span className="text-primary font-medium">
												100% Legal
											</span>
										</div>
									</div>
								);
							})}
						</motion.div>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
