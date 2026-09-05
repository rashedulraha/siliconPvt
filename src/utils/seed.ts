import { generateId } from "@/lib/utils";

import {
	Property,
	TeamMember,
	BlogPost,
	PageContent,
	Testimonial,
	Job,
} from "@/types";

export const seedProperties: Property[] = [
	{
		id: "plot-001",
		title: "Lakeview Corner Residential Plot (5 Katha)",
		slug: "lakeview-corner-residential-plot-5-katha",
		description:
			"Prime corner residential plot with 40ft avenue front road, 18ft high elevation, 100% mutation ready, and immediate demarcation possession overlooking the scenic lake.",
		price: 3500000,
		location: "Block-A, Silicon City, Savar, Dhaka",
		address: "Plot # 12, Avenue Road, Block-A, Silicon City",
		block: "Block-A",
		katha: 5,
		bedrooms: 5,
		bathrooms: 0,
		area: 3600,
		garage: 0,
		type: "sale",
		category: "land",
		roadWidth: "40ft Avenue",
		facing: "Lake Facing",
		featured: true,
		images: [
			"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
			"https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200",
		],
		features: [
			"40ft Front Road",
			"Lake Facing",
			"18ft Soil Elevation",
			"100% Mutation Ready",
			"Instant Demarcation",
			"Gas & Electricity Ready",
		],
		agentId: "agent-1",
		status: "available",
		yearBuilt: 2026,
		createdAt: "2026-06-30T10:00:00Z",
		updatedAt: "2026-06-30T10:00:00Z",
	},
	{
		id: "plot-002",
		title: "Avenue Facing Residential Plot (3 Katha)",
		slug: "avenue-facing-residential-plot-3-katha",
		description:
			"Prime residential plot facing 30ft avenue road with instant boundary demarcation, 18ft sand-filled elevated ground, and flexible installment facility.",
		price: 2100000,
		location: "Block-B, Silicon City, Savar, Dhaka",
		address: "Plot # 24, Road # 04, Block-B, Silicon City",
		block: "Block-B",
		katha: 3,
		bedrooms: 3,
		bathrooms: 0,
		area: 2160,
		garage: 0,
		type: "sale",
		category: "land",
		roadWidth: "30ft Avenue",
		facing: "South Facing",
		featured: true,
		images: [
			"https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200",
			"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
		],
		features: [
			"30ft Front Road",
			"South Facing",
			"Mosque Adjacent",
			"18ft Soil Elevation",
			"Flood Protected",
			"Clear Title Registry",
		],
		agentId: "agent-2",
		status: "available",
		yearBuilt: 2026,
		createdAt: "2026-06-30T10:00:00Z",
		updatedAt: "2026-06-30T10:00:00Z",
	},
	{
		id: "plot-003",
		title: "Commercial Main Boulevard Plot (10 Katha)",
		slug: "commercial-main-boulevard-plot-10-katha",
		description:
			"High-traffic commercial plot directly on the 60ft main entrance boulevard, ideally planned for corporate headquarters, retail centers, or diagnostic clinics with high ROI.",
		price: 9500000,
		location: "Main Boulevard, Silicon City, Savar, Dhaka",
		address: "Plot # 01, Main Boulevard, Silicon City",
		block: "Main Boulevard",
		katha: 10,
		bedrooms: 10,
		bathrooms: 0,
		area: 7200,
		garage: 0,
		type: "sale",
		category: "commercial",
		roadWidth: "60ft Main Boulevard",
		facing: "Corner (Double Frontage)",
		featured: true,
		images: [
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
			"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
		],
		features: [
			"60ft Main Boulevard",
			"Commercial Zoning",
			"High ROI Potential",
			"Corner Plot",
			"Electricity & Wide Drainage",
		],
		agentId: "agent-3",
		status: "available",
		yearBuilt: 2026,
		createdAt: "2026-06-30T10:00:00Z",
		updatedAt: "2026-06-30T10:00:00Z",
	},
	{
		id: "plot-004",
		title: "Prime Park-Facing Residential Plot (3 Katha)",
		slug: "prime-park-facing-residential-plot-3-katha",
		description:
			"Peaceful residential plot facing green community park with ready utilities, 25ft internal concrete road, and serene environment for family living.",
		price: 1950000,
		location: "Block-C, Silicon City, Savar, Dhaka",
		address: "Plot # 38, Road # 02, Block-C, Silicon City",
		block: "Block-C",
		katha: 3,
		bedrooms: 3,
		bathrooms: 0,
		area: 2160,
		garage: 0,
		type: "sale",
		category: "land",
		roadWidth: "25ft Road",
		facing: "Park Facing",
		featured: false,
		images: [
			"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
		],
		features: [
			"Park Facing",
			"25ft Wide Road",
			"Immediate Registration",
			"100% Mutation Ready",
			"Gas & Electricity Ready",
		],
		agentId: "agent-2",
		status: "pending",
		yearBuilt: 2026,
		createdAt: "2026-06-30T10:00:00Z",
		updatedAt: "2026-06-30T10:00:00Z",
	},
	{
		id: "plot-005",
		title: "Executive Waterfront Residential Plot (5 Katha)",
		slug: "executive-waterfront-residential-plot-5-katha",
		description:
			"Exclusive waterfront residential allotment located on 40ft wide avenue with pristine breeze from Turag river and natural scenic lake buffer.",
		price: 3850000,
		location: "Block-A, Silicon City, Savar, Dhaka",
		address: "Plot # 08, Riverside Drive, Block-A, Silicon City",
		block: "Block-A",
		katha: 5,
		bedrooms: 5,
		bathrooms: 0,
		area: 3600,
		garage: 0,
		type: "sale",
		category: "land",
		roadWidth: "40ft Avenue",
		facing: "North Facing",
		featured: true,
		images: [
			"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
		],
		features: [
			"River & Lake Breeze",
			"40ft Front Road",
			"18ft Elevated Soil",
			"100% Mutation Ready",
			"Demarcation Complete",
		],
		agentId: "agent-1",
		status: "available",
		yearBuilt: 2026,
		createdAt: "2026-06-30T10:00:00Z",
		updatedAt: "2026-06-30T10:00:00Z",
	},
	{
		id: "plot-006",
		title: "Duplex Villa Planned Plot (7.5 Katha)",
		slug: "duplex-villa-planned-plot-7-5-katha",
		description:
			"Spacious corner plot designed specifically for duplex villa or luxury bungalow architecture with double-sided road access and gated security.",
		price: 5600000,
		location: "Block-D, Silicon City, Savar, Dhaka",
		address: "Plot # 15, Green Avenue, Block-D, Silicon City",
		block: "Block-D",
		katha: 7.5,
		bedrooms: 7.5,
		bathrooms: 0,
		area: 5400,
		garage: 0,
		type: "sale",
		category: "land",
		roadWidth: "30ft Avenue",
		facing: "Corner (Double Frontage)",
		featured: false,
		images: [
			"https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200",
		],
		features: [
			"Corner Double Frontage",
			"30ft Front Road",
			"Duplex Zoning",
			"100% Mutation Ready",
			"Flood Free Zone",
		],
		agentId: "agent-4",
		status: "available",
		yearBuilt: 2026,
		createdAt: "2026-06-30T10:00:00Z",
		updatedAt: "2026-06-30T10:00:00Z",
	},
];

export const seedTeam: TeamMember[] = [
	{
		id: "agent-1",
		name: "Mohammed Aziz Khan",
		role: "Founder & Managing Director",
		bio: "With over 15 years of experience in prime Dhaka real estate, Mohammed Aziz Khan has guided over $150M in transactions across premium Gulshan and Banani corridors.",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/7/76/Muhammed_Aziz_Khan%2C_Chirman%2C_Summit_Group.jpg",
		email: "[EMAIL_ADDRESS]",
		phone: "+880 1712 345 678",
		social: {
			linkedin: "https://linkedin.com/in/muhammedazizkhan",
			email: "[EMAIL_ADDRESS]",
		},
	},
	{
		id: "agent-2",
		name: "Tanvir Ahmed",
		role: "Senior Land Advisory Consultant",
		bio: "Tanvir specializes in RAJUK approvals, boundary surveys, and high-ROI land plot layout investments across Purbachal and Uttara.",
		image:
			"https://blog.allbanglanewspaper.org/wp-content/uploads/Ahmed_Akbar_Sobhan-Wikipedia-e1691001503950.jpg",
		email: "tanvir@siliconrealestate.com",
		phone: "+880 1712 987 654",
		social: {
			linkedin: "https://linkedin.com/in/tanvirahmed",
			email: "tanvir@siliconrealestate.com",
		},
	},
	{
		id: "agent-3",
		name: "Nabila Chowdhury",
		role: "Residential Flat Specialist",
		bio: "Nabila assists families in locating high-end ready flats and duplex apartments in secure enclaves like Mirpur DOHS and Banani.",
		image: "https://images.unsplash.com/photo-1580894732444-8febeb78fb3a?w=400",
		email: "nabila@siliconrealestate.com",
		phone: "+880 1712 456 123",
		social: {
			linkedin: "https://linkedin.com/in/nabilachowdhury",
			email: "nabila@siliconrealestate.com",
		},
	},
	{
		id: "agent-4",
		name: "Ziaul Huq",
		role: "High-ROI Investment Advisor",
		bio: "Ziaul advises institutional clients and expatriates on structural commercial land investments, ROI growth cycles, and tax paperwork.",
		image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400",
		email: "ziaul@siliconrealestate.com",
		phone: "+880 1712 789 456",
		social: {
			linkedin: "https://linkedin.com/in/ziaulhuq",
			email: "ziaul@siliconrealestate.com",
		},
	},
];

export const seedBlog: BlogPost[] = [
	{
		id: "post-1",
		title: "10 Tips for First-Time Home Buyers in Dhaka",
		slug: "10-tips-first-time-home-buyers-dhaka",
		excerpt:
			"Navigating the Dhaka real estate market can be overwhelming. Here are our top 10 tips to help first-time buyers make confident decisions.",
		content:
			"Buying your first home is an exciting milestone, but it can also feel overwhelming in a bustling metropolis like Dhaka. From verifying RAJUK approvals and developer registrations to negotiating mortgages and inspecting layouts, there is a lot to learn. In this comprehensive guide, we break down the 10 most important tips every first-time buyer should know in today's market. Make sure you check utility connectivity, clear ownership deeds, and neighborhood amenities before signing any agreement.",
		coverImage:
			"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
		authorId: "agent-1",
		publishedAt: "2026-06-15T10:00:00Z",
		tags: ["Buying", "Tips", "First-Time Buyer"],
		featured: true,
		category: "Buying Guide",
		readingTime: "6 min read",
		relatedPropertyIds: ["prop-001", "prop-003"],
	},
	{
		id: "post-2",
		title: "Dhaka Real Estate Market Outlook 2026: Key Investment Areas",
		slug: "dhaka-real-estate-market-outlook-2026",
		excerpt:
			"Explore the emerging hotbeds for property investment in Dhaka. From Uttara to Mirpur DOHS, discover where high ROI lies in 2026.",
		content:
			"Dhaka's real estate market is expanding rapidly, fueled by mega infrastructure projects like the Metro Rail. If you are looking to invest in 2026, understanding which zones yield the highest rental returns and capital appreciation is crucial. In this post, we analyze emerging commercial spaces, luxury ready-to-move flats in residential enclaves, and future-proof investments in land. Mirpur DOHS and Uttara remain highly attractive due to premium amenities, secure environments, and great connectivity.",
		coverImage:
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
		authorId: "agent-4",
		publishedAt: "2026-06-10T10:00:00Z",
		tags: ["Market", "Investment", "Trends"],
		featured: true,
		category: "Market Trends",
		readingTime: "8 min read",
		relatedPropertyIds: ["prop-002", "prop-003"],
	},
	{
		id: "post-3",
		title: "How to Stage Your Dhaka Apartment for a Quick Sale",
		slug: "how-to-stage-your-dhaka-apartment-quick-sale",
		excerpt:
			"Proper staging can reduce days on market by up to 73%. Discover the secrets professional stagers use to sell properties faster in Dhaka.",
		content:
			"Selling your apartment can be a long process, but staging can make all the difference. When potential buyers tour your property, they want to imagine themselves living there. Decluttering, painting walls in warm neutral tones, maximizing natural light, and strategically placing modern furniture are key. In this article, we share professional secrets on how to highlight the best features of your Dhaka apartment to draw in multiple offers quickly.",
		coverImage:
			"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
		authorId: "agent-3",
		publishedAt: "2026-06-05T10:00:00Z",
		tags: ["Selling", "Staging", "Tips"],
		featured: false,
		category: "Selling Tips",
		readingTime: "4 min read",
		relatedPropertyIds: ["prop-003"],
	},
	{
		id: "post-4",
		title: "5 Modern Home Decor Trends for Apartments in Dhaka",
		slug: "5-modern-home-decor-trends-dhaka",
		excerpt:
			"Transform your living space with these contemporary design trends. Learn how to maximize light and space in urban apartments.",
		content:
			"Urban apartments in Dhaka often require creative space management. Modern design trends are shifting toward warm minimalism, smart storage, and bio-philic elements. Integrating indoor plants, choosing sleek multifunctional furniture, and using warm wood accents are excellent ways to create a luxury feel. Here is how you can elevate your apartment interior without doing a complete overhaul.",
		coverImage:
			"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200",
		authorId: "agent-2",
		publishedAt: "2026-06-02T10:00:00Z",
		tags: ["Home Decor", "Interior", "Renovation"],
		featured: false,
		category: "Home Decor & Renovation",
		readingTime: "5 min read",
		relatedPropertyIds: ["prop-003"],
	},
	{
		id: "post-5",
		title: "Living in Mirpur DOHS: A Comprehensive Neighborhood Guide",
		slug: "living-in-mirpur-dohs-neighborhood-guide",
		excerpt:
			"Discover why Mirpur DOHS has become one of the most sought-after, secure, and family-friendly residential areas in Dhaka.",
		content:
			"Mirpur DOHS is renowned for its planned structure, serene lakes, strict security, and clean environment. It is an exceptional neighborhood for growing families. With top schools, medical services, and retail outlets all nearby, it offers a self-contained lifestyle. Our detailed neighborhood guide breaks down the cost of living, accessibility, safety, and community activities that make Mirpur DOHS stand out.",
		coverImage:
			"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
		authorId: "agent-1",
		publishedAt: "2026-05-28T10:00:00Z",
		tags: ["Neighborhood Guide", "Dhaka", "Mirpur DOHS"],
		featured: false,
		category: "Neighborhood Guides",
		readingTime: "7 min read",
		relatedPropertyIds: ["prop-003"],
	},
	{
		id: "post-6",
		title: "Understanding Property Registration Costs and Taxes in Bangladesh",
		slug: "understanding-property-registration-costs-taxes-bangladesh",
		excerpt:
			"A clear breakdown of stamp duty, gain taxes, local government taxes, and registration fees required to buy a property in Dhaka.",
		content:
			"When planning your property purchase budget, registration fees and taxes are significant considerations. Many buyers forget to factor in these costs, which can range from 10% to 12.5% of the deed value. In this article, we outline current stamp duties, registration fees, local government taxes, and source taxes. Learn how to legally register your new property and calculate exact expenses to avoid surprises.",
		coverImage:
			"https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200",
		authorId: "agent-4",
		publishedAt: "2026-05-20T10:00:00Z",
		tags: ["Buying", "Taxation", "Legal"],
		featured: false,
		category: "Buying Guide",
		readingTime: "9 min read",
		relatedPropertyIds: ["prop-001", "prop-002"],
	},
];

export const seedPages: PageContent[] = [
	{
		id: generateId(),
		slug: "home",
		title: "Home",
		sections: [
			{
				id: generateId(),
				type: "hero",
				order: 1,
				data: {
					title: "Find Your Dream Home",
					subtitle: "Premium properties curated for modern living",
					ctaText: "Browse Properties",
					ctaLink: "/properties",
					backgroundImage:
						"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920",
				},
			},
			{
				id: generateId(),
				type: "stats",
				order: 2,
				data: {
					stats: [
						{ label: "Properties Sold", value: "1,200+" },
						{ label: "Happy Clients", value: "950+" },
						{ label: "Years Experience", value: "15+" },
						{ label: "Cities Covered", value: "25+" },
					],
				},
			},
			{
				id: generateId(),
				type: "cta",
				order: 3,
				data: {
					title: "Ready to Find Your Perfect Home?",
					description:
						"Let our experts guide you through every step of the journey.",
					ctaText: "Contact Us Today",
					ctaLink: "/contact",
				},
			},
		],
	},
	{
		id: generateId(),
		slug: "about",
		title: "About",
		sections: [
			{
				id: generateId(),
				type: "content",
				order: 1,
				data: {
					title: "Our Story",
					content:
						"Founded in 2010, EstateHub has grown from a small boutique agency to one of the most trusted names in premium real estate. Our mission is simple: to help people find not just a house, but a home that matches their lifestyle and aspirations.",
				},
			},
		],
	},
];

export const seedTestimonials: Testimonial[] = [
	{
		id: "test-1",
		name: "Mr. & Mrs. Shafiqul Islam",
		role: "Home Buyers, Gulshan-2",
		quote:
			"Silicon Real Estate made our dream of owning a Gulshan penthouse a reality. Farhana's guidance and transparent paperwork checks throughout the legal deeds registration were outstanding.",
		avatar:
			"https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=200",
		rating: 5,
		order: 1,
	},
	{
		id: "test-2",
		name: "Tanveer Al-Matin",
		role: "Land & Property Investor",
		quote:
			"As a commercial investor, I need advisors who understand Dhaka's growth vectors. Tanvir's insights on Purbachal land plots helped me secure high-appreciation sites.",
		avatar:
			"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200",
		rating: 5,
		order: 2,
	},
	{
		id: "test-3",
		name: "Tasnim Sultana",
		role: "First-Time Owner, Uttara",
		quote:
			"Buying my first land plot was intimidating, but Nabila walked me through the boundary surveys. She found me a perfect RAJUK-approved plot within my budget.",
		avatar:
			"https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200",
		rating: 5,
		order: 3,
	},
];

/* ============================================================
 *  JOBS (Phase 3)
 * ============================================================ */
export const seedJobs: Job[] = [
	{
		id: "job-1",
		title: "Senior Real Estate Agent",
		slug: "senior-real-estate-agent",
		department: "Sales",
		location: "New York, NY",
		type: "full-time",
		description:
			"We're looking for an experienced agent to join our luxury division. You'll handle high-value residential properties and work with our most discerning clients.",
		requirements: [
			"5+ years in luxury real estate",
			"Valid real estate license",
			"Track record of $10M+ in annual sales",
			"Exceptional negotiation skills",
			"Strong network in the luxury market",
		],
		benefits: [
			"Competitive commission structure",
			"Marketing support & lead generation",
			"Premium brand positioning",
			"Flexible schedule",
			"Health & dental insurance",
		],
		salaryRange: "$150,000 - $500,000+ OTE",
		active: true,
		postedAt: "2026-06-01T10:00:00Z",
	},
	{
		id: "job-2",
		title: "Marketing Manager",
		slug: "marketing-manager",
		department: "Marketing",
		location: "Remote",
		type: "full-time",
		description:
			"Lead our digital marketing efforts to grow brand awareness and generate qualified leads. You'll own our content strategy, SEO, and paid acquisition.",
		requirements: [
			"4+ years in B2C marketing",
			"Experience with real estate or luxury brands",
			"Proficiency in Google Ads, Meta Ads, SEO",
			"Strong copywriting skills",
			"Data-driven mindset",
		],
		benefits: [
			"Fully remote position",
			"Unlimited PTO",
			"Annual learning budget",
			"Home office stipend",
			"Equity options",
		],
		salaryRange: "$90,000 - $130,000",
		active: true,
		postedAt: "2026-06-10T10:00:00Z",
	},
	{
		id: "job-3",
		title: "Property Photographer",
		slug: "property-photographer",
		department: "Creative",
		location: "Los Angeles, CA",
		type: "contract",
		description:
			"Capture stunning visuals of our premium listings. You'll work with top agents to produce photography, videography, and drone content.",
		requirements: [
			"Professional photography portfolio",
			"Experience with architectural/interior photography",
			"Own professional equipment",
			"Proficiency in Lightroom/Photoshop",
			"Drone license (Part 107) preferred",
		],
		benefits: [
			"Flexible project-based work",
			"Creative freedom",
			"Work with luxury properties",
			"Competitive per-project rates",
		],
		salaryRange: "$75 - $150 per listing",
		active: true,
		postedAt: "2026-06-15T10:00:00Z",
	},
];
