import Link from "next/link";
import {
  ArrowDown, Check, Languages, Users, WifiOff, Zap, MessageCircleQuestion, Volume2, X, AudioLines, Brain, Ear, FileSearch, ShieldCheck, Smile,
  type LucideIcon,
} from "lucide-react";
import { siDotnet, siGitlfs, siGoogle, siHuggingface, siNvidia, siOnnx, siPython, siUnity, type SimpleIcon } from "simple-icons";
import { AltbotDemo } from "./AltbotDemo";
import { AltbotAccess, AltbotCastClip, AltbotEditions, AltbotFeatures, AltbotPromo, AltbotStaffBlocks } from "./AltbotBlocks";
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
  { fig: "2", unit: "languages", t: "the brief", b: "a life-size 3d host for showrooms. it speaks hindi and english, only talks about the company, and works with no internet." },
  { fig: "3", unit: "safety checks", t: "make it honest first", b: "before it had a voice or a face, i tested it by typing questions, to prove it never makes things up about the brand." },
  { fig: "25", unit: "test questions", t: "test, don't guess", b: "i asked several ai models the same 25 questions. one got every answer right, spoke the best hindi and was the fastest, so it won." },
  { fig: "13 → 0", unit: "glitches in 24 sentences", t: "fix what people hear", b: "the hindi voice sometimes slipped from a woman's voice to a man's mid-sentence. i built a checker to catch it, then fixed it." },
  { fig: "105 → 20", unit: "milliseconds", t: "lips in time with the voice", b: "her lips moved a tenth of a second late. i measured it frame by frame and tuned it until lips and voice land together." },
  { fig: "3x", unit: "slower, then fixed", t: "hunt down the slowdowns", b: "one blurry shadow in the menu was making the hindi voice three times slower and choppy. a thin line in its place fixed it." },
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
  { t: "before the brain", h: "is it even about us?", b: "the question is matched against the bot's own documents. the ai isn't called yet.", pass: "close enough: go on", fail: "far off topic: stop here" },
  { t: "while it thinks", h: "answer only from the pages", b: "the ai sees just the passages that matched and must answer from them, or say it doesn't know. partial answers say what's missing.", pass: "answered from the passages", fail: "nothing there: stop here" },
  { t: "before it speaks", h: "did the answer drift?", b: "the finished reply is matched against the documents again, before a single word is spoken.", pass: "still grounded: speak it", fail: "drifted: stop here" },
];

const facts: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: WifiOff, t: "fully offline", d: "no internet needed. nothing a visitor says leaves the pc." },
  { icon: Zap, t: "instant replies", d: "it starts talking about 1.3 seconds after you finish asking (english)." },
  { icon: Languages, t: "many languages", d: "hindi and english offline. 44 with the online version." },
  { icon: Users, t: "multiple bots", d: "six characters, each with their own face, voice and job." },
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
  { n: "unity 6", use: "the 3d world, the character and the screens", logo: siUnity, mono: true },
  { n: "c# / .net", use: "the language the app is written in", logo: siDotnet },
  { n: "python", use: "a helper for the voices and document search", logo: siPython },
  { n: "gemma 3 4b", use: "the brain that writes the answers", logo: siGoogle },
  { n: "whisper", use: "the ears: turns speech into text", icon: Ear },
  { n: "kokoro + veena", use: "the english and hindi voices", icon: AudioLines },
  { n: "onnx runtime", use: "keeps the english voice quick", logo: siOnnx, mono: true },
  { n: "hugging face", use: "the models that search the documents", logo: siHuggingface },
  { n: "nvidia cuda", use: "lets it all share one graphics card", logo: siNvidia },
  { n: "ulipsync", use: "moves the lips in time with the voice", icon: Smile },
  { n: "git lfs", use: "keeps the big 3d and ai files versioned", logo: siGitlfs },
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
            i built a life-size character for showroom screens. you walk up, ask something out loud in hindi or english, and it answers using only what the company has written down. the whole thing runs on one pc.
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
      <section id="features" className="ab-wrap ab-sec ab-tone ab-tone-blue">
        <div className="ab-head">
          <span className="ab-kick">what it does</span>
          <h2>fourteen things it can do, shown in the real app</h2>
          <p>keep scrolling. every clip beside the text was recorded from the actual app, not a mock-up.</p>
        </div>
        <AltbotFeatures />
      </section>

      {/* demo */}
      <section id="demo" className="ab-wrap ab-sec ab-tone ab-tone-sand">
        <div className="ab-head">
          <span className="ab-kick">try it</span>
          <h2>say hi to maya, the host at lumen living</h2>
          <p>lumen living isn&apos;t real. i made it up and wrote its documents so you can try maya right here. pick a question and see what goes on behind the scenes.</p>
        </div>
        <AltbotDemo />
      </section>

      {/* offline */}
      <section id="offline" className="ab-sec ab-offline">
        <div className="ab-wrap">
          <div className="ab-head">
            <span className="ab-kick">the highlight</span>
            <h2>it all runs on one computer. no internet needed.</h2>
            <p>here&apos;s what happens between your question and her answer. every step runs on the kiosk&apos;s own pc.</p>
          </div>
          <ol className="ab-flow">
            {pipeline.map((s, i) => (
              <li key={s.n} style={{ "--i": i } as React.CSSProperties}>
                <div className="ab-flow-card">
                <span className="ab-flow-top">
                  <span className="ab-flow-n">step {i + 1}</span>
                  <span className="ab-ico"><s.icon aria-hidden="true" /></span>
                </span>
                <h3>{s.n}</h3>
                <small>
                  {s.logo && <Logo icon={s.logo} mono />}
                  {s.tool}
                </small>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* gate */}
      <section id="gate" className="ab-wrap ab-sec ab-split ab-tone ab-tone-slate">
        <div className="ab-head ab-gate-head">
          <span className="ab-kick">problem solving</span>
          <h2>an ai that doesn&apos;t make things up about your brand</h2>
          <p>a bot that makes up a price is worse than no bot at all. just telling the ai to behave wasn&apos;t enough, so every question has to pass three checks. if it fails any of them, the visitor gets a friendly no instead of a guess.</p>
          <p className="ab-gate-aside">greetings, thanks and &ldquo;who are you?&rdquo; never reach the ai either: they&apos;re answered from written lines.</p>
        </div>
        <div className="ab-gflow-wrap">
        <ol className="ab-gflow" aria-label="what happens to a question, step by step">
          <li className="ab-gflow-end start">
            <span className="ab-gflow-dot"><MessageCircleQuestion aria-hidden="true" /></span>
            <div>
              <small>a visitor asks</small>
              <q>what does the oriveta breeze do?</q>
            </div>
          </li>
          {gate.map((g, i) => (
            <li key={g.t} className="ab-gflow-check">
              <span className="ab-gflow-dot">{i + 1}</span>
              <div className="ab-gflow-card">
                <small>check {i + 1} · {g.t}</small>
                <h3>{g.h}</h3>
                <p>{g.b}</p>
                <div className="ab-gflow-ways">
                  <span className="pass"><Check aria-hidden="true" />{g.pass}</span>
                  <span className="fail"><X aria-hidden="true" />{g.fail}</span>
                </div>
              </div>
            </li>
          ))}
          <li className="ab-gflow-end done">
            <span className="ab-gflow-dot"><Volume2 aria-hidden="true" /></span>
            <div>
              <small>only then is it spoken</small>
              <q>the oriveta breeze is our air purifier; it cleans the air in a room of up to 40 square metres&hellip;</q>
            </div>
          </li>
        </ol>
          <div className="ab-gflow-no" aria-label="what a failed check sounds like">
            <span className="ab-gflow-dot"><X aria-hidden="true" /></span>
            <div>
              <small>any check fails: a written, in-character line</small>
              <q>that&apos;s out of syllabus for me. try me on oriveta home instead!</q>
              <em>asked: &ldquo;who won the cricket match yesterday?&rdquo;</em>
            </div>
          </div>
        </div>
      </section>

      {/* online */}
      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">the online edition</span>
          <h2>need more languages? there&apos;s an online version</h2>
          <p>it&apos;s the same app with the same characters. flip the switch to see what changes, and what stays on the pc either way.</p>
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
      <section id="universal" className="ab-wrap ab-sec ab-tone ab-tone-ice">
        <div className="ab-head">
          <span className="ab-kick">universal design</span>
          <h2>talk, tap, type or read</h2>
          <p>a showroom screen meets everyone: people who&apos;d rather type, people who read better than they listen, hindi speakers, and staff on a touch screen with no keyboard. so there&apos;s always more than one way in.</p>
        </div>
        <AltbotAccess />
      </section>

      {/* cast */}
      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">the cast</span>
          <h2>six characters, one app</h2>
          <p>each one has its own face, voice and job. they blink, glance around and nod, and their lips follow the voice as they speak.</p>
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

      {/* stack */}
      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">the tools</span>
          <h2>what it&apos;s built with</h2>
          <p>the main pieces behind it, and the job each one does.</p>
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

      {/* the walkthrough */}
      <section id="film" className="ab-wrap ab-sec ab-tone ab-tone-sand">
        <div className="ab-head">
          <span className="ab-kick">the walkthrough</span>
          <h2>rather watch? here&apos;s the whole tour</h2>
          <p>five minutes, recorded from the real app. tap a chapter to jump straight to it.</p>
        </div>
        <AltbotFilm />
      </section>

      <div className="ab-wrap">
        <MoreWork slug="altbot" />
      </div>
    </main>
  );
}
