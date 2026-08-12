"use client";

import { useState } from "react";
import Link from "next/link";
import {
	MapPin,
	Phone,
	Mail,
	Clock,
	MessageSquare,
	Globe,
	Send,
	CheckCircle2,
	Car,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { PageSEO } from "@/components/seo/PageSEO";
import { useContactInfo } from "@/hooks/useContactInfo";

export default function ContactPage() {
	const { contactInfo } = useContactInfo();
	const [fullName, setFullName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("Plot Booking");
	const [message, setMessage] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!fullName || !phone) return;
		setSubmitted(true);
		setTimeout(() => {
			setFullName("");
			setPhone("");
			setEmail("");
			setSubject("Plot Booking");
			setMessage("");
			setSubmitted(false);
		}, 4000);
	};

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden">
			<PageSEO
				title="Contact Us | Silicon Real Estate (Pvt.) Ltd."
				description={contactInfo.heroDescription}
			/>

			{/* ── BLOCK 1: PAGE HEADER (DARK HERO WITHOUT GRADIENT/SHADOW) ── */}
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
					<div className="max-w-3xl space-y-4 text-left">
						{/* Breadcrumbs */}
						<div className="flex items-center gap-2 text-xs font-mono font-medium text-white/60">
							<Link href="/" className="hover:text-accent transition-colors">
								Home
							</Link>
							<span>&gt;</span>
							<span className="text-accent font-semibold">Contact Us</span>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
							{contactInfo.heroTitle}
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
							{contactInfo.heroDescription}
						</p>
					</div>
				</SectionContainer>
			</section>

			{/* ── MAIN CONTENT VIEWPORT (FLAT STRUCTURED LAYOUT) ── */}
			<section className="py-16 sm:py-20 bg-background">
				<SectionContainer>
					<div className="space-y-12 max-w-6xl mx-auto">
						{/* ── ROW 1: BLOCK 2 & BLOCK 3 (HEAD OFFICE INFO & BUSINESS HOURS) ── */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
							{/* BLOCK 2: Head Office Info (lg:col-span-7) */}
							<div className="lg:col-span-7 bg-card border border-border/70 rounded-3xl p-8 sm:p-10 space-y-6 text-left">
								<div className="space-y-1 border-b border-border/50 pb-4">
									<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
										BLOCK 2: CORPORATE HEADQUARTERS
									</span>
									<h2 className="text-xl sm:text-2xl font-semibold font-heading text-foreground">
										Corporate Head Office Information
									</h2>
								</div>

								<div className="space-y-4 text-xs sm:text-sm text-muted-foreground font-light">
									{/* Address */}
									<div className="flex items-start gap-3.5 p-4 rounded-2xl bg-muted/40 border border-border/40">
										<MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
										<div>
											<span className="font-semibold text-foreground font-heading block">
												Corporate Address:
											</span>
											<span>{contactInfo.address}</span>
										</div>
									</div>

									{/* Phone & Mobile */}
									<div className="flex items-start gap-3.5 p-4 rounded-2xl bg-muted/40 border border-border/40">
										<Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
										<div>
											<span className="font-semibold text-foreground font-heading block">
												Phone & Mobile Numbers:
											</span>
											<span>{contactInfo.phone}</span>
										</div>
									</div>

									{/* WhatsApp */}
									{contactInfo.whatsapp && (
										<div className="flex items-start gap-3.5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
											<MessageSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
											<div>
												<span className="font-semibold font-heading block">
													Official WhatsApp:
												</span>
												<span>
													{contactInfo.whatsapp}{" "}
													<span className="font-normal">
														(Message us instantly for quick support)
													</span>
												</span>
											</div>
										</div>
									)}

									{/* Emails & Website Grid */}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="flex items-start gap-3 p-4 rounded-2xl bg-muted/40 border border-border/40">
											<Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
											<div>
												<span className="font-semibold text-foreground font-heading block">
													Official Emails:
												</span>
												<span className="block truncate font-medium text-foreground">
													{contactInfo.email}
												</span>
												{contactInfo.secondaryEmail && (
													<span className="block truncate text-muted-foreground/80">
														{contactInfo.secondaryEmail}
													</span>
												)}
											</div>
										</div>

										<div className="flex items-start gap-3 p-4 rounded-2xl bg-muted/40 border border-border/40">
											<Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
											<div>
												<span className="font-semibold text-foreground font-heading block">
													Official Website:
												</span>
												<span className="text-primary font-medium">
													{contactInfo.website}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* BLOCK 3: Business Hours (lg:col-span-5) */}
							<div className="lg:col-span-5 bg-card border border-border/70 rounded-3xl p-8 sm:p-10 space-y-6 text-left flex flex-col justify-between">
								<div className="space-y-4">
									<div className="space-y-1 border-b border-border/50 pb-4">
										<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
											BLOCK 3: OFFICE HOURS
										</span>
										<h2 className="text-xl sm:text-2xl font-semibold font-heading text-foreground">
											Official Business Hours
										</h2>
									</div>

									<div className="p-4 rounded-2xl bg-muted/30 border border-border/40 text-xs sm:text-sm font-light text-foreground space-y-2">
										<div className="flex items-center gap-2 font-semibold font-heading text-primary">
											<Clock className="w-4 h-4" /> Schedule
										</div>
										<p className="leading-relaxed font-mono">
											{contactInfo.businessHours}
										</p>
									</div>
								</div>

								{contactInfo.imageUrl && (
									<div className="rounded-2xl overflow-hidden border border-border/60 max-h-48">
										<img
											src={contactInfo.imageUrl}
											alt="Corporate Office"
											className="w-full h-full object-cover"
										/>
									</div>
								)}

								<div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-xs font-light text-primary leading-relaxed">
									<strong>Note:</strong> For inquiries outside official business
									hours, please feel free to send us an email, and our team will
									get back to you on the next business day.
								</div>
							</div>
						</div>

						{/* ── ROW 2: SIDE-BY-SIDE — BLOCK 4 (CONTACT FORM) & BLOCK 5 (SITE VISIT NOTICE) ── */}
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
							{/* BLOCK 4: Contact Form (lg:col-span-7) */}
							<div className="lg:col-span-7 bg-card border border-border/70 rounded-3xl p-8 sm:p-10 space-y-8 text-left">
								<div className="space-y-1 border-b border-border/50 pb-4">
									<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
										BLOCK 4: INQUIRY FORM
									</span>
									<h2 className="text-2xl font-semibold font-heading text-foreground">
										Send a Message to Our Support Team
									</h2>
									<p className="text-xs sm:text-sm text-muted-foreground font-light">
										Fill out the form below, and our property consultants will
										contact you within 24 hours.
									</p>
								</div>

								{submitted && (
									<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
										<CheckCircle2 className="w-5 h-5 shrink-0" />
										<span>
											Thank you for your message! Our property consultant team
											will contact you within 24 hours.
										</span>
									</div>
								)}

								<form onSubmit={handleSubmit} className="space-y-5">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{/* Full Name */}
										<div className="space-y-1.5">
											<label className="text-xs font-medium font-heading text-foreground">
												Full Name <span className="text-rose-500">*</span>
											</label>
											<input
												type="text"
												required
												placeholder="Enter your full name"
												value={fullName}
												onChange={(e) => setFullName(e.target.value)}
												className="w-full h-11 px-4 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
											/>
										</div>

										{/* Phone Number */}
										<div className="space-y-1.5">
											<label className="text-xs font-medium font-heading text-foreground">
												Phone Number <span className="text-rose-500">*</span>
											</label>
											<input
												type="tel"
												required
												placeholder="Enter your active mobile number"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
												className="w-full h-11 px-4 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
											/>
										</div>

										{/* Email Address */}
										<div className="space-y-1.5">
											<label className="text-xs font-medium font-heading text-foreground">
												Email Address
											</label>
											<input
												type="email"
												placeholder="Enter your email address"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="w-full h-11 px-4 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
											/>
										</div>

										{/* Subject Dropdown */}
										<div className="space-y-1.5">
											<label className="text-xs font-medium font-heading text-foreground">
												Subject of Inquiry
											</label>
											<select
												value={subject}
												onChange={(e) => setSubject(e.target.value)}
												className="w-full h-11 px-4 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
											>
												<option value="Plot Booking">Plot Booking</option>
												<option value="Legal Document Verification">
													Legal Document Verification
												</option>
												<option value="Membership Status">
													Membership Status
												</option>
												<option value="Schedule Site Visit">
													Schedule Site Visit
												</option>
												<option value="Others">Others</option>
											</select>
										</div>
									</div>

									{/* Message Textarea */}
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											Your Message
										</label>
										<textarea
											rows={4}
											placeholder="Type your message or questions here..."
											value={message}
											onChange={(e) => setMessage(e.target.value)}
											className="w-full p-4 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
										/>
									</div>

									<button
										type="submit"
										className="w-full h-12 px-8 rounded-xl bg-primary text-primary-foreground font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-all cursor-pointer"
									>
										<Send className="w-4 h-4" />
										SEND MESSAGE
									</button>
								</form>
							</div>

							{/* BLOCK 5: Site Visit Notice (lg:col-span-5) */}
							<div className="lg:col-span-5 bg-dark-hero rounded-3xl p-8 sm:p-10 text-white space-y-6 border border-white/15 text-left flex flex-col justify-between">
								<div className="space-y-4">
									<div className="flex items-center gap-3 border-b border-white/10 pb-4">
										<div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
											<Car className="w-5 h-5 text-accent" />
										</div>
										<div>
											<span className="text-xs font-mono font-medium text-accent uppercase tracking-wider block">
												BLOCK 5: PHYSICAL GUIDED TOURS
											</span>
											<h2 className="text-xl font-semibold font-heading text-white">
												Site Visit to "Silicon City"
											</h2>
										</div>
									</div>

									<div className="space-y-3 text-xs sm:text-sm text-white/80 font-light leading-relaxed">
										<p>{contactInfo.siteVisitNotice}</p>
									</div>
								</div>

								<div className="p-4 rounded-2xl bg-accent/15 border border-accent/30 text-xs font-light text-accent leading-relaxed">
									<strong>How to Book:</strong> To book a guided vehicle tour,
									please call our hotline ({contactInfo.phone}) or submit the
									contact form with the subject "Schedule Site Visit" at least 24
									hours in advance.
								</div>
							</div>
						</div>

						{/* ── ROW 3: FULL WIDTH GOOGLE MAP EMBED & DIRECTIONS ── */}
						<div className="bg-card border border-border/70 rounded-3xl p-8 sm:p-10 space-y-6 text-left w-full">
							<div className="space-y-1 border-b border-border/50 pb-4">
								<span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
									BLOCK 6: LOCATION MAP & DIRECTIONS
								</span>
								<h2 className="text-xl sm:text-2xl font-semibold font-heading text-foreground">
									Silicon Real Estate Corporate Office Location
								</h2>
								<p className="text-xs sm:text-sm text-muted-foreground font-light">
									{contactInfo.address}
								</p>
							</div>

							{/* Embedded Google Map */}
							<div className="relative w-full h-[400px] sm:h-[450px] rounded-2xl overflow-hidden border border-border/60 bg-muted">
								<iframe
									title="Silicon Real Estate Corporate Office Map Location"
									src={contactInfo.mapEmbedUrl}
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="w-full h-full grayscale opacity-90 hover:grayscale-0 transition-all duration-300"
								/>
							</div>
						</div>
					</div>
				</SectionContainer>
			</section>
		</div>
	);
}
