# Environment Variables & Database Connection Analysis

## Project: Silicon Real Estate Platform (Silicon City)
- **Document Status:** Complete & Verified
- **Configuration Mode:** 100% Environment-Driven (`.env`)

---

## 1. Migration Summary: From Hardcoded Fallbacks to Secure `.env`

Previously, the **Neon PostgreSQL connection URL** was hardcoded as a fallback in two application files:
1. `prisma.config.ts` (lines 5-8)
2. `src/lib/prisma.ts` (lines 7-9)

### Action Completed:
- **Root [`.env`](file:///Users/rashedulraha/Developer/siliconPvt/.env) Created & Populated:** Contains `DATABASE_URL`, cryptographically secure 256-bit `JWT_SECRET`, admin credentials, and `IMGBB_API_KEY`.
- **Hardcoded Strings Completely Removed:** Both [prisma.config.ts](file:///Users/rashedulraha/Developer/siliconPvt/prisma.config.ts) and [src/lib/prisma.ts](file:///Users/rashedulraha/Developer/siliconPvt/src/lib/prisma.ts) now strictly enforce `process.env.DATABASE_URL` and throw an explicit error if missing.
- **Auth Fallbacks Removed:** [src/lib/server-auth.ts](file:///Users/rashedulraha/Developer/siliconPvt/src/lib/server-auth.ts) now strictly requires `process.env.JWT_SECRET`.
- **Upload Key Fallback Removed:** [src/app/api/upload/route.ts](file:///Users/rashedulraha/Developer/siliconPvt/src/app/api/upload/route.ts) now strictly requires `process.env.IMGBB_API_KEY`.

---

## 2. Active Database Connection String Anatomy

The active connection configured in `.env`:
```env
DATABASE_URL="postgresql://neondb_owner:npg_ZTgy90pjwLSf@ep-calm-wind-azneegzi-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
```

### Breakdown of Connection Components:
| Parameter | Value | Description |
|---|---|---|
| **Protocol** | `postgresql://` | Standard PostgreSQL connection protocol |
| **Username** | `neondb_owner` | Root database administrator role on Neon |
| **Password** | `npg_ZTgy90pjwLSf` | Neon database owner credentials |
| **Host** | `ep-calm-wind-azneegzi-pooler.c-3.ap-southeast-1.aws.neon.tech` | Neon pooled compute endpoint hosted in AWS Asia Pacific (Singapore: `ap-southeast-1`) |
| **Database** | `neondb` | Default database name |
| **SSL Mode** | `sslmode=require` | Mandatory encrypted TLS connection required by Neon |

---

## 3. Active `.env` Configuration File

Your active [`.env`](file:///Users/rashedulraha/Developer/siliconPvt/.env) file is structured as follows:

```env
# ============================================================
#  DATABASE CONFIGURATION (Neon Serverless PostgreSQL)
# ============================================================
DATABASE_URL="postgresql://neondb_owner:npg_ZTgy90pjwLSf@ep-calm-wind-azneegzi-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

# ============================================================
#  AUTHENTICATION & SECURITY SECRETS
# ============================================================
# Cryptographically secure 256-bit secret key for JWT session signing
JWT_SECRET="e9f82d1c6a4b73e5f0a2c8d4b6e8193750c128479e0bf538a7c264d189f3a647"
JWT_EXPIRES_IN="7d"

# Corporate Admin Credentials (Used by server-auth to seed admin account securely)
ADMIN_EMAIL="admin@siliconrealestatepvtltd.com"
ADMIN_PASSWORD="SiliconSecure#2026!AdminKey99"

# ============================================================
#  CLOUD MEDIA & CDN (ImgBB API)
# ============================================================
IMGBB_API_KEY="652df40a5c686059d830fe0a556f020a"

# ============================================================
#  SITE CONFIGURATION & SEO
# ============================================================
NODE_ENV="development"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Silicon Real Estate (Pvt.) Ltd."
NEXT_PUBLIC_CMS_STORAGE_KEY="silicon_cms_data"

# ============================================================
#  CONTACT & COMMUNICATION
# ============================================================
NEXT_PUBLIC_WHATSAPP_NUMBER="+8801712345678"
NEXT_PUBLIC_CONTACT_EMAIL="info@siliconrealestatepvtltd.com"
NEXT_PUBLIC_CONTACT_PHONE="+880 12 345 678"

# ============================================================
#  API & FEATURE FLAGS
# ============================================================
NEXT_PUBLIC_API_URL="/api/v1"
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_WHATSAPP=true
NEXT_PUBLIC_ENABLE_COOKIE_CONSENT=true
```

---

## 4. Database Maintenance & Verification Commands

```bash
# Verify Prisma client generates cleanly using .env DATABASE_URL
npx prisma generate

# Synchronize schema models directly to Neon PostgreSQL
npx prisma db push

# Open visual database browser
npx prisma studio
```
