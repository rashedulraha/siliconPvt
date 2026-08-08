import type { Metadata } from "next";
import Link from "next/link";
import {
	ShieldCheck,
	FileText,
	Lock,
	Download,
	Building2,
	Mail,
	MapPin,
	Scale,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

export const metadata: Metadata = {
	title: "Terms of Service | Silicon Real Estate (Pvt.) Ltd.",
	description:
		"Read the official Terms of Service governing platform usage, land inquiries, plot reservations, and legal documentation under the laws of Bangladesh.",
};

const SECTIONS = [
	{
		id: "sec-1",
		num: "01",
		title: "1. Use of Website & Digital Listings",
		content:
			"This website is maintained by Silicon Real Estate (Pvt.) Ltd. for property presentation, land development updates, and client inquiry services. All property descriptions, plot boundaries, 3D community renders, pricing structures, and availability schedules published on this platform are provided for informational guidance and are subject to verification during official deed execution.",
	},
	{
		id: "sec-2",
		num: "02",
		title: "2. Property Listings & Plot Reservations",
		content:
			"Plot layouts, road width dimensions (e.g., 30ft & 40ft internal avenues), zoning allocations, and unit availability are updated regularly but may reflect operational development adjustments under RAJUK and local urban authority planning guidelines. A digital inquiry or plot reservation request on this website does not constitute a legally binding transfer of ownership until an official Allotment Letter and Money Receipt are issued by our Mohammadpur Accounts Branch.",
	},
	{
		id: "sec-3",
		num: "03",
		title: "3. User Conduct & Verification Duties",
		content:
			"Visitors and registered clients agree to utilize this platform solely for legitimate real estate inquiries and legal plot transactions. Submitting false identity details, fraudulent National ID (NID) numbers, or engaging in unauthorized scraping or automated data extraction is strictly prohibited.",
	},
	{
		id: "sec-4",
		num: "04",
		title: "4. Intellectual Property Rights",
		content:
			"All masterplan diagrams, architectural renders, brand logos, video walk-throughs, and legal documentation templates presented on this domain remain the exclusive intellectual property of Silicon Real Estate (Pvt.) Ltd. Unauthorized reproduction, distribution, or commercial exploitation is strictly prohibited without prior written consent.",
	},
	{
		id: "sec-5",
		num: "05",
		title: "5. Limitation of Liability",
		content:
			"Silicon Real Estate (Pvt.) Ltd. strives to maintain absolute accuracy across all published data. However, the company shall not be held liable for indirect or consequential damages arising from reliance on unverified third-party communications or network service interruptions. Physical land title verification and deed registration remain strictly governed by physical company contracts.",
	},
	{
		id: "sec-6",
		num: "06",
		title: "6. Governing Law & Bangladesh Jurisdiction",
		content:
			"These Terms of Service are governed by and construed in accordance with the laws of the People's Republic of Bangladesh. Any dispute, claim, or legal proceedings arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts of Dhaka, Bangladesh.",
	},
	{
		id: "sec-7",
		num: "07",
		title: "7. Contact & Legal Advisory Desk",
		content:
			"For official legal inquiries, title verification assistance, or administrative clarifications regarding these terms, please contact our Legal & Corporate Desk at info@siliconrealestatepvtltd.com or visit our Corporate Headquarters in Mohammadpur, Dhaka.",
	},
];

export default function TermsPage() {
	return (
		<div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden">
			{/* ── 1. ARCHITECTURAL HERO HEADER (NO TOP GAP UNDER NAVBAR) ── */}
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
					<div className="max-w-3xl space-y-4">
						{/* Breadcrumbs */}
						<div className="flex items-center gap-2 text-xs font-mono font-medium text-white/60">
							<Link href="/" className="hover:text-accent transition-colors">
								Home
							</Link>
							<span>&gt;</span>
							<span className="text-accent font-semibold">Legal</span>
							<span>&gt;</span>
							<span className="text-accent font-semibold">
								Terms of Service
							</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
							Terms of{" "}
							<span className="text-accent font-semibold">
								Service & Governance
							</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Official legal terms governing platform usage, property inquiries,
							plot reservations, and corporate governance under the laws of the
							People's Republic of Bangladesh.
						</p>

						<div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-white/70">
							<span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
								Last Updated: August 2026
							</span>
							<span className="px-3 py-1 rounded-full bg-accent/15 border border-accent/20 text-accent font-medium font-heading">
								Jurisdiction: Dhaka, Bangladesh
							</span>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── 2. LEGAL DOCUMENT CONTENT VIEWPORT ── */}
			<section className="py-16 sm:py-20 bg-background">
				<SectionContainer>
					<div className="max-w-4xl mx-auto space-y-8">
						{/* Official Paper Document Container */}
						<div className="bg-card border border-border/70 rounded-3xl p-8 sm:p-12 shadow-md space-y-8 relative overflow-hidden">
							{/* Document Header Stamp */}
							<div className="border-b border-border/60 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
								<div className="space-y-1">
									<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
										CORPORATE LEGAL CHARTER: SRE-TOS-2026-BD
									</span>
									<h2 className="text-xl font-semibold font-heading text-foreground">
										Silicon Real Estate (Pvt.) Ltd. — Terms of Governance
									</h2>
								</div>
								<div className="flex items-center gap-2">
									<span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary inline-flex items-center gap-1.5">
										<Scale className="w-3.5 h-3.5 text-primary" />
										Bangladesh Jurisdiction
									</span>
								</div>
							</div>

							{/* Legal Clauses List */}
							<div className="space-y-8 divide-y divide-border/40">
								{SECTIONS.map((sec) => (
									<div key={sec.id} className="pt-8 first:pt-0 space-y-3">
										<div className="flex items-center gap-3">
											<span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-semibold flex items-center justify-center shrink-0">
												{sec.num}
											</span>
											<h3 className="text-base sm:text-lg font-semibold font-heading text-foreground">
												{sec.title}
											</h3>
										</div>
										<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed pl-10">
											{sec.content}
										</p>
									</div>
								))}
							</div>

							{/* Official Footer Document Note */}
							<div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-muted-foreground font-heading">
								<span>
									Corporate Office: 2/3 (2nd Floor), Block-A, Iqbal Road,
									Mohammadpur, Dhaka-1207
								</span>
								<span className="text-primary font-medium">
									Silicon Real Estate (Pvt.) Ltd.
								</span>
							</div>
						</div>

						{/* Quick Contact & Inquiry Bar */}
						<div className="bg-dark-hero rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/15">
							<div className="space-y-1 text-left">
								<span className="text-xs font-mono font-medium text-accent uppercase tracking-wider block">
									LEGAL ADVISORY ASSISTANCE
								</span>
								<h3 className="text-lg font-semibold font-heading text-white">
									Have Questions Regarding Our Terms?
								</h3>
								<p className="text-xs text-white/70 font-light">
									Our legal team is available to assist with deed verification,
									allotment queries, and title documents.
								</p>
							</div>

							<div className="flex flex-wrap items-center gap-3 shrink-0">
								<Link
									href="/contact"
									className="bg-primary text-primary-foreground h-11 px-6 rounded-xl font-medium font-heading text-xs inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-xs gap-2"
								>
									<Mail className="w-4 h-4" />
									CONTACT LEGAL DESK
								</Link>
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>
		</div>
	);
}
