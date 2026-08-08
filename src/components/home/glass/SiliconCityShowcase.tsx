"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

const specifications = [
	{
		num: "01",
		title: "Planned Internal Roads",
		desc: "Beautifully laid out internal road networks of 30 feet and 40 feet wide to ensure smooth and congestion-free vehicle movement.",
		tag: "30ft & 40ft Wide Roads",
	},
	{
		num: "02",
		title: "Proposed Turag River Bridge",
		desc: "Active processing and developmental works are underway for a dedicated bridge over the Turag River to ensure instant and easy commuting to Mohammadpur Beribadh.",
		tag: "Direct Bridge Link",
	},
	{
		num: "03",
		title: "Grand Central Mosque",
		desc: "A beautiful central mosque has been constructed, alongside planned block-based mosques for easy daily prayers.",
		tag: "Central & Block Mosques",
	},
	{
		num: "04",
		title: "Sports & Recreation",
		desc: "Dedicated Football Field and Cricket Field for children's healthy physical growth and community recreation.",
		tag: "Football & Cricket Fields",
	},
	{
		num: "05",
		title: "Modern Civic Amenities",
		desc: "High-Standard School & College, Modern Hospital & Medical Center, Children's Parks and Playground, Local Corporate Markets & Shopping Zones.",
		tag: "Schools, Hospital & Parks",
	},
	{
		num: "06",
		title: "Secure Living Area",
		desc: "Safe gated community environment under professional estate supervision.",
		tag: "24/7 Gated Security",
	},
];

const servicesList = [
	{
		num: "01",
		title: "Residential Plot Sales",
		desc: "Legally verified, risk-free, and register-ready plots inside planned blocks.",
		highlights: [
			"100% Verified Title",
			"Instant Registry",
			"Dispute-Free Plots",
		],
	},
	{
		num: "02",
		title: "Planned Community Building",
		desc: "Meticulous land-filling up to 16–18 feet height, internal road drawing, and civic infrastructure.",
		highlights: [
			"30ft & 40ft Wide Roads",
			"16–18ft Soil Earthwork",
			"RAJUK Layout Alignment",
		],
	},
	{
		num: "03",
		title: "Legal Documentation Support",
		desc: "Expert in-house legal team assisting clients with deep deed search, land mutation, and registration registry.",
		highlights: [
			"CS/SA/RS/BS Deed Search",
			"Mutation Assistance",
			"In-House Legal Vetting",
		],
	},
	{
		num: "04",
		title: "Real Estate Consultancy",
		desc: "Professional advisory helping clients make safe, secure, and highly profitable investments based on budget.",
		highlights: [
			"High ROI Growth",
			"Budget Planning",
			"1-on-1 Investment Consultation",
		],
	},
	{
		num: "05",
		title: "Easy Installment Facility",
		desc: "Flexible payment schemes tailored to reduce financial load and make land buying stress-free.",
		highlights: [
			"Low Booking Fee",
			"Zero Hidden Surcharges",
			"Flexible Installment Tenure",
		],
	},
];

export function SiliconCityShowcase() {
	const [activeService, setActiveService] = useState(0);

	return (
		<section className="relative py-20 sm:py-24 bg-muted/30 border-y border-border/50 overflow-hidden">
			{/* Subtle Dot Grid Overlay */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
					backgroundSize: "24px 24px",
				}}
			/>

			<SectionContainer className="relative z-10 space-y-20">
				{/* ── SECTION 3: Architectural Showcase for Silicon City ── */}
				<div className="space-y-12">
					{/* Header */}
					<div className="max-w-3xl text-left space-y-3">
						<span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium uppercase tracking-widest text-primary font-heading">
							FLAGSHIP TOWNSHIP
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Silicon City – The Ideal Housing Township
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed font-light">
							Located in Savar (Bara Badeshi Mouza), inside the proposed RAJUK
							extended master plan and protected by the Dhaka Flood Protection
							Embankment.
						</p>
					</div>

					{/* Masterplan Preview Banner Card */}
					<div className="relative rounded-3xl overflow-hidden border border-border/60 bg-dark-hero text-white p-8 sm:p-12 shadow-xl">
						{/* Subtle Dot Grid Overlay */}
						<div
							className="absolute inset-0 opacity-[0.08] pointer-events-none"
							style={{
								backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
								backgroundSize: "24px 24px",
							}}
						/>

						<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
							<div className="lg:col-span-8 space-y-4">
								<div className="flex flex-wrap items-center gap-2">
									<span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-accent font-heading uppercase tracking-wider">
										RAJUK Extended Masterplan
									</span>
									<span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-white/80 font-heading uppercase tracking-wider">
										Turag Riverfront Corridor
									</span>
									<span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-medium text-white/80 font-heading uppercase tracking-wider">
										Flood Embankment Protected
									</span>
								</div>

								<h3 className="text-2xl sm:text-3xl font-semibold font-heading text-white tracking-tight">
									Masterplanned Township Adjacent to Mohammadpur, Dhaka
								</h3>

								<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
									Silicon City is engineered to bridge modern urban amenities
									with serene riverside living, offering ready-mutation
									residential plots with wide 30ft & 40ft avenues.
								</p>
							</div>

							<div className="lg:col-span-4 flex justify-start lg:justify-end">
								<Link
									href="/projects"
									className="group bg-primary text-primary-foreground h-12 px-7 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/20 shadow-md gap-2"
								>
									EXPLORE SILICON CITY LAYOUTS
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</div>
					</div>

					{/* 6 Key Specifications Architectural Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{specifications.map((spec, idx) => (
							<motion.div
								key={spec.title}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: idx * 0.06 }}
								whileHover={{ y: -4, transition: { duration: 0.2 } }}
								className="bg-card border border-border/60 rounded-3xl p-7 shadow-xs hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-4"
							>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-xs font-mono font-medium text-primary">
											{spec.num}
										</span>
										<span className="text-[11px] font-medium font-heading text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
											{spec.tag}
										</span>
									</div>
									<h3 className="text-lg font-semibold font-heading text-foreground">
										{spec.title}
									</h3>
									<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
										{spec.desc}
									</p>
								</div>

								<div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-heading font-medium text-muted-foreground">
									<span>Silicon City Standard</span>
									<span className="text-primary font-medium">Verified</span>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* ── SECTION 5: Comprehensive Real Estate Services Showcase ── */}
				<div className="space-y-12 pt-12 border-t border-border/40">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							WHAT WE OFFER
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Comprehensive Real Estate Services
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light">
							High-value land options and end-to-end legal support for a
							hassle-free experience.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
						{/* Left Vertical Tabs */}
						<div className="lg:col-span-5 space-y-3">
							{servicesList.map((srv, idx) => {
								const isActive = activeService === idx;
								return (
									<div
										key={srv.title}
										onClick={() => setActiveService(idx)}
										className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
											isActive
												? "bg-card border-primary/50 shadow-md pl-6 border-l-4 border-l-primary"
												: "bg-card/60 border-border/50 hover:bg-card hover:border-border"
										}`}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<span className="text-xs font-mono font-medium text-primary">
													0{idx + 1}
												</span>
												<h3 className="text-sm sm:text-base font-semibold font-heading text-foreground">
													{srv.title}
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

						{/* Right Feature Panel */}
						<div className="lg:col-span-7 bg-card border border-border/60 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden space-y-6">
							<div
								className="absolute inset-0 opacity-[0.03] pointer-events-none"
								style={{
									backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
									backgroundSize: "24px 24px",
								}}
							/>

							<AnimatePresence mode="wait">
								<motion.div
									key={activeService}
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -12 }}
									transition={{ duration: 0.35, ease: "easeOut" }}
									className="space-y-6 relative z-10"
								>
									<div className="flex items-center justify-between border-b border-border/40 pb-4">
										<span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
											Service 0{activeService + 1} of 05
										</span>
										<span className="text-xs font-medium font-heading text-accent">
											Silicon Standard Verified
										</span>
									</div>

									<div className="space-y-3">
										<h3 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground">
											{servicesList[activeService].title}
										</h3>
										<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
											{servicesList[activeService].desc}
										</p>
									</div>

									<div className="space-y-2 pt-2">
										<span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground font-heading block">
											Key Highlights & Benefits:
										</span>
										<div className="flex flex-wrap gap-2">
											{servicesList[activeService].highlights.map((tag) => (
												<span
													key={tag}
													className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary"
												>
													<CheckCircle2 className="w-3.5 h-3.5 text-primary" />
													{tag}
												</span>
											))}
										</div>
									</div>

									<div className="pt-4 border-t border-border/40">
										<Link
											href="/services"
											className="group bg-primary text-primary-foreground h-11 px-6 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-xs gap-2"
										>
											EXPLORE SERVICE DETAILS
											<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
										</Link>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
