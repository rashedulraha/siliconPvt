import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp, ShieldCheck, Banknote, MapPin, BarChart3,
  CheckCircle, ArrowRight, Star, Building2, Clock,
  CalendarCheck, ChevronRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";

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
    features: ["Sizes from 3 to 10 katha", "RAJUK-approved layouts", "Road & utility access", "Gated community options"],
    href: "/properties?category=residential",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  },
  {
    tag: "Commercial",
    title: "Commercial Plots",
    desc: "Position yourself in high-footfall commercial corridors. Ideal for retail, office buildings, or mixed-use developments with strong capital upside.",
    badge: "High ROI",
    features: ["Corner & main-road plots", "Commercial zoning approved", "Large-format plots available", "Investor consortium options"],
    href: "/properties?category=commercial",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
  },
];

const process = [
  { step: "01", title: "Consultation", desc: "Schedule a free consultation with our investment advisors to understand your goals." },
  { step: "02", title: "Site Visit",   desc: "Visit the project site with our team and explore the location firsthand." },
  { step: "03", title: "Booking",      desc: "Reserve your plot with a token payment and lock in the current price." },
  { step: "04", title: "Agreement",    desc: "Sign the sale agreement and begin your flexible installment payment journey." },
  { step: "05", title: "Deed",         desc: "Receive your registered deed upon full payment — full legal ownership transferred." },
];

const stats = [
  { value: "12–18%", label: "Annual Appreciation" },
  { value: "6–10%",  label: "Rental Yield" },
  { value: "25+",    label: "Delivered Projects" },
  { value: "1,500+", label: "Happy Investors" },
];

export default function InvestmentPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-primary/10 blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="divider-gold" />
              <span className="text-label text-accent">Real Estate Investment</span>
            </div>
            <h1 className="font-heading font-bold text-display-lg text-white leading-[1.08] mb-5">
              Invest in <span className="text-gold">Dhaka&apos;s</span> Fastest-<br className="hidden sm:block" />Growing Corridors
            </h1>
            <p className="text-white/65 text-lg font-light leading-relaxed max-w-2xl mb-8">
              Silicon Real Estate connects discerning investors with RAJUK-approved, legally
              verified land assets delivering consistent capital appreciation and strong rental yields.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-gold">
                <CalendarCheck className="w-4 h-4" />
                Book Free Consultation
              </Link>
              <Link href="/properties" className="inline-flex items-center gap-2 px-6 h-11 rounded-xl border border-white/20 text-white hover:bg-white/10 text-sm font-heading font-medium transition-all">
                Browse Plots <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats Bar ─────────────────────────────────── */}
      <section className="py-10 bg-accent/5 border-y border-accent/10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-heading font-bold text-3xl text-accent">{s.value}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-[0.1em] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Why Invest ─────────────────────────────────── */}
      <section className="section-y bg-background" id="why">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/12 flex items-center justify-center">
                <Star className="h-4 w-4 text-accent" />
              </div>
              <span className="text-label text-accent">Why Choose Us</span>
            </div>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Why Invest in <span className="text-gold">Land</span>?
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Land remains Bangladesh's most reliable wealth-building asset — and Silicon Real Estate
              makes accessing it simple, legal, and transparent.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyPoints.map((p, i) => (
              <div key={i} className="group glass-card rounded-2xl p-7 border border-border card-lift">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <p.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2 text-lg">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Investment Types ────────────────────────────── */}
      <section className="section-y bg-secondary/30" id="benefits">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <span className="text-label text-primary/70">Our Portfolio</span>
            </div>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Choose Your <span className="text-gold">Investment Type</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {investmentTypes.map((t, i) => (
              <div key={i} className="glass-card rounded-3xl overflow-hidden border border-border shadow-soft-md card-lift">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={t.image} alt={t.title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">{t.tag}</span>
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">{t.badge}</span>
                  </div>
                </div>
                <div className="p-7 space-y-5">
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-foreground mb-2">{t.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
                  </div>
                  <ul className="space-y-2">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={t.href} className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
                    View Available Plots <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── ROI Section ────────────────────────────────── */}
      <section className="section-y bg-background" id="roi">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
            <div className="space-y-7">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/12 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-accent" />
                </div>
                <span className="text-label text-accent">ROI & Growth</span>
              </div>
              <h2 className="font-heading font-bold text-display-md text-foreground leading-[1.12]">
                Your Money Working <span className="text-gold">Harder</span>
              </h2>
              <div className="divider-gold" />
              <div className="space-y-4 text-muted-foreground leading-[1.8] font-light text-base">
                <p>
                  Bangladesh&apos;s macroeconomic fundamentals — a growing GDP, rising FDI, and
                  government initiatives such as the Special Economic Zone programme — create a
                  structural tailwind for real estate values. Prime Dhaka locations have consistently
                  appreciated 12–18% per year over the last decade.
                </p>
                <p>
                  Our residential properties deliver rental yields of 6–10% annually — among the
                  highest in the region. Commercial assets in mixed-use developments offer rental
                  premiums and capital appreciation that outpace inflation.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Min. Down Payment", value: "20%" },
                  { label: "Installment Period", value: "Up to 5 yrs" },
                  { label: "Avg. Capital Growth", value: "15% / yr" },
                  { label: "Avg. Rental Yield",   value: "8% / yr" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl border border-border bg-card shadow-soft">
                    <div className="font-heading font-bold text-2xl text-accent">{item.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-soft-lg">
              <Image
                src="https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200"
                alt="Investment growth chart"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-hero/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-xl p-5">
                <p className="text-white/60 text-xs font-heading mb-1">Average 5-Year Return</p>
                <p className="text-white font-heading font-bold text-3xl">87%</p>
                <p className="text-accent text-xs mt-1">Based on completed project data</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Investment Process ──────────────────────────── */}
      <section className="section-y bg-dark-hero relative overflow-hidden" id="payment">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />
        <Container className="relative">
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
            <p className="text-white/60 font-light text-lg">Five simple steps from enquiry to full ownership.</p>
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {process.map((p, i) => (
              <div key={i} className="relative text-center">
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-px bg-white/10" aria-hidden="true" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-accent text-lg">{p.step}</span>
                </div>
                <h3 className="font-heading font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="section-y bg-background">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-7">
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Ready to Start <span className="text-gold">Investing</span>?
            </h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Our investment advisory team is available Sat–Thu, 9AM–7PM. Schedule a free,
              no-obligation consultation and let us match you with the right asset for your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold">
                <CalendarCheck className="w-4 h-4" />
                Book Free Consultation
              </Link>
              <Link href="/calculator" className="inline-flex items-center gap-2 px-6 h-11 rounded-xl border border-border text-foreground hover:bg-muted text-sm font-heading font-medium transition-all">
                EMI Calculator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
