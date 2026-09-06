"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Save,
	Loader2,
	CheckCircle2,
	Plus,
	Trash2,
	Eye,
	RefreshCw,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import {
	useAboutContent,
	AboutContentData,
	StatItem,
	ValueItem,
	TimelineItem,
	TeamMemberItem,
} from "@/hooks/useAboutContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";

export default function AboutSettingsPage() {
	const {
		data: initialData,
		loading,
		updateContent,
		refetch,
	} = useAboutContent();

	const [formData, setFormData] = useState<AboutContentData>(initialData);
	const [activeTab, setActiveTab] = useState<
		"hero" | "mission" | "leadership" | "stats" | "whyChooseUs" | "team"
	>("hero");
	const [saving, setSaving] = useState(false);
	const [savedMessage, setSavedMessage] = useState("");

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleChange = (field: keyof AboutContentData, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		setSaving(true);
		try {
			await updateContent(formData);
			setSavedMessage("About page content saved and synced to PostgreSQL!");
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (err: any) {
			console.error("Failed to update about content:", err);
			alert("Error saving: " + err.message);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 text-left">
			{/* Top Bar */}
			<div className="border-b border-border/50 py-3 mb-6">
				<SectionContainer>
					<div className="flex items-center justify-between gap-4">
						<Link
							href="/admin"
							className="text-xs font-medium font-heading text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to Admin Overview
						</Link>

						<div className="flex items-center gap-2.5">
							<button
								onClick={() => refetch()}
								disabled={loading}
								className="px-3.5 h-8 rounded-full border border-border/80 text-foreground hover:bg-muted text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
							>
								<RefreshCw
									className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
								/>
								<span>Refresh</span>
							</button>

							<Link
								href="/about"
								target="_blank"
								className="px-3.5 h-8 rounded-full border border-border/80 text-foreground hover:bg-muted text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all shadow-2xs"
							>
								<Eye className="w-3.5 h-3.5 text-muted-foreground" />
								<span>Live About Page</span>
							</Link>
						</div>
					</div>
				</SectionContainer>
			</div>

			<SectionContainer className="py-8">
				<div className="max-w-5xl mx-auto space-y-6">
					{/* Header Title */}
					<div className="space-y-1 text-left">
						<span className="text-xs font-semibold uppercase tracking-wider text-primary font-heading">
							PUBLIC ABOUT PAGE CONTENT CONTROL
						</span>
						<h1 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
							About & Leadership Settings
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Manage company bio, mission, vision, chairman and MD addresses,
							milestones timeline, and executive team in both English and
							Bengali.
						</p>
					</div>

					{/* Notification Toast */}
					{savedMessage && (
						<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold font-heading flex items-center gap-2 shadow-xs">
							<CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
							<span>{savedMessage}</span>
						</div>
					)}

					{/* Section Tabs */}
					<div className="flex flex-wrap gap-2 border-b border-border/60 pb-3">
						{[
							{ id: "hero", label: "Hero & Who We Are" },
							{ id: "mission", label: "Mission, Vision & Values" },
							{ id: "leadership", label: "Chairman & MD Speeches" },
							{ id: "stats", label: "Stats & Milestones" },
							{ id: "whyChooseUs", label: "Why Choose Us" },
							{ id: "team", label: "Executive Team" },
						].map((tab) => {
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id as any)}
									className={`px-4 py-2 rounded-xl text-xs font-medium font-heading transition-all cursor-pointer ${
										isActive
											? "bg-primary text-primary-foreground shadow-xs"
											: "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
									}`}
								>
									{tab.label}
								</button>
							);
						})}
					</div>

					{/* Form Container */}
					<form onSubmit={handleSave} className="space-y-6">
						{/* 1. HERO & WHO WE ARE */}
						{activeTab === "hero" && (
							<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
								<div className="border-b border-border/50 pb-3">
									<h2 className="text-base font-semibold font-heading">
										Hero Header & Company Bio
									</h2>
									<p className="text-xs text-muted-foreground">
										Configure the main top banner and introduction story.
									</p>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Hero Title (EN)
										</Label>
										<Input
											value={formData.heroTitle}
											onChange={(e) =>
												handleChange("heroTitle", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											হিরো শিরোনাম (BN)
										</Label>
										<Input
											value={formData.heroTitleBn || ""}
											onChange={(e) =>
												handleChange("heroTitleBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Hero Subtitle (EN)
										</Label>
										<Input
											value={formData.heroSubtitle}
											onChange={(e) =>
												handleChange("heroSubtitle", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											হিরো সাবটাইটেল (BN)
										</Label>
										<Input
											value={formData.heroSubtitleBn || ""}
											onChange={(e) =>
												handleChange("heroSubtitleBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Hero Description (EN)
										</Label>
										<Textarea
											rows={3}
											value={formData.heroDesc}
											onChange={(e) => handleChange("heroDesc", e.target.value)}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											হিরো বিবরণ (BN)
										</Label>
										<Textarea
											rows={3}
											value={formData.heroDescBn || ""}
											onChange={(e) =>
												handleChange("heroDescBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Who We Are Title (EN)
										</Label>
										<Input
											value={formData.whoWeAreTitle}
											onChange={(e) =>
												handleChange("whoWeAreTitle", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											পরিচিতি শিরোনাম (BN)
										</Label>
										<Input
											value={formData.whoWeAreTitleBn || ""}
											onChange={(e) =>
												handleChange("whoWeAreTitleBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Who We Are Description / Bio (EN)
										</Label>
										<Textarea
											rows={4}
											value={formData.whoWeAreDesc}
											onChange={(e) =>
												handleChange("whoWeAreDesc", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											পরিচিতি বিবরণ (BN)
										</Label>
										<Textarea
											rows={4}
											value={formData.whoWeAreDescBn || ""}
											onChange={(e) =>
												handleChange("whoWeAreDescBn", e.target.value)
											}
										/>
									</div>
								</div>
							</div>
						)}

						{/* 2. MISSION, VISION & VALUES */}
						{activeTab === "mission" && (
							<div className="space-y-6">
								{/* Mission & Vision */}
								<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
									<div className="border-b border-border/50 pb-3">
										<h2 className="text-base font-semibold font-heading">
											Corporate Mission & Vision
										</h2>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												Mission Title (EN)
											</Label>
											<Input
												value={formData.missionTitle}
												onChange={(e) =>
													handleChange("missionTitle", e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												মিশন শিরোনাম (BN)
											</Label>
											<Input
												value={formData.missionTitleBn || ""}
												onChange={(e) =>
													handleChange("missionTitleBn", e.target.value)
												}
											/>
										</div>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												Mission Description (EN)
											</Label>
											<Textarea
												rows={3}
												value={formData.missionDesc}
												onChange={(e) =>
													handleChange("missionDesc", e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												মিশন বিবরণ (BN)
											</Label>
											<Textarea
												rows={3}
												value={formData.missionDescBn || ""}
												onChange={(e) =>
													handleChange("missionDescBn", e.target.value)
												}
											/>
										</div>
									</div>

									<div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border/40">
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												Vision Title (EN)
											</Label>
											<Input
												value={formData.visionTitle}
												onChange={(e) =>
													handleChange("visionTitle", e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												ভিশন শিরোনাম (BN)
											</Label>
											<Input
												value={formData.visionTitleBn || ""}
												onChange={(e) =>
													handleChange("visionTitleBn", e.target.value)
												}
											/>
										</div>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												Vision Description (EN)
											</Label>
											<Textarea
												rows={3}
												value={formData.visionDesc}
												onChange={(e) =>
													handleChange("visionDesc", e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												ভিশন বিবরণ (BN)
											</Label>
											<Textarea
												rows={3}
												value={formData.visionDescBn || ""}
												onChange={(e) =>
													handleChange("visionDescBn", e.target.value)
												}
											/>
										</div>
									</div>
								</div>

								{/* Core Values */}
								<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
									<div className="flex items-center justify-between border-b border-border/50 pb-3">
										<div>
											<h2 className="text-base font-semibold font-heading">
												Core Corporate Values
											</h2>
										</div>
										<Button
											type="button"
											size="sm"
											variant="outline"
											onClick={() => {
												setFormData((prev) => ({
													...prev,
													coreValues: [
														...(formData.coreValues || []),
														{
															title: "New Value",
															titleBn: "নতুন মূল্যবোধ",
															desc: "Value description...",
															descBn: "বাংলায় বিবরণ...",
														},
													],
												}));
											}}
											className="gap-1 text-xs"
										>
											<Plus className="w-3.5 h-3.5" />
											Add Value
										</Button>
									</div>

									<div className="space-y-4">
										{(formData.coreValues || []).map((v, idx) => (
											<div
												key={idx}
												className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-3 relative group"
											>
												<div className="flex items-center justify-between">
													<span className="text-xs font-mono font-medium text-primary">
														VALUE #{idx + 1}
													</span>
													{(formData.coreValues || []).length > 1 && (
														<button
															type="button"
															onClick={() => {
																setFormData((prev) => ({
																	...prev,
																	coreValues: (prev.coreValues || []).filter(
																		(_, i) => i !== idx,
																	),
																}));
															}}
															className="text-muted-foreground hover:text-destructive transition-colors p-1"
														>
															<Trash2 className="w-3.5 h-3.5" />
														</button>
													)}
												</div>

												<div className="grid sm:grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] text-muted-foreground">
															Title (EN)
														</Label>
														<Input
															value={v.title}
															onChange={(e) => {
																const updated = [
																	...(formData.coreValues || []),
																];
																updated[idx].title = e.target.value;
																handleChange("coreValues", updated);
															}}
														/>
													</div>
													<div>
														<Label className="text-[11px] text-muted-foreground">
															শিরোনাম (BN)
														</Label>
														<Input
															value={v.titleBn || ""}
															onChange={(e) => {
																const updated = [
																	...(formData.coreValues || []),
																];
																updated[idx].titleBn = e.target.value;
																handleChange("coreValues", updated);
															}}
														/>
													</div>
												</div>

												<div className="grid sm:grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] text-muted-foreground">
															Description (EN)
														</Label>
														<Textarea
															rows={2}
															value={v.desc}
															onChange={(e) => {
																const updated = [
																	...(formData.coreValues || []),
																];
																updated[idx].desc = e.target.value;
																handleChange("coreValues", updated);
															}}
														/>
													</div>
													<div>
														<Label className="text-[11px] text-muted-foreground">
															বিবরণ (BN)
														</Label>
														<Textarea
															rows={2}
															value={v.descBn || ""}
															onChange={(e) => {
																const updated = [
																	...(formData.coreValues || []),
																];
																updated[idx].descBn = e.target.value;
																handleChange("coreValues", updated);
															}}
														/>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						)}

						{/* 3. LEADERSHIP SPEECHES */}
						{activeTab === "leadership" && (
							<div className="space-y-6">
								{/* Chairman */}
								<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
									<div className="border-b border-border/50 pb-3">
										<h2 className="text-base font-semibold font-heading">
											Chairman’s Address & Profile
										</h2>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												Chairman Name (EN)
											</Label>
											<Input
												value={formData.chairmanName}
												onChange={(e) =>
													handleChange("chairmanName", e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												চেয়ারম্যানের নাম (BN)
											</Label>
											<Input
												value={formData.chairmanNameBn || ""}
												onChange={(e) =>
													handleChange("chairmanNameBn", e.target.value)
												}
											/>
										</div>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												Official Role / Title (EN)
											</Label>
											<Input
												value={formData.chairmanRole}
												onChange={(e) =>
													handleChange("chairmanRole", e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												পদবি (BN)
											</Label>
											<Input
												value={formData.chairmanRoleBn || ""}
												onChange={(e) =>
													handleChange("chairmanRoleBn", e.target.value)
												}
											/>
										</div>
									</div>

									<div className="pt-2">
										<ImageUpload
											label="Chairman Official Portrait"
											description="Upload Chairman's portrait directly to ImgBB CDN (recommended: square or portrait ratio)."
											value={formData.chairmanImage || ""}
											onChange={(url) => handleChange("chairmanImage", url)}
											aspectRatio="square"
										/>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												Chairman's Full Message (EN)
											</Label>
											<Textarea
												rows={6}
												value={formData.chairmanSpeech}
												onChange={(e) =>
													handleChange("chairmanSpeech", e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												চেয়ারম্যানের বক্তব্য (BN)
											</Label>
											<Textarea
												rows={6}
												value={formData.chairmanSpeechBn || ""}
												onChange={(e) =>
													handleChange("chairmanSpeechBn", e.target.value)
												}
											/>
										</div>
									</div>
								</div>

								{/* MD */}
								<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
									<div className="border-b border-border/50 pb-3">
										<h2 className="text-base font-semibold font-heading">
											Managing Director’s Address & Profile
										</h2>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												MD Name (EN)
											</Label>
											<Input
												value={formData.mdName}
												onChange={(e) => handleChange("mdName", e.target.value)}
											/>
										</div>
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												ব্যবস্থাপনা পরিচালকের নাম (BN)
											</Label>
											<Input
												value={formData.mdNameBn || ""}
												onChange={(e) =>
													handleChange("mdNameBn", e.target.value)
												}
											/>
										</div>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												Official Role / Title (EN)
											</Label>
											<Input
												value={formData.mdRole}
												onChange={(e) => handleChange("mdRole", e.target.value)}
											/>
										</div>
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												পদবি (BN)
											</Label>
											<Input
												value={formData.mdRoleBn || ""}
												onChange={(e) =>
													handleChange("mdRoleBn", e.target.value)
												}
											/>
										</div>
									</div>

									<div className="pt-2">
										<ImageUpload
											label="Managing Director Official Portrait"
											description="Upload Managing Director's portrait directly to ImgBB CDN (recommended: square or portrait ratio)."
											value={formData.mdImage || ""}
											onChange={(url) => handleChange("mdImage", url)}
											aspectRatio="square"
										/>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												MD's Full Message (EN)
											</Label>
											<Textarea
												rows={6}
												value={formData.mdSpeech}
												onChange={(e) =>
													handleChange("mdSpeech", e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<Label className="text-xs font-semibold uppercase text-muted-foreground">
												ব্যবস্থাপনা পরিচালকের বক্তব্য (BN)
											</Label>
											<Textarea
												rows={6}
												value={formData.mdSpeechBn || ""}
												onChange={(e) =>
													handleChange("mdSpeechBn", e.target.value)
												}
											/>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* 4. STATS & MILESTONES */}
						{activeTab === "stats" && (
							<div className="space-y-6">
								{/* Stats */}
								<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
									<div className="flex items-center justify-between border-b border-border/50 pb-3">
										<div>
											<h2 className="text-base font-semibold font-heading">
												Corporate Numerical Stats
											</h2>
										</div>
										<Button
											type="button"
											size="sm"
											variant="outline"
											onClick={() => {
												setFormData((prev) => ({
													...prev,
													stats: [
														...prev.stats,
														{
															value: "99%",
															valueBn: "৯৯%",
															label: "Stat Label",
															labelBn: "লেবেল",
															desc: "Short detail",
															descBn: "সংক্ষিপ্ত বিবরণ",
														},
													],
												}));
											}}
											className="gap-1 text-xs"
										>
											<Plus className="w-3.5 h-3.5" />
											Add Stat
										</Button>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										{formData.stats.map((st, idx) => (
											<div
												key={idx}
												className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-3 relative group"
											>
												<div className="flex items-center justify-between">
													<span className="text-xs font-mono font-medium text-primary">
														STAT #{idx + 1}
													</span>
													{formData.stats.length > 1 && (
														<button
															type="button"
															onClick={() => {
																setFormData((prev) => ({
																	...prev,
																	stats: prev.stats.filter((_, i) => i !== idx),
																}));
															}}
															className="text-muted-foreground hover:text-destructive transition-colors p-1"
														>
															<Trash2 className="w-3.5 h-3.5" />
														</button>
													)}
												</div>

												<div className="grid grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] text-muted-foreground">
															Value (EN)
														</Label>
														<Input
															value={st.value}
															onChange={(e) => {
																const updated = [...formData.stats];
																updated[idx].value = e.target.value;
																handleChange("stats", updated);
															}}
														/>
													</div>
													<div>
														<Label className="text-[11px] text-muted-foreground">
															মান (BN)
														</Label>
														<Input
															value={st.valueBn || ""}
															onChange={(e) => {
																const updated = [...formData.stats];
																updated[idx].valueBn = e.target.value;
																handleChange("stats", updated);
															}}
														/>
													</div>
												</div>

												<div className="grid grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] text-muted-foreground">
															Label (EN)
														</Label>
														<Input
															value={st.label}
															onChange={(e) => {
																const updated = [...formData.stats];
																updated[idx].label = e.target.value;
																handleChange("stats", updated);
															}}
														/>
													</div>
													<div>
														<Label className="text-[11px] text-muted-foreground">
															লেবেল (BN)
														</Label>
														<Input
															value={st.labelBn || ""}
															onChange={(e) => {
																const updated = [...formData.stats];
																updated[idx].labelBn = e.target.value;
																handleChange("stats", updated);
															}}
														/>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Timeline Milestones */}
								<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
									<div className="flex items-center justify-between border-b border-border/50 pb-3">
										<div>
											<h2 className="text-base font-semibold font-heading">
												Historical Milestones Timeline
											</h2>
										</div>
										<Button
											type="button"
											size="sm"
											variant="outline"
											onClick={() => {
												setFormData((prev) => ({
													...prev,
													timeline: [
														...prev.timeline,
														{
															year: "2025",
															yearBn: "২০২৫",
															title: "New Milestone",
															titleBn: "নতুন মাইলফলক",
															desc: "Milestone detail...",
															descBn: "মাইলফলকের বিস্তারিত...",
														},
													],
												}));
											}}
											className="gap-1 text-xs"
										>
											<Plus className="w-3.5 h-3.5" />
											Add Milestone
										</Button>
									</div>

									<div className="space-y-4">
										{formData.timeline.map((item, idx) => (
											<div
												key={idx}
												className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-3 relative group"
											>
												<div className="flex items-center justify-between">
													<span className="text-xs font-mono font-medium text-primary">
														MILESTONE #{idx + 1}
													</span>
													{formData.timeline.length > 1 && (
														<button
															type="button"
															onClick={() => {
																setFormData((prev) => ({
																	...prev,
																	timeline: prev.timeline.filter(
																		(_, i) => i !== idx,
																	),
																}));
															}}
															className="text-muted-foreground hover:text-destructive transition-colors p-1"
														>
															<Trash2 className="w-3.5 h-3.5" />
														</button>
													)}
												</div>

												<div className="grid grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] text-muted-foreground">
															Year (EN)
														</Label>
														<Input
															value={item.year}
															onChange={(e) => {
																const updated = [...formData.timeline];
																updated[idx].year = e.target.value;
																handleChange("timeline", updated);
															}}
														/>
													</div>
													<div>
														<Label className="text-[11px] text-muted-foreground">
															বছর (BN)
														</Label>
														<Input
															value={item.yearBn || ""}
															onChange={(e) => {
																const updated = [...formData.timeline];
																updated[idx].yearBn = e.target.value;
																handleChange("timeline", updated);
															}}
														/>
													</div>
												</div>

												<div className="grid sm:grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] text-muted-foreground">
															Milestone Title (EN)
														</Label>
														<Input
															value={item.title}
															onChange={(e) => {
																const updated = [...formData.timeline];
																updated[idx].title = e.target.value;
																handleChange("timeline", updated);
															}}
														/>
													</div>
													<div>
														<Label className="text-[11px] text-muted-foreground">
															মাইলফলক শিরোনাম (BN)
														</Label>
														<Input
															value={item.titleBn || ""}
															onChange={(e) => {
																const updated = [...formData.timeline];
																updated[idx].titleBn = e.target.value;
																handleChange("timeline", updated);
															}}
														/>
													</div>
												</div>

												<div className="grid sm:grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] text-muted-foreground">
															Description (EN)
														</Label>
														<Textarea
															rows={2}
															value={item.desc}
															onChange={(e) => {
																const updated = [...formData.timeline];
																updated[idx].desc = e.target.value;
																handleChange("timeline", updated);
															}}
														/>
													</div>
													<div>
														<Label className="text-[11px] text-muted-foreground">
															বিবরণ (BN)
														</Label>
														<Textarea
															rows={2}
															value={item.descBn || ""}
															onChange={(e) => {
																const updated = [...formData.timeline];
																updated[idx].descBn = e.target.value;
																handleChange("timeline", updated);
															}}
														/>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						)}

						{/* 5. WHY CHOOSE US */}
						{activeTab === "whyChooseUs" && (
							<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
								<div className="flex items-center justify-between border-b border-border/50 pb-3">
									<div>
										<h2 className="text-base font-semibold font-heading">
											Why Choose Silicon Real Estate Advantages
										</h2>
									</div>
									<Button
										type="button"
										size="sm"
										variant="outline"
										onClick={() => {
											setFormData((prev) => ({
												...prev,
												whyChooseUs: [
													...(prev.whyChooseUs || []),
													{
														title: "New Advantage",
														titleBn: "নতুন সুবিধা",
														desc: "Advantage description...",
														descBn: "সুবিধার বিবরণ...",
													},
												],
											}));
										}}
										className="gap-1 text-xs"
									>
										<Plus className="w-3.5 h-3.5" />
										Add Advantage
									</Button>
								</div>

								<div className="space-y-4">
									{(formData.whyChooseUs || []).map((item, idx) => (
										<div
											key={idx}
											className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-3 relative group"
										>
											<div className="flex items-center justify-between">
												<span className="text-xs font-mono font-medium text-primary">
													ADVANTAGE #{idx + 1}
												</span>
												{(formData.whyChooseUs || []).length > 1 && (
													<button
														type="button"
														onClick={() => {
															setFormData((prev) => ({
																...prev,
																whyChooseUs: (prev.whyChooseUs || []).filter(
																	(_, i) => i !== idx,
																),
															}));
														}}
														className="text-muted-foreground hover:text-destructive transition-colors p-1"
													>
														<Trash2 className="w-3.5 h-3.5" />
													</button>
												)}
											</div>

											<div className="grid sm:grid-cols-2 gap-3">
												<div>
													<Label className="text-[11px] text-muted-foreground">
														Title (EN)
													</Label>
													<Input
														value={item.title}
														onChange={(e) => {
															const updated = [...(formData.whyChooseUs || [])];
															updated[idx].title = e.target.value;
															handleChange("whyChooseUs", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														শিরোনাম (BN)
													</Label>
													<Input
														value={item.titleBn || ""}
														onChange={(e) => {
															const updated = [...(formData.whyChooseUs || [])];
															updated[idx].titleBn = e.target.value;
															handleChange("whyChooseUs", updated);
														}}
													/>
												</div>
											</div>

											<div className="grid sm:grid-cols-2 gap-3">
												<div>
													<Label className="text-[11px] text-muted-foreground">
														Description (EN)
													</Label>
													<Textarea
														rows={2}
														value={item.desc}
														onChange={(e) => {
															const updated = [...(formData.whyChooseUs || [])];
															updated[idx].desc = e.target.value;
															handleChange("whyChooseUs", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														বিবরণ (BN)
													</Label>
													<Textarea
														rows={2}
														value={item.descBn || ""}
														onChange={(e) => {
															const updated = [...(formData.whyChooseUs || [])];
															updated[idx].descBn = e.target.value;
															handleChange("whyChooseUs", updated);
														}}
													/>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{/* 6. EXECUTIVE TEAM */}
						{activeTab === "team" && (
							<div className="space-y-6">
								{/* Management & Executive Team */}
								<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
									<div className="flex items-center justify-between border-b border-border/50 pb-3">
										<div>
											<h2 className="text-base font-semibold font-heading">
												Management & Executive Team
											</h2>
										</div>
										<Button
											type="button"
											size="sm"
											variant="outline"
											onClick={() => {
												setFormData((prev) => ({
													...prev,
													managementTeam: [
														...prev.managementTeam,
														{
															name: "Executive Name",
															nameBn: "কর্মকর্তার নাম",
															role: "Head of Operations",
															roleBn: "প্রধান পরিচালন কর্মকর্তা",
															image:
																"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
															philosophy: "Statement quote...",
															philosophyBn: "উদ্ধৃতি...",
														},
													],
												}));
											}}
											className="gap-1 text-xs"
										>
											<Plus className="w-3.5 h-3.5" />
											Add Executive
										</Button>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										{formData.managementTeam.map((mem, idx) => (
											<div
												key={idx}
												className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-3 relative group"
											>
												<div className="flex items-center justify-between">
													<span className="text-xs font-mono font-medium text-primary">
														EXECUTIVE #{idx + 1}
													</span>
													{formData.managementTeam.length > 1 && (
														<button
															type="button"
															onClick={() => {
																setFormData((prev) => ({
																	...prev,
																	managementTeam: prev.managementTeam.filter(
																		(_, i) => i !== idx,
																	),
																}));
															}}
															className="text-muted-foreground hover:text-destructive transition-colors p-1"
														>
															<Trash2 className="w-3.5 h-3.5" />
														</button>
													)}
												</div>

												<div className="grid grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] text-muted-foreground">
															Name (EN)
														</Label>
														<Input
															value={mem.name}
															onChange={(e) => {
																const updated = [...formData.managementTeam];
																updated[idx].name = e.target.value;
																handleChange("managementTeam", updated);
															}}
														/>
													</div>
													<div>
														<Label className="text-[11px] text-muted-foreground">
															নাম (BN)
														</Label>
														<Input
															value={mem.nameBn || ""}
															onChange={(e) => {
																const updated = [...formData.managementTeam];
																updated[idx].nameBn = e.target.value;
																handleChange("managementTeam", updated);
															}}
														/>
													</div>
												</div>

												<div className="grid grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] text-muted-foreground">
															Role Title (EN)
														</Label>
														<Input
															value={mem.role}
															onChange={(e) => {
																const updated = [...formData.managementTeam];
																updated[idx].role = e.target.value;
																handleChange("managementTeam", updated);
															}}
														/>
													</div>
													<div>
														<Label className="text-[11px] text-muted-foreground">
															পদবি (BN)
														</Label>
														<Input
															value={mem.roleBn || ""}
															onChange={(e) => {
																const updated = [...formData.managementTeam];
																updated[idx].roleBn = e.target.value;
																handleChange("managementTeam", updated);
															}}
														/>
													</div>
												</div>

												<div className="pt-1">
													<ImageUpload
														label="Executive Member Photo"
														description="Upload portrait to ImgBB CDN."
														value={mem.image || ""}
														onChange={(url) => {
															const updated = [...formData.managementTeam];
															updated[idx].image = url;
															handleChange("managementTeam", updated);
														}}
														aspectRatio="square"
													/>
												</div>

												<div className="grid grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] text-muted-foreground">
															Quote / Statement (EN)
														</Label>
														<Input
															value={mem.philosophy || ""}
															onChange={(e) => {
																const updated = [...formData.managementTeam];
																updated[idx].philosophy = e.target.value;
																handleChange("managementTeam", updated);
															}}
														/>
													</div>
													<div>
														<Label className="text-[11px] text-muted-foreground">
															বক্তব্য (BN)
														</Label>
														<Input
															value={mem.philosophyBn || ""}
															onChange={(e) => {
																const updated = [...formData.managementTeam];
																updated[idx].philosophyBn = e.target.value;
																handleChange("managementTeam", updated);
															}}
														/>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						)}
					</form>
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
					<span>{saving ? "Saving Changes..." : "Save Changes"}</span>
				</button>
			</div>
		</div>
	);
}
