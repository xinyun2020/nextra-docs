import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Logo, NavbarIcons } from "./components/Icons";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { MY } from "./constants";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import { Pre } from "./components/Pre";
import DocslyClient from "@/components/DocslyClient";
import PdfDownload from "./components/PdfDownload";

const currentYear = new Date().getFullYear();

const HYPERLINK_PRIMARY_HUE = 187;

const config: DocsThemeConfig = {
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <link rel="alternate" type="application/rss+xml" title="Xinyun Zettelkasten" href="/feed.xml" />
    </>
  ),
  // banner: {
  //   key: `${currentYear}-CV-released`,
  //   text: (
  //     <a href="/cv" target="_blank" rel="noopener noreferrer">
  //       🎉 {currentYear} CV is released. Read more →
  //     </a>
  //   )
  // },
  logo: <Logo />,
  darkMode: false,
  primaryHue: HYPERLINK_PRIMARY_HUE,
  themeSwitch: {},
  nextThemes: {
    defaultTheme: "system"
  },
  project: {
    link: ""
  },
  direction: "ltr",
  faviconGlyph: "✦",
  docsRepositoryBase: "https://github.com/XinYun2020/nextra-docs",
  editLink: {
    component: () => null
  },
  feedback: {
    content: () => null
  },

  footer: {
    text: `\xA9 ${new Date().getFullYear()} Xinyun Zhang.`,
    component: () => <DocslyClient />
  },
  components: {
    pre: Pre
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    titleComponent({ title, type }) {
      if (type === "separator") {
        return (
          <div style={{ background: "teal", textAlign: "center" }}>{title}</div>
        );
      }
      return <>{title}</>;
    }
  },
  toc: {
    float: true,
    title: "Page Contents"
  },
  useNextSeoProps: () => {
    const { asPath } = useRouter();
    const siteUrl = "https://xinyun-zettelkasten.vercel.app";
    return {
      titleTemplate: "%s \u2013 Xinyun Zhang",
      description: "Xinyun Zhang | %s",
      canonical: `${siteUrl}${asPath}`,
      openGraph: {
        type: "article",
        url: `${siteUrl}${asPath}`,
        siteName: "Xinyun Zettelkasten",
      },
      additionalMetaTags: [
        { name: "author", content: "Xinyun Zhang (xinyun2020)" },
        { name: "rights", content: `© ${currentYear} xinyun2020. All rights reserved.` },
      ],
    };
  },
  navigation: {
    prev: true,
    next: true
  },
  gitTimestamp: <></>,
  main: ({ children }) => {
    const { frontMatter } = useConfig();
    const { asPath } = useRouter();
    const isArticle = /^\/(fleeting|literature|permanent)-notes\//.test(asPath);
    return (
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: "0 0.5rem" }}>
        {children}
        {frontMatter.pdf && <PdfDownload href={frontMatter.pdf} />}
        {isArticle && (
          <footer className="mt-12 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500">
            &copy; {currentYear} Xinyun Zhang. All rights reserved.
          </footer>
        )}
      </div>
    );
  },
  navbar: {
    extraContent: <NavbarIcons />
  }
};

export default config;
