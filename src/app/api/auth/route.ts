import { NextResponse } from "next/server";
import { POST as loginHandler } from "./login/route";
import { verifyAdminSession, unauthorizedResponse, errorResponse } from "@/lib/server-auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
	return loginHandler(req);
}

export async function GET(req: Request) {
	try {
		const session = await verifyAdminSession(req);
		if (!session) {
			return unauthorizedResponse();
		}

		const admin = await prisma.admin.findUnique({
			where: { id: session.id },
			select: { id: true, email: true, role: true, createdAt: true },
		});

		if (!admin) {
			return unauthorizedResponse();
		}

		return NextResponse.json({
			success: true,
			user: admin,
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
