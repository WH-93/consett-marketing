import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync('src/app/globals.css', 'utf8');
const publicLayout = readFileSync('src/components/public-layout.tsx', 'utf8');
const arrowField = readFileSync('public/patterns/arrow-field-layered.webp');

describe('home visual style contract', () => {
  it('ships the layered arrow field as an optimised raster tile', () => {
    // WebP magic bytes: RIFF....WEBP
    assert.equal(arrowField.subarray(0, 4).toString('ascii'), 'RIFF', 'tile should be a WebP (RIFF container)');
    assert.equal(arrowField.subarray(8, 12).toString('ascii'), 'WEBP', 'tile should be a WebP image');
    assert.ok(arrowField.length < 120_000, 'tile must stay lightweight (<120KB) as a repeating background');
  });

  it('keeps the whole home page on one continuous repeated pattern background', () => {
    assert.ok(publicLayout.includes('home-field'), 'home layout should apply the shared arrow-field class');
    assert.match(
      css,
      /\.home-field\s*{[\s\S]*?background-image:\s*url\('\/patterns\/arrow-field-layered\.webp'\)/,
      'home page shell should own the arrow background',
    );
    assert.doesNotMatch(
      css,
      /\.home-panel[^{]*{[^}]*background-image/,
      'scroll panels must not restart their own pattern fields',
    );
    assert.doesNotMatch(
      css,
      /\.home-hero-panel\s*{[^}]*background/,
      'the hero panel must stay transparent so the field shows through',
    );
  });

  it('keeps copy readable in black bands over the arrow pattern', () => {
    assert.match(css, /\.band-black\s*{[\s\S]*?background:\s*#050607;/, 'copy bands need a black background');
    assert.match(css, /\.band-black\s*{[\s\S]*?color:\s*#fff;/, 'copy inside black bands should be white');
    assert.match(css, /\.band-black \.body-copy\s*{\s*color:\s*rgba\(255,\s*255,\s*255/, 'body copy in bands stays light');
  });

  it('respects reduced-motion preferences for hero and reveal animations', () => {
    assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
    assert.match(css, /prefers-reduced-motion[\s\S]*?\.js \.reveal\s*{[^}]*opacity:\s*1/);
  });
});
