"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowRight,
  Play,
  Phone,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { apiFetch } from "@/lib/api-client";
import GalleryGrid from "./GalleryGrid";
import VisualGallery from "./VisualGallery";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  location: string;
  overview: string;
  images: string[];
  features: string[];
  order: number;
}



const VIDEOS = [
  {
    id: "vid-1",
    title: '"Silicon City" 3D Animation Tour',
    description:
      "Watch the complete 3D animation video showing the 21st-century modern amenities planned inside the township.",
    videoUrl:
      "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba208d850d99efe29930f5313936&profile_id=165&oauth2_token_id=57447761",
    thumbnail:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "vid-2",
    title: "On-Site Project Walkthrough",
    description:
      "A real-time walkthrough video of our earth-filling progress, developed roads, and active demarcated blocks.",
    videoUrl:
      "https://player.vimeo.com/external/434045526.sd.mp4?s=c27d2ab2d0d0f588c5efb0e356230abf62804d9c&profile_id=165&oauth2_token_id=57447761",
    thumbnail:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  },
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [lightbox, setLightbox] = useState<{
    item: GalleryItem;
    imgIdx: number;
  } | null>(null);
  const [videoModal, setVideoModal] = useState<(typeof VIDEOS)[0] | null>(null);

  useEffect(() => {
    document.title = "Visual Gallery | Silicon Real Estate (Pvt.) Ltd.";
    apiFetch<{ success: boolean; items?: GalleryItem[] }>("/gallery")
      .then((res) => {
        if (res?.success && res.items) setItems(res.items);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeTab === "all" ? items : items.filter((i) => i.category === activeTab);

  const openLightbox = (item: GalleryItem, imgIdx = 0) =>
    setLightbox({ item, imgIdx });

  const prevImg = () => {
    if (!lightbox) return;
    const prevIdx =
      (lightbox.imgIdx - 1 + lightbox.item.images.length) %
      lightbox.item.images.length;
    setLightbox({ ...lightbox, imgIdx: prevIdx });
  };
  const nextImg = () => {
    if (!lightbox) return;
    const nextIdx = (lightbox.imgIdx + 1) % lightbox.item.images.length;
    setLightbox({ ...lightbox, imgIdx: nextIdx });
  };

  return (
    <div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden">
      {/* ── GALLERY GRID ── */}

      <VisualGallery />

      <GalleryGrid
        loading={loading}
        filtered={filtered}
        allItems={items}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openLightbox={openLightbox}
      />

      {/* ── VIDEO GALLERY ── */}
      <section className="py-16 sm:py-20 bg-muted/30 border-y border-border/40">
        <SectionContainer className="space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-primary font-mono">
              VIDEO FOOTAGE & ANIMATIONS
            </span>
            <h2 className="text-3xl font-bold font-heading text-foreground tracking-tight">
              Video Gallery
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {VIDEOS.map((vid) => (
              <button
                key={vid.id}
                onClick={() => setVideoModal(vid)}
                className="group bg-card border border-border/70 rounded-[28px] overflow-hidden hover:border-primary/40 transition-all text-left space-y-4 p-5 cursor-pointer"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={vid.thumbnail}
                    alt={vid.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    FEATURED VIDEO
                  </span>
                  <h3 className="text-lg font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    {vid.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 sm:py-20 bg-background">
        <SectionContainer>
          <div className="relative overflow-hidden rounded-[32px] p-8 sm:p-12 bg-card border border-border/70 space-y-8">
            <div
              className="absolute inset-0 -z-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 justify-between border-b border-border/50 pb-8">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary font-mono">
                  PHYSICAL SITE VISIT
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
                  Experience Silicon City in Person
                </h2>
                <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xl">
                  Photos and videos only show half the beauty. Transportation
                  from our Mohammadpur office is provided free of charge.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href="tel:+88012345678"
                  className="h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:bg-primary/90 transition-all"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <Link
                  href="/contact"
                  className="h-12 px-6 rounded-2xl border border-border/60 bg-muted/40 text-foreground font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:bg-muted transition-all"
                >
                  Plan Visit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative z-10 text-xs text-muted-foreground">
              Hotlines:{" "}
              <span className="text-foreground font-semibold">
                +880 12 345 678 / +880 1712 345 678
              </span>{" "}
              | Corporate Office: 2/3 (2nd Floor), Block #A, Iqbal Road,
              Mohammadpur, Dhaka-1207
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ── IMAGE LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur text-white flex items-center justify-center hover:bg-white/20 border border-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full bg-card/90 backdrop-blur-xl border border-border/50 rounded-[28px] overflow-hidden p-5 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={lightbox.item.images[lightbox.imgIdx]}
                  alt={lightbox.item.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Thumbnail strip */}
              {lightbox.item.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {lightbox.item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLightbox({ ...lightbox, imgIdx: idx })}
                      className={`relative w-16 h-11 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${lightbox.imgIdx === idx ? "border-primary" : "border-border/40 opacity-60 hover:opacity-100"}`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="space-y-0.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold font-mono uppercase tracking-wider border border-primary/20">
                    {lightbox.item.badge}
                  </span>
                  <h3 className="text-sm font-bold font-heading text-foreground mt-1.5">
                    {lightbox.item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{lightbox.item.location}</span>
                  </div>
                </div>
                <span className="text-muted-foreground font-mono text-[11px]">
                  {lightbox.imgIdx + 1} / {lightbox.item.images.length}
                </span>
              </div>

              {/* Prev / Next */}
              {lightbox.item.images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-3 top-[calc(50%-40px)] w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-3 top-[calc(50%-40px)] w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VIDEO MODAL ── */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-xl p-4"
            onClick={() => setVideoModal(null)}
          >
            <button
              onClick={() => setVideoModal(null)}
              className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 border border-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-4xl w-full bg-card/90 backdrop-blur-xl border border-border/50 rounded-[28px] p-5 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
                <video
                  src={videoModal.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-bold font-heading text-foreground">
                  {videoModal.title}
                </h3>
                <p className="text-xs text-muted-foreground font-light">
                  {videoModal.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
