import React, { useState } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { RECIPES } from '../data/recipes';
import { RecipeCategory } from '../types/ecommerce';
import { Breadcrumbs } from '../components/ui/Primitives';
import { RecipeCard, Newsletter } from '../components/ui/EditorialCards';

const RECIPE_CATEGORIES: ('All' | RecipeCategory)[] = [
  'All',
  'Everyday Indian',
  'Vegetarian',
  'Regional',
  'Quick Meals',
  'Festive'
];

export const RecipesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | RecipeCategory>('All');

  const filteredRecipes =
    selectedCategory === 'All'
      ? RECIPES
      : RECIPES.filter((r) => r.category === selectedCategory);

  return (
    <>
      <SEOHead
        title="Cook With Aaranya — Indian Spice Recipes | AARANYA SPICES"
        description="Explore editorial Indian recipes celebrating whole spices, freshly ground powders, and artisanal spice blends."
        canonicalPath="/recipes"
      />

      {/* Editorial Header */}
      <section className="bg-[#EFECE3] border-b border-[#E2DDD2] py-14 md:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Recipes' }]} />
          <div className="max-w-3xl mt-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#6D4C38] font-medium mb-2">
              The Culinary Notebook
            </p>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl text-[#1C1B18] uppercase">
              COOK WITH AARANYA
            </h1>
            <p className="mt-4 text-base md:text-lg text-[#5A564E] leading-relaxed">
              Thoughtful dishes from across regional Indian kitchens—crafted to highlight the warmth, colour, and fragrance of freshly milled and whole spices.
            </p>
          </div>

          {/* Recipe Category Filters */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {RECIPE_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.16em] border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#182B21] text-[#F7F4ED] border-[#182B21]'
                      : 'bg-[#F7F4ED] text-[#1C1B18] border-[#D5CFC2] hover:border-[#182B21]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recipe Cards Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <Newsletter variant="section" />
    </>
  );
};
