// Web Audio API Procedural Sound Synthesizer
// Provides subtle, high-end tactile feedback without requiring external audio files

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      this.playChime(528, 0.35); // Solfeggio 528Hz love/miracle tone
    }
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Heavenly rising chord for the 4 pillars + deep stone settle
  public playPillarRise() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const chords = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major celestial pentatonic
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playSoftNote(freq, 2.8, 0.16);
      }, idx * 240);
    });

    // Deep sub-bass stone impact settle after 1.6s
    setTimeout(() => {
      this.playSubBass(65, 1.4, 0.22);
    }, 1600);
  }

  // Deep resonant sub-bass for architectural mass settle
  public playSubBass(freq: number = 70, duration: number = 1.2, volume: number = 0.2) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Safe ignore
    }
  }

  // Soft note with natural exponential decay
  public playSoftNote(freq: number, duration: number = 1.2, volume: number = 0.1) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Safe ignore
    }
  }

  // Tactile paper rustle / scotch tape peel for sketchbook
  public playPaperRustle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Create small buffer of white noise
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      // Bandpass filter to simulate paper crinkle
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      // Safe ignore
    }
  }

  // Subtle click for UI interactions
  public playClick(pitch: number = 800) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Safe ignore
    }
  }

  // Water bubble pop with pitch inflection
  public playBubblePop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const startFreq = 340 + Math.random() * 320;
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, this.ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Safe ignore
    }
  }

  // Star sparkle chime
  public playStarSparkle() {
    if (this.isMuted) return;
    [1046.50, 1318.51, 1567.98].forEach((f, i) => {
      setTimeout(() => this.playSoftNote(f, 1.2, 0.08), i * 90);
    });
  }

  // Single chime
  public playChime(freq: number = 660, volume: number = 0.2) {
    this.playSoftNote(freq, 2.0, volume);
  }

  // Ambient ethereal drone
  private startAmbient() {
    if (!this.ctx) return;
    try {
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3 warm drone

      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.025, this.ctx.currentTime + 3.0);

      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc.start();
    } catch {
      // Safe ignore
    }
  }

  private stopAmbient() {
    if (this.ambientOsc && this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
        setTimeout(() => {
          this.ambientOsc?.stop();
          this.ambientOsc?.disconnect();
          this.ambientOsc = null;
        }, 1000);
      } catch {
        this.ambientOsc = null;
      }
    }
  }
}

export const sounds = new SoundEngine();
