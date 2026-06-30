import { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Briefcase,
  Scale,
  TrendingUp,
  Megaphone,
  MapPin,
  FileCheck,
  Users,
  CheckCircle,
  ArrowRight,
  CalendarCheck,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

export const metadata: Metadata = {
  title: "Our Services | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Silicon Real Estate delivers a full spectrum of property services — land buying, plot sales, investment advisory, legal documentation, and marketing in Dhaka.",
};

const services = [
  {
    id: "land-buying",
    icon: Home,
    tag: "Land Buying",
    title: "Land Buying Assistance",
    shortDesc:
      "End-to-end guidance for purchasing RAJUK-approved plots across Dhaka's prime locations.",
    fullDesc:
      "Our experienced property consultants guide you through every stage of the land purchase journey — from shortlisting ideal plots based on your budget and goals, to site visits, negotiation, and final registration. We handle the complexity so you can invest with confidence.",
    features: [
      "Location scouting & shortlisting",
      "Price negotiation support",
      "Title verification & due diligence",
      "Registration & deed processing",
    ],
    color: "bg-primary/8 border-primary/15",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "plot-sales",
    icon: MapPin,
    tag: "Plot Sales",
    title: "Residential & Commercial Plot Sales",
    shortDesc:
      "Curated selection of residential and commercial plots with verified titles in high-growth corridors.",
    fullDesc:
      "We maintain a carefully curated inventory of residential and commercial plots across Bashundhara, Purbachal, Uttara, and Mirpur. All listings carry RAJUK approval, clear title, and road access — giving you peace of mind from day one.",
    features: [
      "RAJUK-approved inventory",
      "Residential plots from 3 katha",
      "Commercial corner plots",
      "Transparent pricing, no hidden fees",
    ],
    color: "bg-accent/8 border-accent/15",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    id: "consultation",
    icon: Users,
    tag: "Property Consultation",
    title: "Property Consultation",
    shortDesc:
      "Personalised investment guidance tailored to your financial goals and risk profile.",
    fullDesc:
      "Whether you're a first-time buyer or an experienced investor expanding your portfolio, our advisors provide data-driven, personalised recommendations. We analyse market trends, compare locations, and structure your investment to maximise returns.",
    features: [
      "One-on-one investment advisory",
      "Market trend analysis",
      "Portfolio diversification planning",
      "Free initial consultation",
    ],
    color: "bg-teal/8 border-teal/15",
    iconBg: "bg-teal/10",
    iconColor: "text-teal",
  },
  {
    id: "legal",
    icon: Scale,
    tag: "Legal Documentation",
    title: "Legal Documentation Support",
    shortDesc:
      "Complete legal verification, documentation preparation, and registration support.",
    fullDesc:
      "Our in-house legal team and trusted partner law firms handle all aspects of property documentation — from title search and mutation to deed preparation and sub-registration. We ensure every transaction is legally watertight.",
    features: [
      "Title search & verification",
      "Deed preparation & review",
      "Mutation & sub-registration",
      "Government approvals liaison",
    ],
    color: "bg-destructive/5 border-destructive/10",
    iconBg: "bg-destructive/8",
    iconColor: "text-destructive",
  },
  {
    id: "investment",
    icon: TrendingUp,
    tag: "Investment Consultancy",
    title: "Investment Consultancy",
    shortDesc:
      "Strategic investment planning to help you build long-term wealth through real estate.",
    fullDesc:
      "Our investment consultancy service goes beyond simple property sales. We help you craft a multi-year investment strategy, identify high-yield opportunities before they reach the open market, and structure payment plans that align with your cash flow.",
    features: [
      "Long-term investment strategy",
      "Pre-launch project access",
      "Payment plan structuring",
      "ROI modelling & projections",
    ],
    color: "bg-primary/8 border-primary/15",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "marketing",
    icon: Megaphone,
    tag: "Real Estate Marketing",
    title: "Real Estate Marketing",
    shortDesc:
      "Professional marketing services to help you sell or lease your property at the best price.",
    fullDesc:
      "If you own property you'd like to sell or lease, our marketing team creates professional listings, reaches qualified buyers through our network of 1,500+ investors, and manages the entire sales process on your behalf — from enquiry to closing.",
    features: [
      "Professional photography & videography",
      "Targeted digital marketing",
      "Access to investor network",
      "Negotiation & closing support",
    ],
    color: "bg-accent/8 border-accent/15",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
];

const whyUs = [
  {
    icon: ShieldCheck,
    text: "RAJUK-approved projects with verified legal documentation",
  },
  { icon: FileCheck, text: "100% transparent pricing — no hidden charges" },
  {
    icon: Briefcase,
    text: "10+ years of industry expertise in Dhaka real estate",
  },
  { icon: Users, text: "Dedicated relationship manager for every client" },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-accent/5 blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <SectionContainer className="relative">
          <div className="max-w- bg-">
            <div className="flex items-center gap-3 mb-5">
              <div className="divider-gold" />
              <span className="text-label text-accent">What We Offer</span>
            </div>
            <h1 className="font-heading font-bold text-display-lg text-white leading-[1.08] mb-5">
              A Complete Suite of <br className="hidden sm:block" />
              <span className="text-gold">Property Services</span>
            </h1>
            <p className="text-white/65 text-lg font-light leading-relaxed max-w-2xl">
              From your first consultation to final deed registration, Silicon
              Real Estate supports every step of your property journey with
              expertise and integrity.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* ── Why Us Strip ──────────────────────────────── */}
      <section className="py-8 bg-accent/5 border-b border-accent/10">
        <SectionContainer>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyUs.map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <w.icon className="h-4 w-4 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground font-light leading-snug">
                  {w.text}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── Services Grid ──────────────────────────────── */}
      <section className="section-y bg-background">
        <SectionContainer>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <span className="text-label text-accent">Our Services</span>
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Everything You Need,{" "}
              <span className="text-gold">In One Place</span>
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Six core service lines — each backed by experienced professionals
              and a commitment to full transparency.
            </p>
          </div>

          <div className="space-y-6">
            {services.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                className={`group rounded-3xl border p-8 ${s.color} transition-all duration-300 hover:shadow-soft-md`}>
                <div
                  className={`grid md:grid-cols-[1fr_auto] gap-8 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="space-y-5">
                    {/* Tag + Icon */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                        <s.icon className={`h-5 w-5 ${s.iconColor}`} />
                      </div>
                      <span className={`text-label ${s.iconColor} text-xs`}>
                        {s.tag}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="font-heading font-bold text-2xl text-foreground">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {s.fullDesc}
                    </p>
                    {/* Features */}
                    <ul className="grid sm:grid-cols-2 gap-y-2 gap-x-6">
                      {s.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2.5 text-sm text-foreground">
                          <CheckCircle
                            className={`h-4 w-4 ${s.iconColor} flex-shrink-0`}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {/* CTA */}
                    <Link
                      href="/contact"
                      className={`group/link inline-flex items-center gap-2 text-sm font-semibold ${s.iconColor} hover:opacity-75 transition-opacity`}>
                      Enquire About This Service{" "}
                      <ChevronRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  {/* Stat bubble */}
                  <div className="hidden md:flex items-center">
                    <div
                      className={`w-32 h-32 rounded-3xl ${s.iconBg} border ${s.color.split(" ")[1]} flex flex-col items-center justify-center text-center p-4`}>
                      <s.icon className={`h-8 w-8 ${s.iconColor} mb-2`} />
                      <span
                        className={`text-xs font-heading font-semibold ${s.iconColor} leading-snug`}>
                        {s.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="section-y bg-secondary/30">
        <SectionContainer>
          <div className="max-w-3xl mx-auto text-center space-y-7">
            <h2 className="font-heading font-bold text-display-md text-foreground">
              Not Sure Where to <span className="text-gold">Start</span>?
            </h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Our advisors offer a free, no-obligation consultation to
              understand your goals and recommend the right service for you.
              Sat–Thu, 9AM–7PM.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-gold">
                <CalendarCheck className="w-4 h-4" />
                Book Free Consultation
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 px-6 h-11 rounded-xl border border-border text-foreground hover:bg-muted text-sm font-heading font-medium transition-all">
                Browse Properties <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
