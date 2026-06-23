"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { useCMS } from "@/context/CMSContext";

export function GalleryClient() {
  const { state } = useCMS();
  const media = state.media;

  if (!media || media.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-muted-foreground">
          No images have been uploaded yet. Visit the Media Library in the admin
          panel to add images.
        </p>
      </main>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Gallery
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              A visual showcase of our properties and developments across Dhaka.
            </p>
          </div>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-20">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {media.map((item) => (
              <div
                key={item.id}
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted"
              >
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
