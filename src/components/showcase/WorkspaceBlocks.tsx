"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell, Calculator, CalendarPlus, Check, CheckCheck, Contact, Eye, Handshake, Home, Inbox, KanbanSquare, LayoutDashboard,
  LifeBuoy, MessagesSquare, Package, Palette, Pause, Play, RotateCcw, Search, Send, SlidersHorizontal, Smartphone,
  Sparkles, SquareCheck, StickyNote, type LucideIcon,
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
    id: "home-day", icon: Home, title: "the day starts on home",
    lead: "check in, see today's plan, tick things off and add what else you'll do. it works like a quick stand-up, without the meeting.",
    note: "nobody has to approve your own to-dos. the home page is about your day, not the company's.",
  },
  {
    id: "task-review", icon: SquareCheck, title: "finish a task, send it for review",
    lead: "a task has steps, files and a reviewer. tick the last step and press send for review.",
    note: "the reviewer is set on the task itself, so nobody has to remember who checks what.",
    look: "the yellow note: waiting for aman to review.",
  },
  {
    id: "inbox-review", icon: Eye, title: "reviews come in rounds",
    lead: "the reviewer opens it from their inbox, sees every earlier round and its notes, then approves or asks for changes.",
    note: "round 1, round 2, round 3: the whole back and forth stays on the task, not in someone's chat history.",
  },
  {
    id: "project", icon: KanbanSquare, title: "projects that run the way you work",
    lead: "each project shows progress, open tasks, the deadline and the people on it. phases come from presets like ladder, sprints or kanban.",
    note: "a phase can't close while something is still needed from the client.",
  },
  {
    id: "ideas", icon: StickyNote, title: "ideas live next to the work",
    lead: "notebooks for writing, moodboards for pictures and stickies. an idea card opens its own board.",
    note: "both can be linked to a project, so the early thinking doesn't get lost once the job starts.",
  },
];

export function WorkspaceWork() {
  return <ScrollStory items={story(WORK, "altcore")} shape="wide" label="getting work done, step by step" topic="getting work done" looks={false} />;
}

/* ---------- talking and planning ---------- */

const TALK: Step[] = [
  {
    id: "chat", icon: MessagesSquare, title: "chat for every team and project",
    lead: "team chats, project chats and small groups, with pictures, files, reactions and voice notes.",
    note: "a voice note can be turned into a transcript, a summary and tasks.",
  },
  {
    id: "calendar", icon: CalendarPlus, title: "drag to book time",
    lead: "drag across an empty slot, name it, add people and make a meet link in one tap.",
    note: "meetings, focus time, time off and deadlines each have their own colour, and can be hidden.",
  },
  {
    id: "search", icon: Search, title: "one search for everything",
    lead: "ctrl k finds tasks, projects, chats and boards from anywhere. arrow keys, enter, you're there.",
  },
  {
    id: "ai", icon: Sparkles, title: "an assistant that knows the screen",
    lead: "ask what needs your attention, who is on what, or for a tour. it answers from the workspace and links you there.",
    note: "admins set a monthly limit on ai requests for the whole company.",
  },
];

export function WorkspaceTalk() {
  return <ScrollStory items={story(TALK, "altcore")} shape="wide" label="talking and planning" topic="talking and planning" looks={false} />;
}

/* ---------- the business side ---------- */

const BIZ: Step[] = [
  {
    id: "sales", icon: Handshake, title: "a sales pipeline you drag",
    lead: "deals move from new lead to won by dragging. each one has its value, next step, contact and quotes.",
    note: "call, whatsapp or email the client straight from the deal.",
  },
  {
    id: "estimate", icon: Calculator, title: "estimates that do the sums",
    lead: "slide the margin and the client price, tax and profit update at once. split the bill into payment steps.",
    note: "vendor prices sit side by side and the lowest is marked. using one saves it to the rate card.",
  },
  {
    id: "inventory", icon: Package, title: "know who has the camera",
    lead: "everything the company owns, who has it and what's free. ask for an item in two taps.",
  },
  {
    id: "gear-requests", icon: Inbox, title: "one inbox for every yes or no",
    lead: "requests from teammates, purchases and time off all wait in the same inbox, each with one button.",
    note: "accepting a request turns it into a task straight away.",
  },
  {
    id: "people", icon: Contact, title: "find people by what they can do",
    lead: "search by name, skill or software. a profile shows what they're on, their projects and their gear.",
  },
];

export function WorkspaceBusiness() {
  return <ScrollStory items={story(BIZ, "altcore")} shape="wide" label="the business side" topic="the business side" looks={false} />;
}

/* ---------- for everyone ---------- */

const ALL: Step[] = [
  {
    id: "phone-home", icon: Smartphone, title: "the same app on a phone", portrait: true,
    lead: "the menu moves to the bottom, cards stack, and everything stays in reach of a thumb.",
    note: "it installs to the home screen and sends alerts like any app.",
  },
  {
    id: "phone-chat", icon: MessagesSquare, title: "chat that feels native", portrait: true,
    lead: "the message box sits above the keyboard, and long chats stay light to scroll.",
  },
  {
    id: "guides", icon: LifeBuoy, title: "help built in",
    lead: "pointer tours walk you through a screen, short videos show a flow, and slideshows explain a process.",
    note: "a new joiner's first tour starts by itself during sign-up.",
  },
  {
    id: "look", icon: Palette, title: "light, dark or high contrast",
    lead: "every screen works in all three themes. there's also a calmer motion switch for people who get dizzy.",
    note: "all from one set of design tokens, so no screen can be forgotten.",
  },
  {
    id: "layout", icon: SlidersHorizontal, title: "team leads tidy the screen",
    lead: "a team leader can reorder or hide home cards and menu items for their whole team.",
    note: "hiding only tidies. anything hidden still opens from search and links.",
  },
];

export function WorkspaceEveryone() {
  return <ScrollStory items={story(ALL, "altcore")} shape="wide" label="made for everyone in the company" topic="for everyone" looks={false} />;
}

/* ---------- one app, five people ---------- */

const ROLES: { id: string; role: string; who: string; sees: string[]; menu: string }[] = [
  {
    id: "MH", role: "founder", who: "sees the whole company",
    sees: ["who is working and on what, right now", "projects at risk, before they're late", "decisions waiting for a yes", "switches for every feature"],
    menu: "everything, plus admin",
  },
  {
    id: "BH", role: "project manager", who: "keeps jobs on track",
    sees: ["each project's progress, people and deadline", "the team's tasks on a list or a board", "boards and notebooks for the job", "client reviews on the calendar"],
    menu: "projects, sales and estimates up front",
  },
  {
    id: "MN", role: "3d artist", who: "makes the work",
    sees: ["today's plan and nothing else", "steps and files for each task", "work sent for review", "gear that's free to borrow"],
    menu: "a short menu, no sales or money screens",
  },
  {
    id: "IP", role: "sales manager", who: "brings work in",
    sees: ["follow-ups due today", "the deals pipeline", "requests sent to the studio", "client calls"],
    menu: "sales and estimates up front",
  },
  {
    id: "SB", role: "operations", who: "keeps the office running",
    sees: ["everything the company owns", "gear and leave requests", "people and their skills", "the admin activity log"],
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
              alt={i === cur ? `the home page as the ${x.role} sees it` : ""}
              aria-hidden={i !== cur}
              className={i === cur ? "on" : ""}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </figure>
        <div className="ws-roles-copy">
          <span className="ws-pill"><i aria-hidden="true" />signed in as the {r.role}</span>
          <h3>what they see first</h3>
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
        aria-label="a lap around the app: home, projects, chat, calendar, sales, inventory and people"
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
      <video ref={v} src={`${BASE}/clips/admin.mp4`} poster={`${BASE}/clips/admin.jpg`} muted loop playsInline preload="none" aria-label="admin: turning sales and inventory off for the whole company, then the activity log" />
      <figcaption>switching sales and inventory off for everyone. the menu changes at once, and the activity log records who did it.</figcaption>
    </figure>
  );
}
