import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CloudTransition: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
  const sunShaftsRef = useRef<HTMLDivElement>(null);

  // 1. Shimmering Sunlit Water Vapor Particles Canvas
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

    // 40 gentle golden sunlit mist motes
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedY: -Math.random() * 0.45 - 0.15,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.05 + 0.01,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * p.pulse) * 0.008;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentAlpha = Math.max(0.1, Math.min(0.85, p.alpha));
        ctx.fillStyle = `rgba(255, 245, 210, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 2. Interactive Mouse Parallax (True 3D depth even when idling)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const { innerWidth, innerHeight } = window;
      const mx = (e.clientX / innerWidth - 0.5) * 2;
      const my = (e.clientY / innerHeight - 0.5) * 2;

      // Foreground clouds shift faster
      if (cloud1Ref.current) {
        gsap.to(cloud1Ref.current, {
          x: -mx * 26,
          y: -my * 14,
          duration: 1.1,
          ease: 'power2.out',
        });
      }
      if (cloud2Ref.current) {
        gsap.to(cloud2Ref.current, {
          x: mx * 28,
          y: -my * 16,
          duration: 1.1,
          ease: 'power2.out',
        });
      }
      if (cloud3Ref.current) {
        gsap.to(cloud3Ref.current, {
          x: -mx * 14,
          y: -my * 10,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
      if (cloud4Ref.current) {
        gsap.to(cloud4Ref.current, {
          x: -mx * 36,
          y: -my * 18,
          duration: 1.3,
          ease: 'power2.out',
        });
      }
      if (cloud5Ref.current) {
        gsap.to(cloud5Ref.current, {
          x: mx * 32,
          y: -my * 16,
          duration: 1.3,
          ease: 'power2.out',
        });
      }
      if (sunShaftsRef.current) {
        gsap.to(sunShaftsRef.current, {
          x: mx * 18,
          y: my * 10,
          rotation: mx * 4,
          duration: 1.5,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. Living Ambient Floating Drift + Scroll-Scrubbed Flight
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Living Ambient Floating Drift (Clouds breathe continuously)
      gsap.to(cloud1Ref.current, {
        y: '-=12',
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(cloud2Ref.current, {
        y: '-=10',
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(cloud3Ref.current, {
        scale: 1.04,
        y: '-=8',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(cloud4Ref.current, {
        x: '+=10',
        y: '+=6',
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Master Scroll Flight Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=75%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      // Phase 1: Camera rushes forward into clouds & sunbeams flare
      tl.to(
        sunBeamsRef.current,
        {
          opacity: 1,
          scale: 1.7,
          ease: 'power1.out',
        },
        0
      );

      tl.to(
        sunShaftsRef.current,
        {
          opacity: 0.9,
          scale: 1.5,
          rotation: 15,
          ease: 'power1.out',
        },
        0
      );

      tl.to(
        textRevealRef.current,
        {
          scale: 1.12,
          letterSpacing: '0.22em',
          opacity: 1,
          ease: 'power1.out',
        },
        0
      );

      // Phase 2: Cinematic 3D Parting Flight — Clouds surge outward in parallax
      tl.to(
        [cloud1Ref.current, cloud4Ref.current],
        {
          x: '-140%',
          scale: 3.5,
          opacity: 0,
          ease: 'power2.in',
        },
        0.28
      );

      tl.to(
        [cloud2Ref.current, cloud5Ref.current],
        {
          x: '140%',
          scale: 3.6,
          opacity: 0,
          ease: 'power2.in',
        },
        0.28
      );

      tl.to(
        cloud3Ref.current,
        {
          y: '-130%',
          scale: 3.8,
          opacity: 0,
          ease: 'power2.in',
        },
        0.32
      );

      tl.to(
        textRevealRef.current,
        {
          opacity: 0,
          scale: 1.35,
          filter: 'blur(12px)',
          ease: 'power2.in',
        },
        0.42
      );

      // Phase 3: Deep Royal Denim Blue Celestial Portal expands to engulf viewport (#0c2368)
      tl.fromTo(
        centerPortalRef.current,
        { scale: 0.15, opacity: 0 },
        { scale: 3.0, opacity: 1, ease: 'power3.out' },
        0.38
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="cloud-flight"
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#e8f1f8] via-[#d0e4f5] to-[#0c2368] select-none"
    >
      {/* Top seamless misty feather blending from Hero above */}
      <div className="absolute top-0 left-0 right-0 h-44 pointer-events-none z-10">
        <div className="w-full h-full bg-gradient-to-b from-[#e8f1f8] via-[#e8f1f8]/85 to-transparent" />
      </div>

      {/* Shimmering Sunlit Water Vapor Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-15"
      />

      {/* Volumetric Sunbeams & Rotating Caustic Shafts */}
      <div
        ref={sunBeamsRef}
        className="absolute inset-0 pointer-events-none opacity-65 flex items-center justify-center will-change-transform z-10"
      >
        <div className="w-[130vw] h-[130vh] bg-[radial-gradient(ellipse_at_center,rgba(255,252,235,0.95)_0%,rgba(255,242,205,0.55)_35%,rgba(255,255,255,0)_70%)] blur-2xl" />
      </div>

      <div
        ref={sunShaftsRef}
        className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center will-change-transform z-10"
      >
        <div className="w-[100vw] h-[100vh] bg-[conic-gradient(from_0deg_at_50%_45%,transparent_0deg,rgba(255,250,220,0.35)_20deg,transparent_45deg,rgba(255,245,210,0.4)_75deg,transparent_110deg,rgba(255,250,225,0.35)_160deg,transparent_200deg,rgba(255,245,210,0.4)_250deg,transparent_290deg,rgba(255,250,220,0.35)_340deg,transparent_360deg)] blur-xl" />
      </div>

      {/* ============================================================== */}
      {/* REAL PHOTOREALISTIC CUMULUS CLOUD LAYERS (Visible & Billowing)   */}
      {/* ============================================================== */}

      {/* Cloud 1: Foreground Left Billow */}
      <img
        ref={cloud1Ref}
        src="/assets/real_cumulus_cloud_1.png"
        alt="Real Cumulus Cloud Left"
        className="absolute left-[-10%] bottom-[-10%] w-[75%] max-w-[1050px] h-auto pointer-events-none z-20 will-change-transform opacity-95 drop-shadow-[0_20px_45px_rgba(0,0,0,0.14)]"
      />

      {/* Cloud 2: Foreground Right Billow */}
      <img
        ref={cloud2Ref}
        src="/assets/real_cumulus_cloud_2.png"
        alt="Real Cumulus Cloud Right"
        className="absolute right-[-12%] bottom-[-8%] w-[78%] max-w-[1100px] h-auto pointer-events-none z-20 will-change-transform opacity-95 drop-shadow-[0_20px_45px_rgba(0,0,0,0.14)]"
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

      {/* Center Deep Royal Denim Blue Celestial Portal (#0c2368 matching Pegasus artwork) */}
      <div
        ref={centerPortalRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 will-change-transform z-15"
      >
        <div className="w-[150vw] h-[150vh] rounded-full bg-gradient-to-r from-[#081845] via-[#0c2368] to-[#071338] blur-3xl shadow-[0_0_140px_rgba(12,35,104,0.95)]" />
      </div>

      {/* Whispering Mist Cinematic Typography */}
      <div
        ref={textRevealRef}
        className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none will-change-transform"
      >
        <div className="inline-flex items-center space-x-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.35em] text-neutral-700 mb-3 drop-shadow bg-white/60 backdrop-blur-md px-4 py-1 rounded-full border border-white/60 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
          <span>TRANSITION // 02</span>
        </div>

        <h2
          style={{ fontFamily: 'var(--font-serif-luxury)' }}
          className="text-4xl md:text-6xl lg:text-7xl font-normal text-neutral-900 tracking-wide uppercase max-w-3xl leading-tight drop-shadow-md"
        >
          Ascension Through Clouds
        </h2>
        <p className="mt-4 text-neutral-700 font-serif italic text-base md:text-lg max-w-md drop-shadow">
          &ldquo;Beyond the mist lies the Pegasus — symbol of untamed momentum and verified craft.&rdquo;
        </p>

        <div className="mt-8 flex items-center space-x-2 text-neutral-800 text-xs font-mono bg-white/70 backdrop-blur-md px-5 py-2 rounded-full border border-white/60 shadow-md">
          <span className="font-semibold tracking-wider">SCROLL TO DIVE INTO THE BLUE REALM</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-neutral-900" />
        </div>
      </div>
    </div>
  );
};
