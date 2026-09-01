import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const project = await prisma.project.findUnique({
			where: { id },
		});

		if (!project) {
			return NextResponse.json(
				{ success: false, message: "Project not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, project });
	} catch (error: any) {
		return errorResponse(error);
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const session = await verifyAdminSession(req);
		if (!session) {
			return unauthorizedResponse();
		}

		const { id } = await params;
		const data = await req.json();

		const project = await prisma.project.update({
			where: { id },
			data: {
				...(data.num && { num: data.num }),
				...(data.title && { title: data.title }),
				...(data.slug && { slug: data.slug }),
				...(data.type && { type: data.type }),
				...(data.status && { status: data.status }),
				...(data.location && { location: data.location }),
				...(data.description !== undefined && {
					description: data.description,
				}),
				...(data.images && { images: data.images }),
				...(data.highlights && { highlights: data.highlights }),
				...(data.demoUrl !== undefined && { demoUrl: data.demoUrl }),
				...(data.clientInfo !== undefined && { clientInfo: data.clientInfo }),
				...(data.order !== undefined && { order: Number(data.order) }),
				...(data.active !== undefined && { active: Boolean(data.active) }),
			},
		});

		return NextResponse.json({ success: true, project });
	} catch (error: any) {
		return errorResponse(error);
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const session = await verifyAdminSession(req);
		if (!session) {
			return unauthorizedResponse();
		}

		const { id } = await params;
		await prisma.project.delete({
			where: { id },
		});

		return NextResponse.json({
			success: true,
			message: "Project deleted successfully",
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
