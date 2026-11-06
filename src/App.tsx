import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PegasusSection } from './components/PegasusSection';
import { WorkSection3D } from './components/WorkSection3D';
import { ManifestoSection } from './components/ManifestoSection';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { EntrySplash } from './components/EntrySplash';
import { SketchbookModal } from './components/SketchbookModal';
import { CartoonSmokeBlast } from './components/CartoonSmokeBlast';
import type { ProjectItem } from './components/BubbleWorksSection';
import { sounds } from './utils/audio';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [showEntrySplash, setShowEntrySplash] = useState<boolean>(true);
  const [isSketchbookOpen, setIsSketchbookOpen] = useState<boolean>(false);
  const [showSmokeBlast, setShowSmokeBlast] = useState<boolean>(false);

  // Initialize Lenis smooth inertia scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseProject = () => {
    sounds.playCartoonPoof();
    setSelectedProject(null);
    setShowSmokeBlast(true);
  };

  return (
    <div className="min-h-screen bg-[#071338] text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col relative overflow-x-hidden">
      {/* 1. PIANO BLACK ENTRY SPLASH GATEWAY (Click star to warp into inner world) */}
      {showEntrySplash && (
        <EntrySplash onEnter={() => setShowEntrySplash(false)} />
      )}

      {/* 2. Custom Contextual Cursor */}
      <CustomCursor />

      {/* 3. Floating Editorial Navigation */}
      <Navbar
        onOpenSketchbook={() => setIsSketchbookOpen(true)}
        onReopenEntry={() => setShowEntrySplash(true)}
      />

      {/* 4. Main Continuous Vertical Experience */}
      <main className="flex-grow">
        {/* Section 01: Hero Sanctuary (Full Panoramic Landscape, Parental Advisory, Curvy Editorial Display, Real Clouds) */}
        <HeroSection onScrollToNext={() => scrollToSection('pegasus')} />

        {/* Section 02: The Winged Pegasus (Exact Master Artwork, 3D Foil, Open Sketchbook Hotspot) */}
        <PegasusSection onOpenSketchbook={() => setIsSketchbookOpen(true)} />

        {/* Section 03: 3D Continuous Orbital Wheel Portfolio (Royal Blue, Bleeds into surrounding sections) */}
        <WorkSection3D onSelectProject={setSelectedProject} />

        {/* Section 04: Master Manifesto & Dual Kinetic Typography Ribbons */}
        <ManifestoSection />
      </main>

      {/* 5. Fullscreen Interactive Sketchbook Drafting Desk Overlay */}
      <SketchbookModal
        isOpen={isSketchbookOpen}
        onClose={() => setIsSketchbookOpen(false)}
      />

      {/* 6. Cartoon Smoke Bomb Blast Effect (Triggers on closing project modal) */}
      {showSmokeBlast && (
        <CartoonSmokeBlast onComplete={() => setShowSmokeBlast(false)} />
      )}

      {/* 7. Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
      />

      {/* 8. Master Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;
