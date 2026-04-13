import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-row items-center hover:cursor-pointer">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* three connected nodes — fleeting, literature, permanent */}
        <line x1="10" y1="26" x2="18" y2="8" stroke="#0AAFCE" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="8" x2="28" y2="22" stroke="#0AAFCE" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="22" x2="10" y2="26" stroke="#0AAFCE" strokeWidth="1.5" strokeLinecap="round" />
        {/* nodes */}
        <circle cx="18" cy="8" r="3" fill="#0AAFCE" />
        <circle cx="10" cy="26" r="2.5" fill="#0AAFCE" opacity="0.7" />
        <circle cx="28" cy="22" r="2.5" fill="#0AAFCE" opacity="0.7" />
        {/* center spark — the ✦ insight that connects them */}
        <circle cx="18.5" cy="18.5" r="1.5" fill="#0AAFCE" opacity="0.4" />
      </svg>
      <span
        style={{ marginLeft: ".4em", fontWeight: 800 }}
        className={
          "font-sans not-italic my-auto text-xl font-bold tracking-tight"
        }>
        Xinyun<span className="ml-1">Z</span>ettelkasten
      </span>
    </div>
  );
};

export default Logo;
