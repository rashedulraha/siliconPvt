import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

const DEFAULT_PROJECTS_CONTENT = {
	heroTitle: "Master Planned Townships &",
	heroTitleBn: "পরিকল্পিত আধুনিক মেগা টাউনশিপ ও",
	heroSubtitle: "Prime Land Developments",
	heroSubtitleBn: "নিরাপদ প্রাইম ল্যান্ড ডেভেলপমেন্ট",
	heroDesc:
		"Silicon Real Estate (Pvt.) Ltd. develops legally secure, environment-friendly, and flood-protected mega townships designed for peaceful living and high-yielding real estate investments in Dhaka.",
	heroDescBn:
		"সিলিকন রিয়েল এস্টেট (প্রাঃ) লিঃ আইনি সুরক্ষা, পরিবেশবান্ধব অবকাঠামো এবং বন্যা প্রতিরোধী আধুনিক মেগা টাউনশিপ বাস্তবায়নে শীর্ষস্থানীয়।",
	trustMetrics: [
		{
			value: "150+ Acres",
			valueBn: "১৫০+ একর",
			label: "Planned Township Area",
			labelBn: "পরিকল্পিত টাউনশিপ এলাকা",
		},
		{
			value: "16–18 ft",
			valueBn: "১৬–১৮ ফুট",
			label: "Elevated Soil Earthwork",
			labelBn: "উঁচু বালু ভরাটকৃত জমি",
		},
		{
			value: "30ft & 40ft",
			valueBn: "৩০ ও ৪০ ফুট",
			label: "Internal Avenue Roads",
			labelBn: "প্রশস্ত অভ্যন্তরীণ রাস্তা",
		},
		{
			value: "100% Ready",
			valueBn: "১০০% রেডি",
			label: "Clear Title & Mutation",
			labelBn: "নিষ্কণ্টক মালিকানা ও মিউটেশন",
		},
	],
	trustMetricsBn: [
		{ value: "১৫০+ একর", label: "পরিকল্পিত টাউনশিপ এলাকা" },
		{ value: "১৬–১৮ ফুট", label: "উঁচু বালু ভরাটকৃত জমি" },
		{ value: "৩০ ও ৪০ ফুট", label: "প্রশস্ত অভ্যন্তরীণ রাস্তা" },
		{ value: "১০০% রেডি", label: "নিষ্কণ্টক মালিকানা ও মিউটেশন" },
	],
	spotlightBadge: "FLAGSHIP TOWNSHIP",
	spotlightBadgeBn: "ফ্ল্যাগশিপ মেগা প্রজেক্ট",
	spotlightTitle: "Silicon City — Planned Eco-Township",
	spotlightTitleBn: "সিলিকন সিটি – পরিকল্পিত নিরাপদ আবাসন নগরী",
	spotlightDesc:
		"Located at Bara Badeshi Mouza, Savar, Dhaka — strategically positioned adjacent to Mohammadpur Beribadh along the scenic Turag River.",
	spotlightDescBn:
		"ঢাকার মোহাম্মদপুর সংলগ্ন সাভার বড় বাদেশী মৌজায়, রাজউকের সম্প্রসারিত মহাপরিকল্পনার আওতাভুক্ত ও ঢাকা বন্যা নিয়ন্ত্রণ বাঁধ সুরক্ষিত অঞ্চলে অবস্থিত।",
	spotlightTag: "ONGOING MEGA PROJECT",
	spotlightTagBn: "চলমান মেগা টাউনশিপ",
	spotlightBoxTitle: "RAJUK Extended Masterplan & Embankment Protected",
	spotlightBoxTitleBn: "রাজউক সম্প্রসারিত মাস্টারপ্ল্যান ও বন্যা নিয়ন্ত্রণ বাঁধ সুরক্ষিত",
	spotlightBoxDesc:
		"Silicon City falls under the proposed extended urban development master plan of RAJUK and is fully secured inside the proposed Dhaka Flood Protection Embankment for 100% environmental safety.",
	spotlightBoxDescBn:
		"সিলিকন সিটি রাজউকের প্রস্তাবিত সম্প্রসারিত মহাপরিকল্পনার আওতাভুক্ত এবং বন্যা নিয়ন্ত্রণ বাঁধের অভ্যন্তরে শতভাগ নিরাপদ।",
	spotlightLocation: "Savar (Bara Badeshi)",
	spotlightLocationBn: "সাভার (বড় বাদেশী মৌজা)",
	spotlightBadge2: "100% Ready Mutation",
	spotlightBadge2Bn: "১০০% রেডি মিউটেশন",
	specs: [
		{
			num: "01",
			numBn: "০১",
			title: "16 to 18 Feet Elevation",
			titleBn: "১৬ থেকে ১৮ ফুট উঁচু মাটি ভরাট",
			desc: "High-grade earth-filling and soil development executed up to 16–18 feet height, protecting all plots from monsoon floods.",
			descBn:
				"বন্যা সীমা থেকে ১৬–১৮ ফুট উঁচু বালু ভরাটকৃত স্থায়ী সমতল ভূমি যা সম্পূর্ণ জলাবদ্ধতামুক্ত।",
		},
		{
			num: "02",
			numBn: "০২",
			title: "30ft & 40ft Internal Roads",
			titleBn: "৩০ ও ৪০ ফুট প্রশস্ত আরসিসি সড়ক",
			desc: "Spacious concrete road networks ensuring effortless vehicular movement and smooth access throughout the township.",
			descBn: "মসৃণ ও নিরবচ্ছিন্ন যানবাহন চলাচলের জন্য সুপরিকল্পিত আরসিসি রাস্তা নেটওয়ার্ক।",
		},
		{
			num: "03",
			numBn: "০৩",
			title: "Turag River Bridge Link",
			titleBn: "তুরাগ নদীর উপর সরাসরি সেতু",
			desc: "Dedicated bridge connectivity under government processing linking Mohammadpur directly to Silicon City in just 10 minutes.",
			descBn:
				"তুরাগ নদীর তীরে কৌশলগত যোগাযোগ করিডোরে অবস্থিত হওয়ায় ঢাকার কেন্দ্রস্থলে দ্রুত যাতায়াত।",
		},
		{
			num: "04",
			numBn: "০৪",
			title: "100% Legal Title Ownership",
			titleBn: "১০০% নিষ্কণ্টক নামজারি ও সাব-রেজিস্ট্রি",
			desc: "Dispute-free ownership history with ready CS, SA, RS, and BS mutation records for instant deed execution.",
			descBn:
				"সিএস, এসএ, আরএস ও বিএস রেকর্ড যাচাইকৃত স্বচ্ছ দলিল ও তাৎক্ষণিক রেজিস্ট্রেশন সুবিধা।",
		},
	],
	specsBn: [
		{
			num: "০১",
			title: "১৬ থেকে ১৮ ফুট উঁচু মাটি ভরাট",
			desc: "বন্যা সীমা থেকে ১৬–১৮ ফুট উঁচু বালু ভরাটকৃত স্থায়ী সমতল ভূমি যা সম্পূর্ণ জলাবদ্ধতামুক্ত।",
		},
		{
			num: "০২",
			title: "৩০ ও ৪০ ফুট প্রশস্ত আরসিসি সড়ক",
			desc: "মসৃণ ও নিরবচ্ছিন্ন যানবাহন চলাচলের জন্য সুপরিকল্পিত আরসিসি রাস্তা নেটওয়ার্ক।",
		},
		{
			num: "০৩",
			title: "১০০% নিষ্কণ্টক নামজারি ও সাব-রেজিস্ট্রি",
			desc: "সিএস, এসএ, আরএস ও বিএস রেকর্ড যাচাইকৃত স্বচ্ছ দলিল ও তাৎক্ষণিক রেজিস্ট্রেশন সুবিধা।",
		},
		{
			num: "০৪",
			title: "মোহাম্মদপুর থেকে মাত্র ১৫ মিনিটের দূরত্ব",
			desc: "তুরাগ নদীর তীরে কৌশলগত যোগাযোগ করিডোরে অবস্থিত হওয়ায় ঢাকার কেন্দ্রস্থলে দ্রুত যাতায়াত।",
		},
	],
	categories: [
		{
			title: "Residential Plots",
			titleBn: "আবাসিক প্লট",
			tag: "3, 5 & 10 Kathas",
			tagBn: "৩, ৫ ও ১০ কাঠা",
			desc: "Secure, demarcated, and ready-to-register plots inside highly organized residential blocks with 30ft/40ft wide internal avenues.",
			descBn:
				"৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ রাস্তা এবং শতভাগ নিষ্কণ্টক মালিকানায় পরিকল্পিত ব্লকে চমৎকার আবাসিক প্লট।",
			features: [
				"16–18ft soil elevation",
				"30ft internal concrete roads",
				"Instant mutation & deed execution",
			],
			featuresBn: [
				"১৬-১৮ ফুট উঁচু বালু ভরাট",
				"৩০ ফুট অভ্যন্তরীণ আরসিসি রাস্তা",
				"তাৎক্ষণিক নামজারি ও দলিল রেজিস্ট্রি",
			],
		},
		{
			title: "Commercial Plots",
			titleBn: "বাণিজ্যিক প্লট",
			tag: "Main Road Frontage",
			tagBn: "প্রধান সড়ক সংলগ্ন",
			desc: "Separate designated commercial zones for corporate offices, retail shopping outlets, educational institutions, and healthcare centers.",
			descBn:
				"করপোরেট অফিস, শপিং কমপ্লেক্স, ডায়াগনস্টিক সেন্টার ও শিক্ষাপ্রতিষ্ঠানের জন্য নির্ধারিত বাণিজ্যিক জোন।",
			features: [
				"40ft main boulevard frontage",
				"High investment yield & ROI",
				"Separate customer parking zones",
			],
			featuresBn: [
				"৪০ ফুট প্রধান এভিনিউ ফ্রন্ট",
				"উচ্চ বিনিয়োগ মূল্যায়ন ও রিটার্ন",
				"প্রশস্ত পার্কিং ও ড্রাইভওয়ে",
			],
		},
	],
	categoriesBn: [
		{
			title: "আবাসিক প্লট",
			tag: "৩, ৫ ও ১০ কাঠা",
			desc: "৩০ ও ৪০ ফুট চওড়া অভ্যন্তরীণ রাস্তা এবং শতভাগ নিষ্কণ্টক মালিকানায় পরিকল্পিত ব্লকে চমৎকার আবাসিক প্লট।",
			features: [
				"১৬-১৮ ফুট উঁচু বালু ভরাট",
				"৩০ ফুট অভ্যন্তরীণ আরসিসি রাস্তা",
				"তাৎক্ষণিক নামজারি ও দলিল রেজিস্ট্রি",
			],
		},
		{
			title: "বাণিজ্যিক প্লট",
			tag: "প্রধান সড়ক সংলগ্ন",
			desc: "করপোরেট অফিস, শপিং কমপ্লেক্স, ডায়াগনস্টিক সেন্টার ও শিক্ষাপ্রতিষ্ঠানের জন্য নির্ধারিত বাণিজ্যিক জোন।",
			features: [
				"৪০ ফুট প্রধান এভিনিউ ফ্রন্ট",
				"উচ্চ বিনিয়োগ মূল্যায়ন ও রিটার্ন",
				"প্রশস্ত পার্কিং ও ড্রাইভওয়ে",
			],
		},
	],
	amenities: [
		{
			title: "Grand Central Mosque",
			titleBn: "গ্র্যান্ড সেন্ট্রাল জামে মসজিদ",
			desc: "Central grand mosque along with designated block-based mosques for daily community prayers.",
			descBn: "সুবিশাল দৃষ্টিনন্দন সেন্ট্রাল মসজিদ এবং প্রতিটি ব্লকে নামাজের পৃথক ব্যবস্থা।",
			tag: "Religious Center",
			tagBn: "আধ্যাত্মিক কেন্দ্র",
		},
		{
			title: "Sports & Athletics Grounds",
			titleBn: "খেলার মাঠ ও বিনোদন পার্ক",
			desc: "Dedicated standard football field, cricket grounds, and sports recreation for active youth.",
			descBn: "সন্তানদের খেলাধুলা ও পারিবারিক বিনোদনের জন্য সবুজ খোলা মাঠ ও পার্ক।",
			tag: "Sports Facilities",
			tagBn: "শারীরিক বিকাশ",
		},
		{
			title: "Riverfront Eco Parks",
			titleBn: "নদীতীরবর্তী গ্রিন করিডোর",
			desc: "Dedicated green open spaces, children's playgrounds, and scenic riverfront walking boulevards.",
			descBn: "তুরাগ নদীর তীরে প্রাকৃতিক নির্মল পরিবেশ ও দৃষ্টিনন্দন ওয়াকওয়ে।",
			tag: "Green Environment",
			tagBn: "প্রাকৃতিক শোভা",
		},
		{
			title: "School & College Campuses",
			titleBn: "স্কুল ও কলেজ ক্যাম্পাস",
			desc: "Reserved spaces for top-tier educational institutions inside the township boundaries.",
			descBn: "টাউনশিপের অভ্যন্তরে মানসম্মত শিক্ষা নিশ্চিতকরণে সংরক্ষিত শিক্ষা জোন।",
			tag: "Education",
			tagBn: "শিক্ষা সুবিধা",
		},
		{
			title: "Healthcare & Medical Center",
			titleBn: "হাসপাতাল ও ডায়াগনস্টিক সেন্টার",
			desc: "Modern hospital and 24/7 emergency diagnostic center zone for instant medical support.",
			descBn: "২৪/৭ জরুরি স্বাস্থ্যসেবা ও আধুনিক চিকিৎসা সুবিধা নিশ্চিত করার পরিকল্পনা।",
			tag: "Healthcare",
			tagBn: "চিকিৎসা কেন্দ্র",
		},
		{
			title: "Commercial Markets & Hubs",
			titleBn: "শপিং মল ও কমিউনিটি মার্কেট",
			desc: "Dedicated shopping malls, daily grocery markets, and corporate banking retail centers.",
			descBn: "নিত্যপ্রয়োজনীয় কেনাকাটা ও বাণিজ্যিক কার্যক্রমের জন্য সুবিন্যস্ত শপিং কমপ্লেক্স।",
			tag: "Commercial Hub",
			tagBn: "বাণিজ্যিক জোন",
		},
	],
	amenitiesBn: [
		{
			title: "গ্র্যান্ড সেন্ট্রাল জামে মসজিদ",
			desc: "সুবিশাল দৃষ্টিনন্দন সেন্ট্রাল মসজিদ এবং প্রতিটি ব্লকে নামাজের পৃথক ব্যবস্থা।",
			tag: "আধ্যাত্মিক কেন্দ্র",
		},
		{
			title: "খেলার মাঠ ও বিনোদন পার্ক",
			desc: "সন্তানদের খেলাধুলা ও পারিবারিক বিনোদনের জন্য সবুজ খোলা মাঠ ও পার্ক।",
			tag: "শারীরিক বিকাশ",
		},
		{
			title: "নদীতীরবর্তী গ্রিন করিডোর",
			desc: "তুরাগ নদীর তীরে প্রাকৃতিক নির্মল পরিবেশ ও দৃষ্টিনন্দন ওয়াকওয়ে।",
			tag: "প্রাকৃতিক শোভা",
		},
		{
			title: "স্কুল ও কলেজ ক্যাম্পাস",
			desc: "টাউনশিপের অভ্যন্তরে মানসম্মত শিক্ষা নিশ্চিতকরণে সংরক্ষিত শিক্ষা জোন।",
			tag: "শিক্ষা সুবিধা",
		},
		{
			title: "হাসপাতাল ও ডায়াগনস্টিক সেন্টার",
			desc: "২৪/৭ জরুরি স্বাস্থ্যসেবা ও আধুনিক চিকিৎসা সুবিধা নিশ্চিত করার পরিকল্পনা।",
			tag: "চিকিৎসা কেন্দ্র",
		},
		{
			title: "শপিং মল ও কমিউনিটি মার্কেট",
			desc: "নিত্যপ্রয়োজনীয় কেনাকাটা ও বাণিজ্যিক কার্যক্রমের জন্য সুবিন্যস্ত শপিং কমপ্লেক্স।",
			tag: "বাণিজ্যিক জোন",
		},
	],
	proximities: [
		{
			category: "Administrative & Commercial Hubs",
			categoryBn: "প্রশাসনিক ও বাণিজ্যিক কেন্দ্র",
			items: [
				{
					name: "National Parliament House",
					nameBn: "জাতীয় সংসদ ভবন",
					dist: "3.0 km",
					distBn: "৩.০ কিমি",
				},
				{
					name: "Agargaon Administrative Area",
					nameBn: "আগারগাঁও প্রশাসনিক এলাকা",
					dist: "3.5 km",
					distBn: "৩.৫ কিমি",
				},
				{
					name: "Japan Garden City",
					nameBn: "জাপান গার্ডেন সিটি",
					dist: "2.0 km",
					distBn: "২.০ কিমি",
				},
				{
					name: "Mohammadpur Town Hall",
					nameBn: "মোহাম্মদপুর টাউন হল",
					dist: "2.2 km",
					distBn: "২.২ কিমি",
				},
				{
					name: "Historic Shia Mosque",
					nameBn: "ঐতিহাসিক শিয়া মসজিদ",
					dist: "2.5 km",
					distBn: "২.৫ কিমি",
				},
			],
		},
		{
			category: "Top Educational Institutions",
			categoryBn: "শীর্ষস্থানীয় শিক্ষাপ্রতিষ্ঠান",
			items: [
				{
					name: "St. Joseph Higher Secondary School",
					nameBn: "সেন্ট জোসেফ হায়ার সেকেন্ডারি স্কুল",
					dist: "2.8 km",
					distBn: "২.৮ কিমি",
				},
				{
					name: "Mohammadpur Model College",
					nameBn: "মোহাম্মদপুর মডেল কলেজ",
					dist: "2.5 km",
					distBn: "২.৫ কিমি",
				},
				{
					name: "Mohammadpur Preparatory School",
					nameBn: "মোহাম্মদপুর প্রিপারেটরি স্কুল",
					dist: "2.3 km",
					distBn: "২.৩ কিমি",
				},
				{
					name: "Dhaka Residential Model College",
					nameBn: "ঢাকা রেসিডেন্সিয়াল মডেল কলেজ",
					dist: "3.4 km",
					distBn: "৩.৪ কিমি",
				},
			],
		},
	],
	proximitiesBn: [
		{
			category: "প্রশাসনিক ও বাণিজ্যিক কেন্দ্র",
			items: [
				{ name: "জাতীয় সংসদ ভবন", dist: "৩.০ কিমি" },
				{ name: "আগারগাঁও প্রশাসনিক এলাকা", dist: "৩.৫ কিমি" },
				{ name: "জাপান গার্ডেন সিটি", dist: "২.০ কিমি" },
				{ name: "মোহাম্মদপুর টাউন হল", dist: "২.২ কিমি" },
				{ name: "ঐতিহাসিক শিয়া মসজিদ", dist: "২.৫ কিমি" },
			],
		},
		{
			category: "শীর্ষস্থানীয় শিক্ষাপ্রতিষ্ঠান",
			items: [
				{ name: "সেন্ট জোসেফ হায়ার সেকেন্ডারি স্কুল", dist: "২.৮ কিমি" },
				{ name: "মোহাম্মদপুর মডেল কলেজ", dist: "২.৫ কিমি" },
				{ name: "মোহাম্মদপুর প্রিপারেটরি স্কুল", dist: "২.৩ কিমি" },
				{ name: "ঢাকা রেসিডেন্সিয়াল মডেল কলেজ", dist: "৩.৪ কিমি" },
			],
		},
	],
	roadmap: [
		{
			step: "01",
			stepBn: "০১",
			title: "Plot Selection & Site Tour",
			titleBn: "জমি অধিগ্রহণ ও নিষ্কণ্টককরণ",
			desc: "Explore master layouts and schedule a guided vehicle tour to inspect your chosen plot location in Silicon City.",
			descBn: "১০০% ভেরিফাইড দলিলপত্রসহ বড় বাদেশী মৌজায় জমি অধিগ্রহণ সম্পন্ন।",
		},
		{
			step: "02",
			stepBn: "০২",
			title: "Legal Paper Vetting",
			titleBn: "মেগা বালু ভরাট ও ভূমি উন্নয়ন",
			desc: "Review authentic CS, SA, RS, and BS Khatian documents with our specialized in-house legal department.",
			descBn: "১৬–১৮ ফুট উচ্চতায় মাটি ও বালু ভরাট করে নিরাপদ সমতল ভূমি তৈরি।",
		},
		{
			step: "03",
			stepBn: "০৩",
			title: "Application & Booking",
			titleBn: "অভ্যন্তরীণ সড়ক ও ড্রেনেজ নেটওয়ার্ক",
			desc: "Submit the official Allotment Booking Form at our Mohammadpur Corporate Office with NID and registration papers.",
			descBn: "৩০ ও ৪০ ফুট প্রশস্ত আরসিসি সড়ক এবং উন্নত ড্রেনেজ কাঠামোর কাজ চলমান।",
		},
		{
			step: "04",
			stepBn: "০৪",
			title: "Demarcation & Deed Handover",
			titleBn: "নাগরিক সুবিধা ও চূড়ান্ত হস্তান্তর",
			desc: "Complete the installment or one-time payment to receive plot demarcation and official registered deed.",
			descBn: "মসজিদ, পার্ক, বিদ্যুৎ সংযোগ এবং ব্লকভিত্তিক প্লট সীমানা ও দখল হস্তান্তর।",
		},
	],
	roadmapBn: [
		{
			step: "০১",
			title: "জমি অধিগ্রহণ ও নিষ্কণ্টককরণ",
			desc: "১০০% ভেরিফাইড দলিলপত্রসহ বড় বাদেশী মৌজায় জমি অধিগ্রহণ সম্পন্ন।",
		},
		{
			step: "০২",
			title: "মেগা বালু ভরাট ও ভূমি উন্নয়ন",
			desc: "১৬–১৮ ফুট উচ্চতায় মাটি ও বালু ভরাট করে নিরাপদ সমতল ভূমি তৈরি।",
		},
		{
			step: "০৩",
			title: "অভ্যন্তরীণ সড়ক ও ড্রেনেজ নেটওয়ার্ক",
			desc: "৩০ ও ৪০ ফুট প্রশস্ত আরসিসি সড়ক এবং উন্নত ড্রেনেজ কাঠামোর কাজ চলমান।",
		},
		{
			step: "০৪",
			title: "নাগরিক সুবিধা ও চূড়ান্ত হস্তান্তর",
			desc: "মসজিদ, পার্ক, বিদ্যুৎ সংযোগ এবং ব্লকভিত্তিক প্লট সীমানা ও দখল হস্তান্তর।",
		},
	],
	ctaBadge: "DIRECT CONSULTATION DESK",
	ctaBadgeBn: "সরাসরি পরামর্শ ডেস্ক",
	ctaTitle: "Ready to Secure Your Plot in Silicon City?",
	ctaTitleBn: "সিলিকন সিটিতে প্লট বরাদ্দ নিতে প্রস্তুত?",
	ctaDesc:
		"Schedule a guided vehicle site visit or speak directly with our senior property advisors at our Mohammadpur Corporate Office.",
	ctaDescBn:
		"মোহাম্মদপুর কর্পোরেট অফিস থেকে সরাসরি সিনিয়র প্রপার্টি উপদেষ্টাদের সাথে কথা বলুন অথবা সাইট পরিদর্শন শিডিউল করুন।",
	ctaHotline: "+880 12 345 678 / +880 1712 345 678",
	ctaEmail: "info@siliconrealestatepvtltd.com",
	ctaOffice: "2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka-1207",
	ctaOfficeBn: "২/৩ (২য় তলা), ব্লক-এ, ইকবাল রোড, মোহাম্মদপুর, ঢাকা-১২০৭",
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
					...(data.heroTitleBn !== undefined && {
						heroTitleBn: data.heroTitleBn,
					}),
					...(data.heroSubtitle !== undefined && {
						heroSubtitle: data.heroSubtitle,
					}),
					...(data.heroSubtitleBn !== undefined && {
						heroSubtitleBn: data.heroSubtitleBn,
					}),
					...(data.heroDesc !== undefined && { heroDesc: data.heroDesc }),
					...(data.heroDescBn !== undefined && { heroDescBn: data.heroDescBn }),
					...(data.trustMetrics !== undefined && {
						trustMetrics: data.trustMetrics as any,
					}),
					...(data.trustMetricsBn !== undefined && {
						trustMetricsBn: data.trustMetricsBn as any,
					}),
					...(data.spotlightBadge !== undefined && {
						spotlightBadge: data.spotlightBadge,
					}),
					...(data.spotlightBadgeBn !== undefined && {
						spotlightBadgeBn: data.spotlightBadgeBn,
					}),
					...(data.spotlightTitle !== undefined && {
						spotlightTitle: data.spotlightTitle,
					}),
					...(data.spotlightTitleBn !== undefined && {
						spotlightTitleBn: data.spotlightTitleBn,
					}),
					...(data.spotlightDesc !== undefined && {
						spotlightDesc: data.spotlightDesc,
					}),
					...(data.spotlightDescBn !== undefined && {
						spotlightDescBn: data.spotlightDescBn,
					}),
					...(data.spotlightTag !== undefined && {
						spotlightTag: data.spotlightTag,
					}),
					...(data.spotlightTagBn !== undefined && {
						spotlightTagBn: data.spotlightTagBn,
					}),
					...(data.spotlightBoxTitle !== undefined && {
						spotlightBoxTitle: data.spotlightBoxTitle,
					}),
					...(data.spotlightBoxTitleBn !== undefined && {
						spotlightBoxTitleBn: data.spotlightBoxTitleBn,
					}),
					...(data.spotlightBoxDesc !== undefined && {
						spotlightBoxDesc: data.spotlightBoxDesc,
					}),
					...(data.spotlightBoxDescBn !== undefined && {
						spotlightBoxDescBn: data.spotlightBoxDescBn,
					}),
					...(data.spotlightLocation !== undefined && {
						spotlightLocation: data.spotlightLocation,
					}),
					...(data.spotlightLocationBn !== undefined && {
						spotlightLocationBn: data.spotlightLocationBn,
					}),
					...(data.spotlightBadge2 !== undefined && {
						spotlightBadge2: data.spotlightBadge2,
					}),
					...(data.spotlightBadge2Bn !== undefined && {
						spotlightBadge2Bn: data.spotlightBadge2Bn,
					}),
					...(data.specs !== undefined && { specs: data.specs as any }),
					...(data.specsBn !== undefined && { specsBn: data.specsBn as any }),
					...(data.categories !== undefined && {
						categories: data.categories as any,
					}),
					...(data.categoriesBn !== undefined && {
						categoriesBn: data.categoriesBn as any,
					}),
					...(data.amenities !== undefined && {
						amenities: data.amenities as any,
					}),
					...(data.amenitiesBn !== undefined && {
						amenitiesBn: data.amenitiesBn as any,
					}),
					...(data.proximities !== undefined && {
						proximities: data.proximities as any,
					}),
					...(data.proximitiesBn !== undefined && {
						proximitiesBn: data.proximitiesBn as any,
					}),
					...(data.roadmap !== undefined && { roadmap: data.roadmap as any }),
					...(data.roadmapBn !== undefined && {
						roadmapBn: data.roadmapBn as any,
					}),
					...(data.ctaBadge !== undefined && { ctaBadge: data.ctaBadge }),
					...(data.ctaBadgeBn !== undefined && { ctaBadgeBn: data.ctaBadgeBn }),
					...(data.ctaTitle !== undefined && { ctaTitle: data.ctaTitle }),
					...(data.ctaTitleBn !== undefined && { ctaTitleBn: data.ctaTitleBn }),
					...(data.ctaDesc !== undefined && { ctaDesc: data.ctaDesc }),
					...(data.ctaDescBn !== undefined && { ctaDescBn: data.ctaDescBn }),
					...(data.ctaHotline !== undefined && { ctaHotline: data.ctaHotline }),
					...(data.ctaEmail !== undefined && { ctaEmail: data.ctaEmail }),
					...(data.ctaOffice !== undefined && { ctaOffice: data.ctaOffice }),
					...(data.ctaOfficeBn !== undefined && {
						ctaOfficeBn: data.ctaOfficeBn,
					}),
				},
			});
		}

		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}
