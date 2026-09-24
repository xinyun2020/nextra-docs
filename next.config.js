/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // EN default (unprefixed), Chinese under /zh — Nextra pairs each note.mdx
  // with its note.zh.mdx sibling (one file per language, joined by slug,
  // never both languages on one page)
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
    localeDetection: false,
  },
  // Nextra 2 exports .zh-suffixed files as literal orphan routes (about.zh.mdx →
  // /about.zh) — Next i18n CANNOT serve them at /zh/about (a locale-prefixed URL
  // still renders pages/about.mdx, only the title localizes). Rewrite /zh/* to the
  // literal .zh pages so translated bodies actually appear; redirects keep the
  // orphan /about.zh URLs out of the wild.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/zh/:path*", destination: "/:path*.zh", locale: false }],
    };
  },
  async redirects() {
    return [{ source: "/:path*.zh", destination: "/:path*", permanent: true }];
  },
  eslint: { ignoreDuringBuilds: true },
  // swcMinify: true,
  // experimental: {
  //   appDir: true,
  //   serverActions: true,
  // },
};

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./src/theme.config.tsx",
  staticImage: true,
  latex: true,
  flexsearch: {
    codeblock: false,
  },
});

// module.exports = withNextra();
module.exports = withNextra(nextConfig);
// module.exports = withNextra({
//   i18n: {
//     locales: ["en", "zh"],
//     defaultLocale: "en",
//   },
// });
