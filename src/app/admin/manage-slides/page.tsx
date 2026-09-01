"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Save,
	Plus,
	Trash2,
	CheckCircle2,
	Loader2,
	RefreshCw,
	ImageIcon,
	Eye,
	Sparkles,
	ExternalLink,
	Edit,
	Check,
	X,
	Layers,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useSlides, Slide } from "@/hooks/useSlides";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function ManageSlidesPage() {
	const { slides, loading, refetch, createSlide, updateSlide, deleteSlide } =
		useSlides();

	const [savedMessage, setSavedMessage] = useState("");
	const [actionLoading, setActionLoading] = useState(false);

	// Create / Edit Modal State
	const [modalOpen, setModalOpen] = useState(false);
	const [editingSlide, setEditingSlide] = useState<Slide | null>(null);

	const [formData, setFormData] = useState({
		title: "",
		subtitle: "",
		badge: "FEATURED",
		image: "",
		link: "/projects",
		active: true,
		order: 0,
	});

	const openCreateModal = () => {
		setEditingSlide(null);
		setFormData({
			title: "",
			subtitle: "Masterplanned Eco-Township in Savar, Dhaka",
			badge: "FEATURED",
			image:
				"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
			link: "/projects",
			active: true,
			order: slides.length + 1,
		});
		setModalOpen(true);
	};

	const openEditModal = (slide: Slide) => {
		setEditingSlide(slide);
		setFormData({
			title: slide.title,
			subtitle: slide.subtitle || "",
			badge: slide.badge || "FEATURED",
			image: slide.image,
			link: slide.link || "/projects",
			active: slide.active,
			order: slide.order || 0,
		});
		setModalOpen(true);
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.title || !formData.image) {
			alert("Please provide both a Slide Title and Image URL.");
			return;
		}

		setActionLoading(true);
		try {
			if (editingSlide) {
				await updateSlide(editingSlide.id, formData);
				setSavedMessage(`Slide "${formData.title}" updated successfully!`);
			} else {
				await createSlide(formData);
				setSavedMessage(`New slide "${formData.title}" added to database!`);
			}
			setModalOpen(false);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (err: any) {
			console.error("Failed to save slide:", err);
			alert("Error saving slide: " + err.message);
		} finally {
			setActionLoading(false);
		}
	};

	const handleDelete = async (id: string, title: string) => {
		if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
		setActionLoading(true);
		try {
			await deleteSlide(id);
			setSavedMessage(`Slide "${title}" deleted from database.`);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (err: any) {
			console.error("Failed to delete slide:", err);
		} finally {
			setActionLoading(false);
		}
	};

	const handleToggleActive = async (slide: Slide) => {
		try {
			await updateSlide(slide.id, { active: !slide.active });
		} catch (err) {
			console.error("Failed to toggle status", err);
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
								href="/"
								target="_blank"
								className="px-3.5 h-8 rounded-full border border-border/80 text-foreground hover:bg-muted text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all shadow-2xs"
							>
								<Eye className="w-3.5 h-3.5 text-muted-foreground" />
								<span>Live Website</span>
							</Link>

							<button
								onClick={openCreateModal}
								className="px-4 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold font-heading inline-flex items-center gap-1.5 transition-all shadow-xs hover:bg-primary/90 cursor-pointer"
							>
								<Plus className="w-3.5 h-3.5" />
								<span>Add Slide</span>
							</button>
						</div>
					</div>
				</SectionContainer>
			</div>

			<SectionContainer className="py-8">
				<div className="max-w-5xl mx-auto space-y-6">
					{/* Header Title */}
					<div className="space-y-1 text-left">
						<span className="text-xs font-semibold uppercase tracking-wider text-primary font-heading inline-flex items-center gap-1.5">
							<Sparkles className="w-3.5 h-3.5" /> 3D RING CAROUSEL DATABASE
						</span>
						<h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
							Hero Banner & Ring Carousel Slides
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Manage the photographic slides displayed in the interactive 3D
							rotating cylinder ring on the Home landing page.
						</p>
					</div>

					{/* Informational Guidance Alert */}
					<div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-foreground text-xs flex items-start gap-3">
						<Layers className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
						<div className="space-y-1 text-left">
							<p className="font-bold font-heading text-primary">
								Dynamic 3D Ring Multiplication System
							</p>
							<p className="text-muted-foreground font-light leading-relaxed">
								The 3D rotating ring carousel on the homepage seamlessly repeats
								your database slides to populate all{" "}
								<strong>48 ring slots</strong>. Whether you configure 1 slide or
								20 slides, the system dynamically tiles them into a complete
								360-degree rotating cylinder.
							</p>
						</div>
					</div>

					{/* Notification Toast */}
					{savedMessage && (
						<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold font-heading flex items-center gap-2 shadow-xs">
							<CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
							<span>{savedMessage}</span>
						</div>
					)}

					{/* ── SLIDES LIST GRID ── */}
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<h2 className="text-sm font-bold font-heading uppercase tracking-wider text-muted-foreground">
								Configured Database Slides ({slides.length})
							</h2>
							<span className="text-xs text-muted-foreground font-light">
								Active in 3D Carousel
							</span>
						</div>

						{loading ? (
							<div className="text-center py-16 text-muted-foreground text-xs flex items-center justify-center gap-2">
								<Loader2 className="w-4 h-4 animate-spin text-primary" />
								<span>Loading slides from PostgreSQL...</span>
							</div>
						) : slides.length === 0 ? (
							<div className="text-center py-16 bg-card border border-dashed border-border/80 rounded-2xl p-8 space-y-3">
								<ImageIcon className="w-8 h-8 text-muted-foreground mx-auto" />
								<p className="text-sm font-medium text-foreground">
									No slides in database
								</p>
								<p className="text-xs text-muted-foreground font-light max-w-sm mx-auto">
									Add your first hero banner slide to populate the 3D rotating
									cylinder carousel.
								</p>
								<Button onClick={openCreateModal} size="sm" className="gap-1">
									<Plus className="w-3.5 h-3.5" />
									Add First Slide
								</Button>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{slides.map((slide, index) => (
									<div
										key={slide.id}
										className="bg-card border border-border/70 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
									>
										{/* Image Preview Box */}
										<div className="relative h-44 w-full overflow-hidden bg-muted">
											<img
												src={slide.image}
												alt={slide.title}
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

											{/* Top Badges */}
											<div className="absolute top-3 left-3 right-3 flex items-center justify-between">
												<span className="px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold font-mono text-white uppercase tracking-wider">
													#{index + 1}
												</span>
												<span className="px-2.5 py-0.5 rounded-md bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider shadow-xs">
													{slide.badge || "FEATURED"}
												</span>
											</div>

											{/* Bottom Image Title */}
											<div className="absolute bottom-3 left-3 right-3 text-left">
												<h3 className="text-sm font-bold font-heading text-white line-clamp-1">
													{slide.title}
												</h3>
												{slide.subtitle && (
													<p className="text-[11px] text-white/80 font-light truncate">
														{slide.subtitle}
													</p>
												)}
											</div>
										</div>

										{/* Card Body */}
										<div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-left">
											<div className="space-y-1">
												<span className="text-[10px] font-mono text-muted-foreground block truncate">
													URL: {slide.image}
												</span>
												<span className="text-[10px] font-mono text-primary block truncate">
													Target: {slide.link || "/projects"}
												</span>
											</div>

											{/* Actions Strip */}
											<div className="pt-3 border-t border-border/50 flex items-center justify-between">
												<button
													type="button"
													onClick={() => handleToggleActive(slide)}
													className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold font-heading transition-all cursor-pointer ${
														slide.active
															? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
															: "bg-muted text-muted-foreground"
													}`}
												>
													{slide.active ? "● Active" : "Inactive"}
												</button>

												<div className="flex items-center gap-1.5">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => openEditModal(slide)}
														className="h-8 w-8 text-foreground hover:bg-muted"
														title="Edit Slide"
													>
														<Edit className="w-3.5 h-3.5" />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														onClick={() => handleDelete(slide.id, slide.title)}
														className="h-8 w-8 text-destructive hover:bg-destructive/10"
														title="Delete Slide"
													>
														<Trash2 className="w-3.5 h-3.5" />
													</Button>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</SectionContainer>

			{/* ── CREATE / EDIT SLIDE MODAL ── */}
			<Dialog open={modalOpen} onOpenChange={setModalOpen}>
				<DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-lg font-bold font-heading">
							{editingSlide
								? "Edit Hero Banner Slide"
								: "Add New Hero Banner Slide"}
						</DialogTitle>
					</DialogHeader>

					<form
						onSubmit={handleFormSubmit}
						className="space-y-4 pt-2 text-left"
					>
						<div className="space-y-2">
							<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
								Slide Headline Title *
							</Label>
							<Input
								required
								value={formData.title}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, title: e.target.value }))
								}
								placeholder="e.g. Silicon City Prime Residential Plots"
							/>
						</div>

						<div className="grid sm:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
									Badge Tag
								</Label>
								<Input
									value={formData.badge}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, badge: e.target.value }))
									}
									placeholder="e.g. FEATURED / RESIDENTIAL / COMMERCIAL"
								/>
							</div>

							<div className="space-y-2">
								<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
									Destination Link
								</Label>
								<Input
									value={formData.link}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, link: e.target.value }))
									}
									placeholder="e.g. /projects or /contact"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
								Subtitle / Location Brief
							</Label>
							<Input
								value={formData.subtitle}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
								}
								placeholder="e.g. Masterplanned Township at Savar near Mohammadpur"
							/>
						</div>

						{/* Image URL Input Field with Live Preview */}
						<div className="space-y-2">
							<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
								Image URL (Only Web URL) *
							</Label>
							<Input
								required
								value={formData.image}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, image: e.target.value }))
								}
								placeholder="https://images.unsplash.com/photo-..."
							/>
							<p className="text-[11px] text-muted-foreground font-light">
								Paste any high-resolution public image URL (Unsplash,
								Cloudinary, Imgur, AWS S3, etc.).
							</p>

							{/* Live Image URL Preview Box */}
							{formData.image && (
								<div className="mt-3 p-3 rounded-2xl bg-muted/40 border border-border/70 space-y-2">
									<span className="text-[10px] font-bold font-mono uppercase text-muted-foreground block">
										Live URL Image Preview:
									</span>
									<div className="h-36 w-full rounded-xl overflow-hidden bg-black/10 border border-border/50 relative">
										<img
											src={formData.image}
											alt="Preview"
											className="w-full h-full object-cover"
											onError={(e) => {
												(e.target as HTMLElement).style.display = "none";
											}}
										/>
									</div>
								</div>
							)}
						</div>

						<div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
							<Button
								type="button"
								variant="outline"
								onClick={() => setModalOpen(false)}
								disabled={actionLoading}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={actionLoading} className="gap-2">
								{actionLoading ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Check className="w-4 h-4" />
								)}
								{editingSlide ? "Update Slide" : "Save to Database"}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
