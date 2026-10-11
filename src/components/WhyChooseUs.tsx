import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, HeartHandshake, Crown } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

const iconMap = {
  Flame,
  Sparkles,
  HeartHandshake,
  Crown,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#06110a] overflow-hidden">
      {/* Decorative center divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl gold-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60 mb-4"
          >
            <Crown className="w-3.5 h-3.5 text-[#dfb743]" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
              The Royal Standard
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-title text-3xl sm:text-5xl font-bold text-[#faf6eb] mb-4"
          >
            Why Choose Royal Bites?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#bfb7a6]"
          >
            Every detail at Royal Bites is curated to honor the richness of authentic Pakistani dining culture.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {RESTAURANT_INFO.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Sparkles;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative p-7 rounded-2xl bg-[#0a1b12]/70 border border-[#c59b27]/20 hover:border-[#dfb743]/60 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(197,155,39,0.15)] flex flex-col justify-between"
              >
                <div>
                  {/* Icon Circle */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#123624] to-[#07160e] border border-[#c59b27]/35 flex items-center justify-center mb-6 group-hover:border-[#dfb743] group-hover:scale-105 transition-all shadow-md">
                    <IconComponent className="w-7 h-7 text-[#dfb743] group-hover:text-white transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-[#faf6eb] group-hover:text-[#dfb743] transition-colors mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#b5ad9d] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle bottom decorative line */}
                <div className="mt-6 pt-4 border-t border-[#c59b27]/10 flex items-center justify-between text-xs text-[#8d8575]">
                  <span className="tracking-wider uppercase text-[10px] text-[#c59b27]">Royal Bites</span>
                  <span>0{index + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
