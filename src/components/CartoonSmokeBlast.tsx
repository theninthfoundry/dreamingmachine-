import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CartoonSmokeBlastProps {
  onComplete: () => void;
}

export const CartoonSmokeBlast: React.FC<CartoonSmokeBlastProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const smokePuffsRef = useRef<HTMLDivElement>(null);
  const comicBadgeRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const puffs = smokePuffsRef.current?.children || [];
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Initial comic blast shockwave lines
    tl.fromTo(
      raysRef.current,
      { scale: 0.2, opacity: 1, rotation: 0 },
      { scale: 2.2, opacity: 0, rotation: 35, duration: 0.45, ease: 'power2.out' },
      0
    );

    // 2. Comic "POOF!" text badge pop and punch
    tl.fromTo(
      comicBadgeRef.current,
      { scale: 0, opacity: 0, rotation: -15 },
      { scale: 1.3, opacity: 1, rotation: 5, duration: 0.25, ease: 'back.out(2.5)' },
      0
    );
    tl.to(
      comicBadgeRef.current,
      { scale: 1.6, opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' },
      0.3
    );

    // 3. Cartoon Smoke Puffs explode radially and expand like classic animation
    Array.from(puffs).forEach((puff, i) => {
      const angle = (i / puffs.length) * Math.PI * 2;
      const distance = 80 + (i % 3) * 60;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance;

      tl.fromTo(
        puff,
        { x: 0, y: 0, scale: 0.1, opacity: 0.95 },
        {
          x: targetX,
          y: targetY,
          scale: 1.4 + (i % 3) * 0.4,
          opacity: 0.85,
          duration: 0.38,
          ease: 'power2.out',
        },
        0.02 * (i % 4)
      );

      // Smoke clouds billow and dissolve into thin air
      tl.to(
        puff,
        {
          scale: 2.2 + (i % 2) * 0.5,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 0.35,
          ease: 'power1.in',
        },
        0.3 + (i % 3) * 0.05
      );
    });
  }, [onComplete]);

  // Generate 16 cartoon smoke puff definitions
  const puffCount = 18;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden select-none"
    >
      {/* Dark vignette flash */}
      <div className="absolute inset-0 bg-black/20 animate-pulse" />

      {/* Comic Book Action Blast Rays SVG */}
      <svg
        ref={raysRef}
        viewBox="0 0 400 400"
        className="absolute w-[500px] h-[500px] pointer-events-none will-change-transform stroke-amber-400 fill-none"
      >
        {Array.from({ length: 12 }).map((_, idx) => {
          const angle = (idx * 30 * Math.PI) / 180;
          const x1 = 200 + Math.cos(angle) * 40;
          const y1 = 200 + Math.sin(angle) * 40;
          const x2 = 200 + Math.cos(angle) * 180;
          const y2 = 200 + Math.sin(angle) * 180;
          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth={idx % 2 === 0 ? '4' : '2'}
              strokeLinecap="round"
              strokeDasharray={idx % 2 === 0 ? '12 8' : 'none'}
            />
          );
        })}
      </svg>

      {/* Radial Smoke Puffs Container */}
      <div ref={smokePuffsRef} className="relative w-1 h-1 flex items-center justify-center">
        {Array.from({ length: puffCount }).map((_, i) => {
          const sizes = ['w-24 h-24', 'w-32 h-32', 'w-20 h-20', 'w-28 h-28'];
          const sizeClass = sizes[i % sizes.length];
          const bgColors = [
            'bg-white border-4 border-neutral-900',
            'bg-neutral-100 border-4 border-neutral-900',
            'bg-sky-100 border-4 border-neutral-900',
            'bg-amber-100 border-4 border-neutral-900',
          ];
          const bgClass = bgColors[i % bgColors.length];

          return (
            <div
              key={i}
              className={`absolute rounded-full ${sizeClass} ${bgClass} shadow-2xl will-change-transform flex items-center justify-center`}
            >
              {/* Internal cartoon cloud puff shading curve */}
              <div className="w-1/2 h-1/2 rounded-full border-t-2 border-neutral-400/40" />
            </div>
          );
        })}
      </div>

      {/* Comic Book "POOF!" Action Stamp */}
      <div
        ref={comicBadgeRef}
        className="absolute z-20 flex flex-col items-center justify-center px-6 py-2.5 rounded-2xl bg-amber-400 border-4 border-neutral-950 shadow-[6px_6px_0px_#000] will-change-transform"
      >
        <span
          style={{ fontFamily: 'var(--font-funky-manga)' }}
          className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-wider uppercase leading-none drop-shadow"
        >
          * POOF! *
        </span>
        <span className="font-mono text-[10px] tracking-widest text-neutral-900 font-bold uppercase mt-1">
          SMOKE RELEASE // CRAFT DISPERSAL
        </span>
      </div>
    </div>
  );
};

