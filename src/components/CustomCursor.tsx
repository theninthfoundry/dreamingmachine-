import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'none',
      });

      // Contextual detection of hovered elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isButton = target.closest('button, a, [role="button"]');
        const isDraggable = target.closest('.cursor-grab, [data-draggable="true"]');
        const isPegasus = target.closest('#pegasus');
        const isWorks = target.closest('#works');

        if (isDraggable) {
          setCursorText('DRAG');
          setIsHovered(true);
        } else if (isButton) {
          setCursorText('VIEW');
          setIsHovered(true);
        } else if (isPegasus && target.closest('.cursor-pointer')) {
          setCursorText('ORBIT');
          setIsHovered(true);
        } else if (isWorks && target.closest('canvas')) {
          setCursorText('POP');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const onMouseDown = () => {
      gsap.to([dot, ring], { scale: 0.8, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to([dot, ring], { scale: isHovered ? 1.4 : 1, duration: 0.25, ease: 'back.out(2)' });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Smooth inertia follow for the ring
    const ticker = gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
      ringX += (mouseX - ringX) * dt;
      ringY += (mouseY - ringY) * dt;

      gsap.set(ring, {
        x: ringX,
        y: ringY,
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      gsap.ticker.remove(ticker);
    };
  }, [isHovered, isVisible]);

  return (
    <div className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Center sharp dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-neutral-900 mix-blend-difference pointer-events-none will-change-transform"
      />

      {/* Trailing magnetic ring / context pill */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 flex items-center justify-center pointer-events-none will-change-transform transition-all duration-300 ${
          isHovered
            ? 'w-16 h-16 -ml-8 -mt-8 bg-neutral-900/15 backdrop-blur-[2px] border border-neutral-900/40 rounded-full scale-125'
            : 'w-9 h-9 -ml-4.5 -mt-4.5 border border-neutral-800/30 rounded-full'
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[9px] font-bold tracking-widest text-neutral-900 uppercase">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};

