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

export const DEFAULT_SERVICES: ServiceItem[] = [
	{
		id: "serv-1",
		num: "01",
		title: "Residential Plot Sales",
		titleBn: "আবাসিক প্লট বিক্রয়",
		tag: "Primary Plot Allotments",
		tagBn: "প্রাইম প্লট বরাদ্দ",
		description:
			"We offer legally verified, risk-free, and register-ready residential plots of various sizes. Every plot is selected with high consideration for premium communication layouts, eco-friendly zoning, and unmatched future asset appreciation.",
		descriptionBn:
			"আমরা বিভিন্ন আকারের শতভাগ নিষ্কণ্টক, তাৎক্ষণিক রেজিস্ট্রেশন ও সীমানা প্রস্তুত আবাসিক প্লট অফার করি। প্রতিটি প্লট চমৎকার যোগাযোগ ব্যবস্থা, আলো-বাতাস ও উচ্চ ভবিষ্যৎ মূল্যবৃদ্ধির সম্ভাবনা বিবেচনা করে বিন্যস্ত।",
		benefits: [
			"100% risk-free land investment",
			"Dispute-free ownership with instant registry readiness",
			"Located in high-growth suburban zones next to central Dhaka",
		],
		benefitsBn: [
			"১০০% ঝুঁকিমুক্ত নিরাপদ জমি বিনিয়োগ",
			"তাৎক্ষণিক সাব-রেজিস্ট্রি ও নামজারি প্রস্তুত",
			"মোহাম্মদপুর সংলগ্ন দ্রুত বর্ধনশীল প্রাইম জোন",
		],
		order: 1,
		active: true,
	},
	{
		id: "serv-2",
		num: "02",
		title: "Planned Residential Projects",
		titleBn: "পরিকল্পিত হাউজিং টাউনশিপ",
		tag: "Modern Housing Township",
		tagBn: "আধুনিক আবাসন নগরী",
		description:
			"We implement highly modern housing communities like 'Silicon City,' blending state-of-the-art urban architecture with natural serenity. Our township plans incorporate essential civil facilities to elevate the standards of living.",
		descriptionBn:
			"প্রাকৃতিক সৌন্দর্য ও আধুনিক নাগরিক সুবিধার সমন্বয়ে আমরা গড়ে তুলছি 'সিলিকন সিটি'। আমাদের মেগা টাউনশিপে রয়েছে সেন্ট্রাল মসজিদ, খেলার মাঠ, পার্ক ও উন্নত জীবনযাত্রার সকল অনুসঙ্গ।",
		benefits: [
			"Grand Central Mosque and block-based mosques",
			"Lush green playgrounds, parks, and dedicated Football and Cricket fields",
			"Planned spaces for modern School, College, Hospital, and Local Markets",
		],
		benefitsBn: [
			"গ্র্যান্ড সেন্ট্রাল জামে মসজিদ ও ব্লকভিত্তিক মসজিদ",
			"সবুজ খেলার মাঠ, পার্ক ও ফুটবল-ক্রিকেট ফিল্ড",
			"স্কুল, কলেজ, হাসপাতাল ও লোকাল মার্কেট জোন",
		],
		order: 2,
		active: true,
	},
	{
		id: "serv-3",
		num: "03",
		title: "Land Acquisition & Development",
		titleBn: "ভূমি অধিগ্রহণ ও উন্নয়ন",
		tag: "Soil Earthwork & Elevation",
		tagBn: "১৬–১৮ ফুট বালু ভরাট",
		description:
			"We handle strategic land scouting, absolute deed clearance, and professional land development. Our expert engineering team executes systematic soil filling to prepare solid elevated ground for permanent home construction.",
		descriptionBn:
			"সতর্কতার সাথে জমি নির্বাচন, নিখুঁত দলিলপত্র পরীক্ষা এবং উন্নত প্রকৌশল প্রযুক্তিতে ভূমি উন্নয়ন। ঐতিহাসিক বন্যা সীমা থেকে ১৬–১৮ ফুট উঁচু বালু ভরাট করে স্থায়ীভাবে বাড়ি নির্মাণের উপযোগী জমি তৈরি।",
		benefits: [
			"Earth-filling up to a safe height of 16 to 18 feet",
			"Developing wide internal roads of 30 feet and 40 feet within the blocks",
			"Adhering strictly to structural safety guidelines and community development blueprints",
		],
		benefitsBn: [
			"১৬ থেকে ১৮ ফুট উচ্চতায় নিরাপদ বালু ভরাট",
			"ব্লকের ভেতরে ৩০ ফুট ও ৪০ ফুট চওড়া টেকসই আরসিসি রাস্তা",
			"পরিবেশ ও প্রকৌশলগত মান বজায় রেখে দীর্ঘমেয়াদী উন্নয়ন",
		],
		order: 3,
		active: true,
	},
	{
		id: "serv-4",
		num: "04",
		title: "Legal Documentation & Registration",
		titleBn: "আইনি দলিলপত্র ও রেজিস্ট্রেশন সেবা",
		tag: "Deed Vetting & Title Search",
		tagBn: "১০০% নির্ভেজাল মালিকানা",
		description:
			"Navigating property laws in Bangladesh can be challenging. Our specialized legal and documentation team provides full-scale assistance to verify deed history, ensure flawless title ownership, and complete hassle-free registration.",
		descriptionBn:
			"জমির মালিকানা নিশ্চিত করতে আমাদের রয়েছে অভিজ্ঞ আইনজীবীদের ডেডিকেটেড লিগ্যাল টিম। সিএস, এসএ, আরএস ও বিএস খতিয়ান যাচাই, নামজারি ও সাব-রেজিস্ট্রির প্রতিটি ধাপে পূর্ণাঙ্গ সহযোগিতা প্রদান করা হয়।",
		benefits: [
			"In-depth deed vetting and title search history clearance",
			"Hassle-free registry and official mutation processing",
			"Securing official clearance certificates (NOC) and legal safety",
		],
		benefitsBn: [
			"গভীর দলিলপত্র যাচাই ও পূর্ববর্তী মালিকানার ধারাবাহিকতা নিশ্চিতকরণ",
			"সহজ ও দ্রুত সাব-রেজিস্ট্রি এবং মিউটেশন সম্পন্নকরণ",
			"সরকারি ছাড়পত্র ও নিষ্কণ্টক জমি সনদ প্রাপ্তি নিশ্চিত করা",
		],
		order: 4,
		active: true,
	},
	{
		id: "serv-5",
		num: "05",
		title: "Real Estate Investment Consultancy",
		titleBn: "রিয়েল এস্টেট বিনিয়োগ পরামর্শ",
		tag: "High ROI Property Advisory",
		tagBn: "উচ্চ মুনাফাদায়ক বিনিয়োগ",
		description:
			"We provide personalized property advisory services to match your exact budget, housing requirements, and long-term financial goals. Our expert insights ensure you buy property that guarantees maximum security and high return-on-investment (ROI).",
		descriptionBn:
			"আপনার বাজেট, ভবিষ্যৎ আবাসন পরিকল্পনা এবং সঞ্চয়ের সঠিক মূল্যায়ন করে আমরা প্রদান করি বিশেষজ্ঞ পরামর্শ। মোহাম্মদপুর সংলগ্ন দ্রুত বর্ধনশীল অঞ্চলে নিশ্চিত মূলধন বৃদ্ধি ও নিরাপদ ভবিষ্যৎ গঠনের সুযোগ।",
		benefits: [
			"Optimizing budget models for land buying",
			"Guiding first-time land buyers through complex property regulations",
			"Identifying high-ROI land segments within our projects",
		],
		benefitsBn: [
			"বাজেট অনুযায়ী উপযুক্ত প্লট নির্বাচন নির্দেশিকা",
			"নতুন জমি ক্রেতাদের জন্য নিয়মকানুন সহজভাবে উপস্থাপন",
			"উচ্চ মূল্যবৃদ্ধিসম্পন্ন লোকেশনে সর্বোচ্চ রিটার্নের নিশ্চয়তা",
		],
		order: 5,
		active: true,
	},
	{
		id: "serv-6",
		num: "06",
		title: "Easy Installment Facility",
		titleBn: "সহজ কিস্তি সুবিধা",
		tag: "Flexible Payment Schemes",
		tagBn: "বাজেটবান্ধব পেমেন্ট প্ল্যান",
		description:
			"To make your dream address a reality, we offer flexible and hassle-free payment schemes. Our installment packages are designed carefully to ease your financial burden, allowing you to invest gradually without stress.",
		descriptionBn:
			"আপনার আর্থিক সামর্থ্যের কথা বিবেচনা করে আমরা অফার করছি সহজ দীর্ঘমেয়াদী কিস্তি সুবিধা। কোনো গোপন চার্জ বা অতিরিক্ত সুদ ছাড়াই নমনীয় কিস্তির মাধ্যমে নিশ্চিত করুন নিজের স্থায়ী ঠিকানা।",
		benefits: [
			"Low initial deposit/booking fees",
			"Planned financial management with custom monthly or quarterly installments",
			"No hidden charges, ensuring 100% transparency",
		],
		benefitsBn: [
			"স্বল্প ডাউনপেমেন্ট ও বুকিং মানি সুবিধা",
			"২৪ থেকে ৬০ মাসের সহজ মাসিক বা ত্রৈমাসিক কিস্তির সুযোগ",
			"এককালীন পরিশোধে আকর্ষণীয় ক্যাশব্যাক ডিসকাউন্ট",
		],
		order: 6,
		active: true,
	},
	{
		id: "serv-7",
		num: "07",
		title: "Dedicated Post-Sales Support",
		titleBn: "বিক্রয়োত্তর সেবা ও সহায়তা",
		tag: "Demarcation & Utility Setup",
		tagBn: "তাৎক্ষণিক সীমানা নির্ধারণ",
		description:
			"Our commitment to you does not end at property booking. We provide continuous assistance throughout physical plot demarcation, boundary wall setups, and utility connection planning.",
		descriptionBn:
			"প্লট ক্রয়ের পরেও আমাদের দায়িত্ব শেষ হয় না। প্লটের সীমানা নির্ধারণ, বাউন্ডারি ওয়াল নির্মাণ এবং গ্যাস-বিদ্যুৎ সংযোগের ক্ষেত্রে আমরা সর্বাত্মক সহযোগিতা প্রদান করি।",
		benefits: [
			"Physical demarcation of your plot boundaries on site",
			"Coordination for shared boundary wall constructions",
			"Sincere and rapid customer dispute resolution by a professional desk",
		],
		benefitsBn: [
			"সাইটে সশরীরে উপস্থিত থেকে সীমানা পিলার স্থাপন ও বুঝিয়ে দেওয়া",
			"কমিউনিটি বাউন্ডারি ও রাস্তা সংযোগ সমন্বয়",
			"যেকোনো প্রয়োজনে ডেডিকেটেড কাস্টমার কেয়ার সাপোর্ট",
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
			const res = await apiFetch<{
				success: boolean;
				services?: ServiceItem[];
			}>("/services");
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
