import React from "react";

type CvLabelWithTimeProps = {
  label: string | React.ReactNode;
  time: string | React.ReactNode;
  highlight?: boolean;
};

const CvLabelWithTime = ({ label, time, highlight = true }) => {
  return (
    <div className="flex flex-col md:flex-row font-bold justify-between gap-2">
      <span className="text-sm">{label}</span>
      <span className="text-right text-xs font-mono">{time}</span>
    </div>
  );
};
export default CvLabelWithTime;
