"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Play,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Download,
  Send,
  Loader2,
  Search,
  Compass,
  Ruler,
  Clock,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useCMS } from "@/context/CMSContext";
import { Button } from "@/components/ui/button";

/* ── Types ───────────────────────────────────────────────────────────── */
interface GalleryItem {
  id: string;
  category: "drone" | "progress" | "blueprint";
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  location: string;
  dimensions?: string; // blueprints
  duration?: string; // drone footage
  date?: string;
}

/* ── Mock Portfolio Data (DHAKA Prime Zones) ─────────────────────────── */
const MOCK_GALLERY: GalleryItem[] = [
  {
    id: "g-drone-1",
    category: "drone",
    title: "Purbachal Sector 17 Plot Development",
    description:
      "High-definition drone mapping of residential sectors, internal roadways leveling, and land boundaries demarcation.",
    url: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d850d99efe29930f5313936&profile_id=165&oauth2_token_id=57447761",
    thumbnail:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    location: "Purbachal, Dhaka",
    duration: "1:24",
    date: "June 2026",
  },
  {
    id: "g-drone-2",
    category: "drone",
    title: "Silicon Heights Architectural Site Flyover",
    description:
      "Cinematic aerial survey tracking progress on structural concrete pouring and core column reinforcements.",
    url: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27d2ab2d0d0f588c5efb0e356230abf62804d9c&profile_id=165&oauth2_token_id=57447761",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    location: "Mirpur, Dhaka",
    duration: "0:48",
    date: "May 2026",
  },
  {
    id: "g-drone-3",
    category: "drone",
    title: "Silicon Orchard Site Clearing & Access Roads",
    description:
      "Drone review showing the leveling of internal layout pathways and connection works with the bypass highway.",
    url: "https://player.vimeo.com/external/409419143.sd.mp4?s=986f1e2908f51ef58f8b80b0fb595d2c206f698e&profile_id=165&oauth2_token_id=57447761",
    thumbnail:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    location: "Mawa Corridor, Dhaka",
    duration: "1:05",
    date: "April 2026",
  },
  {
    id: "g-progress-1",
    category: "progress",
    title: "Silicon Orchard Ready Plots",
    description:
      "Fully ready plots showing finished boundary brickwork, electric installation meters, and internal avenue saplings.",
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    location: "Mawa Corridor, Dhaka",
    date: "March 2026",
  },
  {
    id: "g-progress-2",
    category: "progress",
    title: "Silicon Plaza Commercial Core",
    description:
      "Modern commercial building facade displaying insulated glass fixtures, entrance lobbies, and perimeter landscaping.",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    location: "Tejgaon I/A, Dhaka",
    date: "January 2026",
  },
  {
    id: "g-progress-3",
    category: "progress",
    title: "Gulshan Head Office Advisory Lounge",
    description:
      "Pristine, Apple Minimalist client lounge at our headquarters, featuring micro-cement textures and premium oak accents.",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    location: "Gulshan-2, Dhaka",
    date: "February 2026",
  },
  {
    id: "g-progress-4",
    category: "progress",
    title: "Bashundhara R/A Luxury Villa Completion",
    description:
      "Final site delivery detailing custom structural concrete features, exterior water elements, and automated safety gates.",
    url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    location: "Bashundhara R/A, Dhaka",
    date: "April 2026",
  },
  {
    id: "g-blue-1",
    category: "blueprint",
    title: "Silicon Orchard Master Layout Plan",
    description:
      "Approved engineering layout blueprint outlining zoning splits, residential sectors, internal paths, and utility networks.",
    url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    location: "Balu River Bank, Dhaka",
    dimensions: "150-Acre Site Layout",
    date: "December 2025",
  },
  {
    id: "g-blue-2",
    category: "blueprint",
    title: "Silicon Heights Structural Section View",
    description:
      "Detailed foundation civil engineering plan mapping structural load bearings, shear wall calculations, and basement pillars.",
    url: "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7eed?w=800&q=80",
    location: "Mirpur 12, Dhaka",
    dimensions: "24-Storied Tower Plan",
    date: "November 2025",
  },
  {
    id: "g-blue-3",
    category: "blueprint",
    title: "Silicon Plaza Foundation Grid Blueprint",
    description:
      "Approved foundation concrete casting grid details highlighting primary columns and lift shaft elevator grids.",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    location: "Tejgaon, Dhaka",
    dimensions: "3-Basement Grid Layout",
    date: "February 2026",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Assets", icon: Compass },
  { key: "drone", label: "Drone Footage", icon: Play },
  { key: "progress", label: "Project Progress", icon: Camera },
  { key: "blueprint", label: "Architectural Blueprints", icon: FileText },
];

export default function GalleryPage() {
  const { state } = useCMS();
  const [activeCat, setActiveCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Set document title for SEO
  useEffect(() => {
    document.title = "Visual Gallery — Silicon Real Estate";
  }, []);

  // Map CMS Media to our structured schema
  const cmsItems: GalleryItem[] = (state.media || []).map((media) => {
    let category: "drone" | "progress" | "blueprint" = "progress";
    if (
      media.type.includes("video") ||
      media.url.endsWith(".mp4") ||
      media.url.endsWith(".webm")
    ) {
      category = "drone";
    } else if (
      media.name.toLowerCase().includes("blueprint") ||
      media.name.toLowerCase().includes("plan") ||
      media.name.toLowerCase().includes("drawing")
    ) {
      category = "blueprint";
    }

    return {
      id: media.id,
      category,
      title: media.name,
      description: `Official portfolio media file details for ${media.name}.`,
      url: media.url,
      thumbnail: media.url,
      location: "Silicon Project Area",
      date: new Date(media.uploadedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    };
  });

  const allItems = [...MOCK_GALLERY, ...cmsItems];

  // Filtering
  const filteredItems = allItems.filter((item) => {
    const matchesCategory = activeCat === "all" || item.category === activeCat;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Lightbox Indexing
  const openLightbox = (item: GalleryItem) => {
    const idx = filteredItems.findIndex((x) => x.id === item.id);
    setLightbox(item);
    setLightboxIndex(idx);
    setInquirySuccess(false);
    setInquiryData({
      name: "",
      phone: "",
      message: `Interested in project details for: ${item.title}`,
    });
  };

  const prevItem = () => {
    if (filteredItems.length === 0) return;
    const idx =
      (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightbox(filteredItems[idx]);
    setLightboxIndex(idx);
    setInquirySuccess(false);
  };

  const nextItem = () => {
    if (filteredItems.length === 0) return;
    const idx = (lightboxIndex + 1) % filteredItems.length;
    setLightbox(filteredItems[idx]);
    setLightboxIndex(idx);
    setInquirySuccess(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === "ArrowRight") nextItem();
      if (e.key === "Escape") setLightbox(null);
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [lightbox, lightboxIndex, filteredItems]);

  // Prevent scroll when lightbox open
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lightbox) return;
    setIsSubmittingInquiry(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmittingInquiry(false);
    setInquirySuccess(true);
    toast.success(
      `Inquiry sent for ${lightbox.title}. An advisor will contact you shortly.`,
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Page Header (Pristine Sitemap Style) ── */}
      <div className="relative pt-28 pb-16 overflow-hidden bg-dark-hero">
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Gallery</span>
          </nav>

          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-accent" />
                </div>
                <span className="text-label text-accent text-[11px]">
                  Silicon Real Estate
                </span>
              </div>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-3 tracking-tight">
                Visual Showcase
              </h1>
              <p className="text-white/55 text-lg font-light max-w-xl">
                Explore real estate development drone flyovers, project
                milestones, and project blueprints.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filtering and Visual Asset Grid (Sitemap Spacing) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pb-6 border-b border-border">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCat === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCat(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background border-foreground shadow-sm"
                      : "border-border text-muted-foreground bg-card hover:bg-muted hover:text-foreground"
                  }`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? "bg-background/20 text-background"
                        : "bg-muted text-muted-foreground"
                    }`}>
                    {cat.key === "all"
                      ? allItems.length
                      : allItems.filter((i) => i.category === cat.key).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-8 rounded-xl border border-border bg-card text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Interactive Grid Layout ── */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 border border-dashed border-border rounded-2xl bg-card">
              <Compass className="h-10 w-10 mx-auto text-muted-foreground/45 mb-4" />
              <h3 className="font-semibold text-lg text-foreground">
                No visual assets found
              </h3>
              <p className="text-muted-foreground text-sm mt-1 max-w-xs mx-auto">
                No matching results were found. Try resetting filters or search
                criteria.
              </p>
              <Button
                onClick={() => {
                  setActiveCat("all");
                  setSearchQuery("");
                }}
                variant="outline"
                className="mt-4 rounded-xl text-xs">
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openLightbox(item)}
                  className="group rounded-2xl overflow-hidden bg-card text-card-foreground border border-border shadow-xs hover:shadow-md cursor-pointer transition-all duration-300">
                  {/* Fixed aspect-ratio bounds with hover scale-up inside */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted border-b border-border">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        priority={false}
                      />
                    </motion.div>

                    {/* Dark gradient & Hover icon Overlay */}
                    <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-[2]">
                      <div className="w-12 h-12 rounded-xl bg-background/90 text-foreground border border-border flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300 shadow-sm">
                        {item.category === "drone" ? (
                          <Play className="w-5 h-5 fill-current text-primary" />
                        ) : (
                          <Maximize2 className="w-4 h-4 text-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Category Label Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-background/95 border border-border text-foreground shadow-xs">
                        {item.category === "drone" && (
                          <Play className="w-2 h-2 fill-current text-primary" />
                        )}
                        {item.category === "progress" && (
                          <Camera className="w-2.5 h-2.5" />
                        )}
                        {item.category === "blueprint" && (
                          <FileText className="w-2.5 h-2.5" />
                        )}
                        <span>{item.category}</span>
                      </span>
                    </div>

                    {/* Meta info tags over frame */}
                    {(item.duration || item.dimensions) && (
                      <div className="absolute bottom-4 right-4 z-10">
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-950/75 text-white">
                          {item.duration || item.dimensions}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Metadata display card section */}
                  <div className="p-5 text-left space-y-2">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{item.location}</span>
                    </div>
                    <h3 className="font-semibold text-base text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[10px] text-muted-foreground border-t border-border">
                      <span>Updated: {item.date || "2026"}</span>
                      <span className="text-primary font-medium flex items-center gap-0.5">
                        Inspect{" "}
                        <span className="transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Lightbox Modal Overlay (Micro borders & semantic style) ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 dark:bg-black/90 backdrop-blur-md p-4 md:p-6"
            onClick={() => setLightbox(null)}>
            {/* Close Button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-background border border-border text-foreground flex items-center justify-center shadow-xs cursor-pointer hover:bg-muted"
              aria-label="Close lightbox">
              <X className="w-5 h-5" />
            </button>

            {/* Inner Modal SectionContainer */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl z-40 grid grid-cols-1 lg:grid-cols-[1fr_340px]"
              onClick={(e) => e.stopPropagation()}>
              {/* Media viewer */}
              <div className="relative aspect-video lg:aspect-auto lg:h-[550px] flex items-center justify-center bg-muted/30 overflow-hidden border-b lg:border-b-0 lg:border-r border-border">
                {lightbox.category === "drone" ? (
                  <video
                    src={lightbox.url}
                    controls
                    autoPlay
                    playsInline
                    loop
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="relative w-full h-full min-h-[250px]">
                    <Image
                      src={lightbox.url}
                      alt={lightbox.title}
                      fill
                      priority
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 700px"
                    />
                  </div>
                )}

                {/* Next/Prev Navigation */}
                <button
                  onClick={prevItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg bg-background/90 hover:bg-background border border-border text-foreground flex items-center justify-center cursor-pointer shadow-xs"
                  aria-label="Previous">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg bg-background/90 hover:bg-background border border-border text-foreground flex items-center justify-center cursor-pointer shadow-xs"
                  aria-label="Next">
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Download (non-video) */}
                {lightbox.category !== "drone" && (
                  <a
                    href={lightbox.url}
                    download={`${lightbox.title.replace(/\s+/g, "_")}.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-background/90 border border-border text-foreground text-xs font-semibold shadow-xs cursor-pointer">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Plan</span>
                  </a>
                )}

                {/* Counter */}
                <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded-md bg-background/90 border border-border text-muted-foreground text-xs shadow-xs">
                  {lightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>

              {/* Side Info details */}
              <div className="p-6 md:p-8 flex flex-col justify-between text-left bg-card overflow-y-auto lg:h-[550px]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                      {lightbox.category}
                    </span>
                    {lightbox.date && (
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lightbox.date}
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight leading-snug">
                    {lightbox.title}
                  </h2>

                  <div className="flex flex-wrap gap-y-1.5 gap-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{lightbox.location}</span>
                    </div>
                    {lightbox.dimensions && (
                      <div className="flex items-center gap-1">
                        <Ruler className="w-3.5 h-3.5 text-primary" />
                        <span>{lightbox.dimensions}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground text-xs leading-relaxed pt-3 border-t border-border">
                    {lightbox.description}
                  </p>
                </div>

                {/* Inline inquiry section */}
                <div className="mt-8 pt-6 border-t border-border">
                  {inquirySuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center space-y-2">
                      <CheckCircle className="w-6 h-6 text-primary mx-auto" />
                      <h4 className="font-semibold text-foreground text-xs">
                        Consultation Requested
                      </h4>
                      <p className="text-muted-foreground text-[11px] leading-normal">
                        Our advisor for {lightbox.location} will contact you
                        shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-foreground">
                        Request Asset Consultation
                      </h4>
                      <form
                        onSubmit={handleInquirySubmit}
                        className="space-y-2">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={inquiryData.name}
                          onChange={(e) =>
                            setInquiryData((p) => ({
                              ...p,
                              name: e.target.value,
                            }))
                          }
                          required
                          disabled={isSubmittingInquiry}
                          className="w-full h-8 px-2.5 rounded-lg border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={inquiryData.phone}
                          onChange={(e) =>
                            setInquiryData((p) => ({
                              ...p,
                              phone: e.target.value,
                            }))
                          }
                          required
                          disabled={isSubmittingInquiry}
                          className="w-full h-8 px-2.5 rounded-lg border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                        <textarea
                          placeholder="Message"
                          value={inquiryData.message}
                          onChange={(e) =>
                            setInquiryData((p) => ({
                              ...p,
                              message: e.target.value,
                            }))
                          }
                          disabled={isSubmittingInquiry}
                          rows={2}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                        />
                        <Button
                          type="submit"
                          disabled={isSubmittingInquiry}
                          className="w-full h-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium flex items-center justify-center gap-1.5 transition-all">
                          {isSubmittingInquiry ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />{" "}
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="w-3 h-3" /> Inquire About Project
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
