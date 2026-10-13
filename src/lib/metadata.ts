import type { Metadata } from "next";

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://siliconrealestatepvtltd.com";
const SITE_NAME =
	process.env.NEXT_PUBLIC_SITE_NAME || "Silicon Real Estate (Pvt.) Ltd.";
const TWITTER_HANDLE = "@siliconrealltd";

interface MetadataOptions {
	title: string;
	description: string;
	path?: string;
	image?: string;
	noindex?: boolean;
	keywords?: string[];
}

/**
 * Generate consistent metadata for any page.
 */
export function generateMetadata(options: MetadataOptions): Metadata {
	const {
		title,
		description,
		path = "",
		image,
		noindex = false,
		keywords,
	} = options;
	const url = `${SITE_URL}${path}`;
	const ogImage = image || `${SITE_URL}/opengraph-image`;

	return {
		title: `${title} | ${SITE_NAME}`,
		description,
		keywords: keywords || [
			"Silicon Real Estate",
			"Silicon City",
			"সিলিকন রিয়েল এস্টেট",
			"সিলিকন সিটি সাভার",
			"plots in Savar",
			"residential plots Mohammadpur",
			"RAJUK approved plot",
			"flood free land Dhaka",
			"100% mutation ready plot",
			"Dhaka real estate",
			"Mohammadpur Beribadh land",
		],
		authors: [{ name: SITE_NAME }],
		creator: SITE_NAME,
		publisher: SITE_NAME,
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		metadataBase: new URL(SITE_URL),
		alternates: {
			canonical: url,
		},
		openGraph: {
			type: "website",
			locale: "bn_BD",
			url,
			siteName: SITE_NAME,
			title: `${title} | ${SITE_NAME}`,
			description,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: `${title} - ${SITE_NAME}`,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${title} | ${SITE_NAME}`,
			description,
			images: [ogImage],
			creator: TWITTER_HANDLE,
		},
		robots: {
			index: !noindex,
			follow: !noindex,
			googleBot: {
				index: !noindex,
				follow: !noindex,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
	};
}

/**
 * Default site metadata.
 */
export const defaultMetadata: Metadata = {
	title: {
		default: `${SITE_NAME} — Silicon City Planned Mega Township`,
		template: `%s | ${SITE_NAME}`,
	},
	description:
		"সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ — মোহাম্মদপুর সংলগ্ন সাভারে তুরাগ নদীর তীরে ১৫০+ একর পরিকল্পিত মেগা টাউনশিপ 'সিলিকন সিটি'। ১৬–১৮ ফুট উঁচু বালু ভরাট ও ১০০% নিষ্কণ্টক প্লট।",
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: SITE_URL,
	},
	keywords: [
		"Silicon Real Estate",
		"Silicon City",
		"সিলিকন রিয়েল এস্টেট",
		"সিলিকন সিটি",
		"সাভার আবাসিক প্লট",
		"মোহাম্মদপুর সংলগ্ন জমি",
		"বন্যা মুক্ত প্লট",
		"রাজউক মাস্টারপ্ল্যান",
		"Dhaka plot for sale",
		"ready registration plot Dhaka",
	],
	openGraph: {
		type: "website",
		locale: "bn_BD",
		url: SITE_URL,
		siteName: SITE_NAME,
		title: `${SITE_NAME} — Silicon City Planned Mega Township`,
		description:
			"সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ — মোহাম্মদপুর সংলগ্ন সাভারে তুরাগ নদীর তীরে ১৫০+ একর পরিকল্পিত মেগা টাউনশিপ 'সিলিকন সিটি'।",
		images: [
			{
				url: `${SITE_URL}/opengraph-image`,
				width: 1200,
				height: 630,
				alt: SITE_NAME,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		creator: TWITTER_HANDLE,
		title: `${SITE_NAME} — Silicon City Planned Mega Township`,
		description:
			"সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ — মোহাম্মদপুর সংলগ্ন সাভারে তুরাগ নদীর তীরে ১৫০+ একর পরিকল্পিত মেগা টাউনশিপ 'সিলিকন সিটি'।",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: "/icon",
		shortcut: "/icon",
		apple: "/apple-icon",
	},
	manifest: "/manifest.webmanifest",
};
