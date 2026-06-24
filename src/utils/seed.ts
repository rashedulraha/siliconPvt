import { generateId } from "@/lib/utils";
import propertiesData from "../../public/data/properties.json";

import {
  Property,
  TeamMember,
  BlogPost,
  PageContent,
  Testimonial,
  Job,
} from "@/types";

export const seedProperties: Property[] = propertiesData as Property[];

export const seedTeam: TeamMember[] = [
  {
    id: "agent-1",
    name: "Sarah Johnson",
    role: "Founder & Lead Agent",
    bio: "With over 15 years of experience in luxury real estate, Sarah has closed over $500M in transactions across premium markets.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    email: "sarah@estatehub.com",
    phone: "+1 (555) 123-4567",
    social: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      email: "sarah@estatehub.com",
    },
  },
  {
    id: "agent-2",
    name: "Michael Chen",
    role: "Senior Property Consultant",
    bio: "Michael specializes in high-end residential properties and commercial investments. His market expertise is unmatched.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    email: "michael@estatehub.com",
    phone: "+1 (555) 234-5678",
    social: {
      linkedin: "https://linkedin.com/in/michaelchen",
      email: "michael@estatehub.com",
    },
  },
  {
    id: "agent-3",
    name: "Emily Rodriguez",
    role: "Rental Specialist",
    bio: "Emily helps clients find the perfect rental properties. Her deep knowledge of urban neighborhoods is invaluable.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    email: "emily@estatehub.com",
    phone: "+1 (555) 345-6789",
    social: {
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      email: "emily@estatehub.com",
    },
  },
  {
    id: "agent-4",
    name: "David Park",
    role: "Investment Advisor",
    bio: "David guides investors through complex real estate transactions with a focus on ROI and long-term value.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    email: "david@estatehub.com",
    phone: "+1 (555) 456-7890",
    social: {
      linkedin: "https://linkedin.com/in/davidpark",
      email: "david@estatehub.com",
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
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200",
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
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200",
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
    name: "Jennifer & Mark Thompson",
    role: "Home Buyers, Manhattan",
    quote:
      "EstateHub made our dream of owning a Manhattan penthouse a reality. Sarah's expertise and patience throughout the process were exceptional. We couldn't be happier!",
    avatar:
      "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200",
    rating: 5,
    order: 1,
  },
  {
    id: "test-2",
    name: "Robert Chen",
    role: "Property Investor",
    quote:
      "As an investor, I need a team that understands the market deeply. Michael's insights have helped me build a portfolio that consistently outperforms. Truly top-tier service.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    rating: 5,
    order: 2,
  },
  {
    id: "test-3",
    name: "Amanda Rodriguez",
    role: "First-Time Buyer, Austin",
    quote:
      "I was terrified of buying my first home, but Emily walked me through every step. She found me the perfect house in my budget and negotiated an amazing deal.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
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
