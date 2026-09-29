import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs, SectionHeader } from '../components/ui/Primitives';
import { Newsletter } from '../components/ui/EditorialCards';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="The Story of Aaranya — About Us | AARANYA SPICES"
        description="Aaranya represents the connection between nature, Indian spice heritage and exceptional flavour. Learn why Aaranya exists and our philosophy of quality."
        canonicalPath="/about"
      />

      {/* Hero Banner */}
      <section className="bg-[#182B21] text-[#F7F4ED] py-20 md:py-28 px-4 sm:px-6 lg:px-12 border-b border-[#2A4435]">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'About Aaranya' }]}
            className="text-[#E2DDD2]/70"
          />
          <div className="max-w-3xl mt-6 space-y-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[#C89236] font-medium">
              Pure. Rich. Authentic.
            </p>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.08]">
              THE STORY OF AARANYA
            </h1>
            <p className="text-base md:text-lg text-[#E2DDD2]/85 leading-relaxed">
              Aaranya represents the connection between nature, Indian spice heritage and exceptional flavour.
            </p>
          </div>
        </div>
      </section>

      {/* Main Editorial Story */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24 space-y-24">
        {/* Section 1: Why Aaranya Exists */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6D4C38] font-medium">
              01 · Why Aaranya Exists
            </p>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#1C1B18] leading-tight">
              Restoring Reverence to the Everyday Spice Box
            </h2>
            <p className="text-base text-[#5A564E] leading-relaxed">
              In Indian kitchens, spices are never an afterthought—they are the architecture of flavour. Yet over time, the everyday packaged spice shelf became defined by loud packaging, long warehouse storage, and muted aroma.
            </p>
            <p className="text-base text-[#5A564E] leading-relaxed">
              Aaranya was created to return quiet focus to the ingredient itself: whole seeds, barks, pods, and small-batch ground powders chosen for their natural richness, volatile aroma, and culinary honesty.
            </p>
            <div className="p-5 bg-[#EFECE3] border-l-2 border-[#C89236] text-xs font-mono-spec text-[#5A564E]">
              Founder & Origin Background: [FOUNDER STORY]
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] bg-[#EFECE3] border border-[#E2DDD2] overflow-hidden">
              <img
                src="/images/brand-story.jpg"
                alt="Handcrafted mortar and pestle with whole Indian spices"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Quality Philosophy & Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#E2DDD2]">
          <div className="p-8 bg-[#EFECE3] border border-[#E2DDD2] space-y-3">
            <span className="text-xs font-mono-spec text-[#6D4C38]">02 · Respect for Indian Spices</span>
            <h3 className="font-serif-editorial text-2xl text-[#1C1B18]">
              Botanical Integrity
            </h3>
            <p className="text-sm text-[#5A564E] leading-relaxed">
              Every spice is an agricultural harvest with its own essential oil profile. We select whole lots that preserve natural colour and character without artificial dyes or unnecessary fillers.
            </p>
          </div>

          <div className="p-8 bg-[#EFECE3] border border-[#E2DDD2] space-y-3">
            <span className="text-xs font-mono-spec text-[#6D4C38]">03 · Craftsmanship</span>
            <h3 className="font-serif-editorial text-2xl text-[#1C1B18]">
              Small-Batch Milling & Protective Glass
            </h3>
            <p className="text-sm text-[#5A564E] leading-relaxed">
              Ground spices lose their delicate top notes when exposed to light and air. We mill in controlled runs and pack in UV-shielded amber glass jars to protect aroma on your kitchen shelf.
            </p>
          </div>

          <div className="p-8 bg-[#EFECE3] border border-[#E2DDD2] space-y-3">
            <span className="text-xs font-mono-spec text-[#6D4C38]">04 · Sourcing & Traceability</span>
            <h3 className="font-serif-editorial text-2xl text-[#1C1B18]">
              Transparent Documentation
            </h3>
            <p className="text-sm text-[#5A564E] leading-relaxed">
              We believe in clear, factual sourcing records across [SOURCING REGION] and verified compliance standards ([CERTIFICATION]) without exaggerated claims.
            </p>
          </div>
        </div>

        {/* Section 3: The Future of the Brand */}
        <div className="bg-[#EFECE3] border border-[#E2DDD2] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <SectionHeader
              eyebrow="Looking Ahead"
              title="THE FUTURE OF AARANYA"
              align="left"
            />
            <p className="text-sm md:text-base text-[#5A564E] leading-relaxed max-w-2xl">
              Our ambition is simple: to build a trusted Indian pantry house that celebrates regional harvests, heirloom spice varieties, and timeless home cooking—one thoughtfully packed jar at a time.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/sourcing"
              className="inline-flex items-center gap-3 bg-[#182B21] hover:bg-[#0F1D16] text-[#F7F4ED] text-xs uppercase tracking-[0.18em] px-8 py-4 transition-colors"
            >
              <span>Explore Our Sourcing</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Newsletter variant="section" />
    </>
  );
};
