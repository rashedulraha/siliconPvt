"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Scale, Mail, ChevronRight } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useLanguage } from "@/context/LanguageContext";

const PRIVACY_SECTIONS_EN = [
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

const PRIVACY_SECTIONS_BN = [
	{
		id: "prv-1",
		num: "০১",
		title: "১. যেসব তথ্য আমরা সংগ্রহ করি",
		content:
			"সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ গ্রাহকের স্বেচ্ছায় প্রদত্ত তথ্য সংগ্রহ করে—যেমন পূর্ণ নাম, মোবাইল নম্বর, জাতীয় পরিচয়পত্র (NID) নম্বর, ইমেইল ও পছন্দসই প্লটের বিবরণ। এছাড়া ওয়েবসাইটের সাইবার সুরক্ষায় আইপি অ্যাড্রেস ও সেশন হিস্ট্রি সংরক্ষিত হয়।",
	},
	{
		id: "prv-2",
		num: "০২",
		title: "২. তথ্যের যথাযথ ব্যবহার",
		content:
			"সংগৃহীত তথ্যাদি প্লট অনুসন্ধান পর্যালোচনা, সাইট ভিজিট শিডিউল প্রস্তুতকরণ, অফিসিয়াল বরাদ্দপত্র প্রস্তুত এবং মানি রিসিট ইস্যুর উদ্দেশ্যে ব্যবহৃত হয়। আমরা কোনো অবস্থাতেই গ্রাহকের তথ্য তৃতীয় পক্ষের নিকট বিক্রয় বা ভাড়া দিই না।",
	},
	{
		id: "prv-3",
		num: "০৩",
		title: "৩. কুকিজ ও ট্র্যাকিং প্রযুক্তি",
		content:
			"আমাদের ওয়েবসাইট ব্রাউজিং অভিজ্ঞতা উন্নত ও নিরাপদ করতে সেশন কুকিজ ব্যবহার করে। কোনো অননুমোদিত বিজ্ঞাপনী ট্র্যাকিং পরিচালনা করা হয় না।",
	},
	{
		id: "prv-4",
		num: "০৪",
		title: "৪. তথ্য সুরক্ষা ও নিরাপত্তা ব্যবস্থা",
		content:
			"গ্রাহকের তথ্যের গোপনীয়তা রক্ষায় আমরা ২৫৬-বিট এসএসএল (SSL) এনক্রিপশন এবং নিরাপদ ডাটাবেজ প্রটোকল অনুসরণ করি। হার্ডকপি দলিলপত্র আমাদের মোহাম্মদপুর প্রধান কার্যালয়ে সার্বক্ষণিক নিরাপত্তায় সংরক্ষিত থাকে।",
	},
	{
		id: "prv-5",
		num: "০৫",
		title: "৫. গ্রাহকের অধিকার ও তথ্য সংশোধন",
		content:
			"যে কোনো সময়ে গ্রাহক তাঁর সংরক্ষিত তথ্য সংশোধন বা হালনাগাদ করার জন্য আমাদের মোহাম্মদপুর কাস্টমার সার্ভিসের সাথে যোগাযোগ করতে পারেন।",
	},
	{
		id: "prv-6",
		num: "০৬",
		title: "৬. আইনি এখতিয়ার ও বিচারিক বিধিমালা",
		content:
			"এই গোপনীয়তা নীতি গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইন ও বিচারিক কাঠামোর অধীনে পরিচালিত। যে কোনো ধরনের আইনি বিরোধ ঢাকা আদালতের এখতিয়ারভুক্ত হবে।",
	},
];

const TERMS_SECTIONS_EN = [
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

const TERMS_SECTIONS_BN = [
	{
		id: "tos-1",
		num: "০১",
		title: "১. ওয়েবসাইটের ব্যবহার ও সাধারণ শর্তাবলী",
		content:
			"এই প্ল্যাটফর্মটি সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ কর্তৃক প্রকল্প বিবরণ, প্লট বরাদ্দ ও গ্রাহক যোগাযোগের জন্য পরিচালিত। প্রদর্শিত সকল লেআউট, ছবি ও তথ্য সাধারণ নির্দেশিকা হিসেবে বিবেচিত এবং মূল বরাদ্দপত্র ও দলিলের শর্তাবলী চূড়ান্ত বলে গণ্য হবে।",
	},
	{
		id: "tos-2",
		num: "০২",
		title: "২. প্লট বরাদ্দ ও বুকিং নীতিমালা",
		content:
			"অনলাইনে অনুসন্ধান বা বুকিং ফরম পূরণ করলেই চূড়ান্ত মালিকানা হস্তান্তর সম্পন্ন হয় না। মোহাম্মদপুর কর্পোরেট অফিসে বুকিং ফি পরিশোধ, অফিসিয়াল মানি রিসিট এবং বরাদ্দপত্র (Allotment Letter) ইস্যু হওয়ার পরই তা আইনগতভাবে কার্যকর হবে।",
	},
	{
		id: "tos-3",
		num: "০৩",
		title: "৩. গ্রাহকের দায়িত্ব ও সততা",
		content:
			"ফরম পূরণের সময় সঠিক নাম, ঠিকানা ও এনআইডি নম্বর প্রদান করতে হবে। কোনো প্রকার ভুল তথ্য বা অসত্য বিবরণ প্রদান করা সম্পূর্ণ নিষিদ্ধ।",
	},
	{
		id: "tos-4",
		num: "০৪",
		title: "৪. মেধা ও স্বত্বাধিকার (Intellectual Property)",
		content:
			"ওয়েবসাইটে প্রকাশিত সকল মাস্টারপ্ল্যান, ছবি, লোগো, ভিডিও এবং কন্টেন্ট সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ-এর নিজস্ব সম্পদ। লিখিত অনুমতি ব্যতিরেকে বাণিজ্যিক উদ্দেশ্যে এগুলো কপি বা পুনঃব্যবহার আইনত দণ্ডনীয়।",
	},
	{
		id: "tos-5",
		num: "০৫",
		title: "৫. দায়বদ্ধতার সীমাবদ্ধতা",
		content:
			"সিলিকন রিয়েল এস্টেট সর্বদা সঠিক তথ্য প্রকাশে অঙ্গীকারবদ্ধ। তথাপি প্রকল্পের বাস্তব উন্নয়ন, রাজউকের পরিকল্পনা বা স্থানীয় প্রশাসনের দিকনির্দেশনা অনুযায়ী সামান্য পরিমার্জন ঘটতে পারে।",
	},
	{
		id: "tos-6",
		num: "০৬",
		title: "৬. প্রযোজ্য আইন ও আদালত",
		content:
			"এই নীতিমালা গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইন অনুযায়ী পরিচালিত এবং সকল বিরোধ নিষ্পত্তির ক্ষেত্রে ঢাকা আদালতের এখতিয়ার চূড়ান্ত হবে।",
	},
	{
		id: "tos-7",
		num: "০৭",
		title: "৭. আইনি পরামর্শ ডেস্ক",
		content:
			"যেকোনো আইনি প্রশ্ন, দলিল পরীক্ষণ অথবা শর্তাবলী সম্পর্কে বিস্তারিত জানতে আমাদের মোহাম্মদপুর প্রধান কার্যালয়ের লিগ্যাল ডেস্কে যোগাযোগ করুন।",
	},
];

export default function PrivacyTermsPage() {
	const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");
	const { isBn } = useLanguage();

	const privacySections = isBn ? PRIVACY_SECTIONS_BN : PRIVACY_SECTIONS_EN;
	const termsSections = isBn ? TERMS_SECTIONS_BN : TERMS_SECTIONS_EN;

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
								{isBn ? "হোম" : "Home"}
							</Link>
							<ChevronRight className="w-3 h-3 text-white/40" />
							<span className="text-accent font-semibold">{isBn ? "আইনি নীতিমালা" : "Legal"}</span>
							<ChevronRight className="w-3 h-3 text-white/40" />
							<span className="text-accent font-semibold">{isBn ? "গোপনীয়তা ও শর্তাবলী" : "Privacy & Terms"}</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
							{isBn ? "গোপনীয়তা নীতি ও " : "Privacy Policy & "}
							<span className="text-accent font-semibold">
								{isBn ? "সেবার শর্তাবলী" : "Terms of Service"}
							</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
							{isBn
								? "গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইন ও বিধিমালার আলোকে গ্রাহকের তথ্যের সুরক্ষা, প্ল্যাটফর্ম ব্যবহার ও কর্পোরেট আইনি কাঠামো।"
								: "Official legal charters governing data protection, platform usage, property inquiries, and corporate governance under the laws of the People's Republic of Bangladesh."}
						</p>

						<div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-white/70">
							<span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
								{isBn ? "সর্বশেষ হালনাগাদ: অগাস্ট ২০২৬" : "Last Updated: August 2026"}
							</span>
							<span className="px-3 py-1 rounded-full bg-accent/15 border border-accent/20 text-accent font-medium font-heading">
								{isBn ? "আইনি এখতিয়ার: ঢাকা, বাংলাদেশ" : "Jurisdiction: Dhaka, Bangladesh"}
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
								{isBn ? "গোপনীয়তা নীতি" : "Privacy Policy"}
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
								{isBn ? "সেবার শর্তাবলী" : "Terms of Service"}
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
												{isBn ? "গোপনীয়তা সুরক্ষা সনদ: SRE-PRV-2026-BD" : "PRIVACY COMPLIANCE DOC: SRE-PRV-2026-BD"}
											</span>
											<h2 className="text-xl font-semibold font-heading text-foreground">
												{isBn ? "সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ — ডাটা প্রটেকশন চার্টার" : "Silicon Real Estate (Pvt.) Ltd. — Data Protection Charter"}
											</h2>
										</div>
										<div className="flex items-center gap-2">
											<span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary inline-flex items-center gap-1.5">
												<ShieldCheck className="w-3.5 h-3.5 text-primary" />
												{isBn ? "২৫৬-বিট এসএসএল সুরক্ষিত" : "SSL 256-Bit Secured"}
											</span>
										</div>
									</div>

									{/* Policy Sections List */}
									<div className="space-y-8 divide-y divide-border/40">
										{privacySections.map((sec) => (
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
												{isBn ? "আইনি কর্পোরেট চার্টার: SRE-TOS-2026-BD" : "CORPORATE LEGAL CHARTER: SRE-TOS-2026-BD"}
											</span>
											<h2 className="text-xl font-semibold font-heading text-foreground">
												{isBn ? "সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ — প্রাতিষ্ঠানিক শর্তাবলী" : "Silicon Real Estate (Pvt.) Ltd. — Terms of Governance"}
											</h2>
										</div>
										<div className="flex items-center gap-2">
											<span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary inline-flex items-center gap-1.5">
												<Scale className="w-3.5 h-3.5 text-primary" />
												{isBn ? "বাংলাদেশ আইন এখতিয়ার" : "Bangladesh Jurisdiction"}
											</span>
										</div>
									</div>

									{/* Terms Clauses List */}
									<div className="space-y-8 divide-y divide-border/40">
										{termsSections.map((sec) => (
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
									{isBn
										? "কর্পোরেট অফিস: ২/৩ (২য় তলা), ব্লক-এ, ইকবাল রোড, মোহাম্মদপুর, ঢাকা-১২০৭"
										: "Corporate Office: 2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka-1207"}
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
									{isBn ? "আইনি ও প্রপার্টি সহায়তা ডেস্ক" : "LEGAL & PRIVACY ADVISORY DESK"}
								</span>
								<h3 className="text-lg font-semibold font-heading text-white">
									{isBn ? "আমাদের শর্তাবলী বা নীতিমালা সম্পর্কে কোনো প্রশ্ন আছে?" : "Questions About Our Policies or Terms?"}
								</h3>
								<p className="text-xs text-white/70 font-light">
									{isBn
										? "আমাদের মোহাম্মদপুর কর্পোরেট লিগ্যাল টিম দলিল যাচাই ও আইনি পরামর্শ প্রদানে প্রস্তুত।"
										: "Our legal team in Mohammadpur is available to assist with document requests, data updates, and deed vetting."}
								</p>
							</div>

							<div className="flex flex-wrap items-center gap-3 shrink-0">
								<Link
									href="/contact"
									className="bg-primary text-primary-foreground h-11 px-6 rounded-xl font-medium font-heading text-xs inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-xs gap-2"
								>
									<Mail className="w-4 h-4" />
									{isBn ? "আইনি ডেস্কে যোগাযোগ" : "CONTACT LEGAL DESK"}
								</Link>
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>
		</div>
	);
}
