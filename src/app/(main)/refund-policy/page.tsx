import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail, Scale } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

export const metadata: Metadata = {
	title: "Refund Policy | Silicon Real Estate (Pvt.) Ltd.",
	description:
		"Understand the refund terms for soil filling deposits, booking fees, and service charges at Silicon Real Estate (Pvt.) Ltd.",
};

const SECTIONS = [
	{
		id: "sec-1",
		num: "01",
		title: "1. Booking Deposit Refunds",
		content:
			"A booking deposit secures a plot reservation in Silicon City. Initial booking deposits are refundable if a written withdrawal request is submitted to our Mohammadpur Corporate Accounts Branch within 72 hours of initial booking payment. After 72 hours, booking deposits enter plot allocation processing.",
	},
	{
		id: "sec-2",
		num: "02",
		title: "2. Soil Filling & Development Fee Refunds (10% Service Charge)",
		content:
			"In accordance with Clause 16 of our Official Corporate Membership Charter, in case of formal refund requests for deposits made towards soil filling or earth-filling works, a 10% administrative service charge will be deducted from the total deposited amount before issuing the refund check.",
	},
	{
		id: "sec-3",
		num: "03",
		title: "3. Non-Refundable Processing Fees",
		content:
			"Application membership fees (BDT 1,000/- per plot) and deed verification fees are non-refundable once administrative document processing has commenced.",
	},
	{
		id: "sec-4",
		num: "04",
		title: "4. Processing Timeline & Money Receipts",
		content:
			"All approved refunds are disbursed exclusively via account payee cheque or direct bank transfer within 14-21 business days upon returning original Money Receipts and allotment documents.",
	},
];

export default function RefundPolicyPage() {
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
							<span className="text-accent font-semibold">Refund Policy</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
							Corporate{" "}
							<span className="text-accent font-semibold">Refund Policy</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
							Official corporate terms governing plot reservation deposits, soil
							filling refunds, and administrative service charges.
						</p>

						<div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-white/70">
							<span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
								Last Updated: August 2026
							</span>
							<span className="px-3 py-1 rounded-full bg-accent/15 border border-accent/20 text-accent font-medium font-heading">
								10% Service Charge Clause
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
										REFUND CHARTER DOC: SRE-RFD-2026-BD
									</span>
									<h2 className="text-xl font-semibold font-heading text-foreground">
										Silicon Real Estate (Pvt.) Ltd. — Refund Guidelines
									</h2>
								</div>
								<div className="flex items-center gap-2">
									<span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary inline-flex items-center gap-1.5">
										<Scale className="w-3.5 h-3.5 text-primary" />
										Accounts Branch Verified
									</span>
								</div>
							</div>

							{/* Policy Sections List */}
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

						{/* Quick Contact Bar */}
						<div className="bg-dark-hero rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/15">
							<div className="space-y-1 text-left">
								<span className="text-xs font-mono font-medium text-accent uppercase tracking-wider block">
									ACCOUNTS DESK ASSISTANCE
								</span>
								<h3 className="text-lg font-semibold font-heading text-white">
									Need Help With Deposit Receipts?
								</h3>
								<p className="text-xs text-white/70 font-light">
									Contact our Accounts Branch for money receipt verification or
									refund request tracking.
								</p>
							</div>

							<div className="flex flex-wrap items-center gap-3 shrink-0">
								<Link
									href="/contact"
									className="bg-primary text-primary-foreground h-11 px-6 rounded-xl font-medium font-heading text-xs inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-xs gap-2"
								>
									<Mail className="w-4 h-4" />
									CONTACT ACCOUNTS DESK
								</Link>
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>
		</div>
	);
}
