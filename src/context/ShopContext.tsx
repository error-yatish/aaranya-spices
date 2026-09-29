import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, SpiceWeight } from '../types/ecommerce';
import { calculateOrderTotals, OrderSummaryCalculation } from '../services/checkoutService';

interface ToastNotification {
  id: string;
  title: string;
  subtitle?: string;
}

interface ShopContextValue {
  cart: CartItem[];
  addToCart: (product: Product, weight: SpiceWeight, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  orderTotals: OrderSummaryCalculation;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  toasts: ToastNotification[];
  dismissToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

const STORAGE_KEY = 'aaranya_spices_cart_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore localStorage errors
    }
    return [
      {
        productId: 'aar-turmeric-01',
        slug: 'turmeric-powder',
        name: 'Turmeric Powder',
        categoryLabel: 'Ground Spices',
        image: '/images/prod-turmeric-powder.jpg',
        weight: '200g',
        sku: 'AAR-GRD-TRM-200',
        price: 390,
        quantity: 1
      },
      {
        productId: 'aar-garam-masala-08',
        slug: 'garam-masala',
        name: 'Garam Masala',
        categoryLabel: 'Spice Blends',
        image: '/images/category-blends.jpg',
        weight: '100g',
        sku: 'AAR-BLD-GRM-100',
        price: 340,
        quantity: 1
      }
    ];
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  const addToast = (title: string, subtitle?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, subtitle }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3400);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    product: Product,
    weight: SpiceWeight,
    quantity = 1,
    openDrawer = true
  ) => {
    const variant = product.variants.find((v) => v.weight === weight) || product.variants[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.sku === variant.sku);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          categoryLabel: product.categoryLabel,
          image: product.images.primary,
          weight: variant.weight,
          sku: variant.sku,
          price: variant.price,
          quantity
        }
      ];
    });

    if (openDrawer) {
      setIsCartDrawerOpen(true);
    } else {
      addToast(`Added ${product.name} (${variant.weight})`, `₹${variant.price} · Added to your bag`);
    }
  };

  const removeFromCart = (sku: string) => {
    setCart((prev) => prev.filter((item) => item.sku !== sku));
  };

  const updateQuantity = (sku: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sku);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.sku === sku ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotals = calculateOrderTotals(cart, couponCode, 'standard');

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        couponCode,
        setCouponCode,
        orderTotals,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        toasts,
        dismissToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return ctx;
}
