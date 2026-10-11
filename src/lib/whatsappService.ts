import type { TrackedOrder } from '../data/orderTracker';
import { formatPKR } from '../data/menuData';

const OWNER_WHATSAPP_KEY = 'royal_bites_owner_whatsapp';
export const DEFAULT_WHATSAPP_NUMBER = '923110003160'; // 03110003160

export const getOwnerWhatsAppNumber = (): string => {
  try {
    const saved = localStorage.getItem(OWNER_WHATSAPP_KEY);
    if (saved && saved.trim()) return cleanWhatsAppNumber(saved.trim());
  } catch {
    // ignore
  }
  return import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
};

export const setOwnerWhatsAppNumber = (num: string): void => {
  try {
    localStorage.setItem(OWNER_WHATSAPP_KEY, cleanWhatsAppNumber(num));
  } catch {
    // ignore
  }
};

/**
 * Standardizes Pakistani numbers (e.g. 03110003160 -> 923110003160)
 */
export const cleanWhatsAppNumber = (phone: string): string => {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('03')) {
    cleaned = '92' + cleaned.substring(1);
  } else if (cleaned.startsWith('3')) {
    cleaned = '92' + cleaned;
  }
  return cleaned;
};

/**
 * Formats a clean, readable WhatsApp receipt message
 */
export const formatWhatsAppOrderMessage = (order: TrackedOrder): string => {
  const itemsText = order.items
    .map((item, idx) => `  ${idx + 1}. *${item.quantity}x ${item.name}* — ${formatPKR(item.lineTotal)}`)
    .join('\n');

  return (
`👑 *ROYAL BITES — NEW ORDER* 👑
--------------------------------
🔖 *Order Reference:* *${order.orderId}*
⏰ *Time:* ${order.createdAt}

👤 *CUSTOMER DETAILS:*
• *Name:* ${order.customerName}
• *Phone:* ${order.phone}
• *Delivery Address:* ${order.address}
${order.specialInstructions ? `• *Special Note:* _${order.specialInstructions}_\n` : ''}
🍽️ *ITEMS ORDERED:*
${itemsText}

💰 *PAYMENT BREAKDOWN:*
• Subtotal: ${formatPKR(order.subtotal)}
• Delivery Fee: ${formatPKR(order.deliveryFee)}
• *GRAND TOTAL:* *${formatPKR(order.total)}*
• *Payment Mode:* Cash on Delivery (COD)

🛵 *Current Status:* Cooking in Kitchen
--------------------------------
_Order received via Royal Bites Website_`
  );
};

/**
 * Generates direct WhatsApp URL
 */
export const getWhatsAppOrderUrl = (order: TrackedOrder): string => {
  const phone = getOwnerWhatsAppNumber();
  const text = formatWhatsAppOrderMessage(order);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

/**
 * Opens WhatsApp link directly in new window
 */
export const openWhatsAppWithOrder = (order: TrackedOrder): void => {
  const url = getWhatsAppOrderUrl(order);
  window.open(url, '_blank', 'noopener,noreferrer');
};
