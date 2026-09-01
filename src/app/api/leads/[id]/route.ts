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

		const lead = await prisma.lead.update({
			where: { id },
			data: {
				status: data.status,
				name: data.name,
				email: data.email,
				phone: data.phone,
				message: data.message,
			},
		});

		return NextResponse.json({ success: true, lead });
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
		await prisma.lead.delete({
			where: { id },
		});

		return NextResponse.json({
			success: true,
			message: "Lead deleted successfully",
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
