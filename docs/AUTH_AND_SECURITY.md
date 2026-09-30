# Authentication Workflow & Admin RBAC Security Guide

Aaranya Spices implements a dual-layer security model covering **Customer Authentication (`/account`)**, **Frontend Operations Security Gate (`/admin`)**, and **Database-Level Row Level Security (Supabase PostgreSQL RLS)**.

---

## 1. Customer Sign-In & Registration Workflow (`/account`)

Implemented in [`src/context/AuthContext.tsx`](../src/context/AuthContext.tsx) and [`src/pages/AccountPage.tsx`](../src/pages/AccountPage.tsx):

1. **Three Sign-In Modes:**
   - **Email + Password Sign-In:** Calls `supabase.auth.signInWithPassword({ email, password })` when Supabase is connected, or verifies credentials against the local encrypted session store in Hybrid Mode.
   - **New Customer Registration:** Calls `supabase.auth.signUp()` with `full_name` and `mobile` metadata. A PostgreSQL trigger (`public.handle_new_user()`) automatically provisions a row in `public.user_profiles`.
   - **Passwordless Magic Link (OTP):** Calls `supabase.auth.signInWithOtp({ email })` to email a one-time login link.
2. **Signed-In Customer Experience:**
   - **Order History & AWB Tracking:** Automatically filters and displays orders matching the customer's authenticated email/UID, showing live status (`RECEIVED`, `PACKED`, `DISPATCHED`, `DELIVERED`) and Shiprocket AWB tracking numbers.
   - **Default Delivery Address Persistence:** Customers can save their street address, city, state, and PIN code in `/account`, which automatically pre-fills `/checkout`.

---

## 2. Admin Console Security (`/admin`)

### Layer 1: Frontend Admin Security Gate
Visiting `/admin` ([`src/pages/AdminPage.tsx`](../src/pages/AdminPage.tsx)) renders the **Operations Security Gate** unless:
- The user is signed in with a verified `role = 'admin'` profile, **OR**
- The operator unlocks the console using their operator email and the `VITE_ADMIN_PASSCODE` environment variable (default in local development: `AARANYA2026`).
- Operators can click **Lock Console** in the top-right header at any time to clear the admin session token.

### Layer 2: Supabase PostgreSQL RBAC & Row Level Security (`public.is_admin()`)
Defined in [`supabase/migrations/20260929000001_initial_schema.sql`](../supabase/migrations/20260929000001_initial_schema.sql):

- **`public.admin_users` Table & `public.is_admin()` Function:**
  A `security definer` SQL function checks three sources before granting admin privileges:
  1. `auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'`
  2. `public.user_profiles.role = 'admin'` for `auth.uid()`
  3. The user's authenticated email exists in `public.admin_users`
- **Strict Table Policies:**
  - `products`, `product_variants`, `spice_batches`, `coupons`: Public `SELECT` only; `INSERT / UPDATE / DELETE` restricted strictly to `public.is_admin()`.
  - `orders` & `order_items`: Customers can `INSERT` orders at checkout and `SELECT` **only their own orders** (`user_id = auth.uid()` or matching authenticated email). Only `public.is_admin()` can `SELECT` all orders or `UPDATE` `order_status` and `awb_tracking_code`.
  - `newsletter_subscribers` & `contact_inquiries`: Public `INSERT` only; `SELECT / UPDATE` restricted strictly to `public.is_admin()`.

---

## 3. How to Promote an Email to Admin in Supabase

Run this single SQL statement in the **Supabase SQL Editor**:

```sql
-- Add your email to the allowlisted admin_users table
insert into public.admin_users (email, added_by)
values ('founder@aaranyaspices.com', 'owner')
on conflict (email) do nothing;

-- If the user has already signed up, also update their user_profiles role
update public.user_profiles
set role = 'admin'
where lower(email) = 'founder@aaranyaspices.com';
```
