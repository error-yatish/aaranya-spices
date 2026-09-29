import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Primitives';
import { IndiaSourcingMap } from '../components/layout/IndiaSourcingMap';
import { Newsletter } from '../components/ui/EditorialCards';

export const SourcingPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Our Sourcing — Know Where Your Spices Begin | AARANYA SPICES"
        description="From India's spice-growing regions to your kitchen, discover Aaranya's approach to thoughtful sourcing, cleaning, small-batch processing, and packaging."
        canonicalPath="/sourcing"
      />

      <section className="bg-[#EFECE3] border-b border-[#E2DDD2] py-14 md:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: 'Our Sourcing' }]}
          />
          <div className="max-w-3xl mt-4 space-y-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[#6D4C38] font-medium">
              Traceability & Stewardship
            </p>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl text-[#1C1B18] uppercase">
              KNOW WHERE YOUR SPICES BEGIN
            </h1>
            <p className="text-base md:text-lg text-[#5A564E] leading-relaxed">
              From India&apos;s spice-growing regions to your kitchen, we believe better flavour begins with knowing the ingredient and respecting where it comes from.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24 space-y-16">
        <IndiaSourcingMap />

        <div className="p-8 sm:p-12 bg-[#182B21] text-[#F7F4ED] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C89236]">
              Transparency Note
            </p>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl">
              Honest Labelling on Every Jar
            </h2>
            <p className="text-sm text-[#E2DDD2]/80 leading-relaxed">
              Each lot records its harvest region ([SOURCING REGION]), packaging date, and quality verification reference ([CERTIFICATION]).
            </p>
          </div>
          <Link
            to="/shop"
            className="bg-[#C89236] hover:bg-[#b5812b] text-[#182B21] text-xs uppercase tracking-[0.18em] font-semibold px-8 py-4 shrink-0"
          >
            SHOP THE COLLECTION
          </Link>
        </div>
      </section>

      <Newsletter variant="section" />
    </>
  );
};
