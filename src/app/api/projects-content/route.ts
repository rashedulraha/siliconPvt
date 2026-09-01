import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorResponse, verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

const DEFAULT_PROJECTS_CONTENT = {
	heroTitle: "Master Planned Townships &",
	heroSubtitle: "Prime Land Developments",
	heroDesc:
		"Silicon Real Estate (Pvt.) Ltd. develops legally secure, environment-friendly, and flood-protected mega townships designed for peaceful living and high-yielding real estate investments in Dhaka.",
	trustMetrics: [
		{ value: "150+ Acres", label: "Planned Township Area" },
		{ value: "16–18 ft", label: "Elevated Soil Earthwork" },
		{ value: "30ft & 40ft", label: "Internal Avenue Roads" },
		{ value: "100% Ready", label: "Clear Title & Mutation" },
	],
	spotlightBadge: "FLAGSHIP TOWNSHIP",
	spotlightTitle: "Silicon City — Planned Eco-Township",
	spotlightDesc:
		"Located at Bara Badeshi Mouza, Savar, Dhaka — strategically positioned adjacent to Mohammadpur Beribadh along the scenic Turag River.",
	spotlightTag: "ONGOING MEGA PROJECT",
	spotlightBoxTitle: "RAJUK Extended Masterplan & Embankment Protected",
	spotlightBoxDesc:
		"Silicon City falls under the proposed extended urban development master plan of RAJUK and is fully secured inside the proposed Dhaka Flood Protection Embankment for 100% environmental safety.",
	spotlightLocation: "Savar (Bara Badeshi)",
	spotlightBadge2: "100% Ready Mutation",
	specs: [
		{
			num: "01",
			title: "16 to 18 Feet Elevation",
			desc: "High-grade earth-filling and soil development executed up to 16–18 feet height, protecting all plots from monsoon floods.",
		},
		{
			num: "02",
			title: "30ft & 40ft Internal Roads",
			desc: "Spacious concrete road networks ensuring effortless vehicular movement and smooth access throughout the township.",
		},
		{
			num: "03",
			title: "Turag River Bridge Link",
			desc: "Dedicated bridge connectivity under government processing linking Mohammadpur directly to Silicon City in just 10 minutes.",
		},
		{
			num: "04",
			title: "100% Legal Title Ownership",
			desc: "Dispute-free ownership history with ready CS, SA, RS, and BS mutation records for instant deed execution.",
		},
	],
	categories: [
		{
			title: "Residential Plots",
			tag: "3, 5 & 10 Kathas",
			desc: "Secure, demarcated, and ready-to-register plots inside highly organized residential blocks with 30ft/40ft wide internal avenues.",
			features: [
				"16–18ft soil elevation",
				"30ft internal concrete roads",
				"Instant mutation & deed execution",
			],
		},
		{
			title: "Commercial Plots",
			tag: "Main Road Frontage",
			desc: "Separate designated commercial zones for corporate offices, retail shopping outlets, educational institutions, and healthcare centers.",
			features: [
				"40ft main boulevard frontage",
				"High investment yield & ROI",
				"Separate customer parking zones",
			],
		},
		{
			title: "Ready Luxury Flats",
			tag: "3 & 4 Bedroom Flats",
			desc: "Planned residential apartment complexes featuring contemporary architectural layouts, modern elevators, and riverfront views.",
			features: [
				"Scenic Turag river views",
				"Modern elevator & 24/7 security",
				"Dedicated community halls",
			],
		},
	],
	amenities: [
		{
			title: "Grand Central Mosque",
			desc: "Central grand mosque along with designated block-based mosques for daily community prayers.",
			tag: "Religious Center",
		},
		{
			title: "Sports & Athletics Grounds",
			desc: "Dedicated standard football field, cricket grounds, and sports recreation for active youth.",
			tag: "Sports Facilities",
		},
		{
			title: "Riverfront Eco Parks",
			desc: "Dedicated green open spaces, children's playgrounds, and scenic riverfront walking boulevards.",
			tag: "Green Environment",
		},
		{
			title: "School & College Campuses",
			desc: "Reserved spaces for top-tier educational institutions inside the township boundaries.",
			tag: "Education",
		},
		{
			title: "Healthcare & Medical Center",
			desc: "Modern hospital and 24/7 emergency diagnostic center zone for instant medical support.",
			tag: "Healthcare",
		},
		{
			title: "Commercial Markets & Hubs",
			desc: "Dedicated shopping malls, daily grocery markets, and corporate banking retail centers.",
			tag: "Commercial Hub",
		},
	],
	proximities: [
		{
			category: "Administrative & Commercial Hubs",
			items: [
				{ name: "National Parliament House", dist: "3.0 km" },
				{ name: "Agargaon Administrative Area", dist: "3.5 km" },
				{ name: "Japan Garden City", dist: "2.0 km" },
				{ name: "Mohammadpur Town Hall", dist: "2.2 km" },
				{ name: "Historic Shia Mosque", dist: "2.5 km" },
			],
		},
		{
			category: "Top Educational Institutions",
			items: [
				{ name: "St. Joseph Higher Secondary School", dist: "2.8 km" },
				{ name: "Mohammadpur Model College", dist: "2.5 km" },
				{ name: "Mohammadpur Preparatory School", dist: "2.3 km" },
				{ name: "Green Herald International School", dist: "3.1 km" },
				{ name: "Dhaka Residential Model College", dist: "3.4 km" },
			],
		},
		{
			category: "Specialized Healthcare Centers",
			items: [
				{ name: "National Eye Science Hospital", dist: "3.0 km" },
				{ name: "Cardiovascular Diseases Institute", dist: "3.2 km" },
				{ name: "NITOR / Pongu Hospital", dist: "3.3 km" },
				{ name: "Shaheed Suhrawardy Medical College", dist: "3.6 km" },
				{ name: "Ibn Sina Hospital (Dhanmondi Link)", dist: "3.8 km" },
			],
		},
	],
	roadmap: [
		{
			step: "01",
			title: "Plot Selection & Site Tour",
			desc: "Explore master layouts and schedule a guided vehicle tour to inspect your chosen plot location in Silicon City.",
		},
		{
			step: "02",
			title: "Legal Paper Vetting",
			desc: "Review authentic CS, SA, RS, and BS Khatian documents with our specialized in-house legal department.",
		},
		{
			step: "03",
			title: "Application & Booking",
			desc: "Submit the official Allotment Booking Form at our Mohammadpur Corporate Office with NID and registration papers.",
		},
		{
			step: "04",
			title: "Demarcation & Deed Handover",
			desc: "Complete the installment or one-time payment to receive plot demarcation and official registered deed.",
		},
	],
	ctaBadge: "DIRECT CONSULTATION DESK",
	ctaTitle: "Ready to Secure Your Plot in Silicon City?",
	ctaDesc:
		"Schedule a guided vehicle site visit or speak directly with our senior property advisors at our Mohammadpur Corporate Office.",
	ctaHotline: "+880 12 345 678 / +880 1712 345 678",
	ctaEmail: "info@siliconrealestatepvtltd.com",
	ctaOffice: "2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka-1207",
};

export async function GET() {
	try {
		let content = await prisma.projectsContent.findFirst();
		if (!content) {
			content = await prisma.projectsContent.create({
				data: DEFAULT_PROJECTS_CONTENT as any,
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
		let existing = await prisma.projectsContent.findFirst();

		let content;
		if (!existing) {
			content = await prisma.projectsContent.create({
				data: {
					...DEFAULT_PROJECTS_CONTENT,
					...data,
				} as any,
			});
		} else {
			content = await prisma.projectsContent.update({
				where: { id: existing.id },
				data: {
					...(data.heroTitle !== undefined && { heroTitle: data.heroTitle }),
					...(data.heroSubtitle !== undefined && { heroSubtitle: data.heroSubtitle }),
					...(data.heroDesc !== undefined && { heroDesc: data.heroDesc }),
					...(data.trustMetrics !== undefined && { trustMetrics: data.trustMetrics as any }),
					...(data.spotlightBadge !== undefined && { spotlightBadge: data.spotlightBadge }),
					...(data.spotlightTitle !== undefined && { spotlightTitle: data.spotlightTitle }),
					...(data.spotlightDesc !== undefined && { spotlightDesc: data.spotlightDesc }),
					...(data.spotlightTag !== undefined && { spotlightTag: data.spotlightTag }),
					...(data.spotlightBoxTitle !== undefined && { spotlightBoxTitle: data.spotlightBoxTitle }),
					...(data.spotlightBoxDesc !== undefined && { spotlightBoxDesc: data.spotlightBoxDesc }),
					...(data.spotlightLocation !== undefined && { spotlightLocation: data.spotlightLocation }),
					...(data.spotlightBadge2 !== undefined && { spotlightBadge2: data.spotlightBadge2 }),
					...(data.specs !== undefined && { specs: data.specs as any }),
					...(data.categories !== undefined && { categories: data.categories as any }),
					...(data.amenities !== undefined && { amenities: data.amenities as any }),
					...(data.proximities !== undefined && { proximities: data.proximities as any }),
					...(data.roadmap !== undefined && { roadmap: data.roadmap as any }),
					...(data.ctaBadge !== undefined && { ctaBadge: data.ctaBadge }),
					...(data.ctaTitle !== undefined && { ctaTitle: data.ctaTitle }),
					...(data.ctaDesc !== undefined && { ctaDesc: data.ctaDesc }),
					...(data.ctaHotline !== undefined && { ctaHotline: data.ctaHotline }),
					...(data.ctaEmail !== undefined && { ctaEmail: data.ctaEmail }),
					...(data.ctaOffice !== undefined && { ctaOffice: data.ctaOffice }),
				},
			});
		}

		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}
