"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  Home as HomeIcon,
  Key,
  TrendingUp,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/Container";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { TestimonialCard } from "@/components/testimonial/TestimonialCard";
import { PageSEO } from "@/components/seo/PageSEO";
import { useCMS } from "@/context/CMSContext";
import { useProperties } from "@/hooks/useProperties";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { state } = useCMS();
  const { getFeaturedProperties } = useProperties();
  const { testimonials } = useTestimonials();
  const router = useRouter();
  const [heroQuery, setHeroQuery] = useState("");

  const homePage = state.pages.find((p) => p.slug === "home");
  const heroSection = homePage?.sections.find((s) => s.type === "hero");
  const statsSection = homePage?.sections.find((s) => s.type === "stats");
  const ctaSection = homePage?.sections.find((s) => s.type === "cta");

  const featured = getFeaturedProperties(6);

  const features = [
    {
      icon: HomeIcon,
      title: "Curated Listings",
      desc: "Hand-picked premium properties verified by our experts.",
    },
    {
      icon: Key,
      title: "Seamless Process",
      desc: "From first viewing to keys in hand, we handle everything.",
    },
    {
      icon: TrendingUp,
      title: "Market Expertise",
      desc: "Data-driven insights to help you make smart decisions.",
    },
    {
      icon: Shield,
      title: "Trusted Partners",
      desc: "15+ years of trusted relationships in premium real estate.",
    },
  ];

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/properties?q=${encodeURIComponent(heroQuery)}`);
  };

  return (
    <>
      <PageSEO
        title={state.seo.home.title}
        description={state.seo.home.description}
        keywords={state.seo.home.keywords}
      />

      {/* HERO */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={
              heroSection?.data.backgroundImage ||
              "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920"
            }
            alt="Luxury home"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 backdrop-blur-sm px-4 py-1.5 text-sm mb-6">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              <span>Premium Real Estate Since 2010</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              {heroSection?.data.title || "Find Your Dream Home"}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              {heroSection?.data.subtitle ||
                "Premium properties curated for modern living. Discover homes that match your lifestyle."}
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleHeroSearch}
              className="mt-8 flex gap-2 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={heroQuery}
                  onChange={(e) => setHeroQuery(e.target.value)}
                  placeholder="Search by city, neighborhood..."
                  className="pl-10 h-12 bg-background/95 backdrop-blur-sm"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-6">
                Search
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-background/80 backdrop-blur-sm">
                <Link href="/properties">
                  Browse All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* STATS */}
      {statsSection && (
        <section className="border-y bg-muted/40">
          <Container className="py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsSection.data.stats?.map((stat: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FEATURED PROPERTIES */}
      <section className="py-20">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-medium text-secondary mb-2">
                FEATURED LISTINGS
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Discover Premium Properties
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Hand-selected homes and investment opportunities from our
                exclusive portfolio.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/properties">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <PropertyGrid properties={featured} />
        </Container>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-muted/40">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-medium text-secondary mb-2">
              WHY ESTATEHUB
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              The EstateHub Difference
            </h2>
            <p className="mt-3 text-muted-foreground">
              We combine market expertise with personalized service to deliver
              exceptional results.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-20">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-medium text-secondary mb-2">
                TESTIMONIALS
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                What Our Clients Say
              </h2>
              <p className="mt-3 text-muted-foreground">
                Real stories from real clients who found their perfect home with
                us.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <Container className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            {ctaSection?.data.title || "Ready to Find Your Perfect Home?"}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            {ctaSection?.data.description ||
              "Let our experts guide you through every step of the journey."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href={ctaSection?.data.ctaLink || "/contact"}>
                {ctaSection?.data.ctaText || "Contact Us Today"}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
