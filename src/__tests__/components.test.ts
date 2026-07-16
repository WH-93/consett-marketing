// Component tests for extracted components
// Run: npx tsx --test src/__tests__/components.test.ts
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig } from '../config/site';

describe('HomeHero', () => {
  it('renders hero headline for the active Consett Marketing profile', async () => {
    const { HomeHero } = await import('../components/home-hero');
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { createElement } = await import('react');

    const html = renderToStaticMarkup(createElement(HomeHero));
    assert.ok(html.includes('Let’s get'), 'should contain main headline');
    assert.ok(html.includes('your brand'), 'should contain brand headline words');
    assert.ok(html.includes('growing'), 'should contain final headline phrase');
  });

  it('renders hero CTAs', async () => {
    const { HomeHero } = await import('../components/home-hero');
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { createElement } = await import('react');

    const html = renderToStaticMarkup(createElement(HomeHero));
    assert.ok(html.includes('Start a project'), 'should have start project CTA');
    assert.ok(html.includes('See the work'), 'should have work CTA');
  });

  it('renders hero image', async () => {
    const { HomeHero } = await import('../components/home-hero');
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { createElement } = await import('react');

    const html = renderToStaticMarkup(createElement(HomeHero));
    assert.ok(html.includes('c-arrow-logo'), 'should include the C arrow logo');
  });
});

describe('ContactCard', () => {
  it('renders email contact', async () => {
    const { ContactCard } = await import('../components/contact-card');
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { createElement } = await import('react');

    const contacts = [
      { icon: 'mail' as const, label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
      { icon: 'phone' as const, label: 'Phone', value: siteConfig.contact.phoneCompact, href: `tel:${siteConfig.contact.phoneCompact}` },
      { icon: 'location' as const, label: 'Location', value: siteConfig.contact.location, href: null },
    ];

    const html = renderToStaticMarkup(createElement(ContactCard, { contacts }));
    assert.ok(html.includes(siteConfig.contact.email), 'should render email');
  });

  it('renders phone contact', async () => {
    const { ContactCard } = await import('../components/contact-card');
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { createElement } = await import('react');

    const contacts = [
      { icon: 'phone' as const, label: 'Phone', value: siteConfig.contact.phoneCompact, href: `tel:${siteConfig.contact.phoneCompact}` },
    ];

    const html = renderToStaticMarkup(createElement(ContactCard, { contacts }));
    assert.ok(html.includes(siteConfig.contact.phoneCompact), 'should render phone');
  });
});
