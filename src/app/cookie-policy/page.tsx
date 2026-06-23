import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Cookie Policy | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Learn how Silicon Real Estate (Pvt.) Ltd. uses cookies and tracking technologies on its website.",
};

export default function CookiePolicyPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <p className="text-sm font-medium text-secondary mb-2">LEGAL</p>
          <h1 className="font-display text-4xl font-bold mb-2">
            Cookie Policy
          </h1>
          <p className="text-muted-foreground mb-10">
            Last updated: January 2025
          </p>

          <p className="text-muted-foreground leading-relaxed">
            This Cookie Policy explains how Silicon Real Estate (Pvt.) Ltd.
            uses cookies and similar tracking technologies on our website. By
            continuing to browse, you consent to our use of cookies as described
            below.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            1. What Are Cookies?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Cookies are small text files placed on your device when you visit a
            website. They allow the site to remember your preferences, keep you
            logged in between sessions, and collect anonymised analytical data
            to help us improve the user experience.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            2. Types of Cookies We Use
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Essential cookies</strong> are
            required for the website to function correctly — for example,
            maintaining your browsing session, remembering your language
            preference, and enabling secure areas of the site. These cannot be
            disabled.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            <strong className="text-foreground">Analytics cookies</strong> help
            us understand how visitors interact with our website so we can
            improve content, navigation, and performance. We use tools such as
            Google Analytics for this purpose. These cookies are only set with
            your consent and collect data in an anonymised or pseudonymised
            form.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            <strong className="text-foreground">Preference cookies</strong>{" "}
            store your settings such as theme (light/dark mode) or region to
            personalise your experience across visits. These are only set if you
            make a choice that requires remembering.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            3. Third-Party Cookies
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Some content embedded on our pages — such as maps, video players,
            or social media widgets — may set their own cookies. These are
            governed by the respective third party&apos;s privacy and cookie
            policies, over which Silicon Real Estate (Pvt.) Ltd. has no
            control.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            4. Managing Cookies
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You can control and manage cookies through your browser settings.
            Most modern browsers allow you to block, restrict, or delete
            cookies. Please note that disabling essential cookies may affect the
            functionality and security of the website. For guidance on managing
            cookies in your specific browser, please refer to its help
            documentation.
          </p>

          <h2 className="font-display text-2xl font-semibold mt-10 mb-4">
            5. Contact Us
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about how we use cookies, please contact
            us at{" "}
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
