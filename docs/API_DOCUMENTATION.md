# REST API Specification & Reference

## Project: Silicon Real Estate Platform (Silicon City)
- **Base URL:** `/api` (Also accessible via `/api/v1` via Next.js rewrite in `next.config.ts`)
- **Protocol:** HTTPS / JSON Payloads
- **Authentication:** JWT Bearer Token / HTTP-Only Cookie (`silicon_jwt`)

---

## 1. Authentication & Security Headers

Protected endpoints require administrative privileges. You can provide credentials in either of two ways:
1. **HTTP-Only Cookie:** `silicon_jwt=<token>` (Set automatically upon successful login).
2. **Authorization Header:** `Authorization: Bearer <token>`

### Strict Zero-Mock Policy (100% DB-Driven)
All API endpoints query Neon PostgreSQL directly via Prisma ORM:
- **Zero Fallback Mock Data:** Endpoints never return hardcoded arrays or mock Unsplash images.
- **Empty / Not Found States:** If no rows exist in a table, the API returns `{ success: true, [items]: [] }` or `{ success: true, data: null }`.
- **Client Handling:** The frontend is configured to render explicit empty state UI ("তথ্য পাওয়া যায়নি" / "No records found") whenever the database is unpopulated.

---

## 2. Authentication Endpoints

### `POST /api/auth/login`
Authenticates administrative users and sets the `silicon_jwt` cookie.

#### Request Body
```json
{
  "email": "admin@siliconrealestatepvtltd.com",
  "password": "your_secure_password"
}
```

#### Response (`200 OK`)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "cuid12345",
    "email": "admin@siliconrealestatepvtltd.com",
    "role": "admin"
  }
}
```

---

### `POST /api/auth/logout`
Clears authentication cookies and terminates the session.

---

### `GET /api/auth/me`
Returns current authenticated user details from the session cookie.

---

## 3. Media Upload Endpoint

### `POST /api/upload`
Uploads image files or base64 streams directly to **ImgBB Global CDN** via a secure server proxy.

- **Auth Required:** Yes (`Admin`)
- **Supported Formats:** `multipart/form-data` or `application/json` (with base64 string)

#### Multipart Request
```bash
curl -X POST http://localhost:3000/api/upload \
  -H "Cookie: silicon_jwt=..." \
  -F "file=@/path/to/landmark-mosque.jpg"
```

#### Response (`200 OK`)
```json
{
  "success": true,
  "url": "https://i.ibb.co/abcd123/landmark-mosque.jpg",
  "displayUrl": "https://i.ibb.co/abcd123/landmark-mosque.jpg",
  "thumbUrl": "https://i.ibb.co/abcd123/landmark-mosque.thumb.jpg",
  "deleteUrl": "https://ibb.co/delete/..."
}
```

---

## 4. Home Page Content Management

### `GET /api/home-content`
Fetches global landing page configuration, hero texts, landmark progress cards, and trust counters.

- **Auth Required:** No

#### Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "heroBadge": "PLANNED ECO-TOWNSHIP",
    "heroBadgeBn": "পরিকল্পিত আধুনিক ইকো টাউনশিপ",
    "heroTitle": "Own Your Land in Dhaka's Future Mega City",
    "heroTitleBn": "ঢাকার ভবিষ্যৎ মেগা সিটিতে আপনার নিজস্ব একখণ্ড ঠিকানা",
    "heroSubtitle": "150+ Acres • Adjacent to Mohammadpur Beribadh",
    "masterPlanTitle": "At a Glance: Township Layout",
    "trustCounters": [
      { "value": "150+", "label": "Acres Planned Township", "subtext": "Savar Bara Badeshi" },
      { "value": "16-18", "label": "Feet Sand Earthfill Elevation", "subtext": "100% Flood Protected" }
    ],
    "sectionsConfig": {
      "galleryItems": [ ... ]
    }
  }
}
```

---

### `PUT /api/home-content`
Updates landing page fields and composite JSON configurations.

- **Auth Required:** Yes (`Admin`)

---

## 5. Hero Carousel Slides (`Slide`)

### `GET /api/slides`
Fetches all active 3D carousel slides ordered by `order ASC`.

- **Auth Required:** No

#### Response (`200 OK`)
```json
{
  "success": true,
  "slides": [
    {
      "id": "slide_1",
      "title": "Welcome to Silicon City",
      "titleBn": "সিলিকন সিটিতে আপনাকে স্বাগতম",
      "subtitle": "15 Minutes from Mohammadpur Town Hall",
      "subtitleBn": "মোহাম্মদপুর টাউন হল থেকে মাত্র ১৫ মিনিট",
      "image": "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      "badge": "150+ Acres",
      "badgeBn": "১৫০+ একর",
      "order": 1,
      "active": true
    }
  ]
}
```

---

### `POST /api/slides`
Creates a new slide for the 3D rotating cylinder.

- **Auth Required:** Yes (`Admin`)

#### Request Body
```json
{
  "title": "Grand Central Boulevard",
  "titleBn": "গ্র্যান্ড সেন্ট্রাল বুলেভার্ড",
  "subtitle": "40ft Wide Avenues Connecting All Blocks",
  "subtitleBn": "সকল ব্লকে যোগাযোগের জন্য ৪০ ফুট প্রশস্ত অ্যাভিনিউ",
  "image": "https://i.ibb.co/example/boulevard.jpg",
  "badge": "Infrastructure",
  "badgeBn": "অবকাঠামো",
  "order": 2,
  "active": true
}
```

---

### `PUT /api/slides/[id]` & `DELETE /api/slides/[id]`
Modifies or removes a slide by ID.

---

## 6. Plot & Property Inventory (`Property`)

### `GET /api/properties`
Fetches plots with optional query parameters.

- **Query Parameters:**
  - `status` (e.g. `available`, `booked`, `sold`)
  - `category` (e.g. `residential`, `commercial`)
  - `featured` (`true` or `false`)

---

### `POST /api/properties`
Creates a new plot inventory item.

- **Auth Required:** Yes (`Admin`)

#### Request Body
```json
{
  "title": "Prime Residential Plot 5 Katha - Block A",
  "titleBn": "প্রাইম আবাসিক প্লট ৫ কাঠা - ব্লক এ",
  "slug": "prime-residential-plot-5-katha-block-a",
  "type": "plot",
  "category": "residential",
  "status": "available",
  "price": 4500000,
  "location": "Bara Badeshi, Savar, Dhaka",
  "locationBn": "বড় বাদেশী, সাভার, ঢাকা",
  "areaSqFt": 3600,
  "description": "South-facing 5 katha residential plot located along the 30ft avenue.",
  "features": ["30ft Road", "Corner Plot", "100% Mutation Ready"],
  "images": ["https://i.ibb.co/plot1.jpg"],
  "featured": true
}
```

---

## 7. Customer Inquiries & Leads (`Lead`)

### `POST /api/leads`
Intake endpoint for client inquiries and site visit reservations.

- **Auth Required:** No

#### Request Body
```json
{
  "name": "Tanvir Ahmed",
  "email": "tanvir@example.com",
  "phone": "+8801712345678",
  "message": "Interested in inspecting a 3 Katha plot in Block B this Saturday.",
  "propertyId": "cuid_prop_123"
}
```

#### Response (`201 Created`)
```json
{
  "success": true,
  "lead": {
    "id": "cuid_lead_987",
    "name": "Tanvir Ahmed",
    "status": "new",
    "createdAt": "2026-10-12T16:00:00.000Z"
  }
}
```

---

### `GET /api/leads`
Retrieves lead list for the CRM pipeline.

- **Auth Required:** Yes (`Admin`)
- **Query Filters:** `?status=new` | `?search=tanvir`
