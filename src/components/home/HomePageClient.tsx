"use client";

import { HeroSlider } from "./HeroSlider";
import { StatsBar } from "./StatsBar";
import { AboutSection } from "./AboutSection";
import { InvestmentProcess } from "./InvestmentProcess";
import { FeaturedProjects } from "./FeaturedProjects";
import { WhyChooseUs } from "./WhyChooseUs";
import { TeamSection } from "./TeamSection";
import { LatestInsights } from "./LatestInsights";
import { CTASection } from "./CTASection";

export function HomePageClient() {
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

