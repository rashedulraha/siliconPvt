"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, CheckCircle2, Loader2, RefreshCw, Lock, Unlock } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { apiFetch } from "@/lib/api-client";
import { useAdminEditor } from "@/context/AdminEditorContext";

interface SlideItem {
	id: string;
	title: string;
	subtitle?: string;
	badge?: string;
	image: string;
	link?: string;
	active?: boolean;
}

export default function ManageSlidesPage() {
	const { isEditorUnlocked, unlockEditorMode } = useAdminEditor();
	const [slides, setSlides] = useState<SlideItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [savingId, setSavingId] = useState<string | null>(null);
	const [savedMessage, setSavedMessage] = useState("");
	const [newSlideModal, setNewSlideModal] = useState(false);
	const [newSlideData, setNewSlideData] = useState({
		title: "",
		badge: "Silicon City Township",
		subtitle: "",
		image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
		link: "/projects",
	});

	const fetchSlides = async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{ success: boolean; slides?: any[] }>("/slides");
			if (res && res.success && Array.isArray(res.slides)) {
				setSlides(res.slides);
			}
		} catch (e) {
			console.error("Failed to load slides", e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSlides();
	}, []);

	const handleUpdateSlideField = (
		id: string,
		field: keyof SlideItem,
		value: any,
	) => {
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSlides((prev) =>
			prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
		);
	};

	const handleSaveSlide = async (slide: SlideItem) => {
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSavingId(slide.id);
		try {
			await apiFetch(`/slides/${slide.id}`, {
				method: "PUT",
				body: JSON.stringify({
					title: slide.title,
					subtitle: slide.subtitle,
					badge: slide.badge,
					image: slide.image,
					link: slide.link,
				}),
			});
			setSavedMessage(`Slide "${slide.title}" saved to database!`);
			setTimeout(() => setSavedMessage(""), 3000);
		} catch (e) {
			console.error("Failed to update slide", e);
		} finally {
			setSavingId(null);
		}
	};

	const handleDeleteSlide = async (id: string) => {
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		if (!confirm("Are you sure you want to delete this hero slide?")) return;
		try {
			await apiFetch(`/slides/${id}`, { method: "DELETE" });
			setSlides((prev) => prev.filter((s) => s.id !== id));
			setSavedMessage("Slide deleted successfully!");
			setTimeout(() => setSavedMessage(""), 3000);
		} catch (e) {
			console.error("Failed to delete slide", e);
		}
	};

	const handleCreateSlide = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		try {
			const res = await apiFetch<{ success: boolean; slide: any }>("/slides", {
				method: "POST",
				body: JSON.stringify(newSlideData),
			});
			if (res && res.success && res.slide) {
				setSlides((prev) => [...prev, res.slide]);
				setNewSlideModal(false);
				setSavedMessage("New slide added successfully!");
				setTimeout(() => setSavedMessage(""), 3000);
			}
		} catch (e) {
			console.error("Failed to create slide", e);
		}
	};

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 text-left">
			{/* Top Header */}
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
						<div className="flex items-center gap-2">
							<button
								onClick={fetchSlides}
								className="px-3.5 h-9 rounded-xl bg-card border border-border/80 text-foreground text-xs font-medium font-heading inline-flex items-center gap-1.5 hover:bg-muted transition-all cursor-pointer"
							>
								<RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
								Refresh
							</button>
							<button
								onClick={() => {
									if (!isEditorUnlocked) unlockEditorMode();
									else setNewSlideModal(true);
								}}
								className="px-4 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-medium font-heading inline-flex items-center gap-1.5 transition-all shadow-xs hover:bg-primary/90 cursor-pointer"
							>
								<Plus className="w-3.5 h-3.5" />
								Add New Slide
							</button>
						</div>
					</div>
				</SectionContainer>
			</div>

			<SectionContainer className="py-10">
				<div className="max-w-4xl mx-auto space-y-8">
					{/* Lock Mode Alert Banner */}
					{!isEditorUnlocked && (
						<div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium flex items-center justify-between gap-4">
							<div className="flex items-center gap-2">
								<Lock className="w-4 h-4 shrink-0" />
								<span><strong>Read-Only Mode Active:</strong> Editing is disabled until you unlock editor mode.</span>
							</div>
							<button
								onClick={unlockEditorMode}
								className="px-3 py-1.5 rounded-lg bg-amber-500 text-black text-[11px] font-bold uppercase tracking-wider hover:bg-amber-400 shrink-0 cursor-pointer"
							>
								Unlock Now
							</button>
						</div>
					)}
					<div className="space-y-1 text-left">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							LIVE DATABASE CONTROL
						</span>
						<h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
							Hero Slider & Banner Manager
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Manage Home Page hero carousel slides, headlines, badges, and background photos synced directly with your PostgreSQL database.
						</p>
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
							<span>Loading slides from database...</span>
						</div>
					) : slides.length === 0 ? (
						<div className="p-12 bg-card border border-border/80 rounded-3xl text-center space-y-3">
							<p className="text-sm text-muted-foreground">No slides found in database.</p>
							<button
								onClick={() => setNewSlideModal(true)}
								className="px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-xl"
							>
								Create First Slide
							</button>
						</div>
					) : (
						/* Slides List */
						<div className="space-y-6">
							{slides.map((slide, idx) => (
								<div
									key={slide.id}
									className="bg-card border border-border/80 rounded-3xl p-6 shadow-xs space-y-4 relative overflow-hidden"
								>
									<div className="flex items-center justify-between border-b border-border/40 pb-3">
										<span className="text-xs font-mono font-medium text-primary uppercase">
											SLIDE #{idx + 1} ({slide.id})
										</span>
										<div className="flex items-center gap-2">
											<button
												onClick={() => handleSaveSlide(slide)}
												disabled={savingId === slide.id}
												className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 inline-flex items-center gap-1 transition-all cursor-pointer"
											>
												{savingId === slide.id ? (
													<Loader2 className="w-3.5 h-3.5 animate-spin" />
												) : (
													<Save className="w-3.5 h-3.5" />
												)}
												Save
											</button>
											<button
												onClick={() => handleDeleteSlide(slide.id)}
												className="px-3 py-1.5 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium hover:bg-destructive/20 inline-flex items-center gap-1 transition-all cursor-pointer"
											>
												<Trash2 className="w-3.5 h-3.5" />
												Delete
											</button>
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-1.5 text-left">
											<label className="text-xs font-medium font-heading text-foreground">
												Badge / Slogan
											</label>
											<input
												type="text"
												value={slide.badge || ""}
												onChange={(e) =>
													handleUpdateSlideField(slide.id, "badge", e.target.value)
												}
												className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground"
											/>
										</div>

										<div className="space-y-1.5 text-left">
											<label className="text-xs font-medium font-heading text-foreground">
												Slide Title / Headline
											</label>
											<input
												type="text"
												value={slide.title || ""}
												onChange={(e) =>
													handleUpdateSlideField(slide.id, "title", e.target.value)
												}
												className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground"
											/>
										</div>

										<div className="md:col-span-2 space-y-1.5 text-left">
											<label className="text-xs font-medium font-heading text-foreground">
												Description Subtitle
											</label>
											<textarea
												rows={2}
												value={slide.subtitle || ""}
												onChange={(e) =>
													handleUpdateSlideField(slide.id, "subtitle", e.target.value)
												}
												className="w-full p-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground"
											/>
										</div>

										<div className="md:col-span-2 space-y-1.5 text-left">
											<label className="text-xs font-medium font-heading text-foreground">
												Background Image URL
											</label>
											<input
												type="text"
												value={slide.image || ""}
												onChange={(e) =>
													handleUpdateSlideField(slide.id, "image", e.target.value)
												}
												className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground font-mono"
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</SectionContainer>

			{/* New Slide Modal */}
			{newSlideModal && (
				<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
					<div className="bg-card border border-border/80 rounded-3xl p-6 max-w-lg w-full space-y-4 text-left shadow-2xl">
						<h3 className="text-lg font-bold font-heading text-foreground">
							Create New Hero Slide
						</h3>
						<form onSubmit={handleCreateSlide} className="space-y-4">
							<div className="space-y-1">
								<label className="text-xs font-semibold text-muted-foreground">Badge Slogan</label>
								<input
									type="text"
									required
									value={newSlideData.badge}
									onChange={(e) => setNewSlideData({ ...newSlideData, badge: e.target.value })}
									className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs"
								/>
							</div>
							<div className="space-y-1">
								<label className="text-xs font-semibold text-muted-foreground">Slide Title</label>
								<input
									type="text"
									required
									value={newSlideData.title}
									onChange={(e) => setNewSlideData({ ...newSlideData, title: e.target.value })}
									className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs"
								/>
							</div>
							<div className="space-y-1">
								<label className="text-xs font-semibold text-muted-foreground">Subtitle / Description</label>
								<textarea
									rows={2}
									required
									value={newSlideData.subtitle}
									onChange={(e) => setNewSlideData({ ...newSlideData, subtitle: e.target.value })}
									className="w-full p-3 rounded-xl bg-background border border-border/60 text-xs"
								/>
							</div>
							<div className="space-y-1">
								<label className="text-xs font-semibold text-muted-foreground">Image URL</label>
								<input
									type="text"
									required
									value={newSlideData.image}
									onChange={(e) => setNewSlideData({ ...newSlideData, image: e.target.value })}
									className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs font-mono"
								/>
							</div>
							<div className="flex items-center justify-end gap-3 pt-2">
								<button
									type="button"
									onClick={() => setNewSlideModal(false)}
									className="px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-medium cursor-pointer"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium cursor-pointer"
								>
									Save to Database
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

