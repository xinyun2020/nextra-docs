import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://xinyun-zettelkasten.vercel.app';
const SITE_TITLE = 'Xinyun Zettelkasten';
const SITE_DESCRIPTION = 'Learning in public. Writing things down so I remember, sharing in case it helps you too.';
const NOTE_DIRECTORIES = ['permanent-notes', 'literature-notes'];
const pagesDir = path.join(process.cwd(), 'src', 'pages');

interface FeedItem {
  title: string;
  path: string;
  date: string;
  description: string;
}

const items: FeedItem[] = [];

NOTE_DIRECTORIES.forEach(dirName => {
  const dirPath = path.join(pagesDir, dirName);
  try {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(content);
      const filename = file.replace(/\.mdx?$/, '');
      if (['example-component', 'scroll-animation', 'test', '_meta'].includes(filename)) return;

      const title = frontmatter.title || filename.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
      const date = frontmatter.date || new Date().toISOString().split('T')[0];
      const description = frontmatter.description || '';

      items.push({ title, path: `/${dirName}/${filename}`, date, description });
    });
  } catch {}
});

items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items.map(item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${SITE_URL}${item.path}</link>
      <guid>${SITE_URL}${item.path}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(item.description || item.title)}</description>
    </item>`).join('\n')}
  </channel>
</rss>`;

const outputPath = path.join(process.cwd(), 'public', 'feed.xml');
fs.writeFileSync(outputPath, rss);
console.log(`✓ Generated RSS feed with ${items.length} items`);
