"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./AltbotBlocks";

/*
  The explainer videos: the 5-minute showcase film (light + dark cuts, with chapters) and the
  1-minute promo. Chapter times were read off the film itself.
*/

type Look = "dark" | "light";
const SRC: Record<Look, string> = { dark: "/work/altbot/showcase-dark.mp4", light: "/work/altbot/showcase-light.mp4" };
const POSTER: Record<Look, string> = { dark: "/work/altbot/showcase-dark.jpg", light: "/work/altbot/showcase-light.jpg" };

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function LookSwitch({ look, set }: { look: Look; set: (l: Look) => void }) {
  return <ThemeToggle look={look} set={set} label="which cut of the film" />;
}

/* swap light/dark without losing the place */
/* the two cuts are edited differently, so every mark has a time per cut */
type Mark = { at: Record<Look, number> };
const idx = (marks: Mark[], look: Look, t: number) => marks.reduce((a, m, i) => (t >= m.at[look] ? i : a), 0);

function useLook(video: React.RefObject<HTMLVideoElement | null>, marks: Mark[], onRemap: (t: number) => void) {
  const [look, setLook] = useState<Look>("dark");
  const resume = useRef<{ t: number; play: boolean } | null>(null);
  function set(l: Look) {
    if (l === look) return;
    const v = video.current;
    if (v) {
      // same moment in the other cut: same mark, same distance into it
      const i = idx(marks, look, v.currentTime);
      const into = Math.max(0, v.currentTime - marks[i].at[look]);
      const next = marks[i + 1]?.at[l] ?? Infinity;
      resume.current = { t: Math.min(marks[i].at[l] + into, next - 0.2), play: !v.paused };
      onRemap(resume.current.t);
    }
    setLook(l);
  }
  // the new cut's <video> starts unloaded: load it so it can pick up where the other one was
  useEffect(() => {
    if (resume.current) video.current?.load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [look]);
  function onLoaded() {
    const v = video.current;
    const r = resume.current;
    if (!v || !r) return;
    resume.current = null;
    v.currentTime = r.t;
    if (r.play) v.play().catch(() => {});
  }
  return { look, set, onLoaded };
}

/* ---------- the whole film, with chapters ---------- */

const CHAPTERS = [
  { at: { light: 0, dark: 0 }, n: "intro" },
  { at: { light: 7.5, dark: 7.0 }, n: "how i approached it" },
  { at: { light: 46.7, dark: 46.2 }, n: "natural conversation" },
  { at: { light: 64.5, dark: 58.0 }, n: "the topic gate" },
  { at: { light: 71.4, dark: 65.2 }, n: "hindi + english" },
  { at: { light: 79.8, dark: 73.5 }, n: "two kinds of bot" },
  { at: { light: 93.6, dark: 83.6 }, n: "it shows, not just tells" },
  { at: { light: 98.4, dark: 88.0 }, n: "slide decks" },
  { at: { light: 111.6, dark: 97.4 }, n: "live websites" },
  { at: { light: 119.0, dark: 104.9 }, n: "photo presentations" },
  { at: { light: 130.4, dark: 116.0 }, n: "take it home (qr)" },
  { at: { light: 136.1, dark: 121.4 }, n: "lead capture" },
  { at: { light: 142.5, dark: 127.4 }, n: "multiple ai characters" },
  { at: { light: 154.0, dark: 139.0 }, n: "every screen shape" },
  { at: { light: 160.0, dark: 145.0 }, n: "the staff menu" },
  { at: { light: 245.4, dark: 229.6 }, n: "diagnostics" },
  { at: { light: 264.5, dark: 240.0 }, n: "under the hood" },
  { at: { light: 291.5, dark: 267.0 }, n: "on-device" },
];

export function AltbotFilm() {
  const video = useRef<HTMLVideoElement | null>(null);
  const [t, setT] = useState(0);
  const { look, set, onLoaded } = useLook(video, CHAPTERS, setT);
  const cur = idx(CHAPTERS, look, t);
  const [cut, setCut] = useState<"full" | "promo">("full");

  function go(at: number) {
    const v = video.current;
    if (!v) return;
    v.currentTime = at + 0.05;
    v.play().catch(() => {});
  }

  return (
    <div className="ab-film">
      <div className="ab-film-bar">
        <div className="ab-seg" role="radiogroup" aria-label="which video">
          <span>watch</span>
          <button role="radio" aria-checked={cut === "full"} className={cut === "full" ? "on" : ""} onClick={() => setCut("full")}>
            5-minute walkthrough
          </button>
          <button role="radio" aria-checked={cut === "promo"} className={cut === "promo" ? "on" : ""} onClick={() => setCut("promo")}>
            the promo
          </button>
        </div>
        {cut === "full" && <LookSwitch look={look} set={set} />}
      </div>
      <div className="ab-film-frame">
        {cut === "full" ? (
          <video ref={video} key={look} src={SRC[look]} poster={POSTER[look]} controls playsInline preload="none" onLoadedMetadata={onLoaded} onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} />
        ) : (
          <video key="promo" src="/work/altbot/promo-landscape.mp4" poster="/work/altbot/promo-landscape.jpg" controls playsInline preload="none" />
        )}
      </div>
      {cut === "full" && (
        <ol className="ab-film-chapters" aria-label="chapters">
          {CHAPTERS.map((c, i) => (
            <li key={c.n}>
              <button className={i === cur && t > 0 ? "on" : ""} onClick={() => go(c.at[look])}>
                <small>{fmt(c.at[look])}</small>
                {c.n}
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
