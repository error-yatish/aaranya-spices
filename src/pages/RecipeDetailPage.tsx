import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, ChefHat, ShoppingBag } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { getRecipeBySlug, RECIPES } from '../data/recipes';
import { getProductBySlug } from '../data/catalog';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs, Badge, SectionHeader } from '../components/ui/Primitives';
import { RecipeCard } from '../components/ui/EditorialCards';

export const RecipeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useShop();

  const recipe = getRecipeBySlug(slug || 'paneer-tikka') || RECIPES[0];
  const relatedRecipes = RECIPES.filter((r) => r.id !== recipe.id).slice(0, 3);

  const recipeSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: recipe.title,
    image: [`https://aaranyaspices.com${recipe.image}`],
    description: recipe.description,
    prepTime: 'PT20M',
    cookTime: 'PT25M',
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.category,
    recipeCuisine: 'Indian',
    recipeIngredient: recipe.ingredients.flatMap((g) => g.items),
    recipeInstructions: recipe.instructions.map((inst) => ({
      '@type': 'HowToStep',
      name: inst.title,
      text: inst.text
    }))
  };

  return (
    <>
      <SEOHead
        title={`${recipe.title} — Cook With Aaranya | AARANYA SPICES`}
        description={recipe.subtitle}
        canonicalPath={`/recipes/${recipe.slug}`}
        ogImage={recipe.image}
        ogType="article"
        structuredData={recipeSchema}
      />

      <article className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Recipes', href: '/recipes' },
            { label: recipe.title }
          ]}
        />

        {/* Hero Header */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#EFECE3] border border-[#E2DDD2] overflow-hidden">
          <div className="lg:col-span-6 p-8 sm:p-10 lg:p-14 space-y-6">
            <Badge tone="forest">{recipe.category}</Badge>
            <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1C1B18] leading-[1.12]">
              {recipe.title}
            </h1>
            <p className="text-base text-[#5A564E] leading-relaxed">
              {recipe.description}
            </p>

            {/* Prep / Cook / Servings Metadata */}
            <div className="pt-6 border-t border-[#D5CFC2] grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[#847E74] uppercase tracking-[0.14em] block">
                  Prep Time
                </span>
                <span className="font-mono-spec text-sm text-[#1C1B18] mt-1 inline-flex items-center gap-1.5">
                  <Clock size={14} className="text-[#6D4C38]" />
                  {recipe.prepTime}
                </span>
              </div>
              <div>
                <span className="text-[#847E74] uppercase tracking-[0.14em] block">
                  Cook Time
                </span>
                <span className="font-mono-spec text-sm text-[#1C1B18] mt-1 inline-flex items-center gap-1.5">
                  <ChefHat size={14} className="text-[#6D4C38]" />
                  {recipe.cookTime}
                </span>
              </div>
              <div>
                <span className="text-[#847E74] uppercase tracking-[0.14em] block">
                  Servings
                </span>
                <span className="font-mono-spec text-sm text-[#1C1B18] mt-1 inline-flex items-center gap-1.5">
                  <Users size={14} className="text-[#6D4C38]" />
                  {recipe.servings} Portions
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              fetchPriority="high"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Main Recipe Body: Ingredients + Instructions + Aaranya Products Used */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Ingredients & Aaranya Spices Used */}
          <div className="lg:col-span-5 space-y-10">
            {/* Aaranya Spices Used */}
            <div className="p-6 sm:p-8 bg-[#182B21] text-[#F7F4ED] space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C89236]">
                  The Spice Box
                </p>
                <h2 className="font-serif-editorial text-2xl mt-1">
                  Aaranya Spices Used in This Recipe
                </h2>
              </div>

              <div className="divide-y divide-[#2B4637]">
                {recipe.keySpices.map((ks) => {
                  const prod = getProductBySlug(ks.productSlug);
                  if (!prod) return null;
                  return (
                    <div
                      key={ks.productSlug}
                      className="py-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images.primary}
                          alt={prod.name}
                          className="w-12 h-14 object-cover border border-[#2B4637]"
                        />
                        <div>
                          <Link
                            to={`/shop/${prod.slug}`}
                            className="font-serif-editorial text-lg text-[#F7F4ED] hover:text-[#C89236]"
                          >
                            {prod.name}
                          </Link>
                          <p className="text-xs font-mono-spec text-[#E2DDD2]/75">
                            Recipe uses: {ks.amount} · ₹{prod.variants[0].price}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => addToCart(prod, '100g', 1, true)}
                        className="px-3 py-2 bg-[#C89236] hover:bg-[#b5812b] text-[#182B21] text-[10px] uppercase tracking-[0.16em] font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag size={12} />
                        <span>Add</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Full Ingredients List */}
            <div className="p-6 sm:p-8 bg-[#EFECE3] border border-[#E2DDD2] space-y-6">
              <h2 className="font-serif-editorial text-3xl text-[#1C1B18] pb-3 border-b border-[#D5CFC2]">
                Ingredients
              </h2>
              {recipe.ingredients.map((group, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-xs uppercase tracking-[0.18em] text-[#6D4C38] font-semibold">
                    {group.group}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-[#1C1B18]">
                    {group.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 pb-2 border-b border-[#E2DDD2]/70 last:border-none"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C89236] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Method / Instructions */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D4C38]">
                Step-by-Step Preparation
              </p>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#1C1B18] mt-1">
                Instructions
              </h2>
            </div>

            <div className="space-y-6">
              {recipe.instructions.map((inst) => (
                <div
                  key={inst.step}
                  className="p-6 sm:p-8 bg-[#EFECE3]/45 border border-[#E2DDD2] space-y-2"
                >
                  <span className="text-xs font-mono-spec uppercase tracking-[0.18em] text-[#6D4C38]">
                    Step 0{inst.step}
                  </span>
                  <h3 className="font-serif-editorial text-2xl text-[#1C1B18]">
                    {inst.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#5A564E] leading-relaxed">
                    {inst.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Kitchen Note */}
            <div className="p-6 bg-[#EFECE3] border-l-4 border-[#C89236]">
              <p className="text-xs uppercase tracking-[0.18em] text-[#6D4C38] font-semibold">
                Aaranya Kitchen Note
              </p>
              <p className="mt-2 font-serif-editorial italic text-xl text-[#1C1B18]">
                “{recipe.chefNote}”
              </p>
            </div>
          </div>
        </div>

        {/* Related Recipes */}
        <section className="mt-20 pt-16 border-t border-[#E2DDD2]">
          <SectionHeader
            eyebrow="More From The Kitchen"
            title="RELATED RECIPES"
            align="left"
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {relatedRecipes.map((rel) => (
              <RecipeCard key={rel.id} recipe={rel} />
            ))}
          </div>
        </section>
      </article>
    </>
  );
};
