"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROPERTY_CATEGORIES, SORT_OPTIONS } from "@/utils/constants";
import { useProperties } from "@/hooks/useProperties";
import { cn } from "@/lib/utils";

export interface AdvancedFilters {
  query: string;
  type: "all" | "sale" | "rent";
  category: "all" | (typeof PROPERTY_CATEGORIES)[number];
  minPrice: string;
  maxPrice: string;
  bedrooms: "any" | "1" | "2" | "3" | "4" | "5";
  location: string;
  sort: (typeof SORT_OPTIONS)[number]["value"];
}

interface AdvancedSearchFiltersProps {
  filters: AdvancedFilters;
  onChange: (filters: AdvancedFilters) => void;
  onReset: () => void;
  resultCount: number;
}

export function AdvancedSearchFilters({
  filters,
  onChange,
  onReset,
  resultCount,
}: AdvancedSearchFiltersProps) {
  const { properties } = useProperties();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = (patch: Partial<AdvancedFilters>) =>
    onChange({ ...filters, ...patch });

  // Extract unique locations for autocomplete
  const locations = Array.from(
    new Set(properties.map((p) => p.location)),
  ).sort();

  const hasActiveFilters =
    filters.query ||
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.bedrooms !== "any" ||
    filters.location;

  const activeFilterCount = [
    filters.type !== "all",
    filters.category !== "all",
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms !== "any",
    filters.location,
  ].filter(Boolean).length;

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      {/* Main search row */}
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, location, or keyword..."
              value={filters.query}
              onChange={(e) => update({ query: e.target.value })}
              className="pl-10 h-12 text-base"
            />
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="h-12 px-4 relative">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <Badge
                variant="default"
                className="absolute -top-1.5 -right-1.5 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Quick filters row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Select
            value={filters.type}
            onValueChange={(v) => update({ type: v as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Listing Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.category}
            onValueChange={(v) => update({ category: v as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {PROPERTY_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c} className="capitalize">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.bedrooms}
            onValueChange={(v) => update({ bedrooms: v as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Beds</SelectItem>
              <SelectItem value="1">1+ Bed</SelectItem>
              <SelectItem value="2">2+ Beds</SelectItem>
              <SelectItem value="3">3+ Beds</SelectItem>
              <SelectItem value="4">4+ Beds</SelectItem>
              <SelectItem value="5">5+ Beds</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sort}
            onValueChange={(v) => update({ sort: v as any })}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced filters (collapsible) */}
      {showAdvanced && (
        <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 border-t space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Location
              </label>
              <Select
                value={filters.location || "all"}
                onValueChange={(v) =>
                  update({ location: v === "all" ? "" : v })
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Any location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Location</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Min Price
              </label>
              <Input
                type="number"
                placeholder="$0"
                value={filters.minPrice}
                onChange={(e) => update({ minPrice: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Max Price
              </label>
              <Input
                type="number"
                placeholder="No limit"
                value={filters.maxPrice}
                onChange={(e) => update({ maxPrice: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Quick Price Range
              </label>
              <div className="flex gap-1 flex-wrap">
                {["500000", "1000000", "2500000", "5000000"].map((val) => (
                  <Button
                    key={val}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => update({ maxPrice: val })}>
                    ≤${(parseInt(val) / 1000000).toFixed(1)}M
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 md:px-6 py-3 border-t bg-muted/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">{resultCount}</strong>{" "}
          {resultCount === 1 ? "property" : "properties"} found
        </p>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4 mr-1" /> Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
}
