import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const post = await prisma.blogPost.findFirst({
			where: {
				OR: [{ id }, { slug: id }],
			},
		});

		if (!post) {
			return NextResponse.json(
				{ success: false, message: "Blog post not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, post });
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

		const post = await prisma.blogPost.update({
			where: { id },
			data: {
				...(data.title && { title: data.title }),
				...(data.slug && { slug: data.slug }),
				...(data.excerpt !== undefined && { excerpt: data.excerpt }),
				...(data.content !== undefined && { content: data.content }),
				...(data.image !== undefined && { image: data.image }),
				...(data.category && { category: data.category }),
				...(data.author && { author: data.author }),
			},
		});

		return NextResponse.json({ success: true, post });
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
		await prisma.blogPost.delete({
			where: { id },
		});

		return NextResponse.json({
			success: true,
			message: "Blog post deleted successfully",
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
