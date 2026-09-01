import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

const DEFAULT_PATHWAYS = [
	{
		num: "01",
		title: "By Inheritance / Succession",
		desc: "Direct landowners or legal heirs of land situated within the Silicon City project boundary can apply for official membership following the company's prescribed rules.",
		tag: "Inheritance",
	},
	{
		num: "02",
		title: "By Direct Purchase from Company",
		desc: "Clients who have purchased plots or land directly from Silicon Real Estate (Pvt.) Ltd. can apply for membership to complete their plot allocation and handover.",
		tag: "Direct Allotment",
	},
	{
		num: "03",
		title: "By Purchase from Other Sources",
		desc: "Individuals who have purchased land inside the project boundary from third-party owners can also apply for membership under established guidelines to integrate into the township.",
		tag: "Third-Party Transfer",
	},
];

export async function GET() {
	try {
		let content = await prisma.membershipContent.findUnique({
			where: { id: "global" },
		});

		if (!content) {
			content = await prisma.membershipContent.create({
				data: {
					id: "global",
					heroTitle: "Silicon City Membership Guidelines",
					heroDescription:
						"Review our official offline membership process, download the printable application form, and understand the terms and conditions required to secure your plot ownership in Silicon City.",
					formPdfUrl: "/assets/silicon-membership-form.pdf",
					applicationFee: "BDT 1,000",
					landSharePercentage: "25% - 30%",
					soilElevationHeight: "16 to 18 Feet",
					offlineNoticeText:
						"Download the printable PDF application form, attach your NID copies and photographs, and submit it at our Mohammadpur Corporate Office with the BDT 1,000 application fee.",
					contactHotline: "+880 12 345 678 / +880 1712 345 678",
					pathways: JSON.stringify(DEFAULT_PATHWAYS),
				},
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
				...(data.heroTitle && { heroTitle: data.heroTitle }),
				...(data.heroDescription && { heroDescription: data.heroDescription }),
				...(data.formPdfUrl && { formPdfUrl: data.formPdfUrl }),
				...(data.applicationFee && { applicationFee: data.applicationFee }),
				...(data.landSharePercentage && {
					landSharePercentage: data.landSharePercentage,
				}),
				...(data.soilElevationHeight && {
					soilElevationHeight: data.soilElevationHeight,
				}),
				...(data.offlineNoticeText && {
					offlineNoticeText: data.offlineNoticeText,
				}),
				...(data.contactHotline && { contactHotline: data.contactHotline }),
				...(pathwaysStr !== undefined && { pathways: pathwaysStr }),
				...(termsStr !== undefined && { termsAndConditions: termsStr }),
			},
			create: {
				id: "global",
				heroTitle: data.heroTitle || "Silicon City Membership Guidelines",
				heroDescription:
					data.heroDescription ||
					"Review our official offline membership process and guidelines.",
				formPdfUrl: data.formPdfUrl || "/assets/silicon-membership-form.pdf",
				applicationFee: data.applicationFee || "BDT 1,000",
				landSharePercentage: data.landSharePercentage || "25% - 30%",
				soilElevationHeight: data.soilElevationHeight || "16 to 18 Feet",
				offlineNoticeText:
					data.offlineNoticeText ||
					"Download the printable PDF application form and submit it at our corporate office.",
				contactHotline:
					data.contactHotline || "+880 12 345 678 / +880 1712 345 678",
				pathways: pathwaysStr || JSON.stringify(DEFAULT_PATHWAYS),
				termsAndConditions: termsStr,
			},
		});

		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}
