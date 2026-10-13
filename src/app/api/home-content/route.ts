import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET() {
	try {
		const content = await prisma.homeContent.findFirst();
		if (!content) {
			return NextResponse.json({
				success: true,
				content: null,
				data: null,
			});
		}
		const config = (content.sectionsConfig as Record<string, any>) || {};
		const enriched = {
			...content,
			amenitiesImage: config.amenitiesImage || undefined,
			heroBgImage: config.heroBgImage || undefined,
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
