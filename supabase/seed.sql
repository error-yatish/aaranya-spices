-- ============================================================================
-- AARANYA SPICES — SUPABASE SEED DATA
-- Seed products, weight variants (100g/200g/500g), batch traceability, coupons
-- ============================================================================

-- 1. Coupons
insert into public.coupons (code, description, discount_type, discount_value, min_order_amount, is_active)
values
  ('AARANYA10', '10% privilege discount on all spices', 'percentage', 10, 0, true),
  ('WELCOME150', '₹150 off on orders above ₹1,200', 'flat', 150, 1200, true)
on conflict (code) do nothing;

-- 2. Core Products
insert into public.products (
  id, sku, name, slug, category, category_label, short_descriptor, description,
  ingredients, origin, primary_image, secondary_image, rating, review_count, is_bestseller, is_signature
) values
  (
    'aar-turmeric-01', 'AAR-GRD-TRM', 'Turmeric Powder', 'turmeric-powder',
    'ground-spices', 'Ground Spices',
    'Warm, earthy depth with a deep golden hue.',
    'Finely milled from whole cured turmeric rhizomes selected for their rich golden colour, warm aroma, and balanced earthy character.',
    '100% Pure Ground Turmeric (Curcuma longa).', 'India — [SOURCING REGION]',
    '/images/prod-turmeric-powder.jpg', '/images/signature-turmeric.jpg', 4.9, 42, true, true
  ),
  (
    'aar-chilli-02', 'AAR-GRD-KCH', 'Kashmiri Chilli Powder', 'kashmiri-chilli-powder',
    'ground-spices', 'Ground Spices',
    'Vibrant crimson colour with gentle, fruity warmth.',
    'Ground from whole sun-dried Kashmiri chillies prized for their deep ruby-red hue and mild, sweet-fruity heat.',
    '100% Pure Ground Kashmiri Red Chillies (Capsicum annuum).', 'India — [SOURCING REGION]',
    '/images/prod-kashmiri-chilli.jpg', '/images/category-ground.jpg', 4.9, 56, true, false
  ),
  (
    'aar-coriander-pwd-03', 'AAR-GRD-COR', 'Coriander Powder', 'coriander-powder',
    'ground-spices', 'Ground Spices',
    'Citrusy, floral warmth that binds everyday curries.',
    'Freshly milled from plump, sun-dried Indian coriander seeds with a bright lemony-sage aroma.',
    '100% Pure Ground Coriander Seeds (Coriandrum sativum).', 'India — [SOURCING REGION]',
    '/images/prod-coriander-powder.jpg', '/images/prod-coriander-seeds.jpg', 4.8, 31, true, false
  ),
  (
    'aar-cumin-pwd-04', 'AAR-GRD-CUM', 'Cumin Powder', 'cumin-powder',
    'ground-spices', 'Ground Spices',
    'Rich, nutty warmth with unmistakable savoury depth.',
    'Milled from aromatic Indian cumin seeds to deliver a warm, earthy, and gently toasted flavour profile.',
    '100% Pure Ground Cumin Seeds (Cuminum cyminum).', 'India — [SOURCING REGION]',
    '/images/prod-cumin-powder.jpg', '/images/prod-cumin-seeds.jpg', 4.9, 29, true, false
  ),
  (
    'aar-black-pepper-05', 'AAR-WHL-BPP', 'Black Pepper', 'black-pepper',
    'whole-spices', 'Whole Spices',
    'Bold, sun-dried peppercorns with piney, citrus heat.',
    'Large, heavy-berry whole black peppercorns selected for their complex aroma of resinous pine, dark citrus, and lingering piperine warmth.',
    '100% Whole Black Peppercorns (Piper nigrum).', 'India — [SOURCING REGION]',
    '/images/prod-black-pepper.jpg', '/images/category-whole.jpg', 5.0, 48, true, false
  ),
  (
    'aar-cumin-seeds-06', 'AAR-WHL-CUM', 'Cumin Seeds', 'whole-cumin',
    'whole-spices', 'Whole Spices',
    'Plump, aromatic jeera that crackles with nutty fragrance.',
    'Whole Indian cumin seeds chosen for their bold size, clean appearance, and high essential oil content.',
    '100% Whole Cumin Seeds (Cuminum cyminum).', 'India — [SOURCING REGION]',
    '/images/prod-cumin-seeds.jpg', '/images/brand-story.jpg', 4.9, 37, true, false
  ),
  (
    'aar-coriander-seeds-07', 'AAR-WHL-COR', 'Coriander Seeds', 'coriander-seeds',
    'whole-spices', 'Whole Spices',
    'Golden-green whole dhaniya with bright lemon-sage notes.',
    'Whole, unsplit Indian coriander seeds with a delicate, hollow crunch and sweet citrus-floral bouquet.',
    '100% Whole Coriander Seeds (Coriandrum sativum).', 'India — [SOURCING REGION]',
    '/images/prod-coriander-seeds.jpg', '/images/category-whole.jpg', 4.8, 24, true, false
  ),
  (
    'aar-garam-masala-08', 'AAR-BLD-GRM', 'Garam Masala', 'garam-masala',
    'spice-blends', 'Spice Blends',
    'An eleven-spice finishing blend of warm aromatics.',
    'A balanced, small-batch blend of green and black cardamom, true cinnamon, cloves, mace, nutmeg, star anise, black pepper, bay leaf, cumin, and coriander.',
    'Coriander, Cumin, Black Pepper, Green Cardamom, Black Cardamom, Cinnamon, Cloves, Mace, Nutmeg, Star Anise, Tejpatta.',
    'India — [SOURCING REGION]',
    '/images/category-blends.jpg', '/images/prod-cumin-powder.jpg', 5.0, 64, true, false
  )
on conflict (id) do nothing;

-- 3. Product Variants
insert into public.product_variants (product_id, weight, sku, price, compare_at_price, in_stock, inventory_count)
values
  ('aar-turmeric-01', '100g', 'AAR-GRD-TRM-100', 220, null, true, 48),
  ('aar-turmeric-01', '200g', 'AAR-GRD-TRM-200', 390, 440, true, 35),
  ('aar-turmeric-01', '500g', 'AAR-GRD-TRM-500', 880, 990, true, 19),
  ('aar-chilli-02', '100g', 'AAR-GRD-KCH-100', 280, null, true, 39),
  ('aar-chilli-02', '200g', 'AAR-GRD-KCH-200', 520, 560, true, 24),
  ('aar-chilli-02', '500g', 'AAR-GRD-KCH-500', 1180, 1350, true, 12),
  ('aar-coriander-pwd-03', '100g', 'AAR-GRD-COR-100', 190, null, true, 52),
  ('aar-coriander-pwd-03', '200g', 'AAR-GRD-COR-200', 340, 380, true, 41),
  ('aar-coriander-pwd-03', '500g', 'AAR-GRD-COR-500', 760, 880, true, 22),
  ('aar-cumin-pwd-04', '100g', 'AAR-GRD-CUM-100', 240, null, true, 44),
  ('aar-cumin-pwd-04', '200g', 'AAR-GRD-CUM-200', 440, 480, true, 30),
  ('aar-cumin-pwd-04', '500g', 'AAR-GRD-CUM-500', 980, 1120, true, 15),
  ('aar-black-pepper-05', '100g', 'AAR-WHL-BPP-100', 290, null, true, 60),
  ('aar-black-pepper-05', '200g', 'AAR-WHL-BPP-200', 540, 580, true, 38),
  ('aar-black-pepper-05', '500g', 'AAR-WHL-BPP-500', 1240, 1400, true, 20),
  ('aar-cumin-seeds-06', '100g', 'AAR-WHL-CUM-100', 210, null, true, 64),
  ('aar-cumin-seeds-06', '200g', 'AAR-WHL-CUM-200', 380, 420, true, 45),
  ('aar-cumin-seeds-06', '500g', 'AAR-WHL-CUM-500', 860, 980, true, 28),
  ('aar-coriander-seeds-07', '100g', 'AAR-WHL-COR-100', 180, null, true, 55),
  ('aar-coriander-seeds-07', '200g', 'AAR-WHL-COR-200', 320, 360, true, 34),
  ('aar-coriander-seeds-07', '500g', 'AAR-WHL-COR-500', 720, 820, true, 18),
  ('aar-garam-masala-08', '100g', 'AAR-BLD-GRM-100', 340, null, true, 42),
  ('aar-garam-masala-08', '200g', 'AAR-BLD-GRM-200', 620, 680, true, 27),
  ('aar-garam-masala-08', '500g', 'AAR-BLD-GRM-500', 1420, 1600, true, 11)
on conflict (sku) do nothing;

-- 4. Spice Traceability Batches
insert into public.spice_batches (
  batch_code, product_id, sourcing_region, harvest_window, milled_or_packed_date, best_before_date, certification_ref, sensory_notes
) values
  ('BATCH-TRM-2608', 'aar-turmeric-01', '[SOURCING REGION]', 'Winter 2026 Cured Harvest', '2026-08-15', '2027-08-15', '[CERTIFICATION]', 'Deep golden-ochre, warm ginger root and woody musk.'),
  ('BATCH-KCH-2609', 'aar-chilli-02', '[SOURCING REGION]', 'Autumn Sun-Dried Lot', '2026-09-02', '2027-09-02', '[CERTIFICATION]', 'Bright brick-crimson pigment, mild fruity warmth.'),
  ('BATCH-BPP-2608', 'aar-black-pepper-05', '[SOURCING REGION]', 'Monsoon Vine Harvest', '2026-08-20', '2028-08-20', '[CERTIFICATION]', 'Bold 550g/L density berries, resinous pine and citrus bite.'),
  ('BATCH-GRM-2609', 'aar-garam-masala-08', '[SOURCING REGION]', 'Small-Lot Blend Run #14', '2026-09-10', '2027-07-10', '[CERTIFICATION]', 'Green cardamom & mace forward eleven-spice roast.')
on conflict (batch_code) do nothing;
