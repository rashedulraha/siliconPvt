import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, Scale } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

export const metadata: Metadata = {
  title: "Privacy Policy | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Learn how Silicon Real Estate (Pvt.) Ltd. collects, uses, and protects your personal information in compliance with Bangladesh laws.",
};

const SECTIONS = [
  {
    id: "sec-1",
    num: "01",
    title: "1. Information We Collect",
    content:
      "Silicon Real Estate (Pvt.) Ltd. collects personal information voluntarily provided when you submit an inquiry, register for an account, or request a site visit. This includes your full name, phone number, National ID (NID) details, email address, and property preferences. We also collect technical data such as IP addresses and browser headers for security auditing.",
  },
  {
    id: "sec-2",
    num: "02",
    title: "2. How We Use Your Information",
    content:
      "We use collected data to respond to plot inquiries, schedule physical site visits to Silicon City, prepare legal allotment contracts, and issue payment money receipts. Your information is never sold or rented to third-party brokers.",
  },
  {
    id: "sec-3",
    num: "03",
    title: "3. Cookies & Tracking Technologies",
    content:
      "Our platform uses essential session cookies to enable secure client login and saved plot favorites. Analytics cookies help us optimize page load performance and website usability across mobile and desktop devices.",
  },
  {
    id: "sec-4",
    num: "04",
    title: "4. Data Security & Storage in Bangladesh",
    content:
      "We implement industry-standard 256-bit SSL encryption, database access controls, and regular audit procedures to safeguard client records. Physical documentation is stored securely at our Mohammadpur Corporate Office.",
  },
  {
    id: "sec-5",
    num: "05",
    title: "5. Client Rights & Data Corrections",
    content:
      "You have the right to request access, correction, or deletion of your registered contact details at any time by contacting our Client Desk with valid identity verification.",
  },
  {
    id: "sec-6",
    num: "06",
    title: "6. Governing Jurisdiction",
    content:
      "This Privacy Policy is governed by the applicable laws of the People's Republic of Bangladesh. Any privacy inquiries or dispute notifications will be handled under the jurisdiction of Dhaka, Bangladesh.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-24 overflow-x-hidden">
      
      {/* ── 1. ARCHITECTURAL HERO HEADER (NO TOP GAP UNDER NAVBAR) ── */}
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
              <span className="text-accent font-semibold">Legal</span>
              <span>&gt;</span>
              <span className="text-accent font-semibold">Privacy Policy</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-heading text-white tracking-tight leading-tight">
              Privacy <span className="text-accent font-semibold">Policy & Protection</span>
            </h1>

            <p className="text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              How Silicon Real Estate (Pvt.) Ltd. protects your personal data, land inquiry records, and legal documentation under Bangladesh laws.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-white/70">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                Last Updated: August 2026
              </span>
              <span className="px-3 py-1 rounded-full bg-accent/15 border border-accent/20 text-accent font-medium font-heading">
                Compliance: Bangladesh Laws
              </span>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ── 2. LEGAL DOCUMENT CONTENT VIEWPORT ── */}
      <section className="py-16 sm:py-20 bg-background">
        <SectionContainer>
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Official Paper Document Container */}
            <div className="bg-card border border-border/70 rounded-3xl p-8 sm:p-12 shadow-md space-y-8 relative overflow-hidden">
              
              {/* Document Header Stamp */}
              <div className="border-b border-border/60 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-medium text-primary uppercase tracking-wider block">
                    PRIVACY COMPLIANCE DOC: SRE-PRV-2026-BD
                  </span>
                  <h2 className="text-xl font-semibold font-heading text-foreground">
                    Silicon Real Estate (Pvt.) Ltd. — Data Protection Charter
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium font-heading text-primary inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    SSL 256-Bit Secured
                  </span>
                </div>
              </div>

              {/* Policy Sections List */}
              <div className="space-y-8 divide-y divide-border/40">
                {SECTIONS.map((sec) => (
                  <div key={sec.id} className="pt-8 first:pt-0 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-semibold flex items-center justify-center shrink-0">
                        {sec.num}
                      </span>
                      <h3 className="text-base sm:text-lg font-semibold font-heading text-foreground">
                        {sec.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed pl-10">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Official Footer Document Note */}
              <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-muted-foreground font-heading">
                <span>Corporate Office: 2/3 (2nd Floor), Block-A, Iqbal Road, Mohammadpur, Dhaka-1207</span>
                <span className="text-primary font-medium">Silicon Real Estate (Pvt.) Ltd.</span>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="bg-dark-hero rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/15">
              <div className="space-y-1 text-left">
                <span className="text-xs font-mono font-medium text-accent uppercase tracking-wider block">
                  DATA PRIVACY ASSISTANCE
                </span>
                <h3 className="text-lg font-semibold font-heading text-white">
                  Questions About Your Data Privacy?
                </h3>
                <p className="text-xs text-white/70 font-light">
                  Contact our Privacy Desk for data updates, account removal, or document copy requests.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground h-11 px-6 rounded-xl font-medium font-heading text-xs inline-flex items-center justify-center hover:bg-primary/90 transition-all border border-white/10 shadow-xs gap-2">
                  <Mail className="w-4 h-4" />
                  CONTACT PRIVACY DESK
                </Link>
              </div>
            </div>

          </div>
        </SectionContainer>
      </section>
    </div>
  );
}
