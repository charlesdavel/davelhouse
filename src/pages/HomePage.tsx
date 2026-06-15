import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';
import { categories, products, affiliatePrograms } from '../data/mockData';

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
  const topPrograms = affiliatePrograms.filter(p => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-brand-200 border border-white/10 mb-6">
              <Star className="w-3.5 h-3.5 text-accent-400 fill-accent-400" />
              Curated picks from top affiliate networks
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Discover Premium{' '}
              <span className="text-accent-400">Products</span>
              {' '}&amp; Profitable{' '}
              <span className="text-accent-400">Programs</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-brand-200 max-w-xl leading-relaxed">
              Your curated marketplace for hand-picked quality products and the highest-converting affiliate programs. Shop smarter. Earn better.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/products" className="btn-accent text-base px-6 py-3">
                Browse Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/programs" className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 text-base font-semibold text-white hover:bg-white/15 transition-all">
                View Programs
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative shape */}
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={ShoppingBag} value="200+" label="Curated Products" />
          <StatCard icon={Users} value="15+" label="Affiliate Programs" />
          <StatCard icon={DollarSign} value="50%" label="Top Commission" />
          <StatCard icon={TrendingUp} value="98%" label="Satisfaction Rate" />
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
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Products</h2>
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

      {/* Featured Programs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Top Affiliate Programs</h2>
            <p className="text-gray-500 mt-1">Start earning with the industry's best programs</p>
          </div>
          <Link to="/programs" className="hidden sm:inline-flex btn-primary text-sm">
            All Programs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/programs" className="btn-primary">View All Programs</Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-800 to-brand-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Start Earning?</h2>
          <p className="mt-2 text-brand-200 text-lg max-w-md mx-auto">Join top creators earning thousands in affiliate commissions every month.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link to="/programs" className="btn-accent text-base px-6 py-3">
              Explore Programs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/products" className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all">
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Reusable product card (used on homepage and products page)
export function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="card-hover group flex flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {product.originalPrice && (
          <span className="absolute top-3 left-3 badge-green text-xs font-semibold">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-brand-600 bg-brand-50 rounded-full px-2 py-0.5">{product.platform}</span>
          <span className="text-xs text-gray-400">{product.commission} commission</span>
        </div>
        <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">{product.name}</h3>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-accent-400 text-accent-400" />
          <span className="text-xs font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-900">{product.currency}{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">{product.currency}{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs px-3 py-1.5"
            onClick={() => console.log(`Click: ${product.name} - ${product.affiliateUrl}`)}
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
}

// Reusable program card
export function ProgramCard({ program }: { program: typeof affiliatePrograms[0] }) {
  return (
    <div className="card-hover group flex flex-col p-5">
      <div className="flex items-start gap-4 mb-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 p-2">
          <img src={program.logo} alt={program.name} className="h-8 w-8 object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors truncate">{program.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{program.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="rounded-lg bg-brand-50 p-2 text-center">
          <span className="block font-bold text-brand-700">{program.commissionRate}</span>
          <span className="text-gray-500">Commission</span>
        </div>
        <div className="rounded-lg bg-accent-50 p-2 text-center">
          <span className="block font-bold text-accent-700">{program.cookieDuration}</span>
          <span className="text-gray-500">Cookie</span>
        </div>
        <div className="rounded-lg bg-blue-50 p-2 text-center">
          <span className="block font-bold text-blue-700">{program.commissionType}</span>
          <span className="text-gray-500">Type</span>
        </div>
        <div className="rounded-lg bg-purple-50 p-2 text-center">
          <span className="block font-bold text-purple-700">{program.minPayout}</span>
          <span className="text-gray-500">Min Payout</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
        <span className="badge-blue text-xs">{program.category}</span>
        <a
          href={program.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent text-xs px-3 py-1.5"
          onClick={() => console.log(`Click: Join ${program.name}`)}
        >
          Join Program
        </a>
      </div>
    </div>
  );
}