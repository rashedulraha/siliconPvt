"use client";

import { useState, useRef } from "react";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MediaUploaderProps {
	onFileUpload: (files: FileList) => Promise<void>;
	onUrlAdd: (url: string) => void;
	isUploading?: boolean;
}

export function MediaUploader({
	onFileUpload,
	onUrlAdd,
	isUploading,
}: MediaUploaderProps) {
	const [url, setUrl] = useState("");
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		if (e.dataTransfer.files.length > 0) {
			onFileUpload(e.dataTransfer.files);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			onFileUpload(e.target.files);
			e.target.value = "";
		}
	};

	const handleUrlAdd = () => {
		if (url.trim()) {
			onUrlAdd(url.trim());
			setUrl("");
		}
	};

	return (
		<div className="space-y-3">
			{/* Drop zone */}
			<div
				onDragOver={(e) => {
					e.preventDefault();
					setIsDragging(true);
				}}
				onDragLeave={() => setIsDragging(false)}
				onDrop={handleDrop}
				onClick={() => fileInputRef.current?.click()}
				className={cn(
					"relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors",
					isDragging
						? "border-primary bg-primary/5"
						: "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
				)}
			>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					multiple
					onChange={handleFileChange}
					className="hidden"
				/>
				<Upload
					className={cn(
						"h-10 w-10 mx-auto mb-3 transition-colors",
						isDragging ? "text-primary" : "text-muted-foreground",
					)}
				/>
				<p className="font-medium">
					{isUploading ? "Uploading..." : "Drop images here or click to browse"}
				</p>
				<p className="text-sm text-muted-foreground mt-1">
					JPG, PNG, WEBP, GIF • Max 2MB per file
				</p>
			</div>

			{/* URL input */}
			<div className="flex gap-2">
				<div className="relative flex-1">
					<LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						placeholder="Or paste an image URL..."
						className="pl-10"
					/>
				</div>
				<Button onClick={handleUrlAdd} variant="outline" disabled={!url.trim()}>
					Add URL
				</Button>
			</div>
		</div>
	);
}
