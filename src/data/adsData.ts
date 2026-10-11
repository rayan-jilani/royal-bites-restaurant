export interface AdScene {
  id: number;
  duration: number; // in seconds
  title: string;
  subtitle: string;
  highlightWord: string;
  image: string;
  soundFx: 'sizzle' | 'bass_drop' | 'chime' | 'beat_drop' | 'motorcycle';
  narrationUrdu: string;
  narrationEnglish: string;
  badge: string;
}

export interface AdCampaign {
  id: string;
  title: string;
  urduTitle: string;
  concept: string;
  durationSeconds: number;
  themeColor: string;
  musicGenre: string;
  targetAudience: string;
  scenes: AdScene[];
  scriptSummary: string;
}

export const RESTAURANT_ADS: AdCampaign[] = [
  {
    id: 'ad-royal-feast',
    title: 'Ad 1: The Royal Feast of Karachi',
    urduTitle: 'شاہی ذائقہ — بہادرآباد کراچی',
    concept: 'Cinematic Pakistani Food Sizzle Promo focusing on authentic desi ghee, sizzling iron karahi, fragrant Karachi dum biryani, and melt-in-mouth BBQ.',
    durationSeconds: 20,
    themeColor: '#dfb743',
    musicGenre: 'Cinematic Royal Tabla & Sitar Rhythm with Sizzling Wok Sound FX',
    targetAudience: 'Family Dinners, Foodies, Weekend Dawat Lovers',
    scriptSummary: 'A sensory 20-second journey through sizzling karahi, royal biryani, and charcoal BBQ at Bahadurabad, Karachi.',
    scenes: [
      {
        id: 1,
        duration: 4,
        title: 'ASLI KHALIS ZAIQA',
        subtitle: 'Authentic Karahi Cooked in Pure Desi Ghee',
        highlightWord: 'ROYAL BITES',
        image: '/images/dish_chicken_karahi.jpg',
        soundFx: 'sizzle',
        narrationUrdu: 'Karachi ki asli lajawab karahi ka maza, sirf Royal Bites par!',
        narrationEnglish: 'Craving authentic Pakistani karahi? Savor the royal taste of Pakistan.',
        badge: 'SCENE 1 • LIVE WOK SIZZLE'
      },
      {
        id: 2,
        duration: 4,
        title: 'DUM BIRYANI KI KHUSHBOO',
        subtitle: 'Aged Basmati Rice Layered with Tender Meat',
        highlightWord: 'KARACHI BIRYANI',
        image: '/images/dish_karachi_biryani.jpg',
        soundFx: 'beat_drop',
        narrationUrdu: 'Khushboo-daar Karachi dum biryani aur khalis desi ghee ke masalay!',
        narrationEnglish: 'Aromatic saffron-infused Karachi dum biryani, simmered to perfection.',
        badge: 'SCENE 2 • ROYAL BIRYANI'
      },
      {
        id: 3,
        duration: 4,
        title: 'KOYLEY KI SMOKEY MEHAK',
        subtitle: 'Charcoal Grilled Seekh Kebabs & Tender Tikka',
        highlightWord: 'CHARCOAL BBQ',
        image: '/images/dish_seekh_kebabs.jpg',
        soundFx: 'bass_drop',
        narrationUrdu: 'Koyley par paki dhuandhar seekh kebabs aur creamy chicken handi!',
        narrationEnglish: 'Charcoal smoked tender seekh kebabs and rich buttery handis.',
        badge: 'SCENE 3 • SMOKEY BBQ'
      },
      {
        id: 4,
        duration: 4,
        title: 'BAHADURABAD KARACHI',
        subtitle: 'Near Char Minar Chowrangi • Shahi Mehmaan-Nawazi',
        highlightWord: 'BAHADURABAD',
        image: '/images/hero_feast.jpg',
        soundFx: 'beat_drop',
        narrationUrdu: 'Bahadurabad Karachi ka shahi zaiqa, ab aap ki har dawat ka hissa!',
        narrationEnglish: 'Located in Bahadurabad, Karachi. Traditional royal hospitality.',
        badge: 'SCENE 4 • LOCATION & AMBIANCE'
      },
      {
        id: 5,
        duration: 4,
        title: 'ORDER ON WHATSAPP NOW',
        subtitle: 'Call / WhatsApp: 0311-0003160 • Live Order Tracking',
        highlightWord: '03110003160',
        image: '/images/signature_experience.jpg',
        soundFx: 'chime',
        narrationUrdu: 'Abhi order karein WhatsApp 0311-0003160 par! Royal Bites Karachi!',
        narrationEnglish: 'Order now on WhatsApp: 03110003160. Fast hot delivery!',
        badge: 'SCENE 5 • CALL TO ACTION'
      }
    ]
  },
  {
    id: 'ad-fast-delivery',
    title: 'Ad 2: Midnight Cravings & 45-Min Fast Delivery',
    urduTitle: 'رات کی بھوک اور 45 منٹ فاسٹ ڈیلیوری',
    concept: 'High-Energy Fast Delivery Promo highlighting instant WhatsApp ordering to 03110003160 and Daraz-style live order progress tracking.',
    durationSeconds: 20,
    themeColor: '#25D366',
    musicGenre: 'High-Energy Urban Beat with Motorbike Revs & WhatsApp Notifications',
    targetAudience: 'Late Night Cravings, Home Delivery, Quick Office Lunch',
    scriptSummary: 'High-octane commercial addressing late-night hunger, fast WhatsApp ordering, and live order tracking in 45 minutes.',
    scenes: [
      {
        id: 1,
        duration: 4,
        title: 'ITNI RAAT KO KYA KHAYEIN?',
        subtitle: 'Late Night Hunger? Craving Something Delicious?',
        highlightWord: 'BHOOK LAGI?',
        image: '/images/dish_chicken_handi.jpg',
        soundFx: 'bass_drop',
        narrationUrdu: 'Raat ke 12 baje bhook lag gayi? Aur dil chahta hai kuch zabardast khana?',
        narrationEnglish: 'Late night cravings? Looking for sizzling fresh desi food?',
        badge: 'SCENE 1 • LATE NIGHT CRAVING'
      },
      {
        id: 2,
        duration: 4,
        title: 'BAS EK WHATSAPP MESSAGE',
        subtitle: 'Send Your Order Directly to 03110003160',
        highlightWord: 'WHATSAPP 03110003160',
        image: '/images/dish_chicken_karahi.jpg',
        soundFx: 'chime',
        narrationUrdu: 'Toh tension choro! Ek WhatsApp message karein 0311-0003160 par!',
        narrationEnglish: 'Simply send your order on WhatsApp to 03110003160.',
        badge: 'SCENE 2 • 1-CLICK ORDER'
      },
      {
        id: 3,
        duration: 4,
        title: 'LIVE ORDER TRACKING',
        subtitle: 'Daraz-Style 5 Stages: Cooking • Packed • With Rider',
        highlightWord: 'LIVE TRACKER',
        image: '/images/dish_chicken_tikka.jpg',
        soundFx: 'beat_drop',
        narrationUrdu: 'Daraz ki tarah apna order live track karein, karahi se lekar delivery tak!',
        narrationEnglish: 'Track your food live as it cooks in the karahi and heads your way!',
        badge: 'SCENE 3 • DARAZ STYLE TRACK'
      },
      {
        id: 4,
        duration: 4,
        title: '45 MINUTES FRESH DELIVERY',
        subtitle: 'Doorstep Delivery Across Bahadurabad & Karachi',
        highlightWord: '45 MINS',
        image: '/images/signature_experience.jpg',
        soundFx: 'motorcycle',
        narrationUrdu: 'Garma-garm khana pohnche ga sirf 45 minutes mein aapki dehleez par!',
        narrationEnglish: 'Piping hot fresh food delivered to your door in just 45 minutes.',
        badge: 'SCENE 4 • FAST RIDER DELIVERY'
      },
      {
        id: 5,
        duration: 4,
        title: 'ORDER KARAIN ABHI',
        subtitle: 'WhatsApp 0311-0003160 • website-eta-ivory-95.vercel.app',
        highlightWord: 'ORDER NOW',
        image: '/images/hero_feast.jpg',
        soundFx: 'chime',
        narrationUrdu: 'Abhi order karein! WhatsApp 0311-0003160. Royal Bites Bahadurabad!',
        narrationEnglish: 'Order right now on WhatsApp 03110003160. Royal Bites Karachi!',
        badge: 'SCENE 5 • FINAL CTA'
      }
    ]
  }
];
