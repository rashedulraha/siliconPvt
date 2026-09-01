import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

const DEFAULT_TEAM = [
	{
		id: "team-1",
		name: "Md. Ahmed Kabir",
		role: "Chairman",
		title: "Chairman's Statement",
		speech:
			"At Silicon Real Estate, our founding ethos rests upon uncompromising integrity, legal transparency, and visionary urban planning. We established Silicon City in Mohammadpur to redefine real estate standards—delivering flood-proof, eco-friendly townships backed by dispute-free land deeds.",
		image:
			"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
		order: 1,
	},
	{
		id: "team-2",
		name: "Md. Sarowar Khaled",
		role: "Managing Director",
		title: "Managing Director's Vision",
		speech:
			"Engineering perfection and RAJUK-compliant master planning are the cornerstones of Silicon Real Estate's development strategy. In Silicon City, we have engineered wide 30ft and 40ft internal road networks, integrated drainage systems, elevated soil levels above historic floodlines, and dedicated green spaces.",
		image:
			"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
		order: 2,
	},
];

export async function GET() {
	try {
		let team = await prisma.teamMember.findMany({
			orderBy: { order: "asc" },
		});

		if (!team || team.length === 0) {
			team = DEFAULT_TEAM as any;
		}

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
				role: data.role || "Executive Member",
				speech: data.speech || data.message || "",
				image:
					data.image ||
					"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
				order: data.order !== undefined ? Number(data.order) : count + 1,
			},
		});

		return NextResponse.json({ success: true, member }, { status: 201 });
	} catch (error: any) {
		return errorResponse(error);
	}
}
