"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ChevronRight,
  Send,
  ShieldCheck,
  Building2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { SectionContainer } from "../ui/section-container";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

const USEFUL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-terms" },
  { label: "Terms of Service", href: "/privacy-terms" },
  { label: "Schedule Site Visit", href: "/contact" },
  { label: "Admin Portal", href: "/login" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success(
        "Thank you for subscribing to Silicon Real Estate updates!",
      );
      setEmail("");
      setSubmitting(false);
    }, 800);
  };

  return (
    <footer className="bg-dark-hero text-white border-t border-white/10 font-sans relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-accent/5 blur-[120px] pointer-events-none" />

      {/* ── 1. TRUST STRIP BAR ── */}
      <div className="border-b border-white/10 py-6 bg-white/[0.02]">
        <SectionContainer>
          <div className="flex flex-wrap items-center justify-between gap-6 text-xs sm:text-sm font-heading font-medium text-white/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-accent" />
              </div>
              <span>RAJUK Compliant Housing Township</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-accent" />
              </div>
              <span>Mohammadpur Riverside Location</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-accent" />
              </div>
              <span>100% Legal Title Verification</span>
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* ── 2. MAIN FOOTER CONTENT GRID ── */}
      <SectionContainer className="py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 text-left">
          {/* COLUMN 1: BRANDING & CONTACT INFO WITH IMAGE (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo Image Header */}
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center shrink-0 border border-white/20 shadow-md">
                <Image
                  src="/silicon.png"
                  alt="Silicon Real Estate Logo"
                  width={36}
                  height={36}
                  className=" h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="font-heading font-semibold text-white text-base sm:text-lg tracking-tight block leading-tight">
                  Silicon Real Estate (Pvt.) Ltd.
                </span>
                <span className="text-accent text-[10px] tracking-widest uppercase font-mono font-medium">
                  Official Land Development Company
                </span>
              </div>
            </Link>

            <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light">
              A trusted pioneer in modern land development across Dhaka.
              RAJUK-approved planned residential township in Silicon City with
              legal deed transparency.
            </p>

            {/* Corporate Address & Hotlines */}
            <div className="space-y-3 pt-2 text-xs font-light text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>
                  2/3 (2nd Floor), Block # A, Iqbal Road, Mohammadpur,
                  Dhaka-1207
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+880 12 345 678 / +880 1712 345 678</span>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +880 1712 345 678</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>info@siliconrealestatepvtltd.com</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-accent border-b border-white/10 pb-2">
              QUICK NAVIGATION
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-accent/60 group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: USEFUL LINKS & LEGAL POLICIES (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-accent border-b border-white/10 pb-2">
              USEFUL POLICIES
            </h3>
            <ul className="space-y-2.5">
              {USEFUL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-accent/60 group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER & PROJECT THUMBNAIL (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-accent border-b border-white/10 pb-2">
              STAY UPDATED
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Subscribe for official project updates, plot availability notices,
              and site visit schedules.
            </p>

            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-4 pr-12 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="absolute right-1.5 w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Corporate Office Badge Card with Image Accent */}
            <div className="pt-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-md">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-white/10">
                  <Image
                    src="/silicon.png"
                    alt="Silicon City Thumbnail"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="space-y-0.5 text-left">
                  <span className="text-[10px] font-mono text-accent font-semibold block">
                    SILICON CITY TOWNSHIP
                  </span>
                  <span className="text-xs font-heading text-white font-medium block">
                    Corporate Head Office
                  </span>
                  <span className="text-[10px] text-white/60 font-light block">
                    Mohammadpur, Dhaka
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* ── 3. BOTTOM COPYRIGHT BAR ── */}
      <div className="border-t border-white/10 py-6 bg-black/30">
        <SectionContainer>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
            <span>
              © 2026 Silicon Real Estate (Pvt.) Ltd. All Rights Reserved.
            </span>
            <span>
              Designed & Developed by{" "}
              <a
                href="https://rashedul-raha.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-accent transition-colors"
              >
                <span>Rashedul Islam</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </span>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy-terms"
                className="hover:text-accent transition-colors"
              >
                Terms of Governance
              </Link>
              <span>•</span>
              <Link
                href="/privacy-terms"
                className="hover:text-accent transition-colors"
              >
                Privacy Protection
              </Link>
            </div>
          </div>
        </SectionContainer>
      </div>
    </footer>
  );
}
