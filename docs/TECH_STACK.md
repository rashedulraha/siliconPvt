# Technology Stack Specification

## Project: Silicon Real Estate (Silicon City)
- **Version:** 0.0.1
- **Architecture Model:** Full-Stack Next.js 16 App Router (Decoupled Monorepo Structure)

---

## 1. Core Framework & Runtime

| Layer | Technology | Version | Rationale & Usage |
|---|---|---|---|
| **Core Framework** | **Next.js** | `16.2.9` | App Router architecture with Server Components, streaming SSR, optimized route handlers, and proxy middleware. |
| **UI Library** | **React** | `19.2.0` | React 19 concurrent features, enhanced Server Actions, and modern lifecycle hooks. |
| **Language** | **TypeScript** | `5.9.3` | End-to-end type safety across database schemas, API routes, and client props. |
| **Node.js Environment** | **Node.js** | `v20+` / `v22+` | Modern ECMAScript modules (`"type": "module"`), native fetch, and async hooks. |

---

## 2. Database & Data Persistence

| Component | Technology | Version | Description |
|---|---|---|---|
| **Database Engine** | **Neon PostgreSQL** | Serverless v16+ | Cloud serverless Postgres with instant branching, connection pooling, and low-latency SSL queries. |
| **ORM** | **Prisma ORM** | `7.10.0` | Next-generation schema modeling, type generation (`@prisma/client`), and migrations. |
| **Database Adapter** | **@prisma/adapter-pg** | `7.10.0` | High-efficiency connection pooling driver connecting Prisma directly to `pg.Pool`. |
| **Postgres Driver** | **pg (node-postgres)** | `8.23.0` | Native pooling driver configured in `src/lib/prisma.ts` with pool limits and idle timeouts. |
| **Prisma Configuration** | **prisma.config.ts** | Native | Centralized configuration defining the datasource URL and fallback connection strings. |

---

## 3. Styling, Design System & Theming

| Category | Package | Version | Usage |
|---|---|---|---|
| **CSS Engine** | **Tailwind CSS** | `4.3.1` | Next-gen CSS-first Tailwind configuration via `@tailwindcss/postcss`. |
| **PostCSS Processor**| `@tailwindcss/postcss` | `4.3.1` | Modern PostCSS build pipeline for style compilation. |
| **Utility Merging** | `tailwind-merge` | `2.6.1` | Safely merges competing Tailwind utility classes without specificity bugs. |
| **Class Composition**| `clsx` & `class-variance-authority` | `2.1.1` / `0.7.1` | Composable, type-safe variant classes for design components. |
| **Dark Mode / Theming**| `next-themes` | `0.4.6` | Theme provider managing light, dark, and system preference transitions. |
| **Animation CSS** | `tw-animate-css` | `1.4.0` | Keyframe utility classes for micro-interactions and transitions. |

---

## 4. UI Components & Interaction Primitives

| Component Set | Library / Package | Version | Description |
|---|---|---|---|
| **Headless UI Primitives** | **Radix UI** | Multiple | Accessible, unstyled primitives: Avatar, Dropdown, Progress, Scroll Area, Slider, Slot, Switch, Tabs, Tooltip. |
| **Base UI** | `@base-ui/react` | `1.6.0` | Modern foundational components for dialogs and popovers. |
| **Command Palette** | `cmdk` | `1.1.1` | Accessible command bar used in admin search and quick actions. |
| **Drawer Primitive** | `vaul` | `1.1.2` | Fluid bottom sheet / mobile drawer for responsive dialogs. |
| **Split Panels** | `react-resizable-panels` | `4.11.2` | Resizable split layout views in admin slide studios. |
| **Date Selection** | `react-day-picker` & `date-fns` | `9.14.0` / `4.4.0` | Calendar picker and date formatting utilities. |
| **OTP Input** | `input-otp` | `1.4.2` | One-time passcode fields for future SMS/email verification. |
| **Toast Notifications**| `sonner` | `2.0.7` | Opinionated, accessible toast manager for CRUD and form feedback. |
| **Icon Set** | `lucide-react` | `0.562.0` | Crisp SVG icon library with consistent 24px stroke widths. |

---

## 5. Animation, Motion & 3D Visuals

| Technology | Version | Purpose |
|---|---|---|
| **Framer Motion** | `12.40.0` | Powers the **3D Cylindrical Hero Carousel** (`InteractiveCarouselRing.tsx`), scroll-driven reveal animations, and bento card hovers. |
| **Embla Carousel** | `8.6.0` | Carousel engine with autoplay support (`embla-carousel-autoplay`) for mobile responsive sliders. |
| **Recharts** | `3.8.0` | Declarative SVG charting engine for admin metrics and analytics visualization. |

---

## 6. Authentication & Security

| Tool | Version | Implementation Details |
|---|---|---|
| **Password Hashing** | `bcryptjs` (`3.0.3`) | Salted password hashing (10 rounds) for administrative authentication. |
| **Session Security** | `jsonwebtoken` (`9.0.3`) | Signed JWT tokens stored in HTTP-only cookies (`silicon_jwt`). |
| **Route Protection** | `src/proxy.ts` | Next.js middleware inspecting JWT cookies on all `/admin/*` routes. |
| **Admin Seeder** | `src/lib/server-auth.ts` | Automatically provisions initial admin credentials on server boot if no admin exists. |

---

## 7. Cloud Media & External Integrations

| Service | Mechanism | Details |
|---|---|---|
| **ImgBB Cloud CDN** | REST API Proxy (`/api/upload`) | Server-side multipart upload streaming images to ImgBB and returning permanent CDN links. |
| **Google Maps** | Dynamic `iframe` Embed | Embedded responsive Google Maps iframe pointing to Iqbal Road Corporate HQ and Savar site. |
| **WhatsApp Business** | Direct Click-to-Chat URI | Instant chat trigger formatted with international prefix `+880` and pre-filled inquiry text. |
| **Google Analytics** | Optional Tag Manager (`gtag.js`) | Client-side tracking initialized through configurable `NEXT_PUBLIC_GA_ID`. |

---

## 8. Quality Assurance, Linting & Tooling

| Tool | Version | Command | Role |
|---|---|---|---|
| **Biome** | `2.5.7` | `npm run format:check` / `npm run format:fix` | High-speed code formatter and linter replacing Prettier. |
| **Vitest** | `4.1.9` | `npm run test` / `npm run test:ui` | Fast unit testing engine with dedicated browser UI mode. |
| **Testing Library** | `16.3.2` | `@testing-library/react` | Component rendering and DOM assertions for UI components. |
| **ESLint** | `9.39.1` | `npm run lint` | Static analysis for Next.js and React hooks best practices. |
| **Prisma CLI** | `7.10.0` | `npx prisma db push` | Database schema migrations, introspection, and client generation. |
