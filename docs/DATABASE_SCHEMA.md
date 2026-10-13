# Database Schema & Data Models Specification

## Project: Silicon Real Estate Platform (Silicon City)
- **Database Engine:** Neon Serverless PostgreSQL
- **ORM:** Prisma ORM 7.10.0 (`@prisma/adapter-pg`)
- **Schema File:** [prisma/schema.prisma](file:///Users/rashedulraha/Developer/siliconPvt/prisma/schema.prisma)

---

## 1. Overview of Data Architecture

The database architecture is designed to support high-speed public reads with serverless pooling while providing structured JSON flexibility for CMS content blocks. All models feature bilingual fields (ending in `Bn`) for zero-loss Bengali localization.

---

## 2. Comprehensive Model Catalog

### 1. `Admin`
Stores administrative authentication credentials and roles.
```prisma
model Admin {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  role         String   @default("admin")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

### 2. `Property`
Represents individual land plots, residential allocations, commercial plots, and special inventory items.
```prisma
model Property {
  id            String   @id @default(cuid())
  title         String
  titleBn       String?
  slug          String   @unique
  type          String   // plot, flat, commercial, project
  category      String   // residential, commercial, industrial, luxury
  status        String   @default("available") // available, booked, sold, rented
  price         Float
  location      String
  locationBn    String?
  areaSqFt      Float?
  bedrooms      Int?
  bathrooms     Int?
  description   String
  descriptionBn String?
  features      String[]
  featuresBn    String[]
  images        String[]
  featured      Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

### 3. `Lead`
Stores inbound prospective client inquiries, site visit bookings, and membership leads.
```prisma
model Lead {
  id         String   @id @default(cuid())
  name       String
  email      String
  phone      String
  message    String
  propertyId String?
  status     String   @default("new") // new, contacted, qualified, closed
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

---

### 4. `Slide`
Powers the dynamic 3D Cylindrical Hero Carousel on the landing page.
```prisma
model Slide {
  id         String   @id @default(cuid())
  title      String
  titleBn    String?
  subtitle   String
  subtitleBn String?
  image      String
  badge      String?
  badgeBn    String?
  link       String?
  active     Boolean  @default(true)
  order      Int      @default(0)
  createdAt  DateTime @default(now())
}
```

---

### 5. `HomeContent`
Central singleton record storing the landing page sections, badges, hero copy, and composite configuration. All content fields are dynamically populated from the database with no hardcoded fallback strings.
```prisma
model HomeContent {
  id                 String   @id @default(cuid())
  heroBadge          String
  heroBadgeBn        String?
  heroTitle          String
  heroTitleBn        String?
  heroSubtitle       String
  heroSubtitleBn     String?
  heroDesc           String
  heroDescBn         String?
  heroCtaText        String
  heroCtaTextBn      String?
  heroCtaLink        String
  masterPlanBadge    String?
  masterPlanBadgeBn  String?
  masterPlanTitle    String?
  masterPlanTitleBn  String?
  masterPlanDesc     String?
  masterPlanDescBn   String?
  masterPlanImage    String?
  amenitiesBadge     String?
  amenitiesBadgeBn   String?
  amenitiesTitle     String?
  amenitiesTitleBn   String?
  amenitiesDesc      String?
  amenitiesDescBn    String?
  showcaseBadge      String?
  showcaseBadgeBn    String?
  showcaseTitle      String?
  showcaseTitleBn    String?
  showcaseDesc       String?
  showcaseDescBn     String?
  trackRecordTitle   String
  trackRecordTitleBn String?
  trackRecordDesc    String
  trackRecordDescBn  String?
  trustCounters      Json?    // Array of { value, label, subtext }
  trustCountersBn    Json?
  accreditations     Json?    // Array of { title, desc, icon, badge }
  accreditationsBn   Json?
  ctaTitle           String
  ctaTitleBn         String?
  ctaDesc            String
  ctaDescBn          String?
  ctaButtonText      String
  ctaButtonTextBn    String?
  ctaButtonLink      String
  sectionsConfig     Json?    // Stores landmark gallery items and leadership overrides
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
}
```

---

### 6. `ContactInfo`
Singleton record managing official corporate headquarters information, emergency hotlines, and map embeds. All values are purely dynamic and managed via Admin CMS.
```prisma
model ContactInfo {
  id                String   @id @default("global")
  heroTitle         String?
  heroTitleBn       String?
  heroDescription   String?
  heroDescriptionBn String?
  address           String?
  addressBn         String?
  phone             String?
  whatsapp          String?
  email             String?
  secondaryEmail    String?
  website           String?
  businessHours     String?
  businessHoursBn   String?
  mapEmbedUrl       String?
  siteVisitNotice   String?
  siteVisitNoticeBn String?
  imageUrl          String?  
  facebookUrl       String?
  youtubeUrl        String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

---

### 7. `MembershipContent`
Singleton record holding official offline membership rules, printable application form link, and parameters.
```prisma
model MembershipContent {
  id                  String   @id @default("global")
  heroTitle           String?
  heroTitleBn         String?
  heroDescription     String?
  heroDescriptionBn   String?
  formPdfUrl          String?
  applicationFee      String?
  landSharePercentage String?
  soilElevationHeight String?
  offlineNoticeText   String?
  offlineNoticeTextBn String?
  contactHotline      String?
  pathways            String?  // JSON stringified array of application pathways
  termsAndConditions  String?  // JSON stringified array of membership terms
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}
```

---

### 8. `AboutContent`
Corporate identity profile, executive leadership addresses, core values, and corporate history timeline.
```prisma
model AboutContent {
  id              String   @id @default(cuid())
  heroTitle       String
  heroTitleBn     String?
  heroSubtitle    String
  heroSubtitleBn  String?
  heroDesc        String
  heroDescBn      String?
  whoWeAreTitle   String
  whoWeAreTitleBn String?
  whoWeAreDesc    String
  whoWeAreDescBn  String?
  missionTitle    String
  missionTitleBn  String?
  missionDesc     String
  missionDescBn   String?
  visionTitle     String
  visionTitleBn   String?
  visionDesc      String
  visionDescBn    String?
  chairmanName    String
  chairmanNameBn  String?
  chairmanRole    String
  chairmanRoleBn  String?
  chairmanSpeech  String
  chairmanSpeechBn String?
  chairmanImage   String
  mdName          String
  mdNameBn        String?
  mdRole          String
  mdRoleBn        String?
  mdSpeech        String
  mdSpeechBn      String?
  mdImage         String
  stats           Json?
  statsBn         Json?
  coreValues      Json?
  coreValuesBn    Json?
  timeline        Json?
  timelineBn      Json?
  whyChooseUs     Json?
  whyChooseUsBn   Json?
  managementTeam  Json?
  managementTeamBn Json?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

### 9. `ProjectsContent`
Dynamic landing and overview content for the mega township project showcase. Zero hardcoded mock strings.
```prisma
model ProjectsContent {
  id                String   @id @default(cuid())
  heroTitle         String?
  heroTitleBn       String?
  heroSubtitle      String?
  heroSubtitleBn    String?
  heroDesc          String?
  heroDescBn        String?
  trustMetrics      Json?
  trustMetricsBn    Json?
  spotlightBadge    String?
  spotlightBadgeBn  String?
  spotlightTitle    String?
  spotlightTitleBn  String?
  spotlightDesc     String?
  spotlightDescBn   String?
  spotlightTag      String?
  spotlightTagBn    String?
  spotlightBoxTitle String?
  spotlightBoxTitleBn String?
  spotlightBoxDesc  String?
  spotlightBoxDescBn String?
  spotlightLocation String?
  spotlightLocationBn String?
  spotlightBadge2   String?
  spotlightBadge2Bn String?
  specs             Json?
  specsBn           Json?
  categories        Json?
  categoriesBn      Json?
  amenities         Json?
  amenitiesBn       Json?
  proximities       Json?
  proximitiesBn     Json?
  roadmap           Json?
  roadmapBn         Json?
  ctaBadge          String?
  ctaBadgeBn        String?
  ctaTitle          String?
  ctaTitleBn        String?
  ctaDesc           String?
  ctaDescBn         String?
  ctaHotline        String?
  ctaEmail          String?
  ctaOffice         String?
  ctaOfficeBn       String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

---

### 10. `Project`
Individual portfolio projects and township sectors.
```prisma
model Project {
  id            String   @id @default(cuid())
  num           String?
  title         String
  titleBn       String?
  slug          String?  @unique
  type          String?  // e.g. "Ongoing Flagship Township"
  typeBn        String?
  status        String   @default("Ongoing") // Ongoing, Upcoming, Completed
  statusBn      String?
  location      String
  locationBn    String?
  description   String
  descriptionBn String?
  images        String[]
  highlights    String[] // tech stack / feature tags
  highlightsBn  String[]
  demoUrl       String?  // live/demo URL or detail link
  clientInfo    String?  // client details / developer info
  order         Int      @default(0)
  active        Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

### 11. `BlogPost`
Articles, company news, and legal updates.
```prisma
model BlogPost {
  id          String   @id @default(cuid())
  title       String
  titleBn     String?
  slug        String   @unique
  excerpt     String
  excerptBn   String?
  content     String
  contentBn   String?
  image       String
  category    String
  author      String?
  publishedAt DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

### 12. `Service`
Legal, boundary survey, mutation, and registration consulting services.
```prisma
model Service {
  id            String   @id @default(cuid())
  num           String?
  title         String
  titleBn       String?
  tag           String
  tagBn         String?
  description   String
  descriptionBn String?
  icon          String?
  imageUrl      String?
  pricing       String?
  benefits      String[]
  benefitsBn    String[]
  order         Int      @default(0)
  active        Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

### 13. `GalleryItem` & `TeamMember`
Photo gallery media and executive leadership profiles.
```prisma
model GalleryItem {
  id        String   @id @default(cuid())
  title     String
  titleBn   String?
  category  String   // project | infrastructure | office | handovers
  badge     String
  location  String
  overview  String
  overviewBn String?
  images    String[]
  features  String[]
  order     Int      @default(0)
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model TeamMember {
  id        String   @id @default(cuid())
  name      String
  nameBn    String?
  role      String   // Chairman, Managing Director, Executive, etc.
  roleBn    String?
  speech    String   // Formal leadership address speech
  speechBn  String?
  image     String
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 3. Dynamic Content & Zero Mock Default Policy

1. **Zero Hardcoded Content in Schema & Defaults:**  
   The database schema strictly defines data structures, relational constraints, and functional defaults (`@id @default(cuid())`, `@default(now())`, `@default(true)`). It **never** contains default marketing copy, dummy phone numbers, hardcoded addresses, or placeholder imagery.
2. **Pure Database-Driven Architecture:**  
   All content displayed in the UI is dynamically stored in and retrieved from Neon PostgreSQL. When content changes over time, administrative updates are immediately reflected without code deployments.
3. **Graceful Empty & Error States:**  
   If data has not yet been populated in the database for a specific section or if the API query returns no records, the system returns `null` or an empty collection. The UI gracefully renders an empty state or returns a 404/error state rather than displaying stale, misleading, or hardcoded fallback information.

---

## 4. Database Maintenance Commands

```bash
# Push schema changes to Neon PostgreSQL
npx prisma db push

# Regenerate Prisma Client types
npx prisma generate

# Inspect database visually via Prisma Studio
npx prisma studio
```
