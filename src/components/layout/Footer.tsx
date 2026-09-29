import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { Newsletter } from '../ui/EditorialCards';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#182B21] text-[#F7F4ED] border-t border-[#284234]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24">
        {/* Top Row: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2A4435]">
          <div className="lg:col-span-5 space-y-5">
            <Logo variant="light" size="lg" />
            <p className="text-sm text-[#E2DDD2]/80 max-w-sm leading-relaxed">
              Aaranya represents the connection between nature, Indian spice heritage and exceptional flavour. Pure. Rich. Authentic.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C89236]">
              The Essence of Indian Spices
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <Newsletter variant="footer" />
          </div>
        </div>

        {/* Middle Row: 4-Column Navigation System */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-[#2A4435]">
          {/* Column 1: Shop */}
          <div>
            <h4 className="font-sans-ui text-xs uppercase tracking-[0.2em] text-[#C89236] mb-5 font-semibold">
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-[#E2DDD2]/85">
              <li>
                <Link to="/shop" className="hover:text-[#C89236] transition-colors">
                  All Spices
                </Link>
              </li>
              <li>
                <Link to="/shop/whole-spices" className="hover:text-[#C89236] transition-colors">
                  Whole Spices
                </Link>
              </li>
              <li>
                <Link to="/shop/ground-spices" className="hover:text-[#C89236] transition-colors">
                  Ground Spices
                </Link>
              </li>
              <li>
                <Link to="/shop/spice-blends" className="hover:text-[#C89236] transition-colors">
                  Blends
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h4 className="font-sans-ui text-xs uppercase tracking-[0.2em] text-[#C89236] mb-5 font-semibold">
              Discover
            </h4>
            <ul className="space-y-3 text-sm text-[#E2DDD2]/85">
              <li>
                <Link to="/about" className="hover:text-[#C89236] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/sourcing" className="hover:text-[#C89236] transition-colors">
                  Sourcing
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="hover:text-[#C89236] transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/journal" className="hover:text-[#C89236] transition-colors">
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div>
            <h4 className="font-sans-ui text-xs uppercase tracking-[0.2em] text-[#C89236] mb-5 font-semibold">
              Help
            </h4>
            <ul className="space-y-3 text-sm text-[#E2DDD2]/85">
              <li>
                <Link to="/contact" className="hover:text-[#C89236] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#C89236] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="hover:text-[#C89236] transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns#returns" className="hover:text-[#C89236] transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-sans-ui text-xs uppercase tracking-[0.2em] text-[#C89236] mb-5 font-semibold">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-[#E2DDD2]/85">
              <li>
                <Link to="/privacy" className="hover:text-[#C89236] transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#C89236] transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns#refunds" className="hover:text-[#C89236] transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row: Copyright & Social Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E2DDD2]/70">
          <p>© 2026 Aaranya Spices. All rights reserved.</p>

          <div className="flex items-center gap-6 uppercase tracking-[0.16em]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Aaranya Spices on Instagram"
              className="hover:text-[#C89236] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Aaranya Spices on Pinterest"
              className="hover:text-[#C89236] transition-colors"
            >
              Pinterest
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Aaranya Spices on YouTube"
              className="hover:text-[#C89236] transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
