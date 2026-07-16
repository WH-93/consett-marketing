import type { Metadata } from 'next';
import { RenderPageMap } from '@/components/page-renderer/render-page-map';
import { activeProfile } from '@/site/active-profile';
import { publicPageMaps } from '@/site/story-maps/public-pages';

export const metadata: Metadata = {
  title: 'Marketing Services',
  description: 'Web design, SEO, brand strategy and content — fixed-scope projects with clear pricing. Based in Consett, serving the North East.',
};

export default function ServicesPage() {
  return <RenderPageMap map={publicPageMaps.services} profile={activeProfile} />;
}
