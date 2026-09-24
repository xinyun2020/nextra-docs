// one-shot zh translation pass: every en .mdx note without a .zh
// sibling gets machine-translated via the Zendesk AI Gateway, then the .zh.mdx
// output is treated as real content (manually editable afterwards).
// Usage: node src/scripts/translateNotes.mjs [--dry]

import fs from "fs";
import path from "path";

const PAGES_DIR = path.join(process.cwd(), "src", "pages");
const NOTE_DIRS = ["fleeting-notes", "literature-notes", "permanent-notes"];
const EXCLUDE = ["example-component", "scroll-animation", "test"]; // mirrors generateNotesData.ts
const DRY = process.argv.includes("--dry");

const GATEWAY = "https://ai-gateway.zende.sk/anthropic/v1/messages";
const MODEL = process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL;
const TOKEN = process.env.ANTHROPIC_AUTH_TOKEN;
if (!MODEL || !TOKEN) {
  console.error("Missing ANTHROPIC_DEFAULT_HAIKU_MODEL / ANTHROPIC_AUTH_TOKEN");
  process.exit(1);
}

const PROMPT = (content) => `Translate this personal knowledge-base note into natural, fluent Simplified Chinese — the voice of a thoughtful engineer writing for her own Zettelkasten, not machine-stiff prose.

Rules:
- frontMatter: translate the values of "title" and "description" into Chinese; keep every other key (date, tags, pdf, giscus...) and its values EXACTLY as-is. Keep the --- delimiters and YAML structure.
- Translate the body prose into Chinese. Keep the same paragraph breaks.
- Preserve EXACTLY, untranslated: all import statements, JSX/HTML components and their props, code blocks, inline code, URLs, markdown link hrefs (translate link TEXT only), HTML tags, className strings, <div> wrappers, and any English proper nouns that are conventionally kept (product names, framework names).
- Keep wiki-style structure and headings: translate heading text, keep the # levels.
- Output ONLY the complete translated .mdx file content. No explanations, no code fences around the whole file.

FILE CONTENT:
${content}`;

const TRANSLATION_TIMEOUT = 120000;

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.mdx?$/.test(entry.name) && !/\.zh\.mdx?$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

const targets = [];
for (const dir of NOTE_DIRS) {
  const dirPath = path.join(PAGES_DIR, dir);
  if (!fs.existsSync(dirPath)) continue;
  for (const file of walk(dirPath)) {
    const name = path.basename(file).replace(/\.mdx?$/, "");
    if (EXCLUDE.includes(name)) continue;
    const zhPath = file.replace(/\.mdx?$/, (m) => `.zh${m}`);
    if (!fs.existsSync(zhPath)) targets.push({ file, zhPath });
  }
}

console.log(`${targets.length} notes to translate${DRY ? " (dry run)" : ""}`);
targets.forEach((t) => console.log("  -", path.relative(PAGES_DIR, t.file)));
if (DRY) process.exit(0);

async function translate(content, attempt = 1) {
  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      messages: [{ role: "user", content: PROMPT(content) }],
    }),
    signal: AbortSignal.timeout(TRANSLATION_TIMEOUT),
  });
  if (!res.ok) throw new Error(`gateway ${res.status}: ${(await res.text()).slice(0, 120)}`);
  const data = await res.json();
  const text = data.content?.[0]?.text;
  if (!text) throw new Error("empty response");
  return text.replace(/^```[a-z]*\n/, "").replace(/```\n?$/, "").trim() + "\n";
}

const CONCURRENCY = 4;
let done = 0;
const failures = [];

async function worker(queue) {
  while (queue.length) {
    const t = queue.shift();
    try {
      const translated = await translate(fs.readFileSync(t.file, "utf8"));
      if (!translated.includes("---")) throw new Error("output missing frontMatter");
      fs.writeFileSync(t.zhPath, translated);
      done++;
      console.log(`✓ [${done}/${targets.length}] ${path.relative(PAGES_DIR, t.zhPath)}`);
    } catch (err) {
      if (attemptNeedsRetry(err, t)) continue;
      failures.push({ file: t.file, err: String(err).slice(0, 120) });
      console.error(`✗ ${path.relative(PAGES_DIR, t.file)}: ${String(err).slice(0, 120)}`);
    }
  }
}

// retry once per failure by re-queueing (max 2 attempts total, tracked via map)
const attempts = new Map();
function attemptNeedsRetry(err, t) {
  const n = (attempts.get(t.file) || 0) + 1;
  attempts.set(t.file, n);
  if (n < 2) {
    queue.unshift(t);
    return true;
  }
  return false;
}

const queue = [...targets];
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));

console.log(`\nDone: ${done}/${targets.length} translated, ${failures.length} failed`);
if (failures.length) {
  console.log("Failures:");
  failures.forEach((f) => console.log(`  ${f.file}: ${f.err}`));
  process.exitCode = 1;
}
