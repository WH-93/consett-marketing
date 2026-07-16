import type { Metadata } from 'next';
import './globals.css';
import { PublicLayout } from '@/components/public-layout';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    template: siteConfig.seo.template,
    default: siteConfig.seo.defaultTitle,
  },
  description: siteConfig.seo.defaultDescription,
  icons: { icon: '/logos/monogram-c-arrow-navy-square.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { fonts, schema, url, name, legalName, tagline, contact, company } = siteConfig;

  const telephone = `+44 ${contact.phone.replace(/^0/, '').replace(/\s/g, '')}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${url}/#business`,
        name,
        legalName,
        url,
        logo: schema.logo,
        image: schema.image,
        description: tagline,
        email: contact.email,
        telephone,
        priceRange: '££',
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'County Durham' },
          { '@type': 'AdministrativeArea', name: 'North East England' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: contact.location,
          addressCountry: 'GB',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Marketing Services',
          itemListElement: schema.services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.name, description: s.description },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        name,
        url,
        description: tagline,
        publisher: { '@id': `${url}/#business` },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {fonts.googlePreconnect.map((href) => (
          <link key={href} rel="preconnect" href={href} crossOrigin="anonymous" />
        ))}
        <link href={fonts.googleFontsUrl} rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js');` }} />
        <script dangerouslySetInnerHTML={{ __html: `
(function() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  function findHashTarget(hash) {
    if (!hash) return null;
    var id = decodeURIComponent(hash.replace(/^#/, ''));
    var section = document.getElementById(id);
    if (!section) return null;

    return section;
  }

  function headerOffset() {
    var header = document.querySelector('header');
    if (!header) {
      return window.innerWidth < 640 ? 80 : 96;
    }

    var rect = header.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) return 0;

    return Math.ceil(Math.max(0, rect.bottom - Math.max(0, rect.top)));
  }

  function jumpToHash(hash) {
    var target = findHashTarget(hash || window.location.hash);
    if (!target) return;

    var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    var root = document.documentElement;
    var previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, Math.max(0, top));
    root.style.scrollBehavior = previousScrollBehavior;
  }

  function scheduleHashJump(hash) {
    // Repeat after layout/viewport settling. iOS Safari can adjust the address bar
    // and Next can hydrate after the initial click; repeated absolute jumps make the
    // final position deterministic without relying on scroll-margin support.
    [0, 60, 180, 360, 700].forEach(function(delay) {
      setTimeout(function() {
        requestAnimationFrame(function() {
          jumpToHash(hash);
        });
      }, delay);
    });
  }

  document.addEventListener('click', function(event) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;

    var url = new URL(link.getAttribute('href'), window.location.href);
    if (url.origin !== window.location.origin || url.hash !== '#contact' || url.pathname !== '/') return;

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();

    if (window.location.pathname !== '/') {
      window.location.href = url.pathname + url.hash;
      return;
    }

    history.pushState(null, '', url.pathname + url.hash);
    scheduleHashJump(url.hash);
  }, true);

  var _push = history.pushState;
  history.pushState = function() {
    _push.apply(this, arguments);
    if (window.location.hash) scheduleHashJump(window.location.hash);
  };

  var _replace = history.replaceState;
  history.replaceState = function() {
    _replace.apply(this, arguments);
    if (window.location.hash) scheduleHashJump(window.location.hash);
  };

  window.addEventListener('hashchange', function() { scheduleHashJump(window.location.hash); });
  window.addEventListener('popstate', function() { scheduleHashJump(window.location.hash); });
  window.addEventListener('load', function() {
    if (window.location.hash) scheduleHashJump(window.location.hash);
  });
})();
` }} />
      </head>
      <body>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
