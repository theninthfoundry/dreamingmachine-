import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sounds } from '../utils/audio';
import { Eye, ShieldCheck, Compass, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PegasusSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardFrameRef = useRef<HTMLDivElement>(null);
  const horseWrapperRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGSVGElement>(null);
  const ring2Ref = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  const [activeMode, setActiveMode] = useState<'classic' | 'astral' | 'blueprint'>('classic');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [foilAngle, setFoilAngle] = useState<number>(45);
  const [shockwaveActive, setShockwaveActive] = useState<boolean>(false);

  // Starlight particles canvas
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4 - 0.3,
      speedY: (Math.random() - 0.5) * 0.4 - 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.05,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += Math.sin(Date.now() * p.pulse * 0.05) * 0.01;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 235, 175, ${Math.max(0.1, Math.min(1, p.opacity))})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP ScrollTrigger for Pegasus Dynamic Flight & Astrolabe Rotation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
        onUpdate: (self) => {
          setScrollProgress(Math.round(self.progress * 100));

          // Rotate astral compass rings with scroll
          if (ring1Ref.current) {
            gsap.set(ring1Ref.current, { rotation: self.progress * 240 });
          }
          if (ring2Ref.current) {
            gsap.set(ring2Ref.current, { rotation: -self.progress * 320 });
          }

          // Dynamic elevation, aerodynamic banking roll, and 3D zoom of Pegasus & Warrior
          if (horseWrapperRef.current) {
            const lift = (self.progress - 0.5) * -240; // 240px soaring ascent across viewport
            const tilt = Math.sin((self.progress - 0.5) * Math.PI) * 16; // aerodynamic banking roll
            const scale = 0.94 + Math.sin(self.progress * Math.PI) * 0.32; // cinematic depth zoom (up to 1.26x)

            gsap.to(horseWrapperRef.current, {
              y: lift,
              rotation: tilt,
              scale: scale,
              duration: 0.15,
              ease: 'power1.out',
              overwrite: 'auto',
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3D Tilt on Mouse Move + Metallic Foil Angle
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardFrameRef.current) return;
    const rect = cardFrameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rx = -(y / rect.height) * 16;
    const ry = (x / rect.width) * 16;

    // Angle of cursor relative to center for foil specular
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    setFoilAngle(angle);

    gsap.to(cardFrameRef.current, {
      rotateX: rx,
      rotateY: ry,
      transformPerspective: 1200,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardFrameRef.current) return;
    gsap.to(cardFrameRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
    setIsHovered(false);
  };

  const triggerHorseInteraction = () => {
    sounds.playStarSparkle();
    setShockwaveActive(true);
    setTimeout(() => setShockwaveActive(false), 900);

    if (!horseWrapperRef.current) return;
    gsap.timeline()
      .to(horseWrapperRef.current, { scale: 1.18, y: -30, duration: 0.25, ease: 'back.out(2.2)' })
      .to(horseWrapperRef.current, { scale: 1, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <section
      ref={containerRef}
      id="pegasus"
      className="relative w-full min-h-screen py-24 md:py-32 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center bg-[#071338] text-white overflow-hidden select-none"
    >
      {/* Deep Royal Azure background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061133] via-[#091d57] to-[#040c24] pointer-events-none" />

      {/* Blueprint grid texture */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

      {/* Interactive starlight particles */}
      <canvas ref={particlesRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Header telemetry / Editorial subtitle */}
      <div className="relative z-20 max-w-4xl text-center mb-10 flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-sky-400/30 bg-sky-950/40 text-sky-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 animate-spin-slow text-amber-400" />
          <span>Section 02 // Classical Allegory & Motion Graphics</span>
        </div>

        <h2
          style={{ fontFamily: 'var(--font-serif-curvy)' }}
          className="text-4xl sm:text-5xl md:text-6xl text-white font-normal uppercase tracking-wider mt-4"
        >
          The Winged Ascent
        </h2>
        <p className="mt-2 text-sky-200/70 font-serif italic text-sm md:text-base max-w-lg">
          Scroll to animate the celestial steed — moving in synchronized kinetic harmony with orbital geometry.
        </p>

        {/* Motion Graphics Mode Switcher */}
        <div className="mt-6 flex items-center p-1 rounded-full bg-sky-950/60 border border-sky-500/20 backdrop-blur-lg">
          <button
            onClick={() => { sounds.playClick(500); setActiveMode('classic'); }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase transition-all ${
              activeMode === 'classic'
                ? 'bg-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-400/20'
                : 'text-sky-300 hover:text-white'
            }`}
          >
            Classic Engraving
          </button>
          <button
            onClick={() => { sounds.playClick(650); setActiveMode('astral'); }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase transition-all ${
              activeMode === 'astral'
                ? 'bg-sky-400 text-neutral-950 font-bold shadow-lg shadow-sky-400/20'
                : 'text-sky-300 hover:text-white'
            }`}
          >
            Astral Radiance
          </button>
          <button
            onClick={() => { sounds.playClick(800); setActiveMode('blueprint'); }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase transition-all ${
              activeMode === 'blueprint'
                ? 'bg-indigo-300 text-neutral-950 font-bold shadow-lg shadow-indigo-300/20'
                : 'text-sky-300 hover:text-white'
            }`}
          >
            Blueprint Contour
          </button>
        </div>
      </div>

      {/* THE MASTER EDITORIAL POSTER CANVAS (Expansive Full-Width Celestial Artwork) */}
      <div
        ref={cardFrameRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={triggerHorseInteraction}
        className="relative z-20 w-full max-w-7xl min-h-[760px] md:min-h-[860px] lg:h-[88vh] bg-[#0c2368] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-sky-300/30 overflow-hidden cursor-pointer transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? '0 30px 90px rgba(14, 60, 160, 0.45), 0 0 50px rgba(212, 175, 55, 0.2)'
            : '0 20px 60px rgba(0,0,0,0.7)',
        }}
      >
        {/* Deep blue textured parchment backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/pegasus_editorial.jpg')`,
            backgroundPosition: 'center',
            filter: activeMode === 'blueprint' ? 'invert(0.9) hue-rotate(180deg)' : 'none',
            transition: 'filter 0.5s ease',
          }}
        />

        {/* Dynamic Metallic Foil Specular Sheen (Moves with Cursor) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.35 : 0.15,
            background: `linear-gradient(${foilAngle}deg, transparent 20%, rgba(255,240,190,0.3) 50%, transparent 80%)`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Radiant Starlight Shockwave Burst on Click */}
        {shockwaveActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-ping">
            <div className="w-[450px] h-[450px] rounded-full border-2 border-amber-300/80 shadow-[0_0_60px_rgba(251,191,36,0.9)]" />
          </div>
        )}

        {/* 4 ORNATE GOLDEN CORNERS (Authentic filigree embellishments) */}
        <div className="absolute top-4 left-4 w-9 h-9 pointer-events-none">
          <svg viewBox="0 0 40 40" className="w-full h-full text-amber-400 drop-shadow-md fill-current">
            <path d="M0,0 L25,0 C20,5 15,10 12,18 C10,15 5,20 0,25 Z M5,5 L15,5 C12,8 8,12 5,15 Z" />
          </svg>
        </div>
        <div className="absolute top-4 right-4 w-9 h-9 pointer-events-none rotate-90">
          <svg viewBox="0 0 40 40" className="w-full h-full text-amber-400 drop-shadow-md fill-current">
            <path d="M0,0 L25,0 C20,5 15,10 12,18 C10,15 5,20 0,25 Z M5,5 L15,5 C12,8 8,12 5,15 Z" />
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 w-9 h-9 pointer-events-none -rotate-90">
          <svg viewBox="0 0 40 40" className="w-full h-full text-amber-400 drop-shadow-md fill-current">
            <path d="M0,0 L25,0 C20,5 15,10 12,18 C10,15 5,20 0,25 Z M5,5 L15,5 C12,8 8,12 5,15 Z" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-4 w-9 h-9 pointer-events-none rotate-180">
          <svg viewBox="0 0 40 40" className="w-full h-full text-amber-400 drop-shadow-md fill-current">
            <path d="M0,0 L25,0 C20,5 15,10 12,18 C10,15 5,20 0,25 Z M5,5 L15,5 C12,8 8,12 5,15 Z" />
          </svg>
        </div>

        {/* ROTATING ASTRAL GUILLOCHE COMPASS RINGS (Expansive Motion Graphics) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Outer ring */}
          <svg
            ref={ring1Ref}
            className="w-[85vw] max-w-[900px] h-[85vw] max-h-[900px] opacity-40 text-sky-200 stroke-current will-change-transform"
            viewBox="0 0 400 400"
            fill="none"
          >
            <circle cx="200" cy="200" r="190" strokeWidth="0.7" strokeDasharray="3 4" />
            <circle cx="200" cy="200" r="170" strokeWidth="0.5" />
            <line x1="200" y1="5" x2="200" y2="395" strokeWidth="0.5" strokeDasharray="6 6" />
            <line x1="5" y1="200" x2="395" y2="200" strokeWidth="0.5" strokeDasharray="6 6" />
          </svg>

          {/* Inner counter-rotating ring */}
          <svg
            ref={ring2Ref}
            className="w-[65vw] max-w-[680px] h-[65vw] max-h-[680px] opacity-50 text-amber-300 stroke-current will-change-transform"
            viewBox="0 0 300 300"
            fill="none"
          >
            <circle cx="150" cy="150" r="140" strokeWidth="0.8" strokeDasharray="2 6" />
            <circle cx="150" cy="150" r="110" strokeWidth="0.4" />
            <polygon points="150,15 265,225 35,225" strokeWidth="0.5" strokeDasharray="4 4" />
            <polygon points="150,285 35,75 265,75" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* THE DYNAMIC PEGASUS & WINGED WARRIOR (Rises, tilts, and zooms dynamically on scroll) */}
        <div
          ref={horseWrapperRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform z-15"
        >
          {/* Ethereal Glow Backing */}
          <div
            className={`absolute w-96 h-96 rounded-full transition-opacity duration-700 blur-3xl ${
              activeMode === 'astral'
                ? 'bg-sky-400/50 opacity-100'
                : activeMode === 'blueprint'
                ? 'bg-indigo-500/35 opacity-70'
                : 'bg-amber-300/25 opacity-40'
            }`}
          />

          {/* Winged Horse isolated cutout layer (Large & commanding) */}
          <div className="relative w-[340px] sm:w-[480px] md:w-[600px] lg:w-[700px] max-w-[85vw] h-auto aspect-square flex items-center justify-center">
            <img
              src="/assets/pegasus_isolated.png"
              alt="Pegasus with Angel Warrior"
              className={`w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-all duration-500 ${
                activeMode === 'astral'
                  ? 'brightness-125 contrast-125 drop-shadow-[0_0_35px_rgba(56,189,248,0.8)]'
                  : activeMode === 'blueprint'
                  ? 'invert brightness-110 drop-shadow-[0_0_20px_rgba(165,180,252,0.7)]'
                  : 'hover:brightness-110'
              }`}
            />

            {/* Hand-Drawn Cosmic Starburst Beacon near Sword */}
            <div className="absolute top-[8%] left-[20%] w-20 h-20 pointer-events-none animate-spin-slow opacity-85">
              <img
                src="/assets/cosmic_starburst_transparent.png"
                alt="Celestial Starburst"
                className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(255,255,255,0.9)]"
              />
            </div>
          </div>
        </div>

        {/* EDITORIAL REPLAY TYPOGRAPHY (Top, left, right, bottom) */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none z-20">
          {/* Top Title: Curvy Premium Font */}
          <div className="text-center pt-2">
            <h3
              style={{ fontFamily: 'var(--font-serif-luxury)' }}
              className="text-3xl md:text-4xl text-white tracking-widest font-normal uppercase drop-shadow-md"
            >
              Replay
            </h3>
            <span className="text-[10px] font-mono tracking-[0.3em] text-sky-200/70 uppercase">
              Sreeshanth Namireddy // Archive
            </span>
          </div>

          {/* Left & Right Editorial Metrics */}
          <div className="flex justify-between items-center w-full px-2 text-[10px] font-mono tracking-widest text-sky-100 uppercase">
            <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>REAL DATA,</span>
            </div>
            <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>VERIFIED</span>
            </div>
          </div>

          {/* Bottom Statement */}
          <div className="text-center pb-2">
            <p
              style={{ fontFamily: 'var(--font-serif-curvy)' }}
              className="text-lg md:text-xl text-white tracking-wider font-light drop-shadow-md"
            >
              Know what it&apos;s worth
            </p>
            <span className="text-[9px] font-mono tracking-[0.3em] text-sky-300/60 uppercase">
              FLIGHT VECTOR: {scrollProgress}% // HOVER TO TILT 3D
            </span>
          </div>
        </div>

        {/* Hover interaction cue */}
        <div className="absolute bottom-3 right-6 z-30 pointer-events-none opacity-60 flex items-center space-x-1 text-[9px] font-mono text-sky-300">
          <Eye className="w-3 h-3" />
          <span>CLICK TO ENGAGE WING BEAT</span>
        </div>
      </div>
    </section>
  );
};
