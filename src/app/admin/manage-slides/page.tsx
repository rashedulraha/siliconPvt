"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const INITIAL_SLIDES: SlideItem[] = [
  {
    id: "slide-1",
    title: "A Secure Home for Future Generations",
    subtitle: "Silicon City — Premium RAJUK compliant living in Dhaka",
    image: "/silicon.png",
  },
  {
    id: "slide-2",
    title: "Planned Urban Community in Mohammadpur",
    subtitle: "Wide avenues, green parks, and high capital growth",
    image: "/silicon.png",
  },
];

export default function ManageSlidesPage() {
  const [slides, setSlides] = useState<SlideItem[]>(INITIAL_SLIDES);
  const [savedMessage, setSavedMessage] = useState("");

  const handleUpdateSlide = (id: string, field: keyof SlideItem, value: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = () => {
    setSavedMessage("Slider settings updated successfully!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <div className="bg-background text-foreground min-h-screen pb-24">
      {/* Top Header */}
      <div className="border-b border-border/50 bg-card/60 backdrop-blur-md sticky top-0 z-30 py-4">
        <SectionContainer>
          <div className="flex items-center justify-between">
            <Link
              href="/admin"
              className="text-xs font-medium font-heading text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              Back to Admin Panel
            </Link>
            <button
              onClick={handleSave}
              className="px-4 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-medium font-heading inline-flex items-center gap-1.5 transition-all shadow-xs hover:bg-primary/90 cursor-pointer">
              <Save className="w-3.5 h-3.5" />
              Save Slide Settings
            </button>
          </div>
        </SectionContainer>
      </div>

      <SectionContainer className="py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="space-y-1 text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
              ADMIN CONTROL PANEL
            </span>
            <h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
              Slider & Banner Manager
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light">
              Manage Home Page hero carousel slides, title headlines, and imagery without writing code.
            </p>
          </div>

          {savedMessage && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{savedMessage}</span>
            </div>
          )}

          {/* Slides List */}
          <div className="space-y-6">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="bg-card border border-border/60 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-border/40 pb-3">
                  <span className="text-xs font-mono font-medium text-primary uppercase">
                    SLIDE #{idx + 1}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-medium font-heading text-foreground">
                      Slide Title / Headline
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => handleUpdateSlide(slide.id, "title", e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-medium font-heading text-foreground">
                      Sub-Headline / Slogan
                    </label>
                    <input
                      type="text"
                      value={slide.subtitle}
                      onChange={(e) => handleUpdateSlide(slide.id, "subtitle", e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5 text-left">
                    <label className="text-xs font-medium font-heading text-foreground">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={slide.image}
                      onChange={(e) => handleUpdateSlide(slide.id, "image", e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </SectionContainer>
    </div>
  );
}
