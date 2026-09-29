import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, Truck, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/catalog';
import { FREE_SHIPPING_THRESHOLD } from '../../services/checkoutService';
import { Button } from '../ui/Primitives';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    addToCart,
    orderTotals
  } = useShop();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const progressPercentage = Math.min(
    100,
    Math.round((orderTotals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  // Complementary products not currently in the cart
  const cartProductIds = new Set(cart.map((c) => c.productId));
  const recommendations = PRODUCTS.filter((p) => !cartProductIds.has(p.id)).slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1B18]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Slide-over Panel */}
      <div className="relative z-10 w-full max-w-md bg-[#F7F4ED] h-full flex flex-col justify-between border-l border-[#E2DDD2] shadow-2xl">
        {/* Top Header + Free Shipping Progress Indicator */}
        <div className="p-5 sm:p-6 border-b border-[#E2DDD2] bg-[#EFECE3]/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={18} className="text-[#182B21]" />
              <h2 className="font-serif-editorial text-2xl text-[#1C1B18]">
                Your Spice Bag
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(false)}
              aria-label="Close bag"
              className="p-1.5 text-[#5A564E] hover:text-[#1C1B18] cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center gap-2 text-xs text-[#1C1B18] mb-2">
              <Truck size={14} className="text-[#6D4C38]" />
              {orderTotals.hasUnlockedFreeShipping ? (
                <span className="font-medium text-[#182B21]">
                  You have unlocked complimentary shipping!
                </span>
              ) : (
                <span>
                  <strong className="font-mono-spec">
                    ₹{orderTotals.amountAwayFromFreeShipping}
                  </strong>{' '}
                  away from free shipping
                </span>
              )}
            </div>
            <div className="w-full h-1.5 bg-[#D5CFC2] overflow-hidden">
              <div
                className="h-full bg-[#182B21] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Items + Recommendations */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-14 space-y-4">
              <p className="font-serif-editorial text-2xl text-[#1C1B18]">
                Your spice bag is empty
              </p>
              <p className="text-sm text-[#5A564E] max-w-xs mx-auto">
                Explore our single-ingredient ground spices, whole harvests, and artisanal blends.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/shop');
                }}
              >
                Explore Spices
              </Button>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-[#E2DDD2]">
                {cart.map((item) => (
                  <li key={item.sku} className="py-4 first:pt-0 flex gap-4">
                    <Link
                      to={`/shop/${item.slug}`}
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="w-20 h-24 bg-[#EFECE3] border border-[#E2DDD2] shrink-0 overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            to={`/shop/${item.slug}`}
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="font-serif-editorial text-lg text-[#1C1B18] hover:text-[#6D4C38] leading-tight"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-[#5A564E] font-mono-spec mt-0.5">
                            Size: {item.weight} · ₹{item.price}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.sku)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#847E74] hover:text-[#8E3B2E] p-1 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-[#D5CFC2] bg-[#EFECE3]/50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="p-1.5 text-[#1C1B18] hover:bg-[#E2DDD2] cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 text-xs font-mono-spec">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="p-1.5 text-[#1C1B18] hover:bg-[#E2DDD2] cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="text-sm font-medium font-mono-spec text-[#1C1B18]">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* You May Also Like */}
              {recommendations.length > 0 && (
                <div className="pt-5 border-t border-[#E2DDD2]">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#6D4C38] font-medium mb-3">
                    You may also like
                  </p>
                  <div className="space-y-3">
                    {recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="flex items-center justify-between gap-3 p-2.5 bg-[#EFECE3]/60 border border-[#E2DDD2]"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={rec.images.primary}
                            alt={rec.name}
                            className="w-12 h-14 object-cover border border-[#E2DDD2]"
                          />
                          <div>
                            <Link
                              to={`/shop/${rec.slug}`}
                              onClick={() => setIsCartDrawerOpen(false)}
                              className="font-serif-editorial text-base text-[#1C1B18] hover:text-[#6D4C38]"
                            >
                              {rec.name}
                            </Link>
                            <p className="text-xs text-[#5A564E] font-mono-spec">
                              100g · ₹{rec.variants[0].price}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(rec, '100g', 1, true)}
                          className="px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] border border-[#182B21] text-[#182B21] hover:bg-[#182B21] hover:text-[#F7F4ED] transition-colors cursor-pointer"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Totals & CTAs */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#E2DDD2] bg-[#EFECE3]/75 space-y-4">
            <div className="space-y-1.5 text-xs text-[#5A564E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono-spec text-[#1C1B18]">
                  ₹{orderTotals.subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono-spec text-[#1C1B18]">
                  {orderTotals.shipping === 0 ? 'FREE' : `₹${orderTotals.shipping}`}
                </span>
              </div>
              {orderTotals.discount > 0 && (
                <div className="flex justify-between text-[#2A5A3B]">
                  <span>Discount</span>
                  <span className="font-mono-spec">-₹{orderTotals.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-semibold text-[#1C1B18] pt-2 border-t border-[#D5CFC2]">
                <span>Total</span>
                <span className="font-mono-spec">
                  ₹{orderTotals.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/checkout');
                }}
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={15} className="ml-2" />
              </Button>
              <Link
                to="/cart"
                onClick={() => setIsCartDrawerOpen(false)}
                className="text-center text-xs uppercase tracking-[0.16em] text-[#5A564E] hover:text-[#1C1B18] py-1.5"
              >
                View Full Bag & Apply Coupon
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
