import type { Metadata } from 'next';
import Link from 'next/link';
import { projects, type Project, type ProjectMediaSlot } from '@/site/projects';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Our Work · ${siteConfig.name}`,
  description: 'Recent projects for local businesses. Brand identity, website design, SEO and content.',
};

function MediaStrip({ slots }: { slots: ProjectMediaSlot[] }) {
  return (
    <div className="wk-media-strip" role="img" aria-label="Project screenshots">
      {slots.map((slot) => {
        const gradient = slot.colorEnd
          ? `linear-gradient(145deg, ${slot.color} 0%, ${slot.colorEnd} 100%)`
          : slot.color;
        return (
          <div
            key={slot.id}
            className={`wk-media-slot wk-media-${slot.aspect}`}
            style={{ background: gradient }}
          >
            <span className="wk-media-label">{slot.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ProjectCard({ project }: { project: Project; index: number }) {
  const stripSlots = [project.hero, ...project.media.slice(0, 3)];

  return (
    <article className="wk-card">
      <Link href={`/work/${project.slug}`} className="wk-card-media">
        <MediaStrip slots={stripSlots} />
      </Link>

      <div className="wk-card-body">
        <div className="wk-card-badges">
          <span className="wk-badge wk-badge-sector">{project.sector}</span>
          {project.liveUrl && (
            <span className="wk-badge wk-badge-live">LIVE</span>
          )}
          <span className="wk-badge wk-badge-year">{project.year}</span>
        </div>

        <Link href={`/work/${project.slug}`} className="wk-card-title-link">
          <h2 className="wk-card-title">{project.client}</h2>
        </Link>

        <p className="wk-card-tag">{project.tag}</p>

        <p className="wk-card-desc">{project.summary}</p>

        <div className="wk-card-actions">
          <Link href={`/work/${project.slug}`} className="btn-gold">
            Case study →
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wk-live-link"
            >
              {project.liveLabel ?? 'View live site'} →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function WorkPage() {
  return (
    <main className="wk-page">
      {/* Hero */}
      <section className="wk-hero">
        <div className="wk-hero-inner">
          <p className="eyebrow eyebrow-index eyebrow-index-accent" data-index="↗">
            Our Work
          </p>
          <h1 className="wk-hero-title">
            Projects with
            <span className="band-accent"> practical growth.</span>
          </h1>
          <p className="wk-hero-body">
            A selection of recent work for local businesses. Brand identity,
            website design, SEO and content: built to work, not just to look good.
          </p>
        </div>
      </section>

      {/* Project cards */}
      <section className="wk-gallery">
        {projects.filter((project) => project.visibleInWork !== false).map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </section>

      {/* CTA footer */}
      <section className="wk-cta">
        <div className="wk-cta-inner">
          <p className="eyebrow">Start a conversation</p>
          <h2 className="wk-cta-title">
            Want something like this for your business?
          </h2>
          <a href="/#contact" className="btn-gold mt-6">
            Talk to us
          </a>
        </div>
      </section>
    </main>
  );
}
