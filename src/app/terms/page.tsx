import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Terms of Service | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Read the Terms of Service governing your use of the Silicon Real Estate (Pvt.) Ltd. website and services.",
};

export default function TermsPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <p className="text-sm font-medium text-secondary mb-2">LEGAL</p>
          <h1 className="font-display text-4xl font-bold mb-2">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-10">
            Last updated: January 2025
          </p>

          <p className="text-muted-foreground leading-relaxed">
            By accessing or using the Silicon Real Estate (Pvt.) Ltd. website
            and services, you agree to be bound by these Terms of Service.
            Please read them carefully before proceeding.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            1. Use of Website
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            This website is provided for informational purposes only. All
            property listings, prices, and availability are subject to change
            without notice. Silicon Real Estate (Pvt.) Ltd. makes no warranties,
            express or implied, regarding the completeness, accuracy, or
            reliability of information presented on this website.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            2. Property Listings
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Property details, images, floor plans, and pricing are provided in
            good faith but may not reflect real-time market conditions or
            current availability. Users are strongly advised to independently
            verify all information before making any financial commitment.
            Silicon Real Estate (Pvt.) Ltd. acts as an intermediary and is not
            responsible for disputes arising between buyers, sellers, landlords,
            or tenants.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            3. User Conduct
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You agree to use this website only for lawful purposes and in a
            manner that does not infringe the rights of others or restrict their
            use and enjoyment of the site. You must not submit false or
            misleading information, attempt to gain unauthorised access to any
            part of our platform, or use automated tools to scrape or harvest
            content from this website.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            4. Intellectual Property
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            All content on this website — including but not limited to text,
            images, logos, icons, graphics, and design layouts — is the
            intellectual property of Silicon Real Estate (Pvt.) Ltd. and is
            protected under applicable copyright and trademark law. No content
            may be reproduced, distributed, or used without prior written
            consent from Silicon Real Estate (Pvt.) Ltd.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            To the fullest extent permitted by law, Silicon Real Estate
            (Pvt.) Ltd. shall not be liable for any indirect, incidental,
            special, or consequential damages arising from your use of this
            website or reliance on information published herein. This includes,
            without limitation, loss of income, loss of profits, or loss of
            data.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            6. Governing Law
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms of Service are governed by and construed in accordance
            with the laws of the People&apos;s Republic of Bangladesh. Any
            disputes arising under or in connection with these terms shall be
            subject to the exclusive jurisdiction of the competent courts of
            Dhaka, Bangladesh.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            7. Contact Us
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms of Service, please
            contact us at{" "}
            <a
              href="mailto:info@siliconrealestate.com.bd"
              className="text-secondary underline">
              info@siliconrealestate.com.bd
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
