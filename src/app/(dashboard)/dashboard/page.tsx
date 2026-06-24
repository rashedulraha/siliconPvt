"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, X, Bell, MessageCircle, ChevronDown,
  MapPin, Star, Heart, GitCompare, LogOut,
  Home, Map, SlidersHorizontal, Filter,
  Bed, Bath, Square, Car, User,
} from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import { useRouter } from "next/navigation";

/* ── Mock data ─────────────────────────────────────────────────────── */
const mockProperties = [
  {
    id: "1",
    title: "Dream House Reality",
    address: "Evergreen 14, Jakarta, Indonesia",
    price: 367,
    rating: 4.9,
    type: "Home",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    beds: 4, baths: 2, sqft: 2400,
  },
  {
    id: "2",
    title: "Atap Langit Homes",
    address: "Eedwest City, Jakarta, Indonesia",
    price: 278,
    rating: 4.7,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    beds: 3, baths: 2, sqft: 1800,
  },
  {
    id: "3",
    title: "Midnight Ridge Villa",
    address: "440 Thamrin, Jakarta, Indonesia",
    price: 452,
    rating: 4.8,
    type: "Villa",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    beds: 6, baths: 3, sqft: 3200,
  },
  {
    id: "4",
    title: "Unity Urban Homes",
    address: "Forest City, Jakarta, Indonesia",
    price: 278,
    rating: 4.7,
    type: "Home",
    image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80",
    beds: 3, baths: 2, sqft: 2100,
  },
  {
    id: "5",
    title: "Dream House",
    address: "Evergreen 15, Jakarta, Indonesia",
    price: 367,
    rating: 4.9,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    beds: 4, baths: 2, sqft: 2250,
  },
  {
    id: "6",
    title: "Lalaland Thick Villa",
    address: "Forest Land, Jakarta, Indonesia",
    price: 278,
    rating: 4.7,
    type: "Villa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    beds: 5, baths: 3, sqft: 2900,
  },
];

const activeDetail = mockProperties[2]; // Midnight Ridge Villa

const priceRanges = [
  { label: "Under $1,000",       value: "under-1000" },
  { label: "$1,000 - $15,000",   value: "1k-15k" },
  { label: "More Than $15,000",  value: "over-15k" },
];

const typeOptions = [
  { label: "Single Family Home", value: "house", checked: true },
  { label: "Condo/Townhouse",    value: "condo", checked: false },
  { label: "Apartment",          value: "apartment", checked: true },
  { label: "Bungalow",           value: "bungalow", checked: false },
];

const amenities = ["Garden", "Gym", "Garage"];

/* ── Sub-components ────────────────────────────────────────────────── */
function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    Home:      "bg-blue-500",
    Apartment: "bg-purple-500",
    Villa:     "bg-amber-500",
  };
  return (
    <span className={`${colors[type] ?? "bg-gray-500"} text-white text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full`}>
      {type}
    </span>
  );
}

function PropertyCard({
  property,
  isSelected,
  onClick,
}: {
  property: typeof mockProperties[0];
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-250 ${
        isSelected
          ? "ring-2 ring-primary shadow-blue"
          : "glass-card hover:shadow-soft-md"
      }`}
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute top-2.5 left-2.5">
          <TypeBadge type={property.type} />
        </div>
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all"
          aria-label="Save"
        >
          <Heart className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-heading font-semibold text-sm text-foreground leading-tight truncate">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 mt-0.5 mb-2">
          <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
          <span className="text-[11px] text-muted-foreground truncate">{property.address}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading font-bold text-base text-foreground">
            ${property.price.toFixed(2)}<span className="text-xs font-normal text-muted-foreground">/month</span>
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium text-muted-foreground">{property.rating}/5</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ────────────────────────────────────────────────── */
export default function DashboardPage() {
  const { user, logout } = useUserAuth();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(activeDetail.id);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "about">("overview");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [customMin, setCustomMin] = useState("10K");
  const [customMax, setCustomMax] = useState("50K");

  const selected = mockProperties.find((p) => p.id === selectedId) ?? activeDetail;

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">

      {/* ── Dashboard Top Bar ──────────────────── */}
      <header className="glass-nav h-14 flex-shrink-0 flex items-center px-4 gap-4 z-40">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-primary/12 border border-primary/20 flex items-center justify-center">
            <span className="font-heading font-bold text-primary text-sm">S</span>
          </div>
          <span className="font-heading font-semibold text-sm text-foreground hidden sm:block">Silicon RE</span>
        </Link>

        {/* Nav tabs */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {["Buy", "Rent", "Favorites", "Help", "Services", "Blog"].map((tab) => (
            <button
              key={tab}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                tab === "Buy"
                  ? "bg-primary text-white shadow-blue"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-sm mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Anything..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-8 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary/40 focus:bg-white transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2 ml-auto">
          <button className="w-8 h-8 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground transition-all" aria-label="Messages">
            <MessageCircle className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground transition-all" aria-label="Notifications">
            <Bell className="w-4 h-4" />
          </button>

          {/* User avatar */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-primary/12 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-heading font-semibold text-foreground leading-none">{user.name}</p>
                <p className="text-[10px] text-muted-foreground leading-none mt-0.5">{user.email}</p>
              </div>
              <button onClick={handleLogout} className="ml-1 text-muted-foreground hover:text-destructive transition-colors" aria-label="Sign out">
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary text-xs px-3 h-8">Sign In</Link>
          )}
        </div>
      </header>

      {/* ── 3-Column Layout ────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: Filters ────────────────────── */}
        <aside className="w-56 flex-shrink-0 bg-white border-r border-border overflow-y-auto scrollbar-hide p-4 space-y-5 hidden lg:block">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-semibold text-sm text-foreground flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              Custom Filter
            </h2>
            <button className="text-xs text-primary hover:text-primary/70 font-medium transition-colors">Clear all</button>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-semibold text-foreground">Location</span>
              <X className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground" />
            </div>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search location"
                className="w-full h-8 pl-7 pr-3 rounded-lg bg-muted border border-border text-xs focus:outline-none focus:border-primary/40 transition-all"
              />
            </div>
            {["Jakarta, Indonesia", "Semarang, Indonesia"].map((loc) => (
              <label key={loc} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={loc.includes("Jakarta")}
                  className="w-3.5 h-3.5 rounded accent-primary"
                />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{loc}</span>
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-semibold text-foreground">Price Range</span>
              <X className="w-3 h-3 text-muted-foreground cursor-pointer" />
            </div>
            {priceRanges.map((r) => (
              <label key={r.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  value={r.value}
                  checked={selectedPriceRange === r.value}
                  onChange={() => setSelectedPriceRange(r.value)}
                  className="accent-primary"
                />
                <span className="text-xs text-muted-foreground">{r.label}</span>
              </label>
            ))}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                value="custom"
                checked={selectedPriceRange === "custom"}
                onChange={() => setSelectedPriceRange("custom")}
                className="accent-primary"
              />
              <span className="text-xs text-muted-foreground">Custom</span>
            </label>
            {selectedPriceRange === "custom" && (
              <div className="space-y-2 pl-1">
                <input
                  type="range"
                  min={0}
                  max={100}
                  className="w-full accent-primary h-1.5"
                />
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>$10K</span>
                  <span>$50K</span>
                </div>
              </div>
            )}
          </div>

          {/* Land Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-semibold text-foreground">Land Area</span>
              <X className="w-3 h-3 text-muted-foreground cursor-pointer" />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Min"
                className="flex-1 h-8 px-2 rounded-lg bg-muted border border-border text-xs focus:outline-none focus:border-primary/40 transition-all"
              />
              <span className="text-[10px] text-muted-foreground">sq ft</span>
              <input
                type="text"
                placeholder="Max"
                className="flex-1 h-8 px-2 rounded-lg bg-muted border border-border text-xs focus:outline-none focus:border-primary/40 transition-all"
              />
              <span className="text-[10px] text-muted-foreground">sq ft</span>
            </div>
          </div>

          {/* Type of Place */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-semibold text-foreground">Type Of Place</span>
              <X className="w-3 h-3 text-muted-foreground cursor-pointer" />
            </div>
            {typeOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={opt.checked}
                  className="w-3.5 h-3.5 rounded accent-primary"
                />
                <span className="text-xs text-muted-foreground">{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-heading font-semibold text-foreground">Amenities</span>
              <X className="w-3 h-3 text-muted-foreground cursor-pointer" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {amenities.map((a) => (
                <button
                  key={a}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    a === "Garden"
                      ? "bg-primary text-white shadow-blue"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── CENTER: Property Grid ─────────────── */}
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4">
          {/* Mobile filter row */}
          <div className="flex items-center gap-2 mb-4 lg:hidden">
            <button className="flex items-center gap-1.5 px-3 h-8 rounded-xl bg-white border border-border text-xs font-medium text-foreground hover:bg-muted transition-all">
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {["All", "House", "Apartment", "Villa"].map((t) => (
                <button
                  key={t}
                  className={`px-3 h-8 rounded-xl text-xs font-medium flex-shrink-0 transition-all ${
                    t === "All" ? "bg-primary text-white" : "bg-white border border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSelected={property.id === selectedId}
                onClick={() => setSelectedId(property.id)}
              />
            ))}
          </div>
        </main>

        {/* ── RIGHT: Detail Panel ───────────────── */}
        <aside className="w-80 flex-shrink-0 bg-white border-l border-border overflow-y-auto scrollbar-hide hidden xl:flex flex-col">
          {/* Photo grid */}
          <div className="relative h-44 grid grid-cols-2 gap-1 p-1 flex-shrink-0">
            <div className="relative rounded-xl overflow-hidden col-span-1 row-span-2">
              <Image
                src={selected.image}
                alt={selected.title}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden h-[calc(50%-2px)]">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"
                alt="Interior"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden h-[calc(50%-2px)]">
              <Image
                src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=80"
                alt="Interior 2"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="p-4 flex-1 overflow-y-auto scrollbar-hide">
            {/* Title + price */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <h2 className="font-heading font-bold text-base text-foreground leading-tight">{selected.title}</h2>
              <div className="text-right flex-shrink-0">
                <span className="font-heading font-bold text-lg text-foreground">${selected.price.toFixed(2)}</span>
                <span className="text-[10px] text-muted-foreground">/month</span>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-4">
              <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{selected.address}</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-border mb-4">
              {(["overview", "reviews", "about"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-2 text-xs font-heading font-medium capitalize transition-all border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-heading font-semibold text-foreground mb-1.5">Description:</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Welcome to {selected.title} 🏡 Experience a peaceful escape at this modern retreat set on a quiet hillside with stunning views of valleys and starry nights.
                  </p>
                </div>

                {/* Specs grid */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Home,   label: `${selected.beds + 2} Rooms` },
                    { icon: Bed,    label: `${selected.beds} Beds` },
                    { icon: Bath,   label: `${selected.baths} Baths` },
                    { icon: Home,   label: "2 Kitchen" },
                    { icon: Square, label: `${selected.sqft.toLocaleString()} sqft` },
                    { icon: Car,    label: "1 Garage" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 bg-muted rounded-xl px-2.5 py-2">
                      <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button className="h-10 rounded-xl border border-border text-xs font-heading font-semibold text-foreground hover:bg-muted transition-all">
                    Contact Agent
                  </button>
                  <button className="h-10 rounded-xl bg-primary text-primary-foreground text-xs font-heading font-semibold hover:bg-primary/85 transition-all shadow-blue">
                    Order Now
                  </button>
                </div>

                {/* Map placeholder */}
                <div className="h-36 rounded-2xl bg-secondary flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-50" />
                  <div className="relative text-center">
                    <Map className="w-8 h-8 text-primary/40 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Interactive Map</p>
                    <p className="text-[10px] text-muted-foreground">{selected.address}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-3">
                {[4.8, 4.9, 4.7].map((rating, i) => (
                  <div key={i} className="p-3 rounded-xl bg-muted">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">Reviewer {i + 1}</p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className={`w-2.5 h-2.5 ${s < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-border"}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground">Great property, highly recommend!</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                <p>This property is managed by Silicon Real Estate, offering premium locations with verified legal documentation.</p>
                <p>All properties come with full title deeds, boundary verification, and installment payment options.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
