import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { X, CheckCircle2 } from 'lucide-react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchOverlay } from './components/layout/SearchOverlay';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';

// Route-level code splitting for secondary views (Section 27 Performance)
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const SourcingPage = lazy(() =>
  import('./pages/SourcingPage').then((m) => ({ default: m.SourcingPage }))
);
const RecipesPage = lazy(() =>
  import('./pages/RecipesPage').then((m) => ({ default: m.RecipesPage }))
);
const RecipeDetailPage = lazy(() =>
  import('./pages/RecipeDetailPage').then((m) => ({ default: m.RecipeDetailPage }))
);
const JournalPage = lazy(() =>
  import('./pages/JournalPage').then((m) => ({ default: m.JournalPage }))
);
const JournalDetailPage = lazy(() =>
  import('./pages/JournalDetailPage').then((m) => ({ default: m.JournalDetailPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const FaqPage = lazy(() =>
  import('./pages/FaqPage').then((m) => ({ default: m.FaqPage }))
);
const CartPage = lazy(() =>
  import('./pages/CartPage').then((m) => ({ default: m.CartPage }))
);
const CheckoutPage = lazy(() =>
  import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage }))
);
const SearchPage = lazy(() =>
  import('./pages/SearchPage').then((m) => ({ default: m.SearchPage }))
);
const LegalPage = lazy(() =>
  import('./pages/LegalPage').then((m) => ({ default: m.LegalPage }))
);
const AdminPage = lazy(() =>
  import('./pages/AdminPage').then((m) => ({ default: m.AdminPage }))
);
const AccountPage = lazy(() =>
  import('./pages/AccountPage').then((m) => ({ default: m.AccountPage }))
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

const PageLoader: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center bg-[#F7F4ED]">
    <div className="text-center space-y-2">
      <p className="font-serif-editorial text-xl tracking-[0.2em] uppercase text-[#182B21]">
        AARANYA
      </p>
      <div className="w-16 h-[1.5px] bg-[#C89236] mx-auto animate-pulse" />
    </div>
  </div>
);

const ToastContainer: React.FC = () => {
  const { toasts, dismissToast, setIsCartDrawerOpen } = useShop();
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#182B21] text-[#F7F4ED] border border-[#C89236]/50 p-4 shadow-xl flex items-start justify-between gap-3"
        >
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-[#C89236] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium tracking-wide">{toast.title}</p>
              {toast.subtitle && (
                <p className="text-[11px] text-[#E2DDD2]/80 font-mono-spec mt-0.5">
                  {toast.subtitle}
                </p>
              )}
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-[#C89236] underline cursor-pointer"
              >
                Open Bag
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
            className="text-[#E2DDD2]/70 hover:text-[#F7F4ED] cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ShopProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F7F4ED] text-[#1C1B18]">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#182B21] focus:text-[#F7F4ED] focus:px-4 focus:py-2 focus:text-xs"
          >
            Skip to main content
          </a>
          <Header />
          <CartDrawer />
          <SearchOverlay />
          <main id="main-content" className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route
                  path="/shop/whole-spices"
                  element={<ShopPage forcedCategory="whole-spices" />}
                />
                <Route
                  path="/whole-spices"
                  element={<ShopPage forcedCategory="whole-spices" />}
                />
                <Route
                  path="/shop/ground-spices"
                  element={<ShopPage forcedCategory="ground-spices" />}
                />
                <Route
                  path="/ground-spices"
                  element={<ShopPage forcedCategory="ground-spices" />}
                />
                <Route
                  path="/shop/spice-blends"
                  element={<ShopPage forcedCategory="spice-blends" />}
                />
                <Route
                  path="/spice-blends"
                  element={<ShopPage forcedCategory="spice-blends" />}
                />
                <Route
                  path="/blends"
                  element={<ShopPage forcedCategory="spice-blends" />}
                />
                <Route path="/shop/:slug" element={<ProductDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/our-story" element={<AboutPage />} />
                <Route path="/sourcing" element={<SourcingPage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/recipes/:slug" element={<RecipeDetailPage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/journal/:slug" element={<JournalDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/privacy" element={<LegalPage type="privacy" />} />
                <Route path="/terms" element={<LegalPage type="terms" />} />
                <Route
                  path="/shipping-returns"
                  element={<LegalPage type="shipping-returns" />}
                />
                <Route
                  path="/shipping"
                  element={<LegalPage type="shipping-returns" />}
                />
                <Route
                  path="/returns"
                  element={<LegalPage type="shipping-returns" />}
                />
                <Route
                  path="/refund-policy"
                  element={<LegalPage type="shipping-returns" />}
                />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<ShopPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </ShopProvider>
    </AuthProvider>
  );
};
export default App;
