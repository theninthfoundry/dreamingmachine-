import React from 'react';
import { sounds } from '../utils/audio';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sounds.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white text-neutral-900 border-t border-neutral-200 py-16 px-4 sm:px-8 select-none">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Top bar with back to top button */}
        <div className="w-full flex items-center justify-between pb-12 border-b border-neutral-100">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>SREESHANTH NAMIREDDY ARCHIVE // 2026</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white transition-all text-xs font-mono uppercase tracking-wider"
          >
            <span>Return To Sanctuary</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Massive Editorial Display Name */}
        <div className="py-16 text-center">
          <h2
            style={{ fontFamily: 'var(--font-serif-luxury)' }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-neutral-900 font-normal uppercase tracking-tight leading-none hover:text-neutral-700 transition-colors"
          >
            Sreeshanth
          </h2>
          <h2
            style={{ fontFamily: 'var(--font-serif-curvy)' }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-neutral-800 font-normal uppercase tracking-widest leading-none -mt-2 sm:-mt-4"
          >
            Namireddy
          </h2>
        </div>

        {/* Bottom Credits & Iconic Advisory Mini */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-neutral-100 text-xs font-mono text-neutral-400 space-y-4 sm:space-y-0">
          {/* Miniature advisory */}
          <div className="flex items-center space-x-3">
            <div className="bg-black text-white px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase">
              PARENTAL ADVISORY
            </div>
            <span>Crafted with zero template compromises.</span>
          </div>

          <div className="flex items-center space-x-1">
            <span>Built by Sreeshanth Namireddy with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline mx-0.5" />
            <span>&amp; kinetic code</span>
          </div>

          <div>
            <span>ALL RIGHTS RESERVED © 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

