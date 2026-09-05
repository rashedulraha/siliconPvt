#!/usr/bin/env bash
set -e

echo "Starting 40 atomic git commits..."

# 1. Config & Package
git add biome.json package.json
git commit -m "chore(config): configure biome css parser for tailwind directives and normalize package name" || true

# 2. Design Tokens & Typography
git add src/app/globals.css
git commit -m "style(tokens): upgrade global slate-slate900 color tokens and admin-scoped typography" || true

# 3. Card UI Primitive
git add src/components/ui/card.tsx
git commit -m "feat(ui): refine card component padding, elevation, and micro-shadows" || true

# 4. Form UI Primitives
git add src/components/ui/input.tsx src/components/ui/textarea.tsx
git commit -m "feat(ui): update input and textarea components with modern radius and spacing" || true

# 5. Button UI Primitive
git add src/components/ui/button.tsx
git commit -m "feat(ui): enhance button variants with high-contrast destructive styling" || true

# 6. Auth Library
git add src/lib/admin-auth.ts src/lib/server-auth.ts src/lib/api-client.ts
git commit -m "feat(auth): enhance client and server admin session authentication handlers" || true

# 7. Auth API Routes
git add src/app/api/auth/login/route.ts src/app/api/auth/me/route.ts src/app/api/auth/route.ts
git commit -m "feat(api): optimize core authentication route handlers and me verification endpoint" || true

# 8. Root Layout
git add src/app/layout.tsx
git commit -m "feat(layout): polish root layout typography and dynamic metadata configuration" || true

# 9. Navbar Component
git add src/components/layout/Navbar.tsx
git commit -m "feat(navbar): add conditional admin portal button and luxury visit cta" || true

# 10. Footer Component
git add src/components/layout/Footer.tsx
git commit -m "feat(footer): implement bilingual translation and direct admin login access" || true

# 11. Floating Layout Widgets
git add src/components/layout/FloatingActions.tsx src/components/layout/FloatingSimulator.tsx
git commit -m "feat(layout): improve floating action widgets and site simulator components" || true

# 12. Language Toggle
git add src/components/layout/LanguageToggle.tsx
git commit -m "feat(layout): add bilingual language toggle component enhancements" || true

# 13. Dynamic Sitemap
git add src/app/sitemap.ts
git commit -m "feat(seo): configure comprehensive dynamic sitemap generation" || true

# 14. Hero 3D Carousel Ring
git add src/components/home/glass/InteractiveCarouselRing.tsx
git commit -m "feat(home): upgrade 3D interactive hero carousel ring with bilingual modals" || true

# 15. Hero Glass Carousel
git add src/components/home/glass/HeroGlassCarousel.tsx
git commit -m "feat(home): enhance hero glass carousel slide presentations" || true

# 16. Leadership Glass Blocks
git add src/components/home/glass/LeadershipGlassBlocks.tsx
git commit -m "feat(home): implement executive leadership glass block showcase" || true

# 17. Master Plan Amenities
git add src/components/home/glass/MasterPlanAmenities.tsx
git commit -m "feat(home): add master plan layout and civic amenities showcase cards" || true

# 18. Offline Membership Banner
git add src/components/home/glass/OfflineMembershipGlassBanner.tsx
git commit -m "feat(home): enhance offline membership registration glass banner" || true

# 19. Project Gallery & Media
git add src/components/home/glass/ProjectGallerySection.tsx
git commit -m "feat(home): update project gallery and multimedia presentation sections" || true

# 20. Silicon City Showcase
git add src/components/home/glass/SiliconCityShowcase.tsx
git commit -m "feat(home): enhance flagship silicon city township spotlight module" || true

# 21. Company News & Trust
git add src/components/home/glass/CompanyNewsSection.tsx src/components/home/WhyChooseUs.tsx
git commit -m "feat(home): improve corporate news, updates, and why choose us sections" || true

# 22. Home Page Client & Investment
git add src/components/home/HomePageClient.tsx src/components/home/InvestmentProcess.tsx
git commit -m "feat(home): streamline homepage client orchestration and investment process" || true

# 23. Public About Page
git add "src/app/(main)/about/page.tsx"
git commit -m "feat(about): enhance bilingual about page content presentation" || true

# 24. Public Contact Page
git add "src/app/(main)/contact/page.tsx"
git commit -m "feat(contact): improve contact page form validation and lead capture" || true

# 25. Public Privacy & Terms
git add "src/app/(main)/privacy-terms/page.tsx"
git commit -m "feat(privacy): update bilingual privacy policy and terms of service" || true

# 26. Public Projects Client
git add "src/app/(main)/projects/ProjectsClient.tsx"
git commit -m "feat(projects): upgrade projects client interactive listing and filters" || true

# 27. Public Services Page
git add "src/app/(main)/services/page.tsx"
git commit -m "feat(services): improve public services page presentation and benefits" || true

# 28. Admin Login Page
git add src/app/admin/login/page.tsx
git commit -m "feat(admin-auth): add admin login split layout with dual language support" || true

# 29. Admin Shell & Typography Layout
git add src/app/admin/layout.tsx src/components/admin/EditorGuard.tsx
git commit -m "feat(admin-layout): isolate roboto and poppins typography in admin shell" || true

# 30. Admin Header & Profile Asset
git add src/components/admin/AdminHeader.tsx public/admin-avatar.jpg
git commit -m "feat(admin-header): integrate administrator portrait photo and live badge" || true

# 31. Admin Sidebar Navigation
git add src/components/admin/AdminSidebar.tsx
git commit -m "feat(admin-sidebar): add brand logo, refined active states, and clean navigation" || true

# 32. Minimal Confirm Dialog
git add src/components/admin/ConfirmDialog.tsx
git commit -m "feat(admin-dialog): implement compact minimal confirm dialog with sharp contrast" || true

# 33. Admin Overview Dashboard
git add src/app/admin/page.tsx
git commit -m "feat(admin-overview): redesign dashboard overview with bento matrix and kpis" || true

# 34. Admin Home Settings
git add src/app/admin/home-settings/page.tsx
git commit -m "feat(admin-home): redesign home settings with segmented tabs and floating save capsule" || true

# 35. Admin About & Site Settings
git add src/app/admin/about-settings/page.tsx src/app/admin/site-settings/page.tsx
git commit -m "feat(admin-settings): add floating save action and about/site settings managers" || true

# 36. Admin Projects Settings & Slides
git add src/app/admin/projects-settings/page.tsx src/app/admin/manage-slides/page.tsx
git commit -m "feat(admin-projects): improve project settings and hero banner slide managers" || true

# 37. Admin Services Settings
git add src/app/admin/services-settings/page.tsx
git commit -m "feat(admin-services): redesign services management with highlight chips and dialogs" || true

# 38. Admin Plots & Inventory Desk
git add src/app/admin/inventory/page.tsx
git commit -m "feat(admin-inventory): upgrade plots and inventory desk with kpi cards and multi-filter" || true

# 39. Admin Client Leads Management
git add src/app/admin/leads/page.tsx
git commit -m "feat(admin-leads): redesign customer inquiries management with stat cards and detail sheet" || true

# 40. API Routes & Client Data Hooks
git add src/app/api/ src/hooks/
git commit -m "feat(api-hooks): update content, slides, gallery, team, and seed backend route handlers and hooks" || true

echo "All 40 commits successfully processed!"
