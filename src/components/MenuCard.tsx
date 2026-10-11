import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Flame, Clock } from 'lucide-react';
import { formatPKR, type MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface MenuCardProps {
  dish: MenuItem;
  index: number;
}

export const MenuCard: React.FC<MenuCardProps> = ({ dish, index }) => {
  const { addToCart, cart } = useCart();
  const [imageSrc, setImageSrc] = useState(dish.image);
  const [isAdded, setIsAdded] = useState(false);

  // Check how many of this item is currently in cart
  const cartItem = cart.find(c => c.dish.id === dish.id);
  const currentQuantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(dish, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1400);
  };

  const handleImageError = () => {
    // If local image fails to load, gracefully fallback to the curated high-res photography URL
    if (imageSrc !== dish.fallbackImage) {
      setImageSrc(dish.fallbackImage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group rounded-2xl overflow-hidden bg-[#0c1811]/90 border border-[#c59b27]/20 hover:border-[#dfb743]/60 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(197,155,39,0.18)] flex flex-col justify-between"
    >
      <div>
        {/* Image Container with Consistent 4:3 Aspect Ratio and subtle hover zoom */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#061009]">
          <img
            src={imageSrc}
            alt={`${dish.name} - ${dish.description}`}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />

          {/* Luxury ambient gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1811] via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Badge */}
          {dish.badge && (
            <div className="absolute top-3.5 left-3.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#071910]/90 text-[#dfb743] border border-[#dfb743]/40 backdrop-blur-md shadow-md">
                {dish.badge}
              </span>
            </div>
          )}

          {/* Category Pill */}
          <div className="absolute top-3.5 right-3.5">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wide bg-black/60 text-[#ded7c8] backdrop-blur-sm border border-white/10">
              {dish.category}
            </span>
          </div>

          {/* Spice & Portion Tag Overlay on bottom of image */}
          <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-[#e5decb] font-medium drop-shadow-md">
            <span className="flex items-center space-x-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
              <Flame className="w-3 h-3 text-[#ff8042]" />
              <span>{dish.spiceLevel}</span>
            </span>
            <span className="flex items-center space-x-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
              <Clock className="w-3 h-3 text-[#dfb743]" />
              <span>{dish.prepTime}</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Header & Title */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#faf6eb] group-hover:text-[#dfb743] transition-colors leading-snug">
              {dish.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-[#b8b09f] leading-relaxed line-clamp-3">
            {dish.description}
          </p>

          {/* Portion indicator */}
          <div className="text-xs text-[#8c8474] italic">
            {dish.portion}
          </div>
        </div>
      </div>

      {/* Card Footer: Price and Add to Order Button */}
      <div className="p-5 sm:p-6 pt-0 border-t border-[#c59b27]/10 flex items-center justify-between gap-4 mt-2">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#a49d8e]">Price</div>
          <div className="text-lg sm:text-xl font-bold font-royal-brand text-gold-gradient">
            {formatPKR(dish.price)}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`relative px-4 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center space-x-2 cursor-pointer active:scale-95 ${
            isAdded
              ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(5,150,105,0.4)]'
              : 'bg-gold-gradient text-[#08110b] hover:brightness-110 shadow-md hover:shadow-[0_4px_15px_rgba(212,175,55,0.35)]'
          }`}
          aria-label={`Add ${dish.name} to order`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 text-[#08110b]" />
              <span>Add to Order</span>
              {currentQuantityInCart > 0 && (
                <span className="ml-1 bg-[#08110b]/25 text-[#08110b] px-1.5 py-0.2 rounded-full text-[10px]">
                  ({currentQuantityInCart})
                </span>
              )}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};
