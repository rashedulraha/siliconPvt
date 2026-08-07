import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      companyName: "Silicon Real Estate (Pvt.) Ltd.",
      tagline: "Building Trusted Communities Since 2013",
      overview: "Silicon Real Estate (Pvt.) Ltd. is a premier land developer in Dhaka, specializing in RAJUK-approved residential and commercial developments backed by complete legal security.",
      projectShowcase: {
        name: "Silicon City",
        location: "Mohammadpur, Next to Turag River, Dhaka",
        description: "Silicon City is a flagship township engineered with modern urban infrastructure, 30ft & 40ft wide main avenue roads, and comprehensive civic amenities.",
        specifications: [
          { label: "Road Infrastructure", value: "30ft & 40ft Wide Internal Roads" },
          { label: "Civic & Worship Zone", value: "Central Mosque & Community Event Hall" },
          { label: "Healthcare & Education", value: "Dedicated School, College & Hospital Complex" },
          { label: "Recreation & Parks", value: "Lush Green Parks & Riverfront Promenade" },
          { label: "Security System", value: "Gated Boundary & 24/7 Security Supervision" },
          { label: "Utility Connections", value: "Underground Electricity, Water & Sewerage" },
        ],
      },
      coreValues: [
        {
          id: "val-1",
          title: "Integrity & Transparency",
          description: "Operating with 100% legal verification, ethical land acquisition, and clear documentation.",
        },
        {
          id: "val-2",
          title: "Unwavering Customer Trust",
          description: "Over 1,500+ families and investors trust us for securing their prime real estate assets.",
        },
        {
          id: "val-3",
          title: "Guaranteed Legal Security",
          description: "RAJUK approval, clean mutation certificates, and instant deed registration.",
        },
        {
          id: "val-4",
          title: "Engineered Infrastructure",
          description: "Compact soil engineering and planned 30ft & 40ft wide internal avenue roads.",
        },
        {
          id: "val-5",
          title: "Transparent Value Pricing",
          description: "Straightforward pricing models with zero hidden charges or development surcharges.",
        },
        {
          id: "val-6",
          title: "Sustainable Urban Design",
          description: "Harmonious urban planning integrating schools, medical facilities, mosques, and green spaces.",
        },
      ],
    },
  });
}
