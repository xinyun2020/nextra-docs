import React, { useState } from "react";
import Confetti from "react-confetti";
import { BsDownload } from "react-icons/bs";

const CvPDFDownloadButton: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [pieces, setPieces] = useState<number>(0);

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 3000);
  };

  const handleDownload = () => {
    setIsClicked(true);
    setPieces(200);

    const downloadLink = document.createElement("a");
    // downloadLink.href = "/Cv – Xinyun Zhang.pdf";
    downloadLink.href = "/Cv – Xinyun Zhang.pdf";
    downloadLink.download = `Xinyun_Zhang_CV_${
      /* @__PURE__ */ new Date().getFullYear()
    }.pdf`;
    downloadLink.click();
    stopConfetti();
  };

  return (
    <>
      {isClicked && (
        <div className="overflow-hidden flex justify-center max-w-screen">
          <Confetti gravity={0.2} numberOfPieces={pieces} />
        </div>
      )}
      <div className="cv-pdf-download-button fixed bottom-5 left-auto right-5 opacity-80 hover:opacity-100 active:scale-75 duration-200 ">
        <button onClick={handleDownload} className="btn focus:ring-0">
          <BsDownload />
        </button>
      </div>
    </>
  );
};

export default CvPDFDownloadButton;
