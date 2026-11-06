import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CloudTransition: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Real Photorealistic Cloud Layer Refs
  const cloud1Ref = useRef<HTMLImageElement>(null);
  const cloud2Ref = useRef<HTMLImageElement>(null);
  const cloud3Ref = useRef<HTMLImageElement>(null);
  const cloud4Ref = useRef<HTMLImageElement>(null);
  const cloud5Ref = useRef<HTMLImageElement>(null);

  // Portal, Sunbeams & Typography Refs
  const centerPortalRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const sunBeamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Living Ambient Floating Drift (Clouds breathe gently while resting or scrolling)
      gsap.to(cloud1Ref.current, {
        x: '+=14',
        y: '-=10',
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(cloud2Ref.current, {
        x: '-=16',
        y: '-=8',
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(cloud3Ref.current, {
        scale: 1.05,
        y: '-=12',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(cloud4Ref.current, {
        x: '+=12',
        y: '+=8',
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. High-Impact, Responsive Scroll-Scrubbed Cloud Flight (Snappy, ZERO Dead Space)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=70%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // Phase 1: Camera rushes forward into clouds & sunbeams bloom
      tl.to(
        sunBeamsRef.current,
        {
          opacity: 1,
          scale: 1.6,
          ease: 'power1.out',
        },
        0
      );

      tl.to(
        textRevealRef.current,
        {
          scale: 1.1,
          letterSpacing: '0.22em',
          opacity: 1,
          ease: 'power1.out',
        },
        0
      );

      // Phase 2: Cinematic 3D Parting Flight — Clouds surge outward to flanks as you fly through
      tl.to(
        [cloud1Ref.current, cloud4Ref.current],
        {
          x: '-135%',
          scale: 3.2,
          opacity: 0,
          ease: 'power2.in',
        },
        0.3
      );

      tl.to(
        [cloud2Ref.current, cloud5Ref.current],
        {
          x: '135%',
          scale: 3.4,
          opacity: 0,
          ease: 'power2.in',
        },
        0.3
      );

      tl.to(
        cloud3Ref.current,
        {
          y: '-120%',
          scale: 3.6,
          opacity: 0,
          ease: 'power2.in',
        },
        0.35
      );

      tl.to(
        textRevealRef.current,
        {
          opacity: 0,
          scale: 1.3,
          filter: 'blur(10px)',
          ease: 'power2.in',
        },
        0.45
      );

      // Phase 3: Deep Royal Blue Celestial Portal expands from center to take over screen
      tl.fromTo(
        centerPortalRef.current,
        { scale: 0.2, opacity: 0 },
        { scale: 2.6, opacity: 1, ease: 'power3.out' },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="cloud-flight"
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#e8f1f8] via-[#d0e4f5] to-[#071338] select-none"
    >
      {/* Top seamless misty edge blending from Hero above */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10">
        <div className="w-full h-full bg-gradient-to-b from-[#e8f1f8] via-[#e8f1f8]/80 to-transparent" />
      </div>

      {/* Volumetric Sunbeams breaking through the cloud masses */}
      <div
        ref={sunBeamsRef}
        className="absolute inset-0 pointer-events-none opacity-60 flex items-center justify-center will-change-transform z-10"
      >
        <div className="w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,rgba(255,252,235,0.95)_0%,rgba(255,242,210,0.5)_35%,rgba(255,255,255,0)_70%)] blur-2xl" />
      </div>

      {/* ============================================================== */}
      {/* REAL PHOTOREALISTIC CUMULUS CLOUD LAYERS (Visible & Billowing)   */}
      {/* ============================================================== */}

      {/* Cloud 1: Foreground Left Billow */}
      <img
        ref={cloud1Ref}
        src="/assets/real_cumulus_cloud_1.png"
        alt="Real Cumulus Cloud Left"
        className="absolute left-[-10%] bottom-[-10%] w-[75%] max-w-[1050px] h-auto pointer-events-none z-20 will-change-transform opacity-95 drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
      />

      {/* Cloud 2: Foreground Right Billow */}
      <img
        ref={cloud2Ref}
        src="/assets/real_cumulus_cloud_2.png"
        alt="Real Cumulus Cloud Right"
        className="absolute right-[-12%] bottom-[-8%] w-[78%] max-w-[1100px] h-auto pointer-events-none z-20 will-change-transform opacity-95 drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
      />

      {/* Cloud 3: Center Dense Ground Cloud Billowing Up */}
      <img
        ref={cloud3Ref}
        src="/assets/real_cumulus_cloud_3.png"
        alt="Real Cumulus Cloud Center"
        className="absolute left-1/2 -translate-x-1/2 bottom-[-18%] w-[95%] max-w-[1350px] h-auto pointer-events-none z-25 will-change-transform opacity-95 drop-shadow-2xl"
      />

      {/* Cloud 4: High Altitude Drift Cloud Left */}
      <img
        ref={cloud4Ref}
        src="/assets/real_cumulus_cloud_4.png"
        alt="Real High Cumulus Cloud Left"
        className="absolute left-[-4%] top-[8%] w-[58%] max-w-[800px] h-auto pointer-events-none z-15 will-change-transform opacity-85"
      />

      {/* Cloud 5: High Altitude Drift Cloud Right */}
      <img
        ref={cloud5Ref}
        src="/assets/real_cumulus_cloud_1.png"
        alt="Real High Cumulus Cloud Right"
        className="absolute right-[-4%] top-[12%] w-[52%] max-w-[750px] h-auto pointer-events-none z-15 will-change-transform opacity-80"
      />

      {/* Center Deep Royal Blue Celestial Portal */}
      <div
        ref={centerPortalRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 will-change-transform z-15"
      >
        <div className="w-[140vw] h-[140vh] rounded-full bg-gradient-to-r from-[#040e2a] via-[#091f5a] to-[#040c24] blur-3xl shadow-[0_0_120px_rgba(7,19,56,0.9)]" />
      </div>

      {/* Whispering Mist Cinematic Typography */}
      <div
        ref={textRevealRef}
        className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none will-change-transform"
      >
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-600 mb-3 drop-shadow bg-white/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/40">
          TRANSITION // 02
        </span>
        <h2
          style={{ fontFamily: 'var(--font-serif-luxury)' }}
          className="text-4xl md:text-6xl lg:text-7xl font-normal text-neutral-900 tracking-wide uppercase max-w-3xl leading-tight drop-shadow-md"
        >
          Ascension Through Clouds
        </h2>
        <p className="mt-4 text-neutral-700 font-serif italic text-base md:text-lg max-w-md drop-shadow">
          &ldquo;Beyond the mist lies Pegasus — symbol of untamed momentum and verified craft.&rdquo;
        </p>

        <div className="mt-8 flex items-center space-x-2 text-neutral-700 text-xs font-mono bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/50 shadow-sm">
          <span>SCROLL TO DIVE INTO THE BLUE REALM</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-neutral-800" />
        </div>
      </div>
    </div>
  );
};
