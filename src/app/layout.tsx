import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import "@/styles/a11y.css";

import { CookieConsent } from "@/components/layout/CookieConsent";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { ToastProvider } from "@/components/feedback/ToastProvider";
import { defaultMetadata } from "@/lib/metadata";
import { CMSProvider } from "@/context/CMSContext";
import { UserAuthProvider } from "@/context/UserAuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

const hindSiliguri = Hind_Siliguri({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["bengali", "latin"],
	variable: "--font-hind-siliguri",
	display: "swap",
});

const poppins = Poppins({
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	subsets: ["latin"],
	variable: "--font-poppins",
	display: "swap",
});

const roboto = Roboto({
	weight: ["300", "400", "500", "700", "900"],
	subsets: ["latin"],
	variable: "--font-roboto",
	display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
	themeColor: "hsl(221, 83%, 24%)",
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
		<html lang="bn" data-lang="bn" className="light" suppressHydrationWarning>
			<body
				className={`${hindSiliguri.variable} ${poppins.variable} ${roboto.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
			>
				<LanguageProvider>
					<CMSProvider>
						<UserAuthProvider>
							<AnalyticsProvider />
							<ToastProvider />
							{children}
							<CookieConsent />
						</UserAuthProvider>
					</CMSProvider>
				</LanguageProvider>
			</body>
		</html>
	);
}
