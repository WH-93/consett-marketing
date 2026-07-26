'use client';

import { useRef } from 'react';
import { RenderPageMap } from '@/components/page-renderer/render-page-map';
import { TrustedBy } from '@/components/trusted-by';
import ArrowFieldParallax from '@/components/arrow-field-parallax';
import { activeProfile } from '@/site/active-profile';
import { publicPageMaps } from '@/site/story-maps/public-pages';

export default function AboutPage() {
  const fieldRef = useRef<HTMLDivElement>(null);
  return (
    <div className="arrow-field-shell" ref={fieldRef}>
      <ArrowFieldParallax fieldRef={fieldRef} />
      <RenderPageMap map={publicPageMaps.about} profile={activeProfile} />
      <div className="trusted-by-spacer">
        <TrustedBy />
      </div>
    </div>
  );
}
