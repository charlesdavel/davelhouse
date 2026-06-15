import productsData from './products.json';

const STORE_ID = 'charlesdavel-20';

export interface Review {
  name: string;
  date: string;
  rating: number;
  verified: boolean;
  text: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  amazonUrl: string;
  rating: number;
  reviewCount: number;
  verdict: string;
  reviews: Review[];
  featured?: boolean;
}

// Helper to inject Amazon affiliate tracking tag
function enrichAmazonUrl(url: string): string {
  if (!url) return url;
  const separator = url.includes('?') ? '&' : '?';
  if (url.includes('tag=')) return url;
  return `${url}${separator}tag=${STORE_ID}`;
}

// Categories derived from the curated product data
const categorySet = new Set<string>();
productsData.forEach((p: any) => categorySet.add(p.category));

export const categories = Array.from(categorySet).map((name, i) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  name,
  icon: name === 'Home' ? '🏠' : '💼',
  count: productsData.filter((p: any) => p.category === name).length,
}));

const catMap: Record<string, string> = {};
categories.forEach(c => { catMap[c.name] = c.id; });

function mapCategory(raw: string): string {
  return catMap[raw] || raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Transform raw JSON to typed Product objects
export const products: Product[] = productsData.map((p: any, i: number) => ({
  id: p.id,
  name: p.title,
  description: p.description,
  price: p.price,
  currency: '$',
  image: p.image_url,
  category: mapCategory(p.category),
  amazonUrl: enrichAmazonUrl(p.amazon_url),
  rating: p.rating,
  reviewCount: p.reviewCount,
  verdict: p.verdict,
  reviews: p.reviews.map((r: any) => ({
    name: r.name,
    date: r.date,
    rating: r.rating,
    verified: r.verified,
    text: r.text,
  })),
  featured: i < 4,
}));

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.category === categoryId);
}
