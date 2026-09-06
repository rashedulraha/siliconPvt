"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface TrustCounterItem {
	value: string;
	valueBn?: string;
	label: string;
	labelBn?: string;
	detail: string;
	detailBn?: string;
}

export interface GalleryItemData {
	id: number | string;
	title: string;
	titleBn?: string;
	subtitle: string;
	subtitleBn?: string;
	category: string;
	categoryBn?: string;
	src: string;
	link: string;
}

export interface ExecutiveLeaderData {
	chairmanName?: string;
	chairmanNameBn?: string;
	chairmanRole?: string;
	chairmanRoleBn?: string;
	chairmanImage?: string;
	chairmanSpeech?: string;
	chairmanSpeechBn?: string;
	chairmanQuote?: string;
	chairmanQuoteBn?: string;
	mdName?: string;
	mdNameBn?: string;
	mdRole?: string;
	mdRoleBn?: string;
	mdImage?: string;
	mdSpeech?: string;
	mdSpeechBn?: string;
	mdQuote?: string;
	mdQuoteBn?: string;
}

export interface HomeContentData {
	id?: string;
	heroBadge: string;
	heroBadgeBn?: string;
	heroTitle: string;
	heroTitleBn?: string;
	heroSubtitle: string;
	heroSubtitleBn?: string;
	heroDesc: string;
	heroDescBn?: string;
	heroCtaText: string;
	heroCtaTextBn?: string;
	heroCtaLink: string;
	heroBgImage?: string;
	masterPlanBadge: string;
	masterPlanBadgeBn?: string;
	masterPlanTitle: string;
	masterPlanTitleBn?: string;
	masterPlanDesc: string;
	masterPlanDescBn?: string;
	masterPlanImage: string;
	amenitiesBadge: string;
	amenitiesBadgeBn?: string;
	amenitiesTitle: string;
	amenitiesTitleBn?: string;
	amenitiesDesc: string;
	amenitiesDescBn?: string;
	amenitiesImage?: string;
	showcaseBadge: string;
	showcaseBadgeBn?: string;
	showcaseTitle: string;
	showcaseTitleBn?: string;
	showcaseDesc: string;
	showcaseDescBn?: string;
	trackRecordTitle: string;
	trackRecordTitleBn?: string;
	trackRecordDesc: string;
	trackRecordDescBn?: string;
	trustCounters: TrustCounterItem[];
	trustCountersBn?: TrustCounterItem[];
	accreditations: string[];
	accreditationsBn?: string[];
	ctaTitle: string;
	ctaTitleBn?: string;
	ctaDesc: string;
	ctaDescBn?: string;
	ctaButtonText: string;
	ctaButtonTextBn?: string;
	ctaButtonLink: string;
	galleryItems?: GalleryItemData[];
	executive?: ExecutiveLeaderData;
	sectionsConfig?: any;
}

export const DEFAULT_HOME_DATA: HomeContentData = {
	heroBadge: "PLANNED ECO-TOWNSHIPS & RESIDENTIAL PLOTS",
	heroBadgeBn: "পরিকল্পিত ইকো-টাউনশিপ ও নিষ্কণ্টক প্লট",
	heroTitle: "Silicon City — Master Planned Township",
	heroTitleBn: "সিলিকন সিটি — মাস্টার প্ল্যানড মেগা টাউনশিপ",
	heroSubtitle: "Silicon Real Estate (Pvt.) Ltd.",
	heroSubtitleBn: "সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ",
	heroDesc:
		"Experience modern urban planning with 16–18ft high elevation, 30ft/40ft wide internal concrete roads, and clear legal title mutation in Savar, adjacent to Mohammadpur, Dhaka.",
	heroDescBn:
		"১৬–১৮ ফুট উঁচু বালু ভরাট, ৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ আরসিসি রাস্তা এবং শতভাগ নিষ্কণ্টক মালিকানায় মোহাম্মদপুর সংলগ্ন সাভারে আপনার স্থায়ী ঠিকানা।",
	heroCtaText: "EXPLORE PROJECTS",
	heroCtaTextBn: "প্লট ও প্রকল্পসমূহ দেখুন",
	heroCtaLink: "/projects",
	heroBgImage:
		"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=75",
	masterPlanBadge: "MASTER PLAN",
	masterPlanBadgeBn: "মাস্টার প্ল্যান",
	masterPlanTitle: "At a Glance: Township Layout",
	masterPlanTitleBn: "এক নজরে: আধুনিক টাউনশিপ লেআউট",
	masterPlanDesc:
		"Meticulously planned master layout featuring 30ft & 40ft wide avenues, optimal sunlight orientation, and eco-zoning for every plot.",
	masterPlanDescBn:
		"৩০ ও ৪০ ফুট প্রশস্ত অভ্যন্তরীণ রাস্তা, পর্যাপ্ত আলো-বাতাস চলাচলের নিশ্চয়তা এবং প্রতিটি প্লটের জন্য পরিবেশবান্ধব জোনিং সহ সুপরিকল্পিত লেআউট।",
	masterPlanImage:
		"https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200",
	amenitiesBadge: "LIFESTYLE AMENITIES",
	amenitiesBadgeBn: "নাগরিক সুযোগ-সুবিধা",
	amenitiesTitle: "Integrated Modern Civic Amenities",
	amenitiesTitleBn: "সকল আধুনিক নাগরিক ও লাইফস্টাইল সুবিধা",
	amenitiesDesc:
		"Dedicated Central Mosque, Grand Athletics Sports Ground, Riverfront Green Eco Parks, School & Medical Centers inside the boundary.",
	amenitiesDescBn:
		"কেন্দ্রীয় মসজিদ, প্রশস্ত খেলার মাঠ, নদীতীরবর্তী গ্রিন পার্ক, স্কুল ও মেডিকেল সেন্টার সমৃদ্ধ আধুনিক পরিবেশ।",
	amenitiesImage:
		"https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1200",
	showcaseBadge: "FLAGSHIP TOWNSHIP",
	showcaseBadgeBn: "ফ্ল্যাগশিপ টাউনশিপ",
	showcaseTitle: "Silicon City — Planned Eco-Township",
	showcaseTitleBn: "সিলিকন সিটি – পরিকল্পিত নিরাপদ আবাসন নগরী",
	showcaseDesc:
		"Located at Bara Badeshi Mouza, Savar, Dhaka — strategically positioned adjacent to Mohammadpur Beribadh along the scenic Turag River.",
	showcaseDescBn:
		"ঢাকার মোহাম্মদপুর সংলগ্ন সাভার বড় বাদেশী মৌজায়, রাজউকের সম্প্রসারিত মহাপরিকল্পনার আওতাভুক্ত ও ঢাকা বন্যা নিয়ন্ত্রণ বাঁধ সুরক্ষিত অঞ্চলে অবস্থিত।",
	trackRecordTitle: "Proven Trust & Excellence in Numbers",
	trackRecordTitleBn: "সংখ্যায় আমাদের গৌরবময় অর্জন ও আস্থা",
	trackRecordDesc:
		"Over a decade of ethical land development, legally verified ownership, and planned community building.",
	trackRecordDescBn:
		"এক দশকেরও বেশি সময় ধরে নৈতিক রিয়েল এস্টেট উন্নয়ন, আইনগত সুরক্ষা ও পরিকল্পিত আবাসন নির্মাণ।",
	trustCounters: [
		{
			value: "150+ Acres",
			valueBn: "১৫০+ একর",
			label: "Planned Township Area",
			labelBn: "পরিকল্পিত টাউনশিপ এলাকা",
			detail: "Total Masterplan Area",
			detailBn: "মোট মাস্টারপ্ল্যান সাইজ",
		},
		{
			value: "16–18 ft",
			valueBn: "১৬–১৮ ফুট",
			label: "Elevated Soil Earthwork",
			labelBn: "উঁচু বালু ভরাটকৃত জমি",
			detail: "Monsoon Flood Protected",
			detailBn: "মৌসুমী বন্যা প্রতিরোধী",
		},
		{
			value: "30ft & 40ft",
			valueBn: "৩০ ও ৪০ ফুট",
			label: "Internal Avenue Roads",
			labelBn: "প্রশস্ত অভ্যন্তরীণ রাস্তা",
			detail: "Smooth Vehicular Access",
			detailBn: "মসৃণ যানবাহন চলাচল",
		},
		{
			value: "100% Ready",
			valueBn: "১০০% রেডি",
			label: "Clear Title & Mutation",
			labelBn: "নিষ্কণ্টক মালিকানা ও মিউটেশন",
			detail: "Instant Deed Registry",
			detailBn: "তাৎক্ষণিক দলিল রেজিস্ট্রি",
		},
	],
	trustCountersBn: [
		{
			value: "১৫০+ একর",
			label: "পরিকল্পিত টাউনশিপ এলাকা",
			detail: "মোট মাস্টারপ্ল্যান সাইজ",
		},
		{
			value: "১৬–১৮ ফুট",
			label: "উঁচু বালু ভরাটকৃত জমি",
			detail: "মৌসুমী বন্যা প্রতিরোধী",
		},
		{
			value: "৩০ ও ৪০ ফুট",
			label: "প্রশস্ত অভ্যন্তরীণ রাস্তা",
			detail: "মসৃণ যানবাহন চলাচল",
		},
		{
			value: "১০০% রেডি",
			label: "নিষ্কণ্টক মালিকানা ও মিউটেশন",
			detail: "তাৎক্ষণিক দলিল রেজিস্ট্রি",
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
	accreditationsBn: [
		"রাজউক মাস্টারপ্ল্যান আওতাভুক্ত",
		"বন্যা নিয়ন্ত্রণ বাঁধ সুরক্ষিত জোন",
		"সিএস, এসএ, আরএস ও বিএস খতিয়ান মিউটেশন",
		"মোহাম্মদপুর ব্রিজ সরাসরি সংযোগ",
		"সেন্ট্রাল মসজিদ ও স্পোর্টস কমপ্লেক্স",
		"আধুনিক হাসপাতাল ও স্কুল সংরক্ষিত জোন",
	],
	ctaTitle: "Ready to Secure Your Plot in Silicon City?",
	ctaTitleBn: "সিলিকন সিটিতে আপনার প্লট বুক করতে প্রস্তুত?",
	ctaDesc:
		"Schedule a physical site visit with free transport from our Mohammadpur corporate office.",
	ctaDescBn:
		"আমাদের ৩ ধাপের সহজ অফিস বুকিং গাইড অনুসরণ করুন অথবা মোহাম্মদপুর কর্পোরেট অফিস থেকে ফ্রি পরিবহনে সাইট ভিজিট করুন।",
	ctaButtonText: "SCHEDULE SITE VISIT",
	ctaButtonTextBn: "অফিস ও সাইট ভিজিট বুক করুন",
	ctaButtonLink: "/contact?type=visit",
	galleryItems: [
		{
			id: 1,
			title: "Silicon City Township Master Plan",
			titleBn: "সিলিকন সিটি মাস্টারপ্ল্যান লেআউট",
			subtitle:
				"Discover modern eco-township living adjacent to Mohammadpur, Dhaka.",
			subtitleBn:
				"ঢাকার মোহাম্মদপুর সংলগ্ন পরিকল্পিত আধুনিক পরিবেশবান্ধব টাউনশিপ জীবনযাত্রা।",
			category: "Flagship Layout",
			categoryBn: "মাস্টার লেআউট",
			src: "https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1400",
			link: "/projects",
		},
		{
			id: 2,
			title: "30ft & 40ft Internal Avenue Roads",
			titleBn: "৩০ ও ৪০ ফুট চওড়া আরসিসি অভ্যন্তরীণ রাস্তা",
			subtitle:
				"Wide communication networks engineered for smooth and congestion-free vehicle movement.",
			subtitleBn: "যানজটমুক্ত ও নির্বিঘ্ন চলাচলের জন্য সুপরিকল্পিত আরসিসি সড়ক নেটওয়ার্ক।",
			category: "Infrastructure",
			categoryBn: "অবকাঠামো",
			src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1400",
			link: "/projects",
		},
		{
			id: 3,
			title: "16–18ft Soil Earthwork Elevation",
			titleBn: "১৬–১৮ ফুট উঁচু বালু ভরাটকৃত নিরাপদ জমি",
			subtitle:
				"Extensive land-filling ensuring flood-protected, high-level residential plot foundations.",
			subtitleBn:
				"বন্যা প্রতিরোধী ও সুউচ্চ সমতল ভূমি যা স্থায়ী গৃহনির্মাণের জন্য সম্পূর্ণ প্রস্তুত।",
			category: "Soil Earthwork",
			categoryBn: "ভূমি উন্নয়ন",
			src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400",
			link: "/projects",
		},
		{
			id: 4,
			title: "Turag Riverfront Ecological Corridor",
			titleBn: "তুরাগ নদীর প্রাকৃতিক তীরবর্তী গ্রিন করিডোর",
			subtitle:
				"Scenic natural riverfront parklands and recreational green belts.",
			subtitleBn: "নদীতীরবর্তী মনোরম পার্কল্যান্ড, হাঁটার রাস্তা ও স্নিগ্ধ নির্মল পরিবেশ।",
			category: "Green Spaces",
			categoryBn: "সবুজ চত্বর",
			src: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1400",
			link: "/about",
		},
		{
			id: 5,
			title: "Central Mosque & Civic Complex",
			titleBn: "কেন্দ্রীয় জামে মসজিদ ও নাগরিক কমপ্লেক্স",
			subtitle:
				"Modern central mosque, schools, healthcare center and community markets.",
			subtitleBn: "দৃষ্টিনন্দন সেন্ট্রাল মসজিদ, আধুনিক শিক্ষা প্রতিষ্ঠান, হাসপাতাল ও বাজার জোন।",
			category: "Civic Amenities",
			categoryBn: "নাগরিক সুবিধা",
			src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400",
			link: "/about",
		},
	],
	executive: {
		chairmanName: "MD. AHMED KABIR",
		chairmanNameBn: "মো: আহমেদ কবীর",
		chairmanRole: "Founder & Chairman",
		chairmanRoleBn: "প্রতিষ্ঠাতা ও চেয়ারম্যান",
		chairmanImage: "",
		chairmanQuote:
			"Our mission is to create secure investment opportunities and deliver lasting value.",
		chairmanQuoteBn:
			"আমাদের মূল লক্ষ্য প্রতিটি পরিবারের জন্য শতভাগ নিরাপদ ও লাভজনক জমির নিশ্চয়তা প্রদান করা।",
		chairmanSpeech:
			"Welcome to Silicon Real Estate. Our ultimate goal is to present legally sound, strategically positioned, and promising real estate ventures. We work tirelessly to maximize your asset value so that our respected clients can invest in their future with complete peace of mind.",
		chairmanSpeechBn:
			"সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ-এ আপনাকে স্বাগতম। আমাদের উদ্দেশ্য সততা ও স্বচ্ছতার সাথে আইনগতভাবে সম্পূর্ণ ঝুঁকিমুক্ত আবাসন প্রকল্প উপস্থাপন করা। আপনার কষ্টার্জিত বিনিয়োগের সর্বোচ্চ ভবিষ্যৎ মূল্য নিশ্চিত করাই আমাদের প্রধান অঙ্গীকার।",
		mdName: "MD. SAROWAR KHALED",
		mdNameBn: "মো: সরোয়ার খালেদ",
		mdRole: "Managing Director",
		mdRoleBn: "ব্যবস্থাপনা পরিচালক",
		mdImage: "",
		mdQuote:
			"We build more than properties; we build trust and long-term relationships.",
		mdQuoteBn:
			"আমরা শুধু জমি বা প্রপার্টি নয়, মানুষের আস্থা ও প্রজন্মের জন্য নিরাপদ ভবিষ্যৎ গড়ে তুলি।",
		mdSpeech:
			"Silicon City is being developed by a premium panel of architects, urban planners, structural engineers, and environmentalists. Our community offers wide 30ft and 40ft roads, lush playgrounds, and a proposed bridge over the Turag River, creating a highly modern and RAJUK-compliant ecosystem.",
		mdSpeechBn:
			"সিলিকন সিটি অভিজ্ঞ স্থপতি, নগর পরিকল্পনাবিদ ও প্রকৌশলীদের সার্বিক তত্ত্বাবধানে বাস্তবায়িত হচ্ছে। ১৬–১৮ ফুট উঁচু বালু ভরাট, ৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ রাস্তা এবং তুরাগ নদীর মনোরম পরিবেশ এই প্রকল্পকে করেছে আধুনিক ঢাকার শ্রেষ্ঠ আবাসন ঠিকানা।",
	},
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
					trustCountersBn: Array.isArray(res.content.trustCountersBn)
						? res.content.trustCountersBn
						: DEFAULT_HOME_DATA.trustCountersBn,
					accreditations: Array.isArray(res.content.accreditations)
						? res.content.accreditations
						: DEFAULT_HOME_DATA.accreditations,
					accreditationsBn: Array.isArray(res.content.accreditationsBn)
						? res.content.accreditationsBn
						: DEFAULT_HOME_DATA.accreditationsBn,
					galleryItems:
						Array.isArray(res.content.galleryItems) &&
						res.content.galleryItems.length > 0
							? res.content.galleryItems
							: DEFAULT_HOME_DATA.galleryItems,
					executive: res.content.executive
						? { ...DEFAULT_HOME_DATA.executive, ...res.content.executive }
						: DEFAULT_HOME_DATA.executive,
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
