import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { JOURNAL_ARTICLES } from '../data/journal';
import { Breadcrumbs } from '../components/ui/Primitives';
import { ArticleCard, Newsletter } from '../components/ui/EditorialCards';

const TOPICS = [
  'All',
  'Indian Spice Origins',
  'Spice Guides',
  'Cooking Techniques',
  'Regional Cuisine',
  'Ingredient Stories',
  'Sourcing',
  'Food Culture'
] as const;

export const JournalPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  const leadArticle = JOURNAL_ARTICLES[0];
  const filteredArticles =
    selectedTopic === 'All'
      ? JOURNAL_ARTICLES
      : JOURNAL_ARTICLES.filter((a) => a.topic === selectedTopic);

  return (
    <>
      <SEOHead
        title="The Aaranya Journal — Indian Spice Origins, Techniques & Food Culture"
        description="Essays and monographs on Indian spice origins, cooking techniques, regional cuisine, ingredient stories, and thoughtful sourcing."
        canonicalPath="/journal"
      />

      {/* Magazine Masthead */}
      <section className="bg-[#EFECE3] border-b border-[#E2DDD2] py-14 md:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Journal' }]} />
          <div className="mt-4 max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#6D4C38] font-medium mb-2">
              Monographs & Field Notes
            </p>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl text-[#1C1B18] uppercase">
              THE AARANYA JOURNAL
            </h1>
            <p className="mt-4 text-base md:text-lg text-[#5A564E] leading-relaxed">
              Reflections on Indian spice origins, regional culinary traditions, the chemistry of tempering, and the agricultural craft behind the pantry.
            </p>
          </div>

          {/* Topic Filters */}
          <div className="mt-8 flex flex-wrap gap-2">
            {TOPICS.map((topic) => {
              const active = selectedTopic === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.14em] border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#182B21] text-[#F7F4ED] border-[#182B21]'
                      : 'bg-[#F7F4ED] text-[#1C1B18] border-[#D5CFC2] hover:border-[#182B21]'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-14 md:py-20 space-y-16">
        {/* Featured Cover Story */}
        {selectedTopic === 'All' && (
          <Link
            to={`/journal/${leadArticle.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-12 bg-[#EFECE3] border border-[#E2DDD2] overflow-hidden"
          >
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden">
              <img
                src={leadArticle.heroImage}
                alt={leadArticle.title}
                fetchPriority="high"
                className="w-full h-full object-cover object-center image-zoom-slow group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-14 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#6D4C38]">
                  <span>Cover Essay · {leadArticle.topic}</span>
                  <span>{leadArticle.readTime}</span>
                </div>
                <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#1C1B18] group-hover:text-[#6D4C38] transition-colors leading-tight">
                  {leadArticle.title}
                </h2>
                <p className="text-sm md:text-base text-[#5A564E] leading-relaxed">
                  {leadArticle.excerpt}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#D5CFC2] flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#182B21] font-semibold">
                <span>Read Full Monograph</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          </Link>
        )}

        {/* Editorial Grid */}
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center bg-[#EFECE3]/50 border border-[#E2DDD2]">
            <p className="font-serif-editorial text-2xl text-[#1C1B18]">
              New essays in "{selectedTopic}" are forthcoming.
            </p>
            <button
              type="button"
              onClick={() => setSelectedTopic('All')}
              className="mt-4 text-xs uppercase tracking-[0.16em] text-[#182B21] underline cursor-pointer"
            >
              View All Published Essays
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>

      <Newsletter variant="section" />
    </>
  );
};
