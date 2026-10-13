"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Plus,
	Trash2,
	CheckCircle2,
	Loader2,
	RefreshCw,
	Eye,
	Edit,
	Check,
	Save,
	Sparkles,
	LayoutGrid,
	List,
	Video,
	Play,
	ExternalLink,
	Film,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useSlides, Slide } from "@/hooks/useSlides";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import {
	extractYouTubeId,
	DEFAULT_DRONE_VIDEOS,
	DroneVideoItem,
} from "@/lib/youtube";

export default function ManageSlidesPage() {
	const { slides, loading, refetch, createSlide, updateSlide, deleteSlide } =
		useSlides();

	const [savedMessage, setSavedMessage] = useState("");
	const [actionLoading, setActionLoading] = useState(false);

	// Dedicated Page View State: "list" | "form"
	const [viewMode, setViewMode] = useState<"list" | "form">("list");
	// Display Format State: "cards" | "list"
	const [displayFormat, setDisplayFormat] = useState<"cards" | "list">("cards");
	const [editingSlide, setEditingSlide] = useState<Slide | null>(null);

	const [formData, setFormData] = useState({
		title: "",
		titleBn: "",
		subtitle: "",
		subtitleBn: "",
		badge: "FEATURED",
		badgeBn: "ফিচার্ড",
		image: "",
		link: "https://www.youtube.com/watch?v=F7NX9Ry4EJc",
		active: true,
		order: 0,
	});

	const openCreateForm = () => {
		setEditingSlide(null);
		setFormData({
			title: "",
			titleBn: "",
			subtitle: "Masterplanned Eco-Township in Savar, Dhaka",
			subtitleBn: "সাভার, ঢাকায় মাস্টারপ্ল্যানড ইকো-টাউনশিপ",
			badge: "FEATURED",
			badgeBn: "ফিচার্ড",
			image: "",
			link: "https://www.youtube.com/watch?v=F7NX9Ry4EJc",
			active: true,
			order: slides.length + 1,
		});
		setViewMode("form");
		if (typeof window !== "undefined")
			window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const openEditForm = (slide: Slide) => {
		setEditingSlide(slide);
		setFormData({
			title: slide.title,
			titleBn: slide.titleBn || "",
			subtitle: slide.subtitle || "",
			subtitleBn: slide.subtitleBn || "",
			badge: slide.badge || "FEATURED",
			badgeBn: slide.badgeBn || "",
			image: slide.image,
			link: slide.link || "/projects",
			active: slide.active,
			order: slide.order || 0,
		});
		setViewMode("form");
		if (typeof window !== "undefined")
			window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleFormSubmit = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		if (!formData.title) {
			alert("Please provide a Slide Title.");
			return;
		}

		const ytId = extractYouTubeId(formData.link);
		const resolvedImage = ytId
			? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
			: formData.image ||
				"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80";

		const payload = {
			...formData,
			image: resolvedImage,
		};

		setActionLoading(true);
		try {
			if (editingSlide) {
				await updateSlide(editingSlide.id, payload);
				setSavedMessage(
					`Hero Video Slide "${formData.title}" updated successfully!`,
				);
			} else {
				await createSlide(payload);
				setSavedMessage(
					`New Hero Video Slide "${formData.title}" added to database!`,
				);
			}
			setViewMode("list");
			setEditingSlide(null);
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
			{/* Top Bar */}
			<div className="border-b border-border/50 py-3 mb-6">
				<SectionContainer>
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							{viewMode === "form" ? (
								<button
									type="button"
									onClick={() => {
										setViewMode("list");
										setEditingSlide(null);
									}}
									className="text-xs font-medium font-heading text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors cursor-pointer"
								>
									<ArrowLeft className="w-4 h-4" />
									Back to All Slides
								</button>
							) : (
								<Link
									href="/admin"
									className="text-xs font-medium font-heading text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
								>
									<ArrowLeft className="w-4 h-4" />
									Back to Admin Overview
								</Link>
							)}
						</div>

						<div className="flex items-center gap-2.5">
							{viewMode === "list" && (
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
							)}

							<Link
								href="/"
								target="_blank"
								className="px-3.5 h-8 rounded-full border border-border/80 text-foreground hover:bg-muted text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all shadow-2xs"
							>
								<Eye className="w-3.5 h-3.5 text-muted-foreground" />
								<span>Preview Hero Page</span>
							</Link>
						</div>
					</div>
				</SectionContainer>
			</div>

			<SectionContainer className="py-8">
				<div className="max-w-5xl mx-auto space-y-6">
					{/* Notification Message */}
					{savedMessage && (
						<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold font-heading flex items-center gap-2 shadow-xs">
							<CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
							<span>{savedMessage}</span>
						</div>
					)}

					{/* ─────────────────────────────────────────────────────────────
					    VIEW 1: DEDICATED SLIDE EDIT/CREATE PAGE VIEW (NO MODAL)
					   ───────────────────────────────────────────────────────────── */}
					{viewMode === "form" ? (
						<div className="space-y-6">
							{/* Page Header */}
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
								<div className="space-y-1">
									<span className="text-xs font-semibold uppercase tracking-wider text-primary font-heading">
										{editingSlide
											? "EDIT HERO DRONE VIDEO"
											: "NEW HERO DRONE VIDEO"}
									</span>
									<h1 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
										{editingSlide
											? `Edit Video Slide: "${formData.title}"`
											: "Add New Hero Drone Video Slide"}
									</h1>
									<p className="text-xs sm:text-sm text-muted-foreground font-light">
										Configure 4K YouTube drone video URL, embed code
										(&lt;iframe...&gt;), or video ID, along with clean headlines
										and badges for the full-screen hero carousel.
									</p>
								</div>

								<div className="flex items-center gap-2.5">
									<Button
										type="button"
										variant="outline"
										onClick={() => {
											setViewMode("list");
											setEditingSlide(null);
										}}
										disabled={actionLoading}
										className="text-xs"
									>
										Cancel
									</Button>
									<Button
										type="button"
										onClick={() => handleFormSubmit()}
										disabled={actionLoading}
										className="gap-2 text-xs font-heading"
									>
										{actionLoading ? (
											<Loader2 className="w-4 h-4 animate-spin" />
										) : (
											<Check className="w-4 h-4" />
										)}
										{editingSlide ? "Update Slide" : "Save to Database"}
									</Button>
								</div>
							</div>

							<form onSubmit={handleFormSubmit} className="space-y-6">
								<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
									{/* Left Column: Form Inputs (7 Cols) */}
									<div className="lg:col-span-7 space-y-6">
										<Card className="border border-border/70 rounded-2xl shadow-xs">
											<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
												<CardTitle className="text-base font-semibold font-heading">
													1. Slide Details & Bilingual Content
												</CardTitle>
												<CardDescription className="text-xs text-muted-foreground font-light">
													Enter the slide headlines and badges in both English
													and Bengali.
												</CardDescription>
											</CardHeader>
											<CardContent className="p-6 space-y-5">
												{/* Slide Title */}
												<div className="grid sm:grid-cols-2 gap-4">
													<div className="space-y-2">
														<div className="flex items-center justify-between">
															<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
																Slide Title (EN) *
															</Label>
															<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
																EN
															</span>
														</div>
														<Input
															required
															value={formData.title}
															onChange={(e) =>
																setFormData((prev) => ({
																	...prev,
																	title: e.target.value,
																}))
															}
															placeholder="e.g. Silicon City Prime Plots"
															className="font-medium font-heading"
														/>
													</div>
													<div className="space-y-2">
														<div className="flex items-center justify-between">
															<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
																স্লাইড শিরোনাম (BN)
															</Label>
															<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
																বাংলা (BN)
															</span>
														</div>
														<Input
															value={formData.titleBn}
															onChange={(e) =>
																setFormData((prev) => ({
																	...prev,
																	titleBn: e.target.value,
																}))
															}
															placeholder="যেমনঃ সিলিকন সিটি আবাসিক প্লট"
															className="font-medium font-heading"
														/>
													</div>
												</div>

												{/* Badge Tag */}
												<div className="grid sm:grid-cols-2 gap-4">
													<div className="space-y-2">
														<div className="flex items-center justify-between">
															<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
																Badge Tag (EN)
															</Label>
															<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
																EN
															</span>
														</div>
														<Input
															value={formData.badge}
															onChange={(e) =>
																setFormData((prev) => ({
																	...prev,
																	badge: e.target.value,
																}))
															}
															placeholder="e.g. FEATURED / RESIDENTIAL"
														/>
													</div>
													<div className="space-y-2">
														<div className="flex items-center justify-between">
															<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
																ব্যাজ ট্যাগ (BN)
															</Label>
															<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
																বাংলা (BN)
															</span>
														</div>
														<Input
															value={formData.badgeBn}
															onChange={(e) =>
																setFormData((prev) => ({
																	...prev,
																	badgeBn: e.target.value,
																}))
															}
															placeholder="যেমনঃ ফিচার্ড / আবাসিক"
														/>
													</div>
												</div>

												{/* Subtitle / Location */}
												<div className="grid sm:grid-cols-2 gap-4">
													<div className="space-y-2">
														<div className="flex items-center justify-between">
															<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
																Subtitle / Location (EN)
															</Label>
															<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
																EN
															</span>
														</div>
														<Input
															value={formData.subtitle}
															onChange={(e) =>
																setFormData((prev) => ({
																	...prev,
																	subtitle: e.target.value,
																}))
															}
															placeholder="e.g. Masterplanned Township at Savar"
														/>
													</div>
													<div className="space-y-2">
														<div className="flex items-center justify-between">
															<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
																সাবটাইটেল / অবস্থান (BN)
															</Label>
															<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
																বাংলা (BN)
															</span>
														</div>
														<Input
															value={formData.subtitleBn}
															onChange={(e) =>
																setFormData((prev) => ({
																	...prev,
																	subtitleBn: e.target.value,
																}))
															}
															placeholder="যেমনঃ সাভারে পরিকল্পিত আবাসন নগরী"
														/>
													</div>
												</div>

												{/* Drone Footage Video Link / ID (Primary YouTube Link) */}
												<div className="space-y-3 pt-3 border-t border-border/40">
													<div className="flex items-center justify-between">
														<Label className="text-xs font-semibold font-heading text-foreground uppercase flex items-center gap-1.5">
															<Video className="w-4 h-4 text-red-500" />
															<span>
																YouTube Drone Video Link, Embed Code, or Video
																ID *
															</span>
														</Label>
														<span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 font-semibold border border-red-500/20">
															STREAMING 4K
														</span>
													</div>

													<Input
														value={formData.link}
														onChange={(e) =>
															setFormData((prev) => ({
																...prev,
																link: e.target.value,
															}))
														}
														placeholder="Paste YouTube Link, Embed Code (<iframe ...>), or Video ID"
														className="font-mono text-xs"
													/>

													{/* YouTube ID Detection Status & Action */}
													{(() => {
														const ytId = extractYouTubeId(formData.link);
														if (ytId) {
															return (
																<div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
																	<div className="flex items-center gap-1.5 text-emerald-600 font-medium">
																		<CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
																		<span>
																			Detected Video ID:{" "}
																			<strong className="font-mono">
																				{ytId}
																			</strong>{" "}
																			(Chunked streaming ready)
																		</span>
																	</div>
																	<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 text-[11px] font-heading font-medium shrink-0">
																		<Sparkles className="w-3 h-3 text-amber-500" />
																		<span>Auto-Thumbnail Synced</span>
																	</div>
																</div>
															);
														}
														return (
															<p className="text-[11px] text-muted-foreground font-light leading-relaxed">
																Paste any YouTube URL, embed code
																(&lt;iframe...&gt;), or 11-digit video ID. When
																a visitor lands on the site, video streams
																immediately in high-definition chunks without
																waiting for the full file to download.
															</p>
														);
													})()}

													{/* Quick Drone Footage Presets */}
													<div className="space-y-1.5 pt-1">
														<span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
															Quick 4K Drone Presets (Click to Load):
														</span>
														<div className="flex flex-wrap gap-1.5">
															{DEFAULT_DRONE_VIDEOS.map(
																(preset: DroneVideoItem, pIdx: number) => (
																	<button
																		key={preset.id}
																		type="button"
																		onClick={() =>
																			setFormData((prev) => ({
																				...prev,
																				link: `https://www.youtube.com/watch?v=${preset.id}`,
																				image: prev.image || preset.poster,
																			}))
																		}
																		className="px-2.5 py-1 rounded-lg bg-muted hover:bg-muted/80 text-[11px] text-foreground border border-border/70 font-medium inline-flex items-center gap-1 transition-all cursor-pointer"
																	>
																		<Play className="w-2.5 h-2.5 text-red-500" />
																		<span>
																			Preset {pIdx + 1}: {preset.badge}
																		</span>
																	</button>
																),
															)}
														</div>
													</div>
												</div>

												{/* Display Order */}
												<div className="pt-2 border-t border-border/40 space-y-2">
													<Label className="text-xs font-semibold font-heading text-muted-foreground uppercase">
														Display Order
													</Label>
													<Input
														type="number"
														value={formData.order}
														onChange={(e) =>
															setFormData((prev) => ({
																...prev,
																order: parseInt(e.target.value) || 0,
															}))
														}
													/>
												</div>

												{/* Active Switch */}
												<div className="pt-2 flex items-center justify-between">
													<div>
														<span className="text-xs font-semibold font-heading text-foreground block">
															Slide Visibility
														</span>
														<span className="text-[11px] text-muted-foreground font-light block">
															Enable to show this drone footage in the hero
															carousel.
														</span>
													</div>

													<button
														type="button"
														onClick={() =>
															setFormData((prev) => ({
																...prev,
																active: !prev.active,
															}))
														}
														className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-heading transition-all cursor-pointer ${
															formData.active
																? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
																: "bg-muted text-muted-foreground border border-border"
														}`}
													>
														{formData.active
															? "● Active in Carousel"
															: "Inactive"}
													</button>
												</div>
											</CardContent>
										</Card>
									</div>

									{/* Right Column: Live Video Player Preview (5 Cols) */}
									<div className="lg:col-span-5 space-y-6">
										<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
											<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
												<div>
													<CardTitle className="text-base font-semibold font-heading flex items-center gap-2">
														<Video className="w-4 h-4 text-red-500" />
														<span>2. Live YouTube Drone Video Preview</span>
													</CardTitle>
													<CardDescription className="text-xs text-muted-foreground font-light">
														Interactive player preview. Fullscreen 4K drone
														footage autoplays directly on the website hero
														carousel.
													</CardDescription>
												</div>
											</CardHeader>
											<CardContent className="p-6 space-y-4">
												{(() => {
													const ytId = extractYouTubeId(formData.link);
													if (ytId) {
														return (
															<div className="space-y-4">
																<div className="relative rounded-2xl overflow-hidden border border-border/70 bg-black aspect-video shadow-md">
																	<iframe
																		src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=0&controls=1&rel=0`}
																		title="Preview YouTube Drone Video"
																		className="w-full h-full"
																		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
																	/>
																</div>
																<div className="flex items-center justify-between text-xs px-1">
																	<span className="text-muted-foreground font-light flex items-center gap-1.5">
																		<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
																		4K Stream Ready (Video ID:{" "}
																		<strong className="font-mono text-foreground">
																			{ytId}
																		</strong>
																		)
																	</span>
																	<a
																		href={`https://www.youtube.com/watch?v=${ytId}`}
																		target="_blank"
																		rel="noopener noreferrer"
																		className="text-primary hover:underline inline-flex items-center gap-1 text-[11px] font-medium"
																	>
																		<span>Open on YouTube</span>
																		<ExternalLink className="w-3 h-3" />
																	</a>
																</div>

																{/* Auto Thumbnail Info */}
																<div className="p-3.5 rounded-xl bg-muted/40 border border-border/70 space-y-2">
																	<div className="flex items-center justify-between">
																		<span className="text-[11px] font-semibold font-heading uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
																			<Sparkles className="w-3.5 h-3.5 text-amber-500" />
																			<span>Cloud Video Thumbnail</span>
																		</span>
																		<span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
																			AUTO-SYNCED
																		</span>
																	</div>

																	<div className="flex items-center gap-3">
																		<img
																			src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
																			alt="YouTube Thumbnail"
																			className="w-20 h-12 object-cover rounded-lg border border-border/80 shrink-0 shadow-2xs"
																		/>
																		<div className="text-left space-y-1 min-w-0">
																			<p className="text-xs font-semibold font-heading text-foreground truncate">
																				{formData.title ||
																					"Slide Title Preview"}
																			</p>
																			<p className="text-[10px] text-muted-foreground font-light leading-snug">
																				High-res YouTube poster is fetched
																				automatically. No manual image upload
																				needed!
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														);
													}
													return (
														<div className="rounded-2xl border border-dashed border-border/80 p-8 text-center space-y-2 bg-muted/10">
															<Film className="w-8 h-8 text-muted-foreground mx-auto stroke-1" />
															<p className="text-xs font-semibold font-heading text-foreground">
																No YouTube Video Linked Yet
															</p>
															<p className="text-[11px] text-muted-foreground font-light max-w-xs mx-auto">
																Paste a YouTube drone video link or embed code
																on the left to preview the interactive player
																here.
															</p>
														</div>
													);
												})()}
											</CardContent>
										</Card>
									</div>
								</div>

								{/* Bottom Save & Cancel Strip */}
								<div className="flex items-center justify-between pt-4 border-t border-border/40">
									<Button
										type="button"
										variant="outline"
										onClick={() => {
											setViewMode("list");
											setEditingSlide(null);
										}}
										disabled={actionLoading}
									>
										Cancel & Return to Slides
									</Button>

									<Button
										type="submit"
										disabled={actionLoading}
										className="gap-2 px-6 font-heading"
									>
										{actionLoading ? (
											<Loader2 className="w-4 h-4 animate-spin" />
										) : (
											<Check className="w-4 h-4" />
										)}
										{editingSlide
											? "Save Changes to Database"
											: "Add Slide to Database"}
									</Button>
								</div>
							</form>

							{/* Single Floating Bottom-Right Save Capsule */}
							<div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-1.5 rounded-full bg-card/90 backdrop-blur-xl border border-border/80 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
								<button
									onClick={() => handleFormSubmit()}
									disabled={actionLoading}
									className="h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-medium font-heading inline-flex items-center gap-2 shadow-md shadow-primary/25 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
								>
									{actionLoading ? (
										<Loader2 className="w-4 h-4 animate-spin" />
									) : (
										<Save className="w-4 h-4" />
									)}
									<span>
										{actionLoading
											? "Saving..."
											: editingSlide
												? "Save Slide Changes"
												: "Save Slide"}
									</span>
								</button>
							</div>
						</div>
					) : (
						/* ─────────────────────────────────────────────────────────────
						    VIEW 2: SLIDES LIST VIEW
						   ───────────────────────────────────────────────────────────── */
						<div className="space-y-6">
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
								<div className="space-y-1 text-left">
									<span className="text-xs font-semibold uppercase tracking-wider text-primary font-heading flex items-center gap-1.5">
										<Video className="w-3.5 h-3.5 text-red-500" />
										<span>HERO DRONE VIDEO CONTROLLER</span>
									</span>
									<h1 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
										Hero Video Carousel (হিরো ড্রোন ভিডিও ম্যানেজার)
									</h1>
									<p className="text-xs sm:text-sm text-muted-foreground font-light">
										Add, edit, or delete 4K YouTube drone videos, embed codes,
										and clean headlines that play in the homepage fullscreen
										hero carousel.
									</p>
								</div>

								<div className="flex flex-wrap items-center gap-3">
									{/* View Switcher Segmented Control */}
									<div className="flex items-center gap-1 p-1 rounded-xl bg-card border border-border/80 shadow-2xs">
										<button
											type="button"
											onClick={() => setDisplayFormat("cards")}
											className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
												displayFormat === "cards"
													? "bg-primary text-primary-foreground shadow-xs font-semibold"
													: "text-muted-foreground hover:text-foreground hover:bg-muted/60"
											}`}
											title="Grid Cards View"
										>
											<LayoutGrid className="w-3.5 h-3.5" />
											<span>Cards</span>
										</button>
										<button
											type="button"
											onClick={() => setDisplayFormat("list")}
											className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
												displayFormat === "list"
													? "bg-primary text-primary-foreground shadow-xs font-semibold"
													: "text-muted-foreground hover:text-foreground hover:bg-muted/60"
											}`}
											title="Table List View"
										>
											<List className="w-3.5 h-3.5" />
											<span>List</span>
										</button>
									</div>

									<Button
										onClick={openCreateForm}
										className="gap-2 shrink-0 font-medium font-heading text-xs"
									>
										<Plus className="w-4 h-4" />
										Add New Drone Video
									</Button>
								</div>
							</div>

							<div className="space-y-4">
								{loading ? (
									<div className="p-16 text-center text-muted-foreground text-xs flex items-center justify-center gap-2">
										<Loader2 className="w-4 h-4 animate-spin text-primary" />
										<span>Loading hero slides from database...</span>
									</div>
								) : slides.length === 0 ? (
									<div className="p-12 text-center border border-dashed border-border/80 rounded-2xl space-y-3 bg-muted/10">
										<h3 className="text-sm font-semibold font-heading">
											No Slides Found
										</h3>
										<p className="text-xs text-muted-foreground font-light max-w-sm mx-auto">
											Add your first hero banner slide to manage 4K drone
											footage YouTube videos and headlines for the fullscreen
											hero carousel.
										</p>
										<Button
											onClick={openCreateForm}
											size="sm"
											className="gap-1"
										>
											<Plus className="w-3.5 h-3.5" />
											Add First Slide
										</Button>
									</div>
								) : displayFormat === "cards" ? (
									/* FORMAT 1: GRID CARDS VIEW */
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
										{slides.map((slide, index) => (
											<div
												key={slide.id}
												className="bg-card border border-border/70 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
											>
												{/* Video Drone Footage Preview Box */}
												<div className="relative h-44 w-full overflow-hidden bg-black group/thumb">
													<img
														src={slide.image}
														alt={slide.title}
														className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 opacity-90"
													/>
													<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

													{/* Centered Video Play Badge */}
													<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
														<div className="w-11 h-11 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 group-hover/thumb:bg-red-600 transition-all">
															<Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
														</div>
													</div>

													{/* Top Badges */}
													<div className="absolute top-3 left-3 right-3 flex items-center justify-between">
														<span className="px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-medium font-mono text-white uppercase tracking-wider">
															#{index + 1}
														</span>
														<span className="px-2.5 py-0.5 rounded-md bg-primary text-primary-foreground text-[10px] font-medium uppercase tracking-wider shadow-xs">
															{slide.badge || "FEATURED"}
														</span>
													</div>

													{/* Bottom Image Title */}
													<div className="absolute bottom-3 left-3 right-3 text-left">
														<h3 className="text-sm font-semibold font-heading text-white line-clamp-1 drop-shadow-md">
															{slide.title}
														</h3>
														{slide.titleBn && (
															<p className="text-[11px] text-white/90 font-medium truncate font-bangla">
																{slide.titleBn}
															</p>
														)}
													</div>
												</div>

												{/* Card Body */}
												<div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-left">
													<div className="space-y-1">
														{(() => {
															const ytId = extractYouTubeId(slide.link);
															if (ytId) {
																return (
																	<span className="text-[11px] font-mono text-red-600 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 inline-flex items-center gap-1 font-semibold">
																		<Video className="w-3 h-3 text-red-500" />
																		<span>Drone Video: {ytId}</span>
																	</span>
																);
															}
															return (
																<span className="text-[10px] font-mono text-muted-foreground block truncate">
																	Target: {slide.link || "/projects"}
																</span>
															);
														})()}
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
																onClick={() => openEditForm(slide)}
																className="h-8 w-8 text-foreground hover:bg-muted"
																title="Edit Slide"
															>
																<Edit className="w-3.5 h-3.5" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																onClick={() =>
																	handleDelete(slide.id, slide.title)
																}
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
								) : (
									/* FORMAT 2: TABLE LIST VIEW */
									<div className="bg-card border border-border/70 rounded-2xl overflow-hidden shadow-xs">
										<div className="overflow-x-auto">
											<table className="w-full text-left text-xs border-collapse">
												<thead>
													<tr className="border-b border-border/60 bg-muted/30 text-muted-foreground font-heading uppercase text-[11px] tracking-wider">
														<th className="py-3.5 px-4 font-semibold w-16">
															#
														</th>
														<th className="py-3.5 px-4 font-semibold w-28">
															Drone Video
														</th>
														<th className="py-3.5 px-4 font-semibold">
															Title & Subtitle
														</th>
														<th className="py-3.5 px-4 font-semibold hidden md:table-cell">
															Badge Tag
														</th>
														<th className="py-3.5 px-4 font-semibold hidden lg:table-cell">
															Drone Video / Link
														</th>
														<th className="py-3.5 px-4 font-semibold text-center w-28">
															Status
														</th>
														<th className="py-3.5 px-4 font-semibold text-right w-28">
															Actions
														</th>
													</tr>
												</thead>
												<tbody className="divide-y divide-border/50">
													{slides.map((slide, index) => (
														<tr
															key={slide.id}
															className="hover:bg-muted/20 transition-colors group"
														>
															<td className="py-3 px-4 font-mono text-muted-foreground font-medium">
																#{index + 1}
															</td>
															<td className="py-3 px-4">
																<div className="w-20 h-12 rounded-lg overflow-hidden border border-border/60 bg-black shrink-0 relative group-hover:scale-105 transition-transform">
																	<img
																		src={slide.image}
																		alt={slide.title}
																		className="w-full h-full object-cover opacity-90"
																	/>
																	<div className="absolute inset-0 flex items-center justify-center bg-black/30">
																		<Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
																	</div>
																</div>
															</td>
															<td className="py-3 px-4 max-w-xs">
																<div className="space-y-0.5">
																	<p className="font-semibold font-heading text-foreground truncate">
																		{slide.title}
																	</p>
																	{slide.titleBn && (
																		<p className="text-[11px] text-muted-foreground font-bangla truncate">
																			{slide.titleBn}
																		</p>
																	)}
																	{slide.subtitle && (
																		<p className="text-[10px] text-muted-foreground/75 truncate hidden sm:block">
																			{slide.subtitle}
																		</p>
																	)}
																</div>
															</td>
															<td className="py-3 px-4 hidden md:table-cell">
																<span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-semibold font-heading uppercase tracking-wider">
																	{slide.badge || "FEATURED"}
																</span>
															</td>
															<td className="py-3 px-4 hidden lg:table-cell font-mono text-[11px] truncate max-w-[200px]">
																{(() => {
																	const ytId = extractYouTubeId(slide.link);
																	if (ytId) {
																		return (
																			<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/10 text-red-600 border border-red-500/20 font-semibold">
																				<Video className="w-3 h-3 text-red-500" />
																				<span>YouTube: {ytId}</span>
																			</span>
																		);
																	}
																	return (
																		<span className="text-muted-foreground">
																			{slide.link || "/projects"}
																		</span>
																	);
																})()}
															</td>
															<td className="py-3 px-4 text-center">
																<button
																	type="button"
																	onClick={() => handleToggleActive(slide)}
																	className={`px-2.5 py-1 rounded-full text-[10px] font-semibold font-heading transition-all cursor-pointer ${
																		slide.active
																			? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500/20"
																			: "bg-muted text-muted-foreground hover:bg-muted/80"
																	}`}
																>
																	{slide.active ? "● Active" : "Inactive"}
																</button>
															</td>
															<td className="py-3 px-4 text-right">
																<div className="flex items-center justify-end gap-1">
																	<Button
																		variant="ghost"
																		size="icon"
																		onClick={() => openEditForm(slide)}
																		className="h-8 w-8 text-foreground hover:bg-muted cursor-pointer"
																		title="Edit Slide"
																	>
																		<Edit className="w-3.5 h-3.5" />
																	</Button>
																	<Button
																		variant="ghost"
																		size="icon"
																		onClick={() =>
																			handleDelete(slide.id, slide.title)
																		}
																		className="h-8 w-8 text-destructive hover:bg-destructive/10 cursor-pointer"
																		title="Delete Slide"
																	>
																		<Trash2 className="w-3.5 h-3.5" />
																	</Button>
																</div>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</SectionContainer>
		</div>
	);
}
