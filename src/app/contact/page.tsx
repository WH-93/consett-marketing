import type { Metadata } from 'next';
import { RenderPageMap } from '@/components/page-renderer/render-page-map';
import { activeProfile } from '@/site/active-profile';
import { publicPageMaps } from '@/site/story-maps/public-pages';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a conversation with Consett Marketing. Based in Consett, County Durham. Straight answers, clear pricing — tell us where you want to be.',
};

export default function ContactPage() {
  return <RenderPageMap map={publicPageMaps.contact} profile={activeProfile} />;
}
