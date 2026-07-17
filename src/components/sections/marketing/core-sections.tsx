import React from 'react';
import { ContactCard } from '@/components/contact-card';
import { ButtonLink, RichHeading } from './shared';
import type { ContactSectionContent, ProofBandContent, SectionProps, SplitHeroContent } from './types';

export function SplitHeroSection({ content }: SectionProps<SplitHeroContent>) {
  return (
    <section className="page-hero-field">
      <div className="band-black page-hero-band">
        <div className="page-hero-copy">
          {content.eyebrow && <p className="eyebrow eyebrow-index mb-6" data-index="↗">{content.eyebrow}</p>}
          <RichHeading headline={content.headline} plain={content.plainHeroTitle} />
          {content.subhead && (
            <p className="body-copy mt-7 font-semibold">
              {content.subhead.split('\n').map((line, i) => (
                <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
              ))}
            </p>
          )}
          {content.body && (
            <div className="space-y-4 body-copy mt-7">
              {content.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          )}
          {content.signature && (
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.18)' }}>
              <p className="font-heading font-bold text-2xl" style={{ color: '#fff' }}>{content.signature}</p>
              {content.role && <p className="eyebrow mt-1">{content.role}</p>}
            </div>
          )}
          {content.actions && (
            <div className="hero-actions">
              {content.actions.map((cta) => <ButtonLink key={cta.label} cta={cta} />)}
            </div>
          )}
        </div>
        <div className="page-hero-band-media" role="img" aria-label={content.image.alt}>
          {content.mobileImage ? (
            <picture>
              <source media="(max-width: 1023px)" srcSet={content.mobileImage.src} />
              <img src={content.image.src} alt="" />
            </picture>
          ) : (
            <img src={content.image.src} alt="" />
          )}
        </div>
      </div>
    </section>
  );
}

export function ProofBandSection({ content }: SectionProps<ProofBandContent>) {
  return (
    <section className="stats-band">
      <div className="container-page">
        <div className="stats-grid">
          {content.items.map((item, index) => (
            <div
              key={item.value || item.title}
              className={`stat-item ${item.className || ''} ${item.hideMobile ? 'hidden sm:block' : ''}`.trim()}
            >
              <p className="stat-index">{String(index + 1).padStart(2, '0')}</p>
              <div className="stat-value">{item.value || item.title}</div>
              <div className="stat-label">{item.label || item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ content, profile }: SectionProps<ContactSectionContent>) {
  return (
    <section className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-start">
        <div>
          <span id="contact" className="block scroll-mt-[100px] sm:scroll-mt-[116px] lg:scroll-mt-[132px]" aria-hidden="true" />
          <p className="eyebrow eyebrow-index mb-5" data-index="↗">{content.eyebrow}</p>
          <h2 className="section-title">{content.title}</h2>
          <div className="mt-6 space-y-4">
            {content.body.map((paragraph) => (
              <p key={paragraph} className="body-copy max-w-xl">{paragraph}</p>
            ))}
          </div>
        </div>
        <ContactCard contacts={profile.contacts} />
      </div>
    </section>
  );
}
