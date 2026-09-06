import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

const DEFAULT_HOME_CONTENT = {
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
	amenitiesImage:
		"https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1200",
	heroBgImage:
		"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=75",
};

export async function GET() {
	try {
		let content = await prisma.homeContent.findFirst();
		if (!content) {
			content = await prisma.homeContent.create({
				data: DEFAULT_HOME_CONTENT,
			});
		}
		const config = (content.sectionsConfig as Record<string, any>) || {};
		const enriched = {
			...content,
			amenitiesImage:
				config.amenitiesImage ||
				"https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1200",
			heroBgImage:
				config.heroBgImage ||
				"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=75",
			galleryItems: config.galleryItems || undefined,
			executive: config.executive || undefined,
		};
		return NextResponse.json({
			success: true,
			content: enriched,
			data: enriched,
		});
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
		let existing = await prisma.homeContent.findFirst();

		let config = (existing?.sectionsConfig as Record<string, any>) || {};
		if (data.sectionsConfig && typeof data.sectionsConfig === "object") {
			config = { ...config, ...data.sectionsConfig };
		}
		if (data.amenitiesImage !== undefined) {
			config.amenitiesImage = data.amenitiesImage;
		}
		if (data.heroBgImage !== undefined) {
			config.heroBgImage = data.heroBgImage;
		}
		if (data.galleryItems !== undefined) {
			config.galleryItems = data.galleryItems;
		}
		if (data.executive !== undefined) {
			config.executive = data.executive;
		}

		let content;
		if (!existing) {
			content = await prisma.homeContent.create({
				data: {
					...DEFAULT_HOME_CONTENT,
					...data,
					sectionsConfig: config,
				},
			});
		} else {
			content = await prisma.homeContent.update({
				where: { id: existing.id },
				data: {
					sectionsConfig: config,

					...(data.heroBadge !== undefined && { heroBadge: data.heroBadge }),
					...(data.heroBadgeBn !== undefined && {
						heroBadgeBn: data.heroBadgeBn,
					}),
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
					...(data.heroCtaText !== undefined && {
						heroCtaText: data.heroCtaText,
					}),
					...(data.heroCtaTextBn !== undefined && {
						heroCtaTextBn: data.heroCtaTextBn,
					}),
					...(data.heroCtaLink !== undefined && {
						heroCtaLink: data.heroCtaLink,
					}),
					...(data.masterPlanBadge !== undefined && {
						masterPlanBadge: data.masterPlanBadge,
					}),
					...(data.masterPlanBadgeBn !== undefined && {
						masterPlanBadgeBn: data.masterPlanBadgeBn,
					}),
					...(data.masterPlanTitle !== undefined && {
						masterPlanTitle: data.masterPlanTitle,
					}),
					...(data.masterPlanTitleBn !== undefined && {
						masterPlanTitleBn: data.masterPlanTitleBn,
					}),
					...(data.masterPlanDesc !== undefined && {
						masterPlanDesc: data.masterPlanDesc,
					}),
					...(data.masterPlanDescBn !== undefined && {
						masterPlanDescBn: data.masterPlanDescBn,
					}),
					...(data.masterPlanImage !== undefined && {
						masterPlanImage: data.masterPlanImage,
					}),
					...(data.amenitiesBadge !== undefined && {
						amenitiesBadge: data.amenitiesBadge,
					}),
					...(data.amenitiesBadgeBn !== undefined && {
						amenitiesBadgeBn: data.amenitiesBadgeBn,
					}),
					...(data.amenitiesTitle !== undefined && {
						amenitiesTitle: data.amenitiesTitle,
					}),
					...(data.amenitiesTitleBn !== undefined && {
						amenitiesTitleBn: data.amenitiesTitleBn,
					}),
					...(data.amenitiesDesc !== undefined && {
						amenitiesDesc: data.amenitiesDesc,
					}),
					...(data.amenitiesDescBn !== undefined && {
						amenitiesDescBn: data.amenitiesDescBn,
					}),
					...(data.showcaseBadge !== undefined && {
						showcaseBadge: data.showcaseBadge,
					}),
					...(data.showcaseBadgeBn !== undefined && {
						showcaseBadgeBn: data.showcaseBadgeBn,
					}),
					...(data.showcaseTitle !== undefined && {
						showcaseTitle: data.showcaseTitle,
					}),
					...(data.showcaseTitleBn !== undefined && {
						showcaseTitleBn: data.showcaseTitleBn,
					}),
					...(data.showcaseDesc !== undefined && {
						showcaseDesc: data.showcaseDesc,
					}),
					...(data.showcaseDescBn !== undefined && {
						showcaseDescBn: data.showcaseDescBn,
					}),
					...(data.trackRecordTitle !== undefined && {
						trackRecordTitle: data.trackRecordTitle,
					}),
					...(data.trackRecordTitleBn !== undefined && {
						trackRecordTitleBn: data.trackRecordTitleBn,
					}),
					...(data.trackRecordDesc !== undefined && {
						trackRecordDesc: data.trackRecordDesc,
					}),
					...(data.trackRecordDescBn !== undefined && {
						trackRecordDescBn: data.trackRecordDescBn,
					}),
					...(data.trustCounters !== undefined && {
						trustCounters: data.trustCounters,
					}),
					...(data.trustCountersBn !== undefined && {
						trustCountersBn: data.trustCountersBn,
					}),
					...(data.accreditations !== undefined && {
						accreditations: data.accreditations,
					}),
					...(data.accreditationsBn !== undefined && {
						accreditationsBn: data.accreditationsBn,
					}),
					...(data.ctaTitle !== undefined && { ctaTitle: data.ctaTitle }),
					...(data.ctaTitleBn !== undefined && { ctaTitleBn: data.ctaTitleBn }),
					...(data.ctaDesc !== undefined && { ctaDesc: data.ctaDesc }),
					...(data.ctaDescBn !== undefined && { ctaDescBn: data.ctaDescBn }),
					...(data.ctaButtonText !== undefined && {
						ctaButtonText: data.ctaButtonText,
					}),
					...(data.ctaButtonTextBn !== undefined && {
						ctaButtonTextBn: data.ctaButtonTextBn,
					}),
					...(data.ctaButtonLink !== undefined && {
						ctaButtonLink: data.ctaButtonLink,
					}),
				},
			});
		}

		const finalConfig = (content.sectionsConfig as Record<string, any>) || {};
		const enriched = {
			...content,
			amenitiesImage:
				finalConfig.amenitiesImage ||
				"https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1200",
			heroBgImage:
				finalConfig.heroBgImage ||
				"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=75",
			galleryItems: finalConfig.galleryItems || undefined,
			executive: finalConfig.executive || undefined,
		};

		return NextResponse.json({
			success: true,
			content: enriched,
			data: enriched,
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
