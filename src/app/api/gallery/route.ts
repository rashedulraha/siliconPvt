import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

export async function GET() {
	try {
		const items = await prisma.galleryItem.findMany({
			orderBy: { order: "asc" },
		});
		return NextResponse.json({ success: true, items, data: items });
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
		const count = await prisma.galleryItem.count();

		const item = await prisma.galleryItem.create({
			data: {
				title: data.title || "Gallery Item",
				category: data.category || "project",
				badge: data.badge || "PROJECT",
				location: data.location || "",
				overview: data.overview || "",
				images: Array.isArray(data.images) ? data.images : [],
				features: Array.isArray(data.features) ? data.features : [],
				order: data.order !== undefined ? Number(data.order) : count + 1,
				active: data.active !== undefined ? Boolean(data.active) : true,
			},
		});

		return NextResponse.json({ success: true, item }, { status: 201 });
	} catch (error: any) {
		return errorResponse(error);
	}
}
