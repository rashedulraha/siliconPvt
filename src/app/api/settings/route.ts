import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET() {
	try {
		const settings = await prisma.siteSettings.findUnique({
			where: { id: "global" },
		});

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
				...(data.addressBn !== undefined && { addressBn: data.addressBn }),
				...(data.facebookUrl !== undefined && {
					facebookUrl: data.facebookUrl,
				}),
				...(data.youtubeUrl !== undefined && { youtubeUrl: data.youtubeUrl }),
				...(data.aboutSummary !== undefined && {
					aboutSummary: data.aboutSummary,
				}),
				...(data.aboutSummaryBn !== undefined && {
					aboutSummaryBn: data.aboutSummaryBn,
				}),
				...(data.mission !== undefined && { mission: data.mission }),
				...(data.missionBn !== undefined && { missionBn: data.missionBn }),
				...(data.vision !== undefined && { vision: data.vision }),
				...(data.visionBn !== undefined && { visionBn: data.visionBn }),
				...(data.socialLinks !== undefined && {
					socialLinks: data.socialLinks,
				}),
			},
			create: {
				id: "global",
				email: data.email || "",
				phone: data.phone || "",
				hotline: data.hotline,
				address: data.address || "",
				addressBn: data.addressBn,
				facebookUrl: data.facebookUrl,
				youtubeUrl: data.youtubeUrl,
				aboutSummary: data.aboutSummary,
				aboutSummaryBn: data.aboutSummaryBn,
				mission: data.mission,
				missionBn: data.missionBn,
				vision: data.vision,
				visionBn: data.visionBn,
				socialLinks: data.socialLinks,
			},
		});

		return NextResponse.json({ success: true, settings, data: settings });
	} catch (error: any) {
		return errorResponse(error);
	}
}
