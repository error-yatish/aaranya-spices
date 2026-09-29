import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = 'https://aaranyaspices.com';

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AARANYA SPICES',
  slogan: 'Pure. Rich. Authentic.',
  description: 'The Essence of Indian Spices — Premium whole spices, ground spices and spice blends.',
  url: BASE_URL,
  logo: `${BASE_URL}/images/hero-spices.jpg`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: '[CONTACT EMAIL]',
    telephone: '[PHONE]'
  }
};

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '/',
  ogImage = '/images/hero-spices.jpg',
  ogType = 'website',
  structuredData
}) => {
  useEffect(() => {
    const fullTitle = title.includes('AARANYA') ? title : `${title} | AARANYA SPICES`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('property=')) {
          const propMatch = selector.match(/property="([^"]+)"/);
          if (propMatch) el.setAttribute('property', propMatch[1]);
        } else {
          const nameMatch = selector.match(/name="([^"]+)"/);
          if (nameMatch) el.setAttribute('name', nameMatch[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', ogType);
    setMeta('meta[property="og:image"]', 'content', ogImage);

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', `${BASE_URL}${canonicalPath}`);
  }, [title, description, canonicalPath, ogImage, ogType]);

  const schemas = structuredData
    ? Array.isArray(structuredData)
      ? [ORGANIZATION_SCHEMA, ...structuredData]
      : [ORGANIZATION_SCHEMA, structuredData]
    : [ORGANIZATION_SCHEMA];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
