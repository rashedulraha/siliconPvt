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
				</div>
			</SectionContainer>
		</div>
	);
}
