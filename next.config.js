/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
