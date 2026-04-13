"use client";

import Docsly from "@docsly/react";
import "@docsly/react/styles.css";
import { usePathname } from "next/navigation";

export default function DocslyClient() {
  const pathname = usePathname() || ""; // Use an empty string as the default value

  const publicId =
    "public_vQKVC7ryvcQ38AJpc4yeLLkc7vXQ1URK33Zo1tudBjf54DSVDJTKULfOGXLXpZQ0";
  return <Docsly publicId={publicId} pathname={pathname} />;
}
