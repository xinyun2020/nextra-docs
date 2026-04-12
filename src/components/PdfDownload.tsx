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
    className={`
      fixed bottom-14 right-4 z-50
      w-8 h-8 flex items-center justify-center
      bg-white/25 dark:bg-gray-900/25
      border border-gray-400/50 dark:border-gray-500/50 rounded
      text-gray-600 dark:text-gray-400
      transition-all duration-200
      hover:bg-white/50 dark:hover:bg-gray-900/50
      no-underline
    `}
    title="Download PDF"
  >
    <BsFileEarmarkPdf className="w-3.5 h-3.5" />
  </a>
);

export default PdfDownload;
