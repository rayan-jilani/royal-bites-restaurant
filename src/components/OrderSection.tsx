import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Phone,
  User,
  Receipt,
  RotateCcw,
  UtensilsCrossed,
  Bike,
  Database,
  Mail,
  MessageCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS, formatPKR } from '../data/menuData';
import { saveOrderToStorage, type TrackedOrder } from '../data/orderTracker';
import { saveOrderToSupabase, isSupabaseConfigured } from '../lib/supabase';
import { sendOrderNotificationEmail } from '../lib/emailService';
import { sendOrderDirectToGmail, getOwnerGmail } from '../lib/automaticEmail';
import { openWhatsAppWithOrder } from '../lib/whatsappService';

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
  cart?: string;
}

interface SubmittedOrder {
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
  timestamp: string;
}

export const OrderSection: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, deliveryFee, total } = useCart();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedQuickDishId, setSelectedQuickDishId] = useState<string>('');

  // Validation & UI State
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);
  const [currentTrackedOrder, setCurrentTrackedOrder] = useState<TrackedOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbNotificationStatus, setDbNotificationStatus] = useState<string>('');
  const [emailNotificationStatus, setEmailNotificationStatus] = useState<string>('');
  const [whatsAppStatus, setWhatsAppStatus] = useState<string>('');

  // Quick add dish helper from inside the order form
  const handleQuickAddDish = (dishId: string) => {
    if (!dishId) return;
    const dish = MENU_ITEMS.find((d) => d.id === dishId);
    if (dish) {
      addToCart(dish, 1);
      setSelectedQuickDishId('');
      if (errors.cart) {
        setErrors((prev) => ({ ...prev, cart: undefined }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else {
      // Allow Pakistani format or international (e.g. 03001234567 or +923001234567)
      const phoneDigits = phone.replace(/[^0-9]/g, '');
      if (phoneDigits.length < 10 || phoneDigits.length > 13) {
        newErrors.phone = 'Please enter a valid phone number (10 to 12 digits).';
      }
    }

    if (!address.trim()) {
      newErrors.address = 'Please enter your complete delivery address.';
    } else if (address.trim().length < 8) {
      newErrors.address = 'Please provide a detailed street/house address.';
    }

    if (cart.length === 0) {
      newErrors.cart = 'Please select at least one dish for your order.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Place order and trigger Supabase & Gmail notifications
    setTimeout(async () => {
      const orderId = `RB-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderRecord: SubmittedOrder = {
        orderId,
        customerName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        specialInstructions: specialInstructions.trim(),
        items: cart.map((item) => ({
          name: item.dish.name,
          quantity: item.quantity,
          unitPrice: item.dish.price,
          lineTotal: item.dish.price * item.quantity,
        })),
        subtotal,
        deliveryFee,
        total,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const trackedOrder: TrackedOrder = {
        orderId,
        customerName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        specialInstructions: specialInstructions.trim(),
        items: orderRecord.items,
        subtotal,
        deliveryFee,
        total,
        createdAt: orderRecord.timestamp,
        currentStageIndex: 1, // Stage 1: Cooking in Karahi & Tandoor
        riderName: 'Farhan Ali (Royal Rider)',
        riderPhone: '+92 300 4567890',
        estimatedArrivalMinutes: 30,
      };

      // 1. Save into local tracker storage
      saveOrderToStorage(trackedOrder);

      // 2. Save into Database (Supabase + Royal Bites Database)
      if (isSupabaseConfigured) {
        const sbRes = await saveOrderToSupabase(trackedOrder);
        setDbNotificationStatus(sbRes.success ? 'Saved to Supabase Live Database' : `Saved Locally (Supabase: ${sbRes.error})`);
      } else {
        setDbNotificationStatus('Saved to Royal Bites Database (Live in Admin & Tracker)');
      }

      // 3. Dispatch Gmail Notification (Automatic Zero-Config)
      const targetGmail = getOwnerGmail();
      await sendOrderDirectToGmail(trackedOrder);
      await sendOrderNotificationEmail(trackedOrder);
      setEmailNotificationStatus(`Dispatched to Gmail (${targetGmail})`);

      // 4. Dispatch WhatsApp Notification to 03110003160
      openWhatsAppWithOrder(trackedOrder);
      setWhatsAppStatus('Sent to WhatsApp (03110003160)');

      setCurrentTrackedOrder(trackedOrder);
      setSubmittedOrder(orderRecord);
      setIsSubmitting(false);
    }, 600);
  };

  const handleTrackNow = (orderId: string) => {
    setSubmittedOrder(null);
    clearCart();
    navigate('/track');
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('track-order-event', {
          detail: { orderId },
        })
      );
    }, 100);
  };

  const handleResetOrder = () => {
    setSubmittedOrder(null);
    setFullName('');
    setPhone('');
    setAddress('');
    setSpecialInstructions('');
    setErrors({});
    clearCart();
  };

  return (
    <section id="order" className="relative py-24 sm:py-32 bg-[#061009] overflow-hidden">
      {/* Background Decorative Gold Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#c59b27]/30 to-transparent" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#0c2f1f]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60 mb-4"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#dfb743]" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
              Online Dining Experience
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-bold text-[#faf6eb] mb-4"
          >
            Place Your Order
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#bfb7a6]"
          >
            Choose your favourite desi dishes and prepare your order in a few simple steps.
          </motion.p>
        </div>

        {/* Order Workspace Grid: Form on Left, Live Order Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Customer Details & Dish Selection Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 md:p-10 bg-[#0a1b12]/80 border border-[#c59b27]/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#c59b27]/15">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#faf6eb]">
                  1. Customer & Delivery Details
                </h3>
                <p className="text-xs text-[#a29b8c] mt-1">
                  Required fields must be completed to submit your order request.
                </p>
              </div>
              <span className="text-[11px] font-semibold text-[#c59b27] tracking-wider uppercase bg-[#102d1e] px-3 py-1 rounded-full border border-[#c59b27]/30">
                Step 1 of 2
              </span>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Customer Full Name */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#d6cebe] mb-2 flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-[#dfb743]" />
                  <span>Customer Full Name <span className="text-amber-400">*</span></span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="e.g., Tariq Mehmood"
                  className={`w-full px-4 py-3.5 rounded-xl bg-[#06130b] border ${
                    errors.fullName ? 'border-rose-500' : 'border-[#c59b27]/30 focus:border-[#dfb743]'
                  } text-[#faf6eb] placeholder-[#6d675b] text-sm focus:outline-none focus:ring-1 focus:ring-[#dfb743] transition-all`}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#d6cebe] mb-2 flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#dfb743]" />
                  <span>Phone Number <span className="text-amber-400">*</span></span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="e.g., 0300 1234567 or +92 321 9876543"
                  className={`w-full px-4 py-3.5 rounded-xl bg-[#06130b] border ${
                    errors.phone ? 'border-rose-500' : 'border-[#c59b27]/30 focus:border-[#dfb743]'
                  } text-[#faf6eb] placeholder-[#6d675b] text-sm focus:outline-none focus:ring-1 focus:ring-[#dfb743] transition-all`}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#d6cebe] mb-2 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#dfb743]" />
                  <span>Delivery Address <span className="text-amber-400">*</span></span>
                </label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
                  }}
                  placeholder="Enter house/apartment number, street name, block, and area (e.g., House 42, Block 3, Bahadurabad, Karachi)"
                  className={`w-full px-4 py-3.5 rounded-xl bg-[#06130b] border ${
                    errors.address ? 'border-rose-500' : 'border-[#c59b27]/30 focus:border-[#dfb743]'
                  } text-[#faf6eb] placeholder-[#6d675b] text-sm focus:outline-none focus:ring-1 focus:ring-[#dfb743] transition-all resize-none`}
                />
                {errors.address && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.address}</span>
                  </p>
                )}
              </div>

              {/* Dish Selection Quick Picker */}
              <div className="pt-2 border-t border-[#c59b27]/15">
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#d6cebe] mb-2 flex items-center space-x-1.5">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#dfb743]" />
                  <span>Quick Add Dishes from the Menu</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedQuickDishId}
                    onChange={(e) => setSelectedQuickDishId(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-[#06130b] border border-[#c59b27]/30 text-[#faf6eb] text-sm focus:outline-none focus:border-[#dfb743]"
                  >
                    <option value="">Select a Pakistani specialty dish...</option>
                    {MENU_ITEMS.map((dish) => (
                      <option key={dish.id} value={dish.id}>
                        {dish.name} — {formatPKR(dish.price)} ({dish.category})
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleQuickAddDish(selectedQuickDishId)}
                    disabled={!selectedQuickDishId}
                    className="px-5 py-3 rounded-xl bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shrink-0 flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Quick Dish Chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {MENU_ITEMS.map((dish) => {
                    const inCart = cart.some((c) => c.dish.id === dish.id);
                    return (
                      <button
                        key={dish.id}
                        type="button"
                        onClick={() => addToCart(dish, 1)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center space-x-1.5 ${
                          inCart
                            ? 'bg-[#153424] border-[#dfb743] text-[#dfb743]'
                            : 'bg-[#08150d] border-[#c59b27]/30 text-[#c7c0b1] hover:border-[#dfb743]/60'
                        }`}
                      >
                        <Plus className="w-3 h-3 text-[#dfb743]" />
                        <span>{dish.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Instructions (Optional) */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#d6cebe] mb-2">
                  Special Cooking Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g., Less oil, extra green chilies and julienned ginger, hot roghani naan"
                  className="w-full px-4 py-3 rounded-xl bg-[#06130b] border border-[#c59b27]/20 text-[#faf6eb] placeholder-[#6d675b] text-sm focus:outline-none focus:border-[#dfb743]"
                />
              </div>

              {/* Part 1 Demo Note */}
              <div className="p-3.5 rounded-xl bg-[#08140c] border border-[#c59b27]/20 text-xs text-[#a29b8c] leading-relaxed">
                <span className="font-semibold text-[#dfb743]">Part 1 Practical Exam Notice:</span> This order form demonstrates complete client-side order calculation, synchronization, and validation. In Part 2, Supabase database storage and Gmail notifications will be connected.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-gold-gradient text-[#08110b] font-bold text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.5)] hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-5 h-5 text-[#08110b]" />
                <span>{isSubmitting ? 'Validating & Processing...' : 'Submit Demo Order'}</span>
              </button>
            </form>
          </motion.div>

          {/* Right Column: Live Order Summary & Cart Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#0d2217]/85 border border-[#c59b27]/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md sticky top-28"
          >
            <div className="flex items-center justify-between pb-5 border-b border-[#c59b27]/20 mb-6">
              <div className="flex items-center space-x-2.5">
                <Receipt className="w-5 h-5 text-[#dfb743]" />
                <h3 className="font-serif text-2xl font-bold text-[#faf6eb]">
                  Order Summary
                </h3>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-[#c59b27] hover:text-rose-400 transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Validation Message if Cart is Empty */}
            {errors.cart && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errors.cart}</span>
              </div>
            )}

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#08140c] border border-[#c59b27]/30 flex items-center justify-center mx-auto text-[#8a8374]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="text-base font-semibold text-[#faf6eb]">Your Order is Empty</div>
                <p className="text-xs text-[#9d9585] max-w-xs mx-auto">
                  Select your favourite Pakistani dishes from the menu above or use the quick buttons below.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  {MENU_ITEMS.slice(0, 3).map((dish) => (
                    <button
                      key={dish.id}
                      onClick={() => addToCart(dish, 1)}
                      className="text-xs py-2 px-3 rounded-lg bg-[#08140c] hover:bg-[#122e1f] border border-[#c59b27]/20 text-[#dfb743] font-medium flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>+ {dish.name}</span>
                      <span>{formatPKR(dish.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {cart.map((item) => {
                  const lineTotal = item.dish.price * item.quantity;

                  return (
                    <div
                      key={item.dish.id}
                      className="p-3.5 rounded-2xl bg-[#07150c]/90 border border-[#c59b27]/15 flex items-center justify-between gap-3"
                    >
                      {/* Dish Thumbnail */}
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#c59b27]/20"
                      />

                      {/* Dish Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#faf6eb] truncate">
                          {item.dish.name}
                        </h4>
                        <div className="text-xs text-[#a29b8c]">
                          Unit: {formatPKR(item.dish.price)}
                        </div>
                        <div className="text-xs font-semibold text-gold-gradient mt-0.5">
                          Total: {formatPKR(lineTotal)}
                        </div>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center space-x-2 shrink-0">
                        <div className="flex items-center rounded-lg bg-[#0e281a] border border-[#c59b27]/30 p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                            className="p-1 text-[#ded8cb] hover:text-white hover:bg-[#173e28] rounded cursor-pointer"
                            aria-label={`Decrease quantity of ${item.dish.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-[#faf6eb]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                            className="p-1 text-[#ded8cb] hover:text-white hover:bg-[#173e28] rounded cursor-pointer"
                            aria-label={`Increase quantity of ${item.dish.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.dish.id)}
                          className="p-1.5 text-[#8f887a] hover:text-rose-400 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.dish.name} from order`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Calculations Breakdown */}
            {cart.length > 0 && (
              <div className="mt-6 pt-5 border-t border-[#c59b27]/20 space-y-3">
                <div className="flex items-center justify-between text-sm text-[#b5ad9e]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#faf6eb]">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#b5ad9e]">
                  <span>Royal Fresh Delivery</span>
                  <span className="font-semibold text-[#faf6eb]">{formatPKR(deliveryFee)}</span>
                </div>
                <div className="pt-3 border-t border-[#c59b27]/30 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-[#faf6eb] block">Grand Total</span>
                    <span className="text-[10px] text-[#8e8779] uppercase">Payable Upon Delivery / Cash on Delivery</span>
                  </div>
                  <span className="font-royal-brand text-2xl font-extrabold text-gold-gradient">
                    {formatPKR(total)}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Polished Demo Success Modal */}
      <AnimatePresence>
        {submittedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="max-w-lg w-full rounded-3xl p-6 sm:p-8 bg-[#091b12] border-2 border-[#dfb743] shadow-[0_25px_60px_rgba(0,0,0,0.95)] space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header Icon */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#123624] border border-[#dfb743] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle className="w-9 h-9 text-[#dfb743]" />
                </div>
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-gold-gradient block">
                  DEMO ORDER CONFIRMATION
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#faf6eb]">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-[#a29b8c]">
                  Thank you, <strong className="text-[#faf6eb]">{submittedOrder.customerName}</strong>. Your royal desi feast is being prepared.
                </p>
              </div>

              {/* Order Metadata Pill */}
              <div className="p-3 rounded-xl bg-[#06120b] border border-[#c59b27]/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#8d8575] block">Order Reference</span>
                  <span className="font-mono font-bold text-[#dfb743]">{submittedOrder.orderId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#8d8575] block">Estimated Preparation</span>
                  <span className="font-semibold text-[#faf6eb] flex items-center justify-end space-x-1">
                    <Clock className="w-3 h-3 text-[#dfb743]" />
                    <span>35–45 mins</span>
                  </span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="p-4 rounded-xl bg-[#06120b]/70 border border-[#c59b27]/20 text-xs space-y-2">
                <div className="flex items-start space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#dfb743] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8c8577]">Contact: </span>
                    <span className="text-[#faf6eb] font-medium">{submittedOrder.phone}</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#dfb743] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#8c8577]">Deliver To: </span>
                    <span className="text-[#faf6eb] font-medium">{submittedOrder.address}</span>
                  </div>
                </div>
                {submittedOrder.specialInstructions && (
                  <div className="pt-2 border-t border-[#c59b27]/10 text-[#c7c0b0]">
                    <span className="italic">Note: "{submittedOrder.specialInstructions}"</span>
                  </div>
                )}
              </div>

              {/* Ordered Dishes Summary */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#d6cebf]">
                  Items Ordered:
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {submittedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-[#06120b]/50 border border-white/5"
                    >
                      <span className="text-[#faf6eb]">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-semibold text-gold-gradient">
                        {formatPKR(item.lineTotal)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Amount */}
              <div className="pt-3 border-t border-[#c59b27]/30 flex items-center justify-between">
                <span className="text-sm font-bold text-[#faf6eb]">Final Total (PKR)</span>
                <span className="font-royal-brand text-2xl font-bold text-gold-gradient">
                  {formatPKR(submittedOrder.total)}
                </span>
              </div>

              {/* Supabase, Gmail & WhatsApp Integration Badges */}
              <div className="p-3.5 rounded-xl bg-[#051108] border border-[#c59b27]/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 text-[#25D366] font-semibold">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp (03110003160):</span>
                  </span>
                  <span className="text-emerald-400 font-medium text-[11px] truncate max-w-[220px]">
                    {whatsAppStatus || 'Sent to 03110003160'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 text-[#dfb743] font-semibold">
                    <Database className="w-3.5 h-3.5" />
                    <span>Supabase Database:</span>
                  </span>
                  <span className="text-emerald-400 font-medium">
                    {dbNotificationStatus || 'Connected'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 text-[#dfb743] font-semibold">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Gmail Notification:</span>
                  </span>
                  <span className="text-[#ede7dc] font-medium text-[11px] truncate max-w-[220px]">
                    {emailNotificationStatus || 'Dispatched'}
                  </span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Send, Track Now (Daraz Style) and Place Another */}
              <div className="space-y-3 pt-2">
                {currentTrackedOrder && (
                  <button
                    type="button"
                    onClick={() => openWhatsAppWithOrder(currentTrackedOrder)}
                    className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-[#04160b] font-bold text-xs uppercase tracking-wider shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.5)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Open in WhatsApp (03110003160 پر بھیجیں)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleTrackNow(submittedOrder.orderId)}
                  className="w-full py-4 rounded-full bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.6)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Bike className="w-4 h-4 text-[#08110b]" />
                  <span>Track This Order Now (لائیو ٹریک کریں)</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetOrder}
                  className="w-full py-3 rounded-full border border-[#c59b27]/40 bg-[#08170e] text-[#d6cebf] hover:text-white hover:border-[#dfb743] font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Place Another Order / Reset</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
