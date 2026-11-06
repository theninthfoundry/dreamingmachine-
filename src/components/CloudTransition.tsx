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

  // Portal, Sunbeams & Text Refs
  const centerPortalRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const sunBeamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Living Ambient Floating Motion (clouds breathe gently before/while scrolling)
      gsap.to(cloud1Ref.current, {
        x: '+=15',
        y: '-=10',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(cloud2Ref.current, {
        x: '-=18',
        y: '-=8',
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(cloud3Ref.current, {
        scale: 1.04,
        y: '-=12',
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. High-Impact, Responsive Scroll-Scrubbed Cloud Flight (Short 45% distance, zero dead space)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=45%',
          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
        },
      });

      // Phase A: Swell towards camera and sunbeams flare
      tl.to(
        sunBeamsRef.current,
        { opacity: 0.95, scale: 1.5, ease: 'power1.out' },
        0
      );

      tl.to(
        textRevealRef.current,
        { scale: 1.08, letterSpacing: '0.25em', opacity: 1, ease: 'power1.out' },
        0
      );

      // Phase B: Cinematic 3D Parting Flight — Clouds surge outward to flanks as you fly through
      tl.to(
        [cloud1Ref.current, cloud4Ref.current],
        {
          x: '-140%',
          scale: 3.4,
          opacity: 0,
          filter: 'blur(10px)',
          ease: 'power2.inOut',
        },
        0.12
      );

      tl.to(
        [cloud2Ref.current, cloud5Ref.current],
        {
          x: '140%',
          scale: 3.6,
          opacity: 0,
          filter: 'blur(10px)',
          ease: 'power2.inOut',
        },
        0.12
      );

      tl.to(
        cloud3Ref.current,
        {
          y: '-150%',
          scale: 3.8,
          opacity: 0,
          filter: 'blur(12px)',
          ease: 'power2.inOut',
        },
        0.15
      );

      tl.to(
        textRevealRef.current,
        {
          opacity: 0,
          scale: 1.3,
          filter: 'blur(14px)',
          ease: 'power2.in',
        },
        0.2
      );

      // Phase C: Deep Royal Blue Celestial Portal expands smoothly to reveal Pegasus
      tl.fromTo(
        centerPortalRef.current,
        { scale: 0.2, opacity: 0 },
        { scale: 1.6, opacity: 1, ease: 'power3.out' },
        0.1
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="cloud-flight"
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#f0f6fa] via-[#d6e5f3] to-[#071338] select-none -mt-[1px]"
    >
      {/* Top seamless edge cloud mist blending directly with Hero above */}
      <div className="absolute top-0 left-0 right-0 h-36 pointer-events-none z-10">
        <div className="w-full h-full bg-gradient-to-b from-[#f0f6fa] via-[#f0f6fa]/60 to-transparent" />
      </div>

      {/* Volumetric Sunbeams Piercing Between Clouds */}
      <div
        ref={sunBeamsRef}
        className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center will-change-transform z-10"
      >
        <div className="w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95)_0%,rgba(255,245,225,0.6)_35%,rgba(56,189,248,0.2)_55%,transparent_75%)] blur-2xl" />
      </div>

      {/* Deep Royal Blue Celestial Portal Behind Clouds */}
      <div
        ref={centerPortalRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 will-change-transform z-5"
      >
        <div className="w-[150vw] h-[150vh] rounded-full bg-gradient-to-r from-[#071338] via-[#091f5a] to-[#071338] blur-3xl" />
      </div>

      {/* REAL PHOTOREALISTIC CUMULUS CLOUD BILLOWS (Visible Immediately — Zero Dead Space) */}
      
      {/* Cloud 1: Foreground Left Billow */}
      <img
        ref={cloud1Ref}
        src="/assets/real_cumulus_cloud_1.png"
        alt="Real Cumulus Cloud Left"
        className="absolute left-[-10%] bottom-[-5%] w-[75%] max-w-[1050px] h-auto pointer-events-none z-20 will-change-transform opacity-95 drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
      />

      {/* Cloud 2: Foreground Right Billow */}
      <img
        ref={cloud2Ref}
        src="/assets/real_cumulus_cloud_2.png"
        alt="Real Cumulus Cloud Right"
        className="absolute right-[-10%] bottom-[-5%] w-[80%] max-w-[1150px] h-auto pointer-events-none z-20 will-change-transform opacity-95 drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
      />

      {/* Cloud 3: Center Dense Ground Cloud Surging */}
      <img
        ref={cloud3Ref}
        src="/assets/real_cumulus_cloud_3.png"
        alt="Real Cumulus Cloud Center"
        className="absolute left-1/2 -translate-x-1/2 bottom-[-15%] w-[100%] max-w-[1350px] h-auto pointer-events-none z-25 will-change-transform opacity-90 drop-shadow-2xl"
      />

      {/* Cloud 4: Drift Cloud High Left */}
      <img
        ref={cloud4Ref}
        src="/assets/real_cumulus_cloud_4.png"
        alt="Real High Cumulus Cloud Left"
        className="absolute left-[-5%] top-[5%] w-[65%] max-w-[900px] h-auto pointer-events-none z-15 will-change-transform opacity-85"
      />

      {/* Cloud 5: Drift Cloud High Right */}
      <img
        ref={cloud5Ref}
        src="/assets/real_cumulus_cloud_1.png"
        alt="Real High Cumulus Cloud Right"
        className="absolute right-[-5%] top-[10%] w-[60%] max-w-[850px] h-auto pointer-events-none z-15 will-change-transform opacity-80"
      />

      {/* Whispering Mist Cinematic Typography */}
      <div
        ref={textRevealRef}
        className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none will-change-transform"
      >
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-neutral-300 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-700 shadow-sm mb-4">
          <span>Flight Portal // Transition 02</span>
        </div>

        <h2
          style={{ fontFamily: 'var(--font-serif-luxury)' }}
          className="text-4xl sm:text-6xl md:text-7xl font-normal text-neutral-900 tracking-wider uppercase max-w-3xl leading-tight drop-shadow"
        >
          Ascension Through Clouds
        </h2>

        <p className="mt-3 text-neutral-700 font-serif italic text-sm sm:text-base md:text-lg max-w-md drop-shadow">
          &ldquo;Beyond the mist lies Pegasus — symbol of untamed momentum and verified ideas.&rdquo;
        </p>

        <div className="mt-6 flex items-center space-x-2 text-neutral-500 text-xs font-mono">
          <span className="w-8 h-[1px] bg-neutral-400" />
          <span className="flex items-center space-x-1">
            <span>SCROLL TO ENTER CELESTIAL REALM</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-neutral-700" />
          </span>
          <span className="w-8 h-[1px] bg-neutral-400" />
        </div>
      </div>

      {/* Bottom seamless edge fading into Pegasus royal blue */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-30">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-[#071338]/60 to-[#071338]" />
      </div>
    </div>
  );
};
