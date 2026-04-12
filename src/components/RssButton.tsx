import React, { useState } from "react";

const SITE_URL = "https://xinyun-zettelkasten.vercel.app";

const RSS_ICON = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, opacity: 0.6 }}>
    <circle cx="6.18" cy="17.82" r="2.18" />
    <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
  </svg>
);

export function RssButton({ label, path }: { label: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}${path}`;

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-slate-500/10 hover:bg-slate-500/20 transition-colors cursor-pointer border-none focus-visible:ring-2 focus-visible:ring-[#0AAFCE]"
      aria-live="polite"
      aria-label={`Copy ${label} RSS feed URL`}
    >
      {RSS_ICON}
      {copied ? "Copied!" : label}
    </button>
  );
}
