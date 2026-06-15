import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'The Essential List' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-rose bg-white/98 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center border border-terracotta bg-cream-50 text-terracotta font-serif font-bold text-lg tracking-wider transition-all group-hover:bg-terracotta group-hover:text-white">
              T
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-serif font-semibold tracking-tight text-espresso">The<span className="text-terracotta">Essentialist</span></span>
              <span className="text-[10px] font-sans font-medium text-espresso-light tracking-editorial uppercase -mt-0.5">The Essential List</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs font-sans font-medium uppercase tracking-[0.12em] transition-all duration-200 border-b pb-1 ${
                  location.pathname === link.to
                    ? 'text-terracotta border-terracotta'
                    : 'text-espresso-light border-transparent hover:text-espresso hover:border-espresso/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-espresso-light hover:text-espresso"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-rose bg-white px-6 pb-6 pt-3">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-3 text-sm font-medium uppercase tracking-wider ${
                  location.pathname === link.to
                    ? 'text-terracotta bg-blush-50'
                    : 'text-espresso-light hover:bg-cream-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}