import { Product } from '../types/ecommerce';

export const PRODUCTS: Product[] = [
  {
    id: 'aar-turmeric-01',
    sku: 'AAR-GRD-TRM',
    name: 'Turmeric Powder',
    slug: 'turmeric-powder',
    category: 'ground-spices',
    categoryLabel: 'Ground Spices',
    shortDescriptor: 'Warm, earthy depth with a deep golden hue.',
    description:
      'Finely milled from whole cured turmeric rhizomes selected for their rich golden colour, warm aroma, and balanced earthy character. A foundational essential for everyday dals, curries, and slow-simmered gravies.',
    editorialStory:
      'Known across Indian kitchens as haldi, turmeric is more than colour—it is the quiet backbone of savoury cooking. When bloomed gently in warm ghee or oil, its woody, musky aroma anchors brighter aromatics like ginger, garlic, and cumin.',
    ingredients: '100% Pure Ground Turmeric (Curcuma longa). No added colours or anti-caking agents.',
    origin: 'India — [SOURCING REGION]',
    sourcingNote:
      'Selected from Indian turmeric harvests during the dry winter curing season. Traceability batch reference recorded on every jar. [CERTIFICATION]',
    processing:
      'Whole sun-cured rhizomes cleaned, sorted, and milled in small batches to preserve volatile aromatic oils.',
    packaging:
      'Packed in UV-protective amber glass jars and sealed pouches to shield pigment and aroma from light and moisture.',
    shelfLife: '12 months from packaging date when stored sealed.',
    storageInstructions:
      'Store in a cool, dry cupboard away from direct sunlight and stove heat. Always use a dry spoon.',
    aromaNotes: ['Warm Earth', 'Fresh Ginger Root', 'Soft Citrus Peel', 'Woody Musk'],
    culinaryUses: [
      'Bloom 1/2 teaspoon in warm ghee at the start of everyday dal tadka or sabzi.',
      'Whisk into spiced yogurt marinades for paneer tikka or roasted vegetables.',
      'Simmer with crushed black pepper and cardamom in warm milk or broth.'
    ],
    whyYouWillLoveIt: [
      {
        title: 'Deep Natural Colour',
        description:
          'Imparts a luminous golden-ochre tone to dals, rice, and curries with just a small pinch.'
      },
      {
        title: 'Balanced Earthy Aroma',
        description:
          'Milled with care so the powder retains its rounded, peppery warmth without harsh bitterness.'
      },
      {
        title: 'Pure Single Ingredient',
        description:
          'Made solely from whole cured turmeric rhizomes with no fillers, starches, or synthetic dyes.'
      }
    ],
    images: {
      primary: '/images/prod-turmeric-powder.jpg',
      secondary: '/images/signature-turmeric.jpg',
      gallery: [
        '/images/prod-turmeric-powder.jpg',
        '/images/signature-turmeric.jpg',
        '/images/category-ground.jpg'
      ],
      alt: 'Aaranya Premium Turmeric Powder in amber glass jar beside cured turmeric rhizomes'
    },
    variants: [
      { weight: '100g', sku: 'AAR-GRD-TRM-100', price: 220, inStock: true, inventoryCount: 48 },
      { weight: '200g', sku: 'AAR-GRD-TRM-200', price: 390, compareAtPrice: 440, inStock: true, inventoryCount: 35 },
      { weight: '500g', sku: 'AAR-GRD-TRM-500', price: 880, compareAtPrice: 990, inStock: true, inventoryCount: 19 }
    ],
    rating: 4.9,
    reviewCount: 42,
    isBestseller: true,
    isSignature: true,
    relatedRecipeSlugs: ['paneer-tikka', 'homestyle-dal-tadka', 'spiced-roast-cauliflower'],
    reviews: [
      {
        id: 'rev-trm-1',
        author: 'Meera Krishnan',
        location: 'Bengaluru',
        rating: 5,
        date: 'August 2026',
        title: 'Unmistakable aroma the moment you open the lid',
        comment:
          'You only need half the usual quantity in everyday sambar and dal. The fragrance when it hits warm ghee feels like home-pounded haldi.',
        verifiedPurchase: true,
        variantPurchased: '200g'
      },
      {
        id: 'rev-trm-2',
        author: 'Rohan Deshmukh',
        location: 'Mumbai',
        rating: 5,
        date: 'July 2026',
        title: 'Clean, earthy flavour without any chalkiness',
        comment:
          'Most packaged turmeric tastes dusty if you add too much. This one has a clean, floral-earthy note that rounds out curries beautifully.',
        verifiedPurchase: true,
        variantPurchased: '100g'
      },
      {
        id: 'rev-trm-3',
        author: 'Ananya Sen',
        location: 'Kolkata',
        rating: 5,
        date: 'June 2026',
        title: 'Thoughtful amber jar packaging',
        comment:
          'Love that it comes in dark glass that keeps light out. The colour stays vibrant down to the last spoonful.',
        verifiedPurchase: true,
        variantPurchased: '500g'
      }
    ],
    faqs: [
      {
        question: 'How much Aaranya Turmeric Powder should I use in everyday cooking?',
        answer:
          'Because our turmeric is milled from aromatic whole rhizomes without fillers, 1/4 to 1/2 teaspoon is sufficient for a dish serving four.'
      },
      {
        question: 'Does this turmeric contain any added colour or starch?',
        answer:
          'No. It consists of 100% pure ground turmeric with no added starch, artificial colouring, or anti-caking agents.'
      },
      {
        question: 'Should I store the jar in the refrigerator?',
        answer:
          'Refrigeration is not required. Keep the lid tightly closed in a cool, dark cabinet away from steam and stove heat.'
      }
    ]
  },
  {
    id: 'aar-chilli-02',
    sku: 'AAR-GRD-KCH',
    name: 'Kashmiri Chilli Powder',
    slug: 'kashmiri-chilli-powder',
    category: 'ground-spices',
    categoryLabel: 'Ground Spices',
    shortDescriptor: 'Vibrant crimson colour with gentle, fruity warmth.',
    description:
      'Ground from whole sun-dried Kashmiri chillies prized for their deep ruby-red hue and mild, sweet-fruity heat. Crafted to give Indian gravies, tikkas, and tadkas a rich natural colour without overwhelming spice.',
    editorialStory:
      'True Kashmiri chilli is celebrated for restraint. Rather than sharp heat, it brings a rounded, almost sun-dried tomato and berry-like warmth alongside a signature brick-crimson sheen when tempered in oil.',
    ingredients: '100% Pure Ground Kashmiri Red Chillies (Capsicum annuum).',
    origin: 'India — [SOURCING REGION]',
    sourcingNote:
      'Sorted from whole wrinkly-skinned dried chillies selected for deep natural pigment and mild Scoville profile. [CERTIFICATION]',
    processing:
      'De-stemmed and slow-milled in small lots with a touch of natural seed oil retention to keep the powder supple and vibrant.',
    packaging:
      'Sealed in airtight amber glass and barrier pouches to prevent oxidation and colour fading.',
    shelfLife: '12 months from packaging date.',
    storageInstructions:
      'Keep tightly sealed in a cool, dark place. In high-humidity monsoon months, keep away from cooking steam.',
    aromaNotes: ['Sun-Dried Fruit', 'Sweet Paprika', 'Gentle Smoke', 'Warm Pepper'],
    culinaryUses: [
      'Whisk into hung curd and mustard oil marinades for charred Paneer Tikka.',
      'Bloom gently in warm ghee with cumin seeds for a final crimson tadka over dal.',
      'Build rich tomato-onion gravies for Kashmiri Dum Aloo and Rogan Josh.'
    ],
    whyYouWillLoveIt: [
      {
        title: 'Rich Natural Crimson',
        description:
          'Gives gravies and marinades a deep, appetising red hue without synthetic food dyes.'
      },
      {
        title: 'Gentle, Approachable Heat',
        description:
          'Mild enough for generous use so the sweet, fruity pepper character shines through.'
      },
      {
        title: 'Stemless Whole Pod Milling',
        description:
          'Stems are removed prior to grinding for a cleaner texture and brighter colour.'
      }
    ],
    images: {
      primary: '/images/prod-kashmiri-chilli.jpg',
      secondary: '/images/category-ground.jpg',
      gallery: [
        '/images/prod-kashmiri-chilli.jpg',
        '/images/category-ground.jpg',
        '/images/hero-spices.jpg'
      ],
      alt: 'Aaranya Kashmiri Chilli Powder in amber glass jar beside whole dried Kashmiri chillies'
    },
    variants: [
      { weight: '100g', sku: 'AAR-GRD-KCH-100', price: 280, inStock: true, inventoryCount: 39 },
      { weight: '200g', sku: 'AAR-GRD-KCH-200', price: 520, compareAtPrice: 560, inStock: true, inventoryCount: 24 },
      { weight: '500g', sku: 'AAR-GRD-KCH-500', price: 1180, compareAtPrice: 1350, inStock: true, inventoryCount: 12 }
    ],
    rating: 4.9,
    reviewCount: 56,
    isBestseller: true,
    relatedRecipeSlugs: ['paneer-tikka', 'homestyle-dal-tadka'],
    reviews: [
      {
        id: 'rev-kch-1',
        author: 'Vikramaditya Nair',
        location: 'Kochi',
        rating: 5,
        date: 'September 2026',
        title: 'Incredible colour and fruity aroma',
        comment:
          'Used this for paneer tikka and dal makhani over the weekend. The deep red rogan on top looked restaurant-quality with very mild, pleasant heat.',
        verifiedPurchase: true,
        variantPurchased: '200g'
      },
      {
        id: 'rev-kch-2',
        author: 'Shruti Kapoor',
        location: 'New Delhi',
        rating: 5,
        date: 'August 2026',
        title: 'Kids can enjoy our curries now',
        comment:
          'So glad to find a Kashmiri mirch that actually has that sweet dried-chilli aroma instead of just burning heat.',
        verifiedPurchase: true,
        variantPurchased: '100g'
      }
    ],
    faqs: [
      {
        question: 'How spicy is Aaranya Kashmiri Chilli Powder?',
        answer:
          'It is mild in heat compared to Guntur or bird’s eye chillies, prized primarily for its fruity aroma and deep crimson colour.'
      },
      {
        question: 'How do I get the best colour in curries?',
        answer:
          'Add the chilli powder to warm (not smoking-hot) ghee or oil along with a splash of water or sautéed onions so the natural pigments bloom without scorching.'
      }
    ]
  },
  {
    id: 'aar-coriander-pwd-03',
    sku: 'AAR-GRD-COR',
    name: 'Coriander Powder',
    slug: 'coriander-powder',
    category: 'ground-spices',
    categoryLabel: 'Ground Spices',
    shortDescriptor: 'Citrusy, floral warmth that binds everyday curries.',
    description:
      'Freshly milled from plump, sun-dried Indian coriander seeds with a bright lemony-sage aroma. Serves as the gentle, aromatic body of North and South Indian gravies, dry vegetable stir-fries, and spice marinades.',
    editorialStory:
      'Coriander powder (dhaniya) is often the most generously used ground spice in the Indian masala dani, yet the quickest to lose its top notes when mass-stored. Milling in small runs preserves its sweet citrus blossom character.',
    ingredients: '100% Pure Ground Coriander Seeds (Coriandrum sativum).',
    origin: 'India — [SOURCING REGION]',
    sourcingNote:
      'Sourced from split-free whole coriander harvests selected for essential oil fragrance. [CERTIFICATION]',
    processing:
      'Cleaned via gravity separation and slow-ground without heavy roasting to preserve fresh green-gold citrus notes.',
    packaging:
      'Packed in UV-shielded amber glass and resealable craft pouches for lasting freshness.',
    shelfLife: '10 months from packaging date.',
    storageInstructions: 'Keep sealed in a cool, dry place away from direct light.',
    aromaNotes: ['Crushed Citrus Leaf', 'Warm Sage', 'Toasted Nut', 'Meadow Blossom'],
    culinaryUses: [
      'Use 1 to 2 teaspoons as the aromatic base for onion-tomato masala gravies.',
      'Toss with roasted cumin and amchur over crisp bhindi or roasted cauliflower.',
      'Combine with fennel and black pepper for coastal vegetable stews.'
    ],
    whyYouWillLoveIt: [
      {
        title: 'Fresh Citrus Top Notes',
        description:
          'Retains the delicate lemon-floral scent of freshly crushed dhaniya seeds.'
      },
      {
        title: 'Natural Gravy Body',
        description:
          'Gently thickens and harmonises onion, tomato, and yogurt-based curries.'
      },
      {
        title: 'Small-Batch Milled',
        description:
          'Ground in controlled runs so it arrives in your kitchen vibrant rather than flat.'
      }
    ],
    images: {
      primary: '/images/prod-coriander-powder.jpg',
      secondary: '/images/prod-coriander-seeds.jpg',
      gallery: [
        '/images/prod-coriander-powder.jpg',
        '/images/prod-coriander-seeds.jpg',
        '/images/category-ground.jpg'
      ],
      alt: 'Aaranya Coriander Powder in amber glass jar with brass spoon and whole coriander seeds'
    },
    variants: [
      { weight: '100g', sku: 'AAR-GRD-COR-100', price: 190, inStock: true, inventoryCount: 52 },
      { weight: '200g', sku: 'AAR-GRD-COR-200', price: 340, compareAtPrice: 380, inStock: true, inventoryCount: 41 },
      { weight: '500g', sku: 'AAR-GRD-COR-500', price: 760, compareAtPrice: 880, inStock: true, inventoryCount: 22 }
    ],
    rating: 4.8,
    reviewCount: 31,
    isBestseller: true,
    relatedRecipeSlugs: ['spiced-roast-cauliflower', 'paneer-tikka'],
    reviews: [
      {
        id: 'rev-cor-1',
        author: 'Kavita Menon',
        location: 'Chennai',
        rating: 5,
        date: 'August 2026',
        title: 'Green, citrusy and genuinely fresh',
        comment:
          'You can tell from the olive-gold colour that the seeds were fresh when ground. Makes simple aloo gobi taste so fragrant.',
        verifiedPurchase: true,
        variantPurchased: '200g'
      }
    ],
    faqs: [
      {
        question: 'Are the coriander seeds roasted before grinding?',
        answer:
          'We lightly sun-warm and clean the seeds rather than dark-roasting them, preserving the bright green-citrus top notes so they can cook naturally in your pan.'
      }
    ]
  },
  {
    id: 'aar-cumin-pwd-04',
    sku: 'AAR-GRD-CUM',
    name: 'Cumin Powder',
    slug: 'cumin-powder',
    category: 'ground-spices',
    categoryLabel: 'Ground Spices',
    shortDescriptor: 'Rich, nutty warmth with unmistakable savoury depth.',
    description:
      'Milled from aromatic Indian cumin seeds to deliver a warm, earthy, and gently toasted flavour profile. Essential for raitas, chaats, marinades, and everyday curry bases.',
    editorialStory:
      'Ground jeera bridges raw and cooked preparations alike—equally at home dusted over chilled yogurt raita with black salt or stirred into a bubbling pot of rajma.',
    ingredients: '100% Pure Ground Cumin Seeds (Cuminum cyminum).',
    origin: 'India — [SOURCING REGION]',
    sourcingNote:
      'Selected from bold, oil-rich cumin harvests across India’s arid western spice belt. [CERTIFICATION]',
    processing:
      'Cleaned of stalks and dust, then gently milled in temperature-monitored batches.',
    packaging:
      'Amber glass jar or barrier pouch engineered to lock in volatile cuminaldehyde aromatics.',
    shelfLife: '10 months from packaging date.',
    storageInstructions: 'Store tightly capped in a cool cupboard away from sunlight.',
    aromaNotes: ['Toasted Earth', 'Warm Pine', 'Savory Bark', 'Anise Undertone'],
    culinaryUses: [
      'Sprinkle over chilled cucumber raita, dahi vada, or fresh seasonal fruit.',
      'Rub onto paneer, potatoes, or root vegetables before roasting.',
      'Simmer with coriander powder in chana masala and rajma gravies.'
    ],
    whyYouWillLoveIt: [
      {
        title: 'Rich Essential Oil Content',
        description:
          'Milled from plump whole seeds so a small pinch releases deep savoury warmth.'
      },
      {
        title: 'Table & Stove Ready',
        description:
          'Balanced to work both as a finishing sprinkle on yogurt and a foundational cooking spice.'
      },
      {
        title: 'Zero Grit',
        description:
          'Thoroughly cleaned prior to milling for a silky, uniform texture.'
      }
    ],
    images: {
      primary: '/images/prod-cumin-powder.jpg',
      secondary: '/images/prod-cumin-seeds.jpg',
      gallery: [
        '/images/prod-cumin-powder.jpg',
        '/images/prod-cumin-seeds.jpg',
        '/images/brand-story.jpg'
      ],
      alt: 'Aaranya Cumin Powder in amber glass jar beside ceramic dish of ground cumin and whole jeera'
    },
    variants: [
      { weight: '100g', sku: 'AAR-GRD-CUM-100', price: 240, inStock: true, inventoryCount: 44 },
      { weight: '200g', sku: 'AAR-GRD-CUM-200', price: 440, compareAtPrice: 480, inStock: true, inventoryCount: 30 },
      { weight: '500g', sku: 'AAR-GRD-CUM-500', price: 980, compareAtPrice: 1120, inStock: true, inventoryCount: 15 }
    ],
    rating: 4.9,
    reviewCount: 29,
    isBestseller: true,
    relatedRecipeSlugs: ['paneer-tikka', 'spiced-roast-cauliflower'],
    reviews: [
      {
        id: 'rev-cum-1',
        author: 'Siddharth Joshi',
        location: 'Pune',
        rating: 5,
        date: 'September 2026',
        title: 'Elevates simple dahi and chaat',
        comment:
          'So fragrant that we keep the 100g jar right on the dining table for raita and buttermilk.',
        verifiedPurchase: true,
        variantPurchased: '100g'
      }
    ],
    faqs: [
      {
        question: 'Can I use this Cumin Powder directly on salads and raita?',
        answer:
          'Yes. Its clean, warm profile makes it ideal both for cooking in gravies and for finishing yogurt, buttermilk, and chaats.'
      }
    ]
  },
  {
    id: 'aar-black-pepper-05',
    sku: 'AAR-WHL-BPP',
    name: 'Black Pepper',
    slug: 'black-pepper',
    category: 'whole-spices',
    categoryLabel: 'Whole Spices',
    shortDescriptor: 'Bold, sun-dried peppercorns with piney, citrus heat.',
    description:
      'Large, heavy-berry whole black peppercorns selected for their complex aroma of resinous pine, dark citrus, and lingering piperine warmth. Ideal for whole tempering, pepper mills, and freshly crushed rasams.',
    editorialStory:
      'Long before chillies reached the subcontinent, black pepper (kali mirch) was India’s original source of culinary fire. Crushed fresh in a stone mortar, it reveals bright floral and woody layers that pre-ground pepper never retains.',
    ingredients: '100% Whole Black Peppercorns (Piper nigrum).',
    origin: 'India — [SOURCING REGION]',
    sourcingNote:
      'Sorted by berry size and bulk density from Indian pepper vine harvests. [CERTIFICATION]',
    processing:
      'Sun-dried on clean mats, size-graded, and air-cleaned without chemical polishing.',
    packaging:
      'Sealed in amber apothecary glass to preserve volatile terpenes and piperine bite.',
    shelfLife: '24 months from packaging date.',
    storageInstructions: 'Store in a cool, dry place away from moisture.',
    aromaNotes: ['Resinous Pine', 'Dark Bergamot', 'Warm Clove', 'Crisp Heat'],
    culinaryUses: [
      'Crush coarsely in a stone mortar for South Indian Milagu Rasam or Pepper Fry.',
      'Bloom whole peppercorns in hot ghee for pulao, khichdi, and biryanis.',
      'Load into a ceramic burr grinder for everyday table seasoning.'
    ],
    whyYouWillLoveIt: [
      {
        title: 'Uniform Bold Berries',
        description:
          'Dense, mature peppercorns that crack cleanly with a complex, citrus-woody bouquet.'
      },
      {
        title: 'Lingering Warmth',
        description:
          'Delivers a rounded, warming heat rather than a flat, dusty burn.'
      },
      {
        title: 'Unpolished Purity',
        description:
          'Naturally sun-dried without mineral oil coating.'
      }
    ],
    images: {
      primary: '/images/prod-black-pepper.jpg',
      secondary: '/images/category-whole.jpg',
      gallery: [
        '/images/prod-black-pepper.jpg',
        '/images/category-whole.jpg',
        '/images/hero-spices.jpg'
      ],
      alt: 'Aaranya Whole Black Peppercorns in amber glass jar beside stone mortar and pestle'
    },
    variants: [
      { weight: '100g', sku: 'AAR-WHL-BPP-100', price: 290, inStock: true, inventoryCount: 60 },
      { weight: '200g', sku: 'AAR-WHL-BPP-200', price: 540, compareAtPrice: 580, inStock: true, inventoryCount: 38 },
      { weight: '500g', sku: 'AAR-WHL-BPP-500', price: 1240, compareAtPrice: 1400, inStock: true, inventoryCount: 20 }
    ],
    rating: 5.0,
    reviewCount: 48,
    isBestseller: true,
    relatedRecipeSlugs: ['homestyle-dal-tadka', 'spiced-roast-cauliflower'],
    reviews: [
      {
        id: 'rev-bpp-1',
        author: 'Arjun Rajagopal',
        location: 'Hyderabad',
        rating: 5,
        date: 'September 2026',
        title: 'The best peppercorns for my grinder',
        comment:
          'Every single peppercorn is large, heavy, and deeply aromatic. When you crush them for pepper rasam, the citrusy smell fills the kitchen.',
        verifiedPurchase: true,
        variantPurchased: '200g'
      }
    ],
    faqs: [
      {
        question: 'Will these peppercorns fit standard pepper mills?',
        answer:
          'Yes. Our bold grade peppercorns are sized to feed smoothly through all standard ceramic and steel burr pepper mills.'
      }
    ]
  },
  {
    id: 'aar-cumin-seeds-06',
    sku: 'AAR-WHL-CUM',
    name: 'Cumin Seeds',
    slug: 'whole-cumin',
    category: 'whole-spices',
    categoryLabel: 'Whole Spices',
    shortDescriptor: 'Plump, aromatic jeera that crackles with nutty fragrance.',
    description:
      'Whole Indian cumin seeds chosen for their bold size, clean appearance, and high essential oil content. The unmistakable first note of countless Indian tadkas, jeera rice, and dry-roasted spice blends.',
    editorialStory:
      'The sound of Indian cooking often begins with whole jeera meeting hot ghee. Within seconds, the seeds swell, darken a shade, and release a warm, nutty perfume that infuses the entire dish.',
    ingredients: '100% Whole Cumin Seeds (Cuminum cyminum).',
    origin: 'India — [SOURCING REGION]',
    sourcingNote:
      'Machine-cleaned and gravity-sorted from Indian cumin harvests to remove stems and chaff. [CERTIFICATION]',
    processing:
      'Triple-sieved and air-classified so the seeds go straight from jar to hot pan.',
    packaging:
      'Packed in airtight amber glass jars and barrier pouches.',
    shelfLife: '18 months from packaging date.',
    storageInstructions: 'Keep tightly sealed in a cool, dry cabinet.',
    aromaNotes: ['Warm Nutmeg-Earth', 'Toasted Grain', 'Savory Herb', 'Dry Wood'],
    culinaryUses: [
      'Temper in hot ghee with dried red chillies and garlic for Homestyle Dal Tadka.',
      'Bloom in ghee before folding in soaked basmati rice for fragrant Jeera Rice.',
      'Dry-roast in a cast-iron skillet and crush coarsely over dahi bhalla.'
    ],
    whyYouWillLoveIt: [
      {
        title: 'Thoroughly Cleaned',
        description:
          'Free from stray stalks, stones, and dust—ready to drop straight into hot oil.'
      },
      {
        title: 'Aromatic Bloom',
        description:
          'Plump seeds rich in natural oils that crackle rapidly without burning prematurely.'
      },
      {
        title: 'Everyday Versatility',
        description:
          'Indispensable for tempering dals, seasoning vegetables, and dry-roasting at home.'
      }
    ],
    images: {
      primary: '/images/prod-cumin-seeds.jpg',
      secondary: '/images/brand-story.jpg',
      gallery: [
        '/images/prod-cumin-seeds.jpg',
        '/images/brand-story.jpg',
        '/images/category-whole.jpg'
      ],
      alt: 'Aaranya Whole Cumin Seeds in amber glass jar beside speckled ceramic pinch bowl'
    },
    variants: [
      { weight: '100g', sku: 'AAR-WHL-CUM-100', price: 210, inStock: true, inventoryCount: 64 },
      { weight: '200g', sku: 'AAR-WHL-CUM-200', price: 380, compareAtPrice: 420, inStock: true, inventoryCount: 45 },
      { weight: '500g', sku: 'AAR-WHL-CUM-500', price: 860, compareAtPrice: 980, inStock: true, inventoryCount: 28 }
    ],
    rating: 4.9,
    reviewCount: 37,
    isBestseller: true,
    relatedRecipeSlugs: ['homestyle-dal-tadka', 'spiced-roast-cauliflower'],
    reviews: [
      {
        id: 'rev-wcum-1',
        author: 'Nandini Rao',
        location: 'Bengaluru',
        rating: 5,
        date: 'August 2026',
        title: 'So clean and fragrant',
        comment:
          'Not a single stem or speck of dust in the jar. The aroma when making jeera rice is wonderful.',
        verifiedPurchase: true,
        variantPurchased: '200g'
      }
    ],
    faqs: [
      {
        question: 'Do I need to pick through or wash these cumin seeds before using?',
        answer:
          'No. Our cumin seeds undergo multi-stage air and gravity cleaning to remove stalks and grit before bottling.'
      }
    ]
  },
  {
    id: 'aar-coriander-seeds-07',
    sku: 'AAR-WHL-COR',
    name: 'Coriander Seeds',
    slug: 'coriander-seeds',
    category: 'whole-spices',
    categoryLabel: 'Whole Spices',
    shortDescriptor: 'Golden-green whole dhaniya with bright lemon-sage notes.',
    description:
      'Whole, unsplit Indian coriander seeds with a delicate, hollow crunch and sweet citrus-floral bouquet. Essential for crushed samosa fillings, kadai masalas, South Indian podis, and home spice grinding.',
    editorialStory:
      'Crushing whole coriander seeds just before cooking unlocks a bright orange-blossom and sage aroma that transforms dry potato sabzis, kadai paneer, and slow-simmered broths.',
    ingredients: '100% Whole Coriander Seeds (Coriandrum sativum).',
    origin: 'India — [SOURCING REGION]',
    sourcingNote:
      'Selected for whole-husk integrity and bright golden-green hue. [CERTIFICATION]',
    processing:
      'Gently sun-cured and air-sorted to retain whole, uncrushed seed spheres.',
    packaging:
      'Packed in UV-protective amber glass jars and sealed pouches.',
    shelfLife: '18 months from packaging date.',
    storageInstructions: 'Store in a cool, dry cupboard away from moisture.',
    aromaNotes: ['Sweet Orange Peel', 'Crushed Sage', 'Floral Honey', 'Light Cedar'],
    culinaryUses: [
      'Crush coarsely in a mortar for Kadai Paneer, samosa potato masala, and pakoras.',
      'Roast with lentils, chillies, and curry leaves for South Indian sambar masala.',
      'Steep whole in pickling brines or Mulligatawny-style lentil soups.'
    ],
    whyYouWillLoveIt: [
      {
        title: 'Whole Unbroken Seeds',
        description:
          'Intact husks keep the delicate citrus essential oils locked inside until you crush them.'
      },
      {
        title: 'Sweet, Floral Profile',
        description:
          'Never woody or musty; brings a lift of citrus brightness to rich dishes.'
      },
      {
        title: 'Ideal for Fresh Grinding',
        description:
          'Toast for 60 seconds in a dry pan to make extraordinary homemade dhaniya powder.'
      }
    ],
    images: {
      primary: '/images/prod-coriander-seeds.jpg',
      secondary: '/images/category-whole.jpg',
      gallery: [
        '/images/prod-coriander-seeds.jpg',
        '/images/category-whole.jpg',
        '/images/brand-story.jpg'
      ],
      alt: 'Aaranya Whole Coriander Seeds in amber glass jar with wooden scoop on travertine stone'
    },
    variants: [
      { weight: '100g', sku: 'AAR-WHL-COR-100', price: 180, inStock: true, inventoryCount: 55 },
      { weight: '200g', sku: 'AAR-WHL-COR-200', price: 320, compareAtPrice: 360, inStock: true, inventoryCount: 34 },
      { weight: '500g', sku: 'AAR-WHL-COR-500', price: 720, compareAtPrice: 820, inStock: true, inventoryCount: 18 }
    ],
    rating: 4.8,
    reviewCount: 24,
    isBestseller: true,
    relatedRecipeSlugs: ['spiced-roast-cauliflower', 'homestyle-dal-tadka'],
    reviews: [
      {
        id: 'rev-wcor-1',
        author: 'Deepak Varma',
        location: 'Jaipur',
        rating: 5,
        date: 'July 2026',
        title: 'Crisp, lemony and whole',
        comment:
          'Great quality sabut dhaniya. Crushed into aloo masala for parathas, the citrus note stands out immediately.',
        verifiedPurchase: true,
        variantPurchased: '200g'
      }
    ],
    faqs: [
      {
        question: 'Are these split dhaniya dal or whole coriander seeds?',
        answer:
          'These are whole, unsplit coriander seeds with their aromatic husks intact.'
      }
    ]
  },
  {
    id: 'aar-garam-masala-08',
    sku: 'AAR-BLD-GRM',
    name: 'Garam Masala',
    slug: 'garam-masala',
    category: 'spice-blends',
    categoryLabel: 'Spice Blends',
    shortDescriptor: 'An eleven-spice finishing blend of warm aromatics.',
    description:
      'A balanced, small-batch blend of green and black cardamom, true cinnamon, cloves, mace, nutmeg, star anise, black pepper, bay leaf, cumin, and coriander. Crafted to be sprinkled at the end of cooking for a fragrant, layered finish.',
    editorialStory:
      'In traditional Indian kitchens, garam masala is never a generic curry powder—it is an aromatic crown added just before serving. We proportion sweet-floral pods and barks generously against earthy seeds so no single spice shouts over the dish.',
    ingredients:
      'Coriander, Cumin, Black Pepper, Green Cardamom, Black Cardamom, Cinnamon, Cloves, Mace (Javitri), Nutmeg (Jaiphal), Star Anise, Indian Bay Leaf (Tejpatta).',
    origin: 'India — Blended from spices across [SOURCING REGION]',
    sourcingNote:
      'Each whole spice is roasted individually to its ideal aroma point before blending and milling. [CERTIFICATION]',
    processing:
      'Individual-spice slow roasting followed by small-batch milling to preserve delicate cardamom and mace notes.',
    packaging:
      'Bottled immediately after blending in UV-shielded amber glass.',
    shelfLife: '10 months from packaging date.',
    storageInstructions:
      'Keep tightly closed away from heat and light. Open only when adding to the pot.',
    aromaNotes: ['Green Cardamom Pod', 'Warm Mace & Clove', 'Sweet Cinnamon Bark', 'Smoky Black Cardamom'],
    culinaryUses: [
      'Fold 1/2 teaspoon into simmering dal, chole, or paneer gravy two minutes before turning off the heat.',
      'Dust lightly over roasted cauliflower, grilled kebabs, or paneer tikka.',
      'Stir into caramelized onions for pulao and festive biryanis.'
    ],
    whyYouWillLoveIt: [
      {
        title: 'Generous Noble Spices',
        description:
          'Formulated with real green cardamom, mace, and cloves rather than being bulked out with cheap cassia or chilli.'
      },
      {
        title: 'Roast-by-Spice Craft',
        description:
          'Cardamom, cloves, and seeds are warmed separately so delicate pods never scorch.'
      },
      {
        title: 'Pure Aroma, Zero Heat Filler',
        description:
          'Contains no red chilli powder or salt—purely warm, fragrant aromatics.'
      }
    ],
    images: {
      primary: '/images/category-blends.jpg',
      secondary: '/images/prod-cumin-powder.jpg',
      gallery: [
        '/images/category-blends.jpg',
        '/images/prod-cumin-powder.jpg',
        '/images/hero-spices.jpg'
      ],
      alt: 'Aaranya Garam Masala blend in stoneware bowl surrounded by star anise, mace, black cardamom and cloves'
    },
    variants: [
      { weight: '100g', sku: 'AAR-BLD-GRM-100', price: 340, inStock: true, inventoryCount: 42 },
      { weight: '200g', sku: 'AAR-BLD-GRM-200', price: 620, compareAtPrice: 680, inStock: true, inventoryCount: 27 },
      { weight: '500g', sku: 'AAR-BLD-GRM-500', price: 1420, compareAtPrice: 1600, inStock: true, inventoryCount: 11 }
    ],
    rating: 5.0,
    reviewCount: 64,
    isBestseller: true,
    relatedRecipeSlugs: ['paneer-tikka', 'homestyle-dal-tadka', 'spiced-roast-cauliflower'],
    reviews: [
      {
        id: 'rev-grm-1',
        author: 'Priya Malhotra',
        location: 'Chandigarh',
        rating: 5,
        date: 'September 2026',
        title: 'Tastes like my grandmother’s winter garam masala',
        comment:
          'You can smell the javitri and elaichi immediately. It doesn’t burn the throat—just wraps the dish in warmth.',
        verifiedPurchase: true,
        variantPurchased: '100g'
      },
      {
        id: 'rev-grm-2',
        author: 'Kabir Bedi',
        location: 'Gurugram',
        rating: 5,
        date: 'August 2026',
        title: 'A tiny pinch transforms everyday dal',
        comment:
          'Finally a garam masala that isn’t 80% coriander and cheap cinnamon. Truly special blend.',
        verifiedPurchase: true,
        variantPurchased: '200g'
      }
    ],
    faqs: [
      {
        question: 'When should I add Garam Masala during cooking?',
        answer:
          'For the brightest aroma, add Garam Masala during the final 1 to 2 minutes of simmering, then cover the pot briefly before serving.'
      }
    ]
  },
  {
    id: 'aar-green-cardamom-09',
    sku: 'AAR-WHL-ELC',
    name: 'Green Cardamom Pods',
    slug: 'green-cardamom',
    category: 'whole-spices',
    categoryLabel: 'Whole Spices',
    shortDescriptor: 'Plump, emerald pods bursting with sweet floral-menthol seeds.',
    description:
      'Bold-grade whole green cardamom pods (chhoti elaichi) filled with sticky, aromatic black seeds. Indispensable for masala chai, festive kheer, biryanis, and fragrant royal gravies.',
    editorialStory:
      'Called the Queen of Spices, green cardamom lends a cool, eucalyptus-floral lift that bridges savoury biryanis and sweet milk puddings with effortless grace.',
    ingredients: '100% Whole Green Cardamom Pods (Elettaria cardamomum).',
    origin: 'India — [SOURCING REGION]',
    sourcingNote:
      'Hand-picked at three-quarter maturity so the pods remain tightly closed and rich in volatile oils. [CERTIFICATION]',
    processing:
      'Cured in controlled warm-air chambers to preserve natural green chlorophyll and essential oils.',
    packaging:
      'Hermetically sealed in amber glass jars to protect against humidity and aroma loss.',
    shelfLife: '18 months from packaging date.',
    storageInstructions: 'Store tightly sealed away from sunlight and stove warmth.',
    aromaNotes: ['Sweet Eucalyptus', 'Lemon Blossom', 'Camphor Dew', 'Warm Honey'],
    culinaryUses: [
      'Bruise 2 pods in a mortar and simmer with fresh ginger and Assam tea leaves for Masala Chai.',
      'Infuse crushed seeds into slow-reduced milk for kheer, phirni, and gulab jamun syrup.',
      'Temper whole pods in ghee for aromatic basmati pulao and korma gravies.'
    ],
    whyYouWillLoveIt: [
      {
        title: '8mm+ Bold Pods',
        description:
          'Plump, heavy pods packed with dark aromatic seeds rather than hollow husks.'
      },
      {
        title: 'Intense Floral Bouquet',
        description:
          'A single bruised pod perfumes an entire pot of chai or rice.'
      },
      {
        title: 'Unbleached Colour',
        description:
          'Naturally cured green pods with zero artificial dye treatment.'
      }
    ],
    images: {
      primary: '/images/category-whole.jpg',
      secondary: '/images/hero-spices.jpg',
      gallery: [
        '/images/category-whole.jpg',
        '/images/hero-spices.jpg',
        '/images/brand-story.jpg'
      ],
      alt: 'Aaranya Whole Green Cardamom Pods on vintage brass spoon'
    },
    variants: [
      { weight: '100g', sku: 'AAR-WHL-ELC-100', price: 580, inStock: true, inventoryCount: 25 },
      { weight: '200g', sku: 'AAR-WHL-ELC-200', price: 1100, compareAtPrice: 1160, inStock: true, inventoryCount: 16 },
      { weight: '500g', sku: 'AAR-WHL-ELC-500', price: 2590, compareAtPrice: 2800, inStock: true, inventoryCount: 8 }
    ],
    rating: 4.9,
    reviewCount: 33,
    isNew: true,
    relatedRecipeSlugs: ['paneer-tikka', 'homestyle-dal-tadka'],
    reviews: [
      {
        id: 'rev-elc-1',
        author: 'Farah Khan',
        location: 'Lucknow',
        rating: 5,
        date: 'September 2026',
        title: 'Full of sticky black seeds inside',
        comment:
          'Every pod I cracked open was packed with dark, fragrant seeds. Makes morning chai feel luxurious.',
        verifiedPurchase: true,
        variantPurchased: '100g'
      }
    ],
    faqs: [
      {
        question: 'Should I use the whole pod or only the black seeds inside?',
        answer:
          'For chai, pulao, and curries, lightly bruise the whole pod and add both husk and seeds. For fine desserts like kheer or barfi, crack the pod and crush only the black seeds, reserving the husks for tea leaves.'
      }
    ]
  },
  {
    id: 'aar-chai-masala-10',
    sku: 'AAR-BLD-CHM',
    name: 'Malabar Chai Masala',
    slug: 'chai-masala',
    category: 'spice-blends',
    categoryLabel: 'Spice Blends',
    shortDescriptor: 'Warming ginger, green cardamom, black pepper & clove for daily chai.',
    description:
      'A comforting, fragrant blend of green cardamom, dry ginger (sonth), black pepper, true cinnamon, cloves, and nutmeg. Proportioned to brew a deeply aromatic, brisk cup of Indian masala chai.',
    editorialStory:
      'Crafted for the quiet ritual of morning and monsoon-afternoon tea. Green cardamom leads with floral sweetness while dry ginger and Malabar black pepper leave a gentle, lingering warmth.',
    ingredients:
      'Green Cardamom, Dry Ginger (Sonth), Black Pepper, Cinnamon, Cloves, Fennel Seeds, Nutmeg.',
    origin: 'India — Blended from spices across [SOURCING REGION]',
    sourcingNote:
      'Coarsely milled so the spices infuse cleanly into simmering tea and milk without turning muddy. [CERTIFICATION]',
    processing:
      'Blended unroasted to preserve bright cardamom and ginger top notes when boiled in water and milk.',
    packaging:
      'Amber glass jar with airtight liner.',
    shelfLife: '10 months from packaging date.',
    storageInstructions: 'Keep sealed next to your tea caddy away from moisture.',
    aromaNotes: ['Crushed Elaichi', 'Warm Ginger Root', 'Sweet Clove', 'Fennel Breeze'],
    culinaryUses: [
      'Add 1/4 teaspoon per two cups of simmering water, tea leaves, and milk.',
      'Whisk into warm almond or dairy milk with jaggery before bedtime.',
      'Fold into shortbread cookie dough or spiced carrot cake batter.'
    ],
    whyYouWillLoveIt: [
      {
        title: 'Cardamom-Forward Balance',
        description:
          'Generous green cardamom balanced with ginger and pepper—never overly clove-heavy.'
      },
      {
        title: 'Coarse Infusion Grind',
        description:
          'Textured to release flavour rapidly in boiling water and strain cleanly.'
      },
      {
        title: 'Pure Whole Spices',
        description:
          'Zero artificial flavouring extracts or sugar fillers.'
      }
    ],
    images: {
      primary: '/images/category-blends.jpg',
      secondary: '/images/category-whole.jpg',
      gallery: ['/images/category-blends.jpg', '/images/category-whole.jpg'],
      alt: 'Aaranya Malabar Chai Masala spice blend'
    },
    variants: [
      { weight: '100g', sku: 'AAR-BLD-CHM-100', price: 360, inStock: true, inventoryCount: 38 },
      { weight: '200g', sku: 'AAR-BLD-CHM-200', price: 660, compareAtPrice: 720, inStock: true, inventoryCount: 21 },
      { weight: '500g', sku: 'AAR-BLD-CHM-500', price: 1490, compareAtPrice: 1680, inStock: true, inventoryCount: 9 }
    ],
    rating: 4.9,
    reviewCount: 27,
    isNew: true,
    relatedRecipeSlugs: ['paneer-tikka', 'homestyle-dal-tadka'],
    reviews: [],
    faqs: [
      {
        question: 'When should I add Chai Masala while brewing tea?',
        answer:
          'Add 1/4 teaspoon for every two cups right after the milk comes to a boil, simmer gently for 60 seconds, then cover and strain.'
      }
    ]
  },
  {
    id: 'aar-biryani-masala-11',
    sku: 'AAR-BLD-BRY',
    name: 'Royal Biryani Masala',
    slug: 'biryani-masala',
    category: 'spice-blends',
    categoryLabel: 'Spice Blends',
    shortDescriptor: 'Fragrant shahi jeera, mace, star anise & stone flower for dum cooking.',
    description:
      'An intricate, aromatic blend inspired by classic dum biryani kitchens—featuring caraway (shahi jeera), mace blades, green and black cardamom, star anise, cloves, and nutmeg.',
    editorialStory:
      'Designed for slow-steamed rice and celebratory table dishes, this blend layers high floral notes with deep, woody undertones that perfume every grain of basmati.',
    ingredients:
      'Shahi Jeera (Caraway), Green Cardamom, Black Cardamom, Mace, Nutmeg, Star Anise, Cinnamon, Cloves, Black Pepper, Coriander, Bay Leaf.',
    origin: 'India — [SOURCING REGION]',
    sourcingNote:
      'Small-batch blended from whole aromatic barks, pods, and seeds. [CERTIFICATION]',
    processing: 'Lightly warmed and milled to a fine, silky powder for marinades and layering.',
    packaging: 'UV-protective amber glass jar.',
    shelfLife: '10 months from packaging date.',
    storageInstructions: 'Store tightly sealed in a cool, dark cabinet.',
    aromaNotes: ['Mace Blossom', 'Shahi Jeera', 'Smoky Cardamom', 'Sweet Star Anise'],
    culinaryUses: [
      'Whisk into yogurt marinades for vegetable, paneer, or meat dum biryani.',
      'Sprinkle between layers of par-boiled basmati rice, fried onions (birista), and saffron milk.',
      'Stir into festive korma and kofta gravies.'
    ],
    whyYouWillLoveIt: [
      {
        title: 'True Dum Aromatics',
        description:
          'Features authentic shahi jeera and mace for that unmistakable celebratory fragrance.'
      },
      {
        title: 'No Artificial Essences',
        description:
          'Relies purely on natural whole spices without synthetic kewra or rose oils.'
      }
    ],
    images: {
      primary: '/images/category-blends.jpg',
      secondary: '/images/hero-spices.jpg',
      gallery: ['/images/category-blends.jpg', '/images/hero-spices.jpg'],
      alt: 'Aaranya Royal Biryani Masala blend'
    },
    variants: [
      { weight: '100g', sku: 'AAR-BLD-BRY-100', price: 380, inStock: true, inventoryCount: 29 },
      { weight: '200g', sku: 'AAR-BLD-BRY-200', price: 690, compareAtPrice: 760, inStock: true, inventoryCount: 17 },
      { weight: '500g', sku: 'AAR-BLD-BRY-500', price: 1580, compareAtPrice: 1760, inStock: true, inventoryCount: 7 }
    ],
    rating: 4.9,
    reviewCount: 19,
    relatedRecipeSlugs: ['paneer-tikka', 'spiced-roast-cauliflower'],
    reviews: [],
    faqs: []
  },
  {
    id: 'aar-dry-ginger-12',
    sku: 'AAR-GRD-SNT',
    name: 'Dry Ginger Powder (Sonth)',
    slug: 'dry-ginger-powder',
    category: 'ground-spices',
    categoryLabel: 'Ground Spices',
    shortDescriptor: 'Warm, zesty sun-dried ginger root with a clean, peppery finish.',
    description:
      'Finely milled from whole sun-cured Indian ginger rhizomes. Brings a concentrated, citrus-warm heat to Kashmiri gravies, festive laddoos, tangy tamarind chutneys, and masala chai.',
    editorialStory:
      'Unlike fresh ginger, which is sharp and juicy, sun-dried sonth develops a rounded, almost caramelised citrus warmth that anchors no-onion-no-garlic gravies and winter confections.',
    ingredients: '100% Pure Ground Dry Ginger (Zingiber officinale).',
    origin: 'India — [SOURCING REGION]',
    sourcingNote: 'Milled from low-fibre cured ginger roots. [CERTIFICATION]',
    processing: 'Cleaned, sliced, sun-dried, and finely sieved after milling.',
    packaging: 'Amber apothecary glass jar.',
    shelfLife: '12 months from packaging date.',
    storageInstructions: 'Store in a dry, cool cabinet.',
    aromaNotes: ['Candied Lemon Peel', 'Warm Gingerbread', 'Clean White Pepper'],
    culinaryUses: [
      'Simmer with fennel powder in Kashmiri-style yogurt gravies (Yakhni and Dum Aloo).',
      'Whisk into sweet date and tamarind (saunth) chutney for chaat.',
      'Brew in morning tea or fold into winter jaggery and sesame sweets.'
    ],
    whyYouWillLoveIt: [
      {
        title: 'Low-Fibre Silky Grind',
        description: 'Sieved carefully so it dissolves smoothly into gravies, chutneys, and milk.'
      },
      {
        title: 'Zesty Lemon-Ginger Notes',
        description: 'Retains bright citrus aromatics alongside deep warming heat.'
      }
    ],
    images: {
      primary: '/images/category-ground.jpg',
      secondary: '/images/prod-turmeric-powder.jpg',
      gallery: ['/images/category-ground.jpg', '/images/prod-turmeric-powder.jpg'],
      alt: 'Aaranya Dry Ginger Powder (Sonth)'
    },
    variants: [
      { weight: '100g', sku: 'AAR-GRD-SNT-100', price: 250, inStock: true, inventoryCount: 31 },
      { weight: '200g', sku: 'AAR-GRD-SNT-200', price: 460, compareAtPrice: 500, inStock: true, inventoryCount: 19 },
      { weight: '500g', sku: 'AAR-GRD-SNT-500', price: 1040, compareAtPrice: 1180, inStock: true, inventoryCount: 10 }
    ],
    rating: 4.8,
    reviewCount: 16,
    relatedRecipeSlugs: ['spiced-roast-cauliflower', 'homestyle-dal-tadka'],
    reviews: [],
    faqs: []
  }
];

export const CATEGORIES_METADATA = [
  {
    slug: 'whole-spices' as const,
    title: 'WHOLE SPICES',
    subtitle: 'Bold aromas. Natural character.',
    description:
      'Intact pods, seeds, barks, and peppercorns selected for their essential oil richness. Designed to be tempered whole in hot ghee or crushed fresh in your mortar.',
    image: '/images/category-whole.jpg'
  },
  {
    slug: 'ground-spices' as const,
    title: 'GROUND SPICES',
    subtitle: 'Pure flavour. Everyday essentials.',
    description:
      'Single-ingredient spices milled in small runs from whole cured harvests—preserving natural colour, volatile top notes, and unmistakable culinary depth.',
    image: '/images/category-ground.jpg'
  },
  {
    slug: 'spice-blends' as const,
    title: 'SPICE BLENDS',
    subtitle: 'Balanced combinations. Crafted for the Indian kitchen.',
    description:
      'Thoughtfully proportioned artisanal masalas where each whole spice is warmed to its individual peak before blending.',
    image: '/images/category-blends.jpg'
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  if (slug === 'cumin-seeds') {
    return PRODUCTS.find((p) => p.slug === 'whole-cumin');
  }
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug?: string): Product[] {
  if (!categorySlug || categorySlug === 'all') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === categorySlug);
}
