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
      fixed bottom-24 right-8 z-50
      min-w-[120px] px-4 py-3
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
    <div className="flex items-center gap-2">
      <BsFileEarmarkPdf className="w-4 h-4" />
      <span>PDF</span>
    </div>
  </a>
);

export default PdfDownload;
