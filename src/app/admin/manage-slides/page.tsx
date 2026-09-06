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
	Image as ImageIcon,
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
import { ImageUpload } from "@/components/ui/image-upload";

export default function ManageSlidesPage() {
	const { slides, loading, refetch, createSlide, updateSlide, deleteSlide } =
		useSlides();

	const [savedMessage, setSavedMessage] = useState("");
	const [actionLoading, setActionLoading] = useState(false);

	// Dedicated Page View State: "list" | "form"
	const [viewMode, setViewMode] = useState<"list" | "form">("list");
	// Display Format State: "cards" | "list" | "images"
	const [displayFormat, setDisplayFormat] = useState<
		"cards" | "list" | "images"
	>("cards");
	const [editingSlide, setEditingSlide] = useState<Slide | null>(null);

	const [formData, setFormData] = useState({
		title: "",
		titleBn: "",
		subtitle: "",
		subtitleBn: "",
		badge: "FEATURED",
		badgeBn: "ফিচার্ড",
		image: "",
		link: "/projects",
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
			image:
				"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
			link: "/projects",
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
		if (!formData.title || !formData.image) {
			alert("Please provide both a Slide Title and Image.");
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
										{editingSlide ? "EDIT HERO SLIDE" : "NEW HERO BANNER SLIDE"}
									</span>
									<h1 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
										{editingSlide
											? `Edit Slide: "${formData.title}"`
											: "Add New Hero Banner Slide"}
									</h1>
									<p className="text-xs sm:text-sm text-muted-foreground font-light">
										Configure bilingual title, badges, links, and
										high-resolution cover image for the 3D rotating cylinder
										hero banner.
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
				</div>
			</SectionContainer>
		</div>
	);
}
