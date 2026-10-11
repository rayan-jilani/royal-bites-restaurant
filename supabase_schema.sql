-- ==============================================================================
-- ROYAL BITES — SUPABASE DATABASE SCHEMA
-- Run this in your Supabase Project SQL Editor (SQL Editor -> New Query -> Run)
-- ==============================================================================

-- 1. Create the orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    special_instructions TEXT,
    items JSONB NOT NULL,
    subtotal NUMERIC NOT NULL,
    delivery_fee NUMERIC NOT NULL DEFAULT 150,
    total NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'received',
    current_stage_index INTEGER NOT NULL DEFAULT 0,
    rider_name TEXT DEFAULT 'Farhan Ali (Royal Rider)',
    rider_phone TEXT DEFAULT '+92 300 4567890',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Policy to allow anonymous website visitors to insert their orders
CREATE POLICY "Allow public customer order creation"
ON public.orders
FOR INSERT
TO public
WITH CHECK (true);

-- 4. Policy to allow customers to view/track their order using their Order ID
CREATE POLICY "Allow public tracking of orders"
ON public.orders
FOR SELECT
TO public
USING (true);

-- 5. Policy to allow updating order stage during demo / admin simulation
CREATE POLICY "Allow update for demo stage simulation"
ON public.orders
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Insert a sample order for immediate testing verification
INSERT INTO public.orders (
    order_id,
    customer_name,
    phone,
    address,
    special_instructions,
    items,
    subtotal,
    delivery_fee,
    total,
    status,
    current_stage_index
) VALUES (
    'RB-9901',
    'Zubair Tariq',
    '0300 8899123',
    'House 12, Street 4, Gulberg III, Lahore',
    'Extra julienned ginger, crisp naan',
    '[{"name": "Chicken Karahi", "quantity": 1, "unitPrice": 1850, "lineTotal": 1850}, {"name": "Karachi Chicken Biryani", "quantity": 2, "unitPrice": 950, "lineTotal": 1900}]'::jsonb,
    3750,
    150,
    3900,
    'cooking',
    1
) ON CONFLICT (order_id) DO NOTHING;
