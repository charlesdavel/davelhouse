import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Shield, Heart, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { categories, products } from '../data/mockData';
import FTCBadge from '../components/FTCBadge';

function CategoryCard({ cat }: { cat: typeof categories[0] }) {
  return (
    <Link
      to={`/products?category=${cat.id}`}
      className="editorial-card group p-6 flex items-center gap-4"
    >
      <span className="text-3xl">{cat.icon}</span>
      <div>
        <h3 className="font-serif font-semibold text-espresso text-lg group-hover:text-terracotta transition-colors">{cat.name}</h3>
        <p className="text-xs text-espresso-light font-sans mt-0.5">{cat.count} products</p>
      </div>
      <ArrowRight className="ml-auto w-4 h-4 text-rose transition-colors group-hover:text-terracotta" />
    </Link>
  );
}

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-rose bg-gradient-to-br from-cream-50 via-white to-stone-50">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-rose-dark/30 bg-blush-50/80 px-4 py-2 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span className="text-[11px] font-sans font-medium text-terracotta uppercase tracking-[0.12em]">The Essential List — Curated for Your Home</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-espresso leading-[1.05] tracking-tight">
              Products That{' '}
              <span className="italic text-terracotta">Earn Their Place</span>
            </h1>
            <p className="mt-6 text-lg text-espresso-light leading-relaxed max-w-xl font-sans">
              Every item on The Essential List is meticulously researched, TikTok-viral approved, and backed by thousands of real reviews. No fluff. Just the best.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/products" className="btn-primary text-xs">
                Explore The Essential List <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products?category=home" className="btn-secondary text-xs">
                Shop Home Essentials
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-h2 text-espresso">Browse by Category</h2>
            <p className="text-espresso-light font-sans mt-2">Hand-picked products across premium niches</p>
          </div>
          <Link to="/products" className="btn-secondary text-[10px] px-5 py-2 hidden sm:inline-flex">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-t border-b border-rose bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-h2 text-espresso">Featured on The Essential List</h2>
              <p className="text-espresso-light font-sans mt-2">Top-rated picks our team recommends</p>
            </div>
            <Link to="/products" className="btn-secondary text-[10px] px-5 py-2 hidden sm:inline-flex">
              All Products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Link to="/products" className="btn-primary text-xs">View All Products</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 py-20 text-center">
        <div className="border border-rose bg-white p-12 sm:p-16">
          <span className="font-serif italic text-h3 text-terracotta">"</span>
          <h2 className="font-serif text-h2 text-espresso mt-2 mb-6">Curated. Verified. Essential.</h2>
          <p className="text-espresso-light text-lg leading-relaxed font-sans max-w-lg mx-auto">
            Every product on The Essential List is independently chosen, rigorously researched, 
            and backed by thousands of real user reviews. We earn your trust — one product at a time.
          </p>
          <div className="flex justify-center gap-8 mt-10 text-center">
            <div>
              <p className="font-serif text-3xl font-semibold text-espresso">16+</p>
              <p className="text-xs text-espresso-light uppercase tracking-wider mt-1">Editorial Picks</p>
            </div>
            <div className="w-px bg-rose" />
            <div>
              <p className="font-serif text-3xl font-semibold text-espresso">2</p>
              <p className="text-xs text-espresso-light uppercase tracking-wider mt-1">Core Segments</p>
            </div>
            <div className="w-px bg-rose" />
            <div>
              <p className="font-serif text-3xl font-semibold text-espresso">100%</p>
              <p className="text-xs text-espresso-light uppercase tracking-wider mt-1">Curated</p>
            </div>
          </div>
          <Link to="/products" className="btn-primary text-xs mt-10 inline-flex">
            Browse The Essential List <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// Reusable product card with editorial style
export function ProductCard({ product }: { product: typeof products[0] }) {
  const stockStatus = product.id.endsWith('1') || product.id.endsWith('4') || product.id.endsWith('9') ? 'low' : 'available';

  return (
    <Link to={`/product/${product.id}`} className="editorial-card group flex flex-col overflow-hidden bg-white">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4">
          <span className="badge-essential text-[10px]">
            Essential List
          </span>
        </div>
        {stockStatus === 'low' && (
          <div className="absolute top-4 right-4">
            <span className="badge-low-stock text-[10px]">
              <AlertCircle className="w-3 h-3 mr-1" /> Low Stock
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold text-espresso leading-snug group-hover:text-terracotta transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-espresso-light font-sans leading-relaxed line-clamp-2">
          {product.description.split('. ').slice(0, 2).join('. ')}.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.round(product.rating)
                    ? 'fill-[#D4AF37] text-[#D4AF37]'
                    : 'fill-rose text-rose'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-sans font-medium text-espresso">{product.rating}</span>
          <span className="text-[10px] text-espresso-light/60">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-rose/50">
          <span className="font-serif text-xl font-semibold text-espresso">${product.price.toFixed(2)}</span>
          <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-terracotta group-hover:text-terracotta-dark transition-colors">
            View Details →
          </span>
        </div>
        <div className="mt-3">
          <FTCBadge compact />
        </div>
      </div>
    </Link>
  );
}