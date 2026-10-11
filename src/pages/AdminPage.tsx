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
  Save,
  Send,
  RefreshCw,
  ShoppingBag,
  MessageCircle,
  Lock,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Clock,
  KeyRound,
  Shield,
  Search,
  User,
  UtensilsCrossed
} from 'lucide-react';
import {
  getStoredOrders,
  updateOrderStatusStage,
  TRACKING_STAGES,
  type TrackedOrder
} from '../data/orderTracker';
import { formatPKR } from '../data/menuData';
import { sendOrderDirectToGmail } from '../lib/automaticEmail';
import { openWhatsAppWithOrder } from '../lib/whatsappService';
import {
  getOwnerCredentials,
  updateOwnerCredentials,
  verifyOwnerLogin
} from '../lib/ownerAuth';

export const AdminPage: React.FC = () => {
  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authTab, setAuthTab] = useState<'login' | 'setup'>('login');
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  // Setup / Change Password States
  const [setupEmail, setSetupEmail] = useState<string>('');
  const [setupPassword, setSetupPassword] = useState<string>('');
  const [setupConfirmPassword, setSetupConfirmPassword] = useState<string>('');
  const [showSetupPassword, setShowSetupPassword] = useState<boolean>(false);
  const [setupSuccessMessage, setSetupSuccessMessage] = useState<string>('');
  const [setupErrorMessage, setSetupErrorMessage] = useState<string>('');

  // Dashboard Data States
  const [orders, setOrders] = useState<TrackedOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Settings Panel States
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [ownerGmailState, setOwnerGmailState] = useState<string>('');
  const [ownerPasswordState, setOwnerPasswordState] = useState<string>('');
  const [showSettingsPassword, setShowSettingsPassword] = useState<boolean>(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string>('');
  const [testEmailStatus, setTestEmailStatus] = useState<string>('');

  useEffect(() => {
    const authSession = sessionStorage.getItem('royal_bites_admin_auth');
    const creds = getOwnerCredentials();
    setOwnerGmailState(creds.email);
    setOwnerPasswordState(creds.password);
    setSetupEmail(creds.email);

    if (authSession === 'true') {
      setIsAuthenticated(true);
      loadOrders();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (verifyOwnerLogin(loginEmail, loginPassword)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('royal_bites_admin_auth', 'true');
      setLoginError('');
      loadOrders();
      const creds = getOwnerCredentials();
      setOwnerGmailState(creds.email);
      setOwnerPasswordState(creds.password);
    } else {
      setLoginError('رسائی مسترد! (Access Denied) غلط ای میل یا پاس ورڈ۔ صرف ریستوراں کے اصل اونر کو رسائی کی اجازت ہے۔');
    }
  };

  const handleSetupCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setSetupErrorMessage('');
    setSetupSuccessMessage('');

    if (!setupEmail.trim()) {
      setSetupErrorMessage('Barahe karam apna Gmail address enter karein.');
      return;
    }
    if (!setupPassword.trim() || setupPassword.length < 4) {
      setSetupErrorMessage('Password kam az kam 4 characters ka hona chahiye.');
      return;
    }
    if (setupPassword !== setupConfirmPassword) {
      setSetupErrorMessage('Dono passwords aapas me match nahi kar rahe.');
      return;
    }

    updateOwnerCredentials(setupEmail, setupPassword);
    setOwnerGmailState(setupEmail);
    setOwnerPasswordState(setupPassword);
    setSetupSuccessMessage('Zabardast! Aapka Owner Gmail aur Password kamyabi se set ho gaya hai. Ab aap usi se login kar sakte hain.');
    
    // Auto fill login fields
    setLoginEmail(setupEmail);
    setLoginPassword(setupPassword);

    setTimeout(() => {
      setAuthTab('login');
      setSetupSuccessMessage('');
    }, 2500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('royal_bites_admin_auth');
    setLoginPassword('');
    setLoginEmail('');
  };

  const loadOrders = () => {
    setIsRefreshing(true);
    const list = getStoredOrders();
    setOrders(list);
    setTimeout(() => setIsRefreshing(false), 300);
  };

  const handleSaveSettingsCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerGmailState.trim() || !ownerPasswordState.trim()) return;
    updateOwnerCredentials(ownerGmailState, ownerPasswordState);
    setSaveSuccessMessage('کامیابی! آپ کا نیا لاگ ان ای میل اور پاس ورڈ محفوظ ہو گیا ہے۔ آئندہ صرف اسی سے پورٹل کھلے گا۔');
    setTimeout(() => setSaveSuccessMessage(''), 4500);
  };

  const handleSendTestEmail = async () => {
    if (!ownerGmailState.trim()) return;
    setTestEmailStatus('Sending test order receipt to your Gmail...');
    const sampleOrder = orders[0] || {
      orderId: 'RB-TEST-01',
      customerName: 'Test Customer (Rayan)',
      phone: '0311 0003160',
      address: 'Main Alamgir Road, Bahadurabad, Karachi',
      items: [{ name: 'Chicken Karahi Full', quantity: 1, unitPrice: 1850, lineTotal: 1850 }],
      subtotal: 1850,
      deliveryFee: 150,
      total: 2000,
      createdAt: new Date().toLocaleTimeString(),
      currentStageIndex: 1,
      riderName: 'Kamran Khan',
      riderPhone: '+92 321 9876543',
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
    if (!window.confirm(`Are you sure you want to delete order ${orderId}?`)) return;
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

  // Filtered Orders by Stage & Search query
  const filteredOrders = orders.filter((order) => {
    // Stage Filter
    if (filterStage === 'received' && order.currentStageIndex !== 0) return false;
    if (filterStage === 'cooking' && order.currentStageIndex !== 1) return false;
    if (filterStage === 'packed' && order.currentStageIndex !== 2) return false;
    if (filterStage === 'delivery' && order.currentStageIndex !== 3) return false;
    if (filterStage === 'delivered' && order.currentStageIndex !== 4) return false;

    // Search Query (Customer Name, Phone, Order ID, Address)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = order.customerName.toLowerCase().includes(q);
      const matchPhone = order.phone.toLowerCase().includes(q);
      const matchId = order.orderId.toLowerCase().includes(q);
      const matchAddr = order.address.toLowerCase().includes(q);
      return matchName || matchPhone || matchId || matchAddr;
    }

    return true;
  });

  // If Not Authenticated, show Login / Setup Screen
  if (!isAuthenticated) {
    return (
      <div className="pt-28 pb-20 bg-[#050e07] min-h-screen text-[#ede7dc] flex items-center justify-center px-4">
        <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#081b10] border-2 border-[#dfb743]/60 shadow-[0_20px_60px_rgba(0,0,0,0.95)] space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#0d2a1b] border border-[#dfb743] flex items-center justify-center mx-auto text-[#dfb743] shadow-lg">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="font-royal text-2xl sm:text-3xl font-black text-[#faf6eb]">
              ROYAL BITES — OWNER PORTAL
            </h2>
            <p className="text-xs text-[#a29b8c] max-w-sm mx-auto">
              Sirf restaurant ke original owner ke paas iska access hai. Yahan aap apna Gmail aur Password set kar sakte hain.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-[#040f08] border border-[#dfb743]/30 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setAuthTab('login'); setLoginError(''); }}
              className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                authTab === 'login'
                  ? 'bg-gradient-to-r from-[#dfb743] to-[#c59b27] text-black shadow-md'
                  : 'text-[#a29b8c] hover:text-[#dfb743]'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Owner Login (لاگ ان)</span>
            </button>

            <button
              type="button"
              onClick={() => { setAuthTab('setup'); setSetupErrorMessage(''); setSetupSuccessMessage(''); }}
              className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                authTab === 'setup'
                  ? 'bg-gradient-to-r from-[#dfb743] to-[#c59b27] text-black shadow-md'
                  : 'text-[#a29b8c] hover:text-[#dfb743]'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Set / Change Password</span>
            </button>
          </div>

          {/* TAB 1: LOGIN FORM */}
          {authTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#dfb743] mb-1.5">
                  Owner Gmail (آپ کا جی میل ایڈریس)
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#040e07] border border-[#c59b27]/40 text-[#faf6eb] text-sm focus:outline-none focus:border-[#dfb743]"
                  placeholder="Apna registered Gmail enter karein..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#dfb743] mb-1.5">
                  Owner Secret Password (خفیہ پاس ورڈ)
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#040e07] border border-[#c59b27]/40 text-[#faf6eb] text-sm focus:outline-none focus:border-[#dfb743] pr-10"
                    placeholder="Apna private password enter karein..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8e8777] hover:text-[#dfb743] cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs text-center font-semibold">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#dfb743] via-amber-400 to-[#c59b27] text-[#08110b] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Open Owner Portal (پورٹل کھولیں)</span>
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthTab('setup')}
                  className="text-xs text-[#dfb743] hover:underline cursor-pointer"
                >
                  Naya password banana hai ya bhool gaye hain? Click here to set password.
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SETUP / CHANGE PASSWORD FORM */}
          {authTab === 'setup' && (
            <form onSubmit={handleSetupCredentials} className="space-y-4">
              <div className="p-3 rounded-xl bg-[#0d2a1b]/60 border border-[#dfb743]/30 text-xs text-[#ded7c8]">
                💡 <strong>Instructions:</strong> Yahan aap jo bhi apna Gmail aur Password rakhenge, portal sirf aur sirf usi se open hoga. Ye credentials aapke device me securely save rahenge.
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#dfb743] mb-1">
                  Owner Gmail (جس پر آرڈرز بھی آئیں گے) *
                </label>
                <input
                  type="email"
                  required
                  value={setupEmail}
                  onChange={(e) => setSetupEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-[#c59b27]/40 text-[#faf6eb] text-sm focus:outline-none focus:border-[#dfb743]"
                  placeholder="e.g. rayanarif214@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#dfb743] mb-1">
                  Set Your Custom Password (آپ جو بھی پاس ورڈ رکھنا چاہیں) *
                </label>
                <div className="relative">
                  <input
                    type={showSetupPassword ? 'text' : 'password'}
                    required
                    value={setupPassword}
                    onChange={(e) => setSetupPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-[#c59b27]/40 text-[#faf6eb] text-sm focus:outline-none focus:border-[#dfb743] pr-10"
                    placeholder="Apna pasandeeda password likhein..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowSetupPassword(!showSetupPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8e8777] hover:text-[#dfb743] cursor-pointer"
                  >
                    {showSetupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#dfb743] mb-1">
                  Confirm Password (پاس ورڈ دوبارہ درج کریں) *
                </label>
                <input
                  type={showSetupPassword ? 'text' : 'password'}
                  required
                  value={setupConfirmPassword}
                  onChange={(e) => setSetupConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#040e07] border border-[#c59b27]/40 text-[#faf6eb] text-sm focus:outline-none focus:border-[#dfb743]"
                  placeholder="Dobaara wahi password likhein..."
                />
              </div>

              {setupErrorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs text-center font-semibold">
                  {setupErrorMessage}
                </div>
              )}

              {setupSuccessMessage && (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs text-center font-semibold">
                  {setupSuccessMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#dfb743] to-[#c59b27] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save My Password (پاس ورڈ محفوظ کریں)</span>
              </button>
            </form>
          )}

          <div className="p-3 rounded-xl bg-[#041107] border border-[#c59b27]/15 text-center">
            <span className="text-[11px] text-[#7d7566] flex items-center justify-center space-x-1">
              <Lock className="w-3 h-3 text-[#dfb743]" />
              <span>100% Private — Sirf aapke set kiye gaye credentials se login hoga.</span>
            </span>
          </div>

        </div>
      </div>
    );
  }

  // AUTHENTICATED: COMPLETE ADMIN DASHBOARD
  return (
    <div className="pt-24 pb-24 bg-[#040b06] min-h-screen text-[#ede7dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Navbar & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#dfb743]/20">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#dfb743]/40 bg-[#0d2a1b] mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb743]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#dfb743] font-bold">
                Restaurant Owner Control Center • Authenticated
              </span>
            </div>
            <h1 className="font-royal text-2xl sm:text-4xl font-black text-[#faf6eb]">
              LIVE ORDERS & KITCHEN DISPATCH
            </h1>
            <p className="text-xs sm:text-sm text-[#a29b8c] mt-0.5">
              Kiska order hai, kahan se aya hai, kya dishes hain, aur kab deliver hoga — sab kuch live monitor karein.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="px-4 py-2 rounded-xl border border-[#dfb743]/40 bg-[#0a2014] text-xs font-semibold text-[#dfb743] hover:bg-[#113522] transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{isSettingsOpen ? 'Close Settings' : 'Owner Settings / Password'}</span>
            </button>

            <button
              onClick={loadOrders}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-xl border border-[#dfb743]/40 bg-[#0a2014] text-xs font-semibold text-[#dfb743] hover:bg-[#113522] transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Orders</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-xs font-semibold text-rose-300 hover:bg-rose-900 transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
              title="Logout from Owner Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Collapsible Owner Settings Card */}
        {isSettingsOpen && (
          <div className="p-6 rounded-3xl bg-[#081a10] border-2 border-[#dfb743]/60 shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#dfb743]/20 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#dfb743]" />
                <h3 className="font-royal text-lg font-bold text-[#faf6eb]">
                  Owner Password & Gmail Settings (آپ کی پرائیویٹ سیٹنگز)
                </h3>
              </div>
              <span className="text-[11px] text-emerald-400 font-mono bg-black/50 px-2.5 py-1 rounded-full border border-emerald-500/30">
                ACTIVE ACCESS
              </span>
            </div>

            <form onSubmit={handleSaveSettingsCredentials} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#dfb743] mb-1">
                  Owner Gmail Address *
                </label>
                <input
                  type="email"
                  required
                  value={ownerGmailState}
                  onChange={(e) => setOwnerGmailState(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040e07] border border-[#c59b27]/30 text-white text-xs focus:outline-none focus:border-[#dfb743]"
                  placeholder="e.g. rayanarif214@gmail.com"
                />
                <span className="text-[10px] text-[#8e8779] mt-1 block">
                  Customer order place karega to isi email par notification aayegi.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#dfb743] mb-1">
                  Owner Password (خفیہ پاس ورڈ تبدیل کریں) *
                </label>
                <div className="relative">
                  <input
                    type={showSettingsPassword ? 'text' : 'password'}
                    required
                    value={ownerPasswordState}
                    onChange={(e) => setOwnerPasswordState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040e07] border border-[#c59b27]/30 text-white text-xs focus:outline-none focus:border-[#dfb743] pr-9"
                    placeholder="Naya secret password likhein..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowSettingsPassword(!showSettingsPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8e8777] hover:text-[#dfb743] cursor-pointer"
                  >
                    {showSettingsPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <span className="text-[10px] text-[#8e8779] mt-1 block">
                  Aap jo bhi password rakhenge sirf usi se portal khulega.
                </span>
              </div>

              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#dfb743] to-[#c59b27] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer flex items-center space-x-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Credentials (محفوظ کریں)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  className="text-xs text-[#dfb743] hover:text-white transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Test Order to this Gmail</span>
                </button>
              </div>
            </form>

            {(saveSuccessMessage || testEmailStatus) && (
              <div className="p-3 rounded-xl bg-[#041208] border border-[#dfb743]/30 text-xs text-center font-semibold">
                {saveSuccessMessage && <span className="text-emerald-400">{saveSuccessMessage}</span>}
                {testEmailStatus && <span className="text-amber-300 block">{testEmailStatus}</span>}
              </div>
            )}
          </div>
        )}

        {/* Live Metrics Grid (Total Revenue, Total Orders, Active Cooking, Delivered) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#07170e] border border-[#dfb743]/30 shadow-lg">
            <span className="text-[11px] text-[#8c8575] uppercase tracking-wider block font-semibold">
              💰 Total Sales Revenue
            </span>
            <div className="font-royal text-xl sm:text-3xl font-black text-[#dfb743] mt-1">
              {formatPKR(totalRevenue)}
            </div>
            <span className="text-[10px] text-[#a29b8c] mt-1 block">From all website orders</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#07170e] border border-[#dfb743]/30 shadow-lg">
            <span className="text-[11px] text-[#8c8575] uppercase tracking-wider block font-semibold">
              📦 Total Orders
            </span>
            <div className="font-royal text-xl sm:text-3xl font-black text-white mt-1">
              {orders.length} Orders
            </div>
            <span className="text-[10px] text-[#a29b8c] mt-1 block">Recorded in database</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#07170e] border border-amber-500/30 shadow-lg">
            <span className="text-[11px] text-amber-400 uppercase tracking-wider block font-semibold">
              🔥 Active in Kitchen
            </span>
            <div className="font-royal text-xl sm:text-3xl font-black text-amber-300 mt-1">
              {activeOrders.length} Orders
            </div>
            <span className="text-[10px] text-[#a29b8c] mt-1 block">Cooking or on delivery</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#07170e] border border-emerald-500/30 shadow-lg">
            <span className="text-[11px] text-emerald-400 uppercase tracking-wider block font-semibold">
              ✅ Successfully Delivered
            </span>
            <div className="font-royal text-xl sm:text-3xl font-black text-emerald-400 mt-1">
              {deliveredOrders.length} Orders
            </div>
            <span className="text-[10px] text-[#a29b8c] mt-1 block">Completed orders</span>
          </div>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#07170e] border border-[#dfb743]/30 shadow-lg space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#dfb743] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Customer Name, Phone, Address, or Order ID..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#030905] border border-[#dfb743]/30 text-white text-xs focus:outline-none focus:border-[#dfb743]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8e8779] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Status Filters */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setFilterStage('all')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                  filterStage === 'all'
                    ? 'bg-[#dfb743] text-black shadow-md'
                    : 'bg-black/50 text-[#c2baa9] border border-white/10 hover:border-[#dfb743]'
                }`}
              >
                All ({orders.length})
              </button>

              <button
                onClick={() => setFilterStage('received')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all flex items-center space-x-1 ${
                  filterStage === 'received'
                    ? 'bg-sky-500 text-black shadow-md'
                    : 'bg-black/50 text-sky-300 border border-sky-500/30'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>New ({orders.filter(o => o.currentStageIndex === 0).length})</span>
              </button>

              <button
                onClick={() => setFilterStage('cooking')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all flex items-center space-x-1 ${
                  filterStage === 'cooking'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-black/50 text-amber-300 border border-amber-500/30'
                }`}
              >
                <Flame className="w-3 h-3" />
                <span>Cooking ({orders.filter(o => o.currentStageIndex === 1).length})</span>
              </button>

              <button
                onClick={() => setFilterStage('packed')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all flex items-center space-x-1 ${
                  filterStage === 'packed'
                    ? 'bg-blue-500 text-black shadow-md'
                    : 'bg-black/50 text-blue-300 border border-blue-500/30'
                }`}
              >
                <PackageCheck className="w-3 h-3" />
                <span>Packed ({orders.filter(o => o.currentStageIndex === 2).length})</span>
              </button>

              <button
                onClick={() => setFilterStage('delivery')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all flex items-center space-x-1 ${
                  filterStage === 'delivery'
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-black/50 text-purple-300 border border-purple-500/30'
                }`}
              >
                <Bike className="w-3 h-3" />
                <span>Rider ({orders.filter(o => o.currentStageIndex === 3).length})</span>
              </button>

              <button
                onClick={() => setFilterStage('delivered')}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all flex items-center space-x-1 ${
                  filterStage === 'delivered'
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'bg-black/50 text-emerald-300 border border-emerald-500/30'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Delivered ({orders.filter(o => o.currentStageIndex === 4).length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* ORDERS LIST (Showing KISKA order hai, KAHAN se aya hai, KYA mangwaya hai, KAB deliver hoga) */}
        {filteredOrders.length === 0 ? (
          <div className="p-16 rounded-3xl bg-[#07160d] border border-[#dfb743]/20 text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-[#7d7566] mx-auto" />
            <h3 className="font-royal text-xl font-bold text-[#faf6eb]">No Orders Matching Search</h3>
            <p className="text-xs text-[#9d9483]">
              Koi order match nahi hua. Search clear karein ya website se naya order place karein.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const currentStep = TRACKING_STAGES[order.currentStageIndex] || TRACKING_STAGES[0];

              return (
                <div
                  key={order.orderId}
                  className="p-5 sm:p-7 rounded-3xl bg-[#06170d] border-2 border-[#dfb743]/40 shadow-2xl space-y-6 hover:border-[#dfb743] transition-all"
                >
                  
                  {/* Card Header: Order ID, Time & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#dfb743]/20 gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono font-black text-xl text-[#dfb743] bg-black/60 px-3 py-1 rounded-xl border border-[#dfb743]/40">
                        {order.orderId}
                      </span>
                      <div className="text-xs text-[#a29b8c] flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-[#dfb743]" />
                        <span>Order Time: <strong className="text-white">{order.createdAt}</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* WhatsApp Customer Button */}
                      <button
                        onClick={() => openWhatsAppWithOrder(order)}
                        className="px-3 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-[#06180f] text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
                        title="Send / View order in WhatsApp (03110003160)"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Customer WhatsApp</span>
                      </button>

                      {/* Current Stage Badge */}
                      <span
                        className={`text-xs px-3.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                          order.currentStageIndex === 4
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                            : order.currentStageIndex === 3
                            ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                            : order.currentStageIndex === 2
                            ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                            : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {currentStep.title} ({currentStep.urduTitle})
                      </span>

                      {/* Delete Order Button */}
                      <button
                        onClick={() => handleDeleteOrder(order.orderId)}
                        className="p-1.5 rounded-lg text-[#7c7566] hover:text-rose-400 hover:bg-[#122b1e] transition-colors cursor-pointer"
                        title="Delete order record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 3-Column Detailed Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* COL 1 (4 Cols): KISKA ORDER HAI & KAHAN SE AYA HAI */}
                    <div className="md:col-span-4 space-y-3 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#dfb743] flex items-center space-x-1">
                        <User className="w-3.5 h-3.5" />
                        <span>CUSTOMER & LOCATION (کس کا اور کہاں سے)</span>
                      </div>

                      {/* Customer Name */}
                      <div>
                        <span className="text-[10px] text-[#8e8779] block">Customer Name:</span>
                        <span className="text-sm font-bold text-white block">{order.customerName}</span>
                      </div>

                      {/* Customer Phone */}
                      <div>
                        <span className="text-[10px] text-[#8e8779] block">Phone Number:</span>
                        <div className="flex items-center space-x-2 pt-0.5">
                          <a
                            href={`tel:${order.phone}`}
                            className="font-mono font-bold text-[#dfb743] hover:underline flex items-center space-x-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{order.phone}</span>
                          </a>
                          <a
                            href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-400 text-[10px] hover:bg-emerald-600 hover:text-white"
                          >
                            Chat
                          </a>
                        </div>
                      </div>

                      {/* Delivery Address (Kahan Deliver Hoga) */}
                      <div>
                        <span className="text-[10px] text-[#8e8779] block">Complete Delivery Address:</span>
                        <div className="flex items-start space-x-1.5 text-white mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#dfb743] shrink-0 mt-0.5" />
                          <span className="leading-snug">{order.address}</span>
                        </div>
                      </div>

                      {/* Special Cooking Notes */}
                      {order.specialInstructions && (
                        <div className="p-2.5 rounded-xl bg-[#091e12] border border-[#dfb743]/30 text-[11px] text-[#dfb743]">
                          <strong>Special Request:</strong> "{order.specialInstructions}"
                        </div>
                      )}
                    </div>

                    {/* COL 2 (4 Cols): KYA MANGWAYA HAI (DISHES & BILLING) */}
                    <div className="md:col-span-4 space-y-3 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#dfb743] flex items-center space-x-1">
                        <UtensilsCrossed className="w-3.5 h-3.5" />
                        <span>ORDERED ITEMS (کیا کھانا آرڈر کیا)</span>
                      </div>

                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {order.items.map((it, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-[#051108] border border-white/5"
                          >
                            <span className="text-white font-medium">
                              {it.quantity}x {it.name}
                            </span>
                            <span className="font-semibold text-[#dfb743]">
                              {formatPKR(it.lineTotal)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Billing Breakdown */}
                      <div className="pt-2 border-t border-white/10 space-y-1 text-[11px] text-[#a29b8c]">
                        <div className="flex justify-between">
                          <span>Food Subtotal:</span>
                          <span className="text-white">{formatPKR(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee (Karachi):</span>
                          <span className="text-white">{formatPKR(order.deliveryFee)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-[#dfb743]/20 font-bold text-xs text-white">
                          <span>Grand Total (PKR):</span>
                          <span className="font-royal text-base text-[#dfb743]">
                            {formatPKR(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* COL 3 (4 Cols): KAB DELIVER HOGA & RIDER DETAILS */}
                    <div className="md:col-span-4 space-y-3 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#dfb743] flex items-center space-x-1">
                        <Bike className="w-3.5 h-3.5" />
                        <span>DELIVERY ESTIMATE & RIDER (کب ڈیلیور ہوگا)</span>
                      </div>

                      {/* Delivery Status & ETA */}
                      <div className="bg-[#05180e] p-2.5 rounded-xl border border-emerald-500/20 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[#a29b8c]">Estimated Arrival Time:</span>
                          <span className="text-emerald-400 font-bold">~{order.estimatedArrivalMinutes || 35} Mins</span>
                        </div>
                        <div className="text-[10px] text-[#cfc8b8]">
                          Customer ke tracking page par yahi status live reflect ho raha hai.
                        </div>
                      </div>

                      {/* Assigned Rider Info */}
                      <div>
                        <span className="text-[10px] text-[#8e8779] block">Assigned Rider:</span>
                        <div className="flex items-center justify-between pt-0.5">
                          <span className="font-bold text-white">{order.riderName || 'Kamran Khan'}</span>
                          <a
                            href={`tel:${order.riderPhone || '03219876543'}`}
                            className="text-[#dfb743] text-[10px] hover:underline flex items-center space-x-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{order.riderPhone || '0321-9876543'}</span>
                          </a>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 text-[10px] text-[#8e8779]">
                        Order ID: <code className="text-[#dfb743] font-bold">{order.orderId}</code>
                      </div>
                    </div>

                  </div>

                  {/* KITCHEN 1-CLICK STAGE CONTROLS (ADVANCE STATUS) */}
                  <div className="p-3.5 rounded-2xl bg-[#040f07] border border-[#dfb743]/30 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#dfb743] uppercase tracking-wider flex items-center space-x-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#dfb743]" />
                        <span>Update Delivery Stage (یہاں کلک کر کے اسٹیٹس تبدیل کریں):</span>
                      </span>
                      <span className="text-[10px] text-[#8e8779]">
                        Stage change hone par customer ke tracker par foran live change ho jayega.
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      <button
                        onClick={() => handleStageChange(order.orderId, 0)}
                        className={`p-2 rounded-xl font-bold cursor-pointer transition-all text-center ${
                          order.currentStageIndex === 0
                            ? 'bg-sky-500 text-black shadow-lg scale-[1.02]'
                            : 'bg-[#081f12] text-sky-300 border border-sky-500/30 hover:border-sky-400'
                        }`}
                      >
                        1. Received ✓
                      </button>

                      <button
                        onClick={() => handleStageChange(order.orderId, 1)}
                        className={`p-2 rounded-xl font-bold cursor-pointer transition-all text-center ${
                          order.currentStageIndex === 1
                            ? 'bg-amber-500 text-black shadow-lg scale-[1.02]'
                            : 'bg-[#081f12] text-amber-300 border border-amber-500/30 hover:border-amber-400'
                        }`}
                      >
                        2. Cooking 🔥
                      </button>

                      <button
                        onClick={() => handleStageChange(order.orderId, 2)}
                        className={`p-2 rounded-xl font-bold cursor-pointer transition-all text-center ${
                          order.currentStageIndex === 2
                            ? 'bg-blue-500 text-black shadow-lg scale-[1.02]'
                            : 'bg-[#081f12] text-blue-300 border border-blue-500/30 hover:border-blue-400'
                        }`}
                      >
                        3. Packed 📦
                      </button>

                      <button
                        onClick={() => handleStageChange(order.orderId, 3)}
                        className={`p-2 rounded-xl font-bold cursor-pointer transition-all text-center ${
                          order.currentStageIndex === 3
                            ? 'bg-purple-500 text-white shadow-lg scale-[1.02]'
                            : 'bg-[#081f12] text-purple-300 border border-purple-500/30 hover:border-purple-400'
                        }`}
                      >
                        4. With Rider 🛵
                      </button>

                      <button
                        onClick={() => handleStageChange(order.orderId, 4)}
                        className={`p-2 rounded-xl font-bold cursor-pointer transition-all text-center col-span-2 sm:col-span-1 ${
                          order.currentStageIndex === 4
                            ? 'bg-emerald-500 text-black shadow-lg scale-[1.02]'
                            : 'bg-[#081f12] text-emerald-300 border border-emerald-500/30 hover:border-emerald-400'
                        }`}
                      >
                        5. Delivered ✅
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

export default AdminPage;
