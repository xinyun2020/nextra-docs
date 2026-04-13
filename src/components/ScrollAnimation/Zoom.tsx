import React, { useRef } from "react";

const ZoomComponent = () => {
  const start = 0;
  const stop = 100;
  const zoomRef = useRef(null);

  window.addEventListener("scroll", (e) => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > start && scrollTop < stop) {
      console.log("scrolling");
      const delta = scrollTop - start;
      const scale = Math.max(2.2 - delta / 500, 1);
      zoomRef.style.transform = `scale${scale}`;
    }
  });

  return (
    <div ref={zoomRef} className="zoom">
      ZoomComponent
    </div>
  );
};

export default ZoomComponent;
