import emailjs from '@emailjs/browser';
import type { TrackedOrder } from '../data/orderTracker';
import { formatPKR } from '../data/menuData';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const gmailRecipient = import.meta.env.VITE_GMAIL_ADDRESS || 'rayanarif214@gmail.com';

export const isEmailJsConfigured = Boolean(
  serviceId && templateId && publicKey && publicKey !== 'your_public_key'
);

/**
 * Sends order details to Gmail using EmailJS
 */
export async function sendOrderNotificationEmail(order: TrackedOrder): Promise<{ success: boolean; message: string }> {
  const itemsText = order.items
    .map((item) => `- ${item.quantity}x ${item.name} (${formatPKR(item.lineTotal)})`)
    .join('\n');

  const templateParams = {
    order_id: order.orderId,
    customer_name: order.customerName,
    customer_phone: order.phone,
    delivery_address: order.address,
    special_instructions: order.specialInstructions || 'None',
    items_list: itemsText,
    subtotal: formatPKR(order.subtotal),
    delivery_fee: formatPKR(order.deliveryFee),
    total: formatPKR(order.total),
    to_email: gmailRecipient,
    order_time: new Date().toLocaleString(),
  };

  if (!isEmailJsConfigured) {
    console.info('EmailJS credentials not configured yet. Demo order logged for Gmail notification:', templateParams);
    return {
      success: true,
      message: 'Demo mode: Order prepared for Gmail (configure EmailJS keys in .env to deliver real emails to your inbox).',
    };
  }

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return {
      success: response.status === 200,
      message: response.status === 200 ? 'Order email sent to your Gmail inbox!' : 'Failed to send email notification.',
    };
  } catch (error: any) {
    console.warn('EmailJS error:', error);
    return {
      success: false,
      message: error?.text || 'Could not send email to Gmail.',
    };
  }
}
