"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroGlassCarousel } from "./glass/HeroGlassCarousel";
import { MasterPlanAmenities } from "./glass/MasterPlanAmenities";
import { ProjectGallerySection } from "./glass/ProjectGallerySection";
import { CompanyNewsSection } from "./glass/CompanyNewsSection";
import { SiliconCityShowcase } from "./glass/SiliconCityShowcase";
import { LeadershipGlassBlocks } from "./glass/LeadershipGlassBlocks";
import { OfflineMembershipGlassBanner } from "./glass/OfflineMembershipGlassBanner";
import { SectionContainer } from "../layout/SectionContainer";
import { useProperties } from "@/hooks/useProperties";
import { useHomeContent } from "@/hooks/useHomeContent";
import { useSlides } from "@/hooks/useSlides";
import { formatCurrency } from "@/lib/utils";
import { MapPin, ArrowRight } from "lucide-react";
import InteractiveCarouselRing from "./glass/interactive-carousel-ring";

export function HomePageClient() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { properties } = useProperties();
  const { data: homeData } = useHomeContent();
  const { slides } = useSlides();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  const featuredPlots = properties.slice(0, 3);
  const trustCounters = homeData.trustCounters;
  const accreditations = homeData.accreditations;

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden flex flex-col">
      {/* ── SECTION 1: Hero Carousel / Slider ── */}
      <section className="relative w-full py-4 overflow-hidden flex flex-col items-center justify-center min-h-[750px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075")',
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        />
        {/* Fade Out Gradient (Top to Bottom) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/20 via-background/70 to-background pointer-events-none" />
        
        {/* Carousel (Main Banner) */}
        <div className="relative z-20 w-full">
          {/* We pass the backend fetched slides into the ring, where they will be duplicated to form 48 items */}
          <InteractiveCarouselRing className="w-full max-w-[1200px] mx-auto" items={slides.map(s => ({
            id: s.id,
            title: s.title,
            subtitle: s.subtitle,
            imageUrl: s.image,
            badge: s.badge || "FEATURED",
            link: s.link,
            active: s.active,
            order: s.order
          }))} />
        </div>
        {/* Absolute Center Text Overlay (Behind the hover modal) */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center text-center px-4 w-full max-w-2xl pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tighter mb-4"
          >
            {homeData.heroTitle || "Silicon City"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground font-normal max-w-lg mx-auto"
          >
            {homeData.heroDesc ||
              "Experience the perfect blend of luxury, nature, and cutting-edge technology."}
          </motion.p>
        </div>
      </section>

      {/* ── IMAGE 1 VISUAL SHOWCASE: MASTER PLAN & LIFESTYLE AMENITIES CARDS ── */}
      <MasterPlanAmenities />

      {/* ── LIVE DATABASE FEATURED PLOTS & PROJECTS ── */}
      <section className="py-20 bg-background text-foreground relative">
        <SectionContainer className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium uppercase tracking-widest text-primary font-heading">
                {homeData.heroBadge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold font-heading text-foreground tracking-tight">
                {homeData.heroTitle}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light">
                {homeData.heroDesc}
              </p>
            </div>
            <Link
              href="/properties"
              className="text-xs font-semibold font-heading text-primary hover:underline inline-flex items-center gap-1 shrink-0"
            >
              View All Listings <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Plots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPlots.map((prop) => (
              <div
                key={prop.id}
                className="group bg-card border border-border/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img
                    src={
                      prop.images[0] ||
                      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200"
                    }
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    {prop.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    {prop.status}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold font-heading text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 font-light truncate">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      {prop.location}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 font-light">
                      {prop.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground block font-mono uppercase">
                        PRICE
                      </span>
                      <span className="text-base font-bold font-heading text-primary">
                        {formatCurrency(prop.price)}
                      </span>
                    </div>
                    <Link
                      href={`/properties/${prop.slug}`}
                      className="px-4 py-2 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground text-xs font-semibold font-heading transition-all"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── PROJECT PHOTO GALLERY SHOWCASE ── */}
      <ProjectGallerySection />

      {/* ── SECTION 3 & SECTION 5: Silicon City Highlight + Summary of Services ── */}
      <SiliconCityShowcase />

      {/* ── DYNAMIC DATABASE COMPANY NEWS & ARTICLES SECTION ── */}
      <CompanyNewsSection />

      {/* ── SECTION 8: OUR TRACK RECORD ── */}
      <section className="py-20 sm:py-24 bg-dark-hero text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <SectionContainer className="relative z-10 space-y-12">
          <div className="max-w-3xl text-left space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium uppercase tracking-widest text-accent font-heading">
              OUR TRACK RECORD
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold font-heading text-white tracking-tight">
              {homeData.trackRecordTitle}
            </h2>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              {homeData.trackRecordDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {trustCounters.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/[0.06] backdrop-blur-xl border border-white/12 rounded-3xl p-7 flex flex-col justify-between space-y-4 hover:border-accent/60 transition-all duration-300 shadow-lg"
              >
                <div className="space-y-3">
                  <span className="text-3xl sm:text-4xl font-extrabold font-heading text-accent tracking-tight block">
                    {s.value}
                  </span>
                  <p className="text-xs sm:text-sm text-white/90 font-medium font-heading leading-relaxed">
                    {s.label}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-heading">
                  <span>{s.detail}</span>
                  <span className="text-accent font-medium">Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── SECTION 6: Leadership Statements (Chairman & MD) ── */}
      <LeadershipGlassBlocks />

      {/* ── SECTION 9: Trust Badges & Accreditations ── */}
      <section className="py-14 bg-muted/40 border-y border-border/50 relative overflow-hidden">
        <SectionContainer>
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-medium uppercase tracking-widest text-primary font-heading">
              ACCREDITATIONS & RECOGNITIONS
            </span>
            <h3 className="text-base sm:text-lg font-semibold font-heading text-foreground">
              Official Regulatory Compliance & Certifications
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {accreditations.map((badge) => (
              <div
                key={badge}
                className="bg-card px-4 py-2 rounded-full border border-border/60 text-xs font-medium font-heading text-foreground/90 shadow-2xs"
              >
                {badge}
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── SECTION 7: Offline Membership Guide & Printable CTA ── */}
      <OfflineMembershipGlassBanner />
    </div>
  );
}
