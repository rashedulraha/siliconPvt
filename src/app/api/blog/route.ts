import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET() {
	try {
		const posts = await prisma.blogPost.findMany({
			orderBy: { publishedAt: "desc" },
		});
		return NextResponse.json({ success: true, posts, data: posts });
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
		const post = await prisma.blogPost.create({
			data: {
				title: data.title,
				titleBn: data.titleBn,
				slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
				excerpt: data.excerpt || "",
				excerptBn: data.excerptBn,
				content: data.content || "",
				contentBn: data.contentBn,
				image: data.image || "",
				category: data.category || "",
				author: data.author || null,
			},
		});

		return NextResponse.json({ success: true, post }, { status: 201 });
	} catch (error: any) {
		return errorResponse(error);
	}
}
