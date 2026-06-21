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
} from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import { Container } from "./Container";

export function Footer() {
  const { state } = useCMS();
  const { siteSettings, menu } = state;

  const socialLinks = [
    { key: "facebook", icon: Facebook, url: siteSettings.social.facebook },
    { key: "twitter", icon: Twitter, url: siteSettings.social.twitter },
    { key: "instagram", icon: Instagram, url: siteSettings.social.instagram },
    { key: "linkedin", icon: Linkedin, url: siteSettings.social.linkedin },
  ].filter((s) => s.url);

  return (
    <footer className="border-t bg-muted/40">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <HomeIcon className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold">
                {siteSettings.siteName}
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Premium real estate solutions for modern living. Find your dream
              property with our curated listings.
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socialLinks.map(({ key, icon: Icon, url }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:text-primary hover:border-primary"
                    aria-label={key}>
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {menu.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Properties</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/properties?type=sale"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  For Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=rent"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  For Rent
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?category=apartment"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?category=house"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?category=villa"
                  className="text-muted-foreground hover:text-primary transition-colors">
                  Villas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <span className="leading-relaxed">{siteSettings.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a
                  href={`tel:${siteSettings.contactPhone}`}
                  className="hover:text-primary transition-colors">
                  {siteSettings.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a
                  href={`mailto:${siteSettings.contactEmail}`}
                  className="hover:text-primary transition-colors">
                  {siteSettings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteSettings.siteName}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
