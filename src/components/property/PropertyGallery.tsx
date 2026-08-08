"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
	images: string[];
	title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
	const [activeIndex, setActiveIndex] = useState(0);

	if (images.length === 0) {
		return (
			<div className="aspect-[16/9] rounded-xl bg-muted flex items-center justify-center">
				<span className="text-muted-foreground">No images available</span>
			</div>
		);
	}

	const next = () => setActiveIndex((i) => (i + 1) % images.length);
	const prev = () =>
		setActiveIndex((i) => (i - 1 + images.length) % images.length);

	return (
		<div className="space-y-3">
			{/* Main Image */}
			<div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted group">
				<Image
					src={images[activeIndex]}
					alt={`${title} - image ${activeIndex + 1}`}
					fill
					sizes="(max-width: 1024px) 100vw, 70vw"
					className="object-cover"
					priority
				/>
				{images.length > 1 && (
					<>
						<button
							onClick={prev}
							className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-background"
							aria-label="Previous image"
						>
							<ChevronLeft className="h-5 w-5" />
						</button>
						<button
							onClick={next}
							className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-background"
							aria-label="Next image"
						>
							<ChevronRight className="h-5 w-5" />
						</button>
						<div className="absolute bottom-3 right-3 rounded-md bg-background/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium">
							{activeIndex + 1} / {images.length}
						</div>
					</>
				)}
			</div>

			{/* Thumbnails */}
			{images.length > 1 && (
				<div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
					{images.map((img, idx) => (
						<button
							key={idx}
							onClick={() => setActiveIndex(idx)}
							className={cn(
								"relative aspect-[4/3] rounded-md overflow-hidden bg-muted border-2 transition-all",
								activeIndex === idx
									? "border-primary ring-2 ring-primary/20"
									: "border-transparent opacity-70 hover:opacity-100",
							)}
						>
							<Image
								src={img}
								alt={`${title} thumbnail ${idx + 1}`}
								fill
								sizes="15vw"
								className="object-cover"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
