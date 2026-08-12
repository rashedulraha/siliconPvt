"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Save,
	Lock,
	Loader2,
	CheckCircle2,
	Layout,
	Award,
	ShieldCheck,
	Link2,
	Plus,
	X,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useAdminEditor } from "@/context/AdminEditorContext";
import { useHomeContent, HomeContentData } from "@/hooks/useHomeContent";

export default function HomeSettingsPage() {
	const { isEditorUnlocked, unlockEditorMode } = useAdminEditor();
	const { data: initialData, loading, updateContent } = useHomeContent();

	const [formData, setFormData] = useState<HomeContentData>(initialData);
	const [activeTab, setActiveTab] = useState<"hero" | "stats" | "accreditations" | "cta">("hero");
	const [saving, setSaving] = useState(false);
	const [savedMessage, setSavedMessage] = useState("");

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleChange = (field: keyof HomeContentData, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSaving(true);
		try {
			await updateContent(formData);
			setSavedMessage("Home page settings updated successfully!");
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (e) {
			console.error("Failed to update home content:", e);
		} finally {
			setSaving(false);
		}
	};

	const addAccreditation = () => {
		setFormData((prev) => ({
			...prev,
			accreditations: [...prev.accreditations, ""],
		}));
	};

	const removeAccreditation = (index: number) => {
		setFormData((prev) => ({
			...prev,
			accreditations: prev.accreditations.filter((_, i) => i !== index),
		}));
	};

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 text-left">
			{/* Top Bar */}
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
							disabled={saving || !isEditorUnlocked}
							className="px-5 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-bold font-heading inline-flex items-center gap-2 transition-all shadow-none hover:bg-primary/90 cursor-pointer disabled:opacity-50"
						>
							{saving ? (
								<Loader2 className="w-3.5 h-3.5 animate-spin" />
							) : (
								<Save className="w-3.5 h-3.5" />
							)}
							Save Changes
						</button>
					</div>
				</SectionContainer>
			</div>

			<SectionContainer className="py-10">
				<div className="max-w-5xl mx-auto space-y-8">
					{/* Lock Notice Banner */}
					{!isEditorUnlocked && (
						<div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium flex items-center justify-between gap-4">
							<div className="flex items-center gap-2">
								<Lock className="w-4 h-4 shrink-0" />
								<span>
									<strong>Read-Only Mode Active:</strong> Home page settings are in view-only mode until Editor Mode is unlocked.
								</span>
							</div>
							<button
								onClick={unlockEditorMode}
								className="px-3 py-1.5 rounded-lg bg-amber-500 text-black text-[11px] font-bold uppercase tracking-wider hover:bg-amber-400 shrink-0 cursor-pointer"
							>
								Unlock Editor
							</button>
						</div>
					)}

					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
						<div>
							<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
								HOME PAGE CONTENT CONTROL
							</span>
							<h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
								Home Page Settings
							</h1>
							<p className="text-xs sm:text-sm text-muted-foreground font-light mt-0.5">
								Edit section headers, trust counter cards, accreditations, and CTA banners.
							</p>
						</div>
					</div>

					{savedMessage && (
						<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4 shrink-0" />
							<span>{savedMessage}</span>
						</div>
					)}

					{/* Navigation Tabs */}
					<div className="flex flex-wrap gap-2 border-b border-border/50 pb-3">
						{[
							{ id: "hero", label: "Inventory Banner", icon: Layout },
							{ id: "stats", label: "Track Record Counters", icon: Award },
							{ id: "accreditations", label: "Accreditations", icon: ShieldCheck },
							{ id: "cta", label: "Call to Action Banners", icon: Link2 },
						].map((tab) => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id as any)}
									className={`px-4 py-2 rounded-xl text-xs font-medium font-heading inline-flex items-center gap-2 transition-all cursor-pointer ${
										isActive
											? "bg-primary text-primary-foreground shadow-xs"
											: "bg-card hover:bg-card/80 text-muted-foreground border border-border/50"
									}`}
								>
									<Icon className="w-3.5 h-3.5" />
									{tab.label}
								</button>
							);
						})}
					</div>

					{loading ? (
						<div className="p-12 text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
							<Loader2 className="w-5 h-5 animate-spin text-primary" />
							<span>Loading home page content...</span>
						</div>
					) : (
						<form onSubmit={handleSave} className="space-y-6">
							{/* TAB 1: INVENTORY BANNER */}
							{activeTab === "hero" && (
								<div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6">
									<h3 className="text-base font-bold font-heading text-foreground border-b border-border/50 pb-3">
										Featured Inventory Section Banner
									</h3>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-foreground">
											Badge Text *
										</label>
										<input
											type="text"
											value={formData.heroBadge}
											onChange={(e) => handleChange("heroBadge", e.target.value)}
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-foreground">
											Section Title *
										</label>
										<input
											type="text"
											value={formData.heroTitle}
											onChange={(e) => handleChange("heroTitle", e.target.value)}
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-foreground">
											Subtitle / Description *
										</label>
										<textarea
											rows={3}
											value={formData.heroDesc}
											onChange={(e) => handleChange("heroDesc", e.target.value)}
											className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>
								</div>
							)}

							{/* TAB 2: TRACK RECORD COUNTERS */}
							{activeTab === "stats" && (
								<div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6">
									<h3 className="text-base font-bold font-heading text-foreground border-b border-border/50 pb-3">
										Track Record Section & Counter Cards
									</h3>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												Section Title *
											</label>
											<input
												type="text"
												value={formData.trackRecordTitle}
												onChange={(e) =>
													handleChange("trackRecordTitle", e.target.value)
												}
												className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												Section Subtitle *
											</label>
											<input
												type="text"
												value={formData.trackRecordDesc}
												onChange={(e) =>
													handleChange("trackRecordDesc", e.target.value)
												}
												className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
										{formData.trustCounters.map((counter, idx) => (
											<div
												key={idx}
												className="p-4 rounded-2xl bg-background border border-border/60 space-y-2"
											>
												<div className="space-y-1">
													<label className="text-[11px] font-semibold text-muted-foreground">
														Counter #{idx + 1} Value
													</label>
													<input
														type="text"
														value={counter.value}
														onChange={(e) => {
															const updated = [...formData.trustCounters];
															updated[idx].value = e.target.value;
															handleChange("trustCounters", updated);
														}}
														className="w-full h-9 px-3 rounded-lg bg-card border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
													/>
												</div>
												<div className="space-y-1">
													<label className="text-[11px] font-semibold text-muted-foreground">
														Counter Label
													</label>
													<input
														type="text"
														value={counter.label}
														onChange={(e) => {
															const updated = [...formData.trustCounters];
															updated[idx].label = e.target.value;
															handleChange("trustCounters", updated);
														}}
														className="w-full h-9 px-3 rounded-lg bg-card border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
													/>
												</div>
												<div className="space-y-1">
													<label className="text-[11px] font-semibold text-muted-foreground">
														Bottom Detail Tag
													</label>
													<input
														type="text"
														value={counter.detail}
														onChange={(e) => {
															const updated = [...formData.trustCounters];
															updated[idx].detail = e.target.value;
															handleChange("trustCounters", updated);
														}}
														className="w-full h-9 px-3 rounded-lg bg-card border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
													/>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* TAB 3: ACCREDITATIONS */}
							{activeTab === "accreditations" && (
								<div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6">
									<div className="flex items-center justify-between border-b border-border/50 pb-3">
										<h3 className="text-base font-bold font-heading text-foreground">
											Accreditations & Certification Badges
										</h3>
										<button
											type="button"
											onClick={addAccreditation}
											className="text-xs text-primary font-bold hover:underline cursor-pointer"
										>
											+ Add Badge
										</button>
									</div>

									<div className="space-y-3">
										{formData.accreditations.map((acc, idx) => (
											<div key={idx} className="flex gap-2">
												<input
													type="text"
													value={acc}
													onChange={(e) => {
														const updated = [...formData.accreditations];
														updated[idx] = e.target.value;
														handleChange("accreditations", updated);
													}}
													placeholder={`Accreditation #${idx + 1}`}
													className="flex-1 h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
												/>
												{formData.accreditations.length > 1 && (
													<button
														type="button"
														onClick={() => removeAccreditation(idx)}
														className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center cursor-pointer hover:bg-destructive/20"
													>
														<X className="w-3.5 h-3.5" />
													</button>
												)}
											</div>
										))}
									</div>
								</div>
							)}

							{/* TAB 4: CALL TO ACTION BANNERS */}
							{activeTab === "cta" && (
								<div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6">
									<h3 className="text-base font-bold font-heading text-foreground border-b border-border/50 pb-3">
										Call to Action (CTA) Banner Settings
									</h3>

									<div className="space-y-4">
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												CTA Banner Headline *
											</label>
											<input
												type="text"
												value={formData.ctaTitle}
												onChange={(e) => handleChange("ctaTitle", e.target.value)}
												className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>

										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												CTA Subtitle / Description *
											</label>
											<textarea
												rows={3}
												value={formData.ctaDesc}
												onChange={(e) => handleChange("ctaDesc", e.target.value)}
												className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<label className="text-xs font-semibold text-foreground">
													Button Text *
												</label>
												<input
													type="text"
													value={formData.ctaButtonText}
													onChange={(e) =>
														handleChange("ctaButtonText", e.target.value)
													}
													className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
												/>
											</div>
											<div className="space-y-1.5">
												<label className="text-xs font-semibold text-foreground">
													Button Target Link *
												</label>
												<input
													type="text"
													value={formData.ctaButtonLink}
													onChange={(e) =>
														handleChange("ctaButtonLink", e.target.value)
													}
													className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
												/>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Save Bar */}
							<div className="pt-4 flex justify-end">
								<button
									type="submit"
									disabled={saving || !isEditorUnlocked}
									className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer hover:bg-primary/90 disabled:opacity-50"
								>
									{saving ? (
										<Loader2 className="w-4 h-4 animate-spin" />
									) : (
										<Save className="w-4 h-4" />
									)}
									Save Home Settings
								</button>
							</div>
						</form>
					)}
				</div>
			</SectionContainer>
		</div>
	);
}
