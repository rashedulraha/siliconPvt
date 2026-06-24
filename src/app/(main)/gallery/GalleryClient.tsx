"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Play, Camera } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { useCMS } from "@/context/CMSContext";

/* ── Mock gallery data for when CMS media is empty ─────────────────── */
const MOCK_GALLERY = [
  { id: "m1", cat: "project",      name: "Bashundhara Residential Block A", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800" },
  { id: "m2", cat: "project",      name: "Purbachal Plot Layout Overview",   url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" },
  { id: "m3", cat: "construction", name: "Foundation Work — Phase 2",        url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800" },
  { id: "m4", cat: "construction", name: "Road Construction Progress",       url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800" },
  { id: "m5", cat: "project",      name: "Mirpur Extension Plots",           url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800" },
  { id: "m6", cat: "event",        name: "Ground-Breaking Ceremony 2023",    url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800" },
  { id: "m7", cat: "event",        name: "Investor Meet — Q4 2023",          url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800" },
  { id: "m8", cat: "office",       name: "Head Office Reception",            url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" },
  { id: "m9", cat: "office",       name: "Sales & Advisory Floor",           url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800" },
  { id: "m10", cat: "project",     name: "Uttara Sector Extension",          url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800" },
  { id: "m11", cat: "construction", name: "Boundary Wall Completion",        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800" },
  { id: "m12", cat: "event",       name: "Client Appreciation Day 2024",     url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800" },
];

const CATEGORIES = [
  { key: "all",          label: "All Photos" },
  { key: "project",      label: "Project Gallery" },
  { key: "construction", label: "Construction" },
  { key: "event",        label: "Events" },
  { key: "office",       label: "Office" },
];

interface GalleryItem {
  id: string;
  cat?: string;
  name: string;
  url: string;
  type?: string;
}

export function GalleryClient() {
  const { state } = useCMS();
  const [activeCat, setActiveCat] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  // Merge CMS media with mock data — CMS takes precedence when available
  const items: GalleryItem[] = state.media.length > 0
    ? state.media.map((m) => ({ ...m, cat: "project" }))
    : MOCK_GALLERY;

  const filtered = activeCat === "all" ? items : items.filter((i) => i.cat === activeCat);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-accent/5 blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <Container className="relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="divider-gold" />
              <span className="text-label text-accent">Visual Showcase</span>
            </div>
            <h1 className="font-heading font-bold text-display-lg text-white leading-[1.08] mb-5">
              Our <span className="text-gold">Gallery</span>
            </h1>
            <p className="text-white/65 text-lg font-light leading-relaxed max-w-2xl">
              A visual journey through our projects, construction milestones, events, and office — 
              bringing our commitment to quality to life.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── Content ────────────────────────────────────── */}
      <section className="section-y bg-background">
        <Container>
          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCat(cat.key)}
                className={`flex items-center gap-2 px-4 h-9 rounded-full text-sm font-heading font-medium border transition-all duration-300 ${
                  activeCat === cat.key
                    ? "bg-primary text-primary-foreground border-primary shadow-blue"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat.key === "all" && <Camera className="w-3.5 h-3.5" />}
                {cat.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCat === cat.key ? "bg-white/20" : "bg-muted"}`}>
                  {cat.key === "all" ? items.length : items.filter((i) => i.cat === cat.key).length}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {filtered.length === 0 ? (
                <div className="col-span-3 text-center py-16">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground/40 mb-3" />
                  <p className="text-muted-foreground">No images in this category yet.</p>
                </div>
              ) : (
                filtered.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-muted cursor-pointer card-lift"
                    onClick={() => setLightbox(item)}
                  >
                    <div className={`relative ${i % 5 === 0 ? "aspect-square" : i % 5 === 2 ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                      <Image
                        src={item.url}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.type === "video" ? (
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <ZoomIn className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white text-sm font-heading font-medium leading-snug line-clamp-2">{item.name}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* ── Lightbox ──────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-md p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden shadow-soft-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={lightbox.url}
                  alt={lightbox.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 glass-dark">
                <p className="text-white font-heading font-semibold">{lightbox.name}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-foreground/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-foreground/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
