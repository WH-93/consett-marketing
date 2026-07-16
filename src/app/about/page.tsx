import type { Metadata } from 'next';
import { RenderPageMap } from '@/components/page-renderer/render-page-map';
import { activeProfile } from '@/site/active-profile';
import { publicPageMaps } from '@/site/story-maps/public-pages';

export const metadata: Metadata = {
  title: 'About Consett Marketing',
  description: 'Built in Consett, working across the North East. Solutions before services — straight answers, clear pricing, measured results.',
};

export default function AboutPage() {
  return <RenderPageMap map={publicPageMaps.about} profile={activeProfile} />;
}
