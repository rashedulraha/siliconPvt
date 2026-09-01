import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

export async function GET() {
	try {
		const slides = await prisma.slide.findMany({
			orderBy: { order: "asc" },
		});
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
				title: data.title || "New Slide",
				subtitle: data.subtitle || "",
				image:
					data.image ||
					"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600",
				badge: data.badge || "FEATURED",
				link: data.link || "/projects",
				active: data.active !== undefined ? Boolean(data.active) : true,
				order: data.order !== undefined ? Number(data.order) : count + 1,
			},
		});

		return NextResponse.json({ success: true, slide }, { status: 201 });
	} catch (error: any) {
		return errorResponse(error);
	}
}
