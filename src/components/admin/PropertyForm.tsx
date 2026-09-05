"use client";

import { useState, useEffect } from "react";
import { Save, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Property } from "@/types";
import { PROPERTY_CATEGORIES } from "@/utils/constants";

interface PropertyFormProps {
	initial?: Property;
	onSave: (data: any) => void;
	onCancel: () => void;
}

export function PropertyForm({ initial, onSave, onCancel }: PropertyFormProps) {
	const [form, setForm] = useState({
		title: "",
		description: "",
		price: "",
		location: "",
		address: "",
		bedrooms: "",
		bathrooms: "",
		area: "",
		type: "sale" as "sale" | "rent",
		category: "house" as Property["category"],
		images: [] as string[],
		features: [] as string[],
		agentId: "agent-1",
		status: "available" as Property["status"],
		yearBuilt: "",
		garage: "",
	});
	const [newImage, setNewImage] = useState("");
	const [newFeature, setNewFeature] = useState("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

	/** Returns an error map; empty object means all required fields are valid. */
	const validate = (values: typeof form): Record<string, string> => {
		const errors: Record<string, string> = {};
		if (!values.title.trim()) errors.title = "Title is required.";
		if (!values.location.trim()) errors.location = "Location is required.";
		if (!values.price.toString().trim()) errors.price = "Price is required.";
		if (!values.type.trim()) errors.type = "Type is required.";
		if (!values.status.trim()) errors.status = "Status is required.";
		return errors;
	};

	useEffect(() => {
		if (initial) {
			setForm({
				title: initial.title || "",
				description: initial.description || "",
				price: initial.price !== undefined && initial.price !== null ? initial.price.toString() : "",
				location: initial.location || "",
				address: initial.address || initial.location || "",
				bedrooms: initial.bedrooms !== undefined && initial.bedrooms !== null ? initial.bedrooms.toString() : "",
				bathrooms: initial.bathrooms !== undefined && initial.bathrooms !== null ? initial.bathrooms.toString() : "",
				area: initial.area !== undefined && initial.area !== null ? initial.area.toString() : "",
				type: initial.type || "sale",
				category: initial.category || "land",
				images: Array.isArray(initial.images) ? [...initial.images] : [],
				features: Array.isArray(initial.features) ? [...initial.features] : [],
				agentId: initial.agentId || "agent-1",
				status: initial.status || "available",
				yearBuilt: initial.yearBuilt?.toString() || "",
				garage: initial.garage?.toString() || "",
			});
		}
	}, [initial]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const errors = validate(form);
		if (Object.keys(errors).length > 0) {
			setFieldErrors(errors);
			return;
		}
		setFieldErrors({});
		onSave({
			...form,
			price: parseFloat(form.price) || 0,
			bedrooms: parseInt(form.bedrooms) || 0,
			bathrooms: parseFloat(form.bathrooms) || 0,
			area: parseInt(form.area) || 0,
			yearBuilt: form.yearBuilt ? parseInt(form.yearBuilt) : undefined,
			garage: form.garage ? parseInt(form.garage) : undefined,
		});
	};

	const addImage = () => {
		if (newImage.trim()) {
			setForm({ ...form, images: [...form.images, newImage.trim()] });
			setNewImage("");
		}
	};

	const removeImage = (idx: number) => {
		setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });
	};

	const addFeature = () => {
		if (newFeature.trim()) {
			setForm({ ...form, features: [...form.features, newFeature.trim()] });
			setNewFeature("");
		}
	};

	const removeFeature = (idx: number) => {
		setForm({ ...form, features: form.features.filter((_, i) => i !== idx) });
	};

	return (
		<form onSubmit={handleSubmit}>
			<ScrollArea className="max-h-[70vh] pr-4">
				<div className="space-y-6 py-2">
					{/* Basic Info */}
					<div>
						<h3 className="text-sm font-semibold mb-3">Basic Information</h3>
						<div className="space-y-3">
							<div className="space-y-2">
								<Label htmlFor="title">Title *</Label>
								<Input
									id="title"
									value={form.title}
									onChange={(e) => {
										setForm({ ...form, title: e.target.value });
										if (fieldErrors.title)
											setFieldErrors({ ...fieldErrors, title: "" });
									}}
									placeholder="Modern Downtown Penthouse"
									required
								/>
								{fieldErrors.title && (
									<span
										data-field-error="title"
										className="text-destructive text-xs mt-1 block"
									>
										{fieldErrors.title}
									</span>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="description">Description *</Label>
								<Textarea
									id="description"
									value={form.description}
									onChange={(e) =>
										setForm({ ...form, description: e.target.value })
									}
									rows={4}
									required
								/>
							</div>
							<div className="grid grid-cols-2 gap-3">
								<div className="space-y-2">
									<Label htmlFor="location">Location *</Label>
									<Input
										id="location"
										value={form.location}
										onChange={(e) => {
											setForm({ ...form, location: e.target.value });
											if (fieldErrors.location)
												setFieldErrors({ ...fieldErrors, location: "" });
										}}
										placeholder="Manhattan, New York"
										required
									/>
									{fieldErrors.location && (
										<span
											data-field-error="location"
											className="text-destructive text-xs mt-1 block"
										>
											{fieldErrors.location}
										</span>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="address">Full Address *</Label>
									<Input
										id="address"
										value={form.address}
										onChange={(e) =>
											setForm({ ...form, address: e.target.value })
										}
										required
									/>
								</div>
							</div>
						</div>
					</div>

					<Separator />

					{/* Pricing & Type */}
					<div>
						<h3 className="text-sm font-semibold mb-3">Pricing & Type</h3>
						<div className="grid grid-cols-2 gap-3">
							<div className="space-y-2">
								<Label htmlFor="price">Price *</Label>
								<Input
									id="price"
									type="number"
									value={form.price}
									onChange={(e) => {
										setForm({ ...form, price: e.target.value });
										if (fieldErrors.price)
											setFieldErrors({ ...fieldErrors, price: "" });
									}}
									required
								/>
								{fieldErrors.price && (
									<span
										data-field-error="price"
										className="text-destructive text-xs mt-1 block"
									>
										{fieldErrors.price}
									</span>
								)}
							</div>
							<div className="space-y-2">
								<Label>Type</Label>
								<Select
									value={form.type}
									onValueChange={(v) => {
										setForm({ ...form, type: v as any });
										if (fieldErrors.type)
											setFieldErrors({ ...fieldErrors, type: "" });
									}}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="sale">For Sale</SelectItem>
										<SelectItem value="rent">For Rent</SelectItem>
									</SelectContent>
								</Select>
								{fieldErrors.type && (
									<span
										data-field-error="type"
										className="text-destructive text-xs mt-1 block"
									>
										{fieldErrors.type}
									</span>
								)}
							</div>
							<div className="space-y-2">
								<Label>Category</Label>
								<Select
									value={form.category}
									onValueChange={(v) =>
										setForm({ ...form, category: v as any })
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{PROPERTY_CATEGORIES.map((c) => (
											<SelectItem key={c} value={c} className="capitalize">
												{c}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Status</Label>
								<Select
									value={form.status}
									onValueChange={(v) => {
										setForm({ ...form, status: v as any });
										if (fieldErrors.status)
											setFieldErrors({ ...fieldErrors, status: "" });
									}}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="available">Available</SelectItem>
										<SelectItem value="pending">Pending</SelectItem>
										<SelectItem value="sold">Sold</SelectItem>
										<SelectItem value="rented">Rented</SelectItem>
									</SelectContent>
								</Select>
								{fieldErrors.status && (
									<span
										data-field-error="status"
										className="text-destructive text-xs mt-1 block"
									>
										{fieldErrors.status}
									</span>
								)}
							</div>
						</div>
					</div>

					<Separator />

					{/* Specs */}
					<div>
						<h3 className="text-sm font-semibold mb-3">Specifications</h3>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
							<div className="space-y-2">
								<Label>Bedrooms</Label>
								<Input
									type="number"
									value={form.bedrooms}
									onChange={(e) =>
										setForm({ ...form, bedrooms: e.target.value })
									}
								/>
							</div>
							<div className="space-y-2">
								<Label>Bathrooms</Label>
								<Input
									type="number"
									step="0.5"
									value={form.bathrooms}
									onChange={(e) =>
										setForm({ ...form, bathrooms: e.target.value })
									}
								/>
							</div>
							<div className="space-y-2">
								<Label>Area (ft²)</Label>
								<Input
									type="number"
									value={form.area}
									onChange={(e) => setForm({ ...form, area: e.target.value })}
								/>
							</div>
							<div className="space-y-2">
								<Label>Garage</Label>
								<Input
									type="number"
									value={form.garage}
									onChange={(e) => setForm({ ...form, garage: e.target.value })}
								/>
							</div>
							<div className="space-y-2 col-span-2">
								<Label>Year Built</Label>
								<Input
									type="number"
									value={form.yearBuilt}
									onChange={(e) =>
										setForm({ ...form, yearBuilt: e.target.value })
									}
								/>
							</div>
						</div>
					</div>

					<Separator />

					{/* Images */}
					<div>
						<h3 className="text-sm font-semibold mb-3">Images</h3>
						<div className="flex gap-2 mb-3">
							<Input
								value={newImage}
								onChange={(e) => setNewImage(e.target.value)}
								placeholder="https://example.com/image.jpg"
							/>
							<Button type="button" variant="outline" onClick={addImage}>
								<Plus className="h-4 w-4 mr-1" /> Add
							</Button>
						</div>
						{form.images.length > 0 && (
							<div className="grid grid-cols-3 gap-2">
								{form.images.map((img, idx) => (
									<div
										key={idx}
										className="relative group aspect-video rounded-md overflow-hidden bg-muted"
									>
										<img
											src={img}
											alt=""
											className="w-full h-full object-cover"
										/>
										<button
											type="button"
											onClick={() => removeImage(idx)}
											className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
										>
											<X className="h-3 w-3" />
										</button>
									</div>
								))}
							</div>
						)}
					</div>

					<Separator />

					{/* Features */}
					<div>
						<h3 className="text-sm font-semibold mb-3">Features</h3>
						<div className="flex gap-2 mb-3">
							<Input
								value={newFeature}
								onChange={(e) => setNewFeature(e.target.value)}
								placeholder="e.g. Swimming Pool"
							/>
							<Button type="button" variant="outline" onClick={addFeature}>
								<Plus className="h-4 w-4 mr-1" /> Add
							</Button>
						</div>
						{form.features.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{form.features.map((f, idx) => (
									<div
										key={idx}
										className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm"
									>
										{f}
										<button type="button" onClick={() => removeFeature(idx)}>
											<X className="h-3 w-3" />
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</ScrollArea>

			<div className="flex gap-2 pt-4 border-t mt-4">
				<Button type="submit" className="flex-1">
					<Save className="h-4 w-4 mr-2" />
					{initial ? "Update Property" : "Create Property"}
				</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</form>
	);
}
