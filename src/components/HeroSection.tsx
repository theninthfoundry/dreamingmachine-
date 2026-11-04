import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { sounds } from '../utils/audio';
import { Sparkles, RefreshCw, Volume2, VolumeX, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToNext?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToNext }) => {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const whiteCurtainRef = useRef<HTMLDivElement>(null);
  const landscapeBgRef = useRef<HTMLDivElement>(null);

  // The 4 Pillar Refs
  const pillarLeftOuterRef = useRef<HTMLDivElement>(null);
  const pillarLeftInnerRef = useRef<HTMLDivElement>(null);
  const pillarRightInnerRef = useRef<HTMLDivElement>(null);
  const pillarRightOuterRef = useRef<HTMLDivElement>(null);
  const stoneBaseRef = useRef<HTMLDivElement>(null);

  // Redesigned Animated Lines Refs
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineMidRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const advisoryRef = useRef<HTMLDivElement>(null);
  const centerTitleRef = useRef<HTMLDivElement>(null);

  // Subtle Mouse Parallax
  useEffect(() => {
    if (!hasEntered) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      // Parallax depths
      if (landscapeBgRef.current) {
        gsap.to(landscapeBgRef.current, {
          x: -x * 12,
          y: -y * 8,
          scale: 1.04,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
      if (pillarLeftInnerRef.current && pillarRightInnerRef.current) {
        gsap.to([pillarLeftInnerRef.current, pillarRightInnerRef.current], {
          x: -x * 16,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
      if (pillarLeftOuterRef.current && pillarRightOuterRef.current) {
        gsap.to([pillarLeftOuterRef.current, pillarRightOuterRef.current], {
          x: -x * 26,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
      if (textLayerRef.current) {
        gsap.to(textLayerRef.current, {
          x: x * 8,
          y: y * 6,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasEntered]);

  // Master Awaken Trigger: 4 Pillars Rise from Below with Physics
  const triggerAwaken = () => {
    if (hasEntered) return;
    setHasEntered(true);
    sounds.playPillarRise();

    const tl = gsap.timeline();

    // 1. Dissolve the initial pure white curtain
    tl.to(whiteCurtainRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      pointerEvents: 'none',
    });

    // 2. Landscape softly blooms in
    tl.fromTo(
      landscapeBgRef.current,
      { filter: 'brightness(1.4) blur(12px)', scale: 1.08 },
      { filter: 'brightness(1) blur(0px)', scale: 1.02, duration: 1.2, ease: 'power2.out' },
      '-=0.5'
    );

    // 3. Stone terrace floor settles at bottom
    tl.fromTo(
      stoneBaseRef.current,
      { y: 150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
      '-=0.8'
    );

    // 4. THE 4 PILLARS ARISE FROM BELOW
    // Inner pillars rise first
    tl.fromTo(
      [pillarLeftInnerRef.current, pillarRightInnerRef.current],
      { y: '120%', opacity: 0.3 },
      {
        y: '0%',
        opacity: 1,
        duration: 1.6,
        stagger: 0.12,
        ease: 'power4.out',
      },
      '-=0.7'
    );

    // Outer tall foreground pillars rise up with majestic weight and settle
    tl.fromTo(
      [pillarLeftOuterRef.current, pillarRightOuterRef.current],
      { y: '120%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1.8,
        stagger: 0.16,
        ease: 'power4.out',
      },
      '-=1.4'
    );

    // Subtle tactile ground impact settle
    tl.to(
      containerRef.current,
      {
        y: '+=3',
        duration: 0.08,
        yoyo: true,
        repeat: 3,
        ease: 'power1.inOut',
      },
      '-=0.3'
    );

    // 5. REDESIGNED ARCHITECTURAL LINES SWEEP OPEN ACROSS THE SCREEN
    tl.fromTo(
      lineTopRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.85, duration: 1.1, ease: 'power3.inOut' },
      '-=0.8'
    );

    tl.fromTo(
      lineMidRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.75, duration: 1.1, ease: 'power3.inOut' },
      '-=0.9'
    );

    tl.fromTo(
      lineBottomRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.85, duration: 1.1, ease: 'power3.inOut' },
      '-=0.9'
    );

    // 6. Editorial Text & Parental Advisory Badge Stamp In
    tl.fromTo(
      advisoryRef.current,
      { scale: 1.35, opacity: 0, y: -20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.8)' },
      '-=0.5'
    );

    tl.fromTo(
      centerTitleRef.current,
      { opacity: 0, y: 25, letterSpacing: '0.08em' },
      { opacity: 1, y: 0, letterSpacing: '0.02em', duration: 1.1, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      textLayerRef.current?.querySelectorAll('.sub-element') || [],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
      '-=0.7'
    );
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playClick(600);
    setHasEntered(false);

    gsap.set(whiteCurtainRef.current, { opacity: 1, pointerEvents: 'auto' });
    gsap.set(
      [pillarLeftInnerRef.current, pillarRightInnerRef.current, pillarLeftOuterRef.current, pillarRightOuterRef.current],
      { y: '120%', opacity: 0 }
    );
    gsap.set([lineTopRef.current, lineMidRef.current, lineBottomRef.current], { scaleX: 0, opacity: 0 });
    gsap.set([advisoryRef.current, centerTitleRef.current], { opacity: 0 });

    setTimeout(() => {
      triggerAwaken();
    }, 150);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = !sounds.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <section
      ref={containerRef}
      id="sanctuary"
      onClick={triggerAwaken}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-white cursor-pointer select-none"
    >
      {/* 1. INITIAL PRISTINE WHITE CURTAIN (Displayed before click) */}
      <div
        ref={whiteCurtainRef}
        className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-white transition-colors duration-700 ${
          hasEntered ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      >
        <div className="max-w-2xl px-8 text-center flex flex-col items-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-neutral-300 text-xs tracking-widest uppercase text-neutral-600 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
            <span>The Gate Of Creation // Est. 2026</span>
          </div>

          <h1
            style={{ fontFamily: 'var(--font-serif-luxury)' }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-neutral-900 font-normal leading-none"
          >
            Sreeshanth Namireddy
          </h1>

          <p className="text-neutral-500 text-sm md:text-base font-light tracking-wide max-w-md">
            Click anywhere on screen to enter the sanctuary and raise the four Corinthian marble pillars.
          </p>

          <div className="group relative mt-6 inline-flex items-center justify-center px-9 py-4 rounded-full bg-neutral-900 text-white font-medium text-xs tracking-widest uppercase overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center space-x-2">
              <span>Awaken The Sanctuary</span>
              <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </div>

          <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase pt-2 animate-pulse">
            [ Click anywhere to trigger pillar ascent ]
          </div>
        </div>
      </div>

      {/* 2. FULLSCREEN MOUNTAIN VALLEY BACKGROUND (Fills the entire hero section) */}
      <div
        ref={landscapeBgRef}
        className="absolute inset-0 z-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url('/assets/hero_fullscreen_backdrop.jpg')`,
          backgroundPosition: 'center 32%',
          transform: 'scale(1.02)',
        }}
      >
        {/* Soft atmospheric radial bloom */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/15 via-transparent to-black/30 pointer-events-none" />

        {/* Volumetric Sunbeams piercing down between pillars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-75">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[85vw] h-[95vh] bg-[radial-gradient(ellipse_at_top,rgba(255,252,230,0.5)_0%,rgba(255,245,210,0.2)_45%,transparent_75%)] mix-blend-screen" />
        </div>
      </div>

      {/* 3. SOARING DOVES IN SKY */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[14%] left-[28%] animate-float opacity-90">
          <svg className="w-12 h-12 text-white/95 drop-shadow-md" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 35 C40 20, 20 25, 15 40 C25 42, 38 45, 50 48 C62 45, 75 42, 85 40 C80 25, 60 20, 50 35 Z M50 48 C42 60, 48 75, 52 82 C54 75, 58 60, 50 48 Z" />
          </svg>
        </div>
        <div className="absolute top-[22%] right-[32%] animate-pulse-glow opacity-85" style={{ animationDelay: '1.5s' }}>
          <svg className="w-9 h-9 text-white/90 drop-shadow-sm" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 35 C40 20, 20 25, 15 40 C25 42, 38 45, 50 48 C62 45, 75 42, 85 40 C80 25, 60 20, 50 35 Z" />
          </svg>
        </div>
      </div>

      {/* 4. THE 4 CORINTHIAN MARBLE PILLARS RISING FROM BELOW ACROSS THE SCREEN */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-end justify-center">
        {/* Full-width Colonnade Framing Container */}
        <div className="relative w-full max-w-7xl h-full mx-auto">
          {/* Outer Left Pillar (Tall foreground) */}
          <div
            ref={pillarLeftOuterRef}
            className="absolute left-[1%] sm:left-[3%] md:left-[5%] lg:left-[7%] bottom-[0%] h-[82%] max-h-[860px] aspect-[165/820] will-change-transform z-20"
            style={{ transform: hasEntered ? 'translateY(0%)' : 'translateY(120%)' }}
          >
            <img
              src="/assets/pillar_left_outer.png"
              alt="Corinthian Marble Pillar Outer Left"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Inner Left Pillar (Midground) */}
          <div
            ref={pillarLeftInnerRef}
            className="absolute left-[17%] sm:left-[21%] md:left-[23%] lg:left-[25%] bottom-[2%] h-[48%] max-h-[480px] aspect-[95/400] will-change-transform z-10"
            style={{ transform: hasEntered ? 'translateY(0%)' : 'translateY(120%)' }}
          >
            <img
              src="/assets/pillar_left_inner.png"
              alt="Corinthian Marble Pillar Mid Left"
              className="w-full h-full object-contain object-bottom drop-shadow-xl"
            />
          </div>

          {/* Inner Right Pillar (Midground) */}
          <div
            ref={pillarRightInnerRef}
            className="absolute right-[17%] sm:right-[21%] md:right-[23%] lg:right-[25%] bottom-[2%] h-[48%] max-h-[480px] aspect-[100/410] will-change-transform z-10"
            style={{ transform: hasEntered ? 'translateY(0%)' : 'translateY(120%)' }}
          >
            <img
              src="/assets/pillar_right_inner.png"
              alt="Corinthian Marble Pillar Mid Right"
              className="w-full h-full object-contain object-bottom drop-shadow-xl"
            />
          </div>

          {/* Outer Right Pillar (Tall foreground with dove on capital) */}
          <div
            ref={pillarRightOuterRef}
            className="absolute right-[1%] sm:right-[3%] md:right-[5%] lg:right-[7%] bottom-[0%] h-[82%] max-h-[860px] aspect-[165/805] will-change-transform z-20"
            style={{ transform: hasEntered ? 'translateY(0%)' : 'translateY(120%)' }}
          >
            <img
              src="/assets/pillar_right_outer.png"
              alt="Corinthian Marble Pillar Outer Right"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>

        {/* Seamless Cloud Mist Seam across Bottom Terrace (Zero Hard Edge) */}
        <div
          ref={stoneBaseRef}
          className="absolute bottom-0 left-0 right-0 h-44 z-15 pointer-events-none overflow-hidden"
          style={{ transform: hasEntered ? 'translateY(0)' : 'translateY(80px)' }}
        >
          {/* Subtle terrace floor shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Seamless fade directly into cloud transition palette */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent via-[#f0f6fa]/60 to-[#f0f6fa]" />
          {/* Soft real cumulus cloud wisp along the bottom edge */}
          <img
            src="/assets/real_cumulus_cloud_3.png"
            alt="Cloud Mist Base"
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[130%] max-w-[1600px] h-auto opacity-75 pointer-events-none"
          />
        </div>
      </div>

      {/* 5. REDESIGNED ARCHITECTURAL LINES & EDITORIAL TYPOGRAPHY */}
      <div
        ref={textLayerRef}
        className="absolute inset-0 z-40 flex flex-col justify-between items-center py-10 md:py-14 px-4 sm:px-6 pointer-events-none text-center"
      >
        {/* TOP SECTION: THE GATE OF CREATION & PARENTAL ADVISORY */}
        <div className="w-full max-w-4xl flex flex-col items-center pt-2 md:pt-4">
          {/* Top Title with Circular Crosshair */}
          <div className="relative flex flex-col items-center">
            {/* Fine circular crosshair behind top title */}
            <div className="absolute -top-3 w-56 h-16 pointer-events-none opacity-40">
              <svg viewBox="0 0 200 60" className="w-full h-full stroke-white fill-none">
                <ellipse cx="100" cy="30" rx="95" ry="24" strokeWidth="0.75" />
                <line x1="5" y1="30" x2="195" y2="30" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="100" y1="2" x2="100" y2="58" strokeWidth="0.5" strokeDasharray="3 3" />
              </svg>
            </div>

            <h2
              style={{ fontFamily: 'var(--font-tall-condensed)' }}
              className="sub-element text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.25em] uppercase font-normal leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              The Gate Of Creation
            </h2>
            <span className="sub-element font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-white/80 uppercase -mt-0.5 mb-2 drop-shadow">
              Sreeshanth Namireddy • Architecture
            </span>
          </div>

          {/* PARENTAL ADVISORY BADGE (Exact replica from reference poster) */}
          <div
            ref={advisoryRef}
            className="my-1 bg-white text-black px-4 py-1 border-[1.5px] border-black shadow-2xl tracking-tighter text-center select-none"
            style={{ opacity: hasEntered ? 1 : 0 }}
          >
            <div className="text-[11px] md:text-[12px] font-black tracking-widest uppercase leading-none font-sans">
              PARENTAL
            </div>
            <div className="text-[16px] md:text-[19px] font-black tracking-normal uppercase leading-tight font-sans border-y border-black my-[0.5px] px-1">
              ADVISORY
            </div>
            <div className="text-[8px] md:text-[9px] font-bold tracking-widest uppercase leading-none pt-[0.5px] font-sans">
              IT&apos;S NOT AN EXPLICIT CONTENT
            </div>
          </div>

          <p className="sub-element text-white/95 text-xs md:text-sm font-serif italic max-w-lg drop-shadow-md leading-relaxed mt-1 px-4">
            &ldquo;White blossoms whisper to the soaring doves, promising a sacred heaven hidden within the life you are meant to live!&rdquo;
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CENTER SECTION: REDESIGNED ANIMATED LINES OVER & BELOW NAME               */}
        {/* ========================================================================= */}
        <div className="w-full max-w-5xl my-auto px-4 flex flex-col items-center">
          
          {/* 1. TOP ANIMATED ARCHITECTURAL LINE (Sweeps open from center) */}
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-white/60 font-mono text-[9px] tracking-widest hidden sm:inline">✦ SEC 01</span>
            
            <div
              ref={lineTopRef}
              className="relative flex-grow mx-4 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent origin-center will-change-transform"
              style={{ transform: hasEntered ? 'scaleX(1)' : 'scaleX(0)', opacity: hasEntered ? 0.85 : 0 }}
            >
              {/* Glowing center indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
            </div>

            <span className="text-white/60 font-mono text-[9px] tracking-widest hidden sm:inline">2840M ✦</span>
          </div>

          {/* Lead-in uppercase tag */}
          <span className="sub-element font-mono text-[10px] md:text-xs tracking-[0.35em] text-white/90 uppercase drop-shadow mb-1">
            LIFE WHICH ARE MEANT TO BE
          </span>

          {/* GIANT ARCHITECTURAL CONDENSED DISPLAY: LIFE WHICH ARE MEANT TO BE */}
          <div
            ref={centerTitleRef}
            className="relative w-full flex flex-col items-center select-none"
            style={{ opacity: hasEntered ? 1 : 0 }}
          >
            <h1
              style={{ fontFamily: 'var(--font-tall-condensed)' }}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] text-white font-normal uppercase tracking-wide leading-[0.8] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
            >
              Life Which Are Meant To Be
            </h1>

            {/* 2. MIDDLE ANIMATED ARCHITECTURAL DIVISION LINE */}
            <div
              ref={lineMidRef}
              className="relative w-full my-2 sm:my-3 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent origin-center will-change-transform"
              style={{ transform: hasEntered ? 'scaleX(1)' : 'scaleX(0)', opacity: hasEntered ? 0.75 : 0 }}
            >
              {/* Caliper ticks and crosshairs */}
              <div className="absolute left-[15%] top-1/2 -translate-y-1/2 text-white/80 font-mono text-[9px] hidden sm:block">
                + + +
              </div>
              <div className="absolute right-[15%] top-1/2 -translate-y-1/2 text-white/80 font-mono text-[9px] hidden sm:block">
                + + +
              </div>
            </div>

            {/* SREESHANTH NAMIREDDY IN CURVY LUXURY DISPLAY FONT */}
            <div className="relative -mt-2 sm:-mt-4">
              <span
                style={{ fontFamily: 'var(--font-serif-luxury)' }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-normal uppercase tracking-widest drop-shadow-[0_6px_28px_rgba(0,0,0,0.9)] text-amber-100/95"
              >
                Sreeshanth Namireddy
              </span>
            </div>

            {/* Column indicators matching original poster */}
            <div className="w-full flex justify-between items-center px-4 sm:px-12 md:px-24 mt-2 text-white font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold drop-shadow">
              <span className="bg-black/35 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/20">TIME</span>
              <span className="bg-black/35 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/20">PILLARS</span>
            </div>
          </div>

          {/* 3. BOTTOM ANIMATED ARCHITECTURAL LINE */}
          <div className="w-full flex items-center justify-between mt-3 mb-2">
            <span className="text-white/60 font-mono text-[9px] tracking-widest hidden sm:inline">✦ LAT 46°30&apos;N</span>
            
            <div
              ref={lineBottomRef}
              className="relative flex-grow mx-4 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent origin-center will-change-transform"
              style={{ transform: hasEntered ? 'scaleX(1)' : 'scaleX(0)', opacity: hasEntered ? 0.85 : 0 }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
            </div>

            <span className="text-white/60 font-mono text-[9px] tracking-widest hidden sm:inline">ARCHIVE ✦</span>
          </div>

          {/* Bottom Subtitle Statement */}
          <div className="sub-element mt-2 max-w-lg text-center">
            <p className="text-white/95 font-serif italic text-xs sm:text-sm md:text-base drop-shadow-md">
              &ldquo;Between the pillars of time, we discover the ideas we were meant to build.&rdquo;
            </p>
          </div>
        </div>

        {/* BOTTOM CONTROLS & NAVIGATION HUD */}
        <div className="w-full max-w-6xl flex items-center justify-between px-4 pointer-events-auto z-40">
          {/* Audio Synthesizer */}
          <button
            onClick={toggleSound}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 text-xs font-mono transition-all"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
            <span className="hidden sm:inline">{isAudioMuted ? 'AUDIO: OFF' : 'AUDIO: HARMONIC'}</span>
          </button>

          {/* Scroll Down Trigger to Real Clouds */}
          <div
            onClick={onScrollToNext}
            className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-transform"
          >
            <span className="text-[10px] font-mono tracking-[0.25em] text-white/90 uppercase mb-1 drop-shadow">
              Scroll To Enter Real Clouds
            </span>
            <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center bg-black/30 backdrop-blur-md group-hover:border-white transition-colors shadow">
              <ArrowDown className="w-3.5 h-3.5 text-white animate-bounce" />
            </div>
          </div>

          {/* Replay Rising Animation Button */}
          <button
            onClick={handleReplay}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 text-xs font-mono transition-all hover:bg-black/70 shadow"
            title="Replay the 4 pillars rising entrance"
          >
            <RefreshCw className="w-3.5 h-3.5 text-neutral-300" />
            <span className="hidden sm:inline">REPLAY PILLARS</span>
          </button>
        </div>
      </div>
    </section>
  );
};
