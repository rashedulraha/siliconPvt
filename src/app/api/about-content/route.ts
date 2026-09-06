import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

const DEFAULT_ABOUT_CONTENT = {
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
		{ value: "15+", label: "Projects Completed" },
		{ value: "1000+", label: "Happy Clients" },
		{ value: "12+", label: "Prime Locations" },
		{ value: "10+", label: "Years Experience" },
	],
	statsBn: [
		{ value: "১৫+", label: "সম্পন্ন প্রকল্প" },
		{ value: "১০০০+", label: "সন্তুষ্ট গ্রাহক" },
		{ value: "১২+", label: "কৌশলগত লোকেশন" },
		{ value: "১০+", label: "বছরের অভিজ্ঞতা" },
	],
	coreValues: [
		{
			title: "Trust & Integrity",
			desc: "Maintaining the highest levels of honesty, transparency, and ethics in every transaction to secure client trust.",
		},
		{
			title: "Transparency",
			desc: "Keeping complete transparency in all information, pricing, contracts, and project management.",
		},
		{
			title: "Quality",
			desc: "Committing to the highest standards through planned infrastructure and modern architectural integration.",
		},
		{
			title: "Planned Development",
			desc: "Ensuring maximum value creation through modern urban planning and long-term investment viability.",
		},
	],
	coreValuesBn: [
		{
			title: "আস্থা ও সততা",
			desc: "গ্রাহকের পূর্ণ বিশ্বাস অর্জনে প্রতিটি পদক্ষেপে সর্বোচ্চ সততা, স্বচ্ছতা ও নৈতিকতা বজায় রাখা।",
		},
		{
			title: "স্বচ্ছতা ও স্পষ্টতা",
			desc: "তথ্য, মূল্য নির্ধারণ, চুক্তিপত্র ও প্রকল্প পরিচালনায় শতভাগ স্বচ্ছতা নিশ্চিতকরণ।",
		},
		{
			title: "উন্নত মান ও নিরাপত্তা",
			desc: "পরিকল্পিত অবকাঠামো ও আধুনিক স্থাপত্যের মাধ্যমে শ্রেষ্ঠ মানের নাগরিক জীবনযাত্রা নিশ্চিত করা।",
		},
		{
			title: "দৃঢ় অঙ্গীকার",
			desc: "গ্রাহকের সন্তুষ্টি ও সময়মতো প্লট হস্তান্তরের প্রতিশ্রুতি শতভাগ বাস্তবায়ন করা।",
		},
	],
	timeline: [
		{
			year: "2014",
			title: "Inception & Foundation",
			desc: "Started ethical real estate development with transparency in Dhaka.",
		},
		{
			year: "2017",
			title: "Silicon City Acquisition",
			desc: "Acquired prime riverside lands in Bara Badeshi, Savar.",
		},
		{
			year: "2020",
			title: "Mega Soil Earthwork",
			desc: "Executed 16-18ft high elevation and 40ft road foundations.",
		},
		{
			year: "2023",
			title: "Block A Handover",
			desc: "Successfully handed over demarcation possession to 500+ clients.",
		},
		{
			year: "2026",
			title: "Expanded Township",
			desc: "Implementing Turag Bridge link & civic amenity complexes.",
		},
	],
	timelineBn: [
		{
			year: "২০১৪",
			title: "প্রতিষ্ঠা ও সূচনা",
			desc: "সততা ও স্বচ্ছতার অঙ্গীকার নিয়ে রিয়েল এস্টেট খাতে যাত্রা শুরু।",
		},
		{
			year: "২০১৭",
			title: "সিলিকন সিটি অধিগ্রহণ",
			desc: "সাভার বড় বাদেশী মৌজায় তুরাগ নদীতীরবর্তী প্রাইম জমি অধিগ্রহণ।",
		},
		{
			year: "২০২০",
			title: "মেগা বালু ভরাট",
			desc: "১৬–১৮ ফুট উঁচু বালু ভরাট ও ৪০ ফুট প্রধান সড়কের অবকাঠামো নির্মাণ।",
		},
		{
			year: "২০২৩",
			title: "ব্লক-এ প্লট হস্তান্তর",
			desc: "৫০০+ সম্মানিত গ্রাহকের নিকট রেজিস্ট্রেশন ও বাউন্ডারি হস্তান্তর সম্পন্ন।",
		},
		{
			year: "২০২৬",
			title: "সম্প্রসারিত মেগা টাউনশিপ",
			desc: "তুরাগ সেতু সংযোগ ও পূর্ণাঙ্গ আধুনিক নাগরিক সুযোগ-সুবিধা বাস্তবায়ন।",
		},
	],
	whyChooseUs: [
		{
			title: "100% Legal Ownership",
			desc: "Dispute-free plots with complete CS, SA, RS, BS mutation deeds.",
		},
		{
			title: "Flood-Protected Ground",
			desc: "16 to 18 feet elevated soil filling above historical flood marks.",
		},
		{
			title: "Spacious Road Network",
			desc: "30ft & 40ft wide internal concrete roads for effortless access.",
		},
		{
			title: "Flexible Installments",
			desc: "Zero hidden cost installment facilities tailored to your income.",
		},
	],
	whyChooseUsBn: [
		{
			title: "১০০% নিষ্কণ্টক মালিকানা",
			desc: "সিএস, এসএ, আরএস ও বিএস নামজারি সম্পন্ন নির্ভেজাল প্লট।",
		},
		{
			title: "বন্যা সুরক্ষিত উঁচু জমি",
			desc: "বন্যা সীমা থেকে ১৬–১৮ ফুট উঁচু বালু ভরাটকৃত স্থায়ী জমি।",
		},
		{
			title: "প্রশস্ত অভ্যন্তরীণ সড়ক",
			desc: "৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ আরসিসি রাস্তা নেটওয়ার্ক।",
		},
		{
			title: "সহজ দীর্ঘমেয়াদী কিস্তি",
			desc: "কোনো গোপন চার্জ ছাড়া সুবিধাজনক কিস্তিতে প্লট ক্রয়ের সুযোগ।",
		},
	],
	managementTeam: [
		{
			name: "MD. AHMED KABIR",
			role: "Founder & Chairman",
			philosophy:
				"Honesty, transparency, and client trust are the greatest strengths of our company.",
			image:
				"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
		},
		{
			name: "MD. SAROWAR KHALED",
			role: "Managing Director",
			philosophy:
				"Ensuring modern urban standards, top-tier engineering safety, and rajuk-compliant development.",
			image:
				"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
		},
	],
	managementTeamBn: [
		{
			name: "মো: আহমেদ কবীর",
			role: "প্রতিষ্ঠাতা ও চেয়ারম্যান",
			philosophy: "সততা, স্বচ্ছতা এবং গ্রাহকের পূর্ণ আস্থাই আমাদের এগিয়ে চলার মূল শক্তি।",
			image:
				"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
		},
		{
			name: "মো: সরোয়ার খালেদ",
			role: "ব্যবস্থাপনা পরিচালক",
			philosophy:
				"আধুনিক নগর মান, সর্বোচ্চ প্রকৌশল নিরাপত্তা ও রাজউক নিয়মনীতি মেনে টেকসই আবাসন নিশ্চিত করা।",
			image:
				"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
		},
	],
};

export async function GET() {
	try {
		let content = await prisma.aboutContent.findFirst();
		if (!content) {
			content = await prisma.aboutContent.create({
				data: DEFAULT_ABOUT_CONTENT,
			});
		}
		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}

export async function PUT(req: Request) {
	try {
		const session = await verifyAdminSession(req);
		if (!session) {
			return unauthorizedResponse();
		}

		const data = await req.json();
		let existing = await prisma.aboutContent.findFirst();

		let content;
		if (!existing) {
			content = await prisma.aboutContent.create({
				data: {
					...DEFAULT_ABOUT_CONTENT,
					...data,
				},
			});
		} else {
			content = await prisma.aboutContent.update({
				where: { id: existing.id },
				data: {
					...(data.heroTitle !== undefined && { heroTitle: data.heroTitle }),
					...(data.heroTitleBn !== undefined && {
						heroTitleBn: data.heroTitleBn,
					}),
					...(data.heroSubtitle !== undefined && {
						heroSubtitle: data.heroSubtitle,
					}),
					...(data.heroSubtitleBn !== undefined && {
						heroSubtitleBn: data.heroSubtitleBn,
					}),
					...(data.heroDesc !== undefined && { heroDesc: data.heroDesc }),
					...(data.heroDescBn !== undefined && { heroDescBn: data.heroDescBn }),
					...(data.whoWeAreTitle !== undefined && {
						whoWeAreTitle: data.whoWeAreTitle,
					}),
					...(data.whoWeAreTitleBn !== undefined && {
						whoWeAreTitleBn: data.whoWeAreTitleBn,
					}),
					...(data.whoWeAreDesc !== undefined && {
						whoWeAreDesc: data.whoWeAreDesc,
					}),
					...(data.whoWeAreDescBn !== undefined && {
						whoWeAreDescBn: data.whoWeAreDescBn,
					}),
					...(data.missionTitle !== undefined && {
						missionTitle: data.missionTitle,
					}),
					...(data.missionTitleBn !== undefined && {
						missionTitleBn: data.missionTitleBn,
					}),
					...(data.missionDesc !== undefined && {
						missionDesc: data.missionDesc,
					}),
					...(data.missionDescBn !== undefined && {
						missionDescBn: data.missionDescBn,
					}),
					...(data.visionTitle !== undefined && {
						visionTitle: data.visionTitle,
					}),
					...(data.visionTitleBn !== undefined && {
						visionTitleBn: data.visionTitleBn,
					}),
					...(data.visionDesc !== undefined && { visionDesc: data.visionDesc }),
					...(data.visionDescBn !== undefined && {
						visionDescBn: data.visionDescBn,
					}),
					...(data.chairmanName !== undefined && {
						chairmanName: data.chairmanName,
					}),
					...(data.chairmanNameBn !== undefined && {
						chairmanNameBn: data.chairmanNameBn,
					}),
					...(data.chairmanRole !== undefined && {
						chairmanRole: data.chairmanRole,
					}),
					...(data.chairmanRoleBn !== undefined && {
						chairmanRoleBn: data.chairmanRoleBn,
					}),
					...(data.chairmanSpeech !== undefined && {
						chairmanSpeech: data.chairmanSpeech,
					}),
					...(data.chairmanSpeechBn !== undefined && {
						chairmanSpeechBn: data.chairmanSpeechBn,
					}),
					...(data.chairmanImage !== undefined && {
						chairmanImage: data.chairmanImage,
					}),
					...(data.mdName !== undefined && { mdName: data.mdName }),
					...(data.mdNameBn !== undefined && { mdNameBn: data.mdNameBn }),
					...(data.mdRole !== undefined && { mdRole: data.mdRole }),
					...(data.mdRoleBn !== undefined && { mdRoleBn: data.mdRoleBn }),
					...(data.mdSpeech !== undefined && { mdSpeech: data.mdSpeech }),
					...(data.mdSpeechBn !== undefined && { mdSpeechBn: data.mdSpeechBn }),
					...(data.mdImage !== undefined && { mdImage: data.mdImage }),
					...(data.stats !== undefined && { stats: data.stats }),
					...(data.statsBn !== undefined && { statsBn: data.statsBn }),
					...(data.coreValues !== undefined && { coreValues: data.coreValues }),
					...(data.coreValuesBn !== undefined && {
						coreValuesBn: data.coreValuesBn,
					}),
					...(data.timeline !== undefined && { timeline: data.timeline }),
					...(data.timelineBn !== undefined && { timelineBn: data.timelineBn }),
					...(data.whyChooseUs !== undefined && {
						whyChooseUs: data.whyChooseUs,
					}),
					...(data.whyChooseUsBn !== undefined && {
						whyChooseUsBn: data.whyChooseUsBn,
					}),
					...(data.managementTeam !== undefined && {
						managementTeam: data.managementTeam,
					}),
					...(data.managementTeamBn !== undefined && {
						managementTeamBn: data.managementTeamBn,
					}),
				},
			});
		}

		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}
