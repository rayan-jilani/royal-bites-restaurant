import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { adSoundEngine } from '../lib/adSoundEngine';

export interface WebsiteStep {
  id: number;
  timeRange: string;
  duration: number;
  pageName: string;
  pageRoute: string;
  stepTitle: string;
  urduTitle: string;
  headline: string;
  description: string;
  features: string[];
  mockupImage: string;
  soundFx: 'beat_drop' | 'sizzle' | 'bass_drop' | 'chime' | 'motorcycle';
  narrationUrdu: string;
  narrationEnglish: string;
}

export const WEBSITE_WALKTHROUGH_STEPS: WebsiteStep[] = [
  {
    id: 1,
    timeRange: '0:00 - 0:10',
    duration: 10,
    pageName: 'Home Page (ہوم پیج)',
    pageRoute: '/',
    stepTitle: 'Step 1: Luxury Branding & Hero Screen',
    urduTitle: 'شاہی دسترخوان اور لگژری برانڈنگ',
    headline: 'EMERALD & GOLD ROYAL THEME',
    description: 'Generational culinary heritage, authentic food visuals, and mobile navigation.',
    features: [
      'Brand Identity: Royal Bites — The Royal Taste of Pakistan',
      'Location: Bahadurabad (Near Char Minar Chowrangi), Karachi',
      'Direct WhatsApp Ordering (0311-0003160)',
      'Smooth scroll animations powered by Framer Motion'
    ],
    mockupImage: '/images/hero_feast.jpg',
    soundFx: 'beat_drop',
    narrationUrdu: 'Welcome to Royal Bites! Step 1 par hamari luxury home screen hai jahan Bahadurabad Karachi ka shaahi zaiqa aur shandaar branding display hoti hai.',
    narrationEnglish: 'Welcome to Royal Bites! Step 1 features our luxury emerald and gold culinary homepage.'
  },
  {
    id: 2,
    timeRange: '0:10 - 0:20',
    duration: 10,
    pageName: 'Menu Page (مینو پیج)',
    pageRoute: '/menu',
    stepTitle: 'Step 2: Interactive Menu & Live Category Filter',
    urduTitle: 'انٹرایکٹو مینو اور لائیو فلٹرنگ',
    headline: 'AUTHENTIC RECIPES & HD DISH PHOTOGRAPHY',
    description: 'Live category tabs for Karahi, Biryani, Handi, BBQ, and Tandoori Breads in PKR.',
    features: [
      'Instant Category Tabs: Karahi, Biryani, BBQ, Handi, Naans',
      'Instant Search Bar for fast dish lookup',
      'Realistic HD dish photography with authentic ingredients',
      '1-Click Add to Cart with live subtotal calculation'
    ],
    mockupImage: '/images/dish_chicken_karahi.jpg',
    soundFx: 'sizzle',
    narrationUrdu: 'Step 2 par aata hai hamara Interactive Menu! Desi ghee karahi, dum biryani aur BBQ dishes ko aap 1-click mein search aur cart mein add kar sakte hain.',
    narrationEnglish: 'Step 2 is our interactive food menu with fast categories and instant cart additions.'
  },
  {
    id: 3,
    timeRange: '0:20 - 0:30',
    duration: 10,
    pageName: 'Cart & Online Order (آن لائن آرڈر)',
    pageRoute: '/order',
    stepTitle: 'Step 3: Cart Drawer & Direct WhatsApp Checkout',
    urduTitle: 'کارٹ سسٹم اور واٹس ایپ آرڈر ڈسپیچ',
    headline: 'INSTANT 1-CLICK CHECKOUT (NO LOGIN NEEDED)',
    description: 'Side drawer, item quantity adjusters, subtotal + delivery fee, and automated WhatsApp order.',
    features: [
      'Real-time quantity increments (+ / -) & dynamic billing',
      'Automatic Delivery fee calculation (PKR 150)',
      'Pre-formatted WhatsApp order dispatch to 0311-0003160',
      'Instant unique Order ID generation'
    ],
    mockupImage: '/images/dish_karachi_biryani.jpg',
    soundFx: 'chime',
    narrationUrdu: 'Step 3 hai Cart aur Online Order! Bag drawer khulta hai, bill calculate hota hai aur order seedha 0311-0003160 WhatsApp par dispatch ho jata hai.',
    narrationEnglish: 'Step 3 is the smooth cart drawer and automated WhatsApp dispatch.'
  },
  {
    id: 4,
    timeRange: '0:30 - 0:40',
    duration: 10,
    pageName: 'Order Tracker (آرڈر ٹریکنگ)',
    pageRoute: '/track',
    stepTitle: 'Step 4: Daraz-Style 5-Stage Live Order Tracker',
    urduTitle: 'دراز کی طرح 5 اسٹیجز لائیو آرڈر ٹریکر',
    headline: 'LIVE COOKING TO DOORSTEP PROGRESSION',
    description: 'Customers watch their food progress live across 5 real-time preparation and delivery stages.',
    features: [
      '5 Real-time Stages: Cooking • Quality Packed • Out With Rider',
      'Live Estimated Arrival countdown timer (45 Minutes)',
      'Assigned Rider profile with direct call and WhatsApp button',
      'Daraz-style animated progress pulse indicator'
    ],
    mockupImage: '/images/dish_chicken_tikka.jpg',
    soundFx: 'motorcycle',
    narrationUrdu: 'Step 4 sab se zabardast feature hai: Daraz-style 5 stages live order tracking! Karahi pakne se lekar rider ke pohanchne tak sab kuch live nazar aata hai.',
    narrationEnglish: 'Step 4 is our Daraz-style live order tracking from wok to doorstep.'
  },
  {
    id: 5,
    timeRange: '0:40 - 0:50',
    duration: 10,
    pageName: 'Admin & Kitchen (کچن ڈیش بورڈ)',
    pageRoute: '/admin',
    stepTitle: 'Step 5: Restaurant Kitchen Management Portal',
    urduTitle: 'ریستوران کا اپنا ایڈمن و کچن کنٹرول پینل',
    headline: 'LIVE KITCHEN PIPELINE & REVENUE ANALYTICS',
    description: 'Backend portal for restaurant kitchen staff to advance order stages and assign riders.',
    features: [
      'Kitchen Order Pipeline with 1-click status advance buttons',
      'Daily Revenue & Active Orders statistics cards',
      'Rider assignment and dispatch console',
      'Instant audio chime upon new incoming orders'
    ],
    mockupImage: '/images/dish_chicken_handi.jpg',
    soundFx: 'beat_drop',
    narrationUrdu: 'Step 5 hai hamara Kitchen Admin Dashboard! Yahan restaurant staff aik click se order ka status badalta hai aur rider assign karta hai.',
    narrationEnglish: 'Step 5 features the restaurant kitchen management dashboard.'
  },
  {
    id: 6,
    timeRange: '0:50 - 1:00',
    duration: 10,
    pageName: 'Contact & Location (لوکیشن و رابطہ)',
    pageRoute: '/contact',
    stepTitle: 'Step 6: Location & High-Speed Vercel Hosting',
    urduTitle: 'بہادرآباد لوکیشن، ورسل ہوسٹنگ اور گٹ ہب',
    headline: 'LIVE ON VERCEL & GITHUB IN BAHADURABAD',
    description: 'Google Maps address, live inquiry form, 100% mobile responsive and global CDN.',
    features: [
      'Exact Address: Near Char Minar Chowrangi, Bahadurabad, Karachi',
      'Interactive Contact Form & Table Booking',
      'Live Vercel Deployment & Automatic CI/CD with GitHub',
      'High-Speed CDN load time under 1 second'
    ],
    mockupImage: '/images/signature_experience.jpg',
    soundFx: 'chime',
    narrationUrdu: 'Aakhri step: Bahadurabad Karachi ki location, table booking aur super-fast Vercel deployment! Poori website 100 percent live aur active hai.',
    narrationEnglish: 'Step 6 concludes with our Bahadurabad location, table reservations, and high-speed Vercel hosting.'
  }
];

export const WebsiteWalkthroughTour: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [stepProgress, setStepProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [language, setLanguage] = useState<'urdu' | 'english'>('urdu');

  const timerRef = useRef<any>(null);
  const currentStep = WEBSITE_WALKTHROUGH_STEPS[currentStepIdx];

  const triggerAudioForStep = (step: WebsiteStep) => {
    if (isMuted) return;

    if (step.soundFx === 'beat_drop') adSoundEngine.playBeatDrop();
    else if (step.soundFx === 'sizzle') adSoundEngine.playSizzle(2.5);
    else if (step.soundFx === 'bass_drop') adSoundEngine.playBassDrop(1.8);
    else if (step.soundFx === 'chime') adSoundEngine.playChime();
    else if (step.soundFx === 'motorcycle') adSoundEngine.playMotorcycle(2.0);

    const narration = language === 'urdu' ? step.narrationUrdu : step.narrationEnglish;
    setTimeout(() => {
      adSoundEngine.speak(narration, language === 'urdu' ? 'ur-PK' : 'en-US');
    }, 180);
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      adSoundEngine.stopAll();
      return;
    }

    const durationMs = currentStep.duration * 1000;
    const intervalTickMs = 50;
    let elapsed = 0;

    triggerAudioForStep(currentStep);

    timerRef.current = setInterval(() => {
      elapsed += intervalTickMs;
      const progressPercent = Math.min(100, (elapsed / durationMs) * 100);
      setStepProgress(progressPercent);

      if (elapsed >= durationMs) {
        elapsed = 0;
        setStepProgress(0);

        setCurrentStepIdx((prev) => {
          if (prev < WEBSITE_WALKTHROUGH_STEPS.length - 1) {
            const nextIdx = prev + 1;
            triggerAudioForStep(WEBSITE_WALKTHROUGH_STEPS[nextIdx]);
            return nextIdx;
          } else {
            setIsPlaying(false);
            return 0;
          }
        });
      }
    }, intervalTickMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentStepIdx, isMuted, language]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      adSoundEngine.setMuted(isMuted);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handleReplay = () => {
    setCurrentStepIdx(0);
    setStepProgress(0);
    adSoundEngine.stopAll();
    setIsPlaying(true);
    triggerAudioForStep(WEBSITE_WALKTHROUGH_STEPS[0]);
  };

  const totalSecondsElapsed = Math.round(
    currentStepIdx * 10 + (stepProgress / 100) * 10
  );

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Top Banner Toolbar */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 px-2">
        <div className="flex items-center space-x-3">
          <div className="px-3.5 py-1.5 rounded-full bg-[#0d291b] border border-[#dfb743]/50 text-gold-gradient text-xs font-bold uppercase tracking-wider flex items-center space-x-2">
            <Laptop className="w-3.5 h-3.5 text-[#dfb743]" />
            <span>1-Minute Full Website Video Walkthrough (پوری ویب سائٹ کا جائزہ)</span>
          </div>
          <span className="text-xs font-mono text-[#a29b8c]">
            {totalSecondsElapsed}s / 60s
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setLanguage(language === 'urdu' ? 'english' : 'urdu')}
            className="px-3 py-1.5 rounded-xl bg-[#091f14] border border-[#c59b27]/30 text-xs font-semibold text-[#dfb743] hover:bg-[#123623] cursor-pointer"
          >
            Voice: {language === 'urdu' ? 'Urdu (اردو)' : 'English'}
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              adSoundEngine.setMuted(!isMuted);
            }}
            className="p-2 rounded-xl bg-[#091f14] border border-[#c59b27]/30 text-[#dfb743] cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Screen Video Player */}
      <div className="relative w-full max-w-5xl aspect-[16/9] rounded-3xl overflow-hidden border-2 border-[#dfb743] bg-[#030905] shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between"
          >
            {/* Simulated Browser URL bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-[#a29b8c]">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="font-mono text-[11px] text-[#dfb743] pl-2 hidden sm:inline">
                  https://website-eta-ivory-95.vercel.app{currentStep.pageRoute}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#0e2c1c] text-emerald-400 font-bold text-[10px]">
                  LIVE ON VERCEL
                </span>
                <span className="text-[10px] text-white/70 font-mono">
                  {currentStep.timeRange}
                </span>
              </div>
            </div>

            {/* Split Screen Mockup & Explainer */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto">
              <div className="md:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden border border-[#dfb743]/50 shadow-2xl bg-black aspect-[16/10]">
                  <img
                    src={currentStep.mockupImage}
                    alt={currentStep.stepTitle}
                    className="w-full h-full object-cover filter brightness-[0.75]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#dfb743]/50 text-[10px] font-bold text-gold-gradient uppercase tracking-widest">
                    {currentStep.pageName}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#faf6eb] mb-1">
                      <span>{currentStep.headline}</span>
                      <span className="text-[#dfb743] font-mono text-[10px]">{currentStep.pageRoute}</span>
                    </div>
                    <p className="text-[11px] text-[#ccc4b3] line-clamp-2">{currentStep.description}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 space-y-3.5 text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#102d1d] border border-[#dfb743]/60 text-[#dfb743] text-[11px] font-bold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentStep.stepTitle}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#faf6eb] leading-tight">
                  {currentStep.urduTitle}
                </h2>

                <div className="space-y-2 bg-[#06170e]/80 p-3.5 rounded-2xl border border-[#c59b27]/25">
                  <span className="text-[10px] uppercase font-bold text-[#dfb743] tracking-wider block">
                    Key Functionalities Tested & Working:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#ded7c8]">
                    {currentStep.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-xl bg-black/80 border border-white/10 text-xs text-[#faf6eb] font-semibold italic">
                  "{language === 'urdu' ? currentStep.narrationUrdu : currentStep.narrationEnglish}"
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-[#a29b8c]">
              <span className="font-bold text-[#dfb743]">
                STEP {currentStep.id} OF 6 ({currentStep.pageName})
              </span>
              <span className="font-mono text-emerald-400">
                Bahadurabad Karachi • 0311-0003160
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Center Play Overlay */}
        {!isPlaying && (
          <div
            onClick={handleTogglePlay}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer z-30 transition-all hover:bg-black/50"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-gold-gradient text-[#08110b] flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.9)] border-4 border-white/20"
            >
              <Play className="w-9 h-9 fill-current ml-1" />
            </motion.div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-white mt-4 bg-black/80 px-4 py-1.5 rounded-full border border-[#c59b27]/40 shadow-lg">
              Click to Play 1-Minute Website Video Tour (آواز کے ساتھ سنیں)
            </span>
          </div>
        )}

        {/* Scrubber and Media Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent z-20 space-y-3">
          <div className="grid grid-cols-6 gap-2 w-full">
            {WEBSITE_WALKTHROUGH_STEPS.map((step, idx) => {
              const isPast = idx < currentStepIdx;
              const isCur = idx === currentStepIdx;

              return (
                <div
                  key={step.id}
                  onClick={() => {
                    setCurrentStepIdx(idx);
                    setStepProgress(0);
                    triggerAudioForStep(step);
                  }}
                  className="h-1.5 rounded-full bg-white/20 overflow-hidden cursor-pointer relative"
                  title={`Jump to Step ${idx + 1}`}
                >
                  {isPast && <div className="h-full w-full bg-gold-gradient" />}
                  {isCur && (
                    <div
                      className="h-full bg-gold-gradient transition-all duration-75"
                      style={{ width: `${stepProgress}%` }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#faf6eb]">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleTogglePlay}
                className="p-2 rounded-full bg-gold-gradient text-[#08110b] font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleReplay}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-mono font-medium text-[#c59b27]">
                Step {currentStepIdx + 1}/6: {currentStep.pageName} ({totalSecondsElapsed}s / 60s)
              </span>
            </div>

            <a
              href={`https://website-eta-ivory-95.vercel.app${currentStep.pageRoute}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#0e2d1d] border border-[#c59b27]/40 text-[#dfb743] hover:text-white hover:bg-[#15422b] font-semibold text-[11px] uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>Visit This Page Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Steps Quick Selector */}
      <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {WEBSITE_WALKTHROUGH_STEPS.map((step, idx) => {
          const isActive = idx === currentStepIdx;
          return (
            <button
              key={step.id}
              onClick={() => {
                setCurrentStepIdx(idx);
                setStepProgress(0);
                triggerAudioForStep(step);
              }}
              className={`p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                isActive
                  ? 'bg-gold-gradient text-[#08110b] border-[#dfb743] shadow-[0_4px_20px_rgba(212,175,55,0.4)] scale-105'
                  : 'bg-[#081910] text-[#ccc5b6] border-white/5 hover:border-[#dfb743]/40'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                <span>STEP {step.id}</span>
                <span>{step.duration}s</span>
              </div>
              <div className="font-bold text-xs truncate">{step.pageName}</div>
              <div className={`text-[10px] truncate ${isActive ? 'text-[#2e260e]' : 'text-[#8e8777]'}`}>
                {step.pageRoute}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};