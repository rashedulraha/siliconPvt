"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home as HomeIcon,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Youtube,
  Share2,
  Rss,
} from "lucide-react";
import { toast } from "sonner";
import { useCMS } from "@/context/CMSContext";
import { Container } from "./Container";

export function Footer() {
  const { state } = useCMS();
  const { siteSettings, menu } = state;

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterEmailError, setNewsletterEmailError] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.trim() || !emailPattern.test(newsletterEmail.trim())) {
      setNewsletterEmailError("Please enter a valid email address.");
      return;
    }
    setNewsletterSubmitting(true);
    try {
      await Promise.resolve();
      console.log("Newsletter subscription:", newsletterEmail);
      toast.success("Subscribed successfully!");
      setNewsletterEmail("");
      setNewsletterEmailError("");
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const socialLinks = [
    { key: "facebook", icon: Facebook, url: siteSettings.social.facebook },
    { key: "twitter", icon: Twitter, url: siteSettings.social.twitter },
    { key: "instagram", icon: Instagram, url: siteSettings.social.instagram },
    { key: "linkedin", icon: Linkedin, url: siteSettings.social.linkedin },
    { key: "youtube", icon: Youtube, url: siteSettings.social.youtube },
    { key: "pinterest", icon: Share2, url: siteSettings.social.pinterest },
    { key: "rss", icon: Rss, url: siteSettings.social.rss },
  ].filter((s) => s.url);

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Plots & Land", href: "/properties" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog & News", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ];

  const projectLinks = [
    { label: "Ongoing Projects", href: "/projects?status=ongoing" },
    { label: "Upcoming Projects", href: "/projects?status=upcoming" },
    { label: "Completed Projects", href: "/projects?status=completed" },
    { label: "Residential Plots", href: "/properties?type=residential" },
    { label: "Commercial Plots", href: "/properties?type=commercial" },
    { label: "Investment Opportunities", href: "/investment" },
    { label: "Project Location Map", href: "/projects/map" },
  ];

  const supportLinks = [
    { label: "FAQs", href: "/faqs" },
    { label: "Payment Information", href: "/payment" },
    { label: "Documents Download", href: "/documents" },
    { label: "Customer Reviews", href: "/reviews" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <Container className="py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand & Contact Info - Column 1 */}
          <div className="xl:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/20">
                <HomeIcon className="h-5 w-5 text-secondary" />
              </div>
              <span className="font-display text-xl font-bold">
                {siteSettings.siteName}
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-4">
              Silicon Real Estate (Pvt.) Ltd. is a trusted land development
              company providing secure & profitable land investment
              opportunities across Bangladesh.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="px-3 py-1.5 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10 text-center">
                <span className="text-xs font-medium text-primary-foreground/80">
                  Trusted Company
                </span>
              </div>
              <div className="px-3 py-1.5 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10 text-center">
                <span className="text-xs font-medium text-primary-foreground/80">
                  Legal Security
                </span>
              </div>
              <div className="px-3 py-1.5 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10 text-center">
                <span className="text-xs font-medium text-primary-foreground/80">
                  Prime Locations
                </span>
              </div>
              <div className="px-3 py-1.5 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10 text-center">
                <span className="text-xs font-medium text-primary-foreground/80">
                  Customer Satisfaction
                </span>
              </div>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-primary-foreground/60 mr-1">
                  Follow Us:
                </span>
                {socialLinks.map(({ key, icon: Icon, url }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors hover:scale-105 duration-300"
                    aria-label={key}>
                    <Icon className="h-3.5 w-3.5 text-primary-foreground/60 hover:text-secondary transition-colors" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links - Column 2 */}
          <div>
            <h3 className="font-semibold text-primary-foreground text-sm uppercase tracking-wider mb-4 pb-2 border-b border-primary-foreground/10 relative">
              <span className="relative inline-block">
                Quick Links
                <span className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-secondary rounded-full"></span>
              </span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-secondary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="h-3 w-3 text-secondary/50 group-hover:text-secondary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Projects - Column 3 */}
          <div>
            <h3 className="font-semibold text-primary-foreground text-sm uppercase tracking-wider mb-4 pb-2 border-b border-primary-foreground/10 relative">
              <span className="relative inline-block">
                Our Projects
                <span className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-secondary rounded-full"></span>
              </span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              {projectLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-secondary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="h-3 w-3 text-secondary/50 group-hover:text-secondary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support - Column 4 */}
          <div>
            <h3 className="font-semibold text-primary-foreground text-sm uppercase tracking-wider mb-4 pb-2 border-b border-primary-foreground/10 relative">
              <span className="relative inline-block">
                Customer Support
                <span className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-secondary rounded-full"></span>
              </span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-secondary transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="h-3 w-3 text-secondary/50 group-hover:text-secondary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information - Column 5 */}
          <div>
            <h3 className="font-semibold text-primary-foreground text-sm uppercase tracking-wider mb-4 pb-2 border-b border-primary-foreground/10 relative">
              <span className="relative inline-block">
                Contact Information
                <span className="absolute -bottom-[2px] left-0 w-full h-[2px] bg-secondary rounded-full"></span>
              </span>
            </h3>
            <ul className="space-y-3 text-sm">
              {siteSettings.address && (
                <li className="flex items-start gap-2.5 text-primary-foreground/60">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-secondary" />
                  <span className="leading-relaxed">{siteSettings.address}</span>
                </li>
              )}
              {siteSettings.contactPhone && (
                <li className="flex items-center gap-2.5 text-primary-foreground/60">
                  <Phone className="h-4 w-4 flex-shrink-0 text-secondary" />
                  <div>
                    <div>
                      <a
                        href={`tel:${siteSettings.contactPhone}`}
                        className="hover:text-secondary transition-colors">
                        {siteSettings.contactPhone}
                      </a>
                    </div>
                    {siteSettings.contactPhone2 && (
                      <div>
                        <a
                          href={`tel:${siteSettings.contactPhone2}`}
                          className="hover:text-secondary transition-colors">
                          {siteSettings.contactPhone2}
                        </a>
                      </div>
                    )}
                  </div>
                </li>
              )}
              {siteSettings.contactEmail && (
                <li className="flex items-center gap-2.5 text-primary-foreground/60">
                  <Mail className="h-4 w-4 flex-shrink-0 text-secondary" />
                  <a
                    href={`mailto:${siteSettings.contactEmail}`}
                    className="hover:text-secondary transition-colors">
                    {siteSettings.contactEmail}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2.5 text-primary-foreground/60">
                <span className="text-secondary">🌐</span>
                <a
                  href="https://www.siliconrealestate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors">
                  www.siliconrealestate.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-10 py-8 border-t border-b border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="sm:flex-1">
              <h3 className="font-semibold text-primary-foreground mb-1">Stay Updated</h3>
              <p className="text-sm text-primary-foreground/60">Subscribe to receive the latest property listings and news.</p>
            </div>
            <form
              aria-label="Newsletter subscription"
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col gap-2 sm:w-80"
              noValidate
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => { setNewsletterEmail(e.target.value); if (newsletterEmailError) setNewsletterEmailError(""); }}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  disabled={newsletterSubmitting}
                  className="flex-1 rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={newsletterSubmitting}
                  className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary/90 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  {newsletterSubmitting ? "..." : "Subscribe"}
                </button>
              </div>
              {newsletterEmailError && (
                <span data-field-error="email" className="text-xs text-red-300">{newsletterEmailError}</span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/40">
            <p>
              © {new Date().getFullYear()} {siteSettings.siteName}. All Rights
              Reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xs px-3 py-1 bg-secondary/10 rounded-full text-secondary font-medium">
                RAJUK & Govt. Approved Company
              </span>
              <span className="text-xs">
                Website Designed & Developed by{" "}
                <a
                  href="#"
                  className="text-secondary hover:text-secondary/80 transition-colors">
                  Your Company Name
                </a>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
