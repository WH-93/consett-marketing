'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BcLogo } from '@/components/bc-logo';
import { siteConfig } from '@/config/site';

const navItems = siteConfig.nav;

// next.config's trailingSlash:true means usePathname() returns e.g. "/about/"
// once on that route, while nav hrefs are defined without the trailing slash —
// normalize both sides before comparing so the active state actually matches.
function normalizePath(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, '') : path;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const normalizedPathname = normalizePath(pathname);

  const handleNav = (href: string, event?: { preventDefault: () => void }) => {
    if (href.startsWith('/#') && normalizedPathname === '/') {
      event?.preventDefault();
      setOpen(false);
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    setOpen(false);
    if (!event) router.push(href);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="site-header">
        <div className="container-page flex items-center justify-between h-[4.25rem] sm:h-[4.75rem]">
          <Link href="/" className="flex items-center shrink-0" aria-label={`${siteConfig.name} home`}>
            <BcLogo variant="full" height={40} className="w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map(item => {
              const active = normalizedPathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-link ${active ? 'nav-link-active' : ''}`.trim()}
                >
                  {item.label}
                </Link>
              );
            })}
            <a href="/#contact" className="btn-gold !py-3 !px-6" onClick={(e) => handleNav('/#contact', e)}>
              Contact
            </a>
          </nav>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 text-navy"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className={`block w-7 h-0.5 bg-current transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-7 h-0.5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-7 h-0.5 bg-current transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-4" style={{ background: 'var(--paper)' }}>
            {navItems.map(item => {
              const active = normalizedPathname === item.href;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className={`mobile-nav-link ${active ? 'mobile-nav-link-active' : ''}`}
                >
                  {item.label}
                </button>
              );
            })}
            <button onClick={() => handleNav('/#contact')} className="mobile-nav-link">
              Contact
            </button>
            <div className="px-5 pt-4">
              <a href={`tel:${siteConfig.contact.phoneCompact}`} className="btn-gold w-full">
                Call {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        )}
      </header>

      {open && (
        <div
          className="lg:hidden fixed inset-0 top-[68px] bg-navy/40 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
