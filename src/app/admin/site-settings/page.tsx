"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Save,
	Phone,
	Mail,
	MapPin,
	Clock,
	CheckCircle2,
	Loader2,
	Lock,
	Globe,
	MessageSquare,
	ImageIcon,
	Map,
	Heading,
	FileText,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useAdminEditor } from "@/context/AdminEditorContext";
import { useContactInfo, ContactInfoData } from "@/hooks/useContactInfo";
import { EditorGuard } from "@/components/admin/EditorGuard";

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

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSaving(true);
		try {
			await updateContactInfo(formData);
			setSavedMessage("Contact information and site settings saved successfully!");
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
			<div className="border-b border-border/50 bg-card/60 backdrop-blur-md sticky top-0 z-30 py-4">
				<SectionContainer>
					<div className="flex items-center justify-between">
						<Link
							href="/admin"
							className="text-xs font-medium font-heading text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to Admin Panel
						</Link>
						<button
							onClick={handleSave}
							disabled={saving}
							className="px-4 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-medium font-heading inline-flex items-center gap-1.5 transition-all shadow-none hover:bg-primary/90 cursor-pointer disabled:opacity-50"
						>
							{saving ? (
								<Loader2 className="w-3.5 h-3.5 animate-spin" />
							) : (
								<Save className="w-3.5 h-3.5" />
							)}
							Save Contact Settings
						</button>
					</div>
				</SectionContainer>
			</div>

			<SectionContainer className="py-10">
				<div className="max-w-4xl mx-auto space-y-8">

					<div className="space-y-1 text-left">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							DYNAMIC CONTACT & SITE CONTROL
						</span>
						<h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
							Contact Page & Corporate Settings
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Manage hero titles, corporate office address, contact numbers, email addresses, business hours, and map locations.
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
						<form
							onSubmit={handleSave}
							className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-none space-y-8"
						>
							{/* Section 1: Hero & Header Content */}
							<div className="space-y-4 border-b border-border/60 pb-6">
								<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider flex items-center gap-2">
									<Heading className="w-4 h-4 text-primary" /> 1. Contact Page Hero Banner
								</h3>

								<div className="space-y-3">
									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground">
											Hero Page Title
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

									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground">
											Hero Description
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
								</div>
							</div>

							{/* Section 2: Contact Information */}
							<div className="space-y-4 border-b border-border/60 pb-6">
								<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider flex items-center gap-2">
									<Phone className="w-4 h-4 text-primary" /> 2. Corporate Contact Details
								</h3>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground flex items-center gap-1.5">
											<Phone className="w-3.5 h-3.5 text-muted-foreground" /> Phone & Mobile Numbers
										</label>
										<input
											type="text"
											name="phone"
											disabled={!isEditorUnlocked}
											value={formData.phone || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>

									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground flex items-center gap-1.5">
											<MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> Official WhatsApp
										</label>
										<input
											type="text"
											name="whatsapp"
											disabled={!isEditorUnlocked}
											value={formData.whatsapp || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>

									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground flex items-center gap-1.5">
											<Mail className="w-3.5 h-3.5 text-muted-foreground" /> Primary Email
										</label>
										<input
											type="email"
											name="email"
											disabled={!isEditorUnlocked}
											value={formData.email || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>

									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground flex items-center gap-1.5">
											<Mail className="w-3.5 h-3.5 text-muted-foreground" /> Secondary Email
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

									<div className="sm:col-span-2 space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground flex items-center gap-1.5">
											<MapPin className="w-3.5 h-3.5 text-muted-foreground" /> Corporate Office Address
										</label>
										<textarea
											rows={2}
											name="address"
											disabled={!isEditorUnlocked}
											value={formData.address || ""}
											onChange={handleChange}
											className="w-full p-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>
							</div>

							{/* Section 3: Hours & Site Visit Notice */}
							<div className="space-y-4 border-b border-border/60 pb-6">
								<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider flex items-center gap-2">
									<Clock className="w-4 h-4 text-primary" /> 3. Schedule & Site Visit Info
								</h3>

								<div className="space-y-3">
									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground">
											Business Hours & Weekly Holidays
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

									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground">
											Site Guided Visit Notice Text
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
								</div>
							</div>

							{/* Section 4: Map & Media */}
							<div className="space-y-4">
								<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider flex items-center gap-2">
									<Map className="w-4 h-4 text-primary" /> 4. Location Map & Images
								</h3>

								<div className="space-y-3">
									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground flex items-center gap-1.5">
											<Map className="w-3.5 h-3.5 text-muted-foreground" /> Google Map Embed iframe URL
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

									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground flex items-center gap-1.5">
											<ImageIcon className="w-3.5 h-3.5 text-muted-foreground" /> Office Banner Image URL (Optional)
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

							<button
								type="submit"
								disabled={saving}
								className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-all cursor-pointer shadow-md"
							>
								{saving ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Save className="w-4 h-4" />
								)}
								SAVE CONTACT SETTINGS TO DATABASE
							</button>
						</form>
					)}
				</div>
			</SectionContainer>
		</div>
	);
}
