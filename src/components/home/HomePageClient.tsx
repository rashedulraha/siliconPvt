"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/UserAuthContext";
import { Loader2 } from "lucide-react";

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
  const { isLoggedIn, user } = useUserAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isLoggedIn && user) {
      if (user.role === "admin") {
        router.replace("/dashboard/admin");
      } else {
        router.replace("/dashboard/user");
      }
    }
  }, [mounted, isLoggedIn, user, router]);

  // Prevent flash of homepage content during check/redirect
  if (mounted && isLoggedIn && user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          </div>
          <div className="space-y-1">
            <p className="font-heading font-semibold text-foreground text-sm">Redirecting to Dashboard</p>
            <p className="text-xs text-muted-foreground">Bypassing public homepage for secure session...</p>
          </div>
        </div>
      </div>
    );
  }

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

