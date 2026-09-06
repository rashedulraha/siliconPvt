"use client";

import React, { useState, useRef } from "react";
import {
	UploadCloud,
	Loader2,
	Trash2,
	ExternalLink,
	Copy,
	Check,
	Link as LinkIcon,
	ImageIcon,
	AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
	value?: string;
	onChange: (url: string) => void;
	label?: string;
	description?: string;
	placeholder?: string;
	className?: string;
	aspectRatio?: "video" | "square" | "banner" | "auto";
}

export function ImageUpload({
	value = "",
	onChange,
	label,
	description,
	placeholder = "Upload image or paste direct URL",
	className = "",
	aspectRatio = "video",
}: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isDragOver, setIsDragOver] = useState(false);
	const [copied, setCopied] = useState(false);
	const [mode, setMode] = useState<"upload" | "url">("upload");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = async (file: File) => {
		if (!file) return;

		// Validate file type
		if (!file.type.startsWith("image/")) {
			setError("Please select a valid image file (PNG, JPG, WebP, etc.).");
			return;
		}

		// Validate file size (max 32MB for ImgBB)
		if (file.size > 32 * 1024 * 1024) {
			setError("Image size exceeds 32MB limit.");
			return;
		}

		setError(null);
		setIsUploading(true);
		setUploadProgress("Uploading to ImgBB CDN...");

		try {
			// Convert file to base64
			const reader = new FileReader();
			const base64Promise = new Promise<string>((resolve, reject) => {
				reader.onload = () => resolve(reader.result as string);
				reader.onerror = reject;
			});
			reader.readAsDataURL(file);
			const base64Data = await base64Promise;

			// Retrieve saved key from localStorage if present
			const localKey =
				typeof window !== "undefined"
					? localStorage.getItem("silicon_imgbb_api_key") || ""
					: "";

			const headers: Record<string, string> = {
				"Content-Type": "application/json",
			};
			if (localKey) {
				headers["x-imgbb-key"] = localKey;
			}

			// Fallback token for admin authorization if stored
			const token =
				typeof window !== "undefined"
					? localStorage.getItem("silicon_jwt_token")
					: null;
			if (token) {
				headers["Authorization"] = `Bearer ${token}`;
			}

			const res = await fetch("/api/upload", {
				method: "POST",
				headers,
				body: JSON.stringify({
					image: base64Data,
					name: file.name,
				}),
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				throw new Error(data.error || "Upload failed. Please try again.");
			}

			if (data.url) {
				onChange(data.url);
				setUploadProgress("Uploaded successfully!");
				setTimeout(() => setUploadProgress(""), 2000);
			} else {
				throw new Error("No URL returned from upload server.");
			}
		} catch (err: any) {
			console.error("[ImageUpload] Error:", err);
			setError(err.message || "Failed to upload image. Please try again.");
		} finally {
			setIsUploading(false);
		}
	};

	const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files[0]) {
			handleFileSelect(files[0]);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
		const files = e.dataTransfer.files;
		if (files && files[0]) {
			handleFileSelect(files[0]);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const handleCopy = () => {
		if (!value) return;
		navigator.clipboard.writeText(value);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleRemove = () => {
		onChange("");
		setError(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	// Determine aspect ratio class
	const aspectClass =
		aspectRatio === "video"
			? "aspect-video"
			: aspectRatio === "square"
				? "aspect-square"
				: aspectRatio === "banner"
					? "aspect-[21/9]"
					: "h-48";

	return (
		<div className={`space-y-2.5 text-left ${className}`}>
			{/* Header Strip */}
			{(label || description) && (
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
					<div>
						{label && (
							<label className="text-xs font-semibold font-heading text-foreground uppercase tracking-wide block">
								{label}
							</label>
						)}
						{description && (
							<p className="text-[11px] text-muted-foreground font-light">
								{description}
							</p>
						)}
					</div>

					{/* Toggle upload vs URL mode */}
					<div className="flex items-center gap-1.5 self-start sm:self-auto">
						<button
							type="button"
							onClick={() => setMode(mode === "upload" ? "url" : "upload")}
							className="text-[11px] font-heading font-medium text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
						>
							{mode === "upload" ? (
								<>
									<LinkIcon className="w-3 h-3" />
									<span>Enter URL directly</span>
								</>
							) : (
								<>
									<UploadCloud className="w-3 h-3" />
									<span>Upload Image File</span>
								</>
							)}
						</button>
					</div>
				</div>
			)}

			{/* Direct URL Input Mode */}
			{mode === "url" && (
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Input
							type="url"
							value={value}
							onChange={(e) => onChange(e.target.value)}
							placeholder="https://i.ibb.co/... or any image URL"
							className="text-xs font-mono"
						/>
						{value && (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={handleRemove}
								className="shrink-0 h-9 w-9 text-destructive hover:bg-destructive/10"
								title="Clear URL"
							>
								<Trash2 className="w-4 h-4" />
							</Button>
						)}
					</div>
				</div>
			)}

			{/* Upload / Preview Card */}
			<div className="relative">
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={onFileInputChange}
					className="hidden"
				/>

				{/* 1. Existing Image Preview State */}
				{value && !isUploading ? (
					<div className="group relative rounded-2xl overflow-hidden border border-border/80 bg-muted/30 shadow-2xs">
						<div
							className={`relative w-full ${aspectClass} max-h-64 overflow-hidden bg-black/5 flex items-center justify-center`}
						>
							<img
								src={value}
								alt="Uploaded Preview"
								className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
								onError={(e) => {
									// Fallback if broken image URL
									(e.target as HTMLElement).style.display = "none";
								}}
							/>

							{/* Gradient Vignette on Hover */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5" />

							{/* Floating Overlay Controls on Top */}
							<div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
								<a
									href={value}
									target="_blank"
									rel="noreferrer"
									className="h-8 px-2.5 rounded-lg bg-black/70 hover:bg-black text-white text-[11px] font-medium backdrop-blur-md border border-white/20 inline-flex items-center gap-1 transition-all shadow-xs"
									title="Open full size in new tab"
								>
									<ExternalLink className="w-3 h-3" />
									<span className="hidden sm:inline">View</span>
								</a>

								<button
									type="button"
									onClick={handleCopy}
									className="h-8 px-2.5 rounded-lg bg-black/70 hover:bg-black text-white text-[11px] font-medium backdrop-blur-md border border-white/20 inline-flex items-center gap-1 transition-all shadow-xs cursor-pointer"
									title="Copy image URL"
								>
									{copied ? (
										<Check className="w-3 h-3 text-emerald-400" />
									) : (
										<Copy className="w-3 h-3" />
									)}
									<span className="hidden sm:inline">
										{copied ? "Copied!" : "Copy"}
									</span>
								</button>

								<Button
									type="button"
									size="icon"
									variant="destructive"
									onClick={handleRemove}
									className="h-8 w-8 rounded-lg shadow-xs"
									title="Remove image"
								>
									<Trash2 className="w-3.5 h-3.5" />
								</Button>
							</div>

							{/* Bottom Bar Details on Hover */}
							<div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
								<span className="text-[10px] font-mono text-white/90 truncate max-w-[65%] drop-shadow-sm">
									{value}
								</span>

								<Button
									type="button"
									size="sm"
									onClick={() => fileInputRef.current?.click()}
									className="h-7 px-2.5 text-[11px] gap-1 font-heading"
								>
									<UploadCloud className="w-3 h-3" />
									<span>Replace</span>
								</Button>
							</div>
						</div>
					</div>
				) : isUploading ? (
					/* 2. Uploading Progress State */
					<div
						className={`w-full ${aspectClass} max-h-64 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 flex flex-col items-center justify-center p-6 text-center space-y-3 transition-all`}
					>
						<div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
							<Loader2 className="w-6 h-6 animate-spin text-primary" />
						</div>
						<div className="space-y-1">
							<p className="text-xs font-semibold font-heading text-foreground">
								Uploading Image to ImgBB CDN...
							</p>
							<p className="text-[11px] text-muted-foreground font-light">
								{uploadProgress ||
									"Please wait while image is being optimized and hosted."}
							</p>
						</div>
					</div>
				) : (
					/* 3. Empty Upload Dropzone State */
					<div
						onDrop={handleDrop}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onClick={() => fileInputRef.current?.click()}
						className={`w-full ${aspectClass} max-h-56 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer flex flex-col items-center justify-center p-6 text-center space-y-3 ${
							isDragOver
								? "border-primary bg-primary/10 scale-[1.01]"
								: "border-border/80 hover:border-primary/50 bg-card hover:bg-muted/40"
						}`}
					>
						<div className="w-11 h-11 rounded-2xl bg-muted border border-border/80 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
							<UploadCloud className="w-5 h-5 text-primary" />
						</div>

						<div className="space-y-1 max-w-sm">
							<p className="text-xs font-semibold font-heading text-foreground">
								Click to upload or drag and drop image here
							</p>
							<p className="text-[11px] text-muted-foreground font-light">
								Supports PNG, JPG, WebP, SVG up to 32MB. Uploads directly to
								ImgBB CDN.
							</p>
						</div>

						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/60 border border-border/60 text-[10px] font-mono text-muted-foreground">
							<span>ImgBB Cloud Hosting</span>
							<span>•</span>
							<span>Instant Live Sync</span>
						</div>
					</div>
				)}
			</div>

			{/* Error Notice */}
			{error && (
				<div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center justify-between gap-2">
					<div className="flex items-center gap-1.5">
						<AlertCircle className="w-4 h-4 shrink-0" />
						<span className="font-light">{error}</span>
					</div>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => setError(null)}
						className="h-6 px-2 text-[10px] text-destructive hover:bg-destructive/10"
					>
						Dismiss
					</Button>
				</div>
			)}
		</div>
	);
}
