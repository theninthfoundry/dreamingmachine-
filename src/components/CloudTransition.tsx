import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CloudTransition: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Real Photorealistic Cloud Layer Refs
  const cloud1Ref = useRef<HTMLImageElement>(null);
  const cloud2Ref = useRef<HTMLImageElement>(null);
  const cloud3Ref = useRef<HTMLImageElement>(null);
  const cloud4Ref = useRef<HTMLImageElement>(null);
  const cloud5Ref = useRef<HTMLImageElement>(null);

  // Portal & Text Refs
  const centerPortalRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const sunBeamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll-scrubbed cinematic cloud flight timeline with responsive short scroll distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=55%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // 1. Real Cumulus Clouds roll and swell from flanks & bottom, filling the screen
      tl.fromTo(
        cloud1Ref.current,
        { x: '-60%', y: '40%', scale: 0.8, opacity: 0.4 },
        { x: '10%', y: '-10%', scale: 1.8, opacity: 1, ease: 'power1.inOut' },
        0
      );

      tl.fromTo(
        cloud2Ref.current,
        { x: '60%', y: '50%', scale: 0.85, opacity: 0.4 },
        { x: '-10%', y: '-15%', scale: 1.9, opacity: 1, ease: 'power1.inOut' },
        0
      );

      tl.fromTo(
        cloud3Ref.current,
        { y: '80%', scale: 0.9, opacity: 0.3 },
        { y: '-5%', scale: 2.1, opacity: 1, ease: 'power1.inOut' },
        0.05
      );

      tl.fromTo(
        cloud4Ref.current,
        { x: '-40%', y: '-30%', scale: 0.9, opacity: 0.3 },
        { x: '0%', y: '0%', scale: 1.7, opacity: 0.95, ease: 'power1.inOut' },
        0.08
      );

      tl.fromTo(
        cloud5Ref.current,
        { x: '40%', y: '20%', scale: 0.95, opacity: 0.2 },
        { x: '-15%', y: '-10%', scale: 2.2, opacity: 1, ease: 'power1.inOut' },
        0.1
      );

      // 2. Sunlight beams bloom between real cloud masses
      tl.fromTo(
        sunBeamsRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.7, scale: 1.2, ease: 'power2.out' },
        0.25
      );

      // 3. Whispering mist typography emerges through real clouds
      tl.fromTo(
        textRevealRef.current,
        { opacity: 0, scale: 0.88, letterSpacing: '0.4em' },
        { opacity: 1, scale: 1, letterSpacing: '0.15em', ease: 'power2.out' },
        0.3
      );

      // 4. Real Clouds part dynamically outward to left & right (Flying through clouds)
      tl.to(
        [cloud1Ref.current, cloud4Ref.current],
        {
          x: '-120%',
          scale: 3.0,
          opacity: 0,
          ease: 'power2.in',
        },
        0.65
      );

      tl.to(
        [cloud2Ref.current, cloud5Ref.current],
        {
          x: '120%',
          scale: 3.2,
          opacity: 0,
          ease: 'power2.in',
        },
        0.65
      );

      tl.to(
        cloud3Ref.current,
        {
          y: '-130%',
          scale: 3.4,
          opacity: 0,
          ease: 'power2.in',
        },
        0.7
      );

      tl.to(
        textRevealRef.current,
        {
          opacity: 0,
          scale: 1.25,
          filter: 'blur(12px)',
          ease: 'power2.in',
        },
        0.68
      );

      // 5. Deep Royal Blue Portal expands to reveal Section 02
      tl.fromTo(
        centerPortalRef.current,
        { scale: 0.15, opacity: 0 },
        { scale: 1.4, opacity: 1, ease: 'power3.out' },
        0.62
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#f0f6fa] via-[#e2ecf5] to-[#071338] select-none -mt-[1px]"
    >
      {/* Top seamless edge cloud mist blending smoothly into Hero above (eliminates dividing line) */}
      <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-10">
        <div className="w-full h-full bg-gradient-to-b from-[#f0f6fa] via-[#f0f6fa]/70 to-transparent" />
      </div>

      {/* Sunbeams breaking through the clouds */}
      <div
        ref={sunBeamsRef}
        className="absolute inset-0 pointer-events-none opacity-0 flex items-center justify-center will-change-transform z-10"
      >
        <div className="w-[120vw] h-[120vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(255,245,225,0.6)_30%,rgba(255,255,255,0)_70%)] blur-2xl" />
      </div>

      {/* REAL PHOTOREALISTIC CUMULUS CLOUD LAYERS (Drifting & Scaling on Scroll) */}
      
      {/* Cloud 1: Foreground Left Billow */}
      <img
        ref={cloud1Ref}
        src="/assets/real_cumulus_cloud_1.png"
        alt="Real Cumulus Cloud Left"
        className="absolute left-[-20%] bottom-[-15%] w-[85%] max-w-[1100px] h-auto pointer-events-none z-20 will-change-transform drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
      />

      {/* Cloud 2: Foreground Right Billow */}
      <img
        ref={cloud2Ref}
        src="/assets/real_cumulus_cloud_2.png"
        alt="Real Cumulus Cloud Right"
        className="absolute right-[-25%] bottom-[-10%] w-[90%] max-w-[1200px] h-auto pointer-events-none z-20 will-change-transform drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
      />

      {/* Cloud 3: Center Dense Ground Cloud Rising */}
      <img
        ref={cloud3Ref}
        src="/assets/real_cumulus_cloud_3.png"
        alt="Real Cumulus Cloud Center"
        className="absolute left-1/2 -translate-x-1/2 bottom-[-30%] w-[110%] max-w-[1400px] h-auto pointer-events-none z-25 will-change-transform drop-shadow-2xl"
      />

      {/* Cloud 4: High Altitude Drift Cloud Left */}
      <img
        ref={cloud4Ref}
        src="/assets/real_cumulus_cloud_4.png"
        alt="Real High Cumulus Cloud"
        className="absolute left-[-15%] top-[-10%] w-[80%] max-w-[1100px] h-auto pointer-events-none z-15 will-change-transform opacity-90"
      />

      {/* Cloud 5: Secondary Depth Puff Right */}
      <img
        ref={cloud5Ref}
        src="/assets/real_cumulus_cloud_1.png"
        alt="Real Cumulus Cloud Depth Puff"
        className="absolute right-[-10%] top-[15%] w-[75%] max-w-[1000px] h-auto pointer-events-none z-15 will-change-transform opacity-85"
      />

      {/* Center Deep Royal Blue Atmospheric Portal */}
      <div
        ref={centerPortalRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 will-change-transform z-5"
      >
        <div className="w-[140vw] h-[140vh] rounded-full bg-gradient-to-r from-[#040e2a] via-[#091f5a] to-[#040c24] blur-3xl" />
      </div>

      {/* Whispering Mist Cinematic Typography */}
      <div
        ref={textRevealRef}
        className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none"
      >
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-500 mb-3 drop-shadow">
          TRANSITION // 02
        </span>
        <h2
          style={{ fontFamily: 'var(--font-serif-curvy)' }}
          className="text-4xl md:text-6xl lg:text-7xl font-normal text-neutral-800 tracking-wide uppercase max-w-3xl leading-tight drop-shadow-sm"
        >
          Ascension Through Clouds
        </h2>
        <p className="mt-4 text-neutral-600 font-serif italic text-base md:text-lg max-w-md drop-shadow">
          &ldquo;Beyond the mist lies the Pegasus — symbol of untamed momentum and verified craft.&rdquo;
        </p>

        <div className="mt-8 flex items-center space-x-2 text-neutral-500 text-xs font-mono">
          <span className="w-8 h-[1px] bg-neutral-300" />
          <span>SCROLL TO DIVE INTO THE BLUE REALM</span>
          <span className="w-8 h-[1px] bg-neutral-300" />
        </div>
      </div>
    </div>
  );
};
