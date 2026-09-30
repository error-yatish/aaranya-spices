// ============================================================================
// SUPABASE EDGE FUNCTION: create-razorpay-order
// Runtime: Deno (Supabase Edge Functions)
// Deploy: `supabase functions deploy create-razorpay-order`
// ============================================================================

// @ts-nocheck — Deno Edge Function environment
import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderReference, totalAmountInr, customerEmail, customerMobile } = await req.json();

    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!razorpayKeyId || !razorpayKeySecret) {
      return new Response(
        JSON.stringify({
          error: 'Razorpay credentials not configured in Supabase secrets.',
          mode: 'READY_FOR_GATEWAY_CREDENTIALS',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authHeader = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
    const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(Number(totalAmountInr) * 100), // INR to paise
        currency: 'INR',
        receipt: orderReference,
        notes: {
          brand: 'AARANYA SPICES',
          customer_email: customerEmail,
          customer_mobile: customerMobile,
        },
      }),
    });

    const rzpOrder = await rzpResponse.json();

    // Update order record with razorpay_order_id
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    await supabaseAdmin
      .from('orders')
      .update({ razorpay_order_id: rzpOrder.id })
      .eq('order_reference', orderReference);

    return new Response(
      JSON.stringify({
        razorpayOrderId: rzpOrder.id,
        amountPaise: rzpOrder.amount,
        currency: 'INR',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
