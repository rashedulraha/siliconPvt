import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Cookie Policy | Silicon Real Estate (Pvt.) Ltd.",
  description:
    "Learn how Silicon Real Estate (Pvt.) Ltd. uses cookies and tracking technologies on its website.",
};

export default function CookiePolicyPage() {
  return (
    <section className="pt-28 pb-16 md:pb-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 pb-8 border-b border-border">
            <p className="text-label text-accent mb-3">Legal</p>
            <h1 className="font-heading font-bold text-4xl text-foreground mb-3">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground text-sm">Last updated: January 2025</p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none
            prose-headings:font-heading prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

            <p>
              This Cookie Policy explains how Silicon Real Estate (Pvt.) Ltd.
              uses cookies and similar tracking technologies on our website. By
              continuing to browse, you consent to our use of cookies as described
              below.
            </p>

            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit a
              website. They allow the site to remember your preferences, keep you
              logged in between sessions, and collect anonymised analytical data
              to help us improve the user experience.
            </p>

            <h2>2. Types of Cookies We Use</h2>
            <p>
              <strong>Essential cookies</strong> are required for the website to
              function correctly — for example, maintaining your browsing session,
              remembering your language preference, and enabling secure areas of
              the site. These cannot be disabled.
            </p>
            <p>
              <strong>Analytics cookies</strong> help us understand how visitors
              interact with our website so we can improve content, navigation, and
              performance. We use tools such as Google Analytics for this purpose.
              These cookies are only set with your consent and collect data in an
              anonymised or pseudonymised form.
            </p>
            <p>
              <strong>Preference cookies</strong> store your settings such as
              theme (light/dark mode) to personalise your experience across visits.
            </p>

            <h2>3. Third-Party Cookies</h2>
            <p>
              Some content embedded on our pages — such as maps, video players,
              or social media widgets — may set their own cookies. These are
              governed by the respective third party&apos;s privacy and cookie
              policies, over which Silicon Real Estate (Pvt.) Ltd. has no control.
            </p>

            <h2>4. Managing Cookies</h2>
            <p>
              You can control and manage cookies through your browser settings.
              Most modern browsers allow you to block, restrict, or delete cookies.
              Please note that disabling essential cookies may affect the
              functionality and security of the website.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about how we use cookies, please contact
              us at{" "}
              <a href="mailto:info@siliconrealestate.com.bd">
                info@siliconrealestate.com.bd
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
