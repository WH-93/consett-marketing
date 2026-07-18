// ── Site Configuration ──
// Active brand tokens for this clone. Tailwind reads these values at build time.

export const siteConfig = {
  name: 'Consett Marketing',
  legalName: 'Consett Marketing',
  tagline: 'Solutions before services.',
  domain: 'consettmarketing.co.uk',
  url: 'https://consettmarketing.co.uk',

  colors: {
    navy: '#001326',
    navy800: '#10233A',
    navy700: '#1D3450',
    gold: '#FF4B00',
    gold500: '#E64300',
    gold600: '#C53800',
    teal: '#4CB020',
    teal500: '#40981B',
    lightGrey: '#E6E8EB',
    warmWhite: '#F6F8F1',
  },

  fonts: {
    heading: 'Sora, system-ui, -apple-system, sans-serif',
    body: 'Inter, system-ui, -apple-system, sans-serif',
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap',
    googlePreconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
  },

  logo: {
    full: '/logos/consett-marketing-logo.png',
    white: '/logos/consett-marketing-logo-white.png',
    compact: '/logos/consett-icon-green.png',
    alt: 'Consett Marketing',
    heights: { full: 52, white: 44, compact: 52 } as Record<string, number>,
  },

  contact: {
    email: 'hello@consettmarketing.co.uk',
    phone: '07342 620366',
    phoneCompact: '07342620366',
    location: 'Consett, County Durham',
  },

  company: {
    number: '',
    address: 'Consett, County Durham, United Kingdom',
  },

  founder: {
    name: 'Warren & Laura',
    title: 'Founders',
  },

  nav: [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
  ],

  footer: {
    quickLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/#contact' },
    ],
  },

  seo: {
    template: '%s | Consett Marketing',
    defaultTitle: 'Consett Marketing | Marketing for Local Businesses',
    defaultDescription:
      'Web design, SEO and brand strategy for local businesses. Solutions before services. Based in Consett, serving the North East.',
  },

  schema: {
    logo: 'https://consettmarketing.co.uk/logos/consett-marketing-logo.png',
    image: 'https://consettmarketing.co.uk/reference/brand-board-final-reference.png',
    foundingDate: '2026-01-01',
    services: [
      {
        name: 'Web Design & Development',
        description:
          'Clean, fast websites that work on every device and turn visitors into customers.',
      },
      {
        name: 'Search Engine Optimisation',
        description:
          'Local and national SEO that gets your business found by the people searching for it.',
      },
      {
        name: 'Brand Strategy & Identity',
        description:
          'Brand identity, messaging and positioning that sets you apart from competitors.',
      },
    ],
  },

  admin: {
    loginLabel: 'Consett Marketing - Admin',
  },
} as const;
