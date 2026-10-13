import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SkipToContent } from "@/components/feedback/SkipToContent";

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "RealEstateAgent",
	name: "Silicon Real Estate (Pvt.) Ltd.",
	alternateName: "Silicon City Planned Township",
	url: "https://siliconrealestatepvtltd.com",
	logo: "https://siliconrealestatepvtltd.com/silicon.png",
	image: "https://siliconrealestatepvtltd.com/silicon.png",
	description:
		"Silicon Real Estate (Pvt.) Ltd. is developing Silicon City, a 150+ acre master-planned mega township in Savar, Dhaka, positioned along the scenic Turag River and directly connected to Mohammadpur Beribadh.",
	telephone: "+88012345678",
	email: "info@siliconrealestatepvtltd.com",
	address: {
		"@type": "PostalAddress",
		streetAddress: "2/3 (2nd Floor), Block-A, Iqbal Road",
		addressLocality: "Mohammadpur",
		addressRegion: "Dhaka",
		postalCode: "1207",
		addressCountry: "BD",
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: 23.7509,
		longitude: 90.3621,
	},
	openingHoursSpecification: {
		"@type": "OpeningHoursSpecification",
		dayOfWeek: [
			"Saturday",
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
		],
		opens: "09:00",
		closes: "17:00",
	},
	sameAs: ["https://facebook.com", "https://youtube.com"],
};

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<SkipToContent />
			<div className="relative flex min-h-screen flex-col">
				<Navbar />
				<main id="main-content" tabIndex={-1} className="flex-1 outline-none">
					{children}
				</main>
				<Footer />
			</div>
			<FloatingActions />
			<ScrollToTop />
		</>
	);
}
