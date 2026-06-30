"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";
import type { Property } from "@/types";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
type StatusFilter = "all" | Property["status"];

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Ongoing" },
  { value: "pending", label: "Upcoming" },
  { value: "sold", label: "Completed" },
  { value: "rented", label: "Rented" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function formatPrice(price: number): string {
  if (price >= 10_000_000) return `৳ ${(price / 10_000_000).toFixed(1)} Cr`;
  if (price >= 100_000) return `৳ ${(price / 100_000).toFixed(1)} Lac`;
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

const STATUS_STYLES: Record<Property["status"], string> = {
  available: "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
  sold: "bg-muted text-muted-foreground border-border",
  rented: "bg-primary/10 text-primary border-primary/20",
  pending: "bg-accent/15 text-accent border-accent/20",
};

const STATUS_LABELS: Record<Property["status"], string> = {
  available: "Ongoing",
  pending: "Upcoming",
  sold: "Completed",
  rented: "Rented",
};

/* ------------------------------------------------------------------ */
/*  Card                                                                */
/* ------------------------------------------------------------------ */
function ProjectCard({ property }: { property: Property }) {
  const hasImage = property.images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-300 card-lift">
      {/* Image */}
      <div className="relative aspect-[16/9] bg-muted overflow-hidden">
        {hasImage ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[property.status]}`}>
          {STATUS_LABELS[property.status]}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">
        <h3 className="font-heading text-lg font-semibold leading-snug line-clamp-2 text-foreground">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-heading text-xl font-bold text-accent">
            {formatPrice(property.price)}
          </span>
          <Link
            href={`/projects/${property.slug}`}
            className="text-sm font-semibold text-primary hover:text-accent transition-colors">
            View details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main client component                                               */
/* ------------------------------------------------------------------ */
export function ProjectsClient() {
  const { state } = useCMS();
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");

  const filtered =
    activeStatus === "all"
      ? state.properties
      : state.properties.filter((p) => p.status === activeStatus);

  return (
    <>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="relative pt-28 pb-16 bg-dark-hero overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-accent/6 blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <SectionContainer className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="divider-gold" />
              <span className="text-label text-accent">Our Portfolio</span>
            </div>
            <h1 className="font-heading font-bold text-display-lg text-white leading-[1.1] mb-3">
              Explore All <span className="text-gold">Projects</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl font-light">
              Browse our portfolio of RAJUK-approved residential and commercial
              projects across Dhaka's prime locations.
            </p>
          </motion.div>
        </SectionContainer>
      </section>

      {/* ── Filters + Grid ────────────────────────── */}
      <section className="py-10 bg-background">
        <SectionContainer className="space-y-8">
          {/* Filter buttons */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by status">
            {STATUS_FILTERS.map(({ value, label }) => (
              <Button
                key={value}
                variant={activeStatus === value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveStatus(value)}
                aria-pressed={activeStatus === value}>
                {label}
                {value !== "all" && (
                  <Badge
                    variant="secondary"
                    className="ml-2 text-xs px-1.5 py-0">
                    {state.properties.filter((p) => p.status === value).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Results summary */}
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            project{filtered.length !== 1 ? "s" : ""}
            {activeStatus !== "all" && (
              <>
                {" "}
                with status{" "}
                <span className="font-semibold capitalize">
                  {STATUS_LABELS[activeStatus as Property["status"]] ??
                    activeStatus}
                </span>
              </>
            )}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property) => (
                <ProjectCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Tag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                No projects found
              </h2>
              <p className="text-muted-foreground max-w-sm">
                There are no projects with this status at the moment. Try
                selecting a different filter.
              </p>
              <Button variant="outline" onClick={() => setActiveStatus("all")}>
                Show all projects
              </Button>
            </div>
          )}
        </SectionContainer>
      </section>
    </>
  );
}
