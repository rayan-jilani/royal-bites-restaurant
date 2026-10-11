export type OrderStatusStage = 'received' | 'cooking' | 'ready' | 'out_for_delivery' | 'delivered';

export interface OrderTrackingStep {
  stage: OrderStatusStage;
  title: string;
  urduTitle: string;
  description: string;
  icon: string;
  estimatedTimeText: string;
}

export const TRACKING_STAGES: OrderTrackingStep[] = [
  {
    stage: 'received',
    title: 'Order Confirmed',
    urduTitle: 'آرڈر تصدیق ہو گیا',
    description: 'Your order has been received by Royal Bites kitchen and ingredients are being prepared.',
    icon: 'ReceiptCheck',
    estimatedTimeText: 'Just Now',
  },
  {
    stage: 'cooking',
    title: 'Cooking in Karahi & Tandoor',
    urduTitle: 'کھانا پک رہا ہے',
    description: 'Our chefs are slow-cooking your dishes in authentic iron karahis and baking fresh tandoori naan.',
    icon: 'Flame',
    estimatedTimeText: '10–20 mins',
  },
  {
    stage: 'ready',
    title: 'Quality Checked & Packed',
    urduTitle: 'پیکنگ مکمل ہو گئی',
    description: 'Food is sealed in royal thermal containers to preserve freshness, steam, and sizzling aroma.',
    icon: 'PackageCheck',
    estimatedTimeText: '5 mins ago',
  },
  {
    stage: 'out_for_delivery',
    title: 'Out for Delivery',
    urduTitle: 'رائیڈر راستے میں ہے',
    description: 'Our royal delivery rider is on the way to your address with your hot desi meal.',
    icon: 'Bike',
    estimatedTimeText: '15 mins remaining',
  },
  {
    stage: 'delivered',
    title: 'Delivered — Enjoy Your Feast!',
    urduTitle: 'کھانا پہنچ گیا — نوش فرمائیں',
    description: 'Order successfully delivered. Enjoy the royal taste of authentic Pakistani cuisine!',
    icon: 'CheckCircle2',
    estimatedTimeText: 'Delivered',
  },
];

export interface TrackedOrder {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  specialInstructions?: string;
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  currentStageIndex: number; // 0 to 4
  riderName: string;
  riderPhone: string;
  estimatedArrivalMinutes: number;
}

const ORDERS_STORAGE_KEY = 'royal_bites_orders_v1';

// Seed demo orders for immediate testing
const INITIAL_DEMO_ORDERS: TrackedOrder[] = [
  {
    orderId: 'RB-786',
    customerName: 'Rayan Arif (Live Test Order)',
    phone: '0311 0003160',
    address: 'House 45, Street 12, Bahadurabad, Karachi',
    specialInstructions: 'Extra spicy Chicken Karahi, fresh julienned ginger, hot roghani naan',
    items: [
      { name: 'Chicken Karahi', quantity: 1, unitPrice: 1850, lineTotal: 1850 },
      { name: 'Karachi Chicken Biryani', quantity: 2, unitPrice: 950, lineTotal: 1900 },
    ],
    subtotal: 3750,
    deliveryFee: 150,
    total: 3900,
    createdAt: 'Just Now',
    currentStageIndex: 1, // Cooking in Karahi & Tandoor
    riderName: 'Farhan Ali (Royal Rider)',
    riderPhone: '+92 300 4567890',
    estimatedArrivalMinutes: 30,
  },
  {
    orderId: 'RB-8520',
    customerName: 'Muhammad Hamza',
    phone: '0311 0003160',
    address: 'Shop 12, Alamgir Road, Bahadurabad, Karachi',
    specialInstructions: 'Extra julienned ginger in karahi, send green raita',
    items: [
      { name: 'Chicken Karahi', quantity: 1, unitPrice: 1850, lineTotal: 1850 },
      { name: 'Karachi Chicken Biryani', quantity: 1, unitPrice: 950, lineTotal: 950 },
    ],
    subtotal: 2800,
    deliveryFee: 150,
    total: 2950,
    createdAt: '10:20 AM',
    currentStageIndex: 1, // Cooking in Karahi
    riderName: 'Tariq Mehmood',
    riderPhone: '+92 321 8899001',
    estimatedArrivalMinutes: 25,
  },
  {
    orderId: 'RB-4190',
    customerName: 'Ayesha Khan',
    phone: '0322 9876543',
    address: 'Apartment 4B, Royal Heights, Bahadurabad, Karachi',
    specialInstructions: 'Crispy naan, mild spices',
    items: [
      { name: 'Chicken Handi', quantity: 1, unitPrice: 1950, lineTotal: 1950 },
      { name: 'Seekh Kebabs', quantity: 2, unitPrice: 890, lineTotal: 1780 },
    ],
    subtotal: 3730,
    deliveryFee: 150,
    total: 3880,
    createdAt: '09:45 AM',
    currentStageIndex: 3, // Out for delivery
    riderName: 'Bilal Ahmed',
    riderPhone: '+92 301 7766554',
    estimatedArrivalMinutes: 10,
  },
];

export const getStoredOrders = (): TrackedOrder[] => {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
      return INITIAL_DEMO_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEMO_ORDERS;
  } catch {
    return INITIAL_DEMO_ORDERS;
  }
};

export const saveOrderToStorage = (order: TrackedOrder): void => {
  try {
    const orders = getStoredOrders();
    const filtered = orders.filter((o) => o.orderId !== order.orderId);
    const updated = [order, ...filtered];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
};

export const findOrderByNumber = (orderId: string): TrackedOrder | null => {
  const cleanId = orderId.trim().toUpperCase();
  const orders = getStoredOrders();
  return orders.find((o) => o.orderId.toUpperCase() === cleanId) || null;
};

export const updateOrderStatusStage = (orderId: string, nextIndex: number): TrackedOrder | null => {
  try {
    const orders = getStoredOrders();
    const order = orders.find((o) => o.orderId.toUpperCase() === orderId.toUpperCase());
    if (!order) return null;

    order.currentStageIndex = Math.max(0, Math.min(TRACKING_STAGES.length - 1, nextIndex));
    // Adjust estimated minutes based on stage
    if (order.currentStageIndex === 0) order.estimatedArrivalMinutes = 40;
    else if (order.currentStageIndex === 1) order.estimatedArrivalMinutes = 25;
    else if (order.currentStageIndex === 2) order.estimatedArrivalMinutes = 18;
    else if (order.currentStageIndex === 3) order.estimatedArrivalMinutes = 8;
    else if (order.currentStageIndex === 4) order.estimatedArrivalMinutes = 0;

    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return order;
  } catch {
    return null;
  }
};
