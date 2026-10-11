/**
 * Web Audio API Sound Engine for Royal Bites Video Commercials
 * Creates real-time procedural sound effects and audio background sync.
 */

class AdSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Sizzling Wok Sound FX (Simulated Karahi frying in oil)
   */
  public playSizzle(duration = 2.5) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate pink/white noise with crackle
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        const crackle = Math.random() > 0.985 ? (Math.random() * 2 - 1) * 2.2 : 0;
        data[i] = (white * 0.6 + crackle * 0.4) * 0.4;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter centered at 2400Hz (frying frequency)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  /**
   * Cinematic Sub-Bass Drop (Hollywood Trailer Boom)
   */
  public playBassDrop(duration = 1.8) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, this.ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  /**
   * Victory Notification Chime (WhatsApp / Confirmation Bell)
   */
  public playChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const freqs = [587.33, 880, 1174.66, 1760]; // D5, A5, D6, A6 chord
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.08);

        const startTime = this.ctx!.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.25 / (idx + 1), startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.2);
      });
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  /**
   * High-Energy Beat Drop (Kick + Snare impact)
   */
  public playBeatDrop() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Kick drum
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();
      kickOsc.frequency.setValueAtTime(160, this.ctx.currentTime);
      kickOsc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.25);
      kickGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      kickGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      kickOsc.connect(kickGain);
      kickGain.connect(this.ctx.destination);
      kickOsc.start();
      kickOsc.stop(this.ctx.currentTime + 0.4);

      // Sizzle splash
      setTimeout(() => this.playSizzle(1.2), 120);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  /**
   * Motorcycle / Delivery Rider Revving Effect
   */
  public playMotorcycle(duration = 2.0) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(85, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(220, this.ctx.currentTime + 0.8);
      osc.frequency.linearRampToValueAtTime(130, this.ctx.currentTime + duration);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(1400, this.ctx.currentTime + 0.8);
      filter.frequency.linearRampToValueAtTime(500, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  /**
   * Speak Narration using Browser SpeechSynthesis
   */
  public speak(text: string, lang = 'ur-PK') {
    if (this.isMuted) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const prefix = lang.split('-')[0].toLowerCase();
      const targetVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith(prefix) ||
          v.lang.startsWith('ur') ||
          v.lang.startsWith('hi') ||
          v.lang.includes('IN') ||
          v.name.includes('Natural')
      );
      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech error:', e);
    }
  }

  public stopAll() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const adSoundEngine = new AdSoundEngine();
