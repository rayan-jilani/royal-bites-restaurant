import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../data/menuData';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    totalItemCount,
  } = useCart();

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/order');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#091810] border-l border-[#c59b27]/30 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#c59b27]/20 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-[#112d1e] border border-[#c59b27]/40 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-[#dfb743]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#faf6eb]">Your Order Bag</h3>
                    <span className="text-xs text-[#a29b8c]">
                      {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg text-[#ded8cb] hover:text-white hover:bg-[#122e1f] transition-colors cursor-pointer"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body (Items) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#0d2217] border border-[#c59b27]/20 flex items-center justify-center text-[#7d7667]">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div className="text-base font-semibold text-[#faf6eb]">Your Bag is Empty</div>
                    <p className="text-xs text-[#9d9585] max-w-xs">
                      Explore our authentic Pakistani dishes and add your favourites to get started.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => {
                      const lineTotal = item.dish.price * item.quantity;
                      return (
                        <div
                          key={item.dish.id}
                          className="p-3.5 rounded-2xl bg-[#06130b] border border-[#c59b27]/15 flex items-center justify-between gap-3"
                        >
                          <img
                            src={item.dish.image}
                            alt={item.dish.name}
                            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#c59b27]/20"
                          />

                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-[#faf6eb] truncate">
                              {item.dish.name}
                            </h4>
                            <div className="text-xs text-[#8e8777]">
                              {formatPKR(item.dish.price)} each
                            </div>
                            <div className="text-xs font-semibold text-gold-gradient mt-0.5">
                              {formatPKR(lineTotal)}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 shrink-0">
                            <div className="flex items-center rounded-lg bg-[#0d2618] border border-[#c59b27]/30 p-0.5">
                              <button
                                onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                                className="p-1 text-[#ded8cb] hover:text-white rounded cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-[#faf6eb]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                                className="p-1 text-[#ded8cb] hover:text-white rounded cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.dish.id)}
                              className="p-1 text-[#787265] hover:text-rose-400 transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    <button
                      onClick={clearCart}
                      className="text-xs text-[#a39c8e] hover:text-rose-400 transition-colors pt-2 block w-full text-center cursor-pointer"
                    >
                      Clear all dishes
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#c59b27]/20 bg-[#06120a] space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-[#b0a898]">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#faf6eb]">{formatPKR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#b0a898]">
                      <span>Royal Delivery</span>
                      <span className="font-semibold text-[#faf6eb]">{formatPKR(deliveryFee)}</span>
                    </div>
                    <div className="pt-2 border-t border-[#c59b27]/20 flex justify-between text-sm">
                      <span className="font-bold text-[#faf6eb]">Total (PKR)</span>
                      <span className="font-royal-brand font-bold text-lg text-gold-gradient">
                        {formatPKR(total)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-3.5 rounded-full bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Proceed to Order Details</span>
                    <ArrowRight className="w-4 h-4 text-[#08110b]" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
