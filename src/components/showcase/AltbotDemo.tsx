"use client";

import { useEffect, useRef, useState } from "react";

/*
  A scripted stand-in for the real altbot running at a made-up brand, "lumen living".
  Nothing here calls an ai: every reply, score and timing is written by hand to show how the real
  app behaves (written small talk, the topic gate, partial answers, hindi, showing things, online languages).
*/

type Lang = "en" | "hi";
type Mode = "offline" | "online";
type Kind = "smalltalk" | "answer" | "partial" | "refusal" | "show" | "callback";

type Turn = {
  id: string;
  kind: Kind;
  q: Record<Lang, string>;
  a: Record<Lang, string>;
  rewrite?: string; // what the router turns the question into
  score?: number; // document match (gate 1)
  grounding?: number; // reply vs documents (gate 2)
  source?: string;
  words: string[]; // keywords for typed questions
  onlineOnly?: boolean;
};

const BRAND = "lumen living";
const GATE = 0.55;
const GROUND = 0.45;

const TURNS: Turn[] = [
  {
    id: "hi",
    kind: "smalltalk",
    q: { en: "hi! who are you?", hi: "नमस्ते! आप कौन हैं?" },
    a: {
      en: "hi, i'm maya, lumen living's host. ask me about our sofas, stores, delivery or free design help.",
      hi: "नमस्ते, मैं माया हूँ, Lumen Living की host। आप मुझसे हमारे sofas, stores, delivery या design help के बारे में पूछ सकते हैं।",
    },
    words: ["hi", "hello", "hey", "who are you", "namaste", "नमस्ते"],
  },
  {
    id: "delivery",
    kind: "answer",
    q: { en: "do you deliver to pune?", hi: "क्या आप पुणे में delivery करते हैं?" },
    a: {
      en: "yes! we deliver across pune and mumbai in 7 to 10 days, and delivery is free on orders above ₹25,000.",
      hi: "जी हाँ! हम पुणे और मुंबई में 7 से 10 दिन में delivery करते हैं, और ₹25,000 से ऊपर के orders पर delivery free है।",
    },
    rewrite: "Does Lumen Living deliver to Pune?",
    score: 0.74,
    grounding: 0.81,
    source: "delivery & returns.pdf · page 2",
    words: ["deliver", "delivery", "shipping", "pune", "mumbai"],
  },
  {
    id: "sofa",
    kind: "answer",
    q: { en: "is the oslo sofa available in green?", hi: "क्या Oslo sofa हरे रंग में मिलता है?" },
    a: {
      en: "the oslo three-seater comes in sage green, sand and charcoal. sage green is on the floor at our baner store right now.",
      hi: "Oslo three-seater sage green, sand और charcoal में आता है। Sage green अभी हमारे Baner store में रखा है।",
    },
    rewrite: "Is the Oslo sofa available in green?",
    score: 0.69,
    grounding: 0.77,
    source: "product guide 2026.pptx · slide 14",
    words: ["sofa", "oslo", "green", "colour", "color", "couch"],
  },
  {
    id: "catalogue",
    kind: "show",
    q: { en: "show me the catalogue", hi: "मुझे catalogue दिखाओ" },
    a: {
      en: "here's our autumn catalogue. want me to walk you through it?",
      hi: "ये रहा हमारा autumn catalogue। क्या मैं आपको इसके बारे में बताऊँ?",
    },
    source: "matched without the ai: a show request + the deck's title",
    words: ["show", "catalogue", "catalog", "brochure", "dikhao", "दिखाओ"],
  },
  {
    id: "warranty",
    kind: "partial",
    q: { en: "what's the warranty on mattresses?", hi: "mattress पर कितनी warranty है?" },
    a: {
      en: "our mattresses have a 10-year warranty on the core. i don't have details on the cover fabric, but the store team can help with that.",
      hi: "हमारे mattresses के core पर 10 साल की warranty है। Cover fabric की जानकारी मेरे पास नहीं है, पर store team आपकी मदद कर सकती है।",
    },
    rewrite: "What is the warranty on Lumen Living mattresses?",
    score: 0.66,
    grounding: 0.72,
    source: "care & warranty.docx · section 3",
    words: ["warranty", "guarantee", "mattress"],
  },
  {
    id: "consult",
    kind: "answer",
    q: { en: "do you do design consultations at home?", hi: "क्या आप घर पर design consultation देते हैं?" },
    a: {
      en: "yes, and it's free. a designer visits, measures your room and makes a 3d plan before you buy anything.",
      hi: "हाँ, और ये free है। हमारे designer घर आकर measurements लेते हैं और कुछ भी खरीदने से पहले 3D plan बनाते हैं।",
    },
    rewrite: "Does Lumen Living offer design consultations at home?",
    score: 0.71,
    grounding: 0.79,
    source: "services.pdf · page 1",
    words: ["design", "consultation", "designer", "interior", "plan", "visit"],
  },
  {
    id: "callback",
    kind: "callback",
    q: { en: "can someone call me back?", hi: "क्या कोई मुझे call back कर सकता है?" },
    a: {
      en: "sure, leave your name and number and our design team will call you.",
      hi: "ज़रूर, अपना नाम और नंबर दे दीजिए, हमारी design team आपको call करेगी।",
    },
    source: "matched without the ai: a call-back request",
    words: ["call", "callback", "phone", "contact me", "number"],
  },
  {
    id: "cricket",
    kind: "refusal",
    q: { en: "who won the cricket match yesterday?", hi: "कल का cricket match किसने जीता?" },
    a: {
      en: "ha, i'm strictly a sofa expert! ask me about our furniture, stores or design consultations.",
      hi: "अरे, मैं तो बस furniture की expert हूँ! आप मुझसे हमारे sofas, stores या design consultation के बारे में पूछिए।",
    },
    rewrite: "Who won the cricket match yesterday? (GENERAL)",
    score: 0.21,
    words: [],
  },
];

const TAMIL: Turn = {
  id: "tamil",
  kind: "answer",
  q: { en: "உங்கள் கடை எத்தனை மணிக்கு திறக்கும்?", hi: "உங்கள் கடை எத்தனை மணிக்கு திறக்கும்?" },
  a: {
    en: "எங்கள் கடைகள் தினமும் காலை 10 மணி முதல் இரவு 9 மணி வரை திறந்திருக்கும்.",
    hi: "எங்கள் கடைகள் தினமும் காலை 10 மணி முதல் இரவு 9 மணி வரை திறந்திருக்கும்.",
  },
  rewrite: "What time do Lumen Living stores open?",
  score: 0.72,
  grounding: 0.8,
  source: "store locations.pdf · page 1",
  words: ["tamil"],
  onlineOnly: true,
};

type Msg = { who: "you" | "bot"; text: string; turn: Turn; lang: Lang | "ta"; mode: Mode; id: number };

function trace(m: Msg) {
  const t = m.turn;
  const online = m.mode === "online";
  const hi = m.lang === "hi";
  const ta = m.lang === "ta";
  const rows: { k: string; v: string; state: "ok" | "skip" | "stop" | "info"; bar?: { val: number; min: number } }[] = [];
  rows.push({
    k: "ears",
    v: ta
      ? "online ears · heard tamil"
      : online
        ? `online ears · heard ${hi ? "hindi" : "english"} (falls back to whisper on this pc)`
        : hi
          ? "whisper large-v3 turbo · hindi 93%, transcribed as hindi"
          : "whisper large-v3 turbo · english",
    state: "ok",
  });
  if (t.kind === "smalltalk") {
    rows.push({ k: "router", v: "small talk → a written line, the ai never makes it up", state: "ok" });
    rows.push({ k: "gate", v: "not needed", state: "skip" });
  } else if (t.kind === "show" || t.kind === "callback") {
    rows.push({ k: "screen", v: t.source ?? "", state: "ok" });
    rows.push({ k: "router", v: "skipped: handled before any answering", state: "skip" });
  } else {
    rows.push({ k: "router", v: t.kind === "refusal" ? "general knowledge (news, sport, weather): needs a full match" : `${hi || ta ? "translated + " : ""}rewritten: “${t.rewrite}”`, state: "ok" });
    const pass = (t.score ?? 0) >= GATE;
    rows.push({
      k: "gate 1",
      v: pass ? `matches the documents · ${t.source}` : "general knowledge, nothing in the documents",
      state: pass ? "ok" : "stop",
      bar: { val: t.score ?? 0, min: GATE },
    });
    if (pass) {
      rows.push({
        k: "brain",
        v: online ? "online brain · gets only the question, the passages and the persona" : "gemma 3 4b on this pc · answers from 6 passages only",
        state: "ok",
      });
      rows.push({ k: "gate 2", v: t.kind === "partial" ? "grounded · says what it doesn't know" : "the reply is grounded in the documents", state: "ok", bar: { val: t.grounding ?? 0, min: GROUND } });
      if (hi || ta) rows.push({ k: "translate", v: `english answer → ${ta ? "tamil (online)" : "everyday hindi, one sentence at a time"}`, state: "ok" });
    } else {
      rows.push({ k: "brain", v: "never called", state: "skip" });
      rows.push({ k: "refusal", v: "an in-character line from a written bank", state: "info" });
    }
  }
  rows.push({
    k: "voice",
    v: ta ? "online voice" : online ? "online voice (local voice as backup)" : hi ? "veena kavya · natural indian hindi" : "kokoro af_heart · on the gpu",
    state: "ok",
  });
  const first = t.kind === "smalltalk" ? (hi ? 1.6 : 0.6) : t.kind === "refusal" ? (hi ? 1.4 : 0.5) : hi ? 3.4 : ta ? 2.6 : online ? 1.5 : 1.3;
  return { rows, first };
}

function Slides({ i }: { i: number }) {
  const slides = [
    { t: "autumn '26", s: "the lumen living collection", c: "s1" },
    { t: "the oslo", s: "three-seater · sage, sand, charcoal", c: "s2" },
    { t: "free design help", s: "a designer, a tape measure, a 3d plan", c: "s3" },
  ];
  const s = slides[i % slides.length];
  return (
    <div className={`ab-slide ${s.c}`}>
      <small>{BRAND} · {String((i % 3) + 1).padStart(2, "0")}/03</small>
      <b>{s.t}</b>
      <span>{s.s}</span>
    </div>
  );
}

export function AltbotDemo() {
  const [lang, setLang] = useState<Lang>("en");
  const [mode, setMode] = useState<Mode>("offline");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState<"" | "listening" | "thinking" | "speaking">("");
  const [typed, setTyped] = useState("");
  const [shown, setShown] = useState(0); // words of the last bot line revealed
  const [panel, setPanel] = useState<"" | "deck" | "form">("");
  const [slide, setSlide] = useState(0);
  const [sent, setSent] = useState(false);
  const [input, setInput] = useState("");
  const touched = msgs.length > 0 || busy !== "";
  const timers = useRef<number[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, reduce ? 0 : ms));
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, shown, reduce]);

  function ask(turn: Turn, asLang: Lang | "ta" = lang, text?: string) {
    if (busy) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const id = ++idRef.current;
    const qText = text ?? (asLang === "ta" ? turn.q.en : turn.q[asLang]);
    setMsgs((m) => [...m, { who: "you", text: qText, turn, lang: asLang, mode, id }]);
    setBusy("thinking");
    setShown(0);
    if (turn.kind !== "show") setPanel((p) => (p === "deck" && turn.kind === "callback" ? "" : p));
    const think = turn.kind === "smalltalk" || turn.kind === "refusal" ? 500 : asLang === "en" ? 1000 : 1700;
    later(() => {
      const reply = asLang === "ta" ? turn.a.en : turn.a[asLang];
      setMsgs((m) => [...m, { who: "bot", text: reply, turn, lang: asLang, mode, id: id + 0.5 }]);
      setBusy("speaking");
      if (turn.kind === "show") {
        setPanel("deck");
        setSlide(0);
      }
      if (turn.kind === "callback") {
        setPanel("form");
        setSent(false);
      }
      const words = reply.split(" ");
      words.forEach((_, i) => later(() => setShown(i + 1), 110 * (i + 1)));
      later(() => setBusy(""), 110 * words.length + 400);
    }, think);
  }

  function listen() {
    if (busy) return;
    const asked = new Set(msgs.filter((m) => m.who === "you").map((m) => m.turn.id));
    const next = TURNS.find((t) => !asked.has(t.id)) ?? TURNS[1];
    setBusy("listening");
    timers.current.push(
      window.setTimeout(() => {
        setBusy("");
        ask(next);
      }, reduce ? 0 : 1200),
    );
  }

  function submitTyped(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q || busy) return;
    const low = q.toLowerCase();
    const hit = TURNS.find((t) => t.words.some((w) => low.includes(w)));
    const isHindi = /[ऀ-ॿ]/.test(q);
    ask(hit ?? TURNS[TURNS.length - 1], isHindi ? "hi" : "en", q);
    setInput("");
  }

  const lastBot = [...msgs].reverse().find((m) => m.who === "bot");
  const lastYou = [...msgs].reverse().find((m) => m.who === "you");
  const tr = lastYou ? trace(lastYou) : null;
  const state = busy || (msgs.length ? "ready" : "ready");

  return (
    <div className={`ab-demo ${mode}`}>
      <div className="ab-demo-bar" role="group" aria-label="demo settings">
        <div className="ab-seg" role="radiogroup" aria-label="visitor speaks">
          <span>visitor speaks</span>
          {(["en", "hi"] as Lang[]).map((l) => (
            <button key={l} role="radio" aria-checked={lang === l} className={lang === l ? "on" : ""} onClick={() => setLang(l)} data-label={l === "en" ? "english" : "hindi"}>
              {l === "en" ? "english" : "हिंदी"}
            </button>
          ))}
        </div>
        <div className="ab-seg" role="radiogroup" aria-label="mode">
          <span>runs</span>
          {(["offline", "online"] as Mode[]).map((m) => (
            <button key={m} role="radio" aria-checked={mode === m} className={mode === m ? "on" : ""} onClick={() => setMode(m)} data-label={m}>
              {m === "offline" ? "offline, on this pc" : "online edition"}
            </button>
          ))}
        </div>
      </div>

      <div className="ab-demo-grid">
        <span className="ab-col-tag app">the app · a showroom screen</span>
        <span className="ab-col-tag site">what's going on inside</span>
        {/* the kiosk screen */}
        <div className={`ab-stage ${panel ? "room" : ""} st-${state}`}>
          <div className="ab-stage-bg" aria-hidden="true" />
          <span className="ab-net" aria-live="polite">
            <i />
            {mode === "offline" ? "no internet needed" : "online edition · 44 languages"}
          </span>

          {panel && (
            <div className="ab-panel" role="dialog" aria-label={panel === "deck" ? "catalogue" : "call-back form"}>
              <button className="ab-x" onClick={() => setPanel("")} aria-label="close">×</button>
              {panel === "deck" ? (
                <>
                  <Slides i={slide} />
                  <div className="ab-panel-nav">
                    <button onClick={() => setSlide((s) => (s + 2) % 3)} aria-label="previous slide">‹</button>
                    <span>swipe or say “next”</span>
                    <button onClick={() => setSlide((s) => (s + 1) % 3)} aria-label="next slide">›</button>
                  </div>
                </>
              ) : sent ? (
                <div className="ab-form done">
                  <b>thanks! 🙌</b>
                  <span>the team will call you today. (demo: nothing was saved)</span>
                </div>
              ) : (
                <form
                  className="ab-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <b>call me back</b>
                  <label>
                    name
                    <input placeholder="priya" autoComplete="off" />
                  </label>
                  <label>
                    phone
                    <input placeholder="10 digits" inputMode="numeric" autoComplete="off" />
                  </label>
                  <button type="submit">send</button>
                </form>
              )}
            </div>
          )}

          <div className="ab-dock">
            <div className="ab-chat" ref={scroller} aria-live="polite">
              {msgs.length === 0 && <p className="ab-empty">ask maya anything about {BRAND}. tap a question below, or the mic.</p>}
              {msgs.map((m) => {
                const isLast = m === lastBot;
                const text = isLast && busy === "speaking" ? m.text.split(" ").slice(0, shown).join(" ") : m.text;
                return (
                  <p key={m.id} className={`ab-msg ${m.who}`} lang={m.lang === "hi" ? "hi" : m.lang === "ta" ? "ta" : "en"}>
                    {text}
                  </p>
                );
              })}
              {busy === "thinking" && (
                <p className="ab-msg bot typing" aria-label="thinking">
                  <i />
                  <i />
                  <i />
                </p>
              )}
            </div>
            <div className="ab-controls">
              <button className={`ab-mic ${busy === "listening" ? "live" : ""}`} onClick={listen} aria-label="tap to talk" data-label="tap to talk" disabled={!!busy && busy !== "listening"}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-2.1A7 7 0 0 0 19 12h-2Z" fill="currentColor" />
                </svg>
              </button>
              {!touched && (
                <span className="ab-finger" aria-hidden="true">
                  <b>👇</b>
                  <small>tap to talk</small>
                </span>
              )}
              <span className="ab-state">
                {busy === "listening" ? "listening…" : busy === "thinking" ? "thinking…" : busy === "speaking" ? "speaking" : "tap to talk"}
              </span>
              <span className={`ab-wave ${busy === "speaking" ? "on" : ""}`} aria-hidden="true">
                {Array.from({ length: 9 }).map((_, i) => (
                  <i key={i} style={{ animationDelay: `${(i % 4) * 0.12}s` }} />
                ))}
              </span>
            </div>
          </div>
        </div>

        {/* behind the scenes */}
        <aside className="ab-trace" aria-label="what happened behind the scenes">
          <div className="ab-trace-head">
            <span className="ab-kick">behind the scenes</span>
            {tr && <b>first sound in ~{tr.first.toFixed(1)} s</b>}
          </div>
          {!tr ? (
            <p className="ab-trace-empty">ask something and watch each step: what it heard, whether the question is about {BRAND} at all, what the brain read, and the check before anything is spoken.</p>
          ) : (
            <ol key={lastYou?.id}>
              {tr.rows.map((r, i) => (
                <li key={r.k} className={r.state} style={{ animationDelay: `${i * 0.12}s` }}>
                  <span className="k">{r.k}</span>
                  <span className="v">{r.v}</span>
                  {r.bar && (
                    <span className="bar" aria-label={`score ${r.bar.val.toFixed(2)}, needs ${r.bar.min.toFixed(2)}`}>
                      <span className="fill" style={{ width: `${r.bar.val * 100}%` }} />
                      <span className="min" style={{ left: `${r.bar.min * 100}%` }} />
                      <em>{r.bar.val.toFixed(2)}</em>
                    </span>
                  )}
                </li>
              ))}
            </ol>
          )}
          <p className="ab-trace-note">a scripted replay of the real app&apos;s steps. {BRAND} is a made-up brand.</p>
        </aside>
      </div>

      <div className={`ab-chips${touched ? "" : " hint"}`} role="group" aria-label="questions to ask">
        <span className="ab-chips-lead" aria-hidden="true">
          {touched ? "ask:" : "👉 tap a question"}
        </span>
        {TURNS.map((t) => (
          <button key={t.id} onClick={() => ask(t)} disabled={!!busy} className={`k-${t.kind}`} lang={lang === "hi" ? "hi" : "en"} data-label="ask">
            {t.q[lang]}
          </button>
        ))}
        <button
          onClick={() => ask(TAMIL, "ta")}
          disabled={!!busy || mode === "offline"}
          className="k-online"
          lang="ta"
          title={mode === "offline" ? "switch to the online edition to try this" : undefined}
          data-label={mode === "offline" ? "online only" : "ask in tamil"}
        >
          {TAMIL.q.en}
          <small>{mode === "offline" ? "online only 🔒" : "tamil"}</small>
        </button>
      </div>
      <form className="ab-type" onSubmit={submitTyped}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="or type a question (this demo knows a handful)" aria-label="type a question" />
        <button type="submit" disabled={!!busy || !input.trim()}>
          ask
        </button>
      </form>
    </div>
  );
}
