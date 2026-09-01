import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

const DEFAULT_ABOUT_CONTENT = {
	heroTitle: "Building Trust.",
	heroSubtitle: "Creating Sustainable Communities.",
	heroDesc:
		"Silicon Real Estate (Pvt.) Ltd. is committed to developing secure, modern, and investment-friendly housing projects across Bangladesh, ensuring a prosperous future for the next generations.",
	whoWeAreTitle: "Pioneering Planned & Eco-Friendly Development",
	whoWeAreDesc:
		"Silicon Real Estate (Pvt.) Ltd. is a highly trusted, eco-friendly, and planned real estate developer in Bangladesh, committed to ensuring safe, modern, and long-term value-driven housing. We implement every project by giving the highest priority to honesty, transparency, quality, and absolute legal security.",
	missionTitle: "Our Purpose & Commitment",
	missionDesc:
		"Our mission is to create the highest value for our clients' investments through the combination of integrity, quality, innovation, and professionalism. We are committed to providing reliable services, transparent business practices, and modern technology.",
	visionTitle: "Our Future Outlook",
	visionDesc:
		"To establish ourselves as one of the country's most trusted, modern, and eco-friendly real estate companies, where every individual's dream of safe, planned, and quality housing becomes a secure reality.",
	chairmanName: "MD. AHMED KABIR",
	chairmanRole: "Founder & Chairman",
	chairmanSpeech:
		"Welcome to Silicon Real Estate (Pvt.) Ltd. Our ultimate goal is to present legally secure, strategically located, and highly promising real estate projects where we work diligently to maximize asset value.",
	chairmanImage:
		"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
	mdName: "MD. SAROWAR KHALED",
	mdRole: "Managing Director",
	mdSpeech:
		"Every individual dreams of a beautiful, safe, and planned home. To turn that dream into reality, our 'Silicon City' project is being implemented under experienced management complying with RAJUK rules.",
	mdImage:
		"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
	stats: [
		{ value: "15+", label: "Projects Completed" },
		{ value: "1000+", label: "Happy Clients" },
		{ value: "12+", label: "Prime Locations" },
		{ value: "10+", label: "Years Experience" },
	],
	coreValues: [
		{
			title: "Trust & Integrity",
			desc: "Maintaining the highest levels of honesty, transparency, and ethics in every transaction to secure client trust.",
		},
		{
			title: "Transparency",
			desc: "Keeping complete transparency in all information, pricing, contracts, and project management.",
		},
		{
			title: "Quality",
			desc: "Committing to the highest standards through planned infrastructure and modern architectural integration.",
		},
		{
			title: "Planned Development",
			desc: "Ensuring maximum value creation through modern urban planning and long-term investment viability.",
		},
	],
	timeline: [
		{
			year: "2016",
			title: "Company Founded",
			desc: "Founded with a clear vision to provide secure and planned land investments in Dhaka.",
		},
		{
			year: "2018",
			title: "Silicon City Launch",
			desc: "Commenced premier project 'Silicon City', adjacent to Mohammadpur along Turag River.",
		},
		{
			year: "2020",
			title: "100+ Happy Clients",
			desc: "Celebrated milestone of securing dreams and investments of over 100+ satisfied plot owners.",
		},
		{
			year: "2023",
			title: "Phase 2 Expansion",
			desc: "Expansion of infrastructure, master layout planning, and 30ft & 40ft wide internal road networks.",
		},
		{
			year: "2026",
			title: "Thriving Community",
			desc: "Evolving into a highly successful, modern, and thriving residential housing community.",
		},
	],
	whyChooseUs: [
		{
			title: "Legal Verification",
			desc: "100% verified documentation, clear registry, and dispute-free plots.",
		},
		{
			title: "Prime Location",
			desc: "Positioned adjacent to Mohammadpur, under RAJUK's proposed extended master plan.",
		},
		{
			title: "Secure Investment",
			desc: "Planned in highly promising growth zones, ensuring stable and long-term value appreciation.",
		},
		{
			title: "Easy Payment Plan",
			desc: "Flexible and stress-free installment facilities tailored to ease financial planning.",
		},
	],
	managementTeam: [
		{
			name: "MD. AHMED KABIR",
			role: "Founder & Chairman",
			philosophy:
				"Honesty, transparency, and client trust are the greatest strengths of our company.",
			image:
				"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
		},
		{
			name: "MD. SAROWAR KHALED",
			role: "Managing Director",
			philosophy:
				"Ensuring modern urban standards, top-tier engineering safety, and rajuk-compliant development.",
			image:
				"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
		},
		{
			name: "NUSRAT JAHAN",
			role: "Director - Operations",
			philosophy:
				"Streamlining seamless customer experience, operational precision, and client care.",
			image:
				"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
		},
		{
			name: "TAHMID HOSSAIN",
			role: "Director - Projects",
			philosophy:
				"Executing engineering excellence, structural quality, and on-time plot delivery.",
			image:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
		},
	],
};

export async function GET() {
	try {
		let content = await prisma.aboutContent.findFirst();
		if (!content) {
			content = await prisma.aboutContent.create({
				data: DEFAULT_ABOUT_CONTENT,
			});
		}
		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}

export async function PUT(req: Request) {
	try {
		const session = await verifyAdminSession(req);
		if (!session) {
			return unauthorizedResponse();
		}

		const data = await req.json();
		let existing = await prisma.aboutContent.findFirst();

		let content;
		if (!existing) {
			content = await prisma.aboutContent.create({
				data: {
					...DEFAULT_ABOUT_CONTENT,
					...data,
				},
			});
		} else {
			content = await prisma.aboutContent.update({
				where: { id: existing.id },
				data: {
					...(data.heroTitle && { heroTitle: data.heroTitle }),
					...(data.heroSubtitle && { heroSubtitle: data.heroSubtitle }),
					...(data.heroDesc && { heroDesc: data.heroDesc }),
					...(data.whoWeAreTitle && { whoWeAreTitle: data.whoWeAreTitle }),
					...(data.whoWeAreDesc && { whoWeAreDesc: data.whoWeAreDesc }),
					...(data.missionTitle && { missionTitle: data.missionTitle }),
					...(data.missionDesc && { missionDesc: data.missionDesc }),
					...(data.visionTitle && { visionTitle: data.visionTitle }),
					...(data.visionDesc && { visionDesc: data.visionDesc }),
					...(data.chairmanName && { chairmanName: data.chairmanName }),
					...(data.chairmanRole && { chairmanRole: data.chairmanRole }),
					...(data.chairmanSpeech && { chairmanSpeech: data.chairmanSpeech }),
					...(data.chairmanImage && { chairmanImage: data.chairmanImage }),
					...(data.mdName && { mdName: data.mdName }),
					...(data.mdRole && { mdRole: data.mdRole }),
					...(data.mdSpeech && { mdSpeech: data.mdSpeech }),
					...(data.mdImage && { mdImage: data.mdImage }),
					...(data.stats !== undefined && { stats: data.stats }),
					...(data.coreValues !== undefined && { coreValues: data.coreValues }),
					...(data.timeline !== undefined && { timeline: data.timeline }),
					...(data.whyChooseUs !== undefined && { whyChooseUs: data.whyChooseUs }),
					...(data.managementTeam !== undefined && { managementTeam: data.managementTeam }),
				},
			});
		}

		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}
