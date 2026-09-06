import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

const DEFAULT_CONTACT_INFO = {
	heroTitle: "Get in Touch with Us",
	heroTitleBn: "আমাদের সাথে যোগাযোগ করুন",
	heroDescription:
		"Have questions about our residential plots in Silicon City? Want to schedule a physical site visit or discuss membership guidelines? Reach out to our corporate help desk.",
	heroDescriptionBn:
		"সিলিকন সিটি প্রজেক্ট সম্পর্কে যেকোনো তথ্য জানতে বা সরাসরি প্রজেক্ট ভিজিট করতে আমাদের সাথে যোগাযোগ করুন।",
	address:
		"2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur, Dhaka-1207, Bangladesh",
	addressBn: "২/৩ (২য় তলা), ব্লক # এ, ইকবাল রোড, মোহাম্মদপুর, ঢাকা-১২০৭, বাংলাদেশ",
	phone: "+880 12 345 678, +880 1234 567 890",
	whatsapp: "+880 12 345 678",
	email: "info@siliconrealestatepvtltd.com",
	secondaryEmail: "siliconrealestate@gmail.com",
	website: "siliconrealestatepvtltd.com",
	businessHours: "Saturday - Thursday: 9:00 AM – 5:00 PM | Friday: Closed",
	businessHoursBn: "শনিবার - বৃহস্পতিবার: সকাল ৯:০০ – বিকাল ৫:০০ | শুক্রবার: সাপ্তাহিক ছুটি",
	mapEmbedUrl:
		"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8973685412356!2d90.3621!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf4f483c6d7d%3A0x6b4f74d6c6e18f2f!2sIqbal%20Rd%2C%20Dhaka%201207!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
	siteVisitNotice:
		"Silicon City is strategically located in Bara Badeshi Mouza, Savar, right next to the Turag River and adjacent to Mohammadpur Beribadh. We arrange physical site guided tours for our clients directly from our Corporate Office in Mohammadpur.",
	siteVisitNoticeBn:
		"সিলিকন সিটি সাভারের বড় বাদেশী মৌজায় তুরাগ নদীর কোল ঘেঁষে অবস্থিত। আমাদের মোহাম্মদপুর কর্পোরেট অফিস থেকে সরাসরি প্রজেক্টে সাইট পরিদর্শনের সুব্যবস্থা রয়েছে।",
	facebookUrl: "https://facebook.com",
	youtubeUrl: "https://youtube.com",
};

export async function GET() {
	try {
		let contact = await prisma.contactInfo.findUnique({
			where: { id: "global" },
		});

		if (!contact) {
			contact = await prisma.contactInfo.create({
				data: {
					id: "global",
					...DEFAULT_CONTACT_INFO,
				},
			});
		}

		return NextResponse.json({ success: true, contact, data: contact });
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
		const contact = await prisma.contactInfo.upsert({
			where: { id: "global" },
			update: {
				...(data.heroTitle !== undefined && { heroTitle: data.heroTitle }),
				...(data.heroTitleBn !== undefined && {
					heroTitleBn: data.heroTitleBn,
				}),
				...(data.heroDescription !== undefined && {
					heroDescription: data.heroDescription,
				}),
				...(data.heroDescriptionBn !== undefined && {
					heroDescriptionBn: data.heroDescriptionBn,
				}),
				...(data.address !== undefined && { address: data.address }),
				...(data.addressBn !== undefined && { addressBn: data.addressBn }),
				...(data.phone !== undefined && { phone: data.phone }),
				...(data.whatsapp !== undefined && { whatsapp: data.whatsapp }),
				...(data.email !== undefined && { email: data.email }),
				...(data.secondaryEmail !== undefined && {
					secondaryEmail: data.secondaryEmail,
				}),
				...(data.website !== undefined && { website: data.website }),
				...(data.businessHours !== undefined && {
					businessHours: data.businessHours,
				}),
				...(data.businessHoursBn !== undefined && {
					businessHoursBn: data.businessHoursBn,
				}),
				...(data.mapEmbedUrl !== undefined && {
					mapEmbedUrl: data.mapEmbedUrl,
				}),
				...(data.siteVisitNotice !== undefined && {
					siteVisitNotice: data.siteVisitNotice,
				}),
				...(data.siteVisitNoticeBn !== undefined && {
					siteVisitNoticeBn: data.siteVisitNoticeBn,
				}),
				...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
				...(data.facebookUrl !== undefined && {
					facebookUrl: data.facebookUrl,
				}),
				...(data.youtubeUrl !== undefined && { youtubeUrl: data.youtubeUrl }),
			},
			create: {
				id: "global",
				...DEFAULT_CONTACT_INFO,
				...data,
			},
		});

		return NextResponse.json({ success: true, contact, data: contact });
	} catch (error: any) {
		return errorResponse(error);
	}
}
