"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface Slide {
	id: string;
	title: string;
	titleBn?: string;
	subtitle?: string;
	subtitleBn?: string;
	image: string;
	badge?: string;
	badgeBn?: string;
	link?: string;
	active: boolean;
	order: number;
	createdAt?: string;
	updatedAt?: string;
}

export const DEFAULT_SLIDES: Slide[] = [
	{
		id: "slide-1",
		badge: "SILICON CITY TOWNSHIP",
		badgeBn: "সিলিকন সিটি টাউনশিপ",
		title: "Your Trusted Partner in Land Investment",
		titleBn: "ভূমি বিনিয়োগে আপনার সর্বাধিক বিশ্বস্ত সঙ্গী",
		subtitle:
			"Meticulously planned, eco-friendly residential plots with 30ft & 40ft wide avenues adjacent to Mohammadpur, Dhaka.",
		subtitleBn:
			"মোহাম্মদপুর সংলগ্ন সাভারে ৩০ ও ৪০ ফুট চওড়া প্রশস্ত রাস্তা সহ সুপরিকল্পিত পরিবেশবান্ধব মেগা টাউনশিপ।",
		image:
			"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
		link: "/projects",
		active: true,
		order: 1,
	},
	{
		id: "slide-2",
		badge: "DISPUTE-FREE LAND",
		badgeBn: "শতভাগ নিষ্কণ্টক জমি",
		title: "A Secure Home for Future Generations",
		titleBn: "ভবিষ্যৎ প্রজন্মের জন্য একটি নিরাপদ ও নিশ্চিন্ত ঠিকানা",
		subtitle:
			"100% legally sound land deeds with immediate registration, RAJUK masterplan compliance, and flood-proof elevation.",
		subtitleBn:
			"তাৎক্ষণিক সাব-রেজিস্ট্রি ও নামজারি প্রস্তুত, রাজউক মাস্টারপ্ল্যান আওতাভুক্ত এবং ১৬-১৮ ফুট উঁচু বন্যামুক্ত জমি।",
		image:
			"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
		link: "/projects",
		active: true,
		order: 2,
	},
	{
		id: "slide-3",
		badge: "NATURAL RIVERFRONT LIVING",
		badgeBn: "নদীতীরবর্তী মনোরম পরিবেশ",
		title: "Experience Peaceful Eco Township Living",
		titleBn: "প্রাকৃতিক নির্মল পরিবেশে আধুনিক জীবনযাপন",
		subtitle:
			"Located next to the scenic Turag River with green parks, central mosque, schools, and 24/7 security services.",
		subtitleBn:
			"তুরাগ নদীর তীরে গ্রিন পার্ক, সেন্ট্রাল মসজিদ, আধুনিক স্কুল, হাসপাতাল এবং সার্বক্ষণিক নিরাপত্তা সুবিধা।",
		image:
			"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
		link: "/about",
		active: true,
		order: 3,
	},
	{
		id: "slide-4",
		badge: "READY REGISTRATION",
		title: "Modern Architectural Excellence & Infrastructure",
		subtitle:
			"16–18ft soil elevation above historical high flood marks, ensuring complete monsoon safety and lasting value.",
		image:
			"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
		link: "/projects",
		active: true,
		order: 4,
	},
	{
		id: "slide-5",
		badge: "STRATEGIC LOCATION",
		title: "15 Minutes from Mohammadpur Beribadh",
		subtitle:
			"Prime connectivity to major arterial roads and commercial hubs of Dhaka city with serene lakeside ambience.",
		image:
			"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80",
		link: "/contact",
		active: true,
		order: 5,
	},
];

export function useSlides() {
	const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
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
			if (items.length > 0) {
				setSlides(items);
			}
		} catch (err: any) {
			console.error("[useSlides] Error fetching slides (using fallback):", err);
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
			const res = await apiFetch<{ success: boolean; slide: Slide }>(
				"/slides",
				{
					method: "POST",
					body: JSON.stringify(slideData),
				},
			);
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
