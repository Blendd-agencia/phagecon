'use client';

import { useEffect, useRef } from 'react';

/** Decorative light: pointer motion never causes a React render. */
export function AmbientLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = ref.current;
    const section = light?.parentElement;
    if (!light || !section) return;

    const motion = matchMedia('(min-width: 741px) and (prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)');
    let visible = false;
    let frame = 0;
    let previous = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0;

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      x = y = targetX = targetY = 0;
      light.style.removeProperty('transform');
    };
    const tick = (time: number) => {
      frame = 0;
      if (!motion.matches || !visible || document.hidden) return;
      const elapsed = previous ? Math.min(time - previous, 64) : 16;
      previous = time;
      const ease = 1 - Math.exp(-elapsed / 200);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      const settled = Math.abs(targetX - x) + Math.abs(targetY - y) < 0.2;
      if (settled) { x = targetX; y = targetY; }
      light.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%)`;
      if (!settled) frame = requestAnimationFrame(tick);
      else previous = 0;
    };
    const start = () => {
      if (!frame && motion.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !motion.matches || !visible) return;
      const bounds = section.getBoundingClientRect();
      targetX = (Math.max(0, Math.min(bounds.width, event.clientX - bounds.left)) - bounds.width * 0.78) * 0.7;
      targetY = (Math.max(0, Math.min(bounds.height, event.clientY - bounds.top)) - bounds.height * 0.58) * 0.7;
      start();
    };
    const leave = () => { targetX = targetY = 0; start(); };
    const visibility = () => { if (document.hidden) reset(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) reset();
    });
    observer.observe(section);
    section.addEventListener('pointermove', move, { passive: true });
    section.addEventListener('pointerleave', leave);
    motion.addEventListener('change', reset);
    window.addEventListener('resize', reset);
    document.addEventListener('visibilitychange', visibility);

    return () => {
      reset();
      observer.disconnect();
      section.removeEventListener('pointermove', move);
      section.removeEventListener('pointerleave', leave);
      motion.removeEventListener('change', reset);
      window.removeEventListener('resize', reset);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  return <div ref={ref} className="about-glow" aria-hidden="true" />;
}
