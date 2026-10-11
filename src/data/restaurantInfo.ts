export interface RestaurantInfo {
  name: string;
  tagline: string;
  supportingHeadline: string;
  heroDescription: string;
  storyHeadline: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyImage: string;
  signatureImage: string;
  heroImage: string;
  contact: {
    address: string;
    city: string;
    phonePrimary: string;
    phoneSecondary: string;
    email: string;
    openingHours: {
      days: string;
      hours: string;
    }[];
    deliveryNote: string;
  };
  features: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

/**
 * ROYAL BITES — RESTAURANT BRAND & CONTACT CONFIGURATION
 * All contact details, addresses, and hours are editable placeholders for Part 1.
 */
export const RESTAURANT_INFO: RestaurantInfo = {
  name: 'ROYAL BITES',
  tagline: 'The Royal Taste of Pakistan.',
  supportingHeadline: 'Authentic Flavours. Royal Experience.',
  heroDescription:
    'Discover the rich flavours of Pakistani desi cuisine, prepared with traditional spices, served fresh, and crafted for an unforgettable dining experience.',
  heroImage: '/images/hero_feast.jpg',
  
  storyHeadline: 'A Tradition of Authentic Taste.',
  storyParagraph1:
    'At Royal Bites, we celebrate the timeless culinary artistry of Pakistan. Our kitchens are built upon generational cooking techniques, where stone-ground spices meet sizzling iron karahis and fragrant deghs simmer slowly over gentle charcoal embers.',
  storyParagraph2:
    'Every dish is crafted to order using the freshest ingredients, premium cuts of meat, and authentic desi spices. From our sizzling karahis to aromatic saffron-infused biryanis, we invite you to experience traditional Pakistani hospitality infused with royal warmth.',
  storyImage: '/images/story_heritage.jpg',
  signatureImage: '/images/signature_experience.jpg',

  features: [
    {
      id: 'authentic-flavours',
      title: 'Authentic Desi Flavours',
      description: 'Time-honored recipes crafted with whole roasted spices, fresh ginger, garlic, and pure desi ghee for genuine Pakistani taste.',
      icon: 'Flame'
    },
    {
      id: 'freshly-prepared',
      title: 'Freshly Prepared Food',
      description: 'Cooked fresh upon every order in authentic iron woks and tandoors, ensuring optimal sizzle, aroma, and tenderness.',
      icon: 'Sparkles'
    },
    {
      id: 'pakistani-hospitality',
      title: 'Traditional Pakistani Hospitality',
      description: 'Warm, generous desi hospitality inspired by centuries of royal culinary welcoming traditions.',
      icon: 'HeartHandshake'
    },
    {
      id: 'royal-dining',
      title: 'A Royal Dining Experience',
      description: 'An atmosphere designed with rich emerald tones, antique gold accents, and artisanal comfort for families and guests.',
      icon: 'Crown'
    }
  ],

  contact: {
    address: 'Bahadurabad (Near Char Minar Chowrangi)',
    city: 'Karachi, Pakistan',
    phonePrimary: '+92 311 0003160',
    phoneSecondary: '+92 311 0003160 (WhatsApp Orders)',
    email: 'rayanarif214@gmail.com',
    openingHours: [
      { days: 'Monday – Thursday', hours: '12:00 PM – 12:30 AM' },
      { days: 'Friday – Sunday', hours: '12:00 PM – 01:30 AM' }
    ],
    deliveryNote: 'Fresh delivery available within 45 minutes across Bahadurabad and central Karachi zones.'
  },

  socialLinks: [
    { platform: 'Instagram', url: '#instagram' },
    { platform: 'Facebook', url: '#facebook' },
    { platform: 'WhatsApp', url: 'https://wa.me/923110003160' }
  ]
};
