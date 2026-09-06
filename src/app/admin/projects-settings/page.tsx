"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Plus,
	Edit3,
	Trash2,
	Save,
	Loader2,
	CheckCircle2,
	X,
	Eye,
	RefreshCw,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useProjects, ProjectItem } from "@/hooks/useProjects";
import {
	useProjectsContent,
	ProjectsContentData,
	TrustMetric,
	SpecItem,
	CategoryItem,
	AmenityItem,
	ProximityItem,
	RoadmapStep,
} from "@/hooks/useProjectsContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const emptyProjectForm: Omit<ProjectItem, "id"> = {
	num: "",
	title: "",
	titleBn: "",
	type: "Township Project",
	typeBn: "টাউনশিপ প্রজেক্ট",
	status: "Ongoing",
	statusBn: "চলমান",
	location: "",
	locationBn: "",
	description: "",
	descriptionBn: "",
	images: [""],
	highlights: [""],
	highlightsBn: [""],
	demoUrl: "",
	clientInfo: "",
	order: 0,
	active: true,
};

export default function ProjectsSettingsPage() {
	const {
		data: initialContent,
		loading: contentLoading,
		updateContent,
		refetch: refetchContent,
	} = useProjectsContent();
	const [contentForm, setContentForm] =
		useState<ProjectsContentData>(initialContent);

	const {
		projects,
		loading: projectsLoading,
		createProject,
		updateProject,
		deleteProject,
		refetch: refetchProjects,
	} = useProjects();

	const [activeTab, setActiveTab] = useState<
		"hero" | "spotlight" | "projects" | "categories" | "amenities" | "roadmap"
	>("hero");
	const [saving, setSaving] = useState(false);
	const [savedMessage, setSavedMessage] = useState("");

	// Project Modal State
	const [projectModalOpen, setProjectModalOpen] = useState(false);
	const [editingProject, setEditingProject] = useState<ProjectItem | null>(
		null,
	);
	const [projectFormData, setProjectFormData] =
		useState<Omit<ProjectItem, "id">>(emptyProjectForm);
	const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

	useEffect(() => {
		if (initialContent) {
			setContentForm(initialContent);
		}
	}, [initialContent]);

	const handleContentChange = (
		field: keyof ProjectsContentData,
		value: any,
	) => {
		setContentForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSaveContent = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		setSaving(true);
		try {
			await updateContent(contentForm);
			setSavedMessage("Projects page content saved and synced to database!");
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (err: any) {
			console.error("Failed to update projects content:", err);
			alert("Error saving: " + err.message);
		} finally {
			setSaving(false);
		}
	};

	// ── Project Modal Handlers ──
	const openCreateProjectModal = () => {
		setEditingProject(null);
		setProjectFormData({
			...emptyProjectForm,
			num: `0${projects.length + 1}`,
			order: projects.length + 1,
		});
		setProjectModalOpen(true);
	};

	const openEditProjectModal = (item: ProjectItem) => {
		setEditingProject(item);
		setProjectFormData({
			num: item.num || "",
			title: item.title,
			titleBn: item.titleBn || "",
			type: item.type || "Township Project",
			typeBn: item.typeBn || "",
			status: item.status || "Ongoing",
			statusBn: item.statusBn || "",
			location: item.location || "",
			locationBn: item.locationBn || "",
			description: item.description,
			descriptionBn: item.descriptionBn || "",
			images: item.images && item.images.length > 0 ? item.images : [""],
			highlights:
				item.highlights && item.highlights.length > 0 ? item.highlights : [""],
			highlightsBn:
				item.highlightsBn && item.highlightsBn.length > 0
					? item.highlightsBn
					: [""],
			demoUrl: item.demoUrl || "",
			clientInfo: item.clientInfo || "",
			order: item.order,
			active: item.active,
		});
		setProjectModalOpen(true);
	};

	const handleProjectSave = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);
		try {
			const cleanedImages = projectFormData.images.filter(
				(img) => img.trim() !== "",
			);
			const cleanedHighlights = projectFormData.highlights.filter(
				(h) => h.trim() !== "",
			);
			const cleanedHighlightsBn = (projectFormData.highlightsBn || []).filter(
				(h) => h.trim() !== "",
			);

			const payload = {
				...projectFormData,
				images:
					cleanedImages.length > 0
						? cleanedImages
						: [
								"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
							],
				highlights: cleanedHighlights,
				highlightsBn: cleanedHighlightsBn,
			};

			if (editingProject) {
				await updateProject(editingProject.id, payload);
				setSavedMessage("Project updated successfully!");
			} else {
				await createProject(payload);
				setSavedMessage("New project created successfully!");
			}
			setProjectModalOpen(false);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (err: any) {
			console.error("Failed to save project:", err);
			alert("Error: " + err.message);
		} finally {
			setSaving(false);
		}
	};

	const handleDeleteProject = async (id: string) => {
		try {
			await deleteProject(id);
			setDeleteConfirmId(null);
			setSavedMessage("Project deleted successfully.");
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (err: any) {
			alert("Failed to delete project: " + err.message);
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
								onClick={() => {
									refetchContent();
									refetchProjects();
								}}
								disabled={contentLoading || projectsLoading}
								className="px-3.5 h-8 rounded-full border border-border/80 text-foreground hover:bg-muted text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
							>
								<RefreshCw
									className={`w-3.5 h-3.5 ${
										contentLoading || projectsLoading ? "animate-spin" : ""
									}`}
								/>
								<span>Refresh</span>
							</button>

							<Link
								href="/projects"
								target="_blank"
								className="px-3.5 h-8 rounded-full border border-border/80 text-foreground hover:bg-muted text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all shadow-2xs"
							>
								<Eye className="w-3.5 h-3.5 text-muted-foreground" />
								<span>Live Projects Page</span>
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
							PUBLIC PROJECTS SECTION MANAGER
						</span>
						<h1 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
							Townships & Masterplan Content
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Edit both English and Bengali content for the hero banner,
							spotlight showcase, individual township projects, plot categories,
							amenities, and purchase roadmap.
						</p>
					</div>

					{/* Notification Toast */}
					{savedMessage && (
						<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold font-heading flex items-center gap-2 shadow-xs">
							<CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
							<span>{savedMessage}</span>
						</div>
					)}

					{/* Navigation Tabs */}
					<div className="flex flex-wrap gap-2 border-b border-border/60 pb-3">
						{[
							{ id: "hero", label: "Header & Metrics" },
							{ id: "spotlight", label: "Township Spotlight & Specs" },
							{
								id: "projects",
								label: `Projects Portfolio (${projects.length})`,
							},
							{ id: "categories", label: "Plot Categories" },
							{ id: "amenities", label: "Amenities & Proximity" },
							{ id: "roadmap", label: "Roadmap & Contact CTA" },
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

					{/* TAB 1: HEADER & TRUST METRICS */}
					{activeTab === "hero" && (
						<div className="space-y-6">
							<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
								<div className="border-b border-border/50 pb-3">
									<h2 className="text-base font-semibold font-heading">
										Hero Header Headlines
									</h2>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Hero Headline Prefix (EN)
										</Label>
										<Input
											value={contentForm.heroTitle}
											onChange={(e) =>
												handleContentChange("heroTitle", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											শিরোনাম প্রিফিক্স (BN)
										</Label>
										<Input
											value={contentForm.heroTitleBn || ""}
											onChange={(e) =>
												handleContentChange("heroTitleBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Hero Main Subtitle Highlight (EN)
										</Label>
										<Input
											value={contentForm.heroSubtitle}
											onChange={(e) =>
												handleContentChange("heroSubtitle", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											সাবটাইটেল হাইলাইট (BN)
										</Label>
										<Input
											value={contentForm.heroSubtitleBn || ""}
											onChange={(e) =>
												handleContentChange("heroSubtitleBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Narrative Description (EN)
										</Label>
										<Textarea
											rows={3}
											value={contentForm.heroDesc}
											onChange={(e) =>
												handleContentChange("heroDesc", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											বিবরণ (BN)
										</Label>
										<Textarea
											rows={3}
											value={contentForm.heroDescBn || ""}
											onChange={(e) =>
												handleContentChange("heroDescBn", e.target.value)
											}
										/>
									</div>
								</div>
							</div>

							{/* Trust Metrics */}
							<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
								<div className="flex items-center justify-between border-b border-border/50 pb-3">
									<h2 className="text-base font-semibold font-heading">
										Trust Metrics & Quick Facts
									</h2>
									<Button
										type="button"
										size="sm"
										variant="outline"
										onClick={() => {
											setContentForm((prev) => ({
												...prev,
												trustMetrics: [
													...prev.trustMetrics,
													{
														value: "100+",
														valueBn: "১০০+",
														label: "Metric Label",
														labelBn: "মেট্রিক লেবেল",
													},
												],
											}));
										}}
										className="gap-1 text-xs"
									>
										<Plus className="w-3.5 h-3.5" />
										Add Metric
									</Button>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									{contentForm.trustMetrics.map((m, idx) => (
										<div
											key={idx}
											className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-3 relative group"
										>
											<div className="flex items-center justify-between">
												<span className="text-xs font-mono font-medium text-primary">
													METRIC #{idx + 1}
												</span>
												{contentForm.trustMetrics.length > 1 && (
													<button
														type="button"
														onClick={() => {
															setContentForm((prev) => ({
																...prev,
																trustMetrics: prev.trustMetrics.filter(
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
														Value (EN)
													</Label>
													<Input
														value={m.value}
														onChange={(e) => {
															const updated = [...contentForm.trustMetrics];
															updated[idx].value = e.target.value;
															handleContentChange("trustMetrics", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														মান (BN)
													</Label>
													<Input
														value={m.valueBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.trustMetrics];
															updated[idx].valueBn = e.target.value;
															handleContentChange("trustMetrics", updated);
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
														value={m.label}
														onChange={(e) => {
															const updated = [...contentForm.trustMetrics];
															updated[idx].label = e.target.value;
															handleContentChange("trustMetrics", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														লেবেল (BN)
													</Label>
													<Input
														value={m.labelBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.trustMetrics];
															updated[idx].labelBn = e.target.value;
															handleContentChange("trustMetrics", updated);
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

					{/* TAB 2: SPOTLIGHT & SPECS */}
					{activeTab === "spotlight" && (
						<div className="space-y-6">
							<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
								<div className="border-b border-border/50 pb-3">
									<h2 className="text-base font-semibold font-heading">
										Township Spotlight Showcase
									</h2>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Spotlight Badge (EN)
										</Label>
										<Input
											value={contentForm.spotlightBadge}
											onChange={(e) =>
												handleContentChange("spotlightBadge", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											স্পটলাইট ব্যাজ (BN)
										</Label>
										<Input
											value={contentForm.spotlightBadgeBn || ""}
											onChange={(e) =>
												handleContentChange("spotlightBadgeBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Spotlight Tag (EN)
										</Label>
										<Input
											value={contentForm.spotlightTag}
											onChange={(e) =>
												handleContentChange("spotlightTag", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											স্পটলাইট ট্যাগ (BN)
										</Label>
										<Input
											value={contentForm.spotlightTagBn || ""}
											onChange={(e) =>
												handleContentChange("spotlightTagBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Spotlight Title (EN)
										</Label>
										<Input
											value={contentForm.spotlightTitle}
											onChange={(e) =>
												handleContentChange("spotlightTitle", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											স্পটলাইট শিরোনাম (BN)
										</Label>
										<Input
											value={contentForm.spotlightTitleBn || ""}
											onChange={(e) =>
												handleContentChange("spotlightTitleBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Spotlight Description (EN)
										</Label>
										<Textarea
											rows={3}
											value={contentForm.spotlightDesc}
											onChange={(e) =>
												handleContentChange("spotlightDesc", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											স্পটলাইট বিবরণ (BN)
										</Label>
										<Textarea
											rows={3}
											value={contentForm.spotlightDescBn || ""}
											onChange={(e) =>
												handleContentChange("spotlightDescBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Box Title (EN)
										</Label>
										<Input
											value={contentForm.spotlightBoxTitle}
											onChange={(e) =>
												handleContentChange("spotlightBoxTitle", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											বক্স শিরোনাম (BN)
										</Label>
										<Input
											value={contentForm.spotlightBoxTitleBn || ""}
											onChange={(e) =>
												handleContentChange(
													"spotlightBoxTitleBn",
													e.target.value,
												)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Box Description (EN)
										</Label>
										<Textarea
											rows={3}
											value={contentForm.spotlightBoxDesc}
											onChange={(e) =>
												handleContentChange("spotlightBoxDesc", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											বক্স বিবরণ (BN)
										</Label>
										<Textarea
											rows={3}
											value={contentForm.spotlightBoxDescBn || ""}
											onChange={(e) =>
												handleContentChange(
													"spotlightBoxDescBn",
													e.target.value,
												)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Location (EN)
										</Label>
										<Input
											value={contentForm.spotlightLocation}
											onChange={(e) =>
												handleContentChange("spotlightLocation", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											অবস্থান (BN)
										</Label>
										<Input
											value={contentForm.spotlightLocationBn || ""}
											onChange={(e) =>
												handleContentChange(
													"spotlightLocationBn",
													e.target.value,
												)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Secondary Badge (EN)
										</Label>
										<Input
											value={contentForm.spotlightBadge2}
											onChange={(e) =>
												handleContentChange("spotlightBadge2", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											দ্বিতীয় ব্যাজ (BN)
										</Label>
										<Input
											value={contentForm.spotlightBadge2Bn || ""}
											onChange={(e) =>
												handleContentChange("spotlightBadge2Bn", e.target.value)
											}
										/>
									</div>
								</div>
							</div>

							{/* Specs Cards */}
							<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
								<div className="flex items-center justify-between border-b border-border/50 pb-3">
									<h2 className="text-base font-semibold font-heading">
										Engineering & Elevation Specs
									</h2>
									<Button
										type="button"
										size="sm"
										variant="outline"
										onClick={() => {
											setContentForm((prev) => ({
												...prev,
												specs: [
													...prev.specs,
													{
														num: `0${prev.specs.length + 1}`,
														numBn: `০${prev.specs.length + 1}`,
														title: "New Spec Title",
														titleBn: "নতুন বৈশিষ্ট্য",
														desc: "Spec description...",
														descBn: "বৈশিষ্ট্যের বিবরণ...",
													},
												],
											}));
										}}
										className="gap-1 text-xs"
									>
										<Plus className="w-3.5 h-3.5" />
										Add Spec
									</Button>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									{contentForm.specs.map((sp, idx) => (
										<div
											key={idx}
											className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-3 relative group"
										>
											<div className="flex items-center justify-between">
												<span className="text-xs font-mono font-medium text-primary">
													SPEC #{idx + 1}
												</span>
												{contentForm.specs.length > 1 && (
													<button
														type="button"
														onClick={() => {
															setContentForm((prev) => ({
																...prev,
																specs: prev.specs.filter((_, i) => i !== idx),
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
														Number (EN)
													</Label>
													<Input
														value={sp.num}
														onChange={(e) => {
															const updated = [...contentForm.specs];
															updated[idx].num = e.target.value;
															handleContentChange("specs", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														নম্বর (BN)
													</Label>
													<Input
														value={sp.numBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.specs];
															updated[idx].numBn = e.target.value;
															handleContentChange("specs", updated);
														}}
													/>
												</div>
											</div>

											<div className="grid sm:grid-cols-2 gap-3">
												<div>
													<Label className="text-[11px] text-muted-foreground">
														Title (EN)
													</Label>
													<Input
														value={sp.title}
														onChange={(e) => {
															const updated = [...contentForm.specs];
															updated[idx].title = e.target.value;
															handleContentChange("specs", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														শিরোনাম (BN)
													</Label>
													<Input
														value={sp.titleBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.specs];
															updated[idx].titleBn = e.target.value;
															handleContentChange("specs", updated);
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
														value={sp.desc}
														onChange={(e) => {
															const updated = [...contentForm.specs];
															updated[idx].desc = e.target.value;
															handleContentChange("specs", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														বিবরণ (BN)
													</Label>
													<Textarea
														rows={2}
														value={sp.descBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.specs];
															updated[idx].descBn = e.target.value;
															handleContentChange("specs", updated);
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

					{/* TAB 3: PROJECTS PORTFOLIO LIST */}
					{activeTab === "projects" && (
						<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
							<div className="flex items-center justify-between border-b border-border/50 pb-3">
								<div>
									<h2 className="text-base font-semibold font-heading">
										Township Projects Portfolio
									</h2>
									<p className="text-xs text-muted-foreground">
										Create, edit, and organize individual township projects.
									</p>
								</div>
								<Button
									type="button"
									size="sm"
									onClick={openCreateProjectModal}
									className="gap-1.5 text-xs font-medium font-heading"
								>
									<Plus className="w-4 h-4" />
									Add New Project
								</Button>
							</div>

							<div className="grid gap-4">
								{projects.map((item) => (
									<div
										key={item.id}
										className="p-5 rounded-2xl bg-muted/20 border border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
									>
										<div className="space-y-1">
											<div className="flex items-center gap-2">
												<span className="text-xs font-mono font-medium text-primary">
													#{item.num}
												</span>
												<h3 className="text-sm font-semibold font-heading text-foreground">
													{item.title}
												</h3>
												{item.titleBn && (
													<span className="text-xs text-muted-foreground">
														({item.titleBn})
													</span>
												)}
												<span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-primary/10 text-primary">
													{item.status}
												</span>
											</div>
											<p className="text-xs text-muted-foreground line-clamp-1">
												{item.type} • {item.location}
											</p>
										</div>

										<div className="flex items-center gap-2 shrink-0">
											<Button
												size="sm"
												variant="outline"
												onClick={() => openEditProjectModal(item)}
												className="gap-1 text-xs"
											>
												<Edit3 className="w-3.5 h-3.5" />
												Edit
											</Button>
											<Button
												size="sm"
												variant="ghost"
												onClick={() => handleDeleteProject(item.id)}
												className="text-destructive hover:bg-destructive/10 p-2"
											>
												<Trash2 className="w-4 h-4" />
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* TAB 4: CATEGORIES */}
					{activeTab === "categories" && (
						<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
							<div className="flex items-center justify-between border-b border-border/50 pb-3">
								<div>
									<h2 className="text-base font-semibold font-heading">
										Plot & Property Categories
									</h2>
								</div>
								<Button
									type="button"
									size="sm"
									variant="outline"
									onClick={() => {
										setContentForm((prev) => ({
											...prev,
											categories: [
												...prev.categories,
												{
													title: "New Category",
													titleBn: "নতুন ক্যাটাগরি",
													tag: "Plot Size",
													tagBn: "প্লট সাইজ",
													desc: "Category description...",
													descBn: "ক্যাটাগরির বিবরণ...",
													features: ["Feature 1", "Feature 2"],
													featuresBn: ["বৈশিষ্ট্য ১", "বৈশিষ্ট্য ২"],
												},
											],
										}));
									}}
									className="gap-1 text-xs"
								>
									<Plus className="w-3.5 h-3.5" />
									Add Category
								</Button>
							</div>

							<div className="space-y-4">
								{contentForm.categories.map((cat, idx) => (
									<div
										key={idx}
										className="p-5 rounded-xl bg-muted/20 border border-border/60 space-y-4 relative group"
									>
										<div className="flex items-center justify-between">
											<span className="text-xs font-mono font-medium text-primary">
												CATEGORY #{idx + 1}
											</span>
											{contentForm.categories.length > 1 && (
												<button
													type="button"
													onClick={() => {
														setContentForm((prev) => ({
															...prev,
															categories: prev.categories.filter(
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

										<div className="grid sm:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label className="text-xs text-muted-foreground uppercase">
													Title (EN)
												</Label>
												<Input
													value={cat.title}
													onChange={(e) => {
														const updated = [...contentForm.categories];
														updated[idx].title = e.target.value;
														handleContentChange("categories", updated);
													}}
												/>
											</div>
											<div className="space-y-2">
												<Label className="text-xs text-muted-foreground uppercase">
													শিরোনাম (BN)
												</Label>
												<Input
													value={cat.titleBn || ""}
													onChange={(e) => {
														const updated = [...contentForm.categories];
														updated[idx].titleBn = e.target.value;
														handleContentChange("categories", updated);
													}}
												/>
											</div>
										</div>

										<div className="grid sm:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label className="text-xs text-muted-foreground uppercase">
													Tag (EN)
												</Label>
												<Input
													value={cat.tag}
													onChange={(e) => {
														const updated = [...contentForm.categories];
														updated[idx].tag = e.target.value;
														handleContentChange("categories", updated);
													}}
												/>
											</div>
											<div className="space-y-2">
												<Label className="text-xs text-muted-foreground uppercase">
													ট্যাগ (BN)
												</Label>
												<Input
													value={cat.tagBn || ""}
													onChange={(e) => {
														const updated = [...contentForm.categories];
														updated[idx].tagBn = e.target.value;
														handleContentChange("categories", updated);
													}}
												/>
											</div>
										</div>

										<div className="grid sm:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label className="text-xs text-muted-foreground uppercase">
													Description (EN)
												</Label>
												<Textarea
													rows={2}
													value={cat.desc}
													onChange={(e) => {
														const updated = [...contentForm.categories];
														updated[idx].desc = e.target.value;
														handleContentChange("categories", updated);
													}}
												/>
											</div>
											<div className="space-y-2">
												<Label className="text-xs text-muted-foreground uppercase">
													বিবরণ (BN)
												</Label>
												<Textarea
													rows={2}
													value={cat.descBn || ""}
													onChange={(e) => {
														const updated = [...contentForm.categories];
														updated[idx].descBn = e.target.value;
														handleContentChange("categories", updated);
													}}
												/>
											</div>
										</div>

										<div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
											<div className="space-y-2">
												<Label className="text-xs text-muted-foreground uppercase">
													Features (EN, comma separated)
												</Label>
												<Input
													value={cat.features.join(", ")}
													onChange={(e) => {
														const updated = [...contentForm.categories];
														updated[idx].features = e.target.value
															.split(",")
															.map((f) => f.trim());
														handleContentChange("categories", updated);
													}}
												/>
											</div>
											<div className="space-y-2">
												<Label className="text-xs text-muted-foreground uppercase">
													বৈশিষ্ট্যসমূহ (BN, কমা দ্বারা পৃথক)
												</Label>
												<Input
													value={(cat.featuresBn || []).join(", ")}
													onChange={(e) => {
														const updated = [...contentForm.categories];
														updated[idx].featuresBn = e.target.value
															.split(",")
															.map((f) => f.trim());
														handleContentChange("categories", updated);
													}}
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* TAB 5: AMENITIES & PROXIMITY */}
					{activeTab === "amenities" && (
						<div className="space-y-6">
							{/* Civic Amenities */}
							<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
								<div className="flex items-center justify-between border-b border-border/50 pb-3">
									<h2 className="text-base font-semibold font-heading">
										Civic & Lifestyle Amenities
									</h2>
									<Button
										type="button"
										size="sm"
										variant="outline"
										onClick={() => {
											setContentForm((prev) => ({
												...prev,
												amenities: [
													...prev.amenities,
													{
														title: "New Amenity",
														titleBn: "নতুন সুবিধা",
														tag: "Facility",
														tagBn: "সুবিধা",
														desc: "Amenity description...",
														descBn: "সুবিধার বিবরণ...",
													},
												],
											}));
										}}
										className="gap-1 text-xs"
									>
										<Plus className="w-3.5 h-3.5" />
										Add Amenity
									</Button>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									{contentForm.amenities.map((am, idx) => (
										<div
											key={idx}
											className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-3 relative group"
										>
											<div className="flex items-center justify-between">
												<span className="text-xs font-mono font-medium text-primary">
													AMENITY #{idx + 1}
												</span>
												{contentForm.amenities.length > 1 && (
													<button
														type="button"
														onClick={() => {
															setContentForm((prev) => ({
																...prev,
																amenities: prev.amenities.filter(
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
														Title (EN)
													</Label>
													<Input
														value={am.title}
														onChange={(e) => {
															const updated = [...contentForm.amenities];
															updated[idx].title = e.target.value;
															handleContentChange("amenities", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														শিরোনাম (BN)
													</Label>
													<Input
														value={am.titleBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.amenities];
															updated[idx].titleBn = e.target.value;
															handleContentChange("amenities", updated);
														}}
													/>
												</div>
											</div>

											<div className="grid grid-cols-2 gap-3">
												<div>
													<Label className="text-[11px] text-muted-foreground">
														Tag (EN)
													</Label>
													<Input
														value={am.tag}
														onChange={(e) => {
															const updated = [...contentForm.amenities];
															updated[idx].tag = e.target.value;
															handleContentChange("amenities", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														ট্যাগ (BN)
													</Label>
													<Input
														value={am.tagBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.amenities];
															updated[idx].tagBn = e.target.value;
															handleContentChange("amenities", updated);
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
														value={am.desc}
														onChange={(e) => {
															const updated = [...contentForm.amenities];
															updated[idx].desc = e.target.value;
															handleContentChange("amenities", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														বিবরণ (BN)
													</Label>
													<Textarea
														rows={2}
														value={am.descBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.amenities];
															updated[idx].descBn = e.target.value;
															handleContentChange("amenities", updated);
														}}
													/>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Proximities */}
							<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
								<div className="border-b border-border/50 pb-3">
									<h2 className="text-base font-semibold font-heading">
										Strategic Proximity & Distances
									</h2>
								</div>

								<div className="space-y-4">
									{contentForm.proximities.map((cat, cIdx) => (
										<div
											key={cIdx}
											className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-3"
										>
											<div className="grid sm:grid-cols-2 gap-3">
												<div>
													<Label className="text-xs text-muted-foreground">
														Category Name (EN)
													</Label>
													<Input
														value={cat.category}
														onChange={(e) => {
															const updated = [...contentForm.proximities];
															updated[cIdx].category = e.target.value;
															handleContentChange("proximities", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-xs text-muted-foreground">
														ক্যাটাগরি নাম (BN)
													</Label>
													<Input
														value={cat.categoryBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.proximities];
															updated[cIdx].categoryBn = e.target.value;
															handleContentChange("proximities", updated);
														}}
													/>
												</div>
											</div>

											<div className="space-y-2 pt-2">
												{cat.items.map((item, iIdx) => (
													<div
														key={iIdx}
														className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center"
													>
														<Input
															value={item.name}
															onChange={(e) => {
																const updated = [...contentForm.proximities];
																updated[cIdx].items[iIdx].name = e.target.value;
																handleContentChange("proximities", updated);
															}}
															placeholder="Place (EN)"
														/>
														<Input
															value={item.nameBn || ""}
															onChange={(e) => {
																const updated = [...contentForm.proximities];
																updated[cIdx].items[iIdx].nameBn =
																	e.target.value;
																handleContentChange("proximities", updated);
															}}
															placeholder="স্থান (BN)"
														/>
														<Input
															value={item.dist}
															onChange={(e) => {
																const updated = [...contentForm.proximities];
																updated[cIdx].items[iIdx].dist = e.target.value;
																handleContentChange("proximities", updated);
															}}
															placeholder="Distance (EN)"
														/>
														<Input
															value={item.distBn || ""}
															onChange={(e) => {
																const updated = [...contentForm.proximities];
																updated[cIdx].items[iIdx].distBn =
																	e.target.value;
																handleContentChange("proximities", updated);
															}}
															placeholder="দূরত্ব (BN)"
														/>
													</div>
												))}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* TAB 6: ROADMAP & CTA */}
					{activeTab === "roadmap" && (
						<div className="space-y-6">
							{/* Roadmap Steps */}
							<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
								<div className="flex items-center justify-between border-b border-border/50 pb-3">
									<h2 className="text-base font-semibold font-heading">
										Purchase Roadmap Steps
									</h2>
									<Button
										type="button"
										size="sm"
										variant="outline"
										onClick={() => {
											setContentForm((prev) => ({
												...prev,
												roadmap: [
													...prev.roadmap,
													{
														step: `0${prev.roadmap.length + 1}`,
														stepBn: `০${prev.roadmap.length + 1}`,
														title: "Step Title",
														titleBn: "ধাপ শিরোনাম",
														desc: "Step description...",
														descBn: "ধাপের বিবরণ...",
													},
												],
											}));
										}}
										className="gap-1 text-xs"
									>
										<Plus className="w-3.5 h-3.5" />
										Add Step
									</Button>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									{contentForm.roadmap.map((rd, idx) => (
										<div
											key={idx}
											className="p-4 rounded-xl bg-muted/20 border border-border/60 space-y-3 relative group"
										>
											<div className="flex items-center justify-between">
												<span className="text-xs font-mono font-medium text-primary">
													STEP #{idx + 1}
												</span>
												{contentForm.roadmap.length > 1 && (
													<button
														type="button"
														onClick={() => {
															setContentForm((prev) => ({
																...prev,
																roadmap: prev.roadmap.filter(
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
														Step Number (EN)
													</Label>
													<Input
														value={rd.step}
														onChange={(e) => {
															const updated = [...contentForm.roadmap];
															updated[idx].step = e.target.value;
															handleContentChange("roadmap", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														ধাপ নম্বর (BN)
													</Label>
													<Input
														value={rd.stepBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.roadmap];
															updated[idx].stepBn = e.target.value;
															handleContentChange("roadmap", updated);
														}}
													/>
												</div>
											</div>

											<div className="grid sm:grid-cols-2 gap-3">
												<div>
													<Label className="text-[11px] text-muted-foreground">
														Title (EN)
													</Label>
													<Input
														value={rd.title}
														onChange={(e) => {
															const updated = [...contentForm.roadmap];
															updated[idx].title = e.target.value;
															handleContentChange("roadmap", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														শিরোনাম (BN)
													</Label>
													<Input
														value={rd.titleBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.roadmap];
															updated[idx].titleBn = e.target.value;
															handleContentChange("roadmap", updated);
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
														value={rd.desc}
														onChange={(e) => {
															const updated = [...contentForm.roadmap];
															updated[idx].desc = e.target.value;
															handleContentChange("roadmap", updated);
														}}
													/>
												</div>
												<div>
													<Label className="text-[11px] text-muted-foreground">
														বিবরণ (BN)
													</Label>
													<Textarea
														rows={2}
														value={rd.descBn || ""}
														onChange={(e) => {
															const updated = [...contentForm.roadmap];
															updated[idx].descBn = e.target.value;
															handleContentChange("roadmap", updated);
														}}
													/>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Bottom CTA Banner */}
							<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
								<div className="border-b border-border/50 pb-3">
									<h2 className="text-base font-semibold font-heading">
										Bottom Consultation & Booking CTA
									</h2>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											CTA Badge (EN)
										</Label>
										<Input
											value={contentForm.ctaBadge}
											onChange={(e) =>
												handleContentChange("ctaBadge", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											সিটিএ ব্যাজ (BN)
										</Label>
										<Input
											value={contentForm.ctaBadgeBn || ""}
											onChange={(e) =>
												handleContentChange("ctaBadgeBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											CTA Title (EN)
										</Label>
										<Input
											value={contentForm.ctaTitle}
											onChange={(e) =>
												handleContentChange("ctaTitle", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											সিটিএ শিরোনাম (BN)
										</Label>
										<Input
											value={contentForm.ctaTitleBn || ""}
											onChange={(e) =>
												handleContentChange("ctaTitleBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											CTA Description (EN)
										</Label>
										<Textarea
											rows={3}
											value={contentForm.ctaDesc}
											onChange={(e) =>
												handleContentChange("ctaDesc", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											সিটিএ বিবরণ (BN)
										</Label>
										<Textarea
											rows={3}
											value={contentForm.ctaDescBn || ""}
											onChange={(e) =>
												handleContentChange("ctaDescBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-3 gap-4 pt-2 border-t border-border/40">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Hotline Numbers
										</Label>
										<Input
											value={contentForm.ctaHotline}
											onChange={(e) =>
												handleContentChange("ctaHotline", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Email Address
										</Label>
										<Input
											value={contentForm.ctaEmail}
											onChange={(e) =>
												handleContentChange("ctaEmail", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Office Address (EN)
										</Label>
										<Input
											value={contentForm.ctaOffice}
											onChange={(e) =>
												handleContentChange("ctaOffice", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label className="text-xs font-semibold uppercase text-muted-foreground">
										অফিসের ঠিকানা (BN)
									</Label>
									<Input
										value={contentForm.ctaOfficeBn || ""}
										onChange={(e) =>
											handleContentChange("ctaOfficeBn", e.target.value)
										}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</SectionContainer>

			{/* Project Create/Edit Dialog Modal */}
			{projectModalOpen && (
				<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
					<div className="bg-card border border-border/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 text-left">
						<div className="flex items-center justify-between border-b border-border/50 pb-3">
							<h3 className="text-base font-semibold font-heading">
								{editingProject
									? "Edit Township Project"
									: "Create New Project"}
							</h3>
							<button
								type="button"
								onClick={() => setProjectModalOpen(false)}
								className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						<form onSubmit={handleProjectSave} className="space-y-4">
							<div className="grid sm:grid-cols-3 gap-3">
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										Number
									</Label>
									<Input
										value={projectFormData.num}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												num: e.target.value,
											}))
										}
										placeholder="01"
									/>
								</div>
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										Status
									</Label>
									<select
										value={projectFormData.status}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												status: e.target.value,
											}))
										}
										className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs"
									>
										<option value="Ongoing">Ongoing</option>
										<option value="Upcoming">Upcoming</option>
										<option value="Completed">Completed</option>
									</select>
								</div>
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										স্ট্যাটাস (BN)
									</Label>
									<Input
										value={projectFormData.statusBn || ""}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												statusBn: e.target.value,
											}))
										}
										placeholder="যেমনঃ চলমান"
									/>
								</div>
							</div>

							<div className="grid sm:grid-cols-2 gap-3">
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										Project Title (EN)
									</Label>
									<Input
										value={projectFormData.title}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												title: e.target.value,
											}))
										}
										required
									/>
								</div>
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										প্রজেক্টের নাম (BN)
									</Label>
									<Input
										value={projectFormData.titleBn || ""}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												titleBn: e.target.value,
											}))
										}
									/>
								</div>
							</div>

							<div className="grid sm:grid-cols-2 gap-3">
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										Project Type (EN)
									</Label>
									<Input
										value={projectFormData.type}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												type: e.target.value,
											}))
										}
										placeholder="e.g. Master Planned Township"
									/>
								</div>
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										প্রজেক্টের ধরণ (BN)
									</Label>
									<Input
										value={projectFormData.typeBn || ""}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												typeBn: e.target.value,
											}))
										}
										placeholder="যেমনঃ পরিকল্পিত মেগা টাউনশিপ"
									/>
								</div>
							</div>

							<div className="grid sm:grid-cols-2 gap-3">
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										Location (EN)
									</Label>
									<Input
										value={projectFormData.location}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												location: e.target.value,
											}))
										}
										placeholder="e.g. Bara Badeshi, Savar, Dhaka"
									/>
								</div>
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										অবস্থান (BN)
									</Label>
									<Input
										value={projectFormData.locationBn || ""}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												locationBn: e.target.value,
											}))
										}
										placeholder="যেমনঃ বড় বাদেশী, সাভার, ঢাকা"
									/>
								</div>
							</div>

							<div className="grid sm:grid-cols-2 gap-3">
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										Description (EN)
									</Label>
									<Textarea
										rows={3}
										value={projectFormData.description}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
									/>
								</div>
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										বিবরণ (BN)
									</Label>
									<Textarea
										rows={3}
										value={projectFormData.descriptionBn || ""}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												descriptionBn: e.target.value,
											}))
										}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label className="text-xs text-muted-foreground">
									Image URLs (one per line)
								</Label>
								<Textarea
									rows={2}
									value={projectFormData.images.join("\n")}
									onChange={(e) =>
										setProjectFormData((prev) => ({
											...prev,
											images: e.target.value.split("\n"),
										}))
									}
									placeholder="https://images.unsplash.com/..."
								/>
							</div>

							<div className="grid sm:grid-cols-2 gap-3">
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										Highlights (EN, one per line)
									</Label>
									<Textarea
										rows={3}
										value={projectFormData.highlights.join("\n")}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												highlights: e.target.value.split("\n"),
											}))
										}
									/>
								</div>
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">
										হাইলাইটস (BN, প্রতি লাইনে একটি)
									</Label>
									<Textarea
										rows={3}
										value={(projectFormData.highlightsBn || []).join("\n")}
										onChange={(e) =>
											setProjectFormData((prev) => ({
												...prev,
												highlightsBn: e.target.value.split("\n"),
											}))
										}
									/>
								</div>
							</div>

							<div className="flex items-center justify-end gap-3 pt-3 border-t border-border/50">
								<Button
									type="button"
									variant="outline"
									onClick={() => setProjectModalOpen(false)}
									className="text-xs"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={saving}
									className="gap-1.5 text-xs"
								>
									{saving ? (
										<Loader2 className="w-3.5 h-3.5 animate-spin" />
									) : (
										<Save className="w-3.5 h-3.5" />
									)}
									Save Project
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Single Floating Bottom-Right Save Capsule */}
			<div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-1.5 rounded-full bg-card/90 backdrop-blur-xl border border-border/80 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
				<button
					onClick={() => handleSaveContent()}
					disabled={saving || contentLoading}
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
