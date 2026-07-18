'use client';

import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { siteConfig } from '@/config/site';
import ArrowFieldParallax from '@/components/arrow-field-parallax';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isHome = !isAdmin && pathname === '/';
  const homeFieldRef = useRef<HTMLElement>(null);

  return (
    <>
      {!isAdmin && <Header />}
      <main ref={isHome ? homeFieldRef : undefined} className={isHome ? 'home-field' : undefined}>
        {isHome && <ArrowFieldParallax fieldRef={homeFieldRef} />}
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <div className="mobile-call-bar">
          <a href="https://wa.me/447342620366" className="flex items-center justify-between gap-4 px-6 py-4" target="_blank" rel="noopener noreferrer">
            <span className="flex-1">
              <span className="block text-sm font-bold tracking-wide">Contact on Whatsapp</span>
              <span className="block text-xs mt-0.5 uppercase tracking-[0.16em] font-bold" style={{ color: '#8FEA64' }}>
                {siteConfig.contact.phone}
              </span>
            </span>
            <span className="text-2xl leading-none" style={{ color: '#8FEA64' }} aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </>
  );
}
