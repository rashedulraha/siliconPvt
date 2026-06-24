import type { Metadata, Viewport } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import "@/styles/a11y.css";

import { CookieConsent } from "@/components/layout/CookieConsent";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { ToastProvider } from "@/components/feedback/ToastProvider";
import { defaultMetadata } from "@/lib/metadata";
import { CMSProvider } from "@/context/CMSContext";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { UserAuthProvider } from "@/context/UserAuthContext";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(221, 83%, 24%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(222, 47%, 6%)" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Root layout — HTML shell + global providers only.
 *
 * Navigation chrome (Navbar / Footer / FloatingActions) lives in the
 * per-group layouts, not here, so admin and dashboard pages never
 * inherit public-site chrome.
 *
 * Route groups:
 *  (main)             → public website  → layout adds Navbar + Footer
 *  admin/             → admin panel     → layout adds sidebar (already exists)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${roboto.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <CMSProvider>
            <UserAuthProvider>
              <AnalyticsProvider />
              <ToastProvider />
              {children}
              <CookieConsent />
            </UserAuthProvider>
          </CMSProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
