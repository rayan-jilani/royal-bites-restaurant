export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in PKR
  category: 'Signature Karahi' | 'Royal Biryani' | 'Clay Handi' | 'Charcoal BBQ' | 'Tandoor & Accompaniments';
  image: string;
  fallbackImage: string;
  portion: string;
  spiceLevel: 'Mild' | 'Medium' | 'Traditional Desi Spicy';
  prepTime: string;
  badge?: string;
  isSignature: boolean;
  ingredients?: string[];
}

/**
 * ROYAL BITES — CENTRAL MENU DATA
 * All menu items, pricing in PKR, and descriptions are centrally managed and easily editable here.
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'chicken-karahi',
    name: 'Chicken Karahi',
    description: 'Traditional Pakistani chicken karahi prepared with tomatoes, green chilies, ginger, and aromatic spices.',
    price: 1850,
    category: 'Signature Karahi',
    image: '/images/dish_chicken_karahi.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1200&auto=format&fit=crop',
    portion: 'Serves 2-3 (Full Karahi)',
    spiceLevel: 'Traditional Desi Spicy',
    prepTime: '25-30 mins',
    badge: 'Chef’s Signature',
    isSignature: true,
    ingredients: ['Fresh Chicken', 'Ripe Tomatoes', 'Julienned Ginger', 'Green Chilies', 'Pure Desi Ghee', 'Royal Karahi Masala']
  },
  {
    id: 'karachi-chicken-biryani',
    name: 'Karachi Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken and authentic Pakistani biryani flavours.',
    price: 950,
    category: 'Royal Biryani',
    image: '/images/dish_karachi_biryani.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1200&auto=format&fit=crop',
    portion: 'Single Platter with Aloo & Raita',
    spiceLevel: 'Traditional Desi Spicy',
    prepTime: '15-20 mins',
    badge: 'Royal Favorite',
    isSignature: true,
    ingredients: ['Aged Long-Grain Basmati Rice', 'Spiced Chicken', 'Karachi Spiced Potato', 'Saffron Infusion', 'Fried Crisp Onions', 'Fresh Mint']
  },
  {
    id: 'mutton-karahi',
    name: 'Mutton Karahi',
    description: 'Rich, traditional mutton karahi cooked with bold spices and fresh garnishes.',
    price: 2850,
    category: 'Signature Karahi',
    image: '/images/dish_mutton_karahi.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1545247181-516773cae754?q=80&w=1200&auto=format&fit=crop',
    portion: 'Serves 2-3 (Full Iron Wok)',
    spiceLevel: 'Traditional Desi Spicy',
    prepTime: '35-40 mins',
    badge: 'Prime Mutton Cut',
    isSignature: true,
    ingredients: ['Tender Goat/Mutton Meat', 'Fresh Tomato Reduction', 'Black Pepper', 'Coriander Seeds', 'Green Chilies', 'Desi Ghee']
  },
  {
    id: 'chicken-handi',
    name: 'Chicken Handi',
    description: 'Creamy, flavourful desi chicken handi prepared with traditional spices.',
    price: 1950,
    category: 'Clay Handi',
    image: '/images/dish_chicken_handi.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1200&auto=format&fit=crop',
    portion: 'Serves 2-3 (Earthen Handi)',
    spiceLevel: 'Medium',
    prepTime: '25-30 mins',
    badge: 'Velvety & Mild',
    isSignature: true,
    ingredients: ['Boneless Chicken Breast', 'Fresh Heavy Malai Cream', 'Cashew Paste', 'Kasuri Methi', 'Butter Glaze', 'Aromatic Cardamom']
  },
  {
    id: 'chicken-tikka',
    name: 'Chicken Tikka',
    description: 'Marinated chicken grilled with authentic BBQ spices for a smoky, savoury flavour.',
    price: 680,
    category: 'Charcoal BBQ',
    image: '/images/dish_chicken_tikka.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1200&auto=format&fit=crop',
    portion: 'Quarter Chicken (Leg or Breast)',
    spiceLevel: 'Traditional Desi Spicy',
    prepTime: '20-25 mins',
    badge: 'Charcoal Smoked',
    isSignature: true,
    ingredients: ['Chicken Quarter', 'Smoky Tandoori Marinade', 'Lemon Juice', 'Garlic-Ginger Paste', 'Kashmiri Chili', 'Chaat Masala']
  },
  {
    id: 'seekh-kebabs',
    name: 'Seekh Kebabs',
    description: 'Traditional spiced minced-meat kebabs grilled and served with fresh accompaniments.',
    price: 890,
    category: 'Charcoal BBQ',
    image: '/images/dish_seekh_kebabs.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
    portion: '4 Skewers with Mint Raita & Salad',
    spiceLevel: 'Medium',
    prepTime: '20 mins',
    badge: 'Melt-in-Mouth',
    isSignature: true,
    ingredients: ['Finely Minced Meat', 'Chopped Mint & Cilantro', 'Green Chilies', 'Pomegranate Seeds (Anardana)', 'Garam Masala', 'Charcoal Skewered']
  }
];

export const CATEGORIES = [
  'All Dishes',
  'Signature Karahi',
  'Royal Biryani',
  'Clay Handi',
  'Charcoal BBQ'
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];

export const formatPKR = (amount: number): string => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};
