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
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useServices } from "@/hooks/useServices";

const SERVICE_FEATURES = [
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

export default function ServicesPage() {
	const { services, loading } = useServices();
	const [activeTab, setActiveTab] = useState(0);

	useEffect(() => {
		document.title = "Our Services | Silicon Real Estate (Pvt.) Ltd.";
	}, []);

	const currentService = services[activeTab] || services[0];

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
								Home
							</Link>
							<span>&gt;</span>
							<span className="text-accent font-semibold">Services</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
							Our Products &{" "}
							<span className="text-accent font-semibold">
								Professional Services
							</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Silicon Real Estate (Pvt.) Ltd. offers legally sound, meticulously
							planned, and value-driven property solutions. We provide
							end-to-end support, from secure land purchase to flawless legal
							documentation, ensuring your investment is safe and highly
							profitable.
						</p>

						<div className="pt-2 flex flex-wrap items-center gap-4">
							<Link
								href="/contact"
								className="group bg-primary text-primary-foreground h-12 px-7 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/20 shadow-lg gap-2"
							>
								SCHEDULE CONSULTATION
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
							CORE OFFERINGS
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Comprehensive Real Estate Services
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Click through our specialized service pillars to explore
							detailed benefits and features.
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
													{serv.num || `0${idx + 1}`}
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
												SERVICE {currentService.num || `0${activeTab + 1}`} OF 0{services.length}
											</span>
											<span className="text-xs font-medium font-heading text-accent">
												Silicon Standard Verified
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
										{currentService.benefits && currentService.benefits.length > 0 && (
											<div className="space-y-3 pt-2">
												<span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground font-heading block">
													KEY HIGHLIGHTS & BENEFITS:
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
												ENQUIRE ABOUT THIS SERVICE
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
							WHY CHOOSE US
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Service Features & Ultimate Benefits
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Four core operational strengths that make Silicon Real Estate your
							most trusted housing partner.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
						{SERVICE_FEATURES.map((f) => (
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
							OFFLINE BOOKING GUIDELINE
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Ready to Start Your Secure Property Journey?
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Follow our simple 4-step office booking procedure to secure your
							plot allotment.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
						{[
							{
								step: "01",
								title: "Select Your Service / Plot",
								desc: "Browse through our available residential plots and select your desired location.",
							},
							{
								step: "02",
								title: "Download and Print Form",
								desc: "Head over to our Membership page, download the official application form, and print it.",
							},
							{
								step: "03",
								title: "Physical Submission",
								desc: "Visit our Corporate Office at Mohammadpur, Dhaka, with NID copies, 2 photos, deeds, and BDT 1,000 fee.",
							},
							{
								step: "04",
								title: "Verification & Allocation",
								desc: "Our legal department will verify the files and initiate the official physical plot allocation process.",
							},
						].map((st) => (
							<div
								key={st.step}
								className="bg-card border border-border/60 rounded-3xl p-7 shadow-xs space-y-3 flex flex-col justify-between"
							>
								<div className="space-y-2">
									<span className="text-xs font-mono font-medium text-accent block">
										Step {st.step}
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
						{/* Ambient Background Glow Orb */}
						<div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

						{/* Subtle Dot Grid */}
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
										IMMEDIATE SERVICE ASSISTANCE
									</span>
								</div>

								<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-heading text-white tracking-tight">
									Need Immediate Property & Legal Support?
								</h2>
								<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl">
									Need immediate assistance regarding plot bookings, title
									vetting, or physical site visits? Our corporate customer desk
									in Mohammadpur is ready to assist you.
								</p>
							</div>

							<div className="lg:col-span-4 flex flex-wrap items-center justify-start lg:justify-end gap-3">
								<Link
									href="/contact"
									className="group bg-primary text-primary-foreground h-12 px-6 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/20 shadow-lg gap-2"
								>
									CONTACT OUR DESK
									<Mail className="w-4 h-4" />
								</Link>
								<Link
									href="/contact?type=visit"
									className="group bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 hover:border-accent h-12 px-6 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center transition-all gap-2"
								>
									SCHEDULE SITE VISIT
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</div>

						{/* Integrated Contact Details Grid */}
						<div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							<div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 space-y-1.5">
								<span className="text-[11px] font-mono font-medium text-accent uppercase tracking-wider block">
									HOTLINE NUMBERS
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
									OFFICIAL EMAIL SUPPORT
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
									CORPORATE HEADQUARTERS
								</span>
								<span className="text-xs text-white/80 font-light leading-relaxed block">
									2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur,
									Dhaka-1207
								</span>
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>
		</div>
	);
}
