"use client";

import { useCallback, useEffect, useState, type ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppData } from "@/hooks/useAppData";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
  ctaHref: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function HeroCarousel(): ReactElement {
  const { data: slides, isLoading } = useAppData<HeroSlide[]>("hero");

  // Initialise Embla with loop + 5-second autoplay.
  // Autoplay plugin is created once via a stable ref so it doesn't restart on
  // re-render.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Sync selected index whenever Embla emits a "select" event.
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Prev / Next handlers
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  // Dot click
  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------

  if (isLoading || !slides) {
    return <Skeleton className="w-full h-[90vh]" />;
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section
      aria-label="Hero carousel"
      className="relative w-full h-[90vh] overflow-hidden">
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden w-full h-full">
        <div className="flex h-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0 h-full">
              {/* Full-bleed background image */}
              <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />

              {/* Gradient overlay — bg-gradient-to-r from-primary/95 to-primary/60 */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/60" />

              {/* Slide content */}
              <div className="relative z-10 flex flex-col justify-center h-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
                <p className="text-accent font-semibold text-sm sm:text-base uppercase tracking-widest mb-3">
                  {slide.subtitle}
                </p>
                <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  {slide.title}
                </h1>
                <p className="text-white/85 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <div>
                  <Link
                    href={slide.ctaHref}
                    className="btn-gold">
                    {slide.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev button */}
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2">
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2">
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Dot indicators */}
      <div
        role="tablist"
        aria-label="Slide indicators"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
            className={[
              "w-2.5 h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1",
              index === selectedIndex
                ? "bg-accent w-7"
                : "bg-white/50 hover:bg-white/80",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
