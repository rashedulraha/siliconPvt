"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Building2, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { useCMS } from "@/context/CMSContext";
import { Container } from "./Container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { state } = useCMS();

  const menuItems = [...state.menu].sort((a, b) => a.order - b.order);

  // Scroll effect for glass morphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-background/60 backdrop-blur-sm border-b border-border/30",
      )}>
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-all duration-300 hover:opacity-80">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70" />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent" />
              <Building2 className="relative h-5 w-5 text-primary-foreground" />
            </div>
            <span
              className="font-serif text-xl font-bold tracking-tight"
              style={{ color: "var(--foreground)" }}>
              {state.siteSettings.siteName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  )}
                  style={{
                    color: isActive
                      ? "var(--foreground)"
                      : "var(--muted-foreground)",
                  }}>
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            <Button
              size="sm"
              className="font-medium transition-all duration-300 hover:scale-105"
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
              List Property
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-md transition-all duration-300 hover:bg-muted/50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{
              color: "var(--foreground)",
            }}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
          )}>
          <div
            className="py-4 border-t"
            style={{ borderColor: "var(--border)" }}>
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname?.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-300",
                      isActive ? "bg-muted/50" : "hover:bg-muted/30",
                    )}
                    style={{
                      color: isActive
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                      backgroundColor: isActive
                        ? "var(--muted)"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "var(--muted)";
                        e.currentTarget.style.color = "var(--foreground)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--muted-foreground)";
                      }
                    }}>
                    {item.label}
                  </Link>
                );
              })}
              <div
                className="flex items-center gap-3 px-4 pt-4 mt-2"
                style={{ borderTop: "1px solid var(--border)" }}>
                <ModeToggle />
                <Button
                  size="sm"
                  className="flex-1 font-medium"
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
                  List Property
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
