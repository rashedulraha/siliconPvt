"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Ruler, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useProperties } from "@/hooks/useProperties";
import { formatCompactCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import type { Property } from "@/types";

export function FeaturedProjects() {
  const { properties } = useProperties();

  // Separate properties into Plots and Flats
  const plots = properties.filter(
    (p) => p.category === "land" || p.category === "commercial"
  );
  const flats = properties.filter((p) => p.category === "apartment");

  // Carousel APIs
  const [plotsApi, setPlotsApi] = useState<CarouselApi>();
  const [flatsApi, setFlatsApi] = useState<CarouselApi>();

  // Navigation states
  const [canScrollPrevPlots, setCanScrollPrevPlots] = useState(false);
  const [canScrollNextPlots, setCanScrollNextPlots] = useState(false);
  const [canScrollPrevFlats, setCanScrollPrevFlats] = useState(false);
  const [canScrollNextFlats, setCanScrollNextFlats] = useState(false);

  useEffect(() => {
    if (!plotsApi) return;
    setCanScrollPrevPlots(plotsApi.canScrollPrev());
    setCanScrollNextPlots(plotsApi.canScrollNext());
    plotsApi.on("select", () => {
      setCanScrollPrevPlots(plotsApi.canScrollPrev());
      setCanScrollNextPlots(plotsApi.canScrollNext());
    });
  }, [plotsApi]);

  useEffect(() => {
    if (!flatsApi) return;
    setCanScrollPrevFlats(flatsApi.canScrollPrev());
    setCanScrollNextFlats(flatsApi.canScrollNext());
    flatsApi.on("select", () => {
      setCanScrollPrevFlats(flatsApi.canScrollPrev());
      setCanScrollNextFlats(flatsApi.canScrollNext());
    });
  }, [flatsApi]);

  return (
    <section className="py-24 bg-background border-t border-border/30">
      <Container className="space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent font-semibold tracking-wider text-xs uppercase">
              <Sparkles className="h-4 w-4" />
              Featured Collections
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Featured Plots &amp; Modern Communities
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Secure RAJUK-approved land plots and architecturally customized luxury apartments across Dhaka's primary growth corridors.
            </p>
          </div>
          <Button asChild variant="outline" className="border-border/60 hover:bg-secondary/40 text-foreground self-start md:self-auto h-11 px-6 rounded-xl">
            <Link href="/properties" className="flex items-center gap-2 font-medium">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* ── Collection 1: Premium Land & Plots ──────────────────────────── */}
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Residential &amp; Commercial Plots
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Master-planned properties with fully demarcated boundaries and clear chain of custody
              </p>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => plotsApi?.scrollPrev()}
                disabled={!canScrollPrevPlots}
                className="h-9 w-9 rounded-full border-border/60 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-all cursor-pointer"
                aria-label="Previous Plots"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => plotsApi?.scrollNext()}
                disabled={!canScrollNextPlots}
                className="h-9 w-9 rounded-full border-border/60 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-all cursor-pointer"
                aria-label="Next Plots"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Carousel setApi={setPlotsApi} className="w-full" opts={{ align: "start", dragFree: true }}>
            <CarouselContent className="-ml-4">
              {plots.map((property) => (
                <CarouselItem key={property.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <PropertySliderCard property={property} isPlot />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* ── Collection 2: Luxury Apartments & Flats ─────────────────────── */}
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Ready Flats &amp; Residences
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Turnkey luxury apartments designed with premium materials and modern amenities
              </p>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => flatsApi?.scrollPrev()}
                disabled={!canScrollPrevFlats}
                className="h-9 w-9 rounded-full border-border/60 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-all cursor-pointer"
                aria-label="Previous Flats"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => flatsApi?.scrollNext()}
                disabled={!canScrollNextFlats}
                className="h-9 w-9 rounded-full border-border/60 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-all cursor-pointer"
                aria-label="Next Flats"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Carousel setApi={setFlatsApi} className="w-full" opts={{ align: "start", dragFree: true }}>
            <CarouselContent className="-ml-4">
              {flats.map((property) => (
                <CarouselItem key={property.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <PropertySliderCard property={property} isPlot={false} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

      </Container>
    </section>
  );
}

// ── Property Slider Card Component (Apple-Style Minimalism) ───────────────
interface PropertySliderCardProps {
  property: Property;
  isPlot: boolean;
}

function PropertySliderCard({ property, isPlot }: PropertySliderCardProps) {
  const img =
    property.images[0] ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";

  // Calculate Katha size for land (1 Katha = 720 sq ft)
  const kathaSize = isPlot ? Math.round((property.area / 720) * 10) / 10 : null;

  return (
    <Link href={`/properties/${property.slug}`} className="group block h-full select-none">
      <div className="bg-card text-card-foreground rounded-2xl border border-border/40 hover:border-border/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
        
        {/* Aspect Ratio Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            src={img}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-103 transition-transform duration-500"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/95 dark:bg-black/90 text-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs">
              {property.status === "available" ? "Verified" : "Upcoming"}
            </span>
          </div>

          {/* Type Badge (Plot / Flat) */}
          <div className="absolute top-4 right-4">
            <span className="bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
              {isPlot ? "Plot" : "Flat"}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Title */}
          <h4 className="font-serif font-bold text-foreground text-[1.1rem] leading-snug line-clamp-1 group-hover:text-primary transition-colors mb-2">
            {property.title}
          </h4>

          {/* Location with pin */}
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-4">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-accent" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Specifications */}
          <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
            <div className="text-muted-foreground text-xs flex items-center gap-3">
              {isPlot ? (
                <div className="flex items-center gap-1">
                  <Ruler className="h-3.5 w-3.5 text-muted-foreground/75" />
                  <span className="font-semibold text-foreground/80">
                    {kathaSize || property.bedrooms || 3} Katha
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5 text-muted-foreground/75" />
                    <span className="font-semibold text-foreground/80">{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5 text-muted-foreground/75" />
                    <span className="font-semibold text-foreground/80">{property.bathrooms} Baths</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5 text-muted-foreground/75" />
                <span>{property.area.toLocaleString()} ft²</span>
              </div>
            </div>

            {/* BDT Pricing Readout (clean and localized) */}
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Price</span>
              <span className="font-mono font-bold text-primary text-sm sm:text-base leading-none">
                {formatCompactCurrency(property.price)}
              </span>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}

