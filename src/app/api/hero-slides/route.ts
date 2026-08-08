import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		success: true,
		data: [
			{
				id: "slide-1",
				slogan: "A Secure Home for Future Generations",
				englishSlogan: "Architecting Premium Living Spaces",
				title: "Your Trusted Partner in Land Investment",
				description:
					"RAJUK-approved prime plots adjacent to Turag River featuring 100% verified legal titles and tailored payment structures.",
				image:
					"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
				ctaText1: "Explore Projects",
				ctaLink1: "/projects",
				ctaText2: "Learn Membership",
				ctaLink2: "/membership",
			},
			{
				id: "slide-2",
				slogan: "Planned & Modern Urbanization",
				englishSlogan: "Masterplanned Riverside Township",
				title: "Silicon City — Modern Township at Mohammadpur",
				description:
					"Engineered with 30ft & 40ft wide avenue roads, central mosque, educational zone, healthcare, and green walkways.",
				image:
					"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
				ctaText1: "View Silicon City",
				ctaLink1: "/projects",
				ctaText2: "Book Site Visit",
				ctaLink2: "/contact",
			},
			{
				id: "slide-3",
				slogan: "Complete Legal Security & Transparency",
				englishSlogan: "Verified Ownership & High ROI Growth",
				title: "Securing Wealth for 1,500+ Satisfied Investors",
				description:
					"Instant deed registration, clean land mutation, and legal advisory ensuring long-term asset security.",
				image:
					"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
				ctaText1: "Our Services",
				ctaLink1: "/services",
				ctaText2: "Contact Us",
				ctaLink2: "/contact",
			},
		],
	});
}
