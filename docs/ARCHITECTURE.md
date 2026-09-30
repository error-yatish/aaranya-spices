# AARANYA SPICES — Architecture & Design System

## 1. High-Level Architecture

Aaranya Spices is built as a modular, component-driven React + TypeScript application backed by **Supabase (PostgreSQL, Row Level Security, Auth, and Deno Edge Functions)**.

```mermaid
flowchart TD
  Client["React 18 + TypeScript Storefront"]
  Context["ShopContext (Cart, Variants, Coupons)"]
  Service["backendService.ts / checkoutService.ts"]
  SupabaseDB[("Supabase PostgreSQL + RLS")]
  LocalDB[("Local Hybrid Fallback Store")]
  EdgeCreate["Edge Function: create-razorpay-order"]
  EdgeVerify["Edge Function: verify-razorpay-webhook"]
  Razorpay["Razorpay Gateway (UPI / Cards / NetBanking)"]

  Client --> Context
  Context --> Service
  Service -->|VITE_SUPABASE_URL set| SupabaseDB
  Service -->|No .env configured| LocalDB
  Client -->|Online Payment| EdgeCreate
  EdgeCreate --> Razorpay
  Razorpay -->|HMAC Webhook| EdgeVerify
  EdgeVerify --> SupabaseDB
```

---

## 2. Database Entity-Relationship Model

Defined in [`supabase/migrations/20260929000001_initial_schema.sql`](../supabase/migrations/20260929000001_initial_schema.sql):

```mermaid
erDiagram
  PRODUCTS ||--o{ PRODUCT_VARIANTS : "has weight variants (100g, 200g, 500g)"
  PRODUCTS ||--o{ SPICE_BATCHES : "traced by harvest lots"
  PRODUCTS ||--o{ PRODUCT_REVIEWS : "has verified reviews"
  ORDERS ||--|{ ORDER_ITEMS : "contains SKU line items"

  PRODUCTS {
    text id PK
    text sku UK
    text name
    text slug UK
    text category
    text origin
    numeric rating
  }

  PRODUCT_VARIANTS {
    uuid id PK
    text product_id FK
    text weight
    text sku UK
    integer price
    integer inventory_count
  }

  SPICE_BATCHES {
    uuid id PK
    text batch_code UK
    text product_id FK
    text sourcing_region
    date milled_or_packed_date
    date best_before_date
  }

  ORDERS {
    uuid id PK
    text order_reference UK
    text customer_name
    text shipping_pincode
    text payment_status
    text order_status
    integer total_amount
  }

  ORDER_ITEMS {
    uuid id PK
    uuid order_id FK
    text sku
    text weight
    integer unit_price
    integer quantity
  }
```

---

## 3. Visual & Typographic Design Tokens

Defined in [`src/index.css`](../src/index.css):

| Token | Value | Purpose |
| :--- | :--- | :--- |
| `--bg-ivory` | `#F7F4ED` | Primary warm parchment canvas |
| `--bg-sand` | `#EFECE3` | Elevated cards, specification tables, filter drawers |
| `--bg-forest` | `#182B21` | Primary brand dark forest green (Header bar, Footer, Primary CTAs) |
| `--bg-forest-deep` | `#0F1D16` | Hover state and deep hero overlays |
| `--text-charcoal` | `#1C1B18` | Primary editorial and body text |
| `--text-umbral` | `#5A564E` | Secondary body copy and captions |
| `--accent-ochre` | `#C89236` | Muted turmeric ochre accent |
| `--accent-earth` | `#6D4C38` | Earthy roasted-cumin brown eyebrows and tags |
| `--border-warm` | `#E2DDD2` | 1px structural dividers |

### Typography Hierarchy
1. **Editorial Headings (`Cormorant Garamond`):** Used on `h1`–`h6` with `text-wrap: balance`.
2. **UI & Body (`Plus Jakarta Sans`):** Used on navigation, product descriptions, buttons, filters, and forms with `text-wrap: pretty`.
3. **Technical Ledger (`JetBrains Mono`):** Used with `font-variant-numeric: tabular-nums` for SKUs, batch codes, pack weights, and INR pricing.
