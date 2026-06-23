import { HeroSlider } from "@/components/home/HeroSlider";
import { StatsBar } from "@/components/home/StatsBar";
import { AboutSection } from "@/components/home/AboutSection";
import { InvestmentProcess } from "@/components/home/InvestmentProcess";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TeamSection } from "@/components/home/TeamSection";
import { LatestInsights } from "@/components/home/LatestInsights";
import { CTASection } from "@/components/home/CTASection";
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
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <HeroSlider />
      <StatsBar />
      <AboutSection />
      <InvestmentProcess />
      <FeaturedProjects />
      <WhyChooseUs />
      <TeamSection />
      <LatestInsights />
      <CTASection />
    </div>
  );
}
