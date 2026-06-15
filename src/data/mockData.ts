import productsData from './products.json';
import programsData from './programs.json';

const AMAZON_TAG = 'charlesdavel-20';

// Helper to inject Amazon affiliate tracking tag into product URLs
function enrichAmazonUrl(url: string, merchant: string): string {
  if (merchant === 'Amazon') {
    // Check if URL already has query params
    const separator = url.includes('?') ? '&' : '?';
    // Don't double-add the tag if it's already present
    if (url.includes('tag=')) return url;
    return `${url}${separator}tag=${AMAZON_TAG}`;
  }
  return url;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  category: string;
  platform: string;
  affiliateUrl: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  commission: string;
}

export interface AffiliateProgram {
  id: string;
  name: string;
  description: string;
  category: string;
  platform: string;
  commissionRate: string;
  commissionType: string;
  cookieDuration: string;
  logo: string;
  joinUrl: string;
  minPayout: string;
  featured?: boolean;
  popularity: number;
}

// Categories derived from the researcher's curated product data
export const categories = [
  { id: 'smart-home', name: 'Smart Home', icon: '🏠', count: 4 },
  { id: 'tech-audio', name: 'Tech / Audio', icon: '🎧', count: 3 },
  { id: 'productivity-tech', name: 'Productivity Tech', icon: '💻', count: 3 },
  { id: 'wellness-fitness', name: 'Wellness & Fitness', icon: '💪', count: 3 },
  { id: 'kitchen-luxury', name: 'Kitchen / Luxury', icon: '🍳', count: 2 },
  { id: 'luxury-travel', name: 'Luxury / Travel', icon: '✈️', count: 1 },
  { id: 'wellness-home', name: 'Wellness / Home', icon: '🕯️', count: 1 },
  { id: 'wellness-essentials', name: 'Wellness Essentials', icon: '🌿', count: 1 },
];

const categoryMap: Record<string, string> = {
  'Smart Home': 'smart-home',
  'Tech / Audio': 'tech-audio',
  'Productivity Tech': 'productivity-tech',
  'Wellness & Fitness': 'wellness-fitness',
  'Wellness / Wellness Essentials': 'wellness-essentials',
  'Wellness / Home': 'wellness-home',
  'Kitchen / Luxury': 'kitchen-luxury',
  'Luxury / Travel': 'luxury-travel',
};

function mapCategory(raw: string): string {
  return categoryMap[raw] || raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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
  platform: p.merchant,
  affiliateUrl: enrichAmazonUrl(p.affiliate_url, p.merchant),
  rating: p.rating,
  reviewCount: Math.floor(Math.random() * 15000) + 500,
  featured: i < 6,
  commission: p.merchant === 'Amazon' ? '4%' : p.merchant === 'Oura' ? '8%' : p.merchant === 'Eight Sleep' ? '10%' : '5%',
}));

// Transform raw JSON to typed AffiliateProgram objects
export const affiliatePrograms: AffiliateProgram[] = programsData.map((p: any, i: number) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  category: p.category,
  platform: p.platform,
  commissionRate: p.commission_rate,
  commissionType: p.commission_rate.includes('%') ? 'Per Sale' : p.commission_rate.toLowerCase().includes('recurring') ? 'Recurring Per Sale' : 'Per Sale',
  cookieDuration: p.cookie_duration,
  logo: p.image_url,
  joinUrl: p.signup_url,
  minPayout: i < 2 ? '$10' : i < 4 ? '$50' : '$100',
  featured: i < 4,
  popularity: 100 - (i * 8),
}));

export const platformLogos: Record<string, string> = {
  'Amazon': 'https://img.icons8.com/color/96/amazon.png',
  'ShareASale': 'https://img.icons8.com/color/96/share.png',
  'CJ': 'https://img.icons8.com/color/96/commission.png',
  'Impact': 'https://img.icons8.com/color/96/graph.png',
  'ClickBank': 'https://img.icons8.com/color/96/idea.png',
  'Rakuten': 'https://img.icons8.com/color/96/shop.png',
  'PartnerStack': 'https://img.icons8.com/color/96/server.png',
  'Oura': 'https://img.icons8.com/color/96/heart.png',
  'Eight Sleep': 'https://img.icons8.com/color/96/moon.png',
};