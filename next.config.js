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
  // Nextra 2 also exports .zh-suffixed files as literal orphan pages under
  // every locale — send them to the canonical locale route
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
