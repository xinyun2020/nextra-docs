import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import zhRoutesJson from "../../generated/zh-routes.json";

// tw93-style language switch: plain one-click text link in the navbar
// (en is the default locale, unprefixed; zh lives under /zh).
// Renders ONLY where a real .zh.mdx sibling exists (generated manifest) —
// never a button that lands on fallback English under /zh.
const zhRoutes: string[] = zhRoutesJson.zhRoutes;

const LanguageToggle = () => {
  const { locale, asPath } = useRouter();
  // Language state is inconsistent across rendering contexts — check ALL signals:
  // - SSR of a rewritten page: asPath is the rewrite DESTINATION (/about.zh), locale undefined
  // - client-side after nav: router normalizes to locale:"zh", asPath:"/about" (prefix stripped)
  // - browser URL: /zh/about
  const basePath = asPath.split(/[?#]/)[0] || "/";
  const isZh =
    locale === "zh" ||
    /^\/zh(\/|$)/.test(basePath) ||
    /\.zh$/.test(basePath);
  const enRoute = isZh
    ? basePath.replace(/^\/zh/, "").replace(/\.zh$/, "") || "/"
    : basePath;
  const hasTranslation = zhRoutes.includes(enRoute);
  if (!hasTranslation) return null;
  const target = isZh ? enRoute : `/zh${enRoute === "/" ? "" : enRoute}`;

  return (
    <Link
      href={target}
      locale={false}
      aria-label={isZh ? "Switch to English" : "切换到中文"}
      onClick={() => {
        const date = new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3);
        document.cookie = `NEXT_LOCALE=${isZh ? "en" : "zh"}; expires=${date.toUTCString()}; path=/`;
      }}
      style={{
        fontSize: "0.8rem",
        color: "inherit",
        opacity: 0.6,
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {isZh ? "En" : "中"}
    </Link>
  );
};

export default LanguageToggle;
