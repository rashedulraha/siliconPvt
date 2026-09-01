import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

export async function GET(req: Request) {
	try {
		const session = await verifyAdminSession(req);
		if (!session) {
			return unauthorizedResponse();
		}

		const leads = await prisma.lead.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json({ success: true, leads });
	} catch (error: any) {
		return errorResponse(error);
	}
}

export async function POST(req: Request) {
	try {
		const data = await req.json();

		const lead = await prisma.lead.create({
			data: {
				name: data.name || "Client Inquiry",
				email: data.email || "",
				phone: data.phone || data.phoneNumber || "",
				message: data.message || "",
				propertyId: data.propertyId || null,
				status: "new",
			},
		});

		return NextResponse.json({ success: true, lead }, { status: 201 });
	} catch (error: any) {
		return errorResponse(error);
	}
}
