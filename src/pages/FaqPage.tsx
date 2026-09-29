import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs, Accordion } from '../components/ui/Primitives';

const FAQ_SECTIONS = [
  {
    category: 'Spices, Purity & Packaging',
    items: [
      {
        question: 'Do Aaranya spices contain any added colours, starches, or anti-caking agents?',
        answer:
          'No. Every Aaranya single-origin ground spice and whole spice is 100% pure spice with no artificial colours, added starches, or synthetic anti-caking agents.'
      },
      {
        question: 'Why does Aaranya pack spices in amber glass jars?',
        answer:
          'Ultraviolet light and kitchen humidity are the two primary enemies of volatile spice oils and natural pigments. Amber apothecary glass shields spices from light while keeping them airtight.'
      },
      {
        question: 'How should I store my spices at home, especially during the monsoon?',
        answer:
          'Store your jars in a cool, dark cabinet away from direct sunlight and stove steam. Always use a dry spoon when scooping ground spices, and tighten the lid immediately after use.'
      }
    ]
  },
  {
    category: 'Orders, Shipping & Returns',
    items: [
      {
        question: 'What are the shipping charges and free-shipping threshold?',
        answer:
          'We offer complimentary standard shipping across India on all orders above ₹999. For orders below ₹999, a flat ₹85 standard shipping fee applies.'
      },
      {
        question: 'How long will my order take to arrive?',
        answer:
          'Orders are dispatched within 24–48 hours. Standard delivery takes 4–6 business days across India, while Priority Express Air takes 2–3 business days.'
      },
      {
        question: 'What if a glass jar arrives damaged in transit?',
        answer:
          'Every jar is packed in custom protective corrugated sleeves. In the rare event of transit breakage, share a photograph within 48 hours of delivery via our Contact page for an immediate replacement or full refund.'
      }
    ]
  }
];

export const FaqPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Frequently Asked Questions — AARANYA SPICES"
        description="Answers to common questions about Aaranya Spices purity, storage, amber glass packaging, shipping, and orders."
        canonicalPath="/faq"
      />

      <section className="bg-[#EFECE3] border-b border-[#E2DDD2] py-14 md:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
          <div className="max-w-2xl mt-4 space-y-3">
            <p className="text-xs uppercase tracking-[0.22em] text-[#6D4C38]">
              Kitchen & Order Guidance
            </p>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl text-[#1C1B18] uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-14">
        {FAQ_SECTIONS.map((group, idx) => (
          <div key={idx} className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#6D4C38] font-semibold">
              {group.category}
            </h2>
            <Accordion items={group.items} defaultOpenIndex={0} />
          </div>
        ))}

        <div className="p-8 bg-[#EFECE3] border border-[#E2DDD2] text-center space-y-3">
          <h3 className="font-serif-editorial text-2xl text-[#1C1B18]">
            Still have a question?
          </h3>
          <p className="text-sm text-[#5A564E]">
            Our kitchen team is happy to help with spice pairings, recipes, or order enquiries.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-2 bg-[#182B21] text-[#F7F4ED] text-xs uppercase tracking-[0.18em] px-7 py-3.5"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
};
