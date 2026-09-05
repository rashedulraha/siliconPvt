"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
	Plus,
	Edit,
	Trash2,
	Search,
	Filter,
	Building2,
	CheckCircle2,
	Clock,
	Tag,
	MapPin,
	Sparkles,
	Layers,
	Eye,
	Copy,
	Flame,
	ArrowUpRight,
	ExternalLink,
	Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PlotEditor } from "@/components/admin/PlotEditor";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useProperties } from "@/hooks/useProperties";
import { formatCurrency } from "@/lib/utils";
import type { Property } from "@/types";

export default function InventoryPage() {
	const {
		properties,
		stats,
		addProperty,
		updateProperty,
		patchProperty,
		deleteProperty,
	} = useProperties();

	// View mode: 'list' | 'create' | 'edit' (In-page navigation without separate route)
	const [viewMode, setViewMode] = useState<"list" | "create" | "edit">("list");
	const [editingProperty, setEditingProperty] = useState<Property | null>(null);
	const [deleteId, setDeleteId] = useState<string | null>(null);

	// Filters
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState<"all" | "sale" | "rent">("all");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [categoryFilter, setCategoryFilter] = useState<string>("all");

	const filtered = useMemo(() => {
		let result = [...properties];
		if (search) {
			const q = search.toLowerCase();
			result = result.filter(
				(p) =>
					p.title.toLowerCase().includes(q) ||
					p.location.toLowerCase().includes(q) ||
					(p.block && p.block.toLowerCase().includes(q)) ||
					(p.description && p.description.toLowerCase().includes(q)),
			);
		}
		if (typeFilter !== "all")
			result = result.filter((p) => p.type === typeFilter);
		if (statusFilter !== "all")
			result = result.filter((p) => p.status === statusFilter);
		if (categoryFilter !== "all")
			result = result.filter((p) => p.category === categoryFilter);
		return result;
	}, [properties, search, typeFilter, statusFilter, categoryFilter]);

	// ── Full Save Handler ──
	const handleSave = async (data: any) => {
		try {
			if (editingProperty) {
				await updateProperty(editingProperty.id, data);
				toast.success("Plot details updated successfully.");
			} else {
				await addProperty(data);
				toast.success("New plot added to inventory successfully.");
			}
			setViewMode("list");
			setEditingProperty(null);
		} catch (error) {
			console.error("Failed to save property:", error);
			toast.error("Failed to save plot details.");
		}
	};

	// ── Open In-Page Editor ──
	const openEdit = (p: Property) => {
		setEditingProperty(p);
		setViewMode("edit");
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const openCreate = () => {
		setEditingProperty(null);
		setViewMode("create");
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleCancel = () => {
		setViewMode("list");
		setEditingProperty(null);
	};

	// ── Quick Patch Operations ──
	const handlePatchStatus = async (id: string, newStatus: Property["status"]) => {
		try {
			await patchProperty(id, { status: newStatus });
			toast.success(`Plot status updated to ${newStatus}.`);
		} catch {
			toast.error("Failed to update status.");
		}
	};

	const handleToggleFeatured = async (
		id: string,
		currentFeatured: boolean | undefined,
	) => {
		try {
			const nextVal = !currentFeatured;
			await patchProperty(id, { featured: nextVal });
			toast.success(
				nextVal ? "Plot marked as Featured." : "Plot removed from Featured.",
			);
		} catch {
			toast.error("Failed to update featured flag.");
		}
	};

	const handleDuplicate = async (p: Property) => {
		try {
			const duplicateData = {
				...p,
				title: `${p.title} (Copy)`,
				status: "available" as Property["status"],
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			await addProperty(duplicateData);
			toast.success("Plot listing duplicated successfully.");
		} catch {
			toast.error("Failed to duplicate plot.");
		}
	};

	const handleDeleteClick = (id: string) => {
		setDeleteId(id);
	};

	const executeDelete = async () => {
		if (deleteId) {
			await deleteProperty(deleteId);
			toast.success("Plot removed from inventory.");
			setDeleteId(null);
			if (editingProperty?.id === deleteId) {
				setViewMode("list");
				setEditingProperty(null);
			}
		}
	};

	// ── IF EDIT OR CREATE MODE: RENDER IN-PAGE DEDICATED FULL EDITOR VIEW ──
	if (viewMode === "create" || viewMode === "edit") {
		return (
			<PlotEditor
				initial={editingProperty}
				onSave={handleSave}
				onCancel={handleCancel}
				onDelete={handleDeleteClick}
			/>
		);
	}

	// ── KPI Stats Cards ──
	const kpiCards = [
		{
			label: "Total Plot Listings",
			value: stats.total,
			icon: Building2,
			color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
		},
		{
			label: "Available for Booking",
			value: stats.available,
			icon: CheckCircle2,
			color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
			pulse: true,
		},
		{
			label: "Booked / In Process",
			value: stats.total - stats.available,
			icon: Clock,
			color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
		},
		{
			label: "Outright Sale / Lease",
			value: stats.forSale || stats.total,
			icon: Tag,
			color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
		},
	];

	return (
		<div className="space-y-6 max-w-7xl mx-auto text-left font-roboto pb-16 animate-in fade-in-50 duration-200">
			{/* ── 1. HEADER SECTION ── */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div className="space-y-1">
					<span className="text-xs font-semibold uppercase tracking-wider text-primary font-heading inline-flex items-center gap-1.5">
						<Sparkles className="w-3.5 h-3.5" /> SILICON CITY INVENTORY DESK
					</span>
					<h1 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
						Plot & Property Inventory Management
					</h1>
					<p className="text-xs sm:text-sm text-muted-foreground font-light">
						Full CRUD control: Add, Edit, Patch status, and Delete plots in
						Silicon City database.
					</p>
				</div>
				<Button
					onClick={openCreate}
					className="h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium font-heading text-xs inline-flex items-center gap-2 shadow-md shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
				>
					<Plus className="h-4 w-4" />
					<span>Add New Plot</span>
				</Button>
			</div>

			{/* ── 2. KPIS BAR ── */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
				{kpiCards.map((kpi) => {
					const Icon = kpi.icon;
					return (
						<div
							key={kpi.label}
							className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all space-y-2 group"
						>
							<div className="flex items-center justify-between">
								<span className="text-[11px] font-medium text-muted-foreground uppercase font-heading tracking-wider">
									{kpi.label}
								</span>
								<div
									className={`w-7 h-7 rounded-lg flex items-center justify-center border ${kpi.color}`}
								>
									<Icon className="w-3.5 h-3.5" />
								</div>
							</div>
							<div className="flex items-baseline gap-2">
								<p className="text-2xl font-semibold font-heading text-foreground">
									{kpi.value}
								</p>
								{kpi.pulse && (
									<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
								)}
							</div>
						</div>
					);
				})}
			</div>

			{/* ── 3. SEARCH & FILTERS BAR ── */}
			<div className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
					<div className="relative lg:col-span-2">
						<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search by plot title, block, location, or features..."
							className="pl-10 h-10 rounded-xl bg-background border-border/70 text-xs sm:text-sm font-light"
						/>
					</div>

					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="h-10 rounded-xl bg-background border-border/70 text-xs font-semibold font-heading">
							<SelectValue placeholder="All Statuses" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Statuses ({stats.total})</SelectItem>
							<SelectItem value="available">
								Available ({stats.available})
							</SelectItem>
							<SelectItem value="pending">
								Booked / In Process ({stats.total - stats.available})
							</SelectItem>
							<SelectItem value="sold">Sold Out</SelectItem>
						</SelectContent>
					</Select>

					<Select
						value={typeFilter}
						onValueChange={(v: "all" | "sale" | "rent") => setTypeFilter(v)}
					>
						<SelectTrigger className="h-10 rounded-xl bg-background border-border/70 text-xs font-semibold font-heading">
							<SelectValue placeholder="All Types" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Payment Types</SelectItem>
							<SelectItem value="sale">Outright Sale</SelectItem>
							<SelectItem value="rent">Installment Facility</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* ── 4. INVENTORY DATA TABLE ── */}
			<div className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-xs">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader className="bg-muted/40 border-b border-border/60">
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-12 font-heading font-medium text-xs text-muted-foreground uppercase pl-5">
									#
								</TableHead>
								<TableHead className="font-heading font-medium text-xs text-muted-foreground uppercase">
									Plot Details & Block
								</TableHead>
								<TableHead className="font-heading font-medium text-xs text-muted-foreground uppercase hidden md:table-cell">
									Size & Area
								</TableHead>
								<TableHead className="font-heading font-medium text-xs text-muted-foreground uppercase hidden lg:table-cell">
									Road & Orientation
								</TableHead>
								<TableHead className="font-heading font-medium text-xs text-muted-foreground uppercase">
									Price (Total & Katha)
								</TableHead>
								<TableHead className="font-heading font-medium text-xs text-muted-foreground uppercase">
									Status (Quick Patch)
								</TableHead>
								<TableHead className="text-right font-heading font-medium text-xs text-muted-foreground uppercase pr-5">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="divide-y divide-border/40">
							{filtered.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={7}
										className="text-center py-16 text-muted-foreground text-xs font-light"
									>
										<Building2 className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
										<p className="font-heading font-semibold text-sm text-foreground">
											No Plots Found
										</p>
										<p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
											Try adjusting search keywords or filter values.
										</p>
									</TableCell>
								</TableRow>
							) : (
								filtered.map((p, i) => {
									const kathaCount =
										p.katha || (p.bedrooms ? p.bedrooms : 3);
									const sqftArea = p.area || kathaCount * 720;
									const pricePerKathaCalc =
										kathaCount > 0
											? Math.round(p.price / kathaCount)
											: null;

									return (
										<TableRow
											key={p.id}
											className="hover:bg-muted/30 transition-colors group"
										>
											<TableCell className="text-muted-foreground text-xs font-mono pl-5">
												{i + 1}
											</TableCell>
											<TableCell className="py-3.5">
												<div className="flex items-center gap-3">
													<div className="relative h-12 w-12 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border/60">
														{p.images && p.images[0] ? (
															<Image
																src={p.images[0]}
																alt={p.title}
																fill
																className="object-cover"
															/>
														) : (
															<div className="w-full h-full flex items-center justify-center">
																<Building2 className="h-5 w-5 text-muted-foreground/60" />
															</div>
														)}
													</div>
													<div className="min-w-0">
														<div className="flex items-center gap-2">
															<p className="font-medium text-sm text-foreground truncate">
																{p.title}
															</p>
															{p.featured && (
																<Badge className="bg-amber-500/15 text-amber-600 border border-amber-500/30 text-[9px] px-1.5 py-0">
																	Featured
																</Badge>
															)}
														</div>
														<div className="flex items-center gap-2 text-xs text-muted-foreground font-light pt-0.5">
															<span className="font-semibold text-primary">
																{p.block || "Block-A"}
															</span>
															<span>•</span>
															<span className="truncate max-w-[180px]">
																{p.location}
															</span>
														</div>
													</div>
												</div>
											</TableCell>

											<TableCell className="hidden md:table-cell py-3.5">
												<div className="space-y-0.5">
													<Badge
														variant="outline"
														className="text-xs font-medium font-mono border-primary/30 text-primary bg-primary/5"
													>
														{kathaCount} Katha
													</Badge>
													<p className="text-[11px] text-muted-foreground font-light">
														{sqftArea} sq. ft.
													</p>
												</div>
											</TableCell>

											<TableCell className="hidden lg:table-cell py-3.5">
												<div className="space-y-1">
													<p className="text-xs font-medium text-foreground">
														{p.roadWidth || "30ft Avenue"}
													</p>
													<p className="text-[11px] text-muted-foreground font-light">
														{p.facing || "South Facing"}
													</p>
												</div>
											</TableCell>

											<TableCell className="py-3.5">
												<div className="space-y-0.5">
													<p className="font-medium font-heading text-sm text-primary">
														{formatCurrency(p.price)}
													</p>
													{pricePerKathaCalc && (
														<p className="text-[11px] text-muted-foreground font-light">
															~{formatCurrency(pricePerKathaCalc)}/katha
														</p>
													)}
												</div>
											</TableCell>

											{/* Quick Patch Status Column */}
											<TableCell className="py-3.5">
												<Select
													value={p.status}
													onValueChange={(val: Property["status"]) =>
														handlePatchStatus(p.id, val)
													}
												>
													<SelectTrigger
														className={`h-8 w-[140px] rounded-lg text-xs font-semibold border ${
															p.status === "available"
																? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
																: p.status === "pending"
																	? "bg-amber-500/10 text-amber-600 border-amber-500/30"
																	: "bg-rose-500/10 text-rose-600 border-rose-500/30"
														}`}
													>
														<SelectValue />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="available">
															Available
														</SelectItem>
														<SelectItem value="pending">
															Booked / In Process
														</SelectItem>
														<SelectItem value="sold">Sold Out</SelectItem>
													</SelectContent>
												</Select>
											</TableCell>

											{/* Actions Column */}
											<TableCell className="text-right py-3.5 pr-5">
												<div className="flex justify-end items-center gap-1">
													{/* Quick Patch Featured toggle */}
													<Button
														variant="ghost"
														size="icon"
														onClick={() =>
															handleToggleFeatured(p.id, p.featured)
														}
														className={`h-8 w-8 rounded-lg cursor-pointer ${
															p.featured
																? "text-amber-500 bg-amber-500/10"
																: "text-muted-foreground hover:text-amber-500"
														}`}
														title={
															p.featured
																? "Remove from Featured"
																: "Mark as Featured"
														}
													>
														<Flame className="h-4 w-4" />
													</Button>

													{/* Duplicate Plot */}
													<Button
														variant="ghost"
														size="icon"
														onClick={() => handleDuplicate(p)}
														className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg cursor-pointer"
														title="Duplicate Plot"
													>
														<Copy className="h-4 w-4" />
													</Button>

													{/* Edit Plot (Opens in-page dedicated editor) */}
													<Button
														variant="ghost"
														size="icon"
														onClick={() => openEdit(p)}
														className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10 rounded-lg cursor-pointer"
														title="Edit Plot Details"
													>
														<Edit className="h-4 w-4" />
													</Button>

													{/* Delete Plot */}
													<Button
														variant="ghost"
														size="icon"
														onClick={() => handleDeleteClick(p.id)}
														className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer"
														title="Delete Plot"
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									);
								})
							)}
						</TableBody>
					</Table>
				</div>
			</div>

			{/* ── 5. DELETE CONFIRMATION DIALOG ── */}
			<ConfirmDialog
				open={!!deleteId}
				onOpenChange={(open) => {
					if (!open) setDeleteId(null);
				}}
				title="Delete Plot from Inventory"
				description="Are you sure you want to permanently delete this plot listing from the database? This action cannot be undone."
				confirmText="Yes, Delete"
				variant="destructive"
				onConfirm={executeDelete}
			/>
		</div>
	);
}
