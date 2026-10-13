"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface ServiceItem {
	id: string;
	num?: string;
	title: string;
	titleBn?: string;
	tag: string;
	tagBn?: string;
	description: string;
	descriptionBn?: string;
	icon?: string;
	imageUrl?: string;
	pricing?: string;
	benefits: string[];
	benefitsBn?: string[];
	order: number;
	active: boolean;
}

export const DEFAULT_SERVICES: ServiceItem[] = [];

export function useServices() {
	const [services, setServices] = useState<ServiceItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchServices = useCallback(async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{
				success: boolean;
				services?: ServiceItem[];
			}>("/services");
			const items = Array.isArray(res?.services)
				? res.services
				: Array.isArray(res)
					? (res as any)
					: [];
			setServices(items);
		} catch (err: any) {
			console.error("[useServices] Failed to fetch services:", err);
			setError(err.message || "Failed to load services");
			setServices([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchServices();
	}, [fetchServices]);

	const createService = useCallback(async (data: Omit<ServiceItem, "id">) => {
		try {
			const res = await apiFetch<{ success: boolean; service?: ServiceItem }>(
				"/services",
				{
					method: "POST",
					body: JSON.stringify(data),
				},
			);
			if (res && res.service) {
				setServices((prev) => [...prev, res.service!]);
				return res.service;
			}
		} catch (err: any) {
			console.error("[useServices] Failed to create service:", err);
			throw err;
		}
	}, []);

	const updateService = useCallback(
		async (id: string, data: Partial<ServiceItem>) => {
			try {
				const res = await apiFetch<{ success: boolean; service?: ServiceItem }>(
					`/services/${id}`,
					{
						method: "PUT",
						body: JSON.stringify(data),
					},
				);
				if (res && res.service) {
					setServices((prev) =>
						prev.map((s) => (s.id === id ? res.service! : s)),
					);
				} else {
					setServices((prev) =>
						prev.map((s) => (s.id === id ? { ...s, ...data } : s)),
					);
				}
				return true;
			} catch (err: any) {
				console.error("[useServices] Failed to update service:", err);
				throw err;
			}
		},
		[],
	);

	const deleteService = useCallback(async (id: string) => {
		try {
			await apiFetch(`/services/${id}`, { method: "DELETE" });
			setServices((prev) => prev.filter((s) => s.id !== id));
			return true;
		} catch (err: any) {
			console.error("[useServices] Failed to delete service:", err);
			throw err;
		}
	}, []);

	return {
		services,
		loading,
		error,
		refetch: fetchServices,
		createService,
		updateService,
		deleteService,
	};
}
