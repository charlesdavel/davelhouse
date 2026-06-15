import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Shield, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { categories, products } from '../data/mockData';
import FTCBadge from '../components/FTCBadge';

function StatCard({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="card p-6 text-center hover:-translate-y-1 transition-all duration-300">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

function CategoryCard({ cat }: { cat: typeof categories[0] }) {
  return (
    <Link
      to={`/products?category=${cat.id}`}
      className="card-hover group p-5 flex items-center gap-4"
    >
      <span className="text-3xl">{cat.icon}</span>
      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{cat.name}</h3>
        <p className="text-xs text-gray-500">{cat.count} products</p>
      </div>
      <ArrowRight className="ml-auto w-4 h-4 text-gray-300 group-hover:text-brand-500 transition-colors" />
    </Link>
  );
}

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-brand-200 border border-white/10 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-accent-400" />
              The Essential List — Curated for Your Home
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Products That{' '}
              <span className="text-accent-400">Earn Their Place</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-brand-200 max-w-xl leading-relaxed">
              Every item on The Essential List is meticulously researched, TikTok-viral approved, and backed by thousands of real reviews. No fluff. Just the best.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/products" className="btn-accent text-base px-6 py-3">
                Explore The Essential List <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products?category=home" className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 text-base font-semibold text-white hover:bg-white/15 transition-all">
                Shop Home Essentials
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={ShoppingBag} value="16+" label="Editorial Picks" />
          <StatCard icon={Shield} value="2" label="Core Segments" />
          <StatCard icon={CheckCircle} value="100%" label="Curated & Verified" />
          <StatCard icon={Star} value="4.6+" label="Avg. Star Rating" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Browse by Category</h2>
            <p className="text-gray-500 mt-1">Hand-picked products across premium niches</p>
          </div>
          <Link to="/products" className="hidden sm:inline-flex btn-secondary text-sm">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured on The Essential List</h2>
              <p className="text-gray-500 mt-1">Top-rated picks our team recommends</p>
            </div>
            <Link to="/products" className="hidden sm:inline-flex btn-primary text-sm">
              All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="btn-primary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-800 to-brand-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Curated. Verified. Essential.</h2>
          <p className="mt-2 text-brand-200 text-lg max-w-md mx-auto">Every product on The Essential List is independently chosen and verified by thousands of real users.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link to="/products" className="btn-accent text-base px-6 py-3">
              Browse The Essential List <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Reusable product card
export function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <Link to={`/product/${product.id}`} className="card-hover group flex flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-brand-700 shadow-sm">
            <Shield className="w-3 h-3" /> Essential List
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">{product.name}</h3>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{product.description.split('. ').slice(0, 2).join('. ')}.</p>
        <div className="mt-2 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />
          <span className="text-xs font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <span className="btn-primary text-xs px-3 py-1.5 cursor-pointer">
            View Details
          </span>
        </div>
        <div className="mt-2">
          <FTCBadge compact />
        </div>
      </div>
    </Link>
  );
}