import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Film,
  Copy,
  Check,
  Flame,
  Bike
} from 'lucide-react';
import { RESTAURANT_ADS, type AdCampaign } from '../data/adsData';
import { AdVideoPlayer } from '../components/AdVideoPlayer';

export const AdsPage: React.FC = () => {
  const [selectedAdId, setSelectedAdId] = useState<string>(RESTAURANT_ADS[0].id);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const activeCampaign: AdCampaign =
    RESTAURANT_ADS.find((ad) => ad.id === selectedAdId) || RESTAURANT_ADS[0];

  const handleCopyScript = () => {
    const fullScript = `👑 ROYAL BITES COMMERCIAL SCRIPT (${activeCampaign.title})
Target Audience: ${activeCampaign.targetAudience}
Audio & Sound: ${activeCampaign.musicGenre}

SCENE BREAKDOWN:
${activeCampaign.scenes
  .map(
    (s) =>
      `[Scene ${s.id} - ${s.duration}s]
Visual: ${s.title} (${s.subtitle})
Sound FX: ${s.soundFx.toUpperCase()}
Urdu Voiceover: "${s.narrationUrdu}"
English Voiceover: "${s.narrationEnglish}"`
  )
  .join('\n\n')}

Order Contact: WhatsApp 03110003160 | Bahadurabad, Karachi
Website: https://website-eta-ivory-95.vercel.app`;

    navigator.clipboard.writeText(fullScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  return (
    <div className="pt-28 pb-24 bg-[#050e07] min-h-screen text-[#ede7dc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 bg-[#0c2217]/60 mb-4"
          >
            <Film className="w-3.5 h-3.5 text-[#dfb743]" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-gradient font-semibold">
              Commercial Ad Studio (Powered by Brag Architecture)
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-bold text-[#faf6eb] mb-4"
          >
            Royal Bites Video Commercials
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#b8b09f]"
          >
            Professional 20-second cinematic video advertisements with synchronized sound effects (sizzling karahi, sub-bass drops, tabla rhythm) and voiceover narration.
          </motion.p>
        </div>

        {/* Campaign Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          {RESTAURANT_ADS.map((ad, idx) => {
            const isSelected = ad.id === selectedAdId;
            return (
              <button
                key={ad.id}
                onClick={() => setSelectedAdId(ad.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center space-x-2.5 ${
                  isSelected
                    ? 'bg-gold-gradient text-[#08110b] shadow-[0_10px_30px_rgba(212,175,55,0.4)] scale-105'
                    : 'bg-[#091f14] text-[#ccc5b6] hover:text-white border border-[#c59b27]/30 hover:bg-[#123624]'
                }`}
              >
                {idx === 0 ? <Flame className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
                <div className="text-left">
                  <div className="leading-tight">{ad.title}</div>
                  <div className={`text-[10px] font-normal ${isSelected ? 'text-[#332a12]' : 'text-[#8e8777]'}`}>
                    {ad.urduTitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Video Player Display Container */}
        <div className="mb-14">
          <AdVideoPlayer campaign={activeCampaign} />
        </div>

        {/* Campaign Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-5 rounded-2xl bg-[#081910] border border-[#c59b27]/25 shadow-lg space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#dfb743] block">
              Audio & Sound Effects
            </span>
            <h4 className="text-sm font-bold text-[#faf6eb]">Synthesized Wok Sizzle & Beats</h4>
            <p className="text-xs text-[#a29b8c]">
              Procedural Web Audio API sound FX: Karahi oil sizzle, cinematic sub-bass sweeps, tabla groove, and delivery chimes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#081910] border border-[#c59b27]/25 shadow-lg space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#dfb743] block">
              Target Audience
            </span>
            <h4 className="text-sm font-bold text-[#faf6eb]">{activeCampaign.targetAudience}</h4>
            <p className="text-xs text-[#a29b8c]">
              Tailored for food enthusiasts in Bahadurabad & Karachi, family dawat planners, and late-night foodies.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#081910] border border-[#c59b27]/25 shadow-lg space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#dfb743] block">
              Formats Supported
            </span>
            <h4 className="text-sm font-bold text-[#faf6eb]">16:9 Landscape & 9:16 Vertical</h4>
            <p className="text-xs text-[#a29b8c]">
              Switch formats with 1 click for YouTube Ads, TV screens, Instagram Reels, TikTok, and WhatsApp Status.
            </p>
          </div>
        </div>

        {/* Storyboard & Scene Breakdown */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#081a11] border border-[#c59b27]/30 shadow-2xl mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#c59b27]/20 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-gradient font-bold block mb-1">
                COMMERCIAL STORYBOARD & SCRIPT
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#faf6eb]">
                {activeCampaign.title}
              </h3>
              <p className="text-xs text-[#a29b8c] mt-0.5">
                Exact second-by-second breakdown of visuals, sound FX, and voiceover copy.
              </p>
            </div>

            <button
              onClick={handleCopyScript}
              className="px-4 py-2.5 rounded-xl bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer self-start sm:self-center shrink-0"
            >
              {copiedScript ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedScript ? 'Script Copied!' : 'Copy Script for Ads'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {activeCampaign.scenes.map((scene) => (
              <div
                key={scene.id}
                className="p-4 rounded-2xl bg-[#051108] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#c59b27]/30"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-0.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#102d1d] text-[#dfb743] font-bold">
                        Scene {scene.id} ({scene.duration}s)
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#8e8777]">
                        FX: {scene.soundFx.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#faf6eb]">{scene.title}</h4>
                    <p className="text-xs text-[#a29b8c]">{scene.subtitle}</p>
                  </div>
                </div>

                <div className="md:max-w-md bg-[#08180f] p-3 rounded-xl border border-[#c59b27]/15">
                  <span className="text-[10px] uppercase font-bold text-[#c59b27] block mb-1">
                    Voiceover (صوتی آواز):
                  </span>
                  <p className="text-xs text-[#ded7c8] italic">"{scene.narrationUrdu}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
