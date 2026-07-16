import type { BcIconName } from '@/components/bc-icon';
import type { ContactItem, CtaLink, RichHeadingLine, SiteProfile } from '@/site/types';

export type SectionProps<TContent> = {
  content: TContent;
  profile: SiteProfile;
};

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface SplitHeroContent {
  eyebrow?: string;
  headline: RichHeadingLine[];
  subhead?: string;
  body?: string[];
  actions?: CtaLink[];
  image: ImageAsset;
  mobileImage?: ImageAsset;
  plainHeroTitle?: boolean;
}

export interface ProofBandItem {
  icon: BcIconName;
  value?: string;
  title?: string;
  label?: string;
  desc?: string;
  className?: string;
  hideMobile?: boolean;
}

export interface ProofBandContent {
  items: ProofBandItem[];
  gridClass?: string;
}

export interface AudienceColumn {
  icon: BcIconName;
  eyebrow: string;
  title: string;
  body: string[];
  emphasis?: string;
  cta: CtaLink;
}

export interface AudienceSplitContent {
  columns: AudienceColumn[];
}

export interface FeatureGridItem {
  icon?: BcIconName;
  title: string;
  desc: string;
  hideMobile?: boolean;
}

export interface FeatureGridContent {
  theme?: 'dark' | 'light';
  title: string;
  items: FeatureGridItem[];
}

export interface QuoteBlock {
  eyebrow: string;
  text: string;
  body: string;
}

export interface AboutMosaicContent {
  eyebrow: string;
  titleLines: string[];
  body: string[];
  signature: string;
  role: string;
  cta: CtaLink;
  image: ImageAsset;
  quote: QuoteBlock;
}

export interface HomeServicesShowcaseItem {
  icon: BcIconName;
  title: string;
  desc: string;
  href: string;
}

export interface HomeServicesShowcaseContent {
  aboutEyebrow: string;
  title: string;
  body: string;
  cta: CtaLink;
  servicesEyebrow: string;
  services: HomeServicesShowcaseItem[];
}

export interface AreasListGroup {
  title: string;
  items: string[];
}

export interface AreasOverviewContent {
  eyebrow: string;
  title: string;
  groups: AreasListGroup[];
}

export interface ContactSectionContent {
  theme?: 'home' | 'warm';
  eyebrow: string;
  title: string;
  body: string[];
}

export interface ProcessStep {
  icon: BcIconName;
  title: string;
  desc: string;
}

export interface ProcessStepsContent {
  eyebrow: string;
  title: string;
  steps: ProcessStep[];
  cta?: CtaLink;
  border?: boolean;
}

export interface FounderInsightContent {
  image: ImageAsset;
  eyebrow: string;
  title: string;
  body: string[];
  signature: string;
  role: string;
  quote: QuoteBlock;
}

export interface ServicesCardItem {
  icon: BcIconName;
  title: string;
  desc: string;
  roles: string[];
  roleLabel: string;
}

export interface ServicesCardsContent {
  eyebrow: string;
  title: string;
  items: ServicesCardItem[];
}

export interface CenterCtaContent {
  eyebrow: string;
  title: string;
  body: string;
  actions: CtaLink[];
}

export interface StepImageSplitContent {
  eyebrow: string;
  title: string;
  steps: ProcessStep[];
  cta: CtaLink;
  image: ImageAsset;
}

export interface TestimonialItem {
  quote: string;
  role: string;
  label: string;
}

export interface TestimonialsContent {
  title: string;
  subtitle: string;
  items: TestimonialItem[];
}

export interface AreaCardGroup {
  title: string;
  desc: string;
  image?: string;
  tag?: string;
  href?: string;
}

export interface AreasCardsContent {
  eyebrow: string;
  title: string;
  groups: AreaCardGroup[];
  cta?: CtaLink;
}

export interface ClientTestimonialSplitContent {
  eyebrow: string;
  subtitle: string;
  quote: string;
  role: string;
  meta: string;
  label: string;
  image: ImageAsset;
}
