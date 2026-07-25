'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Project, ProjectMediaSlot } from '@/site/projects';
import { getProject } from '@/site/projects';

function MediaSlot({ slot, className = '' }: { slot: ProjectMediaSlot; className?: string }) {
  const gradient = slot.colorEnd
    ? `linear-gradient(145deg, ${slot.color} 0%, ${slot.colorEnd} 100%)`
    : slot.color;

  const bgStyle: React.CSSProperties = slot.image
    ? {
        backgroundImage: `url(${slot.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : { background: gradient };

  return (
    <div
      className={`cs-media-slot ${className}`.trim()}
      data-slot={slot.id}
      style={bgStyle}
      role="img"
      aria-label={slot.label}
    >
      {!slot.image && <span className="cs-media-label">{slot.label}</span>}
    </div>
  );
}

/** Ticking gallery — fades between slides every 6s, with prev/next arrows. */
function MediaCarousel({ hero, media }: { hero: ProjectMediaSlot; media: ProjectMediaSlot[] }) {
  const allSlots = [hero, ...media];
  const [current, setCurrent] = useState(0);

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % allSlots.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [allSlots.length]);

  const prev = () => setCurrent((c) => (c - 1 + allSlots.length) % allSlots.length);
  const next = () => setCurrent((c) => (c + 1) % allSlots.length);

  return (
    <div className="cs-carousel" role="region" aria-label="Project screenshots">
      <div className="cs-carousel-stage">
        {allSlots.map((slot, i) => (
          <div
            key={slot.id}
            className={`cs-carousel-slide${i === current ? ' is-active' : ''}`}
            aria-hidden={i !== current}
          >
            <MediaSlot slot={slot} />
          </div>
        ))}
      </div>

      <button className="cs-carousel-arrow cs-carousel-prev" onClick={prev} aria-label="Previous slide">
        ←
      </button>
      <button className="cs-carousel-arrow cs-carousel-next" onClick={next} aria-label="Next slide">
        →
      </button>
    </div>
  );
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const next = getProject(project.nextSlug);

  return (
    <article className="cs-page">
      {/* ── Hero with badges + live link ── */}
      <header className="cs-hero">
        <div className="cs-hero-top">
          <div className="cs-hero-badges">
            <span className="cs-badge cs-badge-sector">{project.sector}</span>
            {project.liveUrl && <span className="cs-badge cs-badge-live">LIVE</span>}
            {project.year && <span className="cs-badge cs-badge-year">{project.year}</span>}
          </div>

          <p className="eyebrow eyebrow-index eyebrow-index-accent" data-index="↗">
            Case study
          </p>
        </div>

        <h1 className="cs-hero-title">
          {project.statement.map((line) => (
            <span key={line} className="cs-hero-title-line">
              {line}
            </span>
          ))}
        </h1>

        <p className="cs-hero-client">
          {project.client}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-live-link"
            >
              {project.liveLabel ?? 'View live site'} →
            </a>
          )}
        </p>
      </header>

      {/* ── Image carousel ── */}
      <MediaCarousel hero={project.hero} media={project.media} />

      {/* ── Meta strip ── */}
      <section className="cs-meta" aria-label="Project details">
        <div className="cs-meta-grid">
          <div>
            <p className="cs-meta-label">Client</p>
            <p className="cs-meta-value">{project.client}</p>
          </div>
          <div>
            <p className="cs-meta-label">Services</p>
            <p className="cs-meta-value">{project.services.join(' · ')}</p>
          </div>
          <div>
            <p className="cs-meta-label">Location</p>
            <p className="cs-meta-value">{project.location}</p>
          </div>
          {project.year && (
            <div>
              <p className="cs-meta-label">Year</p>
              <p className="cs-meta-value">{project.year}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Narrative ── */}
      <div className="cs-body">
        {project.sections.map((section, index) => {
          // Split body paragraphs into bullet groups and regular paragraphs
          const rendered: React.ReactNode[] = [];
          let bulletGroup: string[] = [];
          let keyIdx = 0;

          const flushBullets = () => {
            if (bulletGroup.length > 0) {
              rendered.push(
                <ul key={`bullets-${keyIdx++}`} className="cs-bullets">
                  {bulletGroup.map((item) => (
                    <li key={item}>{item.replace(/^- /, '')}</li>
                  ))}
                </ul>
              );
              bulletGroup = [];
            }
          };

          section.body.forEach((paragraph) => {
            if (paragraph.startsWith('- ')) {
              bulletGroup.push(paragraph);
            } else {
              flushBullets();
              rendered.push(
                <p key={`p-${keyIdx++}`} className="body-copy">
                  {paragraph}
                </p>
              );
            }
          });
          flushBullets();

          return (
            <section key={section.eyebrow} className="cs-block">
              <div className="cs-block-copy">
                <p className="eyebrow eyebrow-index" data-index={String(index + 1).padStart(2, '0')}>
                  {section.eyebrow}
                </p>
                <h2 className="cs-block-title">{section.title}</h2>
                <div className="cs-block-body">
                  {rendered}
                </div>
              </div>
            </section>
          );
        })}

        {/* Results strip */}
        {project.liveUrl && (
          <section className="cs-link-out">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold cs-link-out-btn"
            >
              Visit website
            </a>
          </section>
        )}
        <section className="cs-results" aria-label="Project snapshot">
          <div className="cs-results-grid">
            {project.results.map((item) => (
              <div key={item.label} className="cs-result">
                <p className="cs-meta-label">{item.label}</p>
                <p className="cs-result-value">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Next project + CTA ── */}
      <section className="cs-footer-band">
        <div className="cs-footer-inner">
          {next && (
            <Link href={`/work/${next.slug}`} className="cs-next">
              <p className="eyebrow eyebrow-index eyebrow-index-accent" data-index="→">
                Next case study
              </p>
              <h2 className="cs-next-title">{next.client}</h2>
              <p className="cs-next-tag">{next.tag}</p>
            </Link>
          )}

          <div className="cs-cta">
            <p className="eyebrow">Start a conversation</p>
            <h2 className="cs-cta-title">
              Want something like this for your business?
            </h2>
            <a href="/#contact" className="btn-gold mt-8">
              Talk to us
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
