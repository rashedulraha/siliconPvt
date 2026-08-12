"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import {
	Handshake,
	HeartHandshake,
	ShieldCheck,
	Star,
	Layers,
	MapPin,
	Headphones,
	Users,
} from "lucide-react";

const values = [
	{
		title: "Integrity & Ethics",
		desc: "Maintaining the highest standards of honesty, transparency, and ethical conduct in every land transaction to earn client trust.",
		icon: Handshake,
	},
	{
		title: "Client Trust & Commitment",
		desc: "Prioritizing client satisfaction, fulfilling long-term promises, and building lifelong relationships with every land owner.",
		icon: HeartHandshake,
	},
	{
		title: "Legal Security & Protection",
		desc: "Ensuring 100% legally sound, dispute-free, and register-ready land deeds backed by thorough legal vetting.",
		icon: ShieldCheck,
	},
	{
		title: "Uncompromising Quality",
		desc: "Delivering world-class urban planning, high soil elevation, and wide road networks built to international standards.",
		icon: Star,
	},
	{
		title: "Complete Transparency",
		desc: "Providing crystal-clear pricing, open contracts, zero hidden fees, and transparent project progress reporting.",
		icon: Layers,
	},
	{
		title: "Planned Eco Development",
		desc: "Designing eco-friendly townships, green park belts, and smart infrastructure for sustainable high-return investments.",
		icon: MapPin,
	},
	{
		title: "Dedicated Customer Care",
		desc: "Offering personalized support, legal registry guidance, and dedicated assistance before, during, and after plot purchase.",
		icon: Headphones,
	},
	{
		title: "Social Responsibility",
		desc: "Contributing to national urban growth by building safe, green, and vibrant planned communities for future generations.",
		icon: Users,
	},
];

export function CompanyValuesGrid() {
	return (
		<section className="py-16 sm:py-20 bg-muted/40 text-foreground border-y border-border/50 relative overflow-hidden">
			{/* Subtle Dot Grid */}
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
					backgroundSize: "24px 24px",
				}}
			/>

			<SectionContainer className="relative z-10 space-y-10">
				{/* Top Headline Banner */}
				<div className="text-center space-y-2 max-w-2xl mx-auto">
					<span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium uppercase tracking-widest text-primary font-heading">
						OUR ETHICAL FOUNDATION
					</span>
					<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
						Corporate Core Values
					</h2>
					<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
						The principles that guide our land development ethics, legal
						verification, and client relationships.
					</p>
				</div>

				{/* 8 Value Cards Grid (Matching Image 2 Layout in English) */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{values.map((v, idx) => (
						<motion.div
							key={v.title}
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.35, delay: idx * 0.05 }}
							whileHover={{ y: -3, transition: { duration: 0.2 } }}
							className="bg-card border border-border/80 rounded-2xl p-6 flex items-start gap-4 text-left hover:border-primary/50 transition-all duration-300"
						>
							<div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
								<v.icon className="w-6 h-6 text-primary" />
							</div>
							<div className="space-y-1.5 flex-1">
								<h3 className="text-base font-bold font-heading text-foreground">
									{v.title}
								</h3>
								<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
									{v.desc}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</SectionContainer>
		</section>
	);
}
