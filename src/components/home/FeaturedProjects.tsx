"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useProperties } from "@/hooks/useProperties";

export function FeaturedProjects() {
  const { properties } = useProperties();
  const featured = properties.slice(0, 3);

  return (
    <section className="section-y bg-primary relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/6 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/50 blur-[80px] pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-accent" />
              </div>
              <span className="text-label text-accent">Our Projects</span>
            </div>
            <h2 className="font-serif text-display-lg font-bold text-white leading-[1.1]">
              Featured <span className="text-gold">Plots</span> & Communities
            </h2>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-5 h-10 rounded-lg border border-white/20 text-white/75 text-sm font-medium hover:border-accent/50 hover:text-accent hover:bg-accent/10 transition-all duration-300 self-start sm:self-auto flex-shrink-0"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.13 }}
            >
              <Link
                href={`/properties/${property.slug}`}
                className="group block h-full"
              >
                <div className="relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 group-hover:border-accent/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxury-gold flex flex-col h-full">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={
                        property.images[0] ||
                        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
                      }
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <span className="gold-shimmer text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                        {property.status === "available" ? "Ongoing" : "Upcoming"}
                      </span>
                    </div>

                    {/* Arrow icon on hover */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-accent/0 border border-accent/0 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-serif font-bold text-lg text-white group-hover:text-accent transition-colors duration-300 line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-sm text-white/50 mt-2 flex items-center gap-1.5 font-light">
                      <MapPin className="h-3.5 w-3.5 text-accent/70 flex-shrink-0" />
                      {property.location}
                    </p>

                    {/* Price row */}
                    <div className="mt-5 pt-4 border-t border-white/8 flex items-center justify-between">
                      <span className="text-white/45 text-sm">
                        {property.bedrooms} Katha
                      </span>
                      <span className="font-mono font-bold text-accent text-lg">
                        ৳{property.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
