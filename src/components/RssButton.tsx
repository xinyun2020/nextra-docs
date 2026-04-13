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
      className="inline-flex items-center gap-1.5 px-1 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 underline underline-offset-2 decoration-gray-300 dark:decoration-gray-600 hover:decoration-current transition-colors cursor-pointer border-none bg-transparent focus-visible:ring-2 focus-visible:ring-[#0AAFCE]"
      aria-live="polite"
      aria-label={`Copy ${label} RSS feed URL`}
    >
      {RSS_ICON}
      {copied ? "Copied!" : label}
    </button>
  );
}
