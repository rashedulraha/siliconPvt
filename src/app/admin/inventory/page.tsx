"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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
import { PropertyForm } from "@/components/admin/PropertyForm";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useProperties } from "@/hooks/useProperties";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Property } from "@/types";

export default function InventoryPage() {
	const { properties, stats, addProperty, updateProperty, deleteProperty } =
		useProperties();
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState<"all" | "sale" | "rent">("all");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [categoryFilter, setCategoryFilter] = useState<string>("all");
	const [formOpen, setFormOpen] = useState(false);
	const [editingProperty, setEditingProperty] = useState<Property | null>(null);
	const [deleteId, setDeleteId] = useState<string | null>(null);

	const filtered = useMemo(() => {
		let result = [...properties];
		if (search) {
			const q = search.toLowerCase();
			result = result.filter(
				(p) =>
					p.title.toLowerCase().includes(q) ||
					p.location.toLowerCase().includes(q) ||
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

	const handleSave = async (data: any) => {
		try {
			if (editingProperty) {
				await updateProperty(editingProperty.id, data);
			} else {
				await addProperty(data);
			}
			toast.success("Plot/Property saved successfully to live database.");
			setFormOpen(false);
			setEditingProperty(null);
		} catch {
			toast.error("Failed to save property.");
		}
	};

	const openEdit = (p: Property) => {
		setEditingProperty(p);
		setFormOpen(true);
	};

	const openCreate = () => {
		setEditingProperty(null);
		setFormOpen(true);
	};

	const handleDeleteClick = (id: string) => {
		setDeleteId(id);
	};

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
			label: "Immediate Possession",
			value: stats.forSale || stats.total,
			icon: Tag,
			color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
		},
	];

	return (
		<div className="space-y-6 max-w-7xl mx-auto text-left font-roboto pb-12">
			{/* ── 1. HEADER SECTION ── */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div className="space-y-1">
					<span className="text-xs font-semibold uppercase tracking-wider text-primary font-heading inline-flex items-center gap-1.5">
						<Sparkles className="w-3.5 h-3.5" /> SILICON CITY INVENTORY DESK
					</span>
					<h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
						Plots & Property Inventory
					</h1>
					<p className="text-xs sm:text-sm text-muted-foreground font-light">
						{properties.length} total plots in database • {filtered.length}{" "}
						matching current filters.
					</p>
				</div>
				<Button
					onClick={openCreate}
					className="h-10 px-5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold font-heading text-xs inline-flex items-center gap-2 shadow-md shadow-primary/20 cursor-pointer"
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
								<p className="text-2xl font-extrabold font-heading text-foreground">
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
							placeholder="Search by plot title, block, location, or size..."
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
								Pending / Booked ({stats.total - stats.available})
							</SelectItem>
							<SelectItem value="sold">Sold</SelectItem>
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
							<SelectItem value="sale">For Sale / Booking</SelectItem>
							<SelectItem value="rent">Commercial Lease</SelectItem>
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
								<TableHead className="w-12 font-heading font-bold text-xs text-muted-foreground uppercase pl-5">
									#
								</TableHead>
								<TableHead className="font-heading font-bold text-xs text-muted-foreground uppercase">
									Plot / Property Details
								</TableHead>
								<TableHead className="font-heading font-bold text-xs text-muted-foreground uppercase hidden md:table-cell">
									Location & Block
								</TableHead>
								<TableHead className="font-heading font-bold text-xs text-muted-foreground uppercase hidden lg:table-cell">
									Category
								</TableHead>
								<TableHead className="font-heading font-bold text-xs text-muted-foreground uppercase">
									Price / Katha
								</TableHead>
								<TableHead className="font-heading font-bold text-xs text-muted-foreground uppercase">
									Status
								</TableHead>
								<TableHead className="text-right font-heading font-bold text-xs text-muted-foreground uppercase pr-5">
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
										<p className="font-heading font-bold text-sm text-foreground">
											No Plots Found
										</p>
										<p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
											Try changing search keywords or status filters.
										</p>
									</TableCell>
								</TableRow>
							) : (
								filtered.map((p, i) => (
									<TableRow
										key={p.id}
										className="hover:bg-muted/30 transition-colors"
									>
										<TableCell className="text-muted-foreground text-xs font-mono pl-5">
											{i + 1}
										</TableCell>
										<TableCell className="py-3.5">
											<div className="flex items-center gap-3">
												<div className="relative h-10 w-10 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border/60">
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
													<p className="font-bold text-sm text-foreground truncate">
														{p.title}
													</p>
													<p className="text-xs text-muted-foreground font-light">
														{p.area} sqft •{" "}
														{p.bedrooms
															? `${p.bedrooms} Katha`
															: "Residential Plot"}
													</p>
												</div>
											</div>
										</TableCell>
										<TableCell className="hidden md:table-cell text-xs text-muted-foreground font-light py-3.5">
											<div className="flex items-center gap-1.5">
												<MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
												<span>{p.location}</span>
											</div>
										</TableCell>
										<TableCell className="hidden lg:table-cell capitalize text-xs font-medium py-3.5">
											<Badge
												variant="outline"
												className="capitalize text-[11px] font-semibold border-border/80 bg-background text-foreground"
											>
												{p.category === "land" ? "Plot / Land" : p.category}
											</Badge>
										</TableCell>
										<TableCell className="font-bold font-heading text-sm text-primary py-3.5">
											{formatCurrency(p.price)}
										</TableCell>
										<TableCell className="py-3.5">
											<Badge
												className={`capitalize text-[11px] font-semibold border ${
													p.status === "available"
														? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
														: p.status === "pending"
															? "bg-amber-500/10 text-amber-600 border-amber-500/20"
															: "bg-muted text-muted-foreground border-border/60"
												}`}
											>
												{p.status}
											</Badge>
										</TableCell>
										<TableCell className="text-right py-3.5 pr-5">
											<div className="flex justify-end gap-1">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => openEdit(p)}
													className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg cursor-pointer"
													title="Edit Plot"
												>
													<Edit className="h-4 w-4" />
												</Button>
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
								))
							)}
						</TableBody>
					</Table>
				</div>
			</div>

			{/* ── 5. FORM DIALOG (CREATE / EDIT) ── */}
			<Dialog open={formOpen} onOpenChange={setFormOpen}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-card border border-border/80 shadow-2xl font-roboto">
					<DialogHeader className="border-b border-border/50 pb-4 text-left">
						<DialogTitle className="font-heading text-lg sm:text-xl font-bold">
							{editingProperty
								? "Edit Plot / Property Details"
								: "Add New Plot to Inventory"}
						</DialogTitle>
					</DialogHeader>
					<PropertyForm
						initial={editingProperty ?? undefined}
						onSave={handleSave}
						onCancel={() => {
							setFormOpen(false);
							setEditingProperty(null);
						}}
					/>
				</DialogContent>
			</Dialog>

			{/* ── 6. DELETE CONFIRMATION DIALOG ── */}
			<ConfirmDialog
				open={!!deleteId}
				onOpenChange={(open) => {
					if (!open) setDeleteId(null);
				}}
				title="Delete Property from Inventory"
				description="Are you sure you want to permanently delete this plot listing from the database? This action cannot be undone."
				confirmText="Yes, Delete"
				variant="destructive"
				onConfirm={() => {
					if (deleteId) {
						deleteProperty(deleteId);
						toast.success("Property removed from inventory.");
						setDeleteId(null);
					}
				}}
			/>
		</div>
	);
}
