import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

const DEFAULT_HOME_CONTENT = {
	heroBadge: "PLANNED ECO-TOWNSHIPS & RESIDENTIAL PLOTS",
	heroTitle: "Silicon City — Master Planned Township",
	heroSubtitle: "Silicon Real Estate (Pvt.) Ltd.",
	heroDesc:
		"Experience modern urban planning with 16–18ft high elevation, 30ft/40ft wide internal concrete roads, and clear legal title mutation in Savar, adjacent to Mohammadpur, Dhaka.",
	heroCtaText: "EXPLORE PROJECTS",
	heroCtaLink: "/projects",
	masterPlanBadge: "MASTER PLAN",
	masterPlanTitle: "At a Glance: Township Layout",
	masterPlanDesc:
		"Meticulously planned master layout featuring 30ft & 40ft wide avenues, optimal sunlight orientation, and eco-zoning for every plot.",
	masterPlanImage:
		"https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200",
	amenitiesBadge: "LIFESTYLE AMENITIES",
	amenitiesTitle: "Integrated Modern Civic Amenities",
	amenitiesDesc:
		"Dedicated Central Mosque, Grand Athletics Sports Ground, Riverfront Green Eco Parks, School & Medical Centers inside the boundary.",
	showcaseBadge: "FLAGSHIP TOWNSHIP",
	showcaseTitle: "Silicon City — Planned Eco-Township",
	showcaseDesc:
		"Located at Bara Badeshi Mouza, Savar, Dhaka — strategically positioned adjacent to Mohammadpur Beribadh along the scenic Turag River.",
	trackRecordTitle: "Proven Trust & Excellence in Numbers",
	trackRecordDesc:
		"Over a decade of ethical land development, legally verified ownership, and planned community building.",
	trustCounters: [
		{
			value: "150+ Acres",
			label: "Planned Township Area",
			detail: "Total Masterplan Area",
		},
		{
			value: "16–18 ft",
			label: "Elevated Soil Earthwork",
			detail: "Monsoon Flood Protected",
		},
		{
			value: "30ft & 40ft",
			label: "Internal Avenue Roads",
			detail: "Smooth Vehicular Access",
		},
		{
			value: "100% Ready",
			label: "Clear Title & Mutation",
			detail: "Instant Deed Registry",
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
	ctaTitle: "Ready to Secure Your Plot in Silicon City?",
	ctaDesc:
		"Schedule a physical site visit with free transport from our Mohammadpur corporate office.",
	ctaButtonText: "SCHEDULE SITE VISIT",
	ctaButtonLink: "/contact?type=visit",
};

export async function GET() {
	try {
		let content = await prisma.homeContent.findFirst();
		if (!content) {
			content = await prisma.homeContent.create({
				data: DEFAULT_HOME_CONTENT,
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
		let existing = await prisma.homeContent.findFirst();

		let content;
		if (!existing) {
			content = await prisma.homeContent.create({
				data: {
					...DEFAULT_HOME_CONTENT,
					...data,
				},
			});
		} else {
			content = await prisma.homeContent.update({
				where: { id: existing.id },
				data: {
					...(data.heroBadge !== undefined && { heroBadge: data.heroBadge }),
					...(data.heroTitle !== undefined && { heroTitle: data.heroTitle }),
					...(data.heroSubtitle !== undefined && {
						heroSubtitle: data.heroSubtitle,
					}),
					...(data.heroDesc !== undefined && { heroDesc: data.heroDesc }),
					...(data.heroCtaText !== undefined && {
						heroCtaText: data.heroCtaText,
					}),
					...(data.heroCtaLink !== undefined && {
						heroCtaLink: data.heroCtaLink,
					}),
					...(data.masterPlanBadge !== undefined && {
						masterPlanBadge: data.masterPlanBadge,
					}),
					...(data.masterPlanTitle !== undefined && {
						masterPlanTitle: data.masterPlanTitle,
					}),
					...(data.masterPlanDesc !== undefined && {
						masterPlanDesc: data.masterPlanDesc,
					}),
					...(data.masterPlanImage !== undefined && {
						masterPlanImage: data.masterPlanImage,
					}),
					...(data.amenitiesBadge !== undefined && {
						amenitiesBadge: data.amenitiesBadge,
					}),
					...(data.amenitiesTitle !== undefined && {
						amenitiesTitle: data.amenitiesTitle,
					}),
					...(data.amenitiesDesc !== undefined && {
						amenitiesDesc: data.amenitiesDesc,
					}),
					...(data.showcaseBadge !== undefined && {
						showcaseBadge: data.showcaseBadge,
					}),
					...(data.showcaseTitle !== undefined && {
						showcaseTitle: data.showcaseTitle,
					}),
					...(data.showcaseDesc !== undefined && {
						showcaseDesc: data.showcaseDesc,
					}),
					...(data.trackRecordTitle !== undefined && {
						trackRecordTitle: data.trackRecordTitle,
					}),
					...(data.trackRecordDesc !== undefined && {
						trackRecordDesc: data.trackRecordDesc,
					}),
					...(data.trustCounters !== undefined && {
						trustCounters: data.trustCounters,
					}),
					...(data.accreditations !== undefined && {
						accreditations: data.accreditations,
					}),
					...(data.ctaTitle !== undefined && { ctaTitle: data.ctaTitle }),
					...(data.ctaDesc !== undefined && { ctaDesc: data.ctaDesc }),
					...(data.ctaButtonText !== undefined && {
						ctaButtonText: data.ctaButtonText,
					}),
					...(data.ctaButtonLink !== undefined && {
						ctaButtonLink: data.ctaButtonLink,
					}),
					...(data.sectionsConfig !== undefined && {
						sectionsConfig: data.sectionsConfig,
					}),
				},
			});
		}

		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}
