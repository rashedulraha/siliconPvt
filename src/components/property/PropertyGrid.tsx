import type { Property } from "@/types";
import { PropertyCard } from "./PropertyCard";

interface PropertyGridProps {
	properties: Property[];
	emptyMessage?: string;
}

export function PropertyGrid({
	properties,
	emptyMessage = "No properties found.",
}: PropertyGridProps) {
	if (properties.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-center">
				<div className="text-6xl mb-4">🏠</div>
				<h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
				<p className="text-muted-foreground max-w-md">{emptyMessage}</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{properties.map((property) => (
				<PropertyCard key={property.id} property={property} />
			))}
		</div>
	);
}
