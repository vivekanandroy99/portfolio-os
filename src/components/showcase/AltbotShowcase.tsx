import Link from "next/link";
import { AltbotDemo } from "./AltbotDemo";
import { AltbotFeatures, AltbotPromo, AltbotStaffBlocks } from "./AltbotBlocks";
import { AltbotFilm } from "./AltbotFilm";
import { MoreWork } from "./MoreWork";

/*
  altbot's own showcase page. Facts come from the ChatbotAI repo (CLAUDE.md + memory.txt);
  the live demo uses a made-up brand, "lumen living".
*/

const pipeline = [
  { n: "hears", tool: "whisper large-v3 turbo", body: "runs inside unity. tells english from hindi by itself, then transcribes in that language, never urdu script." },
  { n: "checks", tool: "bge-m3 + a reranker", body: "matches the question against the bot's own documents before anything else happens." },
  { n: "thinks", tool: "gemma 3 4b · llama.cpp", body: "answers only from the passages it was handed, or says it doesn't know." },
  { n: "double-checks", tool: "grounding check", body: "the draft reply is matched against the documents again before it's allowed out loud." },
  { n: "speaks", tool: "kokoro · veena", body: "english and indian hindi voices, streamed sentence by sentence so the first words start early." },
  { n: "lip-syncs", tool: "ulipsync · per-voice profiles", body: "the mouth is driven live from the audio, fed 70 ms ahead so lips and voice land together." },
];

const why = [
  { t: "visitor questions stay in the building", b: "nothing is sent anywhere. no transcripts on someone else's server, no privacy form to sign." },
  { t: "showroom wifi can't break it", b: "exhibition halls and sales galleries have terrible internet. altbot doesn't care." },
  { t: "no bill per question", b: "a busy weekend costs the same as a quiet one: the pc's electricity." },
  { t: "it stays the way you tuned it", b: "no model update somewhere else can change how it answers overnight." },
];

const gate = [
  { t: "before the brain", b: "the question is matched against the documents. too far off topic and the ai is never even called: a written, in-character refusal steers back to what it knows." },
  { t: "while it thinks", b: "the brain only sees the matching passages and must answer from them. partial answers say what isn't known instead of guessing." },
  { t: "before it speaks", b: "the reply is matched against the documents again. if it drifted, a refusal is spoken instead." },
];

const offlineOnline = [
  ["brain", "gemma 3 4b on the pc's gpu", "an online model, local brain as backup"],
  ["ears", "whisper on the pc", "online speech-to-text, whisper as backup"],
  ["voice", "kokoro + veena on the pc", "online voices, local voice as backup"],
  ["languages", "english + hindi (incl. hinglish)", "44: 12 indian, english and 30 world"],
  ["document search", "on the pc", "still on the pc"],
  ["what leaves the pc", "nothing", "only the question, the matching passages and the persona"],
  ["hardware", "a gaming-class gpu (~10.6 gb vram)", "an ordinary pc: the online build ships without the local models"],
];

const process = [
  { t: "the brief", b: "a customer-service host for showrooms: a realistic 3d person who listens and answers out loud in hindi and english, including indian-accented english, and only talks about the brand. fully offline." },
  { t: "prove the brain in text first", b: "before any audio, i built the brain with a text box to show it really stays on topic. a system prompt alone wasn't trusted, so the topic gate became three checks around the ai." },
  { t: "test, don't guess", b: "i put two model families side by side on 25 questions plus a fixed hindi translation set. gemma 3 4b got every answer right, wrote the best hindi, was the fastest and used the least graphics memory." },
  { t: "listen like a machine", b: "i can't hear audio, so the app records every sentence it speaks and a phoneme checker scores how clearly each word came through. that caught the hindi voice flipping from female to male mid-sentence in 7 to 13 of 24 sentences. continuing from a fixed voice sample took it to 0 of 24." },
  { t: "measure the mouth", b: "a per-frame trace of the lip-sync: the mouth went from 105 ms behind the voice to about 20 ms, and from open in 60% of silences to 19%." },
  { t: "design the screen with the owner", b: "a round portrait of the bot got rejected for a full-screen character with a frosted glass card. the card got a fixed height (growing with the text felt weird), and portrait tvs now scale to their width so the card takes 30% of the screen instead of 46%." },
  { t: "chase the slow bits", b: "a big soft shadow on the settings sheet was redrawn every frame and made the hindi voice 3x slower than real time. it's a 1 px edge now, and unity is capped at 60 fps so the voice gets the gpu." },
];

const access = [
  { t: "text & button size", b: "everything on screen from 0.6x to 1.6x, live." },
  { t: "light or dark", b: "dark by default, a light appearance one tap away." },
  { t: "talk, tap or type", b: "automatic listening (just start talking) with a noise filter, tap-to-talk for busy rooms, or the on-screen keyboard." },
  { t: "every word is also written", b: "the reply is always on screen as text, so it works for people who can't hear it too." },
  { t: "built for touch", b: "large touch screens with no mouse or keyboard: swipe scrolling, touch scrollbars, no hover-only controls." },
  { t: "hindi or english, mixed", b: "it detects the language itself and answers in the same one. hinglish works." },
];

const cast = [
  ["maya", "knowledge only", "af_heart / veena kavya"],
  ["ethan", "knowledge only", "am_michael / veena vinaya"],
  ["iris", "open chat", "af_bella / hf_alpha"],
  ["leo", "open chat", "am_fenrir / veena vinaya"],
  ["pearl", "knowledge only (p&i)", "af_heart / veena kavya"],
  ["peter", "knowledge only (p&i)", "am_michael / veena vinaya"],
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
            a life-size character for showroom screens. visitors ask out loud in hindi or english, it answers out loud with a lip-synced face, and it only talks about what&apos;s in the company&apos;s own documents. the whole thing runs on one pc.
          </p>
          <div className="ab-hero-cta">
            <a href="#features" className="ab-btn" data-label="explore">explore it ↓</a>
            <a href="#demo" className="ab-btn ghost" data-label="try it">try the demo</a>
            <a href="#offline" className="ab-btn ghost" data-label="why offline">why offline?</a>
          </div>
        </div>
        <AltbotPromo />
      </header>

      <div className="ab-wrap">
        <dl className="ab-facts">
          <div><dt>0</dt><dd>cloud calls in the offline edition</dd></div>
          <div><dt>~1.3 s</dt><dd>to the first spoken word (english)</dd></div>
          <div><dt>2 → 44</dt><dd>languages: offline → online edition</dd></div>
          <div><dt>6</dt><dd>bots, each with its own face, voice and brief</dd></div>
        </dl>
        <dl className="ab-meta">
          <div><dt>role</dt><dd>design, 3d, ai pipeline, unity development</dd></div>
          <div><dt>for</dt><dd>altcore showrooms</dd></div>
          <div><dt>runs on</dt><dd>windows (+ a mac version)</dd></div>
        </dl>
      </div>

      {/* demo */}
      {/* what it does */}
      <section id="features" className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">what it does</span>
          <h2>fourteen things, each one a real screen</h2>
          <p>no mock-ups here: every block is a screenshot of the running app. open one to see the screen, how it works and one design decision behind it.</p>
        </div>
        <AltbotFeatures />
      </section>

      <section id="demo" className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">try it</span>
          <h2>meet maya, working at lumen living</h2>
          <p>lumen living is a made-up furniture brand i wrote documents for. ask her about delivery, a sofa, the catalogue, or something she shouldn&apos;t answer. switch to hindi, or to the online edition, and watch what changes behind the scenes.</p>
        </div>
        <AltbotDemo />
      </section>

      {/* offline */}
      <section id="offline" className="ab-sec ab-offline">
        <div className="ab-wrap">
          <div className="ab-head">
            <span className="ab-kick">the highlight</span>
            <h2>everything happens on one pc. no internet, no cloud api.</h2>
            <p>ears, brain, document search, voice and face all run locally. it&apos;s shipped as a plug-and-play windows build with its own python runtime and models inside, so a new showroom pc just needs the folder.</p>
          </div>
          <ol className="ab-pipe">
            {pipeline.map((s, i) => (
              <li key={s.n} style={{ ["--i" as string]: i }}>
                <span className="ab-pipe-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.n}</h3>
                <code>{s.tool}</code>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="ab-why">
            {why.map((w) => (
              <div key={w.t}>
                <h3>{w.t}</h3>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
          <div className="ab-numbers">
            <div><b>~1.3 s</b><span>english, question to first word</span></div>
            <div><b>~3.1–3.8 s</b><span>hindi, including translation</span></div>
            <div><b>~10.6 gb</b><span>graphics memory for everything</span></div>
            <div><b>0.73x</b><span>real time: the hindi voice outruns playback</span></div>
          </div>
        </div>
      </section>

      {/* gate */}
      <section className="ab-wrap ab-sec ab-split">
        <div className="ab-head">
          <span className="ab-kick">problem solving</span>
          <h2>an ai that doesn&apos;t make things up about your brand</h2>
          <p>a customer-service bot that invents a price is worse than no bot. a system prompt alone wasn&apos;t trusted, so there&apos;s no topic list to maintain: each bot&apos;s knowledge is just its documents, and three checks sit around the ai. greetings and refusals come from written lines, never from the ai, since it once &ldquo;answered&rdquo; a brand question as small talk with an invented fact.</p>
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
          <p>same app, same bots. the brain, the ears and the voice each get their own online switch, and each falls back to the local one if the connection drops. there&apos;s also a separate online build that leaves the big local models out, for ordinary pcs. api keys live in a secret store and never travel with a build.</p>
        </div>
        <div className="ab-table" role="table" aria-label="offline vs online">
          <div className="row head" role="row">
            <span role="columnheader" />
            <span role="columnheader">offline (default)</span>
            <span role="columnheader">online</span>
          </div>
          {offlineOnline.map(([k, a, b]) => (
            <div className="row" role="row" key={k}>
              <span role="rowheader">{k}</span>
              <span role="cell">{a}</span>
              <span role="cell">{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* actions */}
      {/* process */}
      <section className="ab-wrap ab-sec ab-process">
        <div className="ab-head">
          <span className="ab-kick">design process</span>
          <h2>how it got good</h2>
        </div>
        <ol>
          {process.map((p, i) => (
            <li key={p.t}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{p.t}</h3>
                <p>{p.b}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* the staff menu */}
      <section id="staff" className="ab-sec ab-staff-sec">
        <div className="ab-wrap">
          <div className="ab-head">
            <span className="ab-kick">the staff menu · accessibility</span>
            <h2>run by showroom staff, not engineers</h2>
            <p>the people who look after a kiosk are sales and front-desk staff, standing at a touch screen with no keyboard. so everything they might need lives in one menu behind a sign-in, written in plain words. every page below is a real screenshot.</p>
          </div>
          <AltbotStaffBlocks />
        </div>
      </section>

      <section className="ab-wrap ab-sec ab-split">
        <div className="ab-head">
          <span className="ab-kick">accessibility + universal design</span>
          <h2>talk, tap, type or read</h2>
          <p>a showroom screen meets everyone: people who&apos;d rather not speak to a machine, people who can&apos;t hear it well, people more at home in hindi. so there&apos;s always more than one way in, and the settings for it sit in the menu, not in a config file.</p>
        </div>
        <ul className="ab-access">
          {access.map((a) => (
            <li key={a.t}>
              <h3>{a.t}</h3>
              <p>{a.b}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* the explainer */}
      <section id="film" className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ab-kick">the explainer</span>
          <h2>or just watch it</h2>
          <p>the whole app in five minutes, recorded from the real build, or the one-minute promo.</p>
        </div>
        <AltbotFilm />
      </section>

      {/* cast + stack */}
      <section className="ab-wrap ab-sec ab-two">
        <div>
          <div className="ab-head">
            <span className="ab-kick">the cast</span>
            <h2>six bots, one app</h2>
            <p>character creator 4 actors with 150+ face shapes, idle and talk motions per gender, eyes that glance and blink, and lighting looks per bot.</p>
          </div>
          <div className="ab-cast" role="table" aria-label="bots">
            {cast.map(([n, m, v]) => (
              <div role="row" key={n}>
                <b role="cell">{n}</b>
                <span role="cell">{m}</span>
                <small role="cell">{v}</small>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="ab-head">
            <span className="ab-kick">stack</span>
            <h2>under the hood</h2>
          </div>
          <dl className="ab-stack">
            <div><dt>engine</dt><dd>unity 6 · urp · ui toolkit</dd></div>
            <div><dt>ai, local</dt><dd>llmunity / llama.cpp · gemma 3 4b · whisper.unity · bge-m3 + bge-reranker</dd></div>
            <div><dt>voice</dt><dd>python sidecar · kokoro-82m (onnx) · veena 3b (gguf)</dd></div>
            <div><dt>face + body</dt><dd>reallusion cc4 · ulipsync · playables api</dd></div>
            <div><dt>online</dt><dd>swappable providers for brain, ears and voice</dd></div>
            <div><dt>ships as</dt><dd>portable windows build · mac setup script</dd></div>
          </dl>
        </div>
      </section>

      <div className="ab-wrap">
        <MoreWork slug="altbot" />
      </div>
    </main>
  );
}
