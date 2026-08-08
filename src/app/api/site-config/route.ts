import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		success: true,
		data: {
			siteName: "Silicon Real Estate (Pvt.) Ltd.",
			address:
				"2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur, Dhaka-1207",
			phone: "+880 12 345 678",
			whatsapp: "+880 12 345 678",
			email: "info@siliconrealestatepvtltd.com",
			secondaryEmail: "siliconrealestate@gmail.com",
			social: {
				facebook: "https://facebook.com",
				twitter: "https://twitter.com",
				instagram: "https://instagram.com",
				linkedin: "https://linkedin.com",
				youtube: "https://youtube.com",
			},
		},
	});
}
