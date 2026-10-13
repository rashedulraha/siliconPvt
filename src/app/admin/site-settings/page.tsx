"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Save,
	CheckCircle2,
	Loader2,
	Eye,
	MapPin,
	Phone,
	MessageSquare,
	Mail,
	ExternalLink,
	Sparkles,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useAdminEditor } from "@/context/AdminEditorContext";
import { useContactInfo, ContactInfoData } from "@/hooks/useContactInfo";

export default function SiteSettingsPage() {
	const { isEditorUnlocked, unlockEditorMode } = useAdminEditor();
	const { contactInfo, loading, updateContactInfo } = useContactInfo();

	const [formData, setFormData] = useState<ContactInfoData>(contactInfo);
	const [saving, setSaving] = useState(false);
	const [savedMessage, setSavedMessage] = useState("");

	useEffect(() => {
		if (contactInfo) {
			setFormData(contactInfo);
		}
	}, [contactInfo]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSaving(true);
		try {
			await updateContactInfo(formData);
			setSavedMessage(
				"Contact information and website footer settings saved successfully!",
			);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (e) {
			console.error("Failed to update contact settings", e);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 text-left">
			{/* Top Header */}
			<div className="border-b border-border/50 py-3 mb-6">
				<SectionContainer>
					<div className="flex items-center justify-between">
						<Link
							href="/admin"
							className="text-xs font-medium font-heading text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to Admin Panel
						</Link>
						<Link
							href="/contact"
							target="_blank"
							className="px-3.5 h-8 rounded-full border border-border/80 text-foreground hover:bg-muted text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all shadow-2xs"
						>
							<Eye className="w-3.5 h-3.5 text-muted-foreground" />
							<span>Live Contact Page</span>
						</Link>
					</div>
				</SectionContainer>
			</div>

			<SectionContainer className="py-10">
				<div className="max-w-4xl mx-auto space-y-8">
					<div className="space-y-1 text-left">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							DYNAMIC CONTACT & FOOTER CONTROL
						</span>
						<h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
							Corporate Contact & Website Footer Settings
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Manage corporate location, phone numbers, WhatsApp, emails, social
							links, and live website footer information in English and Bengali.
						</p>
					</div>

					{savedMessage && (
						<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4 shrink-0" />
							<span>{savedMessage}</span>
						</div>
					)}

					{loading ? (
						<div className="p-12 text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
							<Loader2 className="w-5 h-5 animate-spin text-primary" />
							<span>Loading contact settings from database...</span>
						</div>
					) : (
						<div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-none space-y-8">
							{/* Section 1: Hero & Header Content */}
							<div className="space-y-4 border-b border-border/60 pb-6">
								<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider">
									1. Contact Page Hero Banner
								</h3>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											Hero Page Title (EN)
										</label>
										<input
											type="text"
											name="heroTitle"
											disabled={!isEditorUnlocked}
											value={formData.heroTitle || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											হিরো পেজ শিরোনাম (BN)
										</label>
										<input
											type="text"
											name="heroTitleBn"
											disabled={!isEditorUnlocked}
											value={formData.heroTitleBn || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											Hero Description (EN)
										</label>
										<textarea
											rows={3}
											name="heroDescription"
											disabled={!isEditorUnlocked}
											value={formData.heroDescription || ""}
											onChange={handleChange}
											className="w-full p-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											হিরো বিবরণ (BN)
										</label>
										<textarea
											rows={3}
											name="heroDescriptionBn"
											disabled={!isEditorUnlocked}
											value={formData.heroDescriptionBn || ""}
											onChange={handleChange}
											className="w-full p-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>
							</div>

							{/* Section 2: Contact Channels, Footer & Location */}
							<div className="space-y-4 border-b border-border/60 pb-6">
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
									<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider">
										2. Corporate Location, Footer & Hotlines
									</h3>
									<span className="text-[11px] font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-full w-fit">
										Controls Live Footer & Contact Page
									</span>
								</div>
								<p className="text-xs text-muted-foreground">
									এই ফিল্ডগুলোতে পরিবর্তন করলে সরাসরি ওয়েবসাইটের ফুটার (Footer) এবং
									কন্টাক্ট পেইজে তা আপডেট হবে।
								</p>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground flex items-center justify-between">
											<span>Office Address (EN)</span>
											<span className="text-[10px] text-muted-foreground">
												Footer & Contact
											</span>
										</label>
										<textarea
											rows={2}
											name="address"
											disabled={!isEditorUnlocked}
											value={formData.address || ""}
											onChange={handleChange}
											placeholder="2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur, Dhaka-1207"
											className="w-full p-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground flex items-center justify-between">
											<span>অফিসের ঠিকানা (BN)</span>
											<span className="text-[10px] text-muted-foreground">
												ফুটার ও কন্টাক্ট
											</span>
										</label>
										<textarea
											rows={2}
											name="addressBn"
											disabled={!isEditorUnlocked}
											value={formData.addressBn || ""}
											onChange={handleChange}
											placeholder="২/৩ (২য় তলা), ব্লক # এ, ইকবাল রোড, মোহাম্মদপুর, ঢাকা-১২০৭"
											className="w-full p-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground flex items-center justify-between">
											<span>Phone Numbers</span>
											<span className="text-[10px] text-muted-foreground">
												Footer Hotline
											</span>
										</label>
										<input
											type="text"
											name="phone"
											disabled={!isEditorUnlocked}
											value={formData.phone || ""}
											onChange={handleChange}
											placeholder="+880 12 345 678 / +880 1712 345 678"
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground flex items-center justify-between">
											<span>WhatsApp Number</span>
											<span className="text-[10px] text-emerald-500 font-medium">
												Footer Chat & Floating Button
											</span>
										</label>
										<input
											type="text"
											name="whatsapp"
											disabled={!isEditorUnlocked}
											value={formData.whatsapp || ""}
											onChange={handleChange}
											placeholder="+880 1712 345 678"
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground flex items-center justify-between">
											<span>Primary Email Address</span>
											<span className="text-[10px] text-muted-foreground">
												Footer & Contact
											</span>
										</label>
										<input
											type="email"
											name="email"
											disabled={!isEditorUnlocked}
											value={formData.email || ""}
											onChange={handleChange}
											placeholder="info@siliconrealestatepvtltd.com"
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											Secondary Email Address
										</label>
										<input
											type="email"
											name="secondaryEmail"
											disabled={!isEditorUnlocked}
											value={formData.secondaryEmail || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-3 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											Official Website
										</label>
										<input
											type="text"
											name="website"
											disabled={!isEditorUnlocked}
											value={formData.website || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground flex items-center justify-between">
											<span>Facebook URL</span>
											<span className="text-[10px] text-muted-foreground">
												Footer Link
											</span>
										</label>
										<input
											type="text"
											name="facebookUrl"
											disabled={!isEditorUnlocked}
											value={formData.facebookUrl || ""}
											onChange={handleChange}
											placeholder="https://facebook.com/..."
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground flex items-center justify-between">
											<span>YouTube URL</span>
											<span className="text-[10px] text-muted-foreground">
												Footer Link
											</span>
										</label>
										<input
											type="text"
											name="youtubeUrl"
											disabled={!isEditorUnlocked}
											value={formData.youtubeUrl || ""}
											onChange={handleChange}
											placeholder="https://youtube.com/..."
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>
							</div>

							{/* Section 3: Schedule & Site Visit Info */}
							<div className="space-y-4 border-b border-border/60 pb-6">
								<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider">
									3. Schedule & Site Visit Info
								</h3>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											Business Hours (EN)
										</label>
										<input
											type="text"
											name="businessHours"
											disabled={!isEditorUnlocked}
											value={formData.businessHours || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											কার্যকাল ও ছুটির দিন (BN)
										</label>
										<input
											type="text"
											name="businessHoursBn"
											disabled={!isEditorUnlocked}
											value={formData.businessHoursBn || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											Site Visit Notice Text (EN)
										</label>
										<textarea
											rows={3}
											name="siteVisitNotice"
											disabled={!isEditorUnlocked}
											value={formData.siteVisitNotice || ""}
											onChange={handleChange}
											className="w-full p-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											সাইট পরিদর্শনের বিজ্ঞপ্তি (BN)
										</label>
										<textarea
											rows={3}
											name="siteVisitNoticeBn"
											disabled={!isEditorUnlocked}
											value={formData.siteVisitNoticeBn || ""}
											onChange={handleChange}
											className="w-full p-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>
							</div>

							{/* Section 4: Map & Media */}
							<div className="space-y-4">
								<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider">
									4. Location Map & Media
								</h3>

								<div className="space-y-3">
									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											Google Map Embed iframe URL
										</label>
										<input
											type="text"
											name="mapEmbedUrl"
											disabled={!isEditorUnlocked}
											value={formData.mapEmbedUrl || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-mono text-muted-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-medium font-heading text-foreground">
											Office Banner Image URL (Optional)
										</label>
										<input
											type="text"
											name="imageUrl"
											disabled={!isEditorUnlocked}
											value={formData.imageUrl || ""}
											onChange={handleChange}
											placeholder="https://..."
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>
							</div>

							{/* Section 5: Live Website Footer Preview */}
							<div className="space-y-4 pt-4 border-t border-border/60">
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
									<div className="flex items-center gap-2">
										<Sparkles className="w-4 h-4 text-primary" />
										<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider">
											5. Live Website Footer Preview (লাইভ ফুটার প্রিভিউ)
										</h3>
									</div>
									<span className="text-[10px] font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-full w-fit">
										Realtime Live Preview
									</span>
								</div>
								<p className="text-xs text-muted-foreground font-light">
									নিচে দেখুন আপনার পরিবর্তনগুলো মূল ওয়েবসাইটের ফুটারে ঠিক কীভাবে প্রদর্শিত
									হবে:
								</p>

								{/* Dark Footer Simulation Box */}
								<div className="rounded-2xl bg-[#09152e] border border-white/15 p-5 sm:p-6 text-white space-y-4 shadow-xl text-left">
									<div className="border-b border-white/10 pb-3 flex flex-wrap items-center justify-between gap-2">
										<span className="text-xs font-heading font-semibold text-white tracking-tight flex items-center gap-2">
											<span>Silicon Real Estate (Pvt.) Ltd.</span>
											<span className="text-[10px] text-amber-400 font-mono bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
												Website Footer Simulation
											</span>
										</span>
										<span className="text-[10px] text-white/50 font-mono">
											Column 1: Corporate Contact Block
										</span>
									</div>

									<p className="text-xs text-white/70 font-light leading-relaxed">
										{formData.heroDescription ||
											"A trusted pioneer in modern land development across Dhaka. RAJUK-compliant planned residential township in Silicon City with legal deed transparency."}
									</p>

									<div className="space-y-2.5 text-xs font-light text-white/80 pt-1">
										<div className="flex items-start gap-2.5">
											<MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
											<span className="leading-snug">
												{formData.address ||
													"2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur, Dhaka-1207"}
											</span>
										</div>

										<div className="flex items-center gap-2.5">
											<Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
											<span className="font-mono">
												{formData.phone ||
													"+880 12 345 678 / +880 1712 345 678"}
											</span>
										</div>

										<div className="flex items-center gap-2.5">
											<MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
											<span className="font-mono text-emerald-300">
												WhatsApp: {formData.whatsapp || "+880 1712 345 678"}
											</span>
										</div>

										<div className="flex items-center gap-2.5">
											<Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
											<span>
												{formData.email || "info@siliconrealestatepvtltd.com"}
											</span>
										</div>

										{(formData.facebookUrl || formData.youtubeUrl) && (
											<div className="flex items-center gap-2 pt-2 border-t border-white/10 text-[11px]">
												<span className="text-white/50 text-[10px]">
													Social Links:
												</span>
												{formData.facebookUrl && (
													<span className="px-2 py-0.5 rounded bg-white/10 text-white/90 inline-flex items-center gap-1 border border-white/15">
														Facebook
													</span>
												)}
												{formData.youtubeUrl && (
													<span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 inline-flex items-center gap-1 border border-red-500/30">
														YouTube
													</span>
												)}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</SectionContainer>

			{/* Single Floating Bottom-Right Save Capsule */}
			<div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-1.5 rounded-full bg-card/90 backdrop-blur-xl border border-border/80 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
				<button
					onClick={() => handleSave()}
					disabled={saving || loading}
					className="h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-medium font-heading inline-flex items-center gap-2 shadow-md shadow-primary/25 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
				>
					{saving ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Save className="w-4 h-4" />
					)}
					<span>
						{saving ? "Saving Changes..." : "Save Contact & Footer Settings"}
					</span>
				</button>
			</div>
		</div>
	);
}
