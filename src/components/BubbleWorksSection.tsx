import React, { useEffect, useRef, useState } from 'react';
import { sounds } from '../utils/audio';
import { ChevronLeft, ChevronRight, Layers, Sparkles, ArrowUpRight } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  year: string;
  description: string;
  image: string;
  accent: string;
  features: string[];
  role: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'aetheria',
    title: 'Aetheria Sanctuary',
    subtitle: 'The Gate of Creation',
    category: 'Spatial UI & 3D',
    tag: 'HERO SPEC',
    year: '2026',
    description: 'A transcendent digital sanctuary where 4 Corinthian marble pillars arise from below into an alpine vista with procedural audio synthesis.',
    image: '/assets/pillars_clean_reference.jpg',
    accent: '#38bdf8',
    features: ['Rising 4-Pillar Physics', 'Procedural Web Audio Chimes', 'Parental Advisory Typography', 'Mountain Parallax Drift'],
    role: 'Creative Director & Interaction Engineer',
  },
  {
    id: 'pegasus',
    title: 'The Winged Ascent',
    subtitle: 'Pegasus Celestial Motion',
    category: 'Motion Design',
    tag: 'ROYAL BLUE',
    year: '2026',
    description: 'High-precision classical engraving animation of a winged warrior on Pegasus, featuring orbital guilloche compass rings and starlight dust.',
    image: '/assets/pegasus_editorial.jpg',
    accent: '#60a5fa',
    features: ['Dynamic Flight States', 'Counter-Rotating Guilloche Rings', 'Canvas Starlight Physics', '3D Cursor Tilt'],
    role: 'Motion Graphics & Typography',
  },
  {
    id: 'cyber-porsche',
    title: 'Midnight RWB 911',
    subtitle: 'Exposed Twin Turbo & Bubble Tag',
    category: 'Creative Dev',
    tag: 'RAW JDM',
    year: '2026',
    description: 'Street-racing culture collision featuring exposed turbocharger plumbing, custom roll cage, and vibrant spray-paint bubble lettering.',
    image: '/assets/mood_cyber_porsche.jpg',
    accent: '#e96452',
    features: ['Custom RWB Widebody', 'Exposed Titanium Turbo', 'Street Graffiti Lettering', 'Die-Cut Washi Aesthetics'],
    role: 'Art Director & 3D Visualizer',
  },
  {
    id: 'f1-aerodynamics',
    title: '#44 Monoposto F1',
    subtitle: 'Ground Effect Aerodynamics',
    category: 'Spatial UI & 3D',
    tag: 'PRECISION',
    year: '2026',
    description: 'High-contrast blueprint analysis of aerodynamic flow fields, venturi floor channels, and carbon fiber packaging on modern F1 cars.',
    image: '/assets/mood_f1_car_topdown.jpg',
    accent: '#10b981',
    features: ['Venturi Floor Dynamics', 'Carbon Monocoque Spec', 'High-Contrast Telemetry', 'Top-Down Silhouette'],
    role: 'Technical Direction & Blueprint Design',
  },
  {
    id: 'subversive-liberty',
    title: 'Lady Liberty Les Paul',
    subtitle: 'Subversive Classical Mashup',
    category: 'Editorial Manga',
    tag: 'ROCK DEFIANCE',
    year: '2026',
    description: 'Deconstructing classical neoclassical iconography with electric rock guitars and raw underground music energy.',
    image: '/assets/mood_statue_liberty_guitar.jpg',
    accent: '#a855f7',
    features: ['Classical Corrupted Icons', 'High-Contrast Ink Shading', 'Subversive Typography', 'Vector Screen Print'],
    role: 'Graphic Artist & Concept Design',
  },
  {
    id: 'risograph-blueberries',
    title: 'Chromatic Halftone',
    subtitle: 'Risograph Misregistration Lab',
    category: 'Interaction Lab',
    tag: 'PRINT LAB',
    year: '2026',
    description: 'Exploration of physical printing artifacts, RGB-to-CMYK halftone dot matrixes, and intentional chromatic misregistration.',
    image: '/assets/mood_halftone_blueberries.jpg',
    accent: '#3b82f6',
    features: ['Halftone Dot Density', 'Chromatic Aberration Offset', 'Tactile Screen Print Grain', 'Pop Color Calibration'],
    role: 'Print & Visual Researcher',
  },
  {
    id: 'manga-proto',
    title: 'Midnight 2029',
    subtitle: 'Tokyo Speed Manga Reader',
    category: 'Editorial Manga',
    tag: 'HIGH SPEED',
    year: '2026',
    description: 'Retro Japanese cyberpunk racing editorial colliding 80s manga line-art with high-octane typography and analog car culture.',
    image: '/assets/porsche_manga_poster.jpg',
    accent: '#ef4444',
    features: ['Japanese Manga Decals', 'Bold Kanji & Katakana Type', 'Washi Tape & Pins', 'Draggable Canvas'],
    role: 'Editorial Director & Graphic Artist',
  },
  {
    id: 'twin-cam',
    title: 'Twin Cam 16',
    subtitle: 'Analog Mechanical Archive',
    category: 'Creative Dev',
    tag: 'MECHANICAL',
    year: '2026',
    description: 'Pop-art mechanical dissection celebrating the timeless purity of high-revving Toyota DOHC naturally aspirated engines.',
    image: '/assets/toyota_twin_cam.jpg',
    accent: '#f59e0b',
    features: ['Die-Cut Sticker Physics', 'Handwritten Callouts', 'Tactile Sound Effects', 'Analog rev acoustics'],
    role: 'Concept & Interaction',
  },
  {
    id: 'space-cosmic',
    title: 'Space Cosmic Typo',
    subtitle: 'Binary Multiple Bubble Spec',
    category: 'Interaction Lab',
    tag: 'BUBBLE TYPE',
    year: '2026',
    description: 'Astrophysical typography study combining nuclear fusion infographics, 3D puffy bubble lettering, and high-fashion editorial scripts.',
    image: '/assets/mood_space_cosmic_bubble_poster.jpg',
    accent: '#f472b6',
    features: ['3D Puffy Bubble Geometry', 'Binary Multiple Script', 'Astrophysical Infographics', 'QR Spec Gateway'],
    role: 'Typographic Lead & Graphic Director',
  },
  {
    id: 'cosmic-companion',
    title: 'Nebula Cat 3AM',
    subtitle: 'Generative Cosmic Stillness',
    category: 'Interaction Lab',
    tag: 'NOCTURNAL',
    year: '2026',
    description: 'Painterly digital meditation capturing the quiet cosmic companionship of nocturnal creative studio sessions.',
    image: '/assets/mood_cosmic_galaxy_cat.jpg',
    accent: '#8b5cf6',
    features: ['Purple Nebula Brushes', 'Constellation Starlight', 'Lo-Fi Chill Soundscape', 'Tactile Sticker Peel'],
    role: 'Digital Painter & Creative Dev',
  },
];

interface BubbleWorksSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const BubbleWorksSection: React.FC<BubbleWorksSectionProps> = ({ onSelectProject }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const categories = ['ALL', 'Spatial UI & 3D', 'Motion Design', 'Editorial Manga', 'Creative Dev'];

  const filteredProjects = activeCategory === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  // INTERACTIVE BUBBLE CANVAS ENGINE (Behind the works)
  useEffect(() => {
    const canvas = canvasRef.current;
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

    // Mouse tracker for bubble repulsion
    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let popped = false;
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        const dist = Math.sqrt((clickX - b.x) ** 2 + (clickY - b.y) ** 2);
        if (dist < b.radius + 15) {
          sounds.playBubblePop();
          // Reset bubble to bottom
          b.y = height + 40;
          b.x = clickX + (Math.random() - 0.5) * 60;
          b.vy = -Math.random() * 1.5 - 0.5;
          popped = true;
          break;
        }
      }

      if (!popped) {
        sounds.playBubblePop();
        // Spawn fresh bubble at click location
        bubbles.push({
          x: clickX,
          y: clickY,
          baseRadius: Math.random() * 35 + 20,
          radius: Math.random() * 35 + 20,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -Math.random() * 1.5 - 0.4,
          wobbleAngle: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.05,
          hue: Math.random() > 0.5 ? 200 : 320,
          alpha: 0.35,
        });
      }
    };
    canvas.addEventListener('click', handleCanvasClick);

    // Create 32 gelatinous floating bubbles
    interface Bubble {
      x: number;
      y: number;
      baseRadius: number;
      radius: number;
      vx: number;
      vy: number;
      wobbleAngle: number;
      wobbleSpeed: number;
      hue: number;
      alpha: number;
    }

    const bubbles: Bubble[] = Array.from({ length: 32 }, () => {
      const r = Math.random() * 45 + 25;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius: r,
        radius: r,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 0.9 - 0.3, // gently floating upwards
        wobbleAngle: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.04 + 0.02,
        hue: Math.random() > 0.5 ? 210 : 330, // pastel cyan or pink iridescent
        alpha: Math.random() * 0.25 + 0.15,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach((b) => {
        // Natural floating
        b.x += b.vx;
        b.y += b.vy;
        b.wobbleAngle += b.wobbleSpeed;

        // Wrap around boundaries
        if (b.y < -b.baseRadius) b.y = height + b.baseRadius;
        if (b.x < -b.baseRadius) b.x = width + b.baseRadius;
        if (b.x > width + b.baseRadius) b.x = -b.baseRadius;

        // Mouse repulsion
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius + b.baseRadius) {
          const force = (1 - dist / (mouse.radius + b.baseRadius)) * 4;
          b.x += (dx / dist) * force;
          b.y += (dy / dist) * force;
          b.radius = b.baseRadius * (1 + (Math.sin(b.wobbleAngle) * 0.2));
        } else {
          // Relax radius back to base with subtle squish
          b.radius = b.baseRadius * (1 + (Math.sin(b.wobbleAngle) * 0.08));
        }

        // Render bubble with liquid glass sheen
        const grad = ctx.createRadialGradient(
          b.x - b.radius * 0.3,
          b.y - b.radius * 0.3,
          b.radius * 0.1,
          b.x,
          b.y,
          b.radius
        );

        grad.addColorStop(0, `hsla(${b.hue}, 90%, 95%, ${b.alpha * 1.5})`);
        grad.addColorStop(0.6, `hsla(${b.hue}, 80%, 75%, ${b.alpha * 0.8})`);
        grad.addColorStop(0.9, `hsla(${b.hue + 40}, 90%, 65%, ${b.alpha * 1.2})`);
        grad.addColorStop(1, `hsla(${b.hue}, 80%, 50%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // High gloss specular reflection highlight
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 2})`;
        ctx.beginPath();
        ctx.ellipse(
          b.x - b.radius * 0.35,
          b.y - b.radius * 0.35,
          b.radius * 0.25,
          b.radius * 0.14,
          -Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, []);

  // Check scroll position for arrows
  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  const scrollBy = (offset: number) => {
    sounds.playBubblePop();
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section
      id="works"
      className="relative w-full min-h-screen py-24 md:py-32 bg-[#faf9f6] text-neutral-900 overflow-hidden select-none"
    >
      {/* 1. BACKGROUND BUBBLE EFFECT CANVAS (Behind All Works) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* 2. GIANT BUBBLE EFFECT TYPOGRAPHY & AUTHENTIC PUFFY BUBBLE ARTWORK (Behind Cards) */}
      <div className="absolute inset-0 z-0 flex flex-col justify-around pointer-events-none opacity-25 overflow-hidden">
        <div
          style={{ fontFamily: 'var(--font-funky-bubble)' }}
          className="text-7xl sm:text-9xl md:text-[14rem] text-neutral-400/40 whitespace-nowrap tracking-wider select-none transform -translate-x-12"
        >
          SELECTED WORKS
        </div>

        {/* Authentic Puffy Bubble Graphic Overlay */}
        <div className="w-full flex items-center justify-center opacity-60 my-[-60px]">
          <img
            src="/assets/bubble_space_cosmic_sticker.png"
            alt="Space Cosmic Puffy Bubble Lettering"
            className="w-80 sm:w-96 md:w-[500px] h-auto object-contain animate-float drop-shadow-2xl"
          />
        </div>

        <div
          style={{ fontFamily: 'var(--font-serif-luxury)' }}
          className="text-6xl sm:text-8xl md:text-[12rem] text-sky-900/20 whitespace-nowrap tracking-widest uppercase select-none transform translate-x-24"
        >
          NAMIREDDY ARCHIVE
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200 text-xs font-mono uppercase tracking-widest text-neutral-600 shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin-slow" />
              <span>Section 04 // Unified Master Archive</span>
            </div>

            <h2
              style={{ fontFamily: 'var(--font-serif-luxury)' }}
              className="text-4xl sm:text-6xl md:text-7xl font-normal text-neutral-900 uppercase tracking-tight"
            >
              All Creations
            </h2>
            <p className="mt-2 text-neutral-500 font-light text-sm md:text-base max-w-md">
              A single unified portfolio deck holding all spatial architectures, motion systems, and experimental artifacts.
            </p>
          </div>

          {/* Navigation controls & Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/80 backdrop-blur-md border border-neutral-200/80 shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sounds.playClick(600);
                    setActiveCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                    activeCategory === cat
                      ? 'bg-neutral-900 text-white font-bold shadow'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scroll Navigation Arrows */}
            <div className="flex items-center space-x-2">
              <button
                disabled={!canScrollLeft}
                onClick={() => scrollBy(-420)}
                className={`w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? 'bg-white hover:bg-neutral-900 hover:text-white shadow cursor-pointer'
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }`}
                title="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                disabled={!canScrollRight}
                onClick={() => scrollBy(420)}
                className={`w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center transition-all ${
                  canScrollRight
                    ? 'bg-white hover:bg-neutral-900 hover:text-white shadow cursor-pointer'
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }`}
                title="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. THE HORIZONTAL UI SCROLL COMPONENT */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex space-x-6 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => {
                sounds.playClick(800);
                onSelectProject(project);
              }}
              className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[440px] snap-center group cursor-pointer"
            >
              <div className="relative bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden border border-neutral-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-[520px]">
                {/* Top Image Preview */}
                <div className="relative h-60 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Corner tag & index */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px] font-bold tracking-wider uppercase border border-white/20">
                      0{idx + 1} // {project.tag}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors shadow">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                    <span className="text-white/80">{project.category}</span>
                    <span className="text-amber-400 font-bold">{project.year}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3
                      style={{ fontFamily: 'var(--font-serif-luxury)' }}
                      className="text-2xl sm:text-3xl text-neutral-900 font-normal uppercase tracking-wide group-hover:text-sky-700 transition-colors"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1">
                      {project.subtitle}
                    </p>

                    <p className="mt-3 text-neutral-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Feature Pills & Action */}
                  <div className="pt-4 border-t border-neutral-100 flex flex-col space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 font-mono text-[10px]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono font-medium text-neutral-900 pt-1 group-hover:text-sky-600 transition-colors">
                      <span className="flex items-center space-x-1">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Inspect Architecture</span>
                      </span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom helper cue */}
        <div className="mt-8 flex items-center justify-between text-xs font-mono text-neutral-400 px-2">
          <span>DRAG OR USE ARROWS TO BROWSE WORK</span>
          <span className="hidden sm:inline">BUBBLE EFFECT ACTIVE // HOVER TO REPEL</span>
          <span>5 / 5 PROJECTS LOADED</span>
        </div>
      </div>
    </section>
  );
};
