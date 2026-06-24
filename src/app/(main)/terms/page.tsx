import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Terms of Service | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Read the Terms of Service governing your use of the Silicon Real Estate (Pvt.) Ltd. website and services.",
};

export default function TermsPage() {
  return (
    <>
      {/* ── Page Hero ───────────────────────────────────── */}
      <section className="relative pt-28 pb-20 bg-dark-hero overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-accent/4 blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <Container className="relative">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="divider-gold" />
              <span className="text-label text-accent">Legal</span>
            </div>
            <h1 className="font-medium text-white text-display-lg leading-[1.08] mb-4">
              Terms of Service
            </h1>
            <p className="text-white/65 text-sm font-light">
              Last updated: January 2025
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="max-w-3xl mx-auto">

          <div className="prose prose-slate dark:prose-invert max-w-none
            prose-headings:font-heading prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

            <p>
              By accessing or using the Silicon Real Estate (Pvt.) Ltd. website
              and services, you agree to be bound by these Terms of Service.
              Please read them carefully before proceeding.
            </p>

            <h2>1. Use of Website</h2>
            <p>
              This website is provided for informational purposes only. All
              property listings, prices, and availability are subject to change
              without notice. Silicon Real Estate (Pvt.) Ltd. makes no warranties,
              express or implied, regarding the completeness, accuracy, or
              reliability of information presented on this website.
            </p>

            <h2>2. Property Listings</h2>
            <p>
              Property details, images, floor plans, and pricing are provided in
              good faith but may not reflect real-time market conditions or
              current availability. Users are strongly advised to independently
              verify all information before making any financial commitment.
              Silicon Real Estate (Pvt.) Ltd. acts as an intermediary and is not
              responsible for disputes arising between buyers, sellers, landlords,
              or tenants.
            </p>

            <h2>3. User Conduct</h2>
            <p>
              You agree to use this website only for lawful purposes and in a
              manner that does not infringe the rights of others or restrict their
              use and enjoyment of the site. You must not submit false or
              misleading information, attempt to gain unauthorised access to any
              part of our platform, or use automated tools to scrape or harvest
              content from this website.
            </p>

            <h2>4. Intellectual Property</h2>
            <p>
              All content on this website — including but not limited to text,
              images, logos, icons, graphics, and design layouts — is the
              intellectual property of Silicon Real Estate (Pvt.) Ltd. and is
              protected under applicable copyright and trademark law. No content
              may be reproduced, distributed, or used without prior written
              consent from Silicon Real Estate (Pvt.) Ltd.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Silicon Real Estate
              (Pvt.) Ltd. shall not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of this
              website or reliance on information published herein. This includes,
              without limitation, loss of income, loss of profits, or loss of
              data.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance
              with the laws of the People&apos;s Republic of Bangladesh. Any
              disputes arising under or in connection with these terms shall be
              subject to the exclusive jurisdiction of the competent courts of
              Dhaka, Bangladesh.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at{" "}
              <a href="mailto:info@siliconrealestate.com.bd">
                info@siliconrealestate.com.bd
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}
