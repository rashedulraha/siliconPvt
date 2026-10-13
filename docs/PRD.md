# Product Requirement Document (PRD)

## Project: Silicon Real Estate Platform (Silicon City)
- **Organization:** Silicon Real Estate (Pvt.) Ltd.
- **Product Name:** Silicon City Digital Platform & Enterprise CMS
- **Version:** 1.0.0
- **Document Status:** Complete & Active

---

## 1. Executive Summary

Silicon Real Estate (Pvt.) Ltd. is developing **Silicon City**, an eco-friendly mega township spanning over **150+ acres** in Bara Badeshi Mouza, Savar, Dhaka, situated along the Turag River and directly connected to Mohammadpur Beribadh (15 minutes from Mohammadpur Town Hall).

This digital platform serves a dual purpose:
1. **Public Experience & Lead Engine:** An interactive web portal built to showcase land plots, infrastructure milestones, legal accreditations, executive leadership messages, and offline membership guidance.
2. **Enterprise Content Management System (Admin CMS):** A secure administrative control room allowing non-technical marketing and operations personnel to manage hero slides, page content, plot inventory, gallery items, leadership statements, and inbound leads.

---

## 2. Problem Statement & Market Opportunity

### The Challenges in Bangladesh Land Development
1. **Trust & Verification Deficit:** Real estate buyers in Dhaka face uncertainty regarding land elevation, flood protection, RAJUK approvals, mutation status, and legal documentation (CS, SA, RS, BS Khatiyan).
2. **Static & Outdated Real Estate Portals:** Traditional developer websites present static PDFs and clunky galleries that do not provide dynamic visual proof of development progress.
3. **Disjointed Content & Inventory Management:** Developers struggle to maintain up-to-date plot availability, live pricing, and announcements across digital channels.
4. **Language Barriers:** Existing platforms rarely provide bilingual parity (Bangla and English), leaving non-resident Bangladeshis (NRBs) and local buyers with fragmented experiences.

### The Silicon City Solution
- **Dynamic Digital Showcase:** 3D cylindrical carousel, progress landmark cards, and interactive bento grids showing 16–18ft sand elevation, 30/40ft wide roads, and flood embankment security.
- **Bilingual First:** Seamless zero-reload English ⇄ Bangla instant toggle across all components, headlines, and descriptions.
- **Transparent Offline Acquisition Flow:** Clear 4-step plot acquisition guide and a direct downloadable printable PDF application form for office submission.
- **Headless CMS Suite:** Real-time updates without code deployments or technical dependencies.

---

## 3. Target Audience & User Personas

### Persona 1: Local Residential Plot Buyer (Mohammadpur / Mirpur / Dhanmondi)
- **Profile:** Middle-to-senior corporate professionals, retirees, or families seeking a secure home site near central Dhaka.
- **Needs:** Proximity to central Dhaka (15 mins from Mohammadpur), flood safety, ready mutation, clear titling.
- **Behavior:** Prefers reading in Bangla, downloads the membership form, and schedules weekend guided vehicle visits.

### Persona 2: Non-Resident Bangladeshi (NRB) Investor
- **Profile:** Expatriates living in North America, Europe, or the Gulf looking for safe land appreciation.
- **Needs:** RAJUK master plan compliance, developer credibility, executive leadership transparency, WhatsApp direct contact.
- **Behavior:** Navigates in English, reviews video/image galleries of site development, and submits lead inquiries online.

### Persona 3: Internal Content & Sales Administrator
- **Profile:** Silicon Real Estate operations manager and sales officers.
- **Needs:** Instant capability to update slide graphics, feature new plots, change hotline numbers, and monitor incoming lead inquiries.
- **Behavior:** Accesses `/admin`, uploads photos via ImgBB CDN proxy, and updates bilingual fields in real-time.

---

## 4. Key Product Pillars & Modules

### Pillar A: Public Experience (Client Tier)
1. **3D Interactive Cylindrical Carousel:**
   - 3D perspective rotating cylinder hero banner with interactive drag gestures, mousewheel/touch orbit, and status badges.
2. **Township Master Plan & Lifestyle Amenities:**
   - Visual breakdown of avenues (30ft & 40ft), ecological zoning, Central Mosque, grand sports field, riverfront parks, and school facilities.
3. **Live Database Plot & Inventory Showcase:**
   - Categorized listings with Katha tags, block markers, status badges (`Available`, `Booked`, `Sold`), and direct query CTAs.
4. **Why Choose Us Bento Grid:**
   - Trust highlights: 16–18 ft earth-filling elevation, 100% mutation ready, RAJUK extended master plan alignment, and flood embankment protection.
5. **On-Ground Progress Showcase:**
   - Five landmark progress cards (Boulevard, Mosque, Eco Park, Sports Complex, Healthcare) with dynamic CDN imagery.
6. **4-Step Acquisition Roadmap:**
   - Visual walkthrough: Site visit, plot selection, mutation verification, and official handover.
7. **Executive Leadership Statements:**
   - Formal messages from the Chairman and Managing Director, complete with portraits and dual-language speech text.
8. **Offline Membership Application Portal:**
   - Downloadable printable PDF application form with guidelines for BDT 1,000 application fee and Mohammadpur office submission.
9. **Interactive Leads & Site Visit Booking:**
   - Frictionless booking modal capturing customer name, phone, email, and preferred plot requirements.

### Pillar B: Administrative CMS Suite (Admin Tier)
1. **Dashboard KPI Hub:** Overview of total leads, active listings, slide inventory, and system health.
2. **Slide Studio (`/admin/manage-slides`):** 3 visual view modes (Cards Grid, Table List, Images Only) with direct ordering, toggling, and editing.
3. **Home Page Section Editor (`/admin/home-settings`):** Synchronizes hero texts, landmark gallery cards, trust counters, and leadership speeches.
4. **Inventory & Plot CRUD (`/admin/inventory`):** Comprehensive catalog creation with plot sizes (Katha), pricing, location, and status tags.
5. **Lead Pipeline & Inquiries (`/admin/leads`):** Inbound inquiries review with status progression (`new` ➔ `contacted` ➔ `qualified` ➔ `closed`).
6. **Corporate Profile & Contact CMS (`/admin/site-settings`, `about-settings`, `projects-settings`):** Manage headquarters location, hotline numbers, Google Maps embed, and corporate history.

---

## 5. Functional Requirements

| Req ID | Module | Functional Description | Acceptance Criteria |
|---|---|---|---|
| **FR-01** | Bilingual Engine | Global `LanguageContext` toggling `en` and `bn` | Zero page refresh; local storage persistence; fallback to English if Bengali field empty. |
| **FR-02** | 3D Hero Carousel | Interactive cylindrical ring powered by Framer Motion | Smooth 3D rotation, touch/mouse drag support, active card highlight. |
| **FR-03** | Lead Ingestion | Form submission via `/api/leads` | Captures name, phone, email, and message; validates inputs; saves to PostgreSQL; notifies UI via toast. |
| **FR-04** | Admin Authentication | JWT cookie-based session with bcrypt password hashing | Route guard redirecting unauthorized users from `/admin/*` to `/admin/login`. |
| **FR-05** | Media Upload Proxy | Multipart upload to `/api/upload` routing to ImgBB CDN | Converts file to base64, uploads via ImgBB API, returns permanent HTTPS URL. |
| **FR-06** | Plot Filtering | Client-side and server-side filtering of plots | Filterable by type (residential, commercial), size (katha), and status. |
| **FR-07** | Offline PDF Flow | Static and CMS-driven link to membership form PDF | Accessible at `/assets/silicon-membership-form.pdf` with download trigger. |

---

## 6. Non-Functional Requirements

### Performance & Web Vitals
- **Server-Side Rendering (SSR) & Streaming:** Next.js 16 App Router for optimal Time to First Byte (TTFB).
- **Image Optimization:** Remote patterns configured for `i.ibb.co` and `images.unsplash.com` with responsive srcset.
- **Font Optimization:** Google Fonts (`Inter`, `Hind Siliguri`) loaded with font-display swap.

### Security
- **Admin Protection:** HTTP-only cookies for JWT session tokens; bcrypt salt rounds 10 for password hashing.
- **SQL Injection Prevention:** Prisma ORM parameterized queries across all database operations.
- **Rate Limiting & Input Sanitization:** Sanitized API payloads preventing XSS and cross-site requests.

### SEO & Social Sharing
- Dynamic Open Graph metadata, Twitter Cards, and canonical tags generated per route.
- Valid `sitemap.xml` and `robots.txt` generated dynamically via App Router handlers.
- Semantic HTML tags (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).

---

## 7. Metrics & Success Criteria

1. **Lead Conversion Rate:** > 4.5% conversion of landing page visitors into lead form submissions or WhatsApp inquiries.
2. **NRB Engagement:** Over 30% of visitors switching to the English interface and engaging with project specification sheets.
3. **Admin Efficiency:** Sub-2-minute turnaround time for marketing staff to publish a new slide or update plot availability.
4. **Core Web Vitals:** Google PageSpeed score of > 85 on desktop and > 75 on mobile.
