import type { Metadata } from "next";
import { SectionContainer } from "@/components/layout/SectionContainer";

export const metadata: Metadata = {
  title: "Refund Policy | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Understand the refund terms for booking deposits and service fees at Silicon Real Estate (Pvt.) Ltd.",
};

export default function RefundPolicyPage() {
  return (
    <>
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-accent/4 blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <SectionContainer className="relative">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="divider-gold" />
              <span className="text-label text-accent">Legal</span>
            </div>
            <h1 className="font-medium text-white text-display-lg leading-[1.08] mb-4">
              Refund Policy
            </h1>
            <p className="text-white/65 text-sm font-light">
              Last updated: January 2025
            </p>
          </div>
        </SectionContainer>
      </section>

      <section className="pb-16 md:pb-24">
        <SectionContainer>
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-slate dark:prose-invert max-w-none
            prose-headings:font-heading prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <p>
                Silicon Real Estate (Pvt.) Ltd. aims to ensure complete client
                satisfaction. This policy outlines the terms under which booking
                deposits and service fees may be refunded.
              </p>

              <h2>1. Booking Deposits</h2>
              <p>
                A booking deposit secures a property against other buyers or
                tenants for a defined holding period. Deposits are refundable in
                full if the buyer or tenant formally withdraws within 72 hours
                of payment. After this cooling-off window, deposits are
                non-refundable unless the seller or landlord withdraws the
                property from the market, or a material discrepancy is
                identified in the listing details.
              </p>

              <h2>2. Service Fees</h2>
              <p>
                Consultancy, advisory, and facilitation service fees are
                non-refundable once the engagement has formally commenced. In
                cases of documented service failure on our part, refund requests
                may be submitted in writing to{" "}
                <a href="mailto:info@siliconrealestate.com.bd">
                  info@siliconrealestate.com.bd
                </a>{" "}
                and will be reviewed within 14 business days of receipt.
              </p>

              <h2>3. Processing Timeline</h2>
              <p>
                Approved refunds are processed within 7–14 business days and
                returned via the original payment method. Silicon Real Estate
                (Pvt.) Ltd. reserves the right to amend this Refund Policy at
                any time. Any changes will take effect immediately upon
                publication.
              </p>

              <h2>4. How to Request a Refund</h2>
              <p>
                To initiate a refund request, please email{" "}
                <a href="mailto:info@siliconrealestate.com.bd">
                  info@siliconrealestate.com.bd
                </a>{" "}
                with your full name, transaction reference, property details,
                and a brief explanation of the reason for your request. Our team
                will acknowledge your submission within 2 business days.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
