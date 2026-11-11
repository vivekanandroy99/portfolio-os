import Link from "next/link";
import { categoryLabels, projects, type Project } from "@/data/projects";
import type { Block, CaseStudy, Media } from "@/data/case-studies";
import { Bar } from "./Win";
import { Thumb } from "./Thumb";
import { Accent } from "./Work";

function fileName(src: string) {
  return src.split("?")[0].split("/").pop() || "media";
}

function youtubeId(src: string) {
  const m = src.match(/(?:embed\/|v=|youtu\.be\/|shorts\/)([\w-]{6,})/);
  return m ? m[1] : src;
}

/** One piece of media inside a mac window. */
function MediaWin({ m, className = "" }: { m: Media; className?: string }) {
  const title = m.caption ?? m.alt ?? (m.type === "youtube" ? "video" : fileName(m.src));
  return (
    <figure className={`cs-media win ${m.wide ? "wide " : ""}${className}`}>
      <Bar title={title} />
      {m.type === "youtube" ? (
        <div className="cs-embed">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId(m.src)}`}
            title={m.alt ?? title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : m.type === "video" ? (
        <video src={m.src} muted loop playsInline controls preload="metadata" data-inview-play aria-label={m.alt ?? title} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={m.src} alt={m.alt ?? ""} loading="lazy" decoding="async" />
      )}
    </figure>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.kind) {
    case "text":
      return (
        <section className="cs-block cs-read">
          <h2 className="cs-h">{b.heading}</h2>
          {b.body.map((p, i) => <p key={i}>{p}</p>)}
        </section>
      );
    case "steps":
      return (
        <section className="cs-block cs-read">
          <h2 className="cs-h">{b.heading}</h2>
          <ol className="cs-steps">
            {b.items.map((s, i) => (
              <li key={i}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
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
        <section className="cs-block cs-read">
          <h2 className="cs-h">{b.heading}</h2>
          <ul className="cs-list">{b.items.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </section>
      );
    case "stats":
      return (
        <section className="cs-block cs-wide">
          {b.heading && <h2 className="cs-h">{b.heading}</h2>}
          <div className="cs-stats">
            {b.items.map((s, i) => (
              <div className="win" key={i}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      );
    case "quote":
      return (
        <section className="cs-block cs-read">
          <blockquote className="cs-quote">
            “{b.text}”
            {b.who && <small>{b.who}</small>}
          </blockquote>
        </section>
      );
    case "gallery":
      return (
        <section className="cs-block cs-wide">
          {b.heading && <h2 className="cs-h">{b.heading}</h2>}
          <div className={`cs-gallery${b.items.length === 1 ? " one" : ""}`}>
            {b.items.map((m, i) => <MediaWin m={m} key={i} />)}
          </div>
        </section>
      );
  }
}

function Info({ p, cs }: { p: Project; cs?: CaseStudy }) {
  const rows: [string, string][] = [];
  if (cs?.year) rows.push(["year", cs.year]);
  if (cs?.role) rows.push(["role", cs.role]);
  if (cs?.team) rows.push(["team", cs.team]);
  if (cs?.duration) rows.push(["time", cs.duration]);
  if (cs?.tools?.length) rows.push(["tools", cs.tools.join(", ")]);
  rows.push(["kind", p.categories.map((c) => categoryLabels[c]).join(", ")]);
  const links = cs?.links ?? [];

  return (
    <div className="cs-info win">
      <Bar title={`${p.file} info`} />
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {links.length > 0 && (
        <div className="cs-links">
          {links.map((l) => (
            <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener" data-label="open ↗">
              {l.label} <small>↗</small>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Soon({ p }: { p: Project }) {
  return (
    <section className="cs-block cs-read">
      <div className="cs-soon win">
        <Bar title="case-study.md" />
        <div className="in">
          <h2 className="cs-h">write-up still cooking 🍳</h2>
          <p>the full story for this one is being written: the brief, the process and the messy bits.</p>
          {p.url && (
            <a className="btn ghost" href={p.url} target="_blank" rel="noopener" data-label="open ↗">
              see the old version <small>↗</small>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function ProjectPage({ p, cs }: { p: Project; cs?: CaseStudy }) {
  const hasStory = !!cs?.blocks.some((b) => b.kind !== "gallery");
  const i = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <main className="cs">
      <div className="wrap cs-crumbs">
        <Link href="/work" data-label="back">← all work</Link>
        <span>~/work/{p.file}</span>
      </div>

      <header className="wrap cs-hero">
        <Accent p={p} />
        <h1>{p.name}</h1>
        <p className="cs-intro">{cs?.intro ?? p.blurb}</p>
        <div className="tags2">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
      </header>

      <div className="wrap">
        {cs?.cover ? (
          <MediaWin m={cs.cover} className="cs-cover" />
        ) : (
          <div className="cs-cover win" data-tilt="lift" data-label={p.cursorLabel}>
            <Bar title={p.file} />
            <Thumb p={p}>{p.isNew && <span className="ph">new</span>}</Thumb>
          </div>
        )}
        <Info p={p} cs={cs} />
      </div>

      <div className="wrap cs-body">
        {cs?.blocks.map((b, k) => <BlockView b={b} key={k} />)}
        {!hasStory && <Soon p={p} />}
      </div>

      <nav className="wrap cs-next" aria-label="more projects">
        {[
          { label: "← previous", q: prev },
          { label: "next →", q: next },
        ].map(({ label, q }) => (
          <Link key={label} className="pk win" href={`/work/${q.slug}`} data-label={label}>
            <Bar title={q.file} />
            <Thumb p={q} />
            <div className="pk-name">
              {label} · <b>{q.name}</b>
            </div>
          </Link>
        ))}
      </nav>
    </main>
  );
}
