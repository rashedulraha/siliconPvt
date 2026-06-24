import { HomePageClient } from "@/components/home/HomePageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Silicon Real Estate - Premium Land Development in Dhaka",
  description:
    "Secure RAJUK-approved plots with transparent documentation and flexible payment plans. Trusted land developer with 1500+ happy clients.",
  keywords:
    "real estate, land development, plots, Dhaka, RAJUK approved, property investment",
  openGraph: {
    title: "Silicon Real Estate - Premium Land Development in Dhaka",
    description:
      "Secure RAJUK-approved plots with transparent documentation and flexible payment plans.",
    type: "website",
    url: "https://siliconrealestate.com",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}

