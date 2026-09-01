import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

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

		const slide = await prisma.slide.update({
			where: { id },
			data: {
				title: data.title,
				subtitle: data.subtitle,
				image: data.image,
				badge: data.badge,
				link: data.link,
				active: data.active !== undefined ? Boolean(data.active) : undefined,
				order: data.order !== undefined ? Number(data.order) : undefined,
			},
		});

		return NextResponse.json({ success: true, slide });
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
		await prisma.slide.delete({
			where: { id },
		});

		return NextResponse.json({
			success: true,
			message: "Slide deleted successfully",
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
