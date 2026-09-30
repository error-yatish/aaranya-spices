# Content & Placeholders Guide

In accordance with the **Aaranya Spices Content Rule**, no unverified factual claims (such as unverified organic certifications, laboratory claims, or fabricated farm names) have been invented. Instead, clearly marked placeholders are used wherever official business data should be inserted.

---

## Placeholder Reference Table

| Placeholder Token | Where It Appears | What to Replace It With |
| :--- | :--- | :--- |
| `[FOUNDER STORY]` | [`src/pages/AboutPage.tsx`](../src/pages/AboutPage.tsx) | Your authentic founder story, inspiration, and founding year. |
| `[SOURCING REGION]` | [`src/data/catalog.ts`](../src/data/catalog.ts), [`src/components/layout/IndiaSourcingMap.tsx`](../src/components/layout/IndiaSourcingMap.tsx), [`supabase/seed.sql`](../supabase/seed.sql) | Verified district/state origins for each spice lot (e.g., Erode/Sangli for Turmeric, Byadgi/Kashmir for Chilli, Idukki for Cardamom, Unjha for Cumin). |
| `[CERTIFICATION]` | [`src/data/catalog.ts`](../src/data/catalog.ts), [`src/pages/AboutPage.tsx`](../src/pages/AboutPage.tsx), [`src/pages/SourcingPage.tsx`](../src/pages/SourcingPage.tsx) | Your official FSSAI License Number, Spice Board registration, or ISO/lab report reference. |
| `[CONTACT EMAIL]` | [`src/pages/ContactPage.tsx`](../src/pages/ContactPage.tsx), [`src/pages/LegalPage.tsx`](../src/pages/LegalPage.tsx), [`src/components/seo/SEOHead.tsx`](../src/components/seo/SEOHead.tsx) | Official customer support email (e.g., `care@aaranyaspices.com`). |
| `[PHONE]` | [`src/pages/ContactPage.tsx`](../src/pages/ContactPage.tsx), [`src/pages/LegalPage.tsx`](../src/pages/LegalPage.tsx), [`src/components/seo/SEOHead.tsx`](../src/components/seo/SEOHead.tsx) | Official customer care / WhatsApp number (e.g., `+91 98XXXXXXXX`). |
| `[BUSINESS ADDRESS]` | [`src/pages/ContactPage.tsx`](../src/pages/ContactPage.tsx), [`src/pages/LegalPage.tsx`](../src/pages/LegalPage.tsx) | Registered corporate & dispatch kitchen address. |

---

## Replacing the Temporary Wordmark Logo with an SVG/PNG Asset

Currently, [`src/components/ui/Logo.tsx`](../src/components/ui/Logo.tsx) renders the clean two-line **AARANYA / SPICES** wordmark supporting both dark forest green and warm ivory backgrounds.

When your final vector logo file is ready:
1. Place `logo-dark.svg` and `logo-light.svg` in `public/images/`.
2. Update [`src/components/ui/Logo.tsx`](../src/components/ui/Logo.tsx) to render `<img src={variant === 'light' ? '/images/logo-light.svg' : '/images/logo-dark.svg'} alt="AARANYA SPICES" />`.
