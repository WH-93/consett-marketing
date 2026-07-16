import type { Metadata } from 'next';
import { RenderPageMap } from '@/components/page-renderer/render-page-map';
import { activeProfile } from '@/site/active-profile';
import { publicPageMaps } from '@/site/story-maps/public-pages';

export const metadata: Metadata = {
  title: 'Marketing for Trades & Local Services',
  description: 'You know your trade. We know how to get you found. Websites, SEO and local visibility for tradespeople and local businesses.',
};

export default function CandidatesPage() {
  return <RenderPageMap map={publicPageMaps.candidates} profile={activeProfile} />;
}
