import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const footerLinks = {
  'Explore': [
    { label: 'Products', to: '/products' },
    { label: 'The Essential List', to: '/products' },
    { label: 'Home Essentials', to: '/products?category=home' },
    { label: 'Home Office', to: '/products?category=home-office' },
  ],
  'Company': [
    { label: 'About Us', to: '/' },
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms of Service', to: '/' },
    { label: 'Contact', to: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-rose bg-espresso text-white/70">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center border border-terracotta bg-cream-50 text-terracotta font-serif font-bold text-lg">
                T
              </div>
              <span className="text-xl font-serif font-semibold text-white">The<span className="text-terracotta">Essentialist</span></span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm font-sans">
              Your curated destination for hand-picked premium home essentials. The Essential List — products that earn their place in your home.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-sans"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 font-sans">
            &copy; {new Date().getFullYear()} The Essentialist. All rights reserved. As an Amazon Associate, we earn from qualifying purchases.
          </p>
          <a href="mailto:hello@theessentialist.shop" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors font-sans">
            <Mail className="w-3.5 h-3.5" /> hello@theessentialist.shop
          </a>
        </div>
      </div>
    </footer>
  );
}