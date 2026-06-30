"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  MessageCircle,
  Phone,
  Mail,
  Star,
  CalendarCheck,
  Shield,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { SectionContainer } from "@/components/layout/SectionContainer";
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
    if (property)
      Analytics.propertyView(property.id, property.title, property.price);
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
      } catch (_) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const statusColors: Record<string, string> = {
    available: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
    pending: "bg-amber-500/15 text-amber-600 border-amber-500/20",
    sold: "bg-red-500/15 text-red-600 border-red-500/20",
    rented: "bg-blue-500/15 text-blue-600 border-blue-500/20",
  };

  return (
    <>
      <PageSEO
        title={`${property.title} — Silicon Real Estate`}
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

      {/* ── Breadcrumb ──────────────────────────────────── */}
      <div className="pt-20 bg-background border-b border-border">
        <SectionContainer className="py-3">
          <Breadcrumbs
            items={[
              { label: "Properties", href: "/properties" },
              { label: property.title },
            ]}
          />
        </SectionContainer>
      </div>

      <div className="bg-background min-h-screen">
        <SectionContainer className="py-8 lg:py-12">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent text-sm font-medium transition-colors duration-300 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Properties
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-8 lg:gap-10 items-start">
            {/* ── Main Content ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8">
              {/* Gallery */}
              <PropertyGallery
                images={property.images}
                title={property.title}
              />

              {/* Header */}
              <div className="space-y-5">
                {/* Status + type badges */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-[0.08em] uppercase border ${statusColors[property.status] || ""}`}>
                    {property.status}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-[0.08em] uppercase border border-border bg-secondary text-secondary-foreground capitalize">
                    {property.category}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-[0.08em] uppercase border border-accent/30 bg-accent/10 text-accent">
                    For {property.type === "sale" ? "Sale" : "Rent"}
                  </span>
                </div>

                {/* Title + price */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="font-medium text-display-md text-foreground leading-[1.12]">
                      {property.title}
                    </h1>
                    <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0 text-accent" />
                      <span className="text-sm">{property.address}</span>
                    </div>
                  </div>
                  <div className="md:text-right flex-shrink-0">
                    <div className="font-medium text-3xl md:text-4xl text-accent leading-none">
                      {formatCurrency(property.price)}
                    </div>
                    {property.type === "rent" && (
                      <div className="text-sm text-muted-foreground mt-1">
                        per month
                      </div>
                    )}
                  </div>
                </div>

                {/* Gold divider */}
                <div className="divider-gold" />

                {/* Spec grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      icon: Bed,
                      label: "Bedrooms",
                      value: property.bedrooms.toString(),
                    },
                    {
                      icon: Bath,
                      label: "Bathrooms",
                      value: property.bathrooms.toString(),
                    },
                    {
                      icon: Maximize,
                      label: "Area",
                      value: `${property.area.toLocaleString()} ft²`,
                    },
                    {
                      icon: Car,
                      label: "Garage",
                      value: property.garage
                        ? `${property.garage} Cars`
                        : "N/A",
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-border bg-card p-4 text-center shadow-luxury">
                      <Icon className="h-4 w-4 mx-auto text-accent mb-2" />
                      <div className="font-medium text-lg text-foreground">
                        {value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-luxury">
                <h2 className="font-medium text-xl text-foreground mb-4">
                  About This Property
                </h2>
                <p className="text-muted-foreground leading-[1.8] text-sm whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              {property.features.length > 0 && (
                <div className="bg-card rounded-xl border border-border p-6 shadow-luxury">
                  <h2 className="font-medium text-xl text-foreground mb-5">
                    Features & Amenities
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3.5 w-3.5 text-accent" />
                        </div>
                        <span className="text-sm text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-luxury">
                <h2 className="font-medium text-xl text-foreground mb-4">
                  Property Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  {[
                    ["Property Type", property.category],
                    [
                      "Listing Type",
                      property.type === "sale" ? "For Sale" : "For Rent",
                    ],
                    ["Year Built", property.yearBuilt?.toString() || "N/A"],
                    ["Listing ID", property.id.slice(0, 8).toUpperCase()],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between py-3 border-b border-border last:border-0">
                      <span className="text-muted-foreground text-sm">
                        {label}
                      </span>
                      <span className="font-medium capitalize text-sm text-foreground">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar */}
              {similar.length > 0 && (
                <div>
                  <h2 className="font-medium text-xl text-foreground mb-6">
                    Similar Properties
                  </h2>
                  <PropertyGrid properties={similar} />
                </div>
              )}
            </motion.div>

            {/* ── STICKY SIDEBAR ──────────────────────────── */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-5 lg:sticky lg:top-24">
              {/* Action buttons */}
              <div className="flex gap-2">
                <FavoriteButton
                  propertyId={property.id}
                  className="flex-1 h-11 px-3 gap-2 rounded-lg border border-border text-sm font-medium"
                />
                <CompareCheckbox
                  propertyId={property.id}
                  className="flex-1 h-11 px-3 gap-2 rounded-lg border border-border text-sm font-medium"
                />
                <button
                  onClick={handleShare}
                  aria-label="Share"
                  className="w-11 h-11 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all duration-300">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Agent card */}
              {agent && (
                <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
                  <p className="text-label text-muted-foreground mb-4">
                    Listed By
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden bg-muted flex-shrink-0 ring-2 ring-accent/20">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {agent.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {agent.role}
                      </p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-accent text-accent"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {agent.phone && (
                      <a
                        href={`tel:${agent.phone}`}
                        className="flex items-center gap-3 px-4 h-10 rounded-lg border border-border hover:border-accent/40 hover:bg-accent/5 text-sm text-foreground transition-all duration-300">
                        <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                        {agent.phone}
                      </a>
                    )}
                    {agent.email && (
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex items-center gap-3 px-4 h-10 rounded-lg border border-border hover:border-accent/40 hover:bg-accent/5 text-sm text-foreground transition-all duration-300">
                        <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="truncate">{agent.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Book Viewing CTA */}
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full h-12 rounded-xl gold-shimmer text-accent-foreground font-bold text-sm shadow-luxury-gold hover:brightness-110 hover:scale-[1.01] transition-all duration-300">
                <CalendarCheck className="h-4 w-4" />
                Book a Viewing
              </Link>

              {/* WhatsApp */}
              <button
                onClick={() => inquireAboutProperty(property)}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-whatsapp/30 bg-whatsapp/8 text-sm font-semibold text-foreground hover:bg-whatsapp/15 hover:border-whatsapp/50 transition-all duration-300">
                <MessageCircle className="h-4 w-4 text-whatsapp" />
                WhatsApp Inquiry
              </button>

              {/* Trust strip */}
              <div className="rounded-xl border border-border bg-card p-4 shadow-luxury">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-accent flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Safe & Secure Transaction
                    </p>
                    <p className="text-xs text-muted-foreground">
                      RAJUK approved. Full legal documentation provided.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="bg-card rounded-xl border border-border p-5 shadow-luxury">
                <p className="font-medium text-foreground mb-1">
                  Enquire About This Property
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  We'll respond within 24 hours.
                </p>
                <ContactForm propertyId={property.id} />
              </div>

              {/* EMI */}
              {property.type === "sale" && (
                <EMICalculator initialPrice={property.price} />
              )}
            </motion.aside>
          </div>
        </SectionContainer>
      </div>
    </>
  );
}
