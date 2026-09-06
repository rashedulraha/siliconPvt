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
																<Button
																	type="button"
																	variant="destructive"
																	size="sm"
																	onClick={() =>
																		removeGalleryItem(editingGalleryIndex)
																	}
																	className="text-xs font-heading cursor-pointer gap-1.5"
																>
																	<Trash2 className="w-3.5 h-3.5" />
																	Delete Landmark Card
																</Button>
															)}
														<Button
															type="button"
															onClick={() => setEditingGalleryIndex(null)}
															className="text-xs font-heading cursor-pointer gap-1.5"
														>
															<CheckCircle2 className="w-3.5 h-3.5" />
															Done & Return
														</Button>
													</div>
												</div>
											</div>
										);
									})()
								)}
							</CardContent>
						</Card>
					)}

					{/* 3. TOWNSHIP SHOWCASE SPOTLIGHT */}
					{activeTab === "showcase" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<CardTitle className="text-base font-semibold font-heading">
									Silicon City Spotlight Showcase
								</CardTitle>
								<CardDescription className="text-xs text-muted-foreground font-light">
									Configure the flagship eco-township showcase titles and
									location summaries.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-6 space-y-5">
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											Section Tag Badge (EN)
										</Label>
										<Input
											value={formData.showcaseBadge || ""}
											onChange={(e) =>
												handleChange("showcaseBadge", e.target.value)
											}
											placeholder="e.g. FLAGSHIP TOWNSHIP"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											সেকশন ব্যাজ (BN)
										</Label>
										<Input
											value={formData.showcaseBadgeBn || ""}
											onChange={(e) =>
												handleChange("showcaseBadgeBn", e.target.value)
											}
											placeholder="যেমনঃ ফ্ল্যাগশিপ মেগা প্রজেক্ট"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											Showcase Headline (EN)
										</Label>
										<Input
											value={formData.showcaseTitle || ""}
											onChange={(e) =>
												handleChange("showcaseTitle", e.target.value)
											}
											placeholder="e.g. Silicon City – The Ideal Housing Township"
											className="font-bold font-heading"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											শোকেস শিরোনাম (BN)
										</Label>
										<Input
											value={formData.showcaseTitleBn || ""}
											onChange={(e) =>
												handleChange("showcaseTitleBn", e.target.value)
											}
											placeholder="যেমনঃ সিলিকন সিটি – পরিকল্পিত নিরাপদ আবাসন নগরী"
											className="font-bold font-heading"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											Geographic & Connectivity Summary (EN)
										</Label>
										<Textarea
											rows={3}
											value={formData.showcaseDesc || ""}
											onChange={(e) =>
												handleChange("showcaseDesc", e.target.value)
											}
											placeholder="Description in English..."
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											ভৌগোলিক ও অবস্থানগত বিবরণ (BN)
										</Label>
										<Textarea
											rows={3}
											value={formData.showcaseDescBn || ""}
											onChange={(e) =>
												handleChange("showcaseDescBn", e.target.value)
											}
											placeholder="বাংলায় অবস্থানগত বিবরণ..."
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					{/* 5. EXECUTIVE LEADERSHIP (CHAIRMAN & MD) */}
					{activeTab === "executive" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
									<div>
										<CardTitle className="text-base font-semibold font-heading">
											Executive Leadership (Chairman & Managing Director)
										</CardTitle>
										<CardDescription className="text-xs text-muted-foreground font-light">
											Preview the 2 executive leadership profiles side-by-side.
											Click on either profile to upload/change photos, delete
											photos, or update speech & details.
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent className="p-6 space-y-6">
								{editingExecutive === null ? (
									/* Side-by-Side 2 Columns Preview */
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{/* Chairman Preview Card */}
										<div className="p-6 rounded-2xl bg-muted/20 border border-border/70 hover:border-primary/40 transition-all flex flex-col justify-between space-y-5">
											<div className="space-y-4">
												<div className="flex items-center justify-between pb-3 border-b border-border/40">
													<span className="text-[11px] font-semibold uppercase tracking-wider text-primary font-heading px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
														Founder & Chairman
													</span>
													<span className="text-[11px] font-mono text-muted-foreground">
														Position #1
													</span>
												</div>

												{/* Photo Preview & Details */}
												<div className="flex items-center gap-4">
													<div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/30 shrink-0 shadow-sm bg-muted/50 flex items-center justify-center">
														{formData.executive?.chairmanImage ? (
															<img
																src={formData.executive.chairmanImage}
																alt={
																	formData.executive?.chairmanName || "Chairman"
																}
																className="w-full h-full object-cover object-center"
															/>
														) : (
															<div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg font-heading">
																AK
															</div>
														)}
													</div>
													<div className="space-y-1 min-w-0">
														<h3 className="font-semibold font-heading text-base text-foreground truncate">
															{formData.executive?.chairmanName ||
																"MD. AHMED KABIR"}
														</h3>
														<p className="text-xs text-muted-foreground font-medium truncate">
															{formData.executive?.chairmanRole ||
																"Founder & Chairman"}
														</p>
														<p className="text-[11px] text-muted-foreground/80 font-bangla truncate">
															{formData.executive?.chairmanNameBn ||
																"মো: আহমেদ কবীর"}{" "}
															•{" "}
															{formData.executive?.chairmanRoleBn ||
																"প্রতিষ্ঠাতা ও চেয়ারম্যান"}
														</p>
													</div>
												</div>

												{/* Quote Preview */}
												{formData.executive?.chairmanQuote && (
													<div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-xs text-muted-foreground italic line-clamp-2">
														&ldquo;{formData.executive.chairmanQuote}&rdquo;
													</div>
												)}
											</div>

											{/* Action Buttons */}
											<div className="pt-3 border-t border-border/40 flex items-center gap-2">
												<Button
													type="button"
													onClick={() => setEditingExecutive("chairman")}
													className="flex-1 min-w-0 text-xs font-heading cursor-pointer"
												>
													Edit Chairman Profile & Photo
												</Button>
												{formData.executive?.chairmanImage && (
													<Button
														type="button"
														variant="outline"
														size="icon"
														onClick={() =>
															handleExecutiveChange("chairmanImage", "")
														}
														className="h-9 w-9 shrink-0 text-destructive border-destructive/30 hover:bg-destructive/10 cursor-pointer"
														title="Delete Chairman Photo"
													>
														<Trash2 className="w-3.5 h-3.5" />
													</Button>
												)}
											</div>
										</div>

										{/* Managing Director Preview Card */}
										<div className="p-6 rounded-2xl bg-muted/20 border border-border/70 hover:border-primary/40 transition-all flex flex-col justify-between space-y-5">
											<div className="space-y-4">
												<div className="flex items-center justify-between pb-3 border-b border-border/40">
													<span className="text-[11px] font-semibold uppercase tracking-wider text-accent font-heading px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
														Managing Director
													</span>
													<span className="text-[11px] font-mono text-muted-foreground">
														Position #2
													</span>
												</div>

												{/* Photo Preview & Details */}
												<div className="flex items-center gap-4">
													<div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-accent/30 shrink-0 shadow-sm bg-muted/50 flex items-center justify-center">
														{formData.executive?.mdImage ? (
															<img
																src={formData.executive.mdImage}
																alt={
																	formData.executive?.mdName ||
																	"Managing Director"
																}
																className="w-full h-full object-cover object-center"
															/>
														) : (
															<div className="w-full h-full bg-accent/10 flex items-center justify-center text-accent font-bold text-lg font-heading">
																SK
															</div>
														)}
													</div>
													<div className="space-y-1 min-w-0">
														<h3 className="font-semibold font-heading text-base text-foreground truncate">
															{formData.executive?.mdName ||
																"MD. SAROWAR KHALED"}
														</h3>
														<p className="text-xs text-muted-foreground font-medium truncate">
															{formData.executive?.mdRole ||
																"Managing Director"}
														</p>
														<p className="text-[11px] text-muted-foreground/80 font-bangla truncate">
															{formData.executive?.mdNameBn || "মো: সরোয়ার খালেদ"}{" "}
															•{" "}
															{formData.executive?.mdRoleBn || "ব্যবস্থাপনা পরিচালক"}
														</p>
													</div>
												</div>

												{/* Quote Preview */}
												{formData.executive?.mdQuote && (
													<div className="p-3 rounded-xl bg-muted/40 border border-border/40 text-xs text-muted-foreground italic line-clamp-2">
														&ldquo;{formData.executive.mdQuote}&rdquo;
													</div>
												)}
											</div>

											{/* Action Buttons */}
											<div className="pt-3 border-t border-border/40 flex items-center gap-2">
												<Button
													type="button"
													onClick={() => setEditingExecutive("md")}
													className="flex-1 min-w-0 text-xs font-heading cursor-pointer"
												>
													Edit MD Profile & Photo
												</Button>
												{formData.executive?.mdImage && (
													<Button
														type="button"
														variant="outline"
														size="icon"
														onClick={() => handleExecutiveChange("mdImage", "")}
														className="h-9 w-9 shrink-0 text-destructive border-destructive/30 hover:bg-destructive/10 cursor-pointer"
														title="Delete MD Photo"
													>
														<Trash2 className="w-3.5 h-3.5" />
													</Button>
												)}
											</div>
										</div>
									</div>
								) : editingExecutive === "chairman" ? (
									/* Dedicated Full Editor for Chairman */
									<div className="space-y-6">
										<div className="flex items-center justify-between pb-4 border-b border-border/50">
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={() => setEditingExecutive(null)}
												className="text-xs font-heading inline-flex items-center gap-1.5 cursor-pointer"
											>
												<ArrowLeft className="w-4 h-4" />
												Back to Leadership Overview
											</Button>
											<span className="text-xs font-semibold text-primary font-heading uppercase tracking-wider">
												Editing Founder & Chairman
											</span>
										</div>

										{/* Top Row: Photo on Left, Basic Info on Right */}
										<div className="grid lg:grid-cols-12 gap-6 items-start">
											{/* Left Column: Photo Upload */}
											<div className="lg:col-span-5 space-y-4">
												<ImageUpload
													label="Chairman Official Portrait"
													description="Upload Chairman portrait directly to ImgBB CDN (recommended: square or portrait ratio)."
													value={formData.executive?.chairmanImage || ""}
													onChange={(url) =>
														handleExecutiveChange("chairmanImage", url)
													}
													aspectRatio="square"
												/>
											</div>

											{/* Right Column: Basic Information */}
											<div className="lg:col-span-7 space-y-4 p-5 rounded-2xl bg-card border border-border/70 shadow-2xs">
												<div className="border-b border-border/40 pb-2">
													<span className="text-xs font-semibold text-primary font-heading uppercase tracking-wider">
														Basic Information (মূল পরিচিতি)
													</span>
												</div>

												<div className="grid sm:grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															Chairman Name (EN)
														</Label>
														<Input
															value={formData.executive?.chairmanName || ""}
															onChange={(e) =>
																handleExecutiveChange(
																	"chairmanName",
																	e.target.value,
																)
															}
															placeholder="e.g. MD. AHMED KABIR"
															className="font-medium font-heading"
														/>
													</div>
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															চেয়ারম্যানের নাম (BN)
														</Label>
														<Input
															value={formData.executive?.chairmanNameBn || ""}
															onChange={(e) =>
																handleExecutiveChange(
																	"chairmanNameBn",
																	e.target.value,
																)
															}
															placeholder="যেমনঃ মো: আহমেদ কবীর"
															className="font-medium font-heading"
														/>
													</div>
												</div>

												<div className="grid sm:grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															Official Role / Title (EN)
														</Label>
														<Input
															value={formData.executive?.chairmanRole || ""}
															onChange={(e) =>
																handleExecutiveChange(
																	"chairmanRole",
																	e.target.value,
																)
															}
															placeholder="e.g. Founder & Chairman"
														/>
													</div>
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															পদবি (BN)
														</Label>
														<Input
															value={formData.executive?.chairmanRoleBn || ""}
															onChange={(e) =>
																handleExecutiveChange(
																	"chairmanRoleBn",
																	e.target.value,
																)
															}
															placeholder="যেমনঃ প্রতিষ্ঠাতা ও চেয়ারম্যান"
														/>
													</div>
												</div>

												<div className="grid sm:grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															Highlight Quote Badge (EN)
														</Label>
														<Input
															value={formData.executive?.chairmanQuote || ""}
															onChange={(e) =>
																handleExecutiveChange(
																	"chairmanQuote",
																	e.target.value,
																)
															}
															placeholder="e.g. Our mission is to create secure investment opportunities..."
														/>
													</div>
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															হাইলাইট উক্তি (BN)
														</Label>
														<Input
															value={formData.executive?.chairmanQuoteBn || ""}
															onChange={(e) =>
																handleExecutiveChange(
																	"chairmanQuoteBn",
																	e.target.value,
																)
															}
															placeholder="যেমনঃ আমাদের মূল লক্ষ্য প্রতিটি পরিবারের জন্য শতভাগ নিরাপদ..."
														/>
													</div>
												</div>
											</div>
										</div>

										{/* Bottom Row: Speech / Address in 2 Separate Full-Width Divs */}
										<div className="space-y-4 pt-4 border-t border-border/50">
											<div className="space-y-0.5">
												<h4 className="text-sm font-semibold font-heading text-foreground">
													Official Address & Full Speech (পূর্ণ বক্তব্য ও বার্তা)
												</h4>
												<p className="text-xs text-muted-foreground font-light">
													This message appears inside the glass block cards on
													the landing page.
												</p>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
												{/* Div 1: English Address */}
												<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-3 shadow-2xs">
													<div className="flex items-center justify-between border-b border-border/40 pb-2">
														<Label className="text-xs font-semibold font-heading uppercase text-foreground">
															Chairman's Full Message (English)
														</Label>
														<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
															EN
														</span>
													</div>
													<Textarea
														rows={6}
														value={formData.executive?.chairmanSpeech || ""}
														onChange={(e) =>
															handleExecutiveChange(
																"chairmanSpeech",
																e.target.value,
															)
														}
														placeholder="Enter Chairman's full official address in English..."
														className="resize-y text-xs leading-relaxed"
													/>
												</div>

												{/* Div 2: Bengali Address */}
												<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-3 shadow-2xs">
													<div className="flex items-center justify-between border-b border-border/40 pb-2">
														<Label className="text-xs font-semibold font-heading uppercase text-foreground">
															চেয়ারম্যানের পূর্ণ বক্তব্য (বাংলা)
														</Label>
														<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
															বাংলা (BN)
														</span>
													</div>
													<Textarea
														rows={6}
														value={formData.executive?.chairmanSpeechBn || ""}
														onChange={(e) =>
															handleExecutiveChange(
																"chairmanSpeechBn",
																e.target.value,
															)
														}
														placeholder="চেয়ারম্যানের সম্পূর্ণ বক্তব্য ও দিকনির্দেশনামূলক বার্তা বাংলায় লিখুন..."
														className="resize-y text-xs leading-relaxed"
													/>
												</div>
											</div>
										</div>

										<div className="pt-4 border-t border-border/40 flex justify-end">
											<Button
												type="button"
												onClick={() => setEditingExecutive(null)}
												variant="outline"
												className="text-xs font-heading cursor-pointer"
											>
												Done & Return to Overview
											</Button>
										</div>
									</div>
								) : (
									/* Dedicated Full Editor for Managing Director */
									<div className="space-y-6">
										<div className="flex items-center justify-between pb-4 border-b border-border/50">
											<Button
												type="button"
												variant="ghost"
												size="sm"
												onClick={() => setEditingExecutive(null)}
												className="text-xs font-heading inline-flex items-center gap-1.5 cursor-pointer"
											>
												<ArrowLeft className="w-4 h-4" />
												Back to Leadership Overview
											</Button>
											<span className="text-xs font-semibold text-accent font-heading uppercase tracking-wider">
												Editing Managing Director
											</span>
										</div>

										{/* Top Row: Photo on Left, Basic Info on Right */}
										<div className="grid lg:grid-cols-12 gap-6 items-start">
											{/* Left Column: Photo Upload */}
											<div className="lg:col-span-5 space-y-4">
												<ImageUpload
													label="Managing Director Official Portrait"
													description="Upload Managing Director portrait directly to ImgBB CDN (recommended: square or portrait ratio)."
													value={formData.executive?.mdImage || ""}
													onChange={(url) =>
														handleExecutiveChange("mdImage", url)
													}
													aspectRatio="square"
												/>
											</div>

											{/* Right Column: Basic Information */}
											<div className="lg:col-span-7 space-y-4 p-5 rounded-2xl bg-card border border-border/70 shadow-2xs">
												<div className="border-b border-border/40 pb-2">
													<span className="text-xs font-semibold text-accent font-heading uppercase tracking-wider">
														Basic Information (মূল পরিচিতি)
													</span>
												</div>

												<div className="grid sm:grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															Managing Director Name (EN)
														</Label>
														<Input
															value={formData.executive?.mdName || ""}
															onChange={(e) =>
																handleExecutiveChange("mdName", e.target.value)
															}
															placeholder="e.g. MD. SAROWAR KHALED"
															className="font-medium font-heading"
														/>
													</div>
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															ব্যবস্থাপনা পরিচালকের নাম (BN)
														</Label>
														<Input
															value={formData.executive?.mdNameBn || ""}
															onChange={(e) =>
																handleExecutiveChange(
																	"mdNameBn",
																	e.target.value,
																)
															}
															placeholder="যেমনঃ মো: সরোয়ার খালেদ"
															className="font-medium font-heading"
														/>
													</div>
												</div>

												<div className="grid sm:grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															Official Role / Title (EN)
														</Label>
														<Input
															value={formData.executive?.mdRole || ""}
															onChange={(e) =>
																handleExecutiveChange("mdRole", e.target.value)
															}
															placeholder="e.g. Managing Director"
														/>
													</div>
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															পদবি (BN)
														</Label>
														<Input
															value={formData.executive?.mdRoleBn || ""}
															onChange={(e) =>
																handleExecutiveChange(
																	"mdRoleBn",
																	e.target.value,
																)
															}
															placeholder="যেমনঃ ব্যবস্থাপনা পরিচালক"
														/>
													</div>
												</div>

												<div className="grid sm:grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															Highlight Quote Badge (EN)
														</Label>
														<Input
															value={formData.executive?.mdQuote || ""}
															onChange={(e) =>
																handleExecutiveChange("mdQuote", e.target.value)
															}
															placeholder="e.g. We build more than properties; we build trust..."
														/>
													</div>
													<div className="space-y-2">
														<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
															হাইলাইট উক্তি (BN)
														</Label>
														<Input
															value={formData.executive?.mdQuoteBn || ""}
															onChange={(e) =>
																handleExecutiveChange(
																	"mdQuoteBn",
																	e.target.value,
																)
															}
															placeholder="যেমনঃ আমরা শুধু জমি নয়, গড়ে তুলছি একটি আদর্শ ভবিষ্যৎ..."
														/>
													</div>
												</div>
											</div>
										</div>

										{/* Bottom Row: Speech / Address in 2 Separate Full-Width Divs */}
										<div className="space-y-4 pt-4 border-t border-border/50">
											<div className="space-y-0.5">
												<h4 className="text-sm font-semibold font-heading text-foreground">
													Official Address & Full Speech (পূর্ণ বক্তব্য ও বার্তা)
												</h4>
												<p className="text-xs text-muted-foreground font-light">
													This message appears inside the glass block cards on
													the landing page.
												</p>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
												{/* Div 1: English Address */}
												<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-3 shadow-2xs">
													<div className="flex items-center justify-between border-b border-border/40 pb-2">
														<Label className="text-xs font-semibold font-heading uppercase text-foreground">
															MD's Full Message (English)
														</Label>
														<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
															EN
														</span>
													</div>
													<Textarea
														rows={6}
														value={formData.executive?.mdSpeech || ""}
														onChange={(e) =>
															handleExecutiveChange("mdSpeech", e.target.value)
														}
														placeholder="Enter Managing Director's full official address in English..."
														className="resize-y text-xs leading-relaxed"
													/>
												</div>

												{/* Div 2: Bengali Address */}
												<div className="p-5 rounded-2xl bg-card border border-border/70 space-y-3 shadow-2xs">
													<div className="flex items-center justify-between border-b border-border/40 pb-2">
														<Label className="text-xs font-semibold font-heading uppercase text-foreground">
															ব্যবস্থাপনা পরিচালকের পূর্ণ বক্তব্য (বাংলা)
														</Label>
														<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
															বাংলা (BN)
														</span>
													</div>
													<Textarea
														rows={6}
														value={formData.executive?.mdSpeechBn || ""}
														onChange={(e) =>
															handleExecutiveChange(
																"mdSpeechBn",
																e.target.value,
															)
														}
														placeholder="ব্যবস্থাপনা পরিচালকের সম্পূর্ণ বক্তব্য ও বার্তা বাংলায় লিখুন..."
														className="resize-y text-xs leading-relaxed"
													/>
												</div>
											</div>
										</div>

										<div className="pt-4 border-t border-border/40 flex justify-end">
											<Button
												type="button"
												onClick={() => setEditingExecutive(null)}
												variant="outline"
												className="text-xs font-heading cursor-pointer"
											>
												Done & Return to Overview
											</Button>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					)}

					{/* 4. TRACK RECORD COUNTERS */}
					{activeTab === "trackrecord" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-base font-semibold font-heading">
											Track Record & Trust Counters
										</CardTitle>
										<CardDescription className="text-xs text-muted-foreground font-light">
											Numerical stats and milestones displayed in the track
											record section.
										</CardDescription>
									</div>
									<Button
										type="button"
										onClick={addTrustCounter}
										size="sm"
										variant="outline"
										className="gap-1 text-xs"
									>
										<Plus className="w-3.5 h-3.5" />
										Add Counter
									</Button>
								</div>
							</CardHeader>
							<CardContent className="p-6 space-y-6">
								{/* Section Titles */}
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading text-muted-foreground">
											Section Title (EN)
										</Label>
										<Input
											value={formData.trackRecordTitle || ""}
											onChange={(e) =>
												handleChange("trackRecordTitle", e.target.value)
											}
											placeholder="e.g. Proven Trust & Excellence in Numbers"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading text-muted-foreground">
											সেকশন শিরোনাম (BN)
										</Label>
										<Input
											value={formData.trackRecordTitleBn || ""}
											onChange={(e) =>
												handleChange("trackRecordTitleBn", e.target.value)
											}
											placeholder="যেমনঃ সংখ্যায় আমাদের নির্ভরযোগ্যতা ও সাফল্য"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading text-muted-foreground">
											Section Narrative (EN)
										</Label>
										<Input
											value={formData.trackRecordDesc || ""}
											onChange={(e) =>
												handleChange("trackRecordDesc", e.target.value)
											}
											placeholder="e.g. Over a decade of ethical land development..."
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading text-muted-foreground">
											সেকশন বিবরণ (BN)
										</Label>
										<Input
											value={formData.trackRecordDescBn || ""}
											onChange={(e) =>
												handleChange("trackRecordDescBn", e.target.value)
											}
											placeholder="যেমনঃ এক দশকেরও বেশি সময় ধরে সুনামের সাথে আবাসন উন্নয়ন..."
										/>
									</div>
								</div>

								{/* Stat Cards Grid */}
								<div className="space-y-3 pt-2">
									<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
										Live Counter Cards ({formData.trustCounters.length})
									</Label>
									<div className="grid sm:grid-cols-2 gap-4">
										{formData.trustCounters.map((counter, idx) => (
											<div
												key={idx}
												className="p-4 rounded-2xl bg-card border border-border/70 space-y-3 relative group"
											>
												<div className="flex items-center justify-between">
													<span className="text-[11px] font-medium font-mono text-primary">
														STAT #{idx + 1}
													</span>
													{formData.trustCounters.length > 1 && (
														<button
															type="button"
															onClick={() => removeTrustCounter(idx)}
															className="text-muted-foreground hover:text-destructive transition-colors p-1"
															title="Remove counter"
														>
															<Trash2 className="w-3.5 h-3.5" />
														</button>
													)}
												</div>

												<div className="grid grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] font-medium text-muted-foreground">
															Value (EN)
														</Label>
														<Input
															value={counter.value}
															onChange={(e) =>
																handleTrustCounterChange(
																	idx,
																	"value",
																	e.target.value,
																)
															}
															placeholder="150+ Acres"
															className="font-medium font-heading"
														/>
													</div>
													<div>
														<Label className="text-[11px] font-medium text-muted-foreground">
															মান (BN)
														</Label>
														<Input
															value={counter.valueBn || ""}
															onChange={(e) =>
																handleTrustCounterChange(
																	idx,
																	"valueBn",
																	e.target.value,
																)
															}
															placeholder="১৫০+ একর"
															className="font-medium font-heading"
														/>
													</div>
												</div>

												<div className="grid grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] font-medium text-muted-foreground">
															Label (EN)
														</Label>
														<Input
															value={counter.label}
															onChange={(e) =>
																handleTrustCounterChange(
																	idx,
																	"label",
																	e.target.value,
																)
															}
															placeholder="Planned Area"
														/>
													</div>
													<div>
														<Label className="text-[11px] font-medium text-muted-foreground">
															লেবেল (BN)
														</Label>
														<Input
															value={counter.labelBn || ""}
															onChange={(e) =>
																handleTrustCounterChange(
																	idx,
																	"labelBn",
																	e.target.value,
																)
															}
															placeholder="পরিকল্পিত এলাকা"
														/>
													</div>
												</div>

												<div className="grid grid-cols-2 gap-3">
													<div>
														<Label className="text-[11px] font-medium text-muted-foreground">
															Detail (EN)
														</Label>
														<Input
															value={counter.detail}
															onChange={(e) =>
																handleTrustCounterChange(
																	idx,
																	"detail",
																	e.target.value,
																)
															}
															placeholder="Masterplan Area"
														/>
													</div>
													<div>
														<Label className="text-[11px] font-medium text-muted-foreground">
															বিস্তারিত (BN)
														</Label>
														<Input
															value={counter.detailBn || ""}
															onChange={(e) =>
																handleTrustCounterChange(
																	idx,
																	"detailBn",
																	e.target.value,
																)
															}
															placeholder="মাস্টারপ্ল্যান এলাকা"
														/>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					{/* 5. REGULATORY ACCREDITATIONS */}
					{activeTab === "accreditations" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-base font-semibold font-heading">
											Regulatory Compliance & Accreditations
										</CardTitle>
										<CardDescription className="text-xs text-muted-foreground font-light">
											Badges and legal certifications displayed in both English
											and Bengali.
										</CardDescription>
									</div>
									<Button
										type="button"
										onClick={addAccreditation}
										size="sm"
										variant="outline"
										className="gap-1 text-xs"
									>
										<Plus className="w-3.5 h-3.5" />
										Add Badge
									</Button>
								</div>
							</CardHeader>
							<CardContent className="p-6 space-y-4">
								<div className="space-y-3">
									{formData.accreditations.map((badge, idx) => (
										<div
											key={idx}
											className="p-3 rounded-xl bg-card border border-border/70 space-y-2"
										>
											<div className="flex items-center justify-between">
												<span className="text-[11px] font-medium font-mono text-primary">
													BADGE #{idx + 1}
												</span>
												<button
													type="button"
													onClick={() => removeAccreditation(idx)}
													className="p-1 text-muted-foreground hover:text-destructive transition-colors"
													title="Remove badge"
												>
													<Trash2 className="w-3.5 h-3.5" />
												</button>
											</div>
											<div className="grid sm:grid-cols-2 gap-3">
												<Input
													value={badge}
													onChange={(e) =>
														handleAccreditationChange(idx, "en", e.target.value)
													}
													placeholder="English: e.g. RAJUK Masterplan Compliant"
												/>
												<Input
													value={
														formData.accreditationsBn?.[idx] !== undefined
															? formData.accreditationsBn[idx]
															: ""
													}
													onChange={(e) =>
														handleAccreditationChange(idx, "bn", e.target.value)
													}
													placeholder="বাংলাঃ যেমনঃ রাজউক মহাপরিকল্পনা অনুযায়ী"
												/>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}

					{/* 6. CALL TO ACTION BANNER */}
					{activeTab === "cta" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<CardTitle className="text-base font-semibold font-heading">
									Offline Membership & Site Visit Booking CTA
								</CardTitle>
								<CardDescription className="text-xs text-muted-foreground font-light">
									Configure the bottom CTA banner with transport scheduling and
									registration details in both languages.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-6 space-y-5">
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											CTA Headline (EN)
										</Label>
										<Input
											value={formData.ctaTitle || ""}
											onChange={(e) => handleChange("ctaTitle", e.target.value)}
											placeholder="e.g. Ready to Secure Your Plot in Silicon City?"
											className="font-medium font-heading"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											শিরোনাম (BN)
										</Label>
										<Input
											value={formData.ctaTitleBn || ""}
											onChange={(e) =>
												handleChange("ctaTitleBn", e.target.value)
											}
											placeholder="যেমনঃ সিলিকন সিটিতে প্লট বুকিং দিতে প্রস্তুত?"
											className="font-medium font-heading"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											Supporting Paragraph (EN)
										</Label>
										<Textarea
											rows={3}
											value={formData.ctaDesc || ""}
											onChange={(e) => handleChange("ctaDesc", e.target.value)}
											placeholder="English paragraph text..."
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											বিবরণ (BN)
										</Label>
										<Textarea
											rows={3}
											value={formData.ctaDescBn || ""}
											onChange={(e) =>
												handleChange("ctaDescBn", e.target.value)
											}
											placeholder="বাংলা বিবরণ..."
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-3 gap-4 pt-2 border-t border-border/40">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											Button Text (EN)
										</Label>
										<Input
											value={formData.ctaButtonText || ""}
											onChange={(e) =>
												handleChange("ctaButtonText", e.target.value)
											}
											placeholder="e.g. SCHEDULE SITE VISIT"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											বাটন টেক্সট (BN)
										</Label>
										<Input
											value={formData.ctaButtonTextBn || ""}
											onChange={(e) =>
												handleChange("ctaButtonTextBn", e.target.value)
											}
											placeholder="যেমনঃ সাইট ভিজিট বুক করুন"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											Destination Link
										</Label>
										<Input
											value={formData.ctaButtonLink || ""}
											onChange={(e) =>
												handleChange("ctaButtonLink", e.target.value)
											}
											placeholder="e.g. /contact?type=visit"
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			</SectionContainer>

			{/* Single Floating Bottom-Right Save Capsule */}
			<div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 p-1.5 rounded-full bg-card/90 backdrop-blur-xl border border-border/80 shadow-[0_12px_36px_rgba(0,0,0,0.25)]">
				<button
					onClick={handleSave}
					disabled={saving}
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
