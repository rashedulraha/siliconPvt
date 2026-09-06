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
	Pencil,
	ChevronLeft,
	ChevronRight,
	ImageIcon,
	ExternalLink,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import {
	useHomeContent,
	HomeContentData,
	GalleryItemData,
	ExecutiveLeaderData,
} from "@/hooks/useHomeContent";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";

type TabId =
	| "hero"
	| "masterplan"
	| "gallery"
	| "showcase"
	| "executive"
	| "trackrecord"
	| "accreditations"
	| "cta";

export default function HomeSettingsPage() {
	const { data: initialData, loading, updateContent } = useHomeContent();

	const [formData, setFormData] = useState<HomeContentData>(initialData);
	const [activeTab, setActiveTab] = useState<TabId>("hero");
	const [editingExecutive, setEditingExecutive] = useState<
		"chairman" | "md" | null
	>(null);
	const [editingGalleryIndex, setEditingGalleryIndex] = useState<number | null>(
		null,
	);
	const [editingMasterPlan, setEditingMasterPlan] = useState<
		"layout" | "amenities" | null
	>(null);
	const [saving, setSaving] = useState(false);
	const [savedMessage, setSavedMessage] = useState("");

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleChange = (field: keyof HomeContentData, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleTrustCounterChange = (
		index: number,
		field: "value" | "valueBn" | "label" | "labelBn" | "detail" | "detailBn",
		value: string,
	) => {
		setFormData((prev) => {
			const updated = [...prev.trustCounters];
			updated[index] = { ...updated[index], [field]: value };
			return { ...prev, trustCounters: updated };
		});
	};

	const addTrustCounter = () => {
		setFormData((prev) => ({
			...prev,
			trustCounters: [
				...prev.trustCounters,
				{
					value: "New Stat",
					valueBn: "নতুন পরিসংখ্যান",
					label: "Description Label",
					labelBn: "বিবরণ লেবেল",
					detail: "Verified Detail",
					detailBn: "যাচাইকৃত তথ্য",
				},
			],
		}));
	};

	const removeTrustCounter = (index: number) => {
		setFormData((prev) => ({
			...prev,
			trustCounters: prev.trustCounters.filter((_, i) => i !== index),
		}));
	};

	const addAccreditation = () => {
		setFormData((prev) => ({
			...prev,
			accreditations: [...prev.accreditations, "New Accreditation Badge"],
			accreditationsBn: [...(prev.accreditationsBn || []), "নতুন অনুমোদন ব্যাজ"],
		}));
	};

	const handleAccreditationChange = (
		index: number,
		lang: "en" | "bn",
		value: string,
	) => {
		setFormData((prev) => {
			if (lang === "en") {
				const updated = [...prev.accreditations];
				updated[index] = value;
				return { ...prev, accreditations: updated };
			} else {
				const updated = [...(prev.accreditationsBn || prev.accreditations)];
				updated[index] = value;
				return { ...prev, accreditationsBn: updated };
			}
		});
	};

	const removeAccreditation = (index: number) => {
		setFormData((prev) => ({
			...prev,
			accreditations: prev.accreditations.filter((_, i) => i !== index),
			accreditationsBn: (prev.accreditationsBn || []).filter(
				(_, i) => i !== index,
			),
		}));
	};

	const handleGalleryItemChange = (
		index: number,
		field: keyof GalleryItemData,
		value: any,
	) => {
		setFormData((prev) => {
			const items = [...(prev.galleryItems || [])];
			if (items[index]) {
				items[index] = { ...items[index], [field]: value };
			}
			return { ...prev, galleryItems: items };
		});
	};

	const addGalleryItem = () => {
		const newIndex = (formData.galleryItems || []).length;
		setFormData((prev) => ({
			...prev,
			galleryItems: [
				...(prev.galleryItems || []),
				{
					id: Date.now(),
					title: "New Landmark Progress",
					titleBn: "নতুন উন্নয়ন প্রকল্প",
					subtitle: "Project details and overview",
					subtitleBn: "প্রকল্পের সংক্ষিপ্ত বিবরণ",
					category: "LANDMARK",
					categoryBn: "ল্যান্ডমার্ক",
					src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
					link: "/projects",
				},
			],
		}));
		setEditingGalleryIndex(newIndex);
	};

	const removeGalleryItem = (index: number) => {
		setFormData((prev) => ({
			...prev,
			galleryItems: (prev.galleryItems || []).filter((_, i) => i !== index),
		}));
		if (editingGalleryIndex === index) {
			setEditingGalleryIndex(null);
		} else if (editingGalleryIndex !== null && editingGalleryIndex > index) {
			setEditingGalleryIndex(editingGalleryIndex - 1);
		}
	};

	const handleExecutiveChange = (
		field: keyof ExecutiveLeaderData,
		value: string,
	) => {
		setFormData((prev) => ({
			...prev,
			executive: {
				...(prev.executive || {}),
				[field]: value,
			},
		}));
	};

	const handleSave = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		setSaving(true);
		try {
			await updateContent(formData);
			setSavedMessage(
				"Home page content updated and saved to database successfully!",
			);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (e) {
			console.error("Failed to update home content:", e);
		} finally {
			setSaving(false);
		}
	};

	const tabs: { id: TabId; label: string; desc: string }[] = [
		{
			id: "hero",
			label: "Hero & Carousel Text",
			desc: "Main header text, badges, and primary links",
		},
		{
			id: "masterplan",
			label: "Master Plan & Amenities",
			desc: "Layout card, image, and lifestyle amenities",
		},
		{
			id: "gallery",
			label: "Progress Showcase (5 Cards)",
			desc: "On-ground landmark photos, titles & tags",
		},
		{
			id: "showcase",
			label: "Silicon City Spotlight",
			desc: "Flagship showcase title and descriptions",
		},
		{
			id: "executive",
			label: "Executive Leadership",
			desc: "Chairman & MD portraits, roles & speeches",
		},
		{
			id: "trackrecord",
			label: "Track Record Counters",
			desc: "Corporate milestones and trust stats",
		},
		{
			id: "accreditations",
			label: "Regulatory Accreditations",
			desc: "Certifications and legal compliance badges",
		},
		{
			id: "cta",
			label: "Site Visit CTA Banner",
			desc: "Bottom membership guide and booking action",
		},
	];

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 text-left">
			{/* Top Bar */}
			<div className="border-b border-border/50 py-3 mb-6">
				<SectionContainer>
					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<Link
								href="/admin"
								className="text-xs font-medium font-heading text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
							>
								<ArrowLeft className="w-4 h-4" />
								Back to Admin Overview
							</Link>
						</div>

						<div className="flex items-center gap-2.5">
							<Link
								href="/"
								target="_blank"
								className="px-3.5 h-8 rounded-full border border-border/80 text-foreground hover:bg-muted text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all shadow-2xs"
							>
								<Eye className="w-3.5 h-3.5 text-muted-foreground" />
								<span>Preview Public Page</span>
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
							LIVE DATABASE SYNC
						</span>
						<h1 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
							Home Page Content Manager
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Edit both English and Bengali content side-by-side. Changes save
							directly to PostgreSQL and reflect immediately on the website.
						</p>
					</div>

					{/* Notification Message */}
					{savedMessage && (
						<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold font-heading flex items-center gap-2 shadow-xs">
							<CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
							<span>{savedMessage}</span>
						</div>
					)}

					{/* Section Navigation Tabs */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
						{tabs.map((tab) => {
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									onClick={() => {
										setActiveTab(tab.id);
										if (tab.id !== "masterplan") setEditingMasterPlan(null);
										if (tab.id !== "gallery") setEditingGalleryIndex(null);
										if (tab.id !== "executive") setEditingExecutive(null);
									}}
									className={`p-3.5 rounded-2xl text-left flex flex-col justify-between transition-all cursor-pointer border ${
										isActive
											? "bg-primary text-primary-foreground border-primary shadow-sm scale-[1.01]"
											: "bg-card hover:bg-muted/70 border-border/80 text-foreground hover:border-primary/30"
									}`}
								>
									<div>
										<span className="text-xs font-medium font-heading line-clamp-1 block">
											{tab.label}
										</span>
										<span
											className={`text-[10px] line-clamp-1 font-light block mt-0.5 ${
												isActive ? "text-white/70" : "text-muted-foreground"
											}`}
										>
											{tab.desc}
										</span>
									</div>
								</button>
							);
						})}
					</div>

					{/* 1. HERO SECTION */}
					{activeTab === "hero" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<CardTitle className="text-base font-semibold font-heading">
									Hero Carousel & Headline Overlay
								</CardTitle>
								<CardDescription className="text-xs text-muted-foreground font-light">
									Configure both English and Bengali overlay text displayed over
									the interactive 3D hero carousel.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-6 space-y-6">
								{/* Top Badge Tag */}
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												Hero Top Badge
											</Label>
											<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
												EN
											</span>
										</div>
										<Input
											value={formData.heroBadge || ""}
											onChange={(e) =>
												handleChange("heroBadge", e.target.value)
											}
											placeholder="e.g. PLANNED ECO-TOWNSHIPS & RESIDENTIAL PLOTS"
										/>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												হিরো টপ ব্যাজ
											</Label>
											<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
												বাংলা (BN)
											</span>
										</div>
										<Input
											value={formData.heroBadgeBn || ""}
											onChange={(e) =>
												handleChange("heroBadgeBn", e.target.value)
											}
											placeholder="যেমনঃ পরিকল্পিত পরিবেশবান্ধব টাউনশিপ"
										/>
									</div>
								</div>

								{/* Company / Subtitle Tag */}
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												Company Subtitle Tag
											</Label>
											<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
												EN
											</span>
										</div>
										<Input
											value={formData.heroSubtitle || ""}
											onChange={(e) =>
												handleChange("heroSubtitle", e.target.value)
											}
											placeholder="e.g. Silicon Real Estate (Pvt.) Ltd."
										/>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												কোম্পানি সাবটাইটেল
											</Label>
											<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
												বাংলা (BN)
											</span>
										</div>
										<Input
											value={formData.heroSubtitleBn || ""}
											onChange={(e) =>
												handleChange("heroSubtitleBn", e.target.value)
											}
											placeholder="যেমনঃ সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ"
										/>
									</div>
								</div>

								{/* Hero Main Headline */}
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												Hero Main Headline
											</Label>
											<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
												EN
											</span>
										</div>
										<Input
											value={formData.heroTitle || ""}
											onChange={(e) =>
												handleChange("heroTitle", e.target.value)
											}
											placeholder="e.g. Silicon City — Master Planned Township"
											className="font-medium font-heading"
										/>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												হিরো মূল শিরোনাম
											</Label>
											<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
												বাংলা (BN)
											</span>
										</div>
										<Input
											value={formData.heroTitleBn || ""}
											onChange={(e) =>
												handleChange("heroTitleBn", e.target.value)
											}
											placeholder="যেমনঃ সিলিকন সিটি — পরিকল্পিত আবাসন নগরী"
											className="font-medium font-heading"
										/>
									</div>
								</div>

								{/* Narrative Description */}
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												Hero Description
											</Label>
											<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
												EN
											</span>
										</div>
										<Textarea
											rows={3}
											value={formData.heroDesc || ""}
											onChange={(e) => handleChange("heroDesc", e.target.value)}
											placeholder="Enter hero paragraph text in English..."
										/>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												হিরো বিবরণ
											</Label>
											<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
												বাংলা (BN)
											</span>
										</div>
										<Textarea
											rows={3}
											value={formData.heroDescBn || ""}
											onChange={(e) =>
												handleChange("heroDescBn", e.target.value)
											}
											placeholder="বাংলায় হিরো বিবরণ লিখুন..."
										/>
									</div>
								</div>

								{/* CTA Button & Link */}
								<div className="grid sm:grid-cols-3 gap-4 pt-2 border-t border-border/40">
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												CTA Button Text
											</Label>
											<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
												EN
											</span>
										</div>
										<Input
											value={formData.heroCtaText || ""}
											onChange={(e) =>
												handleChange("heroCtaText", e.target.value)
											}
											placeholder="e.g. EXPLORE PROJECTS"
										/>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
												বাটন টেক্সট
											</Label>
											<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
												বাংলা (BN)
											</span>
										</div>
										<Input
											value={formData.heroCtaTextBn || ""}
											onChange={(e) =>
												handleChange("heroCtaTextBn", e.target.value)
											}
											placeholder="যেমনঃ প্রজেক্ট বিস্তারিত"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											CTA Destination Link
										</Label>
										<Input
											value={formData.heroCtaLink || ""}
											onChange={(e) =>
												handleChange("heroCtaLink", e.target.value)
											}
											placeholder="e.g. /projects"
										/>
									</div>
								</div>

								{/* Hero Background Image Upload */}
								<div className="pt-4 border-t border-border/40">
									<ImageUpload
										label="Hero Section Architectural Background Image"
										description="Upload a custom luxury architectural background image for the main Hero section (hosted on ImgBB CDN)."
										value={formData.heroBgImage || ""}
										onChange={(url) => handleChange("heroBgImage", url)}
										aspectRatio="banner"
									/>
								</div>
							</CardContent>
						</Card>
					)}

					{/* 2. MASTER PLAN & AMENITIES */}
					{activeTab === "masterplan" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
									<div>
										<CardTitle className="text-base font-semibold font-heading">
											Master Plan & Lifestyle Amenities (2 Showcase Cards)
										</CardTitle>
										<CardDescription className="text-xs text-muted-foreground font-light">
											{editingMasterPlan === null
												? "Preview both layout and lifestyle cards shown side-by-side on the homepage. Click on either card to upload/change photos on ImgBB CDN and edit bilingual details."
												: editingMasterPlan === "layout"
													? "Update Card #1: Aerial Master Plan Layout photograph, bilingual titles, and avenue specifications."
													: "Update Card #2: Modern Lifestyle Amenities photograph, bilingual titles, and civic facilities overview."}
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="p-6 space-y-6">
								{editingMasterPlan === null ? (
									/* ── CARDS GRID OVERVIEW (2 SIDE-BY-SIDE CARDS) ── */
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{/* Card 1: Master Plan Layout Card */}
										<div className="group bg-card/60 hover:bg-card border border-border/70 hover:border-primary/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
											{/* Image Header */}
											<div className="relative h-48 sm:h-52 w-full bg-muted/40 overflow-hidden border-b border-border/40">
												{formData.masterPlanImage ? (
													<img
														src={formData.masterPlanImage}
														alt={
															formData.masterPlanTitle || "Master Plan Layout"
														}
														className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
													/>
												) : (
													<div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-muted-foreground">
														<ImageIcon className="w-8 h-8 opacity-40" />
														<span className="text-[11px] font-mono">
															No Image Uploaded
														</span>
													</div>
												)}
												<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

												{/* Top Left Badges */}
												<div className="absolute top-3 left-3 flex items-center gap-1.5">
													<span className="w-6 h-6 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold font-heading flex items-center justify-center shadow-xs">
														#1
													</span>
													<span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider shadow-xs">
														{formData.masterPlanBadge || "MASTER PLAN"}
													</span>
												</div>

												{/* Bottom on Image */}
												<div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white/90 text-[10px] font-mono">
													<span className="truncate bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
														Left Homepage Card
													</span>
													<span className="text-white/70 text-[10px]">
														Aerial Master Plan
													</span>
												</div>
											</div>

											{/* Content Info */}
											<div className="p-5 flex-1 flex flex-col justify-between space-y-3">
												<div className="space-y-1.5">
													<h4 className="font-semibold font-heading text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
														{formData.masterPlanTitle ||
															"At a Glance: Township Layout"}
													</h4>
													{formData.masterPlanTitleBn && (
														<p className="text-xs text-muted-foreground/90 font-bangla line-clamp-1">
															{formData.masterPlanTitleBn}
														</p>
													)}
													<p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed pt-1">
														{formData.masterPlanDesc ||
															"Meticulously planned master layout featuring 30ft & 40ft wide avenues..."}
													</p>
												</div>

												{/* Action Buttons */}
												<div className="pt-3 border-t border-border/40 flex items-center gap-2">
													<Button
														type="button"
														onClick={() => setEditingMasterPlan("layout")}
														className="flex-1 min-w-0 text-xs font-heading cursor-pointer gap-1.5"
														size="sm"
													>
														<Pencil className="w-3.5 h-3.5" />
														Edit Master Plan Card & Photo
													</Button>
													{formData.masterPlanImage && (
														<Button
															type="button"
															variant="outline"
															size="icon"
															onClick={() =>
																handleChange("masterPlanImage", "")
															}
															className="h-8 w-8 shrink-0 text-destructive border-destructive/30 hover:bg-destructive/10 cursor-pointer"
															title="Remove Photo"
														>
															<Trash2 className="w-3.5 h-3.5" />
														</Button>
													)}
												</div>
											</div>
										</div>

										{/* Card 2: Lifestyle Amenities Card */}
										<div className="group bg-card/60 hover:bg-card border border-border/70 hover:border-primary/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
											{/* Image Header */}
											<div className="relative h-48 sm:h-52 w-full bg-muted/40 overflow-hidden border-b border-border/40">
												{formData.amenitiesImage ? (
													<img
														src={formData.amenitiesImage}
														alt={
															formData.amenitiesTitle || "Lifestyle Amenities"
														}
														className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
													/>
												) : (
													<div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-muted-foreground">
														<ImageIcon className="w-8 h-8 opacity-40" />
														<span className="text-[11px] font-mono">
															No Image Uploaded
														</span>
													</div>
												)}
												<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

												{/* Top Left Badges */}
												<div className="absolute top-3 left-3 flex items-center gap-1.5">
													<span className="w-6 h-6 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold font-heading flex items-center justify-center shadow-xs">
														#2
													</span>
													<span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider shadow-xs">
														{formData.amenitiesBadge || "LIFESTYLE AMENITIES"}
													</span>
												</div>

												{/* Bottom on Image */}
												<div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white/90 text-[10px] font-mono">
													<span className="truncate bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
														Right Homepage Card
													</span>
													<span className="text-white/70 text-[10px]">
														Integrated Civic Facilities
													</span>
												</div>
											</div>

											{/* Content Info */}
											<div className="p-5 flex-1 flex flex-col justify-between space-y-3">
												<div className="space-y-1.5">
													<h4 className="font-semibold font-heading text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
														{formData.amenitiesTitle ||
															"All Modern Lifestyle Amenities"}
													</h4>
													{formData.amenitiesTitleBn && (
														<p className="text-xs text-muted-foreground/90 font-bangla line-clamp-1">
															{formData.amenitiesTitleBn}
														</p>
													)}
													<p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed pt-1">
														{formData.amenitiesDesc ||
															"Dedicated Central Mosque, Grand Athletics Sports Ground, Riverfront Green Eco Parks..."}
													</p>
												</div>

												{/* Action Buttons */}
												<div className="pt-3 border-t border-border/40 flex items-center gap-2">
													<Button
														type="button"
														onClick={() => setEditingMasterPlan("amenities")}
														className="flex-1 min-w-0 text-xs font-heading cursor-pointer gap-1.5"
														size="sm"
													>
														<Pencil className="w-3.5 h-3.5" />
														Edit Amenities Card & Photo
													</Button>
													{formData.amenitiesImage && (
														<Button
															type="button"
															variant="outline"
															size="icon"
															onClick={() => handleChange("amenitiesImage", "")}
															className="h-8 w-8 shrink-0 text-destructive border-destructive/30 hover:bg-destructive/10 cursor-pointer"
															title="Remove Photo"
														>
															<Trash2 className="w-3.5 h-3.5" />
														</Button>
													)}
												</div>
											</div>
										</div>
									</div>
								) : editingMasterPlan === "layout" ? (
									/* ── IN-PLACE DEDICATED EDITOR: CARD 1 (MASTER PLAN) ── */
									<div className="space-y-6">
										{/* Editor Navigation Bar */}
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border/70">
											<div className="flex items-center gap-3">
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() => setEditingMasterPlan(null)}
													className="gap-1.5 text-xs font-heading cursor-pointer shadow-2xs hover:bg-background"
												>
													<ArrowLeft className="w-3.5 h-3.5" />
													Back to Cards Overview
												</Button>
												<div className="h-4 w-px bg-border/60 hidden sm:block" />
												<div className="flex items-center gap-2">
													<span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold font-heading flex items-center justify-center">
														#1
													</span>
													<span className="font-semibold font-heading text-sm text-foreground truncate max-w-[200px] sm:max-w-xs">
														{formData.masterPlanTitle || "Master Plan Layout"}
													</span>
												</div>
											</div>

											{/* Switch to Amenities Card Button */}
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={() => setEditingMasterPlan("amenities")}
												className="h-8 px-2.5 text-xs gap-1 cursor-pointer hover:bg-muted text-muted-foreground hover:text-foreground"
											>
												<span>Switch to Card #2: Lifestyle Amenities</span>
												<ChevronRight className="w-4 h-4" />
											</Button>
										</div>

										{/* TOP ROW: Photo on Left (5 cols), Basic Info on Right (7 cols) */}
										<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
											{/* Left Column: Photo Upload Component */}
											<div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70 space-y-4">
												<div className="flex items-center justify-between pb-2 border-b border-border/40">
													<Label className="text-xs font-semibold font-heading uppercase tracking-wider text-primary">
														Master Plan Layout Image (ImgBB CDN)
													</Label>
													<span className="text-[11px] font-mono text-muted-foreground">
														16:9 / Video Ratio
													</span>
												</div>

												<ImageUpload
													label="Aerial Master Plan Layout Photo"
													description="Upload master plan aerial layout directly to ImgBB CDN with instant live preview."
													value={formData.masterPlanImage || ""}
													onChange={(url) =>
														handleChange("masterPlanImage", url)
													}
													aspectRatio="video"
												/>
											</div>

											{/* Right Column: Titles & Badges */}
											<div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70 space-y-4 flex flex-col justify-between">
												<div className="space-y-4">
													<div className="pb-2 border-b border-border/40">
														<Label className="text-xs font-semibold font-heading uppercase tracking-wider text-primary">
															Titles & Badge Tag
														</Label>
													</div>

													{/* Badge Tag EN & BN */}
													<div className="grid sm:grid-cols-2 gap-4">
														<div className="space-y-2">
															<div className="flex items-center justify-between">
																<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																	Badge Tag
																</Label>
																<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
																	EN
																</span>
															</div>
															<Input
																value={formData.masterPlanBadge || ""}
																onChange={(e) =>
																	handleChange(
																		"masterPlanBadge",
																		e.target.value,
																	)
																}
																placeholder="e.g. MASTER PLAN"
																className="font-medium font-heading"
															/>
														</div>
														<div className="space-y-2">
															<div className="flex items-center justify-between">
																<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																	ব্যাজ ট্যাগ
																</Label>
																<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
																	বাংলা (BN)
																</span>
															</div>
															<Input
																value={formData.masterPlanBadgeBn || ""}
																onChange={(e) =>
																	handleChange(
																		"masterPlanBadgeBn",
																		e.target.value,
																	)
																}
																placeholder="যেমনঃ মাস্টার প্ল্যান"
																className="font-medium font-heading"
															/>
														</div>
													</div>

													{/* Titles EN & BN */}
													<div className="grid sm:grid-cols-2 gap-4">
														<div className="space-y-2">
															<div className="flex items-center justify-between">
																<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																	Card Title
																</Label>
																<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
																	EN
																</span>
															</div>
															<Input
																value={formData.masterPlanTitle || ""}
																onChange={(e) =>
																	handleChange(
																		"masterPlanTitle",
																		e.target.value,
																	)
																}
																placeholder="e.g. At a Glance: Township Layout"
																className="font-bold font-heading"
															/>
														</div>
														<div className="space-y-2">
															<div className="flex items-center justify-between">
																<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																	কার্ড শিরোনাম
																</Label>
																<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
																	বাংলা (BN)
																</span>
															</div>
															<Input
																value={formData.masterPlanTitleBn || ""}
																onChange={(e) =>
																	handleChange(
																		"masterPlanTitleBn",
																		e.target.value,
																	)
																}
																placeholder="যেমনঃ এক নজরে: টাউনশিপ লেআউট"
																className="font-bold font-heading"
															/>
														</div>
													</div>
												</div>

												{/* Quick Status Info */}
												<div className="p-3 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-between text-xs text-muted-foreground">
													<span className="font-heading">
														Position: Left Card (#1 of 2)
													</span>
													<span className="text-emerald-500 font-medium flex items-center gap-1">
														<CheckCircle2 className="w-3.5 h-3.5" />
														Auto-synced to form state
													</span>
												</div>
											</div>
										</div>

										{/* BOTTOM ROW: Description in Full Width Split */}
										<div className="p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70 space-y-4">
											<div className="pb-2 border-b border-border/40">
												<Label className="text-xs font-semibold font-heading uppercase tracking-wider text-primary">
													Layout Narrative Description (লেআউট বিবরণ ও রূপরেখা)
												</Label>
											</div>

											<div className="grid sm:grid-cols-2 gap-4">
												<div className="space-y-2">
													<div className="flex items-center justify-between">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															Layout Description
														</Label>
														<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
															English
														</span>
													</div>
													<Textarea
														rows={4}
														value={formData.masterPlanDesc || ""}
														onChange={(e) =>
															handleChange("masterPlanDesc", e.target.value)
														}
														placeholder="Enter master plan avenues and layout description in English..."
														className="leading-relaxed"
													/>
												</div>
												<div className="space-y-2">
													<div className="flex items-center justify-between">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															মাস্টার প্ল্যান লেআউট বিবরণ
														</Label>
														<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
															বাংলা (BN)
														</span>
													</div>
													<Textarea
														rows={4}
														value={formData.masterPlanDescBn || ""}
														onChange={(e) =>
															handleChange("masterPlanDescBn", e.target.value)
														}
														placeholder="রাস্তা ও মাস্টার প্ল্যান জোনিং বিবরণ বাংলায় লিখুন..."
														className="leading-relaxed font-bangla"
													/>
												</div>
											</div>
										</div>

										{/* ACTION FOOTER */}
										<div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
											<Button
												type="button"
												variant="outline"
												onClick={() => setEditingMasterPlan(null)}
												className="w-full sm:w-auto text-xs font-heading cursor-pointer gap-1.5"
											>
												<ArrowLeft className="w-3.5 h-3.5" />
												Return to Cards Overview
											</Button>

											<Button
												type="button"
												onClick={() => setEditingMasterPlan(null)}
												className="w-full sm:w-auto text-xs font-heading cursor-pointer gap-1.5"
											>
												<CheckCircle2 className="w-3.5 h-3.5" />
												Done & Return
											</Button>
										</div>
									</div>
								) : (
									/* ── IN-PLACE DEDICATED EDITOR: CARD 2 (LIFESTYLE AMENITIES) ── */
									<div className="space-y-6">
										{/* Editor Navigation Bar */}
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border/70">
											<div className="flex items-center gap-3">
												<Button
													type="button"
													variant="outline"
													size="sm"
													onClick={() => setEditingMasterPlan(null)}
													className="gap-1.5 text-xs font-heading cursor-pointer shadow-2xs hover:bg-background"
												>
													<ArrowLeft className="w-3.5 h-3.5" />
													Back to Cards Overview
												</Button>
												<div className="h-4 w-px bg-border/60 hidden sm:block" />
												<div className="flex items-center gap-2">
													<span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold font-heading flex items-center justify-center">
														#2
													</span>
													<span className="font-semibold font-heading text-sm text-foreground truncate max-w-[200px] sm:max-w-xs">
														{formData.amenitiesTitle || "Lifestyle Amenities"}
													</span>
												</div>
											</div>

											{/* Switch to Master Plan Card Button */}
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={() => setEditingMasterPlan("layout")}
												className="h-8 px-2.5 text-xs gap-1 cursor-pointer hover:bg-muted text-muted-foreground hover:text-foreground"
											>
												<ChevronLeft className="w-4 h-4" />
												<span>Switch to Card #1: Master Plan Layout</span>
											</Button>
										</div>

										{/* TOP ROW: Photo on Left (5 cols), Basic Info on Right (7 cols) */}
										<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
											{/* Left Column: Photo Upload Component */}
											<div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70 space-y-4">
												<div className="flex items-center justify-between pb-2 border-b border-border/40">
													<Label className="text-xs font-semibold font-heading uppercase tracking-wider text-primary">
														Amenities Showcase Image (ImgBB CDN)
													</Label>
													<span className="text-[11px] font-mono text-muted-foreground">
														16:9 / Video Ratio
													</span>
												</div>

												<ImageUpload
													label="Lifestyle Amenities Photograph"
													description="Upload eco park and civic amenities photo directly to ImgBB CDN with instant live preview."
													value={formData.amenitiesImage || ""}
													onChange={(url) =>
														handleChange("amenitiesImage", url)
													}
													aspectRatio="video"
												/>
											</div>

											{/* Right Column: Titles & Badges */}
											<div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70 space-y-4 flex flex-col justify-between">
												<div className="space-y-4">
													<div className="pb-2 border-b border-border/40">
														<Label className="text-xs font-semibold font-heading uppercase tracking-wider text-primary">
															Titles & Badge Tag
														</Label>
													</div>

													{/* Badge Tag EN & BN */}
													<div className="grid sm:grid-cols-2 gap-4">
														<div className="space-y-2">
															<div className="flex items-center justify-between">
																<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																	Badge Tag
																</Label>
																<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
																	EN
																</span>
															</div>
															<Input
																value={formData.amenitiesBadge || ""}
																onChange={(e) =>
																	handleChange("amenitiesBadge", e.target.value)
																}
																placeholder="e.g. LIFESTYLE AMENITIES"
																className="font-medium font-heading"
															/>
														</div>
														<div className="space-y-2">
															<div className="flex items-center justify-between">
																<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																	ব্যাজ ট্যাগ
																</Label>
																<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
																	বাংলা (BN)
																</span>
															</div>
															<Input
																value={formData.amenitiesBadgeBn || ""}
																onChange={(e) =>
																	handleChange(
																		"amenitiesBadgeBn",
																		e.target.value,
																	)
																}
																placeholder="যেমনঃ নাগরিক সুবিধা"
																className="font-medium font-heading"
															/>
														</div>
													</div>

													{/* Titles EN & BN */}
													<div className="grid sm:grid-cols-2 gap-4">
														<div className="space-y-2">
															<div className="flex items-center justify-between">
																<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																	Card Title
																</Label>
																<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
																	EN
																</span>
															</div>
															<Input
																value={formData.amenitiesTitle || ""}
																onChange={(e) =>
																	handleChange("amenitiesTitle", e.target.value)
																}
																placeholder="e.g. All Modern Lifestyle Amenities"
																className="font-bold font-heading"
															/>
														</div>
														<div className="space-y-2">
															<div className="flex items-center justify-between">
																<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																	কার্ড শিরোনাম
																</Label>
																<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
																	বাংলা (BN)
																</span>
															</div>
															<Input
																value={formData.amenitiesTitleBn || ""}
																onChange={(e) =>
																	handleChange(
																		"amenitiesTitleBn",
																		e.target.value,
																	)
																}
																placeholder="যেমনঃ আধুনিক জীবনযাত্রার সকল নাগরিক সুযোগ-সুবিধা"
																className="font-bold font-heading"
															/>
														</div>
													</div>
												</div>

												{/* Quick Status Info */}
												<div className="p-3 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-between text-xs text-muted-foreground">
													<span className="font-heading">
														Position: Right Card (#2 of 2)
													</span>
													<span className="text-emerald-500 font-medium flex items-center gap-1">
														<CheckCircle2 className="w-3.5 h-3.5" />
														Auto-synced to form state
													</span>
												</div>
											</div>
										</div>

										{/* BOTTOM ROW: Description in Full Width Split */}
										<div className="p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70 space-y-4">
											<div className="pb-2 border-b border-border/40">
												<Label className="text-xs font-semibold font-heading uppercase tracking-wider text-primary">
													Civic Amenities Narrative Description (নাগরিক সুবিধা
													বিবরণ)
												</Label>
											</div>

											<div className="grid sm:grid-cols-2 gap-4">
												<div className="space-y-2">
													<div className="flex items-center justify-between">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															Amenities Description
														</Label>
														<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
															English
														</span>
													</div>
													<Textarea
														rows={4}
														value={formData.amenitiesDesc || ""}
														onChange={(e) =>
															handleChange("amenitiesDesc", e.target.value)
														}
														placeholder="Enter civic amenities and facilities description in English..."
														className="leading-relaxed"
													/>
												</div>
												<div className="space-y-2">
													<div className="flex items-center justify-between">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															নাগরিক সুযোগ-সুবিধার বিবরণ
														</Label>
														<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
															বাংলা (BN)
														</span>
													</div>
													<Textarea
														rows={4}
														value={formData.amenitiesDescBn || ""}
														onChange={(e) =>
															handleChange("amenitiesDescBn", e.target.value)
														}
														placeholder="নাগরিক ও লাইফস্টাইল সুবিধার বিবরণ বাংলায় লিখুন..."
														className="leading-relaxed font-bangla"
													/>
												</div>
											</div>
										</div>

										{/* ACTION FOOTER */}
										<div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
											<Button
												type="button"
												variant="outline"
												onClick={() => setEditingMasterPlan(null)}
												className="w-full sm:w-auto text-xs font-heading cursor-pointer gap-1.5"
											>
												<ArrowLeft className="w-3.5 h-3.5" />
												Return to Cards Overview
											</Button>

											<Button
												type="button"
												onClick={() => setEditingMasterPlan(null)}
												className="w-full sm:w-auto text-xs font-heading cursor-pointer gap-1.5"
											>
												<CheckCircle2 className="w-3.5 h-3.5" />
												Done & Return
											</Button>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					)}

					{/* 3. PROGRESS SHOWCASE (LANDMARK CAROUSEL) */}
					{activeTab === "gallery" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
									<div>
										<CardTitle className="text-base font-semibold font-heading">
											On-Ground Progress Showcase (
											{(formData.galleryItems || []).length} Landmark Cards)
										</CardTitle>
										<CardDescription className="text-xs text-muted-foreground font-light">
											{editingGalleryIndex === null
												? 'Preview all landmark development cards shown on the landing page carousel. Click "Edit Landmark" on any card to update photos via ImgBB and edit details.'
												: "Update photo on ImgBB CDN, bilingual titles, category tags, and development progress details."}
										</CardDescription>
									</div>
									{editingGalleryIndex === null && (
										<Button
											type="button"
											onClick={addGalleryItem}
											size="sm"
											variant="outline"
											className="gap-1 text-xs shrink-0 self-start sm:self-auto cursor-pointer"
										>
											<Plus className="w-3.5 h-3.5" />
											Add Landmark Card
										</Button>
									)}
								</div>
							</CardHeader>
							<CardContent className="p-6 space-y-6">
								{editingGalleryIndex === null ? (
									/* ── CARDS GRID OVERVIEW ── */
									<div>
										{!formData.galleryItems ||
										formData.galleryItems.length === 0 ? (
											<div className="text-center py-16 border-2 border-dashed border-border/60 rounded-2xl p-8 space-y-4">
												<div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
													<ImageIcon className="w-6 h-6" />
												</div>
												<div className="space-y-1">
													<h4 className="text-sm font-semibold font-heading">
														No Landmark Cards Configured
													</h4>
													<p className="text-xs text-muted-foreground max-w-sm mx-auto">
														Click &quot;Add Landmark Card&quot; to showcase
														on-ground development progress on the landing page.
													</p>
												</div>
												<Button
													type="button"
													onClick={addGalleryItem}
													size="sm"
													className="gap-1.5 text-xs font-heading cursor-pointer"
												>
													<Plus className="w-3.5 h-3.5" />
													Add First Landmark Card
												</Button>
											</div>
										) : (
											<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
												{formData.galleryItems.map((item, index) => (
													<div
														key={item.id || index}
														className="group bg-card/60 hover:bg-card border border-border/70 hover:border-primary/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
													>
														{/* Top: Landmark Photo with Badge Overlays */}
														<div className="relative h-44 w-full bg-muted/40 overflow-hidden border-b border-border/40">
															{item.src ? (
																<img
																	src={item.src}
																	alt={item.title || "Landmark"}
																	className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
																/>
															) : (
																<div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-muted-foreground">
																	<ImageIcon className="w-8 h-8 opacity-40" />
																	<span className="text-[11px] font-mono">
																		No Image Uploaded
																	</span>
																</div>
															)}
															<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

															{/* Top Left: Number & Category Badge */}
															<div className="absolute top-3 left-3 flex items-center gap-1.5">
																<span className="w-6 h-6 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold font-heading flex items-center justify-center shadow-xs">
																	#{index + 1}
																</span>
																<span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider shadow-xs">
																	{item.category || "LANDMARK"}
																</span>
															</div>

															{/* Bottom on Image: Destination link preview */}
															<div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white/90 text-[10px] font-mono">
																<span className="truncate bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10 max-w-[80%]">
																	{item.link || "/projects"}
																</span>
																<span className="text-white/60 text-[10px]">
																	Card {index + 1} of{" "}
																	{(formData.galleryItems || []).length}
																</span>
															</div>
														</div>

														{/* Middle: Content Info */}
														<div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
															<div className="space-y-1.5">
																<h4 className="font-semibold font-heading text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
																	{item.title || `Landmark #${index + 1}`}
																</h4>
																{item.titleBn && (
																	<p className="text-xs text-muted-foreground/90 font-bangla line-clamp-1">
																		{item.titleBn}
																	</p>
																)}
																<p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed pt-1">
																	{item.subtitle || "No description provided."}
																</p>
															</div>

															{/* Bottom: Action Buttons */}
															<div className="pt-3 border-t border-border/40 flex items-center gap-2">
																<Button
																	type="button"
																	onClick={() => setEditingGalleryIndex(index)}
																	className="flex-1 min-w-0 text-xs font-heading cursor-pointer gap-1.5"
																	size="sm"
																>
																	<Pencil className="w-3.5 h-3.5" />
																	Edit Landmark
																</Button>
																{formData.galleryItems &&
																	formData.galleryItems.length > 1 && (
																		<Button
																			type="button"
																			variant="outline"
																			size="icon"
																			onClick={() => removeGalleryItem(index)}
																			className="h-8 w-8 shrink-0 text-destructive border-destructive/30 hover:bg-destructive/10 cursor-pointer"
																			title="Delete Landmark Card"
																		>
																			<Trash2 className="w-3.5 h-3.5" />
																		</Button>
																	)}
															</div>
														</div>
													</div>
												))}
											</div>
										)}
									</div>
								) : (
									/* ── IN-PLACE DEDICATED LANDMARK CARD EDITOR ── */
									(() => {
										const currentItem = (formData.galleryItems || [])[
											editingGalleryIndex
										];
										if (!currentItem) {
											return (
												<div className="text-center py-10 space-y-3">
													<p className="text-xs text-muted-foreground">
														Landmark card not found.
													</p>
													<Button
														type="button"
														onClick={() => setEditingGalleryIndex(null)}
														size="sm"
													>
														Back to Overview
													</Button>
												</div>
											);
										}

										return (
											<div className="space-y-6">
												{/* Editor Navigation Bar */}
												<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border/70">
													<div className="flex items-center gap-3">
														<Button
															type="button"
															variant="outline"
															size="sm"
															onClick={() => setEditingGalleryIndex(null)}
															className="gap-1.5 text-xs font-heading cursor-pointer shadow-2xs hover:bg-background"
														>
															<ArrowLeft className="w-3.5 h-3.5" />
															Back to Cards Overview
														</Button>
														<div className="h-4 w-px bg-border/60 hidden sm:block" />
														<div className="flex items-center gap-2">
															<span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold font-heading flex items-center justify-center">
																#{editingGalleryIndex + 1}
															</span>
															<span className="font-semibold font-heading text-sm text-foreground truncate max-w-[200px] sm:max-w-xs">
																{currentItem.title ||
																	`Landmark Card #${editingGalleryIndex + 1}`}
															</span>
														</div>
													</div>

													{/* Prev / Next Card Navigator */}
													<div className="flex items-center gap-1.5 self-end sm:self-auto">
														<Button
															type="button"
															variant="ghost"
															size="sm"
															disabled={editingGalleryIndex === 0}
															onClick={() =>
																setEditingGalleryIndex(editingGalleryIndex - 1)
															}
															className="h-8 px-2 text-xs gap-1 cursor-pointer"
															title="Previous Landmark Card"
														>
															<ChevronLeft className="w-4 h-4" />
															<span className="hidden sm:inline">Prev</span>
														</Button>
														<span className="text-[11px] font-mono text-muted-foreground px-1">
															{editingGalleryIndex + 1} /{" "}
															{(formData.galleryItems || []).length}
														</span>
														<Button
															type="button"
															variant="ghost"
															size="sm"
															disabled={
																editingGalleryIndex >=
																(formData.galleryItems || []).length - 1
															}
															onClick={() =>
																setEditingGalleryIndex(editingGalleryIndex + 1)
															}
															className="h-8 px-2 text-xs gap-1 cursor-pointer"
															title="Next Landmark Card"
														>
															<span className="hidden sm:inline">Next</span>
															<ChevronRight className="w-4 h-4" />
														</Button>
													</div>
												</div>

												{/* TOP ROW: Photo on Left (5 cols), Basic Info on Right (7 cols) */}
												<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
													{/* Left Column: Photo Upload */}
													<div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70 space-y-4">
														<div className="flex items-center justify-between pb-2 border-b border-border/40">
															<Label className="text-xs font-semibold font-heading uppercase tracking-wider text-primary">
																Landmark Photo (ImgBB CDN)
															</Label>
															<span className="text-[11px] font-mono text-muted-foreground">
																16:9 Aspect Ratio
															</span>
														</div>

														<ImageUpload
															label="Landmark Photograph"
															description="Upload project photo directly to ImgBB CDN with instant live preview."
															value={currentItem.src || ""}
															onChange={(url) =>
																handleGalleryItemChange(
																	editingGalleryIndex,
																	"src",
																	url,
																)
															}
															aspectRatio="video"
														/>

														{/* Destination URL with quick presets */}
														<div className="space-y-2 pt-2 border-t border-border/40">
															<Label className="text-xs font-semibold font-heading text-muted-foreground">
																Click Destination URL
															</Label>
															<Input
																value={currentItem.link || ""}
																onChange={(e) =>
																	handleGalleryItemChange(
																		editingGalleryIndex,
																		"link",
																		e.target.value,
																	)
																}
																placeholder="e.g. /projects or /about"
																className="font-mono text-xs"
															/>
															<div className="flex flex-wrap gap-1.5 pt-1">
																{[
																	"/projects",
																	"/about",
																	"/contact",
																	"/services",
																].map((preset) => (
																	<button
																		key={preset}
																		type="button"
																		onClick={() =>
																			handleGalleryItemChange(
																				editingGalleryIndex,
																				"link",
																				preset,
																			)
																		}
																		className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
																			currentItem.link === preset
																				? "bg-primary text-primary-foreground border-primary"
																				: "bg-muted text-muted-foreground border-border hover:border-primary/50"
																		}`}
																	>
																		{preset}
																	</button>
																))}
															</div>
														</div>
													</div>

													{/* Right Column: Titles & Categories */}
													<div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70 space-y-4 flex flex-col justify-between">
														<div className="space-y-4">
															<div className="pb-2 border-b border-border/40">
																<Label className="text-xs font-semibold font-heading uppercase tracking-wider text-primary">
																	Titles & Category Classification
																</Label>
															</div>

															{/* Titles EN & BN */}
															<div className="grid sm:grid-cols-2 gap-4">
																<div className="space-y-2">
																	<div className="flex items-center justify-between">
																		<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																			Card Title
																		</Label>
																		<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
																			EN
																		</span>
																	</div>
																	<Input
																		value={currentItem.title || ""}
																		onChange={(e) =>
																			handleGalleryItemChange(
																				editingGalleryIndex,
																				"title",
																				e.target.value,
																			)
																		}
																		placeholder="e.g. Central Grand Mosque"
																		className="font-medium font-heading"
																	/>
																</div>
																<div className="space-y-2">
																	<div className="flex items-center justify-between">
																		<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																			কার্ড শিরোনাম
																		</Label>
																		<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
																			বাংলা (BN)
																		</span>
																	</div>
																	<Input
																		value={currentItem.titleBn || ""}
																		onChange={(e) =>
																			handleGalleryItemChange(
																				editingGalleryIndex,
																				"titleBn",
																				e.target.value,
																			)
																		}
																		placeholder="যেমনঃ আধুনিক কেন্দ্রীয় মসজিদ"
																		className="font-medium font-heading"
																	/>
																</div>
															</div>

															{/* Category Pill Tag EN & BN */}
															<div className="grid sm:grid-cols-2 gap-4">
																<div className="space-y-2">
																	<div className="flex items-center justify-between">
																		<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																			Category Tag
																		</Label>
																		<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
																			EN
																		</span>
																	</div>
																	<Input
																		value={currentItem.category || ""}
																		onChange={(e) =>
																			handleGalleryItemChange(
																				editingGalleryIndex,
																				"category",
																				e.target.value,
																			)
																		}
																		placeholder="e.g. INFRASTRUCTURE, MOSQUE"
																	/>
																</div>
																<div className="space-y-2">
																	<div className="flex items-center justify-between">
																		<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																			ক্যাটাগরি ট্যাগ
																		</Label>
																		<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
																			বাংলা (BN)
																		</span>
																	</div>
																	<Input
																		value={currentItem.categoryBn || ""}
																		onChange={(e) =>
																			handleGalleryItemChange(
																				editingGalleryIndex,
																				"categoryBn",
																				e.target.value,
																			)
																		}
																		placeholder="যেমনঃ অবকাঠামো, ধর্মীয় স্থাপনা"
																	/>
																</div>
															</div>
														</div>

														{/* Quick Card Status Info */}
														<div className="p-3 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-between text-xs text-muted-foreground">
															<span className="font-heading">
																Order Position: #{editingGalleryIndex + 1} of{" "}
																{(formData.galleryItems || []).length}
															</span>
															<span className="text-emerald-500 font-medium flex items-center gap-1">
																<CheckCircle2 className="w-3.5 h-3.5" />
																Auto-synced to form state
															</span>
														</div>
													</div>
												</div>

												{/* BOTTOM ROW: Subtitle & Description in Full Width Split */}
												<div className="p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70 space-y-4">
													<div className="pb-2 border-b border-border/40">
														<Label className="text-xs font-semibold font-heading uppercase tracking-wider text-primary">
															Overview & Landmark Description (বিবরণ ও উন্নয়ন
															অগ্রগতি বার্তা)
														</Label>
													</div>

													<div className="grid sm:grid-cols-2 gap-4">
														<div className="space-y-2">
															<div className="flex items-center justify-between">
																<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																	Subtitle / Narrative Description
																</Label>
																<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
																	English
																</span>
															</div>
															<Textarea
																rows={4}
																value={currentItem.subtitle || ""}
																onChange={(e) =>
																	handleGalleryItemChange(
																		editingGalleryIndex,
																		"subtitle",
																		e.target.value,
																	)
																}
																placeholder="Enter landmark description and development progress details in English..."
																className="leading-relaxed"
															/>
														</div>
														<div className="space-y-2">
															<div className="flex items-center justify-between">
																<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
																	সাবটাইটেল ও উন্নয়ন অগ্রগতি বিবরণ
																</Label>
																<span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
																	বাংলা (BN)
																</span>
															</div>
															<Textarea
																rows={4}
																value={currentItem.subtitleBn || ""}
																onChange={(e) =>
																	handleGalleryItemChange(
																		editingGalleryIndex,
																		"subtitleBn",
																		e.target.value,
																	)
																}
																placeholder="উন্নয়ন কাজের সার্বিক অগ্রগতি ও সংক্ষিপ্ত বিবরণ বাংলায় লিখুন..."
																className="leading-relaxed font-bangla"
															/>
														</div>
													</div>
												</div>

												{/* ACTION FOOTER */}
												<div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
													<Button
														type="button"
														variant="outline"
														onClick={() => setEditingGalleryIndex(null)}
														className="w-full sm:w-auto text-xs font-heading cursor-pointer gap-1.5"
													>
														<ArrowLeft className="w-3.5 h-3.5" />
														Return to Landmark Cards Overview
													</Button>

													<div className="flex items-center gap-2 w-full sm:w-auto justify-end">
														{formData.galleryItems &&
															formData.galleryItems.length > 1 && (
				</div>
			</SectionContainer>
		</div>
	);
}
