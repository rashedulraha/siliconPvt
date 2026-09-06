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
				</div>
			</SectionContainer>
		</div>
	);
}
