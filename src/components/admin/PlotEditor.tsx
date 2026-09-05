"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
	ArrowLeft,
	Save,
	X,
	Plus,
	Trash2,
	Sparkles,
	Building2,
	MapPin,
	CheckCircle2,
	Clock,
	Compass,
	Layers,
	Eye,
	ImageIcon,
	Tag,
	Flame,
	ShieldCheck,
	Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Property } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PlotEditorProps {
	initial?: Property | null;
	onSave: (data: any) => Promise<void>;
	onCancel: () => void;
	onDelete?: (id: string) => void;
}

const PRESET_FEATURES = [
	"30ft Front Road",
	"40ft Avenue Road",
	"60ft Main Boulevard",
	"Corner Plot",
	"Lake Facing",
	"South Facing",
	"18ft High Soil Elevation",
	"100% Mutation Ready",
	"Instant Demarcation",
	"Gas & Electricity Ready",
	"Mosque Adjacent",
	"Park & Lake View",
	"RAJUK Standard Layout",
	"Flood Free Zone",
];

const PRESET_BLOCKS = ["Block-A", "Block-B", "Block-C", "Block-D", "Main Boulevard"];
const PRESET_ROADS = ["25ft Road", "30ft Avenue", "40ft Avenue", "60ft Main Boulevard"];
const PRESET_FACINGS = [
	"South Facing",
	"North Facing",
	"East Facing",
	"West Facing",
	"Corner (Double Frontage)",
	"Lake Facing",
	"Park Facing",
];

const SAMPLE_PLOT_IMAGES = [
	"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
	"https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200",
	"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
	"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
];

export function PlotEditor({
	initial,
	onSave,
	onCancel,
	onDelete,
}: PlotEditorProps) {
	// Parse initial values safely
	const isEdit = !!initial;
	const initialKatha = initial?.katha ?? (initial?.bedrooms ? initial.bedrooms : 3);
	const initialArea = initial?.area ?? (initial as any)?.areaSqFt ?? initialKatha * 720;
	const initialPrice = initial?.price ?? 2500000;
	const initialPricePerKatha =
		initialKatha > 0 ? Math.round(initialPrice / initialKatha) : 700000;

	// Extract block from location or address if not explicitly present
	let detectedBlock = initial?.block || "";
	if (!detectedBlock && initial?.location) {
		const match = initial.location.match(/Block-[A-D]|Main Boulevard/i);
		if (match) detectedBlock = match[0];
	}
	if (!detectedBlock) detectedBlock = "Block-A";

	const [title, setTitle] = useState(initial?.title || "");
	const [block, setBlock] = useState(detectedBlock);
	const [plotNumber, setPlotNumber] = useState(
		initial?.address?.includes("Plot") ? initial.address : "Plot # 12, Road # 03",
	);
	const [location, setLocation] = useState(
		initial?.location || "Block-A, Silicon City, Savar, Dhaka",
	);
	const [katha, setKatha] = useState<string>(String(initialKatha));
	const [area, setArea] = useState<string>(String(initialArea));
	const [totalPrice, setTotalPrice] = useState<string>(String(initialPrice));
	const [pricePerKatha, setPricePerKatha] = useState<string>(
		String(initialPricePerKatha),
	);
	const [roadWidth, setRoadWidth] = useState(initial?.roadWidth || "30ft Avenue");
	const [facing, setFacing] = useState(initial?.facing || "South Facing");
	const [type, setType] = useState<"sale" | "rent">(initial?.type || "sale");
	const [category, setCategory] = useState<Property["category"]>(
		initial?.category || "land",
	);
	const [status, setStatus] = useState<Property["status"]>(
		initial?.status || "available",
	);
	const [featured, setFeatured] = useState<boolean>(initial?.featured ?? true);
	const [description, setDescription] = useState(
		initial?.description ||
			"Master-planned residential plot in Silicon City with direct avenue connectivity, elevated soil embankment, 100% mutation-ready registry, and instant demarcation possession.",
	);
	const [features, setFeatures] = useState<string[]>(
		Array.isArray(initial?.features) && initial.features.length > 0
			? initial.features
			: [
					"30ft Front Road",
					"18ft High Soil Elevation",
					"100% Mutation Ready",
					"Instant Demarcation",
					"Gas & Electricity Ready",
				],
	);
	const [images, setImages] = useState<string[]>(
		Array.isArray(initial?.images) && initial.images.length > 0
			? initial.images
			: [SAMPLE_PLOT_IMAGES[0]],
	);

	const [newFeature, setNewFeature] = useState("");
	const [newImageUrl, setNewImageUrl] = useState("");
	const [saving, setSaving] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Update location string when block changes
	const handleBlockChange = (newBlock: string) => {
		setBlock(newBlock);
		if (location.includes("Silicon City")) {
			setLocation(`${newBlock}, Silicon City, Savar, Dhaka`);
		}
	};

	// Katha change auto-updates Area in sqft & Total Price if pricePerKatha is set
	const handleKathaChange = (kathaVal: string) => {
		setKatha(kathaVal);
		const numKatha = parseFloat(kathaVal);
		if (!isNaN(numKatha) && numKatha > 0) {
			setArea(String(Math.round(numKatha * 720)));
			const ppk = parseFloat(pricePerKatha);
			if (!isNaN(ppk) && ppk > 0) {
				setTotalPrice(String(Math.round(ppk * numKatha)));
			}
		}
	};

	// Price per Katha change recalculates Total Price
	const handlePricePerKathaChange = (ppkVal: string) => {
		setPricePerKatha(ppkVal);
		const ppk = parseFloat(ppkVal);
		const numKatha = parseFloat(katha);
		if (!isNaN(ppk) && !isNaN(numKatha) && numKatha > 0) {
			setTotalPrice(String(Math.round(ppk * numKatha)));
		}
	};

	// Total Price change recalculates Price per Katha
	const handleTotalPriceChange = (totalVal: string) => {
		setTotalPrice(totalVal);
		const total = parseFloat(totalVal);
		const numKatha = parseFloat(katha);
		if (!isNaN(total) && !isNaN(numKatha) && numKatha > 0) {
			setPricePerKatha(String(Math.round(total / numKatha)));
		}
	};

	// Toggle a preset feature pill
	const toggleFeature = (feat: string) => {
		if (features.includes(feat)) {
			setFeatures(features.filter((f) => f !== feat));
		} else {
			setFeatures([...features, feat]);
		}
	};

	// Add custom feature
	const addCustomFeature = () => {
		const trimmed = newFeature.trim();
		if (trimmed && !features.includes(trimmed)) {
			setFeatures([...features, trimmed]);
			setNewFeature("");
		}
	};

	// Remove feature
	const removeFeature = (idx: number) => {
		setFeatures(features.filter((_, i) => i !== idx));
	};

	// Add image
	const addImage = (urlToAdd?: string) => {
		const targetUrl = (urlToAdd || newImageUrl).trim();
		if (targetUrl && !images.includes(targetUrl)) {
			setImages([...images, targetUrl]);
			setNewImageUrl("");
		}
	};

	// Remove image
	const removeImage = (idx: number) => {
		if (images.length <= 1) {
			return; // keep at least 1 image
		}
		setImages(images.filter((_, i) => i !== idx));
	};

	// Set primary image (move to index 0)
	const setPrimaryImage = (idx: number) => {
		if (idx === 0) return;
		const target = images[idx];
		const remaining = images.filter((_, i) => i !== idx);
		setImages([target, ...remaining]);
	};

	const validate = () => {
		const errs: Record<string, string> = {};
		if (!title.trim()) errs.title = "Plot Title is required.";
		if (!location.trim()) errs.location = "Location is required.";
		if (!totalPrice || isNaN(Number(totalPrice)) || Number(totalPrice) <= 0) {
			errs.totalPrice = "A valid positive price is required.";
		}
		if (!katha || isNaN(Number(katha)) || Number(katha) <= 0) {
			errs.katha = "Plot size in Katha is required.";
		}
		return errs;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}
		setErrors({});
		setSaving(true);

		try {
			const parsedKatha = parseFloat(katha) || 3;
			const parsedArea = parseInt(area) || Math.round(parsedKatha * 720);
			const parsedPrice = parseFloat(totalPrice) || 0;

			await onSave({
				title: title.trim(),
				block: block.trim(),
				location: location.trim(),
				address: plotNumber.trim() || location.trim(),
				bedrooms: parsedKatha, // used as Katha in data sync
				katha: parsedKatha,
				bathrooms: 0,
				area: parsedArea,
				areaSqFt: parsedArea,
				price: parsedPrice,
				type,
				category,
				status,
				featured,
				roadWidth,
				facing,
				description: description.trim(),
				features,
				images: images.length > 0 ? images : [SAMPLE_PLOT_IMAGES[0]],
				agentId: initial?.agentId || "agent-1",
			});
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="space-y-6 max-w-7xl mx-auto text-left font-roboto pb-16 animate-in fade-in-50 duration-200">
			{/* ── 1. TOP HEADER & NAVIGATION BAR ── */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
				<div className="space-y-1">
					<button
						type="button"
						onClick={onCancel}
						className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-1 cursor-pointer"
					>
						<ArrowLeft className="w-4 h-4" />
						<span>Back to Plot Inventory</span>
					</button>
					<div className="flex items-center gap-3">
						<h1 className="text-2xl sm:text-3xl font-semibold font-heading text-foreground tracking-tight">
							{isEdit ? "Edit Plot Listing" : "Add New Plot to Inventory"}
						</h1>
						<Badge
							className={`text-[11px] font-semibold uppercase tracking-wider ${
								status === "available"
									? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
									: status === "pending"
										? "bg-amber-500/10 text-amber-600 border-amber-500/20"
										: "bg-rose-500/10 text-rose-600 border-rose-500/20"
							}`}
						>
							{status === "pending" ? "Booked / In Process" : status}
						</Badge>
					</div>
					<p className="text-xs sm:text-sm text-muted-foreground font-light">
						Configure all dimensions, boundary block, pricing per katha, and
						features for Silicon City.
					</p>
				</div>

				{/* Top Action Controls */}
				<div className="flex items-center gap-2 self-start sm:self-auto">
					{isEdit && onDelete && initial && (
						<Button
							type="button"
							variant="outline"
							onClick={() => onDelete(initial.id)}
							className="h-10 px-4 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 text-xs font-semibold font-heading cursor-pointer inline-flex items-center gap-1.5"
						>
							<Trash2 className="w-4 h-4" />
							<span>Delete Plot</span>
						</Button>
					)}
					<Button
						type="button"
						variant="outline"
						onClick={onCancel}
						className="h-10 px-4 rounded-xl text-xs font-semibold font-heading cursor-pointer"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={saving}
						className="h-10 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium font-heading text-xs inline-flex items-center gap-2 shadow-md shadow-primary/20 cursor-pointer"
					>
						<Save className="h-4 w-4" />
						<span>
							{saving
								? "Saving..."
								: isEdit
									? "Update Plot Details"
									: "Publish Plot"}
						</span>
					</Button>
				</div>
			</div>

			{/* ── 2. MAIN FORM & LIVE PREVIEW GRID ── */}
			<form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				{/* ── LEFT COLUMN: PLOT DETAILS FORM (8 COLS) ── */}
				<div className="lg:col-span-8 space-y-6">
					{/* 1. Basic Identification */}
					<Card className="border border-border/80 shadow-xs rounded-2xl bg-card overflow-hidden">
						<div className="p-5 border-b border-border/40 bg-muted/20">
							<div className="flex items-center gap-2">
								<Building2 className="w-4 h-4 text-primary" />
								<h2 className="text-base font-semibold font-heading text-foreground">
									1. Plot Title & Block Identification
								</h2>
							</div>
						</div>
						<CardContent className="p-5 sm:p-6 space-y-4">
							<div className="space-y-1.5">
								<Label htmlFor="plotTitle" className="text-xs font-semibold">
									Plot Title / Marketing Designation *
								</Label>
								<Input
									id="plotTitle"
									value={title}
									onChange={(e) => {
										setTitle(e.target.value);
										if (errors.title) setErrors({ ...errors, title: "" });
									}}
									placeholder="e.g. Lakeview Corner Residential Plot (5 Katha)"
									className="h-11 rounded-xl bg-background border-border/70 text-sm font-medium"
									required
								/>
								{errors.title && (
									<p className="text-xs text-destructive font-medium">
										{errors.title}
									</p>
								)}
								{/* Quick suggestions */}
								<div className="flex flex-wrap gap-1.5 pt-1">
									<span className="text-[11px] text-muted-foreground font-light self-center">
										Quick templates:
									</span>
									{[
										`Prime Residential Plot (${katha} Katha)`,
										`Lakeview Avenue Plot (${katha} Katha)`,
										`Commercial Boulevard Plot (${katha} Katha)`,
										`South-Facing Corner Plot (${katha} Katha)`,
									].map((tmpl) => (
										<button
											key={tmpl}
											type="button"
											onClick={() => setTitle(tmpl)}
											className="text-[11px] px-2.5 py-1 rounded-md bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer border border-border/50"
										>
											{tmpl}
										</button>
									))}
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
								<div className="space-y-1.5">
									<Label className="text-xs font-semibold">
										Block / Sector *
									</Label>
									<Select value={block} onValueChange={handleBlockChange}>
										<SelectTrigger className="h-10 rounded-xl bg-background border-border/70 text-xs font-semibold">
											<SelectValue placeholder="Select Block" />
										</SelectTrigger>
										<SelectContent>
											{PRESET_BLOCKS.map((b) => (
												<SelectItem key={b} value={b}>
													{b}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-1.5">
									<Label htmlFor="plotNumber" className="text-xs font-semibold">
										Plot & Road Demarcation
									</Label>
									<Input
										id="plotNumber"
										value={plotNumber}
										onChange={(e) => setPlotNumber(e.target.value)}
										placeholder="e.g. Plot # 42, Road # 03"
										className="h-10 rounded-xl bg-background border-border/70 text-xs sm:text-sm"
									/>
								</div>
							</div>

							<div className="space-y-1.5 pt-1">
								<Label htmlFor="plotLocation" className="text-xs font-semibold">
									Full Address & Location *
								</Label>
								<div className="relative">
									<MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
									<Input
										id="plotLocation"
										value={location}
										onChange={(e) => {
											setLocation(e.target.value);
											if (errors.location)
												setErrors({ ...errors, location: "" });
										}}
										placeholder="e.g. Block-A, Silicon City, Savar, Dhaka"
										className="pl-10 h-10 rounded-xl bg-background border-border/70 text-xs sm:text-sm"
										required
									/>
								</div>
								{errors.location && (
									<p className="text-xs text-destructive font-medium">
										{errors.location}
									</p>
								)}
							</div>
						</CardContent>
					</Card>

					{/* 2. Measurements & Land Specifications */}
					<Card className="border border-border/80 shadow-xs rounded-2xl bg-card overflow-hidden">
						<div className="p-5 border-b border-border/40 bg-muted/20">
							<div className="flex items-center gap-2">
								<Layers className="w-4 h-4 text-primary" />
								<h2 className="text-base font-bold font-heading text-foreground">
									2. Land Measurements, Road & Orientation
								</h2>
							</div>
						</div>
						<CardContent className="p-5 sm:p-6 space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="space-y-1.5">
									<Label htmlFor="kathaSize" className="text-xs font-semibold">
										Plot Size in Katha *
									</Label>
									<div className="relative">
										<Input
											id="kathaSize"
											type="number"
											step="0.5"
											value={katha}
											onChange={(e) => handleKathaChange(e.target.value)}
											placeholder="3"
											className="h-10 rounded-xl bg-background border-border/70 text-sm font-semibold"
											required
										/>
										<span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
											Katha
										</span>
									</div>
									{/* Quick Katha Selection */}
									<div className="flex gap-1.5 pt-1">
										{["2.5", "3", "5", "7.5", "10"].map((k) => (
											<button
												key={k}
												type="button"
												onClick={() => handleKathaChange(k)}
												className={`text-[11px] px-2.5 py-0.5 rounded-lg border font-semibold transition-all cursor-pointer ${
													katha === k
														? "bg-primary text-primary-foreground border-primary"
														: "bg-muted hover:bg-muted/80 text-foreground border-border/50"
												}`}
											>
												{k} Katha
											</button>
										))}
									</div>
								</div>

								<div className="space-y-1.5">
									<Label htmlFor="areaSqft" className="text-xs font-semibold">
										Area in Square Feet (Sq. Ft.)
									</Label>
									<div className="relative">
										<Input
											id="areaSqft"
											type="number"
											value={area}
											onChange={(e) => setArea(e.target.value)}
											placeholder="2160"
											className="h-10 rounded-xl bg-background border-border/70 text-sm"
										/>
										<span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
											Sq. Ft.
										</span>
									</div>
									<p className="text-[11px] text-muted-foreground font-light">
										Standard formula: 1 Katha = 720 Sq. Ft.
									</p>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
								<div className="space-y-1.5">
									<Label className="text-xs font-semibold">Road Width</Label>
									<Select value={roadWidth} onValueChange={setRoadWidth}>
										<SelectTrigger className="h-10 rounded-xl bg-background border-border/70 text-xs font-semibold">
											<SelectValue placeholder="Select Road Width" />
										</SelectTrigger>
										<SelectContent>
											{PRESET_ROADS.map((r) => (
												<SelectItem key={r} value={r}>
													{r}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-1.5">
									<Label className="text-xs font-semibold">
										Facing / Orientation
									</Label>
									<Select value={facing} onValueChange={setFacing}>
										<SelectTrigger className="h-10 rounded-xl bg-background border-border/70 text-xs font-semibold">
											<SelectValue placeholder="Select Orientation" />
										</SelectTrigger>
										<SelectContent>
											{PRESET_FACINGS.map((f) => (
												<SelectItem key={f} value={f}>
													{f}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 3. Pricing, Category & Status */}
					<Card className="border border-border/80 shadow-xs rounded-2xl bg-card overflow-hidden">
						<div className="p-5 border-b border-border/40 bg-muted/20">
							<div className="flex items-center gap-2">
								<Tag className="w-4 h-4 text-primary" />
								<h2 className="text-base font-bold font-heading text-foreground">
									3. Pricing, Inventory Status & Payment Facility
								</h2>
							</div>
						</div>
						<CardContent className="p-5 sm:p-6 space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="space-y-1.5">
									<Label htmlFor="pricePerKatha" className="text-xs font-semibold">
										Price per Katha (BDT)
									</Label>
									<div className="relative">
										<span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
											৳
										</span>
										<Input
											id="pricePerKatha"
											type="number"
											value={pricePerKatha}
											onChange={(e) =>
												handlePricePerKathaChange(e.target.value)
											}
											placeholder="700000"
											className="pl-8 h-10 rounded-xl bg-background border-border/70 text-sm font-semibold"
										/>
									</div>
									<p className="text-[11px] text-muted-foreground font-light">
										{pricePerKatha
											? `${formatCurrency(parseFloat(pricePerKatha) || 0)} / Katha`
											: "Enter price per katha"}
									</p>
								</div>

								<div className="space-y-1.5">
									<Label htmlFor="totalPrice" className="text-xs font-semibold">
										Total Plot Price (BDT) *
									</Label>
									<div className="relative">
										<span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-primary font-heading">
											৳
										</span>
										<Input
											id="totalPrice"
											type="number"
											value={totalPrice}
											onChange={(e) => handleTotalPriceChange(e.target.value)}
											placeholder="2100000"
											className="pl-8 h-10 rounded-xl bg-background border-border/70 text-sm font-bold text-primary"
											required
										/>
									</div>
									{errors.totalPrice ? (
										<p className="text-xs text-destructive font-medium">
											{errors.totalPrice}
										</p>
									) : (
										<p className="text-[11px] text-primary font-bold font-heading">
											Total: {formatCurrency(parseFloat(totalPrice) || 0)}
										</p>
									)}
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
								<div className="space-y-1.5">
									<Label className="text-xs font-semibold">
										Booking Status *
									</Label>
									<Select
										value={status}
										onValueChange={(v: Property["status"]) => setStatus(v)}
									>
										<SelectTrigger className="h-10 rounded-xl bg-background border-border/70 text-xs font-semibold">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="available">
												Available (Open for Booking)
											</SelectItem>
											<SelectItem value="pending">
												Pending / Booked
											</SelectItem>
											<SelectItem value="sold">Sold Out</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-1.5">
									<Label className="text-xs font-semibold">
										Plot Category *
									</Label>
									<Select
										value={category}
										onValueChange={(v: Property["category"]) => setCategory(v)}
									>
										<SelectTrigger className="h-10 rounded-xl bg-background border-border/70 text-xs font-semibold">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="land">Residential Plot</SelectItem>
											<SelectItem value="commercial">
												Commercial Plot
											</SelectItem>
											<SelectItem value="house">Villa / Duplex Plot</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-1.5">
									<Label className="text-xs font-semibold">Payment Terms</Label>
									<Select
										value={type}
										onValueChange={(v: "sale" | "rent") => setType(v)}
									>
										<SelectTrigger className="h-10 rounded-xl bg-background border-border/70 text-xs font-semibold">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="sale">For Sale / Outright</SelectItem>
											<SelectItem value="rent">
												Installment / Long Lease
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 4. Description & Overview */}
					<Card className="border border-border/80 shadow-xs rounded-2xl bg-card overflow-hidden">
						<div className="p-5 border-b border-border/40 bg-muted/20">
							<h2 className="text-base font-bold font-heading text-foreground">
								4. Description & Detailed Specifications
							</h2>
						</div>
						<CardContent className="p-5 sm:p-6 space-y-3">
							<Textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows={4}
								placeholder="Enter comprehensive plot description, nearby landmarks, possession timeline, and handover terms..."
								className="rounded-xl bg-background border-border/70 text-xs sm:text-sm font-light leading-relaxed resize-y"
							/>
						</CardContent>
					</Card>

					{/* 5. Key Highlights & Features */}
					<Card className="border border-border/80 shadow-xs rounded-2xl bg-card overflow-hidden">
						<div className="p-5 border-b border-border/40 bg-muted/20">
							<div className="flex items-center gap-2">
								<Sparkles className="w-4 h-4 text-primary" />
								<h2 className="text-base font-semibold font-heading text-foreground">
									5. Amenities & Infrastructure
								</h2>
							</div>
						</div>
						<CardContent className="p-5 sm:p-6 space-y-4">
							{/* Presets to click */}
							<div className="space-y-2">
								<span className="text-xs font-medium text-muted-foreground">
									Click preset badges to toggle features:
								</span>
								<div className="flex flex-wrap gap-2">
									{PRESET_FEATURES.map((feat) => {
										const active = features.includes(feat);
										return (
											<button
												key={feat}
												type="button"
												onClick={() => toggleFeature(feat)}
												className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all inline-flex items-center gap-1.5 cursor-pointer ${
													active
														? "bg-primary text-primary-foreground border-primary shadow-xs"
														: "bg-muted/40 hover:bg-muted text-muted-foreground border-border/60 hover:text-foreground"
												}`}
											>
												{active && <Check className="w-3 h-3" />}
												<span>{feat}</span>
											</button>
										);
									})}
								</div>
							</div>

							{/* Custom Feature Adder */}
							<div className="flex gap-2 pt-2">
								<Input
									value={newFeature}
									onChange={(e) => setNewFeature(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											addCustomFeature();
										}
									}}
									placeholder="Add custom feature (e.g. 500m to Metro Extension)..."
									className="h-10 rounded-xl bg-background border-border/70 text-xs sm:text-sm"
								/>
								<Button
									type="button"
									variant="outline"
									onClick={addCustomFeature}
									className="h-10 px-4 rounded-xl text-xs font-semibold font-heading cursor-pointer shrink-0"
								>
									<Plus className="w-4 h-4 mr-1" /> Add
								</Button>
							</div>

							{/* Active Features List */}
							<div className="pt-2">
								<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2 font-heading">
									Active Plot Badges ({features.length})
								</span>
								<div className="flex flex-wrap gap-2">
									{features.map((feat, idx) => (
										<div
											key={idx}
											className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-primary"
										>
											<span>{feat}</span>
											<button
												type="button"
												onClick={() => removeFeature(idx)}
												className="hover:text-destructive cursor-pointer"
											>
												<X className="w-3 h-3" />
											</button>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 6. Images & Gallery */}
					<Card className="border border-border/80 shadow-xs rounded-2xl bg-card overflow-hidden">
						<div className="p-5 border-b border-border/40 bg-muted/20">
							<div className="flex items-center gap-2">
								<ImageIcon className="w-4 h-4 text-primary" />
								<h2 className="text-base font-semibold font-heading text-foreground">
									6. Plot Images & Photography
								</h2>
							</div>
						</div>
						<CardContent className="p-5 sm:p-6 space-y-4">
							<div className="flex gap-2">
								<Input
									value={newImageUrl}
									onChange={(e) => setNewImageUrl(e.target.value)}
									placeholder="Paste image URL (https://...)"
									className="h-10 rounded-xl bg-background border-border/70 text-xs sm:text-sm"
								/>
								<Button
									type="button"
									variant="outline"
									onClick={() => addImage()}
									className="h-10 px-4 rounded-xl text-xs font-semibold font-heading cursor-pointer shrink-0"
								>
									<Plus className="w-4 h-4 mr-1" /> Add Image
								</Button>
							</div>

							{/* Preset Gallery Suggestions */}
							<div className="flex items-center gap-2 pt-1">
								<span className="text-[11px] text-muted-foreground font-light">
									Preset Photos:
								</span>
								{SAMPLE_PLOT_IMAGES.map((img, i) => (
									<button
										key={i}
										type="button"
										onClick={() => addImage(img)}
										className="text-[11px] text-primary hover:underline cursor-pointer"
									>
										Preset {i + 1}
									</button>
								))}
							</div>

							{/* Gallery Grid */}
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
								{images.map((img, idx) => (
									<div
										key={idx}
										className={`relative group aspect-video rounded-xl overflow-hidden border-2 bg-muted transition-all ${
											idx === 0
												? "border-primary ring-2 ring-primary/20"
												: "border-border/60 hover:border-border"
										}`}
									>
										<Image
											src={img}
											alt={`Plot ${idx + 1}`}
											fill
											className="object-cover"
										/>
										{idx === 0 && (
											<div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold font-heading px-2 py-0.5 rounded-md shadow-xs">
												Primary Cover
											</div>
										)}
										<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
											{idx !== 0 && (
												<button
													type="button"
													onClick={() => setPrimaryImage(idx)}
													className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-foreground text-[10px] font-bold cursor-pointer"
													title="Make Primary Cover"
												>
													Make Cover
												</button>
											)}
											<button
												type="button"
												onClick={() => removeImage(idx)}
												className="p-1.5 rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground cursor-pointer"
												title="Remove Image"
											>
												<Trash2 className="w-3.5 h-3.5" />
											</button>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* ── RIGHT COLUMN: STICKY LIVE PREVIEW CARD (4 COLS) ── */}
				<div className="lg:col-span-4 space-y-6">
					<div className="sticky top-6 space-y-6">
						{/* Quick Setting Controls */}
						<Card className="border border-border/80 shadow-xs rounded-2xl bg-card p-5 space-y-4">
							<h3 className="font-heading font-semibold text-sm text-foreground flex items-center gap-2">
								<ShieldCheck className="w-4 h-4 text-primary" />
								<span>Publishing Settings</span>
							</h3>

							{/* Featured toggle */}
							<label className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/60 cursor-pointer hover:bg-muted/60 transition-colors">
								<div className="space-y-0.5">
									<div className="flex items-center gap-1.5">
										<Flame className="w-3.5 h-3.5 text-amber-500" />
										<span className="text-xs font-bold font-heading text-foreground">
											Featured Listing
										</span>
									</div>
									<p className="text-[11px] text-muted-foreground font-light">
										Display in VIP Featured Plots section
									</p>
								</div>
								<input
									type="checkbox"
									checked={featured}
									onChange={(e) => setFeatured(e.target.checked)}
									className="w-4 h-4 rounded text-primary border-border focus:ring-primary cursor-pointer"
								/>
							</label>

							{/* Status indicator button */}
							<div className="pt-2">
								<Button
									type="button"
									onClick={handleSubmit}
									disabled={saving}
									className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium font-heading text-xs inline-flex items-center justify-center gap-2 shadow-md shadow-primary/25 cursor-pointer"
								>
									<Save className="w-4 h-4" />
									<span>
										{saving
											? "Saving..."
											: isEdit
												? "Save Changes"
												: "Publish Plot to Database"}
									</span>
								</Button>
								<Button
									type="button"
									variant="ghost"
									onClick={onCancel}
									className="w-full h-9 mt-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
								>
									Cancel & Return
								</Button>
							</div>
						</Card>

						{/* Live Card Preview */}
						<div className="space-y-2">
							<span className="text-xs font-medium font-heading uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
								<Eye className="w-3.5 h-3.5 text-primary" />
								<span>Live Public Preview</span>
							</span>

							<div className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-md group hover:shadow-lg transition-all">
								<div className="relative aspect-[16/10] bg-muted">
									{images[0] ? (
										<Image
											src={images[0]}
											alt={title || "Plot"}
											fill
											className="object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<Building2 className="w-8 h-8 text-muted-foreground" />
										</div>
									)}
									<div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
										<Badge
											className={`text-[10px] font-bold uppercase ${
												status === "available"
													? "bg-emerald-600 text-white"
													: status === "pending"
														? "bg-amber-600 text-white"
														: "bg-rose-600 text-white"
											}`}
										>
											{status}
										</Badge>
										{featured && (
											<Badge className="bg-amber-500 text-black text-[10px] font-bold inline-flex items-center gap-1">
												<Flame className="w-3 h-3 fill-current" />
												<span>Featured</span>
											</Badge>
										)}
									</div>
									<div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-white font-mono text-[11px] font-bold">
										{katha} Katha ({area} sqft)
									</div>
								</div>

								<div className="p-4 space-y-2.5">
									<div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
										<MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
										<span className="truncate">{location}</span>
									</div>

									<h4 className="font-semibold text-sm text-foreground line-clamp-1">
										{title || "Untitled Plot"}
									</h4>

									<div className="flex items-center gap-2 text-xs">
										<Badge
											variant="outline"
											className="text-[10px] border-border/70 font-semibold"
										>
											{roadWidth}
										</Badge>
										<Badge
											variant="outline"
											className="text-[10px] border-border/70 font-semibold"
										>
											{facing}
										</Badge>
									</div>

									<div className="pt-2 border-t border-border/50 flex items-baseline justify-between">
										<div>
											<span className="text-[10px] text-muted-foreground block">
												Total Plot Price
											</span>
											<p className="text-base font-semibold font-heading text-primary">
												{formatCurrency(parseFloat(totalPrice) || 0)}
											</p>
										</div>
										<div className="text-right">
											<span className="text-[10px] text-muted-foreground block">
												Per Katha
											</span>
											<p className="text-xs font-medium text-foreground">
												{formatCurrency(parseFloat(pricePerKatha) || 0)}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
