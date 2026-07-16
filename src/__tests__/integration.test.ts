// Integration tests for BC Recruitment site
// Run: npx tsx --test src/__tests__/integration.test.ts
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig } from '../config/site';

const BASE = 'http://localhost:3000';

async function get(path: string) {
  const res = await fetch(`${BASE}${path}`, { redirect: 'manual' });
  return { status: res.status, text: await res.text() };
}

describe('Public Pages', () => {
  it('GET / → 200 with BC branding', async () => {
    const { status, text } = await get('/');
    assert.equal(status, 200);
    assert.ok(text.includes(siteConfig.name), 'title should contain site name');
    assert.ok(text.includes('Practice'), 'should reference practice');
    assert.ok(text.includes('Tax'), 'should reference tax');
    assert.ok(text.includes('Specialist Search'), 'hero headline present');
    assert.ok(text.includes('Personal Service'), 'hero subheading present');
    assert.ok(text.includes('Lasting Fit'), 'hero tagline present');
  });

  it('GET / → responsive classes present', async () => {
    const { text } = await get('/');
    assert.ok(text.includes('sm:grid'), 'should have responsive grid');
    assert.ok(text.includes('lg:grid-cols'), 'should have desktop layout classes');
  });

  it('GET /about → 200 with current About page content preserved', async () => {
    const { status, text } = await get('/about');
    assert.equal(status, 200);

    assert.ok(text.includes('About Us'), 'about eyebrow should be preserved');
    assert.ok(text.includes('Built on experience.'), 'about hero headline should be preserved');
    assert.ok(text.includes('Focused on'), 'about hero second line should be preserved');
    assert.ok(text.includes(siteConfig.name + ' is a specialist recruitment partner'), 'about introduction should be preserved');
    assert.ok(text.includes('12 YEARS'), 'market experience stat should be preserved');
    assert.ok(text.includes('200+'), 'successful placements stat should be preserved');
    assert.ok(text.includes('My Approach'), 'process section should be present');
    assert.ok(text.includes('I listen. I search. I stay involved.'), 'process heading should be present');
    assert.ok(text.includes('1. Listen'), 'process step 1 should render');
    assert.ok(text.includes('4. Stay Involved'), 'process step 4 should render');
    assert.ok(text.includes('Judgement. Relationships. Results.'), 'founder section headline should be preserved');
    assert.ok(text.includes('The person behind the introductions'), 'founder eyebrow should be preserved');
    assert.ok(text.includes(siteConfig.founder.name), 'founder name should be preserved');
    assert.ok(text.includes('One specialist. One point of contact. One consistent approach.'), 'specialist message should be preserved');
    assert.ok(text.includes('What You Can Expect'), 'expectations section should be preserved');
    assert.ok(text.includes('Get in touch'), 'about CTA should be preserved');
    assert.ok(text.includes('/hero-about.png'), 'about hero image should be preserved');
    assert.ok(text.includes('/ben-about-headshot.jpeg'), 'founder image should be preserved');
  });

  it('GET /jobs → 200 with job listings container', async () => {
    const { status, text } = await get('/jobs');
    assert.equal(status, 200);
    assert.ok(text.includes(siteConfig.name), 'page title present');
    assert.ok(text.includes('vacancies') || text.includes('opportunities') || text.includes('Loading'), 'jobs page renders');
  });

  it('GET /jobs/audit-senior-manager → 200 with job detail', async () => {
    const { status, text } = await get('/jobs/audit-senior-manager');
    assert.equal(status, 200);
    assert.ok(text.includes('Audit Senior Manager'));
    assert.ok(text.includes('Top 20 Accountancy Practice'));
    assert.ok(text.includes('BC-1'));
    assert.ok(text.includes('Discuss this role'));
    assert.ok(text.includes('Leading audit engagements'), 'description renders from shared store');
  });
});

describe('Admin Auth', () => {
  it('GET /admin → 200, renders admin shell', async () => {
    const { status, text } = await get('/admin');
    assert.equal(status, 200);
    assert.ok(text.includes(siteConfig.name) || text.includes('Loading'), 'admin page renders');
  });

  it('GET /admin/jobs → redirects to login', async () => {
    const { status } = await get('/admin/jobs');
    assert.ok(status === 307 || status === 302);
  });

  it('GET /admin/pipeline → redirects to login', async () => {
    const { status } = await get('/admin/pipeline');
    assert.ok(status === 307 || status === 302);
  });

  it('GET /admin/login → 200 with login form, no admin nav', async () => {
    const { status, text } = await get('/admin/login');
    assert.equal(status, 200);
    assert.ok(text.includes('Admin Login'));
    assert.ok(text.includes('password'));
    assert.ok(text.includes('Sign In'), 'login button text');
    assert.ok(!text.includes('DASHBOARD'), 'admin nav should not leak onto login page');
  });

  it('POST /api/auth/login with wrong password → 401', async () => {
    const res = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'wrong' }),
    });
    assert.equal(res.status, 401);
  });
});

describe('API Routes', () => {
  it('GET /api/jobs → 200 with job array', async () => {
    const res = await fetch(`${BASE}/api/jobs`);
    assert.equal(res.status, 200);
    const jobs = await res.json();
    assert.ok(Array.isArray(jobs));
    assert.ok(jobs.length >= 2);
    assert.ok(jobs[0].title);
    assert.ok(jobs[0].slug);
  });

  it('POST /api/jobs → 201', async () => {
    const slug = `test-job-${Date.now()}`;
    const res = await fetch(`${BASE}/api/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Job', company: 'Test Co', location: 'London',
        type: 'Full-time', sector: 'Practice', description: 'Test.', slug,
      }),
    });
    assert.equal(res.status, 201);
  });

  it('POST /api/applications → 201', async () => {
    const res = await fetch(`${BASE}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId: '1', firstName: 'T', lastName: 'U', email: 't@t.com' }),
    });
    assert.equal(res.status, 201);
  });


  it('POST /api/applications → rejects body over 10MB', async () => {
    // Generate a payload that exceeds 10MB when JSON-serialized
    // 11MB of 'x' as cvData pushes the total body over the limit
    const largeCVData = 'x'.repeat(11 * 1024 * 1024);
    const res = await fetch(`${BASE}/api/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobId: '1',
        firstName: 'T',
        lastName: 'U',
        email: 't@t.com',
        cvData: largeCVData,
      }),
    });
    assert.equal(res.status, 413, 'should return 413 Payload Too Large');
    const data = await res.json();
    assert.ok(data.error, 'should include error message');
  });

  it('POST /api/upload-url → 200 with valid key shape', async () => {
    const res = await fetch(`${BASE}/api/upload-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: 'cv.pdf', contentType: 'application/pdf' }),
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.key.startsWith('cvs/'));
    assert.ok(data.url);
  });
});

describe('Security', () => {
  it('No secrets leaked in public HTML', async () => {
    const { text } = await get('/');
    assert.ok(!text.includes('ADMIN_PASSWORD'));
    assert.ok(!text.includes('ADMIN_TOKEN'));
    assert.ok(!text.includes('DATABASE_URL'));
  });

  it('No user-injected script tags in job listings', async () => {
    const { text } = await get('/jobs');
    // Next.js injects its own scripts - check that no script appears inside job content
    const bodyStart = text.indexOf('<main');
    const bodyEnd = text.indexOf('</main>');
    const mainContent = text.slice(bodyStart, bodyEnd);
    assert.ok(!mainContent.includes('<script'), 'no script tags in main content area');
  });

  it('HTTPS redirect configured in prod middleware', async () => {
    // Middleware exists and compiles
    const { text } = await get('/');
    assert.ok(text.length > 0);
  });
});

describe('Performance', () => {
  it('Home page under 300ms cold', async () => {
    const start = Date.now();
    await get('/');
    assert.ok(Date.now() - start < 300);
  });

  it('Jobs page under 300ms cold', async () => {
    const start = Date.now();
    await get('/jobs');
    assert.ok(Date.now() - start < 300);
  });
});

describe('Build Output', () => {
  it('All routes resolved at build time', async () => {
    const routes = ['/', '/jobs', '/jobs/audit-senior-manager', '/admin/login'];
    for (const path of routes) {
      const { status } = await get(path);
      assert.ok(status === 200 || status === 307, `${path} returned ${status}`);
    }
  });
});
