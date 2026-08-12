"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  CalendarCheck,
  ChevronDown,
  LogOut,
  User,
  Heart,
  LayoutDashboard,
  ArrowUpRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
import { useCMS } from "@/context/CMSContext";
import { useUserAuth } from "@/context/UserAuthContext";
import { SectionContainer } from "../ui/section-container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeMobileGroup, setActiveMobileGroup] = useState<string | null>(
    null,
  );
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { state } = useCMS();
  const { user, isLoggedIn, logout } = useUserAuth();

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Clean Navbar items pointing strictly to the exact 8 Public Pages
  const navItems = [
    { label: "HOME", href: "/" },
    {
      label: "ABOUT",
      href: "/about",
      megaMenu: {
        align: "left-0",
        leftPanel: {
          category: "Company Overview",
          links: [
            {
              label: "About Silicon Real Estate",
              desc: "Our journey & corporate story",
              href: "/about",
            },
            {
              label: "Contact Corporate Office",
              desc: "Mohammadpur office details",
              href: "/contact",
            },
          ],
        },
        rightPanel: {
          category: "Explore Leadership & Mission",
          links: [
            {
              label: "Company Mission & Vision",
              desc: "Sustainable housing commitment",
              href: "/about",
            },
            {
              label: "Chairman's Statement",
              desc: "Message from Md. Ahmed Kabir",
              href: "/about",
            },
            {
              label: "Managing Director's Vision",
              desc: "Message from Engr. Rashedul Islam",
              href: "/about",
            },
          ],
        },
      },
    },
    {
      label: "PROJECTS",
      href: "/projects",
      megaMenu: {
        align: "left-0",
        leftPanel: {
          category: "Flagship Development",
          links: [
            {
              label: "Silicon City",
              desc: "Mohammadpur planned township",
              href: "/projects",
            },
            {
              label: "Book Site Visit",
              desc: "Guided office & project tour",
              href: "/contact",
            },
          ],
        },
        rightPanel: {
          category: "Project Status",
          links: [
            {
              label: "Ongoing Projects",
              desc: "Active plot developments in Dhaka",
              href: "/projects",
            },
            {
              label: "Upcoming Projects",
              desc: "Future planned housing communities",
              href: "/projects",
            },
            {
              label: "Completed Projects",
              desc: "Handover plots & ready communities",
              href: "/projects",
            },
          ],
        },
      },
    },
    {
      label: "SERVICES",
      href: "/services",
      megaMenu: {
        align: "-left-36 sm:-left-48",
        leftPanel: {
          category: "Client Solutions",
          links: [
            {
              label: "All Corporate Services",
              desc: "Full spectrum real estate solutions",
              href: "/services",
            },
            {
              label: "Membership Guidelines",
              desc: "18 Terms & Conditions",
              href: "/membership",
            },
          ],
        },
        rightPanel: {
          category: "Core Services",
          links: [
            {
              label: "Residential Plot Sales",
              desc: "RAJUK compliant plot purchasing",
              href: "/services",
            },
            {
              label: "Land Acquisition & Development",
              desc: "Planned earth-filling & road networks",
              href: "/services",
            },
            {
              label: "Legal Paper Verification & Support",
              desc: "Khatian & title search assistance",
              href: "/services",
            },
          ],
        },
      },
    },
    { label: "GALLERY", href: "/gallery" },
    { label: "MEMBERSHIP", href: "/membership" },
    { label: "CONTACT", href: "/contact" },
  ];

  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
    setActiveMobileGroup(null);
    setActiveDropdown(null);
  }, [pathname]);

  // Lock body scroll when mobile side drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close drawer on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full duration-300 ease-out border-b shadow-xs bg-background/80 backdrop-blur-md border-border/40">
        <SectionContainer>
          <div className="flex h-16 items-center justify-between gap-6">
            {/* ── Logo Section ───────────── */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
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
                "
              >
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

            {/* ── Desktop Nav with Theme-Matched Mega Menu (Using Globals.css Tokens) ──────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1 px-3 py-1 bg-muted/40 backdrop-blur-xs rounded-full border border-border/50 w-fit">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));
                const hasMegaMenu = !!item.megaMenu;
                const isDropdownOpen = activeDropdown === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() =>
                      hasMegaMenu && handleMouseEnter(item.label)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-300 select-none cursor-pointer",
                        isActive || isDropdownOpen
                          ? "bg-background text-primary border border-border/60 shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                      )}
                    >
                      {item.label}
                      {hasMegaMenu && (
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 opacity-60 transition-transform duration-300",
                            isDropdownOpen &&
                              "rotate-180 text-primary opacity-100",
                          )}
                        />
                      )}
                    </Link>

                    {/* Mega-Menu Dropdown Panel (Using Globals.css Color Tokens for 25-70 yrs accessibility) */}
                    {hasMegaMenu && item.megaMenu && (
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={cn(
                              "absolute top-full pt-2 z-50",
                              item.megaMenu.align,
                            )}
                          >
                            <div className="w-105 sm:w-110 bg-popover text-popover-foreground border border-border rounded-2xl shadow-2xl overflow-hidden flex transition-all duration-200">
                              {/* Left Sidebar Panel (Soft Muted Surface) */}
                              <div className="w-44 sm:w-48 bg-muted/40 border-r border-border/60 p-3.5 shrink-0 text-left flex flex-col justify-between">
                                <div>
                                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-primary block mb-2.5">
                                    {item.megaMenu.leftPanel.category}
                                  </span>
                                  <div className="space-y-1.5">
                                    {item.megaMenu.leftPanel.links.map(
                                      (link) => (
                                        <Link
                                          key={link.label}
                                          href={link.href}
                                          onClick={() =>
                                            setActiveDropdown(null)
                                          }
                                          className="group/left flex flex-col text-left p-2 rounded-md hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all duration-200"
                                        >
                                          <span className="text-xs font-semibold text-foreground group-hover/left:text-primary transition-colors font-heading flex items-center justify-between">
                                            {link.label}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/left:opacity-100 transition-opacity text-primary" />
                                          </span>
                                          <span className="text-[10px] text-muted-foreground font-light leading-snug mt-0.5">
                                            {link.desc}
                                          </span>
                                        </Link>
                                      ),
                                    )}
                                  </div>
                                </div>

                                <div className="pt-2.5 border-t border-border/50">
                                  <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-wider block">
                                    SILICON REAL ESTATE
                                  </span>
                                </div>
                              </div>

                              {/* Right Main Panel (Tight Fitted Vertical Stack) */}
                              <div className="flex-1 p-3.5 text-left bg-popover">
                                <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-accent block mb-2.5">
                                  {item.megaMenu.rightPanel.category}
                                </span>
                                <div className="flex flex-col gap-2">
                                  {item.megaMenu.rightPanel.links.map(
                                    (link) => (
                                      <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="group/right flex flex-col text-left p-2.5 rounded-md hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all duration-200"
                                      >
                                        <span className="text-xs font-semibold text-foreground group-hover/right:text-primary transition-colors font-heading flex items-center justify-between">
                                          {link.label}
                                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/right:opacity-100 transition-opacity text-primary" />
                                        </span>
                                        <span className="text-[11px] text-muted-foreground font-light leading-relaxed mt-0.5">
                                          {link.desc}
                                        </span>
                                      </Link>
                                    ),
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ── Desktop Right Actions ────────────────── */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <div className="h-6 w-px bg-border" />

              <ModeToggle />

              {isLoggedIn && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl border border-border bg-muted/50 hover:bg-muted shadow-xs transition-all duration-300 cursor-pointer"
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
                      <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-2 ring-primary/20">
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
                        userMenuOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden shadow-2xl py-1.5 z-50 border border-border/60 bg-popover text-popover-foreground">
                      <div className="px-4 py-3 border-b border-border/60">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-primary/6 hover:text-primary transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" /> My Dashboard
                      </Link>
                      <Link
                        href="/favorites"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-primary/6 hover:text-primary transition-colors"
                      >
                        <Heart className="w-4 h-4" /> Saved Properties
                      </Link>
                      <div className="border-t border-border/60 my-1.5" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/6 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
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

            {/* ── Mobile Hamburger Button ──────────────────────── */}
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
                aria-expanded={isOpen}
                className="w-9 h-9 rounded-lg border border-border text-foreground hover:bg-muted flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                {isOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </SectionContainer>
      </header>

      {/* ── Backdrop Overlay ───────────────────────────── */}
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      {/* ── Mobile Side Drawer ───────────────────────────── */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-xs sm:max-w-sm bg-background/95 backdrop-blur-2xl border-l border-border/60 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col justify-between overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div>
          {/* Drawer Top Header */}
          <div className="p-4 border-b border-border/40 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-primary/15 bg-background/60 flex items-center justify-center shrink-0">
                <Image
                  src="/silicon.png"
                  alt={`${state.siteSettings.siteName} Logo`}
                  width={36}
                  height={36}
                  className="object-cover rounded-full p-0.5 select-none"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-bold text-sm tracking-tight leading-tight text-foreground">
                  Silicon
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase font-medium leading-none text-muted-foreground">
                  Real Estate Pvt. Ltd.
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="w-8 h-8 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links inside Drawer */}
          <div className="p-4 space-y-1">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              Navigation
            </p>
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              const isGroupOpen = activeMobileGroup === item.label;
              const hasMegaMenu = !!item.megaMenu;

              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex-1 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left",
                        isActive
                          ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                          : "text-foreground/90 hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                    {hasMegaMenu && (
                      <button
                        onClick={() =>
                          setActiveMobileGroup(isGroupOpen ? null : item.label)
                        }
                        className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200 opacity-70",
                            isGroupOpen && "rotate-180",
                          )}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenu Accordion */}
                  {hasMegaMenu && item.megaMenu && (
                    <div
                      className={cn(
                        "flex flex-col gap-1 pl-4 overflow-hidden transition-all duration-300",
                        isGroupOpen ? "max-h-80 py-1" : "max-h-0",
                      )}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pt-1">
                        {item.megaMenu.leftPanel.category}
                      </p>
                      {item.megaMenu.leftPanel.links.map((subLink) => (
                        <Link
                          key={subLink.label}
                          href={subLink.href}
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-1.5 rounded-lg transition-colors text-left block hover:bg-muted/50"
                        >
                          <p className="text-xs font-bold text-foreground">
                            {subLink.label}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-light">
                            {subLink.desc}
                          </p>
                        </Link>
                      ))}

                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pt-2">
                        {item.megaMenu.rightPanel.category}
                      </p>
                      {item.megaMenu.rightPanel.links.map((subLink) => (
                        <Link
                          key={subLink.label}
                          href={subLink.href}
                          onClick={() => setIsOpen(false)}
                          className="px-3 py-1.5 rounded-lg transition-colors text-left block hover:bg-muted/50"
                        >
                          <p className="text-xs font-bold text-foreground">
                            {subLink.label}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-light">
                            {subLink.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer / Call To Action Area inside Drawer */}
        <div className="p-4 border-t border-border/40 space-y-3 bg-muted/20">
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full bg-primary text-primary-foreground h-10 rounded-xl text-sm font-medium font-heading inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 shadow-md shadow-primary/25"
          >
            <CalendarCheck className="w-4 h-4" />
            BOOK SITE VISIT
          </Link>

          {isLoggedIn && user ? (
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-background border border-border/40">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className="text-left overflow-hidden">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={
                    user?.role === "admin"
                      ? "/dashboard/admin"
                      : "/dashboard/user"
                  }
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
                  className="flex items-center justify-center gap-2 h-9 rounded-lg border border-destructive/20 text-destructive text-xs font-medium hover:bg-destructive/4 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-2 border-t border-border/40">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full h-9 rounded-xl border border-border text-foreground hover:bg-muted inline-flex items-center justify-center text-xs font-semibold"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
