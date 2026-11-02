import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/audio';
import { VolumeX, Sparkles, Check, Copy, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  onReplayHero?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayHero }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showConnectModal, setShowConnectModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = !sounds.toggleMute();
    setIsMuted(muted);
  };

  const scrollTo = (id: string) => {
    sounds.playClick(700);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openConnect = () => {
    sounds.playStarSparkle();
    setShowConnectModal(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.2 },
      colors: ['#38bdf8', '#f59e0b', '#ec4899', '#10b981'],
    });
  };

  const copyEmail = () => {
    sounds.playClick(900);
    navigator.clipboard.writeText('namireddysreeshanth@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 pointer-events-none transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brandmark (Curvy luxury font) */}
          <div
            onClick={() => {
              sounds.playClick(600);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (onReplayHero) onReplayHero();
            }}
            className={`pointer-events-auto cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
              isScrolled
                ? 'bg-white/85 backdrop-blur-md shadow-md border border-neutral-200/80 text-neutral-900'
                : 'bg-black/35 backdrop-blur-md text-white border border-white/20'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span
                style={{ fontFamily: 'var(--font-serif-luxury)' }}
                className="text-lg sm:text-xl font-normal tracking-wide uppercase leading-none"
              >
                Sreeshanth Namireddy
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
          </div>

          {/* Center Section Pills */}
          <nav
            className={`pointer-events-auto hidden md:flex items-center space-x-1 p-1 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
              isScrolled
                ? 'bg-white/85 backdrop-blur-md shadow-md border border-neutral-200/80 text-neutral-700'
                : 'bg-black/35 backdrop-blur-md text-white/90 border border-white/20'
            }`}
          >
            <button
              onClick={() => scrollTo('sanctuary')}
              className="px-3.5 py-1.5 rounded-full hover:bg-neutral-900 hover:text-white transition-colors"
            >
              01 Sanctuary
            </button>
            <button
              onClick={() => scrollTo('pegasus')}
              className="px-3.5 py-1.5 rounded-full hover:bg-neutral-900 hover:text-white transition-colors"
            >
              02 Pegasus
            </button>
            <button
              onClick={() => scrollTo('sketchbook')}
              className="px-3.5 py-1.5 rounded-full hover:bg-neutral-900 hover:text-white transition-colors"
            >
              03 Sketchbook
            </button>
            <button
              onClick={() => scrollTo('works')}
              className="px-3.5 py-1.5 rounded-full hover:bg-neutral-900 hover:text-white transition-colors"
            >
              04 Works
            </button>
          </nav>

          {/* Right Controls */}
          <div className="pointer-events-auto flex items-center space-x-2">
            {/* Audio Synthesizer with Equalizer Animation */}
            <button
              onClick={toggleSound}
              className={`w-9 h-9 sm:w-auto sm:px-3.5 sm:py-2 rounded-full flex items-center justify-center space-x-2 text-xs font-mono uppercase tracking-wider transition-all shadow-sm ${
                isScrolled
                  ? 'bg-white/85 backdrop-blur-md border border-neutral-200 text-neutral-800 hover:bg-neutral-900 hover:text-white'
                  : 'bg-black/35 backdrop-blur-md text-white border border-white/20 hover:bg-black/50'
              }`}
              title="Toggle procedural audio atmosphere"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-neutral-400" />
              ) : (
                <div className="flex items-end space-x-0.5 h-3.5">
                  <span className="w-0.5 bg-amber-400 h-full animate-[bounce_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-amber-400 h-2/3 animate-[bounce_0.8s_ease-in-out_infinite_0.1s]" />
                  <span className="w-0.5 bg-amber-400 h-4/5 animate-[bounce_0.7s_ease-in-out_infinite_0.2s]" />
                </div>
              )}
              <span className="hidden sm:inline">{isMuted ? 'Mute' : 'Audio On'}</span>
            </button>

            {/* Connect / Inquire */}
            <button
              onClick={openConnect}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-widest transition-transform active:scale-95 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Connect</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONNECT MODAL DIALOG */}
      {showConnectModal && (
        <div
          onClick={() => { sounds.playClick(400); setShowConnectModal(false); }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-neutral-200 flex flex-col"
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center space-x-2 text-xs font-mono text-neutral-500 uppercase">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>DIRECTOR INQUIRY CHANNEL</span>
              </div>
              <button
                onClick={() => { sounds.playClick(400); setShowConnectModal(false); }}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6">
              <h3
                style={{ fontFamily: 'var(--font-serif-luxury)' }}
                className="text-4xl text-neutral-900 uppercase font-normal leading-tight"
              >
                Let&apos;s Build Together
              </h3>
              <p className="mt-2 text-neutral-600 text-sm font-light leading-relaxed">
                Available for spatial architectures, kinetic design systems, brand identities, and high-performance creative direction.
              </p>
            </div>

            {/* Email Copy Card */}
            <div className="mt-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block">Direct Email</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-neutral-900 select-all">
                  namireddysreeshanth@gmail.com
                </span>
              </div>
              <button
                onClick={copyEmail}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider flex items-center space-x-1.5 transition-transform active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>LOCATION: HYDERABAD / GLOBAL</span>
              <span className="text-emerald-600 font-bold">● ACTIVE FOR 2026</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
