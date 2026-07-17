'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { siteConfig } from '@/config/site';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <main className={!isAdmin && pathname === '/' ? 'home-field' : undefined}>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <div className="mobile-call-bar">
          <a href="/#contact" className="flex items-center justify-between gap-4 px-6 py-4">
            <span className="flex-1">
              <span className="block text-sm font-bold tracking-wide">Call us</span>
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
