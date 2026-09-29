export type SpiceCategory = 'whole-spices' | 'ground-spices' | 'spice-blends';

export type SpiceWeight = '100g' | '200g' | '500g';

export interface ProductVariant {
  weight: SpiceWeight;
  sku: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  inventoryCount: number;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  variantPurchased: SpiceWeight;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: SpiceCategory;
  categoryLabel: string;
  shortDescriptor: string;
  description: string;
  editorialStory: string;
  ingredients: string;
  origin: string;
  sourcingNote: string;
  processing: string;
  packaging: string;
  shelfLife: string;
  storageInstructions: string;
  aromaNotes: string[];
  culinaryUses: string[];
  whyYouWillLoveIt: {
    title: string;
    description: string;
  }[];
  images: {
    primary: string;
    secondary: string;
    gallery: string[];
    alt: string;
  };
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  faqs: ProductFAQ[];
  isBestseller?: boolean;
  isNew?: boolean;
  isSignature?: boolean;
  relatedRecipeSlugs: string[];
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  categoryLabel: string;
  image: string;
  weight: SpiceWeight;
  sku: string;
  price: number;
  quantity: number;
}

export type RecipeCategory =
  | 'Everyday Indian'
  | 'Vegetarian'
  | 'Regional'
  | 'Quick Meals'
  | 'Festive';

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: RecipeCategory;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Slow Simmer';
  image: string;
  description: string;
  keySpices: {
    productSlug: string;
    name: string;
    amount: string;
  }[];
  ingredients: {
    group: string;
    items: string[];
  }[];
  instructions: {
    step: number;
    title: string;
    text: string;
  }[];
  chefNote: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  topic:
    | 'Indian Spice Origins'
    | 'Spice Guides'
    | 'Cooking Techniques'
    | 'Regional Cuisine'
    | 'Ingredient Stories'
    | 'Sourcing'
    | 'Food Culture';
  readTime: string;
  publishedAt: string;
  author: string;
  heroImage: string;
  excerpt: string;
  sections: {
    heading?: string;
    paragraphs: string[];
    pullQuote?: string;
  }[];
  relatedProductSlugs: string[];
}

export interface CheckoutFormData {
  name: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  notes?: string;
}
