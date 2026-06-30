"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MapPin, Search, SlidersHorizontal, ArrowUpDown, X, Ruler } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/context/CMSContext";
import { formatCompactCurrency } from "@/lib/utils";
import type { Property } from "@/types";

type StatusFilter = "all" | Property["status"];
type CategoryFilter = "all" | Property["category"];
type SortOption = "newest" | "price-asc" | "price-desc" | "area-desc";

const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "available", label: "Ongoing" },
  { value: "pending", label: "Upcoming" },
  { value: "sold", label: "Completed" },
];

const CATEGORY_FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "land", label: "Plots" },
  { value: "apartment", label: "Apartments" },
  { value: "commercial", label: "Commercial" },
  { value: "villa", label: "Villas" },
];

const STATUS_STYLES: Record<Property["status"], string> = {
  available: "border-[#D4A030]/30 text-[#D4A030] bg-[#D4A030]/5",
  pending: "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5",
  sold: "border-zinc-300 dark:border-white/10 text-zinc-500 bg-zinc-100 dark:bg-white/5",
  rented: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5",
};

const STATUS_LABELS: Record<Property["status"], string> = {
  available: "Ongoing",
  pending: "Upcoming",
  sold: "Completed",
  rented: "Rented",
};

function ProjectCard({ property }: { property: Property }) {
  const hasImage = property.images.length > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col h-full rounded-[28px] border border-zinc-200/50 dark:border-white/5 bg-white/60 dark:bg-[#0D1B3E]/30 backdrop-blur-md overflow-hidden hover:border-[#D4A030]/40 hover:shadow-2xl transition-all duration-500 card-lift"
    >
      {/* Image Banner */}
      <div className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-white/5 overflow-hidden">
        {hasImage ? (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs font-light">
            Image Unavailable
          </div>
        )}
        
        {/* Apple-Style Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        
        {/* Status Badge */}
        <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
          <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-white/90 dark:bg-[#0D1B3E]/90 text-zinc-800 dark:text-white rounded-full border border-zinc-200/40 dark:border-white/10 shadow-xs">
            {property.category}
          </span>
          <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border shadow-xs ${STATUS_STYLES[property.status]}`}>
            {STATUS_LABELS[property.status]}
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-6 flex flex-col flex-grow justify-between gap-6">
        <div className="space-y-3.5">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-zinc-950 dark:text-white group-hover:text-[#D4A030] transition-colors line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <MapPin className="h-4 w-4 shrink-0 text-[#D4A030]" />
            <span className="font-light truncate">{property.location}</span>
          </div>

          <div className="flex items-center gap-4 pt-3 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-white/5">
            <div className="flex items-center gap-1.5 font-light">
              <Ruler className="h-3.5 w-3.5 text-zinc-400" />
              <span>{property.area.toLocaleString()} sqft</span>
            </div>
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5 font-light">
                <span>{property.bedrooms} Bedrooms</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/5">
          <div className="flex flex-col">
            <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-semibold">Starting Price</span>
            <span className="font-heading text-lg font-bold text-[#D4A030]">
              {formatCompactCurrency(property.price)}
            </span>
          </div>
          <Link
            href={`/projects/${property.slug}`}
            className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-zinc-200 dark:border-white/10 hover:border-[#D4A030] text-zinc-800 dark:text-zinc-200 hover:text-white hover:bg-[#D4A030] text-xs font-semibold transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsClient() {
  const { state } = useCMS();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Sync with URL query parameters on mount
  useEffect(() => {
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    if (status) {
      if (status === "ongoing") setActiveStatus("available");
      else if (status === "upcoming") setActiveStatus("pending");
      else if (status === "completed") setActiveStatus("sold");
      else if (status === "rented") setActiveStatus("rented");
      else if (["available", "pending", "sold", "rented"].includes(status)) {
        setActiveStatus(status as StatusFilter);
      }
    }
    if (category && ["land", "apartment", "commercial", "villa"].includes(category)) {
      setActiveCategory(category as CategoryFilter);
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Update query params when filters change
  const updateUrlParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Filtered and Sorted list
  const filteredProjects = useMemo(() => {
    let result = [...state.properties];

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by Status
    if (activeStatus !== "all") {
      result = result.filter((p) => p.status === activeStatus);
    }

    // Filter by Category
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "area-desc") {
      result.sort((a, b) => b.area - a.area);
    } else {
      // newest/default
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [state.properties, searchQuery, activeStatus, activeCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveStatus("all");
    setActiveCategory("all");
    setSortBy("newest");
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#0D1B3E] min-h-screen pb-24 transition-colors duration-300">
      
      {/* ── Hero Section ──────────────────────────── */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-[#0D1B3E]/95 to-[#0D1B3E] text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#D4A030]/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
             style={{
               backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
               backgroundSize: "60px 60px"
             }}
        />
        
        <SectionContainer>
          <div className="max-w-3xl space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#D4A030] to-transparent" />
              <span className="text-[#D4A030] text-xs font-semibold uppercase tracking-[0.2em]">Our Portfolio</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight"
            >
              Explore All <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#D4A030] to-[#F3C65F]">Projects</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-400 text-base sm:text-lg font-light max-w-xl leading-relaxed"
            >
              Browse our portfolio of RAJUK-approved land developments and premium residential layouts across prime Dhaka zones.
            </motion.p>
          </div>
        </SectionContainer>
      </section>

      {/* ── Filters & Search Control Bar ─────────── */}
      <SectionContainer className="relative z-20 -mt-6">
        <div className="p-6 rounded-[24px] border border-zinc-200/50 dark:border-white/10 bg-white/85 dark:bg-[#0D1B3E]/80 backdrop-blur-2xl shadow-xl space-y-6">
          
          {/* Search & Sort */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by project title, sector, road, or location..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  updateUrlParams("search", e.target.value);
                }}
                className="w-full h-11 pl-11 pr-10 rounded-xl border border-zinc-200/60 dark:border-white/10 bg-zinc-50/40 dark:bg-[#0D1B3E]/40 focus:bg-white dark:focus:bg-[#0D1B3E] focus:border-[#D4A030]/50 focus:ring-2 focus:ring-[#D4A030]/10 transition-all duration-300 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-zinc-800 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    updateUrlParams("search", "");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-white rounded-full transition-all"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="relative">
              <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-200/60 dark:border-white/10 bg-zinc-50/40 dark:bg-[#0D1B3E]/40 focus:bg-white dark:focus:bg-[#0D1B3E] focus:border-[#D4A030]/50 focus:ring-2 focus:ring-[#D4A030]/10 transition-all duration-300 text-sm font-medium text-zinc-700 dark:text-zinc-200 appearance-none cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Area: Largest Size</option>
              </select>
            </div>
          </div>

          <div className="h-px bg-zinc-200/50 dark:bg-white/10" />

          {/* Category & Status Segmented Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            
            {/* Category Control */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-2">
                Type
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORY_FILTERS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setActiveCategory(value);
                      updateUrlParams("category", value);
                    }}
                    className={`h-8 px-4 rounded-full text-xs font-medium transition-all duration-300 border ${
                      activeCategory === value
                        ? "bg-[#0D1B3E] dark:bg-white border-[#0D1B3E] dark:border-white text-white dark:text-[#0D1B3E] shadow-sm"
                        : "bg-transparent hover:bg-zinc-100 dark:hover:bg-white/5 border-zinc-200/60 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Control */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-2">
                Status
              </span>
              <div className="flex flex-wrap gap-1.5">
                {STATUS_FILTERS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setActiveStatus(value);
                      updateUrlParams("status", value === "available" ? "ongoing" : value === "pending" ? "upcoming" : value === "sold" ? "completed" : value);
                    }}
                    className={`h-8 px-4 rounded-full text-xs font-medium transition-all duration-300 border ${
                      activeStatus === value
                        ? "bg-[#D4A030] border-[#D4A030] text-[#0D1B3E] font-semibold shadow-sm"
                        : "bg-transparent hover:bg-zinc-100 dark:hover:bg-white/5 border-zinc-200/60 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* ── Active Filters Summary ───────────────── */}
      <SectionContainer className="pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-light">
            Found <span className="font-semibold text-zinc-800 dark:text-white">{filteredProjects.length}</span> premium properties
          </p>
          {(searchQuery || activeStatus !== "all" || activeCategory !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-8 text-xs font-semibold text-red-500 hover:text-red-600 hover:bg-red-500/5 rounded-full transition-all"
            >
              <X className="h-3.5 w-3.5 mr-1.5" /> Reset Filters
            </Button>
          )}
        </div>
      </SectionContainer>

      {/* ── Projects Grid ────────────────────────── */}
      <section className="pt-6">
        <SectionContainer>
          <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((property) => (
                <ProjectCard key={property.id} property={property} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center rounded-[28px] border border-dashed border-zinc-200 dark:border-white/10 bg-zinc-50/30 dark:bg-white/[0.01]"
            >
              <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center mb-5 border border-zinc-200/50 dark:border-white/10 shadow-xs">
                <Search className="h-6 w-6 text-zinc-400" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-zinc-850 dark:text-white mb-2">No matching projects found</h3>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm text-sm font-light mb-6">
                Try adjusting your filters, clearing your search query, or checking other categories.
              </p>
              <Button onClick={handleResetFilters} className="rounded-full h-10 px-6 font-semibold bg-[#0D1B3E] dark:bg-white text-white dark:text-[#0D1B3E] hover:bg-[#0D1B3E]/90 dark:hover:bg-white/90">
                Reset All Filters
              </Button>
            </motion.div>
          )}
        </SectionContainer>
      </section>
    </div>
  );
}
