import type { Metadata } from 'next';
import { RenderPageMap } from '@/components/page-renderer/render-page-map';
import { activeProfile } from '@/site/active-profile';
import { publicPageMaps } from '@/site/story-maps/public-pages';

export const metadata: Metadata = {
  title: 'About Consett Marketing',
  description: 'Meet the husband-and-wife team behind Consett Marketing, combining technical strategy with brand, content and campaign expertise.',
};

export default function AboutPage() {
  return <RenderPageMap map={publicPageMaps.about} profile={activeProfile} />;
}
