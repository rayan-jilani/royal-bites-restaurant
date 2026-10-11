import React, { useState, useEffect } from 'react';
import {
  Flame,
  Bike,
  PackageCheck,
  CheckCircle2,
  Trash2,
  Phone,
  MapPin,
  Sparkles,
  Mail,
  Save,
  Send,
  RefreshCw,
  ShoppingBag,
  MessageCircle
} from 'lucide-react';
import {
  getStoredOrders,
  updateOrderStatusStage,
  TRACKING_STAGES,
  type TrackedOrder
} from '../data/orderTracker';
import { formatPKR } from '../data/menuData';
import { getOwnerGmail, setOwnerGmail, sendOrderDirectToGmail } from '../lib/automaticEmail';
import { openWhatsAppWithOrder } from '../lib/whatsappService';

export const AdminPage: React.FC = () => {
  const [orders, setOrders] = useState<TrackedOrder[]>([]);
  const [ownerGmail, setOwnerGmailState] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  const [testEmailStatus, setTestEmailStatus] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
    setOwnerGmailState(getOwnerGmail());
  }, []);

  const loadOrders = () => {
    setIsRefreshing(true);
    const list = getStoredOrders();
    setOrders(list);
    setTimeout(() => setIsRefreshing(false), 300);
  };

  const handleSaveGmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerGmail.trim()) return;
    setOwnerGmail(ownerGmail);
    setSaveSuccessMessage('Gmail address saved successfully! All new orders will go here.');
    setTimeout(() => setSaveSuccessMessage(''), 3500);
  };

  const handleSendTestEmail = async () => {
    if (!ownerGmail.trim()) return;
    setTestEmailStatus('Sending test order to your Gmail...');
    const sampleOrder = orders[0] || {
      orderId: 'RB-TEST-01',
      customerName: 'Test Customer',
      phone: '0311 0003160',
      address: 'Main Alamgir Road, Bahadurabad, Karachi',
      items: [{ name: 'Chicken Karahi', quantity: 1, unitPrice: 1850, lineTotal: 1850 }],
      subtotal: 1850,
      deliveryFee: 150,
      total: 2000,
      createdAt: new Date().toLocaleTimeString(),
      currentStageIndex: 1,
      riderName: 'Farhan Ali',
      riderPhone: '+92 300 4567890',
      estimatedArrivalMinutes: 30,
    };

    const res = await sendOrderDirectToGmail(sampleOrder);
    setTestEmailStatus(res.message);
    setTimeout(() => setTestEmailStatus(''), 5000);
  };

  const handleStageChange = (orderId: string, newStageIndex: number) => {
    const updated = updateOrderStatusStage(orderId, newStageIndex);
    if (updated) {
      loadOrders();
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    const list = orders.filter((o) => o.orderId !== orderId);
    setOrders(list);
    try {
      localStorage.setItem('royal_bites_orders_v1', JSON.stringify(list));
    } catch {
      // ignore
    }
  };

  // Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter((o) => o.currentStageIndex < 4);
  const deliveredOrders = orders.filter((o) => o.currentStageIndex === 4);

  const filteredOrders = filterStage === 'all'
    ? orders
    : orders.filter((o) => {
        if (filterStage === 'active') return o.currentStageIndex < 4;
        if (filterStage === 'delivered') return o.currentStageIndex === 4;
        return true;
      });

  return (
    <div className="pt-28 pb-24 bg-[#050e07] min-h-screen text-[#ede7dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#c59b27]/25 mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60 mb-2">
              <Sparkles className="w-3 h-3 text-[#dfb743]" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-gradient font-bold">
                Restaurant Owner Portal
              </span>
            </div>
            <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#faf6eb]">
              Live Orders & Kitchen Management Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#a29b8c] mt-1">
              Real-time database of all customer orders, kitchen status controls, and Gmail dispatch settings.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadOrders}
              disabled={isRefreshing}
              className="px-4 py-2.5 rounded-full border border-[#c59b27]/40 bg-[#0a1e13] text-xs font-semibold text-[#dfb743] hover:bg-[#123624] transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Orders</span>
            </button>
          </div>
        </div>

        {/* Top Section: Quick Gmail Dispatch Settings */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#081a10] border-2 border-[#dfb743]/50 shadow-2xl mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#faf6eb] flex items-center space-x-2.5">
                <Mail className="w-5 h-5 text-[#dfb743]" />
                <span>Automatic Gmail Order Delivery</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#b5ae9f]">
                No complex signups or API keys needed. Enter your Gmail address below, and all future customer orders will be delivered straight to your inbox with full order details.
              </p>
            </div>

            <div className="flex-1 max-w-lg">
              <form onSubmit={handleSaveGmail} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={ownerGmail}
                  onChange={(e) => setOwnerGmailState(e.target.value)}
                  placeholder="e.g. your-name@gmail.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#040c06] border border-[#c59b27]/30 text-[#faf6eb] text-sm focus:outline-none focus:border-[#dfb743]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer flex items-center justify-center space-x-1.5 shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Gmail</span>
                </button>
              </form>

              <div className="flex items-center justify-between mt-2.5">
                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  className="text-xs text-[#dfb743] hover:text-white transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Test Email to this Gmail now</span>
                </button>

                {saveSuccessMessage && (
                  <span className="text-xs text-emerald-400 font-semibold">{saveSuccessMessage}</span>
                )}
                {testEmailStatus && (
                  <span className="text-xs text-amber-300 font-medium">{testEmailStatus}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#08180f] border border-[#c59b27]/25 shadow-lg">
            <span className="text-xs text-[#8c8575] uppercase tracking-wider block font-semibold">Total Revenue</span>
            <div className="font-royal-brand text-2xl sm:text-3xl font-bold text-gold-gradient mt-1">
              {formatPKR(totalRevenue)}
            </div>
            <span className="text-[10px] text-[#a29b8c] mt-1 block">From all customer orders</span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#08180f] border border-[#c59b27]/25 shadow-lg">
            <span className="text-xs text-[#8c8575] uppercase tracking-wider block font-semibold">Total Orders</span>
            <div className="font-royal-brand text-2xl sm:text-3xl font-bold text-[#faf6eb] mt-1">
              {orders.length}
            </div>
            <span className="text-[10px] text-[#a29b8c] mt-1 block">In database history</span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#08180f] border border-[#c59b27]/25 shadow-lg">
            <span className="text-xs text-[#8c8575] uppercase tracking-wider block font-semibold">Active in Kitchen</span>
            <div className="font-royal-brand text-2xl sm:text-3xl font-bold text-[#ffb84d] mt-1">
              {activeOrders.length}
            </div>
            <span className="text-[10px] text-[#a29b8c] mt-1 block">Cooking / Out for delivery</span>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#08180f] border border-[#c59b27]/25 shadow-lg">
            <span className="text-xs text-[#8c8575] uppercase tracking-wider block font-semibold">Delivered</span>
            <div className="font-royal-brand text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">
              {deliveredOrders.length}
            </div>
            <span className="text-[10px] text-[#a29b8c] mt-1 block">Completed orders</span>
          </div>
        </div>

        {/* Orders Feed Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilterStage('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                filterStage === 'all'
                  ? 'bg-gold-gradient text-[#08110b]'
                  : 'bg-[#091f13] text-[#c2baa9] border border-[#c59b27]/20'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setFilterStage('active')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                filterStage === 'active'
                  ? 'bg-gold-gradient text-[#08110b]'
                  : 'bg-[#091f13] text-[#c2baa9] border border-[#c59b27]/20'
              }`}
            >
              Active ({activeOrders.length})
            </button>
            <button
              onClick={() => setFilterStage('delivered')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                filterStage === 'delivered'
                  ? 'bg-gold-gradient text-[#08110b]'
                  : 'bg-[#091f13] text-[#c2baa9] border border-[#c59b27]/20'
              }`}
            >
              Delivered ({deliveredOrders.length})
            </button>
          </div>

          <span className="text-xs text-[#a29b8c]">
            Clicking a status below updates the customer's live tracking view instantly.
          </span>
        </div>

        {/* Orders List Cards */}
        {filteredOrders.length === 0 ? (
          <div className="p-16 rounded-3xl bg-[#07150c] border border-[#c59b27]/20 text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-[#7d7566] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#faf6eb]">No Orders Found</h3>
            <p className="text-xs text-[#9d9483]">
              Place a test order from the website or clear filters to see your orders.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const currentStep = TRACKING_STAGES[order.currentStageIndex];

              return (
                <div
                  key={order.orderId}
                  className="p-6 sm:p-8 rounded-3xl bg-[#07160d] border border-[#c59b27]/30 shadow-xl space-y-6"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#c59b27]/15 gap-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-lg sm:text-xl text-[#dfb743]">
                        {order.orderId}
                      </span>
                      <span className="text-xs text-[#8c8577]">
                        Placed at {order.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => openWhatsAppWithOrder(order)}
                        className="px-3 py-1 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-[#06180f] text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
                        title="Send / View order in WhatsApp (03110003160)"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp (03110003160)</span>
                      </button>

                      <span
                        className={`text-xs px-3.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                          order.currentStageIndex === 4
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : order.currentStageIndex === 3
                            ? 'bg-purple-950 text-purple-300 border border-purple-500/30'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {currentStep.title} ({currentStep.urduTitle})
                      </span>

                      <button
                        onClick={() => handleDeleteOrder(order.orderId)}
                        className="p-1.5 rounded-lg text-[#7c7566] hover:text-rose-400 hover:bg-[#122b1e] transition-colors cursor-pointer"
                        title="Delete order record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Customer & Location & Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Customer & Address Details */}
                    <div className="md:col-span-5 space-y-2.5 text-xs text-[#ded8cb]">
                      <div className="text-sm font-bold text-[#faf6eb]">
                        {order.customerName}
                      </div>
                      <div className="flex items-center space-x-2 text-[#dfb743]">
                        <Phone className="w-3.5 h-3.5" />
                        <a href={`tel:${order.phone}`} className="hover:underline font-mono">
                          {order.phone}
                        </a>
                      </div>
                      <div className="flex items-start space-x-2 text-[#a29b8c]">
                        <MapPin className="w-3.5 h-3.5 text-[#dfb743] shrink-0 mt-0.5" />
                        <span>{order.address}</span>
                      </div>
                      {order.specialInstructions && (
                        <div className="p-2.5 rounded-lg bg-[#040e07] border border-[#c59b27]/15 text-[#dfb743] italic">
                          Special Note: "{order.specialInstructions}"
                        </div>
                      )}
                    </div>

                    {/* Ordered Dishes List */}
                    <div className="md:col-span-7 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#8e8779]">
                        Dishes Ordered:
                      </div>
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {order.items.map((it, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-[#051108] border border-white/5"
                          >
                            <span className="text-[#faf6eb]">
                              {it.quantity}x {it.name}
                            </span>
                            <span className="font-semibold text-gold-gradient">
                              {formatPKR(it.lineTotal)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-[#c59b27]/15 text-xs">
                        <span className="text-[#a29b8c]">Grand Total (PKR):</span>
                        <span className="font-royal-brand text-lg font-bold text-gold-gradient">
                          {formatPKR(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Kitchen Stage Management Controls */}
                  <div className="pt-4 border-t border-[#c59b27]/15 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-[#c59b27]">
                      Update Kitchen Status:
                    </span>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleStageChange(order.orderId, 1)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1 ${
                          order.currentStageIndex === 1
                            ? 'bg-amber-600 text-white shadow-md'
                            : 'bg-[#0a2014] text-[#ccc4b5] hover:bg-[#122f1f] border border-[#c59b27]/25'
                        }`}
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>Cooking (کڑاہی میں پکائیں)</span>
                      </button>

                      <button
                        onClick={() => handleStageChange(order.orderId, 2)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1 ${
                          order.currentStageIndex === 2
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-[#0a2014] text-[#ccc4b5] hover:bg-[#122f1f] border border-[#c59b27]/25'
                        }`}
                      >
                        <PackageCheck className="w-3.5 h-3.5" />
                        <span>Packed & Ready (پیک کریں)</span>
                      </button>

                      <button
                        onClick={() => handleStageChange(order.orderId, 3)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1 ${
                          order.currentStageIndex === 3
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-[#0a2014] text-[#ccc4b5] hover:bg-[#122f1f] border border-[#c59b27]/25'
                        }`}
                      >
                        <Bike className="w-3.5 h-3.5" />
                        <span>With Rider (رائیڈر کے حوالے)</span>
                      </button>

                      <button
                        onClick={() => handleStageChange(order.orderId, 4)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1 ${
                          order.currentStageIndex === 4
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-[#0a2014] text-[#ccc4b5] hover:bg-[#122f1f] border border-[#c59b27]/25'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Delivered (مکمل ہو گیا)</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
