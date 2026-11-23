import Link from "next/link";
import { ArrowDown, ArrowRight, Box, Check, Gauge, Glasses, Hand, Layers, Puzzle, Ruler, Wrench, X, type LucideIcon } from "lucide-react";
import { siAndroid, siDotnet, siFfmpeg, siMeta, siPython, siUnity, type SimpleIcon } from "simple-icons";
import {
  XrApart, XrDashes, XrEngines, XrExplode, XrFilm, XrFirst, XrHands, XrMaking, XrMenus, XrPromo, XrRev, XrRoom,
} from "./XrBlocks";
import { MoreWork } from "./MoreWork";

/*
  The xr bike showroom's showcase page. Same bones as the altbot and launcher pages (the .ab layout,
  scroll stories, film player), dressed in the headset's own look: a dark room, see-through glass
  panels with a thin orange rim, space grotesk, a faint floor grid. Facts come from the
  xrDemoAltcore-UI project and its content pack; every clip is from the project's showcase film.
*/

function Logo({ icon, mono }: { icon: SimpleIcon; mono?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={`${icon.title} logo`} fill={mono ? "currentColor" : `#${icon.hex}`}>
      <path d={icon.path} />
    </svg>
  );
}

/* ---------- the pipeline: from a downloaded model to a bike in the garage ---------- */

const PIPELINE: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: Box, t: "3d model file", d: "a bike model, downloaded" },
  { icon: Wrench, t: "clean-up script", d: "shrinks textures, merges maps" },
  { icon: Ruler, t: "importer", d: "real size, wheels down, facing forward" },
  { icon: Layers, t: "wheel splitter", d: "frees the rear wheel so it can spin" },
  { icon: Gauge, t: "finish + dash", d: "real-room paint, a live dashboard" },
  { icon: Puzzle, t: "explode bake", d: "parts grouped from a part map" },
];

const facts: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: Box, t: "life-size, in your room", d: "12 motorbikes at true size, standing on your real floor." },
  { icon: Hand, t: "hands only", d: "no controllers and no manual. a quest 3 on its own, no pc." },
  { icon: Gauge, t: "rev it, hear it", d: "twist the grip: each engine sounds like itself, the dash comes alive." },
  { icon: Layers, t: "take it apart", d: "one touch, and every part floats free. pick one up to learn what it is." },
];

const before = [
  "a dealer or an exhibition stand only has room for a few bikes",
  "brochures and screens can't show a bike's size, stance or what's under the fairing",
  "vr headsets shut people off from the room, which puts first-timers off",
];
const after = [
  "one spot on the floor holds a whole lineup of twelve",
  "every bike stands life-size, and comes apart part by part",
  "you always see the real room, so it feels safe and easy",
];

const design = [
  "mixed reality, not vr, so first-timers stay comfortable",
  "a printed code as the bike's parking spot, with two fallbacks",
  "hands only, opened with a palm-up gesture",
  "a menu sized for an unsteady hand, redesigned seven times",
  "a tutorial that waits for you to do each step",
  "brand orange only on things you can touch",
];
const dev = [
  "unity 6 app running on the headset alone, at 90 frames a second",
  "hand tracking for the throttle, pinch-to-grab and poke buttons",
  "my own qr finder reading the headset's camera frames",
  "engine sounds made live from each engine's layout",
  "explode views baked from hand-checked part maps",
  "26 editor tools that turn a downloaded model into a showroom bike",
];

const process = [
  { fig: "2 days", unit: "to a first bike", t: "get a bike into the room", b: "headset set up for mixed reality, a qr code to place the bike, and a first palm menu." },
  { fig: "12", unit: "bikes, real size", t: "make the bikes real", b: "real models, real dimensions, a spinning rear wheel, honest paint and a live dashboard." },
  { fig: "7", unit: "menu rounds", t: "test it on the head", b: "every round went onto the headset. text got bigger, buttons roomier, glass darker." },
  { fig: "7", unit: "tutorial steps", t: "teach without words", b: "no manual to read: a short tour that waits until you've done each gesture." },
  { fig: "1.1×", unit: "sharpness floor", t: "make it crisp", b: "text and paint have to look sharp in passthrough, so resolution never drops below 1.1×." },
  { fig: "234", unit: "commits in 12 days", t: "film it", b: "a tripod in the room and a capture from the headset, cut into a film and a trailer." },
];

const problems = [
  { t: "wheels that wouldn't spin", d: "the models had the rear wheel fused into the bike. a tool cuts it out so it can turn when you rev." },
  { t: "videos that wouldn't play", d: "the headset refused many downloaded mp4s. a small tool repacks them, and the app says why if one fails." },
  { t: "paint that looked fake", d: "glossy game paint looked plastic in a real room. reflections were made neutral and finishes toned down." },
  { t: "tracking that flickers", d: "if the headset loses the qr code for a moment, the bike stays put instead of jumping." },
];

const stack: { n: string; use: string; logo: SimpleIcon; mono?: boolean }[] = [
  { n: "unity 6", use: "the app, with the universal render pipeline", logo: siUnity, mono: true },
  { n: "meta xr sdk", use: "passthrough, hand tracking, qr and floor detection", logo: siMeta },
  { n: "c#", use: "56 scripts, about 12,700 lines", logo: siDotnet },
  { n: "python", use: "the model clean-up and video repack tools", logo: siPython },
  { n: "android", use: "the quest 3 runs it on its own, no pc", logo: siAndroid },
  { n: "ffmpeg", use: "cutting the film and trailer", logo: siFfmpeg },
];

export function XrShowcase() {
  return (
    <main className="ab xr">
      <div className="ab-wrap ab-crumbs">
        <Link href="/work" data-label="back">← all work</Link>
        <span>made at altcore · 2026</span>
      </div>

      <header className="ab-wrap xr-hero">
        <span className="ab-kick">altcore xr bike showroom</span>
        <h1>
          every room is a showroom. <em>bring the bike to it.</em>
        </h1>
        <div className="xr-hero-row">
          <p className="ab-lede">
            put on a headset and a full-size motorbike stands in the room with you. i designed and built this mixed reality showroom for meta quest 3: you rev it with your own hand, take it apart, and see what each part does.
          </p>
          <div className="ab-hero-cta">
            <a href="#room" className="ab-btn" data-label="explore">
              explore it <ArrowDown aria-hidden="true" />
            </a>
            <a href="#film" className="ab-btn ghost" data-label="watch">watch the film</a>
          </div>
        </div>
        <XrPromo />
        <dl className="ab-meta xr-meta">
          <div><dt>role</dt><dd>xr design + development, solo</dd></div>
          <div><dt>for</dt><dd>bike dealers, exhibitions, events</dd></div>
          <div><dt>runs on</dt><dd>meta quest 3, hands only</dd></div>
          <div><dt>built in</dt><dd>12 days</dd></div>
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

      {/* two skills, side by side */}
      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">what i did</span>
          <h2>designed it for people. built it for the headset.</h2>
          <p>one person, both halves: how it feels to use, and the code that makes it run on a headset with no computer attached.</p>
        </div>
        <div className="xr-two">
          <div>
            <span className="xr-glyph" aria-hidden="true"><Glasses /></span>
            <small>xr design</small>
            <h3>how it feels</h3>
            <ul>{design.map((d) => <li key={d}><Check aria-hidden="true" />{d}</li>)}</ul>
          </div>
          <div>
            <span className="xr-glyph" aria-hidden="true"><Box /></span>
            <small>xr development</small>
            <h3>how it runs</h3>
            <ul>{dev.map((d) => <li key={d}><Check aria-hidden="true" />{d}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* the problem */}
      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">the problem</span>
          <h2>a showroom only fits a few bikes. a photo can&apos;t show how big one is.</h2>
        </div>
        <div className="xr-ba">
          <div>
            <small>today</small>
            <ul>{before.map((b) => <li key={b}><X aria-hidden="true" />{b}</li>)}</ul>
          </div>
          <div className="after">
            <small>with the xr showroom</small>
            <ul>{after.map((b) => <li key={b}><Check aria-hidden="true" />{b}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* process */}
      <section className="ab-sec ab-process">
        <div className="ab-wrap">
          <div className="ab-head">
            <span className="ab-kick">design process</span>
            <h2>twelve days, tested on the headset every day</h2>
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

      <section id="room" className="ab-wrap ab-sec ab-tone xr-tone-room">
        <div className="ab-head">
          <span className="ab-kick">in your room</span>
          <h2>it doesn&apos;t float. it stands.</h2>
          <p>keep scrolling. each clip shows the real room on the left and what the headset sees on the right, with the film&apos;s own voice-over. turn the sound on if you like.</p>
        </div>
        <XrRoom />
      </section>

      <section className="ab-wrap ab-sec ab-tone xr-tone-hands">
        <div className="ab-head">
          <span className="ab-kick">hands only</span>
          <h2>no controllers. no manual. your hand already knows.</h2>
        </div>
        <XrHands />
        <div className="xr-sub">
          <div className="ab-head">
            <span className="ab-kick">hands only · the menu</span>
            <h3>seven rounds to get the menu right</h3>
            <p>a menu floating next to your hand has to be read by someone who&apos;s never worn a headset. each version went onto the headset, and each round made the text bigger and the spacing roomier.</p>
          </div>
          <XrMenus />
        </div>
      </section>

      <section className="ab-wrap ab-sec ab-tone xr-tone-rev">
        <div className="ab-head">
          <span className="ab-kick">rev it</span>
          <h2>twist the grip. every engine sounds like itself.</h2>
        </div>
        <XrRev />
        <div className="xr-sub">
          <XrEngines />
          <div className="ab-head xr-sub-head">
            <span className="ab-kick">rev it · the dashboards</span>
            <h3>each dash comes alive like the real one</h3>
          </div>
          <XrDashes />
        </div>
      </section>

      <section className="ab-wrap ab-sec ab-tone xr-tone-parts">
        <div className="ab-head">
          <span className="ab-kick">take it apart</span>
          <h2>not to break it. to understand it.</h2>
        </div>
        <XrApart />
        <div className="xr-sub">
          <XrExplode />
        </div>
      </section>

      <section className="ab-wrap ab-sec ab-tone xr-tone-first">
        <div className="ab-head">
          <span className="ab-kick">universal design</span>
          <h2>built for someone wearing a headset for the very first time</h2>
          <p>it runs at exhibitions and in showrooms, where most visitors have never tried one. so every choice starts with them.</p>
        </div>
        <XrFirst />
      </section>

      {/* behind the scenes: development */}
      <section className="ab-wrap ab-sec ab-tone xr-tone-dev">
        <div className="ab-head">
          <span className="ab-kick">behind the scenes · xr development</span>
          <h2>from a downloaded model to a bike you can rev</h2>
          <p>adding a bike shouldn&apos;t take a week. i wrote editor tools so a new model goes through the same steps every time.</p>
        </div>
        <ol className="xr-pipe">
          {PIPELINE.map((s, i) => (
            <li key={s.t}>
              <span className="xr-glyph" aria-hidden="true"><s.icon /></span>
              <b>{s.t}</b>
              <small>{s.d}</small>
              {i < PIPELINE.length - 1 && <ArrowRight className="xr-pipe-arrow" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        <div className="xr-sub xr-split">
          <div className="ab-head">
            <span className="ab-kick">behind the scenes · problems solved</span>
            <h3>the things that broke, and how they got fixed</h3>
          </div>
          <ul className="xr-problems">
            {problems.map((p) => (
              <li key={p.t}>
                <b>{p.t}</b>
                <span>{p.d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="xr-sub">
          <div className="ab-head">
            <span className="ab-kick">behind the scenes · making the film</span>
            <h3>built, worn, tested, taken apart, put back together</h3>
          </div>
          <XrMaking />
        </div>
      </section>

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

      <section id="film" className="ab-wrap ab-sec ab-tone xr-tone-room">
        <div className="ab-head">
          <span className="ab-kick">the film</span>
          <h2>rather watch? the whole tour in four minutes</h2>
          <p>tap a chapter to jump straight to it.</p>
        </div>
        <XrFilm />
        <p className="xr-fine">bike names belong to their makers and are shown for demonstration only. the bikes&apos; own films are not shown here.</p>
      </section>

      <div className="ab-wrap">
        <MoreWork slug="xr-bike-showroom" />
      </div>
    </main>
  );
}
