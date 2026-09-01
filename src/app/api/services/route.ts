import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

export async function GET() {
	try {
		const services = await prisma.service.findMany({
			orderBy: { order: "asc" },
		});
		return NextResponse.json({ success: true, services, data: services });
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
		const count = await prisma.service.count();

		const service = await prisma.service.create({
			data: {
				num: data.num || `0${count + 1}`,
				title: data.title || "New Service",
				tag: data.tag || "Core Service",
				description: data.description || "",
				icon: data.icon,
				imageUrl: data.imageUrl,
				pricing: data.pricing,
				benefits: Array.isArray(data.benefits) ? data.benefits : [],
				order: data.order !== undefined ? Number(data.order) : count + 1,
				active: data.active !== undefined ? Boolean(data.active) : true,
			},
		});

		return NextResponse.json({ success: true, service }, { status: 201 });
	} catch (error: any) {
		return errorResponse(error);
	}
}
