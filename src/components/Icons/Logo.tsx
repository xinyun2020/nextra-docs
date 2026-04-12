import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-row items-center hover:cursor-pointer">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect
          stroke="#0AAFCE"
          strokeWidth="2.5"
          id="svg_6"
          height="28"
          width="24"
          y="4"
          x="6"
          rx={5}
        />
      </svg>
      <span
        style={{ marginLeft: ".4em", fontWeight: 800 }}
        className={
          "font-sans not-italic my-auto text-xl font-bold tracking-tight"
        }>
        Xinyun<span className="xtext-[#0AAFCE] ml-1">Z</span>ettelkasten
      </span>
    </div>
  );
};

export default Logo;
