/* 
    pnpm i @react-spring/parallax
*/

import React, { useRef } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";

const ParallaxComponent = () => {
  const ref = useRef<IParallax>(null);
  return (
    <div>
      {/* @ts-expect-error - Library type definition issue with children prop */}
      <Parallax pages={4} ref={ref}>
        <>
          <ParallaxLayer
            offset={0}
            speed={1}
            factor={2}
            style={{
              backgroundImage: `url(https://yt3.ggpht.com/yti/AHyvSCAdicuzmHUuHiUHIebnJvhSegscBvE--6FGiyP5Rg=s88-c-k-c0x00ffffff-no-rj-mo)`,
              backgroundSize: "auto",
            }}>
            <h2>1 welcome to my website</h2>
          </ParallaxLayer>
          <ParallaxLayer
            offset={1}
            speed={0.5}
            factor={4}
            onClick={() => ref.current?.scrollTo(3)}
            style={{
              backgroundImage: `url(https://yt3.ggpht.com/yti/AHyvSCAdicuzmHUuHiUHIebnJvhSegscBvE--6FGiyP5Rg=s88-c-k-c0x00ffffff-no-rj-mo)`,
              backgroundSize: "auto",
            }}>
            <h2>2 web development is fun!</h2>
          </ParallaxLayer>
          <ParallaxLayer
            offset={2}
            speed={1}
            factor={4}
            onClick={() => ref.current?.scrollTo(0)}
            style={{
              backgroundImage: `url(https://yt3.ggpht.com/yti/AHyvSCAdicuzmHUuHiUHIebnJvhSegscBvE--6FGiyP5Rg=s88-c-k-c0x00ffffff-no-rj-mo)`,
              backgroundSize: "cover",
            }}>
            <h2>3 welcome to my website</h2>
          </ParallaxLayer>
          <ParallaxLayer offset={3} speed={0.05}>
            <h2>4 web development is fun!</h2>
          </ParallaxLayer>
          <ParallaxLayer sticky={{ start: 0.9, end: 2.5 }}>
            <h2>person</h2>
          </ParallaxLayer>
        </>
      </Parallax>
    </div>
  );
};

export default ParallaxComponent;
