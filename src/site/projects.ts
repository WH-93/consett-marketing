export type ProjectMediaSlot = {
  id: string;
  label: string;
  /** Solid fill while real assets are pending. */
  color: string;
  /** Optional second color for a soft gradient. */
  colorEnd?: string;
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
      'A County Durham tree surgeon with the craft,',
      'but not the brand to match it.',
    ],
    tag: 'Brand · Web · Local SEO',
    services: ['Brand identity', 'Website design', 'Local SEO', 'Messaging'],
    sector: 'Trade services',
    location: 'County Durham',
    year: '2025',
    liveUrl: 'https://rosswebstertreeservices.co.uk',
    liveLabel: 'Visit live site',
    cardColor: '#1F3D2B',
    image: '/reference/ross-webster-case-study.png',
    hero: {
      id: 'rw-hero',
      label: 'RW · Hero image',
      color: '#1A3324',
      colorEnd: '#0B1610',
      aspect: 'hero',
    },
    media: [
      {
        id: 'rw-brand',
        label: 'RW · Brand / mark lockup',
        color: '#243D2C',
        colorEnd: '#15241A',
        aspect: 'wide',
      },
      {
        id: 'rw-site-desktop',
        label: 'RW · Website desktop',
        color: '#2C4A35',
        colorEnd: '#1A2E21',
        aspect: 'wide',
      },
      {
        id: 'rw-site-mobile',
        label: 'RW · Website mobile',
        color: '#33553D',
        colorEnd: '#1E3326',
        aspect: 'portrait',
      },
      {
        id: 'rw-detail',
        label: 'RW · Detail / texture',
        color: '#3A5C44',
        colorEnd: '#243D2C',
        aspect: 'square',
      },
    ],
    sections: [
      {
        eyebrow: 'The brief',
        title: 'Look as sharp as the work.',
        body: [
          'Ross was winning jobs on reputation and referrals, but the online presence did not match the standard of the work. No clear brand. No site that converted. Almost no local search footprint.',
          'The job was simple: give a serious trades business a serious brand and a website that turns local searches into booked work.',
        ],
      },
      {
        eyebrow: 'What we built',
        title: 'Identity, site and search — as one system.',
        body: [
          'We built a full brand from the ground up: mark, colour, type and a tone of voice that feels practical, local and trustworthy.',
          'Then a clean, mobile-first website with clear service pages, strong calls to action and the local SEO foundations so nearby customers can actually find him.',
        ],
      },
      {
        eyebrow: 'The outcome',
        title: 'A brand that works as hard as he does.',
        body: [
          'Ross now has a clear identity, a site that explains the offer without fluff, and a path for local search to bring enquiries in — not just referrals.',
        ],
      },
    ],
    results: [
      { label: 'Scope', value: 'Brand · Web · SEO' },
      { label: 'Focus', value: 'Local enquiries' },
      { label: 'Market', value: 'County Durham' },
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
      'A founder-led search firm that needed',
      'to look as specialist as it is.',
    ],
    tag: 'Positioning · Web · Content',
    services: ['Positioning', 'Website design', 'Content', 'Brand system'],
    sector: 'Financial recruitment',
    location: 'UK',
    year: '2025',
    liveUrl: 'https://bcfinancialsearch.co.uk',
    liveLabel: 'Visit live site',
    cardColor: '#0F2438',
    image: '/reference/bc-financial-case-study.webp',
    hero: {
      id: 'bc-hero',
      label: 'BC · Hero image',
      color: '#0B1C2E',
      colorEnd: '#050B12',
      aspect: 'hero',
    },
    media: [
      {
        id: 'bc-positioning',
        label: 'BC · Positioning / brand board',
        color: '#13283D',
        colorEnd: '#0A1826',
        aspect: 'wide',
      },
      {
        id: 'bc-site-desktop',
        label: 'BC · Website desktop',
        color: '#17324A',
        colorEnd: '#0D1F30',
        aspect: 'wide',
      },
      {
        id: 'bc-site-mobile',
        label: 'BC · Website mobile',
        color: '#1C3A55',
        colorEnd: '#102536',
        aspect: 'portrait',
      },
      {
        id: 'bc-content',
        label: 'BC · Content / messaging',
        color: '#214260',
        colorEnd: '#142C42',
        aspect: 'square',
      },
    ],
    sections: [
      {
        eyebrow: 'The brief',
        title: 'Sound specialist. Look it too.',
        body: [
          'BC Financial Search operates in a crowded recruitment market. The founder had the expertise and network — but the brand and website did not signal the level of specialism candidates and clients expect.',
          'We needed positioning that cut through generic "recruitment agency" noise, and a digital presence that felt sharp, senior and deliberate.',
        ],
      },
      {
        eyebrow: 'What we built',
        title: 'Positioning first. Site and content second.',
        body: [
          'We started with the story: who BC is for, what makes the search different, and how that should sound on every page.',
          'From there, a focused website and content system — clean layout, confident copy, and a brand frame that feels closer to a boutique advisory firm than a volume recruiter.',
        ],
      },
      {
        eyebrow: 'The outcome',
        title: 'A brand that earns the conversation.',
        body: [
          'BC now presents as a specialist search partner online — clearer offer, stronger first impression, and content that supports both client and candidate conversations.',
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
