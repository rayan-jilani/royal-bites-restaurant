import { createClient } from '@supabase/supabase-js';
import type { TrackedOrder } from '../data/orderTracker';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Saves order into Supabase 'orders' table
 */
export async function saveOrderToSupabase(order: TrackedOrder): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase credentials not configured in .env' };
  }

  try {
    const { error } = await supabase.from('orders').insert([
      {
        order_id: order.orderId,
        customer_name: order.customerName,
        phone: order.phone,
        address: order.address,
        special_instructions: order.specialInstructions || '',
        items: order.items,
        subtotal: order.subtotal,
        delivery_fee: order.deliveryFee,
        total: order.total,
        status: 'received',
        current_stage_index: order.currentStageIndex,
        rider_name: order.riderName,
        rider_phone: order.riderPhone,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.warn('Supabase insert warning:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('Supabase error:', err);
    return { success: false, error: err?.message || 'Failed to save to Supabase' };
  }
}

/**
 * Fetch live order from Supabase by Order ID
 */
export async function fetchOrderFromSupabase(orderId: string): Promise<TrackedOrder | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId.trim().toUpperCase())
      .single();

    if (error || !data) return null;

    return {
      orderId: data.order_id,
      customerName: data.customer_name,
      phone: data.phone,
      address: data.address,
      specialInstructions: data.special_instructions,
      items: data.items,
      subtotal: Number(data.subtotal),
      deliveryFee: Number(data.delivery_fee),
      total: Number(data.total),
      createdAt: new Date(data.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      currentStageIndex: data.current_stage_index ?? 0,
      riderName: data.rider_name || 'Assigned Royal Rider',
      riderPhone: data.rider_phone || '+92 300 1234567',
      estimatedArrivalMinutes: 30,
    };
  } catch {
    return null;
  }
}
