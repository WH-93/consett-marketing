import React from 'react';
import Link from 'next/link';
import { ButtonLink } from '@/components/sections/marketing/shared';
import { Reveal } from '@/components/reveal';
import { activeProfile } from '@/site/active-profile';
import type {
  AreasCardsContent,
  AudienceSplitContent,
  ContactSectionContent,
  ProofBandContent,
  ServicesCardsContent,
} from '@/components/sections/marketing-sections';

function BandHead({
  index,
  label,
  link,
}: {
  index: string;
  label: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="band-head">
      <p className="eyebrow eyebrow-index" data-index={index}>{label}</p>
      {link && <Link href={link.href} className="text-link">{link.label}</Link>}
    </div>
  );
}

export function HomeScrollStory() {
  const home = activeProfile.pages.home;
  const stats = home.stats as ProofBandContent;
  const audiences = home.audiences as AudienceSplitContent;
  const work = home.work as AreasCardsContent;
  const contact = home.contact as ContactSectionContent;
  const services = (activeProfile.pages.services.services as ServicesCardsContent).items;
  const { config } = activeProfile;

  return (
    <div>
      {/* 01 — Why us */}
      <section className="home-panel home-panel-right">
        <Reveal className="band-black">
          <BandHead index="01" label="Why Consett Marketing" />
          <h2 className="band-title band-title-sm">
            Everything you expect.{' '}
            <span className="band-accent">A few things you don’t.</span>
          </h2>
          <p className="band-lead mt-6">
            Strategy, websites, SEO and brand systems for ambitious North East businesses.
            We go deeper than a package list, then build the clearest route to more of the
            right enquiries.
          </p>
          <div className="proof-strip">
            {stats.items.map((item, index) => (
              <div key={item.value} className="proof-item">
                <p className="proof-index">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="proof-title">{item.value}</h3>
                <p className="proof-desc">{item.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 02 — What we do */}
      <section className="home-panel home-panel-wide">
        <Reveal className="band-black">
          <BandHead index="02" label="What we do" link={{ href: '/services', label: 'All services' }} />
          <h2 className="band-title">We make the next move <span className="band-accent">obvious.</span></h2>
          <div className="service-index mt-10">
            {services.map((service, index) => (
              <Link key={service.title} href="/services" className="service-index-row">
                <span className="service-index-num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="service-index-title">{service.title}</h3>
                <p className="service-index-desc">
                  {service.desc}
                  <em>{service.roles.join('  ·  ')}</em>
                </p>
                <span className="service-index-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 03 — How we think */}
      <section className="home-panel">
        <div className="band-split">
          {audiences.columns.map((column, index) => (
            <Reveal key={column.eyebrow} className="band-black">
              <p className="eyebrow eyebrow-index mb-5" data-index={`03.${index + 1}`}>{column.eyebrow}</p>
              <h2 className="band-title band-title-sm">{column.title}</h2>
              <div className="mt-6 space-y-4">
                {column.body.map((paragraph) => <p key={paragraph} className="body-copy">{paragraph}</p>)}
                {column.emphasis && <p className="body-copy font-bold !text-white">{column.emphasis}</p>}
              </div>
              <div className="band-actions">
                <ButtonLink cta={column.cta} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 — Recent work */}
      <section className="home-panel home-panel-wide">
        <Reveal className="band-black">
          <BandHead index="04" label={work.eyebrow ?? 'Recent work'} link={{ href: '/clients', label: 'See all work' }} />
          <h2 className="band-title band-title-sm">{work.title}</h2>
          <div className="work-grid">
            {work.groups.map((item) => (
              <a
                key={item.title}
                href={item.href ?? '/clients'}
                target={item.href ? '_blank' : undefined}
                rel={item.href ? 'noopener noreferrer' : undefined}
                className="work-card"
              >
                {item.image && <img src={item.image} alt="" />}
                <span className="work-card-arrow" aria-hidden="true">↗</span>
                <div className="work-card-body">
                  {item.tag && <p className="work-card-tag">{item.tag}</p>}
                  <h3 className="work-card-title">{item.title}</h3>
                  <p className="work-card-desc">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Quote */}
      <section className="home-panel">
        <Reveal className="band-black">
          <p className="quote-mark" aria-hidden="true">↗</p>
          <blockquote className="quote-text mt-5">
            “Ben took the time to understand our business before suggesting anything.
            The result was exactly what we needed.”
          </blockquote>
          <p className="quote-attr">Business owner — County Durham</p>
        </Reveal>
      </section>

      {/* 05 — Contact */}
      <section id="contact" className="home-panel home-panel-wide contact-final">
        <Reveal className="band-black">
          <BandHead index="05" label={contact.eyebrow ?? 'Start a conversation'} />
          <h2 className="band-title">{contact.title}</h2>
          <div className="mt-7 max-w-2xl space-y-4">
            {contact.body.map((paragraph) => (
              <p key={paragraph} className="body-copy">{paragraph}</p>
            ))}
          </div>
          <div className="contact-final-links">
            <a href={`mailto:${config.contact.email}`} className="contact-final-link">
              <span className="contact-final-link-label">Email</span>
              <span className="contact-final-link-value">{config.contact.email}</span>
            </a>
            <a href={`tel:${config.contact.phoneCompact}`} className="contact-final-link">
              <span className="contact-final-link-label">Phone</span>
              <span className="contact-final-link-value">{config.contact.phone}</span>
            </a>
            <div className="contact-final-link">
              <span className="contact-final-link-label">Studio</span>
              <span className="contact-final-link-value">{config.contact.location}</span>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
