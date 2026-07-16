import { siteConfig } from '@/config/site';
import type { SiteProfile } from '@/site/types';

const contacts = [
  { icon: 'mail' as const, label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: 'phone' as const, label: 'Phone', value: siteConfig.contact.phoneCompact, href: `tel:${siteConfig.contact.phoneCompact}` },
  { icon: 'location' as const, label: 'Location', value: siteConfig.contact.location, href: null },
];

const credentials = [
  { icon: 'search' as const, value: 'LOCAL INSIGHT', label: 'Based in Consett. We know the market.' },
  { icon: 'target' as const, value: 'CLEAR STRATEGY', label: 'Every recommendation tied to a business goal.' },
  { icon: 'star' as const, value: 'NO RETAINERS', label: 'Fixed scope. Fixed price. No surprises.' },
  { icon: 'shield' as const, value: 'MEASURED WORK', label: 'Web, SEO and brand work that moves numbers.' },
];

const serviceCards = [
  { icon: 'globe' as const, title: 'Web Design & Development', desc: 'Clean, fast websites built to convert. Mobile-first, SEO-ready, easy to manage.', roles: ['Business sites', 'Landing pages', 'E-commerce', 'Rebuilds & refreshes'], roleLabel: 'Includes' },
  { icon: 'search' as const, title: 'Search Engine Optimisation', desc: 'Get found by the people searching for what you do. Local SEO, national SEO, technical audits.', roles: ['Keyword strategy', 'Technical SEO', 'Local search', 'Content planning'], roleLabel: 'Includes' },
  { icon: 'star' as const, title: 'Brand Strategy & Identity', desc: 'Name, message, look and feel — a brand that means something to the people you want to reach.', roles: ['Positioning', 'Visual identity', 'Messaging', 'Brand guidelines'], roleLabel: 'Includes' },
  { icon: 'pen' as const, title: 'Content & Copywriting', desc: 'Words that work. Website copy, blog posts, case studies — written for humans and search engines.', roles: ['Website copy', 'Blog writing', 'Case studies', 'Email sequences'], roleLabel: 'Includes' },
];

const process = [
  { icon: 'person' as const, title: '1. Listen', desc: 'Your business. Where you are. Where you want to be.' },
  { icon: 'target' as const, title: '2. Plan', desc: 'A proposal with scope, timeline and price. No surprises.' },
  { icon: 'star' as const, title: '3. Build', desc: 'Design, build, write. You see progress. You give feedback.' },
  { icon: 'shield' as const, title: '4. Deliver', desc: 'Live, tested, working. Then we show you how to measure it.' },
];

const workExamples = [
  {
    title: 'Ross Webster Tree Services',
    desc: 'Brand, website and local SEO for a County Durham tree surgeon. Full identity from mark to messaging.',
    href: 'https://rosswebstertreeservices.co.uk',
    image: '/reference/greyscale-county-durham-trades.png',
    tag: 'Brand · Web · Local SEO',
  },
  {
    title: 'BC Financial Search',
    desc: 'Specialist recruitment brand. Positioning, website and content for a founder-led search firm.',
    href: 'https://bcfinancialsearch.co.uk',
    image: '/reference/greyscale-strategy-meeting.png',
    tag: 'Positioning · Web · Content',
  },
];

export const consettMarketingProfile = {
  config: siteConfig,
  contacts,
  pages: {
    home: {
      hero: {
        headline: [[{ text: 'Let’s get' }], [{ text: 'your brand' }], [{ text: 'growing.', accent: true }]],
        subhead: 'Strategy, websites, SEO and brand systems for ambitious North East businesses.',
        actions: [{ href: '/#contact', label: 'Start a project', style: 'primary' as const }, { href: '/clients', label: 'See the work', style: 'outline' as const }],
        image: { src: '/logos/c-arrow-logo.png', alt: 'Consett Marketing C arrow logo' },
      },
      stats: { items: credentials, gridClass: 'grid grid-cols-2 sm:grid-cols-4' },
      audiences: {
        columns: [
          { icon: 'building' as const, eyebrow: 'The Problem', title: 'Most marketing starts with a package.', body: ['A website. A logo. Some SEO. A few posts. Sold before anyone has understood what is stopping the right enquiries.', 'That is how businesses end up with busy activity and no commercial clarity.'], emphasis: 'More output is not better marketing.', cta: { href: '/services', label: 'See the work', style: 'outline' as const } },
          { icon: 'target' as const, eyebrow: 'The Way We Work', title: 'Start with the outcome. Build only what moves it.', body: ['We work backwards from the result you want: more enquiries, stronger positioning, better search visibility or a site that converts.', 'Then we build the smallest, clearest project that gets you there.'], cta: { href: '/#contact', label: 'Tell us the outcome', style: 'primary' as const } },
        ],
      },
      about: {
        eyebrow: 'About Consett Marketing',
        titleLines: ['Built in Consett.', 'Working across the North East.'],
        body: ['Consett businesses deserve marketing as good as any agency in London. At local prices.', 'I started Consett Marketing to give local businesses the kind of marketing that works: positioning that makes sense, websites that bring customers, search visibility that gets you found.'],
        signature: siteConfig.founder.name,
        role: siteConfig.founder.title,
        cta: { href: '/about', label: 'More About Us', style: 'primary' as const },
        image: { src: '/reference/greyscale-strategy-meeting.png', alt: 'Greyscale strategy meeting with business charts' },
        quote: { eyebrow: 'Solutions before services.', text: 'Most agencies sell you a package before they understand the problem.', body: 'We start with the outcome you want and work backwards. If you do not need a new website, we will tell you. If SEO is the wrong lever, we will say so.' },
      },
      work: { eyebrow: 'Recent Work', title: 'Proof, not promises.', groups: workExamples, cta: { href: '/clients', label: 'See the work', style: 'primary' as const } },
      contact: { theme: 'home' as const, eyebrow: 'Start a Conversation', title: 'Tell us what you want to improve.', body: ['Every project starts with a conversation about your business, your goals and what is standing in the way.', 'No pitch. No pressure. Just straight answers about what would move the needle.'] },
    },
    about: {
      hero: { headline: [[{ text: 'Built in Consett.' }], [{ text: 'Designed for ' }, { text: 'growth.', accent: true }]], body: [`${siteConfig.name} gives local businesses access to proper strategy, modern design and practical marketing support. No agency theatre.`, 'Based in Consett, County Durham. Working with tradespeople, professional services, shops, manufacturers and growing brands across the North East.', 'Every project starts with the outcome you want. Then we build the shortest, clearest route from here to there.'], image: { src: '/reference/greyscale-local-web-growth.png', alt: 'Greyscale Consett business website and steelworks silhouette' } },
      founder: { image: { src: '/reference/greyscale-strategy-meeting.png', alt: `${siteConfig.founder.name} — strategy meeting with a local business` }, eyebrow: 'Who you will deal with', title: 'One point of contact. Clear answers.', body: ['I have spent years building brands, websites and search strategies for businesses across the UK.', 'I started Consett Marketing because local businesses needed sharp marketing without paying agency retainers or settling for templated work.', 'Every project is led by me. You get one contact, one clear plan and one person accountable for the result.'], signature: siteConfig.founder.name, role: siteConfig.founder.title, quote: { eyebrow: 'Solutions before services.', text: 'If you do not need a website, I will tell you.', body: 'Straight advice is more valuable than a quick sale. The right solution might be simpler than you think.' } },
      values: { theme: 'light' as const, title: 'What You Can Expect', items: [
        { title: 'Clear Pricing', desc: 'Fixed scope. Fixed price. No surprises.' },
        { title: 'Fast Delivery', desc: 'First concepts in days, not weeks.' },
        { title: 'One Contact', desc: 'You deal directly with Ben throughout.' },
        { title: 'Measured Results', desc: 'Every project has a success metric.' },
        { title: 'No Jargon', desc: 'Plain English. Straight answers.' },
      ] },
    },
    services: {
      hero: { eyebrow: 'Services', headline: [[{ text: 'Insight.' }], [{ text: 'Strategy. ' }, { text: 'Growth.', accent: true }]], body: ['Web design, SEO, brand strategy and content — delivered as fixed-scope projects with clear timelines and clear pricing.', 'No retainers. No hidden costs. Just the work you need, done properly.'], actions: [{ href: '/#contact', label: 'Book a free strategy call', style: 'primary' as const }], image: { src: '/reference/greyscale-local-web-growth.png', alt: 'Greyscale website and growth plan for a Consett business' } },
      services: { eyebrow: 'What We Do', title: 'The right work for where you are now.', items: serviceCards },
      method: { eyebrow: 'How We Work', title: 'Listen. Plan. Build. Deliver.', steps: process, border: false },
      cta: { eyebrow: 'Not sure what you need?', title: 'That is where we start.', body: ['Tell us about your business and where you want to be. We will tell you what would make the biggest difference — even if it is not something we sell.'], actions: [{ href: '/#contact', label: 'Start the Conversation', style: 'primary' as const }] },
    },
    candidates: {
      hero: { eyebrow: 'For Trades & Local Services', headline: [[{ text: 'You know your trade.' }], [{ text: 'We get you ' }, { text: 'found.', accent: true }]], body: ['If your phone is not ringing and your inbox is quiet, the problem is not your work. It is your visibility.', 'We help tradespeople, local services and independent businesses get found by the people searching for them right now.'], actions: [{ href: '/#contact', label: 'Get a free assessment', style: 'primary' as const }], image: { src: '/reference/greyscale-county-durham-trades.png', alt: 'Greyscale local trades van outside County Durham homes' } },
      steps: { eyebrow: 'How We Help', title: 'From invisible to the top of the list.', steps: [
        { icon: 'search' as const, title: '1. Audit', desc: 'We check where you appear now and what your competitors are doing.' },
        { icon: 'target' as const, title: '2. Build', desc: 'Website, Google profile, local listings — everything working together.' },
        { icon: 'star' as const, title: '3. Optimise', desc: 'Keywords, content and technical fixes that push you up the rankings.' },
        { icon: 'shield' as const, title: '4. Measure', desc: 'Calls, enquiries, bookings — we track what matters to your business.' },
      ], cta: { href: '/#contact', label: 'Start with a free assessment', style: 'primary' as const }, image: { src: '/reference/greyscale-county-durham-trades.png', alt: 'Greyscale County Durham trades and local search process' } },
      testimonials: { title: 'What local businesses say', subtitle: 'Straight-talking marketing that delivers.', items: [
        { quote: 'Ben built us a site that brings in work. No fluff, just results.', role: 'Tree Surgeon', label: 'County Durham' },
        { quote: 'Finally, someone who explains marketing in plain English and does what they say.', role: 'Recruitment Director', label: 'Manchester' },
        { quote: 'Fast, clear and exactly what we needed. The site was live in under two weeks.', role: 'Shop Owner', label: 'Consett' },
      ] },
      areas: { eyebrow: 'Who We Work With', title: 'Marketing that fits your business.', groups: [
        { title: 'Trades & Services', desc: 'Tree surgeons, builders, electricians, plumbers, landscapers — if you turn up and do the work, we make sure people can find you.' },
        { title: 'Professional Services', desc: 'Accountants, solicitors, recruiters, consultants — marketing that reflects your expertise and brings the right enquiries.' },
      ], cta: { href: '/#contact', label: 'Get a Free Assessment', style: 'primary' as const } },
    },
    clients: {
      hero: { eyebrow: 'Our Work', headline: [[{ text: 'Projects with' }], [{ text: 'practical ' }, { text: 'growth.', accent: true }]], body: ['A selection of recent work for local businesses. Brand identity, website design, SEO and content — built to work, not just to look good.'], image: { src: '/reference/greyscale-consett-high-street.png', alt: 'Greyscale Consett high street businesses' } },
      areas: { eyebrow: 'Recent Projects', title: 'Local businesses we have worked with.', groups: workExamples },
      testimonial: { eyebrow: 'What Clients Value', subtitle: 'Straight answers. Clear pricing. Work that delivers.', quote: 'Ben took the time to understand our business before suggesting anything. The result was exactly what we needed.', role: 'Business Owner', meta: 'County Durham', label: 'Recent client', image: { src: '/reference/greyscale-strategy-meeting.png', alt: 'Greyscale client strategy meeting' } },
    },
    contact: {
      hero: { eyebrow: 'Contact', headline: [[{ text: 'Start the ' }, { text: 'conversation.', accent: true }]], body: ['Tell us about your business and where you want to be. No pitch. No pressure. Just straight answers about what would make the biggest difference.', 'Based in Consett. Working across the North East. Available by phone, email or the form below.'], image: { src: '/reference/greyscale-consett-high-street.png', alt: 'Greyscale Consett business street' }, plainHeroTitle: true },
      contact: { theme: 'warm' as const, eyebrow: 'Get In Touch', title: 'Every project starts with a conversation.', body: ['Call, email or fill in the form. Tell us about your business and what you want to achieve. We will come back with clear next steps.'] },
    },
  },
} satisfies SiteProfile;
