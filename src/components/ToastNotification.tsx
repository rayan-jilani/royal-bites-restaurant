import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { lastAddedItem, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {lastAddedItem && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#091b12]/95 border border-[#dfb743] shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center space-x-3 text-sm text-[#faf6eb]"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-700/80 border border-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-[#dfb743] block text-xs uppercase tracking-wider">Added to Order</span>
            <span className="font-serif font-semibold">{lastAddedItem}</span>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 px-3 py-1 rounded-full bg-[#122e1f] border border-[#c59b27]/40 hover:bg-[#1a402c] text-xs text-[#dfb743] font-semibold flex items-center space-x-1 cursor-pointer"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Bag</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
