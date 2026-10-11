import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ToastNotification } from './components/ToastNotification';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { OrderPage } from './pages/OrderPage';
import { TrackPage } from './pages/TrackPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { AdsPage } from './pages/AdsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-[#08110b] text-[#ede7dc] font-sans selection:bg-[#c59b27] selection:text-[#08110b] flex flex-col justify-between">
          {/* Persistent Luxury Navigation */}
          <Navbar />

          {/* Multi-Page Routed Content */}
          <main className="flex-grow">
            <Routes>
              {/* Home Page: / */}
              <Route path="/" element={<HomePage />} />

              {/* Dedicated Full Menu Page: /menu */}
              <Route path="/menu" element={<MenuPage />} />

              {/* Dedicated Heritage & Story Page: /about */}
              <Route path="/about" element={<AboutPage />} />

              {/* Dedicated Order Online Page: /order */}
              <Route path="/order" element={<OrderPage />} />

              {/* Dedicated Daraz-Style Live Tracking Page: /track */}
              <Route path="/track" element={<TrackPage />} />
              <Route path="/track-order" element={<TrackPage />} />

              {/* Commercial Video Ads Studio: /ads */}
              <Route path="/ads" element={<AdsPage />} />
              <Route path="/commercials" element={<AdsPage />} />

              {/* Dedicated Contact & Table Inquiry Page: /contact */}
              <Route path="/contact" element={<ContactPage />} />

              {/* Restaurant Owner & Kitchen Management Dashboard */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/kitchen" element={<AdminPage />} />

              {/* Fallback to Home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Persistent Footer */}
          <Footer />

          {/* Global Cart Drawer & Toast Notifications */}
          <CartDrawer />
          <ToastNotification />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
