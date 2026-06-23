"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
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
  Shield,
  Send,
  Award,
  TrendingUp,
  Users,
  CheckCircle,
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

  // Stats data
  const stats = [
    { icon: Award, value: "10+", label: "Years Excellence" },
    { icon: Users, value: "1500+", label: "Happy Clients" },
    { icon: Building2, value: "25+", label: "Projects" },
    { icon: TrendingUp, value: "800+", label: "Acres Developed" },
  ];

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
      }}>
      {/* Stats Section */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <Container>
          <div className="py-8 md:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group transition-all duration-300 hover:scale-105">
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 group-hover:scale-110 transition-all duration-300"
                    style={{
                      backgroundColor: "var(--accent)",
                      opacity: 0.1,
                    }}>
                    <stat.icon
                      className="h-5 w-5"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                  <div
                    className="font-serif text-2xl font-bold"
                    style={{ color: "var(--foreground)" }}>
                    {stat.value}
                  </div>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand - Column 1 (3 columns) */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-3"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}>
                <Building2 className="h-5 w-5" />
              </div>
              <span
                className="font-serif text-xl font-bold tracking-tight"
                style={{ color: "var(--foreground)" }}>
                {siteSettings.siteName}
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--muted-foreground)" }}>
              Silicon Real Estate (Pvt.) Ltd. is a trusted land development
              company providing secure & profitable land investment
              opportunities across Bangladesh.
            </p>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ key, icon: Icon, url }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-3"
                    style={{
                      backgroundColor: "var(--secondary)",
                      color: "var(--secondary-foreground)",
                    }}
                    aria-label={key}>
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links - Column 2 (3 columns) */}
          <div className="lg:col-span-3">
            <h3
              className="font-serif font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b relative"
              style={{
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}>
              Quick Links
              <span
                className="absolute -bottom-[2px] left-0 w-8 h-0.5 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 text-sm transition-all duration-300 group"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--foreground)";
                    e.currentTarget.style.paddingLeft = "4px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted-foreground)";
                    e.currentTarget.style.paddingLeft = "0px";
                  }}>
                  <ChevronRight
                    className="h-3 w-3 transition-all duration-300"
                    style={{ color: "var(--accent)" }}
                  />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Our Projects - Column 3 (2 columns) */}
          <div className="lg:col-span-2">
            <h3
              className="font-serif font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b relative"
              style={{
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}>
              Our Projects
              <span
                className="absolute -bottom-[2px] left-0 w-8 h-0.5 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </h3>
            <ul className="space-y-2.5">
              {projectLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm transition-all duration-300 group"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--foreground)";
                      e.currentTarget.style.paddingLeft = "4px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--muted-foreground)";
                      e.currentTarget.style.paddingLeft = "0px";
                    }}>
                    <ChevronRight
                      className="h-3 w-3 transition-all duration-300"
                      style={{ color: "var(--accent)" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter - Column 4 (4 columns) */}
          <div className="lg:col-span-4">
            <h3
              className="font-serif font-semibold text-sm uppercase tracking-wider mb-4 pb-2 border-b relative"
              style={{
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}>
              Contact & Stay Updated
              <span
                className="absolute -bottom-[2px] left-0 w-8 h-0.5 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </h3>

            {/* Contact Info */}
            <div className="space-y-2.5 mb-4">
              {siteSettings.address && (
                <div className="flex items-start gap-2.5 text-sm">
                  <MapPin
                    className="h-4 w-4 mt-0.5 flex-shrink-0"
                    style={{ color: "var(--accent)" }}
                  />
                  <span style={{ color: "var(--muted-foreground)" }}>
                    {siteSettings.address}
                  </span>
                </div>
              )}
              {siteSettings.contactPhone && (
                <div className="flex items-center gap-2.5 text-sm">
                  <Phone
                    className="h-4 w-4 flex-shrink-0"
                    style={{ color: "var(--accent)" }}
                  />
                  <a
                    href={`tel:${siteSettings.contactPhone}`}
                    className="transition-colors"
                    style={{ color: "var(--muted-foreground)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--foreground)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--muted-foreground)";
                    }}>
                    {siteSettings.contactPhone}
                  </a>
                </div>
              )}
              {siteSettings.contactEmail && (
                <div className="flex items-center gap-2.5 text-sm">
                  <Mail
                    className="h-4 w-4 flex-shrink-0"
                    style={{ color: "var(--accent)" }}
                  />
                  <a
                    href={`mailto:${siteSettings.contactEmail}`}
                    className="transition-colors"
                    style={{ color: "var(--muted-foreground)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--foreground)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--muted-foreground)";
                    }}>
                    {siteSettings.contactEmail}
                  </a>
                </div>
              )}
            </div>

            {/* Newsletter */}
            <div>
              <p
                className="text-sm mb-2"
                style={{ color: "var(--muted-foreground)" }}>
                Subscribe for updates & offers
              </p>
              <form
                aria-label="Newsletter subscription"
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col gap-2"
                noValidate>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterEmailError) setNewsletterEmailError("");
                    }}
                    placeholder="Your email address"
                    aria-label="Email address"
                    disabled={newsletterSubmitting}
                    className="flex-1 rounded-md px-3 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring-2 disabled:opacity-50"
                    style={{
                      backgroundColor: "var(--secondary)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.boxShadow = `0 0 0 3px var(--accent)`;
                      e.currentTarget.style.boxShadow =
                        e.currentTarget.style.boxShadow + "15";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="submit"
                    disabled={newsletterSubmitting}
                    className="rounded-md px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 whitespace-nowrap"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--accent-foreground)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.85";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}>
                    {newsletterSubmitting ? (
                      "..."
                    ) : (
                      <>
                        Subscribe
                        <Send className="inline ml-1.5 h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
                {newsletterEmailError && (
                  <span
                    className="text-xs"
                    style={{ color: "var(--destructive)" }}>
                    {newsletterEmailError}
                  </span>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: "var(--border)" }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p style={{ color: "var(--muted-foreground)" }}>
              © {new Date().getFullYear()} {siteSettings.siteName}. All Rights
              Reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span
                className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--secondary-foreground)",
                }}>
                <Shield className="h-3 w-3" />
                RAJUK & Govt. Approved
              </span>
              <span style={{ color: "var(--muted-foreground)" }}>
                Website by{" "}
                <a
                  href="#"
                  className="transition-colors"
                  style={{
                    color: "var(--accent)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}>
                  Your Company
                </a>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
