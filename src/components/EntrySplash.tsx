import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { sounds } from '../utils/audio';
import { Sparkles } from 'lucide-react';

interface EntrySplashProps {
  onEnter: () => void;
}

export const EntrySplash: React.FC<EntrySplashProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starWrapperRef = useRef<HTMLDivElement>(null);
  const orbitalRingRef = useRef<SVGSVGElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const textPromptRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);

  const [isExpanding, setIsExpanding] = useState<boolean>(false);

  // Initial ambient motion: Star gently pulses & orbital ring rotates
  useEffect(() => {
    // Rotate orbital ring continuously
    if (orbitalRingRef.current) {
      gsap.to(orbitalRingRef.current, {
        rotation: 360,
        duration: 16,
        repeat: -1,
        ease: 'none',
      });
    }

    // Subtle star floating breath
    if (starWrapperRef.current) {
      gsap.to(starWrapperRef.current, {
        y: '-=12',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Corner stickers gentle float
    if (cornersRef.current) {
      const stickers = cornersRef.current.children;
      Array.from(stickers).forEach((sticker, i) => {
        gsap.to(sticker, {
          y: i % 2 === 0 ? '-=10' : '+=10',
          rotation: (i % 2 === 0 ? 1 : -1) * (3 + i),
          duration: 3.5 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, []);

  // When clicking the Star: Dramatic Hyperspace Expansion Portal
  const handleStarClick = () => {
    if (isExpanding) return;
    setIsExpanding(true);
    sounds.playStarWarp();

    const tl = gsap.timeline({
      onComplete: () => {
        onEnter();
      },
    });

    // 1. Flash shockwave ripple
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

    // 2. Corners, Header & Text blow outward and vanish
    tl.to(
      [cornersRef.current, headerRef.current, textPromptRef.current],
      {
        opacity: 0,
        scale: 0.85,
        duration: 0.45,
        ease: 'power2.in',
      },
      0
    );

    // 3. Center Star Logo EXPANDS MASSIVELY into a cosmic wormhole
    tl.to(
      starWrapperRef.current,
      {
        scale: 55,
        rotation: 240,
        filter: 'brightness(3) blur(2px)',
        duration: 1.15,
        ease: 'expo.in',
      },
      0.1
    );

    // 4. Piano Black container dissolves into blinding light
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
      },
      0.85
    );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-black text-white select-none overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,rgba(15,23,42,0.6)_45%,rgba(0,0,0,1)_85%)] pointer-events-none" />

      {/* Shockwave expanding ring */}
      <div
        ref={shockwaveRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-sky-400/80 bg-sky-500/10 pointer-events-none scale-0 opacity-0 blur-md z-10"
      />

      {/* TOP HEADER */}
      <div
        ref={headerRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between pointer-events-none"
      >
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
            The Ninth Foundry // 2026
          </span>
        </div>

        <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-950/80 text-[11px] font-mono tracking-widest text-neutral-400">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Interactive Ideation Gate</span>
        </div>
      </div>

      {/* CORNER ARTIFACTS (Positioned at each corner of piano black canvas) */}
      <div ref={cornersRef} className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
        {/* Top-Left: Banana Cat Crying Sticker */}
        <div className="absolute top-16 left-6 sm:top-24 sm:left-14 w-28 sm:w-36 md:w-44 drop-shadow-[0_15px_30px_rgba(255,255,255,0.08)]">
          <div className="relative group">
            <span className="absolute -top-3 left-4 bg-yellow-400 text-black font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded shadow rotate-[-4deg]">
              MEME // CHILL
            </span>
            <img
              src="/assets/mood_banana_cat_sticker.png"
              alt="Banana Cat Sticker"
              className="w-full h-auto object-contain filter drop-shadow-xl"
            />
          </div>
        </div>

        {/* Top-Right: Formula 1 Racing Car Sticker */}
        <div className="absolute top-16 right-6 sm:top-24 sm:right-14 w-24 sm:w-32 md:w-36 rotate-12 drop-shadow-[0_15px_30px_rgba(255,255,255,0.08)]">
          <div className="relative group">
            <span className="absolute -top-3 right-2 bg-red-600 text-white font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded shadow rotate-[6deg]">
              SPEED // #44
            </span>
            <img
              src="/assets/mood_f1_car_sticker.png"
              alt="Formula 1 Car Sticker"
              className="w-full h-auto object-contain filter invert contrast-125 drop-shadow-xl"
            />
          </div>
        </div>

        {/* Bottom-Left: Statue of Liberty Guitar Rebel */}
        <div className="absolute bottom-20 left-6 sm:bottom-24 sm:left-14 w-24 sm:w-32 md:w-36 rotate-[-8deg] drop-shadow-[0_15px_30px_rgba(255,255,255,0.08)]">
          <div className="relative group">
            <span className="absolute -top-3 left-2 bg-sky-400 text-black font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded shadow rotate-[-6deg]">
              REBEL // ROCK
            </span>
            <img
              src="/assets/mood_statue_liberty_sticker.png"
              alt="Statue of Liberty Guitar"
              className="w-full h-auto object-contain filter invert contrast-125 drop-shadow-xl"
            />
          </div>
        </div>

        {/* Bottom-Right: Crushed Diet Coke Can Pop Art */}
        <div className="absolute bottom-20 right-6 sm:bottom-24 sm:right-14 w-28 sm:w-36 md:w-44 rotate-6 drop-shadow-[0_15px_30px_rgba(255,255,255,0.08)]">
          <div className="relative group">
            <span className="absolute -top-3 right-4 bg-rose-500 text-white font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded shadow rotate-[4deg]">
              POP ART // COLD
            </span>
            <img
              src="/assets/mood_crushed_coke_sticker.png"
              alt="Crushed Diet Coke Sticker"
              className="w-full h-auto object-contain filter drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* CENTER STAR LOGO & EXPANSION TRIGGER */}
      <div className="relative z-30 flex flex-col items-center justify-center my-auto px-4">
        {/* Orbital Ring SVG */}
        <div className="relative flex items-center justify-center">
          <svg
            ref={orbitalRingRef}
            viewBox="0 0 400 400"
            className="absolute w-[360px] sm:w-[480px] md:w-[580px] h-[360px] sm:h-[480px] md:h-[580px] pointer-events-none opacity-40 will-change-transform stroke-sky-400 fill-none"
          >
            <circle cx="200" cy="200" r="175" strokeWidth="0.75" strokeDasharray="6 8" />
            <ellipse cx="200" cy="200" rx="190" ry="120" strokeWidth="0.5" strokeDasharray="3 6" className="rotate-45 origin-center" />
            <ellipse cx="200" cy="200" rx="190" ry="120" strokeWidth="0.5" strokeDasharray="3 6" className="-rotate-45 origin-center" />
            <circle cx="200" cy="25" r="3.5" fill="#38bdf8" />
            <circle cx="375" cy="200" r="3.5" fill="#f59e0b" />
          </svg>

          {/* Sreeshanth's Star Logo (Interactive Button) */}
          <div
            ref={starWrapperRef}
            onClick={handleStarClick}
            className="group relative cursor-pointer p-4 select-none will-change-transform transition-transform hover:scale-110 active:scale-95"
            title="Click to awaken the sanctuary and enter through the star"
          >
            {/* Glowing Backdrop Radial Bloom */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/30 via-pink-500/20 to-amber-400/30 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

            {/* The Star Logo Image */}
            <img
              src="/assets/entry_star_logo_transparent.png"
              alt="Sreeshanth Namireddy Star Logo"
              className="relative z-10 w-44 sm:w-56 md:w-64 h-auto object-contain drop-shadow-[0_0_35px_rgba(56,189,248,0.7)] group-hover:drop-shadow-[0_0_50px_rgba(244,114,182,0.9)] transition-all"
            />
          </div>
        </div>

        {/* Text Prompt Under Star */}
        <div ref={textPromptRef} className="mt-8 flex flex-col items-center text-center space-y-2 pointer-events-none">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-sky-400/40 bg-sky-950/40 text-sky-300 font-mono text-xs uppercase tracking-[0.3em] backdrop-blur-md animate-pulse">
            <span>✦ CLICK STAR TO ENTER ✦</span>
          </div>

          <h1
            style={{ fontFamily: 'var(--font-serif-luxury)' }}
            className="text-2xl sm:text-3xl md:text-4xl text-neutral-200 uppercase tracking-widest font-normal"
          >
            Sreeshanth Namireddy
          </h1>

          <p className="text-neutral-500 font-serif italic text-xs sm:text-sm tracking-wide">
            &ldquo;Touch the cosmic star to unlock the creative inner sanctum.&rdquo;
          </p>
        </div>
      </div>

      {/* BOTTOM FOOTER TELEMETRY */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-600 uppercase pointer-events-none">
        <span>GATE: 01 // ENTRY</span>
        <span className="hidden sm:inline">PIANO BLACK CANVAS • ASTROLOGICAL ALIGNMENT</span>
        <span>LAT 46°30&apos;N</span>
      </div>
    </div>
  );
};
