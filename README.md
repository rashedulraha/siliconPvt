# Silicon Real Estate (Pvt.) Ltd. — Silicon City Mega Township Platform

<div align="center">

![Silicon City Banner](https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=80)

### **Next-Generation Enterprise Real Estate Platform & Headless CMS**
*Planned Eco-Township • 150+ Acres • Savar, Dhaka (15 Mins from Mohammadpur)*

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Serverless-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.10.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.40.0-EA4C89?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![ImgBB CDN](https://img.shields.io/badge/ImgBB-Cloud_CDN-007ACC?style=for-the-badge&logo=icloud&logoColor=white)](https://imgbb.com/)
[![Biome](https://img.shields.io/badge/Biome-2.5.7-60A5FA?style=for-the-badge&logo=biome&logoColor=white)](https://biomejs.dev/)

[Live Demo](#) • [Admin Portal](#admin-cms-ecosystem) • [Architecture](#-system-architecture--ecosystem) • [API Docs](#-rest-api-reference) • [Setup Guide](#-installation--setup)

---

</div>

## 🌐 Executive Overview

**Silicon Real Estate (Pvt.) Ltd.** is a flagship real estate platform engineered for **Silicon City**, a master-planned mega township located at Bara Badeshi Mouza, Savar, Dhaka — positioned along the scenic Turag River and directly connected to the Mohammadpur Beribadh. 

The platform delivers an enterprise-grade, high-performance web experience featuring a **3D cylindrical carousel hero**, dynamic glassmorphic data grids, bilingual localization (**English & Bengali**), and a dedicated **No-Code Administrative CMS** powered by **Neon Serverless PostgreSQL** and **Prisma ORM**.

---

## 🏛 System Architecture & Ecosystem

The platform follows a modern full-stack decoupled architecture running on the **Next.js 16 App Router**:

```mermaid
graph TD
    subgraph Client_Tier ["🌐 Public Client Experience"]
        A1["3D Cylinder Hero Carousel<br/>(Interactive Ring & Gestures)"]
        A2["Bilingual State Engine<br/>(English ⇄ Bengali Instant Sync)"]
        A3["Glassmorphic UI Sections<br/>(Progress Showcase, Bento Grids)"]
        A4["Interactive Plot & Project Catalog<br/>(Filters, Blocks, Katha)"]
        A5["Direct Booking & Offline PDF<br/>(Membership Flow, Leads)"]
    end

    subgraph Admin_Tier ["⚙️ Admin CMS Suite"]
        B1["Live Home Section Manager<br/>(8 Sections, Real-time Preview)"]
        B2["Multi-Format Slide Studio<br/>(Cards, Table, Image Wall)"]
        B3["Progress Showcase Editor<br/>(5 Landmark Cards, ImgBB Upload)"]
        B4["Executive Leadership Studio<br/>(Chairman & MD Bilingual Speeches)"]
        B5["Plot Inventory & Leads Pipeline<br/>(CRM, Status Workflow)"]
    end

    subgraph Server_Tier ["🚀 Next.js 16 Core & Edge APIs"]
        C1["App Router Server Components<br/>(SSR / Streaming / SEO Optimization)"]
        C2["REST API Route Handlers<br/>(/api/home-content, /api/slides, etc.)"]
        C3["Media Gateway (/api/upload)<br/>(Multipart Stream ➔ ImgBB CDN)"]
        C4["Authentication Middleware<br/>(JWT Cookie + Bcrypt Validation)"]
    end

    subgraph Data_Tier ["💾 Data & Cloud Storage"]
        D1[("Neon Serverless PostgreSQL<br/>(@prisma/adapter-pg)")]
        D2[("Prisma ORM 7.10<br/>(Type-Safe Client & Migrations)")]
        D3[("ImgBB Global CDN<br/>(Permanent High-Res Media Assets)")]
    end

    Client_Tier -->|User Interactions & Inquiries| Server_Tier
    Admin_Tier -->|Content Management & Uploads| Server_Tier
    Server_Tier -->|Queries & Mutations| D2
    D2 -->|Pooled Connection| D1
    Server_Tier -->|Base64 Asset Pipeline| D3
    D3 -.->|High-Speed Direct Asset URLs| Client_Tier
```

---

## ✨ Core Ecosystem Highlights

### 1. 🌟 Public Portal Experience (12 Dedicated Modules)

| # | Section Name | Key Visual Feature | Data Source |
|---|---|---|---|
| **01** | **3D Cylinder Hero Carousel** | Perspective 3D rotating ring with mouse drag, keyboard arrows, and auto-orbiting slide decks | Dynamic `Slide` Model |
| **02** | **Master Plan & Amenities** | Layout architecture, 30ft & 40ft avenues, sunlight zoning, central eco-spaces | `HomeContent.masterPlan*` |
| **03** | **Live Database Plot Showcase** | Handpicked verified plots with Katha badges, Block tags, pricing, and direct detail links | `Property` Model |
| **04** | **Why Choose Us Bento Grid** | 16–18ft sand elevation, 100% mutation ready, RAJUK alignment, 15 min proximity | Bento Card Grid |
| **05** | **Flagship Township Spotlight** | Turag riverfront panorama, flood protection embankment, and master zoning | `HomeContent.showcase*` |
| **06** | **On-Ground Progress Showcase** | 5 interactive landmark cards (Central Mosque, Eco Park, Sports Complex, Healthcare, Boulevard) | `sectionsConfig.galleryItems` |
| **07** | **4-Step Acquisition Process** | Physical site visit, plot demarcation, transparent registration, milestone handover | Interactive Process Steps |
| **08** | **Proven Track Record Counters** | 150+ Acres, 16–18ft Elevation, 30/40ft Concrete Roads, 100% Ready Mutation | `HomeContent.trustCounters` |
| **09** | **Executive Leadership Statements** | Chairman & Managing Director speeches with high-res portraits, fallback avatar badges | `sectionsConfig.executive` |
| **10** | **Regulatory Accreditations** | Official compliance badges: RAJUK Master Plan, Flood Embankment Zone, CS/SA/RS/BS Khatiyan | `HomeContent.accreditations` |
| **11** | **Dynamic Company Press & News** | Editorial articles, handover announcements, and infrastructure updates | `BlogPost` Model |
| **12** | **Offline Membership Guidelines** | Printable PDF download, BDT 1,000 application fee guide, Mohammadpur HQ submission | `MembershipContent` Model |

---

### 2. 🎛️ Complete Admin CMS Suite (`/admin`)

The platform contains a unified, real-time Content Management System built for non-technical administrators:

```
src/app/admin/
├── page.tsx                 # Executive Dashboard Overview (KPIs, Leads, Quick Links)
├── home-settings/           # Live synchronization for all 8 Home Page sections
├── manage-slides/           # Multi-format 3D cylinder slide manager
├── about-settings/          # Corporate identity, Mission, Vision, Milestones, Team
├── projects-settings/       # Mega township sectors, Plot catalog, Spotlight details
├── services-settings/       # Citizen amenities & legal land vetting services
├── inventory/               # Full Property & Plot CRUD with katha & pricing
├── leads/                   # Customer inquiry & site visit lead management
└── site-settings/           # Headquarters contact, Hotline numbers, Google Maps
```

#### 🖼️ Multi-Format Hero Slide Studio (`/admin/manage-slides`)
Includes an instant 3-way view switcher for slide deck management:
1. **Cards Grid View**: Rich visual presentation cards with live previews, active/inactive toggles, badge chips, and direct edit modals.
2. **Table / List View**: High-density data grid with sorting, search filtering, quick status toggles, and compact action controls.
3. **Images Only Gallery View**: High-speed visual media audit wall displaying pure photography with badge overlays for fast curation.

#### 🏗️ Dynamic Progress Showcase Manager (`/admin/home-settings`)
- Direct management for the **5 Landmark Progress Cards**.
- One-click image replacement via the **ImgBB Cloud Upload Pipeline**.
- Dual bilingual fields for English and Bengali titles, tags, and progress descriptions.

#### 👔 Executive Leadership Studio (`/admin/home-settings`)
- Dedicated panels for the **Chairman** and **Managing Director**.
- Intelligent image rendering: Direct CDN upload preview with automatic initials badge fallback (`AK` / `SK`) if an image is missing or loading.
- Optimized 2-column split layout: Left side for Photo & Basic Info, Right side with full-width side-by-side textareas for English and Bengali formal speeches.

---

## ☁️ Cloud Media & Storage Pipeline

Images are dynamically hosted on **ImgBB Cloud CDN** via a secure server-side proxy route:

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin User
    participant UI as CMS Upload Component
    participant API as Next.js API (/api/upload)
    participant ImgBB as ImgBB Global CDN
    participant DB as Neon PostgreSQL

    Admin->>UI: Selects image file or pastes image URL
    UI->>API: POST /api/upload (Multipart FormData)
    API->>API: Authenticate Admin Session (JWT)
    API->>API: Convert file to Base64 buffer
    API->>ImgBB: POST https://api.imgbb.com/1/upload (API Key Auth)
    ImgBB-->>API: Returns direct permanent CDN URL (https://i.ibb.co/...)
    API-->>UI: { success: true, url: "https://i.ibb.co/..." }
    UI->>DB: Saves updated record via Prisma
    DB-->>UI: Stored & live on website immediately
```

> [!NOTE]
> Next.js image domains are configured in `next.config.ts` to allow `i.ibb.co`, `**.ibb.co`, and `ibb.co` for optimized rendering with Next.js Image components and raw CDN `<img>` elements.

---

## 🗄️ Database Architecture & Prisma Schema

Built on **Neon Serverless PostgreSQL** using **Prisma ORM 7.10** with connection pooling via `@prisma/adapter-pg`.

### Key Data Entities

| Model | Primary Purpose | Key Fields |
|---|---|---|
| `HomeContent` | Global Home Page CMS | `heroTitle`, `masterPlan*`, `showcase*`, `trustCounters`, `accreditations`, `sectionsConfig` (JSON) |
| `Slide` | 3D Cylinder Hero Carousel | `title`, `titleBn`, `subtitle`, `image`, `badge`, `order`, `active` |
| `Property` | Township Plot & Inventory | `title`, `slug`, `type`, `category`, `status`, `price`, `areaSqFt`, `images`, `featured` |
| `Lead` | Client Inquiries & Site Bookings | `name`, `email`, `phone`, `message`, `status` (new, contacted, qualified, closed) |
| `AboutContent` | Corporate Identity & Timeline | `mission*`, `vision*`, `chairmanSpeech*`, `mdSpeech*`, `coreValues`, `timeline` |
| `ProjectsContent`| Master Township Spotlight | `heroTitle*`, `spotlightBox*`, `specs`, `amenities`, `roadmap`, `trustMetrics` |
| `ContactInfo` | Headquarters & Office Info | `heroTitle*`, `address*`, `phone`, `whatsapp`, `email`, `mapEmbedUrl` |
| `MembershipContent` | Offline Member Application | `heroTitle*`, `formPdfUrl`, `applicationFee`, `soilElevationHeight`, `pathways` |
| `Service` | Real Estate & Legal Services | `title*`, `tag*`, `description*`, `pricing`, `benefits` |
| `BlogPost` | Press Releases & News | `title*`, `slug`, `excerpt*`, `content*`, `image`, `category`, `author` |
| `Admin` | CMS Authentication | `email`, `passwordHash`, `role`, `createdAt` |

---

## 🌐 Dual-Language Bilingual Engine (English & Bengali)

The platform features a zero-reload, instant bilingual translation engine powered by React Context (`LanguageContext`):

```typescript
// Example usage across any component:
const { isBn, language, setLanguage } = useLanguage();

// Graceful fallback architecture:
const title = isBn ? data.titleBn || data.title : data.title;
const speech = isBn ? data.speechBn || data.speech : data.speech;
```

- **Instant Switching**: Persisted in local storage and distributed across all navigation bars, footers, bento cards, and interactive 3D elements.
- **Graceful Fallbacks**: If a Bengali translation field is not yet entered in the CMS, the platform gracefully falls back to the English master text without broken UI states.

---

## 📁 Repository Structure

```
silicon/
├── prisma/
│   ├── schema.prisma              # Neon PostgreSQL schema definition
│   └── migrations/                # Version-controlled DB migrations
├── src/
│   ├── app/
│   │   ├── (main)/                # Public front-facing portal
│   │   │   ├── page.tsx           # Home page wrapper
│   │   │   ├── about/             # Corporate overview & story
│   │   │   ├── projects/          # Township sectors & plot catalog
│   │   │   ├── services/          # Real estate & civic amenities
│   │   │   ├── contact/           # Corporate headquarters & site visit booking
│   │   │   └── privacy-terms/     # Legal disclaimers & compliance
│   │   ├── admin/                 # Dedicated No-Code Admin Suite
│   │   │   ├── page.tsx           # Main CMS dashboard & lead metrics
│   │   │   ├── home-settings/     # 8-section live home content manager
│   │   │   ├── manage-slides/     # Multi-format 3D cylinder slide studio
│   │   │   ├── about-settings/    # Story, mission, leadership & timeline
│   │   │   ├── projects-settings/ # Project sectors, amenities & roadmap
│   │   │   ├── services-settings/ # Citizen service cards & pricing
│   │   │   ├── inventory/         # Property listings CRUD
│   │   │   ├── leads/             # Lead management & pipeline
│   │   │   ├── site-settings/     # Office addresses, hotline & social
│   │   │   └── login/             # Admin authentication portal
│   │   └── api/                   # REST API Edge routes
│   │       ├── home-content/      # GET / PUT home page sections
│   │       ├── slides/            # GET / POST / PUT / DELETE hero slides
│   │       ├── upload/            # Secure ImgBB multipart media gateway
│   │       ├── properties/        # Plot inventory management
│   │       ├── leads/             # Customer inquiry intake
│   │       ├── about-content/     # Corporate story & leadership
│   │       ├── projects-content/  # Spotlight & roadmap content
│   │       ├── contact-info/      # Contact info & headquarters
│   │       └── auth/              # JWT admin login & session verification
│   ├── components/
│   │   ├── home/                  # Home page section assemblies
│   │   │   ├── HomePageClient.tsx # Master home client orchestrator
│   │   │   ├── WhyChooseUs.tsx    # Bento grid for trust pillars
│   │   │   ├── InvestmentProcess.tsx # 4-step acquisition guide
│   │   │   └── glass/             # Glassmorphic component modules
│   │   │       ├── InteractiveCarouselRing.tsx # 3D rotating cylinder
│   │   │       ├── MasterPlanAmenities.tsx     # Master plan layout
│   │   │       ├── SiliconCityShowcase.tsx     # Savar & Turag spotlight
│   │   │       ├── ProjectGallerySection.tsx   # Landmark progress cards
│   │   │       ├── LeadershipGlassBlocks.tsx   # Chairman & MD addresses
│   │   │       ├── CompanyNewsSection.tsx      # Editorial press & news
│   │   │       └── OfflineMembershipGlassBanner.tsx # Application guide
│   │   ├── layout/                # Global Navbar, Footer, Containers
│   │   └── ui/                    # Radix & Tailwind reusable UI primitives
│   ├── context/
│   │   └── LanguageContext.tsx    # English/Bengali bilingual state
│   ├── hooks/                     # SWR/custom data hooks for live sync
│   └── lib/                       # Prisma client, Auth helpers, Utilities
├── next.config.ts                 # Next.js 16 configuration & CDN domains
├── package.json                   # Dependency tree
└── README.md                      # Platform technical documentation
```

---

## 📡 REST API Reference

| Endpoint | Method | Auth Required | Description |
|---|---|---|---|
| `/api/home-content` | `GET` | No | Retrieves full home page configuration and JSON blocks |
| `/api/home-content` | `PUT` | **Yes (Admin)** | Updates home sections, progress cards, leadership, and counters |
| `/api/slides` | `GET` | No | Fetches active 3D cylinder carousel slides |
| `/api/slides` | `POST` | **Yes (Admin)** | Creates a new hero carousel slide |
| `/api/slides/[id]` | `PUT` / `DELETE` | **Yes (Admin)** | Updates or deletes an existing slide |
| `/api/upload` | `POST` | **Yes (Admin)** | Multipart/JSON proxy to upload images directly to ImgBB CDN |
| `/api/properties` | `GET` | No | Fetches property and plot inventory with filters |
| `/api/properties` | `POST` | **Yes (Admin)** | Adds a new property/plot to the database |
| `/api/leads` | `POST` | No | Submits a new customer inquiry or site booking |
| `/api/leads` | `GET` | **Yes (Admin)** | Fetches all customer leads for the CRM pipeline |
| `/api/about-content` | `GET` / `PUT` | Admin (PUT) | Manages corporate story, mission, vision, and timeline |
| `/api/projects-content` | `GET` / `PUT` | Admin (PUT) | Manages flagship project spotlight, specs, and roadmap |
| `/api/contact-info` | `GET` / `PUT` | Admin (PUT) | Manages corporate office address, hotline, and Google Map |
| `/api/auth/login` | `POST` | No | Authenticates admin credentials and issues signed JWT cookie |

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: v20.x or higher (Node 22+ recommended)
- **npm** or **pnpm**
- **PostgreSQL Database** (e.g., [Neon Serverless](https://neon.tech))
- **ImgBB Account** (Free API Key from [api.imgbb.com](https://api.imgbb.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/silicon.git
cd silicon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:

```env
# Server & Database Configuration
DATABASE_URL="postgresql://user:password@your-neon-host.neon.tech/neondb?sslmode=require"

# Admin Authentication
ADMIN_EMAIL="admin@siliconrealestatepvtltd.com"
ADMIN_PASSWORD="your_secure_password"
JWT_SECRET="your_custom_jwt_secret_key"

# ImgBB Cloud CDN (For dynamic image uploads)
IMGBB_API_KEY="your_imgbb_api_key"

# Client Configuration
NEXT_PUBLIC_API_URL="/api/v1"
```

### 4. Database Setup & Prisma Generation
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to Neon PostgreSQL
npx prisma db push

# (Optional) Seed initial records
# Access http://localhost:3000/api/seed
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public website.  
Access [http://localhost:3000/admin](http://localhost:3000/admin) for the administrative CMS.

### 6. Build for Production
```bash
npm run build
npm start
```

---

## 🧪 Code Quality & Testing

```bash
# Run Biome Linter & Formatter check
npm run format:check

# Fix formatting issues automatically
npm run format:fix

# Run unit tests via Vitest
npm run test

# Launch Vitest Interactive UI
npm run test:ui
```

---

## 🏢 Corporate Headquarters

**Silicon Real Estate (Pvt.) Ltd.**  
2/3 (2nd Floor), Block # A, Iqbal Road,  
Mohammadpur, Dhaka-1207, Bangladesh *(Near Mohammadpur Town Hall)*  
- **Hotlines:** +880 12 345 678, +880 1712 345 678  
- **Email:** info@siliconrealestatepvtltd.com  
- **Web:** [siliconrealestatepvtltd.com](https://siliconrealestatepvtltd.com)  

---

<div align="center">
  <sub>Developed with pride for the Silicon City Master Planned Township. All rights reserved &copy; 2026.</sub>
</div>
