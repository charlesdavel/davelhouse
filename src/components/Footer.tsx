import { Link } from 'react-router-dom';
import { Heart, Gift, Shield, Mail } from 'lucide-react';

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
    <footer className="border-t border-gray-200 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Top section: branding + links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white font-bold text-sm">
                TE
              </div>
              <span className="text-lg font-bold text-white">The<span className="text-brand-400">Essentialist</span></span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Your curated destination for hand-picked premium home essentials. The Essential List — products that earn their place.
            </p>
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-brand-400" /> Curated with care</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-brand-400" /> Verified programs</span>
              <span className="flex items-center gap-1.5"><Gift className="w-3.5 h-3.5 text-brand-400" /> Best deals</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} The Essentialist. All rights reserved. As an Amazon Associate and affiliate partner, we earn from qualifying purchases.
          </p>
          <div className="flex items-center gap-3">
            <a href="mailto:hello@theessentialist.shop" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" /> hello@theessentialist.shop
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}