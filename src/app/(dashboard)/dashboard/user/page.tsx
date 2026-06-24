"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Building2, Calendar, FileText, Heart, LogOut, ArrowRight,
  CheckCircle2, Clock, MapPin, Sparkles, User, HelpCircle
} from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFavorites } from "@/hooks/useFavorites";
import { useCMS } from "@/context/CMSContext";

// Localized mock pipeline tracking steps
const PIPELINE_STEPS = [
  { key: "visit", label: "Site Visit Scheduled", desc: "Visit scheduled for June 28, 2026", date: "June 25, 2026" },
  { key: "legal", label: "Deed Verification", desc: "CS, SA, RS Khatian and Mutation verification", date: "Pending" },
  { key: "agreement", label: "Draft Agreement", desc: "Preparing 300 BDT stamp deed copy", date: "Pending" },
  { key: "registration", label: "Registration & Mutation", desc: "Sub-registry office deed transfer", date: "Pending" },
];

export default function UserDashboard() {
  const { user, isLoggedIn, logout, isLoading } = useUserAuth();
  const { favoriteIds } = useFavorites();
  const { state } = useCMS();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading) {
      if (!isLoggedIn || user?.role !== "user") {
        router.replace("/login");
      }
    }
  }, [mounted, isLoading, isLoggedIn, user, router]);

  if (!mounted || isLoading || !isLoggedIn || user?.role !== "user") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  // Filter properties that the user has saved/starred
  const savedPropertiesList = state.properties.filter(p => favoriteIds.includes(p.id));

  // If user has no saved properties, show some featured Dhaka properties as recommendations
  const recommendedProperties = state.properties.slice(0, 2);

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Mini top bar */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/60 shadow-xs h-14 flex items-center px-4 sm:px-6 md:px-8 justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-primary/8 border border-primary/20 flex items-center justify-center">
              <span className="font-heading font-bold text-primary text-sm">S</span>
            </div>
            <span className="font-heading font-semibold text-sm text-foreground">Silicon Client Area</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden sm:inline">Logged in as {user.name}</span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs gap-1.5 h-8">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <Container className="py-8 max-w-7xl">
        {/* Welcome Banner */}
        <div className="mb-8 rounded-2xl bg-card border border-border/50 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/8 text-primary uppercase tracking-wider">
              Client Portal
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
              Welcome back, {user.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Monitor your active land purchases, legal papers, and saved listings.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/properties">
                Browse Properties
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/95 text-white">
              <Link href="/contact">
                Schedule Site Visit
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left Column — Pipeline and Shortcuts */}
          <div className="space-y-6">
            {/* 1. Pipeline / Inquiry Tracker */}
            <Card className="border-border/50 shadow-xs rounded-2xl overflow-hidden bg-card">
              <CardHeader className="pb-4 border-b border-border/40">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-heading font-semibold text-foreground">
                      Active Property Inquiry &amp; Investment Progress
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Silicon Orchard - Block B, Plot 5 (Residential) · 2.5 Katha
                    </CardDescription>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wide">
                    Legal Phase
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="relative pl-6 border-l border-border/80 ml-2 space-y-6">
                  {PIPELINE_STEPS.map((step, idx) => {
                    const isDone = idx === 0;
                    const isActive = idx === 1;
                    return (
                      <div key={step.key} className="relative">
                        {/* Dot indicator */}
                        <div 
                          className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 bg-background ${
                            isDone 
                              ? "border-emerald-500 bg-emerald-500" 
                              : isActive 
                                ? "border-primary bg-primary" 
                                : "border-border"
                          }`}
                        >
                          {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white bg-emerald-500 rounded-full" />}
                          {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                        </div>

                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <h4 className={`text-sm font-semibold leading-none ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`}>
                              {step.label}
                            </h4>
                            <span className="text-[10px] font-mono font-medium text-muted-foreground">{step.date}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-5 border-t border-border/40 flex flex-col sm:flex-row justify-between gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground font-medium">Consultant Assigned:</span>{" "}
                    <span className="font-semibold text-foreground">Md. Aminul Islam (Senior Manager)</span>
                  </div>
                  <a href="tel:+8801712345678" className="text-primary font-semibold hover:underline">
                    Call Consultant (+880 1712 345 678)
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* 2. Quick Shortcuts Grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/calculator" className="block group">
                <Card className="border-border/50 hover:border-primary/20 hover:shadow-xs transition-all duration-300 rounded-xl bg-card h-full card-lift">
                  <CardHeader className="p-5 pb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center text-primary mb-2 group-hover:bg-primary/12">
                      <Building2 className="w-4.5 h-4.5" />
                    </div>
                    <CardTitle className="text-sm font-heading font-bold text-foreground">
                      EMI Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Calculate plot installments and EMI plans instantly.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <a href="/public/data/properties.json" download className="block group">
                <Card className="border-border/50 hover:border-primary/20 hover:shadow-xs transition-all duration-300 rounded-xl bg-card h-full card-lift">
                  <CardHeader className="p-5 pb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center text-primary mb-2 group-hover:bg-primary/12">
                      <FileText className="w-4.5 h-4.5" />
                    </div>
                    <CardTitle className="text-sm font-heading font-bold text-foreground">
                      Download Brochure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Get full catalogs, maps, and specifications for plots.
                    </p>
                  </CardContent>
                </Card>
              </a>

              <Link href="/contact" className="block group">
                <Card className="border-border/50 hover:border-primary/20 hover:shadow-xs transition-all duration-300 rounded-xl bg-card h-full card-lift">
                  <CardHeader className="p-5 pb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center text-primary mb-2 group-hover:bg-primary/12">
                      <Calendar className="w-4.5 h-4.5" />
                    </div>
                    <CardTitle className="text-sm font-heading font-bold text-foreground">
                      Book Site Visit
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Book a free micro-bus visit to our Purbachal or Orchard sites.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Right Column — Saved Properties & Recommendations */}
          <div className="space-y-6">
            {/* 3. Saved Properties */}
            <Card className="border-border/50 shadow-xs rounded-2xl bg-card">
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-base font-heading font-semibold text-foreground flex items-center gap-2">
                  <Heart className="w-4 h-4 text-destructive fill-destructive" /> Saved Properties ({savedPropertiesList.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 px-4 space-y-4">
                {savedPropertiesList.length > 0 ? (
                  savedPropertiesList.map((prop) => (
                    <div key={prop.id} className="flex gap-3 pb-3 border-b border-border/30 last:border-0 last:pb-0 items-start">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                        <Image
                          src={prop.images[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=150"}
                          alt={prop.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <Link href={`/properties/${prop.slug}`} className="font-heading font-bold text-xs text-foreground hover:text-primary transition-colors block truncate">
                          {prop.title}
                        </Link>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground truncate">
                          <MapPin className="w-2.5 h-2.5 text-accent flex-shrink-0" />
                          <span className="truncate">{prop.location}</span>
                        </div>
                        <div className="font-heading font-bold text-xs text-accent">
                          ৳ {prop.price.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 space-y-2">
                    <p className="text-xs text-muted-foreground">You haven't saved any properties yet.</p>
                    <Button asChild size="sm" variant="ghost" className="text-xs text-primary hover:underline">
                      <Link href="/properties">Explore Listings <ArrowRight className="w-3 h-3 ml-1" /></Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommended Properties */}
            <Card className="border-border/50 shadow-xs rounded-2xl bg-card">
              <CardHeader className="pb-3 border-b border-border/40">
                <CardTitle className="text-base font-heading font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" /> Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 px-4 space-y-4">
                {recommendedProperties.map((prop) => (
                  <div key={prop.id} className="flex gap-3 pb-3 border-b border-border/30 last:border-0 last:pb-0 items-start">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <Image
                        src={prop.images[0] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=150"}
                        alt={prop.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <Link href={`/properties/${prop.slug}`} className="font-heading font-bold text-xs text-foreground hover:text-primary transition-colors block truncate">
                        {prop.title}
                      </Link>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground truncate">
                        <MapPin className="w-2.5 h-2.5 text-accent flex-shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </div>
                      <div className="font-heading font-bold text-xs text-accent">
                        ৳ {prop.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
