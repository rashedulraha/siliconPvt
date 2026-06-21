import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "@/styles/a11y.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

import { CookieConsent } from "@/components/layout/CookieConsent";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { ToastProvider } from "@/components/feedback/ToastProvider";
import { defaultMetadata } from "@/lib/metadata";
import { SkipToContent } from "@/components/feedback/SkipToContent";
import { CMSProvider } from "@/context/CMSContext";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <CMSProvider>
            <SkipToContent />
            <AnalyticsProvider />
            <ToastProvider />
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main
                id="main-content"
                tabIndex={-1}
                className="flex-1 outline-none">
                {children}
              </main>
              <Footer />
            </div>
            <FloatingActions />
            <ScrollToTop />
            <CookieConsent />
          </CMSProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
