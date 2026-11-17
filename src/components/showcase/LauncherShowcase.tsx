import Link from "next/link";
import { LauncherTrailer } from "./LauncherTrailer";
import { MoreWork } from "./MoreWork";

/*
  The kiosk launcher's own showcase page. Facts come from the altcore-master-launcher repo (MEMORY.md);
  the demo's apps and showroom are made up.
*/

const before = [
  "apps were started from the windows desktop, so a visitor could close one and wander into windows",
  "unity, unreal, web pages and apps with their own servers each started differently, with console windows and stray browser tabs",
  "staff hunted for shortcuts and .bat files on every pc",
  "updates meant someone walking to each pc with a usb stick",
];
const after = [
  "one branded screen with every app, and nothing else",
  "one tap to play, whatever the app is made with",
  "each person sees only the apps given to them",
  "apps, people, licences and updates come from the cloud, and it still works offline",
];

const process = [
  { t: "start from the owner's references", b: "figma references set the tone: warm off-white paper with a soft peach glow, black pill buttons with an orange play circle, dm sans, and one big rounded corner as a signature." },
  { t: "agree the flows in a clickable mock", b: "the whole ui was built first in the real stack with demo data (any password works) so we could argue about screens, not code: sign-in, two library layouts, the details popup, launching, settings, the admin panel." },
  { t: "then make it real, in rust", b: "the same screens got wrapped in a native windows app. everything sensitive moved to rust: saving, sign-in, finding apps on disk, launching, kiosk mode. the installer is about 3 mb because windows already has the browser engine it draws with." },
  { t: "test on real hardware, every change", b: "after each change a fresh installer went to a second pc. the owner's notes came back as photos: a cut-off button, a 3-second hold that was too easy to trigger by accident (now 5), tags in the details popup that nobody needed (gone)." },
  { t: "go to the showroom", b: "three displays at once: a touch kiosk, a projector and a portrait totem. that brought screen names, apps opening on a chosen screen, covers in sync on every screen, mirroring, and sound that keeps playing when someone taps the kiosk." },
  { t: "then online", b: "a cloud worker and database for accounts, pcs and the master portal, signed updates over the internet, and later app downloads, encryption and an in-game check." },
];

const staff = [
  { t: "one tap, any app", b: "unity and unreal builds, plain .exe files, web pages, web apps with their own server or docker. people don't need to know which." },
  { t: "honest loading", b: "the loading card stays until the app's window is really on screen, step by step, so nobody taps twice." },
  { t: "stop means stop", b: "stop app closes the app and everything it started. if the launcher closes, windows ends them too." },
  { t: "errors in plain english", b: "“docker isn't running” instead of an exit code. the technical log is only shown to admins." },
  { t: "help on every page", b: "a guide per page with pictures and numbered markers, plus a 64-page pdf manual with troubleshooting and a glossary." },
  { t: "adding an app is a form", b: "browse to the file and the version and size are read for you. no thumbnail? it gets generated art." },
];

const enterprise = [
  { t: "per-person app lists", b: "people sign in and only see what they were given. internal tools stay invisible to visitors." },
  { t: "offline licences", b: "sign in online once, then work offline for 3 days up to a year, or lifetime on pcs we control. clock tampering is checked." },
  { t: "master portal", b: "one website for people, pcs and apps. lock or revoke a pc remotely; launchers check in about every 30 minutes." },
  { t: "signed auto-updates", b: "one command builds, signs and publishes a version. every launcher pulls it and checks the signature before installing." },
  { t: "app downloads", b: "apps are uploaded once and downloaded with pause, resume and update, compressed on the way." },
  { t: "protected apps", b: "apps are stored encrypted on the pc, and unity / unreal add-ons check for a signed play pass before a game starts." },
  { t: "no internet? use a usb", b: "library packages carry apps and settings to offline pcs. passwords never travel in them." },
  { t: "everyone can add apps", b: "staff can add their own apps, switchable per person, without touching anyone else's." },
];

const access = [
  { t: "touch first, always", b: "showroom pcs are often touch screens with no keyboard, so every feature works by touch and there are no keyboard-only paths." },
  { t: "an on-screen keyboard", b: "pops up when a text box is tapped with a finger (or always, or never), with a number pad for numbers." },
  { t: "big targets, scaled to the screen", b: "everything is sized in rem and the root size follows the window width, so a 4k totem gets the same layout as a laptop, just bigger." },
  { t: "checked at 4 screen sizes", b: "a layout audit opens 36 screens at 4 window sizes, including a 1080×1920 portrait touch screen, and flags anything cut off or overflowing: 144 checks." },
  { t: "two ways to browse", b: "a calm showcase (one big app and a list) or a carousel gallery. people pick what suits them." },
  { t: "never trapped", b: "the kiosk can always be left by touch alone (hold the logo, enter a pin), ctrl+alt+del is never blocked, and if the launcher crashes three times it falls back to the normal desktop." },
];

const security = [
  "passwords and the kiosk pin are hashed with argon2id in rust; the screens never see a hash",
  "5 wrong tries lock that account, doubling up to 15 minutes",
  "the screen sends only an app's id; rust decides what actually runs",
  "web apps open in a separate view that can't call any launcher command",
  "kiosk mode blocks the windows key, alt+tab and closing; screen-edge swipes can be blocked too",
];

const shots = [
  { src: "/work/kiosk-launcher/library-showcase.webp", t: "library · showcase layout", wide: true },
  { src: "/work/kiosk-launcher/library-gallery.webp", t: "library · gallery layout", wide: true },
  { src: "/work/kiosk-launcher/login.webp", t: "sign in" },
  { src: "/work/kiosk-launcher/launch-loading.webp", t: "opening an app" },
  { src: "/work/kiosk-launcher/kiosk-pin.webp", t: "leaving kiosk mode" },
  { src: "/work/kiosk-launcher/kiosk-choices.webp", t: "where to?" },
  { src: "/work/kiosk-launcher/settings.webp", t: "settings" },
  { src: "/work/kiosk-launcher/screens.webp", t: "several screens" },
  { src: "/work/kiosk-launcher/admin-apps.webp", t: "admin · apps", wide: true },
];

export function LauncherShowcase() {
  return (
    <main className="kl">
      <div className="kl-wrap kl-crumbs">
        <Link href="/work" data-label="back">← all work</Link>
        <span>made at altcore · 2026</span>
      </div>

      <header className="kl-wrap kl-hero">
        <span className="kl-kick">altcore launcher</span>
        <h1>
          any app, any screen,
          <br />
          <em>one launcher.</em>
        </h1>
        <p className="kl-lede">
          a branded, touch-first launcher for every altcore experience: unity and unreal builds, web pages and web apps with their own servers. it turns a showroom pc into a locked kiosk, and the apps, people, licences and updates are run from the cloud. it keeps working when the internet doesn&apos;t.
        </p>
        <div className="kl-facts">
          <div><b>~3 mb</b><span>windows installer</span></div>
          <div><b>144</b><span>layout checks across 4 screen sizes</span></div>
          <div><b>3</b><span>screens in sync at the showroom</span></div>
          <div><b>v1.6</b><span>shipped with signed auto-updates</span></div>
        </div>
      </header>

      <section className="kl-wrap kl-demo-sec" id="demo">
        <div className="kl-head">
          <span className="kl-kick">watch, then try it</span>
          <h2>the trailer, and you&apos;re in it</h2>
          <p>the launcher&apos;s trailer plays on a showroom pc. a few times it stops and hands the screen to you: launch an app, break out of kiosk mode, change the layout. the apps are made up; the flows are the real ones.</p>
        </div>
        <LauncherTrailer />
      </section>

      <section className="kl-wrap kl-sec">
        <div className="kl-head">
          <span className="kl-kick">the problem</span>
          <h2>a showroom full of apps, and a windows desktop in the way</h2>
        </div>
        <div className="kl-compare">
          <div className="kl-card">
            <h3>before</h3>
            <ul>{before.map((t) => <li key={t}><span aria-hidden="true">✕</span>{t}</li>)}</ul>
          </div>
          <div className="kl-card good">
            <h3>with the launcher</h3>
            <ul>{after.map((t) => <li key={t}><span aria-hidden="true">✓</span>{t}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="kl-wrap kl-sec">
        <div className="kl-head">
          <span className="kl-kick">design process</span>
          <h2>from figma references to a showroom with three screens</h2>
        </div>
        <ol className="kl-steps">
          {process.map((p, i) => (
            <li key={p.t}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.t}</h3>
              <p>{p.b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="kl-sec kl-look">
        <div className="kl-wrap">
          <div className="kl-head">
            <span className="kl-kick">the design</span>
            <h2>like a games console, for a company</h2>
            <p>warm paper instead of a dark gamer ui, the altcore orange-to-red gradient for anything you can play, and a big top-right corner on cards as the signature shape. apps without a thumbnail get generated art: a gradient and a soft 3d shape, picked from 10 palettes and 4 shapes. the details popup is just a picture, a name, a description and play.</p>
          </div>
        </div>
        <div className="kl-gallery">
          {shots.map((s) => (
            <figure key={s.src} className={s.wide ? "wide" : ""}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.t} />
              <figcaption>{s.t}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="kl-wrap kl-sec">
        <div className="kl-head">
          <span className="kl-kick">ease of use · visitors + staff</span>
          <h2>nobody should need to know what a .bat file is</h2>
        </div>
        <div className="kl-cards">
          {staff.map((a) => (
            <div className="kl-card" key={a.t}>
              <h3>{a.t}</h3>
              <p>{a.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="kl-wrap kl-sec">
        <div className="kl-head">
          <span className="kl-kick">ease of use · enterprise + internal apps</span>
          <h2>an app store for one company&apos;s own apps</h2>
          <p>the launcher doubles as the way internal tools reach the team: sales configurators, demo builds, training apps. admins manage it all from one portal, and each pc keeps its own copy so it works offline.</p>
        </div>
        <div className="kl-cards four">
          {enterprise.map((a) => (
            <div className="kl-card" key={a.t}>
              <h3>{a.t}</h3>
              <p>{a.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="kl-sec kl-access">
        <div className="kl-wrap kl-split">
          <div className="kl-head">
            <span className="kl-kick">accessibility + universal design</span>
            <h2>one design for a kid at a totem and an admin at a desk</h2>
            <p>the same launcher runs on a laptop, a touch kiosk with no keyboard, a projector and a 4k portrait totem, used by visitors who&apos;ve never seen it and staff who use it daily. it isn&apos;t formally audited against a standard yet; these are the choices built in from the start.</p>
          </div>
          <ul className="kl-list">
            {access.map((a) => (
              <li key={a.t}>
                <h3>{a.t}</h3>
                <p>{a.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="kl-wrap kl-sec kl-split">
        <div className="kl-head">
          <span className="kl-kick">several screens</span>
          <h2>a touch kiosk, a projector and a totem, all in sync</h2>
          <p>each app opens on the screen you choose, named the way the staff call it (“projector”). while it runs on another screen, the kiosk still takes touches without stealing the game&apos;s focus, so the sound keeps playing. idle screens show the same cover as the main one, videos at the same moment, and a screen can mirror another.</p>
        </div>
        <div className="kl-screens" aria-hidden="true">
          <div className="s touch"><span>touch kiosk</span></div>
          <div className="s proj"><span>projector</span></div>
          <div className="s totem"><span>totem</span></div>
        </div>
      </section>

      <section className="kl-wrap kl-sec kl-two">
        <div>
          <div className="kl-head">
            <span className="kl-kick">security</span>
            <h2>locked down, but never locked out</h2>
          </div>
          <ul className="kl-ticks">{security.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        <div>
          <div className="kl-head">
            <span className="kl-kick">stack</span>
            <h2>under the hood</h2>
          </div>
          <dl className="kl-stack">
            <div><dt>desktop</dt><dd>tauri v2 · rust · webview2</dd></div>
            <div><dt>screens</dt><dd>react · typescript · tailwind v4 · shadcn/radix · framer motion</dd></div>
            <div><dt>cloud</dt><dd>cloudflare workers · d1 · r2 · a react portal</dd></div>
            <div><dt>apps</dt><dd>unity · unreal · .exe · web · .bat servers · docker</dd></div>
            <div><dt>quality</dt><dd>layout audit · help screenshots + pdf manual made by scripts</dd></div>
          </dl>
        </div>
      </section>

      <div className="kl-wrap">
        <MoreWork slug="kiosk-launcher" />
      </div>
    </main>
  );
}
