"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Calendar,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { apiFetch } from "@/lib/api-client";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  location: string;
  overview: string;
  images: string[];
  features: string[];
  createdAt: string;
}

export default function GalleryDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!id) return;
    apiFetch<{ success: boolean; item?: GalleryItem }>(`/gallery/${id}`)
      .then((res) => {
        if (res?.success && res.item) {
          setItem(res.item);
          document.title = `${res.item.title} | Silicon Real Estate`;
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-bold font-heading text-foreground">Gallery item not found</h2>
        <p className="text-muted-foreground text-sm">This item may have been removed from the gallery.</p>
        <Link href="/gallery" className="text-primary font-semibold text-sm hover:underline flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </Link>
      </div>
    );
  }

  const handlePrev = () => setActiveImg((p) => (p - 1 + item.images.length) % item.images.length);
  const handleNext = () => setActiveImg((p) => (p + 1) % item.images.length);

  return (
    <div className="bg-background text-foreground min-h-screen pb-24">

      {/* Top Nav Bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-16 z-20 py-4">
        <SectionContainer>
          <div className="flex items-center justify-between">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-bold font-heading text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Visual Gallery
            </Link>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground hidden sm:inline">
              {item.badge}
            </span>
          </div>
        </SectionContainer>
      </div>

      <SectionContainer className="py-10 space-y-10">

        {/* ── Title & Meta ── */}
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-bold font-mono uppercase tracking-widest px-3.5 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20">
              {item.category}
            </span>
            <span className="text-[10px] font-bold font-mono uppercase tracking-widest px-3.5 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
              {item.badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-foreground tracking-tight leading-tight">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 font-medium text-primary">
              <MapPin className="w-3.5 h-3.5" />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(item.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
            </div>
          </div>
        </div>

        {/* ── Image Slider ── */}
        {item.images.length > 0 && (
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full bg-muted rounded-[28px] overflow-hidden border border-border/60">
              <Image
                src={item.images[activeImg]}
                alt={item.title}
                fill
                priority
                className="object-cover transition-all duration-500"
              />
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur text-white text-xs font-mono font-medium">
                    {activeImg + 1} / {item.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Bar */}
            {item.images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImg === idx ? "border-primary scale-105" : "border-border/50 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-6 rounded-3xl bg-muted/40 border border-border/70 space-y-2">
              <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-primary">
                OVERVIEW
              </span>
              <p className="text-sm sm:text-base font-light text-foreground leading-relaxed">
                {item.overview}
              </p>
            </div>

            {item.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-heading text-foreground">
                  Features & Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-card border border-border/70 flex items-center gap-3 text-xs font-medium text-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Booking CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-36 bg-card border border-border/70 rounded-3xl p-6 space-y-5">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-primary">
                  BOOK A SITE VISIT
                </span>
                <h3 className="text-xl font-bold font-heading text-foreground">
                  Experience It In Person
                </h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  Transportation from our Mohammadpur office to Silicon City is fully arranged.
                </p>
              </div>
              <a
                href="tel:+8801711000000"
                className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold font-heading text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                Call Hotline 16222
              </a>
              <Link
                href="/contact"
                className="w-full h-11 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-bold font-heading text-xs uppercase tracking-wider inline-flex items-center justify-center transition-all cursor-pointer"
              >
                Schedule Inspection
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
