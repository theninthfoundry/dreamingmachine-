import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CloudTransition } from './components/CloudTransition';
import { PegasusSection } from './components/PegasusSection';
import { SketchbookSection } from './components/SketchbookSection';
import { BubbleWorksSection, type ProjectItem } from './components/BubbleWorksSection';
import { ManifestoSection } from './components/ManifestoSection';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col">
      {/* Custom Contextual Cursor */}
      <CustomCursor />

      {/* Floating Editorial Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Section 01: Hero Sanctuary (4 Rising Pillars, Parental Advisory, Curvy Editorial Display) */}
        <HeroSection onScrollToNext={() => scrollToSection('pegasus')} />

        {/* Transition 01: Billowing Clouds Portal */}
        <CloudTransition />

        {/* Section 02: The Winged Pegasus (Deep Royal Blue Editorial Poster & Motion Graphics) */}
        <PegasusSection />

        {/* Section 03: The Sketchbook & Moodboard (Pure White Background, Toyota Engine, Manga Poster, Funky Fonts) */}
        <SketchbookSection />

        {/* Section 04: Bubble Effect Text & Single Section Portfolio Work Deck */}
        <BubbleWorksSection onSelectProject={setSelectedProject} />

        {/* Section 05: Master Manifesto & Dual Kinetic Typography Ribbons */}
        <ManifestoSection />
      </main>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Master Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;
