import Link from "next/link";
import type { CSSProperties } from "react";
import { categoryLabels, projects, type Project } from "@/data/projects";
import type { Block, CaseStudy, Media, Theme } from "@/data/case-studies";
import { Thumb } from "./Thumb";

/*
  Project pages are product showcases, so they step out of the os look:
  each one wears its own theme (colours from case-studies.ts), clean frames instead of mac windows,
  and sections for what it does, how it works, and what i did on it.
*/

const tintColours: Record<Project["tint"], string> = {
  t1: "#7b5cff",
  t2: "#e0a800",
  t3: "#ff7a3d",
  t4: "#1f9e6e",
};

function themeVars(p: Project, t?: Theme): CSSProperties {
  const theme: Theme = t ?? {
    mode: "light",
    bg: "#f7f6f2",
    surface: "#ffffff",
    ink: "#16181a",
    accent: tintColours[p.tint],
  };
  return {
    "--pp-bg": theme.bg,
    "--pp-surface": theme.surface,
    "--pp-ink": theme.ink,
    "--pp-accent": theme.accent,
    "--pp-accent2": theme.accent2 ?? theme.accent,
  } as CSSProperties;
}

function youtubeId(src: string) {
  const m = src.match(/(?:embed\/|v=|youtu\.be\/|shorts\/)([\w-]{6,})/);
  return m ? m[1] : src;
}

/** One image, video or embed in a clean rounded frame with an optional caption. */
function Frame({ m, className = "" }: { m: Media; className?: string }) {
  const label = m.alt ?? m.caption ?? "";
  return (
    <figure className={`pp-frame${m.wide ? " wide" : ""}${m.crop ? " crop" : ""} ${className}`}>
      <div className="pp-shot">
        {m.type === "youtube" ? (
          <div className="pp-embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId(m.src)}`}
              title={label || "video"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : m.type === "video" ? (
          <video src={m.src} muted loop playsInline controls preload="metadata" data-inview-play aria-label={label} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={m.src} alt={m.alt ?? ""} loading="lazy" decoding="async" />
        )}
      </div>
      {m.caption && <figcaption>{m.caption}</figcaption>}
    </figure>
  );
}

function Head({ kicker, heading }: { kicker?: string; heading?: string }) {
  if (!heading && !kicker) return null;
  return (
    <div className="pp-head">
      {kicker && <span className="pp-kicker">{kicker}</span>}
      {heading && <h2>{heading}</h2>}
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.kind) {
    case "text":
      return (
        <section className="pp-sec pp-text">
          <Head kicker={b.kicker} heading={b.heading} />
          <div className="pp-prose">{b.body.map((p, i) => <p key={i}>{p}</p>)}</div>
        </section>
      );
    case "features":
      return (
        <section className="pp-sec">
          <Head kicker={b.kicker} heading={b.heading} />
          <div className="pp-features">
            {b.items.map((f, i) => (
              <div className="pp-card" key={i}>
                <span className="pp-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </section>
      );
    case "pipeline":
      return (
        <section className="pp-sec">
          <Head kicker={b.kicker} heading={b.heading} />
          <ol className="pp-pipe">
            {b.items.map((s, i) => (
              <li key={i}>
                <span className="dot" aria-hidden="true" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>
      );
    case "steps":
      return (
        <section className="pp-sec pp-text">
          <Head kicker={b.kicker} heading={b.heading} />
          <ol className="pp-steps">
            {b.items.map((s, i) => (
              <li key={i}>
                <span className="pp-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );
    case "list":
      return (
        <section className="pp-sec pp-text">
          <Head kicker={b.kicker} heading={b.heading} />
          <ul className="pp-list">{b.items.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </section>
      );
    case "skills":
      return (
        <section className="pp-sec">
          <Head kicker={b.kicker} heading={b.heading} />
          <div className="pp-skills">
            {b.items.map((s, i) => (
              <div className="pp-card" key={i}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="pp-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </section>
      );
    case "stack":
      return (
        <section className="pp-sec">
          <Head kicker={b.kicker} heading={b.heading} />
          <dl className="pp-stack">
            {b.groups.map((g) => (
              <div key={g.label}>
                <dt>{g.label}</dt>
                <dd>{g.items.map((t) => <span key={t}>{t}</span>)}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case "stats":
      return (
        <section className="pp-sec">
          {b.heading && <Head heading={b.heading} />}
          <div className="pp-facts">
            {b.items.map((s, i) => (
              <div key={i}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      );
    case "quote":
      return (
        <section className="pp-sec pp-text">
          <blockquote className="pp-quote">
            “{b.text}”
            {b.who && <small>{b.who}</small>}
          </blockquote>
        </section>
      );
    case "gallery":
      return (
        <section className="pp-sec">
          <Head kicker={b.kicker} heading={b.heading} />
          <div className={`pp-gallery n${Math.min(b.items.length, 3)}`}>
            {b.items.map((m, i) => <Frame m={m} key={i} />)}
          </div>
        </section>
      );
  }
}

function Meta({ p, cs }: { p: Project; cs?: CaseStudy }) {
  const rows: [string, string][] = [];
  if (cs?.client) rows.push(["for", cs.client]);
  if (cs?.year) rows.push(["year", cs.year]);
  if (cs?.role) rows.push(["role", cs.role]);
  if (cs?.team) rows.push(["team", cs.team]);
  if (cs?.duration) rows.push(["time", cs.duration]);
  if (cs?.status) rows.push(["status", cs.status]);
  if (cs?.tools?.length) rows.push(["tools", cs.tools.join(", ")]);
  if (!cs?.client) rows.push(["kind", p.categories.map((c) => categoryLabels[c]).join(", ")]);
  return (
    <dl className="pp-meta">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Soon({ p }: { p: Project }) {
  return (
    <section className="pp-sec pp-text">
      <div className="pp-card pp-soon">
        <span className="pp-kicker">case study</span>
        <h2>write-up still cooking 🍳</h2>
        <p>the full story for this one is on its way: the brief, how it works, and what i built.</p>
        {p.url && (
          <a className="pp-btn ghost" href={p.url} target="_blank" rel="noopener" data-label="open ↗">
            see the old version ↗
          </a>
        )}
      </div>
    </section>
  );
}

export function ProjectPage({ p, cs }: { p: Project; cs?: CaseStudy }) {
  const i = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const hasStory = !!cs?.blocks.some((b) => b.kind !== "gallery");
  const dark = cs?.theme?.mode === "dark";

  return (
    <main className={`pp${dark ? " dark" : ""}`} style={themeVars(p, cs?.theme)}>
      <div className="pp-wrap pp-crumbs">
        <Link href="/work" data-label="back">← all work</Link>
        {cs?.client && <span className="pp-client">made at {cs.client}</span>}
      </div>

      <header className="pp-wrap pp-hero">
        <div className="pp-hero-copy">
          <span className="pp-kicker">{p.name}</span>
          <h1>{cs?.tagline ?? p.name}</h1>
          <p className="pp-intro">{cs?.intro ?? p.blurb}</p>
          <div className="pp-tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          {cs?.links?.length ? (
            <div className="pp-ctas">
              {cs.links.map((l) => (
                <a key={l.href} className="pp-btn" href={l.href} target="_blank" rel="noopener" data-label="open ↗">
                  {l.label} ↗
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <div className="pp-hero-media">
          {cs?.cover ? (
            <Frame m={cs.cover} className="pp-cover" />
          ) : (
            <figure className="pp-frame pp-cover">
              <div className="pp-shot">
                <Thumb p={p}>{p.isNew && <span className="ph">new</span>}</Thumb>
              </div>
            </figure>
          )}
        </div>
      </header>

      <div className="pp-wrap">
        {cs?.facts?.length ? (
          <div className="pp-facts">
            {cs.facts.map((f) => (
              <div key={f.label}>
                <b>{f.value}</b>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        ) : null}
        <Meta p={p} cs={cs} />
      </div>

      <div className="pp-wrap pp-body">
        {cs?.blocks.map((b, k) => <BlockView b={b} key={k} />)}
        {!hasStory && <Soon p={p} />}
      </div>

      <nav className="pp-wrap pp-next" aria-label="more projects">
        {[
          { label: "← previous", q: prev },
          { label: "next →", q: next },
        ].map(({ label, q }) => (
          <Link key={label} className="pp-nextcard" href={`/work/${q.slug}`} data-label={label}>
            <Thumb p={q} />
            <span>
              <small>{label}</small>
              {q.name}
            </span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
