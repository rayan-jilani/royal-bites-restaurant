import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bike, Sparkles, ChefHat, Film, Volume2 } from 'lucide-react';
import { Hero } from '../components/Hero';
import { MenuCard } from '../components/MenuCard';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { SignatureExperience } from '../components/SignatureExperience';
import { MENU_ITEMS } from '../data/menuData';
import { RESTAURANT_INFO } from '../data/restaurantInfo';

export const HomePage: React.FC = () => {
  // Top 3 signature dishes for home highlight
  const featuredDishes = MENU_ITEMS.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Featured Signature Dishes Teaser */}
      <section className="py-24 bg-[#07130b] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb743]" />
                <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
                  Chef’s Selections
                </span>
              </div>
              <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#faf6eb]">
                Signature Desi Delicacies
              </h2>
              <p className="text-sm sm:text-base text-[#b8b09f] mt-2 max-w-xl">
                A preview of our most celebrated Pakistani specialties, simmered fresh in cast iron woks and baked in clay tandoors.
              </p>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-[#c59b27]/40 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#dfb743] hover:bg-[#122f1f] hover:border-[#dfb743] transition-all self-start md:self-end group"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, idx) => (
              <MenuCard key={dish.id} dish={dish} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Story Teaser */}
      <section className="py-24 bg-[#09160e] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden border border-[#c59b27]/30 shadow-2xl aspect-[4/3] bg-[#040e07]">
                <img
                  src={RESTAURANT_INFO.storyImage}
                  alt="Royal Bites culinary heritage"
                  className="w-full h-full object-cover filter brightness-[0.85] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60">
                <ChefHat className="w-3.5 h-3.5 text-[#dfb743]" />
                <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
                  Generational Heritage
                </span>
              </div>

              <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#faf6eb] leading-tight">
                {RESTAURANT_INFO.storyHeadline}
              </h2>

              <p className="text-base text-[#ccc4b3] leading-relaxed">
                {RESTAURANT_INFO.storyParagraph1}
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-[#dfb743] hover:text-[#f8ecbe] transition-colors group"
                >
                  <span className="border-b border-[#dfb743]/50 pb-0.5 group-hover:border-[#dfb743]">
                    Learn More About Our Heritage & Kitchen
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Editorial Signature Experience */}
      <SignatureExperience />

      {/* 6. Daraz-Style Live Order Tracking Callout Banner */}
      <section className="py-16 bg-[#040d07] border-y border-[#c59b27]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0b2618] via-[#091f13] to-[#040d07] border border-[#c59b27]/35 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center space-x-5 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-[#133d26] border border-[#dfb743]/50 flex items-center justify-center shrink-0 mx-auto md:mx-0 shadow-lg">
                <Bike className="w-8 h-8 text-[#dfb743]" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-gold-gradient block">
                  Daraz-Style Order Tracking
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf6eb] mt-1">
                  Already Placed an Order?
                </h3>
                <p className="text-xs sm:text-sm text-[#b5ae9f] mt-1">
                  Track your food live — cooking in the karahi, packaging, and rider arrival time.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 shrink-0">
              <Link
                to="/track"
                className="px-7 py-3.5 rounded-full bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2"
              >
                <span>Track Order Live</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/order"
                className="px-6 py-3.5 rounded-full border border-[#c59b27]/40 text-[#faf6eb] hover:bg-[#122e1f] text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <span>Order Now</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Video Commercials Callout (Brag Architecture) */}
      <section className="py-20 bg-[#061209] border-b border-[#c59b27]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c2b1c] to-[#041008] border-2 border-[#dfb743]/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/60 border border-[#dfb743]/40 text-gold-gradient text-xs font-bold uppercase tracking-widest">
                <Film className="w-3.5 h-3.5 text-[#dfb743]" />
                <span>Professional Video Commercials</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h3 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#faf6eb]">
                Experience Our 1-Minute Grand Commercial With Sound
              </h3>
              <p className="text-sm text-[#b8b09f]">
                Watch our 1-minute complete restaurant brand video film & 20s ads powered by Brag motion architecture — featuring sizzling karahi sound effects, sub-bass drops, tabla rhythm, and Urdu voiceovers!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                to="/ads"
                className="px-8 py-4 rounded-full bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider shadow-[0_10px_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 fill-current" />
                <span>Watch Commercials With Sound</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
