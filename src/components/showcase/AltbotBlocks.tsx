"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  AudioLines, Brain, Bug, ChartColumn, CircleHelp, Cloud, CloudOff, Cpu, FileSearch, FileText, Globe, GraduationCap, HardDrive, Images, Keyboard, Languages,
  LayoutList, Lightbulb, LogIn, MessageSquareText, MessagesSquare, Mic, Monitor, Moon, Sun, MonitorPlay, PhoneCall, Presentation, Proportions, QrCode, Send, ShieldCheck, Smile, Users, UserRound, Volume2, VolumeX,
  type LucideIcon,
} from "lucide-react";

/*
  The interactive parts of the altbot page. Every feature and every staff-menu page is a real
  screenshot of the app (frames from the showcase film, in both app themes). Facts come from the
  ChatbotAI repo and the film's own captions. Icons: lucide (ISC licence).
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

/* a quiet theme toggle: two small icons, not a big pill */
export function ThemeToggle({ look, set, label = "app theme" }: { look: Look; set: (l: Look) => void; label?: string }) {
  return (
    <div className="ab-theme" role="radiogroup" aria-label={label}>
      {(["dark", "light"] as const).map((l) => (
        <button key={l} role="radio" aria-checked={look === l} aria-label={`${l} app theme`} className={look === l ? "on" : ""} onClick={() => set(l)} data-label={l}>
          {l === "dark" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}
function LookSwitch() {
  const [look, set] = useAppLook();
  return <ThemeToggle look={look} set={set} label="app theme for the screenshots" />;
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

const F_ICON: Record<string, LucideIcon> = {
  talk: MessagesSquare, gate: ShieldCheck, hindi: Languages, kinds: Users, shows: MonitorPlay, slides: Presentation, web: Globe,
  photos: Images, qr: QrCode, lead: PhoneCall, cast: Smile, shapes: Proportions, debug: Bug, device: HardDrive,
};
function Frame({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

/* ---------- scroll story: the screen stays put, the text scrolls past it ---------- */

type Story = { key: string; src: (l: Look) => string; clip?: (l: Look) => string; alt: string; icon: LucideIcon; title: string; lead: string; note?: string; portrait?: boolean; sound?: boolean };

/* a short silent loop from the film; only the clip in view plays */
function Clip({ src, poster, label, active, muted = true }: { src: string; poster: string; label: string; active: boolean; muted?: boolean }) {
  const v = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    // hidden copies (the phone card on desktop, the pinned screen on phones) stay paused
    if (active && el.offsetParent !== null && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.play().catch(() => {});
    else el.pause();
  }, [active, src]);
  useEffect(() => {
    if (v.current) v.current.muted = muted;
  }, [muted]);
  return <video ref={v} src={src} poster={poster} muted loop playsInline preload={active ? "auto" : "none"} aria-label={label} />;
}

/* sound stays off until the visitor asks for it */
function SoundButton({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  const Icon = on ? Volume2 : VolumeX;
  return (
    <button type="button" className={`ab-sound${on ? " on" : ""}`} onClick={onToggle} aria-pressed={on} aria-label={on ? "turn the sound off" : "turn the sound on"}>
      <Icon aria-hidden="true" />
      <span>{on ? "sound on" : "sound off"}</span>
    </button>
  );
}

function ScrollStory({ items, shape, label }: { items: Story[]; shape: "wide" | "tall"; label: string }) {
  const [look] = useAppLook();
  const [cur, setCur] = useState(0);
  const [sound, setSound] = useState(false);
  const [seen, setSeen] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  // upright clips: the screen stays where it is and the text slides over to sit beside it
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const measure = () => {
      const stage = el.querySelector<HTMLElement>(".ab-story-stage");
      const shot = el.querySelector<HTMLElement>(".ab-story-shot");
      if (!stage || !shot) return;
      const h = window.innerHeight - 56 - 120;
      const pw = (h * 9) / 16;
      const sw = stage.getBoundingClientRect().width;
      el.style.setProperty("--shift", `${Math.max(0, sw / 2 - pw / 2)}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // snapping: when scrolling stops, the nearest step glides to the middle of the screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let t = 0;
    let gliding = false;
    const settle = () => {
      if (window.innerWidth <= 900) return;
      const mid = 56 + (window.innerHeight - 56) / 2;
      const box = el.getBoundingClientRect();
      if (box.top > mid || box.bottom < mid) return;
      let best = 0;
      let bestD = Infinity;
      steps.current.forEach((li) => {
        if (!li) return;
        const r = li.getBoundingClientRect();
        const d = r.top + r.height / 2 - mid;
        if (Math.abs(d) < Math.abs(bestD)) {
          bestD = d;
          best = 1;
        }
      });
      if (!best || Math.abs(bestD) < 3 || Math.abs(bestD) > window.innerHeight * 0.6) return;
      gliding = true;
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollBy({ top: bestD, behavior: smooth ? "smooth" : "auto" });
    };
    const onScroll = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        if (gliding) {
          gliding = false;
          return;
        }
        settle();
      }, 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
    };
  }, []);

  // nothing plays (or talks) once the story is scrolled out of view
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ordinary page scrolling drives it: the step crossing the middle of the screen is the current one
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCur(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const it = items[cur];
  return (
    <div ref={root} className={`ab-story ${shape}`} aria-label={label}>
      <div className="ab-story-stage">
        <div className="ab-story-sticky">
          <figure className={`ab-story-shot${it?.portrait ? " port" : ""}`}>
            {items.map((x, i) => (
              x.clip ? (
                <Clip key={x.key + look} src={x.clip(look)} poster={x.src(look)} label={x.alt} active={seen && i === cur} muted={!sound} />
              ) : (
                <Frame key={x.key + look} src={x.src(look)} alt={i === cur ? x.alt : ""} eager={i < 2} />
              )
            )).map((img, i) => (
              <span key={i} className={i === cur ? "on" : ""} aria-hidden={i !== cur}>
                {img}
              </span>
            ))}
            {it?.sound && <SoundButton on={sound} onToggle={() => setSound((m) => !m)} />}
          </figure>
          <div className="ab-story-foot">
            <span className="ab-story-count">
              {String(cur + 1).padStart(2, "0")} <i>/ {items.length}</i>
            </span>
            <span className="ab-story-bar" aria-hidden="true">
              <i style={{ transform: `scaleX(${(cur + 1) / items.length})` }} />
            </span>
            <LookSwitch />
          </div>
        </div>
      </div>

      <ol className="ab-story-steps">
        {items.map((x, i) => {
          const Icon = x.icon;
          return (
            <li
              key={x.key}
              data-i={i}
              className={`${i === cur ? "on" : ""}${x.portrait ? " port" : ""}`}
              ref={(el) => {
                steps.current[i] = el;
              }}
            >
              {/* phones and tablets: each step carries its own screen */}
              <figure className={`ab-story-inline${x.portrait ? " port" : ""}`}>
                {x.clip ? <Clip src={x.clip(look)} poster={x.src(look)} label={x.alt} active={seen && i === cur} muted={!sound} /> : <Frame src={x.src(look)} alt={x.alt} />}
                {x.sound && <SoundButton on={sound} onToggle={() => setSound((m) => !m)} />}
              </figure>
              <div className="ab-story-copy">
                <span className="ab-ico">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{x.title}</h3>
                <p className="lead">{x.lead}</p>
                {x.note && <p className="sub">{x.note}</p>}
              </div>
            </li>
          );
        })}
      </ol>
      {it && <span className="ab-sr" aria-live="polite">{`${it.title}, ${cur + 1} of ${items.length}`}</span>}
    </div>
  );
}

/* clips recorded with "oriveta home", a made-up company, replace the older ones where they exist */
const ORIVETA = new Set(["talk", "gate", "hindi", "slides", "photos", "qr", "lead"]);
const clipBase = (id: string) => (ORIVETA.has(id) ? `/work/altbot/oriveta/${id}` : `/work/altbot/clips/${id}`);

export function AltbotFeatures() {
  const items: Story[] = FEATURES.map((f) => ({
    key: f.id,
    src: (l) => `${clipBase(f.id)}-${l}.jpg`,
    clip: (l) => (ORIVETA.has(f.id) ? `${clipBase(f.id)}-${l}-sound.mp4` : `${clipBase(f.id)}-${l}.mp4`),
    portrait: ORIVETA.has(f.id),
    sound: ORIVETA.has(f.id),
    alt: `the app showing: ${f.title}`,
    icon: F_ICON[f.id],
    title: f.title,
    lead: f.line,
  }));
  return <ScrollStory items={items} shape="wide" label="what altbot does, feature by feature" />;
}

/* ---------- the staff menu: the same scroll story, page by page ---------- */

type Page = { id: string; n: string; icon: LucideIcon; what: string; note: string };
const PAGES: Page[] = [
  { id: "signin", n: "staff sign-in", icon: LogIn, what: "the menu only opens with a username and password.", note: "visitors only ever see a sign-in card, and the keyboard comes up by itself." },
  { id: "menu", n: "the menu", icon: LayoutList, what: "everything staff can change, in one list.", note: "one flat list, and every change saves on its own." },
  { id: "look", n: "look & voice", icon: UserRound, what: "the character, its two voices and how fast it speaks.", note: "tap a voice to hear it. staff choose by ear, not by a model name." },
  { id: "personality", n: "personality", icon: MessageSquareText, what: "its name, topics, tone and reply length.", note: "every box has a speak button, so nobody has to type on glass." },
  { id: "documents", n: "documents", icon: FileText, what: "the files it answers from: pdf, word, powerpoint or text.", note: "drop in the new brochure and it relearns by itself." },
  { id: "media", n: "screen & media", icon: MonitorPlay, what: "the decks, pictures, videos and sites it may show.", note: "nothing reaches the public screen until the owner allows it." },
  { id: "lighting", n: "lighting", icon: Lightbulb, what: "named looks, plus brightness and direction.", note: "the character stays in view, so every change shows as you drag." },
  { id: "learning", n: "questions & answers", icon: GraduationCap, what: "questions the documents couldn't answer. tap one to teach it.", note: "nothing is learnt without a person approving it." },
  { id: "report", n: "report", icon: ChartColumn, what: "how busy the kiosk was, and how much it could answer.", note: "plain counts and one percentage, with an excel export." },
  { id: "listening", n: "listening & language", icon: Mic, what: "tap-to-talk or automatic listening, with a noise filter.", note: "automatic for quiet rooms, tap-to-talk for loud ones." },
  { id: "keyboard", n: "type instead of talking", icon: Keyboard, what: "visitors can type, and every answer is also written.", note: "for anyone who'd rather not talk to a screen in public." },
  { id: "display", n: "display & performance", icon: Monitor, what: "theme, blur, smoothing and 3d detail.", note: "one plain line under every switch says what it does." },
  { id: "sound", n: "voice & sound", icon: Volume2, what: "volume, and how much speech to buffer.", note: "louder for a busy floor, without leaving the app." },
  { id: "models", n: "ai models", icon: Cpu, what: "the ai parts on this pc, and optional online ones.", note: "already set up, and each online part falls back to the local one." },
  { id: "staff", n: "staff accounts", icon: Users, what: "who can open the menu.", note: "the owner adds people on the kiosk itself. no it ticket." },
  { id: "help", n: "help & guides", icon: CircleHelp, what: "a short guide for every page, with numbered pictures.", note: "a ? on every page opens that page's own guide." },
];

const STAFF_CLIP: Record<string, string> = { documents: "staff-documents", media: "staff-screen", learning: "staff-qa" };

export function AltbotStaffBlocks() {
  const items: Story[] = PAGES.map((p) => {
    const c = STAFF_CLIP[p.id];
    return {
      key: p.id,
      src: (l: Look) => (c ? `/work/altbot/oriveta/${c}-${l}.jpg` : shot("p", p.id, l)),
      clip: c ? (l: Look) => `/work/altbot/oriveta/${c}-${l}-sound.mp4` : undefined,
      portrait: !!c,
      sound: !!c,
      alt: `the ${p.n} page of the staff menu`, icon: p.icon, title: p.n, lead: p.what, note: p.note,
    };
  });
  return <ScrollStory items={items} shape="tall" label="the staff menu, page by page" />;
}

/* ---------- offline vs online: flip the switch ---------- */

const EDITION: { k: string; icon: LucideIcon; off: string; on: string }[] = [
  { k: "brain", icon: Brain, off: "gemma 3 4b on the pc's gpu", on: "an online model, local brain as backup" },
  { k: "ears", icon: Mic, off: "whisper on the pc", on: "online speech-to-text, whisper as backup" },
  { k: "voice", icon: AudioLines, off: "kokoro + veena on the pc", on: "online voices, local voice as backup" },
  { k: "languages", icon: Languages, off: "english + hindi, hinglish too", on: "44: 12 indian, english and 30 world" },
  { k: "document search", icon: FileSearch, off: "on the pc", on: "still on the pc" },
  { k: "what leaves the pc", icon: Send, off: "nothing", on: "the question, the matching passages, the persona" },
  { k: "hardware", icon: Cpu, off: "a gaming-class gpu (~10.6 gb vram)", on: "an ordinary pc, no local models shipped" },
];

export function AltbotEditions() {
  const [online, setOnline] = useState(false);
  return (
    <div className={`ab-ed${online ? " online" : ""}`}>
      <div className="ab-ed-switch" role="radiogroup" aria-label="edition">
        <button role="radio" aria-checked={!online} className={online ? "" : "on"} onClick={() => setOnline(false)}>
          <CloudOff aria-hidden="true" />
          offline, the default
        </button>
        <button role="radio" aria-checked={online} className={online ? "on" : ""} onClick={() => setOnline(true)}>
          <Cloud aria-hidden="true" />
          online edition
        </button>
      </div>
      <ul className="ab-ed-grid" aria-live="polite">
        {EDITION.map((e, i) => (
          <li key={e.k} className={e.k === "document search" ? "same" : ""}>
            <span className="ab-ico">
              <e.icon aria-hidden="true" />
            </span>
            <small>{e.k}</small>
            <b key={String(online)} style={{ animationDelay: `${i * 0.04}s` }}>
              {online ? e.on : e.off}
            </b>
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
        {muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
        {muted ? "play with sound" : "sound on"}
      </button>
    </figure>
  );
}
