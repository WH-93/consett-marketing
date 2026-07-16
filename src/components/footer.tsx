import Link from 'next/link';
import { siteConfig } from '@/config/site';

const { footer, contact, company } = siteConfig;

export function Footer() {
  return (
    <footer className="site-footer bg-bark relative overflow-hidden">
      <div className="footer-cta py-12 sm:py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[1.3fr_auto] items-center">
          <div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl leading-tight tracking-[-0.035em]" style={{ color: 'var(--paper)' }}>
              {footer.ctaHeadline}
            </h2>
            <p className="mt-3 text-sm max-w-2xl" style={{ color: 'rgba(247,243,236,0.65)' }}>
              {footer.ctaSubtext}
            </p>
          </div>
          <a href="/#contact" className="btn-gold justify-self-start lg:justify-self-end">
            {footer.ctaButton}
          </a>
        </div>
      </div>

      <div className="container-page py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <img src={siteConfig.logo.white} alt={siteConfig.logo.alt} className="footer-brand-mark" />
            <p className="text-sm leading-relaxed mt-5" style={{ color: 'rgba(247,243,236,0.6)' }}>
              {footer.description}
            </p>
          </div>

          <div>
            <h4 className="footer-heading mb-5">Explore</h4>
            <ul className="space-y-2.5">
              {footer.quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading mb-5">Services</h4>
            <ul className="space-y-2.5">
              {footer.services.map(area => (
                <li key={area} className="footer-link">{area}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading mb-5">Get in touch</h4>
            <ul className="space-y-2.5">
              <li><a href={`tel:${contact.phoneCompact}`} className="footer-link">{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className="footer-link">{contact.email}</a></li>
              <li className="footer-link">{contact.location}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-5" style={{ borderTop: '1px solid var(--hairline-light)' }}>
        <div className="container-page flex flex-wrap justify-between gap-x-8 gap-y-1 uppercase tracking-[0.14em] text-[10px] font-bold" style={{ color: 'rgba(247,243,236,0.4)' }}>
          <p>{siteConfig.legalName} — {siteConfig.tagline}</p>
          <p>{company.address}</p>
        </div>
      </div>
    </footer>
  );
}
