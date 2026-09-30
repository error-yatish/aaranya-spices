# Supabase Backend Setup Guide

This guide walks you through connecting **AARANYA SPICES** to a live Supabase project.

---

## Step 1: Create a Supabase Project

1. Sign in at [https://supabase.com/dashboard](https://supabase.com/dashboard) and click **New Project**.
2. Choose **Mumbai (`ap-south-1`)** as your region for the lowest latency across India.
3. Once provisioned, navigate to **Project Settings → API** and copy:
   - **Project URL** (`https://xxxx.supabase.co`)
   - **anon / public key** (`eyJhbGci...`)

---

## Step 2: Configure `.env`

Create a `.env` file in the root of the project (`d:\yatish\spice-trade\aaranya\.env`):

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Restart `npm run dev`. When you open `/admin` (**Operations & Inventory Console**), the engine badge in the top-right will switch from `Hybrid Local DB (.env ready)` to `Supabase PostgreSQL Live`.

---

## Step 3: Run Database Schema & Seed Data

### Option A: Via Supabase SQL Editor (Fastest)
1. Open the **SQL Editor** in your Supabase Dashboard.
2. Copy and run the contents of [`supabase/migrations/20260929000001_initial_schema.sql`](../supabase/migrations/20260929000001_initial_schema.sql).
3. Copy and run the contents of [`supabase/seed.sql`](../supabase/seed.sql).

### Option B: Via Supabase CLI
```bash
npx supabase login
npx supabase link --project-ref your-project-ref
npx supabase db push
```

---

## Step 4: Configure Customer Auth (Magic Links / Phone OTP)

1. In the Supabase Dashboard, navigate to **Authentication → URL Configuration**.
2. Set **Site URL** to your production domain (e.g. `https://aaranyaspices.com` or `http://localhost:5173` during development).
3. Under **Authentication → Providers**, enable **Email (Magic Link)** and optionally **Phone (Twilio / MessageBird / MSG91)** for Indian mobile OTP login.

---

## Step 5: Deploy Edge Functions

Deploy the Razorpay order creation and webhook verification Edge Functions:

```bash
npx supabase functions deploy create-razorpay-order
npx supabase functions deploy verify-razorpay-webhook --no-verify-jwt
```
