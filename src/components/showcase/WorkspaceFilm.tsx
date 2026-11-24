"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play, type LucideIcon } from "lucide-react";
import { FILMS } from "./workspaceFilms";

/*
  a keynote-style film for one part of the app: a title card, then each feature with zoom-ins,
  highlights and captions (cut from the real app's clips by scripts in the design scratchpad).
  under it, one card per feature: tap a card to jump the film there. the card that's playing lights up.
*/

export type FilmStep = { id: string; icon: LucideIcon; title: string; lead: string; note?: string; more?: string[] };

const BASE = "/work/altcore-workspace/films";

export function WorkspaceFilm({ film, label, steps }: { film: string; label: string; steps: FilmStep[] }) {
  const v = useRef<HTMLVideoElement | null>(null);
  const [now, setNow] = useState(0);
  const [playing, setPlaying] = useState(false);
  const meta = FILMS[film];
  const starts = steps.map((s, i) => (i === 0 ? 0 : meta.chapters.find((c) => c.id === s.id)?.t ?? 0));
  const ends = starts.map((_, i) => (i + 1 < starts.length ? starts[i + 1] : meta.duration));
  const cur = Math.max(0, starts.findLastIndex((t) => now >= t));

  useEffect(() => {
    const el = v.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) el.pause();
      else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && el.dataset.user !== "paused") el.play().catch(() => {});
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function jump(i: number) {
    const el = v.current;
    if (!el) return;
    el.currentTime = starts[i] + (i === 0 ? 0 : 0.05);
    el.dataset.user = "";
    el.play().catch(() => {});
  }
  function toggle() {
    const el = v.current;
    if (!el) return;
    if (el.paused) { el.dataset.user = ""; el.play().catch(() => {}); }
    else { el.dataset.user = "paused"; el.pause(); }
  }
  const PP = playing ? Pause : Play;

  return (
    <div className="ws-film">
      <figure className="ws-film-player">
        <video
          ref={v}
          src={`${BASE}/${film}.mp4`}
          poster={`${BASE}/${film}.jpg`}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
          onTimeUpdate={(e) => setNow(e.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className="ws-film-bar">
          <button type="button" onClick={toggle} aria-label={playing ? "pause the film" : "play the film"} data-label={playing ? "pause" : "play"}>
            <PP aria-hidden="true" />
          </button>
          <div className="ws-film-track" aria-hidden="true">
            {steps.map((s, i) => {
              const p = Math.min(1, Math.max(0, (now - starts[i]) / Math.max(0.1, ends[i] - starts[i])));
              return (
                <span key={s.id} style={{ flexGrow: ends[i] - starts[i] }} onClick={() => jump(i)}>
                  <i style={{ transform: `scaleX(${i < cur ? 1 : i === cur ? p : 0})` }} />
                </span>
              );
            })}
          </div>
        </div>
      </figure>

      <ol className="ws-film-steps" style={{ "--n": steps.length } as CSSProperties}>
        {steps.map((s, i) => (
          <li key={s.id} className={i === cur ? "on" : ""}>
            <button type="button" onClick={() => jump(i)} aria-label={`play: ${s.title}`} data-label="watch">
              <span className="ab-ico"><s.icon aria-hidden="true" /></span>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
            </button>
            <h3>{s.title}</h3>
            <p>{s.lead}</p>
            {s.more && (
              <ul>
                {s.more.map((m) => <li key={m}>{m}</li>)}
              </ul>
            )}
            {s.note && <small>{s.note}</small>}
          </li>
        ))}
      </ol>
    </div>
  );
}
