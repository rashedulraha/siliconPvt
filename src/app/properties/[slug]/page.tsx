"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Car,
  Check,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/layout/Container";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { useProperties } from "@/hooks/useProperties";
import { useTeam } from "@/hooks/useTeam";
import { formatCurrency } from "@/lib/utils";
import { FavoriteButton } from "@/components/property/FavoriteButton";
import { CompareCheckbox } from "@/components/property/CompareCheckbox";
import { EMICalculator } from "@/components/calculator/EMICalculator";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { Analytics } from "@/lib/analytics";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useEffect } from "react";

export default function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { getPropertyBySlug, properties } = useProperties();
  const { getMemberById } = useTeam();
  const { inquireAboutProperty } = useWhatsApp();

  useEffect(() => {
    Analytics.propertyView(property.id, property.title, property.price);
  }, [property]);

  const property = getPropertyBySlug(slug);
  if (!property) return notFound();

  const agent = getMemberById(property.agentId);
  const similar = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        p.category === property.category &&
        p.status === "available",
    )
    .slice(0, 3);

  return (
    <>
      <PageSEO
        title={`${property.title} - EstateHub`}
        description={property.description.slice(0, 160)}
        ogImage={property.images[0]}
      />

      <Container className="py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Button variant="ghost" size="sm" asChild className="h-auto p-1">
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Properties
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PropertyGallery images={property.images} title={property.title} />

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge
                      variant={property.type === "sale" ? "default" : "gold"}>
                      For {property.type === "sale" ? "Sale" : "Rent"}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {property.category}
                    </Badge>
                    <Badge
                      variant={
                        property.status === "available"
                          ? "success"
                          : "secondary"
                      }>
                      {property.status}
                    </Badge>
                  </div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold">
                    {property.title}
                  </h1>
                  <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{property.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary">
                    {formatCurrency(property.price)}
                  </div>
                  {property.type === "rent" && (
                    <div className="text-sm text-muted-foreground">
                      per month
                    </div>
                  )}
                </div>
              </div>

              {/* Quick specs */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <SpecItem
                  icon={Bed}
                  label="Bedrooms"
                  value={property.bedrooms.toString()}
                />
                <SpecItem
                  icon={Bath}
                  label="Bathrooms"
                  value={property.bathrooms.toString()}
                />
                <SpecItem
                  icon={Maximize}
                  label="Area"
                  value={`${property.area.toLocaleString()} ft²`}
                />
                <SpecItem
                  icon={Car}
                  label="Garage"
                  value={property.garage ? `${property.garage} Cars` : "N/A"}
                />
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">
                About This Property
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">
                  Features & Amenities
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {property.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">
                Property Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <DetailRow label="Property Type" value={property.category} />
                <DetailRow
                  label="Listing Type"
                  value={property.type === "sale" ? "For Sale" : "For Rent"}
                />
                <DetailRow
                  label="Year Built"
                  value={property.yearBuilt?.toString() || "N/A"}
                />
                <DetailRow
                  label="Listing ID"
                  value={property.id.slice(0, 8).toUpperCase()}
                />
              </div>
            </div>

            {/* Similar */}
            {similar.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold mb-6">
                  Similar Properties
                </h2>
                <PropertyGrid properties={similar} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
            </div>

            {/* Agent Card */}
            {agent && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Listed By</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {agent.role}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    {agent.phone && (
                      <a
                        href={`tel:${agent.phone}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                        📞 {agent.phone}
                      </a>
                    )}
                    {agent.email && (
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                        ✉️ {agent.email}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Inquire About This Property
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm propertyId={property.id} />
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: unknown;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 text-center">
      <Icon className="h-5 w-5 mx-auto text-primary mb-2" />
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium capitalize">{value}</span>
    </div>
  );
}
