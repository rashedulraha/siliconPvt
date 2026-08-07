"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Building2, Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useCMS } from "@/context/CMSContext";

export default function SiteSettingsPage() {
  const { state, dispatch } = useCMS();
  const [address, setAddress] = useState(state.siteSettings.address || "2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur, Dhaka-1207");
  const [phone, setPhone] = useState(state.siteSettings.contactPhone || "+880 12 345 678 / +880 1712 345 678");
  const [email, setEmail] = useState(state.siteSettings.contactEmail || "info@siliconrealestatepvtltd.com");
  const [weekend, setWeekend] = useState(state.siteSettings.businessHours || "Open Saturday to Thursday (Friday Closed)");
  const [savedMessage, setSavedMessage] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_SITE_SETTINGS",
      payload: {
        address,
        contactPhone: phone,
        contactEmail: email,
        businessHours: weekend,
      },
    });
    setSavedMessage("Site settings & corporate contact info updated successfully!");
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
              Save Site Settings
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
              Site Content & Corporate Settings
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-light">
              Edit corporate office address, contact hotline numbers, official email, and office schedule.
            </p>
          </div>

          {savedMessage && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{savedMessage}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="bg-card border border-border/60 rounded-3xl p-8 shadow-xs space-y-6">
            
            {/* Corporate Address */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-medium font-heading text-foreground flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                Corporate Office Address
              </label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            {/* Contact Phones */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-medium font-heading text-foreground flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary" />
                Contact Hotline Numbers
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            {/* Official Email */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-medium font-heading text-foreground flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary" />
                Official Corporate Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            {/* Office Schedule */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-medium font-heading text-foreground flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary" />
                Weekly Office Hours & Closed Days
              </label>
              <input
                type="text"
                value={weekend}
                onChange={(e) => setWeekend(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
              <Save className="w-4 h-4" />
              SAVE SETTINGS
            </button>
          </form>

        </div>
      </SectionContainer>
    </div>
  );
}
