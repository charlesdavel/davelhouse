import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { products, categories } from '../data/mockData';
import { ProductCard } from './HomePage';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [platform, setPlatform] = useState(searchParams.get('platform') || 'all');
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const platforms = useMemo(() => [...new Set(products.map(p => p.platform))], []);

  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (category && category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // Platform
    if (platform && platform !== 'all') {
      result = result.filter(p => p.platform === platform);
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [search, category, platform, sort]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    updateParam('q', val);
  };

  const handleCategory = (val: string) => {
    setCategory(val);
    updateParam('category', val);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setPlatform('all');
    setSort('featured');
    setSearchParams({});
  };

  const hasFilters = search || category !== 'all' || platform !== 'all';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Products Catalog</h1>
        <p className="mt-1 text-gray-500">Curated premium products across every category</p>
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            className="input-field pl-10 pr-10"
          />
          {search && (
            <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="input-field pl-10 pr-4 appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary px-3 ${showFilters ? 'ring-2 ring-brand-500' : ''}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => handleCategory(e.target.value)}
                className="input-field min-w-[160px]"
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Platform</label>
              <select
                value={platform}
                onChange={e => { setPlatform(e.target.value); updateParam('platform', e.target.value); }}
                className="input-field min-w-[160px]"
              >
                <option value="all">All Platforms</option>
                {platforms.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            {hasFilters && (
              <button onClick={clearFilters} className="btn-secondary text-xs self-end">
                <X className="w-3.5 h-3.5" /> Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing <span className="font-semibold text-gray-900">{filtered.length}</span>{' '}
        {filtered.length === 1 ? 'product' : 'products'}
        {hasFilters && ' (filtered)'}
      </p>

      {/* Products grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="btn-primary mt-4">Clear All Filters</button>
        </div>
      )}
    </div>
  );
}