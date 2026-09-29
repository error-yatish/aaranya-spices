import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { PRODUCTS } from '../data/catalog';
import { RECIPES } from '../data/recipes';
import { JOURNAL_ARTICLES } from '../data/journal';
import { Breadcrumbs, SectionHeader } from '../components/ui/Primitives';
import { ProductGrid } from '../components/ui/ProductCard';
import { RecipeCard, ArticleCard } from '../components/ui/EditorialCards';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearchChange = (val: string) => {
    setQuery(val);
    setSearchParams(val ? { q: val } : {});
  };

  const q = query.trim().toLowerCase();

  const matchedProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescriptor.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.aromaNotes.some((n) => n.toLowerCase().includes(q))
      )
    : PRODUCTS;

  const matchedRecipes = q
    ? RECIPES.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q)
      )
    : RECIPES.slice(0, 3);

  const matchedArticles = q
    ? JOURNAL_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      )
    : JOURNAL_ARTICLES.slice(0, 3);

  return (
    <>
      <SEOHead
        title={
          q
            ? `Search Results for "${query}" — AARANYA SPICES`
            : 'Search Spices, Recipes & Journal — AARANYA SPICES'
        }
        description="Search the Aaranya Spices catalogue, recipes, and journal."
        canonicalPath="/search"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-16 space-y-14">
        <div>
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
          <h1 className="font-serif-editorial text-4xl sm:text-5xl text-[#1C1B18] mt-2">
            SEARCH AARANYA
          </h1>

          <div className="mt-6 relative max-w-2xl">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6D4C38]"
            />
            <label htmlFor="full-search-page-input" className="sr-only">
              Search spices, recipes, and journal essays
            </label>
            <input
              id="full-search-page-input"
              type="search"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search for Turmeric, Kashmiri Chilli, Whole Cumin, Paneer Tikka..."
              className="w-full bg-[#EFECE3] border border-[#182B21] pl-12 pr-4 py-4 text-base text-[#1C1B18] focus:outline-none"
            />
          </div>
        </div>

        <section>
          <SectionHeader
            eyebrow="Catalogue"
            title={`SPICES (${matchedProducts.length})`}
            align="left"
            className="mb-8"
          />
          {matchedProducts.length === 0 ? (
            <p className="text-sm text-[#5A564E]">
              No spices matched "{query}".
            </p>
          ) : (
            <ProductGrid products={matchedProducts} />
          )}
        </section>

        {matchedRecipes.length > 0 && (
          <section className="pt-12 border-t border-[#E2DDD2]">
            <SectionHeader
              eyebrow="Culinary"
              title={`RECIPES (${matchedRecipes.length})`}
              align="left"
              className="mb-8"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {matchedRecipes.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          </section>
        )}

        {matchedArticles.length > 0 && (
          <section className="pt-12 border-t border-[#E2DDD2]">
            <SectionHeader
              eyebrow="Monographs"
              title={`JOURNAL STORIES (${matchedArticles.length})`}
              align="left"
              className="mb-8"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {matchedArticles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};
