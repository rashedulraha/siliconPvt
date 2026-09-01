"use client";

import { motion } from "framer-motion";
import { Shield, MapPin, CreditCard, UserCheck } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

export function WhyChooseUs() {
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
						WHY CHOOSE SILICON
					</span>
					<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
						Why Investors Trust Silicon Real Estate
					</h2>
					<p className="text-xs sm:text-sm md:text-base text-muted-foreground font-light leading-relaxed">
						We prioritise disciplined, legally vetted development, 16–18ft high elevation, and transparent registry over empty promises.
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
								100% Legal Security &amp; Title Verification
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light max-w-xl">
								Every project is strictly aligned with RAJUK's extended master plan and government planning guidelines. We guarantee clean CS, SA, RS, BS title deeds, mutation records, and completely dispute-free properties.
							</p>
						</div>

						{/* Visual Indicators */}
						<div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-border/40 pt-6">
							{[
								{ title: "RAJUK Compliant", desc: "100% compliant master layout" },
								{ title: "Mutated Deeds", desc: "Clear chain of ownership" },
								{ title: "Zero Dispute", desc: "Vetted by in-house legal team" },
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
								Strategic Prime Locations
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
								Positioned in high-growth corridors in Savar, adjacent to Mohammadpur, Dhaka, along the scenic Turag River.
							</p>
						</div>

						{/* Visual Indicator */}
						<div className="mt-8 bg-muted/40 rounded-2xl p-4 border border-border/40 flex flex-col gap-2">
							<div className="text-[10px] font-bold uppercase tracking-wider text-accent font-heading">
								Active Connectivity
							</div>
							<div className="flex items-center justify-between text-xs text-foreground font-medium font-heading">
								<span>To Mohammadpur Beribadh</span>
								<span className="font-mono text-primary font-bold">15 Mins</span>
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
								Flexible Payment Plans
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
								Customized installment schedules designed around your financial timeline with zero hidden fees.
							</p>
						</div>

						{/* Payment Milestone Trail */}
						<div className="mt-8 flex items-center justify-between gap-2 relative pt-4 border-t border-border/40">
							{[
								{ name: "Booking", pct: "20%" },
								{ name: "Installments", pct: "50%" },
								{ name: "Deed", pct: "30%" },
							].map((mile, i) => (
								<div key={i} className="flex-1 text-center bg-muted/40 rounded-xl p-2 border border-border/40">
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
								Dedicated Advisory &amp; Free Site Visits
							</h3>
							<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light max-w-xl">
								Our experienced real estate advisors provide free executive transport from our Mohammadpur corporate office to conduct on-ground plot boundary walkthroughs and legal registry consultations.
							</p>
						</div>

						{/* Path Steps */}
						<div className="mt-8 grid grid-cols-3 gap-3 border-t border-border/40 pt-6">
							{[
								{ step: "01", label: "Consultation" },
								{ step: "02", label: "Site Visit" },
								{ step: "03", label: "Deed Registry" },
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

