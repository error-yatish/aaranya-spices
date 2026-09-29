import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Minus, Plus, ShieldCheck, Truck, Package, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { getProductBySlug, PRODUCTS } from '../data/catalog';
import { RECIPES } from '../data/recipes';
import { SpiceWeight } from '../types/ecommerce';
import { useShop } from '../context/ShopContext';
import {
  Breadcrumbs,
  Price,
  Rating,
  Button,
  Accordion,
  SectionHeader
} from '../components/ui/Primitives';
import { ProductGallery } from '../components/ui/ProductGallery';
import { RecipeCard } from '../components/ui/EditorialCards';
import { ProductGrid } from '../components/ui/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useShop();

  const product = getProductBySlug(slug || 'turmeric-powder') || PRODUCTS[0];

  const [selectedWeight, setSelectedWeight] = useState<SpiceWeight>(
    product.variants[0]?.weight || '100g'
  );
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setSelectedWeight(product.variants[0]?.weight || '100g');
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [product.id, product.variants]);

  const activeVariant =
    product.variants.find((v) => v.weight === selectedWeight) || product.variants[0];

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity, false);
    navigate('/checkout');
  };

  const matchingRecipes = RECIPES.filter((r) =>
    product.relatedRecipeSlugs.includes(r.slug)
  ).slice(0, 3);

  const complementaryProducts = PRODUCTS.filter(
    (p) => p.id !== product.id
  ).slice(0, 4);

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: `Aaranya Premium ${product.name}`,
    image: product.images.gallery.map((img) => `https://aaranyaspices.com${img}`),
    description: product.description,
    sku: activeVariant.sku,
    brand: {
      '@type': 'Brand',
      name: 'AARANYA SPICES'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount
    },
    offers: {
      '@type': 'Offer',
      url: `https://aaranyaspices.com/shop/${product.slug}`,
      priceCurrency: 'INR',
      price: activeVariant.price,
      availability: activeVariant.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock'
    }
  };

  const defaultFaqs =
    product.faqs.length > 0
      ? product.faqs
      : [
          {
            question: `How should I store Aaranya ${product.name}?`,
            answer: product.storageInstructions
          },
          {
            question: 'Does this spice contain any fillers or artificial colours?',
            answer: `No. ${product.ingredients}`
          },
          {
            question: 'What is the shelf life once opened?',
            answer: product.shelfLife
          }
        ];

  return (
    <>
      <SEOHead
        title={`Premium ${product.name} — AARANYA SPICES`}
        description={product.description}
        canonicalPath={`/shop/${product.slug}`}
        ogImage={product.images.primary}
        ogType="product"
        structuredData={productSchema}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            {
              label: product.categoryLabel,
              href: `/shop/${product.category}`
            },
            { label: product.name }
          ]}
        />

        {/* MAIN PRODUCT HERO: Left Gallery, Right Buy Box */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Large Product Photography Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images.gallery}
              alt={product.images.alt}
            />
          </div>

          {/* Right: Editorial Buy Box */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div>
              <p className="font-sans-ui text-xs uppercase tracking-[0.26em] text-[#6D4C38] font-semibold">
                AARANYA
              </p>
              <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-[42px] text-[#1C1B18] leading-[1.12] uppercase mt-1.5">
                {product.name.toUpperCase().startsWith('PREMIUM')
                  ? product.name.toUpperCase()
                  : `PREMIUM ${product.name.toUpperCase()}`}
              </h1>
              <p className="mt-2.5 text-sm md:text-base text-[#5A564E] leading-relaxed">
                {product.shortDescriptor}
              </p>

              <div className="mt-3 flex items-center gap-4">
                <Rating value={product.rating} count={product.reviewCount} size="md" />
                <span className="text-xs font-mono-spec text-[#847E74]">
                  SKU: {activeVariant.sku}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2DDD2]">
              <Price
                amount={activeVariant.price}
                compareAt={activeVariant.compareAtPrice}
                size="lg"
              />
              <p className="text-[11px] text-[#5A564E] mt-1">
                Inclusive of all taxes · Free shipping on orders above ₹999
              </p>
            </div>

            <p className="text-sm text-[#5A564E] leading-relaxed">
              {product.description}
            </p>

            {/* Aroma Profile Tags */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#6D4C38] mb-2 font-medium">
                Tasting & Aroma Notes
              </p>
              <div className="flex flex-wrap gap-2">
                {product.aromaNotes.map((note) => (
                  <span
                    key={note}
                    className="text-xs bg-[#EFECE3] border border-[#D5CFC2] px-3 py-1 text-[#1C1B18]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selector: 100g | 200g | 500g */}
            <div>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] mb-2.5">
                <span className="text-[#1C1B18] font-medium">Select Net Quantity</span>
                <span className="font-mono-spec text-[#6D4C38]">{selectedWeight}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.variants.map((variant) => {
                  const isSelected = variant.weight === selectedWeight;
                  return (
                    <button
                      key={variant.sku}
                      type="button"
                      onClick={() => setSelectedWeight(variant.weight)}
                      className={`py-3 px-4 border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#182B21] text-[#F7F4ED] border-[#182B21]'
                          : 'bg-[#EFECE3]/60 text-[#1C1B18] border-[#D5CFC2] hover:border-[#182B21]'
                      }`}
                    >
                      <span className="block font-mono-spec text-sm font-medium">
                        {variant.weight}
                      </span>
                      <span
                        className={`block text-xs font-mono-spec mt-0.5 ${
                          isSelected ? 'text-[#C89236]' : 'text-[#5A564E]'
                        }`}
                      >
                        ₹{variant.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector + Large ADD TO CART + Secondary BUY NOW */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center border border-[#D5CFC2] bg-[#EFECE3]/60 h-12">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="px-3.5 h-full text-[#1C1B18] hover:bg-[#E2DDD2] cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 font-mono-spec text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="px-3.5 h-full text-[#1C1B18] hover:bg-[#E2DDD2] cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  className="h-12"
                >
                  ADD TO CART · ₹{(activeVariant.price * quantity).toLocaleString('en-IN')}
                </Button>
              </div>

              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={handleBuyNow}
              >
                BUY NOW
              </Button>
            </div>

            {/* Subtle Trust Reassurance */}
            <div className="pt-4 border-t border-[#E2DDD2] grid grid-cols-3 gap-3 text-[11px] text-[#5A564E]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#182B21] shrink-0" />
                <span>Pure Ingredients</span>
              </div>
              <div className="flex items-center gap-2">
                <Package size={15} className="text-[#182B21] shrink-0" />
                <span>Amber Glass Jar</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={15} className="text-[#182B21] shrink-0" />
                <span>Pan-India Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* STRUCTURED PRODUCT DETAILS & EDITORIAL STORY */}
        <section className="mt-20 md:mt-28 pt-16 border-t border-[#E2DDD2] grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Editorial Note & Why You'll Love It & How to Use */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D4C38] mb-2">
                In the Indian Kitchen
              </p>
              <h2 className="font-serif-editorial text-3xl text-[#1C1B18]">
                Why You&apos;ll Love It
              </h2>
              <p className="mt-3 text-base text-[#5A564E] leading-relaxed">
                {product.editorialStory}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {product.whyYouWillLoveIt.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-[#EFECE3] border border-[#E2DDD2]"
                  >
                    <h3 className="font-serif-editorial text-xl text-[#1C1B18]">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#5A564E] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Use */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D4C38] mb-2">
                Culinary Applications
              </p>
              <h2 className="font-serif-editorial text-3xl text-[#1C1B18]">
                How to Use
              </h2>
              <ul className="mt-4 space-y-3">
                {product.culinaryUses.map((use, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-[#EFECE3]/50 border border-[#E2DDD2] text-sm text-[#1C1B18]"
                  >
                    <span className="font-mono-spec text-xs text-[#6D4C38] mt-0.5">
                      0{idx + 1}
                    </span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Technical Product Specification Table */}
          <div className="lg:col-span-5">
            <div className="bg-[#EFECE3] border border-[#E2DDD2] p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D4C38] mb-1">
                Specification Ledger
              </p>
              <h2 className="font-serif-editorial text-2xl text-[#1C1B18] pb-4 border-b border-[#D5CFC2]">
                Product Details
              </h2>

              <dl className="divide-y divide-[#D5CFC2] text-sm">
                <div className="py-3.5 grid grid-cols-3 gap-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#5A564E]">
                    Ingredients
                  </dt>
                  <dd className="col-span-2 text-[#1C1B18]">{product.ingredients}</dd>
                </div>
                <div className="py-3.5 grid grid-cols-3 gap-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#5A564E]">
                    Origin
                  </dt>
                  <dd className="col-span-2 font-mono-spec text-xs text-[#1C1B18]">
                    {product.origin}
                  </dd>
                </div>
                <div className="py-3.5 grid grid-cols-3 gap-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#5A564E]">
                    Net Quantity
                  </dt>
                  <dd className="col-span-2 font-mono-spec text-xs text-[#1C1B18]">
                    {selectedWeight} (Available in 100g, 200g, 500g)
                  </dd>
                </div>
                <div className="py-3.5 grid grid-cols-3 gap-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#5A564E]">
                    Processing
                  </dt>
                  <dd className="col-span-2 text-[#1C1B18]">{product.processing}</dd>
                </div>
                <div className="py-3.5 grid grid-cols-3 gap-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#5A564E]">
                    Packaging
                  </dt>
                  <dd className="col-span-2 text-[#1C1B18]">{product.packaging}</dd>
                </div>
                <div className="py-3.5 grid grid-cols-3 gap-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#5A564E]">
                    Shelf Life
                  </dt>
                  <dd className="col-span-2 text-[#1C1B18]">{product.shelfLife}</dd>
                </div>
                <div className="py-3.5 grid grid-cols-3 gap-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#5A564E]">
                    Storage
                  </dt>
                  <dd className="col-span-2 text-[#1C1B18]">
                    {product.storageInstructions}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* RECIPES USING THIS SPICE */}
        <section className="mt-20 md:mt-28 pt-16 border-t border-[#E2DDD2]">
          <SectionHeader
            eyebrow="From Our Kitchen"
            title={`COOK WITH ${product.name.toUpperCase()}`}
            subtitle="Recipes designed around the aroma and character of this spice."
            align="left"
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {matchingRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* CUSTOMER REVIEWS WITH RATING BREAKDOWN */}
        <section className="mt-20 md:mt-28 pt-16 border-t border-[#E2DDD2]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D4C38]">
                Verified Home Cooks
              </p>
              <h2 className="font-serif-editorial text-3xl text-[#1C1B18]">
                Customer Reviews
              </h2>
              <div className="flex items-baseline gap-3">
                <span className="font-serif-editorial text-5xl text-[#1C1B18]">
                  {product.rating.toFixed(1)}
                </span>
                <div>
                  <Rating value={product.rating} showText={false} size="md" />
                  <p className="text-xs text-[#5A564E] mt-1">
                    Based on {product.reviewCount} verified reviews
                  </p>
                </div>
              </div>

              {/* Rating Breakdown Bars */}
              <div className="space-y-2 pt-3">
                {[
                  { stars: 5, pct: 92 },
                  { stars: 4, pct: 8 },
                  { stars: 3, pct: 0 },
                  { stars: 2, pct: 0 },
                  { stars: 1, pct: 0 }
                ].map((row) => (
                  <div
                    key={row.stars}
                    className="flex items-center gap-3 text-xs font-mono-spec text-[#5A564E]"
                  >
                    <span className="w-10">{row.stars} ★</span>
                    <div className="flex-1 h-1.5 bg-[#E2DDD2]">
                      <div
                        className="h-full bg-[#182B21]"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-9 text-right">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {product.reviews.length === 0 ? (
                <div className="p-8 bg-[#EFECE3]/60 border border-[#E2DDD2]">
                  <p className="font-serif-editorial text-2xl text-[#1C1B18]">
                    Rated {product.rating.toFixed(1)} / 5 by Aaranya customers
                  </p>
                  <p className="mt-2 text-sm text-[#5A564E]">
                    Every batch is evaluated for aroma, freshness, and culinary performance.
                  </p>
                </div>
              ) : (
                product.reviews.map((rev) => (
                  <article
                    key={rev.id}
                    className="p-6 bg-[#EFECE3]/50 border border-[#E2DDD2] space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Rating value={rev.rating} showText={false} />
                      <span className="text-xs font-mono-spec text-[#847E74]">
                        {rev.date} · Pack: {rev.variantPurchased}
                      </span>
                    </div>
                    <h3 className="font-serif-editorial text-xl text-[#1C1B18]">
                      {rev.title}
                    </h3>
                    <p className="text-sm text-[#5A564E] leading-relaxed">
                      {rev.comment}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs text-[#182B21]">
                      <CheckCircle2 size={13} />
                      <span className="font-medium">
                        {rev.author}, {rev.location}
                      </span>
                      <span className="text-[#847E74]">· Verified Purchase</span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        {/* PRODUCT FAQ ACCORDION */}
        <section className="mt-20 md:mt-28 pt-16 border-t border-[#E2DDD2] max-w-3xl">
          <SectionHeader
            eyebrow="Questions & Care"
            title="FREQUENTLY ASKED QUESTIONS"
            align="left"
            className="mb-8"
          />
          <Accordion items={defaultFaqs} />
          <p className="mt-6 text-xs text-[#5A564E]">
            Have another question about this spice?{' '}
            <Link to="/contact" className="text-[#182B21] underline">
              Reach out to our kitchen team
            </Link>
            .
          </p>
        </section>

        {/* COMPLEMENTARY SPICES */}
        <section className="mt-20 md:mt-28 pt-16 border-t border-[#E2DDD2]">
          <SectionHeader
            eyebrow="Complete Your Masala Dani"
            title="COMPLEMENTARY SPICES"
            align="left"
            className="mb-10"
          />
          <ProductGrid products={complementaryProducts} />
        </section>
      </div>
    </>
  );
};
