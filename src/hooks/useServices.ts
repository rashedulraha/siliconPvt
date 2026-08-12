"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface ServiceItem {
	id: string;
	num?: string;
	title: string;
	tag: string;
	description: string;
	icon?: string;
	imageUrl?: string;
	pricing?: string;
	benefits: string[];
	order: number;
	active: boolean;
}

export const DEFAULT_SERVICES: ServiceItem[] = [
	{
		id: "serv-1",
		num: "01",
		title: "Residential Plot Sales",
		tag: "Primary Plot Allotments",
		description:
			"We offer legally verified, risk-free, and register-ready residential plots of various sizes. Every plot is selected with high consideration for premium communication layouts, eco-friendly zoning, and unmatched future asset appreciation.",
		benefits: [
			"100% risk-free land investment",
			"Dispute-free ownership with instant registry readiness",
			"Located in high-growth suburban zones next to central Dhaka",
		],
		order: 1,
		active: true,
	},
	{
		id: "serv-2",
		num: "02",
		title: "Planned Residential Projects",
		tag: "Modern Housing Township",
		description:
			"We implement highly modern housing communities like 'Silicon City,' blending state-of-the-art urban architecture with natural serenity. Our township plans incorporate essential civil facilities to elevate the standards of living.",
		benefits: [
			"Grand Central Mosque and block-based mosques",
			"Lush green playgrounds, parks, and dedicated Football and Cricket fields",
			"Planned spaces for modern School, College, Hospital, and Local Markets",
		],
		order: 2,
		active: true,
	},
	{
		id: "serv-3",
		num: "03",
		title: "Land Acquisition & Development",
		tag: "Soil Earthwork & Elevation",
		description:
			"We handle strategic land scouting, absolute deed clearance, and professional land development. Our expert engineering team executes systematic soil filling to prepare solid elevated ground for permanent home construction.",
		benefits: [
			"Earth-filling up to a safe height of 16 to 18 feet",
			"Developing wide internal roads of 30 feet and 40 feet within the blocks",
			"Adhering strictly to structural safety guidelines and community development blueprints",
		],
		order: 3,
		active: true,
	},
	{
		id: "serv-4",
		num: "04",
		title: "Legal Documentation & Registration",
		tag: "Deed Vetting & Title Search",
		description:
			"Navigating property laws in Bangladesh can be challenging. Our specialized legal and documentation team provides full-scale assistance to verify deed history, ensure flawless title ownership, and complete hassle-free registration.",
		benefits: [
			"In-depth deed vetting and title search history clearance",
			"Hassle-free registry and official mutation processing",
			"Securing official clearance certificates (NOC) and legal safety",
		],
		order: 4,
		active: true,
	},
	{
		id: "serv-5",
		num: "05",
		title: "Real Estate Investment Consultancy",
		tag: "High ROI Property Advisory",
		description:
			"We provide personalized property advisory services to match your exact budget, housing requirements, and long-term financial goals. Our expert insights ensure you buy property that guarantees maximum security and high return-on-investment (ROI).",
		benefits: [
			"Optimizing budget models for land buying",
			"Guiding first-time land buyers through complex property regulations",
			"Identifying high-ROI land segments within our projects",
		],
		order: 5,
		active: true,
	},
	{
		id: "serv-6",
		num: "06",
		title: "Easy Installment Facility",
		tag: "Flexible Payment Schemes",
		description:
			"To make your dream address a reality, we offer flexible and hassle-free payment schemes. Our installment packages are designed carefully to ease your financial burden, allowing you to invest gradually without stress.",
		benefits: [
			"Low initial deposit/booking fees",
			"Planned financial management with custom monthly or quarterly installments",
			"No hidden charges, ensuring 100% transparency",
		],
		order: 6,
		active: true,
	},
	{
		id: "serv-7",
		num: "07",
		title: "Dedicated Post-Sales Support",
		tag: "Demarcation & Utility Setup",
		description:
			"Our commitment to you does not end at property booking. We provide continuous assistance throughout physical plot demarcation, boundary wall setups, and utility connection planning.",
		benefits: [
			"Physical demarcation of your plot boundaries on site",
			"Coordination for shared boundary wall constructions",
			"Sincere and rapid customer dispute resolution by a professional desk",
		],
		order: 7,
		active: true,
	},
];

export function useServices() {
	const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchServices = useCallback(async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{ success: boolean; services?: ServiceItem[] }>(
				"/services",
			);
			if (res && res.success && res.services && res.services.length > 0) {
				setServices(res.services);
			}
		} catch (err: any) {
			console.error("[useServices] Failed to fetch services:", err);
			setError(err.message || "Failed to load services");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchServices();
	}, [fetchServices]);

	const createService = useCallback(
		async (data: Omit<ServiceItem, "id">) => {
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
		},
		[],
	);

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
