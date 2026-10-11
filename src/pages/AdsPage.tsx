import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Film,
  Copy,
  Check,
  Flame,
  Bike,
  MessageCircle,
  Tag,
  Smartphone,
  Zap
} from 'lucide-react';
import { RESTAURANT_ADS, SOCIAL_POSTS, type AdCampaign, type SocialMediaPost } from '../data/adsData';
import { AdVideoPlayer } from '../components/AdVideoPlayer';
import { openBufferPublisher } from '../lib/bufferService';

export const AdsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'posts'>('videos');
  const [selectedAdId, setSelectedAdId] = useState<string>(RESTAURANT_ADS[0].id);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [bufferStatus, setBufferStatus] = useState<string>('');

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

  const handleCopyPostCaption = (post: SocialMediaPost) => {
    navigator.clipboard.writeText(post.caption);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 3000);
  };

  const handlePublishToBuffer = (post: SocialMediaPost) => {
    openBufferPublisher(post);
    setBufferStatus(`Opening Buffer for "${post.title}" — Publishing to Facebook & TikTok!`);
    setTimeout(() => setBufferStatus(''), 4500);
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
              Marketing & Ads Studio (Brag Architecture)
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-bold text-[#faf6eb] mb-4"
          >
            Commercial Ads & Posts Studio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#b8b09f]"
          >
            20-second cinematic video commercials with real sound effects & voiceover, plus ready-to-publish social media deal posts!
          </motion.p>
        </div>

        {/* Master Navigation: Video Ads vs Social Media Posts */}
        <div className="flex justify-center mb-10">
          <div className="p-1 rounded-2xl bg-[#091f14] border border-[#c59b27]/30 flex space-x-1 shadow-xl">
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'videos'
                  ? 'bg-gold-gradient text-[#08110b] shadow-lg'
                  : 'text-[#a29b8c] hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Video Commercials (20s With Sound)</span>
            </button>

            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'posts'
                  ? 'bg-gold-gradient text-[#08110b] shadow-lg'
                  : 'text-[#a29b8c] hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Social Media Posts & Deals (سوشل میڈیا پوسٹس)</span>
            </button>
          </div>
        </div>

        {/* SECTION 1: VIDEO COMMERCIALS */}
        {activeTab === 'videos' && (
          <div className="space-y-12 animate-fadeIn">
            {/* Campaign Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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

            {/* Video Player Display */}
            <div>
              <AdVideoPlayer campaign={activeCampaign} />
            </div>

            {/* Campaign Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className="p-6 sm:p-8 rounded-3xl bg-[#081a11] border border-[#c59b27]/30 shadow-2xl">
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
        )}

        {/* SECTION 2: SOCIAL MEDIA POSTS & GRAPHICS STUDIO */}
        {activeTab === 'posts' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#dfb743] block mb-1">
                INSTAGRAM • FACEBOOK • TIKTOK • WHATSAPP STATUS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#faf6eb]">
                Ready-to-Publish Promotional Posts
              </h2>
              <p className="text-xs sm:text-sm text-[#a29b8c] mt-1">
                High-converting promotional deal cards. Post to Facebook & TikTok simultaneously via Buffer with 1 click!
              </p>
            </div>

            {/* Buffer Automation Info Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0c2438] via-[#091b1f] to-[#06180f] border border-[#00f2fe]/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#00f2fe]/20 border border-[#00f2fe]/50 flex items-center justify-center shrink-0 text-[#00f2fe]">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#00f2fe] uppercase font-bold block">
                    BUFFER MULTI-CHANNEL AUTOMATION
                  </span>
                  <h4 className="text-sm font-bold text-[#faf6eb]">
                    Publish to Facebook & TikTok at the Same Time (ایک ساتھ پوسٹ کریں)
                  </h4>
                  <p className="text-xs text-[#a29b8c]">
                    Click "Post to Facebook & TikTok (via Buffer)" to immediately load the caption, image, and link into Buffer and publish to both networks at once.
                  </p>
                </div>
              </div>

              {bufferStatus && (
                <div className="px-3.5 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-pulse shrink-0">
                  {bufferStatus}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {SOCIAL_POSTS.map((post) => {
                const isCopied = copiedPostId === post.id;
                return (
                  <div
                    key={post.id}
                    className="rounded-3xl bg-[#091b12] border-2 border-[#dfb743]/50 shadow-2xl overflow-hidden flex flex-col justify-between"
                  >
                    {/* Post Graphic Preview (Square 1:1 Aspect Mockup) */}
                    <div className="relative aspect-square w-full overflow-hidden bg-black group">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover filter brightness-[0.75] group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

                      {/* Post Watermark Top */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#c59b27]/40 text-[9px] font-bold text-[#dfb743] tracking-widest uppercase">
                          ROYAL BITES
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[9px] font-bold uppercase tracking-wider shadow-lg">
                          {post.badge}
                        </span>
                      </div>

                      {/* Post Center Graphic Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10 pointer-events-none">
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#dfb743] mb-1">
                          {post.tagline}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-black text-white uppercase drop-shadow-lg leading-tight">
                          {post.title}
                        </h3>
                        <div className="mt-2 text-xs font-bold text-amber-200">
                          {post.urduTitle}
                        </div>

                        {/* Price Tag Pill */}
                        <div className="mt-3 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/85 border border-[#dfb743] shadow-xl">
                          <span className="text-xs line-through text-gray-400 font-medium">
                            {post.originalPrice}
                          </span>
                          <span className="font-royal-brand text-base font-bold text-gold-gradient">
                            {post.dealPrice}
                          </span>
                        </div>
                      </div>

                      {/* Post Bottom Footer inside preview */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none text-[10px] text-white/90 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10">
                        <span>📍 Bahadurabad, Karachi</span>
                        <span className="font-mono text-emerald-400 font-bold">📲 0311-0003160</span>
                      </div>
                    </div>

                    {/* Deal Contents List */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#dfb743] flex items-center space-x-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Deal Inclusions:</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#ded7c8]">
                          {post.items.map((item, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#dfb743]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons: Buffer Publish, Copy Caption & WhatsApp Order */}
                      <div className="pt-3 border-t border-[#c59b27]/20 space-y-2">
                        {/* 1-Click Buffer Publish Button */}
                        <button
                          onClick={() => handlePublishToBuffer(post)}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#2c7bf6] via-[#00f2fe] to-[#2c7bf6] text-[#051108] font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_4px_18px_rgba(0,242,254,0.35)]"
                          title="Post to Facebook and TikTok simultaneously via Buffer"
                        >
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span>Post to Facebook & TikTok (via Buffer)</span>
                        </button>

                        <button
                          onClick={() => handleCopyPostCaption(post)}
                          className="w-full py-2 rounded-xl bg-gold-gradient text-[#08110b] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? 'Caption & Hashtags Copied!' : 'Copy Caption & Hashtags'}</span>
                        </button>

                        <a
                          href={`https://wa.me/923110003160?text=${encodeURIComponent(`Salam Royal Bites! I want to order "${post.title}" (${post.dealPrice}). Please deliver to Bahadurabad, Karachi.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 hover:bg-[#25D366] text-[#25D366] hover:text-[#06180f] font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Order on WhatsApp (03110003160)</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
