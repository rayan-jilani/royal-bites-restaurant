import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const SignatureExperience: React.FC = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/order');
  };

  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-[#08130b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#c59b27]/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-[#040e07]">
          {/* Background Photography with Zoom and Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={RESTAURANT_INFO.signatureImage}
              alt="Sensory close-up of sizzling Pakistani Chicken Karahi at Royal Bites"
              className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040e07] via-[#040e07]/80 to-transparent sm:w-3/4" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040e07] via-transparent to-black/40" />
          </div>

          {/* Foreground Editorial Content */}
          <div className="relative z-10 p-8 sm:p-14 md:p-20 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/40 bg-[#091f15]/80 backdrop-blur-md mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#dfb743]" />
              <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
                Signature Culinary Experience
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-bold text-[#faf6eb] leading-tight mb-6"
            >
              Sizzling Iron Karahi, <br />
              <span className="text-gold-gradient italic">Crafted Over Fire.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-[#ded7c8] leading-relaxed mb-8 font-light drop-shadow"
            >
              Hear the sizzle of tender chicken cooked in authentic desi ghee, tomatoes, fresh ginger matchsticks, and whole spices right from the blazing wok to your plate. Paired with steaming hot tandoori roghani naan for an unforgettable royal feast.
            </motion.p>

            {/* Working Order Now Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <button
                onClick={handleOrderClick}
                className="px-8 py-4 rounded-full bg-gold-gradient text-[#08110b] font-bold text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_15px_35px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center space-x-3 cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 text-[#08110b]" />
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 text-[#08110b] group-hover:translate-x-1 transition-transform" />
              </button>

              <span className="text-xs text-[#b8b09f] italic">
                Prepared fresh on demand • 35-40 min delivery
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
