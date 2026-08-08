"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	ChevronRight,
	ShieldCheck,
	CheckCircle,
	Building2,
	Users,
	Award,
	TrendingUp,
	MapPin,
	FileCheck,
	Phone,
	CalendarCheck,
	ArrowRight,
	Quote,
	Star,
	Clock,
	Sparkles,
} from "lucide-react";
import { PageSEO } from "@/components/seo/PageSEO";
import { SectionContainer } from "@/components/ui/section-container";

export default function AboutPage() {
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

	const coreValues = [
		{
			title: "Trust & Integrity",
			desc: "Maintaining the highest levels of honesty, transparency, and ethics in every transaction to secure our clients' trust.",
		},
		{
			title: "Transparency",
			desc: "Keeping complete transparency in all information, pricing, contracts, and project management with no hidden costs.",
		},
		{
			title: "Quality",
			desc: "Committing to the highest standards through planned infrastructure, sustainable development, and modern architectural integration.",
		},
		{
			title: "Planned Development",
			desc: "Ensuring maximum value creation through modern urban planning, eco-friendly setups, and long-term investment viability.",
		},
	];

	const timeline = [
		{
			year: "2016",
			title: "Company Founded",
			desc: "Founded with a clear vision to provide secure, legally safe, and planned land investments in Dhaka.",
		},
		{
			year: "2018",
			title: "Silicon City Launch",
			desc: "Commenced premier project 'Silicon City', adjacent to Mohammadpur along Turag River.",
		},
		{
			year: "2020",
			title: "100+ Happy Clients",
			desc: "Celebrated milestone of securing dreams and investments of over 100+ satisfied plot owners.",
		},
		{
			year: "2023",
			title: "Phase 2 Expansion",
			desc: "Expansion of infrastructure, master layout planning, and 30ft & 40ft wide internal road networks.",
		},
		{
			year: "2026",
			title: "Thriving Community",
			desc: "Evolving into a highly successful, modern, and thriving residential housing community.",
		},
	];

	const stats = [
		{ value: "15+", label: "Projects Completed" },
		{ value: "1000+", label: "Happy Clients" },
		{ value: "12+", label: "Prime Locations" },
		{ value: "10+", label: "Years Experience" },
	];

	const whyChooseUs = [
		{
			title: "Legal Verification",
			desc: "100% verified documentation, clear registry, and dispute-free plots to ensure risk-free ownership.",
		},
		{
			title: "Prime Location",
			desc: "Positioned adjacent to Mohammadpur, under RAJUK's proposed extended master plan, and close to Parliament House.",
		},
		{
			title: "Secure Investment",
			desc: "Planned in highly promising growth zones, ensuring stable and long-term asset value appreciation.",
		},
		{
			title: "Easy Payment Plan",
			desc: "Flexible and stress-free installment facilities tailored to ease your financial planning.",
		},
		{
			title: "Trusted Team",
			desc: "Operated by highly qualified directors, legal advisors, architects, and site engineers.",
		},
		{
			title: "After-Sales Support",
			desc: "Continuous assistance throughout deed registration, plot mutation, and infrastructural development.",
		},
	];

	const managementTeam = [
		{
			name: "MD. AHMED KABIR",
			role: "Founder & Chairman",
			philosophy:
				"Honesty, transparency, and client trust are the greatest strengths of our company.",
			image:
				"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
		},
		{
			name: "ENGR. RASHEDUL ISLAM",
			role: "Managing Director",
			philosophy:
				"Ensuring modern urban standards, top-tier engineering safety, and rajuk-compliant development.",
			image:
				"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
		},
		{
			name: "NUSRAT JAHAN",
			role: "Director - Operations",
			philosophy:
				"Streamlining seamless customer experience, operational precision, and client care.",
			image:
				"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
		},
		{
			name: "TAHMID HOSSAIN",
			role: "Director - Projects",
			philosophy:
				"Executing engineering excellence, structural quality, and on-time plot delivery.",
			image:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
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
			<section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden">
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
							Building Trust. <br />
							<span className="text-gold">
								Creating Sustainable Communities.
							</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mb-7">
							Silicon Real Estate (Pvt.) Ltd. is committed to developing secure,
							modern, and investment-friendly housing projects across
							Bangladesh, ensuring a prosperous future for the next generations.
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
			<section className="py-16 sm:py-20 bg-background relative overflow-hidden">
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
							Pioneering Planned & Eco-Friendly Development
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light max-w-2xl mx-auto">
							Silicon Real Estate (Pvt.) Ltd. is a highly trusted, eco-friendly,
							and planned real estate developer in Bangladesh, committed to
							ensuring safe, modern, and long-term value-driven housing. We
							implement every project by giving the highest priority to honesty,
							transparency, quality, and absolute legal security, so that our
							valued clients can build their dream addresses and make secure
							investments with complete peace of mind.
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
				className="py-16 sm:py-20 bg-muted/30 border-y border-border/50 relative overflow-hidden"
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
								Our Purpose & Commitment
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
								Our mission is to create the highest value for our clients'
								investments through the combination of integrity, quality,
								innovation, and professionalism. We are committed to providing
								reliable services, transparent business practices, and the
								effective use of modern technology to deliver sustainable
								solutions that ensure the long-term development of our clients,
								partners, employees, and society.
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
								Our Future Outlook
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
								To establish ourselves as one of the country's most trusted,
								modern, and eco-friendly real estate companies, where every
								individual's dream of safe, planned, and quality housing becomes
								a secure reality.
							</p>
						</motion.div>
					</div>

					{/* Core Values */}
					<div className="max-w-2xl mx-auto text-center space-y-2 mb-10">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							CORE VALUES
						</span>
						<h3 className="text-2xl font-bold font-heading text-foreground tracking-tight">
							Our 4 Pillars of Excellence
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
				className="py-16 sm:py-20 bg-background relative overflow-hidden"
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
						{timeline.map((item, idx) => (
							<motion.div
								key={item.year}
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
				className="py-16 sm:py-20 bg-muted/40 border-y border-border/50 relative overflow-hidden"
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
									src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
									alt="MD. AHMED KABIR"
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
									MD. AHMED KABIR
								</h3>
								<p className="text-xs text-muted-foreground">
									Founder & Chairman, Silicon Real Estate (Pvt.) Ltd.
								</p>
							</div>
						</div>

						<div className="lg:col-span-8 bg-card border border-border/60 rounded-2xl p-7 sm:p-9 space-y-4 shadow-xs">
							<blockquote className="text-xs sm:text-sm font-semibold font-heading text-primary italic border-l-2 border-primary pl-4">
								"Our mission is to create secure investment opportunities and
								deliver lasting value."
							</blockquote>
							<p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed">
								"Welcome to Silicon Real Estate (Pvt.) Ltd. Our ultimate goal is
								to present legally secure, strategically located, and highly
								promising real estate projects where we work diligently to
								maximize the asset value of your investments. We implement every
								project so that our respected clients can make future investment
								decisions with absolute confidence.
							</p>
							<p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed">
								Our vision is to lead the country's housing sector as a trusted,
								innovative, and value-driven organization. By prioritizing
								quality, professionalism, ethics, and customer satisfaction, we
								commit to creating sustainable developments and safe havens for
								individuals, families, and future generations. Your trust is our
								greatest inspiration. To honor that trust, we pledge to stand by
								your side as a reliable partner at every step of your journey."
							</p>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 6: Message From Managing Director ──────────────────── */}
			<section
				className="py-16 sm:py-20 bg-background relative overflow-hidden"
				id="md"
			>
				<SectionContainer>
					<div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
						<div className="lg:col-span-8 bg-card border border-border/60 rounded-2xl p-7 sm:p-9 space-y-4 shadow-xs order-2 lg:order-1">
							<blockquote className="text-xs sm:text-sm font-semibold font-heading text-primary italic border-l-2 border-primary pl-4">
								"We build more than properties; we build trust and long-term
								relationships."
							</blockquote>
							<p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed">
								"Every individual dreams of a beautiful, safe, and planned home
								at the end of the day. To turn that dream into reality, our
								'Silicon City' project is being implemented under experienced
								management, following a well-planned design and complying with
								RAJUK's necessary rules and regulations. We are building a
								modern and livable residential space with a combination of
								renowned architects, engineers, urban planners, social workers,
								environmentalists, and other professionals.
							</p>
							<p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed">
								In line with the layout plan of Silicon City, 30 and 40 feet
								wide roads, a football field, a cricket field, and a grand
								mosque have been constructed. Same way, a bridge is under
								processing over the Turag River to ensure easy and seamless
								commuting. For those who did not receive plot allotments despite
								applying to various RAJUK projects, Silicon City can be an
								ideal, secure, and promising residential project. I warmly
								invite you to become a proud owner of a plot in Silicon City,
								equipped with modern 21st-century amenities, and build a secure,
								planned, and prosperous housing environment for yourself and the
								next generation."
							</p>
						</div>

						<div className="lg:col-span-4 text-center lg:text-right space-y-3 order-1 lg:order-2">
							<div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-primary/30 shadow-md mx-auto lg:ml-auto lg:mr-0">
								<Image
									src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
									alt="ENGR. RASHEDUL ISLAM"
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
									ENGR. RASHEDUL ISLAM
								</h3>
								<p className="text-xs text-muted-foreground">
									Managing Director, Silicon Real Estate (Pvt.) Ltd.
								</p>
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 7: Company At A Glance ───────────────────────────── */}
			<section className="py-14 bg-dark-hero text-white relative overflow-hidden">
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
						{stats.map((s) => (
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
			<section className="py-16 sm:py-20 bg-background relative overflow-hidden">
				<SectionContainer>
					<div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							WHY CHOOSE SILICON REAL ESTATE?
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							Our Distinctive Advantages
						</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

			{/* ── BLOCK 9: Our Management Team ──────────────────────────────── */}
			<section
				className="py-16 sm:py-20 bg-muted/30 border-y border-border/50 relative overflow-hidden"
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
						{managementTeam.map((m, idx) => (
							<motion.div
								key={m.name}
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
				className="py-16 sm:py-20 bg-background relative overflow-hidden"
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
			<section className="py-12 bg-muted/40 border-y border-border/50 relative overflow-hidden">
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

			{/* ── BLOCK 12: What Our Clients Say ────────────────────────────── */}
			<section className="py-16 bg-background relative overflow-hidden">
				<SectionContainer>
					<div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							WHAT OUR CLIENTS SAY
						</span>
						<h2 className="text-2xl font-bold font-heading text-foreground">
							Client Trust & Satisfaction
						</h2>
					</div>

					<div className="max-w-3xl mx-auto bg-card border border-border/60 rounded-2xl p-7 sm:p-9 text-center space-y-4 shadow-xs">
						<p className="text-xs sm:text-sm text-foreground/90 font-light italic leading-relaxed">
							"Silicon Real Estate provided us the best land investment
							experience. Their absolute transparency in transactions, legally
							sound paperwork, and helpful customer support are truly
							outstanding. I highly recommend them to anyone planning for a
							secure future."
						</p>
						<div className="pt-2">
							<h4 className="text-sm font-bold font-heading text-foreground">
								Tanvir Ahmed
							</h4>
							<p className="text-xs text-primary font-medium font-heading">
								Proud Land Owner, Silicon City
							</p>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 13: Ready To Invest With Us? (Office CTA Banner) ────── */}
			<section className="py-16 sm:py-20 bg-background">
				<SectionContainer>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="relative overflow-hidden bg-dark-hero rounded-2xl p-7 sm:p-11 shadow-xl text-white"
					>
						{/* Subtle Dot Grid */}
						<div
							className="absolute inset-0 opacity-[0.08] pointer-events-none"
							style={{
								backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
								backgroundSize: "24px 24px",
							}}
						/>

						<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
							<div className="lg:col-span-8 space-y-3">
								<span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-widest text-accent font-heading">
									Corporate Office Consultation
								</span>
								<h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-white tracking-tight">
									Ready to Invest with Us?
								</h2>
								<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
									Let us help you find the perfect property for your future
									generations. Book a physical office discussion or request a
									guided site visit today.
								</p>
								<p className="text-xs font-semibold text-accent font-heading pt-1">
									Hotlines: +880 12 345 678 / +880 1712 345 678
								</p>
							</div>

							<div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
								<Link
									href="/contact"
									className="bg-primary text-primary-foreground h-11 px-6 rounded-xl font-semibold text-xs sm:text-sm font-heading inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-sm"
								>
									CONTACT US
								</Link>
								<Link
									href="/contact"
									className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 h-11 px-6 rounded-xl font-semibold text-xs sm:text-sm font-heading inline-flex items-center justify-center transition-all"
								>
									BOOK SITE VISIT
								</Link>
							</div>
						</div>
					</motion.div>
				</SectionContainer>
			</section>
		</>
	);
}
