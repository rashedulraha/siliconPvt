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
		const service = await prisma.service.findUnique({
			where: { id },
		});

		if (!service) {
			return NextResponse.json(
				{ success: false, message: "Service not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, service });
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

		const service = await prisma.service.update({
			where: { id },
			data: {
				...(data.num && { num: data.num }),
				...(data.title && { title: data.title }),
				...(data.tag && { tag: data.tag }),
				...(data.description !== undefined && {
					description: data.description,
				}),
				...(data.icon !== undefined && { icon: data.icon }),
				...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
				...(data.pricing !== undefined && { pricing: data.pricing }),
				...(data.benefits && { benefits: data.benefits }),
				...(data.order !== undefined && { order: Number(data.order) }),
				...(data.active !== undefined && { active: Boolean(data.active) }),
			},
		});

		return NextResponse.json({ success: true, service });
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
		await prisma.service.delete({
			where: { id },
		});

		return NextResponse.json({
			success: true,
			message: "Service deleted successfully",
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
