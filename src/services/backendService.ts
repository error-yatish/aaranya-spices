import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { CartItem, CheckoutFormData } from '../types/ecommerce';
import { OrderSummaryCalculation } from './checkoutService';

export interface StoredOrderRecord {
  id: string;
  orderReference: string;
  createdAt: string;
  customer: CheckoutFormData;
  items: CartItem[];
  pricing: OrderSummaryCalculation;
  paymentStatus: 'PENDING' | 'PAID' | 'COD_CONFIRMED' | 'FAILED' | 'REFUNDED';
  orderStatus: 'RECEIVED' | 'PACKED' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
  awbTrackingCode?: string;
  storageEngine: 'supabase' | 'local_db';
}

export interface SpiceBatchRecord {
  batchCode: string;
  productId: string;
  productName: string;
  sourcingRegion: string;
  harvestWindow: string;
  milledDate: string;
  bestBeforeDate: string;
  certificationRef: string;
  sensoryNotes: string;
}

export interface ContactInquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'OPEN' | 'RESOLVED';
  createdAt: string;
}

const LOCAL_ORDERS_KEY = 'aaranya_backend_orders_v1';
const LOCAL_BATCHES_KEY = 'aaranya_backend_batches_v1';
const LOCAL_INQUIRIES_KEY = 'aaranya_backend_inquiries_v1';
const LOCAL_SUBSCRIBERS_KEY = 'aaranya_backend_subscribers_v1';

const DEFAULT_BATCHES: SpiceBatchRecord[] = [
  {
    batchCode: 'BATCH-TRM-2608',
    productId: 'aar-turmeric-01',
    productName: 'Turmeric Powder',
    sourcingRegion: 'India — [SOURCING REGION]',
    harvestWindow: 'Winter 2026 Cured Harvest',
    milledDate: '2026-08-15',
    bestBeforeDate: '2027-08-15',
    certificationRef: '[CERTIFICATION]',
    sensoryNotes: 'Deep golden-ochre, warm ginger root and woody musk.'
  },
  {
    batchCode: 'BATCH-KCH-2609',
    productId: 'aar-chilli-02',
    productName: 'Kashmiri Chilli Powder',
    sourcingRegion: 'India — [SOURCING REGION]',
    harvestWindow: 'Autumn Sun-Dried Lot',
    milledDate: '2026-09-02',
    bestBeforeDate: '2027-09-02',
    certificationRef: '[CERTIFICATION]',
    sensoryNotes: 'Bright brick-crimson pigment, mild fruity warmth.'
  },
  {
    batchCode: 'BATCH-BPP-2608',
    productId: 'aar-black-pepper-05',
    productName: 'Black Pepper',
    sourcingRegion: 'India — [SOURCING REGION]',
    harvestWindow: 'Monsoon Vine Harvest',
    milledDate: '2026-08-20',
    bestBeforeDate: '2028-08-20',
    certificationRef: '[CERTIFICATION]',
    sensoryNotes: 'Bold 550g/L density berries, resinous pine and citrus bite.'
  },
  {
    batchCode: 'BATCH-GRM-2609',
    productId: 'aar-garam-masala-08',
    productName: 'Garam Masala',
    sourcingRegion: 'India — [SOURCING REGION]',
    harvestWindow: 'Small-Lot Blend Run #14',
    milledDate: '2026-09-10',
    bestBeforeDate: '2027-07-10',
    certificationRef: '[CERTIFICATION]',
    sensoryNotes: 'Green cardamom & mace forward eleven-spice roast.'
  }
];

function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore storage errors
  }
}

/**
 * Persist an order to Supabase PostgreSQL (`orders` + `order_items` + `decrement_variant_inventory`)
 * and mirror to local storage for instant admin inspection.
 */
export async function persistOrderRecord(
  orderReference: string,
  formData: CheckoutFormData,
  items: CartItem[],
  couponCode: string,
  pricing: OrderSummaryCalculation
): Promise<StoredOrderRecord> {
  const createdAt = new Date().toISOString();
  const paymentStatus = formData.paymentMethod === 'cod' ? 'COD_CONFIRMED' : 'PENDING';
  let storageEngine: 'supabase' | 'local_db' = 'local_db';
  let recordId = `ord-${Date.now()}`;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: orderRow, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_reference: orderReference,
          customer_name: formData.name,
          customer_mobile: formData.mobile,
          customer_email: formData.email,
          shipping_address: formData.address,
          shipping_city: formData.city,
          shipping_state: formData.state,
          shipping_pincode: formData.pinCode,
          shipping_method: formData.shippingMethod,
          payment_method: formData.paymentMethod,
          payment_status: paymentStatus,
          order_status: 'RECEIVED',
          coupon_code: couponCode || null,
          subtotal: pricing.subtotal,
          shipping_fee: pricing.shipping,
          discount_amount: pricing.discount,
          total_amount: pricing.total,
          notes: formData.notes || null
        })
        .select('id')
        .single();

      if (!orderError && orderRow) {
        recordId = orderRow.id;
        storageEngine = 'supabase';

        const orderItemsPayload = items.map((item) => ({
          order_id: orderRow.id,
          product_id: item.productId,
          product_name: item.name,
          sku: item.sku,
          weight: item.weight,
          unit_price: item.price,
          quantity: item.quantity,
          line_total: item.price * item.quantity
        }));

        await supabase.from('order_items').insert(orderItemsPayload);

        // Decrement inventory for each variant SKU
        for (const item of items) {
          await supabase.rpc('decrement_variant_inventory', {
            p_sku: item.sku,
            p_quantity: item.quantity
          });
        }
      }
    } catch {
      // Fall back to local DB if network fails
    }
  }

  const storedOrder: StoredOrderRecord = {
    id: recordId,
    orderReference,
    createdAt,
    customer: formData,
    items,
    pricing,
    paymentStatus,
    orderStatus: 'RECEIVED',
    storageEngine
  };

  const existing = readLocal<StoredOrderRecord[]>(LOCAL_ORDERS_KEY, []);
  writeLocal(LOCAL_ORDERS_KEY, [storedOrder, ...existing]);

  return storedOrder;
}

export async function fetchAllOrders(): Promise<StoredOrderRecord[]> {
  const localOrders = readLocal<StoredOrderRecord[]>(LOCAL_ORDERS_KEY, []);

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row: Record<string, any>) => ({
          id: row.id,
          orderReference: row.order_reference,
          createdAt: row.created_at,
          customer: {
            name: row.customer_name,
            mobile: row.customer_mobile,
            email: row.customer_email,
            address: row.shipping_address,
            city: row.shipping_city,
            state: row.shipping_state,
            pinCode: row.shipping_pincode,
            shippingMethod: row.shipping_method,
            paymentMethod: row.payment_method
          },
          items: (row.order_items || []).map((it: Record<string, any>) => ({
            productId: it.product_id,
            slug: it.product_id,
            name: it.product_name,
            categoryLabel: 'Spices',
            image: '/images/prod-turmeric-powder.jpg',
            weight: it.weight,
            sku: it.sku,
            price: it.unit_price,
            quantity: it.quantity
          })),
          pricing: {
            subtotal: row.subtotal,
            shipping: row.shipping_fee,
            discount: row.discount_amount,
            total: row.total_amount,
            amountAwayFromFreeShipping: 0,
            hasUnlockedFreeShipping: row.shipping_fee === 0
          },
          paymentStatus: row.payment_status,
          orderStatus: row.order_status,
          awbTrackingCode: row.awb_tracking_code,
          storageEngine: 'supabase'
        }));
      }
    } catch {
      // fallback to localOrders
    }
  }

  return localOrders;
}

export async function updateOrderStatus(
  orderReference: string,
  orderStatus: StoredOrderRecord['orderStatus'],
  awbTrackingCode?: string
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('orders')
        .update({
          order_status: orderStatus,
          ...(awbTrackingCode ? { awb_tracking_code: awbTrackingCode } : {}),
          updated_at: new Date().toISOString()
        })
        .eq('order_reference', orderReference);
    } catch {
      // continue to local update
    }
  }

  const localOrders = readLocal<StoredOrderRecord[]>(LOCAL_ORDERS_KEY, []);
  const updated = localOrders.map((o) =>
    o.orderReference === orderReference
      ? {
          ...o,
          orderStatus,
          ...(awbTrackingCode ? { awbTrackingCode } : {})
        }
      : o
  );
  writeLocal(LOCAL_ORDERS_KEY, updated);
}

export async function subscribeToNewsletter(
  email: string,
  source = 'footer'
): Promise<{ ok: boolean; engine: 'supabase' | 'local_db' }> {
  const normalized = email.trim().toLowerCase();
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .upsert({ email: normalized, source }, { onConflict: 'email' });
      if (!error) {
        return { ok: true, engine: 'supabase' };
      }
    } catch {
      // fallback
    }
  }

  const existing = readLocal<string[]>(LOCAL_SUBSCRIBERS_KEY, []);
  if (!existing.includes(normalized)) {
    writeLocal(LOCAL_SUBSCRIBERS_KEY, [normalized, ...existing]);
  }
  return { ok: true, engine: 'local_db' };
}

export async function submitContactInquiry(payload: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<ContactInquiryRecord> {
  const record: ContactInquiryRecord = {
    id: `inq-${Date.now()}`,
    ...payload,
    status: 'OPEN',
    createdAt: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('contact_inquiries').insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        subject: payload.subject,
        message: payload.message
      });
    } catch {
      // fallback
    }
  }

  const existing = readLocal<ContactInquiryRecord[]>(LOCAL_INQUIRIES_KEY, []);
  writeLocal(LOCAL_INQUIRIES_KEY, [record, ...existing]);
  return record;
}

export async function fetchContactInquiries(): Promise<ContactInquiryRecord[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((r: Record<string, any>) => ({
          id: r.id,
          name: r.name,
          email: r.email,
          phone: r.phone,
          subject: r.subject,
          message: r.message,
          status: r.status,
          createdAt: r.created_at
        }));
      }
    } catch {
      // fallback
    }
  }
  return readLocal<ContactInquiryRecord[]>(LOCAL_INQUIRIES_KEY, []);
}

export async function fetchSpiceBatches(): Promise<SpiceBatchRecord[]> {
  return readLocal<SpiceBatchRecord[]>(LOCAL_BATCHES_KEY, DEFAULT_BATCHES);
}

export async function sendCustomerOtpLink(email: string): Promise<{
  sentViaSupabase: boolean;
  message: string;
}> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: window.location.origin
      }
    });
    if (!error) {
      return {
        sentViaSupabase: true,
        message: `A magic sign-in link has been sent to ${email} via Supabase Auth.`
      };
    }
  }
  return {
    sentViaSupabase: false,
    message: `One-time sign-in link prepared for ${email}. (Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY in .env to send live magic links.)`
  };
}
