"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface TrustMetric {
	value: string;
	label: string;
}

export interface SpecItem {
	num: string;
	title: string;
	desc: string;
}

export interface CategoryItem {
	title: string;
	tag: string;
	desc: string;
	features: string[];
}

export interface AmenityItem {
	title: string;
	desc: string;
	tag: string;
	icon?: string;
}

export interface ProximityItem {
	category: string;
	items: { name: string; dist: string }[];
}

export interface RoadmapStep {
	step: string;
	title: string;
	desc: string;
}

export interface ProjectsContentData {
	id?: string;
	heroTitle: string;
	heroSubtitle: string;
	heroDesc: string;
	trustMetrics: TrustMetric[];
	spotlightBadge: string;
	spotlightTitle: string;
	spotlightDesc: string;
	spotlightTag: string;
	spotlightBoxTitle: string;
	spotlightBoxDesc: string;
	spotlightLocation: string;
	spotlightBadge2: string;
	specs: SpecItem[];
	categories: CategoryItem[];
	amenities: AmenityItem[];
	proximities: ProximityItem[];
	roadmap: RoadmapStep[];
	ctaBadge: string;
	ctaTitle: string;
	ctaDesc: string;
	ctaHotline: string;
	ctaEmail: string;
	ctaOffice: string;
}

export const DEFAULT_PROJECTS_CONTENT: ProjectsContentData = {
	heroTitle: "Master Planned Townships &",
	heroSubtitle: "Prime Land Developments",
	heroDesc:
		"Silicon Real Estate (Pvt.) Ltd. develops legally secure, environment-friendly, and flood-protected mega townships designed for peaceful living and high-yielding real estate investments in Dhaka.",
	trustMetrics: [
		{ value: "150+ Acres", label: "Planned Township Area" },
		{ value: "16–18 ft", label: "Elevated Soil Earthwork" },
		{ value: "30ft & 40ft", label: "Internal Avenue Roads" },
		{ value: "100% Ready", label: "Clear Title & Mutation" },
	],
	spotlightBadge: "FLAGSHIP TOWNSHIP",
	spotlightTitle: "Silicon City — Planned Eco-Township",
	spotlightDesc:
		"Located at Bara Badeshi Mouza, Savar, Dhaka — strategically positioned adjacent to Mohammadpur Beribadh along the scenic Turag River.",
	spotlightTag: "ONGOING MEGA PROJECT",
	spotlightBoxTitle: "RAJUK Extended Masterplan & Embankment Protected",
	spotlightBoxDesc:
		"Silicon City falls under the proposed extended urban development master plan of RAJUK and is fully secured inside the proposed Dhaka Flood Protection Embankment for 100% environmental safety.",
	spotlightLocation: "Savar (Bara Badeshi)",
	spotlightBadge2: "100% Ready Mutation",
	specs: [
		{
			num: "01",
			title: "16 to 18 Feet Elevation",
			desc: "High-grade earth-filling and soil development executed up to 16–18 feet height, protecting all plots from monsoon floods.",
		},
		{
			num: "02",
			title: "30ft & 40ft Internal Roads",
			desc: "Spacious concrete road networks ensuring effortless vehicular movement and smooth access throughout the township.",
		},
		{
			num: "03",
			title: "Turag River Bridge Link",
			desc: "Dedicated bridge connectivity under government processing linking Mohammadpur directly to Silicon City in just 10 minutes.",
		},
		{
			num: "04",
			title: "100% Legal Title Ownership",
			desc: "Dispute-free ownership history with ready CS, SA, RS, and BS mutation records for instant deed execution.",
		},
	],
	categories: [
		{
			title: "Residential Plots",
			tag: "3, 5 & 10 Kathas",
			desc: "Secure, demarcated, and ready-to-register plots inside highly organized residential blocks with 30ft/40ft wide internal avenues.",
			features: [
				"16–18ft soil elevation",
				"30ft internal concrete roads",
				"Instant mutation & deed execution",
			],
		},
		{
			title: "Commercial Plots",
			tag: "Main Road Frontage",
			desc: "Separate designated commercial zones for corporate offices, retail shopping outlets, educational institutions, and healthcare centers.",
			features: [
				"40ft main boulevard frontage",
				"High investment yield & ROI",
				"Separate customer parking zones",
			],
		},
		{
			title: "Ready Luxury Flats",
			tag: "3 & 4 Bedroom Flats",
			desc: "Planned residential apartment complexes featuring contemporary architectural layouts, modern elevators, and riverfront views.",
			features: [
				"Scenic Turag river views",
				"Modern elevator & 24/7 security",
				"Dedicated community halls",
			],
		},
	],
	amenities: [
		{
			title: "Grand Central Mosque",
			desc: "Central grand mosque along with designated block-based mosques for daily community prayers.",
			tag: "Religious Center",
		},
		{
			title: "Sports & Athletics Grounds",
			desc: "Dedicated standard football field, cricket grounds, and sports recreation for active youth.",
			tag: "Sports Facilities",
		},
		{
			title: "Riverfront Eco Parks",
			desc: "Dedicated green open spaces, children's playgrounds, and scenic riverfront walking boulevards.",
			tag: "Green Environment",
		},
		{
			title: "School & College Campuses",
			desc: "Reserved spaces for top-tier educational institutions inside the township boundaries.",
			tag: "Education",
		},
		{
			title: "Healthcare & Medical Center",
			desc: "Modern hospital and 24/7 emergency diagnostic center zone for instant medical support.",
			tag: "Healthcare",
		},
		{
			title: "Commercial Markets & Hubs",
			desc: "Dedicated shopping malls, daily grocery markets, and corporate banking retail centers.",
			tag: "Commercial Hub",
		},
	],
	proximities: [
		{
			category: "Administrative & Commercial Hubs",
			items: [
				{ name: "National Parliament House", dist: "3.0 km" },
				{ name: "Agargaon Administrative Area", dist: "3.5 km" },
				{ name: "Japan Garden City", dist: "2.0 km" },
				{ name: "Mohammadpur Town Hall", dist: "2.2 km" },
				{ name: "Historic Shia Mosque", dist: "2.5 km" },
			],
		},
		{
			category: "Top Educational Institutions",
			items: [
				{ name: "St. Joseph Higher Secondary School", dist: "2.8 km" },
				{ name: "Mohammadpur Model College", dist: "2.5 km" },
				{ name: "Mohammadpur Preparatory School", dist: "2.3 km" },
				{ name: "Green Herald International School", dist: "3.1 km" },
				{ name: "Dhaka Residential Model College", dist: "3.4 km" },
			],
		},
		{
			category: "Specialized Healthcare Centers",
			items: [
				{ name: "National Eye Science Hospital", dist: "3.0 km" },
				{ name: "Cardiovascular Diseases Institute", dist: "3.2 km" },
				{ name: "NITOR / Pongu Hospital", dist: "3.3 km" },
				{ name: "Shaheed Suhrawardy Medical College", dist: "3.6 km" },
				{ name: "Ibn Sina Hospital (Dhanmondi Link)", dist: "3.8 km" },
			],
		},
	],
	roadmap: [
		{
			step: "01",
			title: "Plot Selection & Site Tour",
			desc: "Explore master layouts and schedule a guided vehicle tour to inspect your chosen plot location in Silicon City.",
		},
		{
			step: "02",
			title: "Legal Paper Vetting",
			desc: "Review authentic CS, SA, RS, and BS Khatian documents with our specialized in-house legal department.",
		},
		{
			step: "03",
			title: "Application & Booking",
			desc: "Submit the official Allotment Booking Form at our Mohammadpur Corporate Office with NID and registration papers.",
		},
		{
			step: "04",
			title: "Demarcation & Deed Handover",
			desc: "Complete the installment or one-time payment to receive plot demarcation and official registered deed.",
		},
	],
	ctaBadge: "DIRECT CONSULTATION DESK",
	ctaTitle: "Ready to Secure Your Plot in Silicon City?",
	ctaDesc:
		"Schedule a guided vehicle site visit or speak directly with our senior property advisors at our Mohammadpur Corporate Office.",
	ctaHotline: "+880 12 345 678 / +880 1712 345 678",
	ctaEmail: "info@siliconrealestatepvtltd.com",
	ctaOffice: "2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka-1207",
};

export function useProjectsContent() {
	const [data, setData] = useState<ProjectsContentData>(
		DEFAULT_PROJECTS_CONTENT,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchContent = useCallback(async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{
				success: boolean;
				content?: ProjectsContentData;
			}>("/projects-content");
			if (res && res.success && res.content) {
				setData({
					...DEFAULT_PROJECTS_CONTENT,
					...res.content,
					trustMetrics: Array.isArray(res.content.trustMetrics)
						? res.content.trustMetrics
						: DEFAULT_PROJECTS_CONTENT.trustMetrics,
					specs: Array.isArray(res.content.specs)
						? res.content.specs
						: DEFAULT_PROJECTS_CONTENT.specs,
					categories: Array.isArray(res.content.categories)
						? res.content.categories
						: DEFAULT_PROJECTS_CONTENT.categories,
					amenities: Array.isArray(res.content.amenities)
						? res.content.amenities
						: DEFAULT_PROJECTS_CONTENT.amenities,
					proximities: Array.isArray(res.content.proximities)
						? res.content.proximities
						: DEFAULT_PROJECTS_CONTENT.proximities,
					roadmap: Array.isArray(res.content.roadmap)
						? res.content.roadmap
						: DEFAULT_PROJECTS_CONTENT.roadmap,
				});
			}
		} catch (err: any) {
			console.error(
				"[useProjectsContent] Failed to fetch projects content:",
				err,
			);
			setError(err.message || "Failed to load projects content");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchContent();
	}, [fetchContent]);

	const updateContent = useCallback(
		async (updated: Partial<ProjectsContentData>) => {
			try {
				const res = await apiFetch<{
					success: boolean;
					content?: ProjectsContentData;
				}>("/projects-content", {
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
				console.error(
					"[useProjectsContent] Failed to update projects content:",
					err,
				);
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
