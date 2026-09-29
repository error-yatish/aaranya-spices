import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { Breadcrumbs } from '../components/ui/Primitives';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'shipping-returns';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      canonical: '/privacy',
      subtitle: 'How Aaranya Spices collects, uses, and safeguards your personal information.',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'When you place an order or subscribe to The Aaranya Table, we collect the personal details necessary to fulfil your request—including your name, delivery address, email address, and mobile number.'
        },
        {
          heading: '2. How We Use Your Data',
          body: 'Your contact and address details are used strictly to process orders, coordinate courier delivery across India, send order updates, and—only where you opt in—share occasional dispatches from our kitchen.'
        },
        {
          heading: '3. Data Protection & Contact',
          body: 'We never sell or rent customer lists to third-party advertisers. For any privacy requests or data deletion inquiries, write to us at [CONTACT EMAIL] or [BUSINESS ADDRESS].'
        }
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      canonical: '/terms',
      subtitle: 'Terms governing the use of the Aaranya Spices website and purchase of products.',
      sections: [
        {
          heading: '1. Product Information & Pricing',
          body: 'All Aaranya Spices products are listed in Indian Rupees (INR) inclusive of applicable GST. Because our spices are natural agricultural products, slight seasonal variations in colour and aroma are normal signs of unblended purity.'
        },
        {
          heading: '2. Orders & Availability',
          body: 'We mill and pack in small batches. In the rare event that a selected weight variant becomes unavailable after order placement, we will notify you promptly to offer an alternative pack size or an immediate full refund.'
        },
        {
          heading: '3. Registered Office',
          body: 'AARANYA SPICES operates from [BUSINESS ADDRESS]. Reach our support desk at [CONTACT EMAIL] or [PHONE].'
        }
      ]
    },
    'shipping-returns': {
      title: 'Shipping, Returns & Refund Policy',
      canonical: '/shipping-returns',
      subtitle: 'Information on pan-India dispatch timelines, free shipping thresholds, and replacements.',
      sections: [
        {
          heading: '1. Pan-India Shipping & Free Shipping Threshold',
          body: 'We offer complimentary standard shipping on all orders above ₹999. Orders below ₹999 incur a flat ₹85 standard shipping fee (4–6 business days) or ₹160 for Priority Express Air (2–3 business days).'
        },
        {
          heading: '2. Protective Packaging',
          body: 'All amber glass jars are cushioned in recyclable honeycomb and corrugated protective sleeves designed to withstand long-distance courier transit.'
        },
        {
          heading: '3. Returns, Replacements & Refunds',
          body: 'Because food and spice products are perishable and sealed for hygiene, opened jars cannot be returned. However, if your order arrives damaged in transit or with an incorrect item, please contact us at [CONTACT EMAIL] or [PHONE] within 48 hours of delivery with a photograph for a complimentary replacement or full refund to your original payment method within 5–7 business days.'
        }
      ]
    }
  };

  const active = contentMap[type];

  return (
    <>
      <SEOHead
        title={`${active.title} — AARANYA SPICES`}
        description={active.subtitle}
        canonicalPath={active.canonical}
      />

      <section className="bg-[#EFECE3] border-b border-[#E2DDD2] py-14 md:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[{ label: 'Home', href: '/' }, { label: active.title }]}
          />
          <h1 className="font-serif-editorial text-4xl sm:text-5xl text-[#1C1B18] mt-3 uppercase">
            {active.title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#5A564E]">
            {active.subtitle}
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-14 md:py-20 space-y-10">
        {active.sections.map((sec, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 bg-[#EFECE3]/50 border border-[#E2DDD2] space-y-3"
          >
            <h2 className="font-serif-editorial text-2xl text-[#1C1B18]">
              {sec.heading}
            </h2>
            <p className="text-sm md:text-base text-[#5A564E] leading-relaxed">
              {sec.body}
            </p>
          </div>
        ))}
      </section>
    </>
  );
};
