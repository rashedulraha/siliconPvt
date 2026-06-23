import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Refund Policy | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Understand the refund terms for booking deposits and service fees at Silicon Real Estate (Pvt.) Ltd.",
};

export default function RefundPolicyPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <p className="text-sm font-medium text-secondary mb-2">LEGAL</p>
          <h1 className="font-display text-4xl font-bold mb-2">
            Refund Policy
          </h1>
          <p className="text-muted-foreground mb-10">
            Last updated: January 2025
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Silicon Real Estate (Pvt.) Ltd. aims to ensure complete client
            satisfaction. This policy outlines the terms under which booking
            deposits and service fees may be refunded.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            1. Booking Deposits
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A booking deposit secures a property against other buyers or tenants
            for a defined holding period. Deposits are refundable in full if the
            buyer or tenant formally withdraws within 72 hours of payment. After
            this cooling-off window, deposits are non-refundable unless the
            seller or landlord withdraws the property from the market, or a
            material discrepancy is identified and verified in the listing
            details provided at the time of booking.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            2. Service Fees
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Consultancy, advisory, and facilitation service fees are
            non-refundable once the engagement has formally commenced. In cases
            of documented service failure on our part, refund requests may be
            submitted in writing to{" "}
            <a
              href="mailto:info@siliconrealestate.com.bd"
              className="text-secondary underline">
              info@siliconrealestate.com.bd
            </a>{" "}
            and will be reviewed within 14 business days of receipt.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            3. Processing Timeline
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Approved refunds are processed within 7–14 business days and
            returned via the original payment method. Silicon Real Estate
            (Pvt.) Ltd. reserves the right to amend this Refund Policy at any
            time. Any changes will take effect immediately upon publication on
            this page.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            4. How to Request a Refund
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            To initiate a refund request, please email{" "}
            <a
              href="mailto:info@siliconrealestate.com.bd"
              className="text-secondary underline">
              info@siliconrealestate.com.bd
            </a>{" "}
            with your full name, transaction reference, property details, and a
            brief explanation of the reason for your request. Our team will
            acknowledge your submission within 2 business days.
          </p>
        </div>
      </Container>
    </section>
  );
}
