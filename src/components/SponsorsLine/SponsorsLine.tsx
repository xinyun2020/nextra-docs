import React from "react";

const SponsorsLine = () => {
  return (
    <div className="text-center max-w-md mx-auto py-12">
      <p className="font-plex italic text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
        If something here made you think, that's the best kind of sponsorship. But if you'd like to help keep the lights on:
      </p>
      <a
        className="inline-block px-6 py-3 rounded-lg text-sm font-medium bg-slate-500/10 hover:bg-slate-500/20 transition-colors"
        href="https://github.com/sponsors/XinYun2020"
        target="_blank"
        rel="nofollow noreferrer"
        aria-label="Become a sponsor on GitHub"
      >
        Support this garden
      </a>
    </div>
  );
};

export default SponsorsLine;
