"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface StatItem {
	value: string;
	valueBn?: string;
	label: string;
	labelBn?: string;
}

export interface ValueItem {
	title: string;
	titleBn?: string;
	desc: string;
	descBn?: string;
}

export interface TimelineItem {
	year: string;
	yearBn?: string;
	title: string;
	titleBn?: string;
	desc: string;
	descBn?: string;
}

export interface TeamMemberItem {
	name: string;
	nameBn?: string;
	role: string;
	roleBn?: string;
	philosophy: string;
	philosophyBn?: string;
	image: string;
}

export interface AboutContentData {
	id?: string;
	heroTitle: string;
	heroTitleBn?: string;
	heroSubtitle: string;
	heroSubtitleBn?: string;
	heroDesc: string;
	heroDescBn?: string;
	whoWeAreTitle: string;
	whoWeAreTitleBn?: string;
	whoWeAreDesc: string;
	whoWeAreDescBn?: string;
	missionTitle: string;
	missionTitleBn?: string;
	missionDesc: string;
	missionDescBn?: string;
	visionTitle: string;
	visionTitleBn?: string;
	visionDesc: string;
	visionDescBn?: string;
	chairmanName: string;
	chairmanNameBn?: string;
	chairmanRole: string;
	chairmanRoleBn?: string;
	chairmanSpeech: string;
	chairmanSpeechBn?: string;
	chairmanImage: string;
	mdName: string;
	mdNameBn?: string;
	mdRole: string;
	mdRoleBn?: string;
	mdSpeech: string;
	mdSpeechBn?: string;
	mdImage: string;
	stats: StatItem[];
	statsBn?: StatItem[];
	coreValues: ValueItem[];
	coreValuesBn?: ValueItem[];
	timeline: TimelineItem[];
	timelineBn?: TimelineItem[];
	whyChooseUs: ValueItem[];
	whyChooseUsBn?: ValueItem[];
	managementTeam: TeamMemberItem[];
	managementTeamBn?: TeamMemberItem[];
}

export const DEFAULT_ABOUT_DATA: AboutContentData = {
	heroTitle: "Building Trust.",
	heroTitleBn: "আস্থার সাথে এগিয়ে চলা।",
	heroSubtitle: "Creating Sustainable Communities.",
	heroSubtitleBn: "একটি পরিকল্পিত ও টেকসই আগামীর অঙ্গীকার।",
	heroDesc:
		"Silicon Real Estate (Pvt.) Ltd. is committed to developing secure, modern, and investment-friendly housing projects across Bangladesh, ensuring a prosperous future for the next generations.",
	heroDescBn:
		"সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ বাংলাদেশে আধুনিক, পরিবেশবান্ধব ও শতভাগ আইনগত সুরক্ষাসম্পন্ন আবাসন প্রকল্প বাস্তবায়নে নিবেদিত।",
	whoWeAreTitle: "Pioneering Planned & Eco-Friendly Development",
	whoWeAreTitleBn: "পরিকল্পিত ও পরিবেশবান্ধব আবাসন উন্নয়নের অগ্রদূত",
	whoWeAreDesc:
		"Silicon Real Estate (Pvt.) Ltd. is a highly trusted, eco-friendly, and planned real estate developer in Bangladesh, committed to ensuring safe, modern, and long-term value-driven housing. We implement every project by giving the highest priority to honesty, transparency, quality, and absolute legal security.",
	whoWeAreDescBn:
		"সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ একটি অত্যন্ত বিশ্বস্ত, পরিবেশবান্ধব এবং পরিকল্পিত আবাসন উন্নয়ন প্রতিষ্ঠান। সততা, স্বচ্ছতা, মান এবং শতভাগ আইনি নিরাপত্তাকে সর্বোচ্চ অগ্রাধিকার দিয়ে আমরা গড়ে তুলছি সিলিকন সিটি।",
	missionTitle: "Our Purpose & Commitment",
	missionTitleBn: "আমাদের লক্ষ্য ও উদ্দেশ্য",
	missionDesc:
		"Our mission is to create the highest value for our clients' investments through the combination of integrity, quality, innovation, and professionalism. We are committed to providing reliable services, transparent business practices, and modern technology.",
	missionDescBn:
		"গ্রাহকদের বিনিয়োগের সর্বোচ্চ মূল্যায়ন, স্বচ্ছ ব্যবসায়িক নীতি এবং আধুনিক প্রযুক্তির সমন্বয়ে নির্ভরযোগ্য আবাসন গড়ে তোলাই আমাদের মূল লক্ষ্য।",
	visionTitle: "Our Future Outlook",
	visionTitleBn: "আমাদের রূপকল্প ও দর্শন",
	visionDesc:
		"To establish ourselves as one of the country's most trusted, modern, and eco-friendly real estate companies, where every individual's dream of safe, planned, and quality housing becomes a secure reality.",
	visionDescBn:
		"বাংলাদেশের অন্যতম শীর্ষস্থানীয় পরিবেশবান্ধব ও বিশ্বস্ত রিয়েল এস্টেট কোম্পানি হিসেবে প্রতিটি নাগরিকের স্বপ্নের নিরাপদ ও মানসম্মত আবাসন নিশ্চিত করা।",
	chairmanName: "MD. AHMED KABIR",
	chairmanNameBn: "মো: আহমেদ কবীর",
	chairmanRole: "Founder & Chairman",
	chairmanRoleBn: "চেয়ারম্যান",
	chairmanSpeech:
		"Welcome to Silicon Real Estate (Pvt.) Ltd. Our ultimate goal is to present legally secure, strategically located, and highly promising real estate projects where we work diligently to maximize asset value.",
	chairmanSpeechBn:
		"সিলিকন রিয়েল এস্টেটে আপনাদের সবাইকে আন্তরিক অভিনন্দন। আমাদের প্রতিটি প্রকল্প আইনগত নিরাপত্তা ও আধুনিক সুযোগ-সুবিধার সমন্বয়ে সাজানো হয়েছে যাতে প্রতিটি প্লট আপনার ভবিষ্যৎ প্রজন্মের শ্রেষ্ঠ সম্পদ হতে পারে।",
	chairmanImage:
		"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
	mdName: "MD. SAROWAR KHALED",
	mdNameBn: "মো: সরোয়ার খালেদ",
	mdRole: "Managing Director",
	mdRoleBn: "ব্যবস্থাপনা পরিচালক",
	mdSpeech:
		"Every individual dreams of a beautiful, safe, and planned home. To turn that dream into reality, our 'Silicon City' project is being implemented under experienced management complying with RAJUK rules.",
	mdSpeechBn:
		"সিলিকন সিটি অভিজ্ঞ স্থপতি, নগর পরিকল্পনাবিদ ও প্রকৌশলীদের সার্বিক তত্ত্বাবধানে বাস্তবায়িত হচ্ছে। ১৬–১৮ ফুট উঁচু বালু ভরাট, ৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ রাস্তা এবং তুরাগ নদীর মনোরম পরিবেশ এই প্রকল্পকে করেছে অনন্য।",
	mdImage:
		"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
	stats: [
		{
			value: "15+",
			valueBn: "১৫+",
			label: "Projects Completed",
			labelBn: "সম্পন্ন প্রকল্প",
		},
		{
			value: "1000+",
			valueBn: "১০০০+",
			label: "Happy Clients",
			labelBn: "সন্তুষ্ট গ্রাহক",
		},
		{
			value: "12+",
			valueBn: "১২+",
			label: "Prime Locations",
			labelBn: "কৌশলগত লোকেশন",
		},
		{
			value: "10+",
			valueBn: "১০+",
			label: "Years Experience",
			labelBn: "বছরের অভিজ্ঞতা",
		},
	],
	coreValues: [
		{
			title: "Trust & Integrity",
			titleBn: "আস্থা ও সততা",
			desc: "Maintaining the highest levels of honesty, transparency, and ethics in every transaction to secure client trust.",
			descBn:
				"গ্রাহকের পূর্ণ বিশ্বাস অর্জনে প্রতিটি পদক্ষেপে সর্বোচ্চ সততা, স্বচ্ছতা ও নৈতিকতা বজায় রাখা।",
		},
		{
			title: "Transparency",
			titleBn: "স্বচ্ছতা ও স্পষ্টতা",
			desc: "Keeping complete transparency in all information, pricing, contracts, and project management.",
			descBn: "তথ্য, মূল্য নির্ধারণ, চুক্তিপত্র ও প্রকল্প পরিচালনায় শতভাগ স্বচ্ছতা নিশ্চিতকরণ।",
		},
		{
			title: "Quality",
			titleBn: "উন্নত মান ও নিরাপত্তা",
			desc: "Committing to the highest standards through planned infrastructure and modern architectural integration.",
			descBn:
				"পরিকল্পিত অবকাঠামো ও আধুনিক স্থাপত্যের মাধ্যমে শ্রেষ্ঠ মানের নাগরিক জীবনযাত্রা নিশ্চিত করা।",
		},
		{
			title: "Planned Development",
			titleBn: "দৃঢ় অঙ্গীকার",
			desc: "Ensuring maximum value creation through modern urban planning and long-term investment viability.",
			descBn: "গ্রাহকের সন্তুষ্টি ও সময়মতো প্লট হস্তান্তরের প্রতিশ্রুতি শতভাগ বাস্তবায়ন করা।",
		},
	],
	timeline: [
		{
			year: "2014",
			yearBn: "২০১৪",
			title: "Inception & Foundation",
			titleBn: "প্রতিষ্ঠা ও সূচনা",
			desc: "Started ethical real estate development with transparency in Dhaka.",
			descBn: "সততা ও স্বচ্ছতার অঙ্গীকার নিয়ে রিয়েল এস্টেট খাতে যাত্রা শুরু।",
		},
		{
			year: "2017",
			yearBn: "২০১৭",
			title: "Silicon City Acquisition",
			titleBn: "সিলিকন সিটি অধিগ্রহণ",
			desc: "Acquired prime riverside lands in Bara Badeshi, Savar.",
			descBn: "সাভার বড় বাদেশী মৌজায় তুরাগ নদীতীরবর্তী প্রাইম জমি অধিগ্রহণ।",
		},
		{
			year: "2020",
			yearBn: "২০২০",
			title: "Mega Soil Earthwork",
			titleBn: "মেগা বালু ভরাট",
			desc: "Executed 16-18ft high elevation and 40ft road foundations.",
			descBn: "১৬–১৮ ফুট উঁচু বালু ভরাট ও ৪০ ফুট প্রধান সড়কের অবকাঠামো নির্মাণ।",
		},
		{
			year: "2023",
			yearBn: "২০২৩",
			title: "Block A Handover",
			titleBn: "ব্লক-এ প্লট হস্তান্তর",
			desc: "Successfully handed over demarcation possession to 500+ clients.",
			descBn: "৫০০+ সম্মানিত গ্রাহকের নিকট রেজিস্ট্রেশন ও বাউন্ডারি হস্তান্তর সম্পন্ন।",
		},
		{
			year: "2026",
			yearBn: "২০২৬",
			title: "Expanded Township",
			titleBn: "সম্প্রসারিত মেগা টাউনশিপ",
			desc: "Implementing Turag Bridge link & civic amenity complexes.",
			descBn: "তুরাগ সেতু সংযোগ ও পূর্ণাঙ্গ আধুনিক নাগরিক সুযোগ-সুবিধা বাস্তবায়ন।",
		},
	],
	whyChooseUs: [
		{
			title: "100% Legal Ownership",
			titleBn: "১০০% নিষ্কণ্টক মালিকানা",
			desc: "Dispute-free plots with complete CS, SA, RS, BS mutation deeds.",
			descBn: "সিএস, এসএ, আরএস ও বিএস নামজারি সম্পন্ন নির্ভেজাল প্লট।",
		},
		{
			title: "Flood-Protected Ground",
			titleBn: "বন্যা সুরক্ষিত উঁচু জমি",
			desc: "16 to 18 feet elevated soil filling above historical flood marks.",
			descBn: "বন্যা সীমা থেকে ১৬–১৮ ফুট উঁচু বালু ভরাটকৃত স্থায়ী জমি।",
		},
		{
			title: "Spacious Road Network",
			titleBn: "প্রশস্ত অভ্যন্তরীণ সড়ক",
			desc: "30ft & 40ft wide internal concrete roads for effortless access.",
			descBn: "৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ আরসিসি রাস্তা নেটওয়ার্ক।",
		},
		{
			title: "Flexible Installments",
			titleBn: "সহজ দীর্ঘমেয়াদী কিস্তি",
			desc: "Zero hidden cost installment facilities tailored to your income.",
			descBn: "কোনো গোপন চার্জ ছাড়া সুবিধাজনক কিস্তিতে প্লট ক্রয়ের সুযোগ।",
		},
	],
	managementTeam: [
		{
			name: "MD. AHMED KABIR",
			nameBn: "মো: আহমেদ কবীর",
			role: "Founder & Chairman",
			roleBn: "প্রতিষ্ঠাতা ও চেয়ারম্যান",
			philosophy:
				"Honesty, transparency, and client trust are the greatest strengths of our company.",
			philosophyBn: "সততা, স্বচ্ছতা এবং গ্রাহকের পূর্ণ আস্থাই আমাদের এগিয়ে চলার মূল শক্তি।",
			image:
				"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
		},
		{
			name: "MD. SAROWAR KHALED",
			nameBn: "মো: সরোয়ার খালেদ",
			role: "Managing Director",
			roleBn: "ব্যবস্থাপনা পরিচালক",
			philosophy:
				"Ensuring modern urban standards, top-tier engineering safety, and rajuk-compliant development.",
			philosophyBn:
				"আধুনিক নগর মান, সর্বোচ্চ প্রকৌশল নিরাপত্তা ও রাজউক নিয়মনীতি মেনে টেকসই আবাসন নিশ্চিত করা।",
			image:
				"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
		},
	],
};

export function useAboutContent() {
	const [data, setData] = useState<AboutContentData>(DEFAULT_ABOUT_DATA);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchContent = useCallback(async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{
				success: boolean;
				content?: AboutContentData;
			}>("/about-content");
			if (res && res.success && res.content) {
				setData({
					...DEFAULT_ABOUT_DATA,
					...res.content,
					stats: Array.isArray(res.content.stats)
						? res.content.stats
						: DEFAULT_ABOUT_DATA.stats,
					statsBn: Array.isArray(res.content.statsBn)
						? res.content.statsBn
						: DEFAULT_ABOUT_DATA.statsBn,
					coreValues: Array.isArray(res.content.coreValues)
						? res.content.coreValues
						: DEFAULT_ABOUT_DATA.coreValues,
					coreValuesBn: Array.isArray(res.content.coreValuesBn)
						? res.content.coreValuesBn
						: DEFAULT_ABOUT_DATA.coreValuesBn,
					timeline: Array.isArray(res.content.timeline)
						? res.content.timeline
						: DEFAULT_ABOUT_DATA.timeline,
					timelineBn: Array.isArray(res.content.timelineBn)
						? res.content.timelineBn
						: DEFAULT_ABOUT_DATA.timelineBn,
					whyChooseUs: Array.isArray(res.content.whyChooseUs)
						? res.content.whyChooseUs
						: DEFAULT_ABOUT_DATA.whyChooseUs,
					whyChooseUsBn: Array.isArray(res.content.whyChooseUsBn)
						? res.content.whyChooseUsBn
						: DEFAULT_ABOUT_DATA.whyChooseUsBn,
					managementTeam: Array.isArray(res.content.managementTeam)
						? res.content.managementTeam
						: DEFAULT_ABOUT_DATA.managementTeam,
					managementTeamBn: Array.isArray(res.content.managementTeamBn)
						? res.content.managementTeamBn
						: DEFAULT_ABOUT_DATA.managementTeamBn,
				});
			}
		} catch (err: any) {
			console.error("[useAboutContent] Failed to fetch about content:", err);
			setError(err.message || "Failed to load about content");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchContent();
	}, [fetchContent]);

	const updateContent = useCallback(
		async (updated: Partial<AboutContentData>) => {
			try {
				const res = await apiFetch<{
					success: boolean;
					content?: AboutContentData;
				}>("/about-content", {
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
				console.error("[useAboutContent] Failed to update about content:", err);
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
