"use client";

import { useCallback, useMemo } from "react";
import { useCMS } from "@/context/CMSContext";
import type { Property } from "@/types";
import { generateId, slugify } from "@/lib/utils";
import { apiFetch } from "@/lib/api-client";

export function useProperties() {
	const { state, dispatch, refetchProperties } = useCMS();

	const addProperty = useCallback(
		async (data: Omit<Property, "id" | "slug" | "createdAt" | "updatedAt">) => {
			const now = new Date().toISOString();
			const tempProperty: Property = {
				...data,
				id: generateId(),
				slug: slugify(data.title),
				createdAt: now,
				updatedAt: now,
			};
			dispatch({ type: "ADD_PROPERTY", payload: tempProperty });

			try {
				const response = await apiFetch<{
					success: boolean;
					property?: any;
				}>("/properties", {
					method: "POST",
					body: JSON.stringify(data),
				});
				if (response.success && response.property) {
					refetchProperties();
				}
			} catch (err) {
				console.error(
					"[useProperties] Failed to persist property to backend DB:",
					err,
				);
			}

			return tempProperty;
		},
		[dispatch, refetchProperties],
	);

	const updateProperty = useCallback(
		async (id: string, data: Partial<Property>) => {
			const existing = state.properties.find((p) => p.id === id);
			if (!existing) return null;
			const updated: Property = {
				...existing,
				...data,
				slug: data.title ? slugify(data.title) : existing.slug,
				updatedAt: new Date().toISOString(),
			};
			dispatch({ type: "UPDATE_PROPERTY", payload: updated });

			try {
				await apiFetch(`/properties/${id}`, {
					method: "PUT",
					body: JSON.stringify({
						...data,
						areaSqFt: data.area ?? (data as any)?.areaSqFt,
					}),
				});
				refetchProperties();
			} catch (err) {
				console.warn(
					"[useProperties] Backend update skipped, state persisted locally:",
					err,
				);
			}

			return updated;
		},
		[state.properties, dispatch, refetchProperties],
	);

	const patchProperty = useCallback(
		async (id: string, partialData: Partial<Property>) => {
			const existing = state.properties.find((p) => p.id === id);
			if (!existing) return null;
			
			dispatch({
				type: "PATCH_PROPERTY",
				payload: { id, data: partialData },
			});

			try {
				await apiFetch(`/properties/${id}`, {
					method: "PATCH",
					body: JSON.stringify({
						...partialData,
						areaSqFt: partialData.area ?? (partialData as any)?.areaSqFt,
					}),
				});
			} catch (err) {
				console.warn(
					"[useProperties] Backend patch skipped, state patched locally:",
					err,
				);
			}

			return { ...existing, ...partialData };
		},
		[state.properties, dispatch],
	);

	const deleteProperty = useCallback(
		async (id: string) => {
			dispatch({ type: "DELETE_PROPERTY", payload: id });
			try {
				await apiFetch(`/properties/${id}`, {
					method: "DELETE",
				});
				refetchProperties();
			} catch (err) {
				console.warn(
					"[useProperties] Backend delete skipped, removed locally:",
					err,
				);
			}
		},
		[dispatch, refetchProperties],
	);

	const getPropertyById = useCallback(
		(id: string) => state.properties.find((p) => p.id === id),
		[state.properties],
	);

	const getPropertyBySlug = useCallback(
		(slug: string) => state.properties.find((p) => p.slug === slug),
		[state.properties],
	);

	const getPropertiesByType = useCallback(
		(type: "sale" | "rent") => state.properties.filter((p) => p.type === type),
		[state.properties],
	);

	const getPropertiesByCategory = useCallback(
		(category: Property["category"]) =>
			state.properties.filter((p) => p.category === category),
		[state.properties],
	);

	const getFeaturedProperties = useCallback(
		(limit = 6) =>
			state.properties.filter((p) => p.status === "available").slice(0, limit),
		[state.properties],
	);

	const searchProperties = useCallback(
		(query: string) => {
			const q = query.toLowerCase().trim();
			if (!q) return state.properties;
			return state.properties.filter(
				(p) =>
					p.title.toLowerCase().includes(q) ||
					p.location.toLowerCase().includes(q) ||
					p.description.toLowerCase().includes(q) ||
					(p.address && p.address.toLowerCase().includes(q)),
			);
		},
		[state.properties],
	);

	const stats = useMemo(() => {
		const total = state.properties.length;
		const available = state.properties.filter(
			(p) => p.status === "available",
		).length;
		const forSale = state.properties.filter((p) => p.type === "sale").length;
		const forRent = state.properties.filter((p) => p.type === "rent").length;
		return { total, available, forSale, forRent };
	}, [state.properties]);

	return {
		properties: state.properties,
		stats,
		addProperty,
		updateProperty,
		patchProperty,
		deleteProperty,
		getPropertyById,
		getPropertyBySlug,
		getPropertiesByType,
		getPropertiesByCategory,
		getFeaturedProperties,
		searchProperties,
	};
}
