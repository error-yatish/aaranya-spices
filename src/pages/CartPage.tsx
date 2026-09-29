import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, Truck, ArrowRight, Tag } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/catalog';
import { FREE_SHIPPING_THRESHOLD } from '../services/checkoutService';
import { Breadcrumbs, Button, SectionHeader } from '../components/ui/Primitives';
import { ProductGrid } from '../components/ui/ProductCard';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    couponCode,
    setCouponCode,
    orderTotals
  } = useShop();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponFeedback, setCouponFeedback] = useState('');

  const progressPercentage = Math.min(
    100,
    Math.round((orderTotals.subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const cartIds = new Set(cart.map((c) => c.productId));
  const complementary = PRODUCTS.filter((p) => !cartIds.has(p.id)).slice(0, 4);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = couponInput.trim().toUpperCase();
    setCouponCode(trimmed);
    if (trimmed === 'AARANYA10') {
      setCouponFeedback('Applied AARANYA10 (10% privilege discount).');
    } else if (trimmed === 'WELCOME150') {
      setCouponFeedback('Applied WELCOME150 (₹150 off on orders above ₹1,200).');
    } else if (!trimmed) {
      setCouponFeedback('');
    } else {
      setCouponFeedback('Code not recognized. Try AARANYA10 for 10% off.');
    }
  };

  return (
    <>
      <SEOHead
        title="Your Spice Bag — AARANYA SPICES"
        description="Review your selected Aaranya whole spices, ground spices, and blends before proceeding to checkout."
        canonicalPath="/cart"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />

        <h1 className="font-serif-editorial text-4xl md:text-5xl text-[#1C1B18] mt-2">
          YOUR SPICE BAG
        </h1>

        {/* Free Shipping Progress Indicator */}
        <div className="mt-6 p-5 bg-[#EFECE3] border border-[#E2DDD2] max-w-2xl">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1C1B18] mb-2.5">
            <Truck size={16} className="text-[#182B21]" />
            {orderTotals.hasUnlockedFreeShipping ? (
              <span className="font-medium text-[#182B21]">
                Your order qualifies for complimentary shipping across India.
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
          <div className="w-full h-2 bg-[#D5CFC2] overflow-hidden">
            <div
              className="h-full bg-[#182B21] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="my-16 p-12 bg-[#EFECE3]/60 border border-[#E2DDD2] text-center space-y-5">
            <h2 className="font-serif-editorial text-3xl text-[#1C1B18]">
              Your bag is currently empty
            </h2>
            <p className="text-sm text-[#5A564E] max-w-md mx-auto">
              Discover our single-ingredient ground spices, whole harvests, and balanced blends.
            </p>
            <Button variant="primary" onClick={() => navigate('/shop')}>
              SHOP SPICES
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Cart Table */}
            <div className="lg:col-span-8">
              <div className="hidden sm:grid sm:grid-cols-12 pb-3 border-b border-[#D5CFC2] text-[11px] uppercase tracking-[0.16em] text-[#5A564E]">
                <div className="col-span-6">Product & Size</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              <div className="divide-y divide-[#E2DDD2] border-b border-[#E2DDD2]">
                {cart.map((item) => (
                  <div
                    key={item.sku}
                    className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                  >
                    <div className="sm:col-span-6 flex items-center gap-4">
                      <Link
                        to={`/shop/${item.slug}`}
                        className="w-20 h-24 bg-[#EFECE3] border border-[#E2DDD2] shrink-0 overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#6D4C38]">
                          {item.categoryLabel}
                        </span>
                        <Link
                          to={`/shop/${item.slug}`}
                          className="block font-serif-editorial text-2xl text-[#1C1B18] hover:text-[#6D4C38]"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs font-mono-spec text-[#5A564E] mt-1">
                          Size: {item.weight} · SKU: {item.sku}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.sku)}
                          className="mt-2 inline-flex items-center gap-1 text-xs text-[#847E74] hover:text-[#8E3B2E] cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:text-center font-mono-spec text-sm text-[#1C1B18]">
                      <span className="sm:hidden text-xs text-[#5A564E] mr-2">
                        Price:
                      </span>
                      ₹{item.price}
                    </div>

                    <div className="sm:col-span-2 flex sm:justify-center">
                      <div className="inline-flex items-center border border-[#D5CFC2] bg-[#EFECE3]/60">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-2 text-[#1C1B18] hover:bg-[#E2DDD2] cursor-pointer"
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
                          className="p-2 text-[#1C1B18] hover:bg-[#E2DDD2] cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:text-right font-mono-spec text-base font-medium text-[#1C1B18]">
                      <span className="sm:hidden text-xs text-[#5A564E] mr-2">
                        Subtotal:
                      </span>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Panel */}
            <div className="lg:col-span-4 bg-[#EFECE3] border border-[#E2DDD2] p-6 sm:p-8 space-y-6">
              <h2 className="font-serif-editorial text-2xl text-[#1C1B18] pb-3 border-b border-[#D5CFC2]">
                Order Summary
              </h2>

              {/* Coupon Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label
                  htmlFor="cart-coupon"
                  className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-[#5A564E]"
                >
                  <Tag size={13} />
                  <span>Privilege Code (Try AARANYA10)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="cart-coupon"
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 bg-[#F7F4ED] border border-[#D5CFC2] px-3 py-2 text-xs font-mono-spec uppercase text-[#1C1B18] focus:outline-none focus:border-[#182B21]"
                  />
                  <Button type="submit" variant="secondary" size="sm">
                    Apply
                  </Button>
                </div>
                {couponFeedback && (
                  <p className="text-xs text-[#182B21]">{couponFeedback}</p>
                )}
              </form>

              {/* Breakdown */}
              <div className="space-y-3 pt-4 border-t border-[#D5CFC2] text-sm">
                <div className="flex justify-between text-[#5A564E]">
                  <span>Subtotal</span>
                  <span className="font-mono-spec text-[#1C1B18]">
                    ₹{orderTotals.subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-[#5A564E]">
                  <span>Shipping</span>
                  <span className="font-mono-spec text-[#1C1B18]">
                    {orderTotals.shipping === 0 ? 'FREE' : `₹${orderTotals.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#5A564E]">
                  <span>Discount</span>
                  <span className="font-mono-spec text-[#2A5A3B]">
                    {orderTotals.discount > 0 ? `-₹${orderTotals.discount}` : '₹0'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#1C1B18] pt-3 border-t border-[#D5CFC2]">
                  <span>Total</span>
                  <span className="font-mono-spec">
                    ₹{orderTotals.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => navigate('/checkout')}
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={15} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* YOU MAY ALSO LIKE */}
        <section className="mt-20 pt-16 border-t border-[#E2DDD2]">
          <SectionHeader
            eyebrow="Pantry Pairings"
            title="YOU MAY ALSO LIKE"
            subtitle="Complementary spices selected to complete your kitchen shelf."
            align="left"
            className="mb-10"
          />
          <ProductGrid products={complementary} />
        </section>
      </div>
    </>
  );
};
