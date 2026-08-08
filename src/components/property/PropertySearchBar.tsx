"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PROPERTY_CATEGORIES } from "@/utils/constants";

export interface PropertyFilters {
	query: string;
	type: "all" | "sale" | "rent";
	category: "all" | (typeof PROPERTY_CATEGORIES)[number];
	minPrice: string;
	maxPrice: string;
	bedrooms: "any" | "1" | "2" | "3" | "4" | "5";
}

interface PropertySearchBarProps {
	filters: PropertyFilters;
	onChange: (filters: PropertyFilters) => void;
	onReset: () => void;
	resultCount: number;
}

export function PropertySearchBar({
	filters,
	onChange,
	onReset,
	resultCount,
}: PropertySearchBarProps) {
	const update = (patch: Partial<PropertyFilters>) =>
		onChange({ ...filters, ...patch });
	const hasActiveFilters =
		filters.query ||
		filters.type !== "all" ||
		filters.category !== "all" ||
		filters.minPrice ||
		filters.maxPrice ||
		filters.bedrooms !== "any";

	return (
		<div className="rounded-xl border bg-card p-4 md:p-6 shadow-sm">
			{/* Search Input */}
			<div className="relative mb-4">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search by location, title, or keyword..."
					value={filters.query}
					onChange={(e) => update({ query: e.target.value })}
					className="pl-10 h-12 text-base"
				/>
			</div>

			{/* Filter Row */}
			<div className="grid grid-cols-2 md:grid-cols-5 gap-3">
				<Select
					value={filters.type}
					onValueChange={(v) => update({ type: v as any })}
				>
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
					onValueChange={(v) => update({ category: v as any })}
				>
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
					onValueChange={(v) => update({ bedrooms: v as any })}
				>
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

				<Input
					type="number"
					placeholder="Min Price"
					value={filters.minPrice}
					onChange={(e) => update({ minPrice: e.target.value })}
				/>

				<Input
					type="number"
					placeholder="Max Price"
					value={filters.maxPrice}
					onChange={(e) => update({ maxPrice: e.target.value })}
				/>
			</div>

			{/* Footer */}
			<div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
				<p className="text-sm text-muted-foreground">
					<strong className="text-foreground">{resultCount}</strong>{" "}
					{resultCount === 1 ? "property" : "properties"} found
				</p>
				<div className="flex gap-2">
					{hasActiveFilters && (
						<Button variant="ghost" size="sm" onClick={onReset}>
							<X className="h-4 w-4 mr-1" /> Clear Filters
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
