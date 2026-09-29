import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/catalog';
import { RECIPES } from '../../data/recipes';
import { JOURNAL_ARTICLES } from '../../data/journal';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescriptor.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.aromaNotes.some((n) => n.toLowerCase().includes(q))
      )
    : PRODUCTS.slice(0, 4);

  const matchedRecipes = q
    ? RECIPES.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q)
      )
    : RECIPES.slice(0, 2);

  const matchedArticles = q
    ? JOURNAL_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.topic.toLowerCase().includes(q)
      )
    : [];

  const handleFullSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1C1B18]/70 backdrop-blur-xs flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Search Aaranya Spices"
    >
      <div className="bg-[#F7F4ED] border-b border-[#E2DDD2] shadow-2xl max-h-[88vh] overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form
            onSubmit={handleFullSearchSubmit}
            className="flex items-center gap-4 border-b-2 border-[#182B21] pb-4"
          >
            <Search size={22} className="text-[#182B21] shrink-0" />
            <label htmlFor="overlay-search-input" className="sr-only">
              Search spices, recipes, or journal stories
            </label>
            <input
              id="overlay-search-input"
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Turmeric, Kashmiri Chilli, Garam Masala, Paneer Tikka..."
              className="w-full bg-transparent font-serif-editorial text-2xl md:text-3xl text-[#1C1B18] placeholder:text-[#847E74] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
              className="p-2 text-[#5A564E] hover:text-[#1C1B18] cursor-pointer"
            >
              <X size={22} />
            </button>
          </form>

          {/* Popular quick terms */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#847E74] uppercase tracking-[0.14em] mr-2">
              Popular:
            </span>
            {['Turmeric', 'Kashmiri Chilli', 'Whole Cumin', 'Garam Masala', 'Black Pepper', 'Dal Tadka'].map(
              (term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 bg-[#EFECE3] hover:bg-[#E2DDD2] text-[#1C1B18] border border-[#D5CFC2] transition-colors cursor-pointer"
                >
                  {term}
                </button>
              )
            )}
          </div>

          {/* Results Grid */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#6D4C38] font-semibold">
                  {q ? `Spices (${matchedProducts.length})` : 'Featured Essentials'}
                </h3>
                <Link
                  to={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="text-xs uppercase tracking-[0.14em] text-[#182B21] hover:underline inline-flex items-center gap-1"
                >
                  <span>View All Results</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              {matchedProducts.length === 0 ? (
                <p className="text-sm text-[#5A564E] py-6">
                  No spices matched "{query}". Try searching for Whole Spices, Turmeric, or Cumin.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchedProducts.slice(0, 4).map((product) => (
                    <Link
                      key={product.id}
                      to={`/shop/${product.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 p-3 bg-[#EFECE3]/60 border border-[#E2DDD2] hover:border-[#C89236] transition-colors"
                    >
                      <img
                        src={product.images.primary}
                        alt={product.name}
                        className="w-16 h-20 object-cover shrink-0"
                      />
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#6D4C38]">
                          {product.categoryLabel}
                        </span>
                        <h4 className="font-serif-editorial text-xl text-[#1C1B18]">
                          {product.name}
                        </h4>
                        <p className="text-xs font-mono-spec text-[#5A564E] mt-1">
                          From ₹{product.variants[0].price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#6D4C38] font-semibold mb-4">
                  Recipes & Stories
                </h3>
                <div className="space-y-3">
                  {matchedRecipes.map((rec) => (
                    <Link
                      key={rec.id}
                      to={`/recipes/${rec.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="block p-3 bg-[#EFECE3]/50 border border-[#E2DDD2] hover:border-[#C89236]"
                    >
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#6D4C38]">
                        Recipe · {rec.totalTime}
                      </span>
                      <p className="font-serif-editorial text-lg text-[#1C1B18] mt-0.5">
                        {rec.title}
                      </p>
                    </Link>
                  ))}
                  {matchedArticles.slice(0, 2).map((art) => (
                    <Link
                      key={art.id}
                      to={`/journal/${art.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="block p-3 bg-[#EFECE3]/50 border border-[#E2DDD2] hover:border-[#C89236]"
                    >
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#6D4C38]">
                        Journal · {art.topic}
                      </span>
                      <p className="font-serif-editorial text-lg text-[#1C1B18] mt-0.5">
                        {art.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside area */}
      <div className="flex-1" onClick={() => setIsSearchOpen(false)} />
    </div>
  );
};
