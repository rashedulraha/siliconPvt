"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Ruler,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useProperties } from "@/hooks/useProperties";
import { formatCompactCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Property } from "@/types";
import { SectionContainer } from "../ui/section-container";

export function FeaturedProjects() {
  const { properties } = useProperties();

  // Filter properties into Plots and Flats
  const plots = properties.filter(
    (p) => p.category === "land" || p.category === "commercial",
  );
  const flats = properties.filter((p) => p.category === "apartment");

  // Take top 3 of each to present in a clean grid row
  const featuredPlots = plots.slice(0, 3);
  const featuredFlats = flats.slice(0, 3);

  return (
    <section className="py-16 md:py-24  bg-transparent border-t border-border/40">
      <SectionContainer className="space-y-16">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-8">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-2 text-primary font-semibold tracking-wider text-xs uppercase">
              <Sparkles className="h-4 w-4" />
              Featured Showcase
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
              Featured Plots &amp; Luxury Flats
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl font-light">
              Inspect RAJUK-approved land plots and premium apartments situated
              across Dhaka's key growth corridors.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-border hover:bg-muted text-foreground self-start md:self-auto h-11 px-6 rounded-xl cursor-pointer">
            <Link
              href="/properties"
              className="flex items-center gap-2 font-medium">
              View All Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* ── Collection 1: Premium Land & Plots Grid ── */}
        <div className="space-y-6">
          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              Residential &amp; Commercial Plots
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm font-light">
              Master-planned properties with fully demarcated boundaries and
              clear chain of custody.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlots.map((property) => (
              <PropertyGridCard
                key={property.id}
                property={property}
                isPlot={true}
              />
            ))}
          </div>
        </div>

        {/* ── Collection 2: Luxury Apartments & Flats Grid ── */}
        <div className="space-y-6">
          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              Ready Flats &amp; Luxury Residences
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm font-light">
              Turnkey premium apartments designed with luxury materials and
              modern layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFlats.map((property) => (
              <PropertyGridCard
                key={property.id}
                property={property}
                isPlot={false}
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

// ── Property Grid Card Component (Apple-Style Minimalism) ─────────────────
interface PropertyGridCardProps {
  property: Property;
  isPlot: boolean;
}

function PropertyGridCard({ property, isPlot }: PropertyGridCardProps) {
  const imageUrl =
    property.images[0] ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";

  // Calculate Katha size for land (1 Katha = 720 sq ft)
  const kathaSize = isPlot ? Math.round((property.area / 720) * 10) / 10 : null;

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block h-full select-none">
      <div className="bg-card dark:bg-neutral-900/60 text-card-foreground rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 shadow-xs shadow-neutral-200/45 dark:shadow-none hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
        {/* Aspect Ratio Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={property.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              draggable={false}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Status Badge (Minimalist) */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-background/95 dark:bg-neutral-950/90 text-foreground border border-border text-[9px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-xs backdrop-blur-xs select-none">
              {property.status === "available" ? "Verified" : "Upcoming"}
            </span>
          </div>

          {/* Type Badge (Minimalist) */}
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-primary/90 text-primary-foreground text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs select-none">
              {isPlot ? "Plot" : "Flat"}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-grow text-left">
          {/* Title */}
          <h4 className="font-bold text-foreground text-base leading-snug line-clamp-1 group-hover:text-primary transition-colors mb-2">
            {property.title}
          </h4>

          {/* Location details */}
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-4">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Specifications Panel */}
          <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
            <div className="text-muted-foreground text-xs flex items-center gap-3">
              {isPlot ? (
                <div className="flex items-center gap-1">
                  <Ruler className="h-3.5 w-3.5 text-muted-foreground/75" />
                  <span className="font-semibold text-foreground/90">
                    {kathaSize || 3} Katha
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5 text-muted-foreground/75" />
                    <span className="font-semibold text-foreground/90">
                      {property.bedrooms} Beds
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5 text-muted-foreground/75" />
                    <span className="font-semibold text-foreground/90">
                      {property.bathrooms} Baths
                    </span>
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
              <span className="text-[9px] text-muted-foreground uppercase font-semibold tracking-wider">
                Price
              </span>
              <span className="font-mono font-bold text-foreground text-sm sm:text-base leading-none">
                {formatCompactCurrency(property.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
