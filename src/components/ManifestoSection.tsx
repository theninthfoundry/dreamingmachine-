import React, { useRef } from 'react';
import { sounds } from '../utils/audio';
import { Sparkles, Terminal, Flame } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="relative w-full py-28 md:py-36 bg-neutral-950 text-white overflow-hidden select-none">
      {/* Blueprint grid texture */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      {/* 1. INFINITE DUAL-DIRECTION KINETIC MARQUEE RIBBONS */}
      <div className="relative w-full overflow-hidden py-4 border-y border-white/10 bg-black/40 backdrop-blur-md">
        {/* Ribbon 1: Sliding Left */}
        <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite] space-x-8 text-neutral-400 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-8">
              <span className="text-white font-bold">RADICAL ASYMMETRY</span>
              <span className="text-amber-400">✦</span>
              <span>UNCOMPROMISED TASTE</span>
              <span className="text-sky-400">✦</span>
              <span>KINETIC ARCHITECTURE</span>
              <span className="text-pink-400">✦</span>
              <span>60FPS KINEMATIC REALISM</span>
              <span className="text-emerald-400">✦</span>
              <span>ANALOG MECHANICAL POETRY</span>
              <span className="text-purple-400">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-3 border-b border-white/10 bg-black/60 backdrop-blur-md mb-20">
        {/* Ribbon 2: Sliding Right (Reverse) */}
        <div className="flex whitespace-nowrap animate-[marquee-reverse_34s_linear_infinite] space-x-8 text-neutral-400 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-8">
              <span>SREESHANTH NAMIREDDY</span>
              <span className="text-amber-400">✦</span>
              <span className="text-white font-bold">THE GATE OF CREATION</span>
              <span className="text-sky-400">✦</span>
              <span>100% UNFILTERED DISCIPLINE</span>
              <span className="text-pink-400">✦</span>
              <span>ZERO TEMPLATE COMPROMISES</span>
              <span className="text-emerald-400">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. THE MASTER MANIFESTO SPREAD */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3 Foundational Pillars */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono tracking-widest uppercase text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 05 // Creative Code</span>
            </div>

            <h3
              style={{ fontFamily: 'var(--font-serif-luxury)' }}
              className="text-4xl sm:text-5xl text-white uppercase tracking-tight font-normal leading-tight"
            >
              The Unfiltered Discipline
            </h3>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
                <span className="font-mono text-xs text-amber-400 font-bold block mb-1">01 // KINEMATICS OVER DECORATION</span>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Motion must follow physical laws of momentum, mass, and tension. We do not slide elements; we construct living architecture.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition-colors">
                <span className="font-mono text-xs text-sky-400 font-bold block mb-1">02 // THE ANALOGUE-DIGITAL COLLISION</span>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Screen-printed misregistration, mechanical cam revs, and Roman Corinthian columns colliding with 60fps WebGL shaders.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-400/40 transition-colors">
                <span className="font-mono text-xs text-pink-400 font-bold block mb-1">03 // CONTROLLED IMPERFECTION</span>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  Symmetry is a tool, not a religion. The greatest tension occurs when an oversized serif bleeds past the frame.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Foil Manifesto Card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onClick={() => sounds.playStarSparkle()}
            className="lg:col-span-7 relative bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl overflow-hidden group cursor-pointer"
            style={{
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(251,191,36,0.1)',
            }}
          >
            {/* Interactive Specular Foil Glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,235,160,0.18) 0%, transparent 60%)',
              }}
            />

            {/* Corner Crosshairs */}
            <div className="absolute top-4 left-4 text-white/30 font-mono text-[9px]">+ + +</div>
            <div className="absolute top-4 right-4 text-white/30 font-mono text-[9px]">✦ ARCHIVE</div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center space-x-2 text-neutral-400 font-mono text-xs uppercase tracking-widest">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>DIRECTOR&apos;S COVENANT</span>
              </div>

              <blockquote
                style={{ fontFamily: 'var(--font-serif-luxury)' }}
                className="text-2xl sm:text-3xl md:text-4xl text-white font-normal uppercase tracking-wide leading-snug"
              >
                &ldquo;If a digital experience does not make your pulse quicken, it is merely software. We forge digital sanctuaries that linger in the memory.&rdquo;
              </blockquote>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono space-y-2 sm:space-y-0">
                <div>
                  <span className="text-white font-bold text-sm block">SREESHANTH NAMIREDDY</span>
                  <span className="text-neutral-400">Creative Director &amp; Interaction Engineer</span>
                </div>
                <div className="flex items-center space-x-2 text-amber-400">
                  <Flame className="w-4 h-4 fill-current" />
                  <span>100% UNCOMPROMISED</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

