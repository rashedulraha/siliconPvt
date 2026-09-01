"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Scale, Mail, ChevronRight } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

const PRIVACY_SECTIONS = [
	{
		id: "prv-1",
		num: "01",
		title: "1. Information We Collect",
		content:
			"Silicon Real Estate (Pvt.) Ltd. collects personal information voluntarily provided when you submit an inquiry, register for an account, or request a site visit. This includes your full name, phone number, National ID (NID) details, email address, and property preferences. We also collect technical data such as IP addresses and browser headers for security auditing.",
	},
	{
		id: "prv-2",
		num: "02",
		title: "2. How We Use Your Information",
		content:
			"We use collected data to respond to plot inquiries, schedule physical site visits to Silicon City, prepare legal allotment contracts, and issue payment money receipts. Your information is never sold or rented to third-party brokers.",
	},
	{
		id: "prv-3",
		num: "03",
		title: "3. Cookies & Tracking Technologies",
		content:
			"Our platform uses essential session cookies to enable secure client login and saved plot preferences. Analytics cookies help us optimize page load performance and website usability across mobile and desktop devices.",
	},
	{
		id: "prv-4",
		num: "04",
		title: "4. Data Security & Storage in Bangladesh",
		content:
			"We implement industry-standard 256-bit SSL encryption, database access controls, and regular audit procedures to safeguard client records. Physical documentation is stored securely at our Mohammadpur Corporate Office.",
	},
	{
		id: "prv-5",
		num: "05",
		title: "5. Client Rights & Data Corrections",
		content:
			"You have the right to request access, correction, or deletion of your registered contact details at any time by contacting our Client Desk with valid identity verification.",
	},
	{
		id: "prv-6",
		num: "06",
		title: "6. Governing Jurisdiction",
		content:
			"This Privacy Policy is governed by the applicable laws of the People's Republic of Bangladesh. Any privacy inquiries or dispute notifications will be handled under the jurisdiction of Dhaka, Bangladesh.",
	},
];

const TERMS_SECTIONS = [
	{
		id: "tos-1",
		num: "01",
		title: "1. Use of Website & Digital Listings",
		content:
			"This website is maintained by Silicon Real Estate (Pvt.) Ltd. for property presentation, land development updates, and client inquiry services. All property descriptions, plot boundaries, 3D community renders, pricing structures, and availability schedules published on this platform are provided for informational guidance and are subject to verification during official deed execution.",
	},
	{
		id: "tos-2",
		num: "02",
		title: "2. Property Listings & Plot Reservations",
		content:
			"Plot layouts, road width dimensions (e.g., 30ft & 40ft internal avenues), zoning allocations, and unit availability are updated regularly but may reflect operational development adjustments under RAJUK and local urban authority planning guidelines. A digital inquiry or plot reservation request on this website does not constitute a legally binding transfer of ownership until an official Allotment Letter and Money Receipt are issued by our Mohammadpur Accounts Branch.",
	},
	{
		id: "tos-3",
		num: "03",
		title: "3. User Conduct & Verification Duties",
		content:
			"Visitors and registered clients agree to utilize this platform solely for legitimate real estate inquiries and legal plot transactions. Submitting false identity details, fraudulent National ID (NID) numbers, or engaging in unauthorized scraping or automated data extraction is strictly prohibited.",
	},
	{
		id: "tos-4",
		num: "04",
		title: "4. Intellectual Property Rights",
		content:
			"All masterplan diagrams, architectural renders, brand logos, video walk-throughs, and legal documentation templates presented on this domain remain the exclusive intellectual property of Silicon Real Estate (Pvt.) Ltd. Unauthorized reproduction, distribution, or commercial exploitation is strictly prohibited without prior written consent.",
	},
	{
		id: "tos-5",
		num: "05",
		title: "5. Limitation of Liability",
		content:
			"Silicon Real Estate (Pvt.) Ltd. strives to maintain absolute accuracy across all published data. However, the company shall not be held liable for indirect or consequential damages arising from reliance on unverified third-party communications or network service interruptions. Physical land title verification and deed registration remain strictly governed by physical company contracts.",
	},
	{
		id: "tos-6",
		num: "06",
		title: "6. Governing Law & Bangladesh Jurisdiction",
		content:
			"These Terms of Service are governed by and construed in accordance with the laws of the People's Republic of Bangladesh. Any dispute, claim, or legal proceedings arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts of Dhaka, Bangladesh.",
	},
	{
		id: "tos-7",
		num: "07",
		title: "7. Contact & Legal Advisory Desk",
		content:
			"For official legal inquiries, title verification assistance, or administrative clarifications regarding these terms, please contact our Legal & Corporate Desk at info@siliconrealestatepvtltd.com or visit our Corporate Headquarters in Mohammadpur, Dhaka.",
	},
];

export default function PrivacyTermsPage() {
	const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden">
			{/* ── HERO HEADER ── */}
			<section className="relative pt-28 pb-20 sm:pb-24 bg-dark-hero text-white overflow-hidden text-left">
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
							<ChevronRight className="w-3 h-3 text-white/40" />
							<span className="text-accent font-semibold">Legal</span>
							<ChevronRight className="w-3 h-3 text-white/40" />
							<span className="text-accent font-semibold">Privacy & Terms</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
							Privacy Policy &{" "}
							<span className="text-accent font-semibold">Terms of Service</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Official legal charters governing data protection, platform usage, property inquiries, and corporate governance under the laws of the People's Republic of Bangladesh.
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

			{/* ── LEGAL DOCUMENT CONTENT ── */}
			<section className="py-16 sm:py-20 bg-background text-left">
				<SectionContainer>
					<div className="max-w-4xl mx-auto space-y-8">
						{/* TAB SWITCHER */}
						<div className="flex items-center gap-3 p-1.5 bg-muted/60 border border-border/60 rounded-2xl w-fit">
							<button
								onClick={() => setActiveTab("privacy")}
								className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold font-heading transition-all duration-200 flex items-center gap-2 cursor-pointer ${
									activeTab === "privacy"
										? "bg-primary text-primary-foreground shadow-sm"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								<ShieldCheck className="w-4 h-4" />
								Privacy Policy
							</button>
							<button
								onClick={() => setActiveTab("terms")}
								className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold font-heading transition-all duration-200 flex items-center gap-2 cursor-pointer ${
									activeTab === "terms"
										? "bg-primary text-primary-foreground shadow-sm"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								<Scale className="w-4 h-4" />
								Terms of Service
							</button>
						</div>

						{/* OFFICIAL PAPER DOCUMENT CONTAINER */}
						<div className="bg-card border border-border/70 rounded-3xl p-8 sm:p-12 shadow-md space-y-8 relative overflow-hidden">
							{activeTab === "privacy" ? (
								<>
									{/* Document Header Stamp */}
									<div className="border-b border-border/60 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
										<div className="space-y-1">
											<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
												PRIVACY COMPLIANCE DOC: SRE-PRV-2026-BD
											</span>
											<h2 className="text-xl font-semibold font-heading text-foreground">
												Silicon Real Estate (Pvt.) Ltd. — Data Protection Charter
											</h2>
										</div>
										<div className="flex items-center gap-2">
											<span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary inline-flex items-center gap-1.5">
												<ShieldCheck className="w-3.5 h-3.5 text-primary" />
												SSL 256-Bit Secured
											</span>
										</div>
									</div>

									{/* Policy Sections List */}
									<div className="space-y-8 divide-y divide-border/40">
										{PRIVACY_SECTIONS.map((sec) => (
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
								</>
							) : (
								<>
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

									{/* Terms Clauses List */}
									<div className="space-y-8 divide-y divide-border/40">
										{TERMS_SECTIONS.map((sec) => (
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
								</>
							)}

							{/* Official Footer Note */}
							<div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-muted-foreground font-heading">
								<span>
									Corporate Office: 2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka-1207
								</span>
								<span className="text-primary font-medium">
									Silicon Real Estate (Pvt.) Ltd.
								</span>
							</div>
						</div>

						{/* Contact Legal Desk Bar */}
						<div className="bg-dark-hero rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/15">
							<div className="space-y-1 text-left">
								<span className="text-xs font-mono font-medium text-accent uppercase tracking-wider block">
									LEGAL & PRIVACY ADVISORY DESK
								</span>
								<h3 className="text-lg font-semibold font-heading text-white">
									Questions About Our Policies or Terms?
								</h3>
								<p className="text-xs text-white/70 font-light">
									Our legal team in Mohammadpur is available to assist with document requests, data updates, and deed vetting.
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
