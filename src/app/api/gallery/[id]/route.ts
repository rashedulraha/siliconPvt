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
		const item = await prisma.galleryItem.findUnique({
			where: { id },
		});

		if (!item) {
			return NextResponse.json(
				{ success: false, message: "Gallery item not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, item });
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

		const item = await prisma.galleryItem.update({
			where: { id },
			data: {
				...(data.title && { title: data.title }),
				...(data.category && { category: data.category }),
				...(data.badge && { badge: data.badge }),
				...(data.location !== undefined && { location: data.location }),
				...(data.overview !== undefined && { overview: data.overview }),
				...(data.images && { images: data.images }),
				...(data.features && { features: data.features }),
				...(data.order !== undefined && { order: Number(data.order) }),
				...(data.active !== undefined && { active: Boolean(data.active) }),
			},
		});

		return NextResponse.json({ success: true, item });
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
		await prisma.galleryItem.delete({
			where: { id },
		});

		return NextResponse.json({
			success: true,
			message: "Gallery item deleted successfully",
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
