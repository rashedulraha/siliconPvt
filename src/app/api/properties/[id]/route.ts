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

		const slug =
			data.slug ||
			(data.title
				? data.title
						.toLowerCase()
						.replace(/[^a-z0-9]+/g, "-")
						.replace(/(^-|-$)+/g, "")
				: `plot-${id}`);

		const property = await prisma.property.upsert({
			where: { id },
			update: {
				title: data.title,
				type: data.type || "plot",
				category: data.category || "residential",
				status: data.status || "available",
				price: data.price !== undefined ? Number(data.price) : undefined,
				location: data.location,
				areaSqFt:
					data.areaSqFt !== undefined
						? Number(data.areaSqFt)
						: data.area !== undefined
							? Number(data.area)
							: undefined,
				bedrooms:
					data.bedrooms !== undefined
						? Number(data.bedrooms)
						: data.katha !== undefined
							? Number(data.katha)
							: undefined,
				bathrooms:
					data.bathrooms !== undefined ? Number(data.bathrooms) : undefined,
				description: data.description,
				features: Array.isArray(data.features) ? data.features : undefined,
				images: Array.isArray(data.images) ? data.images : undefined,
				featured:
					data.featured !== undefined ? Boolean(data.featured) : undefined,
			},
			create: {
				id,
				title: data.title || "New Plot",
				slug,
				type: data.type || "plot",
				category: data.category || "residential",
				status: data.status || "available",
				price: Number(data.price) || 0,
				location: data.location || "Silicon City, Savar, Dhaka",
				areaSqFt:
					data.areaSqFt !== undefined
						? Number(data.areaSqFt)
						: data.area !== undefined
							? Number(data.area)
							: 2160,
				bedrooms:
					data.bedrooms !== undefined
						? Number(data.bedrooms)
						: data.katha !== undefined
							? Number(data.katha)
							: 3,
				bathrooms: data.bathrooms !== undefined ? Number(data.bathrooms) : 0,
				description: data.description || "",
				features: Array.isArray(data.features) ? data.features : [],
				images:
					Array.isArray(data.images) && data.images.length > 0
						? data.images
						: [
								"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
							],
				featured: Boolean(data.featured),
			},
		});

		return NextResponse.json({ success: true, property });
	} catch (error: any) {
		return errorResponse(error);
	}
}

export async function PATCH(
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

		const updateData: any = {};
		if (data.title !== undefined) updateData.title = data.title;
		if (data.type !== undefined) updateData.type = data.type;
		if (data.category !== undefined) updateData.category = data.category;
		if (data.status !== undefined) updateData.status = data.status;
		if (data.price !== undefined) updateData.price = Number(data.price);
		if (data.location !== undefined) updateData.location = data.location;
		if (data.areaSqFt !== undefined) updateData.areaSqFt = Number(data.areaSqFt);
		else if (data.area !== undefined) updateData.areaSqFt = Number(data.area);
		if (data.bedrooms !== undefined) updateData.bedrooms = Number(data.bedrooms);
		else if (data.katha !== undefined) updateData.bedrooms = Number(data.katha);
		if (data.bathrooms !== undefined) updateData.bathrooms = Number(data.bathrooms);
		if (data.description !== undefined) updateData.description = data.description;
		if (Array.isArray(data.features)) updateData.features = data.features;
		if (Array.isArray(data.images)) updateData.images = data.images;
		if (data.featured !== undefined) updateData.featured = Boolean(data.featured);

		const property = await prisma.property.update({
			where: { id },
			data: updateData,
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
		await prisma.property.deleteMany({
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
