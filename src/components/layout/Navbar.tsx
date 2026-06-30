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
import { SectionContainer } from "@/components/ui/section-container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const [activeMobileGroup, setActiveMobileGroup] = useState<string | null>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { state } = useCMS();
  const { user, isLoggedIn, logout } = useUserAuth();
  const menuItems = [...state.menu].sort((a, b) => a.order - b.order);

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
    setActiveMobileGroup(null);
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

  function handleLogout() {
    logout();
    router.push("/");
  }

  const navGroups = [
    {
      label: "Properties",
      href: "/properties",
      links: [
        { label: "All Properties", href: "/properties" },
        { label: "Residential Plots", href: "/properties?category=residential" },
        { label: "Commercial Plots", href: "/properties?category=commercial" },
        { label: "Ready Flat", href: "/properties?category=flat" },
        { label: "Land Investment", href: "/investment" },
      ],
    },
    {
      label: "Projects",
      href: "/projects",
      links: [
        { label: "All Projects", href: "/projects" },
        { label: "Ongoing Projects", href: "/projects?status=ongoing" },
        { label: "Upcoming Projects", href: "/projects?status=upcoming" },
        { label: "Completed Projects", href: "/projects?status=completed" },
      ],
    },
    {
      label: "Investment",
      href: "/investment",
      links: [
        { label: "Why Invest", href: "/investment" },
        { label: "Benefits", href: "/investment#benefits" },
        { label: "ROI & Growth", href: "/investment#roi" },
        { label: "Payment Plan", href: "/investment#payment" },
      ],
    },
    {
      label: "Services",
      href: "/services",
      links: [
        { label: "All Services", href: "/services" },
        { label: "Land Buying", href: "/services#land-buying" },
        { label: "Plot Sales", href: "/services#plot-sales" },
        { label: "Property Consultation", href: "/services#consultation" },
        { label: "Legal Support", href: "/services#legal" },
      ],
    },
    {
      label: "About",
      href: "/about",
      links: [
        { label: "Company Overview", href: "/about" },
        { label: "Mission & Vision", href: "/about#mission" },
        { label: "Chairman Message", href: "/about#chairman" },
        { label: "Our Team", href: "/about#team" },
        { label: "Achievements", href: "/about#achievements" },
        { label: "Client Trust", href: "/about#trust" },
      ],
    },
    {
      label: "Resources",
      href: "/blog",
      links: [
        { label: "Gallery", href: "/gallery" },
        { label: "Blog / News", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "EMI Calculator", href: "/calculator" },
        { label: "Sitemap", href: "/sitemap" },
      ],
    },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full duration-300 ease-out border-b shadow-xs bg-background/80 backdrop-blur-md border-border/40"
    >
      <SectionContainer>
        <div className="flex h-16 items-center justify-between gap-6">

          {/* ── Logo Section ───────────── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div
              className="
                relative
                h-11 w-11
                overflow-hidden
                rounded-full
                border border-primary/15
                bg-background/60
                backdrop-blur-md
                transition-all duration-300
                group-hover:scale-[1.03]
                group-hover:border-primary/30
                flex items-center justify-center
                shrink-0
              ">

            <Image
            src="/silicon.png"
            alt={`${state.siteSettings.siteName} Logo`}
            width={44}
            height={44}
            priority
            sizes="44px"
            className="object-cover rounded-full overflow-hidden p-1 select-none"
          />
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="font-heading font-bold text-sm tracking-tight leading-tight text-foreground">
                Silicon
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium leading-none text-muted-foreground">
                Real Estate Pvt. Ltd.
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav (Premium Theme Matched) ──────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1 bg-muted/40 backdrop-blur-xs rounded-full border border-border/50 w-fit">
            {navGroups.map((group) => {
              const isGroupActive = pathname === group.href || pathname?.startsWith(group.href + "/");
              return (
                <div key={group.label} className="relative group/nav">
                  <Link
                    href={group.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium rounded-full transition-all duration-300 select-none",
                      isGroupActive
                        ? "bg-background text-primary border border-border/60 shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                  >
                    {group.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover/nav:rotate-180" />
                  </Link>

                  {/* Dropdown Box */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover/nav:block pt-2 w-52 z-50">
                    <div className="bg-background/95 backdrop-blur-xl border border-border/60 rounded-xl shadow-lg py-1.5 overflow-hidden">
                      {group.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block px-4 py-2 text-[12px] text-foreground/80 hover:bg-primary/[0.06] hover:text-primary transition-all font-medium text-left"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* ── Desktop Right Actions ────────────────── */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            {state.siteSettings.contactPhone && (
              <a
                href={`tel:${state.siteSettings.contactPhone}`}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/[0.06] transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-500" />
              </a>
            )}

            <div className="h-6 w-px bg-border" />

            <ModeToggle />

            {isLoggedIn && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl border border-border bg-muted/50 hover:bg-muted shadow-xs transition-all duration-300"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  {user.avatar ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/20">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      sizes="32px"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className="text-left hidden xl:block">
                    <p className="text-xs font-semibold font-heading leading-tight text-foreground">
                      {user.name}
                    </p>
                    <p className="text-[10px] leading-tight text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-300 hidden xl:block text-muted-foreground",
                      userMenuOpen && "rotate-180"
                    )}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden shadow-2xl py-1.5 z-50 border border-border/60 bg-background/95 backdrop-blur-2xl">
                    <div className="px-4 py-3 border-b border-border/60">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
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
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/[0.06] transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-4 h-9 rounded-lg text-sm font-medium font-heading border border-border text-foreground hover:bg-muted transition-all duration-300 inline-flex items-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground h-9 px-4 rounded-lg text-sm font-medium font-heading inline-flex items-center gap-1.5 hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/25"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  Book Visit
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile Controls ──────────────────────── */}
          <div className="flex lg:hidden items-center gap-2 ml-auto">
            {isLoggedIn && (
              <Link
                href="/favorites"
                aria-label="Favorites"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-all"
              >
                <Heart className="w-4 h-4" />
              </Link>
            )}
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="w-9 h-9 rounded-lg border border-border text-foreground hover:bg-muted flex items-center justify-center transition-all duration-300"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* ── Fully Responsive Mobile Accordion Menu ───────────────────────────── */}
        <div
          className={cn(
            "lg:hidden overflow-y-auto transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[85vh] opacity-100 mt-2 pb-6 border-t border-border/40 pt-2" : "max-h-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col gap-1 mb-4">
            {navGroups.map((group) => {
              const isGroupOpen = activeMobileGroup === group.label;
              return (
                <div key={group.label} className="border-b border-border/10 last:border-0">
                  <button
                    onClick={() => setActiveMobileGroup(isGroupOpen ? null : group.label)}
                    className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-foreground rounded-lg hover:bg-muted/50 transition-all"
                  >
                    {group.label}
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200 opacity-60", isGroupOpen && "rotate-180")} />
                  </button>
                  
                  <div className={cn("flex flex-col gap-0.5 pl-4 overflow-hidden transition-all duration-300", isGroupOpen ? "max-h-60 py-1" : "max-h-0")}>
                    {group.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-2 text-xs font-medium text-muted-foreground hover:text-primary rounded-md transition-colors text-left block"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          
          <div className="mt-4 pt-4 border-t border-border/60">
            {isLoggedIn && user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-muted/40 border border-border/30">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-foreground">{user.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate max-w-[180px]">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 h-9 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80 transition-all"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 h-9 rounded-lg border border-destructive/20 text-destructive text-xs font-medium hover:bg-destructive/[0.04] transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 px-1">
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full h-10 rounded-xl border border-border text-foreground hover:bg-muted inline-flex items-center justify-center text-xs font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full h-10 rounded-xl bg-primary text-primary-foreground inline-flex items-center justify-center text-xs font-semibold shadow-xs"
                >
                  <CalendarCheck className="w-3.5 h-3.5 mr-1.5" /> Book Visit
                </Link>
              </div>
            )}
          </div>
        </div>
      </SectionContainer>
    </header>
  );
}