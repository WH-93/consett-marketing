import React from 'react';
import type { PageMap, SectionType, SiteProfile, StorySectionNode } from '@/site/types';
import {
  AboutMosaicSection,
  AreasCardsSection,
  AreasOverviewSection,
  AudienceSplitSection,
  CenterCtaSection,
  ClientTestimonialSplitSection,
  ContactSection,
  FeatureGridSection,
  FounderInsightSection,
  ProcessStepsSection,
  ProofBandSection,
  ServicesCardsSection,
  SplitHeroSection,
  StepImageSplitSection,
  TestimonialsSection,
  type AboutMosaicContent,
  type AreasCardsContent,
  type AreasOverviewContent,
  type AudienceSplitContent,
  type CenterCtaContent,
  type ClientTestimonialSplitContent,
  type ContactSectionContent,
  type FeatureGridContent,
  type FounderInsightContent,
  type ProcessStepsContent,
  type ProofBandContent,
  type ServicesCardsContent,
  type SplitHeroContent,
  type StepImageSplitContent,
  type TestimonialsContent,
} from '@/components/sections/marketing-sections';

type SectionRendererProps = {
  content: unknown;
  profile: SiteProfile;
};

type SectionRenderer = (props: SectionRendererProps) => React.ReactElement;

const sectionModules: Record<SectionType, SectionRenderer> = {
  splitHero: ({ content, profile }) => <SplitHeroSection content={content as SplitHeroContent} profile={profile} />,
  proofBand: ({ content, profile }) => <ProofBandSection content={content as ProofBandContent} profile={profile} />,
  audienceSplit: ({ content, profile }) => <AudienceSplitSection content={content as AudienceSplitContent} profile={profile} />,
  featureGrid: ({ content, profile }) => <FeatureGridSection content={content as FeatureGridContent} profile={profile} />,
  aboutMosaic: ({ content, profile }) => <AboutMosaicSection content={content as AboutMosaicContent} profile={profile} />,
  areasOverview: ({ content, profile }) => <AreasOverviewSection content={content as AreasOverviewContent} profile={profile} />,
  contactSection: ({ content, profile }) => <ContactSection content={content as ContactSectionContent} profile={profile} />,
  processSteps: ({ content, profile }) => <ProcessStepsSection content={content as ProcessStepsContent} profile={profile} />,
  founderInsight: ({ content, profile }) => <FounderInsightSection content={content as FounderInsightContent} profile={profile} />,
  servicesCards: ({ content, profile }) => <ServicesCardsSection content={content as ServicesCardsContent} profile={profile} />,
  centerCta: ({ content, profile }) => <CenterCtaSection content={content as CenterCtaContent} profile={profile} />,
  stepImageSplit: ({ content, profile }) => <StepImageSplitSection content={content as StepImageSplitContent} profile={profile} />,
  testimonials: ({ content, profile }) => <TestimonialsSection content={content as TestimonialsContent} profile={profile} />,
  areasCards: ({ content, profile }) => <AreasCardsSection content={content as AreasCardsContent} profile={profile} />,
  clientTestimonialSplit: ({ content, profile }) => <ClientTestimonialSplitSection content={content as ClientTestimonialSplitContent} profile={profile} />,
};

function RenderSection({ node, map, profile }: { node: StorySectionNode; map: PageMap; profile: SiteProfile }) {
  const Section = sectionModules[node.type];

  const content = profile.pages[map.page][node.id];

  if (!content) {
    throw new Error(`Missing profile content for ${map.page}.${node.id}`);
  }

  return <Section content={content} profile={profile} />;
}

export function RenderPageMap({ map, profile }: { map: PageMap; profile: SiteProfile }) {
  return (
    <>
      {map.sections.map((node) => <RenderSection key={node.id} node={node} map={map} profile={profile} />)}
    </>
  );
}
