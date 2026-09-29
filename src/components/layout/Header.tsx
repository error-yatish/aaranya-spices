import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useShop } from '../../context/ShopContext';
import { Modal, Button } from '../ui/Primitives';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop', exact: true },
  { label: 'Whole Spices', href: '/shop/whole-spices' },
  { label: 'Ground Spices', href: '/shop/ground-spices' },
  { label: 'Blends', href: '/shop/spice-blends' },
  { label: 'Our Story', href: '/about' },
  { label: 'Recipes', href: '/recipes' }
];

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartDrawerOpen,
    setIsSearchOpen,
    isAccountModalOpen,
    setIsAccountModalOpen
  } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountEmail, setAccountEmail] = useState('');
  const [accountMessage, setAccountMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleAccountSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountEmail.trim()) return;
    setAccountMessage(
      `A one-time sign-in link has been prepared for ${accountEmail}. (Customer accounts API ready)`
    );
  };

  return (
    <>
      {/* Subtle Announcement Bar */}
      <div className="bg-[#182B21] text-[#F7F4ED] text-[11px] uppercase tracking-[0.2em] py-2.5 px-4 text-center border-b border-[#263F32]">
        <span>Free shipping on orders above ₹999</span>
      </div>

      {/* Sticky Premium Header */}
      <header className="sticky top-0 z-40 bg-[#F7F4ED]/95 backdrop-blur-md border-b border-[#E2DDD2] transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
          {/* Mobile Left: Hamburger Menu */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 -ml-2 text-[#1C1B18] hover:text-[#6D4C38] cursor-pointer"
            >
              <Menu size={22} strokeWidth={1.6} />
            </button>
          </div>

          {/* Brand Wordmark */}
          <div className="flex items-center">
            <Logo variant="dark" size="md" />
          </div>

          {/* Desktop Center Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8 xl:gap-10"
          >
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.exact}
                className={({ isActive }) =>
                  `font-sans-ui text-xs uppercase tracking-[0.16em] py-2 transition-colors relative ${
                    isActive
                      ? 'text-[#182B21] font-semibold after:content-[""] after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:bg-[#C89236]'
                      : 'text-[#1C1B18]/85 hover:text-[#6D4C38]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Utilities: Search, Account, Cart */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search spices and recipes"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#1C1B18] hover:text-[#6D4C38] p-1.5 cursor-pointer"
            >
              <Search size={19} strokeWidth={1.6} />
              <span className="hidden xl:inline">Search</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAccountModalOpen(true)}
              aria-label="Customer account"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#1C1B18] hover:text-[#6D4C38] p-1.5 cursor-pointer"
            >
              <User size={19} strokeWidth={1.6} />
              <span className="hidden xl:inline">Account</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#1C1B18] hover:text-[#6D4C38] p-1.5 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag size={19} strokeWidth={1.6} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#182B21] text-[#F7F4ED] text-[10px] font-mono-spec w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline">Cart</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div
            className="fixed inset-0 bg-[#1C1B18]/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[85%] max-w-sm bg-[#F7F4ED] h-full flex flex-col justify-between p-6 overflow-y-auto z-10 border-r border-[#E2DDD2]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E2DDD2]">
                <Logo variant="dark" size="sm" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 text-[#1C1B18]"
                >
                  <X size={22} />
                </button>
              </div>

              <nav aria-label="Mobile menu links" className="mt-6 flex flex-col divide-y divide-[#E2DDD2]">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="py-4 flex items-center justify-between font-serif-editorial text-2xl text-[#1C1B18] hover:text-[#6D4C38]"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} className="text-[#847E74]" />
                  </Link>
                ))}
                <Link
                  to="/sourcing"
                  className="py-4 flex items-center justify-between font-serif-editorial text-2xl text-[#1C1B18] hover:text-[#6D4C38]"
                >
                  <span>Our Sourcing</span>
                  <ArrowRight size={16} className="text-[#847E74]" />
                </Link>
                <Link
                  to="/journal"
                  className="py-4 flex items-center justify-between font-serif-editorial text-2xl text-[#1C1B18] hover:text-[#6D4C38]"
                >
                  <span>Journal</span>
                  <ArrowRight size={16} className="text-[#847E74]" />
                </Link>
                <Link
                  to="/contact"
                  className="py-4 flex items-center justify-between font-serif-editorial text-2xl text-[#1C1B18] hover:text-[#6D4C38]"
                >
                  <span>Contact</span>
                  <ArrowRight size={16} className="text-[#847E74]" />
                </Link>
                <Link
                  to="/faq"
                  className="py-4 flex items-center justify-between font-serif-editorial text-2xl text-[#1C1B18] hover:text-[#6D4C38]"
                >
                  <span>FAQ</span>
                  <ArrowRight size={16} className="text-[#847E74]" />
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E2DDD2] space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccountModalOpen(true);
                }}
                className="w-full py-3 px-4 border border-[#182B21] text-xs uppercase tracking-[0.16em] text-[#182B21] font-medium flex items-center justify-center gap-2"
              >
                <User size={15} />
                <span>Account / Sign In</span>
              </button>
              <p className="text-[11px] text-center text-[#5A564E] uppercase tracking-[0.16em]">
                Pure. Rich. Authentic.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Account Modal */}
      <Modal
        isOpen={isAccountModalOpen}
        onClose={() => {
          setIsAccountModalOpen(false);
          setAccountMessage('');
        }}
        title="The Aaranya Account"
      >
        <p className="text-sm text-[#5A564E] leading-relaxed">
          Sign in to view past spice orders, manage saved delivery addresses, or track an active shipment.
        </p>
        {accountMessage ? (
          <div className="mt-4 p-4 bg-[#EFECE3] border border-[#C89236] text-xs text-[#1C1B18] leading-relaxed">
            {accountMessage}
          </div>
        ) : (
          <form onSubmit={handleAccountSignIn} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="account-email"
                className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
              >
                Email Address
              </label>
              <input
                id="account-email"
                type="email"
                required
                value={accountEmail}
                onChange={(e) => setAccountEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#F7F4ED] border border-[#D5CFC2] px-4 py-3 text-sm focus:outline-none focus:border-[#182B21]"
              />
            </div>
            <Button type="submit" variant="primary" fullWidth>
              Send Sign-In Link
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
};
