import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET() {
	try {
		const properties = await prisma.property.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json({ success: true, properties });
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
		const slug = data.title
			? data.title
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/(^-|-$)+/g, "") +
				"-" +
				Date.now().toString().slice(-4)
			: "property-" + Date.now();

		const property = await prisma.property.create({
			data: {
				title: data.title || "",
				titleBn: data.titleBn,
				slug,
				type: data.type || "plot",
				category: data.category || "residential",
				status: data.status || "available",
				price: Number(data.price) || 0,
				location: data.location || "",
				locationBn: data.locationBn,
				areaSqFt: data.areaSqFt ? Number(data.areaSqFt) : null,
				bedrooms: data.bedrooms ? Number(data.bedrooms) : null,
				bathrooms: data.bathrooms ? Number(data.bathrooms) : null,
				description: data.description || "",
				features: Array.isArray(data.features) ? data.features : [],
				images:
					Array.isArray(data.images) && data.images.length > 0
						? data.images
						: data.image
							? [data.image]
							: [],
				featured: Boolean(data.featured),
			},
		});

		return NextResponse.json({ success: true, property }, { status: 201 });
	} catch (error: any) {
		return errorResponse(error);
	}
}
