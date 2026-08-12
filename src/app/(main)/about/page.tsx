"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { PageSEO } from "@/components/seo/PageSEO";
import { SectionContainer } from "@/components/ui/section-container";
import { useAboutContent } from "@/hooks/useAboutContent";

export default function AboutPage() {
	const { data, loading } = useAboutContent();

	const trustBadges = [
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

	const workProcess = [
		{
			step: "01",
			title: "Planning",
			desc: "Strategic land selection in prime zones, environment-friendly design, and master-plan plotting.",
		},
		{
			step: "02",
			title: "Legal Verification",
			desc: "Comprehensive title search, deed vetting, and obtaining clearance from regulatory bodies.",
		},
		{
			step: "03",
			title: "Development",
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

	const certifications = [
		"RAJUK Compliant / Approved Planning",
		"REHAB Member Organization",
		"ISO 9001:2015 Certified Company",
		"Government Authorized Land Developer",
		"100% Legal Land Approval Certification",
	];

	return (
		<>
			<PageSEO
				title="About Us | Silicon Real Estate (Pvt.) Ltd."
				description="Building Trust. Creating Sustainable Communities. Learn about Silicon Real Estate's mission, leadership, core values, and journey."
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
								Home
							</Link>
							<ChevronRight className="w-3 h-3 text-white/40" />
							<span className="text-accent font-semibold">About Us</span>
						</nav>

						<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white tracking-tight leading-snug mb-4">
							{data.heroTitle} <br />
							<span className="text-gold">
								{data.heroSubtitle}
							</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mb-7">
							{data.heroDesc}
						</p>

						<Link
							href="/projects"
							className="inline-flex items-center justify-center bg-primary text-primary-foreground h-11 px-7 rounded-xl font-semibold font-heading text-xs sm:text-sm hover:bg-primary/90 transition-all border border-white/20 shadow-md"
						>
							EXPLORE PROJECTS
						</Link>
					</motion.div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 2: Who We Are & Trust Badges ──────────────────────────── */}
			<section className="py-16 sm:py-20 bg-background relative overflow-hidden text-left">
				{/* Subtle Dot Pattern */}
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
							WHO WE ARE
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{data.whoWeAreTitle}
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light max-w-2xl mx-auto">
							{data.whoWeAreDesc}
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
				{/* Subtle Dot Pattern */}
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
								MISSION
							</span>
							<h3 className="text-lg sm:text-xl font-bold font-heading text-foreground">
								{data.missionTitle}
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
								{data.missionDesc}
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="bg-card border border-border/60 border-t-2 border-t-accent rounded-2xl p-7 sm:p-9 space-y-3 shadow-xs"
						>
							<span className="text-xs font-bold uppercase tracking-widest text-accent font-heading">
								VISION
							</span>
							<h3 className="text-lg sm:text-xl font-bold font-heading text-foreground">
								{data.visionTitle}
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
								{data.visionDesc}
							</p>
						</motion.div>
					</div>

					{/* Core Values */}
					<div className="max-w-2xl mx-auto text-center space-y-2 mb-10">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							CORE VALUES
						</span>
						<h3 className="text-2xl font-bold font-heading text-foreground tracking-tight">
							Our Pillars of Excellence
						</h3>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{data.coreValues.map((val, idx) => (
							<motion.div
								key={val.title}
								whileHover={{ y: -3, transition: { duration: 0.2 } }}
								className="bg-card border border-border/60 rounded-2xl p-6 space-y-2 shadow-xs hover:border-primary/40 transition-all"
							>
								<span className="text-xs font-mono font-bold text-primary block">
									Pillar 0{idx + 1}
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
							OUR JOURNEY
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							Milestones of Trust & Growth
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
						{data.timeline.map((item, idx) => (
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
				{/* Subtle Dot Pattern */}
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
									MESSAGE FROM CHAIRMAN
								</span>
								<h3 className="text-lg font-bold font-heading text-foreground">
									{data.chairmanName}
								</h3>
								<p className="text-xs text-muted-foreground">
									{data.chairmanRole}
								</p>
							</div>
						</div>

						<div className="lg:col-span-8 bg-card border border-border/60 rounded-2xl p-7 sm:p-9 space-y-4 shadow-xs">
							<blockquote className="text-xs sm:text-sm font-semibold font-heading text-primary italic border-l-2 border-primary pl-4">
								"{data.chairmanSpeech.slice(0, 100)}..."
							</blockquote>
							<p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed whitespace-pre-line">
								{data.chairmanSpeech}
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
								"{data.mdSpeech.slice(0, 100)}..."
							</blockquote>
							<p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed whitespace-pre-line">
								{data.mdSpeech}
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
									MESSAGE FROM MANAGING DIRECTOR
								</span>
								<h3 className="text-lg font-bold font-heading text-foreground">
									{data.mdName}
								</h3>
								<p className="text-xs text-muted-foreground">
									{data.mdRole}
								</p>
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 7: Company At A Glance ───────────────────────────── */}
			<section className="py-14 bg-dark-hero text-white relative overflow-hidden text-left">
				{/* Subtle Dot Grid */}
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
							COMPANY AT A GLANCE
						</span>
						<h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
							Proven Track Record of Excellence
						</h3>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{data.stats.map((s) => (
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
							WHY CHOOSE SILICON REAL ESTATE?
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							Our Distinctive Advantages
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{data.whyChooseUs.map((item, idx) => (
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

			{/* ── BLOCK 9: Our Management Team ──────────────────────────────── */}
			<section
				className="py-16 sm:py-20 bg-muted/30 border-y border-border/50 relative overflow-hidden text-left"
				id="team"
			>
				{/* Subtle Dot Pattern */}
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
						backgroundSize: "24px 24px",
					}}
				/>

				<SectionContainer className="relative z-10">
					<div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							OUR MANAGEMENT TEAM
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							Experienced Executive Leadership
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{data.managementTeam.map((m, idx) => (
							<motion.div
								key={m.name || idx}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: idx * 0.08 }}
								whileHover={{ y: -3, transition: { duration: 0.2 } }}
								className="bg-card border border-border/60 rounded-2xl p-6 space-y-4 shadow-xs text-center flex flex-col justify-between"
							>
								<div className="space-y-3">
									<div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 shadow-sm mx-auto">
										<Image
											src={m.image}
											alt={m.name}
											fill
											className="object-cover"
											sizes="96px"
										/>
									</div>
									<div>
										<h3 className="text-base font-bold font-heading text-foreground">
											{m.name}
										</h3>
										<p className="text-xs font-semibold text-primary uppercase tracking-wider font-heading mt-0.5">
											{m.role}
										</p>
									</div>
								</div>

								{m.philosophy && (
									<p className="text-xs text-muted-foreground font-light italic leading-relaxed pt-3 border-t border-border/50">
										"{m.philosophy}"
									</p>
								)}
							</motion.div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 10: Our Work Process ─────────────────────────────────── */}
			<section
				className="py-16 sm:py-20 bg-background relative overflow-hidden text-left"
				id="process"
			>
				<SectionContainer>
					<div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							OUR WORK PROCESS
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							5 Steps to Plot Handover
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
									Step {proc.step}
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
			<section className="py-12 bg-muted/40 border-y border-border/50 relative overflow-hidden text-left">
				{/* Subtle Dot Pattern */}
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
						backgroundSize: "20px 20px",
					}}
				/>

				<SectionContainer className="relative z-10">
					<div className="text-center space-y-2 mb-8">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							CERTIFICATIONS & RECOGNITIONS
						</span>
						<h3 className="text-base sm:text-lg font-bold font-heading text-foreground">
							Official Approvals & Regulatory Compliance
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
