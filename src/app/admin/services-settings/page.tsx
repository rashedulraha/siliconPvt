"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Plus,
	Edit3,
	Trash2,
	Loader2,
	CheckCircle2,
	X,
	Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useAdminEditor } from "@/context/AdminEditorContext";
import { useServices, ServiceItem } from "@/hooks/useServices";

const emptyForm: Omit<ServiceItem, "id"> = {
	num: "",
	title: "",
	titleBn: "",
	tag: "",
	tagBn: "",
	description: "",
	descriptionBn: "",
	benefits: [""],
	benefitsBn: [""],
	pricing: "",
	imageUrl: "",
	order: 0,
	active: true,
};

export default function ServicesSettingsPage() {
	const { isEditorUnlocked, unlockEditorMode } = useAdminEditor();
	const { services, loading, createService, updateService, deleteService } =
		useServices();

	const [modalOpen, setModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
	const [formData, setFormData] = useState<Omit<ServiceItem, "id">>(emptyForm);
	const [saving, setSaving] = useState(false);
	const [savedMessage, setSavedMessage] = useState("");
	const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

	const openCreateModal = () => {
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setEditingItem(null);
		setFormData({
			...emptyForm,
			num: `0${services.length + 1}`,
			order: services.length + 1,
		});
		setModalOpen(true);
	};

	const openEditModal = (item: ServiceItem) => {
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setEditingItem(item);
		setFormData({
			num: item.num || "",
			title: item.title,
			titleBn: item.titleBn || "",
			tag: item.tag,
			tagBn: item.tagBn || "",
			description: item.description,
			descriptionBn: item.descriptionBn || "",
			benefits: item.benefits.length > 0 ? item.benefits : [""],
			benefitsBn:
				item.benefitsBn && item.benefitsBn.length > 0 ? item.benefitsBn : [""],
			pricing: item.pricing || "",
			imageUrl: item.imageUrl || "",
			order: item.order,
			active: item.active,
		});
		setModalOpen(true);
	};

	const handleBenefitChange = (index: number, value: string) => {
		const updated = [...formData.benefits];
		updated[index] = value;
		setFormData((prev) => ({ ...prev, benefits: updated }));
	};

	const handleBenefitBnChange = (index: number, value: string) => {
		const updated = [...(formData.benefitsBn || formData.benefits)];
		updated[index] = value;
		setFormData((prev) => ({ ...prev, benefitsBn: updated }));
	};

	const addBenefit = () => {
		setFormData((prev) => ({
			...prev,
			benefits: [...prev.benefits, ""],
			benefitsBn: [...(prev.benefitsBn || []), ""],
		}));
	};

	const removeBenefit = (index: number) => {
		setFormData((prev) => ({
			...prev,
			benefits: prev.benefits.filter((_, i) => i !== index),
			benefitsBn: (prev.benefitsBn || []).filter((_, i) => i !== index),
		}));
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSaving(true);
		try {
			const cleanedBenefits = formData.benefits.filter((b) => b.trim() !== "");
			const cleanedBenefitsBn = (formData.benefitsBn || []).filter(
				(b) => b.trim() !== "",
			);
			const payload = {
				...formData,
				benefits: cleanedBenefits,
				benefitsBn: cleanedBenefitsBn,
			};

			if (editingItem) {
				await updateService(editingItem.id, payload);
				setSavedMessage("Service updated successfully!");
			} else {
				await createService(payload);
				setSavedMessage("New service created successfully!");
			}

			setModalOpen(false);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (e) {
			console.error("Failed to save service", e);
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSaving(true);
		try {
			await deleteService(id);
			setSavedMessage("Service deleted successfully!");
			setDeleteConfirmId(null);
			setTimeout(() => setSavedMessage(""), 3500);
		} catch (e) {
			console.error("Failed to delete service", e);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 text-left">
			{/* Top Header */}
			<div className="border-b border-border/50 py-3 mb-6">
				<SectionContainer>
					<div className="flex items-center justify-between">
						<Link
							href="/admin"
							className="text-xs font-medium font-heading text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to Admin Panel
						</Link>
						<Link
							href="/services"
							target="_blank"
							className="px-3.5 h-8 rounded-full border border-border/80 text-foreground hover:bg-muted text-xs font-semibold font-heading inline-flex items-center gap-1.5 transition-all shadow-2xs"
						>
							<Eye className="w-3.5 h-3.5 text-muted-foreground" />
							<span>Live Services Page</span>
						</Link>
					</div>
				</SectionContainer>
			</div>

			<SectionContainer className="py-10">
				<div className="max-w-5xl mx-auto space-y-6">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<div className="space-y-1 text-left">
							<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
								SERVICE PORTFOLIO CONTROL
							</span>
							<h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
								Manage Services & Solutions
							</h1>
							<p className="text-xs sm:text-sm text-muted-foreground font-light">
								Configure service offerings, badges, descriptions, and
								highlights in both English and Bengali.
							</p>
						</div>

						<button
							onClick={openCreateModal}
							className="h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-medium font-heading inline-flex items-center gap-2 shadow-md shadow-primary/20 transition-all cursor-pointer shrink-0"
						>
							<Plus className="w-4 h-4" />
							<span>Add New Service</span>
						</button>
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
							<span>Loading services from database...</span>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							{services.map((item) => (
								<div
									key={item.id}
									className="p-6 rounded-3xl bg-card border border-border/80 flex flex-col justify-between space-y-5"
								>
									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<span className="text-xs font-mono font-medium text-primary">
												#{item.num}
											</span>
											<span className="px-3 py-0.5 rounded-full text-[10px] font-semibold font-heading uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
												{item.tag}
											</span>
										</div>

										<div>
											<h3 className="text-base font-semibold font-heading text-foreground">
												{item.title}
											</h3>
											{item.titleBn && (
												<p className="text-xs text-primary/80 font-medium">
													{item.titleBn}
												</p>
											)}
										</div>

										<p className="text-xs font-light text-muted-foreground line-clamp-3">
											{item.description}
										</p>

										{item.benefits && item.benefits.length > 0 && (
											<div className="space-y-1.5 pt-2 border-t border-border/40">
												<span className="text-[10px] font-semibold uppercase text-muted-foreground">
													Highlights ({item.benefits.length})
												</span>
												<ul className="text-xs font-light text-muted-foreground space-y-1">
													{item.benefits.slice(0, 3).map((b, i) => (
														<li
															key={i}
															className="line-clamp-1 flex items-center gap-1.5"
														>
															<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
															<span>{b}</span>
														</li>
													))}
												</ul>
											</div>
										)}
									</div>

									<div className="flex items-center justify-between pt-4 border-t border-border/50">
										<span
											className={`text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${
												item.active
													? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
													: "bg-muted text-muted-foreground border-border/60"
											}`}
										>
											{item.active ? "LIVE • ACTIVE" : "DRAFT • HIDDEN"}
										</span>

										<div className="flex items-center gap-2">
											<button
												onClick={() => openEditModal(item)}
												className="px-3 h-8 rounded-xl bg-muted/60 hover:bg-muted text-foreground text-xs font-semibold font-heading inline-flex items-center gap-1.5 cursor-pointer transition-all border border-border/60"
											>
												<Edit3 className="w-3.5 h-3.5 text-primary" /> Edit
											</button>
											<button
												onClick={() => setDeleteConfirmId(item.id)}
												className="px-3 h-8 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-semibold font-heading inline-flex items-center gap-1.5 cursor-pointer transition-all border border-destructive/20"
											>
												<Trash2 className="w-3.5 h-3.5" /> Delete
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</SectionContainer>

			{/* Create / Edit Modal */}
			<AnimatePresence>
				{modalOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
						onClick={() => setModalOpen(false)}
					>
						<motion.div
							initial={{ scale: 0.96, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.96, opacity: 0 }}
							className="bg-card border border-border/80 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="sticky top-0 bg-card border-b border-border/60 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
								<div>
									<h3 className="text-base font-semibold font-heading text-foreground">
										{editingItem
											? "Edit Service Offering"
											: "Add New Service Offering"}
									</h3>
									<p className="text-xs text-muted-foreground font-light">
										{editingItem
											? `Editing: ${editingItem.title}`
											: "Configure service details and benefits in both languages"}
									</p>
								</div>
								<button
									onClick={() => setModalOpen(false)}
									className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground transition-all cursor-pointer"
								>
									<X className="w-4 h-4" />
								</button>
							</div>

							<form onSubmit={handleSave} className="p-6 space-y-5">
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground">
											Number Code
										</label>
										<input
											type="text"
											value={formData.num || ""}
											onChange={(e) =>
												setFormData((p) => ({ ...p, num: e.target.value }))
											}
											placeholder="e.g. 01"
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground">
											Service Tag (EN) *
										</label>
										<input
											type="text"
											required
											value={formData.tag}
											onChange={(e) =>
												setFormData((p) => ({ ...p, tag: e.target.value }))
											}
											placeholder="e.g. Primary Plot Allotments"
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground">
											সার্ভিস ট্যাগ (BN)
										</label>
										<input
											type="text"
											value={formData.tagBn || ""}
											onChange={(e) =>
												setFormData((p) => ({ ...p, tagBn: e.target.value }))
											}
											placeholder="যেমনঃ মূল প্লট বরাদ্দ"
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground">
											Service Title (EN) *
										</label>
										<input
											type="text"
											required
											value={formData.title}
											onChange={(e) =>
												setFormData((p) => ({ ...p, title: e.target.value }))
											}
											placeholder="e.g. Residential Plot Sales"
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground">
											সার্ভিস শিরোনাম (BN)
										</label>
										<input
											type="text"
											value={formData.titleBn || ""}
											onChange={(e) =>
												setFormData((p) => ({ ...p, titleBn: e.target.value }))
											}
											placeholder="যেমনঃ আবাসিক প্লট বরাদ্দ"
											className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground">
											Description (EN) *
										</label>
										<textarea
											rows={4}
											required
											value={formData.description}
											onChange={(e) =>
												setFormData((p) => ({
													...p,
													description: e.target.value,
												}))
											}
											placeholder="Detailed explanation of what this service covers in English..."
											className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary font-light"
										/>
									</div>

									<div className="space-y-1.5">
										<label className="text-xs font-semibold font-heading text-foreground">
											বিবরণ (BN)
										</label>
										<textarea
											rows={4}
											value={formData.descriptionBn || ""}
											onChange={(e) =>
												setFormData((p) => ({
													...p,
													descriptionBn: e.target.value,
												}))
											}
											placeholder="বাংলায় সার্ভিসের বিস্তারিত বিবরণ..."
											className="w-full p-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary font-light"
										/>
									</div>
								</div>

								{/* Highlights & Benefits */}
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<label className="text-xs font-semibold font-heading text-foreground">
											Key Highlights & Benefits
										</label>
										<button
											type="button"
											onClick={addBenefit}
											className="text-xs text-primary font-medium hover:underline cursor-pointer"
										>
											+ Add Highlight
										</button>
									</div>

									<div className="space-y-2">
										{formData.benefits.map((benefit, idx) => (
											<div key={idx} className="flex gap-2 items-center">
												<input
													type="text"
													value={benefit}
													onChange={(e) =>
														handleBenefitChange(idx, e.target.value)
													}
													placeholder={`Highlight (EN) #${idx + 1}`}
													className="flex-1 h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
												/>
												<input
													type="text"
													value={formData.benefitsBn?.[idx] || ""}
													onChange={(e) =>
														handleBenefitBnChange(idx, e.target.value)
													}
													placeholder={`হাইলাইট (BN) #${idx + 1}`}
													className="flex-1 h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
												/>
												{formData.benefits.length > 1 && (
													<button
														type="button"
														onClick={() => removeBenefit(idx)}
														className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center cursor-pointer hover:bg-destructive/20 shrink-0"
													>
														<X className="w-3.5 h-3.5" />
													</button>
												)}
											</div>
										))}
									</div>
								</div>

								<div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
									<button
										type="button"
										onClick={() => setModalOpen(false)}
										className="px-4 py-2.5 rounded-xl bg-muted text-foreground text-xs font-semibold font-heading cursor-pointer hover:bg-muted/80"
									>
										Cancel
									</button>
									<button
										type="submit"
										disabled={saving}
										className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-medium font-heading uppercase tracking-wider cursor-pointer hover:bg-primary/90 inline-flex items-center gap-2 disabled:opacity-50 shadow-md shadow-primary/20"
									>
										{saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
										{editingItem ? "Update Service" : "Create Service"}
									</button>
								</div>
							</form>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Delete Confirmation Modal */}
			<ConfirmDialog
				open={Boolean(deleteConfirmId)}
				onOpenChange={(open) => !open && setDeleteConfirmId(null)}
				title="Delete Service Offering"
				description="Are you sure you want to delete this service entry from the public website? This action cannot be undone."
				confirmText="Yes, Delete"
				onConfirm={() => deleteConfirmId && handleDelete(deleteConfirmId)}
			/>
		</div>
	);
}
