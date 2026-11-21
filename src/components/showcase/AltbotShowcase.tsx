import Link from "next/link";
import {
  ArrowDown, AudioLines, Brain, Captions, Ear, FileSearch, Hand, Keyboard, Languages, ShieldCheck, Smile, SunMoon, Type,
  type LucideIcon,
} from "lucide-react";
import { siDotnet, siGitlfs, siGoogle, siHuggingface, siNvidia, siOnnx, siPython, siUnity, type SimpleIcon } from "simple-icons";
import { AltbotDemo } from "./AltbotDemo";
import { AltbotCastClip, AltbotEditions, AltbotFeatures, AltbotPromo, AltbotStaffBlocks } from "./AltbotBlocks";
import { AltbotFilm } from "./AltbotFilm";
import { MoreWork } from "./MoreWork";

/*
  altbot's own showcase page. Facts come from the ChatbotAI repo (CLAUDE.md + memory.txt);
  the live demo uses a made-up brand, "lumen living".
  Icons: lucide (ISC). Tech logos: simple-icons (CC0); tools without a logo there get a plain icon.
*/

function Logo({ icon, mono }: { icon: SimpleIcon; mono?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={`${icon.title} logo`} fill={mono ? "currentColor" : `#${icon.hex}`}>
      <path d={icon.path} />
    </svg>
  );
}

const process = [
  { fig: "2", unit: "languages", t: "the brief", b: "a realistic 3d host for showrooms. hindi and english, on-brand only, fully offline." },
  { fig: "3", unit: "checks", t: "text first", b: "proved in a plain text box that the brain stays on topic, before any audio existed." },
  { fig: "25", unit: "questions", t: "test, don't guess", b: "two model families side by side. gemma 3 4b: every answer right, best hindi, fastest." },
  { fig: "13 → 0", unit: "of 24 sentences", t: "listen like a machine", b: "a phoneme checker caught the hindi voice flipping gender mid-sentence. a fixed voice sample fixed it." },
  { fig: "105 → 20", unit: "ms lip-sync lag", t: "measure the mouth", b: "a per-frame trace of the mouth against the voice, tuned until they land together." },
  { fig: "46 → 30", unit: "% of the screen", t: "design with the owner", b: "a round portrait was rejected for a full-screen character with a slim glass card." },
  { fig: "3x", unit: "slower, then fixed", t: "chase the slow bits", b: "one soft shadow was slowing the hindi voice. it became a 1 px edge." },
];

const pipeline: { n: string; icon: LucideIcon; tool: string; logo?: SimpleIcon; body: string }[] = [
  { n: "hears", icon: Ear, tool: "whisper large-v3 turbo", body: "tells english from hindi by itself, then transcribes in that language." },
  { n: "checks", icon: FileSearch, tool: "bge-m3 + a reranker", logo: siHuggingface, body: "matches the question against the bot's own documents first." },
  { n: "thinks", icon: Brain, tool: "gemma 3 4b · llama.cpp", logo: siGoogle, body: "answers only from the passages it was handed, or says it doesn't know." },
  { n: "double-checks", icon: ShieldCheck, tool: "grounding check", body: "the draft is matched against the documents again before it is spoken." },
  { n: "speaks", icon: AudioLines, tool: "kokoro (onnx) · veena", logo: siOnnx, body: "english and indian hindi voices, streamed sentence by sentence." },
  { n: "lip-syncs", icon: Smile, tool: "ulipsync in unity", logo: siUnity, body: "the mouth is driven live from the audio, fed 70 ms ahead." },
];

const gate = [
  { t: "before the brain", b: "the question is matched against the documents. too far off topic and the ai is never called: a written, in-character refusal steers back." },
  { t: "while it thinks", b: "the brain only sees the matching passages and must answer from them. partial answers say what isn't known." },
  { t: "before it speaks", b: "the reply is matched against the documents again. if it drifted, a refusal is spoken instead." },
];

const access: { t: string; b: string; icon: LucideIcon }[] = [
  { icon: Hand, t: "talk, tap or type", b: "automatic listening, tap-to-talk, or the on-screen keyboard." },
  { icon: Captions, t: "every word is also written", b: "the reply is always on screen as text." },
  { icon: Type, t: "text & button size", b: "everything from 0.6x to 1.6x, live." },
  { icon: SunMoon, t: "light or dark", b: "dark by default, light one tap away." },
  { icon: Keyboard, t: "built for touch", b: "swipe scrolling, touch scrollbars, no hover-only controls." },
  { icon: Languages, t: "hindi, english, or mixed", b: "it answers in the language it heard." },
];

const cast = [
  { id: "maya", mode: "company expert", voices: "af_heart · veena kavya" },
  { id: "ethan", mode: "company expert", voices: "am_michael · veena vinaya" },
  { id: "iris", mode: "open chat", voices: "af_bella · hf_alpha" },
  { id: "leo", mode: "open chat", voices: "am_fenrir · veena vinaya" },
  { id: "pearl", mode: "company expert", voices: "af_heart · veena kavya" },
  { id: "peter", mode: "company expert", voices: "am_michael · veena vinaya" },
];

const stack: { n: string; use: string; logo?: SimpleIcon; mono?: boolean; icon?: LucideIcon }[] = [
  { n: "unity 6", use: "engine · urp · ui toolkit", logo: siUnity, mono: true },
  { n: "c# / .net", use: "all app code", logo: siDotnet },
  { n: "python", use: "the voice + search sidecar", logo: siPython },
  { n: "gemma 3 4b", use: "the brain, via llama.cpp", logo: siGoogle },
  { n: "whisper", use: "the ears, via whisper.unity", icon: Ear },
  { n: "kokoro + veena", use: "english and hindi voices", icon: AudioLines },
  { n: "onnx runtime", use: "runs kokoro on the gpu", logo: siOnnx, mono: true },
  { n: "hugging face", use: "bge-m3 search + reranker", logo: siHuggingface },
  { n: "nvidia cuda", use: "everything on one gpu", logo: siNvidia },
  { n: "ulipsync", use: "live lip-sync from audio", icon: Smile },
  { n: "git lfs", use: "art and models in the repo", logo: siGitlfs },
];

export function AltbotShowcase() {
  return (
    <main className="ab">
      <div className="ab-wrap ab-crumbs">
        <Link href="/work" data-label="back">← all work</Link>
        <span>made at altcore · 2026</span>
      </div>

      {/* hero */}
      <header className="ab-wrap ab-hero">
        <div className="ab-hero-copy">
          <span className="ab-kick">altbot</span>
          <h1>
            a 3d host that listens, talks back and <em>never needs the internet.</em>
          </h1>
          <p className="ab-lede">
            a life-size character for showroom screens. visitors ask out loud in hindi or english, and it answers only from the company&apos;s own documents. all on one pc.
          </p>
          <div className="ab-hero-cta">
            <a href="#features" className="ab-btn" data-label="explore">
              explore it <ArrowDown aria-hidden="true" />
            </a>
            <a href="#demo" className="ab-btn ghost" data-label="try it">try the demo</a>
          </div>
          <dl className="ab-meta">
            <div><dt>role</dt><dd>design, 3d, ai pipeline, unity</dd></div>
            <div><dt>for</dt><dd>altcore showrooms</dd></div>
            <div><dt>runs on</dt><dd>windows (+ a mac version)</dd></div>
          </dl>
        </div>
        <AltbotPromo />
      </header>

      <div className="ab-wrap">
        <dl className="ab-facts">
          <div><dt>0</dt><dd>cloud calls in the offline edition</dd></div>
          <div><dt>~1.3 s</dt><dd>to the first spoken word (english)</dd></div>
          <div><dt>2 → 44</dt><dd>languages: offline → online edition</dd></div>
          <div><dt>6</dt><dd>bots, each with its own face and voice</dd></div>
        </dl>
      </div>

      {/* process, early and short */}
      <section className="ab-sec ab-process">
        <div className="ab-wrap">
          <div className="ab-head">
            <span className="ab-kick">design process</span>
            <h2>how it got good</h2>
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

      {/* what it does */}
      <section id="features" className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">what it does</span>
          <h2>fourteen things, each one a real screen</h2>
          <p>keep scrolling: the screen beside the text is the running app, and it changes with every feature.</p>
        </div>
        <AltbotFeatures />
      </section>

      {/* demo */}
      <section id="demo" className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">try it</span>
          <h2>meet maya, working at lumen living</h2>
          <p>lumen living is a made-up furniture brand i wrote documents for. pick a question and watch what happens behind the scenes.</p>
        </div>
        <AltbotDemo />
      </section>

      {/* offline */}
      <section id="offline" className="ab-sec ab-offline">
        <div className="ab-wrap">
          <div className="ab-head">
            <span className="ab-kick">the highlight</span>
            <h2>everything happens on one pc. no internet, no cloud api.</h2>
            <p>six steps from a question to a spoken answer, all on the kiosk&apos;s own pc.</p>
          </div>
          <ol className="ab-flow">
            {pipeline.map((s, i) => (
              <li key={s.n} style={{ "--i": i } as React.CSSProperties}>
                <span className="ab-flow-top">
                  <span className="ab-flow-n">step {i + 1}</span>
                  <span className="ab-ico"><s.icon aria-hidden="true" /></span>
                </span>
                <h3>{s.n}</h3>
                <small>
                  {s.logo && <Logo icon={s.logo} mono />}
                  {s.tool}
                </small>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* gate */}
      <section className="ab-wrap ab-sec ab-split">
        <div className="ab-head">
          <span className="ab-kick">problem solving</span>
          <h2>an ai that doesn&apos;t make things up about your brand</h2>
          <p>a bot that invents a price is worse than no bot. a prompt alone wasn&apos;t trusted, so three checks sit around the ai, and greetings and refusals are written lines, never generated.</p>
        </div>
        <ol className="ab-gate">
          {gate.map((g, i) => (
            <li key={g.t}>
              <span>{i + 1}</span>
              <div>
                <h3>{g.t}</h3>
                <p>{g.b}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* online */}
      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">and when you want it</span>
          <h2>the online edition</h2>
          <p>same app, same bots. flip the switch to see what changes, and what never leaves the pc.</p>
        </div>
        <AltbotEditions />
      </section>

      {/* the staff menu */}
      <section id="staff" className="ab-sec ab-staff-sec">
        <div className="ab-wrap">
          <div className="ab-head">
            <span className="ab-kick">the staff menu · accessibility</span>
            <h2>run by showroom staff, not engineers</h2>
            <p>the people who look after a kiosk are sales and front-desk staff, standing at a touch screen with no keyboard. scroll through the real menu, page by page: what each page does, when it gets used, and why it&apos;s built that way.</p>
          </div>
          <AltbotStaffBlocks />
        </div>
      </section>

      {/* access */}
      <section className="ab-wrap ab-sec ab-access-sec">
        <figure className="ab-access-shot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/altbot/shots/f-lead-dark.webp" alt="the app's call-back form with its own on-screen keyboard" loading="lazy" decoding="async" />
        </figure>
        <div>
          <div className="ab-head">
            <span className="ab-kick">universal design</span>
            <h2>talk, tap, type or read</h2>
            <p>a showroom screen meets everyone, so there is always more than one way in.</p>
          </div>
          <ul className="ab-access">
            {access.map((a) => (
              <li key={a.t}>
                <span className="ab-ico"><a.icon aria-hidden="true" /></span>
                <div>
                  <h3>{a.t}</h3>
                  <p>{a.b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* cast */}
      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">the cast</span>
          <h2>multiple bots, one app</h2>
          <p>each has its own face, voice and brief. eyes glance and blink, and the mouth follows the voice live.</p>
        </div>
        <AltbotCastClip />
        <ul className="ab-cast">
          {cast.map((c) => (
            <li key={c.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/work/altbot/cast/${c.id}.webp`} alt={`${c.id}, one of the bots`} loading="lazy" decoding="async" />
              <div>
                <b>{c.id}</b>
                <span className={c.mode === "open chat" ? "open" : ""}>{c.mode}</span>
                <small>{c.voices}</small>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* the explainer */}
      <section id="film" className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">the explainer</span>
          <h2>or just watch it</h2>
          <p>the whole app in five minutes, recorded from the real build, or the short promo.</p>
        </div>
        <AltbotFilm />
      </section>

      {/* stack */}
      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">stack</span>
          <h2>under the hood</h2>
        </div>
        <ul className="ab-stack">
          {stack.map((s) => (
            <li key={s.n}>
              <span className="ab-logo">{s.logo ? <Logo icon={s.logo} mono={s.mono} /> : s.icon ? <s.icon aria-hidden="true" /> : null}</span>
              <b>{s.n}</b>
              <small>{s.use}</small>
            </li>
          ))}
        </ul>
      </section>

      <div className="ab-wrap">
        <MoreWork slug="altbot" />
      </div>
    </main>
  );
}
