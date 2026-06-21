"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import {
  PropertySearchBar,
  type PropertyFilters,
} from "@/components/property/PropertySearchBar";
import { PageSEO } from "@/components/seo/PageSEO";
import { useCMS } from "@/context/CMSContext";
import type { Property } from "@/types";

const defaultFilters: PropertyFilters = {
  query: "",
  type: "all",
  category: "all",
  minPrice: "",
  maxPrice: "",
  bedrooms: "any",
};

export default function PropertiesPage() {
  const { state } = useCMS();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);

  useEffect(() => {
    const q = searchParams.get("q");
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    if (q || type || category) {
      setFilters({
        ...defaultFilters,
        query: q || "",
        type: (type as any) || "all",
        category: (category as any) || "all",
      });
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result: Property[] = [...state.properties];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q),
      );
    }
    if (filters.type !== "all")
      result = result.filter((p) => p.type === filters.type);
    if (filters.category !== "all")
      result = result.filter((p) => p.category === filters.category);
    if (filters.bedrooms !== "any") {
      const min = parseInt(filters.bedrooms);
      result = result.filter((p) => p.bedrooms >= min);
    }
    if (filters.minPrice)
      result = result.filter((p) => p.price >= parseInt(filters.minPrice));
    if (filters.maxPrice)
      result = result.filter((p) => p.price <= parseInt(filters.maxPrice));

    return result;
  }, [state.properties, filters]);

  return (
    <>
      <PageSEO
        title={state.seo.properties.title}
        description={state.seo.properties.description}
      />

      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <p className="text-sm font-medium text-secondary mb-3">
            OUR PROPERTIES
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Explore Premium Listings
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Browse our curated collection of exceptional homes, apartments, and
            investment properties.
          </p>
        </Container>
      </section>

      {/* Content */}
      <section className="py-10">
        <Container className="space-y-8">
          <PropertySearchBar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
            resultCount={filtered.length}
          />
          <PropertyGrid
            properties={filtered}
            emptyMessage="Try adjusting your filters to see more results."
          />
        </Container>
      </section>
    </>
  );
}
