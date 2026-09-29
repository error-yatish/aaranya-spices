import { Recipe } from '../types/ecommerce';

export const RECIPES: Recipe[] = [
  {
    id: 'rec-01',
    slug: 'paneer-tikka',
    title: 'Charred Kashmiri Paneer Tikka',
    subtitle: 'Thick hung-curd marinade perfumed with Kashmiri chilli, roasted cumin, and garam masala.',
    category: 'Festive',
    prepTime: '25 mins',
    cookTime: '15 mins',
    totalTime: '40 mins',
    servings: 4,
    difficulty: 'Easy',
    image: '/images/prod-kashmiri-chilli.jpg',
    description:
      'When Kashmiri chilli powder meets warm smoked mustard oil and thick hung curd, it creates a velvety crimson coat that chars beautifully at the edges while keeping the paneer tender inside.',
    keySpices: [
      { productSlug: 'kashmiri-chilli-powder', name: 'Kashmiri Chilli Powder', amount: '1.5 tbsp' },
      { productSlug: 'turmeric-powder', name: 'Turmeric Powder', amount: '1/2 tsp' },
      { productSlug: 'cumin-powder', name: 'Cumin Powder', amount: '1 tsp' },
      { productSlug: 'garam-masala', name: 'Garam Masala', amount: '3/4 tsp' }
    ],
    ingredients: [
      {
        group: 'For the Spiced Marinade',
        items: [
          '3/4 cup thick hung curd (strained Greek-style yogurt)',
          '2 tbsp mustard oil (or neutral oil), warmed until lightly smoking',
          '1.5 tbsp Aaranya Kashmiri Chilli Powder',
          '1/2 tsp Aaranya Turmeric Powder',
          '1 tsp Aaranya Cumin Powder',
          '3/4 tsp Aaranya Garam Masala',
          '1 tbsp roasted besan (gram flour)',
          '1 tbsp ginger-garlic paste',
          '1 tsp kasuri methi (dried fenugreek leaves), crushed',
          'Juice of half a lemon & sea salt to taste'
        ]
      },
      {
        group: 'For the Skewers',
        items: [
          '400g fresh malai paneer, cut into 1.5-inch cubes',
          '1 large red onion, cut into thick petals',
          '1 green & 1 red bell pepper, cut into squares',
          'Melted ghee for basting & fresh mint chutney to serve'
        ]
      }
    ],
    instructions: [
      {
        step: 1,
        title: 'Bloom the Kashmiri Chilli in Warm Oil',
        text: 'Heat the mustard oil in a small tadka pan until it just wisps smoke, then remove from heat and let it cool for 45 seconds. Whisk in the Aaranya Kashmiri Chilli Powder and Turmeric Powder so the warm oil unlocks their deep crimson-gold colour without scorching.'
      },
      {
        step: 2,
        title: 'Whisk the Hung Curd Marinade',
        text: 'In a wide mixing bowl, whisk the spiced oil with hung curd, roasted besan, ginger-garlic paste, Aaranya Cumin Powder, Garam Masala, crushed kasuri methi, lemon juice, and salt until glossy and thick.'
      },
      {
        step: 3,
        title: 'Coat & Rest',
        text: 'Gently fold the paneer cubes, onion petals, and bell peppers into the marinade using your fingers so the paneer does not break. Cover and rest for 20 to 30 minutes at cool room temperature.'
      },
      {
        step: 4,
        title: 'Skewer & Char',
        text: 'Thread the paneer and vegetables onto skewers. Grill in a preheated 230°C oven under the broiler (or sear in a hot cast-iron skillet) for 10–12 minutes, turning once and basting with melted ghee until the edges blister and char.'
      }
    ],
    chefNote:
      'Blooming Kashmiri chilli powder in warm—never boiling—oil for 30 seconds before whisking in the yogurt is the secret to achieving a deep crimson colour naturally.'
  },
  {
    id: 'rec-02',
    slug: 'homestyle-dal-tadka',
    title: 'Double-Tempered Homestyle Dal Tadka',
    subtitle: 'Slow-simmered yellow lentils finished with crackling cumin, garlic, and crimson chilli ghee.',
    category: 'Everyday Indian',
    prepTime: '15 mins',
    cookTime: '30 mins',
    totalTime: '45 mins',
    servings: 4,
    difficulty: 'Easy',
    image: '/images/signature-turmeric.jpg',
    description:
      'The soul of everyday Indian comfort food lies in the contrast between velvety, turmeric-simmered lentils and the final sizzle of whole cumin seeds, golden garlic, and Kashmiri chilli poured over the top.',
    keySpices: [
      { productSlug: 'turmeric-powder', name: 'Turmeric Powder', amount: '1/2 tsp' },
      { productSlug: 'whole-cumin', name: 'Cumin Seeds', amount: '1.5 tsp' },
      { productSlug: 'kashmiri-chilli-powder', name: 'Kashmiri Chilli Powder', amount: '1 tsp' },
      { productSlug: 'garam-masala', name: 'Garam Masala', amount: '1/2 tsp' }
    ],
    ingredients: [
      {
        group: 'For the Lentil Base',
        items: [
          '3/4 cup toor dal (split pigeon peas) & 1/4 cup masoor dal, rinsed & soaked 20 mins',
          '3 cups water',
          '1/2 tsp Aaranya Turmeric Powder',
          '1 tsp ghee',
          'Sea salt to taste'
        ]
      },
      {
        group: 'For the Double Tadka (Tempering)',
        items: [
          '2.5 tbsp pure cow’s ghee',
          '1.5 tsp Aaranya Whole Cumin Seeds',
          '6 cloves garlic, finely sliced',
          '1 medium red onion & 1 ripe tomato, finely chopped',
          '1 tsp Aaranya Coriander Powder',
          '1/2 tsp Aaranya Garam Masala',
          '1 tsp Aaranya Kashmiri Chilli Powder',
          'Fresh coriander leaves & lemon wedges'
        ]
      }
    ],
    instructions: [
      {
        step: 1,
        title: 'Simmer the Lentils with Turmeric',
        text: 'Place the soaked dals in a heavy pot or pressure cooker with water, salt, 1 tsp ghee, and Aaranya Turmeric Powder. Cook until soft and creamy, then whisk gently with a wooden mathani.'
      },
      {
        step: 2,
        title: 'Build the First Masala Base',
        text: 'Warm 1.5 tbsp ghee in a skillet. Add 1 tsp Aaranya Cumin Seeds and let them crackle for 10 seconds. Sauté onions until golden, add tomatoes and Coriander Powder, and cook until the masala glistens. Fold in the cooked dal and simmer for 5 minutes with Garam Masala.'
      },
      {
        step: 3,
        title: 'Pour the Final Crimson Ghee Tadka',
        text: 'Just before serving, heat the remaining 1 tbsp ghee in a small tadka ladle. Add 1/2 tsp Cumin Seeds and sliced garlic. Once the garlic turns golden, take off the flame, stir in Aaranya Kashmiri Chilli Powder, and immediately pour sizzling over the bowl of dal.'
      }
    ],
    chefNote:
      'Always turn off the flame before adding Kashmiri chilli powder to the final ghee tadka—residual heat in the ghee is enough to bloom the aroma and colour.'
  },
  {
    id: 'rec-03',
    slug: 'spiced-roast-cauliflower',
    title: 'Whole-Roasted Gobi Musallam with Crushed Coriander',
    subtitle: 'Caramelised cauliflower florets crusted with crushed coriander seeds, turmeric, and black pepper.',
    category: 'Vegetarian',
    prepTime: '15 mins',
    cookTime: '35 mins',
    totalTime: '50 mins',
    servings: 4,
    difficulty: 'Medium',
    image: '/images/prod-coriander-seeds.jpg',
    description:
      'High-heat roasting caramelises the natural sugars in cauliflower, creating the ideal canvas for coarsely crushed coriander seeds, freshly cracked black pepper, and earthy turmeric.',
    keySpices: [
      { productSlug: 'coriander-seeds', name: 'Coriander Seeds', amount: '1 tbsp' },
      { productSlug: 'black-pepper', name: 'Black Pepper', amount: '1 tsp' },
      { productSlug: 'turmeric-powder', name: 'Turmeric Powder', amount: '3/4 tsp' },
      { productSlug: 'cumin-powder', name: 'Cumin Powder', amount: '1 tsp' }
    ],
    ingredients: [
      {
        group: 'Main Ingredients',
        items: [
          '1 medium head fresh cauliflower, cut into large steak-style florets',
          '3 tbsp cold-pressed sesame or olive oil',
          '1 tbsp Aaranya Coriander Seeds, coarsely crushed in a mortar',
          '1 tsp Aaranya Black Peppercorns, freshly cracked',
          '3/4 tsp Aaranya Turmeric Powder',
          '1 tsp Aaranya Cumin Powder',
          '1/2 tsp Aaranya Garam Masala',
          'Pomegranate jewels, toasted almonds & herbed yogurt to serve'
        ]
      }
    ],
    instructions: [
      {
        step: 1,
        title: 'Crush the Whole Spices',
        text: 'Lightly warm the Aaranya Coriander Seeds and Black Peppercorns in a dry pan for 45 seconds until fragrant, then crush coarsely in a stone mortar so textured fragments remain.'
      },
      {
        step: 2,
        title: 'Toss & Roast',
        text: 'Whisk the crushed spices with oil, Aaranya Turmeric Powder, Cumin Powder, and salt. Coat the cauliflower florets thoroughly and roast at 210°C for 30–35 minutes until deeply golden and tender at the stem.'
      },
      {
        step: 3,
        title: 'Finish with Garam Masala',
        text: 'Dust warm from the oven with Aaranya Garam Masala and serve over chilled herbed yogurt scattered with pomegranate and almonds.'
      }
    ],
    chefNote:
      'Leaving the coriander seeds coarsely cracked rather than finely powdered gives every bite of roasted cauliflower a burst of sweet citrus crunch.'
  },
  {
    id: 'rec-04',
    slug: 'malabar-pepper-rasam',
    title: 'Warming Malabar Black Pepper & Cumin Rasam',
    subtitle: 'A clear, restorative South Indian tamarind broth scented with freshly pounded pepper and jeera.',
    category: 'Regional',
    prepTime: '10 mins',
    cookTime: '15 mins',
    totalTime: '25 mins',
    servings: 4,
    difficulty: 'Quick Meals' === 'Quick Meals' ? 'Easy' : 'Easy',
    image: '/images/prod-black-pepper.jpg',
    description:
      'Prepared in twenty minutes with a mortar and pestle, Milagu Jeera Rasam celebrates the piney, citrus warmth of freshly crushed black peppercorns and whole cumin seeds.',
    keySpices: [
      { productSlug: 'black-pepper', name: 'Black Pepper', amount: '1.5 tsp' },
      { productSlug: 'whole-cumin', name: 'Cumin Seeds', amount: '1.5 tsp' },
      { productSlug: 'turmeric-powder', name: 'Turmeric Powder', amount: '1/2 tsp' }
    ],
    ingredients: [
      {
        group: 'Rasam Infusion',
        items: [
          '1.5 tsp Aaranya Whole Black Pepper',
          '1.5 tsp Aaranya Whole Cumin Seeds',
          '4 cloves garlic, skin-on, bruised',
          '1/2 tsp Aaranya Turmeric Powder',
          'Small lemon-sized ball of aged tamarind soaked in 2.5 cups warm water',
          '1 ripe tomato, hand-crushed',
          '1 tbsp ghee, mustard seeds & fresh curry leaves'
        ]
      }
    ],
    instructions: [
      {
        step: 1,
        title: 'Pound Pepper, Cumin & Garlic',
        text: 'In a stone mortar, pound the Aaranya Black Peppercorns and Whole Cumin Seeds into a coarse powder, then bruise in the garlic cloves.'
      },
      {
        step: 2,
        title: 'Simmer the Tamarind & Tomato',
        text: 'Simmer the extracted tamarind water with crushed tomato, Aaranya Turmeric Powder, salt, and half the pounded pepper-cumin mixture for 8 minutes until the raw tamarind note mellows.'
      },
      {
        step: 3,
        title: 'Temper & Froth',
        text: 'Add 1.5 cups water and bring just to a gentle froth—do not boil vigorously. Pour over a ghee tempering of mustard seeds, curry leaves, and the remaining pounded pepper-cumin mix. Cover immediately.'
      }
    ],
    chefNote:
      'Never let rasam come to a rolling boil after adding the final pepper-cumin mix; taking it off the flame as soon as a ring of foam appears preserves the volatile aromatics.'
  },
  {
    id: 'rec-05',
    slug: 'cardamom-saffron-kheer',
    title: 'Slow-Simmered Elaichi Rice Kheer',
    subtitle: 'Heirloom short-grain rice reduced slowly in full-cream milk with freshly crushed green cardamom.',
    category: 'Festive',
    prepTime: '15 mins',
    cookTime: '45 mins',
    totalTime: '60 mins',
    servings: 6,
    difficulty: 'Slow Simmer',
    image: '/images/category-whole.jpg',
    description:
      'A study in patience and restraint: three simple ingredients—milk, aromatic short-grain rice, and freshly cracked Aaranya Green Cardamom pods—reduced slowly until creamy and fragrant.',
    keySpices: [
      { productSlug: 'green-cardamom', name: 'Green Cardamom Pods', amount: '6 pods' }
    ],
    ingredients: [
      {
        group: 'Ingredients',
        items: [
          '1 litre full-cream milk',
          '1/4 cup gobindobhog or basmati rice, washed & soaked 20 mins',
          '6 Aaranya Green Cardamom Pods, husked and seeds finely crushed',
          '1/3 cup organic raw sugar or jaggery (to taste)',
          'Slivered pistachios and almonds, lightly toasted in ghee'
        ]
      }
    ],
    instructions: [
      {
        step: 1,
        title: 'Reduce the Milk & Rice',
        text: 'Bring the milk to a gentle boil in a heavy brass or steel kadai. Drain the soaked rice, stir into the milk, and simmer on low heat for 35–40 minutes, stirring the cream (malai) from the sides back into the pot.'
      },
      {
        step: 2,
        title: 'Perfume with Freshly Crushed Cardamom',
        text: 'Once the rice grains are soft and the milk has thickened to a custard-like consistency, stir in the sugar and freshly crushed Aaranya Green Cardamom seeds. Simmer 3 more minutes and garnish with toasted nuts.'
      }
    ],
    chefNote:
      'Crack the green cardamom pods right before adding them to the thickened milk; pre-ground cardamom loses half its floral top notes within hours.'
  },
  {
    id: 'rec-06',
    slug: 'jeera-pepper-aloo',
    title: 'Crisp Pahadi Jeera & Coriander Aloo',
    subtitle: 'Golden baby potatoes tossed in crackling cumin seeds, crushed coriander, and Kashmiri chilli.',
    category: 'Quick Meals',
    prepTime: '10 mins',
    cookTime: '15 mins',
    totalTime: '25 mins',
    servings: 4,
    difficulty: 'Easy',
    image: '/images/prod-cumin-seeds.jpg',
    description:
      'A weekday staple elevated by generous whole cumin seeds and freshly milled coriander powder that cling to crisp, ghee-roasted potatoes.',
    keySpices: [
      { productSlug: 'whole-cumin', name: 'Cumin Seeds', amount: '2 tsp' },
      { productSlug: 'coriander-powder', name: 'Coriander Powder', amount: '1.5 tsp' },
      { productSlug: 'turmeric-powder', name: 'Turmeric Powder', amount: '1/2 tsp' },
      { productSlug: 'kashmiri-chilli-powder', name: 'Kashmiri Chilli Powder', amount: '1 tsp' }
    ],
    ingredients: [
      {
        group: 'Ingredients',
        items: [
          '500g baby potatoes, boiled until just tender, peeled & halved',
          '2 tbsp ghee or mustard oil',
          '2 tsp Aaranya Whole Cumin Seeds',
          '1.5 tsp Aaranya Coriander Powder',
          '1/2 tsp Aaranya Turmeric Powder',
          '1 tsp Aaranya Kashmiri Chilli Powder',
          '1 tsp amchur (dry mango powder) & fresh coriander leaves'
        ]
      }
    ],
    instructions: [
      {
        step: 1,
        title: 'Crackle the Cumin Seeds',
        text: 'Heat ghee in a wide cast-iron skillet. Add Aaranya Whole Cumin Seeds and let them sizzle until nutty and fragrant.'
      },
      {
        step: 2,
        title: 'Crisp the Potatoes & Coat in Spices',
        text: 'Lay the halved potatoes cut-side down and sear undisturbed for 4 minutes until golden. Toss with Turmeric, Coriander Powder, and Kashmiri Chilli Powder on low heat for 2 minutes so the spices form a fragrant crust.'
      }
    ],
    chefNote:
      'Letting boiled potatoes cool completely before pan-roasting ensures crisp golden edges that hold onto the whole cumin seeds.'
  }
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return RECIPES.find((r) => r.slug === slug);
}
