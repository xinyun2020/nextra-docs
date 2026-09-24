import fs from 'fs';
import path from 'path';

// Scans src/pages for *.zh.mdx / *.zh.md locale siblings and emits the list of
// canonical routes that have a zh translation. Consumed by LanguageToggle so the
// switch only renders where a real translation exists (never a fallback page).

const pagesDir = path.join(process.cwd(), 'src', 'pages');
const zhRoutes: string[] = [];

function walk(dir: string): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.zh\.mdx?$/.test(entry.name)) {
      const rel = path.relative(pagesDir, full).replace(/\.zh\.mdx?$/, '').replace(/\\/g, '/');
      zhRoutes.push('/' + rel);
    }
  }
}

walk(pagesDir);
zhRoutes.sort();

const outDir = path.join(process.cwd(), 'src', 'generated');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'zh-routes.json'),
  JSON.stringify({ zhRoutes }, null, 2)
);
console.log(`✓ Generated ${zhRoutes.length} zh routes`);
