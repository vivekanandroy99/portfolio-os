"use client";

import { useEffect, type RefObject } from "react";

/* any video inside `box` pauses once it is scrolled out of view, so nothing keeps talking off screen */
export function usePauseOffscreen(box: RefObject<HTMLElement | null>, onLeave?: () => void) {
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) return;
        el.querySelectorAll("video").forEach((v) => v.pause());
        onLeave?.();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box]);
}
