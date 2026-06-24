"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import {
  AdvancedSearchFilters,
  type AdvancedFilters,
} from "@/components/property/AdvancedSearchFilters";
import { PageSEO } from "@/components/seo/PageSEO";
import { useCMS } from "@/context/CMSContext";
import type { Property } from "@/types";

const defaultFilters: AdvancedFilters = {
  query: "",
  type: "all",
  category: "all",
  minPrice: "",
  maxPrice: "",
  bedrooms: "any",
  location: "",
  sort: "newest",
};

export default function PropertiesPage() {
  const { state } = useCMS();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<AdvancedFilters>(defaultFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    if (q || type || category) {
      setFilters({ ...defaultFilters, query: q || "", type: (type as any) || "all", category: (category as any) || "all" });
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
    if (filters.type !== "all") result = result.filter((p) => p.type === filters.type);
    if (filters.category !== "all") result = result.filter((p) => p.category === filters.category);
    if (filters.location) result = result.filter((p) => p.location === filters.location);
    if (filters.bedrooms !== "any") {
      const min = parseInt(filters.bedrooms);
      result = result.filter((p) => p.bedrooms >= min);
    }
    if (filters.minPrice) result = result.filter((p) => p.price >= parseInt(filters.minPrice));
    if (filters.maxPrice) result = result.filter((p) => p.price <= parseInt(filters.maxPrice));
    switch (filters.sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "area-desc": result.sort((a, b) => b.area - a.area); break;
      case "oldest": result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [state.properties, filters]);

  const hasActiveFilters = JSON.stringify(filters) !== JSON.stringify(defaultFilters);

  return (
    <>
      <PageSEO title={state.seo.properties.title} description={state.seo.properties.description} />

      {/* ── Page Hero ──────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 bg-dark-hero overflow-hidden">
        {/* Background ambience */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-accent/6 blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Container className="relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="divider-gold" />
              <span className="text-label text-accent">Our Collection</span>
            </div>
            <h1 className="font-serif font-bold text-white text-display-lg leading-[1.1] mb-3">
              Premium{" "}
              <span className="text-gold">Property</span> Listings
            </h1>
            <p className="text-white/60 text-lg max-w-xl font-light">
              Discover RAJUK-approved plots and properties in prime Dhaka locations.
            </p>
          </motion.div>

          {/* Quick search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search by location, project name, or keyword…"
                value={filters.query}
                onChange={(e) => setFilters((p) => ({ ...p, query: e.target.value }))}
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/8 border border-white/15 text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-accent/60 focus:bg-white/12 transition-all duration-300"
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ── Content ─────────────────────────────────────────── */}
      <section className="py-10 bg-background">
        <Container>

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> properties found
              </p>
              {hasActiveFilters && (
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold hover:bg-accent/20 transition-colors"
                >
                  <X className="w-3 h-3" /> Clear filters
                </button>
              )}
            </div>

            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`inline-flex items-center gap-2 px-4 h-9 rounded-lg border text-sm font-medium transition-all duration-300 ${
                filtersOpen || hasActiveFilters
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${filtersOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Filters panel */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8"
              >
                <div className="rounded-xl border border-border bg-card p-5 shadow-luxury">
                  <AdvancedSearchFilters
                    filters={filters}
                    onChange={setFilters}
                    onReset={() => setFilters(defaultFilters)}
                    resultCount={filtered.length}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={JSON.stringify(filters)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <PropertyGrid
                properties={filtered}
                emptyMessage="No properties match your filters. Try adjusting your search."
              />
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>
    </>
  );
}
