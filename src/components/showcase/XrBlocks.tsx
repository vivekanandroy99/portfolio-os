"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accessibility, BookOpenCheck, Clapperboard, Gauge, Hand, Layers, LayoutGrid, MapPin, Puzzle, Ruler, ScanLine, Volume2,
  type LucideIcon,
} from "lucide-react";
import { MediaBar, ScrollStory, type Story } from "./AltbotBlocks";
import { usePauseOffscreen } from "./usePauseOffscreen";

/*
  The interactive parts of the xr bike showroom page. Every clip is a chapter of the project's own
  showcase film (C:\UNITY PROJECTS\XR Demo - Showcase content, 04-videos), cut where the narrator
  moves on, so each one carries its voice-over: the tripod view of the room on the left, what the
  headset sees on the right. Facts come from the xrDemoAltcore-UI project (docs, commits) and the
  content pack's showcase-content.md.
*/

const BASE = "/work/xr-bike-showroom";

type Step = { id: string; icon: LucideIcon; title: string; lead: string; note?: string; look?: string };

function story(steps: Step[]): Story[] {
  return steps.map((s) => ({
    key: s.id,
    src: () => `${BASE}/clips/${s.id}.jpg`,
    clip: () => `${BASE}/clips/${s.id}.mp4`,
    sound: true,
    alt: `the xr bike showroom: ${s.title}`,
    icon: s.icon,
    title: s.title,
    lead: s.lead,
    note: s.note,
    look: s.look,
  }));
}

/* ---------- in your room ---------- */

const ROOM: Step[] = [
  {
    id: "lifesize", icon: Ruler, title: "a real bike, in your real room",
    lead: "you keep seeing the room around you through the headset. the motorbike is placed into it at its true size, wheels on the floor.",
    note: "mixed reality, not virtual reality: next to real furniture and real people, the size of the bike reads at a glance.",
    look: "the small tripod view on the left: the room is empty, the bike only exists in the headset.",
  },
  {
    id: "qr", icon: ScanLine, title: "one printed code is the parking spot",
    lead: "look at a qr code on the floor and the bike lands on that exact spot, facing the right way. always life-size, whatever the code's size.",
    note: "no code? point at the floor and pinch. the headset also finds the real floor with its depth sensor, so it never gets stuck.",
  },
  {
    id: "lineup", icon: MapPin, title: "one spot holds the whole lineup",
    lead: "for a dealer with little floor space, one marked spot can show twelve bikes, one after another, in the same place every time.",
  },
];

export function XrRoom() {
  return <ScrollStory items={story(ROOM)} shape="wide" label="the bike in your room, step by step" topic="in your room" looks={false} />;
}

/* ---------- hands only ---------- */

const HANDS: Step[] = [
  {
    id: "palm", icon: Hand, title: "turn your palm up, the menu appears",
    lead: "no controllers to hand out, charge or explain. a menu opens beside your hand, with every bike as a card. touch one and it rolls onto the spot.",
    note: "palm-up is natural, and hard to set off by accident. the menu holds still while you press it.",
  },
  {
    id: "details", icon: LayoutGrid, title: "specs, story, and a turntable",
    lead: "each bike has a details page: power, top speed and weight as bars, the maker and year, and a few lines about it. turn the bike with the rotate buttons, or let it spin.",
    note: "every figure was researched with a source. a “≈” marks an estimate, like the motogp bike whose specs ducati never publishes.",
  },
  {
    id: "tutorial", icon: BookOpenCheck, title: "it teaches you by doing",
    lead: "the first time, a short tour shows one gesture at a time and waits until you've done it before moving on. skip it any time.",
    note: "seven steps: place, palm up, tap, turn, rev, take apart, pick up a part. the thing to tap glows.",
  },
];

export function XrHands() {
  return <ScrollStory items={story(HANDS)} shape="wide" label="using it with your hands" topic="hands only" looks={false} />;
}

/* ---------- rev it ---------- */

const REV: Step[] = [
  {
    id: "grip", icon: Gauge, title: "twist the throttle, like the real thing",
    lead: "reach out, take the right grip and roll your wrist back. the engine revs, the rear wheel spins and the exhaust smokes.",
    note: "only the right grip, only rolling toward you, like a real bike. the grip turns with your hand, and it rides out short hand-tracking dropouts.",
  },
  {
    id: "voice", icon: Volume2, title: "every engine has its own voice",
    lead: "each bike sounds like its real engine, and its dashboard comes alive: the needle climbs, the numbers rise, the redline flashes.",
    note: "the sounds aren't recordings. they're made live on the headset from each engine's layout. try them below.",
  },
];

export function XrRev() {
  return <ScrollStory items={story(REV)} shape="wide" label="revving the bike" topic="rev it" looks={false} />;
}

/* ---------- take it apart ---------- */

const APART: Step[] = [
  {
    id: "apart", icon: Layers, title: "take it apart, to understand it",
    lead: "one touch separates the bike into its real parts: wheels, brakes, engine, frame and bodywork, each floating in its place so you can walk around them.",
    note: "another touch and it all comes back together.",
  },
  {
    id: "parts", icon: Puzzle, title: "pick up any part",
    lead: "pinch a part, turn it in your hand, and a card tells you what it is and what it does. let go and it glides back.",
    note: "for a customer, it's the closest thing to looking under the skin before buying.",
    look: "the name cards: rear sprocket, front fork, instrument cluster, fuel tank.",
  },
];

export function XrApart() {
  return <ScrollStory items={story(APART)} shape="wide" label="taking the bike apart" topic="take it apart" looks={false} />;
}

/* ---------- first-timers ---------- */

const FIRST: Step[] = [
  {
    id: "firsttime", icon: Accessibility, title: "made for someone's first time in a headset",
    lead: "text big enough to read at arm's length, buttons big and far apart for an unsteady hand, and always a way back.",
    note: "because you never lose sight of the real room, it stays comfortable and safe, even for people who've never tried vr.",
  },
  {
    id: "film", icon: Clapperboard, title: "every bike carries its story",
    lead: "from the details page, the bike's own film opens on a big screen in your room. it follows you gently as you move, or you can pin it in place.",
    note: "the engine fades down while the film plays, and the sound comes from the screen.",
  },
];

export function XrFirst() {
  return <ScrollStory items={story(FIRST)} shape="wide" label="designed for first-timers" topic="universal design" looks={false} />;
}

/* ---------- engine sounds: tap a bike, hear its engine ---------- */

const ENGINES: { id: string; n: string; kind: string }[] = [
  { id: "yamaha-yzf-r1", n: "yamaha r1", kind: "crossplane four" },
  { id: "yamaha-yzf-r3", n: "yamaha r3", kind: "parallel twin" },
  { id: "yamaha-yzf-r6", n: "yamaha r6", kind: "screaming 600" },
  { id: "bmw-s1000rr", n: "bmw s1000rr", kind: "deep inline four" },
  { id: "bmw-k1600-gtl", n: "bmw k1600 gtl", kind: "inline six tourer" },
  { id: "honda-cbr600rr", n: "honda cbr600rr", kind: "high-revving 600" },
  { id: "suzuki-gsx-r600", n: "suzuki gsx-r600", kind: "inline four" },
  { id: "suzuki-gsx-750", n: "suzuki gsx-r750", kind: "inline four" },
  { id: "ducati-desmosedici-gp26", n: "ducati gp26", kind: "motogp v4" },
  { id: "ducati-streetfighter-v4-s", n: "ducati streetfighter", kind: "v4 naked" },
  { id: "kawasaki-ninja-h2", n: "kawasaki ninja h2", kind: "supercharged four" },
  { id: "italjet-dragster-300", n: "italjet dragster", kind: "scooter single" },
];

export function XrEngines() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [on, setOn] = useState<string | null>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const tick = () => setP(a.duration ? a.currentTime / a.duration : 0);
    const end = () => { setOn(null); setP(0); };
    a.addEventListener("timeupdate", tick);
    a.addEventListener("ended", end);
    return () => { a.removeEventListener("timeupdate", tick); a.removeEventListener("ended", end); };
  }, []);
  function play(id: string) {
    const a = audio.current;
    if (!a) return;
    if (on === id) { a.pause(); setOn(null); setP(0); return; }
    a.src = `${BASE}/engines/${id}.m4a`;
    a.currentTime = 0;
    a.play().catch(() => {});
    setOn(id);
  }
  return (
    <div className="xr-engines">
      <div className="xr-engines-head">
        <span className="xr-glyph" aria-hidden="true"><Volume2 /></span>
        <p><b>hear them for yourself.</b> each sample is idle, a full rev, throttle off with pops, a quick blip, idle. turn your sound on.</p>
      </div>
      <ul>
        {ENGINES.map((e) => (
          <li key={e.id}>
            <button type="button" className={on === e.id ? "on" : ""} onClick={() => play(e.id)} aria-pressed={on === e.id} data-label={on === e.id ? "stop" : "rev it"}>
              <span className="xr-rpm" aria-hidden="true"><i style={{ transform: `scaleX(${on === e.id ? Math.max(0.04, Math.sin(p * Math.PI) ** 0.6) : 0.04})` }} /></span>
              <b>{e.n}</b>
              <small>{e.kind}</small>
            </button>
          </li>
        ))}
      </ul>
      <audio ref={audio} preload="none" />
    </div>
  );
}

/* ---------- dashboards: every one drawn to match the real bike ---------- */

const DASHES = [
  { id: "bmw", t: "a real needle, swept", d: "on analog dials the real needle turns, using a calibration table read off the printed numbers." },
  { id: "suzuki", t: "red past the redline", d: "the dial's own red zone lights the needle's way up." },
  { id: "honda", t: "a digital strip, redrawn", d: "digital dashes are drawn to fit each bike's screen, in a font like the real one." },
  { id: "yamaha", t: "a colour sweep", d: "the r1's bar fills and turns red as you near the limit." },
];

export function XrDashes() {
  return (
    <ul className="xr-dashes">
      {DASHES.map((d) => (
        <li key={d.id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE}/dash-${d.id}.webp`} alt={`the ${d.id} dashboard at the redline`} loading="lazy" decoding="async" />
          <b>{d.t}</b>
          <small>{d.d}</small>
        </li>
      ))}
    </ul>
  );
}

/* ---------- the menu, round by round ---------- */

const MENUS = [
  { id: "menu-1-keys", t: "round 1", n: "3d keys on a tray", d: "physical-looking keys you press. fun, but the labels were hard to read in the headset." },
  { id: "menu-2-glass", t: "rounds 2 to 6", n: "frosted glass panel", d: "a light glass panel with cards, specs and a video page. text grew bigger and the spacing roomier each round." },
  { id: "menu-3-final", t: "round 7", n: "dark glass, orange accents", d: "dark see-through glass so the bike stays the brightest thing in the room. orange only on things you can touch." },
];

export function XrMenus() {
  const [i, setI] = useState(2);
  const m = MENUS[i];
  return (
    <div className="xr-menus">
      <div className="xr-menus-tabs" role="tablist" aria-label="menu rounds">
        {MENUS.map((x, k) => (
          <button key={x.id} role="tab" aria-selected={i === k} className={i === k ? "on" : ""} onClick={() => setI(k)} data-label={x.t}>
            <small>{x.t}</small>
            {x.n}
          </button>
        ))}
      </div>
      <figure className="xr-menus-shot" role="tabpanel">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={m.id} src={`${BASE}/${m.id}.webp`} alt={`the hand menu, ${m.t}: ${m.n}`} loading="lazy" decoding="async" />
        <figcaption>{m.d}</figcaption>
      </figure>
    </div>
  );
}

/* ---------- hero: the 60-second trailer (upright on phones) ---------- */

export function XrPromo() {
  const box = useRef<HTMLElement | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const [sound, setSound] = useState(false);
  const [tall, setTall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const f = () => setTall(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  function toggle() {
    const v = video.current;
    if (!v) return;
    const on = !sound;
    v.muted = !on;
    if (on && v.currentTime > 2 && v.paused) v.currentTime = 0;
    v.play().catch(() => {});
    setSound(on);
  }
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.play().catch(() => {});
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting && video.current) {
        video.current.muted = true;
        setSound(false);
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [tall]);
  const k = tall ? "tall" : "wide";
  return (
    <figure ref={box} className={`xr-promo ${k}`} aria-label="the 60-second trailer">
      <video key={k} ref={video} src={`${BASE}/trailer-${k}.mp4`} poster={`${BASE}/trailer-${k}.jpg`} muted loop playsInline preload="metadata" />
      <MediaBar on={sound} onToggle={toggle} find={() => video.current} track={`promo-${k}`} />
    </figure>
  );
}

/* ---------- the whole showcase film, with chapters ---------- */

const CHAPTERS: { at: number; n: string }[] = [
  { at: 0, n: "intro" },
  { at: 16.9, n: "life-size" },
  { at: 22.7, n: "qr placement" },
  { at: 52.3, n: "hand menu" },
  { at: 74.5, n: "tutorial" },
  { at: 86.4, n: "first-timers" },
  { at: 107.6, n: "rev it" },
  { at: 141.4, n: "take it apart" },
  { at: 179.2, n: "bike films" },
  { at: 191, n: "behind it" },
];
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function XrFilm() {
  const box = useRef<HTMLDivElement | null>(null);
  usePauseOffscreen(box);
  const video = useRef<HTMLVideoElement | null>(null);
  const [t, setT] = useState(0);
  const cur = CHAPTERS.reduce((a, c, i) => (t >= c.at ? i : a), 0);
  function go(at: number) {
    const v = video.current;
    if (!v) return;
    v.currentTime = at + 0.05;
    v.play().catch(() => {});
  }
  return (
    <div className="ab-film" ref={box}>
      <div className="ab-film-frame">
        <video ref={video} src={`${BASE}/film.mp4`} poster={`${BASE}/film.jpg`} controls playsInline preload="none" onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} />
      </div>
      <ol className="ab-film-chapters" aria-label="chapters">
        {CHAPTERS.map((c, i) => (
          <li key={c.n}>
            <button className={i === cur && t > 0 ? "on" : ""} onClick={() => go(c.at)}>
              <small>{fmt(c.at)}</small>
              {c.n}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* the making-of clip, on its own, for the behind-the-scenes section */
export function XrMaking() {
  const box = useRef<HTMLElement | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const [sound, setSound] = useState(false);
  usePauseOffscreen(box, () => setSound(false));
  return (
    <figure ref={box} className="xr-making">
      <video ref={video} src={`${BASE}/clips/making.mp4`} poster={`${BASE}/clips/making.jpg`} muted={!sound} loop playsInline preload="none" onClick={(e) => { const v = e.currentTarget; if (v.paused) v.play().catch(() => {}); else v.pause(); }} />
      <MediaBar on={sound} onToggle={() => { const v = video.current; if (!v) return; v.muted = sound; v.play().catch(() => {}); setSound(!sound); }} find={() => video.current} track="making" />
    </figure>
  );
}
