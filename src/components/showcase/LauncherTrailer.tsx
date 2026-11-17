"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type DemoEvent, LauncherDemo } from "./LauncherDemo";

/*
  The interactive trailer: the launcher's real trailer plays inside the demo's screen. At a few
  moments it pauses and hands the screen to the visitor ("your turn"), then carries on once they've
  done that step in the live demo.

  TRAILER_SRC: put the short trailer (~70 s, 720p, a few MB) in public/work/kiosk-launcher/ and set
  the path here. Until then a stand-in plays the trailer's own lines on a timer.
  CHAPTERS: one per spoken line of trailer/script-short.json (launcher repo). `end` = when that line
  finishes, in seconds; the estimates below should be replaced with timeline-short.json's real times.
*/
const TRAILER_SRC: string | null = null;
const TRAILER_POSTER: string | undefined = undefined;

type Task = { on: DemoEvent; ask: string; how: string };
type Chapter = { id: string; title: string; line: string; end: number; task?: Task };

const CHAPTERS: Chapter[] = [
  { id: "open", title: "intro", line: "any app. any screen. one launcher.", end: 5 },
  {
    id: "apps", title: "apps", line: "games, websites, web apps, unity and unreal. one tap, and they run.", end: 12,
    task: { on: "launched", ask: "launch an app", how: "tap launch (or any app on the right) and watch the launch steps." },
  },
  {
    id: "kiosk", title: "kiosk", line: "kiosk mode locks the pc to the launcher. only staff get back in.", end: 19,
    task: { on: "unlocked", ask: "get out of kiosk mode", how: "press and hold the altcore logo for 5 seconds, then type the pin 2580." },
  },
  { id: "screens", title: "screens", line: "built for multiple screens. every app on the right one.", end: 25 },
  {
    id: "touch", title: "touch", line: "touch first, with its own on-screen keyboard. or go big picture and replace the windows desktop.", end: 33,
    task: { on: "layout", ask: "change the layout", how: "tap ⚙ at the top right and pick the other interface layout." },
  },
  { id: "add", title: "add apps", line: "add an app in a minute, or push it from the cloud to every pc.", end: 39 },
  { id: "cloud", title: "cloud", line: "accounts, roles and every pc, managed from anywhere.", end: 45 },
  { id: "updates", title: "updates", line: "it updates itself. signed and verified.", end: 50 },
  { id: "secure", title: "security", line: "apps stay encrypted. copy the folder, and you get noise.", end: 56 },
  { id: "end", title: "end", line: "altcore launcher.", end: 61 },
];
const TOTAL = CHAPTERS[CHAPTERS.length - 1].end;
const startOf = (i: number) => (i === 0 ? 0 : CHAPTERS[i - 1].end);

type Phase = "idle" | "play" | "try" | "nice" | "done";

export function LauncherTrailer() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [t, setT] = useState(0);
  const [doneTasks, setDoneTasks] = useState<string[]>([]);
  const [active, setActive] = useState<Chapter | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const clock = useRef(0); // stand-in clock (seconds)
  const raf = useRef<number | null>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const doneRef = useRef(doneTasks);
  doneRef.current = doneTasks;
  const activeRef = useRef(active);
  activeRef.current = active;

  const now = () => (video.current ? video.current.currentTime : clock.current);

  const stopClock = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    video.current?.pause();
  };

  const tick = useCallback(() => {
    let last = performance.now();
    const step = () => {
      if (phaseRef.current !== "play") return;
      const p = performance.now();
      if (!video.current) clock.current += (p - last) / 1000;
      last = p;
      const cur = now();
      setT(cur);
      const due = CHAPTERS.find((c) => c.task && c.end <= cur && !doneRef.current.includes(c.id));
      if (due) {
        if (!video.current) clock.current = due.end;
        else video.current.currentTime = due.end;
        setT(due.end);
        stopClock();
        setActive(due);
        setPhase("try");
        return;
      }
      if (cur >= TOTAL || video.current?.ended) {
        stopClock();
        setT(TOTAL);
        setPhase("done");
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  const play = useCallback(() => {
    setActive(null);
    setPhase("play");
    phaseRef.current = "play";
    video.current?.play().catch(() => {});
    tick();
  }, [tick]);

  useEffect(() => () => stopClock(), []);

  function seek(i: number) {
    stopClock();
    const at = startOf(i);
    clock.current = at;
    if (video.current) video.current.currentTime = at;
    setT(at);
    // steps before this point count as skipped; the ones after it come back
    setDoneTasks(CHAPTERS.filter((c) => c.task && c.end <= at).map((c) => c.id));
    doneRef.current = CHAPTERS.filter((c) => c.task && c.end <= at).map((c) => c.id);
    play();
  }

  function finishTask(id: string, nice: boolean) {
    const next = [...doneRef.current, id];
    doneRef.current = next;
    setDoneTasks(next);
    if (!nice) return play();
    setPhase("nice");
    window.setTimeout(play, 1400);
  }

  const onEvent = useCallback((e: DemoEvent) => {
    const a = activeRef.current;
    if (phaseRef.current === "try" && a?.task?.on === e) finishTask(a.id, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function replay() {
    doneRef.current = [];
    setDoneTasks([]);
    seek(0);
  }

  const chIndex = Math.max(0, CHAPTERS.findIndex((c) => t < c.end));
  const ch = CHAPTERS[phase === "done" ? CHAPTERS.length - 1 : chIndex];
  const covering = phase === "idle" || phase === "play" || phase === "done";
  const tries = CHAPTERS.filter((c) => c.task);

  const overlay = (
    <div className={`kt-over ${covering ? "on" : ""}`} aria-hidden={!covering}>
      {TRAILER_SRC ? (
        <video ref={video} className="kt-video" src={TRAILER_SRC} poster={TRAILER_POSTER} playsInline preload="metadata" />
      ) : (
        <div className="kt-stand" key={ch.id}>
          <small>{ch.title}</small>
          <b>{ch.line}</b>
          <em>stand-in · the real trailer plays here</em>
        </div>
      )}
      {phase === "idle" && (
        <button className="kt-big" onClick={play} data-label="play">
          <i>▶</i>
          <span>
            watch the trailer
            <small>it stops {tries.length} times so you can try it yourself</small>
          </span>
        </button>
      )}
      {phase === "done" && (
        <div className="kt-end">
          <b>that&apos;s the launcher.</b>
          <div>
            <button className="kt-big small" onClick={replay}>
              <i>↺</i>
              <span>watch again</span>
            </button>
            <button className="kt-ghost" onClick={() => setPhase("try")}>
              keep playing with it
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`kt kt-${phase}`}>
      <LauncherDemo onEvent={onEvent} overlay={overlay} covered={covering} />

      <div className="kt-now" aria-live="polite">
        {phase === "try" && active?.task ? (
          <>
            <span className="kt-badge">your turn</span>
            <p>
              <b>{active.task.ask}.</b> {active.task.how}
            </p>
            <button className="kt-ghost" onClick={() => finishTask(active.id, false)}>
              skip, keep watching
            </button>
          </>
        ) : phase === "try" ? (
          <>
            <span className="kt-badge">free play</span>
            <p>the demo is all yours. tap a chapter below to watch from there.</p>
            {t < TOTAL && (
              <button className="kt-ghost" onClick={play}>
                resume trailer
              </button>
            )}
          </>
        ) : phase === "nice" ? (
          <>
            <span className="kt-badge ok">nice</span>
            <p>that&apos;s exactly how it works on the real pc. back to the trailer…</p>
          </>
        ) : phase === "play" ? (
          <>
            <span className="kt-badge live">playing</span>
            <p>
              <b>{ch.title}</b> · {ch.line}
            </p>
            <button
              className="kt-ghost"
              onClick={() => {
                stopClock();
                setActive(null);
                setPhase("try");
              }}
            >
              pause and explore
            </button>
          </>
        ) : (
          <>
            <span className="kt-badge">trailer + demo</span>
            <p>the launcher&apos;s trailer plays on this screen. when it stops, the screen is yours.</p>
          </>
        )}
      </div>

      <ol className="kt-rail" aria-label="trailer chapters">
        {CHAPTERS.map((c, i) => {
          const s = startOf(i);
          const fill = Math.max(0, Math.min(1, (t - s) / (c.end - s)));
          return (
            <li key={c.id} style={{ flexGrow: c.end - s }}>
              <button onClick={() => seek(i)} className={`${i === chIndex && phase !== "idle" ? "cur" : ""}${c.task ? " task" : ""}${doneTasks.includes(c.id) ? " did" : ""}`} aria-label={`play from ${c.title}`}>
                <span className="kt-track">
                  <span style={{ transform: `scaleX(${fill})` }} />
                </span>
                <small>
                  {c.task ? "✋ " : ""}
                  {c.title}
                </small>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
