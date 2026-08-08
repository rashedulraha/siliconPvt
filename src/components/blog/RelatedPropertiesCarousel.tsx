"use client";

import { useProperties } from "@/hooks/useProperties";
import { PropertyCard } from "@/components/property/PropertyCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Building2 } from "lucide-react";

interface RelatedPropertiesCarouselProps {
	propertyIds: string[];
}

export function RelatedPropertiesCarousel({
	propertyIds,
}: RelatedPropertiesCarouselProps) {
	const { getPropertyById } = useProperties();

	// Look up properties and filter out undefined/null
	const properties = propertyIds
		.map((id) => getPropertyById(id))
		.filter((p): p is NonNullable<typeof p> => !!p);

	if (properties.length === 0) return null;

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3">
				<div className="w-8 h-8 rounded-lg bg-accent/12 flex items-center justify-center">
					<Building2 className="h-4 w-4 text-accent" />
				</div>
				<h3 className="font-heading font-semibold text-xl text-foreground">
					Featured Listings
				</h3>
			</div>

			<Carousel
				opts={{
					align: "start",
					loop: false,
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-4">
					{properties.map((property) => (
						<CarouselItem
							key={property.id}
							className="pl-4 md:basis-1/2 lg:basis-1/2 xl:basis-1/2"
						>
							<div className="h-full py-2">
								<PropertyCard property={property} />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{properties.length > 2 && (
					<div className="flex justify-end gap-2 mt-4">
						<CarouselPrevious className="relative translate-y-0 left-0" />
						<CarouselNext className="relative translate-y-0 right-0" />
					</div>
				)}
			</Carousel>
		</div>
	);
}
