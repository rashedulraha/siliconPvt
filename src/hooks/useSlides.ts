"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface Slide {
	id: string;
	title: string;
	subtitle?: string;
	image: string;
	badge?: string;
	link?: string;
	active: boolean;
	order: number;
	createdAt?: string;
	updatedAt?: string;
}

export function useSlides() {
	const [slides, setSlides] = useState<Slide[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchSlides = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const res = await apiFetch<{
				success: boolean;
				slides?: Slide[];
				data?: Slide[];
			}>("/slides");

			const items = res.slides || res.data || [];
			setSlides(items);
		} catch (err: any) {
			console.error("[useSlides] Error fetching slides:", err);
			setError(err.message || "Failed to load hero slides from database.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchSlides();
	}, [fetchSlides]);

	const createSlide = useCallback(
		async (slideData: Omit<Slide, "id" | "createdAt" | "updatedAt">) => {
			const res = await apiFetch<{ success: boolean; slide: Slide }>("/slides", {
				method: "POST",
				body: JSON.stringify(slideData),
			});
			if (res && res.slide) {
				setSlides((prev) => [...prev, res.slide]);
				return res.slide;
			}
			throw new Error("Failed to create slide");
		},
		[],
	);

	const updateSlide = useCallback(
		async (id: string, slideData: Partial<Slide>) => {
			const res = await apiFetch<{ success: boolean; slide: Slide }>(
				`/slides/${id}`,
				{
					method: "PUT",
					body: JSON.stringify(slideData),
				},
			);
			if (res && res.slide) {
				setSlides((prev) =>
					prev.map((s) => (s.id === id ? { ...s, ...res.slide } : s)),
				);
				return res.slide;
			}
			throw new Error("Failed to update slide");
		},
		[],
	);

	const deleteSlide = useCallback(async (id: string) => {
		await apiFetch(`/slides/${id}`, {
			method: "DELETE",
		});
		setSlides((prev) => prev.filter((s) => s.id !== id));
		return true;
	}, []);

	return {
		slides,
		loading,
		error,
		refetch: fetchSlides,
		createSlide,
		updateSlide,
		deleteSlide,
	};
}
