"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  TwitterIcon,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Send,
  Shield,
  Award,
  Users,
  TrendingUp,
  Building2,
  FileText,
  Briefcase,
  Camera,
  BookOpen,
  Link2,
} from "lucide-react";
import { toast } from "sonner";
import { useCMS } from "@/context/CMSContext";
import { SectionContainer } from "../ui/section-container";

/* ── Full sitemap data ─────────────────────────────────────────────── */
const sitemapColumns = [
  {
    title: "Company",
    icon: Building2,
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Mission & Vision", href: "/about#mission" },
      { label: "Achievements", href: "/about#achievements" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Projects",
    icon: Briefcase,
    links: [
      { label: "Ongoing Projects", href: "/projects?status=ongoing" },
      { label: "Upcoming Projects", href: "/projects?status=upcoming" },
      { label: "Completed Projects", href: "/projects?status=completed" },
      { label: "Project Details", href: "/projects" },
    ],
  },
  {
    title: "Properties",
    icon: Building2,
    links: [
      { label: "Residential Plots", href: "/properties?category=residential" },
      { label: "Commercial Plots", href: "/properties?category=commercial" },
      { label: "Ready Flat", href: "/properties?category=flat" },
      { label: "Land Investment", href: "/investment" },
      { label: "Investment Guide", href: "/investment#guide" },
      { label: "Consultancy", href: "/services#consultancy" },
    ],
  },
  {
    title: "Investment",
    icon: TrendingUp,
    links: [
      { label: "Why Invest", href: "/investment#why" },
      { label: "Benefits", href: "/investment#benefits" },
      { label: "ROI & Growth", href: "/investment#roi" },
      { label: "Payment Plan", href: "/investment#payment" },
      { label: "Investment Consultancy", href: "/services#investment" },
    ],
  },
  {
    title: "Services",
    icon: Shield,
    links: [
      { label: "Land Buying", href: "/services#land-buying" },
      { label: "Plot Sales", href: "/services#plot-sales" },
      { label: "Property Consultation", href: "/services#consultation" },
      { label: "Legal Support", href: "/services#legal" },
      { label: "Real Estate Marketing", href: "/services#marketing" },
    ],
  },
  {
    title: "Gallery",
    icon: Camera,
    links: [
      { label: "Project Gallery", href: "/gallery?cat=project" },
      { label: "Construction Gallery", href: "/gallery?cat=construction" },
      { label: "Event Gallery", href: "/gallery?cat=event" },
      { label: "Office Gallery", href: "/gallery?cat=office" },
      { label: "Video Gallery", href: "/gallery?cat=video" },
    ],
  },
  {
    title: "Resources",
    icon: BookOpen,
    links: [
      { label: "Blog / News", href: "/blog" },
      { label: "Real Estate Tips", href: "/blog?cat=tips" },
      { label: "Investment Guides", href: "/blog?cat=guides" },
      { label: "Legal Information", href: "/blog?cat=legal" },
      { label: "Awareness Articles", href: "/blog?cat=awareness" },
    ],
  },
];

const trustBadges = [
  { icon: Shield, label: "RAJUK Approved" },
  { icon: Award, label: "Bank Partnered" },
  { icon: Users, label: "1,500+ Clients" },
  { icon: TrendingUp, label: "High ROI" },
];

export function Footer() {
  const { state } = useCMS();
  const { siteSettings } = state;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Subscribed! You'll receive our latest updates.");
    setEmail("");
    setEmailError("");
    setSubmitting(false);
  };

  const socialLinks = [
    { icon: FacebookIcon, key: "facebook", url: siteSettings.social.facebook },
    { icon: TwitterIcon, key: "twitter", url: siteSettings.social.twitter },
    {
      icon: InstagramIcon,
      key: "instagram",
      url: siteSettings.social.instagram,
    },
    { icon: LinkedinIcon, key: "linkedin", url: siteSettings.social.linkedin },
    { icon: YoutubeIcon, key: "youtube", url: siteSettings.social.youtube },
  ].filter((s) => s.url);

  return (
    <footer className="bg-footer-bg text-white">
      {/* ── Trust Strip ───────────────────────────── */}
      <div className="border-b border-white/8">
        <SectionContainer>
          <div className="py-5 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 text-white/60 text-sm">
                <div className="w-7 h-7 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Icon className="h-3.5 w-3.5 text-accent" />
                </div>
                <span className="font-heading font-medium">{label}</span>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* ── Full Sitemap Section ──────────────────── */}
      <div className="border-b border-white/8">
        <SectionContainer className="py-10">
          <div className="flex items-center gap-3 mb-7">
            <Link2 className="h-4 w-4 text-accent" />
            <h3 className="text-label text-white/50">
              Footer Sitemap — All Links
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            {sitemapColumns.map((col) => (
              <div key={col.title} className="space-y-3">
                <div className="flex items-center gap-2">
                  <col.icon className="h-3.5 w-3.5 text-accent/70" />
                  <h4 className="text-label text-white/45 text-[10px]">
                    {col.title}
                  </h4>
                </div>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-white/45 hover:text-accent transition-colors duration-200 leading-snug block">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* View full sitemap page link */}
          <div className="mt-7 pt-5 border-t border-white/8 flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/sitemap"
              className="inline-flex items-center gap-2 px-4 h-9 rounded-xl bg-white/8 border border-white/12 text-xs text-white/60 hover:text-white hover:bg-white/12 transition-all font-heading">
              <FileText className="w-3.5 h-3.5" />
              View Full Sitemap Page
            </Link>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Cookie Policy", href: "/cookie-policy" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-xs text-white/35 hover:text-accent transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* ── Main Footer Grid ──────────────────────── */}
      <SectionContainer className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 border border-accent/30">
                <span className="font-heading font-bold text-accent text-lg leading-none">
                  S
                </span>
              </div>
              <div>
                <span className="font-heading font-semibold text-white text-lg tracking-tight block leading-tight">
                  {siteSettings.siteName}
                </span>
                <span className="text-white/35 text-[10px] tracking-widest uppercase">
                  Real Estate
                </span>
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-[1.8] font-light max-w-xs">
              A trusted name in land development across Dhaka. RAJUK-approved
              plots backed by legal verification and full transparency.
            </p>

            {socialLinks.length > 0 && (
              <div className="flex gap-2.5">
                {socialLinks.map(({ icon: Icon, key, url }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/45 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-all duration-250">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}

            <div className="space-y-2.5 pt-1">
              {siteSettings.contactPhone && (
                <a
                  href={`tel:${siteSettings.contactPhone}`}
                  className="flex items-center gap-2.5 text-sm text-white/45 hover:text-accent transition-colors">
                  <Phone className="h-3.5 w-3.5 text-accent/60 flex-shrink-0" />
                  {siteSettings.contactPhone}
                </a>
              )}
              {siteSettings.contactEmail && (
                <a
                  href={`mailto:${siteSettings.contactEmail}`}
                  className="flex items-center gap-2.5 text-sm text-white/45 hover:text-accent transition-colors">
                  <Mail className="h-3.5 w-3.5 text-accent/60 flex-shrink-0" />
                  {siteSettings.contactEmail}
                </a>
              )}
              {siteSettings.address && (
                <div className="flex items-start gap-2.5 text-sm text-white/45">
                  <MapPin className="h-3.5 w-3.5 text-accent/60 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{siteSettings.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-label text-white/45 text-[11px]">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Properties", href: "/properties" },
                { label: "Services", href: "/services" },
                { label: "Gallery", href: "/gallery" },
                { label: "Blog & News", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm text-white/45 hover:text-accent transition-colors group">
                    <ChevronRight className="h-3 w-3 text-accent/35 group-hover:text-accent transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-label text-white/45 text-[11px]">Services</h3>
            <ul className="space-y-2.5">
              {[
                {
                  label: "Residential Plots",
                  href: "/properties?category=residential",
                },
                {
                  label: "Commercial Plots",
                  href: "/properties?category=commercial",
                },
                { label: "Investment Guide", href: "/investment" },
                { label: "Calculator", href: "/calculator" },
                { label: "Compare Properties", href: "/compare" },
                { label: "Careers", href: "/careers" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm text-white/45 hover:text-accent transition-colors group">
                    <ChevronRight className="h-3 w-3 text-accent/35 group-hover:text-accent transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <h3 className="text-label text-white/45 text-[11px] mb-2">
                Stay Updated
              </h3>
              <p className="text-sm text-white/40 font-light leading-relaxed">
                Subscribe for the latest property listings, investment tips and
                updates.
              </p>
            </div>
            <form
              onSubmit={handleNewsletter}
              noValidate
              className="space-y-2.5">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="Enter your email"
                  disabled={submitting}
                  className="flex-1 h-11 px-4 rounded-xl bg-white/6 border border-white/10 text-white placeholder:text-white/28 text-sm focus:outline-none focus:border-primary/60 focus:bg-white/10 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:bg-primary/85 transition-all disabled:opacity-50 shadow-blue">
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {emailError && (
                <p className="text-xs text-destructive">{emailError}</p>
              )}
            </form>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>
            © {new Date().getFullYear()} {siteSettings.siteName} (Pvt.) Ltd. All
            Rights Reserved.
          </p>
          <p>
            Your Trusted Partner in{" "}
            <span className="text-accent font-medium">Land Investment</span>
          </p>
        </div>
      </SectionContainer>
    </footer>
  );
}
