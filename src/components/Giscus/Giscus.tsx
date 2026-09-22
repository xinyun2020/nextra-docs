import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";

// Comments live in GitHub Discussions via giscus —
// no database, GitHub identity, sorted newest-first.
// To activate: enable Discussions on the repo, install the giscus app,
// then fill REPO_ID + CATEGORY_ID from https://giscus.app —
// until then this component renders nothing (fail-safe).
const GISCUS_REPO = "xinyun2020/nextra-docs";
const GISCUS_REPO_ID = "";
const GISCUS_CATEGORY = "Announcements";
const GISCUS_CATEGORY_ID = "";

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { locale } = useRouter();

  useEffect(() => {
    if (!GISCUS_REPO_ID || !GISCUS_CATEGORY_ID || !ref.current) return;
    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    s.setAttribute("data-repo", GISCUS_REPO);
    s.setAttribute("data-repo-id", GISCUS_REPO_ID);
    s.setAttribute("data-category", GISCUS_CATEGORY);
    s.setAttribute("data-category-id", GISCUS_CATEGORY_ID);
    s.setAttribute("data-mapping", "pathname");
    s.setAttribute("data-strict", "0");
    s.setAttribute("data-reactions-enabled", "1");
    s.setAttribute("data-emit-metadata", "0");
    s.setAttribute("data-input-position", "top");
    s.setAttribute("data-theme", "light");
    s.setAttribute("data-lang", locale === "zh" ? "zh-CN" : "en");
    s.setAttribute("data-loading", "lazy");
    ref.current.replaceChildren(s);
  }, [locale]);

  if (!GISCUS_REPO_ID || !GISCUS_CATEGORY_ID) return null;
  return <div ref={ref} style={{ marginTop: "4rem" }} />;
}
