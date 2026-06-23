import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Learn how Silicon Real Estate (Pvt.) Ltd. collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <p className="text-sm font-medium text-secondary mb-2">LEGAL</p>
          <h1 className="font-display text-4xl font-bold mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-10">
            Last updated: January 2025
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Silicon Real Estate (Pvt.) Ltd. (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            or &ldquo;our&rdquo;) collects personal information that you
            voluntarily provide when you use our website, submit an inquiry,
            register for an account, or contact our sales team. This includes
            your full name, phone number, email address, postal address, and
            details about the properties you are interested in. We may also
            automatically collect technical data such as your IP address,
            browser type, pages visited, and session duration through our
            analytics tools when you browse our website.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We use the information we collect to respond to your inquiries,
            schedule property viewings, provide you with property listings and
            updates that match your preferences, and process booking deposits or
            reservations. We may also use your contact details to send
            newsletters, promotional offers, or market updates — but only with
            your explicit consent. Your information is never sold or rented to
            third parties. We may share limited data with trusted service
            providers (e.g. payment processors, email platforms) strictly to
            fulfil the services you have requested, under binding confidentiality
            agreements.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            3. Cookies and Tracking Technologies
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our website uses cookies and similar tracking technologies to enhance
            your browsing experience, remember your preferences, and analyse
            traffic patterns. Essential cookies are required for the website to
            function correctly and cannot be disabled. Analytics cookies (such as
            those provided by Google Analytics) help us understand how visitors
            interact with our site so we can improve content and usability. You
            may disable non-essential cookies through your browser settings or
            via our Cookie Preferences panel. Please note that disabling certain
            cookies may affect the functionality of some features. For more
            detail, please read our full{" "}
            <a href="/cookie-policy" className="text-secondary underline">
              Cookie Policy
            </a>
            .
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            4. Data Retention and Security
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We retain your personal information for as long as necessary to
            fulfil the purposes for which it was collected, or as required by
            applicable law in Bangladesh. We implement industry-standard security
            measures — including SSL encryption, access controls, and regular
            security audits — to protect your data from unauthorised access,
            alteration, or disclosure. While we take every reasonable precaution,
            no digital transmission or storage system is entirely secure, and we
            cannot guarantee absolute security.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            5. Your Rights
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You have the right to access, correct, or request deletion of the
            personal information we hold about you. You may also withdraw consent
            for marketing communications at any time by clicking the unsubscribe
            link in any email we send, or by contacting us directly. To exercise
            any of these rights, please reach out to our Data Privacy Officer at{" "}
            <a
              href="mailto:info@siliconrealestate.com.bd"
              className="text-secondary underline">
              info@siliconrealestate.com.bd
            </a>
            . We will respond to all legitimate requests within 30 working days.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            6. Contact Us
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions, concerns, or complaints regarding this
            Privacy Policy or how we handle your personal data, please contact us
            at:
          </p>
          <address className="not-italic mt-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">
              Silicon Real Estate (Pvt.) Ltd.
            </strong>
            <br />
            House 12, Road 5, Block D, Bashundhara R/A
            <br />
            Dhaka 1229, Bangladesh
            <br />
            Email:{" "}
            <a
              href="mailto:info@siliconrealestate.com.bd"
              className="text-secondary underline">
              info@siliconrealestate.com.bd
            </a>
          </address>
        </div>
      </Container>
    </section>
  );
}
