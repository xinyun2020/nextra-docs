import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://xinyun-zettelkasten.vercel.app';
const SITE_TITLE = 'Xinyun Zettelkasten';
const NOTE_DIRECTORIES = ['permanent-notes', 'literature-notes'] as const;
const EXCLUDE = ['example-component', 'scroll-animation', 'test', '_meta'];
const pagesDir = path.join(process.cwd(), 'src', 'pages');

interface FeedItem {
  title: string;
  path: string;
  date: string;
  description: string;
  category: string;
}

const allItems: FeedItem[] = [];

NOTE_DIRECTORIES.forEach(dirName => {
  const dirPath = path.join(pagesDir, dirName);
  try {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(content);
      const filename = file.replace(/\.mdx?$/, '');
      if (EXCLUDE.includes(filename)) return;

      const title = frontmatter.title || filename.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
      const date = frontmatter.date || new Date().toISOString().split('T')[0];
      const description = frontmatter.description || '';

      allItems.push({ title, path: `/${dirName}/${filename}`, date, description, category: dirName });
    });
  } catch {}
});

allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function generateFeed(title: string, description: string, feedPath: string, items: FeedItem[]) {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}${feedPath}" rel="self" type="application/rss+xml"/>
${items.map(item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${SITE_URL}${item.path}</link>
      <guid>${SITE_URL}${item.path}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.description || item.title)}</description>
    </item>`).join('\n')}
  </channel>
</rss>`;
  const outputPath = path.join(process.cwd(), 'public', feedPath);
  fs.writeFileSync(outputPath, rss);
  return items.length;
}

// all notes
const allCount = generateFeed(
  SITE_TITLE,
  'All notes — learning in public, writing things down.',
  '/feed.xml',
  allItems
);

// permanent notes only
const permCount = generateFeed(
  `${SITE_TITLE} — Permanent Notes`,
  'Refined ideas that survived the filter.',
  '/feed-permanent.xml',
  allItems.filter(i => i.category === 'permanent-notes')
);

// literature notes only
const litCount = generateFeed(
  `${SITE_TITLE} — Literature Notes`,
  'Notes from things I read, watch, and learn from.',
  '/feed-literature.xml',
  allItems.filter(i => i.category === 'literature-notes')
);

console.log(`✓ Generated RSS feeds: all (${allCount}), permanent (${permCount}), literature (${litCount})`);
