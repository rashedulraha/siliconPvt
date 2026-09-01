import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET() {
	try {
		const projects = await prisma.project.findMany({
			orderBy: { order: "asc" },
		});
		return NextResponse.json({ success: true, projects, data: projects });
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
		const count = await prisma.project.count();

		const project = await prisma.project.create({
			data: {
				num: data.num || `0${count + 1}`,
				title: data.title,
				slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
				type: data.type || "Township Project",
				status: data.status || "Ongoing",
				location: data.location || "Dhaka",
				description: data.description || "",
				images: Array.isArray(data.images) ? data.images : [],
				highlights: Array.isArray(data.highlights) ? data.highlights : [],
				demoUrl: data.demoUrl,
				clientInfo: data.clientInfo,
				order: data.order ?? count + 1,
				active: data.active ?? true,
			},
		});

		return NextResponse.json({ success: true, project }, { status: 201 });
	} catch (error: any) {
		return errorResponse(error);
	}
}
