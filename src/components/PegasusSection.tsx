import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sounds } from '../utils/audio';
import { Sparkles, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PegasusSectionProps {
  onOpenSketchbook: () => void;
}

export const PegasusSection: React.FC<PegasusSectionProps> = ({ onOpenSketchbook }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const masterCanvasRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const horseGlowRef = useRef<HTMLDivElement>(null);

  const [foilAngle, setFoilAngle] = useState<number>(45);
  const [activeMode, setActiveMode] = useState<'classic' | 'astral' | 'blueprint'>('classic');

  // 1. Interactive Starlight Particle Dust Canvas
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

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.75 + 0.2,
      pulse: Math.random() * 0.04 + 0.01,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += Math.sin(Date.now() * p.pulse * 0.05) * 0.008;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 235, 175, ${Math.max(0.15, Math.min(0.9, p.opacity))})`;
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

  // 2. Scroll Animation for Horse and Man + Ambient Celestial Hover
  useEffect(() => {
    if (!containerRef.current || !masterCanvasRef.current) return;

    const ctx = gsap.context(() => {
      // Gentle living celestial floating hover
      gsap.to(masterCanvasRef.current, {
        y: '-=14',
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Scroll-scrubbed kinetic ascent: As you scroll, the steed ascends and scales smoothly
      gsap.fromTo(
        masterCanvasRef.current,
        {
          scale: 1.0,
          y: 35,
        },
        {
          scale: 1.08,
          y: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3. Interactive 3D Perspective Tilt on Mouse Movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !masterCanvasRef.current) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;

    const rx = -y * 8;
    const ry = x * 8;

    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    setFoilAngle(angle);

    gsap.to(masterCanvasRef.current, {
      rotateX: rx,
      rotateY: ry,
      transformPerspective: 1200,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!masterCanvasRef.current) return;
    gsap.to(masterCanvasRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.9,
      ease: 'power3.out',
    });
  };

  // 4. Replay Click Trigger: Celestial Starlight Shockwave Burst
  const handleReplayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playStarSparkle();

    if (shockwaveRef.current) {
      gsap.fromTo(
        shockwaveRef.current,
        { scale: 0.2, opacity: 1 },
        { scale: 5, opacity: 0, duration: 1.0, ease: 'power2.out' }
      );
    }
    if (horseGlowRef.current) {
      gsap.fromTo(
        horseGlowRef.current,
        { opacity: 0.8, scale: 1.15 },
        { opacity: 0, scale: 1, duration: 1.2, ease: 'power2.out' }
      );
    }
  };

  return (
    <section
      ref={containerRef}
      id="pegasus"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen h-screen overflow-hidden bg-[#0c2368] text-white select-none flex items-center justify-center z-10"
    >
      {/* ============================================================== */}
      {/* 1. THE WHOLE SECTION FILLED BY THE MASTER PEGASUS ARTWORK       */}
      {/* ============================================================== */}
      <div
        ref={masterCanvasRef}
        className="absolute inset-0 w-full h-full will-change-transform flex items-center justify-center"
      >
        {/* Full-bleed master artwork filling the entire section edge-to-edge */}
        <img
          src="/assets/pegasus_master_exact.jpg"
          alt="The Winged Pegasus Master Artwork"
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-all duration-700 ${
            activeMode === 'astral'
              ? 'brightness-110 contrast-125 saturate-150'
              : activeMode === 'blueprint'
              ? 'brightness-105 contrast-135 hue-rotate-15 saturate-125'
              : 'brightness-100 contrast-100'
          }`}
        />

        {/* Dynamic Metallic Gold Foil Specular Reflection sweeping with mouse */}
        <div
          className="absolute inset-0 pointer-events-none z-15 mix-blend-color-dodge opacity-30 hover:opacity-45 transition-opacity"
          style={{
            background: `linear-gradient(${foilAngle}deg, transparent 20%, rgba(255,225,140,0.35) 45%, rgba(255,255,255,0.7) 50%, rgba(255,225,140,0.35) 55%, transparent 80%)`,
          }}
        />

        {/* Blueprint Coordinate Grid Overlay when Blueprint mode active */}
        {activeMode === 'blueprint' && (
          <div className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none mix-blend-screen z-15" />
        )}

        {/* Celestial Astral Glow Overlay when Astral mode active */}
        {activeMode === 'astral' && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.35)_0%,rgba(14,165,233,0.15)_40%,transparent_75%)] pointer-events-none mix-blend-color-dodge z-15" />
        )}

        {/* Kinetic Horse & Rider Radiance Aura on Replay */}
        <div
          ref={horseGlowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,235,160,0.45)_0%,rgba(56,189,248,0.2)_45%,transparent_75%)] pointer-events-none opacity-0 blur-3xl z-15"
        />

        {/* Starlight Shockwave Ring on Replay */}
        <div
          ref={shockwaveRef}
          className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-amber-300 bg-amber-400/20 blur-md pointer-events-none scale-0 opacity-0 z-25"
        />
      </div>

      {/* ============================================================== */}
      {/* 2. INTERACTIVE STARLIGHT PARTICLES CANVAS                      */}
      {/* ============================================================== */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* ============================================================== */}
      {/* 3. FOUR ARTEFACT GOLD FILIGREE CORNER BRACKETS                 */}
      {/* ============================================================== */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-amber-400/90 pointer-events-none z-30 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-amber-400/90 pointer-events-none z-30 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-amber-400/90 pointer-events-none z-30 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-amber-400/90 pointer-events-none z-30 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]" />

      {/* ============================================================== */}
      {/* 4. FLOATING EDITORIAL MODE CONTROLS HUD (Top Center)           */}
      {/* ============================================================== */}
      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-35 flex items-center space-x-2 sm:space-x-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-sky-300/30 shadow-2xl">
        <button
          onClick={() => {
            sounds.playClick();
            setActiveMode('classic');
          }}
          className={`px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider uppercase transition-all ${
            activeMode === 'classic'
              ? 'bg-amber-400 text-neutral-950 font-bold shadow-[0_0_15px_rgba(251,191,36,0.6)]'
              : 'text-sky-200 hover:text-white hover:bg-white/10'
          }`}
        >
          Classic Engraving
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            setActiveMode('astral');
          }}
          className={`px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider uppercase transition-all ${
            activeMode === 'astral'
              ? 'bg-sky-400 text-neutral-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.6)]'
              : 'text-sky-200 hover:text-white hover:bg-white/10'
          }`}
        >
          Astral Radiance
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            setActiveMode('blueprint');
          }}
          className={`px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider uppercase transition-all ${
            activeMode === 'blueprint'
              ? 'bg-cyan-400 text-neutral-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.6)]'
              : 'text-sky-200 hover:text-white hover:bg-white/10'
          }`}
        >
          Blueprint Contour
        </button>
      </div>

      {/* ============================================================== */}
      {/* 5. INTERACTIVE HOTSPOTS ON THE FULL-BLEED ARTWORK              */}
      {/* ============================================================== */}

      {/* Interactive Hotspot: REPLAY (Top Center, over the word Replay) */}
      <button
        onClick={handleReplayClick}
        className="absolute top-[12%] sm:top-[14%] left-1/2 -translate-x-1/2 px-10 py-4 rounded-full hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer z-30 group/btn"
        title="Click to trigger starlight shockwave"
      >
        <span className="sr-only">Replay Celestial Starlight</span>
        <div className="absolute inset-0 rounded-full border border-transparent group-hover/btn:border-sky-300/40 transition-colors" />
      </button>

      {/* Interactive Hotspot: OPEN THE SKETCHBOOK ↘ (Bottom Right) */}
      <button
        onClick={() => {
          sounds.playPaperRustle();
          onOpenSketchbook();
        }}
        className="absolute bottom-[4.5%] right-[4%] sm:bottom-[5%] sm:right-[5%] px-5 py-2.5 rounded-full bg-black/50 hover:bg-amber-400 hover:text-neutral-950 text-white border border-sky-300/40 hover:border-amber-400 text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-2xl transition-all duration-300 cursor-pointer pointer-events-auto flex items-center space-x-2 group/sketch z-35 hover:scale-105 active:scale-95"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover/sketch:text-neutral-950 transition-colors" />
        <span className="font-bold">OPEN THE SKETCHBOOK</span>
        <span className="text-amber-400 group-hover/sketch:text-neutral-950 group-hover/sketch:translate-x-0.5 group-hover/sketch:translate-y-0.5 transition-transform font-bold">↘</span>
      </button>

      {/* Subtle Bottom Ambient Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] text-sky-200/50 uppercase">
        <Compass className="w-3 h-3 text-amber-400/70 animate-spin-slow" />
        <span>SCROLL TO ENTER 3D WORKS ORBIT</span>
      </div>
    </section>
  );
};
