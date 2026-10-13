# SEO Strategy & Search Engine Visibility Guide

## Project: Silicon Real Estate Platform (Silicon City)
- **Domain:** `https://siliconrealestatepvtltd.com`
- **Objective:** Achieve page 1 Google rankings for high-intent Dhaka land acquisition and real estate keywords in both Bengali and English.

---

## 1. Executive Summary & Problem Resolution

### What Was Broken (Audited & Fixed):
1. **Wrong Brand Identity in Meta:** `src/lib/metadata.ts` was outputting `EstateHub` and `estatehub.com` instead of `Silicon Real Estate (Pvt.) Ltd.`, leading to Google indexing placeholder titles.
2. **Robots.txt Site URL Mismatch:** `robots.ts` was directing crawlers to `https://estatehub.com/sitemap.xml`. This has now been corrected to `https://siliconrealestatepvtltd.com`.
3. **In-Memory Sitemap:** `sitemap.ts` was mapping hardcoded in-memory state and indexing `/login`. It has been upgraded to a dynamic asynchronous sitemap that queries active plots directly from **Neon PostgreSQL** via Prisma.
4. **Missing Schema.org Rich Snippets:** Google was unable to parse corporate metadata for knowledge graph panels. A structured `RealEstateAgent` JSON-LD schema has now been embedded directly in the root HTML shell.

---

## 2. High-Intent Keyword Matrix

The platform targets two distinct search intents: **Local Bengali Queries** and **NRB/Expat English Queries**.

### Primary Target Keywords (Bengali)
| Search Keyword | Intent | Target Landing Page | Priority |
|---|---|---|---|
| **সিলিকন রিয়েল এস্টেট** | Navigational / Brand | `/` (Home) | P0 (Critical) |
| **সিলিকন সিটি সাভার** | Project Brand Search | `/projects` | P0 (Critical) |
| **সাভার আবাসিক প্লট বিক্রয়** | Commercial Transactional | `/projects` | P0 (High Volume) |
| **মোহাম্মদপুর সংলগ্ন প্লট** | Geo-Targeted High Value | `/` & `/projects` | P0 |
| **তুরাগ নদীর তীরে জমি** | Scenic / Eco Township | `/about` & `/projects` | P1 |
| **বন্যা মুক্ত আবাসিক জমি ঢাকা** | Problem-Solving (Elevation) | `/` (Why Choose Us) | P1 |
| **১০০% নিষ্কণ্টক রেডি মিউটেশন প্লট** | Legal Verification Intent | `/services` | P1 |

### Primary Target Keywords (English)
| Search Keyword | Intent | Target Landing Page | Priority |
|---|---|---|---|
| **Silicon Real Estate Pvt Ltd** | Official Corporate | `/` | P0 |
| **Silicon City Planned Township** | Flagship Development | `/projects` | P0 |
| **Plots for sale in Savar Dhaka** | High-Intent Buying | `/projects` | P0 |
| **Land near Mohammadpur Dhaka** | Location Comparison | `/` | P0 |
| **RAJUK masterplan plots Savar** | Regulatory Compliance | `/projects` | P1 |
| **NRB land investment Bangladesh** | Expatriate Investment | `/contact?type=nrb` | P1 |

---

## 3. Technical SEO Implementation Architecture

### A. Dynamic Canonicalization & MetadataBase
Every page automatically generates an absolute canonical URL using `metadataBase: new URL(SITE_URL)` in `src/lib/metadata.ts`:
```typescript
alternates: {
  canonical: `${SITE_URL}${path}`,
}
```
This prevents duplicate content penalties between `http`, `https`, `www`, and non-`www` protocols.

---

### B. Schema.org JSON-LD Structured Data
Implemented in `src/app/(main)/layout.tsx` to earn Google Knowledge Graph features and Google Maps local business integration:

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Silicon Real Estate (Pvt.) Ltd.",
  "alternateName": "Silicon City Planned Township",
  "url": "https://siliconrealestatepvtltd.com",
  "logo": "https://siliconrealestatepvtltd.com/silicon.png",
  "telephone": "+88012345678",
  "email": "info@siliconrealestatepvtltd.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2/3 (2nd Floor), Block-A, Iqbal Road",
    "addressLocality": "Mohammadpur",
    "addressRegion": "Dhaka",
    "postalCode": "1207",
    "addressCountry": "BD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 23.7509,
    "longitude": 90.3621
  }
}
```

---

### C. Dynamic XML Sitemap & Robots.txt
- **Sitemap Location:** `https://siliconrealestatepvtltd.com/sitemap.xml`
  - Daily refresh frequency for Home (`/`)
  - Weekly refresh for `/projects`, `/about`, `/services`, `/contact`
  - Dynamic generation for every property slug queried directly from PostgreSQL (`/projects/[slug]`)
- **Robots.txt Location:** `https://siliconrealestatepvtltd.com/robots.txt`
  - Allows all standard search engines (`Googlebot`, `Bingbot`, etc.)
  - Explicitly disallows private paths: `/admin*`, `/api*` to conserve crawl budget and protect sensitive routes.

---

### D. Open Graph & Social Sharing Cards
Optimized social preview image generated at `1200 x 630 px` (`/opengraph-image`) with:
- `og:locale`: `bn_BD`
- `twitter:card`: `summary_large_image`
- High-contrast typography indicating Silicon City's proximity (15 Mins from Mohammadpur).

---

## 4. Google Search Console & Launch Checklist

Follow these steps immediately after production domain deployment:

1. **Verify Domain in Google Search Console:**
   - Add Domain Property `siliconrealestatepvtltd.com` via DNS TXT record.
2. **Submit XML Sitemap:**
   - Go to **Sitemaps** ➔ Enter `https://siliconrealestatepvtltd.com/sitemap.xml` ➔ Submit.
3. **Bing Webmaster Tools Sync:**
   - Import directly from Google Search Console into Bing Webmaster Tools.
4. **Google Business Profile (GBP) Creation:**
   - Claim profile for **Silicon Real Estate (Pvt.) Ltd.** at 2/3 Iqbal Road, Mohammadpur, Dhaka.
   - Link website to GBP listing for enhanced local pack visibility ("Real estate near me").
5. **Backlink Strategy:**
   - Submit official corporate profile to Bangladesh Real Estate directories and business registries.
   - Publish press releases with links pointing to `/projects` and `/about`.
