import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, ChefHat, Check } from 'lucide-react';
import { JournalArticle, Recipe } from '../../types/ecommerce';
import { Badge, Button } from './Primitives';

/* 1. CATEGORY CARD */
interface CategoryCardProps {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  slug,
  title,
  subtitle,
  image
}) => {
  return (
    <Link
      to={`/shop/${slug}`}
      className="group relative aspect-[3/4] overflow-hidden bg-[#182B21] border border-[#E2DDD2] flex flex-col justify-end p-6 md:p-8"
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        width={700}
        height={933}
        className="absolute inset-0 w-full h-full object-cover object-center image-zoom-slow group-hover:scale-105 opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D16]/90 via-[#0F1D16]/35 to-transparent" />

      <div className="relative z-10 text-[#F7F4ED]">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#C89236] mb-2">
          Collection
        </p>
        <h3 className="font-serif-editorial text-2xl md:text-3xl tracking-[0.04em] uppercase text-[#F7F4ED]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[#E2DDD2]/90 leading-relaxed">{subtitle}</p>
        <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#F7F4ED] border-b border-[#C89236] pb-1 group-hover:gap-3 transition-all">
          <span>Explore Collection</span>
          <ArrowUpRight size={14} className="text-[#C89236]" />
        </div>
      </div>
    </Link>
  );
};

/* 2. RECIPE CARD */
export const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <Link
      to={`/recipes/${recipe.slug}`}
      className="group flex flex-col bg-[#F7F4ED] border border-[#E2DDD2] overflow-hidden hover:border-[#C89236]/60 transition-colors"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EFECE3]">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-full object-cover object-center image-zoom-slow group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge tone="ivory">{recipe.category}</Badge>
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center gap-4 text-xs text-[#5A564E] mb-2.5">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} className="text-[#6D4C38]" />
              {recipe.totalTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ChefHat size={13} className="text-[#6D4C38]" />
              {recipe.difficulty}
            </span>
          </div>

          <h3 className="font-serif-editorial text-2xl text-[#1C1B18] group-hover:text-[#6D4C38] transition-colors leading-snug">
            {recipe.title}
          </h3>
          <p className="mt-2 text-xs md:text-sm text-[#5A564E] line-clamp-2 leading-relaxed">
            {recipe.subtitle}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E2DDD2]">
          <p className="text-[10px] uppercase tracking-[0.16em] text-[#847E74] mb-2">
            Key Aaranya Spices
          </p>
          <div className="flex flex-wrap gap-1.5">
            {recipe.keySpices.map((spice) => (
              <span
                key={spice.productSlug}
                className="text-[11px] bg-[#EFECE3] text-[#1C1B18] px-2.5 py-1 border border-[#E2DDD2]"
              >
                {spice.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

/* 3. ARTICLE CARD */
export const ArticleCard: React.FC<{ article: JournalArticle }> = ({ article }) => {
  return (
    <Link
      to={`/journal/${article.slug}`}
      className="group flex flex-col bg-[#F7F4ED] border border-[#E2DDD2] overflow-hidden hover:border-[#C89236]/60 transition-colors"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#EFECE3]">
        <img
          src={article.heroImage}
          alt={article.title}
          loading="lazy"
          width={800}
          height={500}
          className="w-full h-full object-cover object-center image-zoom-slow group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#6D4C38] mb-2">
            <span>{article.topic}</span>
            <span className="text-[#847E74]">{article.readTime}</span>
          </div>
          <h3 className="font-serif-editorial text-2xl text-[#1C1B18] group-hover:text-[#6D4C38] transition-colors leading-snug">
            {article.title}
          </h3>
          <p className="mt-2.5 text-sm text-[#5A564E] line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
        <div className="pt-3 border-t border-[#E2DDD2] flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#182B21] font-medium">
          <span>Read Story</span>
          <ArrowUpRight size={14} />
        </div>
      </div>
    </Link>
  );
};

import { subscribeToNewsletter } from '../../services/backendService';

/* 4. NEWSLETTER */
export const Newsletter: React.FC<{ variant?: 'footer' | 'section' }> = ({
  variant = 'footer'
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await subscribeToNewsletter(email, variant);
    setSubmitted(true);
    setEmail('');
  };

  if (variant === 'section') {
    return (
      <section className="bg-[#EFECE3] border-t border-b border-[#E2DDD2] py-16 md:py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#6D4C38] mb-2">
            Dispatches from Our Kitchen
          </p>
          <h2 className="font-serif-editorial text-3xl md:text-4xl text-[#1C1B18] tracking-wide">
            THE AARANYA TABLE
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#5A564E]">
            Recipes, spice stories and occasional notes from our kitchen.
          </p>

          {submitted ? (
            <div className="mt-6 inline-flex items-center gap-2 bg-[#182B21] text-[#F7F4ED] px-6 py-3.5 text-xs uppercase tracking-[0.16em]">
              <Check size={15} className="text-[#C89236]" />
              <span>Welcome to The Aaranya Table.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <label htmlFor="section-newsletter-email" className="sr-only">
                Your email address
              </label>
              <input
                id="section-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3.5 text-sm text-[#1C1B18] placeholder:text-[#847E74] focus:outline-none focus:border-[#182B21]"
              />
              <Button type="submit" variant="primary">
                SUBSCRIBE
              </Button>
            </form>
          )}
        </div>
      </section>
    );
  }

  return (
    <div>
      <h3 className="font-serif-editorial text-2xl tracking-[0.06em] text-[#F7F4ED] uppercase">
        THE AARANYA TABLE
      </h3>
      <p className="mt-2 text-sm text-[#E2DDD2]/80 leading-relaxed">
        Recipes, spice stories and occasional notes from our kitchen.
      </p>
      {submitted ? (
        <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#C89236]">
          <Check size={15} />
          <span>Thank you for subscribing to The Aaranya Table.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2.5">
          <label htmlFor="footer-newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 bg-[#0F1D16] border border-[#2D4538] px-4 py-3 text-sm text-[#F7F4ED] placeholder:text-[#847E74] focus:outline-none focus:border-[#C89236]"
          />
          <button
            type="submit"
            className="bg-[#C89236] hover:bg-[#b5812b] text-[#182B21] font-sans-ui text-xs uppercase tracking-[0.16em] font-semibold px-6 py-3 transition-colors cursor-pointer"
          >
            SUBSCRIBE
          </button>
        </form>
      )}
    </div>
  );
};
