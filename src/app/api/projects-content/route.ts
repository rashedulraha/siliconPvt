import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET() {
	try {
		const content = await prisma.projectsContent.findFirst();
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
		let existing = await prisma.projectsContent.findFirst();

		let content;
		if (!existing) {
			content = await prisma.projectsContent.create({
				data: {
					...data,
				} as any,
			});
		} else {
			content = await prisma.projectsContent.update({
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
					...(data.trustMetrics !== undefined && {
						trustMetrics: data.trustMetrics as any,
					}),
					...(data.trustMetricsBn !== undefined && {
						trustMetricsBn: data.trustMetricsBn as any,
					}),
					...(data.spotlightBadge !== undefined && {
						spotlightBadge: data.spotlightBadge,
					}),
					...(data.spotlightBadgeBn !== undefined && {
						spotlightBadgeBn: data.spotlightBadgeBn,
					}),
					...(data.spotlightTitle !== undefined && {
						spotlightTitle: data.spotlightTitle,
					}),
					...(data.spotlightTitleBn !== undefined && {
						spotlightTitleBn: data.spotlightTitleBn,
					}),
					...(data.spotlightDesc !== undefined && {
						spotlightDesc: data.spotlightDesc,
					}),
					...(data.spotlightDescBn !== undefined && {
						spotlightDescBn: data.spotlightDescBn,
					}),
					...(data.spotlightTag !== undefined && {
						spotlightTag: data.spotlightTag,
					}),
					...(data.spotlightTagBn !== undefined && {
						spotlightTagBn: data.spotlightTagBn,
					}),
					...(data.spotlightBoxTitle !== undefined && {
						spotlightBoxTitle: data.spotlightBoxTitle,
					}),
					...(data.spotlightBoxTitleBn !== undefined && {
						spotlightBoxTitleBn: data.spotlightBoxTitleBn,
					}),
					...(data.spotlightBoxDesc !== undefined && {
						spotlightBoxDesc: data.spotlightBoxDesc,
					}),
					...(data.spotlightBoxDescBn !== undefined && {
						spotlightBoxDescBn: data.spotlightBoxDescBn,
					}),
					...(data.spotlightLocation !== undefined && {
						spotlightLocation: data.spotlightLocation,
					}),
					...(data.spotlightLocationBn !== undefined && {
						spotlightLocationBn: data.spotlightLocationBn,
					}),
					...(data.spotlightBadge2 !== undefined && {
						spotlightBadge2: data.spotlightBadge2,
					}),
					...(data.spotlightBadge2Bn !== undefined && {
						spotlightBadge2Bn: data.spotlightBadge2Bn,
					}),
					...(data.specs !== undefined && { specs: data.specs as any }),
					...(data.specsBn !== undefined && { specsBn: data.specsBn as any }),
					...(data.categories !== undefined && {
						categories: data.categories as any,
					}),
					...(data.categoriesBn !== undefined && {
						categoriesBn: data.categoriesBn as any,
					}),
					...(data.amenities !== undefined && {
						amenities: data.amenities as any,
					}),
					...(data.amenitiesBn !== undefined && {
						amenitiesBn: data.amenitiesBn as any,
					}),
					...(data.proximities !== undefined && {
						proximities: data.proximities as any,
					}),
					...(data.proximitiesBn !== undefined && {
						proximitiesBn: data.proximitiesBn as any,
					}),
					...(data.roadmap !== undefined && { roadmap: data.roadmap as any }),
					...(data.roadmapBn !== undefined && {
						roadmapBn: data.roadmapBn as any,
					}),
					...(data.ctaBadge !== undefined && { ctaBadge: data.ctaBadge }),
					...(data.ctaBadgeBn !== undefined && { ctaBadgeBn: data.ctaBadgeBn }),
					...(data.ctaTitle !== undefined && { ctaTitle: data.ctaTitle }),
					...(data.ctaTitleBn !== undefined && { ctaTitleBn: data.ctaTitleBn }),
					...(data.ctaDesc !== undefined && { ctaDesc: data.ctaDesc }),
					...(data.ctaDescBn !== undefined && { ctaDescBn: data.ctaDescBn }),
					...(data.ctaHotline !== undefined && { ctaHotline: data.ctaHotline }),
					...(data.ctaEmail !== undefined && { ctaEmail: data.ctaEmail }),
					...(data.ctaOffice !== undefined && { ctaOffice: data.ctaOffice }),
					...(data.ctaOfficeBn !== undefined && {
						ctaOfficeBn: data.ctaOfficeBn,
					}),
				},
			});
		}

		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}
