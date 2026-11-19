"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  AudioLines, Brain, Bug, ChartColumn, CircleHelp, Cloud, CloudOff, Cpu, FileSearch, FileText, Globe, GraduationCap, HardDrive, Images, Keyboard, Languages,
  LayoutList, Lightbulb, LogIn, MessageSquareText, MessagesSquare, Mic, Monitor, MonitorPlay, PhoneCall, Presentation, Proportions, QrCode, Send, ShieldCheck, Smile, Users, UserRound, Volume2, VolumeX,
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

const F_ICON: Record<string, LucideIcon> = {
  talk: MessagesSquare, gate: ShieldCheck, hindi: Languages, kinds: Users, shows: MonitorPlay, slides: Presentation, web: Globe,
  photos: Images, qr: QrCode, lead: PhoneCall, cast: Smile, shapes: Proportions, debug: Bug, device: HardDrive,
};
const GROUPS = [
  { id: "talks", n: "it talks", sub: "conversation", ids: ["talk", "gate", "hindi", "kinds"] },
  { id: "shows", n: "it shows", sub: "its own screen", ids: ["shows", "slides", "web", "photos", "qr", "lead"] },
  { id: "fits", n: "it fits in", sub: "the product", ids: ["cast", "shapes", "debug", "device"] },
];
const byId = (id: string) => FEATURES.find((f) => f.id === id)!;

function Frame({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function FeatureDetail({ f, look }: { f: Feature; look: Look }) {
  return (
    <>
      <figure className="ab-fx-shot" key={f.id + look}>
        <Frame src={shot("f", f.id, look)} alt={`the app showing: ${f.title}`} eager />
      </figure>
      <div className="ab-fx-copy">
        <ul>
          {f.how.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p className="ab-note">
          <span>design decision</span>
          {f.design}
        </p>
      </div>
    </>
  );
}

export function AltbotFeatures() {
  const [look] = useAppLook();
  const [group, setGroup] = useState(0);
  const [cur, setCur] = useState("talk");
  const g = GROUPS[group];
  const f = byId(cur);

  function pickGroup(i: number) {
    setGroup(i);
    setCur(GROUPS[i].ids[0]);
  }

  return (
    <div className="ab-fx">
      <div className="ab-fx-bar">
        <div className="ab-tabs" role="tablist" aria-label="feature groups">
          {GROUPS.map((gr, i) => (
            <button key={gr.id} role="tab" aria-selected={i === group} className={i === group ? "on" : ""} onClick={() => pickGroup(i)}>
              <b>{gr.n}</b>
              <small>{gr.sub}</small>
            </button>
          ))}
        </div>
        <LookSwitch />
      </div>

      <div className="ab-fx-grid">
        <ul className="ab-fx-list">
          {g.ids.map((id) => {
            const it = byId(id);
            const Icon = F_ICON[id];
            const on = id === cur;
            return (
              <li key={id} className={on ? "on" : ""}>
                <button onClick={() => setCur(id)} aria-expanded={on} data-label="show">
                  <span className="ab-ico">
                    <Icon aria-hidden="true" />
                  </span>
                  <span>
                    <b>{it.title}</b>
                    <small>{it.line}</small>
                  </span>
                </button>
                {/* phones and tablets: the screen opens right under its row */}
                {on && (
                  <div className="ab-fx-inline">
                    <FeatureDetail f={it} look={look} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="ab-fx-view" aria-live="polite">
          <FeatureDetail f={f} look={look} />
        </div>
      </div>
    </div>
  );
}

/* ---------- the staff menu: a scroll-driven walkthrough ---------- */

type Page = { id: string; group: string; n: string; icon: LucideIcon; what: string; use: string; why: string };
const PAGES: Page[] = [
  { id: "signin", group: "getting in", n: "staff sign-in", icon: LogIn, what: "the menu only opens with a username and password.", use: "a curious visitor taps the menu button. they get a sign-in card and nothing else.", why: "a public screen can't have open settings. the on-screen keyboard comes up by itself, so no keyboard has to be plugged in." },
  { id: "menu", group: "getting in", n: "the menu", icon: LayoutList, what: "everything staff can change, in one list: the bots, this bot's pages, visitors, devices, display, advanced.", use: "the front desk wants to change one thing before the doors open, and finds it without a manual.", why: "one flat list instead of nested menus. every change saves at once, so there is no save button to forget." },
  { id: "look", group: "this bot", n: "look & voice", icon: UserRound, what: "pick the character, its english and hindi voices, and how fast it speaks.", use: "a client wants a male host on their stall. pick him, tap a few voices, keep the one that fits.", why: "tapping a voice plays it. staff choose by ear, not by a technical voice name." },
  { id: "personality", group: "this bot", n: "personality", icon: MessageSquareText, what: "its name, its topics, who it is, its tone and how long its replies are.", use: "the brand wants a warmer host with shorter answers. two settings, and the next reply already sounds different.", why: "every text box has speak and keyboard buttons, so staff can say it out loud instead of typing on glass." },
  { id: "documents", group: "this bot", n: "documents", icon: FileText, what: "the files the bot answers from: pdf, word, powerpoint or text.", use: "a new brochure arrives on a usb drive. add the file and the bot relearns by itself.", why: "it uses the normal windows file picker staff already know, and removed files go to the recycle bin." },
  { id: "media", group: "this bot", n: "screen & media", icon: MonitorPlay, what: "what the bot may show beside itself: slide decks, pictures, videos, websites.", use: "marketing sends a new deck. it stays hidden until the owner allows it on the public screen.", why: "a private sales deck must never appear in front of visitors by accident, so showing is opt-in per file." },
  { id: "lighting", group: "this bot", n: "lighting", icon: Lightbulb, what: "named looks (natural, soft, bright, dramatic, warm, cool, glow) plus brightness and direction.", use: "the stall has warm spotlights and the character looks cold next to them. pick warm, nudge the brightness.", why: "the menu sits to the side, so you watch the character change while you drag." },
  { id: "learning", group: "visitors", n: "questions & answers", icon: GraduationCap, what: "what visitors asked that the documents couldn't answer. tap one to teach the bot the answer.", use: "people keep asking about parking and no document covers it. tap the question, write the answer once.", why: "the owner stays in charge: nothing is learnt without a person approving it." },
  { id: "report", group: "visitors", n: "report", icon: ChartColumn, what: "how busy the kiosk was, and what share was answered from the documents, day by day.", use: "the manager asks how the weekend went. open the page, or export it to excel.", why: "plain counts and one percentage, not a dashboard someone has to decode." },
  { id: "listening", group: "visitors", n: "listening & language", icon: Mic, what: "tap-to-talk or automatic listening, how long to wait, and a filter for background noise.", use: "the hall is loud and the bot keeps hearing the next stall. switch to tap-to-talk or raise the noise filter.", why: "with automatic listening a visitor never has to find a button. a busy floor needs the opposite, so both exist." },
  { id: "keyboard", group: "visitors", n: "type instead of talking", icon: Keyboard, what: "visitors can type on an on-screen keyboard, and every answer is shown as text too.", use: "someone doesn't want to talk to a screen in public, or can't hear it well. they type and read.", why: "a showroom screen meets everyone, so there is always more than one way in." },
  { id: "display", group: "this screen", n: "display & performance", icon: Monitor, what: "light or dark, background blur, edge smoothing and 3d detail.", use: "an older pc stutters. turn the 3d detail down one step and it runs smoothly again.", why: "every switch and slider has a line under it saying what it does, in plain words." },
  { id: "sound", group: "this screen", n: "voice & sound", icon: Volume2, what: "the app's own volume, and how much speech to buffer before a sentence starts.", use: "on a busy floor nobody can hear the host. make it louder from the same menu.", why: "staff never have to leave the app for windows settings." },
  { id: "models", group: "advanced", n: "ai models", icon: Cpu, what: "the ai parts on this pc, and the optional online brain, voice and ears, each with its own switch.", use: "a client wants more languages for one event. switch the online parts on, and off again afterwards.", why: "it arrives already set up and says so. nobody breaks it by exploring, and each online part falls back to the local one." },
  { id: "staff", group: "advanced", n: "staff accounts", icon: Users, what: "who can open the menu. add a person, change a password.", use: "a new hire joins the showroom. the owner adds them on the kiosk itself.", why: "no it ticket, no second tool: the kiosk manages its own people." },
  { id: "help", group: "help", n: "help & guides", icon: CircleHelp, what: "a short guide for every page, with a picture of that page and numbered markers.", use: "someone forgets what a slider does. the ? in the corner opens that page's guide.", why: "help sits where the question comes up. the pdf staff manual is made from the same screens." },
];
const CHAPTERS = PAGES.reduce<{ n: string; first: number }[]>((a, p, i) => (a.length && a[a.length - 1].n === p.group ? a : [...a, { n: p.group, first: i }]), []);

export function AltbotStaffBlocks() {
  const [look] = useAppLook();
  const [cur, setCur] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  // regular page scrolling drives it: the step crossing the middle of the screen is the current one
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCur(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const page = PAGES[cur];
  const jump = (i: number) => steps.current[i]?.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });

  return (
    <div className="ab-tour">
      <div className="ab-tour-stage">
        <div className="ab-tour-sticky">
          <nav className="ab-tour-nav" aria-label="menu chapters">
            {CHAPTERS.map((c) => (
              <button key={c.n} className={page.group === c.n ? "on" : ""} onClick={() => jump(c.first)}>
                {c.n}
              </button>
            ))}
          </nav>
          <figure className="ab-tour-panel">
            <span key={page.id + look}>
              <Frame src={shot("p", page.id, look)} alt={`the ${page.n} page of the staff menu`} eager />
            </span>
          </figure>
          <div className="ab-tour-foot">
            <LookSwitch />
            <span>
              {String(cur + 1).padStart(2, "0")} / {PAGES.length}
            </span>
          </div>
          <span className="ab-tour-bar" aria-hidden="true">
            <i style={{ transform: `scaleX(${(cur + 1) / PAGES.length})` }} />
          </span>
        </div>
      </div>

      <ol className="ab-tour-steps">
        {PAGES.map((p, i) => {
          const Icon = p.icon;
          return (
            <li
              key={p.id}
              data-i={i}
              className={i === cur ? "on" : ""}
              ref={(el) => {
                steps.current[i] = el;
              }}
            >
              {/* phones: each step carries its own screenshot */}
              <figure className="ab-tour-inline">
                <Frame src={shot("p", p.id, look)} alt={`the ${p.n} page of the staff menu`} />
              </figure>
              <div className="ab-tour-copy">
                <span className="ab-tour-tag">
                  <span className="ab-ico">
                    <Icon aria-hidden="true" />
                  </span>
                  {p.group}
                </span>
                <h3>{p.n}</h3>
                <p className="what">{p.what}</p>
                <dl>
                  <div>
                    <dt>when it&apos;s used</dt>
                    <dd>{p.use}</dd>
                  </div>
                  <div>
                    <dt>why it&apos;s built this way</dt>
                    <dd>{p.why}</dd>
                  </div>
                </dl>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
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
