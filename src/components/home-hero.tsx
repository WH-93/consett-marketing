import React from 'react';
import { ButtonLink } from '@/components/sections/marketing/shared';
import { activeProfile } from '@/site/active-profile';
import type { SplitHeroContent } from '@/components/sections/marketing-sections';

const tickerItems = [
  'Web Design',
  'SEO',
  'Brand Strategy',
  'Content & Copy',
  'Local Search',
  'Landing Pages',
  'Positioning',
  'Analytics',
];

function HeroHeadline({ headline }: Pick<SplitHeroContent, 'headline'>) {
  return (
    <h1
      className="home-hero-title"
      aria-label={headline.map((line) => line.map((segment) => segment.text).join('')).join(' ')}
    >
      {headline.map((line, lineIndex) => (
        <span key={lineIndex} className="ed-hero-title-line" aria-hidden="true">
          {line.map((segment, segmentIndex) => (
            <span key={segmentIndex} className={segment.accent ? 'ed-hero-title-accent' : undefined}>
              {segment.text}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export function HomeHero() {
  const { config } = activeProfile;
  const hero = activeProfile.pages.home.hero as SplitHeroContent;

  return (
    <section aria-labelledby="landing-hero-title">
      <div className="field-topline">
        <span className="field-topline-brand">
          Consett Marketing
        </span>
        <span>{config.tagline}</span>
        <span className="hidden sm:inline">Web · SEO · Brand</span>
      </div>

      <div className="home-hero-panel">
        <div className="band-black home-hero-band">
          <p className="home-hero-kicker eyebrow">Consett, County Durham · Working across the North East</p>
          <div id="landing-hero-title">
            <HeroHeadline headline={hero.headline} />
          </div>
          {hero.subhead && <p className="band-lead home-hero-sub">{hero.subhead}</p>}
          {hero.actions && (
            <div className="band-actions">
              {hero.actions.map((cta) => <ButtonLink key={cta.label} cta={cta} />)}
            </div>
          )}
        </div>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((group) => (
            <div key={group} className="ticker-group">
              {tickerItems.map((item) => <span key={item}>{item}</span>)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
