import fs from 'fs';
import path from 'path';

const NOTE_DIRECTORIES = {
  'fleeting-notes': 'Fleeting Notes',
  'literature-notes': 'Literature Notes',
  'permanent-notes': 'Permanent Notes'
} as const;

const pagesDir = path.join(process.cwd(), 'src', 'pages');
const notes: string[] = [];

Object.keys(NOTE_DIRECTORIES).forEach(dirName => {
  const dirPath = path.join(pagesDir, dirName);
  try {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    files.forEach(file => {
      const filename = file.replace(/\.mdx?$/, '');
      notes.push(`/${dirName}/${filename}`);
    });
  } catch {
    // Directory doesn't exist
  }
});

const outputPath = path.join(process.cwd(), 'public', 'notes-data.json');
fs.writeFileSync(outputPath, JSON.stringify({ notePaths: notes }, null, 2));
console.log(`✓ Generated ${notes.length} notes`);
