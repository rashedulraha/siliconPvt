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

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { state } = useCMS();
  const { user, isLoggedIn, logout } = useUserAuth();
  const menuItems = [...state.menu].sort((a, b) => a.order - b.order);



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



  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full duration-300 ease-out border-b shadow-xs bg-background border-border/40"
    >
      {/* ── Container (max-w-7xl = 1280px) ───────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">


       <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
  <div
    className="
      relative
      h-11 w-11
      overflow-hidden
      rounded-xl
      border border-primary/15
      bg-background/60
      backdrop-blur-md
      transition-all duration-300
      group-hover:scale-[1.03]
      group-hover:border-primary/30
      flex items-center justify-center
      shrink-0
    "
  >
    <Image
      src="/silicon.png"
      alt={`${state.siteSettings.siteName} Logo`}
      fill
      priority
      sizes="44px"
      className="
        object-contain
        p-[px]
        select-none
      "
    />
  </div>

  <div className="hidden sm:flex flex-col">
    <span className="font-heading font-bold text-sm tracking-tight leading-tight text-foreground">
      {state.siteSettings.siteName}
    </span>

    <span className="text-[10px] tracking-[0.2em] uppercase font-medium leading-none text-muted-foreground">
      Real Estate
    </span>
  </div>
</Link>

          {/* ─ Desktop Nav ──────────────────────────── */}
          <nav className="hidden lg:flex items-center flex-1 justify-center py-1 px-1   bg-blue-500/10 rounded-full border border/50">
            {[
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
                label: "Resources",
                href: "/blog",
                links: [
                  { label: "Blog / News", href: "/blog" },
                  { label: "Careers", href: "/careers" },
                  { label: "EMI Calculator", href: "/calculator" },
                  { label: "Sitemap", href: "/sitemap" },
                ],
              },
            ].map((group) => {
              const isGroupActive = pathname === group.href || pathname?.startsWith(group.href + "/");
              return (
                <div key={group.label} className="relative group/nav">
                  <Link
                    href={group.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-300 select-none",
                      isGroupActive
                        ? "bg-primary/[0.08] text-primary shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    {group.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover/nav:rotate-180" />
                  </Link>

                  {/* Dropdown Box */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover/nav:block pt-1.5 w-52 z-50">
                    <div className="bg-background border border-border rounded-md shadow-lg py-1.5 overflow-hidden">
                      {group.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block px-4 py-2 text-[12px] text-popover-foreground hover:bg-primary/10 hover:text-blue-500 transition-all font-medium"
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
                className="flex items-center gap-2 text-xs font-medium transition-all duration-300 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/[0.06]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden xl:inline font-medium">
                  {state.siteSettings.contactPhone}
                </span>
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
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-lg object-cover ring-2 ring-primary/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className="text-left hidden xl:block">
                    <p
                      className="text-xs font-semibold font-heading leading-tight text-foreground"
                    >
                      {user.name}
                    </p>
                    <p
                      className="text-[10px] leading-tight text-muted-foreground"
                    >
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
                      <p className="text-sm font-semibold text-foreground">
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
                  href="/auth/login"
                  className="px-4 h-9 rounded-lg text-sm font-medium font-heading border border-border text-foreground hover:bg-muted transition-all duration-300 inline-flex items-center"
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
                    isActive
                      ? "bg-primary/[0.08] text-primary"
                      : "text-foreground hover:bg-muted"
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
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-foreground"
                  >
                    {user.name}
                  </p>
                  <p
                    className="text-xs text-muted-foreground"
                  >
                    {user.email}
                  </p>
                </div>
              </div>
              <Link
                href={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
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
                className="w-full h-10 rounded-lg border border-border text-foreground hover:bg-muted inline-flex items-center justify-center text-sm font-medium font-heading"
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