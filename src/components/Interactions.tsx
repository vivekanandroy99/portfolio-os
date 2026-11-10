"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { init } from "@/lib/interactions";

/** Wires up the cursor, stickers, os mode and canvases after each page renders. */
export function Interactions() {
  const pathname = usePathname();
  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [pathname]);
  return null;
}
