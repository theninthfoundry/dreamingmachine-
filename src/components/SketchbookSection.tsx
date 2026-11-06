import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import { Pin, Sparkles, Move, RotateCcw, Flame, Wrench, Disc, Radio, X, ZoomIn, Smile, Coffee } from 'lucide-react';

interface DraggableItem {
  id: string;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
}

export const SketchbookSection: React.FC = () => {
  const [activeZ, setActiveZ] = useState<number>(40);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'MOTOR' | 'POP' | 'CHILL'>('ALL');
  const [inspectedImage, setInspectedImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  // Curated layout of all 10 moodboard artifacts across the sketchbook desk
  const initialPositions: Record<string, DraggableItem> = {
    // Top Row: Speed & Automotive
    cyberPorsche: { id: 'cyberPorsche', x: 0, y: 0, rotation: -2.5, zIndex: 11 },
    manga: { id: 'manga', x: 0, y: 0, rotation: -1.5, zIndex: 12 },
    engine: { id: 'engine', x: 0, y: 0, rotation: 3, zIndex: 13 },
    f1Car: { id: 'f1Car', x: 0, y: 0, rotation: 4, zIndex: 14 },
    // Mid Row: Pop Culture & Subversive Art
    crushedCoke: { id: 'crushedCoke', x: 0, y: 0, rotation: -5, zIndex: 15 },
    statueLiberty: { id: 'statueLiberty', x: 0, y: 0, rotation: -3.5, zIndex: 16 },
    blueberries: { id: 'blueberries', x: 0, y: 0, rotation: 5, zIndex: 17 },
    friendsSticker: { id: 'friendsSticker', x: 0, y: 0, rotation: 3.5, zIndex: 18 },
    // Bottom Row: Whimsical & Studio Vibe
    bananaCat: { id: 'bananaCat', x: 0, y: 0, rotation: -4, zIndex: 19 },
    cosmicCat: { id: 'cosmicCat', x: 0, y: 0, rotation: -2, zIndex: 20 },
    // Cosmic Typography & Starburst
    spaceCosmic: { id: 'spaceCosmic', x: 0, y: 0, rotation: 3, zIndex: 21 },
    cosmicStar: { id: 'cosmicStar', x: 0, y: 0, rotation: -6, zIndex: 22 },
    // Sticky Notes
    note1: { id: 'note1', x: 0, y: 0, rotation: -3, zIndex: 25 },
    note2: { id: 'note2', x: 0, y: 0, rotation: 2, zIndex: 26 },
  };

  const [positions, setPositions] = useState<Record<string, DraggableItem>>(initialPositions);

  const [dragState, setDragState] = useState<{
    id: string | null;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  }>({
    id: null,
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const bringToFront = (id: string) => {
    sounds.playPaperRustle();
    const newZ = activeZ + 1;
    setActiveZ(newZ);
    setPositions((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: newZ },
    }));
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    bringToFront(id);
    setDragState({
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: positions[id]?.x || 0,
      initialY: positions[id]?.y || 0,
    });
  };

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    if (e.touches.length !== 1) return;
    bringToFront(id);
    const touch = e.touches[0];
    setDragState({
      id,
      startX: touch.clientX,
      startY: touch.clientY,
      initialX: positions[id]?.x || 0,
      initialY: positions[id]?.y || 0,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState.id) return;
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    const id = dragState.id;

    setPositions((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        x: dragState.initialX + dx,
        y: dragState.initialY + dy,
      },
    }));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragState.id || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragState.startX;
    const dy = touch.clientY - dragState.startY;
    const id = dragState.id;

    setPositions((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        x: dragState.initialX + dx,
        y: dragState.initialY + dy,
      },
    }));
  };

  const handleMouseUp = () => {
    if (dragState.id) {
      sounds.playClick(450);
      setDragState({ id: null, startX: 0, startY: 0, initialX: 0, initialY: 0 });
    }
  };

  const resetPositions = () => {
    sounds.playBubblePop();
    setPositions(initialPositions);
  };

  const openInspect = (e: React.MouseEvent, src: string, title: string, desc: string) => {
    e.stopPropagation();
    sounds.playClick(800);
    setInspectedImage({ src, title, desc });
  };

  return (
    <section
      id="sketchbook"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      className="relative w-full min-h-screen py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-white text-neutral-900 overflow-hidden select-none"
    >
      {/* Subtle drafting grid paper texture */}
      <div className="absolute inset-0 bg-sketch-grid opacity-60 pointer-events-none" />

      {/* GOTHIC ARCHITECTURAL SPIDERWEB OVERLAY (Anchored at Top-Left Corner) */}
      <div className="absolute top-0 left-0 pointer-events-none z-15 select-none opacity-90 overflow-hidden">
        <img
          src="/assets/spiderweb_transparent.png"
          alt="Intricate Spiderweb Linework"
          className="w-72 sm:w-96 md:w-[480px] lg:w-[560px] h-auto object-contain object-left-top drop-shadow-sm filter contrast-125"
        />
      </div>

      {/* Decorative red drafting margin line */}
      <div className="absolute top-0 bottom-0 left-6 sm:left-12 w-[2px] bg-red-200/50 pointer-events-none hidden md:block" />

      {/* Section Header */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b-2 border-neutral-900 pb-8 pt-8 px-4 sm:px-8">
        <div className="pl-0 md:pl-16 lg:pl-24">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Section 03 // Open Ideation Workspace &amp; Mood Board</span>
          </div>

          <h2
            style={{ fontFamily: 'var(--font-funky-manga)' }}
            className="text-4xl sm:text-6xl md:text-7xl font-normal text-neutral-900 tracking-tight uppercase leading-none"
          >
            My Sketch Book
          </h2>

          <p
            style={{ fontFamily: 'var(--font-handwritten)' }}
            className="text-2xl sm:text-3xl text-neutral-600 mt-2 rotate-[-0.5deg]"
          >
            Everything I love, admire, and obsess over — machines, speed, memes &amp; midnight vibes.
          </p>
        </div>

        {/* Filter & Desk Controls */}
        <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-2 justify-center md:justify-end">
          {/* Category Filter Pills */}
          <div className="flex items-center p-1 rounded-lg bg-neutral-100 border border-neutral-200 text-xs font-mono">
            {(['ALL', 'MOTOR', 'POP', 'CHILL'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick(600);
                  setSelectedFilter(cat);
                }}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedFilter === cat
                    ? 'bg-neutral-900 text-white font-bold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-neutral-100 text-neutral-600 text-xs font-mono">
            <Move className="w-3.5 h-3.5" />
            <span>Drag items freely</span>
          </div>

          <button
            onClick={resetPositions}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono transition-transform active:scale-95 shadow-md"
            title="Reset all moodboard positions"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Desk</span>
          </button>
        </div>
      </div>

      {/* THE INTERACTIVE SKETCHBOOK DESK WORKSPACE (Expansive Full-Width Drafting Table) */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto min-h-[1950px] px-2 sm:px-6 md:px-8">

        {/* ============================================================== */}
        {/* SECTION A: AUTOMOTIVE & MOTORSPORT OBSESSIONS                  */}
        {/* ============================================================== */}

        {/* 1. CYBER PORSCHE RWB WITH STREET GRAFFITI */}
        {(selectedFilter === 'ALL' || selectedFilter === 'MOTOR') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'cyberPorsche')}
            onTouchStart={(e) => handleTouchStart(e, 'cyberPorsche')}
            style={{
              transform: `translate(${positions.cyberPorsche.x}px, ${positions.cyberPorsche.y}px) rotate(${positions.cyberPorsche.rotation}deg)`,
              zIndex: positions.cyberPorsche.zIndex,
            }}
            className="absolute top-2 left-2 sm:left-6 md:left-10 lg:left-14 w-80 sm:w-96 md:w-[440px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3 left-12 w-28 h-6 washi-tape rotate-[-3deg] z-30 pointer-events-none" />

            <div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl border border-neutral-200 transition-all group">
              <div className="relative overflow-hidden rounded-xl bg-[#e96452]/20 border border-neutral-200">
                <img
                  src="/assets/mood_cyber_porsche.jpg"
                  alt="Custom Cyber RWB Porsche with Street Graffiti"
                  className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <button
                  onClick={(e) => openInspect(e, '/assets/mood_cyber_porsche.jpg', 'Cyber RWB Porsche', 'Exposed twin-turbo plumbing and street graffiti tags.')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Image"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-white font-mono text-[9px] uppercase tracking-wider">
                  LNZO // TWIN TURBO
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <span
                    style={{ fontFamily: 'var(--font-funky-bubble)' }}
                    className="text-lg text-neutral-900 tracking-wide text-[#e96452]"
                  >
                    EXPOSED TWIN TURBO
                  </span>
                  <span className="font-mono text-xs text-neutral-500 font-bold">RWB 911</span>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-xl sm:text-2xl text-neutral-800 leading-tight mt-1"
                >
                  &ldquo;Exposed titanium exhaust plumbing + street graffiti bubble tags. Raw mechanical soul with zero sterile polish.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. JAPANESE RETRO MANGA RACING POSTER */}
        {(selectedFilter === 'ALL' || selectedFilter === 'MOTOR') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'manga')}
            style={{
              transform: `translate(${positions.manga.x}px, ${positions.manga.y}px) rotate(${positions.manga.rotation}deg)`,
              zIndex: positions.manga.zIndex,
            }}
            className="absolute top-6 left-[32%] sm:left-[35%] lg:left-[38%] w-72 sm:w-84 md:w-[390px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-md">
              <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-red-700 flex items-center justify-center text-white shadow-lg">
                <Pin className="w-3 h-3 fill-current" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-2xl hover:shadow-3xl border border-neutral-300 transition-all group">
              <div className="relative overflow-hidden rounded bg-neutral-100">
                <img
                  src="/assets/porsche_manga_poster.jpg"
                  alt="Japanese Retro Manga Racing Poster"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <button
                  onClick={(e) => openInspect(e, '/assets/porsche_manga_poster.jpg', 'Speed Graphics 2029', 'Japanese manga layout with Porsche 930 turbo.')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Image"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[9px] tracking-wider uppercase">
                  MIDNIGHT 2029 PROTO
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <span
                    style={{ fontFamily: 'var(--font-funky-manga)' }}
                    className="text-lg text-neutral-900 tracking-tight"
                  >
                    SPEED GRAPHICS &apos;29
                  </span>
                  <span className="font-mono text-xs text-red-600 font-bold">44 DOIT FOR SPEED</span>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-xl sm:text-2xl text-neutral-700 mt-1"
                >
                  &ldquo;Why conform to flat corporate grids when typography can scream at 200 MPH?&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. TOYOTA TWIN CAM 16 ENGINE */}
        {(selectedFilter === 'ALL' || selectedFilter === 'MOTOR') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'engine')}
            style={{
              transform: `translate(${positions.engine.x}px, ${positions.engine.y}px) rotate(${positions.engine.rotation}deg)`,
              zIndex: positions.engine.zIndex,
            }}
            className="absolute top-2 right-2 sm:right-6 md:right-10 lg:right-14 w-72 sm:w-84 md:w-[400px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3.5 left-1/3 w-28 h-6 washi-tape rotate-[-2deg] z-30 pointer-events-none" />

            <div className="bg-white p-5 rounded-2xl shadow-xl hover:shadow-2xl border border-neutral-200 transition-all group">
              <div className="relative overflow-hidden bg-neutral-50 rounded-xl p-3 border border-dashed border-neutral-200">
                <img
                  src="/assets/toyota_twin_cam.jpg"
                  alt="Toyota 2000 Twin Cam 16 Engine"
                  className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => openInspect(e, '/assets/toyota_twin_cam.jpg', 'Toyota 2000 Twin Cam 16', 'Naturally aspirated DOHC 16-valve analog mechanical icon.')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Image"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] font-bold tracking-widest uppercase shadow">
                  4A-GE // 3S-GE
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-neutral-900 uppercase">
                  <Wrench className="w-3.5 h-3.5 text-red-600" />
                  <span>Toyota 2000 Twin Cam 16</span>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-xl sm:text-2xl text-red-600 leading-snug mt-1"
                >
                  &ldquo;Naturally aspirated purity. 16 valves singing at 8,200 RPM.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. FORMULA 1 CAR TOP-DOWN TECHNICAL BLUEPRINT */}
        {(selectedFilter === 'ALL' || selectedFilter === 'MOTOR') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'f1Car')}
            style={{
              transform: `translate(${positions.f1Car.x}px, ${positions.f1Car.y}px) rotate(${positions.f1Car.rotation}deg)`,
              zIndex: positions.f1Car.zIndex,
            }}
            className="absolute top-[440px] left-1/2 -translate-x-1/2 w-64 sm:w-76 md:w-[360px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3 left-1/3 w-20 h-5 bg-white/70 backdrop-blur-sm border border-neutral-200 rotate-[4deg] shadow-sm pointer-events-none" />

            <div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl border border-neutral-200 transition-all group">
              <div className="relative overflow-hidden bg-neutral-950 rounded-xl p-3 flex items-center justify-center">
                <img
                  src="/assets/mood_f1_car_topdown.jpg"
                  alt="Formula 1 Car Top-Down Silhouette"
                  className="w-full h-auto object-contain max-h-[380px] invert contrast-125 filter group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => openInspect(e, '/assets/mood_f1_car_topdown.jpg', '#44 Formula 1 Aerodynamics', 'Precision ground effect venturis and aerodynamic packaging.')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/70 hover:bg-white text-black text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Image"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white text-black font-mono text-[9px] font-bold tracking-widest uppercase">
                  #44 F1 MONOPOSTO
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <span
                    style={{ fontFamily: 'var(--font-mono-tech)' }}
                    className="text-xs font-bold text-neutral-900 uppercase tracking-wider"
                  >
                    AERODYNAMIC PURITY
                  </span>
                  <span className="font-mono text-xs text-neutral-500 font-bold">1,000+ HP</span>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-xl sm:text-2xl text-neutral-800 leading-snug mt-1"
                >
                  &ldquo;Ground effect venturis &amp; carbon fiber packaging. Peak engineering obsession.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SECTION B: POP ART, CRUSHED SODA & NOSTALGIA                   */}
        {/* ============================================================== */}

        {/* 5. CRUSHED DIET COKE CAN POP-ART STICKER (New Upload) */}
        {(selectedFilter === 'ALL' || selectedFilter === 'POP') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'crushedCoke')}
            style={{
              transform: `translate(${positions.crushedCoke.x}px, ${positions.crushedCoke.y}px) rotate(${positions.crushedCoke.rotation}deg)`,
              zIndex: positions.crushedCoke.zIndex,
            }}
            className="absolute top-[760px] left-2 sm:left-8 md:left-14 lg:left-20 w-64 sm:w-72 md:w-[340px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3 left-1/3 w-24 h-6 washi-tape rotate-[-4deg] z-30 pointer-events-none" />

            <div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl border border-neutral-200 transition-all group">
              <div className="relative overflow-hidden bg-neutral-50 rounded-xl p-3 flex items-center justify-center border border-dashed border-neutral-200">
                <img
                  src="/assets/mood_crushed_coke_sticker.png"
                  alt="Crushed Diet Coke Can Pop Art Painting"
                  className="w-full h-auto object-contain max-h-[340px] group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
                <button
                  onClick={(e) => openInspect(e, '/assets/mood_crushed_diet_coke.jpg', 'Crushed Diet Coke Chrome Art', 'Hyper-reflective pop-art study of warped aluminum reflections and caffeine-fueled midnight focus.')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Image"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[9px] uppercase tracking-wider font-bold shadow">
                  12 FL OZ // ZERO SUGAR
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-neutral-900 uppercase">
                  <Coffee className="w-3.5 h-3.5 text-red-600" />
                  <span>Crushed Aluminum Reflections</span>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-xl sm:text-2xl text-neutral-800 leading-snug mt-1"
                >
                  &ldquo;Liquid chrome reflections on warped metal. Fuel for 4 AM design sprints.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 6. JOEY & CHANDLER (FRIENDS) DIE-CUT STICKER (New Upload) */}
        {(selectedFilter === 'ALL' || selectedFilter === 'POP' || selectedFilter === 'CHILL') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'friendsSticker')}
            style={{
              transform: `translate(${positions.friendsSticker.x}px, ${positions.friendsSticker.y}px) rotate(${positions.friendsSticker.rotation}deg)`,
              zIndex: positions.friendsSticker.zIndex,
            }}
            className="absolute top-[800px] left-[28%] sm:left-[32%] lg:left-[35%] w-60 sm:w-72 md:w-[340px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-md">
              <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-blue-700 flex items-center justify-center text-white shadow-lg">
                <Pin className="w-3 h-3 fill-current" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl border border-neutral-200 transition-all group">
              <div className="relative overflow-hidden bg-neutral-50 rounded-xl p-3 flex items-center justify-center border border-dashed border-neutral-200">
                <img
                  src="/assets/mood_joey_chandler_sticker.png"
                  alt="Joey and Chandler Friends TV Show Sticker"
                  className="w-full h-auto object-contain max-h-[340px] group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
                <button
                  onClick={(e) => openInspect(e, '/assets/mood_joey_chandler_friends.png', 'Joey & Chandler // 90s TV Royalty', 'The eternal creative duality: confidence vs confusion. Could this BE any more iconic?')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Image"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black text-white font-mono text-[9px] uppercase tracking-wider font-bold">
                  JOEY &amp; CHANDLER
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-neutral-900 uppercase">
                  <Smile className="w-3.5 h-3.5 text-amber-500" />
                  <span>The Creative Duality</span>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-xl sm:text-2xl text-neutral-800 leading-snug mt-1"
                >
                  &ldquo;When the idea sounds brilliant at 2 AM vs when you see it in the morning. Could it BE any more real?&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 7. STATUE OF LIBERTY ROCKING ELECTRIC GUITAR */}
        {(selectedFilter === 'ALL' || selectedFilter === 'POP') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'statueLiberty')}
            style={{
              transform: `translate(${positions.statueLiberty.x}px, ${positions.statueLiberty.y}px) rotate(${positions.statueLiberty.rotation}deg)`,
              zIndex: positions.statueLiberty.zIndex,
            }}
            className="absolute top-[820px] right-[28%] sm:right-[32%] lg:right-[35%] w-64 sm:w-72 md:w-[350px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-md">
              <div className="w-6 h-6 rounded-full bg-emerald-600 border-2 border-emerald-700 flex items-center justify-center text-white shadow-lg">
                <Pin className="w-3 h-3 fill-current" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl border border-neutral-200 transition-all group">
              <div className="relative overflow-hidden bg-neutral-50 rounded-xl p-2 flex items-center justify-center border border-dashed border-neutral-200">
                <img
                  src="/assets/mood_statue_liberty_sticker.png"
                  alt="Statue of Liberty Playing Electric Guitar"
                  className="w-full h-auto object-contain max-h-[340px] group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                />
                <button
                  onClick={(e) => openInspect(e, '/assets/mood_statue_liberty_guitar.jpg', 'Lady Liberty Shredding Les Paul', 'Subversive mashup of classical freedom and rock n roll defiance.')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Image"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black text-white font-mono text-[9px] uppercase tracking-wider">
                  SUBVERSIVE CLASSIC
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-neutral-900 uppercase">
                  <Disc className="w-3.5 h-3.5 text-purple-600" />
                  <span>Lady Liberty // Les Paul</span>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-xl sm:text-2xl text-neutral-800 leading-snug mt-1"
                >
                  &ldquo;Classical monuments corrupted with rock &apos;n&apos; roll energy. Defy solemnity.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 8. HALFTONE RISOGRAPH POP BLUEBERRIES */}
        {(selectedFilter === 'ALL' || selectedFilter === 'POP') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'blueberries')}
            style={{
              transform: `translate(${positions.blueberries.x}px, ${positions.blueberries.y}px) rotate(${positions.blueberries.rotation}deg)`,
              zIndex: positions.blueberries.zIndex,
            }}
            className="absolute top-[760px] right-2 sm:right-8 md:right-14 lg:right-20 w-64 sm:w-76 md:w-[360px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3.5 right-10 w-24 h-6 washi-tape rotate-[3deg] z-30 pointer-events-none" />

            <div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl border border-neutral-200 transition-all group">
              <div className="relative overflow-hidden bg-neutral-50 rounded-xl p-3 flex items-center justify-center border border-dashed border-neutral-200">
                <img
                  src="/assets/mood_halftone_blueberries_sticker.png"
                  alt="Halftone Risograph Pop-Art Blueberries"
                  className="w-full h-auto object-contain max-h-[300px] group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
                <button
                  onClick={(e) => openInspect(e, '/assets/mood_halftone_blueberries.jpg', 'Halftone Chromatic Blueberries', 'Risograph printing misregistration and screen-printing grain.')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Image"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-[9px] uppercase tracking-wider">
                  HALFTONE CMYK
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-900 uppercase">
                  <span>PRINT MISREGISTRATION</span>
                  <span className="text-blue-600">DOT MATRIX</span>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-xl sm:text-2xl text-blue-900 leading-snug mt-1"
                >
                  &ldquo;Chromatically offset screen-printing. The imperfection is where the character lives.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SECTION C: NOCTURNAL COMPANIONS & WHIMSICAL COMFORT            */}
        {/* ============================================================== */}

        {/* 9. SAD BANANA CAT STICKER (New Upload) */}
        {(selectedFilter === 'ALL' || selectedFilter === 'CHILL') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'bananaCat')}
            style={{
              transform: `translate(${positions.bananaCat.x}px, ${positions.bananaCat.y}px) rotate(${positions.bananaCat.rotation}deg)`,
              zIndex: positions.bananaCat.zIndex,
            }}
            className="absolute top-[1240px] left-4 sm:left-12 md:left-20 lg:left-28 w-56 sm:w-64 md:w-[300px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3 left-1/3 w-20 h-5 washi-tape rotate-[-2deg] z-30 pointer-events-none" />

            <div className="bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl border border-yellow-200 transition-all group">
              <div className="relative overflow-hidden bg-yellow-50/50 rounded-xl p-3 flex items-center justify-center border border-dashed border-yellow-200">
                <img
                  src="/assets/mood_banana_cat_sticker.png"
                  alt="Sad Banana Cat Meme Illustration"
                  className="w-full h-auto object-contain max-h-[250px] group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                />
                <button
                  onClick={(e) => openInspect(e, '/assets/mood_banana_cat.jpg', 'Emotional Support Banana Cat', 'When the production deployment crashes at 99%. Irresistible internet comfort mascot.')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Image"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-white font-mono text-[8px] uppercase tracking-wider font-bold">
                  BANANYA ★
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-amber-900 uppercase">
                  <Smile className="w-3.5 h-3.5 text-amber-600" />
                  <span>Banana Cat Mascot</span>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-xl sm:text-2xl text-amber-950 leading-snug mt-1"
                >
                  &ldquo;When the WebGL shader bugs out at 3 AM. Emotional support companion.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 10. DREAMY COSMIC GALAXY CAT */}
        {(selectedFilter === 'ALL' || selectedFilter === 'CHILL') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'cosmicCat')}
            style={{
              transform: `translate(${positions.cosmicCat.x}px, ${positions.cosmicCat.y}px) rotate(${positions.cosmicCat.rotation}deg)`,
              zIndex: positions.cosmicCat.zIndex,
            }}
            className="absolute top-[1250px] right-[28%] sm:right-[32%] lg:right-[36%] w-72 sm:w-84 md:w-[380px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3.5 left-1/3 w-28 h-6 washi-tape rotate-[-1deg] z-30 pointer-events-none" />

            <div className="bg-white p-5 rounded-2xl shadow-2xl hover:shadow-3xl border border-purple-200 transition-all group">
              <div className="relative overflow-hidden bg-purple-50/50 rounded-xl p-4 flex items-center justify-center border border-dashed border-purple-200">
                <img
                  src="/assets/mood_cosmic_galaxy_cat_sticker.png"
                  alt="Dreamy Cosmic Galaxy Cat"
                  className="w-full h-auto object-contain max-h-[240px] group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                />
                <button
                  onClick={(e) => openInspect(e, '/assets/mood_cosmic_galaxy_cat.jpg', 'Cosmic Galaxy Cat', 'Whimsical nocturnal cat lounging among purple nebula brushstrokes.')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Image"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-purple-900/80 text-white font-mono text-[9px] uppercase tracking-wider">
                  3 AM VIBES // NEBULA
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-purple-900 uppercase">
                  <Radio className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                  <span>Cosmic Midnight Companion</span>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-2xl sm:text-3xl text-purple-950 leading-snug mt-1"
                >
                  &ldquo;A galaxy-coated cat lounging while the code compiles. Quiet cosmic stillness.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 11. SPACE COSMIC BUBBLE TYPOGRAPHY POSTER (New Upload) */}
        {(selectedFilter === 'ALL' || selectedFilter === 'POP' || selectedFilter === 'CHILL') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'spaceCosmic')}
            style={{
              transform: `translate(${positions.spaceCosmic.x}px, ${positions.spaceCosmic.y}px) rotate(${positions.spaceCosmic.rotation}deg)`,
              zIndex: positions.spaceCosmic.zIndex,
            }}
            className="absolute top-[1280px] left-[28%] sm:left-[32%] lg:left-[36%] w-72 sm:w-84 md:w-[420px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3.5 left-1/3 w-32 h-6 washi-tape rotate-[-2deg] z-30 pointer-events-none" />

            <div className="bg-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl border border-neutral-300 transition-all group">
              <div className="relative overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src="/assets/mood_space_cosmic_bubble_poster.jpg"
                  alt="Space Cosmic Bubble Typography Poster"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <button
                  onClick={(e) => openInspect(e, '/assets/mood_space_cosmic_bubble_poster.jpg', 'Space Cosmic // Binary Multiple', 'Nuclear fusion infographics paired with puffy pink 3D bubble lettering.')}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Image"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-white font-mono text-[9px] uppercase tracking-wider font-bold">
                  BUBBLE TYPE SPEC
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between">
                  <span
                    style={{ fontFamily: 'var(--font-funky-bubble)' }}
                    className="text-lg text-pink-500 tracking-wide"
                  >
                    SPACE COSMIC
                  </span>
                  <span className="font-mono text-xs text-neutral-500 font-bold">BINARY MULTIPLE</span>
                </div>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-xl sm:text-2xl text-neutral-800 leading-snug mt-1"
                >
                  &ldquo;Astrophysics meets puffy gelatinous bubble letters. The exact typography that fuels the works section below.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 12. HAND-DRAWN COSMIC STARBURST STICKER (New Upload) */}
        {(selectedFilter === 'ALL' || selectedFilter === 'POP' || selectedFilter === 'CHILL') && (
          <div
            onMouseDown={(e) => handleMouseDown(e, 'cosmicStar')}
            style={{
              transform: `translate(${positions.cosmicStar.x}px, ${positions.cosmicStar.y}px) rotate(${positions.cosmicStar.rotation}deg)`,
              zIndex: positions.cosmicStar.zIndex,
            }}
            className="absolute top-[1300px] right-4 sm:right-12 md:right-20 lg:right-28 w-56 sm:w-64 md:w-[320px] cursor-grab active:cursor-grabbing transition-shadow"
          >
            <div className="absolute -top-3 left-1/3 w-20 h-5 bg-white/70 backdrop-blur-sm border border-neutral-200 rotate-[4deg] shadow-sm pointer-events-none" />

            <div className="bg-white p-5 rounded-2xl shadow-xl hover:shadow-2xl border border-sky-200 transition-all group flex flex-col items-center text-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <img
                  src="/assets/cosmic_starburst_transparent.png"
                  alt="Hand-Drawn Cosmic Starburst"
                  className="w-full h-full object-contain animate-spin-slow drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="mt-3">
                <span
                  style={{ fontFamily: 'var(--font-serif-luxury)' }}
                  className="text-xl text-neutral-900 tracking-widest uppercase block"
                >
                  Cosmic Sparkle
                </span>
                <p
                  style={{ fontFamily: 'var(--font-handwritten)' }}
                  className="text-xl sm:text-2xl text-neutral-600 mt-1 leading-tight"
                >
                  &ldquo;Hand-drawn watercolor starlight with orbiting celestial rings. Keep looking up.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STICKY NOTE 1: THE CREATIVE EQUATION */}
        <div
          onMouseDown={(e) => handleMouseDown(e, 'note1')}
          onTouchStart={(e) => handleTouchStart(e, 'note1')}
          style={{
            transform: `translate(${positions.note1.x}px, ${positions.note1.y}px) rotate(${positions.note1.rotation}deg)`,
            zIndex: positions.note1.zIndex,
          }}
          className="absolute top-[500px] left-8 sm:left-16 lg:left-24 w-72 sm:w-80 cursor-grab active:cursor-grabbing"
        >
          <div className="absolute -top-3 left-10 w-20 h-5 bg-white/70 backdrop-blur-sm border border-neutral-200 rotate-[4deg] shadow-sm pointer-events-none" />

          <div className="bg-amber-100 p-6 rounded-xl shadow-lg border border-amber-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-1.5 font-mono text-xs font-bold text-amber-900 uppercase mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-700" />
              <span>THE CREATIVE EQUATION</span>
            </div>
            <p
              style={{ fontFamily: 'var(--font-handwritten)' }}
              className="text-2xl sm:text-3xl text-neutral-900 leading-snug"
            >
              Classical Architecture + 90s JDM Speed + Subversive Pop Culture = Digital Art with a visceral heartbeat.
            </p>
            <div className="mt-4 pt-3 border-t border-amber-200 flex justify-between items-center text-[10px] font-mono text-amber-800">
              <span>Sreeshanth Namireddy</span>
              <span>100% RAW ✦</span>
            </div>
          </div>
        </div>

        {/* STICKY NOTE 2: THE DESIGN MANIFESTO */}
        <div
          onMouseDown={(e) => handleMouseDown(e, 'note2')}
          onTouchStart={(e) => handleTouchStart(e, 'note2')}
          style={{
            transform: `translate(${positions.note2.x}px, ${positions.note2.y}px) rotate(${positions.note2.rotation}deg)`,
            zIndex: positions.note2.zIndex,
          }}
          className="absolute top-[490px] right-8 sm:right-16 lg:right-24 w-72 sm:w-80 cursor-grab active:cursor-grabbing"
        >
          <div className="absolute -top-3 left-10 w-20 h-5 bg-white/70 backdrop-blur-sm border border-neutral-200 rotate-[-3deg] shadow-sm pointer-events-none" />

          <div className="bg-sky-100 p-6 rounded-xl shadow-lg border border-sky-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center space-x-1.5 font-mono text-xs font-bold text-sky-900 uppercase mb-2">
              <Radio className="w-3.5 h-3.5 text-sky-700" />
              <span>THE DESIGN MANIFESTO</span>
            </div>
            <p
              style={{ fontFamily: 'var(--font-handwritten)' }}
              className="text-2xl sm:text-3xl text-neutral-900 leading-snug"
            >
              Every pixel must possess attitude. Reject cookie-cutter templates. Build worlds people want to touch.
            </p>
            <div className="mt-4 pt-3 border-t border-sky-200 flex justify-between items-center text-[10px] font-mono text-sky-800">
              <span>Studio Desk // 2026</span>
              <span>UNFILTERED ✦</span>
            </div>
          </div>
        </div>

      </div>

      {/* INSPECT ZOOM LIGHTBOX MODAL */}
      {inspectedImage && (
        <div
          onClick={() => { sounds.playClick(400); setInspectedImage(null); }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-neutral-200 flex flex-col"
          >
            <div className="relative bg-neutral-100 p-6 flex items-center justify-center max-h-[60vh] overflow-hidden">
              <img
                src={inspectedImage.src}
                alt={inspectedImage.title}
                className="max-h-[50vh] w-auto object-contain drop-shadow-xl"
              />
              <button
                onClick={() => { sounds.playClick(400); setInspectedImage(null); }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              <h4
                style={{ fontFamily: 'var(--font-serif-luxury)' }}
                className="text-3xl text-neutral-900 font-normal uppercase"
              >
                {inspectedImage.title}
              </h4>
              <p
                style={{ fontFamily: 'var(--font-handwritten)' }}
                className="text-2xl text-neutral-700 mt-2"
              >
                {inspectedImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
