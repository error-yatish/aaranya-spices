import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { PRODUCTS, CATEGORIES_METADATA } from '../data/catalog';
import { SpiceWeight } from '../types/ecommerce';
import { Breadcrumbs, Button } from '../components/ui/Primitives';
import { ProductGrid } from '../components/ui/ProductCard';

type SortOption =
  | 'featured'
  | 'best-selling'
  | 'newest'
  | 'price-asc'
  | 'price-desc';

export const ShopPage: React.FC<{ forcedCategory?: string }> = ({ forcedCategory }) => {
  const params = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();

  const activeCategorySlug = forcedCategory || params.category || 'all';

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategorySlug);
  const [selectedWeight, setSelectedWeight] = useState<SpiceWeight | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(activeCategorySlug);
  }, [activeCategorySlug]);

  const categoryMeta = CATEGORIES_METADATA.find((c) => c.slug === selectedCategory);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.shortDescriptor.toLowerCase().includes(q);
        const matchesNotes = product.aromaNotes.some((n) =>
          n.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesDesc && !matchesNotes) return false;
      }
      if (selectedWeight !== 'all') {
        const hasWeight = product.variants.some((v) => v.weight === selectedWeight);
        if (!hasWeight) return false;
      }
      const basePrice = product.variants[0]?.price || 0;
      if (basePrice > maxPrice) {
        return false;
      }
      if (onlyInStock) {
        const anyInStock = product.variants.some((v) => v.inStock);
        if (!anyInStock) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'best-selling') {
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      }
      if (sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      if (sortBy === 'price-asc') {
        return a.variants[0].price - b.variants[0].price;
      }
      if (sortBy === 'price-desc') {
        return b.variants[0].price - a.variants[0].price;
      }
      // featured
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, selectedWeight, maxPrice, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(activeCategorySlug === 'all' ? 'all' : activeCategorySlug);
    setSelectedWeight('all');
    setMaxPrice(3000);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  const pageTitle = categoryMeta ? categoryMeta.title : 'SHOP ALL SPICES';
  const pageSubtitle = categoryMeta
    ? categoryMeta.description
    : 'Explore our complete collection of whole harvests, single-ingredient ground spices, and small-batch blends.';

  return (
    <>
      <SEOHead
        title={`${pageTitle} — AARANYA SPICES`}
        description={pageSubtitle}
        canonicalPath={
          selectedCategory === 'all' ? '/shop' : `/shop/${selectedCategory}`
        }
      />

      {/* Editorial Category Banner */}
      <section className="bg-[#EFECE3] border-b border-[#E2DDD2] py-12 md:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shop', href: '/shop' },
              ...(categoryMeta ? [{ label: categoryMeta.title }] : [])
            ]}
          />
          <div className="mt-4 max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#6D4C38] font-medium mb-2">
              The Aaranya Pantry
            </p>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl text-[#1C1B18] tracking-[0.02em] uppercase">
              {pageTitle}
            </h1>
            <p className="mt-3 text-sm md:text-base text-[#5A564E] leading-relaxed">
              {pageSubtitle}
            </p>
          </div>

          {/* Quick Category Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <Link
              to="/shop"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs uppercase tracking-[0.16em] border transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#182B21] text-[#F7F4ED] border-[#182B21]'
                  : 'bg-[#F7F4ED] text-[#1C1B18] border-[#D5CFC2] hover:border-[#182B21]'
              }`}
            >
              All Spices ({PRODUCTS.length})
            </Link>
            {CATEGORIES_METADATA.map((cat) => {
              const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
              const isSelected = selectedCategory === cat.slug;
              return (
                <Link
                  key={cat.slug}
                  to={`/shop/${cat.slug}`}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.16em] border transition-colors ${
                    isSelected
                      ? 'bg-[#182B21] text-[#F7F4ED] border-[#182B21]'
                      : 'bg-[#F7F4ED] text-[#1C1B18] border-[#D5CFC2] hover:border-[#182B21]'
                  }`}
                >
                  {cat.title} ({count})
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filter & Sort Bar + Catalogue Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-14">
        {/* Top Controls Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2DDD2]">
          <div className="flex flex-wrap items-center gap-3">
            {/* Mobile Filter Drawer Trigger */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#182B21] text-xs uppercase tracking-[0.14em] text-[#182B21] font-medium cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>

            {/* Search Within Catalogue */}
            <div className="relative flex-1 sm:w-64">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#847E74]"
              />
              <label htmlFor="catalogue-search" className="sr-only">
                Search catalogue
              </label>
              <input
                id="catalogue-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by spice or aroma note..."
                className="w-full bg-[#EFECE3]/70 border border-[#D5CFC2] pl-9 pr-4 py-2 text-xs text-[#1C1B18] placeholder:text-[#847E74] focus:outline-none focus:border-[#182B21]"
              />
            </div>

            {/* Desktop Size Filter */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs">
              <span className="text-[#847E74] uppercase tracking-[0.14em] mr-1">
                Size:
              </span>
              {(['all', '100g', '200g', '500g'] as const).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setSelectedWeight(w)}
                  className={`px-2.5 py-1 border font-mono-spec text-[11px] cursor-pointer ${
                    selectedWeight === w
                      ? 'bg-[#182B21] text-[#F7F4ED] border-[#182B21]'
                      : 'bg-[#F7F4ED] text-[#5A564E] border-[#D5CFC2] hover:text-[#1C1B18]'
                  }`}
                >
                  {w === 'all' ? 'All' : w}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Count + Sort By */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            <span className="text-xs text-[#5A564E] font-mono-spec">
              Showing {filteredProducts.length} spices
            </span>

            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-select"
                className="text-xs uppercase tracking-[0.14em] text-[#5A564E]"
              >
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#EFECE3] border border-[#D5CFC2] px-3 py-2 text-xs text-[#1C1B18] focus:outline-none focus:border-[#182B21] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="best-selling">Best Selling</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid (Desktop: 4 cols, Tablet: 3 cols, Mobile: 2 cols) */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#EFECE3]/40 border border-[#E2DDD2] space-y-4">
              <p className="font-serif-editorial text-3xl text-[#1C1B18]">
                No spices match your current filters
              </p>
              <p className="text-sm text-[#5A564E]">
                Try clearing a filter or searching for another spice.
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Reset All Filters
              </Button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </section>

      {/* Filter Drawer (Accessible Slide-over for Mobile & Desktop Detailed Filtering) */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Filter Spices"
        >
          <div
            className="fixed inset-0 bg-[#1C1B18]/60 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xs bg-[#F7F4ED] h-full p-6 flex flex-col justify-between border-r border-[#E2DDD2] overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD2]">
                <h2 className="font-serif-editorial text-2xl text-[#1C1B18]">
                  Refine Catalogue
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="p-1.5 text-[#5A564E]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.18em] text-[#6D4C38] font-semibold mb-3">
                  Category
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    { slug: 'all', label: 'All Spices' },
                    { slug: 'whole-spices', label: 'Whole Spices' },
                    { slug: 'ground-spices', label: 'Ground Spices' },
                    { slug: 'spice-blends', label: 'Spice Blends' }
                  ].map((c) => (
                    <label
                      key={c.slug}
                      className="flex items-center gap-2.5 cursor-pointer text-[#1C1B18]"
                    >
                      <input
                        type="radio"
                        name="drawer-cat"
                        checked={selectedCategory === c.slug}
                        onChange={() => setSelectedCategory(c.slug)}
                        className="accent-[#182B21]"
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Weight Filter */}
              <div className="pt-4 border-t border-[#E2DDD2]">
                <h3 className="text-xs uppercase tracking-[0.18em] text-[#6D4C38] font-semibold mb-3">
                  Pack Size
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {(['all', '100g', '200g', '500g'] as const).map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSelectedWeight(w)}
                      className={`py-2 px-3 border text-xs font-mono-spec ${
                        selectedWeight === w
                          ? 'bg-[#182B21] text-[#F7F4ED] border-[#182B21]'
                          : 'bg-[#EFECE3] text-[#1C1B18] border-[#D5CFC2]'
                      }`}
                    >
                      {w === 'all' ? 'All Sizes' : w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="pt-4 border-t border-[#E2DDD2]">
                <div className="flex justify-between text-xs mb-2">
                  <span className="uppercase tracking-[0.18em] text-[#6D4C38] font-semibold">
                    Max Base Price
                  </span>
                  <span className="font-mono-spec text-[#1C1B18]">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={180}
                  max={1000}
                  step={20}
                  value={maxPrice > 1000 ? 1000 : maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#182B21]"
                />
              </div>

              {/* Availability */}
              <div className="pt-4 border-t border-[#E2DDD2]">
                <label className="flex items-center gap-2.5 text-sm text-[#1C1B18] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="accent-[#182B21]"
                  />
                  <span>In-stock harvests only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2DDD2] grid grid-cols-2 gap-3">
              <Button variant="secondary" size="sm" onClick={resetFilters}>
                Reset
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Apply ({filteredProducts.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
