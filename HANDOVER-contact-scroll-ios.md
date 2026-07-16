# Handover: Ross Webster Static — Anchor Scroll Bug on iOS

## The Problem

On iPhone (iOS Safari), clicking any CTA button that links to `/#contact` does NOT scroll the contact section into view properly. The "HEDGE CARE" heading from the `home-services-showcase` section above remains partially visible. The user wants the contact section's "GET A FREE QUOTE" eyebrow to sit at the top of the viewport (below the sticky header).

This works correctly on desktop browsers. It fails on actual iPhone devices, including incognito mode.

## Site Architecture

- **Framework**: Next.js 14.2.35, static export (`next build` → `out/`)
- **Deployment**: S3 + CloudFront (`ross-webster-static-amble` bucket, distributions E3P76SVYZY2EG4 + EUVP52N2V68R3)
- **Styling**: Tailwind CSS 3.4
- **Profile**: `amble` AWS profile

### Key files:
- `/src/components/sections/marketing/core-sections.tsx` — `ContactSection` component (lines 60-77)
- `/src/app/layout.tsx` — root layout with inline JS hash handler
- `/src/app/globals.css` — `scroll-padding-top` on `html` element (line 8), responsive overrides (lines 212-222)
- `/src/site/profiles/tree-surgeon.ts` — profile data with CTA links pointing to `/#contact`

### Contact section markup:
```html
<section id="contact" class="bg-navy lg:bg-warm-white scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32 pt-4 pb-16 sm:pb-20 lg:pb-24">
```

### CTA links (all now point to `/#contact`):
- Home hero "GET A FREE QUOTE" button
- "For Homeowners" / "For Landowners & Businesses" CTAs
- Services page hero and bottom CTA
- Candidates page hero, steps, areas CTAs
- Clients page hero and approach CTAs
- Footer "Get a free quote" button
- Mobile sticky bottom bar "GET A FREE QUOTE"

All use Next.js `<Link href="/#contact">` components.

### Sticky header heights:
- Mobile (<640px): 96px (`h-24`)
- Tablet (640-1023px): 112px (`h-28`)
- Desktop (≥1024px): 128px (`h-32`)

### Mobile sticky bar:
- `fixed bottom-0 inset-x-0 z-50` — "GET A FREE QUOTE" bar with `Contact Ross now` text

## Approaches Tried (all deployed, all failed on iPhone)

### 1. `scroll-margin-top` on `#contact` element
- Added `scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32` to the contact section
- Works on desktop, not on iOS Safari via Next.js client-side nav
- Reason: Next.js `Link` component uses `scrollIntoView()` which doesn't reliably respect `scroll-margin` on iOS

### 2. `scroll-padding-top` on `<html>` element  
- Added `scroll-padding-top: 96px` (responsive: 112px sm, 128px lg) to `html` in `@layer base`
- Standard CSS approach for fixed headers with anchor scrolling
- Works for native browser fragment navigation, fails for Next.js client-side `pushState`
- Reason: Next.js client-side routing uses `history.pushState` + custom scroll logic, not native fragment navigation

### 3. `min-height` approach
- Added `min-h-[calc(100vh-6rem)]` to contact section on mobile
- Attempted to force the section to fill viewport so green section couldn't show
- Failed: the underlying scroll position issue wasn't addressed

### 4. JavaScript `hashchange` listener
- Inline `<script>` in `<head>` of `layout.tsx`
- Listens for `hashchange` event, calculates correct offset, calls `window.scrollTo()`
- Failed: Next.js `pushState` doesn't trigger `hashchange` event on iOS

### 5. JavaScript `pushState`/`replaceState` monkey-patch
- Monkey-patches `history.pushState` and `history.replaceState` to detect hash changes
- Calls `scrollToHash()` with `setTimeout(fn, 50)` after Next.js navigation
- Failed: Next.js scroll restoration overrides our scroll (timing issue)

### 6. JavaScript double rAF + 200ms timeout (CURRENT STATE)
- Latest approach in `/src/app/layout.tsx`:
```javascript
requestAnimationFrame(function() {
  requestAnimationFrame(function() {
    setTimeout(function() {
      var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'instant' });
    }, 200);
  });
});
```
- Double `requestAnimationFrame` waits for 2 paint frames, then 200ms delay
- Should fire well after Next.js completes scroll restoration
- **NOT YET CONFIRMED WORKING ON iPHONE** — awaiting user test

### Current CSS state:
- `scroll-padding-top: 96px` on `<html>` (for native nav)
- `scroll-mt-24` on `#contact` (for scrollIntoView)
- Both approaches coexist

## 2026-06-29 Resume Update

Confirmed locally at 390×844 that the JS click handler scrolled too far: the contact eyebrow was hidden under/above the sticky header and the viewport started at the headline. Root cause in the current code was the `#contact` anchor `<span>` sitting after the eyebrow inside `ContactSection`.

Fix applied in `src/components/sections/marketing/core-sections.tsx`: moved the hidden `#contact` anchor span before the eyebrow so the scheduled absolute scroll targets the top of the contact copy.

Verification:
- `npm test` passes.
- `npm run build` passes.
- Local static export screenshot: `review-screenshots/contact-scroll-after-anchor-fix.png` shows `START A CONVERSATION` visible directly below the sticky header after tapping the hero CTA.

Deployment:
- Synced `out/` to `s3://ross-webster-static-amble` with AWS profile `amble`.
- Created CloudFront invalidations:
  - `E3P76SVYZY2EG4`: `IBEGS7JQH7I8SZMA8TIPBLW770`
  - `EUVP52N2V68R3`: `IBEF3JLSJAZRN471EZW60COST4`

## 2026-07-01 Resume Update

After Mac restart, re-checked current source and found the hidden `#contact` anchor had drifted back below the eyebrow. Local 390×844 reproduction showed the viewport starting at the heading (`Tell us what you want to improve.`), hiding the `START A CONVERSATION` eyebrow.

Fix re-applied in `src/components/sections/marketing/core-sections.tsx`: hidden `#contact` anchor now sits before the eyebrow.

Verification:
- `npm test` passes.
- `npm run build` passes.
- Local mobile screenshot: `review-screenshots/resume-contact-click-mobile-after-anchor-before-eyebrow.png` shows `START A CONVERSATION` directly below the sticky header after tapping the hero CTA.

Deployment:
- Not deployed yet in this resume session.

## Possible Root Causes

1. **Next.js static export client-side navigation**: Next.js `<Link>` component on static export may handle hash links differently than a full Next.js server app. It might do a full page reload or use custom scroll logic that our JS can't intercept.

2. **iOS Safari `requestAnimationFrame` quirks**: iOS Safari may not fire rAF during scroll restoration, or may batch them differently.

3. **Mobile Safari viewport**: iOS Safari's collapsing address bar changes the viewport height. `window.innerWidth` used for offset calculation may be wrong during scroll restoration.

4. **React hydration timing**: On a static export, React hydrates the pre-rendered HTML. During hydration, the DOM may briefly be in an inconsistent state where `#contact` exists but layout hasn't settled.

5. **The mobile sticky bar**: The fixed bottom bar (`fixed bottom-0`) might interfere with scroll position calculations, especially `getBoundingClientRect()`.

## Alternative Approaches to Try

1. **Add `onClick` handler to CTA buttons directly** — bypass Next.js Link entirely, use `e.preventDefault() + window.scrollTo()` in a click handler on each button.

2. **Use Next.js `router.events`** — listen for `routeChangeComplete` and scroll after navigation finishes.

3. **Server-side approach**: Instead of `/#contact`, use a dedicated `/contact` route with the form at the top (no hero).

4. **CSS-only approach with `scroll-behavior` and `:target`**: Use `:target` pseudo-class with padding/margin tricks.

5. **Increase the JS timeout dramatically** — try 1000ms to rule out timing issues entirely.

6. **Debug on actual device**: Connect iPhone to Mac Safari Web Inspector to check:
   - Is the inline script actually executing?
   - What does `document.querySelector('#contact')` return?
   - What is `window.location.hash` after clicking a CTA?
   - Does `window.scrollTo()` actually move the page?

## Deploy Command

```bash
npm run deploy
# Runs: npm run build && aws s3 sync out s3://ross-webster-static-amble --profile amble --delete && aws cloudfront create-invalidation with both distributions
```

Always full sync — never exclude `_next/*`.
