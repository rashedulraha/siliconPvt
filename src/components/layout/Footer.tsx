"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Mail,
	Phone,
	MapPin,
	MessageSquare,
	ChevronRight,
	Send,
	ShieldCheck,
	Building2,
	FileText,
	ExternalLink,
	Lock,
	Facebook,
	Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { SectionContainer } from "../ui/section-container";
import { useLanguage } from "@/context/LanguageContext";
import { useContactInfo } from "@/hooks/useContactInfo";

export function Footer() {
	const { isBn } = useLanguage();
	const { contactInfo } = useContactInfo();
	const [email, setEmail] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const quickLinks = [
		{ label: isBn ? "হোম" : "Home", href: "/" },
		{ label: isBn ? "আমাদের সম্পর্কে" : "About Us", href: "/about" },
		{ label: isBn ? "প্রকল্পসমূহ" : "Projects", href: "/projects" },
		{ label: isBn ? "সেবাসমূহ" : "Services", href: "/services" },
		{ label: isBn ? "যোগাযোগ" : "Contact Us", href: "/contact" },
	];

	const usefulLinks = [
		{
			label: isBn ? "গোপনীয়তা নীতিমালা" : "Privacy Policy",
			href: "/privacy-terms",
		},
		{
			label: isBn ? "শর্তাবলী ও নিয়মাবলী" : "Terms of Service",
			href: "/privacy-terms",
		},
		{
			label: isBn ? "সাইট ভিজিট বুকিং" : "Schedule Site Visit",
			href: "/contact",
		},
		{
			label: isBn ? "এডমিন লগইন পোর্টাল" : "Admin Login Portal",
			href: "/admin/login",
		},
	];

	const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			toast.error(
				isBn
					? "অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস লিখুন।"
					: "Please enter a valid email address.",
			);
			return;
		}
		setSubmitting(true);
		setTimeout(() => {
			toast.success(
				isBn
					? "সিলিকন রিয়েল এস্টেটের সাথে যুক্ত হওয়ার জন্য ধন্যবাদ!"
					: "Thank you for subscribing to Silicon Real Estate updates!",
			);
			setEmail("");
			setSubmitting(false);
		}, 800);
	};

	// Dynamic contact information with robust defaults
	const displayAddress = isBn
		? contactInfo.addressBn ||
			contactInfo.address ||
			"২/৩ (২য় তলা), ব্লক # এ, ইকবাল রোড, মোহাম্মদপুর, ঢাকা-১২০৭"
		: contactInfo.address ||
			"2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur, Dhaka-1207";

	const displayPhone =
		contactInfo.phone || "+880 12 345 678 / +880 1712 345 678";
	const phoneCallDigits = (contactInfo.phone || "+88012345678")
		.split("/")[0]
		.trim()
		.replace(/[^\d+]/g, "");

	const displayWhatsapp = contactInfo.whatsapp || "+880 1712 345 678";
	const whatsappDigits = (contactInfo.whatsapp || "+8801712345678").replace(
		/\D/g,
		"",
	);

	const displayEmail = contactInfo.email || "info@siliconrealestatepvtltd.com";

	const displayAbout = isBn
		? contactInfo.heroDescriptionBn ||
			"ঢাকার মোহাম্মদপুর সংলগ্ন পরিকল্পিত ও পরিবেশবান্ধব মেগা টাউনশিপ 'সিলিকন সিটি'। শতভাগ নিষ্কণ্টক মালিকানা, আধুনিক নাগরিক সুবিধা ও সহজ কিস্তিতে প্লট বরাদ্দ।"
		: contactInfo.heroDescription ||
			"A trusted pioneer in modern land development across Dhaka. RAJUK-compliant planned residential township in Silicon City with legal deed transparency.";

	return (
		<footer className="bg-dark-hero text-white border-t border-white/10 font-sans relative overflow-hidden">
			{/* Subtle Background Glows */}
			<div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-accent/5 blur-[120px] pointer-events-none" />

			{/* ── 1. TRUST STRIP BAR ── */}
			<div className="border-b border-white/10 py-6 bg-white/[0.02]">
				<SectionContainer>
					<div className="flex flex-wrap items-center justify-between gap-6 text-xs sm:text-sm font-heading font-medium text-white/80">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
								<ShieldCheck className="w-4 h-4 text-accent" />
							</div>
							<span>
								{isBn
									? "রাজউক মাস্টারপ্ল্যান আওতাভুক্ত হাউজিং টাউনশিপ"
									: "RAJUK Compliant Housing Township"}
							</span>
						</div>

						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
								<Building2 className="w-4 h-4 text-accent" />
							</div>
							<span>
								{isBn
									? "মোহাম্মদপুর সংলগ্ন মনোরম নদীতীরবর্তী লোকেশন"
									: "Mohammadpur Riverside Location"}
							</span>
						</div>

						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
								<FileText className="w-4 h-4 text-accent" />
							</div>
							<span>
								{isBn
									? "১০০% নির্ভেজাল ও নিষ্কণ্টক আইনগত দলিলপত্র"
									: "100% Legal Title Verification"}
							</span>
						</div>
					</div>
				</SectionContainer>
			</div>

			{/* ── 2. MAIN FOOTER CONTENT GRID ── */}
			<SectionContainer className="py-14 sm:py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 text-left">
					{/* COLUMN 1: BRANDING & CONTACT INFO (lg:col-span-4) */}
					<div className="lg:col-span-4 space-y-6">
						{/* Logo Image Header */}
						<Link href="/" className="flex items-center gap-3 w-fit group">
							<div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center shrink-0 border border-white/20 shadow-md">
								<Image
									src="/silicon.png"
									alt="Silicon Real Estate Logo"
									width={36}
									height={36}
									className="h-full w-full object-cover"
								/>
							</div>
							<div>
								<span className="font-heading font-semibold text-white text-base sm:text-lg tracking-tight block leading-tight">
									Silicon Real Estate (Pvt.) Ltd.
								</span>
								<span className="text-accent text-[10px] tracking-widest uppercase font-mono font-medium">
									{isBn
										? "গভঃ অনুমোদিত ল্যান্ড ডেভেলপার কোম্পানি"
										: "Official Land Development Company"}
								</span>
							</div>
						</Link>

						<p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light">
							{displayAbout}
						</p>

						{/* Corporate Address & Hotlines (Dynamic from DB) */}
						<div className="space-y-3 pt-2 text-xs font-light text-white/80">
							<div className="flex items-start gap-3">
								<MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
								<span className="leading-relaxed">{displayAddress}</span>
							</div>

							<div className="flex items-center gap-3">
								<Phone className="w-4 h-4 text-accent shrink-0" />
								{phoneCallDigits ? (
									<a
										href={`tel:${phoneCallDigits}`}
										className="hover:text-accent transition-colors underline-offset-2 hover:underline"
									>
										{displayPhone}
									</a>
								) : (
									<span>{displayPhone}</span>
								)}
							</div>

							<div className="flex items-center gap-3">
								<MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
								{whatsappDigits ? (
									<a
										href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
											isBn
												? "আসসালামু আলাইকুম, আমি সিলিকন সিটির প্লট সম্পর্কে বিস্তারিত জানতে আগ্রহী।"
												: "Hello, I am interested in Silicon City residential plots.",
										)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-emerald-300 transition-colors underline-offset-2 hover:underline"
									>
										{isBn
											? `হোয়াটসঅ্যাপ: ${displayWhatsapp}`
											: `WhatsApp: ${displayWhatsapp}`}
									</a>
								) : (
									<span>
										{isBn
											? `হোয়াটসঅ্যাপ: ${displayWhatsapp}`
											: `WhatsApp: ${displayWhatsapp}`}
									</span>
								)}
							</div>

							<div className="flex items-center gap-3">
								<Mail className="w-4 h-4 text-accent shrink-0" />
								<a
									href={`mailto:${displayEmail}`}
									className="hover:text-accent transition-colors underline-offset-2 hover:underline truncate"
								>
									{displayEmail}
								</a>
							</div>

							{/* Optional Dynamic Social Links */}
							{(contactInfo.facebookUrl || contactInfo.youtubeUrl) && (
								<div className="flex items-center gap-2 pt-1 text-[11px] text-white/70">
									{contactInfo.facebookUrl && (
										<a
											href={contactInfo.facebookUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 text-white/80 hover:text-blue-400 transition-all inline-flex items-center gap-1.5"
										>
											<Facebook className="w-3.5 h-3.5 text-blue-400" />
											<span>Facebook</span>
											<ExternalLink className="w-3 h-3 opacity-60" />
										</a>
									)}
									{contactInfo.youtubeUrl && (
										<a
											href={contactInfo.youtubeUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-400/40 text-white/80 hover:text-red-400 transition-all inline-flex items-center gap-1.5"
										>
											<Youtube className="w-3.5 h-3.5 text-red-500" />
											<span>YouTube</span>
											<ExternalLink className="w-3 h-3 opacity-60" />
										</a>
									)}
								</div>
							)}
						</div>
					</div>

					{/* COLUMN 2: QUICK LINKS (lg:col-span-3) */}
					<div className="lg:col-span-3 space-y-4">
						<h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-accent border-b border-white/10 pb-2">
							{isBn ? "দ্রুত নেভিগেশন" : "QUICK NAVIGATION"}
						</h3>
						<ul className="space-y-2.5">
							{quickLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-xs sm:text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-2 group"
									>
										<ChevronRight className="w-3.5 h-3.5 text-accent/60 group-hover:translate-x-1 transition-transform" />
										<span>{link.label}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* COLUMN 3: USEFUL LINKS & LEGAL POLICIES (lg:col-span-2) */}
					<div className="lg:col-span-2 space-y-4">
						<h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-accent border-b border-white/10 pb-2">
							{isBn ? "নীতিমালা ও পোর্টাল" : "USEFUL POLICIES"}
						</h3>
						<ul className="space-y-2.5">
							{usefulLinks.map((link) => (
								<li key={link.label}>
									<Link
										href={link.href}
										className="text-xs sm:text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-2 group"
									>
										<ChevronRight className="w-3.5 h-3.5 text-accent/60 group-hover:translate-x-1 transition-transform" />
										<span>{link.label}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* COLUMN 4: NEWSLETTER & BADGE (lg:col-span-3) */}
					<div className="lg:col-span-3 space-y-4">
						<h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-accent border-b border-white/10 pb-2">
							{isBn ? "আপডেট পান" : "STAY UPDATED"}
						</h3>
						<p className="text-xs text-white/70 font-light leading-relaxed">
							{isBn
								? "নতুন প্লট বুকিং বিজ্ঞপ্তি ও সাইট ভিজিট শিডিউল সম্পর্কে জানতে ইমেইল দিয়ে সাবস্ক্রাইব করুন।"
								: "Subscribe for official project updates, plot availability notices, and site visit schedules."}
						</p>

						<form onSubmit={handleNewsletter} className="space-y-2">
							<div className="relative flex items-center">
								<input
									type="email"
									placeholder={
										isBn ? "আপনার ইমেইল দিন..." : "Enter your email..."
									}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full h-11 pl-4 pr-12 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-accent"
								/>
								<button
									type="submit"
									disabled={submitting}
									className="absolute right-1.5 w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
									aria-label="Submit newsletter"
								>
									<Send className="w-3.5 h-3.5" />
								</button>
							</div>
						</form>

						{/* Corporate Office Badge Card with Image Accent */}
						<div className="pt-2">
							<div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-md">
								<div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-white/10">
									<Image
										src="/silicon.png"
										alt="Silicon City Thumbnail"
										fill
										className="object-contain"
									/>
								</div>
								<div className="space-y-0.5 text-left">
									<span className="text-[10px] font-mono text-accent font-semibold block">
										{isBn ? "সিলিকন সিটি টাউনশিপ" : "SILICON CITY TOWNSHIP"}
									</span>
									<span className="text-xs font-heading text-white font-medium block">
										{isBn ? "কর্পোরেট প্রধান কার্যালয়" : "Corporate Head Office"}
									</span>
									<span className="text-[10px] text-white/60 font-light block truncate max-w-[190px]">
										{isBn
											? contactInfo.addressBn || "মোহাম্মদপুর, ঢাকা"
											: contactInfo.address || "Mohammadpur, Dhaka"}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</SectionContainer>

			{/* ── 3. BOTTOM COPYRIGHT & DEVELOPER BAR ── */}
			<div className="border-t border-white/10 py-6 bg-black/30">
				<SectionContainer>
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
						<span>
							© 2026 Silicon Real Estate (Pvt.) Ltd.{" "}
							{isBn ? "সর্বস্বত্ব সংরক্ষিত।" : "All Rights Reserved."}
						</span>
						<span>
							{isBn ? "ডিজাইন ও ডেভেলপমেন্টে " : "Designed & Developed by "}
							<a
								href="https://www.exzazon.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 hover:text-accent font-medium text-white/80 transition-colors"
							>
								<span>Exzazon</span>
								<ExternalLink className="w-3 h-3 shrink-0" />
							</a>
						</span>
						<div className="flex items-center gap-4">
							<Link
								href="/privacy-terms"
								className="hover:text-accent transition-colors"
							>
								{isBn ? "শর্তাবলী" : "Terms"}
							</Link>
							<span>•</span>
							<Link
								href="/privacy-terms"
								className="hover:text-accent transition-colors"
							>
								{isBn ? "গোপনীয়তা নীতি" : "Privacy Policy"}
							</Link>
							<span>•</span>
							<Link
								href="/admin/login"
								className="hover:text-accent transition-colors inline-flex items-center gap-1 opacity-75 hover:opacity-100"
								title={isBn ? "এডমিন লগইন" : "Admin Login"}
							>
								<Lock className="w-3 h-3" />
								<span>{isBn ? "এডমিন" : "Admin"}</span>
							</Link>
						</div>
					</div>
				</SectionContainer>
			</div>
		</footer>
	);
}
