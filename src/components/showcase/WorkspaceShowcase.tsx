import Link from "next/link";
import {
  ArrowDown, Check, Eye, History, KeyRound, Laptop, LayoutDashboard, MonitorSmartphone, ShieldCheck, Sparkles, X, type LucideIcon,
} from "lucide-react";
import {
  siExpo, siHono, siPostgresql, siReact, siSupabase, siTailwindcss, siTauri, siTypescript, type SimpleIcon,
} from "simple-icons";
import {
  WorkspaceAdminClip, WorkspaceAi, WorkspaceBusiness, WorkspaceEveryone, WorkspacePromo, WorkspaceReviewDemo, WorkspaceRoles, WorkspaceTalk, WorkspaceWork,
} from "./WorkspaceBlocks";
import { MoreWork } from "./MoreWork";

/*
  The altcore workspace showcase page (the AltManage repo, new web ui only). Same bones as the
  altbot and launcher pages (the .ab layout, scroll stories, steps, stack), dressed in the product's
  own look: cool light grey, white cards, open sans, altcore orange, status pills as labels.
  Every clip is the real app running a made-up sample studio. No real names anywhere.
*/

function Logo({ icon, mono }: { icon: SimpleIcon; mono?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={`${icon.title} logo`} fill={mono ? "currentColor" : `#${icon.hex}`}>
      <path d={icon.path} />
    </svg>
  );
}

const facts: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: LayoutDashboard, t: "one place for the day", d: "tasks, reviews, chat, calendar, people and money in one app." },
  { icon: Eye, t: "work gets checked", d: "send work for review. it comes back approved, or with notes, round by round." },
  { icon: Sparkles, t: "ai for the busywork", d: "briefs, task lists, call notes and tidy writing, always checked by a person first." },
  { icon: MonitorSmartphone, t: "on every screen", d: "browser, windows and mac app, phones and tablets. one codebase." },
];

const before = [
  "work was spread over chat groups, spreadsheets, folders and memory",
  "“is this approved?” meant scrolling back through messages",
  "nobody could see who was free, or who had the camera",
  "estimates and follow-ups lived in someone's own files",
];
const after = [
  "one app where every task, chat and file belongs to a project",
  "reviews happen on the task, with every round and note kept",
  "home shows who is on, what's at risk and what's waiting",
  "sales, estimates, gear and requests sit next to the work",
];

const process = [
  { fig: "8", unit: "role stories", t: "start from people's days", b: "a founder's morning, a maker's day, sales asking the studio for help. each became a guided tour before it became screens." },
  { fig: "3", unit: "themes, one token file", t: "a design system first", b: "colours, type, spacing and motion as tokens, so light, dark and high contrast all come for free." },
  { fig: "0", unit: "servers needed to try it", t: "make it clickable early", b: "the whole app runs on sample data in the browser. people tried real flows before any backend existed." },
  { fig: "57", unit: "merged updates", t: "ship small, test with the team", b: "each change went out on its own: a feature, a fix, a screen. feedback came back the same day." },
  { fig: "1", unit: "codebase, 3 platforms", t: "web, desktop and phone", b: "the same screens run in the browser, as a windows and mac app, and on phones and tablets." },
  { fig: "4", unit: "roles per company", t: "safe by default", b: "owner, admin, member, guest. every change goes through one checked door and lands in an activity log." },
];

const behind: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: KeyRound, t: "roles and permissions", d: "owner, admin, member and guest. the rules live in one small, tested package that every screen shares." },
  { icon: ShieldCheck, t: "one door for changes", d: "apps can only read their own company's data. every change goes through the api, which checks the role first." },
  { icon: History, t: "an activity log", d: "company changes, invites, role changes and support visits are written down, and can't be edited." },
  { icon: Laptop, t: "devices you can see", d: "a list of everywhere you're signed in, with names you choose and a sign-out button for each." },
];

const stack: { n: string; use: string; logo: SimpleIcon; mono?: boolean }[] = [
  { n: "react", use: "every screen, in one shared codebase", logo: siReact },
  { n: "typescript", use: "shared shapes for the app, api and phone", logo: siTypescript },
  { n: "tailwind", use: "styling from the design tokens", logo: siTailwindcss },
  { n: "tauri", use: "the windows and mac app", logo: siTauri },
  { n: "expo", use: "the android and iphone app", logo: siExpo, mono: true },
  { n: "hono", use: "the api that checks every change", logo: siHono },
  { n: "supabase", use: "sign-in and the database", logo: siSupabase },
  { n: "postgres", use: "row-level rules so companies never see each other", logo: siPostgresql },
];

export function WorkspaceShowcase() {
  return (
    <main className="ab ws">
      <div className="ab-wrap ab-crumbs">
        <Link href="/work" data-label="back">← all work</Link>
        <span>made at altcore · 2026</span>
      </div>

      <header className="ab-wrap ws-hero">
        <span className="ws-pill big"><i aria-hidden="true" />office management system</span>
        <h1>
          a studio&apos;s whole day in one app. <em>tasks, reviews, chat, people and money.</em>
        </h1>
        <div className="ws-hero-row">
          <p className="ab-lede">
            altcore makes exhibitions, kiosks and 3d experiences. i designed and built the app the team runs on: who&apos;s doing what, what needs a review, what the client owes. it&apos;s calm enough for a new intern and detailed enough for the founder.
          </p>
          <div className="ab-hero-cta">
            <a href="#try" className="ab-btn" data-label="try it">
              try the review loop <ArrowDown aria-hidden="true" />
            </a>
            <a href="#people" className="ab-btn ghost" data-label="explore">see it by role</a>
          </div>
        </div>
        <WorkspacePromo />
        <dl className="ab-meta">
          <div><dt>role</dt><dd>product design, ui, front and back end</dd></div>
          <div><dt>for</dt><dd>altcore&apos;s studio, sales and office team</dd></div>
          <div><dt>runs on</dt><dd>web, windows, mac, android, iphone</dd></div>
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

      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ws-pill risk"><i aria-hidden="true" />the problem</span>
          <h2>a busy studio, and the work scattered everywhere</h2>
        </div>
        <div className="ws-ba">
          <div>
            <small>before</small>
            <ul>
              {before.map((b) => (
                <li key={b}><X aria-hidden="true" />{b}</li>
              ))}
            </ul>
          </div>
          <div className="after">
            <small>after</small>
            <ul>
              {after.map((b) => (
                <li key={b}><Check aria-hidden="true" />{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ab-sec ab-process">
        <div className="ab-wrap">
          <div className="ab-head">
            <span className="ws-pill"><i aria-hidden="true" />design process</span>
            <h2>how it came together</h2>
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

      <section id="people" className="ab-wrap ab-sec ab-tone ws-tone-peach">
        <div className="ab-head">
          <span className="ws-pill"><i aria-hidden="true" />one app, five people</span>
          <h2>the same app looks different for each job</h2>
          <p>pick a job. each one lives in a different part of the app, and their menu is built around what they do all day. the screens are from a made-up sample studio.</p>
        </div>
        <WorkspaceRoles />
      </section>

      <section className="ab-wrap ab-sec ab-tone ws-tone-mist">
        <div className="ab-head">
          <span className="ws-pill"><i aria-hidden="true" />getting work done</span>
          <h2>from today&apos;s plan to “approved”</h2>
          <p>keep scrolling. every clip is the real app, recorded in the browser.</p>
        </div>
        <WorkspaceWork />
      </section>

      <section id="try" className="ab-wrap ab-sec ab-tone ws-tone-mint">
        <div className="ab-head">
          <span className="ws-pill ok"><i aria-hidden="true" />try it</span>
          <h2>be the designer, then the boss</h2>
          <p>tick the steps and send it. then switch seats: ask for a change or approve it. this is the loop at the heart of the app.</p>
        </div>
        <WorkspaceReviewDemo />
      </section>

      <section className="ab-wrap ab-sec ab-tone ws-tone-sky">
        <div className="ab-head">
          <span className="ws-pill"><i aria-hidden="true" />talking and planning</span>
          <h2>chat, calls, calendar and search that know about the work</h2>
        </div>
        <WorkspaceTalk />
      </section>

      <section className="ab-wrap ab-sec ab-tone ws-tone-lilac">
        <div className="ab-head">
          <span className="ws-pill"><i aria-hidden="true" />ai helpers</span>
          <h2>ai that takes the busywork, not the decisions</h2>
          <p>the assistant suggests, a person says yes. it never changes anything on its own. (the answers in these clips are staged on sample data, in the same shape as the real feature.)</p>
        </div>
        <WorkspaceAi />
      </section>

      <section className="ab-wrap ab-sec ab-tone ws-tone-mist">
        <div className="ab-head">
          <span className="ws-pill"><i aria-hidden="true" />the business side</span>
          <h2>sales, money and things, next to the work they belong to</h2>
          <p>the same app the designers use also runs the deals, the estimates and the store room.</p>
        </div>
        <WorkspaceBusiness />
      </section>

      <section className="ab-wrap ab-sec ab-tone ws-tone-peach">
        <div className="ab-head">
          <span className="ws-pill"><i aria-hidden="true" />for everyone · accessibility</span>
          <h2>easy for the intern, quick for the founder</h2>
          <p>plain words, big targets, three themes, and a phone layout for every screen.</p>
        </div>
        <WorkspaceEveryone />
      </section>

      <section className="ab-wrap ab-sec ab-tone ws-tone-ink">
        <div className="ab-head">
          <span className="ws-pill"><i aria-hidden="true" />behind the scenes</span>
          <h2>admins in control, and data that stays put</h2>
          <p>a company decides what its people see. every change is checked and written down.</p>
        </div>
        <div className="ws-behind">
          <WorkspaceAdminClip />
          <ul>
            {behind.map((b) => (
              <li key={b.t}>
                <span className="ab-ico"><b.icon aria-hidden="true" /></span>
                <b>{b.t}</b>
                <small>{b.d}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ab-wrap ab-sec">
        <div className="ab-head">
          <span className="ws-pill"><i aria-hidden="true" />the tools</span>
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

      <div className="ab-wrap">
        <MoreWork slug="altcore-workspace" />
      </div>
    </main>
  );
}
