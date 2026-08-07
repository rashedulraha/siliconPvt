"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, User, Building2, Plus, CheckCircle2 } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

export default function ManageContentPage() {
  const [chairmanSpeech, setChairmanSpeech] = useState(
    "Honesty, transparency, and client trust are the greatest strengths of Silicon Real Estate."
  );
  const [mdSpeech, setMdSpeech] = useState(
    "Ensuring modern urban standards, top-tier engineering safety, and RAJUK-compliant development."
  );
  const [savedMessage, setSavedMessage] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage("Leadership speeches & project content updated successfully!");
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
              Save Content
            </button>
          </div>
        </SectionContainer>
      </div>

      <SectionContainer className="py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="space-y-1 text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
              ADMIN CONTROL PANEL
            </span>
            <h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
              Team & Project Content Manager
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light">
              Update Chairman and Managing Director official speeches, leadership photos, and add new plots or project blocks.
            </p>
          </div>

          {savedMessage && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{savedMessage}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Leadership Statements */}
            <div className="bg-card border border-border/60 rounded-3xl p-8 shadow-xs space-y-6">
              <span className="text-xs font-mono font-medium text-primary uppercase block border-b border-border/40 pb-2">
                1. EXECUTIVE LEADERSHIP SPEECHES
              </span>

              {/* Chairman Statement */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium font-heading text-foreground flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-primary" />
                  Chairman's Statement (Md. Ahmed Kabir)
                </label>
                <textarea
                  rows={3}
                  value={chairmanSpeech}
                  onChange={(e) => setChairmanSpeech(e.target.value)}
                  className="w-full p-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              {/* MD Statement */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium font-heading text-foreground flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-primary" />
                  Managing Director's Statement (Engr. Rashedul Islam)
                </label>
                <textarea
                  rows={3}
                  value={mdSpeech}
                  onChange={(e) => setMdSpeech(e.target.value)}
                  className="w-full p-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Plot / Project Addition Card */}
            <div className="bg-card border border-border/60 rounded-3xl p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <span className="text-xs font-mono font-medium text-primary uppercase">
                  2. ADD NEW PLOT OR PROJECT BLOCK
                </span>
                <Link
                  href="/admin/inventory"
                  className="text-xs font-heading text-primary hover:underline inline-flex items-center gap-1">
                  View Full Inventory
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-medium font-heading text-foreground">
                    Project / Block Name
                  </label>
                  <input
                    type="text"
                    placeholder="Silicon City - Block C Extension"
                    className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-medium font-heading text-foreground">
                    Plot Size Options (Katha)
                  </label>
                  <input
                    type="text"
                    placeholder="3 Katha, 5 Katha, 10 Katha"
                    className="w-full h-10 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
              <Save className="w-4 h-4" />
              SAVE CONTENT CHANGES
            </button>
          </form>

        </div>
      </SectionContainer>
    </div>
  );
}
