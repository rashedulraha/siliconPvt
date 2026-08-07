import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: "chair-1",
        name: "Md. Ahmed Kabir",
        role: "Chairman",
        title: "Chairman's Statement",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
        message: "Welcome to Silicon Real Estate. For over a decade, our mission has been to safeguard capital by delivering legally verified, high-value land developments in Dhaka's premier growth corridors. We take pride in building communities where families thrive with security and peace of mind.",
      },
      {
        id: "md-1",
        name: "Engr. Rashedul Islam",
        role: "Managing Director",
        title: "Managing Director's Vision",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
        message: "Engineering excellence and structural integrity drive every plot development at Silicon Real Estate. From soil compaction to 40ft wide avenue roads and modern utility planning, we ensure Silicon City stands as a benchmark for modern, planned urban living.",
      },
    ],
  });
}
