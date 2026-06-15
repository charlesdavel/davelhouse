import { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Star, TrendingUp, Shield, X } from 'lucide-react';
import { affiliatePrograms } from '../data/mockData';
import { ProgramCard } from './HomePage';

const categories = ['All', 'Multi-Niche / General Retail', 'Multi-Niche / Network', 'Multi-Niche / Premium Network', 'Multi-Niche / Partnership Automation', 'Digital Products / Info-Products', 'Multi-Niche / Premium Retail', 'SaaS / B2B'];

export default function ProgramsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popularity');

  const filtered = useMemo(() => {
    let result = [...affiliatePrograms];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.platform.toLowerCase().includes(q)
      );
    }

    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    switch (sort) {
      case 'commission-desc':
        result.sort((a, b) => {
          const aRate = parseFloat(a.commissionRate.replace(/[^0-9.]/g, ''));
          const bRate = parseFloat(b.commissionRate.replace(/[^0-9.]/g, ''));
          return bRate - aRate;
        });
        break;
      case 'commission-asc':
        result.sort((a, b) => {
          const aRate = parseFloat(a.commissionRate.replace(/[^0-9.]/g, ''));
          const bRate = parseFloat(b.commissionRate.replace(/[^0-9.]/g, ''));
          return aRate - bRate;
        });
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // popularity
        result.sort((a, b) => b.popularity - a.popularity);
    }

    return result;
  }, [search, category, sort]);

  const clearFilters = () => {
    setSearch('');
    setCategory('All');
    setSort('popularity');
  };

  const hasFilters = search || category !== 'All';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Affiliate Programs</h1>
        <p className="mt-1 text-gray-500">Discover and join the most lucrative affiliate programs in the industry</p>
      </div>

      {/* Info Banner */}
      <div className="card p-4 mb-6 flex items-start gap-3 bg-gradient-to-r from-brand-50 to-accent-50 border-brand-100">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
          <TrendingUp className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">Start earning today</p>
          <p className="text-xs text-gray-600 mt-0.5">Join any program below and start earning commissions on every referral. Most networks approve within 24-48 hours.</p>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search programs, platforms, or categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-10 pr-10"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="relative">
          <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-field pl-10 pr-4 appearance-none cursor-pointer min-w-[170px]"
          >
            <option value="popularity">Most Popular</option>
            <option value="commission-desc">Commission: High to Low</option>
            <option value="commission-asc">Commission: Low to High</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              category === c
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {c}
          </button>
        ))}
        {hasFilters && (
          <button onClick={clearFilters} className="rounded-full px-4 py-1.5 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all flex items-center gap-1">
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing <span className="font-semibold text-gray-900">{filtered.length}</span>{' '}
        {filtered.length === 1 ? 'program' : 'programs'}
      </p>

      {/* Programs grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(program => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900">No programs found</h3>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="btn-primary mt-4">Clear All Filters</button>
        </div>
      )}
    </div>
  );
}