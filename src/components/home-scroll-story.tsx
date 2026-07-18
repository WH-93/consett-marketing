import React from 'react';
import { Reveal } from '@/components/reveal';
import { BcIcon } from '@/components/bc-icon';
import { activeProfile } from '@/site/active-profile';
import type {
  AreasCardsContent,
  ContactSectionContent,
  ServicesCardsContent,
} from '@/components/sections/marketing-sections';

function BandHead({ index, label }: { index: string; label: string }) {
  return (
    <div className="band-head">
      <p className="eyebrow eyebrow-index eyebrow-index-accent" data-index={index}>{label}</p>
    </div>
  );
}

export function HomeScrollStory() {
  const home = activeProfile.pages.home;
  const work = home.work as AreasCardsContent;
  const contact = home.contact as ContactSectionContent;
  const services = (activeProfile.pages.services.services as ServicesCardsContent).items;
  const { config } = activeProfile;

  return (
    <div>
      {/* 01 — What we do */}
      <section id="services" className="home-panel home-panel-wide">
        <Reveal className="band-black" threshold={0.20} rootMargin="-15%">
          <BandHead index="01" label="What we do" />
          <h2 className="band-title">How we can <span className="band-accent">help.</span></h2>
          <div className="service-index mt-10">
            {services.map((service, index) => (
              <div key={service.title} className="service-index-row">
                <span className="service-index-num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="service-index-title">{service.title}</h3>
                <div className="service-index-desc">
                  <p>{service.desc}</p>
                  <ul aria-label={`${service.roleLabel ?? 'Includes'}: ${service.title}`}>
                    {service.roles.map((role) => <li key={role}>{role}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 02 — Recent work */}
      <section id="work" className="home-panel home-panel-wide">
        <Reveal className="band-black" delayMs={400}>
          <BandHead index="02" label={work.eyebrow ?? 'Recent work'} />
          <h2 className="band-title band-title-sm">{work.title}</h2>
          <div className="work-grid">
            {work.groups.map((item) => (
              <a
                key={item.title}
                href={item.href ?? '/#work'}
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

      {/* 03 — Contact */}
      <section id="contact" className="home-panel home-panel-wide contact-final">
        <Reveal className="band-black" delayMs={800}>
          <BandHead index="03" label={contact.eyebrow ?? 'Start a conversation'} />
          <h2 className="band-title">{contact.title}</h2>
          <div className="mt-7 max-w-2xl space-y-4">
            {contact.body.map((paragraph) => (
              <p key={paragraph} className="body-copy">{paragraph}</p>
            ))}
          </div>
          <div className="contact-final-links">
            <a href={`mailto:${config.contact.email}`} className="contact-final-link">
              <span className="contact-final-link-label">
                <BcIcon name="mail" size={14} className="contact-final-link-icon" />
                Email
              </span>
              <span className="contact-final-link-value">{config.contact.email}</span>
            </a>
            <a href={`tel:${config.contact.phoneCompact}`} className="contact-final-link">
              <span className="contact-final-link-label">
                <BcIcon name="phone" size={14} className="contact-final-link-icon" />
                Phone
              </span>
              <span className="contact-final-link-value">{config.contact.phone}</span>
            </a>
            <div className="contact-final-link">
              <span className="contact-final-link-label">
                <BcIcon name="location" size={14} className="contact-final-link-icon" />
                Location
              </span>
              <span className="contact-final-link-value">{config.contact.location}</span>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
