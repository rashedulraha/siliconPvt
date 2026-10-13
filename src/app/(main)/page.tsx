import { HomePageClient } from "@/components/home/HomePageClient";
import { Metadata } from "next";

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://siliconrealestatepvtltd.com";

export const metadata: Metadata = {
	title: "Silicon Real Estate — Silicon City Planned Mega Township",
	description:
		"সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ — মোহাম্মদপুর সংলগ্ন সাভার বড় বাদেশী মৌজায় তুরাগ নদীর তীরে ১৫০+ একর পরিকল্পিত মেগা টাউনশিপ 'সিলিকন সিটি'। ১৬–১৮ ফুট উঁচু বালু ভরাট, ৩০/৪০ ফুট প্রশস্ত রাস্তা ও ১০০% নিষ্কণ্টক মিউটেশন প্রস্তুত প্লট।",
	keywords: [
		"Silicon Real Estate",
		"Silicon City",
		"সিলিকন সিটি সাভার",
		"সিলিকন রিয়েল এস্টেট",
		"প্লট সাভার ঢাকা",
		"মোহাম্মদপুর সংলগ্ন আবাসিক প্লট",
		"তুরাগ নদী আবাসন",
		"RAJUK masterplan plots",
		"flood free residential land Dhaka",
		"plots for sale near Mohammadpur",
	],
	alternates: {
		canonical: SITE_URL,
	},
	openGraph: {
		title: "Silicon Real Estate — Silicon City Planned Mega Township",
		description:
			"সাভার বড় বাদেশী মৌজায় মোহাম্মদপুর বেড়িবাঁধ সংলগ্ন ১৫০+ একর পরিকল্পিত আধুনিক আবাসন নগরী 'সিলিকন সিটি'র অফিশিয়াল প্ল্যাটফর্ম।",
		type: "website",
		url: SITE_URL,
		locale: "bn_BD",
		siteName: "Silicon Real Estate (Pvt.) Ltd.",
	},
};

export default function HomePage() {
	return <HomePageClient />;
}
