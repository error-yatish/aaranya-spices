-- ============================================================================
-- AARANYA SPICES — SUPABASE POSTGRESQL SCHEMA & RBAC SECURITY MIGRATION
-- Migration: 20260929000001_initial_schema.sql
-- ============================================================================

create extension if not exists "pgcrypto";

-- 0. CUSTOMER PROFILES & ADMIN ROLES TABLES
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  mobile text,
  default_address text,
  default_city text,
  default_state text,
  default_pincode text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  email text primary key,
  added_by text default 'system',
  created_at timestamptz not null default now()
);

-- Security-definer helper to verify if the current JWT user is an authorized Admin
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
stable
as $$
declare
  current_email text;
  profile_role text;
begin
  if auth.uid() is null then
    return false;
  end if;

  -- 1. Check JWT app_metadata role
  if coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin' then
    return true;
  end if;

  -- 2. Check user_profiles role
  select role into profile_role
  from public.user_profiles
  where id = auth.uid();

  if profile_role = 'admin' then
    return true;
  end if;

  -- 3. Check allowlisted admin_users table by email
  current_email := lower(coalesce(auth.jwt() ->> 'email', ''));
  if exists (select 1 from public.admin_users where lower(email) = current_email) then
    return true;
  end if;

  return false;
end;
$$;

-- Trigger to automatically create a user_profile row on Supabase Auth signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.user_profiles (id, email, full_name, mobile, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'mobile', ''),
    case
      when exists (select 1 from public.admin_users where lower(email) = lower(new.email))
      then 'admin'
      else 'customer'
    end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 1. PRODUCTS TABLE
create table if not exists public.products (
  id text primary key,
  sku text unique not null,
  name text not null,
  slug text unique not null,
  category text not null check (category in ('whole-spices', 'ground-spices', 'spice-blends')),
  category_label text not null,
  short_descriptor text not null,
  description text not null,
  editorial_story text,
  ingredients text not null,
  origin text not null default 'India — [SOURCING REGION]',
  sourcing_note text,
  processing text,
  packaging text,
  shelf_life text,
  storage_instructions text,
  aroma_notes text[] default '{}',
  culinary_uses text[] default '{}',
  primary_image text not null,
  secondary_image text,
  gallery_images text[] default '{}',
  rating numeric(3,2) default 4.90,
  review_count integer default 0,
  is_bestseller boolean default false,
  is_new boolean default false,
  is_signature boolean default false,
  is_active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. PRODUCT VARIANTS TABLE (100g, 200g, 500g)
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products(id) on delete cascade,
  weight text not null check (weight in ('100g', '200g', '500g')),
  sku text unique not null,
  price integer not null check (price >= 0),
  compare_at_price integer check (compare_at_price >= 0),
  in_stock boolean not null default true,
  inventory_count integer not null default 0 check (inventory_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, weight)
);

-- 3. SPICE BATCHES TABLE (Seed-to-Jar Traceability)
create table if not exists public.spice_batches (
  id uuid primary key default gen_random_uuid(),
  batch_code text unique not null,
  product_id text not null references public.products(id) on delete cascade,
  sourcing_region text not null default '[SOURCING REGION]',
  harvest_window text not null,
  milled_or_packed_date date not null,
  best_before_date date not null,
  certification_ref text default '[CERTIFICATION]',
  sensory_notes text,
  created_at timestamptz not null default now()
);

-- 4. COUPONS TABLE
create table if not exists public.coupons (
  code text primary key,
  description text not null,
  discount_type text not null check (discount_type in ('percentage', 'flat')),
  discount_value integer not null check (discount_value > 0),
  min_order_amount integer not null default 0,
  is_active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

-- 5. ORDERS TABLE
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_reference text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_mobile text not null,
  customer_email text not null,
  shipping_address text not null,
  shipping_city text not null,
  shipping_state text not null,
  shipping_pincode text not null,
  shipping_method text not null check (shipping_method in ('standard', 'express')),
  payment_method text not null check (payment_method in ('upi', 'card', 'netbanking', 'cod')),
  payment_status text not null default 'PENDING' check (payment_status in ('PENDING', 'PAID', 'COD_CONFIRMED', 'FAILED', 'REFUNDED')),
  order_status text not null default 'RECEIVED' check (order_status in ('RECEIVED', 'PACKED', 'DISPATCHED', 'DELIVERED', 'CANCELLED')),
  coupon_code text,
  subtotal integer not null check (subtotal >= 0),
  shipping_fee integer not null default 0 check (shipping_fee >= 0),
  discount_amount integer not null default 0 check (discount_amount >= 0),
  total_amount integer not null check (total_amount >= 0),
  razorpay_order_id text,
  razorpay_payment_id text,
  shiprocket_order_id text,
  awb_tracking_code text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 6. ORDER ITEMS TABLE
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  sku text not null,
  weight text not null,
  unit_price integer not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  line_total integer not null check (line_total >= 0)
);

-- 7. PRODUCT REVIEWS TABLE
create table if not exists public.product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  author_location text not null,
  rating integer not null check (rating between 1 and 5),
  title text not null,
  comment text not null,
  variant_purchased text default '100g',
  verified_purchase boolean default true,
  is_published boolean default true,
  created_at timestamptz not null default now()
);

-- 8. NEWSLETTER SUBSCRIBERS ("THE AARANYA TABLE")
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text default 'footer',
  subscribed_at timestamptz not null default now()
);

-- 9. CONTACT INQUIRIES
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'OPEN' check (status in ('OPEN', 'RESOLVED')),
  created_at timestamptz not null default now()
);

-- ============================================================================
-- HARDENED ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
alter table public.user_profiles enable row level security;
alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.spice_batches enable row level security;
alter table public.coupons enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.product_reviews enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_inquiries enable row level security;

-- Profile & Admin Policies
create policy "Users can view own profile or admin can view all"
  on public.user_profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = 'customer');

create policy "Only admins can read admin_users"
  on public.admin_users for select
  using (public.is_admin());

-- Catalogue Policies (Public Read, Admin Write)
create policy "Public can read active products"
  on public.products for select
  using (is_active = true or public.is_admin());

create policy "Only admins can manage products"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can read product variants"
  on public.product_variants for select
  using (true);

create policy "Only admins can manage product variants"
  on public.product_variants for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can read spice batches"
  on public.spice_batches for select
  using (true);

create policy "Only admins can manage spice batches"
  on public.spice_batches for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Public can read active coupons"
  on public.coupons for select
  using (is_active = true or public.is_admin());

create policy "Only admins can manage coupons"
  on public.coupons for all
  using (public.is_admin())
  with check (public.is_admin());

-- Orders & Order Items Policies
create policy "Customers can create orders"
  on public.orders for insert
  with check (true);

create policy "Customers can read own orders and admins can read all"
  on public.orders for select
  using (
    public.is_admin()
    or (auth.uid() is not null and user_id = auth.uid())
    or (auth.jwt() ->> 'email' is not null and lower(customer_email) = lower(auth.jwt() ->> 'email'))
  );

create policy "Only admins can update orders"
  on public.orders for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "Customers can insert order items"
  on public.order_items for insert
  with check (true);

create policy "Customers can read own order items and admins can read all"
  on public.order_items for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (
          (auth.uid() is not null and o.user_id = auth.uid())
          or lower(o.customer_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
        )
    )
  );

-- Reviews, Newsletter & Contact Inquiries
create policy "Public can read published reviews"
  on public.product_reviews for select
  using (is_published = true or public.is_admin());

create policy "Authenticated users can submit reviews"
  on public.product_reviews for insert
  with check (auth.uid() is not null);

create policy "Anyone can subscribe to newsletter"
  on public.newsletter_subscribers for insert
  with check (true);

create policy "Only admins can read newsletter subscribers"
  on public.newsletter_subscribers for select
  using (public.is_admin());

create policy "Anyone can submit contact inquiry"
  on public.contact_inquiries for insert
  with check (true);

create policy "Only admins can view and update contact inquiries"
  on public.contact_inquiries for all
  using (public.is_admin())
  with check (public.is_admin());

-- Atomic Inventory Decrement RPC Function
create or replace function public.decrement_variant_inventory(
  p_sku text,
  p_quantity integer
) returns void
language plpgsql
security definer
as $$
begin
  update public.product_variants
  set
    inventory_count = greatest(0, inventory_count - p_quantity),
    in_stock = (greatest(0, inventory_count - p_quantity) > 0),
    updated_at = now()
  where sku = p_sku;
end;
$$;
