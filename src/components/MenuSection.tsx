import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, type CategoryFilter } from '../data/menuData';
import { MenuCard } from './MenuCard';
import { useCart } from '../context/CartContext';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All Dishes');
  const { totalItemCount, setIsCartOpen } = useCart();

  const filteredItems = activeCategory === 'All Dishes'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-[#07130b] overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#c59b27]/30 to-transparent" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-[#0c2e1f]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-[#c59b27]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dfb743]" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
              The Royal Desi Selection
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-bold text-[#faf6eb] mb-4"
          >
            Signature Pakistani Dishes
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c59b27]" />
            <span className="font-royal-brand text-xs sm:text-sm tracking-[0.25em] uppercase text-[#c59b27]">
              Authentic Flavours. Royal Experience.
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c59b27]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-[#bfb7a6] leading-relaxed"
          >
            Handcrafted with freshly ground spices, slow-simmered in seasoned karahis, and chargrilled over glowing coals to bring the authentic taste of Pakistani culinary heritage to your table.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14"
        >
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
        </motion.div>

        {/* Food Menu Cards Grid (Features all six signature dishes with separate matching photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredItems.map((dish, index) => (
            <MenuCard key={dish.id} dish={dish} index={index} />
          ))}
        </div>

        {/* Quick Cart Floating Callout */}
        {totalItemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-14 max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl glass-panel-heavy border border-[#c59b27]/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl text-center sm:text-left"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#143224] border border-[#c59b27]/40 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-[#dfb743]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#faf6eb]">
                  {totalItemCount} {totalItemCount === 1 ? 'Dish' : 'Dishes'} in Your Order Bag
                </div>
                <div className="text-xs text-[#a9a293]">Ready to review delivery details and total price</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-4 py-2 rounded-full border border-[#c59b27]/50 text-xs font-semibold text-[#dfb743] hover:bg-[#132c1f] transition-all cursor-pointer"
              >
                Review Items
              </button>
              <a
                href="#order"
                className="px-5 py-2 rounded-full bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all cursor-pointer inline-flex items-center space-x-1"
              >
                <span>Complete Order</span>
              </a>
            </div>
          </motion.div>
        )}

        {/* Note on Authenticity */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-xs text-[#8c8577]">
            <Utensils className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>All dishes are freshly prepared using Halal-certified ingredients and pure Pakistani spices.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
