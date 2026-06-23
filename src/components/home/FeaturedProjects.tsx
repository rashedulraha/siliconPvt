"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { BlueprintGrid } from "./BlueprintGrid";
import { useProperties } from "@/hooks/useProperties";

export function FeaturedProjects() {
  const { properties } = useProperties();
  const featuredProperties = properties.slice(0, 3);

  return (
    <section className="py-32 bg-primary relative overflow-hidden">
      <BlueprintGrid className="text-background" />

      <Container className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-background/10 border border-background/15 mb-4">
              <Briefcase className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                Our Projects
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-background">
              Featured <span className="text-accent">Plots</span> & Communities
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-background/70 hover:text-background hover:bg-background/10 self-start sm:self-auto group rounded-md">
            <Link href="/projects" className="flex items-center gap-2">
              View All Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}>
              <Link
                href={`/properties/${property.slug}`}
                className="group block h-full">
                <div className="bg-background/[0.06] rounded-lg overflow-hidden border border-background/10 group-hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-70" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md">
                        {property.status === "available"
                          ? "Ongoing"
                          : "Upcoming"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif font-bold text-xl text-background group-hover:text-accent transition-colors line-clamp-1">
                      {property.title}
                    </h3>
                    <p className="text-sm text-background/55 mt-2 flex items-center gap-1.5 font-light">
                      <MapPin className="h-3.5 w-3.5 text-accent/70" />{" "}
                      {property.location}
                    </p>
                    <div className="flex items-center justify-between mt-6 pt-5 border-t border-background/10 w-full">
                      <span className="text-background/60 font-light text-sm">
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
