'use client';

import { useRef } from 'react';
import type { Metadata } from 'next';
import { RenderPageMap } from '@/components/page-renderer/render-page-map';
import { TrustedBy } from '@/components/trusted-by';
import ArrowFieldParallax from '@/components/arrow-field-parallax';
import { activeProfile } from '@/site/active-profile';
import { publicPageMaps } from '@/site/story-maps/public-pages';

export default function AboutPage() {
  const spacerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <RenderPageMap map={publicPageMaps.about} profile={activeProfile} />
      <div className="trusted-by-spacer" ref={spacerRef}>
        <ArrowFieldParallax fieldRef={spacerRef} />
        <TrustedBy />
      </div>
    </>
  );
}
