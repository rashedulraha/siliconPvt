import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { errorResponse } from "@/lib/server-auth";
import {
	DEFAULT_SERVICES,
	DEFAULT_PORTFOLIO_PROJECTS,
	DEFAULT_SLIDES,
} from "@/lib/default-data";

export async function GET() {
	return handleSeed();
}

export async function POST() {
	return handleSeed();
}

async function handleSeed() {
	try {
		const defaultAdminEmail = (
			process.env.ADMIN_EMAIL || "admin@afiaholdingsltd.com"
		).toLowerCase();
		const defaultAdminPassword =
			process.env.ADMIN_PASSWORD || "admin123456";
		const passwordHash = bcrypt.hashSync(defaultAdminPassword, 10);

		// 1. Admin
		await prisma.admin.upsert({
			where: { email: defaultAdminEmail },
			update: { passwordHash },
			create: {
				email: defaultAdminEmail,
				passwordHash,
				role: "admin",
			},
		});

		// 2. Settings
		await prisma.siteSettings.upsert({
			where: { id: "global" },
			update: {
				email: "info@siliconrealestatepvtltd.com",
				phone: "+880 12 345 678",
				hotline: "+880 1712 345 678",
				address:
					"2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur, Dhaka-1207, Bangladesh",
				facebookUrl: "https://facebook.com",
				youtubeUrl: "https://youtube.com",
				aboutSummary:
					"Silicon Real Estate (Pvt.) Ltd. is a premier land developer building modern eco-townships in Mohammadpur, Savar, Dhaka.",
				mission:
					"To deliver legally verified, flood-protected, planned residential plots with 30ft & 40ft internal road networks for every family.",
				vision:
					"To become Bangladesh's most trusted eco-friendly township real estate company offering sustainable urban living.",
			},
			create: {
				id: "global",
				email: "info@siliconrealestatepvtltd.com",
				phone: "+880 12 345 678",
				hotline: "+880 1712 345 678",
				address:
					"2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur, Dhaka-1207, Bangladesh",
				facebookUrl: "https://facebook.com",
				youtubeUrl: "https://youtube.com",
				aboutSummary:
					"Silicon Real Estate (Pvt.) Ltd. is a premier land developer building modern eco-townships in Mohammadpur, Savar, Dhaka.",
				mission:
					"To deliver legally verified, flood-protected, planned residential plots with 30ft & 40ft internal road networks for every family.",
				vision:
					"To become Bangladesh's most trusted eco-friendly township real estate company offering sustainable urban living.",
			},
		});

		// 3. Contact Info
		await prisma.contactInfo.upsert({
			where: { id: "global" },
			update: {},
			create: {
				id: "global",
				heroTitle: "Get in Touch with Us",
				heroDescription:
					"Have questions about our residential plots in Silicon City? Want to schedule a physical site visit or discuss membership guidelines? Reach out to our corporate help desk.",
				address:
					"2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur, Dhaka-1207, Bangladesh",
				phone: "+880 12 345 678, +880 1712 345 678",
				whatsapp: "+880 12 345 678",
				email: "info@siliconrealestatepvtltd.com",
				businessHours:
					"Saturday - Thursday: 9:00 AM – 5:00 PM | Friday: Closed",
			},
		});

		// 4. Slides
		const slideCount = await prisma.slide.count();
		if (slideCount === 0) {
			for (const slide of DEFAULT_SLIDES) {
				await prisma.slide.create({
					data: {
						title: slide.title,
						subtitle: slide.subtitle || "",
						image: slide.image,
						badge: slide.badge || "",
						link: slide.link || "/projects",
						order: slide.order,
						active: slide.active,
					},
				});
			}
		}

		// 5. Services
		const serviceCount = await prisma.service.count();
		if (serviceCount === 0) {
			for (const serv of DEFAULT_SERVICES) {
				await prisma.service.create({
					data: {
						num: serv.num,
						title: serv.title,
						tag: serv.tag,
						description: serv.description,
						benefits: serv.benefits,
						order: serv.order,
						active: serv.active,
					},
				});
			}
		}

		// 6. Projects
		const projectCount = await prisma.project.count();
		if (projectCount === 0) {
			for (const proj of DEFAULT_PORTFOLIO_PROJECTS) {
				await prisma.project.create({
					data: {
						num: proj.num,
						title: proj.title,
						slug: proj.id,
						type: proj.type,
						status: proj.status,
						location: proj.location,
						description: proj.description,
						images: proj.images,
						highlights: proj.highlights,
						order: proj.order,
						active: proj.active,
					},
				});
			}
		}

		// 7. Properties / Land Plots
		const propCount = await prisma.property.count();
		if (propCount === 0) {
			const initialPlots = [
				{
					title: "Lakeview Corner Residential Plot (5 Katha)",
					slug: "lakeview-corner-residential-plot-5-katha",
					type: "plot",
					category: "residential",
					status: "available",
					price: 3500000,
					location: "Block-A, Silicon City, Savar, Dhaka",
					areaSqFt: 3600,
					description:
						"Corner residential plot with 40ft avenue front road, 18ft high elevation, 100% mutation ready, and immediate demarcation possession.",
					features: [
						"40ft Front Road",
						"Corner Plot",
						"18ft Soil Elevation",
						"100% Mutation Ready",
						"Lakeside View",
					],
					images: [
						"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
					],
					featured: true,
				},
				{
					title: "Avenue Facing Residential Plot (3 Katha)",
					slug: "avenue-facing-residential-plot-3-katha",
					type: "plot",
					category: "residential",
					status: "available",
					price: 2100000,
					location: "Block-B, Silicon City, Savar, Dhaka",
					areaSqFt: 2160,
					description:
						"Prime residential plot facing 30ft avenue road with instant boundary demarcation and flexible installment facility.",
					features: [
						"30ft Front Road",
						"Mosque Adjacent",
						"Flood Protected",
						"Clear Title Registry",
					],
					images: [
						"https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200",
					],
					featured: true,
				},
				{
					title: "Commercial Main Boulevard Plot (10 Katha)",
					slug: "commercial-main-boulevard-plot-10-katha",
					type: "plot",
					category: "commercial",
					status: "available",
					price: 9500000,
					location: "Main Boulevard, Silicon City, Dhaka",
					areaSqFt: 7200,
					description:
						"High-traffic commercial plot directly on the 40ft main entrance boulevard, suitable for shopping centers, clinics, or office complexes.",
					features: [
						"40ft Main Boulevard",
						"Commercial Zoning",
						"High ROI Potential",
						"Electricity & Wide Drainage",
					],
					images: [
						"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
					],
					featured: true,
				},
			];

			for (const prop of initialPlots) {
				await prisma.property.create({ data: prop });
			}
		}

		return NextResponse.json({
			success: true,
			message: "Neon PostgreSQL database seeded successfully with all tables!",
		});
	} catch (error: any) {
		return errorResponse(error);
	}
}
