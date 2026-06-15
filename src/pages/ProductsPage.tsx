import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ArrowUpDown, X } from 'lucide-react';
import { products, categories } from '../data/mockData';
import { ProductCard } from './HomePage';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (category && category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [search, category, sort]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch(''); setCategory('all'); setSort('featured'); setSearchParams({});
  };

  const hasFilters = search || category !== 'all';

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10 sm:py-16">
      <div className="mb-10">
        <h1 className="font-serif text-h1 text-espresso">The Essential List</h1>
        <p className="text-espresso-light font-sans mt-2 text-lg">Every product curated, verified, and worth your attention</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => { setSearch(e.target.value); updateParam('q', e.target.value); }}
            className="input-field pl-11 pr-10"
          />
          {search && (
            <button onClick={() => { setSearch(''); updateParam('q', ''); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-rose hover:text-terracotta">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="relative">
          <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rose pointer-events-none" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-field pl-11 pr-5 appearance-none cursor-pointer min-w-[170px] font-sans text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => { setCategory('all'); updateParam('category', ''); }}
          className={`px-4 py-2 text-[10px] font-sans font-medium uppercase tracking-wider border transition-all ${
            category === 'all'
              ? 'border-terracotta bg-terracotta text-white'
              : 'border-rose text-espresso-light hover:border-rose-dark hover:text-espresso'
          }`}
        >
          All
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => { setCategory(c.id); updateParam('category', c.id); }}
            className={`px-4 py-2 text-[10px] font-sans font-medium uppercase tracking-wider border transition-all ${
              category === c.id
                ? 'border-terracotta bg-terracotta text-white'
                : 'border-rose text-espresso-light hover:border-rose-dark hover:text-espresso'
            }`}
          >
            {c.name}
          </button>
        ))}
        {hasFilters && (
          <button onClick={clearFilters} className="px-4 py-2 text-[10px] font-sans font-medium uppercase tracking-wider border border-rose-dark/30 text-rose-dark hover:bg-blush-50 transition-all">
            Clear
          </button>
        )}
      </div>

      <p className="text-sm text-espresso-light/60 font-sans mb-6 border-b border-rose pb-4">
        Showing <span className="font-medium text-espresso">{filtered.length}</span> {filtered.length === 1 ? 'product' : 'products'}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="border border-rose bg-white p-16 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-serif text-h3 text-espresso">No products found</h3>
          <p className="text-espresso-light mt-2 font-sans">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="btn-primary mt-6 text-xs">Clear All Filters</button>
        </div>
      )}
    </div>
  );
}