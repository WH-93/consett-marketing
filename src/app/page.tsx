import type { Metadata } from 'next';
import { HomeHero } from '@/components/home-hero';
import { HomeScrollStory } from '@/components/home-scroll-story';
import { activeProfile } from '@/site/active-profile';

export const metadata: Metadata = {
  description: activeProfile.config.seo.defaultDescription,
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeScrollStory />
    </>
  );
}
