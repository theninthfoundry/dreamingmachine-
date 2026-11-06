import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sounds } from '../utils/audio';
import { Volume2, VolumeX, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onScrollToNext?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToNext }) => {
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const landscapeBgRef = useRef<HTMLDivElement>(null);

  // Cloud Animation Refs (Placed directly in hero base)
  const cloudsContainerRef = useRef<HTMLDivElement>(null);
  const cloud1Ref = useRef<HTMLImageElement>(null);
  const cloud2Ref = useRef<HTMLImageElement>(null);
  const cloud3Ref = useRef<HTMLImageElement>(null);
  const cloud4Ref = useRef<HTMLImageElement>(null);
  const cloud5Ref = useRef<HTMLImageElement>(null);
  const sunBeamsRef = useRef<HTMLDivElement>(null);

  // Redesigned Animated Lines Refs
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineMidRef = useRef<HTMLDivElement>(null);
  const lineBottomRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const advisoryRef = useRef<HTMLDivElement>(null);
  const centerTitleRef = useRef<HTMLDivElement>(null);

  // Smooth subtle mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      // Parallax depths
      if (landscapeBgRef.current) {
        gsap.to(landscapeBgRef.current, {
          x: -x * 14,
          y: -y * 8,
          scale: 1.04,
          duration: 0.9,
          ease: 'power2.out',
        });
      }
      if (textLayerRef.current) {
        gsap.to(textLayerRef.current, {
          x: x * 8,
          y: y * 6,
          duration: 0.9,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth editorial load animation on mount
  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Soft landscape bloom
    tl.fromTo(
      landscapeBgRef.current,
      { filter: 'brightness(1.2) blur(6px)', scale: 1.06 },
      { filter: 'brightness(1) blur(0px)', scale: 1.02, duration: 1.2, ease: 'power2.out' }
    );

    // 2. Redesigned architectural lines sweep open smoothly from center
    tl.fromTo(
      [lineTopRef.current, lineBottomRef.current],
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.85, duration: 1.1, ease: 'power3.inOut' },
      '-=0.6'
    );

    tl.fromTo(
      lineMidRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.75, duration: 1.1, ease: 'power3.inOut' },
      '-=0.9'
    );

    // 3. Editorial typography & Parental Advisory badge settle in
    tl.fromTo(
      advisoryRef.current,
      { scale: 1.25, opacity: 0, y: -16 },
      { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.6)' },
      '-=0.5'
    );

    tl.fromTo(
      centerTitleRef.current,
      { opacity: 0, y: 20, letterSpacing: '0.06em' },
      { opacity: 1, y: 0, letterSpacing: '0.02em', duration: 1.1, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      textLayerRef.current?.querySelectorAll('.sub-element') || [],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
      '-=0.7'
    );
  }, []);

  // Real Clouds Ambient Float + Scroll-Triggered Parting Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Gentle living ambient billowing drift
      gsap.to(cloud1Ref.current, {
        x: '+=16',
        y: '-=10',
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(cloud2Ref.current, {
        x: '-=18',
        y: '-=8',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(cloud3Ref.current, {
        scale: 1.05,
        y: '-=14',
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(cloud4Ref.current, {
        x: '+=12',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. Scroll-scrubbed parting flight transition directly into Pegasus section
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Flank clouds fly out to the sides in 3D parallax
      scrollTl.to(
        [cloud1Ref.current, cloud4Ref.current],
        { x: '-80%', y: '-25%', scale: 2.2, opacity: 0, ease: 'power2.inOut' },
        0
      );
      scrollTl.to(
        [cloud2Ref.current, cloud5Ref.current],
        { x: '80%', y: '-20%', scale: 2.3, opacity: 0, ease: 'power2.inOut' },
        0
      );

      // Center dense ground cloud surges up and dissipates
      scrollTl.to(
        cloud3Ref.current,
        { y: '-70%', scale: 2.6, opacity: 0, ease: 'power2.inOut' },
        0.05
      );

      // Sunbeams flare between the parting clouds
      scrollTl.to(
        sunBeamsRef.current,
        { opacity: 0.9, scale: 1.4, ease: 'power1.out' },
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = !sounds.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <section
      ref={containerRef}
      id="sanctuary"
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-white select-none"
    >
      {/* 1. FULLSCREEN MOUNTAIN VALLEY BACKGROUND (Unobstructed full panoramic view) */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/15 via-transparent to-black/35 pointer-events-none" />

        {/* Volumetric Sunbeams piercing down */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-75">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[85vw] h-[95vh] bg-[radial-gradient(ellipse_at_top,rgba(255,252,230,0.5)_0%,rgba(255,245,210,0.2)_45%,transparent_75%)] mix-blend-screen" />
        </div>
      </div>

      {/* 2. SOARING CELESTIAL DOVES IN SKY */}
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

      {/* 3. REAL CUMULUS CLOUD ANIMATION BILLOWING AT BASE (Directly on Hero itself) */}
      <div
        ref={cloudsContainerRef}
        className="absolute bottom-0 left-0 right-0 h-[420px] pointer-events-none z-20 overflow-hidden"
      >
        {/* Seamless bottom fade directly into Pegasus section's deep royal blue */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#071338]/60 to-[#071338]" />

        {/* Volumetric Sunbeams breaking through parting clouds on scroll */}
        <div
          ref={sunBeamsRef}
          className="absolute inset-0 pointer-events-none opacity-0 flex items-center justify-center will-change-transform z-10"
        >
          <div className="w-[120vw] h-[100vh] bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.85)_0%,rgba(225,240,255,0.4)_40%,transparent_75%)] blur-2xl" />
        </div>

        {/* Cloud 1: Foreground Left Billow */}
        <img
          ref={cloud1Ref}
          src="/assets/real_cumulus_cloud_1.png"
          alt="Real Cumulus Cloud Left"
          className="absolute left-[-12%] bottom-[-18%] w-[68%] max-w-[950px] h-auto pointer-events-none z-20 will-change-transform opacity-95 drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)]"
        />

        {/* Cloud 2: Foreground Right Billow */}
        <img
          ref={cloud2Ref}
          src="/assets/real_cumulus_cloud_2.png"
          alt="Real Cumulus Cloud Right"
          className="absolute right-[-12%] bottom-[-14%] w-[68%] max-w-[980px] h-auto pointer-events-none z-20 will-change-transform opacity-95 drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)]"
        />

        {/* Cloud 3: Center Ground Cloud Billow */}
        <img
          ref={cloud3Ref}
          src="/assets/real_cumulus_cloud_3.png"
          alt="Real Cumulus Cloud Center"
          className="absolute left-1/2 -translate-x-1/2 bottom-[-22%] w-[88%] max-w-[1250px] h-auto pointer-events-none z-25 will-change-transform opacity-90 drop-shadow-2xl"
        />

        {/* Cloud 4: Drift Cloud High Left */}
        <img
          ref={cloud4Ref}
          src="/assets/real_cumulus_cloud_4.png"
          alt="Real High Cumulus Cloud Left"
          className="absolute left-[-6%] top-[15%] w-[52%] max-w-[700px] h-auto pointer-events-none z-15 will-change-transform opacity-80"
        />

        {/* Cloud 5: Drift Cloud High Right */}
        <img
          ref={cloud5Ref}
          src="/assets/real_cumulus_cloud_1.png"
          alt="Real High Cumulus Cloud Right"
          className="absolute right-[-6%] top-[20%] w-[48%] max-w-[650px] h-auto pointer-events-none z-15 will-change-transform opacity-75"
        />
      </div>

      {/* 4. REDESIGNED ARCHITECTURAL LINES & EDITORIAL TYPOGRAPHY */}
      <div
        ref={textLayerRef}
        className="absolute inset-0 z-30 flex flex-col justify-between items-center py-10 md:py-14 px-4 sm:px-6 pointer-events-none text-center"
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

          {/* PARENTAL ADVISORY BADGE (Crisp vector badge) */}
          <div
            ref={advisoryRef}
            className="my-1 bg-white text-black px-4 py-1 border-[1.5px] border-black shadow-2xl tracking-tighter text-center select-none"
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

            {/* Coordinate indicators matching editorial aesthetics */}
            <div className="w-full flex justify-between items-center px-4 sm:px-12 md:px-24 mt-2 text-white font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold drop-shadow">
              <span className="bg-black/35 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/20">TIME</span>
              <span className="bg-black/35 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/20">SANCTUARY</span>
            </div>
          </div>

          {/* 3. BOTTOM ANIMATED ARCHITECTURAL LINE */}
          <div className="w-full flex items-center justify-between mt-3 mb-2">
            <span className="text-white/60 font-mono text-[9px] tracking-widest hidden sm:inline">✦ LAT 46°30&apos;N</span>
            
            <div
              ref={lineBottomRef}
              className="relative flex-grow mx-4 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent origin-center will-change-transform"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
            </div>

            <span className="text-white/60 font-mono text-[9px] tracking-widest hidden sm:inline">ARCHIVE ✦</span>
          </div>

          {/* Bottom Subtitle Statement */}
          <div className="sub-element mt-2 max-w-lg text-center">
            <p className="text-white/95 font-serif italic text-xs sm:text-sm md:text-base drop-shadow-md">
              &ldquo;Within the expanse of time, we discover the ideas we were meant to build.&rdquo;
            </p>
          </div>
        </div>

        {/* BOTTOM CONTROLS & NAVIGATION HUD */}
        <div className="w-full max-w-5xl flex items-center justify-between px-4 pointer-events-auto z-40">
          {/* Audio Synthesizer */}
          <button
            onClick={toggleSound}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 text-xs font-mono transition-all"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
            <span className="hidden sm:inline">{isAudioMuted ? 'AUDIO: OFF' : 'AUDIO: HARMONIC'}</span>
          </button>

          {/* Scroll Down Trigger Directly to Pegasus */}
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

          {/* Ambient Coordinate Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/40 text-white/80 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest uppercase">
            <span>ELEV: 2840M</span>
          </div>
        </div>
      </div>
    </section>
  );
};
