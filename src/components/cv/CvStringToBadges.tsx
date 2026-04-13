import { Badge } from "../ui/badge";
import React from "react";

// input string
// string to array of string
// array of string render as badge

const CvStringToBadges = ({ items }: { items: string }) => {
  if (!items || items.trim() === "") {
    return null;
  }

  const itemsArray = items.toString().split(",");

  return (
    <span className="flex gap-1 flex-wrap">
      {itemsArray.map((item) => {
        return <Badge>{item.trim()}</Badge>;
      })}
    </span>
  );
};

export default CvStringToBadges;
