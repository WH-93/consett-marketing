'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import type { Project, ProjectMediaSlot } from '@/site/projects';
import { getProject } from '@/site/projects';

function MediaSlot({ slot, className = '' }: { slot: ProjectMediaSlot; className?: string }) {
  const gradient = slot.colorEnd
    ? `linear-gradient(145deg, ${slot.color} 0%, ${slot.colorEnd} 100%)`
    : slot.color;

  return (
    <div
      className={`cs-media-slot ${className}`.trim()}
      data-slot={slot.id}
      style={{ background: gradient }}
      role="img"
      aria-label={slot.label}
    >
      <span className="cs-media-label">{slot.label}</span>
    </div>
  );
}

function MediaCarousel({ hero, media }: { hero: ProjectMediaSlot; media: ProjectMediaSlot[] }) {
  const allSlots = [hero, ...media];
  const [scroll, setScroll] = useState(0);
  const maxScroll = allSlots.length - 1;

  const prev = useCallback(() => setScroll((s) => Math.max(0, s - 1)), []);
  const next = useCallback(() => setScroll((s) => Math.min(maxScroll, s + 1)), [maxScroll]);

  return (
    <div className="cs-carousel" role="region" aria-label="Project screenshots" aria-roledescription="carousel">
      <div
        className="cs-carousel-track"
        style={{ transform: `translateX(-${scroll * 100}%)` }}
      >
        {allSlots.map((slot) => (
          <div key={slot.id} className="cs-carousel-slide">
            <MediaSlot slot={slot} />
          </div>
        ))}
      </div>

      {allSlots.length > 1 && (
        <>
          <button
            className="cs-carousel-btn cs-carousel-prev"
            onClick={prev}
            disabled={scroll === 0}
            aria-label="Previous screenshot"
          >
            ←
          </button>
          <button
            className="cs-carousel-btn cs-carousel-next"
            onClick={next}
            disabled={scroll === maxScroll}
            aria-label="Next screenshot"
          >
            →
          </button>
          <div className="cs-carousel-dots" aria-hidden="true">
            {allSlots.map((_, i) => (
              <button
                key={i}
                className={`cs-carousel-dot${i === scroll ? ' active' : ''}`}
                onClick={() => setScroll(i)}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
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
            <span className="cs-badge cs-badge-year">{project.year}</span>
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
          <div>
            <p className="cs-meta-label">Year</p>
            <p className="cs-meta-value">{project.year}</p>
          </div>
        </div>
      </section>

      {/* ── Narrative ── */}
      <div className="cs-body">
        {project.sections.map((section, index) => (
          <section key={section.eyebrow} className="cs-block">
            <div className="cs-block-copy">
              <p className="eyebrow eyebrow-index" data-index={String(index + 1).padStart(2, '0')}>
                {section.eyebrow}
              </p>
              <h2 className="cs-block-title">{section.title}</h2>
              <div className="cs-block-body">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="body-copy">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Results strip */}
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
                Next project
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
