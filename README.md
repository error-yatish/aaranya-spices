# AARANYA SPICES — E-Commerce Platform & Supabase Backend

> **Pure. Rich. Authentic.** — *The Essence of Indian Spices*

A production-ready D2C e-commerce platform built for **AARANYA SPICES**, celebrating Indian whole spices, single-origin ground powders, and small-batch spice blends. Designed with a calm, editorial luxury aesthetic paired with a **Supabase (PostgreSQL + Auth + Edge Functions)** backend architecture and **Razorpay / Shiprocket** integration hooks.

---

## 1. Key Highlights

- **Editorial Luxury Storefront:** Crafted with Deep Forest Green (`#182B21`), Warm Ivory (`#F7F4ED`), Travertine Sand (`#EFECE3`), and Muted Turmeric Ochre (`#C89236`), pairing **Cormorant Garamond** headings with **Plus Jakarta Sans** UI typography and **JetBrains Mono** specifications.
- **Complete 19-Route E-Commerce Experience:**
  - `/` — Editorial Homepage (Hero, Brand Story, Collections, Bestsellers, 5 Quality Pillars, Signature Turmeric Story, Interactive India Sourcing Map, Recipes, Journal, Newsletter)
  - `/shop`, `/shop/whole-spices`, `/shop/ground-spices`, `/shop/spice-blends` — Filterable & sortable catalogue (Search, Category, Pack Weight `100g | 200g | 500g`, Max Price, Availability, Mobile Filter Drawer)
  - `/shop/:slug` — Product Detail Page (`/shop/turmeric-powder`, `/shop/whole-cumin`, etc.) with multi-image gallery, weight selector, specification ledger, *Why You'll Love It*, *How to Use*, linked recipes, verified customer reviews, and FAQ accordion
  - `/cart` & Slide-Over Cart Drawer — Free-shipping progress bar (`₹999` threshold), coupon support (`AARANYA10`, `WELCOME150`), and *You may also like* upsells
  - `/checkout` — Distraction-free Indian checkout (PIN code validation, Standard/Express shipping, UPI/Card/NetBanking/COD) connected to Supabase & Razorpay Edge Functions
  - `/recipes` & `/recipes/:slug` — Editorial recipes (`/recipes/paneer-tikka`, `/recipes/homestyle-dal-tadka`, etc.) with one-click shoppable spices
  - `/journal` & `/journal/:slug` — Magazine-style essays on Indian spice origins, tempering chemistry, and regional food culture
  - `/about`, `/sourcing`, `/contact`, `/faq`, `/search`, `/privacy`, `/terms`, `/shipping-returns`
  - `/admin` — **Operations & Inventory Console** for managing orders, Shiprocket AWB tracking codes, SKU inventory (`100g / 200g / 500g`), harvest batch traceability, and customer inquiries
- **Hybrid Backend Engine (`src/services/backendService.ts`):**
  - **Live Supabase Mode:** Automatically activates when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured in `.env`.
  - **Zero-Config Local Fallback:** Works out of the box in local development by mirroring orders, inventory, batches, newsletter subscriptions, and inquiries to browser storage.

---

## 2. Quickstart

### Prerequisites
- **Node.js** `>= 18.x`
- **npm** `>= 9.x`

### Install & Run Locally

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Configure Supabase & Razorpay credentials
cp .env.example .env

# 3. Start the development server at http://localhost:5173
npm run dev

# 4. Run TypeScript check and build production bundle
npm run build
```

> **Windows PowerShell Note:** If PowerShell script execution policy blocks `npm.ps1`, run `npm.cmd install` and `npm.cmd run dev`.

---

## 3. Project Structure

```text
aaranya/
├── public/
│   ├── images/                     # 13 bespoke editorial & macro spice photographs
│   ├── robots.txt                  # Search engine crawler configuration
│   └── sitemap.xml                 # XML sitemap for all storefront routes
├── src/
│   ├── components/
│   │   ├── layout/                 # Header, Footer, CartDrawer, SearchOverlay, IndiaSourcingMap
│   │   ├── seo/                    # SEOHead (OpenGraph, Canonical, JSON-LD schemas)
│   │   └── ui/                     # Logo, Primitives, ProductCard, ProductGallery, EditorialCards
│   ├── context/
│   │   └── ShopContext.tsx         # Persistent Cart, Coupon, Drawer & Toast state
│   ├── data/
│   │   ├── catalog.ts              # 12 products × 3 weight variants (36 SKUs), reviews, FAQs
│   │   ├── recipes.ts              # 6 regional Indian recipes linked to Aaranya SKUs
│   │   └── journal.ts              # 6 editorial monographs
│   ├── lib/
│   │   └── supabase.ts             # Supabase client & environment auto-detection
│   ├── pages/                      # All 19 page views (lazy-loaded for fast LCP/INP)
│   ├── services/
│   │   ├── backendService.ts       # Supabase PostgreSQL + Auth + Local DB fallback
│   │   └── checkoutService.ts      # Order totals, shipping, coupons & order submission
│   └── types/
│       └── ecommerce.ts            # TypeScript interfaces
├── supabase/
│   ├── migrations/
│   │   └── 20260929000001_initial_schema.sql  # PostgreSQL tables, RLS policies & RPC
│   ├── functions/
│   │   ├── create-razorpay-order/index.ts     # Edge Function: creates Razorpay order
│   │   └── verify-razorpay-webhook/index.ts   # Edge Function: HMAC verification
│   └── seed.sql                               # Seed products, 100g/200g/500g variants, batches
├── docs/
│   ├── ARCHITECTURE.md             # System architecture, ER diagram & design tokens
│   ├── BACKEND_SETUP.md            # Supabase setup, SQL migrations & Edge Functions
│   ├── PAYMENTS_AND_SHIPPING.md    # Razorpay & Shiprocket integration guide
│   └── CONTENT_AND_PLACEHOLDERS.md # Guide to replacing [SOURCING REGION] & placeholders
└── .env.example
```

---

## 4. Documentation Index

- **[System Architecture & Design Tokens (`docs/ARCHITECTURE.md`)](./docs/ARCHITECTURE.md)**
- **[Authentication Workflow & Admin RBAC Security (`docs/AUTH_AND_SECURITY.md`)](./docs/AUTH_AND_SECURITY.md)**
- **[Supabase Backend Setup Guide (`docs/BACKEND_SETUP.md`)](./docs/BACKEND_SETUP.md)**
- **[Razorpay & Shiprocket Integration (`docs/PAYMENTS_AND_SHIPPING.md`)](./docs/PAYMENTS_AND_SHIPPING.md)**
- **[Updating Brand Content & Placeholders (`docs/CONTENT_AND_PLACEHOLDERS.md`)](./docs/CONTENT_AND_PLACEHOLDERS.md)**
