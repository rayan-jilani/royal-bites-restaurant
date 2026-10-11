import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, ShoppingBag, ArrowRight } from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, type CategoryFilter } from '../data/menuData';
import { MenuCard } from '../components/MenuCard';
import { useCart } from '../context/CartContext';

export const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All Dishes');
  const { totalItemCount } = useCart();

  const filteredItems = activeCategory === 'All Dishes'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="pt-28 pb-24 bg-[#07130b] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dfb743]" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
              Authentic Pakistani Cuisine
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif-title text-4xl sm:text-6xl font-bold text-[#faf6eb] mb-4"
          >
            The Royal Desi Menu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#bfb7a6]"
          >
            Every dish is cooked fresh to order with traditional whole spices, pure desi ghee, and tender cuts of meat in seasoned iron karahis and clay ovens.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-[#08110b] shadow-[0_4px_20px_rgba(212,175,55,0.35)] scale-105'
                  : 'bg-[#0e2117]/70 text-[#c2baa8] hover:text-white hover:bg-[#142d20] border border-[#c59b27]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredItems.map((dish, index) => (
            <MenuCard key={dish.id} dish={dish} index={index} />
          ))}
        </div>

        {/* Bottom Floating Order CTA */}
        {totalItemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 max-w-2xl mx-auto p-5 rounded-2xl glass-panel-heavy border-2 border-[#dfb743]/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-full bg-[#123624] border border-[#dfb743] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-6 h-6 text-[#dfb743]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#faf6eb]">
                  {totalItemCount} {totalItemCount === 1 ? 'Dish' : 'Dishes'} in Your Order Bag
                </h4>
                <p className="text-xs text-[#a29b8c]">
                  Ready to proceed to checkout and enter delivery details
                </p>
              </div>
            </div>

            <Link
              to="/order"
              className="px-6 py-3 rounded-full bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2 shrink-0"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {/* Halal and Fresh Assurance */}
        <div className="mt-16 text-center text-xs text-[#8c8474] flex items-center justify-center space-x-2">
          <Utensils className="w-4 h-4 text-[#c59b27]" />
          <span>100% Halal certified • Handcrafted fresh spices • Pure Desi Ghee</span>
        </div>
      </div>
    </div>
  );
};
