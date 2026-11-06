import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { sounds } from '../utils/audio';

interface EntrySplashProps {
  onEnter: () => void;
}

export const EntrySplash: React.FC<EntrySplashProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerGroupRef = useRef<HTMLDivElement>(null);
  const starImgRef = useRef<HTMLImageElement>(null);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);

  // 4 Corner Refs
  const libertyRef = useRef<HTMLDivElement>(null);
  const bananaCatRef = useRef<HTMLDivElement>(null);
  const f1CarRef = useRef<HTMLDivElement>(null);
  const cosmicCatRef = useRef<HTMLDivElement>(null);

  const [isExpanding, setIsExpanding] = useState<boolean>(false);

  // Ambient gentle floating motion for living canvas
  useEffect(() => {
    // Subtle star floating breath
    if (centerGroupRef.current) {
      gsap.to(centerGroupRef.current, {
        y: '-=8',
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Corner stickers organic floating drift
    if (libertyRef.current) {
      gsap.to(libertyRef.current, {
        y: '-=10',
        rotation: '-=1.5',
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
    if (bananaCatRef.current) {
      gsap.to(bananaCatRef.current, {
        y: '+=8',
        rotation: '+=2',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
    if (f1CarRef.current) {
      gsap.to(f1CarRef.current, {
        y: '-=8',
        rotation: '+=1.5',
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
    if (cosmicCatRef.current) {
      gsap.to(cosmicCatRef.current, {
        y: '+=6',
        rotation: '-=1',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  // When clicking Star or Enter link: Hyperspace Cosmic Zoom Transition
  const triggerEnter = () => {
    if (isExpanding) return;
    setIsExpanding(true);
    sounds.playStarWarp();

    const tl = gsap.timeline({
      onComplete: () => {
        onEnter();
      },
    });

    // 1. Shockwave burst
    tl.to(
      shockwaveRef.current,
      {
        scale: 6,
        opacity: 0.9,
        duration: 0.5,
        ease: 'power2.out',
      },
      0
    );

    // 2. The 4 corner stickers fade out and blow outward
    tl.to(
      [libertyRef.current, bananaCatRef.current, f1CarRef.current, cosmicCatRef.current],
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'power2.in',
      },
      0
    );

    // 3. Enter button fades out
    tl.to(
      enterBtnRef.current,
      {
        opacity: 0,
        y: 15,
        duration: 0.3,
        ease: 'power2.in',
      },
      0
    );

    // 4. Center Star Logo EXPANDS MASSIVELY into hyperspace portal
    tl.to(
      starImgRef.current,
      {
        scale: 55,
        rotation: 220,
        filter: 'brightness(3.5) blur(3px)',
        duration: 1.15,
        ease: 'expo.in',
      },
      0.08
    );

    // 5. Pure black background dissolves to reveal Hero
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.85
    );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#000000] text-white select-none overflow-hidden"
    >
      {/* Shockwave expanding ring */}
      <div
        ref={shockwaveRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-sky-400/80 bg-sky-500/10 pointer-events-none scale-0 opacity-0 blur-md z-10"
      />

      {/* ============================================================== */}
      {/* 4 CORNERS: EXACT MATCH TO USER'S SCREENSHOT                    */}
      {/* ============================================================== */}

      {/* Top-Left: Statue of Liberty Guitar (White stencil on black) */}
      <div
        ref={libertyRef}
        className="absolute top-6 left-6 sm:top-10 sm:left-12 md:top-14 md:left-16 w-24 sm:w-32 md:w-40 pointer-events-none z-20 will-change-transform"
      >
        <img
          src="/assets/mood_statue_liberty_sticker.png"
          alt="Statue of Liberty with Electric Guitar"
          className="w-full h-auto object-contain filter invert contrast-150 brightness-110 drop-shadow-[0_10px_25px_rgba(255,255,255,0.06)]"
        />
      </div>

      {/* Top-Right: Crying Banana Cat */}
      <div
        ref={bananaCatRef}
        className="absolute top-6 right-6 sm:top-10 sm:right-12 md:top-14 md:right-16 w-18 sm:w-24 md:w-32 pointer-events-none z-20 will-change-transform"
      >
        <img
          src="/assets/mood_banana_cat_sticker.png"
          alt="Banana Cat Crying"
          className="w-full h-auto object-contain drop-shadow-[0_10px_25px_rgba(255,255,255,0.06)]"
        />
      </div>

      {/* Bottom-Left: Formula 1 Racing Car */}
      <div
        ref={f1CarRef}
        className="absolute bottom-8 left-6 sm:bottom-12 sm:left-12 md:bottom-14 md:left-16 w-22 sm:w-28 md:w-36 pointer-events-none z-20 will-change-transform rotate-[-6deg]"
      >
        <img
          src="/assets/mood_f1_car_sticker.png"
          alt="Formula 1 Racing Machine"
          className="w-full h-auto object-contain filter invert contrast-150 brightness-110 drop-shadow-[0_10px_25px_rgba(255,255,255,0.06)]"
        />
      </div>

      {/* Bottom-Right: Cosmic Galaxy Cat (Lying down) */}
      <div
        ref={cosmicCatRef}
        className="absolute bottom-8 right-6 sm:bottom-12 sm:right-12 md:bottom-14 md:right-16 w-36 sm:w-48 md:w-64 pointer-events-none z-20 will-change-transform"
      >
        <img
          src="/assets/mood_cosmic_galaxy_cat_sticker.png"
          alt="Cosmic Galaxy Cat"
          className="w-full h-auto object-contain drop-shadow-[0_10px_25px_rgba(255,255,255,0.06)]"
        />
      </div>

      {/* ============================================================== */}
      {/* CENTER: STAR LOGO + "ENTER PORTFOLIO ↗"                         */}
      {/* ============================================================== */}
      <div
        ref={centerGroupRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-auto"
      >
        {/* Star Logo (Interactive Click Target) */}
        <div
          onClick={triggerEnter}
          className="cursor-pointer group select-none will-change-transform transition-transform hover:scale-105 active:scale-95"
          title="Click to enter portfolio"
        >
          <img
            ref={starImgRef}
            src="/assets/entry_star_logo_transparent.png"
            alt="Sreeshanth Star Logo"
            className="w-44 sm:w-56 md:w-64 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_35px_rgba(56,189,248,0.6)] transition-all"
          />
        </div>

        {/* Minimalist "ENTER PORTFOLIO ↗" Text Link with Underline */}
        <button
          ref={enterBtnRef}
          onClick={triggerEnter}
          className="mt-6 group/btn inline-flex items-center space-x-1.5 font-mono text-[11px] sm:text-xs tracking-[0.25em] text-neutral-300 uppercase hover:text-white transition-colors cursor-pointer border-b border-neutral-600 hover:border-white pb-1"
        >
          <span>ENTER PORTFOLIO</span>
          <span className="text-neutral-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">↗</span>
        </button>
      </div>

      {/* Subtle Pill Indicator at Bottom Center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <div className="w-8 h-1 rounded-full bg-neutral-800" />
      </div>
    </div>
  );
};
