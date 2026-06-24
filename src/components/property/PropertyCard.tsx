import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Maximize, MapPin, ArrowUpRight } from "lucide-react";
import type { Property } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

const STATUS_STYLES: Record<Property["status"], string> = {
  available: "bg-emerald-500/90 text-white",
  pending:   "bg-amber-500/90 text-white",
  sold:      "bg-red-500/90 text-white",
  rented:    "bg-blue-500/90 text-white",
};

const TYPE_LABEL: Record<Property["type"], string> = {
  sale: "For Sale",
  rent: "For Rent",
};

export function PropertyCard({ property }: PropertyCardProps) {
  const img =
    property.images[0] ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";

  return (
    <Link href={`/properties/${property.slug}`} className="group block h-full">
      <article className="relative bg-card rounded-xl overflow-hidden border border-border h-full flex flex-col card-lift shadow-luxury">

        {/* ── Image ─────────────────────────────────────────── */}
        <div className="relative aspect-[16/11] overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={img}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-107 transition-transform duration-700"
          />

          {/* Dark gradient bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Top left — sale/rent badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/90 text-primary-foreground text-[10px] font-bold tracking-[0.1em] uppercase backdrop-blur-sm">
              {TYPE_LABEL[property.type]}
            </span>
          </div>

          {/* Top right — arrow hover */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/0 flex items-center justify-center group-hover:bg-accent transition-all duration-300 opacity-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 text-accent-foreground" />
          </div>

          {/* Bottom left — price */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-baseline gap-1">
              <span className="font-serif font-bold text-white text-lg leading-none drop-shadow-lg">
                {formatCurrency(property.price)}
              </span>
              {property.type === "rent" && (
                <span className="text-white/70 text-xs">/mo</span>
              )}
            </div>
          </div>

          {/* Bottom right — status */}
          <div className="absolute bottom-3 right-3">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-[0.08em] uppercase capitalize ${STATUS_STYLES[property.status]}`}>
              {property.status}
            </span>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────── */}
        <div className="p-5 flex flex-col flex-grow">

          {/* Category */}
          <span className="text-label text-accent text-[10px] mb-2 block">
            {property.category}
          </span>

          {/* Title */}
          <h3 className="font-serif font-bold text-foreground text-[1.05rem] leading-snug line-clamp-1 group-hover:text-accent transition-colors duration-300 mb-2">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-accent/70" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          {/* Specs */}
          <div className="mt-auto flex items-center gap-4 pt-4 border-t border-border text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Bed className="h-3.5 w-3.5" /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-3.5 w-3.5" /> {property.bathrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="h-3.5 w-3.5" /> {property.area.toLocaleString()} ft²
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
