'use client';

import React, { useEffect, useRef } from 'react';

// Adds a subtle rise-and-fade as sections enter the viewport.
// The hidden state is gated on a `.js` root class, so content stays
// visible without JavaScript and when reduced motion is preferred.
export function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  threshold = 0.12,
  rootMargin = '-8%',
  delayMs,
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
  rootMargin?: string;
  /** Staggers the reveal — useful when stacked sections would all fire at once. */
  delayMs?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const apply = () => el.classList.add('reveal-in');
          if (delayMs && delayMs > 0) {
            timerRef.current = setTimeout(apply, delayMs);
          } else {
            apply();
          }
          obs.disconnect();
        }
      },
      { threshold, rootMargin: `0px 0px ${rootMargin} 0px` }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [threshold, rootMargin, delayMs]);

  return React.createElement(Tag, { ref, className: `reveal ${className}`.trim() }, children);
}
