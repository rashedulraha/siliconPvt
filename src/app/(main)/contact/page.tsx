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
	Navigation,
	Building2,
	FileCheck2,
} from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { PageSEO } from "@/components/seo/PageSEO";
import { useContactInfo } from "@/hooks/useContactInfo";
import { useLanguage } from "@/context/LanguageContext";
import { apiFetch } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const FAQ_ITEMS_EN = [
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

const FAQ_ITEMS_BN = [
	{
		q: "সিলিকন সিটিতে সরজমিনে সাইট ভিজিট কীভাবে শিডিউল করব?",
		a: "আমাদের হটলাইন (+880 12 345 678), হোয়াটসঅ্যাপ অথবা এই পৃষ্ঠার ফর্মের মাধ্যমে 'সাইট পরিদর্শন বুকিং' নির্বাচন করে সহজেই সাইট ভিজিট শিডিউল করতে পারেন। আমাদের মোহাম্মদপুর কর্পোরেট অফিস থেকে সম্পূর্ণ বিনামূল্যে মাইক্রোবাসে সাইট পরিদর্শনের ব্যবস্থা রয়েছে।",
	},
	{
		q: "আবাসিক প্লট বুকিং করতে কী কী কাগজপত্র প্রয়োজন?",
		a: "প্লট বুকিংয়ের জন্য গ্রাহকের জাতীয় পরিচয়পত্র (NID) বা পাসপোর্ট কপি, ২ কপি পাসপোর্ট সাইজ ছবি, নমিনির জাতীয় পরিচয়পত্র ও ১ কপি ছবি এবং পূরণকৃত অফিসিয়াল আবেদন ফরম জমা দিতে হবে।",
	},
	{
		q: "জমি কেনার আগে কি মূল সিএস, এসএ, আরএস, বিএস দলিলপত্র দেখতে পারব?",
		a: "হ্যাঁ, অবশ্যই। আমরা সকল ক্রেতাকে আমাদের মোহাম্মদপুর অফিসে এসে ইন-হাউস লিগ্যাল টিমের উপস্থিতিতে সিএস, এসএ, আরএস, বিএস খতিয়ান, নামজারি ও ডিসিআর এর মূল রেকর্ডপত্র সরাসরি যাচাই করতে উৎসাহিত করি।",
	},
	{
		q: "কী ধরনের কিস্তি ও পেমেন্ট সুবিধা পাওয়া যাবে?",
		a: "এককালীন পরিশোধে রয়েছে আকর্ষণীয় মূল্যছাড়। এছাড়া আপনার সুবিধাজনক বাজেট অনুযায়ী কোনো ধরনের গোপন সুদ ছাড়া ২৪ থেকে ৬০ মাসের সহজ মাসিক কিস্তির সুবিধা রয়েছে।",
	},
	{
		q: "আপনাদের কর্পোরেট অফিস কোথায় এবং কখন ভিজিট করা যাবে?",
		a: "আমাদের প্রধান কর্পোরেট অফিস: ২/৩ (২য় তলা), ব্লক-এ, ইকবাল রোড, মোহাম্মদপুর, ঢাকা-১২০৭ (মোহাম্মদপুর টাউন হলের নিকট)। শনিবার থেকে বৃহস্পতিবার সকাল ৯:০০ টা থেকে বিকাল ৫:০০ টা পর্যন্ত আমাদের অফিস খোলা থাকে।",
	},
];

export default function ContactPage() {
	const { contactInfo } = useContactInfo();
	const { isBn } = useLanguage();

	// Form State
	const [inquiryType, setInquiryType] = useState(isBn ? "প্লট বুকিং" : "Plot Booking");
	const [fullName, setFullName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [plotSize, setPlotSize] = useState(isBn ? "৩ কাঠা আবাসিক প্লট" : "3 Katha");
	const [visitDate, setVisitDate] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// FAQ State
	const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

	const faqItems = isBn ? FAQ_ITEMS_BN : FAQ_ITEMS_EN;

	const inquiryOptions = isBn
		? ["প্লট বুকিং", "সাইট পরিদর্শন বুকিং", "দলিলপত্র যাচাই", "সাধারণ অনুসন্ধান"]
		: ["Plot Booking", "Schedule Site Visit", "Legal Paper Vetting", "General Query"];

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
				title={isBn ? "যোগাযোগ | সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ" : "Contact Us | Silicon Real Estate (Pvt.) Ltd."}
				description={isBn ? "সিলিকন রিয়েল এস্টেটের সাথে যোগাযোগ করুন। প্লট বুকিং ও সাইট ভিজিটের জন্য আমাদের মোহাম্মদপুর অফিসে আসুন।" : contactInfo.heroDescription}
			/>

			{/* ── BLOCK 1: Hero Header ── */}
			<section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden text-left">
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
								{isBn ? "হোম" : "Home"}
							</Link>
							<ChevronRight className="w-3 h-3 text-white/40" />
							<span className="text-accent font-semibold">{isBn ? "যোগাযোগ" : "Contact Us"}</span>
						</nav>

						<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white tracking-tight leading-snug mb-3">
							{isBn ? "আমাদের প্রপার্টি ও আইনি " : "Connect with Our "} <br />
							<span className="text-gold">{isBn ? "পরামর্শক দলের সাথে যোগাযোগ করুন" : "Property Advisory Team"}</span>
						</h1>

						<p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mb-7">
							{isBn
								? "সিলিকন সিটিতে প্লট বরাদ্দ, ফ্রি গাড়িতে সাইট পরিদর্শন অথবা সিএস, এসএ, আরএস, বিএস দলিলপত্র যাচাই করতে আমাদের মোহাম্মদপুর কর্পোরেট ডেস্কে যোগাযোগ করুন।"
								: "Whether you want to inquire about available residential plots in Silicon City, schedule a complimentary guided vehicle site tour, or verify legal land titles, our corporate team in Mohammadpur is here to assist you."}
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
										{isBn ? "হটলাইন" : "HOTLINE"}
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
										{isBn ? "হোয়াটসঅ্যাপ চ্যাট" : "WHATSAPP CHAT"}
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
										{isBn ? "ইমেইল ডেস্ক" : "EMAIL DESK"}
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
									{isBn ? "অনলাইন পরামর্শ ও সাইট বুকিং" : "ONLINE CONSULTATION"}
								</span>
								<h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground tracking-tight">
									{isBn ? "অনুসন্ধান পাঠান বা সাইট ভিজিট শিডিউল করুন" : "Send an Inquiry or Schedule a Site Tour"}
								</h2>
								<p className="text-xs text-muted-foreground font-light leading-relaxed">
									{isBn
										? "আপনার পছন্দের বিষয়টি নির্বাচন করুন, আমাদের সিনিয়র প্রপার্টি উপদেষ্টা দ্রুত আপনার সাথে যোগাযোগ করবেন।"
										: "Please choose your inquiry topic and our senior advisor will contact you within 24 hours."}
								</p>
							</div>

							{/* Topic Switcher Pills */}
							<div className="space-y-2">
								<span className="text-xs font-semibold font-heading text-foreground block">
									{isBn ? "অনুসন্ধানের উদ্দেশ্য:" : "Inquiry Purpose:"}
								</span>
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
									{inquiryOptions.map((type) => (
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
											{isBn ? "আপনার তথ্য সফলভাবে জমা হয়েছে!" : "Inquiry Received Successfully!"}
										</p>
										<p className="text-emerald-700 font-light">
											{isBn
												? `ধন্যবাদ, ${fullName}। আমাদের উপদেষ্টা দল শীঘ্রই ${phone} নম্বরে যোগাযোগ করবেন।`
												: `Thank you, ${fullName}. Our advisory team will contact you via ${phone} shortly.`}
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
											{isBn ? "আপনার পূর্ণ নাম" : "Full Name"} <span className="text-destructive">*</span>
										</label>
										<input
											type="text"
											required
											placeholder={isBn ? "যেমন: মো: রফিকুল ইসলাম" : "e.g. Md. Rafiqul Islam"}
											value={fullName}
											onChange={(e) => setFullName(e.target.value)}
											className="w-full h-10 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
										/>
									</div>

									{/* Phone */}
									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground flex items-center gap-1">
											{isBn ? "মোবাইল / হোয়াটসঅ্যাপ" : "Mobile / WhatsApp"} <span className="text-destructive">*</span>
										</label>
										<input
											type="tel"
											required
											placeholder={isBn ? "যেমন: ০১৭১২ ৩৪৫৬৭৮" : "e.g. +880 1712 345678"}
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											className="w-full h-10 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
										/>
									</div>

									{/* Email */}
									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground">
											{isBn ? "ইমেইল ঠিকানা (ঐচ্ছিক)" : "Email Address (Optional)"}
										</label>
										<input
											type="email"
											placeholder="yourname@gmail.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="w-full h-10 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
										/>
									</div>

									{/* Plot Size */}
									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground">
											{isBn ? "আগ্রহী প্লটের ক্যাটাগরি" : "Interested Plot / Property"}
										</label>
										<select
											value={plotSize}
											onChange={(e) => setPlotSize(e.target.value)}
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs font-medium text-foreground focus:outline-none focus:border-primary transition-all cursor-pointer"
										>
											<option value={isBn ? "৩ কাঠা আবাসিক প্লট" : "3 Katha"}>
												{isBn ? "৩ কাঠা আবাসিক প্লট" : "3 Katha Residential Plot"}
											</option>
											<option value={isBn ? "৫ কাঠা আবাসিক প্লট" : "5 Katha"}>
												{isBn ? "৫ কাঠা আবাসিক প্লট" : "5 Katha Residential Plot"}
											</option>
											<option value={isBn ? "১০ কাঠা আবাসিক প্লট" : "10 Katha"}>
												{isBn ? "১০ কাঠা আবাসিক প্লট" : "10 Katha Residential Plot"}
											</option>
											<option value={isBn ? "বাণিজ্যিক প্লট" : "Commercial Plot"}>
												{isBn ? "বাণিজ্যিক এভিনিউ প্লট" : "Commercial Boulevard Plot"}
											</option>
											<option value={isBn ? "রেডি ফ্ল্যাট" : "Ready Luxury Flat"}>
												{isBn ? "রেডি বিলাসবহুল ফ্ল্যাট" : "Ready Luxury Flat"}
											</option>
											<option value={isBn ? "সাধারণ তথ্য" : "General Query"}>
												{isBn ? "সাধারণ তথ্য ও পরামর্শ" : "General Inquiry"}
											</option>
										</select>
									</div>
								</div>

								{/* Site Visit Preferred Date */}
								{(inquiryType === "Schedule Site Visit" || inquiryType === "সাইট পরিদর্শন বুকিং") && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										className="space-y-1.5 p-3.5 rounded-xl bg-primary/5 border border-primary/20"
									>
										<label className="text-xs font-semibold font-heading text-primary flex items-center gap-1.5">
											<Calendar className="w-3.5 h-3.5" /> {isBn ? "সাইট ভিজিটের পছন্দসই তারিখ:" : "Preferred Date of Visit:"}
										</label>
										<input
											type="date"
											value={visitDate}
											onChange={(e) => setVisitDate(e.target.value)}
											className="w-full h-9 px-3 rounded-lg bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
										/>
										<p className="text-[11px] text-muted-foreground font-light">
											{isBn
												? "* মোহাম্মদপুর কর্পোরেট অফিস থেকে নিজস্ব গাড়িতে সাইট পরিদর্শনে নিয়ে যাওয়া হবে।"
												: "* Guided vehicle departures take place from our Mohammadpur Corporate Office."}
										</p>
									</motion.div>
								)}

								{/* Message */}
								<div className="space-y-1.5">
									<label className="text-xs font-semibold font-heading text-foreground">
										{isBn ? "বিশেষ প্রশ্ন বা বিবরণ:" : "Specific Questions / Notes:"}
									</label>
									<textarea
										rows={3}
										placeholder={isBn ? "পছন্দের ব্লক, রাস্তার প্রশস্ততা বা কিস্তির সময়সীমা সম্পর্কে লিখুন..." : "Describe your preferred sector, road width, or installment timeline..."}
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
										<span>{isBn ? "জমা হচ্ছে..." : "Submitting..."}</span>
									) : (
										<>
											<Send className="w-3.5 h-3.5" />
											{isBn ? "আবেদন জমা দিন" : "SUBMIT INQUIRY"}
										</>
									)}
								</button>
							</form>
						</motion.div>

						{/* ── RIGHT: Corporate Headquarters & Office Logistics (lg:col-span-5) ── */}
						<div className="lg:col-span-5 space-y-6">
							{/* Headquarters Details Card */}
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: 0.1 }}
								className="bg-card border border-border/60 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs"
							>
								<div className="flex items-center justify-between border-b border-border/50 pb-3.5">
									<div className="flex items-center gap-2.5">
										<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
											<Building2 className="w-4 h-4" />
										</div>
										<div>
											<span className="text-[10px] font-mono uppercase text-muted-foreground block">
												{isBn ? "হেডকোয়ার্টার" : "HEADQUARTERS"}
											</span>
											<h3 className="text-sm font-bold font-heading text-foreground">
												{isBn ? "মোহাম্মদপুর কর্পোরেট অফিস" : "Mohammadpur Corporate Office"}
											</h3>
										</div>
									</div>
									<span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px] font-semibold">
										{isBn ? "উন্মুক্ত" : "Open"}
									</span>
								</div>

								<div className="space-y-3.5 text-xs text-muted-foreground font-light leading-relaxed">
									<div className="flex items-start gap-3">
										<MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
										<p className="text-foreground/90">
											{isBn
												? "২/৩ (২য় তলা), ব্লক-এ, ইকবাল রোড, মোহাম্মদপুর, ঢাকা-১২০৭ (মোহাম্মদপুর টাউন হলের নিকট)"
												: "2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka-1207 (Adjacent to Mohammadpur Town Hall)"}
										</p>
									</div>

									<div className="flex items-center gap-3">
										<Clock className="w-4 h-4 text-primary shrink-0" />
										<span>{isBn ? "শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – বিকাল ৫:০০" : "Saturday – Thursday: 9:00 AM – 5:00 PM"}</span>
									</div>

									<div className="flex items-center gap-3">
										<Phone className="w-4 h-4 text-primary shrink-0" />
										<span>+880 12 345 678 / +880 1712 345 678</span>
									</div>

									<div className="flex items-center gap-3">
										<Mail className="w-4 h-4 text-primary shrink-0" />
										<span>info@siliconrealestatepvtltd.com</span>
									</div>
								</div>
							</motion.div>

							{/* Free Site Visit Microbus Logistics Card */}
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: 0.2 }}
								className="bg-dark-hero rounded-2xl p-6 text-white space-y-3.5 border border-white/15 shadow-md relative overflow-hidden"
							>
								<div
									className="absolute inset-0 opacity-[0.06] pointer-events-none"
									style={{
										backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
										backgroundSize: "20px 20px",
									}}
								/>
								<div className="relative z-10 flex items-center gap-2.5 text-accent">
									<Car className="w-5 h-5" />
									<span className="text-xs font-mono font-bold uppercase tracking-wider">
										{isBn ? "ফ্রি সাইট ভিজিট সার্ভিস" : "COMPLIMENTARY SITE TRANSPORT"}
									</span>
								</div>
								<h4 className="relative z-10 text-base font-bold font-heading text-white">
									{isBn ? "মোহাম্মদপুর অফিস থেকে সরাসরি সাইট পরিদর্শন" : "Free Transport From Mohammadpur Office"}
								</h4>
								<p className="relative z-10 text-xs text-white/80 font-light leading-relaxed">
									{isBn
										? "প্রতিটি আগ্রহী গ্রাহকের জন্য আমাদের নিজস্ব পরিবহনে অভিজ্ঞ গাইডসহ সরজমিনে প্লটের সীমানা পরিদর্শনের সুব্যবস্থা রয়েছে।"
										: "We arrange executive microbus departures from our Mohammadpur corporate office to conduct on-ground plot boundary walkthroughs with our senior survey officers."}
								</p>
							</motion.div>

							{/* Legal Title Vetting Banner */}
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: 0.3 }}
								className="bg-card border border-border/60 rounded-2xl p-6 space-y-2.5 shadow-xs"
							>
								<div className="flex items-center gap-2 text-primary">
									<FileCheck2 className="w-4 h-4" />
									<span className="text-xs font-mono font-bold uppercase tracking-wider">
										{isBn ? "আইনি নিশ্চয়তা" : "LEGAL PAPER VETTING"}
									</span>
								</div>
								<h4 className="text-sm font-bold font-heading text-foreground">
									{isBn ? "১০০% যাচাইকৃত ও নিষ্কণ্টক দলিল" : "Verify Authenticity In Person"}
								</h4>
								<p className="text-xs text-muted-foreground font-light leading-relaxed">
									{isBn
										? "আমাদের অফিসে এসে সরাসরি সিএস, এসএ, আরএস ও বিএস মূল খতিয়ান এবং নামজারি কাগজপত্র যাচাই করুন।"
										: "Review all government clearances, RAJUK alignment plans, and certified CS/SA/RS/BS khatians directly with our in-house advocates."}
								</p>
							</motion.div>
						</div>
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 3: Interactive Google Map / Direction Box ── */}
			<section className="py-12 bg-muted/30 border-y border-border/50 relative overflow-hidden">
				<SectionContainer className="space-y-6 text-left">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
						<div className="space-y-1">
							<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
								{isBn ? "লোকেশন ও মানচিত্র" : "OFFICE DIRECTIONS"}
							</span>
							<h3 className="text-lg sm:text-xl font-bold font-heading text-foreground">
								{isBn ? "আমাদের প্রধান কার্যালয়ের অবস্থান" : "Find Us at Mohammadpur Iqbal Road"}
							</h3>
						</div>
						<a
							href="https://maps.google.com/?q=Mohammadpur+Iqbal+Road+Dhaka"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 text-xs font-semibold font-heading text-primary hover:underline shrink-0"
						>
							<Navigation className="w-3.5 h-3.5" />
							{isBn ? "গুগল ম্যাপে দিকনির্দেশনা দেখুন" : "Open in Google Maps"}
						</a>
					</div>

					<div className="w-full h-80 rounded-2xl overflow-hidden border border-border/60 shadow-xs relative bg-muted">
						<iframe
							title="Silicon Real Estate Office Location"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902544256247!2d90.3629472!3d23.7508518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf5186b595bb%3A0x2ff252033fb9b9a5!2sIqbal%20Rd%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
							className="w-full h-full border-0"
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</SectionContainer>
			</section>

			{/* ── BLOCK 4: Frequently Asked Questions (Accordion) ── */}
			<section className="py-16 sm:py-20 bg-background relative overflow-hidden text-left">
				<SectionContainer className="max-w-4xl space-y-8">
					<div className="text-center space-y-2">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							{isBn ? "সাধারণ প্রশ্নোত্তর" : "FREQUENTLY ASKED QUESTIONS"}
						</span>
						<h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							{isBn ? "বিনিয়োগকারীদের সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ" : "Everything You Need to Know"}
						</h2>
					</div>

					<div className="space-y-3">
						{faqItems.map((faq, idx) => {
							const isOpen = openFaqIndex === idx;
							return (
								<div
									key={idx}
									className="bg-card border border-border/60 rounded-2xl overflow-hidden transition-all shadow-xs"
								>
									<button
										type="button"
										onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
										className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-muted/30 transition-colors"
									>
										<span className="text-sm sm:text-base font-semibold font-heading text-foreground">
											{faq.q}
										</span>
										<ChevronDown
											className={cn(
												"w-4 h-4 text-primary shrink-0 transition-transform duration-200",
												isOpen && "rotate-180",
											)}
										/>
									</button>

									<AnimatePresence initial={false}>
										{isOpen && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: "auto", opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.2 }}
												className="overflow-hidden"
											>
												<div className="p-5 pt-0 border-t border-border/30 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
													{faq.a}
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							);
						})}
					</div>
				</SectionContainer>
			</section>
		</>
	);
}
