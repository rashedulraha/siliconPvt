/**
 * (dashboard) layout — authenticated user area.
 *
 * No Navbar or Footer. Only a minimal top bar + the page content.
 * Mirrors the EstateEase-style property search UI.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
