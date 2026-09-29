import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { getJournalBySlug, JOURNAL_ARTICLES } from '../data/journal';
import { getProductBySlug } from '../data/catalog';
import { Breadcrumbs, SectionHeader } from '../components/ui/Primitives';
import { ProductGrid } from '../components/ui/ProductCard';
import { ArticleCard } from '../components/ui/EditorialCards';

export const JournalDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getJournalBySlug(slug || '') || JOURNAL_ARTICLES[0];

  const relatedProducts = article.relatedProductSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const moreArticles = JOURNAL_ARTICLES.filter((a) => a.id !== article.id).slice(
    0,
    3
  );

  return (
    <>
      <SEOHead
        title={`${article.title} — The Aaranya Journal`}
        description={article.excerpt}
        canonicalPath={`/journal/${article.slug}`}
        ogImage={article.heroImage}
        ogType="article"
      />

      <article className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-14">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Journal', href: '/journal' },
            { label: article.title }
          ]}
        />

        {/* Article Header */}
        <header className="max-w-3xl mx-auto text-center mt-6 space-y-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[#6D4C38] font-medium">
            {article.topic} · {article.readTime}
          </p>
          <h1 className="font-serif-editorial text-3xl sm:text-5xl text-[#1C1B18] leading-[1.12]">
            {article.title}
          </h1>
          <p className="text-base md:text-lg text-[#5A564E] leading-relaxed">
            {article.subtitle}
          </p>
          <p className="text-xs font-mono-spec text-[#847E74] pt-2">
            By {article.author} · {article.publishedAt}
          </p>
        </header>

        {/* Hero Image */}
        <div className="mt-10 max-w-5xl mx-auto aspect-[16/9] bg-[#EFECE3] border border-[#E2DDD2] overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.title}
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Editorial Prose */}
        <div className="mt-12 max-w-2xl mx-auto space-y-10">
          {article.sections.map((sec, idx) => (
            <section key={idx} className="space-y-5">
              {sec.heading && (
                <h2 className="font-serif-editorial text-3xl text-[#1C1B18]">
                  {sec.heading}
                </h2>
              )}
              {sec.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base md:text-[17px] text-[#1C1B18]/90 leading-[1.8]"
                >
                  {p}
                </p>
              ))}
              {sec.pullQuote && (
                <blockquote className="my-8 p-6 sm:p-8 bg-[#EFECE3] border-l-4 border-[#C89236] font-serif-editorial italic text-2xl text-[#182B21] leading-snug">
                  {sec.pullQuote}
                </blockquote>
              )}
            </section>
          ))}
        </div>

        {/* Related Spices */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[#E2DDD2]">
            <SectionHeader
              eyebrow="Mentioned in This Essay"
              title="EXPLORE THE SPICES"
              align="left"
              className="mb-10"
            />
            <ProductGrid products={relatedProducts} />
          </section>
        )}

        {/* Further Reading */}
        <section className="mt-20 pt-16 border-t border-[#E2DDD2]">
          <SectionHeader
            eyebrow="Continue Reading"
            title="MORE FROM THE JOURNAL"
            align="left"
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {moreArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/journal"
              className="text-xs uppercase tracking-[0.18em] text-[#182B21] underline"
            >
              Back to All Essays
            </Link>
          </div>
        </section>
      </article>
    </>
  );
};
