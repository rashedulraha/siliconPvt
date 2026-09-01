import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const property = await prisma.property.findUnique({
			where: { id },
		});

		if (!property) {
			return NextResponse.json(
				{ success: false, message: "Property not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, property });
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

		const property = await prisma.property.update({
			where: { id },
			data: {
				title: data.title,
				type: data.type,
				category: data.category,
				status: data.status,
				price: data.price !== undefined ? Number(data.price) : undefined,
				location: data.location,
				areaSqFt:
					data.areaSqFt !== undefined ? Number(data.areaSqFt) : undefined,
				bedrooms:
					data.bedrooms !== undefined ? Number(data.bedrooms) : undefined,
				bathrooms:
					data.bathrooms !== undefined ? Number(data.bathrooms) : undefined,
				description: data.description,
				features: Array.isArray(data.features) ? data.features : undefined,
				images: Array.isArray(data.images) ? data.images : undefined,
				featured:
					data.featured !== undefined ? Boolean(data.featured) : undefined,
			},
		});

		return NextResponse.json({ success: true, property });
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
		await prisma.property.delete({
			where: { id },
		});

		return NextResponse.json({
			success: true,
			message: "Property deleted successfully",
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
