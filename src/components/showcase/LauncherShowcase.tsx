import Link from "next/link";
import { ArrowDown, Check, Cloud, Lock, MonitorSmartphone, MousePointerClick, X, type LucideIcon } from "lucide-react";
import {
  siCloudflare, siDocker, siFigma, siReact, siRust, siTailwindcss, siTauri, siUnity, type SimpleIcon,
} from "simple-icons";
import { LauncherCloud, LauncherFilm, LauncherFloor, LauncherPromo, LauncherScreens, LauncherStaff } from "./LauncherBlocks";
import { MoreWork } from "./MoreWork";

/*
  The kiosk launcher's showcase page. Same bones as the altbot page (the .ab layout, its scroll
  stories and film player), dressed in the launcher's own look: warm paper, black pills, dm sans,
  one big rounded corner. Facts come from the altcore-master-launcher repo (MEMORY.md);
  every clip is from the launcher's trailer.
*/

function Logo({ icon, mono }: { icon: SimpleIcon; mono?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={`${icon.title} logo`} fill={mono ? "currentColor" : `#${icon.hex}`}>
      <path d={icon.path} />
    </svg>
  );
}

const facts: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: MousePointerClick, t: "any app, one tap", d: "games, 3d tours, websites and web apps all start the same way." },
  { icon: Lock, t: "locked down", d: "visitors never see windows. staff get back in with a hidden pin." },
  { icon: MonitorSmartphone, t: "many screens", d: "one pc runs a projector, a totem and a touch table together." },
  { icon: Cloud, t: "run from the cloud", d: "apps, people and updates from one portal. still works offline." },
];

const before = [
  "apps were started from the windows desktop, so a visitor could close one and wander into windows",
  "every kind of app started differently, with black console windows and stray browser tabs",
  "staff hunted for shortcuts on every pc",
  "updates meant walking to each pc with a usb stick",
];
const after = [
  "one branded screen with every app, and nothing else",
  "one tap to play, whatever the app is made with",
  "each person sees only the apps given to them",
  "apps and updates arrive from the cloud, and it still works offline",
];

const process = [
  { fig: "1", unit: "look, from the brand", t: "start from the references", b: "warm paper, black buttons, an orange play circle, and one big rounded corner as a signature." },
  { fig: "any", unit: "password works in the mock", t: "agree the screens first", b: "a clickable version with made-up apps came first, so we argued about screens, not code." },
  { fig: "3 mb", unit: "installer", t: "then make it real", b: "the same screens became a proper windows app. it's tiny because windows already has the engine it draws with." },
  { fig: "3 → 5 s", unit: "hold to exit", t: "test on a second pc", b: "every change went to a second pc as a fresh installer. notes came back as photos, and each one got fixed." },
  { fig: "3", unit: "displays at once", t: "go to the showroom", b: "a touch kiosk, a projector and a tall totem led to named screens, covers and mirroring." },
  { fig: "144", unit: "layout checks", t: "check every screen size", b: "a script opens all 36 screens at 4 window sizes, portrait included, and flags anything cut off." },
];

const stack: { n: string; use: string; logo: SimpleIcon; mono?: boolean }[] = [
  { n: "tauri + rust", use: "the windows app, and everything that has to be safe", logo: siTauri },
  { n: "rust", use: "sign-in, launching apps, kiosk mode, encryption", logo: siRust, mono: true },
  { n: "react + typescript", use: "every screen you see", logo: siReact },
  { n: "tailwind", use: "the styling, sized to any screen", logo: siTailwindcss },
  { n: "cloudflare", use: "the portal, accounts, downloads and updates", logo: siCloudflare },
  { n: "docker", use: "web apps that bring their own server", logo: siDocker },
  { n: "unity + unreal", use: "add-ons so games check their play pass", logo: siUnity, mono: true },
  { n: "figma", use: "the look, before any code", logo: siFigma },
];

export function LauncherShowcase() {
  return (
    <main className="ab lc">
      <div className="ab-wrap ab-crumbs">
        <Link href="/work" data-label="back">← all work</Link>
        <span>made at altcore · 2026</span>
      </div>

      {/* hero: words first, then the film, wide */}
      <header className="ab-wrap lc-hero">
        <span className="ab-kick">altcore launcher</span>
        <h1>
          one screen that runs every app in the showroom. <em>nothing else.</em>
        </h1>
        <div className="lc-hero-row">
          <p className="ab-lede">
            showrooms run games, 3d walkthroughs and websites on big touch screens. i designed and built the launcher that holds them all: visitors tap and play, staff stay in control, and windows never shows through.
          </p>
          <div className="ab-hero-cta">
            <a href="#floor" className="ab-btn" data-label="explore">
              explore it <ArrowDown aria-hidden="true" />
            </a>
            <a href="#film" className="ab-btn ghost" data-label="watch">watch the trailer</a>
          </div>
        </div>
        <LauncherPromo />
        <dl className="ab-meta lc-meta">
          <div><dt>role</dt><dd>product design, ui, app + cloud</dd></div>
          <div><dt>for</dt><dd>altcore showrooms and clients</dd></div>
          <div><dt>runs on</dt><dd>windows pcs, touch screens, many displays</dd></div>
        </dl>
      </header>

      <div className="ab-wrap">
        <dl className="ab-facts">
          {facts.map((f) => (
            <div key={f.t} tabIndex={0}>
              <dt>
                <span className="ab-ico"><f.icon aria-hidden="true" /></span>
                {f.t}
              </dt>
              <dd>{f.d}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* the problem */}
      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">the problem</span>
          <h2>a showroom pc full of apps, and a desktop anyone could reach</h2>
        </div>
        <div className="lc-ba">
          <div>
            <small>before</small>
            <ul>
              {before.map((b) => (
                <li key={b}><X aria-hidden="true" />{b}</li>
              ))}
            </ul>
          </div>
          <div className="after">
            <small>after</small>
            <ul>
              {after.map((b) => (
                <li key={b}><Check aria-hidden="true" />{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* process */}
      <section className="ab-sec ab-process">
        <div className="ab-wrap">
          <div className="ab-head">
            <span className="ab-kick">design process</span>
            <h2>how it came together</h2>
          </div>
        </div>
        <ol className="ab-steps">
          {process.map((p, i) => (
            <li key={p.t}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <b className="fig">{p.fig}</b>
              <small>{p.unit}</small>
              <h3>{p.t}</h3>
              <p>{p.b}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* the floor */}
      <section id="floor" className="ab-wrap ab-sec ab-tone lc-tone-paper">
        <div className="ab-head">
          <span className="ab-kick">for visitors</span>
          <h2>walk up, tap, play</h2>
          <p>keep scrolling. every clip is the real launcher, with its own voice-over. turn the sound on if you like.</p>
        </div>
        <LauncherFloor />
      </section>

      <section className="ab-wrap ab-sec ab-tone lc-tone-stone">
        <div className="ab-head">
          <span className="ab-kick">many screens</span>
          <h2>one pc, a whole room of screens</h2>
          <p>showrooms rarely have just one display. the launcher knows which app goes where.</p>
        </div>
        <LauncherScreens />
      </section>

      <section className="ab-wrap ab-sec ab-tone lc-tone-peach">
        <div className="ab-head">
          <span className="ab-kick">for the staff · accessibility</span>
          <h2>looked after by sales staff, not engineers</h2>
          <p>the people running a kiosk stand at a touch screen with no keyboard. so everything works by finger, and help is always one tap away.</p>
        </div>
        <LauncherStaff />
      </section>

      <section className="ab-wrap ab-sec ab-tone lc-tone-ink">
        <div className="ab-head">
          <span className="ab-kick">behind the scenes</span>
          <h2>a cloud to run it, and locks to keep it safe</h2>
          <p>a launcher on one pc became a system for many: managed from a browser, updated by itself, with apps that can&apos;t walk out the door.</p>
        </div>
        <LauncherCloud />
      </section>

      {/* stack */}
      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">the tools</span>
          <h2>what it&apos;s built with</h2>
          <p>the main pieces, and the job each one does.</p>
        </div>
        <ul className="ab-stack">
          {stack.map((s) => (
            <li key={s.n}>
              <span className="ab-logo"><Logo icon={s.logo} mono={s.mono} /></span>
              <b>{s.n}</b>
              <small>{s.use}</small>
            </li>
          ))}
        </ul>
      </section>

      {/* film */}
      <section id="film" className="ab-wrap ab-sec ab-tone lc-tone-paper">
        <div className="ab-head">
          <span className="ab-kick">the trailer</span>
          <h2>rather watch? the whole tour in three minutes</h2>
          <p>tap a chapter to jump straight to it.</p>
        </div>
        <LauncherFilm />
      </section>

      <div className="ab-wrap">
        <MoreWork slug="kiosk-launcher" />
      </div>
    </main>
  );
}
