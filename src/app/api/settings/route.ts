import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

const DEFAULT_SETTINGS = {
	id: "global",
	email: "info@siliconrealestatepvtltd.com",
	phone: "+880 1711-000000",
	hotline: "16789",
	address:
		"2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka-1207",
	facebookUrl: "https://facebook.com",
	youtubeUrl: "https://youtube.com",
	aboutSummary:
		"Silicon Real Estate (Pvt.) Ltd. is a premier land developer in Dhaka dedicated to eco-friendly planned townships and legally sound plot registration.",
	mission:
		"To provide dispute-free, RAJUK-compliant, planned residential & commercial land plots for every family in Bangladesh.",
	vision:
		"To become Bangladesh's most trusted real estate developer through transparent documentation, planned infrastructure, and ethical service.",
};

export async function GET() {
	try {
		let settings = await prisma.siteSettings.findUnique({
			where: { id: "global" },
		});

		if (!settings) {
			settings = await prisma.siteSettings.create({
				data: DEFAULT_SETTINGS,
			});
		}

		return NextResponse.json({ success: true, settings, data: settings });
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
		const settings = await prisma.siteSettings.upsert({
			where: { id: "global" },
			update: {
				...(data.email && { email: data.email }),
				...(data.phone && { phone: data.phone }),
				...(data.hotline !== undefined && { hotline: data.hotline }),
				...(data.address && { address: data.address }),
				...(data.facebookUrl !== undefined && { facebookUrl: data.facebookUrl }),
				...(data.youtubeUrl !== undefined && { youtubeUrl: data.youtubeUrl }),
				...(data.aboutSummary !== undefined && { aboutSummary: data.aboutSummary }),
				...(data.mission !== undefined && { mission: data.mission }),
				...(data.vision !== undefined && { vision: data.vision }),
				...(data.socialLinks !== undefined && { socialLinks: data.socialLinks }),
			},
			create: {
				...DEFAULT_SETTINGS,
				...data,
			},
		});

		return NextResponse.json({ success: true, settings, data: settings });
	} catch (error: any) {
		return errorResponse(error);
	}
}
