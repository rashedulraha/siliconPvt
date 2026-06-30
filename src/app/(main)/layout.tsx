import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SkipToContent } from "@/components/feedback/SkipToContent";
// import { FloatingSimulator } from "@/components/layout/FloatingSimulator";

/**
 * (main) layout — public website chrome.
 *
 * All public-facing routes live inside this route group so they share
 * Navbar + Footer without affecting admin or dashboard routes.
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SkipToContent />
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </div>
      <FloatingActions />
      {/* <FloatingSimulator /> */}
      <ScrollToTop />
    </>
  );
}
