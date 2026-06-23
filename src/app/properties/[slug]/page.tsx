"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Car,
  Check,
  ArrowLeft,
  Share2,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/layout/Container";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { ContactForm } from "@/components/contact/ContactForm";
import { FavoriteButton } from "@/components/property/FavoriteButton";
import { CompareCheckbox } from "@/components/property/CompareCheckbox";
import { EMICalculator } from "@/components/calculator/EMICalculator";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { PageSEO } from "@/components/seo/PageSEO";
import { PropertyJsonLd } from "@/components/seo/JsonLd";
import { useProperties } from "@/hooks/useProperties";
import { useTeam } from "@/hooks/useTeam";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { Analytics } from "@/lib/analytics";
import { formatCurrency } from "@/lib/utils";

export default function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { getPropertyBySlug, properties } = useProperties();
  const { getMemberById } = useTeam();
  const { inquireAboutProperty } = useWhatsApp();

  const property = getPropertyBySlug(slug);

  useEffect(() => {
    if (property) {
      Analytics.propertyView(property.id, property.title, property.price);
    }
  }, [property]);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description.slice(0, 100),
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      <PageSEO
        title={`${property.title} - EstateHub`}
        description={property.description.slice(0, 160)}
        ogImage={property.images[0]}
      />

      <PropertyJsonLd
        title={property.title}
        description={property.description}
        price={property.price}
        image={property.images[0]}
        address={property.address}
        bedrooms={property.bedrooms}
        bathrooms={property.bathrooms}
        area={property.area}
        url={typeof window !== "undefined" ? window.location.href : ""}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Properties", href: "/properties" },
          { label: property.title },
        ]}
      />

      <Container className="py-6 md:py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Properties
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Header */}
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={property.type === "sale" ? "default" : "secondary"}
                  className="text-sm px-3 py-1">
                  For {property.type === "sale" ? "Sale" : "Rent"}
                </Badge>
                <Badge
                  variant="outline"
                  className="capitalize text-sm px-3 py-1">
                  {property.category}
                </Badge>
                <Badge
                  variant={
                    property.status === "available" ? "default" : "secondary"
                  }
                  className="capitalize text-sm px-3 py-1">
                  {property.status}
                </Badge>
              </div>

              {/* Title & Price */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                    {property.title}
                  </h1>
                  <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm md:text-base">
                      {property.address}
                    </span>
                  </div>
                </div>
                <div className="text-left md:text-right">
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

              {/* Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
              <h2 className="font-display text-xl md:text-2xl font-semibold mb-4">
                About This Property
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm md:text-base">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div>
                <h2 className="font-display text-xl md:text-2xl font-semibold mb-4">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <span className="text-sm md:text-base">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details */}
            <div>
              <h2 className="font-display text-xl md:text-2xl font-semibold mb-4">
                Property Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            {/* Similar Properties */}
            {similar.length > 0 && (
              <div>
                <h2 className="font-display text-xl md:text-2xl font-semibold mb-6">
                  Similar Properties
                </h2>
                <PropertyGrid properties={similar} />
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4 md:space-y-6">
            {/* Action Buttons */}
            <div className="flex gap-2">
              <FavoriteButton
                propertyId={property.id}
                className="flex-1 h-11 w-auto px-3 gap-2"
              />
              <CompareCheckbox
                propertyId={property.id}
                className="flex-1 h-11 w-auto px-3 gap-2"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11"
                onClick={handleShare}
                aria-label="Share property">
                <Share2 className="h-4 w-4" />
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
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{agent.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {agent.role}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    {agent.phone && (
                      <a
                        href={`tel:${agent.phone}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{agent.phone}</span>
                      </a>
                    )}
                    {agent.email && (
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{agent.email}</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* WhatsApp Inquiry */}
            <Button
              variant="outline"
              className="w-full h-11"
              onClick={() => inquireAboutProperty(property)}>
              <MessageCircle className="h-4 w-4 mr-2 text-[#25D366]" />
              WhatsApp Inquiry
            </Button>

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

            {/* EMI Calculator */}
            {property.type === "sale" && (
              <EMICalculator initialPrice={property.price} />
            )}
          </motion.div>
        </div>
      </Container>
    </>
  );
}

/* ============================================================
 *  HELPER COMPONENTS
 * ============================================================ */

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-3 md:p-4 text-center">
      <Icon className="h-4 w-4 md:h-5 md:w-5 mx-auto text-primary mb-1 md:mb-2" />
      <div className="text-base md:text-lg font-semibold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b">
      <span className="text-muted-foreground text-sm md:text-base">
        {label}
      </span>
      <span className="font-medium capitalize text-sm md:text-base">
        {value}
      </span>
    </div>
  );
}
