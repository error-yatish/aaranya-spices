import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Flame,
  PackageCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { PRODUCTS, CATEGORIES_METADATA } from '../data/catalog';
import { RECIPES } from '../data/recipes';
import { JOURNAL_ARTICLES } from '../data/journal';
import { SectionHeader } from '../components/ui/Primitives';
import { ProductGrid } from '../components/ui/ProductCard';
import {
  CategoryCard,
  RecipeCard,
  ArticleCard,
  Newsletter
} from '../components/ui/EditorialCards';
import { IndiaSourcingMap } from '../components/layout/IndiaSourcingMap';

const TRUST_PILLARS = [
  {
    title: 'Carefully Selected',
    description: 'Spices chosen for quality, aroma and flavour.',
    icon: <Sparkles size={22} strokeWidth={1.4} />
  },
  {
    title: 'Pure Ingredients',
    description: 'No unnecessary fillers or artificial ingredients.',
    icon: <ShieldCheck size={22} strokeWidth={1.4} />
  },
  {
    title: 'Authentic Flavour',
    description: 'Spices selected to preserve their natural character.',
    icon: <Flame size={22} strokeWidth={1.4} />
  },
  {
    title: 'Thoughtfully Crafted',
    description: 'Handled and packaged with care.',
    icon: <PackageCheck size={22} strokeWidth={1.4} />
  },
  {
    title: 'Quality You Can Trace',
    description: 'Provide transparent sourcing information wherever applicable.',
    icon: <Compass size={22} strokeWidth={1.4} />
  }
];

export const HomePage: React.FC = () => {
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);

  return (
    <>
      <SEOHead
        title="AARANYA SPICES — The Essence of Indian Spices | Pure. Rich. Authentic."
        description="Pure, aromatic Indian spices selected with care to bring depth, warmth and character to everyday cooking. Shop whole spices, ground spices, and blends."
        canonicalPath="/"
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[84vh] lg:min-h-[88vh] flex items-end md:items-center bg-[#182B21] overflow-hidden">
        <img
          src="/images/hero-spices.jpg"
          alt="Aaranya Spices — whole Indian spices, turmeric, black pepper, green cardamom, cinnamon and red chillies on aged wood and linen"
          fetchPriority="high"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D16]/90 via-[#0F1D16]/60 to-[#0F1D16]/25" />

        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-12 py-20 md:py-28">
          <div className="max-w-2xl text-[#F7F4ED]">
            <p className="font-sans-ui text-xs uppercase tracking-[0.26em] text-[#C89236] mb-5 font-medium">
              Pure. Rich. Authentic.
            </p>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.06] tracking-[0.02em] font-normal uppercase text-[#F7F4ED]">
              THE ESSENCE OF INDIAN SPICES
            </h1>
            <p className="mt-6 text-base md:text-lg text-[#E2DDD2]/90 max-w-xl leading-relaxed font-light">
              Pure, aromatic spices selected with care to bring depth, warmth and character to everyday cooking.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="bg-[#C89236] hover:bg-[#b5812b] text-[#182B21] font-sans-ui text-xs uppercase tracking-[0.18em] font-semibold px-8 py-4 transition-colors"
              >
                SHOP SPICES
              </Link>
              <Link
                to="/about"
                className="bg-transparent hover:bg-[#F7F4ED]/10 text-[#F7F4ED] border border-[#F7F4ED]/70 font-sans-ui text-xs uppercase tracking-[0.18em] font-medium px-8 py-4 transition-colors"
              >
                DISCOVER AARANYA
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND INTRODUCTION */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="font-sans-ui text-[11px] uppercase tracking-[0.22em] text-[#6D4C38] font-medium">
              Our Philosophy
            </p>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#1C1B18] leading-[1.12] tracking-[0.02em]">
              ROOTED IN NATURE. INSPIRED BY INDIA.
            </h2>
            <p className="text-base md:text-lg text-[#5A564E] leading-relaxed">
              Aaranya brings together the richness of India&apos;s spice heritage with a modern approach to quality and craftsmanship. Every spice is selected for its character, aroma and flavour—so the simplest ingredients can create extraordinary food.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-3 bg-[#182B21] hover:bg-[#0F1D16] text-[#F7F4ED] font-sans-ui text-xs uppercase tracking-[0.18em] px-7 py-4 transition-colors"
              >
                <span>OUR STORY</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] bg-[#EFECE3] border border-[#E2DDD2] overflow-hidden">
              <img
                src="/images/brand-story.jpg"
                alt="Hand-carved stone mortar and pestle with whole Indian cumin, coriander seeds, black pepper and fresh curry leaves"
                loading="lazy"
                width={960}
                height={720}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="py-16 md:py-24 bg-[#EFECE3] border-t border-b border-[#E2DDD2]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader
            eyebrow="Curated Pantry"
            title="EXPLORE BY COLLECTION"
            subtitle="From whole harvests for your tempering ladle to small-batch milled powders and finishing blends."
            className="mb-12 md:mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {CATEGORIES_METADATA.map((cat) => (
              <CategoryCard
                key={cat.slug}
                slug={cat.slug}
                title={cat.title}
                subtitle={cat.subtitle}
                image={cat.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS — THE AARANYA ESSENTIALS */}
      <section className="py-20 md:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <SectionHeader
            eyebrow="Foundational Spices"
            title="THE AARANYA ESSENTIALS"
            subtitle="Eight everyday cornerstones of the Indian kitchen, selected for volatile oil richness and unmistakable character."
            align="left"
          />
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#182B21] font-semibold border-b border-[#182B21] pb-1 self-start md:self-auto hover:text-[#6D4C38] hover:border-[#6D4C38] transition-colors"
          >
            <span>View Full Catalogue</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={bestsellers} />
      </section>

      {/* 5. QUALITY / TRUST SECTION */}
      <section className="py-20 md:py-28 bg-[#182B21] text-[#F7F4ED] border-t border-b border-[#2A4435]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader
            eyebrow="The Aaranya Standard"
            title="UNCOMPROMISING BY NATURE"
            subtitle="Why Aaranya exists: a quiet commitment to purity, aroma, and honest stewardship."
            light
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {TRUST_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 border border-[#2B4637] bg-[#0F1D16]/50 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 border border-[#C89236]/50 text-[#C89236] flex items-center justify-center mb-5">
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif-editorial text-2xl text-[#F7F4ED]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#E2DDD2]/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <span className="mt-6 text-[10px] font-mono-spec text-[#C89236]/70 uppercase tracking-[0.2em]">
                  0{idx + 1} / Pillar
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SIGNATURE PRODUCT STORY */}
      <section className="py-20 md:py-32 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#EFECE3] border border-[#E2DDD2] overflow-hidden">
          <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
            <img
              src="/images/signature-turmeric.jpg"
              alt="Whole cured turmeric roots snapped open beside finely ground golden turmeric powder on dark slate"
              loading="lazy"
              width={1100}
              height={750}
              className="w-full h-full object-cover object-center image-zoom-slow hover:scale-105"
            />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 lg:pr-14 space-y-6">
            <div className="inline-block px-3 py-1 bg-[#C89236]/20 border border-[#C89236]/50 text-[#6D4C38] text-[10px] uppercase tracking-[0.2em] font-semibold">
              Signature Harvest Story
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6D4C38] font-medium">
              Premium Turmeric
            </p>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-[42px] text-[#1C1B18] leading-[1.12]">
              THE GOLDEN HEART OF THE INDIAN KITCHEN
            </h2>
            <p className="text-sm md:text-base text-[#5A564E] leading-relaxed">
              Milled in small batches from whole, sun-cured turmeric rhizomes selected for their deep orange-gold interior and warm, ginger-woody fragrance. A single half-teaspoon blooms in warm ghee to anchor everyday dals, curries, and marinades.
            </p>
            <div className="pt-2">
              <Link
                to="/shop/turmeric-powder"
                className="inline-flex items-center gap-3 bg-[#182B21] hover:bg-[#0F1D16] text-[#F7F4ED] font-sans-ui text-xs uppercase tracking-[0.18em] px-8 py-4 transition-colors"
              >
                <span>EXPLORE TURMERIC</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ORIGIN / SOURCING SECTION */}
      <section className="py-20 md:py-28 bg-[#F7F4ED] border-t border-[#E2DDD2]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <SectionHeader
            eyebrow="Seed to Jar Traceability"
            title="KNOW WHERE YOUR SPICES BEGIN"
            subtitle="From India's spice-growing regions to your kitchen, we believe better flavour begins with knowing the ingredient and respecting where it comes from."
            className="mb-14"
          />

          <IndiaSourcingMap />
        </div>
      </section>

      {/* 8. EDITORIAL RECIPES PREVIEW — COOK WITH AARANYA */}
      <section className="py-20 md:py-28 bg-[#EFECE3] border-t border-[#E2DDD2]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <SectionHeader
              eyebrow="Culinary Inspiration"
              title="COOK WITH AARANYA"
              subtitle="Dishes that celebrate the interplay of whole tempering seeds, freshly ground powders, and finishing blends."
              align="left"
            />
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#182B21] font-semibold border-b border-[#182B21] pb-1 self-start md:self-auto"
            >
              <span>Explore All Recipes</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {RECIPES.slice(0, 3).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. EDITORIAL JOURNAL PREVIEW */}
      <section className="py-20 md:py-28 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <SectionHeader
            eyebrow="The Spice Monograph"
            title="FROM THE AARANYA JOURNAL"
            subtitle="Essays on Indian spice origins, regional techniques, and the quiet craft of the pantry."
            align="left"
          />
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#182B21] font-semibold border-b border-[#182B21] pb-1 self-start md:self-auto"
          >
            <span>Read The Journal</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {JOURNAL_ARTICLES.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* 10. NEWSLETTER SECTION */}
      <Newsletter variant="section" />
    </>
  );
};
