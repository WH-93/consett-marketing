import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { publicPageMaps, serialisePublicPageMaps } from '../src/site/story-maps/public-pages';

const here = dirname(fileURLToPath(import.meta.url));
const target = join(here, '..', 'src', 'site', 'story-maps', 'public-pages.json');

writeFileSync(target, `${JSON.stringify(serialisePublicPageMaps(publicPageMaps), null, 2)}\n`);
console.log(`Wrote ${target}`);
