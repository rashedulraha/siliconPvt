"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Save,
	Lock,
	Loader2,
	CheckCircle2,
	Heading,
	FileText,
	DollarSign,
	Plus,
	Trash2,
	Phone,
	FileCode,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useAdminEditor } from "@/context/AdminEditorContext";
import {
	useMembershipContent,
	MembershipData,
	PathwayItem,
} from "@/hooks/useMembershipContent";

export default function MembershipSettingsPage() {
	const { isEditorUnlocked, unlockEditorMode } = useAdminEditor();
	const { membershipData, loading, updateMembershipContent } =
		useMembershipContent();

	const [formData, setFormData] = useState<MembershipData>(membershipData);
	const [saving, setSaving] = useState(false);
	const [savedMessage, setSavedMessage] = useState("");

	useEffect(() => {
		if (membershipData) {
			setFormData(membershipData);
		}
	}, [membershipData]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePathwayChange = (
		index: number,
		field: keyof PathwayItem,
		value: string,
	) => {
		const updatedPathways = [...(formData.pathways || [])];
		updatedPathways[index] = {
			...updatedPathways[index],
			[field]: value,
		};
		setFormData((prev) => ({ ...prev, pathways: updatedPathways }));
	};

	const addPathway = () => {
		const newPathway: PathwayItem = {
			num: `0${(formData.pathways?.length || 0) + 1}`,
			title: "New Membership Category",
			desc: "Description for this pathway...",
			tag: "Category Tag",
		};
		setFormData((prev) => ({
			...prev,
			pathways: [...(prev.pathways || []), newPathway],
		}));
	};

	const removePathway = (index: number) => {
		const updatedPathways = formData.pathways.filter((_, i) => i !== index);
		setFormData((prev) => ({ ...prev, pathways: updatedPathways }));
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSaving(true);
		try {
			await updateMembershipContent(formData);
			setSavedMessage(
				"Membership guidelines & content saved successfully to PostgreSQL DB!",
			);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (e) {
			console.error("Failed to update membership content", e);
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
							onClick={handleSave}
							disabled={saving}
							className="px-4 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-medium font-heading inline-flex items-center gap-1.5 transition-all shadow-none hover:bg-primary/90 cursor-pointer disabled:opacity-50"
						>
							{saving ? (
								<Loader2 className="w-3.5 h-3.5 animate-spin" />
							) : !isEditorUnlocked ? (
								<Lock className="w-3.5 h-3.5" />
							) : (
								<Save className="w-3.5 h-3.5" />
							)}
							{isEditorUnlocked ? "Save Membership Settings" : "Unlock to Save"}
						</button>
					</div>
				</SectionContainer>
			</div>

			<SectionContainer className="py-10">
				<div className="max-w-4xl mx-auto space-y-8">
					{/* Lock Notice Banner */}
					{!isEditorUnlocked && (
						<div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium flex items-center justify-between gap-4">
							<div className="flex items-center gap-2">
								<Lock className="w-4 h-4 shrink-0" />
								<span>
									<strong>Read-Only Mode Active:</strong> Membership settings are in view-only mode until Editor Mode is unlocked.
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

					<div className="space-y-1 text-left">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							DYNAMIC MEMBERSHIP CONTROL
						</span>
						<h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
							Membership Page Content & Tier Settings
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Edit hero titles, application fee highlights, soil development specs, downloadable PDF forms, and membership category pathways.
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
							<span>Loading membership content from database...</span>
						</div>
					) : (
						<form
							onSubmit={handleSave}
							className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-none space-y-8"
						>
							{/* Section 1: Hero & PDF Form URL */}
							<div className="space-y-4 border-b border-border/60 pb-6">
								<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider flex items-center gap-2">
									<Heading className="w-4 h-4 text-primary" /> 1. Hero Section & Form Download
								</h3>

								<div className="space-y-3">
									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground">
											Membership Hero Page Title
										</label>
										<input
											type="text"
											name="heroTitle"
											disabled={!isEditorUnlocked}
											value={formData.heroTitle || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>

									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground">
											Hero Description
										</label>
										<textarea
											rows={3}
											name="heroDescription"
											disabled={!isEditorUnlocked}
											value={formData.heroDescription || ""}
											onChange={handleChange}
											className="w-full p-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>

									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground flex items-center gap-1.5">
											<FileCode className="w-3.5 h-3.5 text-primary" /> Downloadable Form PDF File Path / URL
										</label>
										<input
											type="text"
											name="formPdfUrl"
											disabled={!isEditorUnlocked}
											value={formData.formPdfUrl || ""}
											onChange={handleChange}
											placeholder="/assets/silicon-membership-form.pdf"
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-mono text-muted-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>
							</div>

							{/* Section 2: Fee Highlights & Terms Specs */}
							<div className="space-y-4 border-b border-border/60 pb-6">
								<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider flex items-center gap-2">
									<DollarSign className="w-4 h-4 text-primary" /> 2. Key Specs & Fee Highlights
								</h3>

								<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground">
											Application Fee
										</label>
										<input
											type="text"
											name="applicationFee"
											disabled={!isEditorUnlocked}
											value={formData.applicationFee || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>

									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground">
											Infrastructure Share (%)
										</label>
										<input
											type="text"
											name="landSharePercentage"
											disabled={!isEditorUnlocked}
											value={formData.landSharePercentage || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>

									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground">
											Soil Elevation Height
										</label>
										<input
											type="text"
											name="soilElevationHeight"
											disabled={!isEditorUnlocked}
											value={formData.soilElevationHeight || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>
							</div>

							{/* Section 3: Pathways Categories */}
							<div className="space-y-4 border-b border-border/60 pb-6">
								<div className="flex items-center justify-between">
									<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider flex items-center gap-2">
										<FileText className="w-4 h-4 text-primary" /> 3. Membership Categories / Pathways
									</h3>
									{isEditorUnlocked && (
										<button
											type="button"
											onClick={addPathway}
											className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-semibold hover:bg-primary/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
										>
											<Plus className="w-3.5 h-3.5" /> Add Category
										</button>
									)}
								</div>

								<div className="space-y-4">
									{formData.pathways.map((item, idx) => (
										<div
											key={idx}
											className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-3 text-left relative"
										>
											<div className="flex items-center justify-between gap-2">
												<div className="flex items-center gap-2">
													<span className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
														Category #{idx + 1}
													</span>
												</div>
												{isEditorUnlocked && formData.pathways.length > 1 && (
													<button
														type="button"
														onClick={() => removePathway(idx)}
														className="text-destructive hover:text-destructive/80 p-1 cursor-pointer"
														title="Remove pathway"
													>
														<Trash2 className="w-4 h-4" />
													</button>
												)}
											</div>

											<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
												<div className="space-y-1">
													<label className="text-[11px] font-medium font-heading text-muted-foreground">
														Category Title
													</label>
													<input
														type="text"
														disabled={!isEditorUnlocked}
														value={item.title}
														onChange={(e) =>
															handlePathwayChange(idx, "title", e.target.value)
														}
														className="w-full h-10 px-3 rounded-lg bg-background border border-border/60 text-xs font-medium text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
													/>
												</div>

												<div className="space-y-1">
													<label className="text-[11px] font-medium font-heading text-muted-foreground">
														Tag / Badge
													</label>
													<input
														type="text"
														disabled={!isEditorUnlocked}
														value={item.tag}
														onChange={(e) =>
															handlePathwayChange(idx, "tag", e.target.value)
														}
														className="w-full h-10 px-3 rounded-lg bg-background border border-border/60 text-xs font-medium text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
													/>
												</div>
											</div>

											<div className="space-y-1">
												<label className="text-[11px] font-medium font-heading text-muted-foreground">
													Description
												</label>
												<textarea
													rows={2}
													disabled={!isEditorUnlocked}
													value={item.desc}
													onChange={(e) =>
														handlePathwayChange(idx, "desc", e.target.value)
													}
													className="w-full p-2.5 rounded-lg bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
												/>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Section 4: Offline Notice & Hotline */}
							<div className="space-y-4">
								<h3 className="text-sm font-semibold font-heading text-foreground uppercase tracking-wider flex items-center gap-2">
									<Phone className="w-4 h-4 text-primary" /> 4. Bottom Notice & Support Hotlines
								</h3>

								<div className="space-y-3">
									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground">
											Offline Process Notice Text
										</label>
										<textarea
											rows={3}
											name="offlineNoticeText"
											disabled={!isEditorUnlocked}
											value={formData.offlineNoticeText || ""}
											onChange={handleChange}
											className="w-full p-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>

									<div className="space-y-1.5 text-left">
										<label className="text-xs font-medium font-heading text-foreground">
											Support Hotlines Display Text
										</label>
										<input
											type="text"
											name="contactHotline"
											disabled={!isEditorUnlocked}
											value={formData.contactHotline || ""}
											onChange={handleChange}
											className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
										/>
									</div>
								</div>
							</div>

							<button
								type="submit"
								disabled={saving}
								className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-all cursor-pointer shadow-md"
							>
								{saving ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Save className="w-4 h-4" />
								)}
								SAVE MEMBERSHIP SETTINGS TO DATABASE
							</button>
						</form>
					)}
				</div>
			</SectionContainer>
		</div>
	);
}
