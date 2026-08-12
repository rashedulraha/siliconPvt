"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface TrustCounterItem {
	value: string;
	label: string;
	detail: string;
}

export interface HomeContentData {
	id?: string;
	heroBadge: string;
	heroTitle: string;
	heroSubtitle: string;
	heroDesc: string;
	heroCtaText: string;
	heroCtaLink: string;
	trackRecordTitle: string;
	trackRecordDesc: string;
	trustCounters: TrustCounterItem[];
	accreditations: string[];
	ctaTitle: string;
	ctaDesc: string;
	ctaButtonText: string;
	ctaButtonLink: string;
}

export const DEFAULT_HOME_DATA: HomeContentData = {
	heroBadge: "FEATURED REAL ESTATE INVENTORY",
	heroTitle: "Prime Registered Land & Property Listings",
	heroSubtitle: "Silicon Real Estate (Pvt.) Ltd.",
	heroDesc:
		"Hand-picked, 100% legally verified residential & commercial plots in Dhaka. Managed live via database.",
	heroCtaText: "EXPLORE PROJECTS",
	heroCtaLink: "/projects",
	trackRecordTitle: "Proven Trust & Excellence in Numbers",
	trackRecordDesc:
		"Over a decade of ethical land development, legally verified ownership, and planned community building.",
	trustCounters: [
		{
			value: "10+",
			label: "Years of Professional Experience & Ethics",
			detail: "10+ Years Dedicated Service",
		},
		{
			value: "1000+",
			label: "Happy Clients Secured Future Address",
			detail: "1,000+ Plot Allotments",
		},
		{
			value: "15+",
			label: "Completed & Ongoing Development Projects",
			detail: "15+ Flagship Townships",
		},
		{
			value: "100%",
			label: "Legally Sound Deed Registries Completed",
			detail: "100% Legal Ownership",
		},
	],
	accreditations: [
		"RAJUK Compliant Planning",
		"REHAB Member Organization",
		"ISO 9001:2015 Certified Management",
		"Government Authorized Land Developer",
		"100% Legal Ownership Clearance Certified",
	],
	ctaTitle: "Ready to Secure Your Plot in Silicon City?",
	ctaDesc:
		"Schedule a physical site visit with free transport from our Mohammadpur corporate office.",
	ctaButtonText: "SCHEDULE SITE VISIT",
	ctaButtonLink: "/contact?type=visit",
};

export function useHomeContent() {
	const [data, setData] = useState<HomeContentData>(DEFAULT_HOME_DATA);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchContent = useCallback(async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{
				success: boolean;
				content?: HomeContentData;
			}>("/home-content");
			if (res && res.success && res.content) {
				setData({
					...DEFAULT_HOME_DATA,
					...res.content,
					trustCounters: Array.isArray(res.content.trustCounters)
						? res.content.trustCounters
						: DEFAULT_HOME_DATA.trustCounters,
					accreditations: Array.isArray(res.content.accreditations)
						? res.content.accreditations
						: DEFAULT_HOME_DATA.accreditations,
				});
			}
		} catch (err: any) {
			console.error("[useHomeContent] Failed to fetch home content:", err);
			setError(err.message || "Failed to load home content");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchContent();
	}, [fetchContent]);

	const updateContent = useCallback(async (updated: Partial<HomeContentData>) => {
		try {
			const res = await apiFetch<{
				success: boolean;
				content?: HomeContentData;
			}>("/home-content", {
				method: "PUT",
				body: JSON.stringify(updated),
			});
			if (res && res.content) {
				setData((prev) => ({ ...prev, ...res.content }));
			} else {
				setData((prev) => ({ ...prev, ...updated }));
			}
			return true;
		} catch (err: any) {
			console.error("[useHomeContent] Failed to update home content:", err);
			throw err;
		}
	}, []);

	return {
		data,
		loading,
		error,
		refetch: fetchContent,
		updateContent,
	};
}
