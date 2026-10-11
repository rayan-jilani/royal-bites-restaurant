import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, ChefHat, HeartHandshake } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-24 sm:py-32 bg-[#09160e] overflow-hidden">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#0c2f1f]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#c59b27]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            {/* Main Photography Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-[#c59b27]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] aspect-[16/10] sm:aspect-[4/3] bg-[#051108]">
              <img
                src={RESTAURANT_INFO.storyImage}
                alt="Pakistani chef finishing fresh copper karahi over open charcoal flames at Royal Bites"
                className="w-full h-full object-cover object-center filter brightness-[0.88] hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09160e] via-transparent to-black/20" />

              {/* Floating Culinary Seal */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-[#c59b27]/40 backdrop-blur-md">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#102b1c] border border-[#c59b27]/40 flex items-center justify-center shrink-0">
                    <ChefHat className="w-5 h-5 text-[#dfb743]" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#dfb743] font-semibold">
                      Authentic Culinary Craft
                    </div>
                    <div className="text-sm font-medium text-[#f5eedf]">
                      Cooked in Pure Ghee & Fresh Cast Iron
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Antique Gold Floating Accent Pill */}
            <div className="absolute -top-4 -right-4 hidden sm:block p-3 rounded-2xl bg-[#0e2417] border border-[#c59b27]/40 shadow-xl">
              <Sparkles className="w-6 h-6 text-[#dfb743]" />
            </div>
          </motion.div>

          {/* Text Story Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb743]" />
              <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
                Our Story
              </span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#faf6eb] leading-tight">
              {RESTAURANT_INFO.storyHeadline}
            </h2>

            <div className="h-[1.5px] w-20 bg-gradient-to-r from-[#dfb743] to-transparent" />

            <p className="text-base sm:text-lg text-[#ccc4b3] leading-relaxed font-light">
              {RESTAURANT_INFO.storyParagraph1}
            </p>

            <p className="text-base sm:text-lg text-[#ccc4b3] leading-relaxed font-light">
              {RESTAURANT_INFO.storyParagraph2}
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#c59b27]/15">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#112a1c] border border-[#c59b27]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Flame className="w-4 h-4 text-[#dfb743]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#faf6eb]">Raw Spices, Fresh Fire</h4>
                  <p className="text-xs text-[#a29b8c] mt-0.5">Whole roasted cumin, black pepper, and stone-ground garam masala.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#112a1c] border border-[#c59b27]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4 text-[#dfb743]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#faf6eb]">Desi Hospitality</h4>
                  <p className="text-xs text-[#a29b8c] mt-0.5">Generous portions crafted for shared family feasts and celebrations.</p>
                </div>
              </div>
            </div>

            {/* Quick CTA to Menu */}
            <div className="pt-2">
              <a
                href="#menu"
                className="inline-flex items-center space-x-2 text-sm font-semibold text-[#dfb743] hover:text-[#f8ecbe] transition-colors group"
              >
                <span className="border-b border-[#dfb743]/50 pb-0.5 group-hover:border-[#dfb743]">
                  View Our Signature Desi Menu
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
