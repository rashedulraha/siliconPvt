"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Images, Layers, ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { GalleryItem } from "./page";

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "project", label: "Silicon City" },
  { key: "infrastructure", label: "Infrastructure" },
  { key: "office", label: "Office" },
  { key: "handovers", label: "Handovers" },
];

interface GalleryGridProps {
  loading: boolean;
  filtered: GalleryItem[];
  allItems: GalleryItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openLightbox: (item: GalleryItem, imgIdx?: number) => void;
}

export default function GalleryGrid({
  loading,
  filtered,
  allItems,
  activeTab,
  setActiveTab,
  openLightbox,
}: GalleryGridProps) {
  return (
    <>
      {/* ── FILTER TAB BAR ── */}
      <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-md border-b border-border/40 py-4">
        <SectionContainer>
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_TABS.map((tab) => {
              const count =
                tab.key === "all"
                  ? allItems.length
                  : allItems.filter((i) => i.category === tab.key).length;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`h-9 px-4 rounded-xl text-xs font-semibold font-heading transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </SectionContainer>
      </div>

      {/* ── GALLERY GRID SECTION ── */}
      <section className="py-16 sm:py-20 bg-background">
        <SectionContainer>
          {loading ? (
            /* Skeleton */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-card/50 border border-border/60 rounded-[28px] overflow-hidden space-y-4 p-4 animate-pulse"
                >
                  <div className="aspect-[16/10] w-full rounded-2xl bg-muted/80" />
                  <div className="space-y-2.5 px-1">
                    <div className="h-3 w-1/3 bg-muted/80 rounded-full" />
                    <div className="h-5 w-4/5 bg-muted/80 rounded-lg" />
                    <div className="h-3 w-full bg-muted/60 rounded-full" />
                  </div>
                  <div className="pt-3 border-t border-border/40 flex items-center justify-between px-1">
                    <div className="h-3 w-1/4 bg-muted/70 rounded-full" />
                    <div className="h-7 w-20 bg-muted/70 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-24 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto"
            >
              <div className="w-16 h-16 rounded-3xl bg-muted/50 border border-border/60 flex items-center justify-center text-muted-foreground">
                <Images className="w-8 h-8 opacity-60" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold font-heading text-foreground">
                  No gallery items found
                </h4>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Try selecting a different category.
                </p>
              </div>
            </motion.div>
          ) : (
            /* Cards Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="group flex flex-col bg-card border border-border/60 hover:border-primary/40 rounded-[28px] overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                  >
                    {/* Cover Image — opens lightbox */}
                    <button
                      type="button"
                      onClick={() => openLightbox(item, 0)}
                      className="relative aspect-[16/10] w-full bg-muted overflow-hidden cursor-pointer shrink-0 text-left"
                    >
                      {item.images[0] && (
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold font-mono uppercase tracking-wider border border-white/10">
                          {item.badge}
                        </span>
                      </div>
                    </button>

                    {/* Content */}
                    <div className="p-6 flex flex-col grow space-y-4">
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-bold font-heading text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light line-clamp-2 leading-relaxed">
                          {item.overview}
                        </p>
                      </div>

                      <div className="pt-4 mt-auto border-t border-border/40 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Images className="w-3.5 h-3.5 opacity-70" />
                            {item.images.length} photos
                          </span>
                          <span className="text-border">•</span>
                          <span className="flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 opacity-70" />
                            {item.features.length} features
                          </span>
                        </div>
                        <Link
                          href={`/gallery/${item.id}`}
                          className="inline-flex items-center gap-2 text-xs font-bold font-heading text-primary hover:text-primary/80 transition-all group/link"
                        >
                          <span>View</span>
                          <div className="w-7 h-7 rounded-full bg-primary/10 group-hover/link:bg-primary group-hover/link:text-primary-foreground flex items-center justify-center transition-all duration-300">
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </SectionContainer>
      </section>
    </>
  );
}
