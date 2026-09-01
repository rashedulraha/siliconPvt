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
	masterPlanBadge: string;
	masterPlanTitle: string;
	masterPlanDesc: string;
	masterPlanImage: string;
	amenitiesBadge: string;
	amenitiesTitle: string;
	amenitiesDesc: string;
	showcaseBadge: string;
	showcaseTitle: string;
	showcaseDesc: string;
	trackRecordTitle: string;
	trackRecordDesc: string;
	trustCounters: TrustCounterItem[];
	accreditations: string[];
	ctaTitle: string;
	ctaDesc: string;
	ctaButtonText: string;
	ctaButtonLink: string;
	sectionsConfig?: any;
}

export const DEFAULT_HOME_DATA: HomeContentData = {
	heroBadge: "PLANNED ECO-TOWNSHIPS & RESIDENTIAL PLOTS",
	heroTitle: "Silicon City — Master Planned Township",
	heroSubtitle: "Silicon Real Estate (Pvt.) Ltd.",
	heroDesc:
		"Experience modern urban planning with 16–18ft high elevation, 30ft/40ft wide internal concrete roads, and clear legal title mutation in Savar, adjacent to Mohammadpur, Dhaka.",
	heroCtaText: "EXPLORE PROJECTS",
	heroCtaLink: "/projects",
	masterPlanBadge: "MASTER PLAN",
	masterPlanTitle: "At a Glance: Township Layout",
	masterPlanDesc:
		"Meticulously planned master layout featuring 30ft & 40ft wide avenues, optimal sunlight orientation, and eco-zoning for every plot.",
	masterPlanImage:
		"https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200",
	amenitiesBadge: "LIFESTYLE AMENITIES",
	amenitiesTitle: "Integrated Modern Civic Amenities",
	amenitiesDesc:
		"Dedicated Central Mosque, Grand Athletics Sports Ground, Riverfront Green Eco Parks, School & Medical Centers inside the boundary.",
	showcaseBadge: "FLAGSHIP TOWNSHIP",
	showcaseTitle: "Silicon City — Planned Eco-Township",
	showcaseDesc:
		"Located at Bara Badeshi Mouza, Savar, Dhaka — strategically positioned adjacent to Mohammadpur Beribadh along the scenic Turag River.",
	trackRecordTitle: "Proven Trust & Excellence in Numbers",
	trackRecordDesc:
		"Over a decade of ethical land development, legally verified ownership, and planned community building.",
	trustCounters: [
		{
			value: "150+ Acres",
			label: "Planned Township Area",
			detail: "Total Masterplan Area",
		},
		{
			value: "16–18 ft",
			label: "Elevated Soil Earthwork",
			detail: "Monsoon Flood Protected",
		},
		{
			value: "30ft & 40ft",
			label: "Internal Avenue Roads",
			detail: "Smooth Vehicular Access",
		},
		{
			value: "100% Ready",
			label: "Clear Title & Mutation",
			detail: "Instant Deed Registry",
		},
	],
	accreditations: [
		"RAJUK Masterplan Compliant",
		"Flood Protected Embankment Zone",
		"Clear CS, SA, RS, BS Title Mutation",
		"Direct Mohammadpur Bridge Access Link",
		"Dedicated Mosque & Sports Complex",
		"Modern Hospital & School Reserved Zones",
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

	const updateContent = useCallback(
		async (updated: Partial<HomeContentData>) => {
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
		},
		[],
	);

	return {
		data,
		loading,
		error,
		refetch: fetchContent,
		updateContent,
	};
}
