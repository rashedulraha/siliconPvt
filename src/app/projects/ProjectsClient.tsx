"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
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
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
  { value: "rented", label: "Rented" },
  { value: "pending", label: "Pending" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

const STATUS_STYLES: Record<Property["status"], string> = {
  available: "bg-emerald-100 text-emerald-800 border-emerald-200",
  sold: "bg-red-100 text-red-800 border-red-200",
  rented: "bg-blue-100 text-blue-800 border-blue-200",
  pending: "bg-amber-100 text-amber-800 border-amber-200",
};

/* ------------------------------------------------------------------ */
/*  Card                                                                */
/* ------------------------------------------------------------------ */
function PropertyCard({ property }: { property: Property }) {
  const hasImage = property.images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group rounded-2xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative aspect-[16/9] bg-muted overflow-hidden">
        {hasImage ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
        {/* Status badge overlaid on image */}
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${STATUS_STYLES[property.status]}`}>
          {property.status}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">
        <h3 className="font-display text-lg font-semibold leading-snug line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-secondary" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-display text-xl font-bold text-primary">
            {formatPrice(property.price)}
          </span>
          <Link
            href={`/projects/${property.slug}`}
            className="text-sm font-medium text-secondary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">
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
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-medium text-secondary mb-3 uppercase tracking-wider">
              Our Projects
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Explore All Projects
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Browse our portfolio of premium residential and commercial
              projects across prime locations.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filters + Grid */}
      <section className="py-10">
        <Container className="space-y-8">
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
                aria-pressed={activeStatus === value}
                className="capitalize">
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
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>{" "}
            project{filtered.length !== 1 ? "s" : ""}
            {activeStatus !== "all" && (
              <>
                {" "}
                with status{" "}
                <span className="font-medium capitalize">{activeStatus}</span>
              </>
            )}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Tag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="font-display text-xl font-semibold">
                No projects found
              </h2>
              <p className="text-muted-foreground max-w-sm">
                There are no projects with the status{" "}
                <span className="font-medium capitalize">{activeStatus}</span>{" "}
                at the moment. Try selecting a different filter.
              </p>
              <Button variant="outline" onClick={() => setActiveStatus("all")}>
                Show all projects
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
