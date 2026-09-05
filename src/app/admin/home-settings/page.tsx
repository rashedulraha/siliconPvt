"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Save,
	Loader2,
	CheckCircle2,
	Layout,
	Award,
	ShieldCheck,
	Link2,
	Plus,
	Trash2,
	Compass,
	Building2,
	Sparkles,
	Layers,
	Eye,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useHomeContent, HomeContentData } from "@/hooks/useHomeContent";
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

type TabId =
	| "hero"
	| "masterplan"
	| "showcase"
	| "trackrecord"
	| "accreditations"
	| "cta";

export default function HomeSettingsPage() {
	const { data: initialData, loading, updateContent } = useHomeContent();

	const [formData, setFormData] = useState<HomeContentData>(initialData);
	const [activeTab, setActiveTab] = useState<TabId>("hero");
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
		field: "value" | "label" | "detail",
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
					label: "Description Label",
					detail: "Verified Detail",
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
		}));
	};

	const handleAccreditationChange = (index: number, value: string) => {
		setFormData((prev) => {
			const updated = [...prev.accreditations];
			updated[index] = value;
			return { ...prev, accreditations: updated };
		});
	};

	const removeAccreditation = (index: number) => {
		setFormData((prev) => ({
			...prev,
			accreditations: prev.accreditations.filter((_, i) => i !== index),
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

	const tabs: { id: TabId; label: string; icon: any; desc: string }[] = [
		{
			id: "hero",
			label: "Hero & Carousel Text",
			icon: Layout,
			desc: "Main header overlay text, hero badges, and primary action links",
		},
		{
			id: "masterplan",
			label: "Master Plan & Amenities",
			icon: Compass,
			desc: "Township layout card, masterplan image, and lifestyle amenities",
		},
		{
			id: "showcase",
			label: "Silicon City Spotlight",
			icon: Building2,
			desc: "Flagship eco-township showcase title and location descriptions",
		},
		{
			id: "trackrecord",
			label: "Track Record Counters",
			icon: Award,
			desc: "Corporate milestones, acres planned, and trust counter numbers",
		},
		{
			id: "accreditations",
			label: "Regulatory Accreditations",
			icon: ShieldCheck,
			desc: "Certifications, RAJUK compliance, and legal verification badges",
		},
		{
			id: "cta",
			label: "Site Visit CTA Banner",
			icon: Link2,
			desc: "Bottom membership guide, transport booking, and contact action",
		},
	];

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 text-left">
			{/* ── TOP ACTION BAR (Non-sticky) ── */}
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
						<span className="text-xs font-semibold uppercase tracking-wider text-primary font-heading inline-flex items-center gap-1.5">
							<Sparkles className="w-3.5 h-3.5" /> LIVE DATABASE SYNC
						</span>
						<h1 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
							Home Page Section Manager
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Control all dynamic texts, counters, badges, and banners displayed
							on the public website Home landing page.
						</p>
					</div>

					{/* Notification Message */}
					{savedMessage && (
						<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold font-heading flex items-center gap-2 shadow-xs">
							<CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
							<span>{savedMessage}</span>
						</div>
					)}

					{/* ── SECTION NAVIGATION TABS ── */}
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
						{tabs.map((tab) => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`p-3.5 rounded-2xl text-left flex flex-col justify-between transition-all cursor-pointer border ${
										isActive
											? "bg-primary text-primary-foreground border-primary shadow-sm scale-[1.01]"
											: "bg-card hover:bg-muted/70 border-border/80 text-foreground hover:border-primary/30"
									}`}
								>
									<div
										className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2.5 ${
											isActive
												? "bg-white/20 text-white"
												: "bg-primary/10 text-primary"
										}`}
									>
										<Icon className="w-4 h-4" />
									</div>
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

					{/* ── ACTIVE TAB CONTENT PANELS ── */}

					{/* 1. HERO SECTION */}
					{activeTab === "hero" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<CardTitle className="text-base font-semibold font-heading flex items-center gap-2">
									<Layout className="w-4.5 h-4.5 text-primary" />
									Hero Carousel & Main Headline Overlay
								</CardTitle>
								<CardDescription className="text-xs text-muted-foreground font-light">
									Configure the primary title and subtitle that appear over the
									interactive 3D hero carousel and featured plot listings.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-6 space-y-5">
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											Hero Top Badge Tag
										</Label>
										<Input
											value={formData.heroBadge || ""}
											onChange={(e) =>
												handleChange("heroBadge", e.target.value)
											}
											placeholder="e.g. PLANNED ECO-TOWNSHIPS & RESIDENTIAL PLOTS"
										/>
									</div>

									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											Company / Subtitle Tag
										</Label>
										<Input
											value={formData.heroSubtitle || ""}
											onChange={(e) =>
												handleChange("heroSubtitle", e.target.value)
											}
											placeholder="e.g. Silicon Real Estate (Pvt.) Ltd."
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
										Hero Main Headline Title
									</Label>
									<Input
										value={formData.heroTitle || ""}
										onChange={(e) => handleChange("heroTitle", e.target.value)}
										placeholder="e.g. Silicon City — Master Planned Township"
										className="font-medium font-heading"
									/>
								</div>

								<div className="space-y-2">
									<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
										Hero Narrative Description
									</Label>
									<Textarea
										rows={3}
										value={formData.heroDesc || ""}
										onChange={(e) => handleChange("heroDesc", e.target.value)}
										placeholder="Enter hero paragraph text..."
									/>
								</div>

								<div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											CTA Button Text
										</Label>
										<Input
											value={formData.heroCtaText || ""}
											onChange={(e) =>
												handleChange("heroCtaText", e.target.value)
											}
											placeholder="e.g. EXPLORE PROJECTS"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											CTA Button Destination Link
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
							</CardContent>
						</Card>
					)}

					{/* 2. MASTER PLAN & AMENITIES */}
					{activeTab === "masterplan" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<CardTitle className="text-base font-semibold font-heading flex items-center gap-2">
									<Compass className="w-4.5 h-4.5 text-primary" />
									Master Plan & Lifestyle Amenities Section
								</CardTitle>
								<CardDescription className="text-xs text-muted-foreground font-light">
									Configure the two dual highlight cards that introduce the
									master layout and civic facilities.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-6 sm:p-8 space-y-6">
								{/* Left Card: Master Plan Layout */}
								<div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70">
									<div className="flex items-center gap-2 text-primary font-medium font-heading text-xs uppercase tracking-wider">
										<Layers className="w-4 h-4" /> Card 1: Master Plan Layout
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="text-xs font-semibold font-heading text-muted-foreground">
												Badge Tag
											</Label>
											<Input
												value={formData.masterPlanBadge || ""}
												onChange={(e) =>
													handleChange("masterPlanBadge", e.target.value)
												}
												placeholder="e.g. MASTER PLAN"
											/>
										</div>

										<div className="space-y-2">
											<Label className="text-xs font-semibold font-heading text-muted-foreground">
												Card Title
											</Label>
											<Input
												value={formData.masterPlanTitle || ""}
												onChange={(e) =>
													handleChange("masterPlanTitle", e.target.value)
												}
												placeholder="e.g. At a Glance: Township Layout"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading text-muted-foreground">
											Card Description
										</Label>
										<Textarea
											rows={2}
											value={formData.masterPlanDesc || ""}
											onChange={(e) =>
												handleChange("masterPlanDesc", e.target.value)
											}
											placeholder="Description of the 30ft/40ft wide avenues and eco-zoning..."
										/>
									</div>

									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading text-muted-foreground">
											Master Plan Image URL
										</Label>
										<Input
											value={formData.masterPlanImage || ""}
											onChange={(e) =>
												handleChange("masterPlanImage", e.target.value)
											}
											placeholder="https://images.unsplash.com/..."
										/>
									</div>
								</div>

								{/* Right Card: Lifestyle Amenities */}
								<div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-muted/20 border border-border/70">
									<div className="flex items-center gap-2 text-primary font-medium font-heading text-xs uppercase tracking-wider">
										<Layers className="w-4 h-4" /> Card 2: Lifestyle Amenities
									</div>

									<div className="grid sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label className="text-xs font-semibold font-heading text-muted-foreground">
												Badge Tag
											</Label>
											<Input
												value={formData.amenitiesBadge || ""}
												onChange={(e) =>
													handleChange("amenitiesBadge", e.target.value)
												}
												placeholder="e.g. LIFESTYLE AMENITIES"
											/>
										</div>

										<div className="space-y-2">
											<Label className="text-xs font-semibold font-heading text-muted-foreground">
												Card Title
											</Label>
											<Input
												value={formData.amenitiesTitle || ""}
												onChange={(e) =>
													handleChange("amenitiesTitle", e.target.value)
												}
												placeholder="e.g. All Modern Lifestyle Amenities"
											/>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					{/* 3. TOWNSHIP SHOWCASE SPOTLIGHT */}
					{activeTab === "showcase" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<CardTitle className="text-base font-semibold font-heading flex items-center gap-2">
									<Building2 className="w-4.5 h-4.5 text-primary" />
									Silicon City Spotlight Showcase
								</CardTitle>
								<CardDescription className="text-xs text-muted-foreground font-light">
									Spotlight details displayed under the main township banner.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-6 space-y-5">
								<div className="space-y-2">
									<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
										Section Tag Badge
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
										Showcase Section Headline
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
										Geographic & Connectivity Summary
									</Label>
									<Textarea
										rows={3}
										value={formData.showcaseDesc || ""}
										onChange={(e) =>
											handleChange("showcaseDesc", e.target.value)
										}
										placeholder="Located in Savar (Bara Badeshi Mouza), inside the proposed RAJUK extended master plan..."
									/>
								</div>
							</CardContent>
						</Card>
					)}

					{/* 4. TRACK RECORD COUNTERS */}
					{activeTab === "trackrecord" && (
						<Card className="border border-border/70 rounded-2xl shadow-xs overflow-hidden">
							<CardHeader className="bg-muted/20 border-b border-border/40 pb-4">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-base font-semibold font-heading flex items-center gap-2">
											<Award className="w-4.5 h-4.5 text-primary" />
											Our Track Record & Trust Counters
										</CardTitle>
										<CardDescription className="text-xs text-muted-foreground font-light">
											Numerical stats and milestones displayed inside the dark
											track record container.
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
								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading text-muted-foreground">
											Section Title
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
											Section Narrative
										</Label>
										<Input
											value={formData.trackRecordDesc || ""}
											onChange={(e) =>
												handleChange("trackRecordDesc", e.target.value)
											}
											placeholder="e.g. Over a decade of ethical land development..."
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
														STAT CARD #{idx + 1}
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

												<div className="space-y-2">
													<div>
														<Label className="text-[11px] font-medium text-muted-foreground">
															Highlight Value
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
															placeholder="e.g. 150+ Acres / 16–18 ft / 100%"
															className="font-medium font-heading text-base"
														/>
													</div>
													<div>
														<Label className="text-[11px] font-medium text-muted-foreground">
															Primary Label
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
															placeholder="e.g. Planned Township Area"
														/>
													</div>
													<div>
														<Label className="text-[11px] font-medium text-muted-foreground">
															Detail / Verification Badge
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
															placeholder="e.g. Total Masterplan Area"
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
										<CardTitle className="text-base font-semibold font-heading flex items-center gap-2">
											<ShieldCheck className="w-4.5 h-4.5 text-primary" />
											Regulatory Compliance & Accreditations
										</CardTitle>
										<CardDescription className="text-xs text-muted-foreground font-light">
											Badges and legal certifications displayed in the
											compliance strip on the Home landing page.
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
										<div key={idx} className="flex items-center gap-2.5">
											<div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-medium shrink-0">
												{idx + 1}
											</div>
											<Input
												value={badge}
												onChange={(e) =>
													handleAccreditationChange(idx, e.target.value)
												}
												placeholder="e.g. RAJUK Masterplan Compliant"
												className="flex-1"
											/>
											<button
												type="button"
												onClick={() => removeAccreditation(idx)}
												className="p-2 text-muted-foreground hover:text-destructive transition-colors shrink-0"
											>
												<Trash2 className="w-4 h-4" />
											</button>
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
								<CardTitle className="text-base font-semibold font-heading flex items-center gap-2">
									<Link2 className="w-4.5 h-4.5 text-primary" />
									Offline Membership & Site Visit Booking CTA
								</CardTitle>
								<CardDescription className="text-xs text-muted-foreground font-light">
									Configure the bottom high-converting CTA banner with transport
									scheduling and office registration details.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-6 space-y-5">
								<div className="space-y-2">
									<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
										CTA Main Headline
									</Label>
									<Input
										value={formData.ctaTitle || ""}
										onChange={(e) => handleChange("ctaTitle", e.target.value)}
										placeholder="e.g. Ready to Secure Your Plot in Silicon City?"
										className="font-medium font-heading text-base"
									/>
								</div>

								<div className="space-y-2">
									<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
										CTA Supporting Paragraph
									</Label>
									<Textarea
										rows={3}
										value={formData.ctaDesc || ""}
										onChange={(e) => handleChange("ctaDesc", e.target.value)}
										placeholder="Schedule a physical site visit with free transport from our Mohammadpur corporate office..."
									/>
								</div>

								<div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border/40">
									<div className="space-y-2">
										<Label className="text-xs font-semibold font-heading uppercase text-muted-foreground">
											CTA Action Button Label
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
											CTA Action Target Link
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

			{/* ── FLOATING BOTTOM-RIGHT SAVE CAPSULE ── */}
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
