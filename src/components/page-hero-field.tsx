'use client';

import { useRef } from 'react';
import ArrowFieldParallax from '@/components/arrow-field-parallax';

/**
 * Thin client wrapper that holds a ref on the arrow-field <section>
 * so ArrowFieldParallax can shift its background-position-y on scroll.
 * The parent server component (SplitHeroSection) can't hold refs.
 */
export default function PageHeroField({ children }: { children: React.ReactNode }) {
  const fieldRef = useRef<HTMLElement>(null);
  return (
    <section ref={fieldRef} className="page-hero-field">
      <ArrowFieldParallax fieldRef={fieldRef} />
      {children}
    </section>
  );
}
