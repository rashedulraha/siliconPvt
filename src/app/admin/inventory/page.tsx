"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
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
	const { properties, addProperty, updateProperty, deleteProperty } =
		useProperties();
	const [search, setSearch] = useState("");
	const [typeFilter, setTypeFilter] = useState<"all" | "sale" | "rent">("all");
	const [statusFilter, setStatusFilter] = useState<string>("all");
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
					p.location.toLowerCase().includes(q),
			);
		}
		if (typeFilter !== "all")
			result = result.filter((p) => p.type === typeFilter);
		if (statusFilter !== "all")
			result = result.filter((p) => p.status === statusFilter);
		return result;
	}, [properties, search, typeFilter, statusFilter]);

	const handleSave = async (data: any) => {
		try {
			if (editingProperty) {
				await updateProperty(editingProperty.id, data);
			} else {
				await addProperty(data);
			}
			toast.success("Plot/Property saved successfully to database.");
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

	return (
		<div className="space-y-6 text-left">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold font-heading text-foreground">
						Property Inventory
					</h2>
					<p className="text-sm text-muted-foreground font-light">
						{properties.length} total • {filtered.length} shown
					</p>
				</div>
				<Button onClick={openCreate} className="gap-2">
					<Plus className="h-4 w-4" />
					Add Property
				</Button>
			</div>

			{/* Filters */}
			<Card className="border border-border/80 shadow-none">
				<CardContent className="p-4">
					<div className="grid sm:grid-cols-3 gap-3">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search properties..."
								className="pl-9"
							/>
						</div>

						<Select
							value={typeFilter}
							onValueChange={(v: "all" | "sale" | "rent") => setTypeFilter(v)}
						>
							<SelectTrigger>
								<SelectValue placeholder="All Types" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Types</SelectItem>
								<SelectItem value="sale">For Sale</SelectItem>
								<SelectItem value="rent">For Rent</SelectItem>
							</SelectContent>
						</Select>

						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger>
								<SelectValue placeholder="All Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="available">Available</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
								<SelectItem value="sold">Sold</SelectItem>
								<SelectItem value="rented">Rented</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Table */}
			<Card className="border border-border/80 shadow-none overflow-hidden">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="border-border/80">
								<TableHead className="w-12">#</TableHead>
								<TableHead>Property</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filtered.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={8}
										className="text-center py-8 text-muted-foreground"
									>
										No properties found.
									</TableCell>
								</TableRow>
							) : (
								filtered.map((p, i) => (
									<TableRow key={p.id} className="border-border/80">
										<TableCell className="text-muted-foreground text-xs">
											{i + 1}
										</TableCell>
										<TableCell>
											<div className="font-medium text-foreground">
												{p.title}
											</div>
											<div className="text-xs text-muted-foreground">
												{p.area} sqft / kathas
											</div>
										</TableCell>
										<TableCell className="text-sm">{p.location}</TableCell>
										<TableCell className="capitalize text-sm">
											{p.category}
										</TableCell>
										<TableCell>
											<Badge
												variant={p.type === "sale" ? "default" : "secondary"}
												className="capitalize text-[11px]"
											>
												{p.type}
											</Badge>
										</TableCell>
										<TableCell className="font-semibold text-sm">
											{formatCurrency(p.price)}
										</TableCell>
										<TableCell>
											<Badge
												variant={
													p.status === "available"
														? "default"
														: p.status === "pending"
															? "outline"
															: "secondary"
												}
												className="capitalize text-[11px]"
											>
												{p.status}
											</Badge>
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-1">
												<Button
													variant="ghost"
													size="icon"
													onClick={() => openEdit(p)}
													className="h-8 w-8"
												>
													<Edit className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleDeleteClick(p.id)}
													className="h-8 w-8 text-destructive"
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
			</Card>

			{/* Form Dialog */}
			<Dialog open={formOpen} onOpenChange={setFormOpen}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>
							{editingProperty ? "Edit Property" : "Add Property"}
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

			{/* Delete Confirm */}
			<ConfirmDialog
				open={!!deleteId}
				onOpenChange={(open) => {
					if (!open) setDeleteId(null);
				}}
				title="Delete Property"
				description="Are you sure you want to delete this property? This action cannot be undone."
				confirmText="Delete"
				variant="destructive"
				onConfirm={() => {
					if (deleteId) {
						deleteProperty(deleteId);
						toast.success("Property deleted.");
						setDeleteId(null);
					}
				}}
			/>
		</div>
	);
}
