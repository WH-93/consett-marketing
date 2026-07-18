'use client';

import { useEffect, useRef } from 'react';

const MULTIPLIER = -0.08; // 8% scroll speed, reversed (scroll down → arrows drift up)

interface Props {
  fieldRef: React.RefObject<HTMLElement | null>;
  enabled?: boolean;
}

/**
 * Shifts background-position-y on the element pointed to by `fieldRef` at a
 * fraction of window.scrollY so the arrow pattern drifts slowly opposite to
 * scroll while the DOM children scroll at normal speed.
 */
export default function ArrowFieldParallax({ fieldRef, enabled = true }: Props) {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    const el = fieldRef.current;
    if (!el) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        el.style.backgroundPositionY = `${window.scrollY * MULTIPLIER}px`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // prime initial position

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.style.backgroundPositionY = '';
    };
  }, [fieldRef, enabled]);

  return null; // no DOM footprint — parent owns the ref
}
