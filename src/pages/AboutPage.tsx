import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#08130b] min-h-screen text-[#ede7dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60 mb-4"
          >
            <ChefHat className="w-3.5 h-3.5 text-[#dfb743]" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
              Our Culinary Heritage
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif-title text-4xl sm:text-6xl font-bold text-[#faf6eb] mb-4"
          >
            A Tradition of Authentic Taste
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#bfb7a6]"
          >
            The story of Royal Bites is a tribute to the timeless culinary artistry of Pakistan, where generational cooking secrets and raw charcoal fire create extraordinary dining moments.
          </motion.p>
        </div>

        {/* Narrative & Image Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-[#c59b27]/30 shadow-2xl aspect-[4/3] bg-[#040e07]">
              <img
                src={RESTAURANT_INFO.storyImage}
                alt="Chef preparing authentic Pakistani karahi at Royal Bites"
                className="w-full h-full object-cover filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 hidden sm:block p-4 rounded-2xl bg-[#0b2316] border border-[#dfb743]/50 shadow-xl">
              <span className="text-xs font-bold text-gold-gradient uppercase tracking-widest block">
                100% Authentic Desi
              </span>
              <span className="text-xs text-[#ded7c8]">Live Fire & Cast Iron</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#faf6eb]">
              Generations of Flavour, Crafted for Today
            </h2>
            <div className="h-[1.5px] w-20 bg-gradient-to-r from-[#dfb743] to-transparent" />
            <p className="text-base text-[#ccc4b3] leading-relaxed">
              {RESTAURANT_INFO.storyParagraph1}
            </p>
            <p className="text-base text-[#ccc4b3] leading-relaxed">
              {RESTAURANT_INFO.storyParagraph2}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-sm text-[#e5decb]">
                <CheckCircle2 className="w-4 h-4 text-[#dfb743] shrink-0" />
                <span>Heavy black cast iron woks that preserve natural moisture and aroma.</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-[#e5decb]">
                <CheckCircle2 className="w-4 h-4 text-[#dfb743] shrink-0" />
                <span>Stone-ground garam masala blended fresh every single morning.</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-[#e5decb]">
                <CheckCircle2 className="w-4 h-4 text-[#dfb743] shrink-0" />
                <span>Pure desi ghee and fresh meat sourced daily for unmatched tenderness.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Image Block 2: The Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#faf6eb]">
              Pakistani Hospitality: Mehmaan-Nawazi
            </h2>
            <div className="h-[1.5px] w-20 bg-gradient-to-r from-[#dfb743] to-transparent" />
            <p className="text-base text-[#ccc4b3] leading-relaxed">
              In Pakistani culture, sharing a meal is sacred. At Royal Bites, we honour the tradition of <em>Mehmaan-Nawazi</em> — where every guest is welcomed like royalty and every plate is served with pride and generosity.
            </p>
            <p className="text-base text-[#ccc4b3] leading-relaxed">
              Whether you are dining with family over a sizzling chicken karahi, savoring fragrant Karachi biryani, or ordering at home, our mission is to deliver warmth and authenticity with every bite.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="px-7 py-3.5 rounded-full bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center space-x-2"
              >
                <span>View Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/order"
                className="px-7 py-3.5 rounded-full border border-[#c59b27]/40 text-[#faf6eb] hover:bg-[#122e1f] font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <span>Order Online</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-3xl overflow-hidden border border-[#c59b27]/30 shadow-2xl aspect-[4/3] bg-[#040e07]">
              <img
                src={RESTAURANT_INFO.signatureImage}
                alt="Sizzling iron karahi signature dish"
                className="w-full h-full object-cover filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
