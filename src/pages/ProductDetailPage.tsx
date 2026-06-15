import { useParams, Link } from 'react-router-dom';
import { Star, ChevronRight, ExternalLink } from 'lucide-react';
import { getProductById, products } from '../data/mockData';
import FTCBadge from '../components/FTCBadge';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-28 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="font-serif text-h2 text-espresso">Product Not Found</h1>
        <p className="text-espresso-light mt-3">This product doesn't seem to exist.</p>
        <Link to="/products" className="btn-primary mt-8 inline-flex">Browse Products</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const stockStatus = product.id.endsWith('1') || product.id.endsWith('4') || product.id.endsWith('9') ? 'low' : 'available';

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-espresso-light/60 font-sans uppercase tracking-wider mb-10">
        <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/products" className="hover:text-terracotta transition-colors">The Essential List</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-espresso">{product.name}</span>
      </nav>

      {/* Hero Section — Editorial Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
        {/* Image */}
        <div className="lg:col-span-7 relative aspect-[3/4] overflow-hidden bg-cream-50 border border-rose">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          {stockStatus === 'low' && (
            <div className="absolute top-6 left-6">
              <span className="badge-low-stock">Low Stock</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="border-b border-rose pb-6 mb-6">
            <div className="inline-flex items-center gap-2 border border-rose-dark/30 bg-blush-50/80 px-3 py-1.5 mb-5">
              <span className="text-[10px] font-sans font-medium text-terracotta uppercase tracking-[0.12em]">The Essential List</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-espresso leading-[1.08] tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(product.rating)
                        ? 'fill-[#D4AF37] text-[#D4AF37]'
                        : 'fill-rose text-rose'
                    }`}
                  />
                ))}
              </div>
              <span className="font-serif text-xl font-semibold text-espresso">{product.rating}</span>
              <span className="text-sm text-espresso-light/60">({product.reviewCount.toLocaleString()} reviews)</span>
            </div>
            <p className="font-serif text-3xl font-semibold text-espresso mt-6">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-6">
            {product.description.split('. ').filter(s => s.trim()).slice(0, 3).map((sentence, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center border border-rose-dark/30 bg-blush-50 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-espresso-light font-sans leading-relaxed">{sentence}.</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="space-y-3 mt-2">
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs w-full justify-center py-4"
            >
              <ExternalLink className="w-4 h-4" />
              View on Amazon — ${product.price.toFixed(2)}
            </a>
            <FTCBadge compact />
          </div>
        </div>
      </div>

      {/* Why It's Essential — Editorial Feature */}
      <div className="border border-rose bg-white p-10 sm:p-14 mb-16">
        <div className="max-w-3xl mx-auto">
          <span className="font-serif italic text-4xl text-rose-dark leading-none block -mb-4">"</span>
          <h2 className="font-serif text-h2 text-espresso mb-8">Why It's <span className="italic text-terracotta">Essential</span></h2>
          <div className="editorial-prose">
            {product.verdict.split('. ').map((sentence, i) => (
              <p key={i} className="mb-4">{sentence}.</p>
            ))}
          </div>
          {product.description.length > 200 && (
            <div className="editorial-pullquote mt-10">
              "Every item on The Essential List earns its place through exceptional design, real-world performance, and thousands of verified reviews."
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mb-16">
        <h2 className="font-serif text-h2 text-espresso mb-8">Real Reviews from Verified Buyers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {product.reviews.map((review, i) => (
            <div key={i} className="border border-rose bg-white p-6 flex flex-col">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? 'fill-[#D4AF37] text-[#D4AF37]'
                        : 'fill-rose text-rose'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-espresso-light font-sans leading-relaxed flex-1 italic">"{review.text}"</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-rose/50">
                <div>
                  <p className="text-xs font-medium text-espresso font-sans">{review.name}</p>
                  <p className="text-[10px] text-espresso-light/60 font-sans">{review.date}</p>
                </div>
                {review.verified && (
                  <span className="inline-flex items-center gap-1 border border-rose-dark/30 px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-terracotta font-sans">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mb-16">
          <h2 className="font-serif text-h2 text-espresso mb-8">You May Also Love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="editorial-card group flex flex-col bg-white">
                <div className="relative aspect-square overflow-hidden bg-cream-50">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-espresso group-hover:text-terracotta transition-colors">{p.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`w-3 h-3 ${star <= Math.round(p.rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'fill-rose text-rose'}`} />
                    ))}
                    <span className="text-xs text-espresso-light ml-1">({p.reviewCount.toLocaleString()})</span>
                  </div>
                  <p className="font-serif text-lg font-semibold text-espresso mt-2">${p.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="text-center border border-rose bg-espresso p-12">
        <h2 className="font-serif text-h2 text-white">Ready to Make It Yours?</h2>
        <p className="text-white/60 mt-3 mb-8 font-sans">Join thousands of happy owners.</p>
        <a
          href={product.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-terracotta bg-terracotta px-8 py-3 text-sm font-medium text-white uppercase tracking-wider transition-all hover:bg-terracotta-dark"
        >
          <ExternalLink className="w-4 h-4" />
          View on Amazon — ${product.price.toFixed(2)}
        </a>
        <div className="mt-4 max-w-md mx-auto">
          <FTCBadge />
        </div>
      </div>
    </div>
  );
}