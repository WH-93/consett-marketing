import type { BcIconName } from '@/components/bc-icon';

export type PublicPageKey = 'home' | 'about' | 'services' | 'clients' | 'contact';

export type SectionType =
  | 'splitHero'
  | 'proofBand'
  | 'audienceSplit'
  | 'featureGrid'
  | 'aboutMosaic'
  | 'areasOverview'
  | 'contactSection'
  | 'processSteps'
  | 'founderInsight'
  | 'servicesCards'
  | 'centerCta'
  | 'stepImageSplit'
  | 'testimonials'
  | 'areasCards'
  | 'clientTestimonialSplit';

export interface StorySectionNode {
  id: string;
  type: SectionType;
  variant: string;
}

export interface PageMap {
  page: PublicPageKey;
  sections: StorySectionNode[];
}

export type PublicPageMaps = Record<PublicPageKey, PageMap>;

export interface CtaLink {
  label: string;
  href: string;
  style?: 'primary' | 'outline' | 'outlineLight';
}

export interface RichLineSegment {
  text: string;
  accent?: boolean;
}

export type RichHeadingLine = RichLineSegment[];

export interface IconTextItem {
  icon: BcIconName;
  title?: string;
  value?: string;
  label?: string;
  desc?: string;
  className?: string;
}

export interface ContactItem {
  icon: 'mail' | 'phone' | 'location';
  label: string;
  value: string;
  href: string | null;
}

export interface SiteProfile {
  config: typeof import('@/config/site').siteConfig;
  contacts: ContactItem[];
  pages: Record<PublicPageKey, Record<string, unknown>>;
}
