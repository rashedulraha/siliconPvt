"use client";

import { useState, useEffect, useCallback } from "react";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS, SITE_CONFIG } from "@/utils/constants";
import { Analytics } from "@/lib/analytics";
import type { ComparisonItem } from "@/types";

export function useComparison() {
	const [items, setItems] = useState<ComparisonItem[]>([]);
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		const saved = storage.get<ComparisonItem[]>(STORAGE_KEYS.COMPARISON, []);
		setItems(saved);
		setIsHydrated(true);
	}, []);

	const persist = useCallback((next: ComparisonItem[]) => {
		setItems(next);
		storage.set(STORAGE_KEYS.COMPARISON, next);
	}, []);

	const isCompared = useCallback(
		(propertyId: string) => items.some((i) => i.propertyId === propertyId),
		[items],
	);

	const toggleCompare = useCallback(
		(propertyId: string): { success: boolean; message?: string } => {
			const exists = items.some((i) => i.propertyId === propertyId);
			if (exists) {
				persist(items.filter((i) => i.propertyId !== propertyId));
				return { success: true };
			} else {
				if (items.length >= SITE_CONFIG.PROPERTY_COMPARE_LIMIT) {
					return {
						success: false,
						message: `You can compare up to ${SITE_CONFIG.PROPERTY_COMPARE_LIMIT} properties at a time. Remove one to add another.`,
					};
				}
				const next = [
					{ propertyId, addedAt: new Date().toISOString() },
					...items,
				];
				persist(next);
				Analytics.comparisonAdd(propertyId);
				return { success: true };
			}
		},
		[items, persist],
	);

	const removeCompare = useCallback(
		(propertyId: string) => {
			persist(items.filter((i) => i.propertyId !== propertyId));
		},
		[items, persist],
	);

	const clearAll = useCallback(() => {
		persist([]);
	}, [persist]);

	const compareIds = items.map((i) => i.propertyId);

	return {
		items,
		compareIds,
		isCompared,
		toggleCompare,
		removeCompare,
		clearAll,
		count: items.length,
		limit: SITE_CONFIG.PROPERTY_COMPARE_LIMIT,
		isHydrated,
	};
}
