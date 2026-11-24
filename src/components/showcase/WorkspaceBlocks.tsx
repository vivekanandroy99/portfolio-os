"use client";

import { useEffect, useRef, useState } from "react";
import {
  AudioLines, Bell, BellRing, Building2, Calculator, CalendarPlus, Check, CheckCheck, Contact, Eye, FileUp, FlaskConical,
  FolderOpen, FolderPlus, Handshake, HandHelping, Home, KanbanSquare, LayoutDashboard, Layers, ListTodo, Megaphone,
  MessageCircleQuestion, MessagesSquare, NotebookPen, Package, Pause, Play, Rocket, RotateCcw, Search, Send,
  Sparkles, SquareCheck, StickyNote, Video, Wand2, type LucideIcon,
} from "lucide-react";
import { WorkspaceFilm, type FilmStep } from "./WorkspaceFilm";

/*
  The interactive parts of the altcore workspace page. Every clip and picture is the real web app
  (AltManage repo, apps/web) running its built-in sample workspace, recorded in the browser.
  Facts come from the repo: its flows, tours, pages and git history.
*/

const BASE = "/work/altcore-workspace";

type Step = FilmStep;

/* ---------- the day ---------- */

const DAY: Step[] = [
  {
    id: "day-check-in", icon: Home, title: "check in, and the day is on one screen",
    lead: "tap check in and your work hours start counting. home shows the announcements, what you finished, how long you've worked, what's next and the inbox.",
    note: "a break is one tap too, so nobody fills in a timesheet at the end of the week.",
    more: ["check in, take a break and check out from the top bar", "home shows done today, hours worked, what's next and the inbox", "everyone can change their own home layout"],
  },
  {
    id: "day-plan-standup", icon: ListTodo, title: "the plan is the stand-up",
    lead: "type what you'll do today, and tag a teammate with @ if you're doing it together. the team sees everyone's plan on home, so there's no stand-up form to fill in.",
    note: "anything added after the morning gets a small “added later” mark, which keeps plans honest without anyone policing them.",
    more: ["type @name to add a teammate to a task", "a task can carry a “stuck” note, so leads see who needs help", "the team today tile only shows plans. there's nothing to fill in"],
  },
  {
    id: "day-announcement", icon: Megaphone, title: "announcements people actually read",
    lead: "leads post a note for everyone, or only for chosen teams. people tap “got it”, and the poster sees how many have read it.",
    note: "only the count shows, never a list of who hasn't read it. it's a notice board, not a test.",
    more: ["admins, hr and team leads can post", "send it to everyone, or only to chosen teams or people", "@name in a note sends that person an alert"],
  },
  {
    id: "day-meeting-reminder", icon: BellRing, title: "a meeting reminder with one join button",
    lead: "a few minutes before a call, a card slides in with the meeting name and a single join button. the top bar shows it too.",
    more: ["5 minutes before by default, and each person can change it", "works with google meet, zoom, teams or a call inside the app", "each person links their own google account"],
  },
];

export function WorkspaceDay() {
  return <WorkspaceFilm film="day" label="the day: check in, the plan, announcements and a meeting reminder" steps={DAY} />;
}

/* ---------- tasks and reviews ---------- */

const TASKS: Step[] = [
  {
    id: "tasks-today-and-board", icon: KanbanSquare, title: "today, my tasks, and the team board",
    lead: "three views of the same tasks: what's on today, everything that's mine, and the whole team's board from to-do to done.",
    note: "on smaller screens the board scrolls sideways instead of squashing the columns.",
    more: ["switch between today, my tasks and the board", "cards show the project, the date and who's helping", "drag a card to move it to the next column"],
  },
  {
    id: "tasks-new-and-ask", icon: HandHelping, title: "add a task, or ask someone for help",
    lead: "new task takes a title, a project and a date. “ask a teammate” sends a request instead, which they can accept or turn down.",
    note: "an accepted request becomes a task on their list straight away.",
    more: ["title, project, due date and helpers in one sheet", "a request can be accepted or turned down", "nobody gets work dropped on them without a say"],
  },
  {
    id: "tasks-task-page", icon: SquareCheck, title: "a task holds everything about it",
    lead: "steps to tick, files and pictures, comments, and every review round, all on the task itself.",
    note: "the reviewer is set on the task, so nobody has to remember who checks what.",
    more: ["steps to tick, files, pictures and comments", "every review round kept with its notes", "a reviewer set on each task"],
  },
  {
    id: "inbox-approve", icon: Eye, title: "one inbox for every yes or no",
    lead: "work waiting for review, purchases to approve and gear requests sit in one list, each with its own button.",
    note: "approve, decline or ask for changes without leaving the inbox.",
    more: ["reviews, purchases and gear requests in one list", "approve, decline or ask for changes", "the count shows on home, so nothing waits for days"],
  },
];

export function WorkspaceTasks() {
  return <WorkspaceFilm film="tasks" label="tasks: today, the board, asking for help, a task page and the inbox" steps={TASKS} />;
}

/* ---------- projects ---------- */

const PROJECTS: Step[] = [
  {
    id: "projects-new", icon: FolderPlus, title: "start a project in a minute",
    lead: "pick a cover, give it a name and a client, and choose the team. the assistant suggests a working style (phases, sprints or a simple board), or you can decide later.",
    more: ["24 built-in covers, or upload your own", "pick a working style, or decide later", "choose the client and the teams"],
  },
  {
    id: "projects-tour", icon: Layers, title: "a project from brief to show day",
    lead: "progress, open tasks, the deadline and the people up top. then the brief, design options, decks, specs, phases and checklists, one tab each.",
    note: "a phase can't close while something is still needed from the client.",
    more: ["code, status, phase and teams in one labelled line", "the brief, design directions, decks and spec cards", "money, files and the project chat, one tab each"],
  },
  {
    id: "projects-show-desk", icon: Rocket, title: "a desk for the event day",
    lead: "on show day the project turns into a run sheet: opening checks, who's on shift, hired kit and a log of what happened.",
    note: "made for exhibitions and launches, where the hardest day is the last one.",
    more: ["opening checks and the run sheet", "who's on shift, and the hired kit", "a log of what happened on the day"],
  },
];

export function WorkspaceProjects() {
  return <WorkspaceFilm film="projects" label="projects: starting one, the project page and the show desk" steps={PROJECTS} />;
}

/* ---------- making things ---------- */

const CREATE: Step[] = [
  {
    id: "create-board", icon: StickyNote, title: "boards for the messy early thinking",
    lead: "stickies, shapes, arrows and links on an open canvas, for moodboards, visitor journeys and workshop walls.",
    more: ["stickies, shapes, arrows and pictures", "the whole team works on the same board", "link a board to a project"],
  },
  {
    id: "create-notebook", icon: NotebookPen, title: "notebooks for writing it down properly",
    lead: "pages with headings, lists, to-dos and pictures. a to-do in a notebook can become a real task with one tap.",
    note: "boards and notebooks both link to a project, so the thinking isn't lost once the job starts.",
    more: ["type / for headings, lists and to-dos", "pasted text keeps its headings and lists", "a to-do can become a real task"],
  },
  {
    id: "files-documents-drive", icon: FolderOpen, title: "every file, wherever it lives",
    lead: "uploaded documents, the company's google drive and the studio's own storage box, all in one files space.",
    more: ["uploads, google drive and the studio's storage box in one place", "files belong to projects", "search finds them from anywhere"],
  },
];

export function WorkspaceCreate() {
  return <WorkspaceFilm film="create" label="making things: a board, a notebook and files" steps={CREATE} />;
}

/* ---------- talking and planning ---------- */

const TALK: Step[] = [
  {
    id: "chat-messages", icon: MessagesSquare, title: "chat for every team and project",
    lead: "team chats, project chats and small groups, with pictures, files, reactions and voice notes.",
    note: "every project gets its own chat, so client talk doesn't get lost in a general group.",
    more: ["team, project and group chats", "pictures, files, reactions and voice notes", "one pane on a phone, two side by side on a laptop"],
  },
  {
    id: "chat-voice-note-summary", icon: AudioLines, title: "voice notes you don't have to play",
    lead: "a voice note shows its words underneath, and a one-line summary on top. read it in a meeting, play it later.",
    more: ["the words written out under the note", "a one-line summary on top"],
  },
  {
    id: "chat-video-call-ai-notes", icon: Video, title: "calls that take their own notes",
    lead: "start a video call from any chat. turn on notes, and when the call ends a summary with action points lands back in the chat.",
    more: ["start a call from any chat", "with notes on, a summary and action points land in the chat", "an action point can become a task"],
  },
  {
    id: "calendar-views-and-repeat", icon: CalendarPlus, title: "a calendar that knows the work",
    lead: "day, week and month views, events that repeat like in google calendar, and a call link added in one tap.",
    note: "meetings, focus time, time off and deadlines each have their own colour.",
    more: ["repeats daily, weekly, monthly, yearly, on weekdays, or your own way", "add a call inside the app, or paste a meet, zoom or teams link", "each kind of event has its own colour"],
  },
  {
    id: "search-ctrl-k", icon: Search, title: "one search for everything",
    lead: "ctrl k finds tasks, projects, people, chats and boards from anywhere. arrow keys, enter, you're there.",
    more: ["tasks, projects, people, chats and boards", "arrow keys and enter, no mouse needed", "ctrl j opens the assistant the same way"],
  },
];

export function WorkspaceTalk() {
  return <WorkspaceFilm film="talk" label="talking: chat, voice notes, a video call, the calendar and search" steps={TALK} />;
}

/* ---------- ai that helps with the busywork ---------- */

const AI: Step[] = [
  {
    id: "ai-assistant-jobs", icon: Sparkles, title: "small jobs, done for you",
    lead: "ask the assistant for a morning brief, a list of tasks from a note, or a message to the team. it knows which screen you're on.",
    note: "it always shows what it's about to do before anything changes.",
    more: ["a morning brief on home", "a message to the team, drafted for you", "it shows the change before it makes it"],
  },
  {
    id: "ai-assistant-file", icon: FileUp, title: "drop a file, get a plan",
    lead: "drop a client's run of show on the assistant and it pulls out the tasks, dates and contacts inside it. keep the ones you want.",
    more: ["finds the tasks, dates and contacts in a file", "untick anything you don't want", "each new item says the assistant made it, and who said yes"],
  },
  {
    id: "ai-ask-anything", icon: MessageCircleQuestion, title: "ask about the work",
    lead: "“which project is at risk and why?” gets a straight answer, with the reason and the next step.",
    more: ["answers from the studio's own projects, tasks and money", "gives the reason and the next step", "links straight to the project"],
  },
  {
    id: "ai-workspace-setup", icon: Building2, title: "set up a company by describing it",
    lead: "an admin writes what the company does, and the assistant fills in the teams, phases and checklists. nothing is saved until they check it.",
    more: ["describe the company in a sentence or two", "teams, phases and checklists filled in", "nothing is saved until an admin checks it"],
  },
];

export function WorkspaceAi() {
  return <WorkspaceFilm film="ai" label="the assistant in the app: small jobs, a file into a plan, a question, and setting up a company" steps={AI} />;
}

/* ---------- the business side ---------- */

const BIZ: Step[] = [
  {
    id: "sales-pipeline-deal", icon: Handshake, title: "sales numbers and a pipeline",
    lead: "open pipeline, what's likely to close and the win rate up top. deals move by stage, each with its value, next step and contact.",
    more: ["open pipeline, likely to close and the win rate", "deals by stage, with value and next step", "a reports tab for the quarter"],
  },
  {
    id: "sales-estimate-boq", icon: Calculator, title: "estimates that do the sums",
    lead: "a bill of quantities with every line, the margin and the tax, then a payment plan split into steps.",
    note: "the client price updates the moment a line changes.",
    more: ["margin and tax worked out as you type", "a payment plan split into steps", "vendor prices side by side, with the lowest marked"],
  },
  {
    id: "ops-requests-inventory", icon: Package, title: "know who has the camera",
    lead: "approve a request, then find a free item in the inventory and hand it to the person who asked.",
    more: ["each request goes to the person who approves it", "search everything the company owns", "sign an item out to a person"],
  },
  {
    id: "ops-rnd-vendors", icon: FlaskConical, title: "r&d and the people you buy from",
    lead: "an r&d board for experiments the studio wants to try, and a vendor list with ratings, contacts and what each one is good for.",
    more: ["r&d ideas move from trying to adopted or shelved", "vendors by kind: fabrication, equipment, printing, travel, catering", "preferred vendors marked, with ratings"],
  },
  {
    id: "team-people-hrms", icon: Contact, title: "people, teams and time off",
    lead: "search people by name, skill or software. a profile shows what they're on. time off is asked for and answered in the same app.",
    more: ["search people by name, skill or software", "teams, each with a lead", "ask for time off in two taps"],
  },
];

export function WorkspaceBusiness() {
  return <WorkspaceFilm film="business" label="the business side: sales, estimates, requests, inventory, r&d, vendors and people" steps={BIZ} />;
}

/* ---------- on the phone: clips in a phone frame ---------- */

const PHONES: { id: string; t: string; d: string }[] = [
  { id: "phone-day-check-in", t: "check in", d: "home, built for a thumb" },
  { id: "phone-ai-assistant-jobs", t: "ask the assistant", d: "a brief on the go" },
  { id: "phone-tasks-task-page", t: "a task", d: "steps and files" },
  { id: "phone-inbox-approve", t: "approve", d: "the inbox, one tap each" },
  { id: "phone-chat-messages", t: "chat", d: "groups and voice notes" },
];

function PhoneClip({ id, t, d }: { id: string; t: string; d: string }) {
  const v = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const el = v.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <figure className="ws-phone">
      <div className="ws-iphone">
        <i className="btn a" aria-hidden="true" /><i className="btn b" aria-hidden="true" /><i className="btn c" aria-hidden="true" /><i className="btn d" aria-hidden="true" />
        <div className="scr">
          <span className="bar" aria-hidden="true"><b>9:41</b><i /></span>
          <video ref={v} src={`${BASE}/clips/${id}.mp4`} poster={`${BASE}/clips/${id}.jpg`} muted loop playsInline preload="none" aria-label={`on a phone: ${t}, ${d}`} />
          <span className="island" aria-hidden="true" />
        </div>
      </div>
      <figcaption><b>{t}</b>{d}</figcaption>
    </figure>
  );
}

export function WorkspacePhones() {
  return (
    <div className="ws-phones" role="list" aria-label="the app on a phone">
      {PHONES.map((p) => (
        <div role="listitem" key={p.id}><PhoneClip {...p} /></div>
      ))}
    </div>
  );
}

/* ---------- a looping clip that plays only on screen ---------- */

export function LoopClip({ id, label, caption }: { id: string; label: string; caption: string }) {
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
      <video ref={v} src={`${BASE}/clips/${id}.mp4`} poster={`${BASE}/clips/${id}.jpg`} muted loop playsInline preload="none" aria-label={label} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
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
      <video
        ref={v}
        src={`${BASE}/films/promo.mp4`}
        poster={`${BASE}/films/promo.jpg`}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="a quick film of the app: checking in, asking for help, a project, a video call with notes, the assistant, an estimate and the calendar"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button type="button" className="ws-promo-pp" onClick={toggle} aria-label={playing ? "pause the clip" : "play the clip"}>
        <PP aria-hidden="true" />
      </button>
    </figure>
  );
}

/* ---------- behind the scenes: admin ---------- */

const ADMIN: Step[] = [
  {
    id: "admin-tour", icon: Building2, title: "admins decide who sees what",
    lead: "people and their roles, teams and their leads, which spaces each person sees, and the apps the company connects.",
    more: ["turn a space on or off for each person", "connect google drive, calendar, meet, slack and more", "turn features off for everyone, and set a monthly ai limit"],
  },
  {
    id: "settings-look", icon: Eye, title: "everyone picks their own look",
    lead: "light, dark or high contrast, and a home screen laid out the way they like it.",
    note: "all three themes come from one set of design tokens, so every screen works in each.",
  },
];

export function WorkspaceAdmin() {
  return <WorkspaceFilm film="admin" label="admin: people, teams, who sees what, connections, features, and the look settings" steps={ADMIN} />;
}
