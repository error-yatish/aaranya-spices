import { JournalArticle } from '../types/ecommerce';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'jrn-01',
    slug: 'art-of-tempering-tadka',
    title: 'The Quiet Alchemy of Tadka: How Heat Unlocks Indian Spices',
    subtitle:
      'Why the order in which whole and ground spices meet warm ghee defines the architecture of an Indian dish.',
    topic: 'Cooking Techniques',
    readTime: '5 min read',
    publishedAt: 'September 2026',
    author: 'Aaranya Editorial Kitchen',
    heroImage: '/images/hero-spices.jpg',
    excerpt:
      'Known variously as tadka, chhaunk, baghar, or thalippu across Indian kitchens, tempering is the practice of blooming spices in fat to release fat-soluble aromatic compounds.',
    relatedProductSlugs: ['whole-cumin', 'turmeric-powder', 'kashmiri-chilli-powder'],
    sections: [
      {
        heading: 'Fat as a Carrier of Fragrance',
        paragraphs: [
          'Most of the essential oils that give spices their character—cuminaldehyde in cumin, piperine in black pepper, curcuminoids in turmeric—are fat-soluble rather than water-soluble. Simmering raw spices in water alone leaves their deepest notes locked away.',
          'When whole seeds or ground powders meet warm ghee or cold-pressed oil, those volatile molecules dissolve into the fat and coat every lentil, vegetable, or grain in the pot.'
        ],
        pullQuote:
          '“Tempering is a study in listening: the brisk crackle of mustard, the nutty swell of cumin, the quiet hush when ground spices touch the pan.”'
      },
      {
        heading: 'Respecting the Clock: Whole Before Ground',
        paragraphs: [
          'Whole spices such as black pepper, green cardamom, cinnamon bark, and cumin seeds have protective cellular husks. They require 10 to 25 seconds in hot fat to swell and release their oils.',
          'Ground spices—turmeric, Kashmiri chilli, and coriander powder—have vastly greater surface area. They need only 3 to 5 seconds in gentler heat, or the cushion of sautéed onions and a splash of water, to bloom without scorching.'
        ]
      }
    ]
  },
  {
    id: 'jrn-02',
    slug: 'understanding-turmeric',
    title: 'Beyond Colour: Understanding the Character of Cured Turmeric',
    subtitle:
      'From harvest rhizome to golden powder—what separates an aromatic culinary haldi from flat pantry dust.',
    topic: 'Ingredient Stories',
    readTime: '6 min read',
    publishedAt: 'August 2026',
    author: 'Aaranya Editorial Kitchen',
    heroImage: '/images/signature-turmeric.jpg',
    excerpt:
      'In the Indian kitchen, turmeric is reached for almost instinctively. Yet when you smell freshly milled cured rhizomes beside a mass-market packet, they feel like two different ingredients.',
    relatedProductSlugs: ['turmeric-powder', 'black-pepper'],
    sections: [
      {
        heading: 'The Curing Ritual',
        paragraphs: [
          'Freshly harvested turmeric fingers resemble ginger root with a bright orange interior. Before they can be milled into culinary haldi, the rhizomes are traditionally boiled, sun-dried over weeks until they snap with a metallic ring, and polished naturally.',
          'This curing process gelatinises the natural starches and diffuses the pigment evenly through the root, creating the warm, woody, ginger-citrus aroma prized in Indian cooking.'
        ],
        pullQuote:
          '“When turmeric is treated as a flavour rather than merely a dye, you use less—and taste far more.”'
      },
      {
        heading: 'Protecting the Golden Hue in Your Kitchen',
        paragraphs: [
          'Curcumin pigments and volatile turmerone oils are sensitive to ultraviolet light. Storing turmeric in clear plastic jars on a sunny countertop bleaches both its colour and its fragrance within months. Amber glass and dark cupboards remain the simplest guardians of flavour.'
        ]
      }
    ]
  },
  {
    id: 'jrn-03',
    slug: 'whole-vs-ground-spices',
    title: 'Whole Seeds & Fresh Powders: Building a Balanced Masala Dani',
    subtitle:
      'When to reach for the mortar and pestle, and when a finely milled spice powder is indispensable.',
    topic: 'Spice Guides',
    readTime: '4 min read',
    publishedAt: 'August 2026',
    author: 'Aaranya Editorial Kitchen',
    heroImage: '/images/brand-story.jpg',
    excerpt:
      'Every traditional Indian spice box holds both whole seeds and finely milled powders. Understanding how each behaves in the pan brings clarity to everyday cooking.',
    relatedProductSlugs: ['coriander-seeds', 'coriander-powder', 'whole-cumin', 'cumin-powder'],
    sections: [
      {
        heading: 'Texture vs. Emulsion',
        paragraphs: [
          'Whole spices provide punctuation: the pop of a cumin seed against soft potatoes, or a bruised green cardamom pod perfuming basmati rice without clouding its snow-white grains.',
          'Ground spices create emulsion and body. Finely milled coriander and turmeric bind onion-tomato masalas into a cohesive, glossy gravy that clings to vegetables and flatbreads.'
        ]
      }
    ]
  },
  {
    id: 'jrn-04',
    slug: 'kashmiri-chilli-colour-without-heat',
    title: 'Crimson Without the Burn: The Culinary Role of Kashmiri Chilli',
    subtitle:
      'How Indian regional cooking separates colour, fruitiness, and heat in the chilli bowl.',
    topic: 'Regional Cuisine',
    readTime: '5 min read',
    publishedAt: 'July 2026',
    author: 'Aaranya Editorial Kitchen',
    heroImage: '/images/prod-kashmiri-chilli.jpg',
    excerpt:
      'A common misconception outside India is that deep red dishes are fiercely hot. In truth, the most luminous crimson gravies rely on the gentle, fruity warmth of Kashmiri mirch.',
    relatedProductSlugs: ['kashmiri-chilli-powder', 'garam-masala'],
    sections: [
      {
        heading: 'Fruity Warmth Over Sharp Capsaicin',
        paragraphs: [
          'Selected for its thick, wrinkled pericarp and high natural carotenoid content, Kashmiri chilli offers a sweet, sun-dried pepper aroma. Cooks can use a generous spoonful to achieve a rich rogan without overpowering delicate ingredients like paneer, lotus stem, or slow-cooked lentils.'
        ]
      }
    ]
  },
  {
    id: 'jrn-05',
    slug: 'indian-spice-origins-respecting-harvest',
    title: 'Respecting the Harvest: Why Seasonality Matters in the Spice Pantry',
    subtitle:
      'We often think of dried spices as timeless, yet every jar begins as an agricultural harvest shaped by soil, monsoon, and sun.',
    topic: 'Sourcing',
    readTime: '6 min read',
    publishedAt: 'July 2026',
    author: 'Aaranya Sourcing Desk',
    heroImage: '/images/category-whole.jpg',
    excerpt:
      'Like tea, coffee, or olive oil, spices carry the imprint of their growing season. Treating them as agricultural produce rather than shelf commodities changes how we cook.',
    relatedProductSlugs: ['black-pepper', 'green-cardamom', 'whole-cumin'],
    sections: [
      {
        heading: 'From Field to Small-Batch Mill',
        paragraphs: [
          'Across India’s diverse climatic zones ([SOURCING REGION]), each spice follows its own calendar—from winter-harvested cumin and coriander seeds to monsoon-nurtured peppercorns and cardamom pods.',
          'By selecting clean, mature lots and milling in smaller cycles rather than holding ground powder in bulk warehouses for years, the connection between harvest and kitchen table remains intact.'
        ]
      }
    ]
  },
  {
    id: 'jrn-06',
    slug: 'philosophy-of-garam-masala',
    title: 'The Architecture of Garam Masala: Eleven Spices in Conversation',
    subtitle:
      'Why Indian households guard their finishing blend proportions—and how sweet pods balance earthy seeds.',
    topic: 'Food Culture',
    readTime: '5 min read',
    publishedAt: 'June 2026',
    author: 'Aaranya Editorial Kitchen',
    heroImage: '/images/category-blends.jpg',
    excerpt:
      'The word “garam” translates not to chilli-hot, but to warming. A great garam masala is a chord of eleven spices where none dominates.',
    relatedProductSlugs: ['garam-masala', 'green-cardamom', 'black-pepper'],
    sections: [
      {
        heading: 'Sweet Barks, Floral Pods, and Earthy Seeds',
        paragraphs: [
          'A balanced garam masala rests on three pillars: an earthy foundation of coriander and cumin; a pungent core of black pepper and cloves; and a lifted canopy of green cardamom, black cardamom, mace, nutmeg, star anise, and cinnamon.',
          'Because delicate green cardamom pods and mace blades release their aromas at a much lower temperature than dense coriander or cumin seeds, roasting each spice separately before milling preserves the full spectrum of notes.'
        ]
      }
    ]
  }
];

export function getJournalBySlug(slug: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}
