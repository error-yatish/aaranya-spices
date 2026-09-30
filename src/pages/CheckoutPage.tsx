import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { CheckoutFormData } from '../types/ecommerce';
import {
  calculateOrderTotals,
  submitOrderToProvider,
  OrderConfirmationResult
} from '../services/checkoutService';
import { Button } from '../components/ui/Primitives';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Delhi NCR',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
  'Other State / UT'
];

export const CheckoutPage: React.FC = () => {
  const { cart, couponCode, clearCart } = useShop();
  const { user } = useAuth();

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: user?.fullName || '',
    mobile: user?.mobile || '',
    email: user?.email || '',
    address: user?.defaultAddress || '',
    city: user?.defaultCity || '',
    state: user?.defaultState || 'Maharashtra',
    pinCode: user?.defaultPincode || '',
    shippingMethod: 'standard',
    paymentMethod: 'upi'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<OrderConfirmationResult | null>(
    null
  );

  const liveTotals = calculateOrderTotals(
    cart,
    couponCode,
    formData.shippingMethod
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmitting(true);
    const result = await submitOrderToProvider(formData, cart, couponCode);
    setConfirmation(result);
    setIsSubmitting(false);
    clearCart();
    window.scrollTo(0, 0);
  };

  if (confirmation) {
    return (
      <>
        <SEOHead
          title="Order Confirmed — AARANYA SPICES"
          description="Your Aaranya Spices order has been received."
          canonicalPath="/checkout"
        />
        <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
          <div className="bg-[#EFECE3] border border-[#D5CFC2] p-8 sm:p-12 space-y-6">
            <div className="w-12 h-12 bg-[#182B21] text-[#C89236] flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6D4C38] font-mono-spec">
              Order Reference · {confirmation.orderReference}
            </p>
            <h1 className="font-serif-editorial text-3xl sm:text-4xl text-[#1C1B18]">
              Thank you, {confirmation.customer.name}.
            </h1>
            <p className="text-sm text-[#5A564E] leading-relaxed">
              Your order has been registered with our dispatch kitchen. A confirmation note has been queued for{' '}
              <strong className="text-[#1C1B18]">{confirmation.customer.email}</strong>.
            </p>

            <div className="p-5 bg-[#F7F4ED] border border-[#E2DDD2] space-y-2 text-xs font-mono-spec text-[#5A564E]">
              <div className="flex justify-between">
                <span>Delivery Address:</span>
                <span className="text-[#1C1B18] text-right">
                  {confirmation.customer.address}, {confirmation.customer.city},{' '}
                  {confirmation.customer.state} — {confirmation.customer.pinCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Dispatch Window:</span>
                <span className="text-[#1C1B18]">{confirmation.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Architecture Status:</span>
                <span className="text-[#182B21]">
                  {confirmation.paymentProviderStatus}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E2DDD2] text-sm font-semibold text-[#1C1B18]">
                <span>Amount Payable:</span>
                <span>₹{confirmation.pricing.total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-block bg-[#182B21] text-[#F7F4ED] text-xs uppercase tracking-[0.18em] px-8 py-4"
              >
                Continue Exploring Aaranya
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Checkout — AARANYA SPICES"
        description="Complete your Aaranya Spices order with secure checkout."
        canonicalPath="/checkout"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-16">
        <div className="flex items-center justify-between pb-6 border-b border-[#E2DDD2]">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#5A564E] hover:text-[#1C1B18]"
          >
            <ArrowLeft size={14} />
            <span>Return to Bag</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 text-xs text-[#182B21] font-medium">
            <Lock size={14} />
            <span>Encrypted Checkout</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Left Column: Customer & Shipping & Payment Fields */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Contact & Delivery Details */}
            <section className="space-y-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D4C38]">
                  Step 01
                </p>
                <h1 className="font-serif-editorial text-3xl text-[#1C1B18]">
                  Delivery Details
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    id="checkout-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Aarav Mehta"
                    className="w-full bg-[#EFECE3]/60 border border-[#D5CFC2] px-4 py-3 text-sm text-[#1C1B18] focus:outline-none focus:border-[#182B21]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-mobile"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    Mobile Number *
                  </label>
                  <input
                    id="checkout-mobile"
                    name="mobile"
                    type="tel"
                    required
                    pattern="[0-9+\-\s]{10,15}"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#EFECE3]/60 border border-[#D5CFC2] px-4 py-3 text-sm text-[#1C1B18] focus:outline-none focus:border-[#182B21]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-email"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="aarav@example.com"
                    className="w-full bg-[#EFECE3]/60 border border-[#D5CFC2] px-4 py-3 text-sm text-[#1C1B18] focus:outline-none focus:border-[#182B21]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-address"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    Street Address, Apartment / House No. *
                  </label>
                  <input
                    id="checkout-address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House No., Street, Locality"
                    className="w-full bg-[#EFECE3]/60 border border-[#D5CFC2] px-4 py-3 text-sm text-[#1C1B18] focus:outline-none focus:border-[#182B21]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-city"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    City *
                  </label>
                  <input
                    id="checkout-city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full bg-[#EFECE3]/60 border border-[#D5CFC2] px-4 py-3 text-sm text-[#1C1B18] focus:outline-none focus:border-[#182B21]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="checkout-state"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    State *
                  </label>
                  <select
                    id="checkout-state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-[#EFECE3]/60 border border-[#D5CFC2] px-4 py-3 text-sm text-[#1C1B18] focus:outline-none focus:border-[#182B21]"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="checkout-pincode"
                    className="block text-xs uppercase tracking-[0.14em] text-[#1C1B18] mb-2"
                  >
                    PIN Code *
                  </label>
                  <input
                    id="checkout-pincode"
                    name="pinCode"
                    type="text"
                    required
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={formData.pinCode}
                    onChange={handleChange}
                    placeholder="400001"
                    className="w-full bg-[#EFECE3]/60 border border-[#D5CFC2] px-4 py-3 text-sm font-mono-spec text-[#1C1B18] focus:outline-none focus:border-[#182B21]"
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Shipping Method */}
            <section className="space-y-4 pt-8 border-t border-[#E2DDD2]">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D4C38]">
                  Step 02
                </p>
                <h2 className="font-serif-editorial text-3xl text-[#1C1B18]">
                  Shipping Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`p-4 border cursor-pointer flex items-start justify-between ${
                    formData.shippingMethod === 'standard'
                      ? 'bg-[#EFECE3] border-[#182B21]'
                      : 'bg-[#F7F4ED] border-[#D5CFC2]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="standard"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleChange}
                      className="mt-1 accent-[#182B21]"
                    />
                    <div>
                      <span className="block font-medium text-sm text-[#1C1B18]">
                        Standard Surface / Air
                      </span>
                      <span className="text-xs text-[#5A564E]">
                        4–6 business days across India
                      </span>
                    </div>
                  </div>
                  <span className="font-mono-spec text-xs font-medium text-[#1C1B18]">
                    {liveTotals.hasUnlockedFreeShipping ? 'FREE' : '₹85'}
                  </span>
                </label>

                <label
                  className={`p-4 border cursor-pointer flex items-start justify-between ${
                    formData.shippingMethod === 'express'
                      ? 'bg-[#EFECE3] border-[#182B21]'
                      : 'bg-[#F7F4ED] border-[#D5CFC2]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="express"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleChange}
                      className="mt-1 accent-[#182B21]"
                    />
                    <div>
                      <span className="block font-medium text-sm text-[#1C1B18]">
                        Priority Express Air
                      </span>
                      <span className="text-xs text-[#5A564E]">
                        2–3 business days
                      </span>
                    </div>
                  </div>
                  <span className="font-mono-spec text-xs font-medium text-[#1C1B18]">
                    {liveTotals.hasUnlockedFreeShipping ? '₹75' : '₹160'}
                  </span>
                </label>
              </div>
            </section>

            {/* Step 3: Payment Method (Clean API-ready abstraction) */}
            <section className="space-y-4 pt-8 border-t border-[#E2DDD2]">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#6D4C38]">
                  Step 03
                </p>
                <h2 className="font-serif-editorial text-3xl text-[#1C1B18]">
                  Payment Method
                </h2>
                <p className="text-xs text-[#5A564E] mt-1">
                  All transactions are encrypted. Select your preferred payment mode below.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'upi',
                    title: 'UPI (Google Pay, PhonePe, BHIM)',
                    desc: 'Instant verification via UPI QR or VPA'
                  },
                  {
                    id: 'card',
                    title: 'Credit / Debit Card (Visa, Mastercard, RuPay)',
                    desc: 'Tokenized 3D-Secure card checkout'
                  },
                  {
                    id: 'netbanking',
                    title: 'NetBanking',
                    desc: 'All major Indian banks supported'
                  },
                  {
                    id: 'cod',
                    title: 'Pay on Delivery (Cash / UPI at Doorstep)',
                    desc: 'Available for serviceable PIN codes across India'
                  }
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-start gap-3 p-4 border cursor-pointer ${
                      formData.paymentMethod === method.id
                        ? 'bg-[#EFECE3] border-[#182B21]'
                        : 'bg-[#F7F4ED] border-[#D5CFC2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleChange}
                      className="mt-1 accent-[#182B21]"
                    />
                    <div>
                      <span className="block text-sm font-medium text-[#1C1B18]">
                        {method.title}
                      </span>
                      <span className="text-xs text-[#5A564E]">{method.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary + PLACE ORDER */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 bg-[#EFECE3] border border-[#E2DDD2] p-6 sm:p-8 space-y-6">
            <h2 className="font-serif-editorial text-2xl text-[#1C1B18] pb-3 border-b border-[#D5CFC2]">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h2>

            <ul className="divide-y divide-[#D5CFC2] max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <li key={item.sku} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover border border-[#D5CFC2]"
                    />
                    <div>
                      <p className="font-serif-editorial text-lg text-[#1C1B18] leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs font-mono-spec text-[#5A564E]">
                        {item.weight} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono-spec text-sm text-[#1C1B18]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-2.5 pt-4 border-t border-[#D5CFC2] text-sm">
              <div className="flex justify-between text-[#5A564E]">
                <span>Subtotal</span>
                <span className="font-mono-spec text-[#1C1B18]">
                  ₹{liveTotals.subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#5A564E]">
                <span>Shipping</span>
                <span className="font-mono-spec text-[#1C1B18]">
                  {liveTotals.shipping === 0 ? 'FREE' : `₹${liveTotals.shipping}`}
                </span>
              </div>
              {liveTotals.discount > 0 && (
                <div className="flex justify-between text-[#2A5A3B]">
                  <span>Privilege Discount</span>
                  <span className="font-mono-spec">-₹{liveTotals.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-semibold text-[#1C1B18] pt-3 border-t border-[#D5CFC2]">
                <span>Total Payable</span>
                <span className="font-mono-spec">
                  ₹{liveTotals.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSubmitting || cart.length === 0}
            >
              {isSubmitting ? 'PROCESSING ORDER...' : 'PLACE ORDER'}
            </Button>

            <div className="pt-3 border-t border-[#D5CFC2] flex items-start gap-2.5 text-xs text-[#5A564E]">
              <ShieldCheck size={16} className="text-[#182B21] shrink-0 mt-0.5" />
              <span>
                256-bit TLS encrypted checkout. Packed in protective amber glass & food-grade barrier pouches.
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
