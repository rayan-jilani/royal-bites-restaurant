import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Smartphone,
  Tv,
  MessageCircle,
  Flame,
  Languages
} from 'lucide-react';
import type { AdCampaign, AdScene } from '../data/adsData';
import { adSoundEngine } from '../lib/adSoundEngine';
import { openWhatsAppWithOrder } from '../lib/whatsappService';

interface AdVideoPlayerProps {
  campaign: AdCampaign;
}

export const AdVideoPlayer: React.FC<AdVideoPlayerProps> = ({ campaign }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isVertical, setIsVertical] = useState<boolean>(false); // 16:9 vs 9:16
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [language, setLanguage] = useState<'urdu' | 'english'>('urdu');
  const [sceneProgress, setSceneProgress] = useState<number>(0); // 0 to 100%

  const timerRef = useRef<any>(null);
  const currentScene: AdScene = campaign.scenes[currentSceneIdx];

  // Trigger audio & voiceover when a scene becomes active
  const triggerSceneAudio = (scene: AdScene) => {
    if (isMuted) return;

    // 1. Play synthesized Sound Effect
    if (scene.soundFx === 'sizzle') {
      adSoundEngine.playSizzle(3.0);
    } else if (scene.soundFx === 'bass_drop') {
      adSoundEngine.playBassDrop(2.0);
    } else if (scene.soundFx === 'beat_drop') {
      adSoundEngine.playBeatDrop();
    } else if (scene.soundFx === 'chime') {
      adSoundEngine.playChime();
    } else if (scene.soundFx === 'motorcycle') {
      adSoundEngine.playMotorcycle(2.2);
    }

    // 2. Play Voiceover Narration
    const narrationText = language === 'urdu' ? scene.narrationUrdu : scene.narrationEnglish;
    setTimeout(() => {
      adSoundEngine.speak(narrationText, language === 'urdu' ? 'ur-PK' : 'en-US');
    }, 150);
  };

  // Main playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      adSoundEngine.stopAll();
      return;
    }

    // Scene transition interval
    const sceneDurationMs = currentScene.duration * 1000;
    const intervalTickMs = 50;
    let elapsed = 0;

    triggerSceneAudio(currentScene);

    timerRef.current = setInterval(() => {
      elapsed += intervalTickMs;
      const progressPercent = Math.min(100, (elapsed / sceneDurationMs) * 100);
      setSceneProgress(progressPercent);

      if (elapsed >= sceneDurationMs) {
        elapsed = 0;
        setSceneProgress(0);

        setCurrentSceneIdx((prev) => {
          if (prev < campaign.scenes.length - 1) {
            const nextIdx = prev + 1;
            triggerSceneAudio(campaign.scenes[nextIdx]);
            return nextIdx;
          } else {
            // Reached end of 20-second commercial
            setIsPlaying(false);
            return 0;
          }
        });
      }
    }, intervalTickMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSceneIdx, campaign.id, isMuted, language]);

  // Handle Play/Pause
  const handleTogglePlay = () => {
    if (!isPlaying) {
      adSoundEngine.setMuted(isMuted);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  // Handle Reset / Replay
  const handleReplay = () => {
    setCurrentSceneIdx(0);
    setSceneProgress(0);
    adSoundEngine.stopAll();
    setIsPlaying(true);
    triggerSceneAudio(campaign.scenes[0]);
  };

  // Handle Mute Toggle
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    adSoundEngine.setMuted(nextMuted);
  };

  // Direct WhatsApp dispatch helper
  const handleDirectWhatsApp = () => {
    const sampleTracked: any = {
      orderId: 'RB-PROMO',
      customerName: 'Commercial Ad Viewer',
      phone: '03110003160',
      address: 'Bahadurabad, Karachi',
      items: [{ name: 'Chicken Karahi (Full)', quantity: 1, unitPrice: 1850, lineTotal: 1850 }],
      subtotal: 1850,
      deliveryFee: 150,
      total: 2000,
      createdAt: 'Just Now',
      currentStageIndex: 1,
      riderName: 'Farhan Ali',
      riderPhone: '+92 311 0003160',
      estimatedArrivalMinutes: 45,
    };
    openWhatsAppWithOrder(sampleTracked);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Toolbar (Aspect Ratio, Language, Audio Indicator) */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
        <div className="flex items-center space-x-2">
          {/* Format Switcher */}
          <button
            onClick={() => setIsVertical(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              !isVertical
                ? 'bg-gold-gradient text-[#08110b] shadow-md'
                : 'bg-[#091f14] text-[#a29b8c] hover:text-white border border-[#c59b27]/20'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>16:9 Landscape (TV / YouTube)</span>
          </button>

          <button
            onClick={() => setIsVertical(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              isVertical
                ? 'bg-gold-gradient text-[#08110b] shadow-md'
                : 'bg-[#091f14] text-[#a29b8c] hover:text-white border border-[#c59b27]/20'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>9:16 Vertical (Reels / TikTok / Status)</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'urdu' ? 'english' : 'urdu')}
            className="px-3 py-1.5 rounded-lg bg-[#091f14] border border-[#c59b27]/30 text-xs font-medium text-[#dfb743] hover:bg-[#123623] flex items-center space-x-1.5 cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>Voice: {language === 'urdu' ? 'Urdu (اردو)' : 'English'}</span>
          </button>

          {/* Mute Button */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-lg text-xs font-medium flex items-center justify-center transition-all cursor-pointer ${
              isMuted
                ? 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
                : 'bg-[#091f14] border border-[#c59b27]/30 text-[#dfb743]'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Video Viewport (Cinematic Screen) */}
      <div
        className={`relative overflow-hidden rounded-3xl border-2 border-[#dfb743]/50 shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-black transition-all duration-500 ${
          isVertical ? 'w-full max-w-sm aspect-[9/16]' : 'w-full max-w-4xl aspect-[16/9]'
        }`}
      >
        {/* Background Image with Ken Burns Zoom Effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={currentScene.image}
              alt={currentScene.title}
              className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#051108]/30 to-black/80" />
          </motion.div>
        </AnimatePresence>

        {/* Top Watermark Badge & Sound Equalizer */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#c59b27]/40">
            <Flame className="w-3.5 h-3.5 text-[#dfb743] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-gradient">
              ROYAL BITES
            </span>
          </div>

          {/* Equalizer animation when playing */}
          <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            {[0.4, 0.9, 0.6, 1.0, 0.7].map((height, idx) => (
              <span
                key={idx}
                className={`w-1 bg-[#dfb743] rounded-full transition-all duration-300 ${
                  isPlaying && !isMuted ? 'animate-bounce' : 'h-2'
                }`}
                style={{
                  height: isPlaying && !isMuted ? `${height * 16}px` : '4px',
                  animationDelay: `${idx * 0.15}s`,
                }}
              />
            ))}
            <span className="text-[9px] uppercase tracking-wider text-[#dfb743] ml-1 font-bold">
              {isMuted ? 'MUTED' : 'AUDIO SYNC'}
            </span>
          </div>
        </div>

        {/* Center Kinetic Typography & Motion Graphics (Brag Style) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ y: 35, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -30, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-xl space-y-3"
            >
              {/* Scene Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-[#123623]/80 border border-[#dfb743]/60 text-[10px] uppercase tracking-[0.25em] text-[#dfb743] font-bold shadow-lg">
                {currentScene.badge}
              </div>

              {/* Huge Kinetic Headline */}
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#faf6eb] tracking-tight drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] uppercase leading-tight">
                {currentScene.title}
              </h2>

              {/* Punchy Subtitle */}
              <p className="text-sm sm:text-base md:text-lg text-[#ded7c8] font-medium drop-shadow-md max-w-md mx-auto">
                {currentScene.subtitle}
              </p>

              {/* Glowing Highlight Pill */}
              <div className="pt-2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-gold-gradient text-[#08110b] font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.7)] animate-pulse">
                  {currentScene.highlightWord}
                </span>
              </div>

              {/* Narration Subtitle in Urdu/English */}
              <div className="pt-3 max-w-lg mx-auto">
                <p className="text-xs sm:text-sm text-[#fffae6] bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 font-semibold italic">
                  "{language === 'urdu' ? currentScene.narrationUrdu : currentScene.narrationEnglish}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Big Center Play Button Overlay when paused */}
        {!isPlaying && (
          <div
            onClick={handleTogglePlay}
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer z-30 transition-all hover:bg-black/40"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-gold-gradient text-[#08110b] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.8)] border-4 border-white/20"
            >
              <Play className="w-9 h-9 fill-current ml-1" />
            </motion.div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-white mt-4 bg-black/80 px-4 py-1.5 rounded-full border border-[#c59b27]/40 shadow-lg">
              Click to Play Ad With Sound (آواز کے ساتھ سنیں)
            </span>
          </div>
        )}

        {/* Bottom Interactive Control Bar inside player */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-20 space-y-3">
          {/* Scene Scrubber / Progress Bar */}
          <div
            className="gap-1.5 w-full grid"
            style={{ gridTemplateColumns: `repeat(${campaign.scenes.length}, minmax(0, 1fr))` }}
          >
            {campaign.scenes.map((sc, idx) => {
              const isPast = idx < currentSceneIdx;
              const isCur = idx === currentSceneIdx;

              return (
                <div
                  key={sc.id}
                  onClick={() => {
                    setCurrentSceneIdx(idx);
                    setSceneProgress(0);
                    triggerSceneAudio(sc);
                  }}
                  className="h-1.5 rounded-full bg-white/20 overflow-hidden cursor-pointer relative"
                  title={`Jump to Scene ${idx + 1}`}
                >
                  {isPast && <div className="h-full w-full bg-gold-gradient" />}
                  {isCur && (
                    <div
                      className="h-full bg-gold-gradient transition-all duration-75"
                      style={{ width: `${sceneProgress}%` }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Media Controls Row */}
          <div className="flex items-center justify-between text-xs text-[#faf6eb]">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleTogglePlay}
                className="p-2 rounded-full bg-gold-gradient text-[#08110b] font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleReplay}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                title="Replay from Beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-mono font-medium text-[#c59b27]">
                Scene {currentSceneIdx + 1} / {campaign.scenes.length} ({Math.round(
                  campaign.scenes.slice(0, currentSceneIdx).reduce((acc, s) => acc + s.duration, 0) +
                  (currentScene.duration * (sceneProgress / 100))
                )}s / {campaign.durationSeconds}s)
              </span>
            </div>

            {/* Direct Order on WhatsApp in Ad */}
            <button
              onClick={handleDirectWhatsApp}
              className="px-3.5 py-1.5 rounded-full bg-[#25D366] text-[#04160b] font-bold text-[11px] uppercase tracking-wider flex items-center space-x-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Order 03110003160</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
