import React, { useState, useEffect, useRef } from 'react';
import { sounds } from '../utils/audio';
import { Compass, MoveHorizontal, RotateCw, Eye } from 'lucide-react';
import type { ProjectItem } from './BubbleWorksSection';

interface WorkSection3DProps {
  onSelectProject: (project: ProjectItem) => void;
}

// Master list of 8 curated showcase works
const SHOWCASE_WORKS: ProjectItem[] = [
  {
    id: 'gate-of-creation',
    title: 'The Gate Of Creation',
    subtitle: 'Alpine Digital Sanctuary',
    category: 'Architecture',
    tag: 'NEXTGEN UI',
    year: '2026',
    description: 'A transcendent digital sanctuary where alpine panoramas, classical editorial linework, and soaring celestial doves converge in cinematic unity.',
    image: '/assets/hero_fullscreen_backdrop.jpg',
    accent: '#38bdf8',
    features: ['Widescreen Alpine Valley', 'Volumetric Sunbeams', 'Curvy Serif Typography', 'Seamless Mist'],
    role: 'Creative Director & Lead Architect',
  },
  {
    id: 'winged-ascent',
    title: 'The Celestial Pegasus',
    subtitle: 'Kinetic Copperplate Allegory',
    category: 'Motion Graphics',
    tag: 'GSAP KINETICS',
    year: '2026',
    description: 'Classical copperplate steed and warrior engraving moving with synchronized ScrollTrigger elevation, 16° aerodynamic roll, and counter-rotating Guilloche rings.',
    image: '/assets/pegasus_master_exact.jpg',
    accent: '#f59e0b',
    features: ['240px Flight Elevation', 'Guilloche Astrolabe Rings', 'Gold Foil Reflection', '45-Node Starlight'],
    role: 'Motion Designer & Shader Engineer',
  },
  {
    id: 'rwb-cyber-porsche',
    title: 'Cyber Porsche 911 RWB',
    subtitle: 'Rauh-Welt Begriff Aero Philosophy',
    category: 'Motorsport',
    tag: 'AERO DESIGN',
    year: '2025',
    description: 'An aggressive tribute to Akira Nakai and Rauh-Welt Begriff widebody philosophy fused with Tokyo midnight cyberpunk aesthetics and drift physics.',
    image: '/assets/mood_cyber_porsche.jpg',
    accent: '#ef4444',
    features: ['Widebody Aero Geometry', 'Cyber Decal Matrix', 'Exhaust Flame Physics', 'Stance Tuning'],
    role: 'Aero Concept Designer',
  },
  {
    id: 'f1-telemetry-machine',
    title: 'Formula 1 Aerodynamic Machine',
    subtitle: 'Venturi Ground Effect Monocoque',
    category: 'Engineering',
    tag: 'TELEMETRY',
    year: '2025',
    description: 'High-downforce ground-effect single seater engineered with carbon fiber weave, floor venturi tunnels, and high-frequency real-time aerodynamic telemetry.',
    image: '/assets/entry_f1_car.jpg',
    accent: '#10b981',
    features: ['Venturi Ground Effect', 'DRS Actuator Dynamics', 'Thermal Brake Heatmap', 'Apex Telemetry'],
    role: 'Aerodynamicist & UI Engineer',
  },
  {
    id: 'web-audio-synth',
    title: 'Solfeggio Synthesizer',
    subtitle: 'Mathematical Procedural Audio Engine',
    category: 'Audio Architecture',
    tag: 'WEB AUDIO DSP',
    year: '2026',
    description: 'Mathematical procedural audio engine built on the Web Audio API, generating real-time celestial pentatonic chords, sub-bass impacts, and paper noise.',
    image: '/assets/poster_gate_of_heaven.jpg',
    accent: '#8b5cf6',
    features: ['528Hz Solfeggio Tone', 'Pentatonic Chord Progression', 'FM Bubble Modulation', 'Tactile Clang'],
    role: 'DSP Engineer & Sound Architect',
  },
  {
    id: 'pop-art-liberty',
    title: 'Statue of Liberty Rock Rebel',
    subtitle: 'Monochrome Print Laboratory Edition',
    category: 'Subversive Art',
    tag: 'PRINT LAB',
    year: '2025',
    description: 'High-contrast monochrome print laboratory edition fusing neoclassical civic iconography with rock and roll electric guitar rebellion.',
    image: '/assets/entry_statue_liberty.jpg',
    accent: '#ec4899',
    features: ['High-Pass Stencil Linework', 'Halftone Screen Print', 'Rebel Sign Gesture', 'Grain Texture'],
    role: 'Print Artist & Creative Rebel',
  },
  {
    id: 'toyota-twin-cam',
    title: 'Toyota 4A-GE Twin Cam 16',
    subtitle: 'Naturally Aspirated Precision Blueprint',
    category: 'Mechanical',
    tag: 'JDM CLASSIC',
    year: '2025',
    description: 'Legendary naturally aspirated twin-cam 16-valve engine study with quad throttle bodies, high-revving harmonic resonance, and vintage JDM blueprinting.',
    image: '/assets/toyota_twin_cam.jpg',
    accent: '#f97316',
    features: ['Quad Throttle Velocity Stacks', '8,500 RPM Valve Resonance', 'Cast Iron Block Spec', 'Period Blueprint'],
    role: 'Mechanical Draftsman',
  },
  {
    id: 'space-cosmic-bubble',
    title: 'Space Cosmic Bubble Poster',
    subtitle: 'Retro Japanese Brutalist Magazine Spec',
    category: 'Graphic Design',
    tag: 'BRUTALIST TYPE',
    year: '2026',
    description: 'Vintage 90s brutalist Japanese magazine layout combining bubbly graffiti typography, astronomical star data, and halftone paper texture.',
    image: '/assets/mood_space_cosmic_bubble_poster.jpg',
    accent: '#06b6d4',
    features: ['Bubble Graffiti Lettering', 'Binary Multiple Telemetry', 'Luminosity Equation', 'Halftone Grunge'],
    role: 'Graphic Designer & Typographer',
  },
];

export const WorkSection3D: React.FC<WorkSection3DProps> = ({ onSelectProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartAngle, setDragStartAngle] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  // Filtered projects
  const filteredProjects = SHOWCASE_WORKS.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'ARCH') return p.category === 'Architecture';
    if (selectedFilter === 'MOTION') return p.category === 'Motion Graphics';
    if (selectedFilter === 'MOTOR') return p.category === 'Motorsport' || p.category === 'Mechanical' || p.category === 'Engineering';
    if (selectedFilter === 'ART') return p.category === 'Subversive Art' || p.category === 'Graphic Design';
    return true;
  });

  // Smooth continuous rotation in 3D
  useEffect(() => {
    let animId: number;

    const animate = () => {
      if (!isHovered && !isDragging) {
        setCurrentAngle((prev) => (prev + 0.18) % 360);
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, isDragging]);

  // Drag interaction to spin the wheel
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartAngle(currentAngle);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    setCurrentAngle(dragStartAngle + dx * 0.35);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragStartAngle(currentAngle);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartX;
    setCurrentAngle(dragStartAngle + dx * 0.35);
  };

  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 320 : 520;
  const count = filteredProjects.length;

  return (
    <section
      ref={containerRef}
      id="works"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      className="relative w-full min-h-[1100px] lg:min-h-[1250px] py-20 px-4 sm:px-8 flex flex-col items-center justify-center bg-[#071338] text-white overflow-visible select-none -my-16 z-20"
      style={{
        backgroundImage: `radial-gradient(ellipse at center, rgba(14, 45, 120, 0.45) 0%, rgba(7, 19, 56, 0.95) 60%, #071338 100%)`,
      }}
    >
      {/* Blueprint background grid for laboratory vibe */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="relative z-30 max-w-4xl text-center mb-8 flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border border-sky-400/30 bg-sky-950/60 text-sky-300 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 animate-spin-slow text-amber-400" />
          <span>Section 03 // 3D Orbital Portfolio Archive</span>
        </div>

        <h2
          style={{ fontFamily: 'var(--font-serif-luxury)' }}
          className="text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-wider uppercase mt-4"
        >
          Selected Works
        </h2>

        <p className="mt-2 text-sky-200/70 font-serif italic text-sm md:text-base max-w-lg">
          A continuous 3D celestial orbit of architectural, kinetic, and subversive engineering. Click any card to pop it open.
        </p>

        {/* Filter Pills & Drag Helper */}
        <div className="mt-6 flex flex-wrap items-center gap-2 justify-center">
          <div className="flex items-center p-1 rounded-full bg-sky-950/70 border border-sky-400/20 backdrop-blur-md text-xs font-mono">
            {[
              { id: 'ALL', label: 'ALL (8)' },
              { id: 'ARCH', label: 'ARCHITECTURE' },
              { id: 'MOTION', label: 'MOTION' },
              { id: 'MOTOR', label: 'MOTORSPORT' },
              { id: 'ART', label: 'SUBVERSIVE ART' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick(600);
                  setSelectedFilter(tab.id);
                }}
                className={`px-3 py-1 rounded-full uppercase transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-sky-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-950/40 border border-sky-400/20 text-sky-400 text-xs font-mono">
            <MoveHorizontal className="w-3.5 h-3.5 animate-pulse" />
            <span>Drag or hover to rotate orbit</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3D ROTATING ORBITAL WHEEL (Bleeds above and below to unify the experience) */}
      {/* ========================================================================= */}
      <div
        ref={wheelRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-20 w-full max-w-[1400px] h-[780px] md:h-[880px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-[1400px]"
        style={{ perspective: '1400px' }}
      >
        {/* Orbital Center Starlight Beacon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />

        {/* 3D Wheel Stage */}
        <div
          className="relative w-full h-full flex items-center justify-center preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {filteredProjects.map((project, idx) => {
            // Angle of this card along the circle
            const cardAngle = (idx * (360 / count) + currentAngle) % 360;
            const rad = (cardAngle * Math.PI) / 180;

            // 3D Cylinder / Orbit Coordinates
            const x = Math.sin(rad) * radius;
            const z = Math.cos(rad) * radius;
            const y = Math.sin(rad * 2) * 35; // Gentle figure-8 vertical wave

            // Depth calculation: front cards (z > 0) are large & crisp; back cards are faded
            const depthFactor = (z + radius) / (2 * radius); // 0 (back) to 1 (front)
            const scale = 0.72 + depthFactor * 0.38; // 0.72x in back, 1.1x in front
            const opacity = 0.35 + depthFactor * 0.65; // 0.35 in back, 1.0 in front
            const isFacingFront = z > radius * 0.25;

            return (
              <div
                key={project.id}
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playBubblePop();
                  onSelectProject(project);
                }}
                className={`absolute w-72 sm:w-80 md:w-[350px] p-4 rounded-2xl bg-[#0c2368]/90 border border-sky-300/30 backdrop-blur-xl shadow-2xl transition-all duration-200 cursor-pointer group select-none will-change-transform ${
                  isFacingFront ? 'pointer-events-auto hover:border-amber-400 hover:scale-105' : 'pointer-events-auto'
                }`}
                style={{
                  transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                  opacity,
                  zIndex: Math.round(z + radius),
                  boxShadow: isFacingFront
                    ? '0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(56,189,248,0.2)'
                    : '0 10px 30px rgba(0,0,0,0.5)',
                }}
              >
                {/* Gold corner filigree accent */}
                <div className="absolute top-2 left-2 text-amber-400/80 font-mono text-[9px]">✦</div>
                <div className="absolute top-2 right-2 text-amber-400/80 font-mono text-[9px]">✦</div>

                {/* Card Artwork Image */}
                <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-neutral-950 border border-sky-400/20 mb-3.5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Year & Category Badge */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-widest text-amber-300 uppercase border border-amber-400/30">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] text-white/80">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Card Editorial Typography */}
                <div className="flex flex-col space-y-1.5">
                  <h3
                    style={{ fontFamily: 'var(--font-serif-luxury)' }}
                    className="text-xl sm:text-2xl text-white font-normal uppercase tracking-wide group-hover:text-amber-200 transition-colors line-clamp-1"
                  >
                    {project.title}
                  </h3>

                  <p className="text-sky-200/70 text-xs font-serif italic line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Interactive Action Pill */}
                  <div className="pt-2 flex items-center justify-between border-t border-sky-400/15 text-[11px] font-mono">
                    <span className="text-sky-400/90 group-hover:text-white transition-colors flex items-center space-x-1">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>CLICK TO EXPAND</span>
                    </span>
                    <span className="text-sky-300 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM TELEMETRY BAR */}
      <div className="relative z-30 w-full max-w-4xl mx-auto mt-4 px-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-sky-400/70 uppercase">
        <span className="flex items-center space-x-1">
          <RotateCw className="w-3 h-3 text-amber-400 animate-spin-slow" />
          <span>CONTINUOUS 3D ORBITAL KINEMATICS</span>
        </span>
        <span className="hidden sm:inline">RADIUS: {radius}PX • 360° SPHERICAL PERSPECTIVE</span>
        <span>THE NINTH FOUNDRY</span>
      </div>
    </section>
  );
};
