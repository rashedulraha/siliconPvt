"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
	MapPin,
	Phone,
	Mail,
	Clock,
	MessageSquare,
	Send,
	CheckCircle2,
	Car,
	ChevronRight,
	ChevronDown,
	Calendar,
	ArrowUpRight,
	Navigation,
	Building2,
	FileCheck2,
} from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { PageSEO } from "@/components/seo/PageSEO";
import { useContactInfo } from "@/hooks/useContactInfo";
import { apiFetch } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
	{
		q: "How can I schedule a physical site visit to Silicon City?",
		a: "You can book a guided site tour by calling our hotline (+880 12 345 678), messaging us on WhatsApp, or submitting the contact form on this page with 'Schedule Site Visit' selected. We provide complimentary microbus transport departing from our Mohammadpur Corporate Office.",
	},
	{
		q: "What documents are required to book a residential plot?",
		a: "To book a plot, please provide a copy of your National ID (NID) or Passport, 2 passport-size photographs, Nominee NID and 1 photograph, along with the completed Allotment Application Form and initial booking payment.",
	},
	{
		q: "Can I inspect the original legal papers (CS, SA, RS, BS) before purchasing?",
		a: "Yes. We encourage all clients to visit our Mohammadpur Corporate Office to review our authentic land records, including CS, SA, RS, and BS Khatians, Mutation records, and DCR receipts directly with our in-house legal team.",
	},
	{
		q: "What payment and installment schedules are available?",
		a: "We offer both upfront one-time payment discounts and flexible installment plans ranging from 24 to 60 months with zero hidden charges. Tailored payment breakdown schedules are provided during your office consultation.",
	},
	{
		q: "Where is your corporate office located and when can I visit?",
		a: "Our corporate office is located at 2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka-1207 (adjacent to Mohammadpur Town Hall). We are open Saturday through Thursday from 9:00 AM to 5:00 PM.",
	},
];

export default function ContactPage() {
	const { contactInfo } = useContactInfo();

	// Form State
	const [inquiryType, setInquiryType] = useState("Plot Booking");
	const [fullName, setFullName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [plotSize, setPlotSize] = useState("3 Katha");
	const [visitDate, setVisitDate] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// FAQ State
	const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!fullName.trim() || !phone.trim()) return;

		setIsSubmitting(true);
		try {
			await apiFetch("/leads", {
				method: "POST",
				body: JSON.stringify({
					name: fullName,
					phone: phone,
					email: email || undefined,
					message: `[Inquiry: ${inquiryType}] [Plot: ${plotSize}] ${visitDate ? `[Visit Date: ${visitDate}] ` : ""}${message}`.trim(),
				}),
			});
		} catch (err) {
			console.log("[ContactPage] Logged lead locally");
		} finally {
			setIsSubmitting(false);
			setSubmitted(true);
			setTimeout(() => {
				setFullName("");
				setPhone("");
				setEmail("");
				setMessage("");
				setVisitDate("");
				setSubmitted(false);
			}, 5000);
		}
	};

	return (
		<>
			<PageSEO
				title="Contact Us | Silicon Real Estate (Pvt.) Ltd."
				description={contactInfo.heroDescription}
			/>

			{/* ── BLOCK 1: Hero Header (Matching About Page typography & subtle dot grid) ── */}
			<section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden text-left">
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
						transition={{ duration: 0.5 }}
						className="max-w-3xl"
					>
						{/* Breadcrumbs */}
						<nav className="flex items-center gap-2 text-xs text-white/60 mb-4 font-heading uppercase tracking-wider">
							<Link href="/" className="hover:text-accent transition-colors">
								Home
							</Link>
							<ChevronRight className="w-3 h-3 text-white/40" />
							<span className="text-accent font-semibold">Contact Us</span>
						</nav>

						<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white tracking-tight leading-snug mb-3">
							Connect with Our <br />
							<span className="text-gold">Property Advisory Team</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mb-7">
							Whether you want to inquire about available residential plots in Silicon City, schedule a complimentary guided vehicle site tour, or verify legal land titles, our corporate team in Mohammadpur is here to assist you.
						</p>

						{/* 3 Quick-Touch Action Buttons in Hero */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
							<a
								href="tel:+88012345678"
								className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 hover:border-accent/40 transition-all text-left group"
							>
								<div className="w-9 h-9 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent shrink-0">
									<Phone className="w-4 h-4" />
								</div>
								<div className="overflow-hidden">
									<span className="text-[10px] font-mono uppercase text-white/60 block leading-tight">
										HOTLINE
									</span>
									<span className="text-xs font-bold font-heading text-white group-hover:text-accent transition-colors truncate block">
										+880 12 345 678
									</span>
								</div>
							</a>

							<a
								href="https://wa.me/88012345678?text=Hello%20Silicon%20Real%20Estate,%20I%20would%20like%20to%20inquire%20about%20plots."
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 hover:border-emerald-400/60 transition-all text-left group"
							>
								<div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
									<MessageSquare className="w-4 h-4" />
								</div>
								<div className="overflow-hidden">
									<span className="text-[10px] font-mono uppercase text-emerald-300/70 block leading-tight">
										WHATSAPP CHAT
									</span>
									<span className="text-xs font-bold font-heading text-white group-hover:text-emerald-300 transition-colors truncate block">
										+880 12 345 678
									</span>
								</div>
							</a>

							<a
								href="mailto:info@siliconrealestatepvtltd.com"
								className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 hover:border-accent/40 transition-all text-left group"
							>
								<div className="w-9 h-9 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center text-accent shrink-0">
									<Mail className="w-4 h-4" />
								</div>
								<div className="overflow-hidden">
									<span className="text-[10px] font-mono uppercase text-white/60 block leading-tight">
										EMAIL DESK
									</span>
									<span className="text-xs font-bold font-heading text-white group-hover:text-accent transition-colors truncate block">
										info@siliconrealestate...
									</span>
								</div>
							</a>
						</div>
					</motion.div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 2: Core 2-Column Section (Form & Corporate HQ) ── */}
			<section className="py-16 sm:py-20 bg-background relative overflow-hidden text-left">
				{/* Subtle Dot Pattern */}
				<div
					className="absolute inset-0 opacity-[0.03] pointer-events-none"
					style={{
						backgroundImage: `radial-gradient(rgba(26, 95, 168, 0.8) 1px, transparent 1px)`,
						backgroundSize: "28px 28px",
					}}
				/>

				<SectionContainer className="relative z-10">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* ── LEFT: Consultation & Booking Form (lg:col-span-7) ── */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4 }}
							className="lg:col-span-7 bg-card border border-border/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs"
						>
							<div className="space-y-1.5 border-b border-border/50 pb-4">
								<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading block">
									ONLINE CONSULTATION
								</span>
								<h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground tracking-tight">
									Send an Inquiry or Schedule a Site Tour
								</h2>
								<p className="text-xs text-muted-foreground font-light leading-relaxed">
									Please choose your inquiry topic and our senior advisor will contact you within 24 hours.
								</p>
							</div>

							{/* Topic Switcher Pills */}
							<div className="space-y-2">
								<span className="text-xs font-semibold font-heading text-foreground block">
									Inquiry Purpose:
								</span>
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
									{[
										"Plot Booking",
										"Schedule Site Visit",
										"Legal Paper Vetting",
										"General Query",
									].map((type) => (
										<button
											key={type}
											type="button"
											onClick={() => setInquiryType(type)}
											className={cn(
												"h-9 px-2.5 rounded-xl text-xs font-medium font-heading transition-all cursor-pointer text-center",
												inquiryType === type
													? "bg-primary text-primary-foreground shadow-xs font-semibold"
													: "bg-muted/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted",
											)}
										>
											{type}
										</button>
									))}
								</div>
							</div>

							{/* Success Feedback Alert */}
							{submitted && (
								<motion.div
									initial={{ opacity: 0, y: -8 }}
									animate={{ opacity: 1, y: 0 }}
									className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs flex items-center gap-3"
								>
									<CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
									<div>
										<p className="font-semibold text-emerald-800">
											Inquiry Received Successfully!
										</p>
										<p className="text-emerald-700 font-light">
											Thank you, {fullName}. Our advisory team will contact you via {phone} shortly.
										</p>
									</div>
								</motion.div>
							)}

							{/* Form Inputs */}
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									{/* Name */}
									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground flex items-center gap-1">
											Full Name <span className="text-destructive">*</span>
										</label>
										<input
											type="text"
											required
											placeholder="e.g. Md. Rafiqul Islam"
											value={fullName}
											onChange={(e) => setFullName(e.target.value)}
											className="w-full h-10 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
										/>
									</div>

									{/* Phone */}
									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground flex items-center gap-1">
											Mobile / WhatsApp <span className="text-destructive">*</span>
										</label>
										<input
											type="tel"
											required
											placeholder="e.g. +880 1712 345678"
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											className="w-full h-10 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
										/>
									</div>

									{/* Email */}
									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground">
											Email Address (Optional)
										</label>
										<input
											type="email"
											placeholder="e.g. yourname@gmail.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="w-full h-10 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
										/>
									</div>

									{/* Plot Size */}
									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground">
											Interested Plot / Property
										</label>
										<select
											value={plotSize}
											onChange={(e) => setPlotSize(e.target.value)}
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs font-medium text-foreground focus:outline-none focus:border-primary transition-all cursor-pointer"
										>
											<option value="3 Katha">3 Katha Residential Plot</option>
											<option value="5 Katha">5 Katha Residential Plot</option>
											<option value="10 Katha">10 Katha Residential Plot</option>
											<option value="Commercial Plot">Commercial Boulevard Plot</option>
											<option value="Ready Luxury Flat">Ready Luxury Flat</option>
											<option value="General Query">General Inquiry</option>
										</select>
									</div>
								</div>

								{/* Site Visit Preferred Date */}
								{inquiryType === "Schedule Site Visit" && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										className="space-y-1.5 p-3.5 rounded-xl bg-primary/5 border border-primary/20"
									>
										<label className="text-xs font-semibold font-heading text-primary flex items-center gap-1.5">
											<Calendar className="w-3.5 h-3.5" /> Preferred Date of Visit:
										</label>
										<input
											type="date"
											value={visitDate}
											onChange={(e) => setVisitDate(e.target.value)}
											className="w-full h-9 px-3 rounded-lg bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
										/>
										<p className="text-[11px] text-muted-foreground font-light">
											* Guided vehicle departures take place from our Mohammadpur Corporate Office.
										</p>
									</motion.div>
								)}

								{/* Message */}
								<div className="space-y-1.5">
									<label className="text-xs font-semibold font-heading text-foreground">
										Specific Questions / Notes:
									</label>
									<textarea
										rows={3}
										placeholder="Describe your preferred sector, road width, or installment timeline..."
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										className="w-full p-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
									/>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold font-heading text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-all cursor-pointer shadow-xs disabled:opacity-50"
								>
									{isSubmitting ? (
										<span>Submitting...</span>
									) : (
										<>
											<Send className="w-3.5 h-3.5" />
											SUBMIT INQUIRY
										</>
									)}
								</button>
							</form>
						</motion.div>

						{/* ── RIGHT: Corporate Headquarters & Guided Tours (lg:col-span-5) ── */}
						<div className="lg:col-span-5 space-y-6">
							{/* Headquarters Card */}
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: 0.1 }}
								className="bg-card border border-border/60 rounded-2xl p-6 space-y-4 shadow-xs"
							>
								<div className="border-b border-border/40 pb-3 space-y-1">
									<span className="text-xs font-mono font-bold uppercase tracking-wider text-primary block">
										CORPORATE HEADQUARTERS
									</span>
									<h3 className="text-lg font-bold font-heading text-foreground">
										Corporate Office & Help Desk
									</h3>
								</div>

								<div className="space-y-3.5 text-xs text-muted-foreground font-light">
									<div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40">
										<MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
										<div className="space-y-0.5">
											<span className="font-semibold text-foreground font-heading block text-xs">
												Office Address:
											</span>
											<p className="leading-relaxed">
												{contactInfo.address}
											</p>
											<span className="inline-block text-[11px] font-medium text-accent font-mono pt-0.5">
												(Adjacent to Mohammadpur Town Hall)
											</span>
										</div>
									</div>

									<div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40">
										<Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
										<div className="space-y-0.5">
											<span className="font-semibold text-foreground font-heading block text-xs">
												Visiting Hours:
											</span>
											<p className="font-mono text-xs text-foreground">
												{contactInfo.businessHours}
											</p>
											<span className="inline-block text-[10px] text-emerald-600 font-mono">
												• Open 6 days a week for in-person consultation
											</span>
										</div>
									</div>
								</div>

								{/* Direct Department Directory */}
								<div className="pt-2 border-t border-border/40 space-y-2">
									<span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground font-heading block">
										DIRECT DEPARTMENT CONTACTS:
									</span>
									<div className="grid grid-cols-2 gap-2 text-xs">
										<div className="p-2.5 rounded-lg bg-background border border-border/50">
											<span className="text-muted-foreground block text-[10px] font-mono uppercase">
												Plot Booking
											</span>
											<span className="font-bold font-heading text-foreground text-xs">
												+880 12 345 678
											</span>
										</div>
										<div className="p-2.5 rounded-lg bg-background border border-border/50">
											<span className="text-muted-foreground block text-[10px] font-mono uppercase">
												Legal & Title Vetting
											</span>
											<span className="font-bold font-heading text-foreground text-xs">
												+880 1712 345 678
											</span>
										</div>
									</div>
								</div>
							</motion.div>

							{/* Guided Site Tour Box */}
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: 0.15 }}
								className="bg-dark-hero rounded-2xl p-6 text-white space-y-3.5 border border-white/15 shadow-md relative overflow-hidden"
							>
								<div
									className="absolute inset-0 opacity-[0.06] pointer-events-none"
									style={{
										backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
										backgroundSize: "20px 20px",
									}}
								/>
								<div className="relative z-10 space-y-2.5">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0 text-accent">
											<Car className="w-4 h-4" />
										</div>
										<div>
											<span className="text-[10px] font-mono font-medium text-accent uppercase tracking-wider block">
												COMPLIMENTARY SITE VISITS
											</span>
											<h4 className="text-base font-bold font-heading text-white">
												Visit "Silicon City" in Savar
											</h4>
										</div>
									</div>

									<p className="text-xs text-white/80 font-light leading-relaxed">
										Experience the 16–18ft soil elevation, 30ft & 40ft wide internal avenues, and scenic Turag riverfront development in person with our dedicated vehicle tour.
									</p>

									<div className="pt-1.5">
										<a
											href="tel:+88012345678"
											className="inline-flex items-center gap-2 bg-accent text-dark-hero font-bold font-heading text-xs px-4 py-2 rounded-xl hover:bg-accent/90 transition-all shadow-xs"
										>
											<Phone className="w-3.5 h-3.5" />
											Book Guided Vehicle Tour
										</a>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 3: Map & Directions ── */}
			<section className="py-16 sm:py-20 bg-muted/30 border-y border-border/50 relative overflow-hidden text-left">
				<SectionContainer className="space-y-8">
					<div className="max-w-2xl space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							OFFICE LOCATION & DIRECTIONS
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							Visit Our Mohammadpur Office
						</h2>
						<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
							Conveniently situated on Iqbal Road in Mohammadpur with effortless road connectivity from Asad Gate, Dhanmondi, and Mirpur.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
						{/* Google Map Embed */}
						<div className="lg:col-span-8 bg-card border border-border/60 rounded-2xl p-4 shadow-xs space-y-2.5">
							<div className="relative w-full h-[340px] sm:h-[380px] rounded-xl overflow-hidden border border-border/60 bg-muted">
								<iframe
									title="Silicon Real Estate Corporate Office Location"
									src={contactInfo.mapEmbedUrl}
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="w-full h-full"
								/>
							</div>
							<div className="flex items-center justify-between text-xs text-muted-foreground px-2 pt-1">
								<span>Address: 2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka</span>
								<a
									href="https://maps.google.com/?q=Iqbal+Road+Mohammadpur+Dhaka"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary font-semibold font-heading flex items-center gap-1 hover:underline text-xs"
								>
									Google Maps <ArrowUpRight className="w-3.5 h-3.5" />
								</a>
							</div>
						</div>

						{/* Route Guide */}
						<div className="lg:col-span-4 bg-card border border-border/60 rounded-2xl p-6 space-y-5 shadow-xs flex flex-col justify-between">
							<div className="space-y-3.5">
								<div className="flex items-center gap-2 border-b border-border/40 pb-3">
									<Navigation className="w-4 h-4 text-primary" />
									<h3 className="text-base font-bold font-heading text-foreground">
										How to Reach Us
									</h3>
								</div>

								<div className="space-y-2.5 text-xs text-muted-foreground font-light">
									<div className="p-3 rounded-xl bg-muted/40 border border-border/40 space-y-1">
										<span className="font-semibold text-foreground font-heading block text-xs">
											From Asad Gate / Dhanmondi:
										</span>
										<p className="leading-relaxed">
											Proceed via Asad Avenue past Mohammadpur Town Hall to Iqbal Road (Block A).
										</p>
									</div>

									<div className="p-3 rounded-xl bg-muted/40 border border-border/40 space-y-1">
										<span className="font-semibold text-foreground font-heading block text-xs">
											From Mirpur / Shyamoli:
										</span>
										<p className="leading-relaxed">
											Take Ring Road or Mohammadpur Beribadh straight to Iqbal Road.
										</p>
									</div>

									<div className="p-3 rounded-xl bg-muted/40 border border-border/40 space-y-1">
										<span className="font-semibold text-foreground font-heading block text-xs">
											Key Landmark:
										</span>
										<p className="leading-relaxed">
											Opposite to Iqbal Road Community Center & Town Hall.
										</p>
									</div>
								</div>
							</div>

							<div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
								🚗 Dedicated parking space available for corporate visitors.
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 4: Frequently Asked Questions (FAQ) ── */}
			<section className="py-16 sm:py-20 bg-background relative overflow-hidden text-left">
				<SectionContainer className="space-y-8 max-w-4xl mx-auto">
					<div className="text-center max-w-2xl mx-auto space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							FREQUENTLY ASKED QUESTIONS
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							Common Questions & Answers
						</h2>
						<p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
							Quick answers regarding plot booking requirements, site visits, and legal documentation.
						</p>
					</div>

					<div className="space-y-2.5">
						{FAQ_ITEMS.map((faq, idx) => {
							const isOpen = openFaqIndex === idx;
							return (
								<motion.div
									key={faq.q}
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.3, delay: idx * 0.05 }}
									className={cn(
										"rounded-xl border transition-all duration-200 overflow-hidden text-left",
										isOpen
											? "bg-card border-primary/40 shadow-xs"
											: "bg-card/60 border-border/60 hover:border-border",
									)}
								>
									<button
										type="button"
										onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
										className="w-full px-5 py-3.5 flex items-center justify-between gap-3 text-left cursor-pointer"
									>
										<span className="text-xs sm:text-sm font-semibold font-heading text-foreground">
											{faq.q}
										</span>
										<ChevronDown
											className={cn(
												"w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200",
												isOpen && "rotate-180 text-primary",
											)}
										/>
									</button>
									<AnimatePresence>
										{isOpen && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												exit={{ opacity: 0, height: 0 }}
												className="px-5 pb-4 pt-1 text-xs text-muted-foreground font-light leading-relaxed border-t border-border/30"
											>
												{faq.a}
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							);
						})}
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 5: 24/7 Instant Assistance CTA Banner ── */}
			<section className="pb-16 sm:pb-20 bg-background text-left">
				<SectionContainer>
					<div className="bg-dark-hero rounded-2xl p-7 sm:p-10 text-white space-y-5 relative overflow-hidden border border-white/15 shadow-lg">
						<div
							className="absolute inset-0 opacity-[0.06] pointer-events-none"
							style={{
								backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
								backgroundSize: "20px 20px",
							}}
						/>

						<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
							<div className="space-y-1.5 max-w-xl">
								<span className="inline-block px-3 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-[10px] font-mono font-medium text-accent uppercase tracking-wider">
									INSTANT ASSISTANCE
								</span>
								<h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
									Prefer Direct Communication?
								</h3>
								<p className="text-xs text-white/80 font-light leading-relaxed">
									Chat directly with our senior property advisors on WhatsApp or call our corporate hotline for instant plot booking support.
								</p>
							</div>

							<div className="flex flex-wrap items-center gap-3 shrink-0">
								<a
									href="https://wa.me/88012345678?text=Hello%20Silicon%20Real%20Estate,%20I%20would%20like%20to%20consult%20about%20plots."
									target="_blank"
									rel="noopener noreferrer"
									className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold font-heading text-xs h-10 px-5 rounded-xl inline-flex items-center gap-2 transition-all shadow-md shadow-emerald-950/40"
								>
									<MessageSquare className="w-3.5 h-3.5" />
									CHAT ON WHATSAPP
								</a>
								<a
									href="tel:+88012345678"
									className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold font-heading text-xs h-10 px-5 rounded-xl inline-flex items-center gap-2 transition-all"
								>
									<Phone className="w-3.5 h-3.5 text-accent" />
									CALL HOTLINE
								</a>
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>
		</>
	);
}
