export type ProjectMediaSlot = {
  id: string;
  label: string;
  /** Solid fill while real assets are pending. */
  color: string;
  /** Optional second color for a soft gradient. */
  colorEnd?: string;
  /** Optional image URL — takes precedence over color. */
  image?: string;
  aspect: 'hero' | 'wide' | 'square' | 'portrait' | 'pair';
};

export type ProjectSection = {
  eyebrow: string;
  title: string;
  body: string[];
};

export type Project = {
  slug: string;
  client: string;
  title: string;
  /** Short card blurb (home + clients). */
  summary: string;
  /** Full hero statement. */
  statement: string[];
  tag: string;
  services: string[];
  sector: string;
  location: string;
  year: string;
  liveUrl?: string;
  liveLabel?: string;
  /** Card thumbnail color on the work grid when no image. */
  cardColor: string;
  /** Optional thumbnail image for the home work cards. */
  image?: string;
  hero: ProjectMediaSlot;
  media: ProjectMediaSlot[];
  sections: ProjectSection[];
  results: { label: string; value: string }[];
  nextSlug: string;
};

export const projects: Project[] = [
  {
    slug: 'ross-webster-tree-services',
    client: 'Ross Webster Tree Services',
    title: 'Ross Webster Tree Services',
    summary:
      'Brand, website and local SEO for a County Durham tree surgeon. Full identity from mark to messaging.',
    statement: [
      'A new brand, website & digital presence.',
    ],
    tag: 'Brand · Web · Local SEO',
    services: ['Branding & identity', 'Website', 'SEO', 'Digital Presence'],
    sector: 'Trade services',
    location: 'County Durham',
    year: '',
    liveUrl: 'https://rosswebstertreeservices.co.uk',
    liveLabel: 'Visit live site',
    cardColor: '#1F3D2B',
    image: '/reference/ross-webster-case-study.png',
    hero: {
      id: 'rw-brand',
      label: 'Ross Webster Tree Services website on desktop and mobile, responsive design',
      image: '/work/ross-webster/02-website-mockup.png',
      color: '#1A3324',
      colorEnd: '#0B1610',
      aspect: 'hero',
    },
    media: [
      {
        id: 'rw-website',
        label: 'Ross Webster Tree Services brand identity, logo, colour palette, services, van and cap',
        image: '/work/ross-webster/01-brand-identity.png',
        color: '#243D2C',
        colorEnd: '#15241A',
        aspect: 'wide',
      },
    ],
    sections: [
      {
        eyebrow: 'The brief',
        title: 'A strong business with no digital presence.',
        body: [
          'Ross had built a solid reputation through word of mouth, but had no defined brand, website, or consistent online presence.',
          'The brief was to build a stronger and differentiated brand that would help him attract more commercial work, without moving away from the work he is known for.',
        ],
      },
      {
        eyebrow: 'What we built',
        title: 'One brand across web, search & social.',
        body: [
          'We built the brand from scratch, including a new logo, colour palette, and tone of voice. Brand guidelines were made as part of the work.',
          'We coded Ross an entirely bespoke website. This gives us total control over its features and enables rapid deployment of changes. Effective SEO is at the heart of the website. Our in-house custom built software tools provide us with rich data insights which are translated into the structure, copy, service pages and positioning from the start.',
          'Our ongoing data analysis comes to life through our pipeline of content which benefits the reader and target market by adding real value to the information provided. Tree maintenance involves many technical, legal and commercial nuances.',
          'We then rolled the new brand out across LinkedIn and Facebook company pages. We will continue to manage the content, grow the pages and help build his professional network and brand image.',
        ],
      },
      {
        eyebrow: 'The outcome',
        title: 'A brand with healthy roots, guided by data.',
        body: [
          '- A brand that works for both domestic and commercial audiences',
          '- External industry websites linking to the new website',
          '- Domain authority surpassing 95% of similar sites',
          '- Visibility in local search and branded search',
          '- 400% increase in social traffic from multiple sources',
          '- 5x increase in brand site impressions in a four week period',
        ],
      },
    ],
    results: [
      { label: 'Scope', value: 'Brand · Web · SEO' },
      { label: 'Focus', value: 'SEO, branding, website development' },
      { label: 'Market', value: 'North Yorkshire & County Durham' },
    ],
    nextSlug: 'bc-financial-search',
  },
  {
    slug: 'bc-financial-search',
    client: 'BC Financial Search',
    title: 'BC Financial Search',
    summary:
      'Specialist recruitment brand. Positioning, website and content for a founder-led search firm.',
    statement: [
      'Brand, website &',
      'cloud hosted database.',
    ],
    tag: 'Brand, website and cloud hosted database',
    services: ['Website design', 'Brand', 'Recruitment website'],
    sector: 'Financial recruitment',
    location: 'Manchester',
    year: '',
    liveUrl: 'https://bcfinancialsearch.co.uk',
    liveLabel: 'Visit live site',
    cardColor: '#0F2438',
    image: '/reference/bc-financial-case-study.webp',
    hero: {
      id: 'bc-hero',
      label: 'BC Financial Search website on desktop and mobile, responsive specialist recruitment design',
      image: '/work/bc-financial-search/01-website-responsive.png',
      color: '#0B1C2E',
      colorEnd: '#050B12',
      aspect: 'hero',
    },
    media: [
      {
        id: 'bc-lifestyle',
        label: 'BC Financial Search brand in context, laptop with website, notebook and coffee on desk',
        image: '/work/bc-financial-search/02-brand-lifestyle.png',
        color: '#13283D',
        colorEnd: '#0A1826',
        aspect: 'wide',
      },
    ],
    sections: [
      {
        eyebrow: 'The brief',
        title: 'A specialist website with functionality.',
        body: [
          'BC Financial Search is a financial recruitment company, led by a highly experienced and trusted partner on both sides of the interview table.',
          'We needed positioning that cut through generic "recruitment agency" noise, and a digital presence that felt sharp, senior and deliberate.',
        ],
      },
      {
        eyebrow: 'What we built',
        title: 'A distinct brand, a secure website.',
        body: [
          'From the brand colour palette to fonts and professional photography, the style of the website cuts through as personal but competent.',
          'Behind the scenes, industry standard technical architecture and processes support the job listings.',
          'The website runs as a containerised application in the cloud, with network configuration in place to make sure the site is always online, can be updated seamlessly and its data is always secure.',
          'A fully functional admin section of the website gives the business control over what is being listed, and insights on what is being received by candidates.',
          'Market analysis using our custom in house software tools revealed SEO insights which have ensured a confident launch of the site climbing up in Google rankings.',
        ],
      },
      {
        eyebrow: 'The outcome',
        title: 'A brand that invites professional growth.',
        body: [
          '- Sustained high branded search increases following website launch',
          '- 100% AI agentic browser score and SEO optimisation site score',
          '- 500% Google clicks increase over a 5 week period',
          '- Mobile and desktop optimised site',
        ],
      },
    ],
    results: [
      { label: 'Scope', value: 'Positioning · Web · Content' },
      { label: 'Focus', value: 'Founder brand' },
      { label: 'Market', value: 'Financial services' },
    ],
    nextSlug: 'ross-webster-tree-services',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/** Home / clients work cards — internal project routes only. */
export const workExamples = projects.map((project) => ({
  title: project.title,
  desc: project.summary,
  href: `/work/${project.slug}`,
  image: project.image,
  tag: project.tag,
  cardColor: project.cardColor,
}));
