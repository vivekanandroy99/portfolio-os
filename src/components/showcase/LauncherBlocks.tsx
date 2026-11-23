"use client";

import { useEffect, useRef, useState } from "react";
import {
  AppWindow, Cloud, CloudDownload, FolderLock, Hand, Joystick, KeyRound, LayoutGrid, LifeBuoy, Lock, Monitor,
  MonitorSmartphone, PlusSquare, RefreshCw, ShieldCheck, Tv, type LucideIcon,
} from "lucide-react";
import { MediaBar, ScrollStory, type Story } from "./AltbotBlocks";
import { usePauseOffscreen } from "./usePauseOffscreen";

/*
  The interactive parts of the kiosk launcher page. Every clip is a chapter of the launcher's own
  trailer (C:\MASTER LAUNCHER\Trailer build, female voice), cut where the narrator moves on, so each
  one carries its own voice-over. Facts come from the altcore-master-launcher repo (MEMORY.md).
*/

const BASE = "/work/kiosk-launcher";

type Step = { id: string; icon: LucideIcon; title: string; lead: string; note?: string; look?: string };

function story(steps: Step[]): Story[] {
  return steps.map((s) => ({
    key: s.id,
    src: () => `${BASE}/clips/${s.id}.jpg`,
    clip: () => `${BASE}/clips/${s.id}.mp4`,
    sound: true,
    alt: `the launcher: ${s.title}`,
    icon: s.icon,
    title: s.title,
    lead: s.lead,
    note: s.note,
    look: s.look,
  }));
}

/* ---------- for visitors: the showroom floor ---------- */

const FLOOR: Step[] = [
  {
    id: "library", icon: LayoutGrid, title: "every app, one tap",
    lead: "games, 3d walkthroughs, websites and web apps all sit in one library. tap one and it runs.",
    note: "visitors never need to know what an app was made with. a unity game and a website start the same way.",
  },
  {
    id: "browse", icon: AppWindow, title: "sorted, with a story each",
    lead: "apps are grouped into categories, each with a big preview and a few lines about it.",
    note: "two layouts: a calm showcase with one big app, or a gallery to swipe through. each person picks the one they like.",
  },
  {
    id: "kiosk", icon: Lock, title: "the pc belongs to the launcher",
    lead: "in kiosk mode there's no desktop, no taskbar, no alt+tab and no swiping out. visitors only see the apps.",
    note: "if the launcher ever crashes three times in a row, the pc falls back to the normal desktop, so nobody gets stuck.",
  },
  {
    id: "pin", icon: KeyRound, title: "staff can always get back in",
    lead: "press and hold the logo, type a hidden pin, then choose where to go.",
    note: "it all works by touch alone. the hold is 5 seconds: 3 was too easy to set off by accident during testing.",
    look: "the three choices after the pin.",
  },
  {
    id: "bigpicture", icon: Tv, title: "big picture: like a games console",
    lead: "one step further, the launcher replaces the windows desktop altogether.",
    note: "the pc starts straight into the launcher. the brand is the first and only thing anyone sees.",
  },
];

export function LauncherFloor() {
  return <ScrollStory items={story(FLOOR)} shape="wide" label="the launcher on the showroom floor, step by step" topic="on the showroom floor" looks={false} />;
}

/* ---------- many screens ---------- */

const SCREENS: Step[] = [
  {
    id: "screens", icon: MonitorSmartphone, title: "built for rooms with many screens",
    lead: "a projector, a tall totem and a touch table can all run from one pc. each app opens where it belongs, or is mirrored on all of them.",
    note: "this came straight from a real showroom with three displays at once.",
    look: "the labels: projection wall, portrait screen, touch table.",
  },
  {
    id: "naming", icon: Monitor, title: "every screen gets a name",
    lead: "“projector” or “touch table” instead of “display 2”. tap identify and each screen shows its number.",
    note: "staff think in rooms and walls, not in windows display numbers.",
  },
  {
    id: "perapp", icon: AppWindow, title: "pick a screen for each app",
    lead: "each app remembers its screen. screens with nothing on them show a branded cover.",
    note: "a cover means nobody can reach windows on a screen that's sitting idle.",
  },
];

export function LauncherScreens() {
  return <ScrollStory items={story(SCREENS)} shape="wide" label="running several screens at once" topic="many screens" looks={false} />;
}

/* ---------- for staff ---------- */

const STAFF: Step[] = [
  {
    id: "touch", icon: Hand, title: "touch first",
    lead: "kiosks rarely have a keyboard, so everything works by finger. when typing is needed, a keyboard appears on screen.",
    note: "big buttons, no hover-only tricks, and nothing that needs a keyboard shortcut.",
  },
  {
    id: "help", icon: LifeBuoy, title: "help on every page",
    lead: "tap the question mark and a short guide opens, with numbered pictures of that exact screen.",
    note: "there's also a 64-page pdf manual. staff shouldn't have to call someone to add an app.",
  },
  {
    id: "addlocal", icon: PlusSquare, title: "adding an app takes a minute",
    lead: "pick a program, a website or a web app with its own server. add a picture, a preview video and a category. done.",
    note: "the version and size are read for you. no picture? it makes one.",
  },
];

export function LauncherStaff() {
  return <ScrollStory items={story(STAFF)} shape="wide" label="what it's like for the staff" topic="for the staff" looks={false} />;
}

/* ---------- the cloud and safety ---------- */

const CLOUD: Step[] = [
  {
    id: "cloud", icon: Cloud, title: "one place for every pc",
    lead: "people, their roles and every pc live in one web portal. a pc can be locked from anywhere.",
    note: "each person only sees the apps given to them. launchers check in about every 30 minutes.",
  },
  {
    id: "upload", icon: CloudDownload, title: "upload once, every pc gets it",
    lead: "apps are uploaded once, from the launcher or the web. pcs download them, pause, resume, and only fetch what changed.",
    note: "no more walking to each pc with a usb stick.",
  },
  {
    id: "updates", icon: RefreshCw, title: "it updates itself",
    lead: "new versions of the launcher arrive on their own: signed, checked, then installed.",
    note: "a launcher refuses any update that isn't signed with altcore's own key.",
  },
  {
    id: "security", icon: ShieldCheck, title: "safe in every layer",
    lead: "passwords and the pin are scrambled and only checked deep inside the app. websites run sealed off from the pc.",
    note: "every account has an offline licence, so the launcher works without internet, and a pc that goes missing simply stops.",
  },
  {
    id: "vault", icon: FolderLock, title: "apps can't be copied",
    lead: "apps are stored encrypted and played from a hidden drive that only the app can see. copy the folder and you get noise.",
    look: "explorer, command prompt and copy tools all being refused.",
  },
  {
    id: "pass", icon: Joystick, title: "games carry a play pass",
    lead: "unity and unreal games check for a signed pass before they start. move one to another pc and it won't open.",
    note: "i wrote small add-ons for both game engines so the game itself does the check.",
  },
];

export function LauncherCloud() {
  return <ScrollStory items={story(CLOUD)} shape="wide" label="the cloud behind it, and how apps stay safe" topic="behind the scenes" looks={false} />;
}

/* ---------- hero: the 70-second cut ---------- */

export function LauncherPromo() {
  const box = useRef<HTMLElement | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const [sound, setSound] = useState(false);
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
  }, []);
  return (
    <figure ref={box} className="lc-promo" aria-label="the launcher's 70-second film">
      <video ref={video} src={`${BASE}/short.mp4`} poster={`${BASE}/short.jpg`} muted loop playsInline preload="metadata" />
      <MediaBar on={sound} onToggle={toggle} find={() => video.current} track="promo" />
    </figure>
  );
}

/* ---------- the whole trailer, with chapters ---------- */

const CHAPTERS: { at: number; n: string }[] = [
  { at: 0, n: "intro" },
  { at: 11.5, n: "the library" },
  { at: 29.4, n: "kiosk mode" },
  { at: 38.7, n: "staff pin" },
  { at: 46.1, n: "big picture" },
  { at: 55.6, n: "many screens" },
  { at: 82.8, n: "touch + keyboard" },
  { at: 91.4, n: "help" },
  { at: 102.1, n: "adding an app" },
  { at: 113.8, n: "the cloud" },
  { at: 132.9, n: "updates" },
  { at: 139.5, n: "security" },
  { at: 156.7, n: "encrypted apps" },
  { at: 168.5, n: "play pass" },
];
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export function LauncherFilm() {
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
        <video ref={video} src={`${BASE}/trailer.mp4`} poster={`${BASE}/trailer.jpg`} controls playsInline preload="none" onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} />
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
