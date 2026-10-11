import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, UtensilsCrossed, Phone, ArrowRight, Bike } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemCount, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about' },
    { name: 'Order Online', path: '/order' },
    { name: 'Track Order', path: '/track' },
    { name: 'Video Tour & Ads', path: '/ads' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/'
          ? 'bg-[#07130b]/95 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.7)] border-b border-[#c59b27]/20'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Wordmark */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center space-x-3 text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full border border-[#c59b27]/40 bg-gradient-to-br from-[#0c2b20] to-[#04100b] flex items-center justify-center shadow-lg group-hover:border-[#c59b27] transition-colors">
              <UtensilsCrossed className="w-5 h-5 text-[#dfb743] group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="font-royal-brand tracking-[0.22em] text-xl sm:text-2xl font-bold text-gold-gradient block leading-none">
                ROYAL BITES
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#c59b27]/80 uppercase block font-sans font-medium mt-1">
                The Royal Taste of Pakistan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium tracking-wide">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-all py-1 relative flex items-center space-x-1.5 ${
                    active
                      ? 'text-[#dfb743] font-bold'
                      : 'text-[#d6cebf] hover:text-[#dfb743]'
                  }`}
                >
                  {link.name === 'Track Order' && (
                    <Bike className="w-3.5 h-3.5 text-[#dfb743]" />
                  )}
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#dfb743] to-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons & Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Order Cart Pill */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 px-3.5 py-2 rounded-full border border-[#c59b27]/40 bg-[#0e2419]/70 hover:bg-[#153425] hover:border-[#dfb743] transition-all text-[#e8e4dc] cursor-pointer"
              aria-label={`View cart with ${totalItemCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#dfb743]" />
              <span className="text-xs font-semibold hidden sm:inline">Order Bag</span>
              {totalItemCount > 0 && (
                <span className="bg-[#c59b27] text-[#08110b] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Order Now CTA (Desktop) */}
            <Link
              to="/order"
              className="hidden lg:inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-gold-gradient text-[#08110b] font-bold text-xs tracking-wider uppercase shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Order Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#d6cebf] hover:text-white hover:bg-[#12281d] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#06120a]/98 border-b border-[#c59b27]/30 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="py-2 border-b border-[#c59b27]/15 mb-3">
            <span className="text-xs tracking-widest text-[#c59b27] uppercase font-semibold">
              Authentic Pakistani Cuisine
            </span>
          </div>
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between text-base py-2.5 px-3 rounded-md transition-colors ${
                  active
                    ? 'text-[#dfb743] bg-[#0c2217] font-bold border-l-2 border-[#dfb743]'
                    : 'text-[#ded8cb] hover:text-[#dfb743] hover:bg-[#0c2217]'
                }`}
              >
                <span className="flex items-center space-x-2">
                  {link.name === 'Track Order' && <Bike className="w-4 h-4 text-[#dfb743]" />}
                  <span>{link.name}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-[#c59b27]/50" />
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#c59b27]/20 flex flex-col space-y-2">
            <Link
              to="/order"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full bg-gold-gradient text-[#08110b] font-bold text-center text-sm uppercase tracking-wider shadow-lg"
            >
              Order Your Food Now
            </Link>
            <div className="flex items-center justify-center space-x-2 text-xs text-[#a29b8c] pt-2">
              <Phone className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>{RESTAURANT_INFO.contact.phonePrimary}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
