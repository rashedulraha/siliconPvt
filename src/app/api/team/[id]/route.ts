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
		const member = await prisma.teamMember.findUnique({
			where: { id },
		});

		if (!member) {
			return NextResponse.json(
				{ success: false, message: "Team member not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, member });
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

		const member = await prisma.teamMember.update({
			where: { id },
			data: {
				...(data.name && { name: data.name }),
				...(data.role && { role: data.role }),
				...(data.speech !== undefined && { speech: data.speech }),
				...(data.image && { image: data.image }),
				...(data.order !== undefined && { order: Number(data.order) }),
			},
		});

		return NextResponse.json({ success: true, member });
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
		await prisma.teamMember.delete({
			where: { id },
		});

		return NextResponse.json({
			success: true,
			message: "Team member deleted successfully",
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
