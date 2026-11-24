"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp, Building2, Check, CheckCheck, FileText, MessageCircleQuestion, Paperclip, RotateCcw, Sparkles, Sunrise, Wand2,
  type LucideIcon,
} from "lucide-react";

/*
  try it: the altcore assistant. five things it does in the app, played out on the made-up sample
  studio (mango loop). the answers are written from that sample data, the way the real assistant
  answers; nothing here calls an ai. the person always says yes before anything changes.
*/

type Item = { kind: "task" | "event" | "contact"; t: string; when?: string };
type Scene = {
  id: string;
  icon: LucideIcon;
  label: string;
  where: string;
  ask: string;
  file?: string;
  answer: string[];
  items?: Item[];
  setup?: { t: string; v: string[] }[];
  fix?: { before: string; after: string };
  cta?: string;
  done?: string;
  links?: string[];
};

const SCENES: Scene[] = [
  {
    id: "brief", icon: Sunrise, label: "brief me on today", where: "home",
    ask: "brief me",
    answer: [
      "today: sign off the clubhouse renders, finish the pitch story for tidal records, and run the client rehearsal for the volt launch.",
      "meetings: studio kickoff at 10, money talk at 12, the rivers gallery review at 3, and the bloom flagship call.",
      "7 things wait in your inbox, 2 of them purchases to approve. one sales follow-up is due: the flagship store experience.",
    ],
    links: ["open inbox", "open today's tasks"],
  },
  {
    id: "file", icon: FileText, label: "turn a file into a plan", where: "project · volt ev launch night",
    ask: "make tasks and calendar events from this", file: "volt run of show.txt",
    answer: ["this is the volt launch run of show. i found 3 jobs, 2 timings for the calendar and the av vendor's contact. untick anything you don't want."],
    items: [
      { kind: "task", t: "send the final opener export to the venue", when: "due 26 nov" },
      { kind: "task", t: "print 200 sticker packs for the photo tunnel", when: "due 27 nov" },
      { kind: "task", t: "confirm crew call times with the venue", when: "due 26 nov" },
      { kind: "event", t: "volt technical rehearsal", when: "26 nov, 2 pm" },
      { kind: "event", t: "volt show day", when: "28 nov, 6 pm" },
      { kind: "contact", t: "av vendor, added to sales contacts" },
    ],
    cta: "add to the project",
    done: "added to volt ev launch night. every new item says the assistant made it, and who said yes.",
  },
  {
    id: "risk", icon: MessageCircleQuestion, label: "ask which project is at risk", where: "projects",
    ask: "which project is at risk, and why?",
    answer: [
      "rivers of india gallery. it's 11% done with the install on 6 feb, and money is tight after the projector housings.",
      "kabir has found two cheaper housings, and the curator already agreed to drop the second river film, which saves about ₹4 l.",
      "next step: kabir sends the cheaper quote to the curator by friday.",
    ],
    links: ["open rivers of india gallery", "message kabir"],
  },
  {
    id: "fix", icon: Wand2, label: "fix my writing", where: "a chat message",
    ask: "fix writing",
    answer: ["here's a tidier version. same meaning, fixed spelling and a calmer tone."],
    fix: {
      before: "hey all the clint rehersal moved to thrusday 4pm pls bring the opner on a pen drive and dont forget haze machine",
      after: "Hi all, the client rehearsal has moved to Thursday at 4 pm. Please bring the opener on a pen drive, and don't forget the haze machine.",
    },
  },
  {
    id: "setup", icon: Building2, label: "set up a new company", where: "admin · workspace setup",
    ask: "we design and build experience centres and exhibitions, from concept to handover. about 15 people.",
    answer: ["i set this up for an experience design studio. check it and change what you like. nothing is saved until you press save."],
    setup: [
      { t: "teams", v: ["direction", "design and content", "creative tech and r&d", "sales", "operations"] },
      { t: "phases", v: ["brief", "concept", "design", "fabrication", "installation", "show day", "handover"] },
      { t: "checklists", v: ["site survey", "before going to print", "show day opening checks"] },
    ],
    cta: "save the setup",
    done: "saved. teams, phases and checklists are ready, and an admin can change any of them later.",
  },
];

const KIND = { task: "task", event: "event", contact: "contact" } as const;

export function WorkspaceAiDemo() {
  const [cur, setCur] = useState(0);
  const [shown, setShown] = useState(0); // words of the answer shown so far
  const [picked, setPicked] = useState<boolean[]>([]);
  const [saved, setSaved] = useState(false);
  const [kept, setKept] = useState<"none" | "kept" | "undone">("none");
  const [started, setStarted] = useState(false);
  const box = useRef<HTMLDivElement | null>(null);
  const s = SCENES[cur];
  const words = s.answer.join(" \n ").split(" ");
  const typing = shown < words.length;

  // start the first answer once the demo is on screen
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(words.length); return; }
    setShown(0);
    let n = 0;
    const t = window.setInterval(() => {
      n += 2;
      setShown(Math.min(n, words.length));
      if (n >= words.length) window.clearInterval(t);
    }, 45);
    return () => window.clearInterval(t);
  }, [cur, started, words.length]);

  function pick(i: number) {
    if (i === cur) return;
    setCur(i);
    setPicked((SCENES[i].items ?? []).map(() => true));
    setSaved(false);
    setKept("none");
  }
  useEffect(() => { setPicked((SCENES[0].items ?? []).map(() => true)); }, []);

  const text = words.slice(0, shown).join(" ").split(" \n ").join("\n").split("\n");
  const count = picked.filter(Boolean).length;
  const ready = !typing;

  return (
    <div className="ws-ai" ref={box}>
      <div className="ws-ai-picks" role="tablist" aria-label="pick something to ask the assistant">
        {SCENES.map((x, i) => (
          <button key={x.id} type="button" role="tab" aria-selected={i === cur} className={i === cur ? "on" : ""} onClick={() => pick(i)} data-label="ask">
            <x.icon aria-hidden="true" />
            <span><b>{x.label}</b><small>on {x.where}</small></span>
          </button>
        ))}
      </div>

      <div className="ws-ai-panel" role="region" aria-label="the altcore assistant">
        <div className="ws-ai-head">
          <span className="ws-ai-logo" aria-hidden="true"><Sparkles /></span>
          <span><b>altcore ai</b><small>looking at {s.where}</small></span>
        </div>

        <div className="ws-ai-chat" aria-live="polite">
          <div className="ws-ai-me">
            {s.file && <span className="ws-ai-file"><Paperclip aria-hidden="true" />{s.file}</span>}
            <p>{s.ask}</p>
          </div>

          <div className="ws-ai-says">
            {text.map((l, i) => <p key={i}>{l}{typing && i === text.length - 1 && <i className="ws-ai-caret" aria-hidden="true" />}</p>)}
          </div>

          {ready && s.links && (
            <div className="ws-ai-links">{s.links.map((l) => <span key={l}>{l}</span>)}</div>
          )}

          {ready && s.items && (
            <div className="ws-ai-result">
              <ul>
                {s.items.map((it, i) => (
                  <li key={it.t}>
                    <button
                      type="button" role="checkbox" aria-checked={!!picked[i]} disabled={saved}
                      className={picked[i] ? "on" : ""}
                      onClick={() => setPicked((p) => p.map((v, j) => (j === i ? !v : v)))}
                    >
                      <span className="box" aria-hidden="true">{picked[i] && <Check />}</span>
                      <span className={`k k-${it.kind}`}>{KIND[it.kind]}</span>
                      <span className="t">{it.t}{it.when && <small>{it.when}</small>}</span>
                    </button>
                  </li>
                ))}
              </ul>
              {saved
                ? <p className="ws-yay"><CheckCheck aria-hidden="true" /> {s.done}</p>
                : <button type="button" className="ws-go" disabled={count === 0} onClick={() => setSaved(true)}>{s.cta} ({count})</button>}
            </div>
          )}

          {ready && s.setup && (
            <div className="ws-ai-result">
              {s.setup.map((g) => (
                <div key={g.t} className="ws-ai-group">
                  <small>{g.t}</small>
                  <div>{g.v.map((v) => <span key={v}>{v}</span>)}</div>
                </div>
              ))}
              {saved
                ? <p className="ws-yay"><CheckCheck aria-hidden="true" /> {s.done}</p>
                : <button type="button" className="ws-go" onClick={() => setSaved(true)}>{s.cta}</button>}
            </div>
          )}

          {ready && s.fix && (
            <div className="ws-ai-result">
              <div className="ws-ai-fix">
                <p className={`was${kept === "kept" ? " gone" : ""}`}><small>you wrote</small>{s.fix.before}</p>
                <p className={`now${kept === "undone" ? " gone" : ""}`}><small>tidied</small>{s.fix.after}</p>
              </div>
              {kept === "none" ? (
                <div className="ws-row">
                  <button type="button" className="ws-ghost" onClick={() => setKept("undone")}>keep mine</button>
                  <button type="button" className="ws-go" onClick={() => setKept("kept")}><Check aria-hidden="true" /> use this</button>
                </div>
              ) : (
                <p className="ws-yay"><CheckCheck aria-hidden="true" /> {kept === "kept" ? "sent the tidy version." : "sent yours, as you wrote it."}</p>
              )}
            </div>
          )}
        </div>

        <div className="ws-ai-foot">
          <span className="ws-ai-input" aria-hidden="true">ask or tell me what to do <ArrowUp /></span>
          {(saved || kept !== "none") && (
            <button type="button" className="ws-reset" onClick={() => { setSaved(false); setKept("none"); setPicked((s.items ?? []).map(() => true)); }}>
              <RotateCcw aria-hidden="true" /> try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
