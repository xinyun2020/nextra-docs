import React from "react";
import { BsFileEarmarkPdf } from "react-icons/bs";

interface PdfDownloadProps {
  href: string;
}

const PdfDownload: React.FC<PdfDownloadProps> = ({ href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      border: "1px solid currentColor",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      textDecoration: "none",
      color: "inherit",
      opacity: 0.8,
      transition: "opacity 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
  >
    <BsFileEarmarkPdf />
    PDF Version
  </a>
);

export default PdfDownload;
