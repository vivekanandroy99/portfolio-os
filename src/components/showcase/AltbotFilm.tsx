"use client";

import { useEffect, useRef, useState } from "react";

/*
  The real altbot showcase film (light + dark cuts, 5 min) and the staff-menu tour that plays the
  admin-panel part of the same film. Chapter and page times were read off the film itself.
*/

type Look = "dark" | "light";
const SRC: Record<Look, string> = { dark: "/work/altbot/showcase-dark.mp4", light: "/work/altbot/showcase-light.mp4" };
const POSTER: Record<Look, string> = { dark: "/work/altbot/showcase-dark.jpg", light: "/work/altbot/showcase-light.jpg" };

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function LookSwitch({ look, set }: { look: Look; set: (l: Look) => void }) {
  return (
    <div className="ab-seg" role="radiogroup" aria-label="which cut of the film">
      <span>app theme</span>
      {(["dark", "light"] as const).map((l) => (
        <button key={l} role="radio" aria-checked={look === l} className={look === l ? "on" : ""} onClick={() => set(l)}>
          {l}
        </button>
      ))}
    </div>
  );
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
  { at: { light: 46.5, dark: 46.3 }, n: "natural conversation" },
  { at: { light: 64.3, dark: 60 }, n: "the topic gate" },
  { at: { light: 71.2, dark: 65 }, n: "hindi + english" },
  { at: { light: 79.6, dark: 73.3 }, n: "two kinds of bot" },
  { at: { light: 93.4, dark: 85 }, n: "shows, not just tells" },
  { at: { light: 98.2, dark: 87.8 }, n: "slide decks" },
  { at: { light: 111.4, dark: 97.2 }, n: "live websites" },
  { at: { light: 118.8, dark: 104.6 }, n: "photo presentations" },
  { at: { light: 130.2, dark: 115.8 }, n: "take it home (qr)" },
  { at: { light: 136.1, dark: 121.5 }, n: "lead capture" },
  { at: { light: 142.3, dark: 128.9 }, n: "six characters" },
  { at: { light: 153, dark: 138.8 }, n: "every screen shape" },
  { at: { light: 158, dark: 144.5 }, n: "the staff menu" },
  { at: { light: 245.3, dark: 229.7 }, n: "diagnostics" },
  { at: { light: 264.5, dark: 240.0 }, n: "under the hood" },
  { at: { light: 289, dark: 264.5 }, n: "on-device" },
];

export function AltbotFilm() {
  const video = useRef<HTMLVideoElement | null>(null);
  const [t, setT] = useState(0);
  const { look, set, onLoaded } = useLook(video, CHAPTERS, setT);
  const cur = idx(CHAPTERS, look, t);

  function go(at: number) {
    const v = video.current;
    if (!v) return;
    v.currentTime = at + 0.05;
    v.play().catch(() => {});
  }

  return (
    <div className="ab-film">
      <div className="ab-film-bar">
        <LookSwitch look={look} set={set} />
        <p>the app in its own words, recorded from the real build. both themes ship in the app.</p>
      </div>
      <div className="ab-film-frame">
        <video ref={video} key={look} src={SRC[look]} poster={POSTER[look]} controls playsInline preload="none" onLoadedMetadata={onLoaded} onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} />
      </div>
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
    </div>
  );
}

/* ---------- the staff menu, page by page ---------- */

const TOUR: Record<Look, [number, number]> = { light: [158, 245.2], dark: [144.5, 229.5] };

type Page = { at: Record<Look, number>; group: string; n: string; what: string; a11y: string };
const PAGES: Page[] = [
  { at: { light: 158, dark: 144.5 }, group: "getting in", n: "staff sign-in", what: "the menu only opens with a username and password. visitors never reach a setting.", a11y: "the on-screen keyboard appears by itself: no keyboard has to be plugged in." },
  { at: { light: 167.1, dark: 152.5 }, group: "getting in", n: "the menu", what: "everything staff can change, in one list: the bots, this bot's pages, visitors, devices, advanced.", a11y: "one list, no nested maze. every change saves at once, so there's no save button to forget." },
  { at: { light: 173.3, dark: 158.7 }, group: "this bot", n: "look & voice", what: "pick the character, its english and hindi voices, and how fast it speaks.", a11y: "tap a voice to hear it before choosing. you judge by ear, not by a name like af_heart." },
  { at: { light: 179.2, dark: 164.3 }, group: "this bot", n: "personality", what: "its name, who it is, what it should always or never do.", a11y: "every text box has speak and keyboard buttons: say it out loud instead of typing on glass." },
  { at: { light: 183.5, dark: 168.3 }, group: "this bot", n: "documents", what: "the files the bot answers from. add or remove a pdf, word or powerpoint file and it relearns by itself.", a11y: "uses the normal windows file picker staff already know; removed files go to the recycle bin, not gone forever." },
  { at: { light: 189.4, dark: 173.9 }, group: "this bot", n: "screen & media", what: "what the bot may show beside itself: slide decks, pictures, videos, websites, qr codes.", a11y: "nothing appears on the public screen until the owner allows each one." },
  { at: { light: 193.9, dark: 178.2 }, group: "this bot", n: "lighting", what: "named looks (natural, soft, bright, dramatic…) plus brightness and direction.", a11y: "the menu sits to the side, so you watch the character change while you drag. no guess, apply, check." },
  { at: { light: 199.6, dark: 183.9 }, group: "visitors", n: "questions & answers", what: "what visitors asked that the documents couldn't answer. tap one to teach the bot the answer.", a11y: "the owner stays in charge: nothing is learnt without a person approving it." },
  { at: { light: 204.8, dark: 189.0 }, group: "visitors", n: "report", what: "how busy the kiosk was, what share was answered from the documents, day by day. exports to excel.", a11y: "plain counts and one percentage, not a dashboard to decode." },
  { at: { light: 208.9, dark: 193.5 }, group: "this screen", n: "display & performance", what: "light or dark, the premium look, blur, edge smoothing, 3d detail.", a11y: "every slider has one line under it saying what it does, in plain words. light and dark for bright shop floors or dim halls." },
  { at: { light: 218.5, dark: 203.1 }, group: "visitors", n: "listening & language", what: "tap-to-talk or automatic listening, how long to wait, the noise filter, which languages it hears.", a11y: "automatic listening means a visitor never has to find a button. the noise filter is for loud showrooms." },
  { at: { light: 223.5, dark: 208.2 }, group: "this screen", n: "voice & sound", what: "the app's own volume and how much speech to buffer before a sentence starts.", a11y: "louder for a busy floor, without touching windows settings." },
  { at: { light: 226.8, dark: 211.4 }, group: "advanced", n: "ai models", what: "the ai parts on this pc, and the optional online brain, voice and ears, each with its own switch.", a11y: "already set up, and it says so: \"change only if told to\". nobody breaks it by exploring." },
  { at: { light: 231.8, dark: 216.0 }, group: "advanced", n: "staff accounts", what: "who can open the menu. add a person, change a password.", a11y: "done on the kiosk itself, by the owner, without an it ticket." },
  { at: { light: 235.4, dark: 219.8 }, group: "help", n: "help & guides", what: "a short guide for every page, with a picture of that page and numbered markers on the things it talks about.", a11y: "a ? sits in the corner of every page and opens that page's guide. help is where the question happens." },
  { at: { light: 238.2, dark: 222.6 }, group: "for visitors", n: "type instead of talking", what: "visitors can type on an on-screen keyboard instead of speaking, and every answer is shown as text too.", a11y: "for people who can't or won't speak to a machine, and people who can't hear it well." },
];

const PRINCIPLES = [
  { t: "touch only", b: "built for big touch screens with no mouse, wheel or keyboard: large targets, swipe scrolling, a visible scrollbar, its own on-screen keyboard." },
  { t: "plain words", b: "one line of everyday english under every setting. no model names or jargon unless you open advanced." },
  { t: "see it as you change it", b: "the character stays visible beside the menu, so lighting, camera and voice changes are judged live." },
  { t: "hard to break", b: "changes save at once, reset is one tap, deleted things go to the recycle bin, risky pages say \"rarely needed\"." },
  { t: "help in place", b: "a guide per page with numbered pictures, plus a pdf staff manual made from the same screens." },
  { t: "more than one way", b: "speak or type to fill a text box; visitors can talk, tap or type, and always get the answer as text and voice." },
];

export function AltbotStaffMenu() {
  const video = useRef<HTMLVideoElement | null>(null);
  const wrap = useRef<HTMLDivElement | null>(null);
  const list = useRef<HTMLOListElement | null>(null);
  const [t, setT] = useState(TOUR.dark[0]);
  const { look, set, onLoaded } = useLook(video, PAGES, setT);
  const [START, END] = TOUR[look];
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const cur = idx(PAGES, look, t);

  // play (muted) while it's on screen, unless the visitor prefers less motion
  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = video.current;
        if (!v) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // keep the current page in view inside the list (never scrolls the page itself)
  useEffect(() => {
    const ol = list.current;
    const li = ol?.children[cur] as HTMLElement | undefined;
    if (!ol || !li || ol.scrollHeight <= ol.clientHeight) return;
    ol.scrollTo({ top: li.offsetTop - ol.clientHeight / 2 + li.clientHeight / 2, behavior: "smooth" });
  }, [cur]);

  function onTime(v: HTMLVideoElement) {
    if (v.currentTime < START - 0.3 || v.currentTime >= END) v.currentTime = START;
    setT(v.currentTime);
  }
  function go(at: number) {
    const v = video.current;
    if (!v) return;
    v.currentTime = at + 0.4;
    setT(at + 0.4);
    v.play().catch(() => {});
  }
  function toggle() {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  const page = PAGES[cur];
  const progress = (t - START) / (END - START);

  return (
    <div className="ab-staff">
      <div className="ab-staff-grid">
        <div className="ab-staff-stage" ref={wrap}>
          <div className="ab-film-bar">
            <LookSwitch look={look} set={set} />
          </div>
          <div className="ab-film-frame">
            <video
              ref={video}
              key={look}
              src={`${SRC[look]}#t=${START}`}
              poster={look === "dark" ? "/work/altbot/staff-dark.jpg" : "/work/altbot/staff-light.jpg"}
              muted
              playsInline
              preload="none"
              onLoadedMetadata={(e) => {
                if (!started) e.currentTarget.currentTime = START;
                setStarted(true);
                onLoaded();
              }}
              onTimeUpdate={(e) => onTime(e.currentTarget)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onClick={toggle}
            />
            <button className="ab-staff-pp" onClick={toggle} aria-label={playing ? "pause the tour" : "play the tour"}>
              {playing ? "❚❚" : "▶"}
            </button>
            <span className="ab-staff-bar" aria-hidden="true">
              <span style={{ transform: `scaleX(${Math.max(0, Math.min(1, progress))})` }} />
            </span>
          </div>
          <div className="ab-staff-now" aria-live="polite">
            <small>
              {page.group} · page {cur + 1} of {PAGES.length}
            </small>
            <b>{page.n}</b>
            <p>{page.what}</p>
            <p className="a11y">
              <span>why it&apos;s easy</span>
              {page.a11y}
            </p>
          </div>
        </div>

        <ol className="ab-staff-pages" ref={list} aria-label="menu pages, tap to jump">
          {PAGES.map((p, i) => (
            <li key={p.n}>
              <button className={i === cur ? "on" : ""} onClick={() => go(p.at[look])} aria-current={i === cur}>
                <small>{p.group}</small>
                {p.n}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <ul className="ab-staff-rules">
        {PRINCIPLES.map((p) => (
          <li key={p.t}>
            <h3>{p.t}</h3>
            <p>{p.b}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
