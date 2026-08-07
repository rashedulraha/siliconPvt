import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  Banknote,
  MapPin,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
  Building2,
  Clock,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

export const metadata: Metadata = {
  title: "Investment Opportunities | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Explore residential and commercial real estate investment opportunities in Dhaka, Bangladesh. RAJUK-approved plots with high ROI and flexible payment plans.",
};

const whyPoints = [
  {
    icon: TrendingUp,
    title: "Consistent Capital Growth",
    desc: "Dhaka's prime locations have delivered 12–18% annual appreciation over the last decade, outpacing most traditional investment vehicles.",
  },
  {
    icon: ShieldCheck,
    title: "100% Legal & RAJUK-Approved",
    desc: "Every plot comes with full documentation, verified title, and RAJUK approval — zero risk of legal complications.",
  },
  {
    icon: Banknote,
    title: "Flexible Payment Plans",
    desc: "Start with as little as 20% down. Spread your remaining investment over 24–60 months with zero interest charges.",
  },
  {
    icon: BarChart3,
    title: "Strong Rental Yields",
    desc: "Residential properties in our corridors yield 6–10% annually, well above comparable emerging market benchmarks.",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    desc: "Our projects span Bashundhara, Purbachal, Uttara, and Mirpur — Dhaka's fastest-growing investment corridors.",
  },
  {
    icon: Clock,
    title: "Early Handover Guarantee",
    desc: "We commit to our timelines and have delivered 25+ projects on time with transparent construction progress reports.",
  },
];

const investmentTypes = [
  {
    tag: "Residential",
    title: "Residential Plots",
    desc: "Secure a piece of Dhaka's most sought-after residential neighbourhoods. Choose your plot size, customise your payment timeline, and watch your asset appreciate.",
    badge: "Most Popular",
    features: [
      "Sizes from 3 to 10 katha",
      "RAJUK-approved layouts",
      "Road & utility access",
      "Gated community options",
    ],
    href: "/properties?category=residential",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
  },
  {
    tag: "Commercial",
    title: "Commercial Plots",
    desc: "Position yourself in high-footfall commercial corridors. Ideal for retail, office buildings, or mixed-use developments with strong capital upside.",
    badge: "High ROI",
    features: [
      "Corner & main-road plots",
      "Commercial zoning approved",
      "Large-format plots available",
      "Investor consortium options",
    ],
    href: "/properties?category=commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
  },
];

const process = [
  {
    step: "01",
    title: "Consultation",
    desc: "Schedule a free consultation with our investment advisors to understand your goals.",
  },
  {
    step: "02",
    title: "Site Visit",
    desc: "Visit the project site with our team and explore the location firsthand.",
  },
  {
    step: "03",
    title: "Booking",
    desc: "Reserve your plot with a token payment and lock in the current price.",
  },
  {
    step: "04",
    title: "Agreement",
    desc: "Sign the sale agreement and begin your flexible installment payment journey.",
  },
  {
    step: "05",
    title: "Deed",
    desc: "Receive your registered deed upon full payment — full legal ownership transferred.",
  },
];

const stats = [
  { value: "12–18%", label: "Annual Appreciation" },
  { value: "6–10%", label: "Rental Yield" },
  { value: "25+", label: "Delivered Projects" },
  { value: "1,500+", label: "Happy Investors" },
];

export default function InvestmentPage() {
  return (
    <>
      {/* ── 1. CLEAN ARCHITECTURAL HERO HEADER (NO GAP UNDER NAVBAR) ── */}
      <section className="relative pt-28 pb-20 sm:pb-24 bg-dark-hero text-white overflow-hidden">
        {/* Subtle Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <SectionContainer className="relative z-10">
          <div className="max-w-3xl space-y-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-white/60">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="text-accent font-semibold">Investment</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
              Invest in <span className="text-accent font-semibold">Dhaka's Growth Corridors</span>
            </h1>

            <p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              Silicon Real Estate connects discerning investors with legally verified, high-yielding land assets delivering consistent capital appreciation and secure long-term value.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group bg-primary text-primary-foreground h-12 px-7 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/20 shadow-lg gap-2">
                BOOK FREE CONSULTATION
                <CalendarCheck className="w-4 h-4" />
              </Link>
              <Link
                href="/properties"
                className="group bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 hover:border-accent h-12 px-7 rounded-xl font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center transition-all gap-2">
                BROWSE LIVE INVENTORY
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ── Stats Bar ─────────────────────────────────── */}
      <section className="py-10 bg-accent/5 border-y border-accent/10">
        <SectionContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-heading font-bold text-3xl text-accent">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── Why Invest ─────────────────────────────────── */}
      <section className="section-y bg-background" id="why">
        <SectionContainer>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Why Invest in <span className="text-gold">Land</span>?
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Land remains Bangladesh's most reliable wealth-building asset —
              and Silicon Real Estate makes accessing it simple, legal, and
              transparent.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyPoints.map((p, i) => (
              <div
                key={i}
                className="group glass-card rounded-2xl p-7 border border-border card-lift">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <p.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2 text-lg">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── Investment Types ────────────────────────────── */}
      <section className="section-y bg-secondary/30" id="benefits">
        <SectionContainer>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="text-label text-primary/70">Our Portfolio</span>
            </div>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Choose Your <span className="text-gold">Investment Type</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {investmentTypes.map((t, i) => (
              <div
                key={i}
                className="glass-card rounded-3xl overflow-hidden border border-border shadow-soft-md card-lift">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                      {t.tag}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {t.badge}
                    </span>
                  </div>
                </div>
                <div className="p-7 space-y-5">
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                      {t.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {t.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-sm text-foreground">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={t.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
                    View Available Plots{" "}
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── ROI Section ────────────────────────────────── */}
      <section className="section-y bg-background" id="roi">
        <SectionContainer>
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
            <div className="space-y-7">
              <div className="flex items-center gap-3">
                <span className="text-label text-accent">ROI & Growth</span>
              </div>
              <h2 className="font-heading font-bold text-display-md text-foreground leading-[1.12]">
                Your Money Working <span className="text-gold">Harder</span>
              </h2>
              <div className="divider-gold" />
              <div className="space-y-4 text-muted-foreground leading-[1.8] font-light text-base">
                <p>
                  Bangladesh&apos;s macroeconomic fundamentals — a growing GDP,
                  rising FDI, and government initiatives such as the Special
                  Economic Zone programme — create a structural tailwind for
                  real estate values. Prime Dhaka locations have consistently
                  appreciated 12–18% per year over the last decade.
                </p>
                <p>
                  Our residential properties deliver rental yields of 6–10%
                  annually — among the highest in the region. Commercial assets
                  in mixed-use developments offer rental premiums and capital
                  appreciation that outpace inflation.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Min. Down Payment", value: "20%" },
                  { label: "Installment Period", value: "Up to 5 yrs" },
                  { label: "Avg. Capital Growth", value: "15% / yr" },
                  { label: "Avg. Rental Yield", value: "8% / yr" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl border border-border bg-card shadow-soft">
                    <div className="font-heading font-bold text-2xl text-accent">
                      {item.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-soft-lg">
              <Image
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200"
                alt="Investment growth model scale"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-hero/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-xl p-5">
                <p className="text-white/60 text-xs font-heading mb-1">
                  Average 5-Year Return
                </p>
                <p className="text-white font-heading font-bold text-3xl">
                  87%
                </p>
                <p className="text-accent text-xs mt-1">
                  Based on completed project data
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ── Investment Process ──────────────────────────── */}
      <section
        className="section-y bg-dark-hero relative overflow-hidden"
        id="payment">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />
        <SectionContainer className="relative">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-accent" />
              </div>
              <span className="text-label text-accent">Simple Process</span>
            </div>
            <h2 className="font-heading font-bold text-display-md text-white">
              How to <span className="text-gold">Invest</span>
            </h2>
            <p className="text-white/60 font-light text-lg">
              Five simple steps from enquiry to full ownership.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {process.map((p, i) => (
              <div key={i} className="relative text-center">
                {i < process.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-[60%] w-full h-px bg-white/10"
                    aria-hidden="true"
                  />
                )}
                <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-accent text-lg">
                    {p.step}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed font-light">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="section-y bg-background">
        <SectionContainer>
          <div className="max-w-3xl mx-auto text-center space-y-7">
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Ready to Start <span className="text-gold">Investing</span>?
            </h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Our investment advisory team is available Sat–Thu, 9AM–7PM.
              Schedule a free, no-obligation consultation and let us match you
              with the right asset for your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold">
                <CalendarCheck className="w-4 h-4" />
                Book Free Consultation
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 px-6 h-11 rounded-xl border border-border text-foreground hover:bg-muted text-sm font-heading font-medium transition-all">
                EMI Calculator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
