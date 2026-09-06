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
