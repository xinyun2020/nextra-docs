import React from "react";
import html2pdf from "html2pdf.js";

const PDFDownloadButton = ({ content }) => {
  const handleDownload = () => {
    const element = document.getElementById("mdx-content");
    const options = {
      margin: 10,
      filename: "xinyun_zhang_cv.pdf",
      html2canvas: { scale: 5 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <button onClick={handleDownload} className="btn mx-auto">
      Download as PDF
    </button>
  );
};

export default PDFDownloadButton;
