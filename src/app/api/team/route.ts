import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET() {
	try {
		const team = await prisma.teamMember.findMany({
			orderBy: { order: "asc" },
		});

		return NextResponse.json({ success: true, team, data: team });
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
		const count = await prisma.teamMember.count();

		const member = await prisma.teamMember.create({
			data: {
				name: data.name,
				nameBn: data.nameBn,
				role: data.role || "",
				roleBn: data.roleBn,
				speech: data.speech || data.message || "",
				speechBn: data.speechBn,
				image: data.image || "",
				order: data.order !== undefined ? Number(data.order) : count + 1,
			},
		});

		return NextResponse.json({ success: true, member }, { status: 201 });
	} catch (error: any) {
		return errorResponse(error);
	}
}
