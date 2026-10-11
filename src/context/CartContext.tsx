import React, { createContext, useContext, useState, useEffect } from 'react';
import { MENU_ITEMS, type MenuItem } from '../data/menuData';

export interface CartItem {
  dish: MenuItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (dish: MenuItem, quantity?: number) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
  totalItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  lastAddedItem: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'royal_bites_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed: { dishId: string; quantity: number }[] = JSON.parse(saved);
        // Match with current MENU_ITEMS
        return parsed
          .map(item => {
            const foundDish = MENU_ITEMS.find(d => d.id === item.dishId);
            return foundDish ? { dish: foundDish, quantity: Math.max(1, item.quantity) } : null;
          })
          .filter((item): item is CartItem => item !== null);
      }
    } catch {
      // ignore
    }
    // Default initial cart with 1 Karachi Chicken Biryani for immediate delight
    const defaultDish = MENU_ITEMS.find(d => d.id === 'karachi-chicken-biryani');
    return defaultDish ? [{ dish: defaultDish, quantity: 1 }] : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  useEffect(() => {
    try {
      const toSave = cart.map(item => ({ dishId: item.dish.id, quantity: item.quantity }));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (dish: MenuItem, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        return prev.map(item =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { dish, quantity }];
    });
    setLastAddedItem(dish.name);
    setTimeout(() => {
      setLastAddedItem(null);
    }, 2500);
  };

  const removeFromCart = (dishId: string) => {
    setCart(prev => prev.filter(item => item.dish.id !== dishId));
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.dish.id === dishId ? { ...item, quantity: Math.min(20, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 150 : 0; // Flat PKR 150 royal delivery fee
  const total = subtotal + deliveryFee;
  const totalItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryFee,
        total,
        totalItemCount,
        isCartOpen,
        setIsCartOpen,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
