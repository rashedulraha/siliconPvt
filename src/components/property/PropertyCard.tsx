import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Property } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const mainImage =
    property.images[0] ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";

  return (
    <Link href={`/properties/${property.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={property.type === "sale" ? "default" : "secondary"}>
              For {property.type === "sale" ? "Sale" : "Rent"}
            </Badge>
            <Badge
              variant="outline"
              className="bg-background/80 backdrop-blur-sm capitalize">
              {property.category}
            </Badge>
          </div>
          {/* Price */}
          <div className="absolute bottom-3 right-3">
            <div className="rounded-lg bg-background/95 backdrop-blur-sm px-3 py-1.5 shadow-md">
              <span className="font-bold text-primary text-lg">
                {formatCurrency(property.price)}
              </span>
              {property.type === "rent" && (
                <span className="text-xs text-muted-foreground">/mo</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          {/* Specs */}
          <div className="mt-4 flex items-center gap-4 border-t pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4" />
              <span>{property.area.toLocaleString()} ft²</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
