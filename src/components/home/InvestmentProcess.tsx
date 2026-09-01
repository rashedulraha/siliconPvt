"use client";

import { motion } from "framer-motion";
import { Search, MapPin, FileText, KeyRound, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionContainer } from "@/components/layout/SectionContainer";

const steps = [
	{
		number: "01",
		icon: Search,
		title: "Discover & Shortlist",
		description:
			"Browse verified residential and commercial plots across Silicon City and shortlist options tailored to your budget.",
		tag: "Explore Plots",
	},
	{
		number: "02",
		icon: MapPin,
		title: "Free Site Visit & Vetting",
		description:
			"Walk the physical plot boundary with our team via free transport from Mohammadpur and review CS/SA/RS/BS deeds in person.",
		tag: "On-Site Tour",
	},
	{
		number: "03",
		icon: FileText,
		title: "Booking & Documentation",
		description:
			"Reserve your selected plot with a transparent agreement, clear payment milestones, and flexible monthly installment options.",
		tag: "Transparent Terms",
	},
	{
		number: "04",
		icon: KeyRound,
		title: "Sub-Registry & Deed Handover",
		description:
			"Our in-house legal team completes the mutation, land tax clearance, and official registration deed handover with zero hassle.",
		tag: "100% Mutation Ready",
	},
];

export function InvestmentProcess() {
	return (
		<section className="py-20 sm:py-24 bg-muted/30 text-foreground relative overflow-hidden border-t border-border/50">
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
				<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
					<div className="space-y-2 max-w-2xl">
						<span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium uppercase tracking-widest text-primary font-heading">
							TRANSPARENT PROCESS
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							From First Visit to Registered Deed
						</h2>
						<p className="text-xs sm:text-sm md:text-base text-muted-foreground font-light leading-relaxed">
							Four simple steps to secure, legally verified land ownership with complete peace of mind.
						</p>
					</div>

					<Link
						href="/contact?type=visit"
						className="text-xs font-semibold font-heading text-primary hover:underline inline-flex items-center gap-1 shrink-0"
					>
						Schedule Free Site Visit <ArrowRight className="w-3.5 h-3.5" />
					</Link>
				</div>

				{/* Steps Grid with Visual Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
					{steps.map((step, idx) => (
						<motion.div
							key={step.number}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: idx * 0.08 }}
							whileHover={{ y: -4, transition: { duration: 0.2 } }}
							className="bg-card border border-border/60 rounded-3xl p-7 shadow-xs hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group"
						>
							{/* Top Accent Line on Hover */}
							<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
										<step.icon className="h-6 w-6" />
									</div>
									<span className="font-mono text-2xl font-bold text-muted-foreground/40 group-hover:text-accent transition-colors">
										{step.number}
									</span>
								</div>

								<div className="space-y-1.5">
									<span className="text-[10px] font-semibold uppercase tracking-wider text-accent font-heading block">
										{step.tag}
									</span>
									<h3 className="text-lg font-bold font-heading text-foreground">
										{step.title}
									</h3>
									<p className="text-xs text-muted-foreground font-light leading-relaxed">
										{step.description}
									</p>
								</div>
							</div>

							<div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-heading text-muted-foreground font-medium">
								<span>Step 0{idx + 1} of 04</span>
								<span className="text-primary font-semibold">Verified Step</span>
							</div>
						</motion.div>
					))}
				</div>
			</SectionContainer>
		</section>
	);
}

