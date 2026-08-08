"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
	ArrowRight,
	ArrowUpRight,
	CheckCircle2,
	Download,
	MapPin,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

const PATHWAYS = [
	{
		num: "01",
		title: "By Inheritance / Succession",
		desc: "Direct landowners or legal heirs of land situated within the Silicon City project boundary can apply for official membership following the company's prescribed rules.",
		tag: "Inheritance",
	},
	{
		num: "02",
		title: "By Direct Purchase from Company",
		desc: "Clients who have purchased plots or land directly from Silicon Real Estate (Pvt.) Ltd. can apply for membership to complete their plot allocation and handover.",
		tag: "Direct Allotment",
	},
	{
		num: "03",
		title: "By Purchase from Other Sources",
		desc: "Individuals who have purchased land inside the project boundary from third-party owners can also apply for membership under established guidelines to integrate into the township.",
		tag: "Third-Party Transfer",
	},
];

const TERMS_AND_CONDITIONS = [
	{
		num: "01",
		title: "Document Submission",
		text: "The landowner must submit photocopies of the original land deed and all other relevant land documents along with one copy of their photograph with the application form.",
		tag: "Required Documents",
		highlights: ["100% Verified Title", "Deed Photocopies", "Applicant Photo"],
	},
	{
		num: "02",
		title: "Membership Fee & Photos",
		text: "The application must be accompanied by two recent passport-sized attested photographs of the applicant and an application fee of BDT 1,000/- (paid via cheque or cash in favor of the company). A separate membership must be obtained for each individual plot.",
		tag: "BDT 1,000 Fee",
		highlights: ["BDT 1,000 Fee", "2 Passport Photos", "Per Plot Registration"],
	},
	{
		num: "03",
		title: "Soil Development Costs",
		text: "The cost for earth-filling and developing the soil up to a height of 16 to 18 feet in Silicon City will be determined by the company based on current market rates. Every member is bound to pay this designated development cost.",
		tag: "16-18ft Elevation",
		highlights: [
			"16-18 Feet Elevation",
			"Market Rate Calculation",
			"Mandatory Payment",
		],
	},
	{
		num: "04",
		title: "Contribution for Infrastructure (Roads & Utilities)",
		text: "To build roads, mosques, schools, colleges, parks, and other civic infrastructure, the landowner must transfer 25% to 30% of their land (depending on the plot location) to the name of 'Silicon City' via an Irrevocable Power of Attorney (Am-Mukhtarnama) deed.",
		tag: "25%-30% Land Transfer",
		highlights: [
			"25%-30% Infrastructure Share",
			"Am-Mukhtarnama Deed",
			"Civic Amenities",
		],
	},
	{
		num: "05",
		title: "Non-Withdrawal & Transfer Policy",
		text: "Once the land is integrated into the company project, the membership cannot be withdrawn under any circumstances. However, the owner may sell, transfer, or execute a gift deed (Heba) after notifying the company, obtaining a Clearance Certificate (NOC), and paying the company's prescribed transfer fees.",
		tag: "NOC Clearance",
		highlights: ["NOC Certificate", "Heba & Transfer Rights", "Non-Withdrawal"],
	},
	{
		num: "06",
		title: "Proportional Utility Charges",
		text: "Proportional costs for establishing public and civic facilities—including Gas, Water, Electricity, Security, Sewerage, Road Development, Telephone Lines, and Tree Plantation—must be paid by the member as determined by the company.",
		tag: "Shared Utilities",
		highlights: [
			"Gas & Power Lines",
			"Sewerage & Security",
			"Proportional Sharing",
		],
	},
	{
		num: "07",
		title: "No-Development Penalty",
		text: "If a landowner fails to pay their share of the earth-filling/soil development costs to the company, they will not be allowed to construct multi-storied buildings. In such cases, they may only build semi-concrete (semi-pucca) houses or structures.",
		tag: "Development Rule",
		highlights: [
			"Multi-Storey Restriction",
			"Semi-Pucca Permit",
			"Fee Compliance",
		],
	},
	{
		num: "08",
		title: "Clause Omitted",
		text: "(Note: Clause No. 8 is omitted in the official corporate document).",
		tag: "Corporate Note",
		highlights: ["Official Corporate Record", "Clause Skipped in Deed"],
	},
	{
		num: "09",
		title: "Residential Zoning Policy",
		text: "No commercial activities or businesses are allowed to operate within the designated residential zones of Silicon City. Separate areas inside the project have been allocated specifically for shops, markets, and other commercial activities.",
		tag: "Residential Zone",
		highlights: [
			"Zero Commercial Noise",
			"Designated Market Zones",
			"Planned Residential",
		],
	},
	{
		num: "10",
		title: "Prior Construction Approval",
		text: "Before initiating any physical construction within Silicon City, the owner must inform the company and obtain official written permission. Developing a beautiful, planned, and aesthetic residential township is a shared civic responsibility.",
		tag: "Written Permit",
		highlights: [
			"Prior Written Approval",
			"Architectural Compliance",
			"Planned Township",
		],
	},
	{
		num: "11",
		title: "Suspension on Land Disputes",
		text: "If any legal dispute or ownership conflict arises regarding a member's land, the company will suspend the physical plot handover until the dispute is legally resolved.",
		tag: "Dispute Clause",
		highlights: [
			"Ownership Protection",
			"Legal Dispute Hold",
			"Dispute Resolution",
		],
	},
	{
		num: "12",
		title: "Shared Boundary Walls",
		text: "The boundary walls of every plot in Silicon City must be shared (common) walls. During building construction, structures must be designed leaving the boundary limits clear. Using the boundary wall directly as a building structure wall is strictly prohibited.",
		tag: "Common Wall",
		highlights: [
			"Shared Boundary Walls",
			"Setback Compliance",
			"Structural Integrity",
		],
	},
	{
		num: "13",
		title: "Wall Construction Fees",
		text: "Plot boundary walls will be constructed directly by the company under its own supervision, and the respective plot owner must pay the construction cost at the company's determined rate.",
		tag: "Company Supervision",
		highlights: [
			"Direct Supervision",
			"Standard Construction",
			"Owner Fee Payment",
		],
	},
	{
		num: "14",
		title: "Compliance with Management Decisions",
		text: "Members must strictly adhere to all structural, developmental, and administrative decisions taken by the management of Silicon Real Estate (Pvt.) Ltd. from time to time for the benefit of the project.",
		tag: "Management Rules",
		highlights: [
			"Management Alignment",
			"Township Standards",
			"Project Growth",
		],
	},
	{
		num: "15",
		title: "Third-Party Land Disputes",
		text: "Silicon Real Estate (Pvt.) Ltd. bears no legal, financial, or administrative liability for ownership or boundary disputes regarding lands purchased outside the company. However, the company may assist in resolving such disputes upon the mutual request of both parties.",
		tag: "Legal Boundary",
		highlights: [
			"Company Liability Scope",
			"Mutual Assistance",
			"Dispute Advisory",
		],
	},
	{
		num: "16",
		title: "Service Charges on Refunds",
		text: "In case of refund requests for deposits made towards soil filling/earth-filling, a 10% service charge will be deducted from the total deposited amount before issuing the refund.",
		tag: "10% Refund Fee",
		highlights: [
			"10% Service Deduction",
			"Accounts Verification",
			"Transparent Process",
		],
	},
	{
		num: "17",
		title: "No Unauthorized Modifications",
		text: "No member is permitted to construct additional individual boundary walls or conduct separate soil-filling works on their plot without obtaining prior written permission from the company.",
		tag: "Modification Rule",
		highlights: [
			"Prior Written Permit",
			"Zero Individual Earth-Filling",
			"Township Order",
		],
	},
	{
		num: "18",
		title: "Mandatory Payment Verification",
		text: "For any development, modification, or extra construction works within the project area, members must first deposit the prescribed fees at the company's Accounts Branch and collect an official money receipt before starting the physical work.",
		tag: "Accounts Branch Receipt",
		highlights: [
			"Accounts Branch Receipt",
			"Pre-Deposit Verification",
			"Authorized Records",
		],
	},
];

export default function MembershipPage() {
	const [activeClauseIdx, setActiveClauseIdx] = useState(0);

	useEffect(() => {
		document.title =
			"Silicon City Membership Guidelines | Silicon Real Estate (Pvt.) Ltd.";
	}, []);

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden">
			{/* ── 1. CLEAN ARCHITECTURAL HERO HEADER (NO GAP UNDER NAVBAR) ── */}
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
							<span className="text-accent font-semibold">Membership</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
							Silicon City{" "}
							<span className="text-accent font-semibold">
								Membership Guidelines
							</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Review our official offline membership process, download the
							printable application form, and understand the terms and
							conditions required to secure your plot ownership in Silicon City.
						</p>

						<div className="pt-2 flex flex-wrap items-center gap-4">
							<a
								href="/assets/silicon-membership-form.pdf"
								download
								className="group bg-primary text-primary-foreground h-12 px-7 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/20 shadow-lg gap-2"
							>
								DOWNLOAD MEMBERSHIP FORM (PDF)
								<Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
							</a>
							<Link
								href="/contact"
								className="group bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 hover:border-accent h-12 px-7 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center transition-all gap-2"
							>
								VIEW OFFICE LOCATION
								<MapPin className="w-4 h-4" />
							</Link>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── 2. PATHWAYS TO ACQUIRE MEMBERSHIP ── */}
			<section className="py-20 sm:py-24 bg-background border-b border-border/50">
				<SectionContainer className="space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							MEMBERSHIP CATEGORIES
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Pathways to Acquire Membership
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Membership of Silicon Real Estate (Pvt.) Ltd. can be acquired
							through three distinct methods:
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{PATHWAYS.map((p) => (
							<div
								key={p.num}
								className="bg-card border border-border/60 rounded-3xl p-8 shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all"
							>
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-xs font-mono font-medium text-primary">
											{p.num}
										</span>
										<span className="text-[11px] font-medium font-heading text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
											{p.tag}
										</span>
									</div>
									<h3 className="text-lg font-semibold font-heading text-foreground">
										{p.title}
									</h3>
									<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
										{p.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</SectionContainer>
			</section>

			{/* ── 3. CORPORATE LEGAL CHARTER - EXACT 2-COLUMN SHOWCASE ARCHITECTURE (MATCHING USER SCREENSHOT) ── */}
			<section className="py-20 sm:py-24 bg-background border-b border-border/50 overflow-hidden">
				<SectionContainer className="space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							CORPORATE LEGAL CHARTER
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Official Terms & Conditions
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Explore all 18 official binding clauses governing plot allotment,
							soil development, infrastructure contributions, and township
							management.
						</p>
					</div>

					{/* 2-Column Vertical Tab Showcase Architecture */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
						{/* Left Column: Vertical Scrollable Interactive Clause Tabs */}
						<div className="lg:col-span-5 max-h-[520px] overflow-y-auto pr-2 space-y-3 scrollbar-thin">
							{TERMS_AND_CONDITIONS.map((clause, idx) => {
								const isActive = activeClauseIdx === idx;
								return (
									<div
										key={clause.num}
										onClick={() => setActiveClauseIdx(idx)}
										className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
											isActive
												? "bg-card border-primary/50 shadow-md pl-6 border-l-4 border-l-primary"
												: "bg-card/60 border-border/50 hover:bg-card hover:border-border"
										}`}
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<span className="text-xs font-mono font-medium text-primary shrink-0">
													{clause.num}
												</span>
												<h3 className="text-sm sm:text-base font-semibold font-heading text-foreground line-clamp-1">
													{clause.title}
												</h3>
											</div>
											<ArrowUpRight
												className={`w-4 h-4 shrink-0 transition-transform ${
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

						{/* Right Column: Dynamic Clause Feature Showcase Panel */}
						<div className="lg:col-span-7 bg-card border border-border/60 rounded-3xl p-8 sm:p-10 shadow-xs flex flex-col justify-between relative overflow-hidden space-y-6 min-h-[480px]">
							<div
								className="absolute inset-0 opacity-[0.03] pointer-events-none"
								style={{
									backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
									backgroundSize: "24px 24px",
								}}
							/>

							<AnimatePresence mode="wait">
								<motion.div
									key={activeClauseIdx}
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -12 }}
									transition={{ duration: 0.35, ease: "easeOut" }}
									className="space-y-6 relative z-10"
								>
									{/* Header Row */}
									<div className="flex items-center justify-between border-b border-border/40 pb-4">
										<span className="text-xs font-mono font-medium text-primary uppercase tracking-widest">
											CLAUSE {TERMS_AND_CONDITIONS[activeClauseIdx].num} OF 18
										</span>
										<span className="text-xs font-medium font-heading text-accent">
											Silicon Standard Verified
										</span>
									</div>

									{/* Title & Description */}
									<div className="space-y-3">
										<span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary">
											{TERMS_AND_CONDITIONS[activeClauseIdx].tag}
										</span>

										<h3 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground">
											{TERMS_AND_CONDITIONS[activeClauseIdx].title}
										</h3>

										<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
											{TERMS_AND_CONDITIONS[activeClauseIdx].text}
										</p>
									</div>

									{/* Key Highlights & Benefits */}
									<div className="space-y-2 pt-2">
										<span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground font-heading block">
											KEY HIGHLIGHTS & BENEFITS:
										</span>
										<div className="flex flex-wrap gap-2">
											{TERMS_AND_CONDITIONS[activeClauseIdx].highlights.map(
												(h) => (
													<span
														key={h}
														className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary"
													>
														<CheckCircle2 className="w-3.5 h-3.5 text-primary" />
														{h}
													</span>
												),
											)}
										</div>
									</div>

									{/* Primary Action Button */}
									<div className="pt-4 border-t border-border/40">
										<a
											href="/assets/silicon-membership-form.pdf"
											download
											className="group bg-primary text-primary-foreground h-12 px-7 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-md gap-2"
										>
											DOWNLOAD MEMBERSHIP FORM (PDF)
											<Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
										</a>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── 4. PRINTABLE APPLICATION FORM PREVIEW ── */}
			<section className="py-20 sm:py-24 bg-background border-b border-border/50">
				<SectionContainer className="space-y-12">
					<div className="max-w-3xl text-left space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							SAMPLE FORM OUTLINE
						</span>
						<h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
							Printable Application Form Preview
						</h2>
						<p className="text-muted-foreground text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Preview of required application fields inside the official
							printable PDF document.
						</p>
					</div>

					<div className="bg-card border border-border/60 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 max-w-4xl mx-auto">
						<div className="border-b border-border/50 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
							<div>
								<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
									FORM TITLE:
								</span>
								<h3 className="text-xl font-semibold font-heading text-foreground">
									Application Form for Membership in "Silicon City"
								</h3>
							</div>
							<div className="text-xs text-muted-foreground space-y-0.5 sm:text-right">
								<p className="font-semibold text-foreground">
									Silicon Real Estate (Pvt.) Ltd.
								</p>
								<p>
									2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka-1207
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="bg-muted/40 border border-border/40 rounded-2xl p-5 space-y-2">
								<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
									1. APPLICANT'S BASIC INFO
								</span>
								<ul className="space-y-1 text-xs text-muted-foreground font-light">
									<li>• Applicant's Full Name</li>
									<li>• Father's Name / Husband's Name</li>
									<li>• Mother's Name & Present/Permanent Address</li>
									<li>• Phone / Mobile Number & NID Number</li>
								</ul>
							</div>

							<div className="bg-muted/40 border border-border/40 rounded-2xl p-5 space-y-2">
								<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
									2. REPRESENTATIVE & NOMINEE
								</span>
								<ul className="space-y-1 text-xs text-muted-foreground font-light">
									<li>• Representative Name & Relationship</li>
									<li>• Representative Address & NID Number</li>
									<li>• Nominee / Legal Heir Details</li>
								</ul>
							</div>

							<div className="bg-muted/40 border border-border/40 rounded-2xl p-5 space-y-2">
								<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
									3. LAND & PLOT DETAILS
								</span>
								<ul className="space-y-1 text-xs text-muted-foreground font-light">
									<li>• R.S. Dag Number (আর.এস. দাগ নম্বর)</li>
									<li>• B.S. Dag Number (বি.এস. দাগ নম্বর)</li>
									<li>• Land Amount in Decimals or Katha</li>
								</ul>
							</div>

							<div className="bg-muted/40 border border-border/40 rounded-2xl p-5 space-y-2">
								<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
									4. VERIFICATION PANEL
								</span>
								<ul className="space-y-1 text-xs text-muted-foreground font-light">
									<li>• Signature of Office Supervisor</li>
									<li>• Signature of Director / Managing Director</li>
									<li>• Signature of Chairman</li>
								</ul>
							</div>
						</div>

						<div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-2">
							<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
								APPLICANT'S DECLARATION
							</span>
							<p className="text-xs text-muted-foreground font-light leading-relaxed italic">
								"I, being attracted to the 'Silicon City' project under Silicon
								Real Estate (Pvt.) Ltd., wish to include my land into this
								project and acquire official membership. My ultimate objective
								is to secure a fair development of my land and emerge as a proud
								plot owner in Silicon City."
							</p>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── 5. OFFLINE PROCESS NOTICE & DOWNLOAD BANNER ── */}
			<section className="py-20 sm:py-24 bg-background">
				<SectionContainer>
					<div className="bg-dark-hero rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8 relative overflow-hidden border border-white/15">
						<div
							className="absolute inset-0 opacity-[0.08] pointer-events-none"
							style={{
								backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
								backgroundSize: "24px 24px",
							}}
						/>

						<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/15 pb-8">
							<div className="lg:col-span-8 space-y-3">
								<span className="inline-block px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium uppercase tracking-widest text-accent font-heading">
									OFFLINE PROCESS NOTICE
								</span>
								<h2 className="text-2xl sm:text-3xl font-semibold font-heading text-white tracking-tight">
									Download Official Membership Form
								</h2>
								<p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
									Download the printable PDF application form, attach your NID
									copies and photographs, and submit it at our Mohammadpur
									Corporate Office with the BDT 1,000 application fee.
								</p>
							</div>

							<div className="lg:col-span-4 flex flex-wrap items-center justify-start lg:justify-end gap-3">
								<a
									href="/assets/silicon-membership-form.pdf"
									download
									className="group bg-primary text-primary-foreground h-12 px-6 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-md gap-2"
								>
									DOWNLOAD MEMBERSHIP FORM (PDF)
									<Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
								</a>
								<Link
									href="/contact"
									className="group bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 h-12 px-6 rounded-xl font-medium text-xs sm:text-sm font-heading inline-flex items-center justify-center transition-all gap-2"
								>
									VIEW OFFICE LOCATION
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</div>

						<div className="relative z-10 pt-4 text-xs text-white/70 font-heading">
							Hotlines:{" "}
							<span className="text-accent font-semibold">
								+880 12 345 678 / +880 1712 345 678
							</span>{" "}
							| Corporate Office: 2/3 (2nd Floor), Block # A, Iqbal Road,
							Mohammadpur, Dhaka-1207
						</div>
					</div>
				</SectionContainer>
			</section>
		</div>
	);
}
