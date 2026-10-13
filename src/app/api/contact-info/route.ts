import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET() {
	try {
		const contact = await prisma.contactInfo.findUnique({
			where: { id: "global" },
		});

		return NextResponse.json({
			success: true,
			contact,
			data: contact,
			contactInfo: contact,
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
		const contact = await prisma.contactInfo.upsert({
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
				...(data.address !== undefined && { address: data.address }),
				...(data.addressBn !== undefined && { addressBn: data.addressBn }),
				...(data.phone !== undefined && { phone: data.phone }),
				...(data.whatsapp !== undefined && { whatsapp: data.whatsapp }),
				...(data.email !== undefined && { email: data.email }),
				...(data.secondaryEmail !== undefined && {
					secondaryEmail: data.secondaryEmail,
				}),
				...(data.website !== undefined && { website: data.website }),
				...(data.businessHours !== undefined && {
					businessHours: data.businessHours,
				}),
				...(data.businessHoursBn !== undefined && {
					businessHoursBn: data.businessHoursBn,
				}),
				...(data.mapEmbedUrl !== undefined && {
					mapEmbedUrl: data.mapEmbedUrl,
				}),
				...(data.siteVisitNotice !== undefined && {
					siteVisitNotice: data.siteVisitNotice,
				}),
				...(data.siteVisitNoticeBn !== undefined && {
					siteVisitNoticeBn: data.siteVisitNoticeBn,
				}),
				...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
				...(data.facebookUrl !== undefined && {
					facebookUrl: data.facebookUrl,
				}),
				...(data.youtubeUrl !== undefined && { youtubeUrl: data.youtubeUrl }),
			},
			create: {
				id: "global",
				heroTitle: data.heroTitle,
				heroTitleBn: data.heroTitleBn,
				heroDescription: data.heroDescription,
				heroDescriptionBn: data.heroDescriptionBn,
				address: data.address,
				addressBn: data.addressBn,
				phone: data.phone,
				whatsapp: data.whatsapp,
				email: data.email,
				secondaryEmail: data.secondaryEmail,
				website: data.website,
				businessHours: data.businessHours,
				businessHoursBn: data.businessHoursBn,
				mapEmbedUrl: data.mapEmbedUrl,
				siteVisitNotice: data.siteVisitNotice,
				siteVisitNoticeBn: data.siteVisitNoticeBn,
				imageUrl: data.imageUrl,
				facebookUrl: data.facebookUrl,
				youtubeUrl: data.youtubeUrl,
			},
		});

		// Also synchronize common fields to siteSettings so both models stay in sync
		try {
			await prisma.siteSettings.upsert({
				where: { id: "global" },
				update: {
					...(data.address !== undefined && { address: data.address }),
					...(data.addressBn !== undefined && { addressBn: data.addressBn }),
					...(data.phone !== undefined && { phone: data.phone }),
					...(data.email !== undefined && { email: data.email }),
					...(data.facebookUrl !== undefined && {
						facebookUrl: data.facebookUrl,
					}),
					...(data.youtubeUrl !== undefined && {
						youtubeUrl: data.youtubeUrl,
					}),
					...(data.heroDescription !== undefined && {
						aboutSummary: data.heroDescription,
					}),
					...(data.heroDescriptionBn !== undefined && {
						aboutSummaryBn: data.heroDescriptionBn,
					}),
				},
				create: {
					id: "global",
					address: data.address || "",
					addressBn: data.addressBn,
					phone: data.phone || "",
					email: data.email || "",
					facebookUrl: data.facebookUrl,
					youtubeUrl: data.youtubeUrl,
					aboutSummary: data.heroDescription,
					aboutSummaryBn: data.heroDescriptionBn,
				},
			});
		} catch (syncErr) {
			console.warn(
				"[contact-info] Syncing to siteSettings skipped or failed:",
				syncErr,
			);
		}

		return NextResponse.json({
			success: true,
			contact,
			data: contact,
			contactInfo: contact,
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
