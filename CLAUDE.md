# Nextra-docs Project Instructions

Repo: Xinyun's Zettelkasten — personal knowledge site built with Nextra 2 + Next.js 13.

Obsidian source of truth: `[[xinyun2020 nextra-docs repo (Xinyun's Zettelkasten, my cv)]]`

## UI/UX Standards (enforce on every change)

### Buttons
- Base: `rounded-lg bg-slate-500/10 hover:bg-slate-500/20 transition-colors`
- Small: `px-3 py-1 text-xs`
- Normal: `px-4 py-2 text-sm`
- Large: `px-6 py-3 text-sm`

### Typography
- Body: `text-base`
- Captions/labels: `text-sm`
- Small UI: `text-xs`
- Section headers: `text-3xl font-eleyang tracking-wide`
- ELEYANG font: headers and Chinese characters only — never for body text

### Colors
- Primary text: `text-gray-700 dark:text-gray-300`
- Secondary: `text-gray-600 dark:text-gray-400`
- Caption/muted: `text-gray-500 dark:text-gray-500`
- Brand accent: `#0AAFCE`
- Card background: `bg-gray-50 dark:bg-white/[0.03]`
- Every text/bg color MUST have a `dark:` variant

### Layout
- Content (about): `max-w-lg`
- Post lists: `max-w-4xl`
- Cards/modals: `max-w-md`

## Accessibility (non-negotiable)

Every PR must satisfy these — do not wait for the user to ask:

- `focus-visible:ring-2 focus-visible:ring-[#0AAFCE]` on ALL interactive elements (buttons, links, inputs, custom triggers) — no exceptions
- Semantic HTML: `<button>` not `<div onClick>`, `role="log"` on message lists, `role="status" aria-live="polite"` on dynamic content
- `aria-label` on all icon-only buttons and SVG links
- `prefers-reduced-motion: reduce` disables animations (already in `globals.css`)
- Color contrast: minimum `gray-600` for body text (WCAG AA)
- Keyboard navigable: every clickable element reachable via Tab + Enter
- No `dangerouslySetInnerHTML` with unsanitized input
- No emojis in navigation — sidebar uses constellation node SVG dots

## File Conventions

- Content files: `YYYY-MM-DD_kebab-name.mdx` (date prefix = publish date)
- PDFs: `public/YYYY-MM-DD_kebab-name.pdf` with xinyun2020 watermark
- Structural pages: no date prefix (`about.mdx`, `cv.mdx`, `index.mdx`)
- Components: `src/components/` — never inline styles in mdx
- Frontmatter-driven rendering: `theme.config.tsx` main wrapper auto-renders shared components (PdfDownload, article footer) — individual mdx files don't import these

## Build

```bash
# Dev
npm run dev

# Build (generates notes-data.json + RSS feeds, then Next.js build)
npm run build

# RSS feeds regenerated on every build via ts-node
```

## Self-Review Checklist

Before presenting any change:
1. Does every new/modified interactive element have `focus-visible:ring-2`?
2. Are button sizes consistent with the standard (small/normal/large)?
3. Do all colors have `dark:` variants?
4. Is ELEYANG font used only for headers and Chinese?
5. Build passes (`npm run build`)?
