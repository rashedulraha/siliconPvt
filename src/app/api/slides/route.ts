import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET() {
	try {
		let slides = await prisma.slide.findMany({
			orderBy: { order: "asc" },
		});

		// Auto-seed default database slides if table is currently empty
		if (slides.length === 0) {
			await prisma.slide.createMany({
				data: [
					{
						title: "Silicon City — Master Planned Mega Township",
						titleBn: "সিলিকন সিটি — মাস্টার প্ল্যানড মেগা টাউনশিপ",
						subtitle:
							"150+ Acres planned eco-township in Savar with 16–18ft high elevation, 40ft wide internal concrete roads and immediate deed registration.",
						subtitleBn:
							"সাভার, ঢাকায় ১৬–১৮ ফুট উঁচু বালু ভরাট, ৪০ ফুট প্রশস্ত অভ্যন্তরীণ আরসিসি সড়ক ও শতভাগ নিষ্কণ্টক হস্তান্তরে আপনার স্থায়ী ঠিকানা।",
						badge: "FLAGSHIP ECO-TOWNSHIP",
						badgeBn: "পরিকল্পিত ইকো-টাউনশিপ",
						image:
							"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80",
						link: "https://www.youtube.com/watch?v=F7NX9Ry4EJc",
						active: true,
						order: 1,
					},
					{
						title: "100% Mutation Ready Residential Plots",
						titleBn: "১০০% নিষ্কণ্টক ও মিউটেশন প্রস্তুত আবাসিক প্লট",
						subtitle:
							"Legally verified CS, SA, RS and BS khatians with instant deed registration and direct bridge connectivity to Mohammadpur.",
						subtitleBn:
							"সিএস, এসএ, আরএস ও বিএস খতিয়ান যাচাইকৃত শতভাগ নিষ্কণ্টক মালিকানায় মোহাম্মদপুর সংলগ্ন সাভারে এখনই নিরাপদ বিনিয়োগ করুন।",
						badge: "LEGAL TITLE SECURITY",
						badgeBn: "নিষ্কণ্টক আইনি নিরাপত্তা",
						image:
							"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
						link: "https://www.youtube.com/watch?v=7LJj7SCknnM",
						active: true,
						order: 2,
					},
					{
						title: "Turag Riverfront Ecological Living",
						titleBn: "তুরাগ রিভারফ্রন্ট ইকোলজিক্যাল গ্রিন সিটি",
						subtitle:
							"Serene riverside sanctuary with planned bridge connection reducing commute time to Mohammadpur to just 10 minutes.",
						subtitleBn:
							"তুরাগ নদের কোল ঘেঁষে আধুনিক ড্রেনেজ, সুপ্রশস্ত লেকভিউ রোড ও সবুজ উন্মুক্ত পার্কসহ পরিবেশবান্ধব আবাসিক জীবন।",
						badge: "PRIME CONNECTIVITY",
						badgeBn: "রিভারফ্রন্ট সংযোগ",
						image:
							"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
						link: "https://www.youtube.com/watch?v=HDG0lPLooJ4",
						active: true,
						order: 3,
					},
				],
			});
			slides = await prisma.slide.findMany({
				orderBy: { order: "asc" },
			});
		}

		return NextResponse.json({ success: true, slides });
	} catch (error: any) {
		return errorResponse(error);
	}
}

export async function POST(req: Request) {
	try {
		const session = await verifyAdminSession(req);
		if (!session) {
			return unauthorizedResponse();
		}

		const data = await req.json();
		const count = await prisma.slide.count();

		const slide = await prisma.slide.create({
			data: {
				title: data.title || "",
				titleBn: data.titleBn,
				subtitle: data.subtitle || "",
				subtitleBn: data.subtitleBn,
				image: data.image || "",
				badge: data.badge || null,
				badgeBn: data.badgeBn,
				link: data.link || null,
				active: data.active !== undefined ? Boolean(data.active) : true,
				order: data.order !== undefined ? Number(data.order) : count + 1,
			},
		});

		return NextResponse.json({ success: true, slide }, { status: 201 });
	} catch (error: any) {
		return errorResponse(error);
	}
}
