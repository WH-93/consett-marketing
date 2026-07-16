import React from 'react';
import Link from 'next/link';
import { BcIcon } from '@/components/bc-icon';
import { Reveal } from '@/components/reveal';
import { ButtonLink, LineBreakTitle } from './shared';
import type {
  AboutMosaicContent,
  AreasOverviewContent,
  AudienceSplitContent,
  FeatureGridContent,
  HomeServicesShowcaseContent,
  SectionProps,
} from './types';

export function AudienceSplitSection({ content }: SectionProps<AudienceSplitContent>) {
  return (
    <section className="editorial-split">
      <div className="container-page grid gap-6 lg:grid-cols-2 items-stretch">
        {content.columns.map((column, index) => (
          <div key={column.eyebrow} className={index === 0 ? 'editorial-panel editorial-panel-dark' : 'editorial-panel'}>
            <p className="eyebrow mb-5">{column.eyebrow}</p>
            <h2 className="section-title">{column.title}</h2>
            <div className="space-y-4 body-copy mt-6">
              {column.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {column.emphasis && <p className="font-bold text-current">{column.emphasis}</p>}
            </div>
            <ButtonLink cta={column.cta} className="mt-8 self-start" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeatureGridSection({ content }: SectionProps<FeatureGridContent>) {
  if (content.theme === 'dark') {
    return (
      <section className="manifesto-section">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] items-start">
          <div>
            <p className="eyebrow mb-5">Why work with us?</p>
            <h2 className="section-title">{content.title}</h2>
          </div>
          <div className="manifesto-list">
            {content.items.map((item, index) => (
              <div key={item.title} className={`manifesto-row ${item.hideMobile ? 'hidden sm:grid' : ''}`.trim()}>
                <span className="manifesto-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container-page">
        <div className="section-head section-head-rule">
          <p className="eyebrow eyebrow-index" data-index="↗">Working with us</p>
        </div>
        <h2 className="section-title max-w-2xl">{content.title}</h2>
        <Reveal className="feature-grid mt-12">
          {content.items.map((item, index) => (
            <div key={item.title} className={`feature-card ${item.hideMobile ? 'hidden sm:block' : ''}`.trim()}>
              <p className="feature-index">{String(index + 1).padStart(2, '0')}</p>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function AboutMosaicSection({ content }: SectionProps<AboutMosaicContent>) {
  return (
    <section className="section hairline-b">
      <div className="container-page grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div>
          <p className="eyebrow eyebrow-index mb-5" data-index="↗">{content.eyebrow}</p>
          <LineBreakTitle lines={content.titleLines} className="section-title" />
          <div className="body-copy space-y-4 mt-6 max-w-2xl">{content.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className="mt-8 flex items-end justify-between gap-6 hairline-t pt-6 max-w-2xl">
            <div>
              <p className="font-heading font-bold text-2xl text-navy">{content.signature}</p>
              <p className="eyebrow mt-1">{content.role}</p>
            </div>
            <ButtonLink cta={content.cta} />
          </div>
        </div>
        <div className="founder-media">
          <img src={content.image.src} alt={content.image.alt} />
          <div className="founder-media-body">
            <p className="eyebrow mb-4" style={{ color: 'rgba(247,243,236,0.6)' }}>{content.quote.eyebrow}</p>
            <p className="founder-media-quote">“{content.quote.text}”</p>
            <p className="founder-media-note">{content.quote.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeServicesShowcaseSection({ content }: SectionProps<HomeServicesShowcaseContent>) {
  return (
    <section className="band-dark on-dark section">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="eyebrow mb-4">{content.aboutEyebrow}</p>
          <h2 className="section-title">{content.title}</h2>
          <p className="body-copy mt-5 max-w-md">{content.body}</p>
          <ButtonLink cta={content.cta} className="mt-8" />
        </div>
        <div>
          <p className="eyebrow mb-7">{content.servicesEyebrow}</p>
          <div className="grid gap-8 sm:grid-cols-2">
            {content.services.map((service) => (
              <Link key={service.title} href={service.href} className="group block">
                <BcIcon name={service.icon} size={32} className="text-gold" strokeWidth={1.5} />
                <h3 className="mt-4 font-heading font-bold normal-case text-lg" style={{ color: 'var(--paper)' }}>{service.title}</h3>
                <p className="mt-2 text-sm leading-6" style={{ color: 'rgba(247,243,236,0.68)' }}>{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AreasOverviewSection({ content }: SectionProps<AreasOverviewContent>) {
  return (
    <section className="section hairline-t">
      <div className="container-page">
        <div className="section-head section-head-rule">
          <p className="eyebrow eyebrow-index" data-index="↗">{content.eyebrow}</p>
        </div>
        <h2 className="section-title max-w-2xl">{content.title}</h2>
        <div className="grid gap-10 sm:grid-cols-2 mt-10 max-w-3xl">
          {content.groups.map((group) => (
            <div key={group.title} className="process-step">
              <h3>{group.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm leading-6 text-navy/60">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
