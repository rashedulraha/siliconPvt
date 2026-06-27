"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { InvestmentProcess } from "./InvestmentProcess";
import { FeaturedProjects } from "./FeaturedProjects";
import { WhyChooseUs } from "./WhyChooseUs";
import { TeamSection } from "./TeamSection";
import { LatestInsights } from "./LatestInsights";
import { CTASection } from "./CTASection";

export function HomePageClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden flex flex-col">
      {/* ── Seamless Navbar to Hero Banner Transition ── */}
      
      <HeroSection />
      {/* ── Homepage Spacing Sections ── */}
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
