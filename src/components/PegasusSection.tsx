import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { sounds } from '../utils/audio';
import { Compass, Sparkles } from 'lucide-react';

interface PegasusSectionProps {
  onOpenSketchbook: () => void;
}

export const PegasusSection: React.FC<PegasusSectionProps> = ({ onOpenSketchbook }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardFrameRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [foilAngle, setFoilAngle] = useState<number>(45);

  // Starlight background particle dust
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

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4 - 0.2,
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

  // 3D Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardFrameRef.current) return;
    const rect = cardFrameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rx = -(y / rect.height) * 12;
    const ry = (x / rect.width) * 12;

    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    setFoilAngle(angle);

    gsap.to(cardFrameRef.current, {
      rotateX: rx,
      rotateY: ry,
      transformPerspective: 1200,
      duration: 0.4,
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

  // Replay click trigger: celestial shockwave burst
  const handleReplayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playStarSparkle();

    if (shockwaveRef.current) {
      gsap.fromTo(
        shockwaveRef.current,
        { scale: 0.2, opacity: 0.95 },
        { scale: 3.5, opacity: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
  };

  return (
    <section
      ref={containerRef}
      id="pegasus"
      className="relative w-full min-h-screen py-16 md:py-24 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center bg-[#071338] text-white overflow-hidden select-none z-10"
    >
      {/* Deep Royal Azure background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071338] via-[#091f5a] to-[#071338] pointer-events-none" />

      {/* Blueprint grid texture */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />

      {/* Interactive starlight particles */}
      <canvas ref={particlesRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Header telemetry / Editorial subtitle */}
      <div className="relative z-20 max-w-4xl text-center mb-8 flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-sky-400/30 bg-sky-950/40 text-sky-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 animate-spin-slow text-amber-400" />
          <span>Section 02 // Classical Allegory &amp; Verified Craft</span>
        </div>

        <h2
          style={{ fontFamily: 'var(--font-serif-luxury)' }}
          className="text-4xl sm:text-6xl md:text-7xl text-white font-normal uppercase tracking-wider mt-4"
        >
          The Winged Steed
        </h2>
        <p className="mt-2 text-sky-200/70 font-serif italic text-sm md:text-base max-w-lg">
          &ldquo;Beyond the mist lies Pegasus — symbol of untamed momentum and verified ideas.&rdquo;
        </p>
      </div>

      {/* THE MASTER EXACT PEGASUS ARTWORK CANVAS */}
      <div
        ref={cardFrameRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative z-20 w-full max-w-4xl md:max-w-5xl rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.85)] border border-sky-300/40 transition-all duration-300 group cursor-default"
        style={{
          boxShadow: isHovered
            ? '0 35px 120px rgba(14, 60, 160, 0.5), 0 0 60px rgba(212, 175, 55, 0.25)'
            : '0 25px 80px rgba(0,0,0,0.8)',
        }}
      >
        {/* Dynamic Metallic Foil Specular Reflection */}
        <div
          className="absolute inset-0 pointer-events-none z-20 mix-blend-color-dodge opacity-25 group-hover:opacity-45 transition-opacity"
          style={{
            background: `linear-gradient(${foilAngle}deg, transparent 20%, rgba(255,220,130,0.4) 45%, rgba(255,255,255,0.7) 50%, rgba(255,220,130,0.4) 55%, transparent 80%)`,
          }}
        />

        {/* Starlight shockwave burst on Replay */}
        <div
          ref={shockwaveRef}
          className="absolute top-[8%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-amber-300 bg-amber-400/20 blur-md pointer-events-none scale-0 opacity-0 z-30"
        />

        {/* The Exact Master Artwork Image (Full Bleed filling the card) */}
        <div className="relative w-full aspect-[943/886] bg-[#0c2368]">
          <img
            src="/assets/pegasus_master_exact.jpg"
            alt="The Winged Pegasus Master Artwork"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
          />

          {/* Interactive Hotspot: REPLAY (Top Center) */}
          <button
            onClick={handleReplayClick}
            className="absolute top-[2%] left-1/2 -translate-x-1/2 px-8 py-3 rounded-full hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer z-30 group/btn"
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
            className="absolute bottom-[2.5%] right-[2.5%] sm:bottom-[3.5%] sm:right-[3.5%] px-5 py-2.5 rounded-full bg-black/40 hover:bg-amber-400 hover:text-neutral-950 text-white border border-sky-300/40 hover:border-amber-400 text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-2xl transition-all duration-300 cursor-pointer pointer-events-auto flex items-center space-x-2 group/sketch z-30"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover/sketch:text-neutral-950 transition-colors" />
            <span className="font-bold">OPEN THE SKETCHBOOK</span>
            <span className="text-amber-400 group-hover/sketch:text-neutral-950 group-hover/sketch:translate-x-0.5 group-hover/sketch:translate-y-0.5 transition-transform font-bold">↘</span>
          </button>
        </div>
      </div>

      {/* Bottom Telemetry Note */}
      <div className="relative z-20 mt-8 flex items-center space-x-2 text-[11px] font-mono tracking-widest text-sky-300/60 uppercase">
        <span>KNOW WHAT IT&apos;S WORTH</span>
        <span>•</span>
        <span>SREESHANTH NAMIREDDY // ARCHIVE</span>
      </div>
    </section>
  );
};
