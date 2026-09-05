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
	MapPin,
	Eye,
	RefreshCw,
	Sparkles,
	FileText,
	Building2,
	Compass,
	HelpCircle,
	PhoneCall,
	Award,
	Image as ImageIcon,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useProjects, ProjectItem } from "@/hooks/useProjects";
import {
	useProjectsContent,
	ProjectsContentData,
	DEFAULT_PROJECTS_CONTENT,
} from "@/hooks/useProjectsContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const emptyProjectForm: Omit<ProjectItem, "id"> = {
	num: "",
	title: "",
	type: "Township Project",
	status: "Ongoing",
	location: "",
	description: "",
	images: [""],
	highlights: [""],
	demoUrl: "",
	clientInfo: "",
	order: 0,
	active: true,
};

export default function ProjectsSettingsPage() {
	// 1. Projects Content State (Header, Spotlight, Amenities, Proximity, Roadmap, CTA)
	const {
		data: initialContent,
		loading: contentLoading,
		updateContent,
		refetch: refetchContent,
	} = useProjectsContent();
	const [contentForm, setContentForm] =
		useState<ProjectsContentData>(initialContent);

	// 2. Individual Projects State (Township Project List CRUD)
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
			type: item.type || "Township Project",
			status: item.status || "Ongoing",
			location: item.location || "",
			description: item.description,
			images: item.images && item.images.length > 0 ? item.images : [""],
			highlights:
				item.highlights && item.highlights.length > 0 ? item.highlights : [""],
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
			const cleanedHighlights = projectFormData.highlights.filter(
				(h) => h.trim() !== "",
			);
			const cleanedImages = projectFormData.images.filter(
				(img) => img.trim() !== "",
			);

			const payload = {
				...projectFormData,
				highlights: cleanedHighlights,
				images: cleanedImages,
			};

			if (editingProject) {
				await updateProject(editingProject.id, payload);
				setSavedMessage("Project updated successfully in database!");
			} else {
				await createProject(payload);
				setSavedMessage("New project created successfully in database!");
			}

			setProjectModalOpen(false);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (err: any) {
			console.error("Failed to save project", err);
			alert("Error saving: " + err.message);
		} finally {
			setSaving(false);
		}
	};

	const handleProjectDelete = async (id: string) => {
		setSaving(true);
		try {
			await deleteProject(id);
			setSavedMessage("Project deleted successfully!");
			setDeleteConfirmId(null);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (err: any) {
			console.error("Failed to delete project", err);
			alert("Error deleting: " + err.message);
		} finally {
			setSaving(false);
		}
	};

	const isGlobalLoading = contentLoading || projectsLoading;

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
								onClick={() => {
									refetchContent();
									refetchProjects();
								}}
								disabled={isGlobalLoading}
								className="px-3.5 h-8 rounded-full border border-border/80 text-foreground hover:bg-muted text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
							>
								<RefreshCw
									className={`w-3.5 h-3.5 ${isGlobalLoading ? "animate-spin" : ""}`}
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
						<span className="text-xs font-semibold uppercase tracking-wider text-primary font-heading inline-flex items-center gap-1.5">
							<Sparkles className="w-3.5 h-3.5" /> PUBLIC PROJECTS PAGE COMPLETE
							CONTROL
						</span>
						<h1 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
							Projects & Township Settings
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Manage headers, trust metrics, spotlight specifications, portfolio
							projects, amenities, connectivity matrix, and allotment roadmap.
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
							{ id: "hero", label: "Header & Trust Metrics", icon: FileText },
							{ id: "spotlight", label: "Spotlight & Specs", icon: Award },
							{
								id: "projects",
								label: `Township Projects (${projects.length})`,
								icon: Building2,
							},
							{
								id: "categories",
								label: "Property Categories",
								icon: HelpCircle,
							},
							{
								id: "amenities",
								label: "Amenities & Proximity",
								icon: Compass,
							},
							{ id: "roadmap", label: "Roadmap & CTA Desk", icon: PhoneCall },
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

					{isGlobalLoading ? (
						<div className="p-16 text-center text-muted-foreground text-xs flex items-center justify-center gap-2">
							<Loader2 className="w-4 h-4 animate-spin text-primary" />
							<span>Loading projects data from PostgreSQL...</span>
						</div>
					) : (
						<div className="space-y-6">
							{/* ── TAB 1: HEADER & TRUST METRICS ── */}
							{activeTab === "hero" && (
								<form onSubmit={handleSaveContent} className="space-y-6">
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4">
										<h2 className="text-sm font-medium font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Projects Page Header Overlay
										</h2>

										<div className="grid sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													Main Title Line 1 *
												</Label>
												<Input
													value={contentForm.heroTitle}
													onChange={(e) =>
														handleContentChange("heroTitle", e.target.value)
													}
												/>
											</div>
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													Subtitle Highlight *
												</Label>
												<Input
													value={contentForm.heroSubtitle}
													onChange={(e) =>
														handleContentChange("heroSubtitle", e.target.value)
													}
												/>
											</div>
										</div>

										<div className="space-y-1.5">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												Hero Description *
											</Label>
											<Textarea
												rows={3}
												value={contentForm.heroDesc}
												onChange={(e) =>
													handleContentChange("heroDesc", e.target.value)
												}
											/>
										</div>
									</div>

									{/* 4 Trust Metrics */}
									<div className="space-y-4 pt-4 border-t border-border/50">
										<h2 className="text-sm font-medium font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Mega Township Trust Metrics (3 Counters)
										</h2>

										<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
											{contentForm.trustMetrics.map((tm, idx) => (
												<div
													key={idx}
													className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2"
												>
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-primary font-mono">
															Metric #{idx + 1} Value
														</Label>
														<Input
															value={tm.value}
															onChange={(e) => {
																const updated = [...contentForm.trustMetrics];
																updated[idx].value = e.target.value;
																handleContentChange("trustMetrics", updated);
															}}
														/>
													</div>
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-muted-foreground">
															Label
														</Label>
														<Input
															value={tm.label}
															onChange={(e) => {
																const updated = [...contentForm.trustMetrics];
																updated[idx].label = e.target.value;
																handleContentChange("trustMetrics", updated);
															}}
														/>
													</div>
												</div>
											))}
										</div>
									</div>

									<div className="flex justify-end pt-2">
										<Button
											type="submit"
											disabled={saving}
											className="gap-2 px-6"
										>
											{saving ? (
												<Loader2 className="w-4 h-4 animate-spin" />
											) : (
												<Save className="w-4 h-4" />
											)}
											Save Header Settings
										</Button>
									</div>
								</form>
							)}

							{/* ── TAB 2: FLAGSHIP SPOTLIGHT & SPECS ── */}
							{activeTab === "spotlight" && (
								<form onSubmit={handleSaveContent} className="space-y-6">
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4">
										<h2 className="text-sm font-medium font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Digital Master Plan PDF / File Asset
										</h2>

										<div className="grid sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													Badge Tag
												</Label>
												<Input
													value={contentForm.spotlightBadge}
													onChange={(e) =>
														handleContentChange(
															"spotlightBadge",
															e.target.value,
														)
													}
												/>
											</div>
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													Spotlight Title
												</Label>
												<Input
													value={contentForm.spotlightTitle}
													onChange={(e) =>
														handleContentChange(
															"spotlightTitle",
															e.target.value,
														)
													}
												/>
											</div>
										</div>

										<div className="space-y-1.5">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												Spotlight Sub-Narrative
											</Label>
											<Textarea
												rows={2}
												value={contentForm.spotlightDesc}
												onChange={(e) =>
													handleContentChange("spotlightDesc", e.target.value)
												}
											/>
										</div>

										<div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-border/50">
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-accent">
													Left Box Headline
												</Label>
												<Input
													value={contentForm.spotlightBoxTitle}
													onChange={(e) =>
														handleContentChange(
															"spotlightBoxTitle",
															e.target.value,
														)
													}
												/>
											</div>
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-accent">
													Left Box Tag
												</Label>
												<Input
													value={contentForm.spotlightTag}
													onChange={(e) =>
														handleContentChange("spotlightTag", e.target.value)
													}
												/>
											</div>
										</div>

										<div className="space-y-1.5">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												Left Box Description
											</Label>
											<Textarea
												rows={3}
												value={contentForm.spotlightBoxDesc}
												onChange={(e) =>
													handleContentChange(
														"spotlightBoxDesc",
														e.target.value,
													)
												}
											/>
										</div>
									</div>

									{/* 4 Specifications */}
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4">
										<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											4 Engineering & Legal Specifications
										</h2>

										<div className="grid sm:grid-cols-2 gap-4">
											{contentForm.specs.map((spec, idx) => (
												<div
													key={idx}
													className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2"
												>
													<div className="grid grid-cols-12 gap-2">
														<div className="col-span-3 space-y-1">
															<Label className="text-[10px] font-mono text-primary uppercase">
																Num
															</Label>
															<Input
																value={spec.num}
																onChange={(e) => {
																	const updated = [...contentForm.specs];
																	updated[idx].num = e.target.value;
																	handleContentChange("specs", updated);
																}}
															/>
														</div>
														<div className="col-span-9 space-y-1">
															<Label className="text-[10px] font-semibold text-muted-foreground uppercase">
																Spec Title
															</Label>
															<Input
																value={spec.title}
																onChange={(e) => {
																	const updated = [...contentForm.specs];
																	updated[idx].title = e.target.value;
																	handleContentChange("specs", updated);
																}}
															/>
														</div>
													</div>
													<div className="space-y-1">
														<Label className="text-[10px] font-semibold text-muted-foreground uppercase">
															Description
														</Label>
														<Textarea
															rows={2}
															value={spec.desc}
															onChange={(e) => {
																const updated = [...contentForm.specs];
																updated[idx].desc = e.target.value;
																handleContentChange("specs", updated);
															}}
														/>
													</div>
												</div>
											))}
										</div>
									</div>

									<div className="flex justify-end pt-2">
										<Button
											type="submit"
											disabled={saving}
											className="gap-2 px-6"
										>
											{saving ? (
												<Loader2 className="w-4 h-4 animate-spin" />
											) : (
												<Save className="w-4 h-4" />
											)}
											Save Spotlight Settings
										</Button>
									</div>
								</form>
							)}

							{/* ── TAB 3: TOWNSHIP PROJECTS LIST (CRUD) ── */}
							{activeTab === "projects" && (
								<div className="space-y-5">
									<div className="flex items-center justify-between border-b border-border/50 pb-2.5">
										<div>
											<h2 className="text-sm font-medium font-heading uppercase tracking-wider text-muted-foreground">
												Township Projects Portfolio ({projects.length})
											</h2>
											<p className="text-xs text-muted-foreground font-light">
												These projects appear directly in the Development
												Portfolio section on the public projects page.
											</p>
										</div>
										<Button
											type="button"
											size="sm"
											onClick={openCreateProjectModal}
											className="gap-1 text-xs"
										>
											<Plus className="w-3.5 h-3.5" />
											Add New Project
										</Button>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{projects.map((item, idx) => (
											<div
												key={item.id || idx}
												className="bg-card border border-border/70 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all text-left"
											>
												<div className="space-y-3">
													<div className="flex items-center justify-between">
														<span className="text-xs font-mono font-bold text-primary px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20">
															{item.num || `0${idx + 1}`}
														</span>
														<span className="text-[10px] font-bold font-heading text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 uppercase tracking-wider">
															{item.status}
														</span>
													</div>

													{item.images &&
														item.images.length > 0 &&
														item.images[0] && (
															<div className="h-40 rounded-xl overflow-hidden bg-muted border border-border/50 relative">
																<img
																	src={item.images[0]}
																	alt={item.title}
																	className="w-full h-full object-cover"
																	onError={(e) => {
																		(e.target as HTMLElement).style.display =
																			"none";
																	}}
																/>
															</div>
														)}

													<div>
														<h3 className="text-base font-semibold font-heading text-foreground">
															{item.title}
														</h3>
														<p className="text-xs text-muted-foreground flex items-center gap-1 font-light mt-1">
															<MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
															<span className="truncate">{item.location}</span>
														</p>
													</div>

													<p className="text-xs text-muted-foreground font-light line-clamp-3 leading-relaxed">
														{item.description}
													</p>

													{item.highlights && item.highlights.length > 0 && (
														<div className="space-y-1.5 pt-1">
															<span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground font-heading block">
																Highlights ({item.highlights.length}):
															</span>
															<div className="flex flex-wrap gap-1.5">
																{item.highlights.map((h, i) => (
																	<span
																		key={i}
																		className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium"
																	>
																		{h}
																	</span>
																))}
															</div>
														</div>
													)}
												</div>

												{/* Action Buttons */}
												<div className="pt-3 border-t border-border/50 flex items-center justify-between">
													<span className="text-[10px] font-mono text-muted-foreground">
														Order: #{item.order}
													</span>
													<div className="flex items-center gap-2">
														<Button
															type="button"
															variant="outline"
															size="sm"
															onClick={() => openEditProjectModal(item)}
															className="h-8 text-xs font-semibold font-heading gap-1"
														>
															<Edit3 className="w-3.5 h-3.5" />
															Edit
														</Button>
														<Button
															type="button"
															variant="destructive"
															size="sm"
															onClick={() => setDeleteConfirmId(item.id)}
															className="h-8 text-xs font-semibold font-heading gap-1"
														>
															<Trash2 className="w-3.5 h-3.5" />
															Delete
														</Button>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							{/* ── TAB 4: PROPERTY CATEGORIES ── */}
							{activeTab === "categories" && (
								<form onSubmit={handleSaveContent} className="space-y-6">
									<div className="space-y-4 pt-4 border-t border-border/50">
										<h2 className="text-sm font-medium font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Project Specifications Grid (6 Key Specs)
										</h2>

										<div className="grid sm:grid-cols-3 gap-4">
											{contentForm.categories.map((cat, idx) => (
												<div
													key={idx}
													className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-3"
												>
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-primary">
															Category Title
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
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-muted-foreground">
															Badge Tag
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
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-muted-foreground">
															Description
														</Label>
														<Textarea
															rows={3}
															value={cat.desc}
															onChange={(e) => {
																const updated = [...contentForm.categories];
																updated[idx].desc = e.target.value;
																handleContentChange("categories", updated);
															}}
														/>
													</div>
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-muted-foreground">
															Features (comma-separated)
														</Label>
														<Input
															value={cat.features.join(", ")}
															onChange={(e) => {
																const updated = [...contentForm.categories];
																updated[idx].features = e.target.value
																	.split(",")
																	.map((s) => s.trim())
																	.filter(Boolean);
																handleContentChange("categories", updated);
															}}
														/>
													</div>
												</div>
											))}
										</div>
									</div>

									<div className="flex justify-end pt-2">
										<Button
											type="submit"
											disabled={saving}
											className="gap-2 px-6"
										>
											{saving ? (
												<Loader2 className="w-4 h-4 animate-spin" />
											) : (
												<Save className="w-4 h-4" />
											)}
											Save Categories Settings
										</Button>
									</div>
								</form>
							)}

							{/* ── TAB 5: AMENITIES & PROXIMITY ── */}
							{activeTab === "amenities" && (
								<form onSubmit={handleSaveContent} className="space-y-6">
									{/* 6 Amenities */}
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-5">
										<h2 className="text-sm font-medium font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Civic & Lifestyle Amenities (6 Features)
										</h2>

										<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
											{contentForm.amenities.map((am, idx) => (
												<div
													key={idx}
													className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2"
												>
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-primary">
															Amenity Title
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
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-muted-foreground">
															Category Tag
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
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-muted-foreground">
															Description
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
												</div>
											))}
										</div>
									</div>

									{/* Proximity Matrix */}
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-5">
										<h2 className="text-sm font-medium font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Connectivity & Location Advantages Matrix (6 Hubs)
										</h2>

										<div className="grid sm:grid-cols-3 gap-4">
											{contentForm.proximities.map((group, gIdx) => (
												<div
													key={gIdx}
													className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-3"
												>
													<div className="space-y-1">
														<Label className="text-[11px] font-semibold text-primary">
															Cluster Category
														</Label>
														<Input
															value={group.category}
															onChange={(e) => {
																const updated = [...contentForm.proximities];
																updated[gIdx].category = e.target.value;
																handleContentChange("proximities", updated);
															}}
														/>
													</div>

													<div className="space-y-2 pt-2 border-t border-border/50">
														<Label className="text-[10px] font-semibold text-muted-foreground uppercase">
															Landmarks & Distances
														</Label>
														{group.items.map((it, itIdx) => (
															<div
																key={itIdx}
																className="grid grid-cols-12 gap-1.5 items-center"
															>
																<div className="col-span-8">
																	<Input
																		className="h-8 text-xs"
																		value={it.name}
																		onChange={(e) => {
																			const updated = [
																				...contentForm.proximities,
																			];
																			updated[gIdx].items[itIdx].name =
																				e.target.value;
																			handleContentChange(
																				"proximities",
																				updated,
																			);
																		}}
																	/>
																</div>
																<div className="col-span-4">
																	<Input
																		className="h-8 text-xs font-mono"
																		value={it.dist}
																		onChange={(e) => {
																			const updated = [
																				...contentForm.proximities,
																			];
																			updated[gIdx].items[itIdx].dist =
																				e.target.value;
																			handleContentChange(
																				"proximities",
																				updated,
																			);
																		}}
																	/>
																</div>
															</div>
														))}
													</div>
												</div>
											))}
										</div>
									</div>

									<div className="flex justify-end pt-2">
										<Button
											type="submit"
											disabled={saving}
											className="gap-2 px-6"
										>
											{saving ? (
												<Loader2 className="w-4 h-4 animate-spin" />
											) : (
												<Save className="w-4 h-4" />
											)}
											Save Amenities Settings
										</Button>
									</div>
								</form>
							)}

							{/* ── TAB 6: ROADMAP & CTA DESK ── */}
							{activeTab === "roadmap" && (
								<form onSubmit={handleSaveContent} className="space-y-6">
									{/* 4 Steps */}
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-5">
										<h2 className="text-sm font-medium font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Township Spotlight Banner Info
										</h2>

										<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
											{contentForm.roadmap.map((st, idx) => (
												<div
													key={idx}
													className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-2"
												>
													<div className="space-y-1">
														<Label className="text-[10px] font-mono text-accent uppercase">
															Step #{st.step}
														</Label>
														<Input
															value={st.title}
															onChange={(e) => {
																const updated = [...contentForm.roadmap];
																updated[idx].title = e.target.value;
																handleContentChange("roadmap", updated);
															}}
														/>
													</div>
													<div className="space-y-1">
														<Label className="text-[10px] font-semibold text-muted-foreground uppercase">
															Description
														</Label>
														<Textarea
															rows={3}
															value={st.desc}
															onChange={(e) => {
																const updated = [...contentForm.roadmap];
																updated[idx].desc = e.target.value;
																handleContentChange("roadmap", updated);
															}}
														/>
													</div>
												</div>
											))}
										</div>
									</div>

									{/* CTA Consultation Desk */}
									<div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 space-y-4">
										<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2.5">
											Bottom Direct Consultation Desk
										</h2>

										<div className="grid sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													CTA Title
												</Label>
												<Input
													value={contentForm.ctaTitle}
													onChange={(e) =>
														handleContentChange("ctaTitle", e.target.value)
													}
												/>
											</div>
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													Direct Hotline
												</Label>
												<Input
													value={contentForm.ctaHotline}
													onChange={(e) =>
														handleContentChange("ctaHotline", e.target.value)
													}
												/>
											</div>
										</div>

										<div className="grid sm:grid-cols-2 gap-4">
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													Support Email
												</Label>
												<Input
													value={contentForm.ctaEmail}
													onChange={(e) =>
														handleContentChange("ctaEmail", e.target.value)
													}
												/>
											</div>
											<div className="space-y-1.5">
												<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
													Corporate Office Address
												</Label>
												<Input
													value={contentForm.ctaOffice}
													onChange={(e) =>
														handleContentChange("ctaOffice", e.target.value)
													}
												/>
											</div>
										</div>

										<div className="space-y-1.5">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												CTA Subtitle / Description
											</Label>
											<Textarea
												rows={2}
												value={contentForm.ctaDesc}
												onChange={(e) =>
													handleContentChange("ctaDesc", e.target.value)
												}
											/>
										</div>
									</div>

									<div className="flex justify-end pt-2">
										<Button
											type="submit"
											disabled={saving}
											className="gap-2 px-6"
										>
											{saving ? (
												<Loader2 className="w-4 h-4 animate-spin" />
											) : (
												<Save className="w-4 h-4" />
											)}
											Save Roadmap & CTA Settings
										</Button>
									</div>
								</form>
							)}
						</div>
					)}
				</div>
			</SectionContainer>

			{/* ── CREATE / EDIT PROJECT MODAL ── */}
			{projectModalOpen && (
				<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
					<div className="bg-card border border-border/80 rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
						<div className="flex items-center justify-between border-b border-border/50 pb-3">
							<h3 className="text-base font-semibold font-heading text-foreground">
								{editingProject ? "Edit Project" : "Add New Township Project"}
							</h3>
							<button
								onClick={() => setProjectModalOpen(false)}
								className="p-1 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
							>
								<X className="w-4 h-4" />
							</button>
						</div>

						<form
							onSubmit={handleProjectSave}
							className="p-6 space-y-4 max-h-[75vh] overflow-y-auto"
						>
							<div className="grid sm:grid-cols-12 gap-3">
								<div className="sm:col-span-3 space-y-1">
									<Label className="text-[11px] font-semibold uppercase text-muted-foreground">
										Number Tag
									</Label>
									<Input
										value={projectFormData.num}
										onChange={(e) =>
											setProjectFormData((p) => ({ ...p, num: e.target.value }))
										}
										placeholder="e.g. 01"
									/>
								</div>
								<div className="sm:col-span-9 space-y-1">
									<Label className="text-[11px] font-semibold uppercase text-muted-foreground">
										Project Title *
									</Label>
									<Input
										required
										value={projectFormData.title}
										onChange={(e) =>
											setProjectFormData((p) => ({
												...p,
												title: e.target.value,
											}))
										}
										placeholder="e.g. Silicon City (Phase 1 & 2)"
									/>
								</div>
							</div>

							<div className="grid sm:grid-cols-2 gap-3">
								<div className="space-y-1">
									<Label className="text-[11px] font-semibold uppercase text-muted-foreground">
										Project Status *
									</Label>
									<select
										value={projectFormData.status}
										onChange={(e) =>
											setProjectFormData((p) => ({
												...p,
												status: e.target.value,
											}))
										}
										className="w-full h-10 px-3 rounded-lg border border-border/70 bg-background text-xs text-foreground focus:outline-none focus:border-primary cursor-pointer"
									>
										<option value="Ongoing">Ongoing</option>
										<option value="Upcoming">Upcoming</option>
										<option value="Completed">Completed</option>
									</select>
								</div>
								<div className="space-y-1">
									<Label className="text-[11px] font-semibold uppercase text-muted-foreground">
										Location *
									</Label>
									<Input
										required
										value={projectFormData.location}
										onChange={(e) =>
											setProjectFormData((p) => ({
												...p,
												location: e.target.value,
											}))
										}
										placeholder="e.g. Savar, Dhaka"
									/>
								</div>
							</div>

							<div className="space-y-1">
								<Label className="text-[11px] font-semibold uppercase text-muted-foreground">
									Project Description *
								</Label>
								<Textarea
									rows={3}
									required
									value={projectFormData.description}
									onChange={(e) =>
										setProjectFormData((p) => ({
											...p,
											description: e.target.value,
										}))
									}
									placeholder="Comprehensive project narrative..."
								/>
							</div>

							{/* Photo URLs */}
							<div className="space-y-2 pt-2 border-t border-border/50">
								<div className="flex items-center justify-between">
									<Label className="text-[11px] font-semibold uppercase text-muted-foreground">
										Project Photos ({projectFormData.images.length})
									</Label>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() =>
											setProjectFormData((p) => ({
												...p,
												images: [...p.images, ""],
											}))
										}
										className="h-7 text-xs text-primary gap-1"
									>
										<Plus className="w-3 h-3" /> Add Image URL
									</Button>
								</div>

								{projectFormData.images.map((img, idx) => (
									<div key={idx} className="flex items-center gap-2">
										<Input
											value={img}
											onChange={(e) => {
												const updated = [...projectFormData.images];
												updated[idx] = e.target.value;
												setProjectFormData((p) => ({ ...p, images: updated }));
											}}
											placeholder="https://images.unsplash.com/..."
										/>
										{projectFormData.images.length > 1 && (
											<Button
												type="button"
												variant="ghost"
												size="icon"
												onClick={() => {
													const updated = projectFormData.images.filter(
														(_, i) => i !== idx,
													);
													setProjectFormData((p) => ({
														...p,
														images: updated,
													}));
												}}
												className="h-9 w-9 text-destructive shrink-0"
											>
												<X className="w-4 h-4" />
											</Button>
										)}
									</div>
								))}
							</div>

							{/* Highlights */}
							<div className="space-y-2 pt-2 border-t border-border/50">
								<div className="flex items-center justify-between">
									<Label className="text-[11px] font-semibold uppercase text-muted-foreground">
										Feature Highlights ({projectFormData.highlights.length})
									</Label>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() =>
											setProjectFormData((p) => ({
												...p,
												highlights: [...p.highlights, ""],
											}))
										}
										className="h-7 text-xs text-primary gap-1"
									>
										<Plus className="w-3 h-3" /> Add Feature
									</Button>
								</div>

								{projectFormData.highlights.map((h, idx) => (
									<div key={idx} className="flex items-center gap-2">
										<Input
											value={h}
											onChange={(e) => {
												const updated = [...projectFormData.highlights];
												updated[idx] = e.target.value;
												setProjectFormData((p) => ({
													...p,
													highlights: updated,
												}));
											}}
											placeholder="e.g. 30ft & 40ft Wide Roads"
										/>
										{projectFormData.highlights.length > 1 && (
											<Button
												type="button"
												variant="ghost"
												size="icon"
												onClick={() => {
													const updated = projectFormData.highlights.filter(
														(_, i) => i !== idx,
													);
													setProjectFormData((p) => ({
														...p,
														highlights: updated,
													}));
												}}
												className="h-9 w-9 text-destructive shrink-0"
											>
												<X className="w-4 h-4" />
											</Button>
										)}
									</div>
								))}
							</div>

							{/* Modal Save Bar */}
							<div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
								<Button
									type="button"
									variant="outline"
									onClick={() => setProjectModalOpen(false)}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={saving}
									className="gap-1.5 font-bold"
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

			{/* ── DELETE CONFIRM MODAL ── */}
			{deleteConfirmId && (
				<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
					<div className="bg-card border border-border/80 rounded-2xl max-w-sm w-full p-6 space-y-4 text-center">
						<h3 className="text-base font-bold font-heading text-foreground">
							Delete Project?
						</h3>
						<p className="text-xs text-muted-foreground font-light">
							Are you sure you want to permanently delete this project from the
							database?
						</p>
						<div className="flex items-center justify-center gap-3 pt-2">
							<Button
								variant="outline"
								onClick={() => setDeleteConfirmId(null)}
							>
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={() => handleProjectDelete(deleteConfirmId)}
								disabled={saving}
							>
								{saving ? "Deleting..." : "Delete Permanently"}
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* ── FLOATING BOTTOM-RIGHT SAVE CAPSULE ── */}
			<div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-1.5 rounded-full bg-card/90 backdrop-blur-xl border border-border/80 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
				<button
					onClick={() => handleSaveContent()}
					disabled={saving || isGlobalLoading}
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
