import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Flame,
  Bike,
  PackageCheck,
  Receipt,
  Sparkles,
  ArrowRight,
  RefreshCw,
  UtensilsCrossed
} from 'lucide-react';
import {
  TRACKING_STAGES,
  findOrderByNumber,
  updateOrderStatusStage,
  getStoredOrders,
  type TrackedOrder
} from '../data/orderTracker';
import { formatPKR } from '../data/menuData';
import { fetchOrderFromSupabase } from '../lib/supabase';

const iconMap = {
  ReceiptCheck: Receipt,
  Flame: Flame,
  PackageCheck: PackageCheck,
  Bike: Bike,
  CheckCircle2: CheckCircle2,
};

export const TrackOrderSection: React.FC = () => {
  const [searchOrderId, setSearchOrderId] = useState('');
  const [currentOrder, setCurrentOrder] = useState<TrackedOrder | null>(null);
  const [searchError, setSearchError] = useState('');
  const [recentOrders, setRecentOrders] = useState<TrackedOrder[]>([]);

  // Load recent orders on mount
  useEffect(() => {
    const list = getStoredOrders();
    setRecentOrders(list);
    // Auto-select first demo order if available
    if (list.length > 0) {
      setCurrentOrder(list[0]);
      setSearchOrderId(list[0].orderId);
    }

    // Listen for custom event when user clicks "Track This Order" from the order confirmation modal
    const handleCustomTrackEvent = (e: CustomEvent<{ orderId: string }>) => {
      if (e.detail && e.detail.orderId) {
        setSearchOrderId(e.detail.orderId);
        const found = findOrderByNumber(e.detail.orderId);
        if (found) {
          setCurrentOrder(found);
          setSearchError('');
        }
      }
    };

    window.addEventListener('track-order-event' as any, handleCustomTrackEvent);
    return () => {
      window.removeEventListener('track-order-event' as any, handleCustomTrackEvent);
    };
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchError('');

    if (!searchOrderId.trim()) {
      setSearchError('Please enter a valid Order Number (e.g., RB-8520)');
      return;
    }

    // 1. Check local storage
    const localFound = findOrderByNumber(searchOrderId.trim());
    if (localFound) {
      setCurrentOrder(localFound);
      setSearchError('');
      return;
    }

    // 2. Check Supabase Database
    const supabaseFound = await fetchOrderFromSupabase(searchOrderId.trim());
    if (supabaseFound) {
      setCurrentOrder(supabaseFound);
      setSearchError('');
      return;
    }

    setSearchError(`No order found matching "${searchOrderId}". Please check your order ID or try a sample order below.`);
    setCurrentOrder(null);
  };

  const handleSelectRecent = (order: TrackedOrder) => {
    setSearchOrderId(order.orderId);
    setCurrentOrder(order);
    setSearchError('');
  };

  // Simulation handler to advance stage for demo testing
  const handleAdvanceStage = () => {
    if (!currentOrder) return;
    const nextStage = (currentOrder.currentStageIndex + 1) % TRACKING_STAGES.length;
    const updated = updateOrderStatusStage(currentOrder.orderId, nextStage);
    if (updated) {
      setCurrentOrder({ ...updated });
      setRecentOrders(getStoredOrders());
    }
  };

  return (
    <section id="track-order" className="relative py-24 sm:py-32 bg-[#050f08] overflow-hidden">
      {/* Decorative ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#c59b27]/30 to-transparent" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#0c2f1f]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60 mb-4"
          >
            <Bike className="w-3.5 h-3.5 text-[#dfb743]" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
              Live Order Tracker (Daraz Style)
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-bold text-[#faf6eb] mb-4"
          >
            Track Your Royal Order
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#bfb7a6]"
          >
            Enter your unique order number to check real-time kitchen progress, cooking status, packing, and rider arrival time.
          </motion.p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex gap-2 p-2 rounded-2xl bg-[#091a11]/90 border border-[#c59b27]/40 shadow-2xl backdrop-blur-md">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-[#c59b27] absolute left-4" />
              <input
                type="text"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g. RB-8520, RB-4190)"
                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[#faf6eb] placeholder-[#7d7667] text-sm sm:text-base focus:outline-none uppercase tracking-wider font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 sm:px-8 py-3.5 rounded-xl bg-gold-gradient text-[#08110b] font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0 flex items-center space-x-1.5"
            >
              <span>Track Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Error Message */}
          {searchError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs sm:text-sm text-rose-400 text-center"
            >
              {searchError}
            </motion.p>
          )}

          {/* Quick Click Demo Order Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#a29b8c]">
            <span className="text-[#c59b27] font-medium">Quick Sample Orders:</span>
            {recentOrders.slice(0, 4).map((item) => (
              <button
                key={item.orderId}
                onClick={() => handleSelectRecent(item)}
                className={`px-3 py-1 rounded-full border transition-all cursor-pointer font-mono ${
                  currentOrder?.orderId === item.orderId
                    ? 'bg-[#153424] border-[#dfb743] text-[#dfb743] font-bold'
                    : 'bg-[#08150d] border-[#c59b27]/30 text-[#ccc5b6] hover:border-[#dfb743]/60'
                }`}
              >
                {item.orderId} ({TRACKING_STAGES[item.currentStageIndex].title})
              </button>
            ))}
          </div>
        </div>

        {/* Live Order Status Display */}
        <AnimatePresence mode="wait">
          {currentOrder && (
            <motion.div
              key={currentOrder.orderId}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-[#091b12]/85 border-2 border-[#c59b27]/35 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-md space-y-10"
            >
              {/* Order Status Header Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#c59b27]/20 gap-4">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-xs uppercase tracking-widest text-[#c59b27] font-bold">
                      Order Reference:
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#07140c] border border-[#c59b27]/40 text-[#dfb743] font-mono text-sm sm:text-base font-bold">
                      {currentOrder.orderId}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf6eb]">
                    {TRACKING_STAGES[currentOrder.currentStageIndex].title}
                  </h3>
                  <p className="text-sm text-[#dfb743] font-medium mt-0.5">
                    {TRACKING_STAGES[currentOrder.currentStageIndex].urduTitle}
                  </p>
                </div>

                {/* Estimated Arrival Countdown */}
                <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center p-3 sm:p-0 rounded-xl bg-[#06140b] sm:bg-transparent border sm:border-0 border-[#c59b27]/20">
                  <span className="text-xs text-[#a29b8c] flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#dfb743]" />
                    <span>Estimated Arrival:</span>
                  </span>
                  <span className="font-royal-brand text-xl sm:text-2xl font-bold text-gold-gradient">
                    {currentOrder.estimatedArrivalMinutes > 0
                      ? `${currentOrder.estimatedArrivalMinutes} Mins`
                      : 'Arrived!'}
                  </span>
                </div>
              </div>

              {/* Daraz-Style Stepper / Progress Timeline */}
              <div className="py-2">
                {/* Horizontal Progress Bar for Desktop */}
                <div className="relative mb-8 hidden md:block">
                  <div className="h-1.5 w-full bg-[#0d2719] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gold-gradient rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(currentOrder.currentStageIndex / (TRACKING_STAGES.length - 1)) * 100}%`,
                      }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Stage Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-4 relative">
                  {TRACKING_STAGES.map((step, idx) => {
                    const isCompleted = idx < currentOrder.currentStageIndex;
                    const isCurrent = idx === currentOrder.currentStageIndex;
                    const IconComponent = iconMap[step.icon as keyof typeof iconMap] || UtensilsCrossed;

                    return (
                      <div
                        key={step.stage}
                        className={`flex md:flex-col items-center md:items-center text-left md:text-center p-3.5 md:p-2 rounded-2xl md:rounded-none transition-all ${
                          isCurrent
                            ? 'bg-[#102d1d]/90 md:bg-transparent border border-[#dfb743]/50 md:border-0 shadow-lg'
                            : 'opacity-85'
                        }`}
                      >
                        {/* Step Icon Circle */}
                        <div
                          className={`relative w-12 h-12 rounded-full flex items-center justify-center shrink-0 md:mb-3 transition-all ${
                            isCompleted
                              ? 'bg-[#15402a] text-[#dfb743] border-2 border-[#dfb743]'
                              : isCurrent
                              ? 'bg-gold-gradient text-[#08110b] font-bold shadow-[0_0_20px_rgba(212,175,55,0.6)] scale-110'
                              : 'bg-[#0a1f14] text-[#6d675b] border border-[#c59b27]/20'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          {isCurrent && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping" />
                          )}
                        </div>

                        {/* Step Information */}
                        <div className="ml-4 md:ml-0 md:space-y-1">
                          <div
                            className={`text-xs font-bold uppercase tracking-wider ${
                              isCurrent
                                ? 'text-gold-gradient'
                                : isCompleted
                                ? 'text-[#e5dfd1]'
                                : 'text-[#7d7768]'
                            }`}
                          >
                            {step.title}
                          </div>
                          <div className="text-[11px] text-[#c59b27]/80 font-medium hidden md:block">
                            {step.urduTitle}
                          </div>
                          <div className="text-[10px] text-[#918979] leading-tight hidden md:block mt-1">
                            {step.description}
                          </div>
                          {isCurrent && (
                            <span className="inline-block md:hidden text-[10px] bg-[#07180e] px-2 py-0.5 rounded text-[#dfb743] mt-1 font-semibold">
                              Current Status: {step.urduTitle}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rider & Delivery Location Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#c59b27]/20">
                {/* Rider Info Card */}
                <div className="p-4 rounded-2xl bg-[#06140b] border border-[#c59b27]/25 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#112d1e] border border-[#c59b27]/40 flex items-center justify-center shrink-0">
                    <Bike className="w-6 h-6 text-[#dfb743]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#a29b8c] block">
                      Assigned Royal Rider
                    </span>
                    <h4 className="text-sm font-bold text-[#faf6eb] truncate">
                      {currentOrder.riderName}
                    </h4>
                    <div className="text-xs text-[#dfb743] flex items-center space-x-1 mt-0.5">
                      <Phone className="w-3 h-3" />
                      <span>{currentOrder.riderPhone}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-[#0c2417] px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Active
                  </span>
                </div>

                {/* Delivery Destination */}
                <div className="p-4 rounded-2xl bg-[#06140b] border border-[#c59b27]/25 flex items-start space-x-3 text-xs">
                  <MapPin className="w-4 h-4 text-[#dfb743] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#a29b8c] block">
                      Deliver To: {currentOrder.customerName} ({currentOrder.phone})
                    </span>
                    <p className="text-[#faf6eb] font-medium mt-0.5 line-clamp-2">
                      {currentOrder.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items Breakdown */}
              <div className="p-5 rounded-2xl bg-[#06130b] border border-[#c59b27]/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#d6cebe]">
                  <span>Dishes in this Order:</span>
                  <span>Amount: {formatPKR(currentOrder.total)}</span>
                </div>
                <div className="space-y-1.5">
                  {currentOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-[#0a1d12]/70 border border-white/5"
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

              {/* Interactive Demo Simulation Controls */}
              <div className="p-4 rounded-2xl bg-[#0c2617]/70 border border-[#dfb743]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs text-[#ccc5b6] text-center sm:text-left">
                  <Sparkles className="w-4 h-4 text-[#dfb743] shrink-0" />
                  <span>
                    <strong>Daraz Live Tracker Demo:</strong> Click the button to advance this order to the next stage and see real-time status updates!
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAdvanceStage}
                  className="px-5 py-2.5 rounded-full bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0 flex items-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Simulate Next Stage ({TRACKING_STAGES[(currentOrder.currentStageIndex + 1) % TRACKING_STAGES.length].title})</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
