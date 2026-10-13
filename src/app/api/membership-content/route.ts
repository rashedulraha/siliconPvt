import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET() {
	try {
		const content = await prisma.membershipContent.findUnique({
			where: { id: "global" },
		});

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
		const pathwaysStr =
			typeof data.pathways === "object"
				? JSON.stringify(data.pathways)
				: data.pathways;

		const termsStr =
			typeof data.termsAndConditions === "object"
				? JSON.stringify(data.termsAndConditions)
				: data.termsAndConditions;

		const content = await prisma.membershipContent.upsert({
			where: { id: "global" },
			update: {
				...(data.heroTitle !== undefined && { heroTitle: data.heroTitle }),
				...(data.heroTitleBn !== undefined && {
					heroTitleBn: data.heroTitleBn,
				}),
				...(data.heroDescription !== undefined && {
					heroDescription: data.heroDescription,
				}),
				...(data.heroDescriptionBn !== undefined && {
					heroDescriptionBn: data.heroDescriptionBn,
				}),
				...(data.formPdfUrl !== undefined && { formPdfUrl: data.formPdfUrl }),
				...(data.applicationFee !== undefined && {
					applicationFee: data.applicationFee,
				}),
				...(data.landSharePercentage !== undefined && {
					landSharePercentage: data.landSharePercentage,
				}),
				...(data.soilElevationHeight !== undefined && {
					soilElevationHeight: data.soilElevationHeight,
				}),
				...(data.offlineNoticeText !== undefined && {
					offlineNoticeText: data.offlineNoticeText,
				}),
				...(data.offlineNoticeTextBn !== undefined && {
					offlineNoticeTextBn: data.offlineNoticeTextBn,
				}),
				...(data.contactHotline !== undefined && {
					contactHotline: data.contactHotline,
				}),
				...(pathwaysStr !== undefined && { pathways: pathwaysStr }),
				...(termsStr !== undefined && { termsAndConditions: termsStr }),
			},
			create: {
				id: "global",
				heroTitle: data.heroTitle,
				heroTitleBn: data.heroTitleBn,
				heroDescription: data.heroDescription,
				heroDescriptionBn: data.heroDescriptionBn,
				formPdfUrl: data.formPdfUrl,
				applicationFee: data.applicationFee,
				landSharePercentage: data.landSharePercentage,
				soilElevationHeight: data.soilElevationHeight,
				offlineNoticeText: data.offlineNoticeText,
				offlineNoticeTextBn: data.offlineNoticeTextBn,
				contactHotline: data.contactHotline,
				pathways: pathwaysStr,
				termsAndConditions: termsStr,
			},
		});

		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}
