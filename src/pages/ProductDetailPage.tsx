import { useParams, Link } from 'react-router-dom';
import { Star, ChevronRight, Shield, ExternalLink } from 'lucide-react';
import { getProductById } from '../data/mockData';
import FTCBadge from '../components/FTCBadge';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
        <p className="text-gray-500 mt-2">This product doesn't seem to exist.</p>
        <Link to="/products" className="btn-primary mt-6 inline-flex">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-brand-600">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 mb-3">
            <Shield className="w-3 h-3" /> The Essential List
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(product.rating)
                      ? 'fill-accent-400 text-accent-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviewCount.toLocaleString()} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mt-4">
            ${product.price.toFixed(2)}
          </p>

          {/* Benefits List */}
          <div className="mt-6 space-y-3">
            {product.description.split('. ').filter(s => s.trim()).slice(0, 3).map((sentence, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">{sentence}.</span>
              </div>
            ))}
          </div>

          {/* Buy Button */}
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent mt-8 text-base py-3.5 px-8 w-full sm:w-auto justify-center"
          >
            <ExternalLink className="w-5 h-5" />
            Buy on Amazon — ${product.price.toFixed(2)}
          </a>

          <div className="mt-3">
            <FTCBadge />
          </div>
        </div>
      </div>

      {/* Why It's Essential */}
      <div className="card p-8 mb-10 border-brand-100 bg-gradient-to-br from-brand-50 to-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Why It's Essential</h2>
        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
          {product.verdict}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Reviews from Verified Buyers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.reviews.map((review, i) => (
            <div key={i} className="card p-5 flex flex-col">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? 'fill-accent-400 text-accent-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">"{review.text}"</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xs font-semibold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
                {review.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Verified Purchase
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center card p-8 bg-gradient-to-br from-brand-800 to-brand-900 text-white border-0">
        <h2 className="text-2xl font-bold">Ready to Make It Yours?</h2>
        <p className="text-brand-200 mt-2 mb-6">Join thousands of happy owners.</p>
        <a
          href={product.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent text-base py-3 px-8"
        >
          <ExternalLink className="w-5 h-5" />
          Buy on Amazon — ${product.price.toFixed(2)}
        </a>
        <div className="mt-4">
          <FTCBadge />
        </div>
      </div>
    </div>
  );
}