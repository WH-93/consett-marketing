import type { PublicPageMaps } from '@/site/types';

export const publicPageMaps = {
  home: {
    page: 'home',
    sections: [
      { id: 'hero', type: 'splitHero', variant: 'fullImage' },
      { id: 'stats', type: 'proofBand', variant: 'valuesStrip' },
      { id: 'audiences', type: 'audienceSplit', variant: 'twoColumn' },
      { id: 'work', type: 'areasCards', variant: 'warmCentered' },
      { id: 'contact', type: 'contactSection', variant: 'homeCard' },
    ],
  },
  about: {
    page: 'about',
    sections: [
      { id: 'hero', type: 'splitHero', variant: 'splitImage' },
      { id: 'founder', type: 'founderInsight', variant: 'imageCopyQuote' },
      { id: 'values', type: 'featureGrid', variant: 'light' },
    ],
  },
  services: {
    page: 'services',
    sections: [
      { id: 'hero', type: 'splitHero', variant: 'splitImage' },
      { id: 'services', type: 'servicesCards', variant: 'roleCards' },
      { id: 'method', type: 'processSteps', variant: 'numbered' },
      { id: 'cta', type: 'centerCta', variant: 'white' },
    ],
  },
  candidates: {
    page: 'candidates',
    sections: [
      { id: 'hero', type: 'splitHero', variant: 'splitImage' },
      { id: 'steps', type: 'stepImageSplit', variant: 'copyImage' },
      { id: 'testimonials', type: 'testimonials', variant: 'darkThreeColumn' },
      { id: 'areas', type: 'areasCards', variant: 'warmCentered' },
    ],
  },
  clients: {
    page: 'clients',
    sections: [
      { id: 'hero', type: 'splitHero', variant: 'splitImage' },
      { id: 'areas', type: 'areasCards', variant: 'warmCentered' },
      { id: 'testimonial', type: 'clientTestimonialSplit', variant: 'imageSplit' },
    ],
  },
  contact: {
    page: 'contact',
    sections: [
      { id: 'hero', type: 'splitHero', variant: 'splitImage' },
      { id: 'contact', type: 'contactSection', variant: 'warmCard' },
    ],
  },
} satisfies PublicPageMaps;

export function serialisePublicPageMaps(maps: PublicPageMaps) {
  return Object.fromEntries(
    Object.entries(maps).map(([page, map]) => [
      page,
      {
        page: map.page,
        sections: map.sections.map(({ id, type, variant }) => ({ id, type, variant })),
      },
    ]),
  );
}
