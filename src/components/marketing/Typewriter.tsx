"use client";

import { useEffect, useMemo, useState } from "react";

export function Typewriter({
  strings,
  speedMs = 45,
  pauseMs = 900,
  loop = true,
  className = "",
}: {
  strings: string[];
  speedMs?: number;
  pauseMs?: number;
  loop?: boolean;
  className?: string;
}) {
  const safeStrings = useMemo(() => strings.filter(Boolean), [strings]);
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (safeStrings.length === 0) return;

    const current = safeStrings[strIdx] ?? "";
    const isDoneTyping = !deleting && charIdx >= current.length;
    const isDoneDeleting = deleting && charIdx <= 0;

    let timeout = 0;

    if (isDoneTyping) {
      timeout = window.setTimeout(() => setDeleting(true), pauseMs);
    } else if (isDoneDeleting) {
      setDeleting(false);
      setCharIdx(0);
      const next = strIdx + 1;
      if (next >= safeStrings.length) {
        if (loop) setStrIdx(0);
      } else {
        setStrIdx(next);
      }
    } else {
      const nextCharIdx = isDoneTyping
        ? charIdx
        : deleting
          ? Math.max(0, charIdx - 1)
          : Math.min(current.length, charIdx + 1);
      const nextDelay = deleting ? Math.max(15, speedMs / 2) : speedMs;

      timeout = window.setTimeout(() => setCharIdx(nextCharIdx), nextDelay);
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [charIdx, deleting, loop, pauseMs, safeStrings, speedMs, strIdx]);

  const current = safeStrings[strIdx] ?? "";
  const visible = current.slice(0, charIdx);

  return (
    <span className={className}>
      {visible}
      {/* Reuse wrapper styling so caret matches gradient text */}
      <span className={`${className} ml-2 inline-block animate-pulse`}>|</span>
    </span>
  );
}

