"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Plus,
	Edit3,
	Trash2,
	Save,
	Lock,
	Loader2,
	CheckCircle2,
	X,
	Building2,
	MapPin,
	ListCheck,
	Tag,
	Hash,
	Link2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useAdminEditor } from "@/context/AdminEditorContext";
import { useProjects, ProjectItem } from "@/hooks/useProjects";

const emptyForm: Omit<ProjectItem, "id"> = {
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
	const { isEditorUnlocked, unlockEditorMode } = useAdminEditor();
	const { projects, loading, createProject, updateProject, deleteProject } =
		useProjects();

	const [modalOpen, setModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
	const [formData, setFormData] = useState<Omit<ProjectItem, "id">>(emptyForm);
	const [saving, setSaving] = useState(false);
	const [savedMessage, setSavedMessage] = useState("");
	const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

	const openCreateModal = () => {
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setEditingItem(null);
		setFormData({
			...emptyForm,
			num: `0${projects.length + 1}`,
			order: projects.length + 1,
		});
		setModalOpen(true);
	};

	const openEditModal = (item: ProjectItem) => {
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setEditingItem(item);
		setFormData({
			num: item.num || "",
			title: item.title,
			type: item.type || "Township Project",
			status: item.status || "Ongoing",
			location: item.location || "",
			description: item.description,
			images: item.images && item.images.length > 0 ? item.images : [""],
			highlights: item.highlights && item.highlights.length > 0 ? item.highlights : [""],
			demoUrl: item.demoUrl || "",
			clientInfo: item.clientInfo || "",
			order: item.order,
			active: item.active,
		});
		setModalOpen(true);
	};

	const handleHighlightChange = (index: number, value: string) => {
		const updated = [...formData.highlights];
		updated[index] = value;
		setFormData((prev) => ({ ...prev, highlights: updated }));
	};

	const addHighlight = () => {
		setFormData((prev) => ({ ...prev, highlights: [...prev.highlights, ""] }));
	};

	const removeHighlight = (index: number) => {
		setFormData((prev) => ({
			...prev,
			highlights: prev.highlights.filter((_, i) => i !== index),
		}));
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSaving(true);
		try {
			const cleanedHighlights = formData.highlights.filter((h) => h.trim() !== "");
			const cleanedImages = formData.images.filter((img) => img.trim() !== "");

			const payload = {
				...formData,
				highlights: cleanedHighlights,
				images: cleanedImages,
			};

			if (editingItem) {
				await updateProject(editingItem.id, payload);
				setSavedMessage("Project updated successfully!");
			} else {
				await createProject(payload);
				setSavedMessage("New project created successfully!");
			}

			setModalOpen(false);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (e) {
			console.error("Failed to save project", e);
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSaving(true);
		try {
			await deleteProject(id);
			setSavedMessage("Project deleted successfully!");
			setDeleteConfirmId(null);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (e) {
			console.error("Failed to delete project", e);
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
							onClick={openCreateModal}
							className="px-4 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-medium font-heading inline-flex items-center gap-1.5 transition-all shadow-none hover:bg-primary/90 cursor-pointer"
						>
							<Plus className="w-3.5 h-3.5" />
							Add New Project
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
									<strong>Read-Only Mode Active:</strong> Project management is in view-only mode until Editor Mode is unlocked.
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
								PORTFOLIO & TOWNSHIPS CONTROL
							</span>
							<h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
								Real Estate Projects Showcase
							</h1>
							<p className="text-xs sm:text-sm text-muted-foreground font-light mt-0.5">
								{projects.length} portfolio projects configured • Add, edit, or remove showcase projects.
							</p>
						</div>
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
							<span>Loading projects from database...</span>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{projects.map((item, idx) => (
								<div
									key={item.id || idx}
									className="bg-card border border-border/70 rounded-3xl p-6 shadow-none flex flex-col justify-between space-y-4 hover:border-border transition-all"
								>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-xs font-mono font-medium text-primary px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20">
												{item.num || `0${idx + 1}`}
											</span>
											<span className="text-[11px] font-medium font-heading text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
												{item.status}
											</span>
										</div>

										<h3 className="text-lg font-semibold font-heading text-foreground">
											{item.title}
										</h3>

										<div className="flex items-center gap-1.5 text-xs text-muted-foreground font-light">
											<MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
											<span className="line-clamp-1">{item.location}</span>
										</div>

										<p className="text-xs text-muted-foreground font-light line-clamp-3 leading-relaxed">
											{item.description}
										</p>

										{item.highlights && item.highlights.length > 0 && (
											<div className="space-y-1.5 pt-1">
												<span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground font-heading block">
													Highlights ({item.highlights.length}):
												</span>
												<div className="flex flex-wrap gap-1.5">
													{item.highlights.slice(0, 3).map((h, i) => (
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

									<div className="flex items-center justify-between pt-4 border-t border-border/50">
										<span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${item.active ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-muted text-muted-foreground"}`}>
											{item.active ? "ACTIVE" : "HIDDEN"}
										</span>

										<div className="flex items-center gap-2">
											<button
												onClick={() => openEditModal(item)}
												className="px-3 py-1.5 rounded-xl bg-muted/60 hover:bg-muted text-foreground text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer transition-all"
											>
												<Edit3 className="w-3.5 h-3.5" /> Edit
											</button>
											<button
												onClick={() => setDeleteConfirmId(item.id)}
												className="px-3 py-1.5 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer transition-all"
											>
												<Trash2 className="w-3.5 h-3.5" /> Delete
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</SectionContainer>

			{/* ── CREATE / EDIT MODAL ── */}
			<AnimatePresence>
				{modalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
						onClick={() => setModalOpen(false)}
					>
						<motion.div
							initial={{ scale: 0.96, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.96, opacity: 0 }}
							className="bg-card border border-border/80 rounded-[28px] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="sticky top-0 bg-card border-b border-border/50 px-6 py-4 flex items-center justify-between rounded-t-[28px]">
								<div>
									<h3 className="text-base font-bold font-heading text-foreground">
										{editingItem ? "Edit Project" : "Add New Project"}
									</h3>
									<p className="text-xs text-muted-foreground font-light">
										{editingItem ? `Editing: ${editingItem.title}` : "Configure project title, type, status, and features"}
									</p>
								</div>
								<button
									onClick={() => setModalOpen(false)}
									className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground transition-all cursor-pointer"
								>
									<X className="w-4 h-4" />
								</button>
							</div>

							<form onSubmit={handleSave} className="p-6 space-y-5">
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-foreground flex items-center gap-1">
											<Hash className="w-3.5 h-3.5 text-primary" /> Code / Num
										</label>
										<input
											type="text"
											value={formData.num || ""}
											onChange={(e) =>
												setFormData((p) => ({ ...p, num: e.target.value }))
											}
											placeholder="e.g. 01"
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-foreground flex items-center gap-1">
											<Tag className="w-3.5 h-3.5 text-primary" /> Status *
										</label>
										<select
											value={formData.status}
											onChange={(e) =>
												setFormData((p) => ({ ...p, status: e.target.value }))
											}
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										>
											<option value="Ongoing">Ongoing</option>
											<option value="Upcoming">Upcoming</option>
											<option value="Completed">Completed</option>
										</select>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold text-foreground">
											Type Tag
										</label>
										<input
											type="text"
											value={formData.type}
											onChange={(e) =>
												setFormData((p) => ({ ...p, type: e.target.value }))
											}
											placeholder="e.g. Ongoing Flagship Township"
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>
								</div>

								<div className="space-y-1.5">
									<label className="text-xs font-semibold text-foreground flex items-center gap-1">
										<Building2 className="w-3.5 h-3.5 text-primary" /> Project Title *
									</label>
									<input
										type="text"
										required
										value={formData.title}
										onChange={(e) =>
											setFormData((p) => ({ ...p, title: e.target.value }))
										}
										placeholder="e.g. Silicon City (Phase 1 & 2)"
										className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
									/>
								</div>

								<div className="space-y-1.5">
									<label className="text-xs font-semibold text-foreground flex items-center gap-1">
										<MapPin className="w-3.5 h-3.5 text-primary" /> Location *
									</label>
									<input
										type="text"
										required
										value={formData.location}
										onChange={(e) =>
											setFormData((p) => ({ ...p, location: e.target.value }))
										}
										placeholder="e.g. Bara Badeshi Mouza, Savar, Dhaka"
										className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
									/>
								</div>

								<div className="space-y-1.5">
									<label className="text-xs font-semibold text-foreground">
										Description *
									</label>
									<textarea
										rows={3}
										required
										value={formData.description}
										onChange={(e) =>
											setFormData((p) => ({ ...p, description: e.target.value }))
										}
										placeholder="Detailed overview of the project..."
										className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
									/>
								</div>

								<div className="space-y-1.5">
									<label className="text-xs font-semibold text-foreground flex items-center gap-1">
										<Link2 className="w-3.5 h-3.5 text-primary" /> Detail Link / URL
									</label>
									<input
										type="text"
										value={formData.demoUrl || ""}
										onChange={(e) =>
											setFormData((p) => ({ ...p, demoUrl: e.target.value }))
										}
										placeholder="/properties?search=Silicon+City"
										className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
									/>
								</div>

								{/* Highlights & Tech Stack */}
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<label className="text-xs font-semibold text-foreground flex items-center gap-1">
											<ListCheck className="w-3.5 h-3.5 text-primary" /> Highlights & Specifications
										</label>
										<button
											type="button"
											onClick={addHighlight}
											className="text-xs text-primary font-bold hover:underline cursor-pointer"
										>
											+ Add Tag
										</button>
									</div>

									<div className="space-y-2">
										{formData.highlights.map((highlight, idx) => (
											<div key={idx} className="flex gap-2">
												<input
													type="text"
													value={highlight}
													onChange={(e) =>
														handleHighlightChange(idx, e.target.value)
													}
													placeholder={`Specification #${idx + 1}`}
													className="flex-1 h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
												/>
												{formData.highlights.length > 1 && (
													<button
														type="button"
														onClick={() => removeHighlight(idx)}
														className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center cursor-pointer hover:bg-destructive/20"
													>
														<X className="w-3.5 h-3.5" />
													</button>
												)}
											</div>
										))}
									</div>
								</div>

								<div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
									<button
										type="button"
										onClick={() => setModalOpen(false)}
										className="px-4 py-2.5 rounded-xl bg-muted text-foreground text-xs font-medium cursor-pointer hover:bg-muted/80"
									>
										Cancel
									</button>
									<button
										type="submit"
										disabled={saving}
										className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-primary/90 inline-flex items-center gap-2 disabled:opacity-50"
									>
										{saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
										{editingItem ? "Update Project" : "Create Project"}
									</button>
								</div>
							</form>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* ── DELETE CONFIRMATION MODAL ── */}
			<AnimatePresence>
				{deleteConfirmId && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
						onClick={() => !saving && setDeleteConfirmId(null)}
					>
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							className="bg-card border border-border/80 rounded-[24px] max-w-md w-full p-6 space-y-5"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="space-y-2">
								<h4 className="text-base font-bold font-heading text-foreground">
									Delete Project
								</h4>
								<p className="text-xs text-muted-foreground font-light leading-relaxed">
									Are you sure you want to delete this portfolio project entry? This action cannot be undone.
								</p>
							</div>

							<div className="flex items-center justify-end gap-3 pt-2">
								<button
									onClick={() => setDeleteConfirmId(null)}
									disabled={saving}
									className="px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-medium"
								>
									Cancel
								</button>
								<button
									onClick={() => handleDelete(deleteConfirmId)}
									disabled={saving}
									className="px-5 py-2 rounded-xl bg-destructive text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
								>
									{saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
									Yes, Delete
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
