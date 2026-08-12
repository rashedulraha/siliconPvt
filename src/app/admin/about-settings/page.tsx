"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Save,
	Lock,
	Loader2,
	CheckCircle2,
	FileText,
	UserCheck,
	Target,
	Award,
	Users,
	Plus,
	Trash2,
	Image as ImageIcon,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useAdminEditor } from "@/context/AdminEditorContext";
import { useAboutContent, AboutContentData } from "@/hooks/useAboutContent";

export default function AboutSettingsPage() {
	const { isEditorUnlocked, unlockEditorMode } = useAdminEditor();
	const { data: initialData, loading, updateContent } = useAboutContent();

	const [formData, setFormData] = useState<AboutContentData>(initialData);
	const [activeTab, setActiveTab] = useState<
		"hero" | "bio" | "leadership" | "stats" | "values" | "team"
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

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSaving(true);
		try {
			await updateContent(formData);
			setSavedMessage("About page settings updated successfully!");
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (e) {
			console.error("Failed to update about content:", e);
		} finally {
			setSaving(false);
		}
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
									<strong>Read-Only Mode Active:</strong> Content editing is in view-only mode until Editor Mode is unlocked.
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
								COMPANY STORY & LEADERSHIP CONTROL
							</span>
							<h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
								About Page Settings
							</h1>
							<p className="text-xs sm:text-sm text-muted-foreground font-light mt-0.5">
								Edit company bio, mission, vision, chairman/MD addresses, and management team.
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
							{ id: "hero", label: "Hero & Bio", icon: FileText },
							{ id: "bio", label: "Mission & Vision", icon: Target },
							{ id: "leadership", label: "Chairman & MD Speeches", icon: UserCheck },
							{ id: "stats", label: "Stats & Milestones", icon: Award },
							{ id: "values", label: "Core Values", icon: Target },
							{ id: "team", label: "Executive Team", icon: Users },
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
							<span>Loading about page content...</span>
						</div>
					) : (
						<form onSubmit={handleSave} className="space-y-6">
							{/* TAB 1: HERO & BIO */}
							{activeTab === "hero" && (
								<div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6">
									<h3 className="text-base font-bold font-heading text-foreground border-b border-border/50 pb-3">
										Hero Banner & Company Overview
									</h3>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												Hero Title *
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
												Hero Subtitle *
											</label>
											<input
												type="text"
												value={formData.heroSubtitle}
												onChange={(e) => handleChange("heroSubtitle", e.target.value)}
												className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-foreground">
											Hero Description *
										</label>
										<textarea
											rows={3}
											value={formData.heroDesc}
											onChange={(e) => handleChange("heroDesc", e.target.value)}
											className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>

									<div className="space-y-1.5 pt-2">
										<label className="text-xs font-semibold text-foreground">
											"Who We Are" Section Title *
										</label>
										<input
											type="text"
											value={formData.whoWeAreTitle}
											onChange={(e) => handleChange("whoWeAreTitle", e.target.value)}
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-foreground">
											"Who We Are" Full Bio Description *
										</label>
										<textarea
											rows={4}
											value={formData.whoWeAreDesc}
											onChange={(e) => handleChange("whoWeAreDesc", e.target.value)}
											className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>
								</div>
							)}

							{/* TAB 2: MISSION & VISION */}
							{activeTab === "bio" && (
								<div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6">
									<h3 className="text-base font-bold font-heading text-foreground border-b border-border/50 pb-3">
										Mission & Vision Statements
									</h3>

									<div className="space-y-4">
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												Mission Heading *
											</label>
											<input
												type="text"
												value={formData.missionTitle}
												onChange={(e) => handleChange("missionTitle", e.target.value)}
												className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												Mission Statement Description *
											</label>
											<textarea
												rows={3}
												value={formData.missionDesc}
												onChange={(e) => handleChange("missionDesc", e.target.value)}
												className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>
									</div>

									<div className="space-y-4 pt-4 border-t border-border/50">
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												Vision Heading *
											</label>
											<input
												type="text"
												value={formData.visionTitle}
												onChange={(e) => handleChange("visionTitle", e.target.value)}
												className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												Vision Statement Description *
											</label>
											<textarea
												rows={3}
												value={formData.visionDesc}
												onChange={(e) => handleChange("visionDesc", e.target.value)}
												className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>
									</div>
								</div>
							)}

							{/* TAB 3: LEADERSHIP SPEECHES */}
							{activeTab === "leadership" && (
								<div className="space-y-6">
									{/* Chairman Section */}
									<div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-4">
										<h3 className="text-base font-bold font-heading text-foreground border-b border-border/50 pb-3">
											Chairman's Address & Profile
										</h3>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<label className="text-xs font-semibold text-foreground">
													Chairman Name *
												</label>
												<input
													type="text"
													value={formData.chairmanName}
													onChange={(e) => handleChange("chairmanName", e.target.value)}
													className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
												/>
											</div>
											<div className="space-y-1.5">
												<label className="text-xs font-semibold text-foreground">
													Title / Role *
												</label>
												<input
													type="text"
													value={formData.chairmanRole}
													onChange={(e) => handleChange("chairmanRole", e.target.value)}
													className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
												/>
											</div>
										</div>
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												Chairman Photo URL *
											</label>
											<input
												type="text"
												value={formData.chairmanImage}
												onChange={(e) => handleChange("chairmanImage", e.target.value)}
												className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												Chairman's Full Speech Address *
											</label>
											<textarea
												rows={5}
												value={formData.chairmanSpeech}
												onChange={(e) => handleChange("chairmanSpeech", e.target.value)}
												className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>
									</div>

									{/* MD Section */}
									<div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-4">
										<h3 className="text-base font-bold font-heading text-foreground border-b border-border/50 pb-3">
											Managing Director's Address & Profile
										</h3>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<label className="text-xs font-semibold text-foreground">
													MD Name *
												</label>
												<input
													type="text"
													value={formData.mdName}
													onChange={(e) => handleChange("mdName", e.target.value)}
													className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
												/>
											</div>
											<div className="space-y-1.5">
												<label className="text-xs font-semibold text-foreground">
													Title / Role *
												</label>
												<input
													type="text"
													value={formData.mdRole}
													onChange={(e) => handleChange("mdRole", e.target.value)}
													className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
												/>
											</div>
										</div>
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												MD Photo URL *
											</label>
											<input
												type="text"
												value={formData.mdImage}
												onChange={(e) => handleChange("mdImage", e.target.value)}
												className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground">
												MD's Full Speech Address *
											</label>
											<textarea
												rows={5}
												value={formData.mdSpeech}
												onChange={(e) => handleChange("mdSpeech", e.target.value)}
												className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
											/>
										</div>
									</div>
								</div>
							)}

							{/* TAB 4: STATS */}
							{activeTab === "stats" && (
								<div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6">
									<h3 className="text-base font-bold font-heading text-foreground border-b border-border/50 pb-3">
										Company Stats & Milestones
									</h3>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										{formData.stats.map((st, idx) => (
											<div key={idx} className="p-4 rounded-2xl bg-background border border-border/60 space-y-2">
												<div className="space-y-1">
													<label className="text-[11px] font-semibold text-muted-foreground">
														Metric #{idx + 1} Value
													</label>
													<input
														type="text"
														value={st.value}
														onChange={(e) => {
															const updated = [...formData.stats];
															updated[idx].value = e.target.value;
															handleChange("stats", updated);
														}}
														className="w-full h-9 px-3 rounded-lg bg-card border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
													/>
												</div>
												<div className="space-y-1">
													<label className="text-[11px] font-semibold text-muted-foreground">
														Label Title
													</label>
													<input
														type="text"
														value={st.label}
														onChange={(e) => {
															const updated = [...formData.stats];
															updated[idx].label = e.target.value;
															handleChange("stats", updated);
														}}
														className="w-full h-9 px-3 rounded-lg bg-card border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
													/>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* TAB 5: CORE VALUES */}
							{activeTab === "values" && (
								<div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6">
									<h3 className="text-base font-bold font-heading text-foreground border-b border-border/50 pb-3">
										Core Values & Pillars
									</h3>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										{formData.coreValues.map((cv, idx) => (
											<div key={idx} className="p-4 rounded-2xl bg-background border border-border/60 space-y-2">
												<div className="space-y-1">
													<label className="text-[11px] font-semibold text-muted-foreground">
														Pillar #{idx + 1} Title
													</label>
													<input
														type="text"
														value={cv.title}
														onChange={(e) => {
															const updated = [...formData.coreValues];
															updated[idx].title = e.target.value;
															handleChange("coreValues", updated);
														}}
														className="w-full h-9 px-3 rounded-lg bg-card border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
													/>
												</div>
												<div className="space-y-1">
													<label className="text-[11px] font-semibold text-muted-foreground">
														Description
													</label>
													<textarea
														rows={2}
														value={cv.desc}
														onChange={(e) => {
															const updated = [...formData.coreValues];
															updated[idx].desc = e.target.value;
															handleChange("coreValues", updated);
														}}
														className="w-full p-2.5 rounded-lg bg-card border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
													/>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* TAB 6: EXECUTIVE MANAGEMENT TEAM */}
							{activeTab === "team" && (
								<div className="bg-card border border-border/70 rounded-3xl p-6 sm:p-8 space-y-6">
									<h3 className="text-base font-bold font-heading text-foreground border-b border-border/50 pb-3">
										Executive Leadership Team
									</h3>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										{formData.managementTeam.map((mem, idx) => (
											<div key={idx} className="p-5 rounded-2xl bg-background border border-border/60 space-y-3">
												<div className="space-y-1">
													<label className="text-[11px] font-semibold text-muted-foreground">
														Member Name
													</label>
													<input
														type="text"
														value={mem.name}
														onChange={(e) => {
															const updated = [...formData.managementTeam];
															updated[idx].name = e.target.value;
															handleChange("managementTeam", updated);
														}}
														className="w-full h-9 px-3 rounded-lg bg-card border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
													/>
												</div>
												<div className="space-y-1">
													<label className="text-[11px] font-semibold text-muted-foreground">
														Role Title
													</label>
													<input
														type="text"
														value={mem.role}
														onChange={(e) => {
															const updated = [...formData.managementTeam];
															updated[idx].role = e.target.value;
															handleChange("managementTeam", updated);
														}}
														className="w-full h-9 px-3 rounded-lg bg-card border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
													/>
												</div>
												<div className="space-y-1">
													<label className="text-[11px] font-semibold text-muted-foreground">
														Image URL
													</label>
													<input
														type="text"
														value={mem.image}
														onChange={(e) => {
															const updated = [...formData.managementTeam];
															updated[idx].image = e.target.value;
															handleChange("managementTeam", updated);
														}}
														className="w-full h-9 px-3 rounded-lg bg-card border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
													/>
												</div>
												<div className="space-y-1">
													<label className="text-[11px] font-semibold text-muted-foreground">
														Philosophy / Quote
													</label>
													<input
														type="text"
														value={mem.philosophy || ""}
														onChange={(e) => {
															const updated = [...formData.managementTeam];
															updated[idx].philosophy = e.target.value;
															handleChange("managementTeam", updated);
														}}
														className="w-full h-9 px-3 rounded-lg bg-card border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
													/>
												</div>
											</div>
										))}
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
									Save About Settings
								</button>
							</div>
						</form>
					)}
				</div>
			</SectionContainer>
		</div>
	);
}
