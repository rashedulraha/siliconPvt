"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu, X, Phone, CalendarCheck, ChevronDown, LogOut, User, Heart,
  LayoutDashboard,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
import { useCMS } from "@/context/CMSContext";
import { useUserAuth } from "@/context/UserAuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { state } = useCMS();
  const { user, isLoggedIn, logout } = useUserAuth();
  const menuItems = [...state.menu].sort((a, b) => a.order - b.order);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isHeroPage = pathname === "/" || pathname === "/projects" || pathname === "/properties";
  const isTransparent = isHeroPage && !scrolled;

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out",
        isTransparent
          ? "bg-transparent"
          : "bg-background/80 backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-black/5"
      )}
    >
      {/* ── Container (max-w-7xl = 1280px) ───────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          
          {/* ─ Logo ─────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 overflow-hidden",
                isTransparent
                  ? "bg-gradient-to-br from-white/20 to-white/5 border border-white/20 group-hover:from-white/30 group-hover:to-white/10"
                  : "bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 group-hover:from-primary/20 group-hover:to-primary/10"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  isTransparent
                    ? "bg-gradient-to-br from-white/30 to-transparent"
                    : "bg-gradient-to-br from-primary/30 to-transparent"
                )}
              />
              <span
                className={cn(
                  "relative font-heading font-bold text-lg leading-none",
                  isTransparent ? "text-white" : "text-primary"
                )}
              >
                S
              </span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span
                className={cn(
                  "font-heading font-bold text-sm tracking-tight leading-tight",
                  isTransparent ? "text-white" : "text-foreground"
                )}
              >
                {state.siteSettings.siteName}
              </span>
              <span
                className={cn(
                  "text-[10px] tracking-[0.2em] uppercase font-medium leading-none",
                  isTransparent ? "text-white/50" : "text-muted-foreground"
                )}
              >
                Real Estate
              </span>
            </div>
          </Link>

          {/* ─ Desktop Nav ──────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-[13px] font-medium rounded-lg transition-all duration-300",
                    isActive && !isTransparent &&
                      "bg-primary/[0.08] text-primary shadow-sm",
                    isActive && isTransparent &&
                      "bg-white/[0.15] text-white shadow-sm",
                    !isActive && isTransparent &&
                      "text-white/80 hover:text-white hover:bg-white/[0.08]",
                    !isActive && !isTransparent &&
                      "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                        isTransparent ? "bg-white" : "bg-primary"
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Right Actions ────────────────── */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            {state.siteSettings.contactPhone && (
              <a
                href={`tel:${state.siteSettings.contactPhone}`}
                className={cn(
                  "flex items-center gap-2 text-xs font-medium transition-all duration-300 px-3 py-2 rounded-lg",
                  isTransparent
                    ? "text-white/70 hover:text-white hover:bg-white/[0.08]"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/[0.06]"
                )}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden xl:inline font-medium">
                  {state.siteSettings.contactPhone}
                </span>
              </a>
            )}

            <div
              className={cn(
                "h-6 w-px",
                isTransparent ? "bg-white/15" : "bg-border"
              )}
            />

            <ModeToggle />

            {isLoggedIn && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl border transition-all duration-300",
                    isTransparent
                      ? "border-white/15 bg-white/[0.08] hover:bg-white/[0.15]"
                      : "border-border bg-muted/50 hover:bg-muted shadow-sm"
                  )}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-lg object-cover ring-2 ring-white/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className="text-left hidden xl:block">
                    <p
                      className={cn(
                        "text-xs font-semibold font-heading leading-tight",
                        isTransparent ? "text-white" : "text-foreground"
                      )}
                    >
                      {user.name}
                    </p>
                    <p
                      className={cn(
                        "text-[10px] leading-tight",
                        isTransparent ? "text-white/50" : "text-muted-foreground"
                      )}
                    >
                      {user.email}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-300 hidden xl:block",
                      userMenuOpen && "rotate-180",
                      isTransparent ? "text-white/60" : "text-muted-foreground"
                    )}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden shadow-2xl py-1.5 z-50 border border-border/60 bg-background/95 backdrop-blur-2xl">
                    <div className="px-4 py-3 border-b border-border/60">
                      <p className="text-sm font-semibold text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-primary/[0.06] hover:text-primary transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" /> My Dashboard
                    </Link>
                    <Link
                      href="/favorites"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-primary/[0.06] hover:text-primary transition-colors"
                    >
                      <Heart className="w-4 h-4" /> Saved Properties
                    </Link>
                    <div className="border-t border-border/60 my-1.5" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/[0.06] transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className={cn(
                    "px-4 h-9 rounded-lg text-sm font-medium font-heading border transition-all duration-300 inline-flex items-center",
                    isTransparent
                      ? "border-white/20 text-white hover:bg-white/[0.1]"
                      : "border-border text-foreground hover:bg-muted"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground h-9 px-4 rounded-lg text-sm font-medium font-heading inline-flex items-center gap-1.5 hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  Book Visit
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile controls ──────────────────────── */}
          <div className="flex lg:hidden items-center gap-2 ml-auto">
            {isLoggedIn && (
              <Link
                href="/favorites"
                aria-label="Favorites"
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                  isTransparent
                    ? "text-white/80 hover:bg-white/[0.1]"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Heart className="w-4 h-4" />
              </Link>
            )}
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className={cn(
                "w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300",
                isTransparent
                  ? "border-white/20 text-white/85 hover:bg-white/[0.1]"
                  : "border-border text-foreground hover:bg-muted"
              )}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ───────────────────────────── */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-500 ease-out",
            isOpen ? "max-h-[600px] opacity-100 mt-2 pb-4" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-1 mb-4">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-lg transition-all",
                    isActive && !isTransparent &&
                      "bg-primary/[0.08] text-primary",
                    isActive && isTransparent &&
                      "bg-white/[0.15] text-white",
                    !isActive && isTransparent &&
                      "text-white/85 hover:bg-white/[0.08] hover:text-white",
                    !isActive && !isTransparent &&
                      "text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {isLoggedIn && user ? (
            <div className="space-y-2">
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg",
                  isTransparent ? "bg-white/[0.08]" : "bg-muted"
                )}
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      isTransparent ? "text-white" : "text-foreground"
                    )}
                  >
                    {user.name}
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      isTransparent ? "text-white/60" : "text-muted-foreground"
                    )}
                  >
                    {user.email}
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="w-full btn-primary justify-center"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 h-10 rounded-lg border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/[0.08] transition-all"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "w-full h-10 rounded-lg border text-sm font-medium font-heading inline-flex items-center justify-center",
                  isTransparent
                    ? "border-white/20 text-white hover:bg-white/[0.1]"
                    : "border-border text-foreground hover:bg-muted"
                )}
              >
                Sign In
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full btn-primary justify-center"
              >
                <CalendarCheck className="w-4 h-4" /> Book a Viewing
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}