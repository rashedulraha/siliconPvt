"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Save,
	Loader2,
	CheckCircle2,
	Plus,
	Trash2,
	Eye,
	RefreshCw,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import {
	useAboutContent,
	AboutContentData,
	StatItem,
	ValueItem,
	TimelineItem,
	TeamMemberItem,
} from "@/hooks/useAboutContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";

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
						<span className="text-xs font-semibold uppercase tracking-wider text-primary font-heading">
							PUBLIC ABOUT PAGE CONTENT CONTROL
						</span>
						<h1 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
							About & Leadership Settings
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Manage company bio, mission, vision, chairman and MD addresses,
							milestones timeline, and executive team in both English and
							Bengali.
						</p>
					</div>

					{/* Notification Toast */}
					{savedMessage && (
						<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold font-heading flex items-center gap-2 shadow-xs">
							<CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
							<span>{savedMessage}</span>
						</div>
					)}

					{/* Section Tabs */}
					<div className="flex flex-wrap gap-2 border-b border-border/60 pb-3">
						{[
							{ id: "hero", label: "Hero & Who We Are" },
							{ id: "mission", label: "Mission, Vision & Values" },
							{ id: "leadership", label: "Chairman & MD Speeches" },
							{ id: "stats", label: "Stats & Milestones" },
							{ id: "whyChooseUs", label: "Why Choose Us" },
							{ id: "team", label: "Executive Team" },
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

					{/* Form Container */}
					<form onSubmit={handleSave} className="space-y-6">
						{/* 1. HERO & WHO WE ARE */}
						{activeTab === "hero" && (
							<div className="p-6 rounded-2xl bg-card border border-border/70 space-y-5">
								<div className="border-b border-border/50 pb-3">
									<h2 className="text-base font-semibold font-heading">
										Hero Header & Company Bio
									</h2>
									<p className="text-xs text-muted-foreground">
										Configure the main top banner and introduction story.
									</p>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Hero Title (EN)
										</Label>
										<Input
											value={formData.heroTitle}
											onChange={(e) =>
												handleChange("heroTitle", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											হিরো শিরোনাম (BN)
										</Label>
										<Input
											value={formData.heroTitleBn || ""}
											onChange={(e) =>
												handleChange("heroTitleBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Hero Subtitle (EN)
										</Label>
										<Input
											value={formData.heroSubtitle}
											onChange={(e) =>
												handleChange("heroSubtitle", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											হিরো সাবটাইটেল (BN)
										</Label>
										<Input
											value={formData.heroSubtitleBn || ""}
											onChange={(e) =>
												handleChange("heroSubtitleBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Hero Description (EN)
										</Label>
										<Textarea
											rows={3}
											value={formData.heroDesc}
											onChange={(e) => handleChange("heroDesc", e.target.value)}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											হিরো বিবরণ (BN)
										</Label>
										<Textarea
											rows={3}
											value={formData.heroDescBn || ""}
											onChange={(e) =>
												handleChange("heroDescBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Who We Are Title (EN)
										</Label>
										<Input
											value={formData.whoWeAreTitle}
											onChange={(e) =>
												handleChange("whoWeAreTitle", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											পরিচিতি শিরোনাম (BN)
										</Label>
										<Input
											value={formData.whoWeAreTitleBn || ""}
											onChange={(e) =>
												handleChange("whoWeAreTitleBn", e.target.value)
											}
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											Who We Are Description / Bio (EN)
										</Label>
										<Textarea
											rows={4}
											value={formData.whoWeAreDesc}
											onChange={(e) =>
												handleChange("whoWeAreDesc", e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold uppercase text-muted-foreground">
											পরিচিতি বিবরণ (BN)
										</Label>
										<Textarea
											rows={4}
											value={formData.whoWeAreDescBn || ""}
											onChange={(e) =>
												handleChange("whoWeAreDescBn", e.target.value)
											}
										/>
									</div>
								</div>
				</div>
			</SectionContainer>
		</div>
	);
}
