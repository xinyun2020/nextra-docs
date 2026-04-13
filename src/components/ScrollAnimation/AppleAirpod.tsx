import React, { useEffect, useRef } from "react";
/* Img not moving */

const AppleAirPod = () => {
  const canvasRef = useRef(null);
  const frameCount = 148;

  const currentFrame = (index) =>
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
      .toString()
      .padStart(4, "0")}.jpg`;

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    let animationFrameId;

    const updateImage = (index) => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0);
    };

    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      const maxScrollTop =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollFraction = scrollTop / maxScrollTop;
      console.log(
        "🚀 ~ file: AppleAirpod.tsx:32 ~ handleScroll ~ scrollTop:",
        scrollFraction
      );

      const frameIndex = Math.min(
        frameCount - 1, // dont exceed number of frames
        Math.ceil(scrollFraction * frameCount)
      );
      console.log(
        "🚀 ~ file: AppleAirpod.tsx:49 ~ handleScroll ~ frameIndex:",
        frameIndex
      );

      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() =>
        updateImage(frameIndex + 1)
      );
      console.log(currentFrame(frameIndex));
    };

    img.src = currentFrame(1);
    canvas.width = 1158;
    canvas.height = 770;
    img.onload = () => {
      context.drawImage(img, 0, 0);
    };

    window.addEventListener("scroll", handleScroll);

    preloadImages();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-[500vh] w-full">
      <canvas ref={canvasRef} id="hero-lightpass" className="fixed" />
    </div>
  );
};

export default AppleAirPod;
