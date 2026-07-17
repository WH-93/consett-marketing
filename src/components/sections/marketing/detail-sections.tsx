import React from 'react';
import { ButtonLink } from './shared';
import type {
  AreasCardsContent,
  CenterCtaContent,
  ClientTestimonialSplitContent,
  FounderInsightContent,
  ProcessStepsContent,
  SectionProps,
  ServicesCardsContent,
  StepImageSplitContent,
  TestimonialsContent,
} from './types';

const stripStepNumber = (title: string) => title.replace(/^\d+\.\s*/, '');

export function ProcessStepsSection({ content }: SectionProps<ProcessStepsContent>) {
  return (
    <section className={`section ${content.border ? 'hairline-b' : ''}`.trim()}>
      <div className="container-page">
        <div className="section-head section-head-rule">
          <p className="eyebrow eyebrow-index" data-index="↗">{content.eyebrow}</p>
        </div>
        <h2 className="section-title max-w-2xl">{content.title}</h2>
        <div className="process-grid mt-12 sm:mt-16">
          {content.steps.map((step, index) => (
            <div key={step.title} className="process-step">
              <p className="process-num">{String(index + 1).padStart(2, '0')}</p>
              <h3>{stripStepNumber(step.title)}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
        {content.cta && <ButtonLink cta={content.cta} className="mt-12" />}
      </div>
    </section>
  );
}

export function FounderInsightSection({ content }: SectionProps<FounderInsightContent>) {
  return (
    <section className="section hairline-b">
      <div className="container-page grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
        <div>
          <p className="eyebrow eyebrow-index mb-5" data-index="↗">{content.eyebrow}</p>
          <h2 className="section-title">{content.title}</h2>
          <div className="body-copy space-y-4 mt-6 max-w-xl">
            {content.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          {content.signature && (
            <div className="mt-9 pt-6 hairline-t max-w-xl">
              <p className="font-heading font-bold text-2xl text-navy">{content.signature}</p>
              {content.role && <p className="eyebrow mt-1">{content.role}</p>}
            </div>
          )}
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

export function ServicesCardsSection({ content }: SectionProps<ServicesCardsContent>) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="section-head section-head-rule">
          <p className="eyebrow eyebrow-index" data-index="↗">{content.eyebrow}</p>
        </div>
        <h2 className="section-title max-w-3xl">{content.title}</h2>
        <div className="service-row-list">
          {content.items.map((service, index) => (
            <div key={service.title} className="service-row">
              <span className="service-row-num">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
              <ul aria-label={`${service.roleLabel ?? 'Includes'}: ${service.title}`}>
                {service.roles.map((role) => <li key={role}>{role}</li>)}
              </ul>
              <span aria-hidden="true" className="service-row-arrow">↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CenterCtaSection({ content }: SectionProps<CenterCtaContent>) {
  return (
    <section className="section hairline-t text-center">
      <div className="container-page max-w-4xl">
        <p className="eyebrow eyebrow-index justify-center" data-index="↗">{content.eyebrow}</p>
        <h2 className="section-title mt-5">{content.title}</h2>
        <p className="body-copy max-w-2xl mx-auto mt-6">{content.body}</p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          {content.actions.map((cta) => <ButtonLink key={cta.label} cta={cta} />)}
        </div>
      </div>
    </section>
  );
}

export function StepImageSplitSection({ content }: SectionProps<StepImageSplitContent>) {
  return (
    <section className="section hairline-b">
      <div className="container-page grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
        <div>
          <p className="eyebrow eyebrow-index mb-5" data-index="↗">{content.eyebrow}</p>
          <h2 className="section-title">{content.title}</h2>
          <div className="mt-10 space-y-0">
            {content.steps.map((step, index) => (
              <div key={step.title} className="process-step pb-7">
                <p className="process-num">{String(index + 1).padStart(2, '0')}</p>
                <h3>{stripStepNumber(step.title)}</h3>
                <p className="max-w-lg">{step.desc}</p>
              </div>
            ))}
          </div>
          <ButtonLink cta={content.cta} className="mt-6" />
        </div>
        <div className="page-hero-media" role="img" aria-label={content.image.alt}>
          <img src={content.image.src} alt="" />
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({ content }: SectionProps<TestimonialsContent>) {
  return (
    <section className="band-dark on-dark section">
      <div className="container-page">
        <div className="section-head" style={{ borderTop: '1px solid var(--hairline-light)', paddingTop: '1.4rem' }}>
          <p className="eyebrow eyebrow-index" data-index="↗">{content.title}</p>
          <p className="eyebrow">{content.subtitle}</p>
        </div>
        <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10 mt-4">
          {content.items.map((item) => (
            <figure key={item.quote} className="md:px-10 md:first:pl-0 md:last:pr-0">
              <p className="quote-mark" aria-hidden="true">↗</p>
              <blockquote className="mt-4 font-heading font-bold text-xl sm:text-2xl leading-snug tracking-[-0.02em]" style={{ color: 'var(--paper)' }}>
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="eyebrow" style={{ color: 'rgba(247,243,236,0.75)' }}>{item.role}</p>
                <p className="eyebrow mt-1" style={{ color: 'rgba(247,243,236,0.45)' }}>{item.label}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AreasCardsSection({ content }: SectionProps<AreasCardsContent>) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="section-head section-head-rule">
          <p className="eyebrow eyebrow-index" data-index="↗">{content.eyebrow}</p>
        </div>
        <h2 className="section-title max-w-3xl">{content.title}</h2>
        <div className={content.groups.some((group) => group.image) ? 'work-grid mt-10 sm:mt-12' : 'case-study-grid'}>
          {content.groups.map((group) =>
            group.image ? (
              <a
                key={group.title}
                href={group.href ?? '/#work'}
                target={group.href ? '_blank' : undefined}
                rel={group.href ? 'noopener noreferrer' : undefined}
                className="work-card"
              >
                <img src={group.image} alt="" />
                <span className="work-card-arrow" aria-hidden="true">↗</span>
                <div className="work-card-body">
                  {group.tag && <p className="work-card-tag">{group.tag}</p>}
                  <h3 className="work-card-title">{group.title}</h3>
                  <p className="work-card-desc">{group.desc}</p>
                </div>
              </a>
            ) : (
              <div key={group.title} className="case-study-card">
                <p className="case-study-tag">{content.eyebrow}</p>
                <h3>{group.title}</h3>
                <p>{group.desc}</p>
                <span aria-hidden="true" className="case-study-arrow">↗</span>
              </div>
            ),
          )}
        </div>
        {content.cta && <ButtonLink cta={content.cta} className="mt-12" />}
      </div>
    </section>
  );
}

export function ClientTestimonialSplitSection({ content }: SectionProps<ClientTestimonialSplitContent>) {
  return (
    <section className="section hairline-t">
      <div className="container-page grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
        <div>
          <p className="eyebrow eyebrow-index mb-4" data-index="↗">{content.eyebrow}</p>
          <p className="body-copy">{content.subtitle}</p>
          <blockquote className="mt-8 font-heading font-bold text-navy text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-[-0.03em] max-w-2xl">
            “{content.quote}”
          </blockquote>
          <div className="mt-8 pt-6 hairline-t max-w-2xl">
            <p className="eyebrow text-navy/80">{content.role}</p>
            <p className="eyebrow mt-1">{content.meta} · {content.label}</p>
          </div>
        </div>
        <div className="page-hero-media" role="img" aria-label={content.image.alt}>
          <img src={content.image.src} alt="" />
        </div>
      </div>
    </section>
  );
}
