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

const HYPERLINK_PRIMARY_HUE = 210.0;

const config: DocsThemeConfig = {
  banner: {
    key: `${currentYear}-CV-released`,
    text: (
      <a href="/cv" target="_blank" rel="noopener noreferrer">
        🎉 {currentYear} CV is released. Read more →
      </a>
    )
  },
  logo: <Logo />,
  darkMode: false,
  primaryHue: HYPERLINK_PRIMARY_HUE,
  themeSwitch: {},
  nextThemes: {
    defaultTheme: "system"
  },
  project: {
    link: "https://github.com/XinYun2020"
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
    return (
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: "0 1rem" }}>
        {frontMatter.pdf && (
          <div style={{ marginBottom: "1.5rem" }}>
            <PdfDownload href={frontMatter.pdf} />
          </div>
        )}
        {children}
      </div>
    );
  },
  navbar: {
    extraContent: <NavbarIcons />
  }
};

export default config;
