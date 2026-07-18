import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync('src/app/globals.css', 'utf8');
const publicLayout = readFileSync('src/components/public-layout.tsx', 'utf8');
const arrowTile = readFileSync('public/patterns/green-arrow-tile.svg', 'utf8');

describe('home visual style contract', () => {
  it('uses a single clean arrow shape for the repeated background tile', () => {
    assert.ok(arrowTile.includes('width=\"220\" height=\"220\"'), 'tile should be square and predictable');
    assert.equal((arrowTile.match(/<path\b/g) ?? []).length, 1, 'tile should contain one arrow path only');
    assert.ok(arrowTile.includes('stroke-linecap=\"round\"'), 'arrow ends should match the rounded reference mark');
    assert.doesNotMatch(arrowTile, /<use\b|<g\b|opacity=|scale\(/, 'tile must not use offset duplicates, opacity layers, or scaled arrows');
  });

  it('keeps the whole home page on one continuous repeated pattern background', () => {
    assert.ok(publicLayout.includes('home-field'), 'home layout should apply the shared arrow-field class');
    assert.match(
      css,
      /\.home-field\s*{[\s\S]*?background-image:\s*url\('\/patterns\/green-arrow-tile\.svg'\)/,
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
