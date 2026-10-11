import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Utensils, ShoppingCart, Sparkles, Clock, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Hero Image with Slow Cinematic Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src={RESTAURANT_INFO.heroImage}
            alt="Royal Bites Authentic Pakistani Desi Feast with Chicken Karahi, Karachi Biryani, Naan, and Seekh Kebabs"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08]"
          />
        </motion.div>

        {/* Multi-layered cinematic gradient overlays for pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08110b] via-[#08110b]/60 to-black/70" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#06120b]/40 to-[#040c07]/90" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(4,14,8,0.7)_0%,transparent_50%,rgba(4,14,8,0.7)_100%)]" />
      </div>

      {/* Decorative Gold Filigree Borders */}
      <div className="absolute top-24 left-6 right-6 hidden md:flex justify-between items-center opacity-30 pointer-events-none">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
        <div className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-serif">Bahadurabad, Karachi • Authentic Heritage</div>
        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
      </div>

      {/* Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Small Label Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-[#c59b27]/40 bg-[#091f15]/80 backdrop-blur-md shadow-lg mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#dfb743]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gold-gradient">
            AUTHENTIC PAKISTANI CUISINE
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#dfb743]" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-royal-brand text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[0.16em] leading-tight text-gold-gradient drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
        >
          ROYAL BITES
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="font-serif-title text-2xl sm:text-3xl md:text-4xl text-[#f3eedf] italic font-normal tracking-wide mt-3 mb-5 drop-shadow-md"
        >
          The Royal Taste of Pakistan.
        </motion.p>

        {/* Supporting Tagline / Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex items-center justify-center space-x-3 mb-6"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c59b27]" />
          <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#c59b27] font-medium">
            Authentic Flavours. Royal Experience.
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c59b27]" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-[#ded6c7] font-light leading-relaxed mb-10 drop-shadow"
        >
          Discover the rich flavours of Pakistani desi cuisine, prepared with traditional spices, served fresh, and crafted for an unforgettable dining experience.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          {/* Primary Button: Menu */}
          <Link
            to="/menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-[#08110b] font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_10px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-3 group"
          >
            <Utensils className="w-4 h-4 text-[#08110b] group-hover:rotate-12 transition-transform" />
            <span>Explore Our Menu</span>
          </Link>

          {/* Secondary Button: Order */}
          <Link
            to="/order"
            className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-[#dfb743]/80 bg-[#08170f]/70 text-[#f5eedf] hover:bg-[#dfb743] hover:text-[#08110b] font-semibold text-sm sm:text-base tracking-wider uppercase backdrop-blur-md shadow-lg hover:shadow-[0_10px_25px_rgba(212,175,55,0.25)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-3 group"
          >
            <ShoppingCart className="w-4 h-4 text-[#dfb743] group-hover:text-[#08110b] transition-colors" />
            <span>Order Your Food</span>
          </Link>
        </motion.div>

        {/* Quick Highlights Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-14 pt-8 border-t border-[#c59b27]/20 grid grid-cols-2 md:grid-cols-3 gap-6 text-left w-full max-w-3xl"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#122b1e] border border-[#c59b27]/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#dfb743]" />
            </div>
            <div>
              <div className="text-xs text-[#a39c8e]">Cooking Technique</div>
              <div className="text-sm font-semibold text-[#f0eadd]">Live Iron Karahi & Tandoor</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#122b1e] border border-[#c59b27]/30 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#dfb743]" />
            </div>
            <div>
              <div className="text-xs text-[#a39c8e]">Service & Delivery</div>
              <div className="text-sm font-semibold text-[#f0eadd]">Freshly Prepared To Order</div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#122b1e] border border-[#c59b27]/30 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#dfb743]" />
            </div>
            <div>
              <div className="text-xs text-[#a39c8e]">Tradition</div>
              <div className="text-sm font-semibold text-[#f0eadd]">Pure Desi Spices & Ghee</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Refined Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer opacity-75 hover:opacity-100"
        onClick={() => scrollTo('#menu')}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#c59b27] mb-1 font-sans">Scroll Down</span>
        <ChevronDown className="w-4 h-4 text-[#dfb743]" />
      </motion.div>
    </section>
  );
};
