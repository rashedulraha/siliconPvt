import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Learn how Silicon Real Estate (Pvt.) Ltd. collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
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
            <h1 className="font-serif font-bold text-white text-display-lg leading-[1.08] mb-4">
              Privacy Policy
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

            <h2>1. Information We Collect</h2>
            <p>
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

            <h2>2. How We Use Your Information</h2>
            <p>
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

            <h2>3. Cookies and Tracking Technologies</h2>
            <p>
              Our website uses cookies and similar tracking technologies to enhance
              your browsing experience, remember your preferences, and analyse
              traffic patterns. Essential cookies are required for the website to
              function correctly and cannot be disabled. Analytics cookies help us
              understand how visitors interact with our site so we can improve
              content and usability. You may disable non-essential cookies through
              your browser settings or via our Cookie Preferences panel. For more
              detail, please read our full{" "}
              <a href="/cookie-policy">Cookie Policy</a>.
            </p>

            <h2>4. Data Retention and Security</h2>
            <p>
              We retain your personal information for as long as necessary to
              fulfil the purposes for which it was collected, or as required by
              applicable law in Bangladesh. We implement industry-standard security
              measures — including SSL encryption, access controls, and regular
              security audits — to protect your data from unauthorised access,
              alteration, or disclosure.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, correct, or request deletion of the
              personal information we hold about you. You may also withdraw consent
              for marketing communications at any time by clicking the unsubscribe
              link in any email we send, or by contacting us directly. To exercise
              any of these rights, please reach out to our Data Privacy Officer at{" "}
              <a href="mailto:info@siliconrealestate.com.bd">
                info@siliconrealestate.com.bd
              </a>
              . We will respond to all legitimate requests within 30 working days.
            </p>

            <h2>6. Contact Us</h2>
            <p>If you have any questions, concerns, or complaints regarding this Privacy Policy, please contact us at:</p>
            <address className="not-italic">
              <strong>Silicon Real Estate (Pvt.) Ltd.</strong><br />
              House 12, Road 5, Block D, Bashundhara R/A<br />
              Dhaka 1229, Bangladesh<br />
              Email:{" "}
              <a href="mailto:info@siliconrealestate.com.bd">
                info@siliconrealestate.com.bd
              </a>
            </address>
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}
