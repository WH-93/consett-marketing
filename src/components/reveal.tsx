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
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-in');
          obs.disconnect();
        }
      },
      { threshold, rootMargin: `0px 0px ${rootMargin} 0px` }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return React.createElement(Tag, { ref, className: `reveal ${className}`.trim() }, children);
}
