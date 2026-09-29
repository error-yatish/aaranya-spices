import { CheckoutFormData, CartItem } from '../types/ecommerce';

export const FREE_SHIPPING_THRESHOLD = 999;
export const STANDARD_SHIPPING_FEE = 85;
export const EXPRESS_SHIPPING_FEE = 160;

export interface OrderSummaryCalculation {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  amountAwayFromFreeShipping: number;
  hasUnlockedFreeShipping: boolean;
}

export interface OrderConfirmationResult {
  success: boolean;
  orderReference: string;
  createdAt: string;
  estimatedDelivery: string;
  paymentProviderStatus: 'READY_FOR_GATEWAY_WEBHOOK' | 'COD_CONFIRMED';
  customer: CheckoutFormData;
  items: CartItem[];
  pricing: OrderSummaryCalculation;
}

export function calculateOrderTotals(
  items: CartItem[],
  couponCode: string,
  shippingMethod: 'standard' | 'express' = 'standard'
): OrderSummaryCalculation {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasUnlockedFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountAwayFromFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  let shipping = 0;
  if (subtotal > 0) {
    if (shippingMethod === 'express') {
      shipping = hasUnlockedFreeShipping ? 75 : EXPRESS_SHIPPING_FEE;
    } else {
      shipping = hasUnlockedFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
    }
  }

  let discount = 0;
  const normalizedCode = couponCode.trim().toUpperCase();
  if (normalizedCode === 'AARANYA10' && subtotal > 0) {
    discount = Math.round(subtotal * 0.1);
  } else if (normalizedCode === 'WELCOME150' && subtotal >= 1200) {
    discount = 150;
  }

  const total = Math.max(0, subtotal - discount + shipping);

  return {
    subtotal,
    shipping,
    discount,
    total,
    amountAwayFromFreeShipping,
    hasUnlockedFreeShipping
  };
}

/**
 * Clean API-ready checkout abstraction.
 * Ready to be connected to Razorpay / Stripe / Shiprocket / custom backend API endpoints.
 */
export async function submitOrderToProvider(
  formData: CheckoutFormData,
  items: CartItem[],
  couponCode: string
): Promise<OrderConfirmationResult> {
  // Simulate network latency for API-ready order creation
  await new Promise((resolve) => setTimeout(resolve, 650));

  const pricing = calculateOrderTotals(items, couponCode, formData.shippingMethod);
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);

  return {
    success: true,
    orderReference: `AAR-2026-${randomSuffix}`,
    createdAt: new Date().toISOString(),
    estimatedDelivery:
      formData.shippingMethod === 'express' ? '2–3 Business Days' : '4–6 Business Days',
    paymentProviderStatus:
      formData.paymentMethod === 'cod' ? 'COD_CONFIRMED' : 'READY_FOR_GATEWAY_WEBHOOK',
    customer: formData,
    items,
    pricing
  };
}
