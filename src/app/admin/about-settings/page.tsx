"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Save,
	Loader2,
	CheckCircle2,
	FileText,
	UserCheck,
	Target,
	Award,
	Users,
	Plus,
	Trash2,
	Eye,
	RefreshCw,
	Sparkles,
	HelpCircle,
	Quote,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useAboutContent, AboutContentData } from "@/hooks/useAboutContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
			{/* ── TOP ACTION BAR (Non-sticky) ── */}
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
						<span className="text-xs font-semibold uppercase tracking-wider text-primary font-heading inline-flex items-center gap-1.5">
							<Sparkles className="w-3.5 h-3.5" /> PUBLIC ABOUT PAGE CONTENT
							CONTROL
						</span>
						<h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							About & Leadership Settings
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Manage company bio, mission, vision, chairman and MD addresses,
							milestones timeline, and executive board members.
						</p>
					</div>

					{/* Notification Toast */}
					{savedMessage && (
						<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold font-heading flex items-center gap-2 shadow-xs">
							<CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
							<span>{savedMessage}</span>
						</div>
					)}

					{/* ── 6 SECTION TABS ── */}
					<div className="flex flex-wrap gap-2 border-b border-border/60 pb-3">
						{[
							{ id: "hero", label: "Hero & Who We Are", icon: FileText },
							{
								id: "mission",
								label: "Mission, Vision & Values",
								icon: Target,
							},
							{
								id: "leadership",
								label: "Chairman & MD Speeches",
								icon: UserCheck,
							},
							{ id: "stats", label: "Stats & Milestones", icon: Award },
							{ id: "whyChooseUs", label: "Why Choose Us", icon: HelpCircle },
							{ id: "team", label: "Executive Team", icon: Users },
						].map((tab) => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									type="button"
									onClick={() => setActiveTab(tab.id as any)}
									className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all cursor-pointer ${
										isActive
											? "bg-primary text-primary-foreground shadow-xs"
											: "bg-card hover:bg-muted text-muted-foreground border border-border/60"
									}`}
								>
									<Icon className="w-3.5 h-3.5" />
									<span>{tab.label}</span>
								</button>
							);
						})}
					</div>

					{loading ? (
						<div className="p-16 text-center text-muted-foreground text-xs flex items-center justify-center gap-2">
							<Loader2 className="w-4 h-4 animate-spin text-primary" />
							<span>Loading about page content from PostgreSQL...</span>
						</div>
					) : (
						<form onSubmit={handleSave} className="space-y-6">
							{/* ── TAB 1: HERO & WHO WE ARE ── */}
							{activeTab === "hero" && (
								<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-5">
									<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
										Header Banner & Company Bio
									</h2>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-1.5">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												Hero Title *
											</Label>
											<Input
												required
												value={formData.heroTitle}
												onChange={(e) =>
													handleChange("heroTitle", e.target.value)
												}
												placeholder="e.g. Building Trust."
											/>
										</div>
										<div className="space-y-1.5">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												Hero Subtitle Highlight *
											</Label>
											<Input
												required
												value={formData.heroSubtitle}
												onChange={(e) =>
													handleChange("heroSubtitle", e.target.value)
												}
												placeholder="e.g. Creating Sustainable Communities."
											/>
										</div>
									</div>

									<div className="space-y-1.5">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											Hero Description *
										</Label>
										<Textarea
											rows={3}
											value={formData.heroDesc}
											onChange={(e) => handleChange("heroDesc", e.target.value)}
											placeholder="Overview description..."
										/>
									</div>

									<div className="space-y-1.5 pt-3 border-t border-border/50">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											"Who We Are" Section Title *
										</Label>
										<Input
											required
											value={formData.whoWeAreTitle}
											onChange={(e) =>
												handleChange("whoWeAreTitle", e.target.value)
											}
											placeholder="e.g. Pioneering Planned & Eco-Friendly Development"
										/>
									</div>

									<div className="space-y-1.5">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											"Who We Are" Full Story *
										</Label>
										<Textarea
											rows={4}
											value={formData.whoWeAreDesc}
											onChange={(e) =>
												handleChange("whoWeAreDesc", e.target.value)
											}
											placeholder="Comprehensive company narrative..."
										/>
									</div>
								</div>
							)}

							{/* ── TAB 2: MISSION, VISION & CORE VALUES ── */}
							{activeTab === "mission" && (
								<div className="space-y-6">
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-5">
										<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Mission & Vision Statements
										</h2>

										<div className="grid sm:grid-cols-2 gap-4">
											<div className="space-y-3 p-4 rounded-xl bg-muted/30 border border-border/60">
												<div className="space-y-1.5">
													<Label className="text-xs font-semibold font-heading uppercase text-primary">
														Mission Title *
													</Label>
													<Input
														value={formData.missionTitle}
														onChange={(e) =>
															handleChange("missionTitle", e.target.value)
														}
													/>
												</div>
												<div className="space-y-1.5">
													<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
														Mission Description *
													</Label>
													<Textarea
														rows={3}
														value={formData.missionDesc}
														onChange={(e) =>
															handleChange("missionDesc", e.target.value)
														}
													/>
												</div>
											</div>

											<div className="space-y-3 p-4 rounded-xl bg-muted/30 border border-border/60">
												<div className="space-y-1.5">
													<Label className="text-xs font-semibold font-heading uppercase text-amber-500">
														Vision Title *
													</Label>
													<Input
														value={formData.visionTitle}
														onChange={(e) =>
															handleChange("visionTitle", e.target.value)
														}
													/>
												</div>
												<div className="space-y-1.5">
													<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
														Vision Description *
													</Label>
													<Textarea
														rows={3}
														value={formData.visionDesc}
														onChange={(e) =>
															handleChange("visionDesc", e.target.value)
														}
													/>
												</div>
											</div>
										</div>
									</div>

									{/* Core Values */}
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4">
										<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Core Value Pillars
										</h2>

										<div className="grid sm:grid-cols-2 gap-4">
											{formData.coreValues.map((cv, idx) => (
												<div
													key={idx}
													className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2"
												>
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold font-mono text-primary">
															Pillar 0{idx + 1} Title
														</Label>
														<Input
															value={cv.title}
															onChange={(e) => {
																const updated = [...formData.coreValues];
																updated[idx].title = e.target.value;
																handleChange("coreValues", updated);
															}}
														/>
													</div>
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-muted-foreground">
															Description
														</Label>
														<Textarea
															rows={2}
															value={cv.desc}
															onChange={(e) => {
																const updated = [...formData.coreValues];
																updated[idx].desc = e.target.value;
																handleChange("coreValues", updated);
															}}
														/>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							)}

							{/* ── TAB 3: CHAIRMAN & MD ADDRESSES ── */}
							{activeTab === "leadership" && (
								<div className="space-y-6">
									{/* Chairman */}
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4">
										<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Chairman's Address & Profile
										</h2>

										<div className="grid sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													Chairman Name *
												</Label>
												<Input
													value={formData.chairmanName}
													onChange={(e) =>
														handleChange("chairmanName", e.target.value)
													}
												/>
											</div>
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													Designation Title *
												</Label>
												<Input
													value={formData.chairmanRole}
													onChange={(e) =>
														handleChange("chairmanRole", e.target.value)
													}
												/>
											</div>
										</div>

										<div className="grid sm:grid-cols-12 gap-4 items-center">
											<div className="sm:col-span-8 space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													Chairman Photo URL *
												</Label>
												<Input
													value={formData.chairmanImage}
													onChange={(e) =>
														handleChange("chairmanImage", e.target.value)
													}
												/>
											</div>
											{formData.chairmanImage && (
												<div className="sm:col-span-4 flex items-center gap-3">
													<img
														src={formData.chairmanImage}
														alt="Chairman"
														className="w-14 h-14 rounded-full object-cover border-2 border-primary shadow-xs"
													/>
													<span className="text-[11px] text-muted-foreground">
														Live Photo Preview
													</span>
												</div>
											)}
										</div>

										<div className="space-y-1.5">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												Chairman's Full Speech Address *
											</Label>
											<Textarea
												rows={5}
												value={formData.chairmanSpeech}
												onChange={(e) =>
													handleChange("chairmanSpeech", e.target.value)
												}
											/>
										</div>
									</div>

									{/* Managing Director */}
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4">
										<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Managing Director's Address & Profile
										</h2>

										<div className="grid sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													MD Name *
												</Label>
												<Input
													value={formData.mdName}
													onChange={(e) =>
														handleChange("mdName", e.target.value)
													}
												/>
											</div>
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													Designation Title *
												</Label>
												<Input
													value={formData.mdRole}
													onChange={(e) =>
														handleChange("mdRole", e.target.value)
													}
												/>
											</div>
										</div>

										<div className="grid sm:grid-cols-12 gap-4 items-center">
											<div className="sm:col-span-8 space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													MD Photo URL *
												</Label>
												<Input
													value={formData.mdImage}
													onChange={(e) =>
														handleChange("mdImage", e.target.value)
													}
												/>
											</div>
											{formData.mdImage && (
												<div className="sm:col-span-4 flex items-center gap-3">
													<img
														src={formData.mdImage}
														alt="MD"
														className="w-14 h-14 rounded-full object-cover border-2 border-primary shadow-xs"
													/>
													<span className="text-[11px] text-muted-foreground">
														Live Photo Preview
													</span>
												</div>
											)}
										</div>

										<div className="space-y-1.5">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												MD's Full Speech Address *
											</Label>
											<Textarea
												rows={5}
												value={formData.mdSpeech}
												onChange={(e) =>
													handleChange("mdSpeech", e.target.value)
												}
											/>
										</div>
									</div>
								</div>
							)}

							{/* ── TAB 4: STATS & MILESTONES ── */}
							{activeTab === "stats" && (
								<div className="space-y-6">
									{/* Company Stats */}
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4">
										<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Company At A Glance Metrics (4 Stats)
										</h2>

										<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
											{formData.stats.map((st, idx) => (
												<div
													key={idx}
													className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2"
												>
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-primary font-mono">
															Metric #{idx + 1} Value
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
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-muted-foreground">
															Label
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
												</div>
											))}
										</div>
									</div>

									{/* Milestones Timeline */}
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4">
										<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Milestones of Trust Timeline
										</h2>

										<div className="space-y-3">
											{formData.timeline.map((item, idx) => (
												<div
													key={idx}
													className="p-4 rounded-xl bg-muted/30 border border-border/60 grid sm:grid-cols-12 gap-3 items-center"
												>
													<div className="sm:col-span-2">
														<Label className="text-[10px] font-mono text-primary uppercase">
															Year
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
													<div className="sm:col-span-4">
														<Label className="text-[10px] font-semibold text-muted-foreground uppercase">
															Milestone Title
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
													<div className="sm:col-span-6">
														<Label className="text-[10px] font-semibold text-muted-foreground uppercase">
															Description
														</Label>
														<Input
															value={item.desc}
															onChange={(e) => {
																const updated = [...formData.timeline];
																updated[idx].desc = e.target.value;
																handleChange("timeline", updated);
															}}
														/>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							)}

							{/* ── TAB 5: WHY CHOOSE US ── */}
							{activeTab === "whyChooseUs" && (
								<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4">
									<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
										Why Choose Silicon Real Estate (4 Distinctive Advantages)
									</h2>

									<div className="grid sm:grid-cols-2 gap-4">
										{formData.whyChooseUs.map((item, idx) => (
											<div
												key={idx}
												className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2"
											>
												<div className="space-y-1">
													<Label className="text-[11px] font-semibold text-primary font-mono">
														Advantage 0{idx + 1} Title
													</Label>
													<Input
														value={item.title}
														onChange={(e) => {
															const updated = [...formData.whyChooseUs];
															updated[idx].title = e.target.value;
															handleChange("whyChooseUs", updated);
														}}
													/>
												</div>
												<div className="space-y-1">
													<Label className="text-[11px] font-semibold text-muted-foreground">
														Description
													</Label>
													<Textarea
														rows={2}
														value={item.desc}
														onChange={(e) => {
															const updated = [...formData.whyChooseUs];
															updated[idx].desc = e.target.value;
															handleChange("whyChooseUs", updated);
														}}
													/>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* ── TAB 6: EXECUTIVE MANAGEMENT TEAM ── */}
							{activeTab === "team" && (
								<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-5">
									<div className="flex items-center justify-between border-b border-border/50 pb-2.5">
										<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground">
											Executive Management Team (
											{formData.managementTeam.length})
										</h2>
										<Button
											type="button"
											size="sm"
											onClick={() => {
												handleChange("managementTeam", [
													...formData.managementTeam,
													{
														name: "NEW EXECUTIVE",
														role: "Director",
														philosophy: "Committed to excellence.",
														image:
															"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
													},
												]);
											}}
											className="gap-1 text-xs"
										>
											<Plus className="w-3.5 h-3.5" />
											Add Member
										</Button>
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										{formData.managementTeam.map((mem, idx) => (
											<div
												key={idx}
												className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-3 relative group"
											>
												<div className="flex items-start justify-between gap-3">
													<div className="flex items-center gap-3">
														<img
															src={mem.image}
															alt={mem.name}
															className="w-12 h-12 rounded-full object-cover border border-primary/40"
															onError={(e) => {
																(e.target as HTMLElement).style.display =
																	"none";
															}}
														/>
														<div>
															<h4 className="text-xs font-bold font-heading text-foreground">
																{mem.name || "Member Name"}
															</h4>
															<p className="text-[10px] text-primary font-semibold uppercase">
																{mem.role || "Role"}
															</p>
														</div>
													</div>

													<Button
														type="button"
														variant="ghost"
														size="icon"
														onClick={() => {
															const updated = formData.managementTeam.filter(
																(_, i) => i !== idx,
															);
															handleChange("managementTeam", updated);
														}}
														className="h-7 w-7 text-destructive hover:bg-destructive/10 cursor-pointer"
													>
														<Trash2 className="w-3.5 h-3.5" />
													</Button>
												</div>

												<div className="space-y-2 pt-2 border-t border-border/40 text-left">
													<div className="grid grid-cols-2 gap-2">
														<div className="space-y-1">
															<Label className="text-[10px] text-muted-foreground uppercase">
																Name
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
														<div className="space-y-1">
															<Label className="text-[10px] text-muted-foreground uppercase">
																Role Title
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
													</div>

													<div className="space-y-1">
														<Label className="text-[10px] text-muted-foreground uppercase">
															Image URL
														</Label>
														<Input
															value={mem.image}
															onChange={(e) => {
																const updated = [...formData.managementTeam];
																updated[idx].image = e.target.value;
																handleChange("managementTeam", updated);
															}}
														/>
													</div>

													<div className="space-y-1">
														<Label className="text-[10px] text-muted-foreground uppercase">
															Philosophy / Statement Quote
														</Label>
														<Input
															value={mem.philosophy}
															onChange={(e) => {
																const updated = [...formData.managementTeam];
																updated[idx].philosophy = e.target.value;
																handleChange("managementTeam", updated);
															}}
														/>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Bottom Save Button */}
							<div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
								<Button
									type="submit"
									disabled={saving}
									className="gap-2 px-6 h-10 font-bold font-heading text-xs"
								>
									{saving ? (
										<Loader2 className="w-4 h-4 animate-spin" />
									) : (
										<Save className="w-4 h-4" />
									)}
									Save All About Settings
								</Button>
							</div>
						</form>
					)}
				</div>
			</SectionContainer>

			{/* ── FLOATING BOTTOM-RIGHT SAVE CAPSULE ── */}
			<div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-1.5 rounded-full bg-card/90 backdrop-blur-xl border border-border/80 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
				<button
					onClick={() => handleSave()}
					disabled={saving || loading}
					className="h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-bold font-heading inline-flex items-center gap-2 shadow-md shadow-primary/25 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
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
