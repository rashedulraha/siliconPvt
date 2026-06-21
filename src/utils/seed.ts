import { generateId } from "@/lib/utils";
import { Property, TeamMember, BlogPost, PageContent } from "@/types";

export const seedProperties: Property[] = [
  {
    id: generateId(),
    title: "Modern Downtown Penthouse",
    slug: "modern-downtown-penthouse",
    description:
      "Stunning penthouse with panoramic city views, floor-to-ceiling windows, and premium finishes throughout. Features a private rooftop terrace and smart home technology.",
    price: 2450000,
    location: "Manhattan, New York",
    address: "432 Park Avenue, New York, NY 10022",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    type: "sale",
    category: "apartment",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    features: ["Rooftop Terrace", "Smart Home", "Concierge", "Gym", "Parking"],
    agentId: "agent-1",
    status: "available",
    yearBuilt: 2021,
    garage: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Luxury Beachfront Villa",
    slug: "luxury-beachfront-villa",
    description:
      "Exquisite beachfront villa with private pool, direct beach access, and breathtaking ocean views. Perfect for those seeking the ultimate coastal lifestyle.",
    price: 5800000,
    location: "Malibu, California",
    address: "21700 Pacific Coast Hwy, Malibu, CA 90265",
    bedrooms: 6,
    bathrooms: 5,
    area: 6500,
    type: "sale",
    category: "villa",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
    ],
    features: [
      "Private Pool",
      "Beach Access",
      "Wine Cellar",
      "Home Theater",
      "Ocean View",
    ],
    agentId: "agent-2",
    status: "available",
    yearBuilt: 2019,
    garage: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Charming Suburban Family Home",
    slug: "charming-suburban-family-home",
    description:
      "Beautiful family home in a quiet neighborhood with excellent schools. Features a large backyard, updated kitchen, and cozy fireplace.",
    price: 875000,
    location: "Austin, Texas",
    address: "1234 Oak Street, Austin, TX 78701",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    type: "sale",
    category: "house",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
    ],
    features: [
      "Large Backyard",
      "Updated Kitchen",
      "Fireplace",
      "2-Car Garage",
      "Solar Panels",
    ],
    agentId: "agent-1",
    status: "available",
    yearBuilt: 2015,
    garage: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Stylish Studio Apartment",
    slug: "stylish-studio-apartment",
    description:
      "Modern studio in the heart of the city. Perfect for young professionals. Walking distance to transit, restaurants, and entertainment.",
    price: 2800,
    location: "San Francisco, California",
    address: "888 Howard Street, San Francisco, CA 94103",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    type: "rent",
    category: "apartment",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200",
    ],
    features: ["In-Unit Laundry", "Gym Access", "Rooftop Deck", "Pet Friendly"],
    agentId: "agent-3",
    status: "available",
    yearBuilt: 2020,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Historic Brownstone Townhouse",
    slug: "historic-brownstone-townhouse",
    description:
      "Beautifully restored brownstone with original architectural details. Features a private garden, chef's kitchen, and four floors of living space.",
    price: 3200000,
    location: "Brooklyn, New York",
    address: "156 Park Place, Brooklyn, NY 11238",
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    type: "sale",
    category: "house",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
    ],
    features: [
      "Private Garden",
      "Original Details",
      "Chef's Kitchen",
      "Fireplace",
      "Wine Storage",
    ],
    agentId: "agent-2",
    status: "available",
    yearBuilt: 1905,
    garage: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Lakefront Condo with Views",
    slug: "lakefront-condo-with-views",
    description:
      "Bright and airy condo overlooking the lake. Open floor plan, modern finishes, and resort-style amenities including pool and fitness center.",
    price: 3500,
    location: "Chicago, Illinois",
    address: "645 North Michigan Avenue, Chicago, IL 60611",
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    type: "rent",
    category: "condo",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200",
    ],
    features: ["Lake Views", "Pool", "Fitness Center", "Doorman", "Balcony"],
    agentId: "agent-3",
    status: "available",
    yearBuilt: 2018,
    garage: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

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
    id: generateId(),
    title: "10 Tips for First-Time Home Buyers in 2026",
    slug: "10-tips-first-time-home-buyers-2026",
    excerpt:
      "Navigating the real estate market can be overwhelming. Here are our top 10 tips to help first-time buyers make confident decisions.",
    content:
      "Buying your first home is an exciting milestone, but it can also feel overwhelming. From understanding mortgages to navigating inspections, there's a lot to learn. In this comprehensive guide, we break down the 10 most important tips every first-time buyer should know in today's market...",
    coverImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
    authorId: "agent-1",
    publishedAt: "2026-06-15T10:00:00Z",
    tags: ["Buying", "Tips", "First-Time Buyer"],
    featured: true,
  },
  {
    id: generateId(),
    title: "The Rise of Sustainable Homes: What You Need to Know",
    slug: "rise-of-sustainable-homes",
    excerpt:
      "Eco-friendly homes are no longer a niche market. Learn how sustainable features are reshaping real estate and increasing property values.",
    content:
      "Sustainability is no longer just a buzzword — it's becoming a core consideration for home buyers and sellers alike. From solar panels to energy-efficient appliances, green features are driving property values and appealing to a new generation of environmentally conscious buyers...",
    coverImage:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200",
    authorId: "agent-2",
    publishedAt: "2026-06-10T10:00:00Z",
    tags: ["Sustainability", "Trends", "Green Homes"],
    featured: true,
  },
  {
    id: generateId(),
    title: "How to Stage Your Home for a Quick Sale",
    slug: "how-to-stage-your-home-quick-sale",
    excerpt:
      "Proper staging can reduce days on market by up to 73%. Discover the secrets professional stagers use to sell homes faster.",
    content:
      "Home staging is one of the most effective ways to sell your property quickly and at the best possible price. A well-staged home helps buyers visualize themselves living in the space, creating an emotional connection that translates to faster offers...",
    coverImage:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
    authorId: "agent-3",
    publishedAt: "2026-06-05T10:00:00Z",
    tags: ["Selling", "Staging", "Tips"],
    featured: false,
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
