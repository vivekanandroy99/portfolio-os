"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/*
  The altbot page as blocks: every feature and every staff-menu page is a real screenshot of the app
  (frames taken from the showcase film, in both app themes). Tap a block to open the screen and read
  what it does. Facts come from the ChatbotAI repo and the film's own captions.
*/

export type Look = "dark" | "light";

/* one app-theme choice shared by every block on the page */
let current: Look = "dark";
const subs = new Set<() => void>();
const lookStore = {
  get: () => current,
  set: (l: Look) => {
    current = l;
    subs.forEach((f) => f());
  },
  sub: (f: () => void) => {
    subs.add(f);
    return () => {
      subs.delete(f);
    };
  },
};
function useAppLook(): [Look, (l: Look) => void] {
  return [useSyncExternalStore(lookStore.sub, lookStore.get, () => "dark" as Look), lookStore.set];
}

function LookSwitch() {
  const [look, set] = useAppLook();
  return (
    <div className="ab-seg" role="radiogroup" aria-label="app theme for the screenshots">
      <span>app theme</span>
      {(["dark", "light"] as const).map((l) => (
        <button key={l} role="radio" aria-checked={look === l} className={look === l ? "on" : ""} onClick={() => set(l)}>
          {l}
        </button>
      ))}
    </div>
  );
}

const shot = (kind: "f" | "p", id: string, look: Look) => `/work/altbot/shots/${kind}-${id}-${look}.webp`;

/* ---------- what it does: feature blocks ---------- */

type Feature = { id: string; n: string; title: string; line: string; how: string[]; design: string; size?: "wide" | "tall"; focus?: string };

const FEATURES: Feature[] = [
  {
    id: "talk", n: "01", title: "natural conversation", line: "ask anything about the company out loud. answered in seconds.", size: "wide",
    how: ["tap the mic, or switch on automatic listening and just talk.", "the answer is spoken sentence by sentence as it's written, so the first words start early.", "the question and the answer also show as text in the glass card."],
    design: "the card has a fixed height and the text scrolls inside it. an earlier version grew with the text and felt jumpy on a big screen.",
  },
  {
    id: "gate", n: "02", title: "a topic gate, not just a prompt", line: "off-topic? a friendly no. never an invented answer.",
    how: ["the question is matched against the bot's own documents before the ai is even called.", "the ai only sees the matching passages, and must answer from them or say it doesn't know.", "the reply is checked against the documents again before it's spoken."],
    design: "refusals are written lines in the character's voice that steer back to its topics. the ai never improvises a no.",
  },
  {
    id: "hindi", n: "03", title: "hindi and english", line: "it hears which language you spoke and replies in a natural indian voice.",
    how: ["hindi question, hindi answer. english question, english answer. hinglish works too.", "english words inside a hindi reply stay in english letters, the way people really talk.", "numbers, web addresses and brand names are respelled so the voice says them properly."],
    design: "hindi is everyday spoken hindi, not textbook hindi. bookish words are swapped for the ones people use.",
  },
  {
    id: "kinds", n: "04", title: "two kinds of bot", line: "strict company experts, or free-chat characters.", size: "tall", focus: "30% 30%",
    how: ["knowledge-only bots answer from documents and refuse the rest.", "open-chat bots talk about anything, in character, and remember the conversation.", "the memory clears when a new visitor walks up."],
    design: "the menu warns before a company bot is switched to open chat, because that's when it could start making things up.",
  },
  {
    id: "shows", n: "05", title: "it shows, not just tells", line: "slides, websites, photos and qr codes on its own screen.", size: "wide", focus: "20% 40%",
    how: ["a panel opens beside the character and the character steps aside to make room.", "“what can you show me?” lists everything as cards to tap.", "show requests are matched without the ai, in english or hindi, so the panel opens at once."],
    design: "only things the owner switched on can ever be shown.",
  },
  {
    id: "slides", n: "06", title: "presents slide decks", line: "explains every slide in its own words, then moves on by itself.", focus: "25% 50%",
    how: ["drop in a pdf or powerpoint file. the slides become pictures on the kiosk.", "“walk me through the brochure” starts the presentation.", "visitors can pause, go back or skip with big touch buttons."],
    design: "a deck is hidden until the owner allows it, so a private sales deck never ends up on a public screen.",
  },
  {
    id: "web", n: "07", title: "live websites", line: "a locked-down browser inside the kiosk.", focus: "25% 50%",
    how: ["“show me your website” opens the real page next to the character.", "only that site: no address bar, no downloads, no wandering off.", "cookies are cleared when it closes, so nothing carries over to the next visitor."],
    design: "the browser is its own small window laid exactly over the panel, so it looks like part of the app.",
  },
  {
    id: "photos", n: "08", title: "instant photo presentations", line: "built from the company's own website.", size: "wide", focus: "25% 45%",
    how: ["a one-time crawl collects the site's projects, with titles and photos.", "“show me your museum projects” becomes a set of photo cards it talks through.", "it only states facts found in the bot's documents. otherwise it reads the caption."],
    design: "no one has to make a presentation. the website the company already has is the content.",
  },
  {
    id: "qr", n: "09", title: "take it home", line: "qr codes for any page, or a whatsapp chat.", focus: "30% 50%",
    how: ["“send it to my phone” or “do you have whatsapp?” shows a qr code.", "the visitor scans it and carries on from their own phone.", "the qr code is drawn by the app itself, with no outside service."],
    design: "a kiosk conversation ends when the visitor walks away. this lets it continue.",
  },
  {
    id: "lead", n: "10", title: "lead capture", line: "a call-back form with its own touch keyboard.", focus: "25% 50%",
    how: ["“can someone call me back?” opens a short form.", "the on-screen keyboard comes with it. no hardware keyboard needed.", "staff see the requests in the menu, with the number the visitor left."],
    design: "three fields and one button. it only shows on bots where the owner switched it on.",
  },
  {
    id: "cast", n: "11", title: "six characters", line: "each with its own look, voice and personality.", size: "tall", focus: "20% 30%",
    how: ["two company experts, two free-chat characters, two for a second company.", "each speaks with one voice in both languages, so it sounds like one person.", "staff can make new bots in the app from an existing look."],
    design: "nods, smiles, brow raises and glances at the screen panel are driven by code, so they fit what's being said.",
  },
  {
    id: "shapes", n: "12", title: "every screen shape", line: "portrait kiosks, tvs, tablets and ultrawides.", size: "wide", focus: "50% 55%",
    how: ["tall screens get the chat card along the bottom; wide screens get it beside the character.", "text is sized from the screen's width, so a 4k portrait tv doesn't get giant letters.", "the camera reframes by itself when the shape changes."],
    design: "the main target is a portrait 2k or 4k tv. every layout was checked there first.",
  },
  {
    id: "debug", n: "13", title: "built-in diagnostics", line: "live timings and knowledge-gate scores.", focus: "15% 40%",
    how: ["one tap shows what it heard, what it asked the documents, and how each check scored.", "timings for reply ready, first sound and done.", "live lip-sync levels and the brain's own log lines."],
    design: "when a client says “it answered wrong yesterday”, the reason is on screen, not in a log file on someone's laptop.",
  },
  {
    id: "device", n: "14", title: "runs entirely on-device", line: "no cloud, no api keys, no data leaving the building.",
    how: ["hearing, thinking, speaking and lip-sync all run on the kiosk's own pc.", "it keeps working when the showroom wifi doesn't.", "an online edition exists for when a client wants more languages."],
    design: "offline came first. online is a set of separate switches, each with a local fallback.",
  },
];

function Frame({ src, alt, focus, eager }: { src: string; alt: string; focus?: string; eager?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" style={focus ? { objectPosition: focus } : undefined} />;
}

export function AltbotFeatures() {
  const [look] = useAppLook();
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement | null>(null);
  const [seen, setSeen] = useState<string[]>([]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
    if (open !== null) setSeen((s) => (s.includes(FEATURES[open].id) ? s : [...s, FEATURES[open].id]));
  }, [open]);

  const step = (by: number) => setOpen((o) => (o === null ? o : (o + by + FEATURES.length) % FEATURES.length));
  const f = open === null ? null : FEATURES[open];

  return (
    <div className="ab-blocks-wrap">
      <div className="ab-blocks-bar">
        <LookSwitch />
        <p>
          real screens from the app. tap any block to open it.
          <b>
            {" "}
            {seen.length}/{FEATURES.length} opened
          </b>
        </p>
      </div>
      <ul className="ab-blocks">
        {FEATURES.map((b, i) => (
          <li key={b.id} className={b.size ?? ""}>
            <button className={`ab-block${seen.includes(b.id) ? " seen" : ""}`} onClick={() => setOpen(i)} aria-haspopup="dialog" data-label="open">
              <span className="ab-block-shot">
                <Frame src={shot("f", b.id, look)} alt="" focus={b.focus} />
              </span>
              <span className="ab-block-copy">
                <small>{b.n}</small>
                <b>{b.title}</b>
                <span>{b.line}</span>
              </span>
              <i aria-hidden="true">+</i>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="ab-sheet"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setOpen(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        aria-label={f ? f.title : "feature"}
      >
        {f && (
          <div className="ab-sheet-in">
            <div className="ab-sheet-shot">
              <Frame src={shot("f", f.id, look)} alt={`the app showing: ${f.title}`} eager />
            </div>
            <div className="ab-sheet-copy">
              <small>
                {f.n} / {FEATURES.length}
              </small>
              <h3>{f.title}</h3>
              <p className="lead">{f.line}</p>
              <ul>
                {f.how.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="note">
                <span>design note</span>
                {f.design}
              </p>
              <div className="ab-sheet-nav">
                <button onClick={() => step(-1)} aria-label="previous feature">
                  ←
                </button>
                <button onClick={() => step(1)} className="next">
                  next: {FEATURES[((open ?? 0) + 1) % FEATURES.length].title} →
                </button>
                <LookSwitch />
              </div>
            </div>
            <button className="ab-sheet-x" onClick={() => setOpen(null)} aria-label="close">
              ×
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}

/* ---------- the staff menu: every page as a block ---------- */

type Page = { id: string; group: string; n: string; what: string; easy: string };
const PAGES: Page[] = [
  { id: "signin", group: "getting in", n: "staff sign-in", what: "the menu only opens with a username and password. visitors never reach a setting.", easy: "the on-screen keyboard appears by itself: no keyboard has to be plugged in." },
  { id: "menu", group: "getting in", n: "the menu", what: "everything staff can change, in one list: the bots, this bot's pages, visitors, devices, advanced.", easy: "one list, no nested maze. every change saves at once, so there's no save button to forget." },
  { id: "look", group: "this bot", n: "look & voice", what: "pick the character, its english and hindi voices, and how fast it speaks.", easy: "tap a voice to hear it before choosing. you judge by ear, not by a technical voice name." },
  { id: "personality", group: "this bot", n: "personality", what: "its name, its topics, who it is and how it should talk.", easy: "every text box has speak and keyboard buttons: say it out loud instead of typing on glass." },
  { id: "documents", group: "this bot", n: "documents", what: "the files the bot answers from. add or remove a pdf, word or powerpoint file and it relearns by itself.", easy: "it uses the normal windows file picker staff already know. removed files go to the recycle bin." },
  { id: "media", group: "this bot", n: "screen & media", what: "what the bot may show beside itself: slide decks, pictures, videos, websites.", easy: "nothing appears on the public screen until the owner allows each one." },
  { id: "lighting", group: "this bot", n: "lighting", what: "named looks (natural, soft, bright, dramatic, warm, cool, glow) plus brightness and direction.", easy: "the menu sits to the side, so you watch the character change while you drag." },
  { id: "learning", group: "visitors", n: "questions & answers", what: "what visitors asked that the documents couldn't answer. tap one to teach the bot the answer.", easy: "the owner stays in charge: nothing is learnt without a person approving it." },
  { id: "report", group: "visitors", n: "report", what: "how busy the kiosk was and what share was answered from the documents, day by day. exports to excel.", easy: "plain counts and one percentage, not a dashboard to decode." },
  { id: "display", group: "this screen", n: "display & performance", what: "light or dark, the premium look, background blur, edge smoothing, 3d detail.", easy: "every switch and slider has a line under it saying what it does, in plain words." },
  { id: "listening", group: "visitors", n: "listening & language", what: "tap-to-talk or automatic listening, how long to wait, and a filter for background noise.", easy: "with automatic listening a visitor never has to find a button. the noise filter is for loud showrooms." },
  { id: "sound", group: "this screen", n: "voice & sound", what: "the app's own volume and how much speech to buffer before a sentence starts.", easy: "louder for a busy floor, without opening windows settings." },
  { id: "models", group: "advanced", n: "ai models", what: "the ai parts on this pc, and the optional online brain, voice and ears, each with its own switch.", easy: "already set up, and it says so. nobody breaks it by exploring." },
  { id: "staff", group: "advanced", n: "staff accounts", what: "who can open the menu. add a person, change a password.", easy: "done on the kiosk itself by the owner, without an it ticket." },
  { id: "help", group: "help", n: "help & guides", what: "a short guide for every page, with a picture of that page and numbered markers on the things it talks about.", easy: "a ? sits in the corner of every page and opens that page's guide." },
  { id: "keyboard", group: "for visitors", n: "type instead of talking", what: "visitors can type on an on-screen keyboard instead of speaking, and every answer is shown as text too.", easy: "for people who can't or won't speak to a machine, and people who can't hear it well." },
];

const PRINCIPLES = [
  { t: "touch only", b: "built for big touch screens with no mouse, wheel or keyboard: large targets, swipe scrolling, a visible scrollbar, its own on-screen keyboard." },
  { t: "plain words", b: "one line of everyday english under every setting. model names and jargon stay in advanced." },
  { t: "see it as you change it", b: "the character stays visible beside the menu, so lighting, camera and voice changes are judged live." },
  { t: "hard to break", b: "changes save at once, reset is one tap, deleted things go to the recycle bin, risky pages say they're rarely needed." },
  { t: "help in place", b: "a guide per page with numbered pictures, plus a pdf staff manual made from the same screens." },
  { t: "more than one way", b: "speak or type to fill a text box. visitors can talk, tap or type, and always get the answer as text and voice." },
];

export function AltbotStaffBlocks() {
  const [look] = useAppLook();
  const [cur, setCur] = useState(1);
  const [seen, setSeen] = useState<number[]>([1]);
  const page = PAGES[cur];
  const pick = (i: number) => {
    setCur(i);
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
  };

  return (
    <div className="ab-menu">
      <div className="ab-blocks-bar">
        <LookSwitch />
        <p>
          the real menu, page by page. tap a page.
          <b>
            {" "}
            {seen.length}/{PAGES.length} seen
          </b>
        </p>
      </div>
      <div className="ab-menu-grid">
        <ol className="ab-menu-tiles" aria-label="menu pages">
          {PAGES.map((p, i) => (
            <li key={p.id}>
              <button className={`${i === cur ? "on" : ""}${seen.includes(i) ? " seen" : ""}`} onClick={() => pick(i)} aria-current={i === cur}>
                <span className="thumb">
                  <Frame src={shot("p", p.id, look)} alt="" />
                </span>
                <small>{p.group}</small>
                <b>{p.n}</b>
              </button>
            </li>
          ))}
        </ol>

        <div className="ab-menu-detail" aria-live="polite">
          <figure className="ab-menu-panel" key={page.id + look}>
            <Frame src={shot("p", page.id, look)} alt={`the ${page.n} page of the staff menu`} eager />
          </figure>
          <div className="ab-menu-copy">
            <small>
              {page.group} · page {cur + 1} of {PAGES.length}
            </small>
            <h3>{page.n}</h3>
            <p>{page.what}</p>
            <p className="note">
              <span>why it&apos;s easy</span>
              {page.easy}
            </p>
            <div className="ab-sheet-nav">
              <button onClick={() => pick((cur - 1 + PAGES.length) % PAGES.length)} aria-label="previous page">
                ←
              </button>
              <button onClick={() => pick((cur + 1) % PAGES.length)} className="next">
                next: {PAGES[(cur + 1) % PAGES.length].n} →
              </button>
            </div>
          </div>
        </div>
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

/* ---------- hero: the 1-minute promo on the portrait screen ---------- */

export function AltbotPromo() {
  const video = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  function sound() {
    const v = video.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    if (!next) v.currentTime = 0;
    v.play().catch(() => {});
    setMuted(next);
  }
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.current?.play().catch(() => {});
  }, []);
  return (
    <figure className="ab-tv" aria-label="altbot's one-minute promo, on a portrait screen">
      <video ref={video} src="/work/altbot/promo-portrait.mp4" poster="/work/altbot/promo-portrait.jpg" muted loop playsInline preload="metadata" onClick={sound} />
      <button className="ab-tv-sound" onClick={sound} data-label={muted ? "sound on" : "mute"}>
        {muted ? "🔇 play with sound" : "🔊 sound on"}
      </button>
    </figure>
  );
}
