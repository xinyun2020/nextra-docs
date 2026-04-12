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
      fixed bottom-16 right-4 sm:bottom-24 sm:right-8 z-50
      w-10 h-10 sm:w-auto sm:h-auto sm:min-w-[120px] sm:px-4 sm:py-3
      flex items-center justify-center
      bg-white dark:bg-gray-900
      border-2 border-gray-800 dark:border-gray-200
      text-gray-800 dark:text-gray-200
      font-mono text-sm
      transition-all duration-200
      hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)]
      active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]
      active:translate-x-[2px] active:translate-y-[2px]
      no-underline
    `}
    title="Download PDF"
  >
    <BsFileEarmarkPdf className="w-4 h-4" />
    <span className="hidden sm:inline ml-2">PDF</span>
  </a>
);

export default PdfDownload;
