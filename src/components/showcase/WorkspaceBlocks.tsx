"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell, Building2, Calculator, CalendarPlus, Check, CheckCheck, Contact, Eye, FileUp, Handshake, Home, KanbanSquare, LayoutDashboard,
  MessageCircleQuestion, MessagesSquare, Package, Palette, Pause, Play, Rocket, RotateCcw, Search, Send, Smartphone,
  Sparkles, SquareCheck, StickyNote, Video, Wand2, type LucideIcon,
} from "lucide-react";
import { ScrollStory, type Story } from "./AltbotBlocks";

/*
  The interactive parts of the altcore workspace page. Every clip and picture is the real web app
  (AltManage repo, apps/web) running its built-in sample workspace, recorded in the browser.
  Facts come from the repo: its flows, tours, pages and git history.
*/

const BASE = "/work/altcore-workspace";

type Step = { id: string; icon: LucideIcon; title: string; lead: string; note?: string; look?: string; portrait?: boolean };

function story(steps: Step[], what: string): Story[] {
  return steps.map((s) => ({
    key: s.id,
    src: () => `${BASE}/clips/${s.id}.jpg`,
    clip: () => `${BASE}/clips/${s.id}.mp4`,
    alt: `${what}: ${s.title}`,
    icon: s.icon,
    title: s.title,
    lead: s.lead,
    note: s.note,
    look: s.look,
    portrait: s.portrait,
  }));
}

/* ---------- getting work done ---------- */

const WORK: Step[] = [
  {
    id: "day-check-in", icon: Home, title: "the day starts on home",
    lead: "check in, read the announcements, see today's plan and what's waiting for your review. one screen, no digging.",
    note: "your work hours count up from check-in, and a break is one tap away.",
  },
  {
    id: "tasks-task-page", icon: SquareCheck, title: "a task holds everything about it",
    lead: "steps to tick, files and pictures, comments, and every review round, all on the task itself.",
    note: "the reviewer is set on the task, so nobody has to remember who checks what.",
  },
  {
    id: "inbox-approve", icon: Eye, title: "one inbox for every yes or no",
    lead: "work waiting for review, purchases to approve and gear requests sit in one list, each with its own button.",
    note: "approve, decline or ask for changes without leaving the inbox.",
  },
  {
    id: "projects-tour", icon: KanbanSquare, title: "a project from brief to show day",
    lead: "progress, open tasks, the deadline and the people up top. then the brief, design options, decks, specs, phases and checklists, one tab each.",
    note: "a phase can't close while something is still needed from the client.",
  },
  {
    id: "projects-show-desk", icon: Rocket, title: "a desk for the event day",
    lead: "on show day the project turns into a run sheet: opening checks, who's on shift, hired kit and a log of what happened.",
  },
  {
    id: "create-board", icon: StickyNote, title: "boards and notebooks for the thinking",
    lead: "boards with stickies, shapes and links for early ideas, and notebooks for writing things down properly.",
    note: "both link to a project, so the early thinking isn't lost once the job starts.",
  },
];

export function WorkspaceWork() {
  return <ScrollStory items={story(WORK, "altcore")} shape="wide" label="getting work done, step by step" topic="getting work done" looks={false} />;
}

/* ---------- talking and planning ---------- */

const TALK: Step[] = [
  {
    id: "chat-messages", icon: MessagesSquare, title: "chat for every team and project",
    lead: "team chats, project chats and small groups, with pictures, files, reactions and voice notes.",
    note: "a long thread or a voice note can be summed up in a few lines.",
  },
  {
    id: "chat-video-call-ai-notes", icon: Video, title: "calls that take their own notes",
    lead: "start a video call from any chat. turn on notes, and when the call ends a summary with action points lands back in the chat.",
  },
  {
    id: "calendar-views-and-repeat", icon: CalendarPlus, title: "a calendar that knows the work",
    lead: "day, week and month views, events that repeat, and a call link added in one tap.",
    note: "meetings, focus time, time off and deadlines each have their own colour.",
  },
  {
    id: "search-ctrl-k", icon: Search, title: "one search for everything",
    lead: "ctrl k finds tasks, projects, people, chats and boards from anywhere. arrow keys, enter, you're there.",
  },
];

export function WorkspaceTalk() {
  return <ScrollStory items={story(TALK, "altcore")} shape="wide" label="talking and planning" topic="talking and planning" looks={false} />;
}

/* ---------- ai that helps with the busywork ---------- */

const AI: Step[] = [
  {
    id: "ai-assistant-jobs", icon: Sparkles, title: "small jobs, done for you",
    lead: "ask the assistant for a morning brief, a list of tasks from a note, or a message to the team. you check it, then it's done.",
    note: "it always shows what it's about to do before anything changes.",
  },
  {
    id: "ai-assistant-file", icon: FileUp, title: "drop a file, get a plan",
    lead: "drop a client brief on the assistant and it suggests the tasks and dates inside it. keep the ones you want.",
  },
  {
    id: "ai-ask-anything", icon: MessageCircleQuestion, title: "ask about the work",
    lead: "“which project is at risk?” gets a straight answer with links to the tasks behind it.",
  },
  {
    id: "ai-fix-writing", icon: Wand2, title: "fix writing in any box",
    lead: "every text box has a fix writing button. it tidies spelling and tone, and you choose whether to keep it.",
    note: "handy for people who don't write in their first language.",
  },
  {
    id: "ai-workspace-setup", icon: Building2, title: "set up a company by describing it",
    lead: "an admin writes what the company does, and the assistant suggests teams, spaces and project types to start from.",
  },
];

export function WorkspaceAi() {
  return <ScrollStory items={story(AI, "altcore")} shape="wide" label="ai for the busywork" topic="ai helpers" looks={false} />;
}

/* ---------- the business side ---------- */

const BIZ: Step[] = [
  {
    id: "sales-pipeline-deal", icon: Handshake, title: "sales numbers and a pipeline",
    lead: "open pipeline, what's likely to close and the win rate up top. deals move by stage, each with its value, next step and contact.",
  },
  {
    id: "sales-estimate-boq", icon: Calculator, title: "estimates that do the sums",
    lead: "a bill of quantities with every line, the margin and the tax, then a payment plan split into steps.",
    note: "the client price updates the moment a line changes.",
  },
  {
    id: "ops-requests-inventory", icon: Package, title: "know who has the camera",
    lead: "approve a request, then find a free item in the inventory and hand it to the person who asked.",
  },
  {
    id: "team-people-hrms", icon: Contact, title: "people, teams and time off",
    lead: "search people by name, skill or software. a profile shows what they're on. time off is asked for and answered in the same app.",
  },
];

export function WorkspaceBusiness() {
  return <ScrollStory items={story(BIZ, "altcore")} shape="wide" label="the business side" topic="the business side" looks={false} />;
}

/* ---------- for everyone ---------- */

const ALL: Step[] = [
  {
    id: "phone-day-check-in", icon: Smartphone, title: "the same app on a phone", portrait: true,
    lead: "the menu moves to the bottom, cards stack, and everything stays in reach of a thumb.",
    note: "the same screens also run on tablets and as a desktop app.",
  },
  {
    id: "phone-chat-messages", icon: MessagesSquare, title: "chat that feels native", portrait: true,
    lead: "the message box sits above the keyboard, and long chats stay light to scroll.",
  },
  {
    id: "settings-look", icon: Palette, title: "light, dark or high contrast",
    lead: "every screen works in all three themes, plus a calmer motion switch for people who get dizzy.",
    note: "all from one set of design tokens, so no screen can be forgotten.",
  },
];

export function WorkspaceEveryone() {
  return <ScrollStory items={story(ALL, "altcore")} shape="wide" label="made for everyone in the company" topic="for everyone" looks={false} />;
}

/* ---------- one app, five people ---------- */

const ROLES: { id: string; role: string; who: string; screen: string; sees: string[]; menu: string }[] = [
  {
    id: "founder", role: "founder", who: "sees the whole company", screen: "home",
    sees: ["who is working and on what, right now", "announcements and today's plan", "work waiting for their review", "the inbox of things to approve"],
    menu: "everything, plus admin",
  },
  {
    id: "pm", role: "project manager", who: "keeps jobs on track", screen: "a project",
    sees: ["each project's progress, people and deadline", "what's next, and what's late", "the timeline from brief to show day", "what the client still owes"],
    menu: "projects, sales and estimates up front",
  },
  {
    id: "maker", role: "designer", who: "makes the work", screen: "tasks",
    sees: ["today's tasks and nothing else", "steps and files for each task", "what's in review", "the team board when they need it"],
    menu: "a short menu, no sales or money screens",
  },
  {
    id: "sales", role: "sales manager", who: "brings work in", screen: "sales",
    sees: ["the open pipeline in rupees", "what's likely to close", "won this quarter and the win rate", "follow-ups due this week"],
    menu: "sales and estimates up front",
  },
  {
    id: "ops", role: "operations", who: "keeps the office running", screen: "inventory",
    sees: ["everything the company owns", "who has what, and what's free", "gear and purchase requests", "vendors and the r&d board"],
    menu: "inventory, requests and admin",
  },
];

export function WorkspaceRoles() {
  const [cur, setCur] = useState(0);
  const r = ROLES[cur];
  return (
    <div className="ws-roles">
      <div className="ws-roles-tabs" role="tablist" aria-label="pick a person">
        {ROLES.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            id={`ws-role-${x.id}`}
            aria-selected={i === cur}
            aria-controls="ws-role-panel"
            className={i === cur ? "on" : ""}
            onClick={() => setCur(i)}
            data-label={x.role}
          >
            <b>{x.role}</b>
            <small>{x.who}</small>
          </button>
        ))}
      </div>
      <div className="ws-roles-panel" id="ws-role-panel" role="tabpanel" aria-labelledby={`ws-role-${r.id}`}>
        <figure className="ws-roles-shot">
          {ROLES.map((x, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={x.id}
              src={`${BASE}/roles/${x.id}.webp`}
              alt={i === cur ? `${x.screen}, the screen the ${x.role} lives in` : ""}
              aria-hidden={i !== cur}
              className={i === cur ? "on" : ""}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </figure>
        <div className="ws-roles-copy">
          <span className="ws-pill"><i aria-hidden="true" />signed in as the {r.role}</span>
          <h3>{r.screen}: what they see first</h3>
          <ul>
            {r.sees.map((s) => (
              <li key={s}><Check aria-hidden="true" />{s}</li>
            ))}
          </ul>
          <p className="ws-roles-menu"><LayoutDashboard aria-hidden="true" /><span><b>their menu</b> {r.menu}</span></p>
        </div>
      </div>
    </div>
  );
}

/* ---------- try it: the review loop ---------- */

type Phase = "doing" | "review" | "changes" | "done";
const NOTES = ["make the logo bigger", "warmer colours, please", "the date is wrong"];

export function WorkspaceReviewDemo() {
  const [steps, setSteps] = useState<{ t: string; done: boolean }[]>([
    { t: "lay out the poster", done: false },
    { t: "add the client's logo", done: false },
    { t: "export a print pdf", done: false },
  ]);
  const [phase, setPhase] = useState<Phase>("doing");
  const [round, setRound] = useState(1);
  const [log, setLog] = useState<string[]>(["you started the task"]);
  const [note, setNote] = useState(NOTES[0]);
  const all = steps.every((s) => s.done);
  const add = (l: string) => setLog((x) => [...x, l]);

  function tick(i: number) {
    if (phase === "review" || phase === "done") return;
    setSteps((s) => s.map((x, j) => (j === i ? { ...x, done: !x.done } : x)));
  }
  function send() {
    setPhase("review");
    add(`you sent round ${round} for review`);
  }
  function changes() {
    setPhase("changes");
    setSteps((s) => [...s, { t: `fix: ${note}`, done: false }]);
    add(`your lead asked for changes: “${note}”`);
    setRound((r) => r + 1);
  }
  function approve() {
    setPhase("done");
    add(`your lead approved round ${round}`);
  }
  function reset() {
    setSteps([
      { t: "lay out the poster", done: false },
      { t: "add the client's logo", done: false },
      { t: "export a print pdf", done: false },
    ]);
    setPhase("doing");
    setRound(1);
    setLog(["you started the task"]);
    setNote(NOTES[0]);
  }

  const status = { doing: "doing", review: "in review", changes: "changes asked", done: "done" }[phase];
  const makerTurn = phase === "doing" || phase === "changes";
  return (
    <div className="ws-demo">
      <section className={`ws-card${makerTurn || phase === "done" ? " turn" : ""}`} aria-label="your side: the maker">
        <header>
          <span className="ws-who"><i aria-hidden="true">V</i>you, the designer</span>
          <span className={`ws-status s-${phase}`}>{status}</span>
        </header>
        <h4>lobby poster for the client</h4>
        <p className="ws-sub">round {round} · reviewer: your lead</p>
        <ul className="ws-checks">
          {steps.map((s, i) => (
            <li key={s.t + i}>
              <button
                type="button"
                role="checkbox"
                aria-checked={s.done}
                disabled={!makerTurn}
                onClick={() => tick(i)}
                className={s.done ? "on" : ""}
              >
                <span className="box" aria-hidden="true">{s.done && <Check />}</span>
                <span className={s.t.startsWith("fix") ? "fix" : ""}>{s.t}</span>
              </button>
            </li>
          ))}
        </ul>
        {phase !== "done" && (
          <button type="button" className="ws-go" disabled={!makerTurn || !all} onClick={send}>
            <Send aria-hidden="true" /> send for review
          </button>
        )}
        {makerTurn && !all && <p className="ws-hint">tick every step to send it</p>}
        {phase === "review" && <p className="ws-wait">waiting for your lead to review…</p>}
        {phase === "done" && <p className="ws-yay"><CheckCheck aria-hidden="true" /> approved in round {round}. nice.</p>}
      </section>

      <section className={`ws-card lead${phase === "review" ? " turn" : ""}`} aria-label="their side: the reviewer">
        <header>
          <span className="ws-who"><i aria-hidden="true">A</i>your lead&apos;s inbox</span>
          <Bell aria-hidden="true" className={phase === "review" ? "ring" : ""} />
        </header>
        {phase === "review" ? (
          <>
            <div className="ws-item">
              <span className="th" aria-hidden="true" />
              <span><b>lobby poster for the client</b><small>round {round} · from you</small></span>
            </div>
            <p className="ws-sub">ask for a change (pick one), or approve it</p>
            <div className="ws-notes" role="radiogroup" aria-label="note for the designer">
              {NOTES.map((n) => (
                <button key={n} type="button" role="radio" aria-checked={note === n} className={note === n ? "on" : ""} onClick={() => setNote(n)}>{n}</button>
              ))}
            </div>
            <div className="ws-row">
              <button type="button" className="ws-ghost" onClick={changes}>ask for changes</button>
              <button type="button" className="ws-go" onClick={approve}><Check aria-hidden="true" /> approve</button>
            </div>
          </>
        ) : (
          <p className="ws-empty">{phase === "done" ? "all clear. nothing waiting." : "nothing to review yet. it shows up here the moment it's sent."}</p>
        )}
        <ol className="ws-log" aria-label="what happened" aria-live="polite">
          {log.slice(-4).map((l, i) => (
            <li key={l + i}>{l}</li>
          ))}
        </ol>
      </section>

      <button type="button" className="ws-reset" onClick={reset}><RotateCcw aria-hidden="true" /> start again</button>
    </div>
  );
}

/* ---------- hero: a quick lap of the app ---------- */

export function WorkspacePromo() {
  const v = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.play().catch(() => {});
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) el.pause();
      else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && el.dataset.user !== "paused") el.play().catch(() => {});
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  function toggle() {
    const el = v.current;
    if (!el) return;
    if (el.paused) {
      el.dataset.user = "";
      el.play().catch(() => {});
    } else {
      el.dataset.user = "paused";
      el.pause();
    }
  }
  const PP = playing ? Pause : Play;
  return (
    <figure className="ws-promo">
      <div className="ws-promo-bar" aria-hidden="true">
        <i /><i /><i />
        <span>altcore · sample workspace</span>
      </div>
      <video
        ref={v}
        src={`${BASE}/promo.mp4`}
        poster={`${BASE}/promo.jpg`}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="a lap around the app: home, a project, a video call, the assistant, sales, calendar and a board"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button type="button" className="ws-promo-pp" onClick={toggle} aria-label={playing ? "pause the clip" : "play the clip"}>
        <PP aria-hidden="true" />
      </button>
    </figure>
  );
}

/* ---------- behind the scenes: the admin clip ---------- */

export function WorkspaceAdminClip() {
  const v = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <figure className="ws-admin">
      <video ref={v} src={`${BASE}/clips/admin-tour.mp4`} poster={`${BASE}/clips/admin-tour.jpg`} muted loop playsInline preload="none" aria-label="admin: people and teams, who sees what, and connected apps" />
      <figcaption>the admin screen: people and teams, who sees which spaces, and the apps the company connects, like drive and calendar.</figcaption>
    </figure>
  );
}
