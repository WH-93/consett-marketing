import type { Metadata } from 'next';
import { RenderPageMap } from '@/components/page-renderer/render-page-map';
import { activeProfile } from '@/site/active-profile';
import { publicPageMaps } from '@/site/story-maps/public-pages';

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Recent projects from Consett Marketing — brand identity, website design and SEO for local businesses across the North East.',
};

export default function ClientsPage() {
  return <RenderPageMap map={publicPageMaps.clients} profile={activeProfile} />;
}
