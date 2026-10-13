/**
 * Utility helpers for extracting and formatting YouTube Drone Footage URLs & Video IDs
 */

export interface DroneVideoItem {
	id: string;
	title: string;
	titleBn: string;
	subtitle: string;
	subtitleBn: string;
	badge: string;
	badgeBn: string;
	poster: string;
}

export function extractYouTubeId(urlOrId?: string | null): string | null {
	if (!urlOrId || typeof urlOrId !== "string") return null;
	const trimmed = urlOrId.trim();

	// If already a clean 11-character YouTube video ID
	if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
		return trimmed;
	}

	// 1. If an entire <iframe> embed snippet is pasted, extract the src URL
	const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/i);
	const target = iframeSrcMatch ? iframeSrcMatch[1] : trimmed;

	// 2. Primary matching for all standard YouTube URL variations:
	// - https://www.youtube.com/embed/VIDEO_ID
	// - https://www.youtube-nocookie.com/embed/VIDEO_ID
	// - https://youtu.be/VIDEO_ID
	// - https://www.youtube.com/watch?v=VIDEO_ID
	// - https://www.youtube.com/watch?...&v=VIDEO_ID
	// - https://www.youtube.com/shorts/VIDEO_ID
	// - https://www.youtube.com/live/VIDEO_ID
	// - https://www.youtube.com/v/VIDEO_ID
	const match = target.match(
		/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|live\/|shorts\/|watch\?(?:.*&)?v=))([\w-]{11})/i,
	);
	if (match) {
		return match[1];
	}

	// 3. Fallback check for v= query parameter
	const vMatch = target.match(/[?&]v=([\w-]{11})/i);
	if (vMatch) {
		return vMatch[1];
	}

	// 4. Broad fallback scanning anywhere in the input for 11-char ID after key path identifiers
	const genericMatch = trimmed.match(
		/(?:youtu\.be\/|embed\/|v\/|live\/|shorts\/|v=)([\w-]{11})/i,
	);
	if (genericMatch) {
		return genericMatch[1];
	}

	return null;
}

/**
 * Returns an optimized streaming embed URL for background drone video.
 * Uses DASH/HLS chunked streaming, muted autoplay, no branding or controls.
 */
export function getYouTubeEmbedUrl(
	videoId: string,
	options: {
		muted?: boolean;
		autoplay?: boolean;
		loop?: boolean;
	} = {},
): string {
	const { muted = true, autoplay = true, loop = true } = options;
	const params = new URLSearchParams({
		autoplay: autoplay ? "1" : "0",
		mute: muted ? "1" : "0",
		controls: "0",
		showinfo: "0",
		rel: "0",
		modestbranding: "1",
		playsinline: "1",
		enablejsapi: "1",
		iv_load_policy: "3",
		disablekb: "1",
		fs: "0",
		autohide: "1",
		cc_load_policy: "0",
	});

	if (loop) {
		params.set("loop", "1");
	}

	return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Default curated 4K aerial drone footage video IDs of Dhaka Savar landscape & modern real estate townships
 */
export const DEFAULT_DRONE_VIDEOS: DroneVideoItem[] = [
	{
		id: "F7NX9Ry4EJc",
		title: "Silicon City — Master Planned Mega Township",
		titleBn: "সিলিকন সিটি — মাস্টার প্ল্যানড মেগা টাউনশিপ",
		subtitle:
			"150+ Acres planned eco-township in Savar with 16–18ft high elevation, 40ft wide internal concrete roads and immediate deed registration.",
		subtitleBn:
			"সাভার, ঢাকায় ১৬–১৮ ফুট উঁচু বালু ভরাট, ৪০ ফুট প্রশস্ত অভ্যন্তরীণ আরসিসি সড়ক ও শতভাগ নিষ্কণ্টক হস্তান্তরে আপনার স্থায়ী ঠিকানা।",
		badge: "FLAGSHIP ECO-TOWNSHIP",
		badgeBn: "পরিকল্পিত ইকো-টাউনশিপ",
		poster:
			"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80",
	},
	{
		id: "7LJj7SCknnM",
		title: "100% Mutation Ready Residential Plots",
		titleBn: "১০০% নিষ্কণ্টক ও মিউটেশন প্রস্তুত আবাসিক প্লট",
		subtitle:
			"Legally verified CS, SA, RS and BS khatians with instant deed registration and direct bridge connectivity to Mohammadpur.",
		subtitleBn:
			"সিএস, এসএ, আরএস ও বিএস খতিয়ান যাচাইকৃত শতভাগ নিষ্কণ্টক মালিকানায় মোহাম্মদপুর সংলগ্ন সাভারে এখনই নিরাপদ বিনিয়োগ করুন।",
		badge: "LEGAL TITLE SECURITY",
		badgeBn: "নিষ্কণ্টক আইনি নিরাপত্তা",
		poster:
			"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80",
	},
	{
		id: "HDG0lPLooJ4",
		title: "Turag Riverfront Ecological Living",
		titleBn: "তুরাগ রিভারফ্রন্ট ইকোলজিক্যাল গ্রিন সিটি",
		subtitle:
			"Serene riverside sanctuary with planned bridge connection reducing commute time to Mohammadpur to just 10 minutes.",
		subtitleBn:
			"তুরাগ নদের কোল ঘেঁষে আধুনিক ড্রেনেজ, সুপ্রশস্ত লেকভিউ রোড ও সবুজ উন্মুক্ত পার্কসহ পরিবেশবান্ধব আবাসিক জীবন।",
		badge: "PRIME CONNECTIVITY",
		badgeBn: "রিভারফ্রন্ট সংযোগ",
		poster:
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
	},
];
