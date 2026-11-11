import Link from "next/link";
import { featured, notFeatured, projects, type Project } from "@/data/projects";
import { Bar } from "./Win";
import { WorkFloaties } from "./Floaties";
import { Thumb } from "./Thumb";

function linkProps(p: Project) {
  return { href: `/work/${p.slug}` };
}

export function Accent({ p }: { p: Project }) {
  const a = p.accent;
  if (!a || a.kind === "none") return null;
  switch (a.kind) {
    case "chat":
      return <div className="acc acc-chat" aria-hidden="true">{a.text}</div>;
    case "kiosk":
      return (
        <div className="acc acc-kiosk" aria-hidden="true">
          <span className="tiles">{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</span>
          tap to start
        </div>
      );
    case "xyz":
      return (
        <div className="acc acc-xyz" aria-hidden="true">
          x <b data-axis="0">0.00</b> y <b data-axis="1.6">1.60</b> z <b data-axis="-2">-2.00</b>
        </div>
      );
    case "compass":
      return (
        <div className="acc acc-compass" aria-hidden="true">
          <span className="dial"><i /></span>
          {a.text}
        </div>
      );
  }
}

/** Home page: featured projects as zig-zag rows, then a peek at the rest. */
export function WorkSection() {
  const peek = notFeatured.slice(0, 4);
  return (
    <section id="work" className="deco-host" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2>things i&apos;ve <em>made</em></h2>
          </div>
          <p>xr, ai, games and physical things. scroll through, whatever&apos;s in front of you comes into focus.</p>
        </div>
        <div className="sticker s-stamp" style={{ right: "6%", top: "60px" }} data-label="drag me">
          <span>designed<br />+ built<br />in india</span>
        </div>
      </div>
      <div className="wrap">
        <div className="rows">
          {featured.map((p, i) => (
            <article className={`row${i % 2 ? " flip" : ""}`} key={p.slug}>
              <Link className="media win" {...linkProps(p)} data-label={p.cursorLabel} data-tilt>
                <Bar title={p.file} />
                <Thumb p={p}>
                  {!p.media && <span className="ph">{p.url ? "add video" : "new · add media"}</span>}
                </Thumb>
              </Link>
              <div className="side">
                <Accent p={p} />
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
                <div className="tags2">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <Link className="more" {...linkProps(p)} data-label={p.cursorLabel}>
                  open project →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="all-cta" style={{ paddingBottom: 28 }}>
          <Link className="btn dark" href="/work" data-label="open">
            see all work <small>→</small>
          </Link>
        </div>
        <div className="peek" aria-label="more projects">
          {peek.map((p) => (
            <Link className="pk win" href={`/work/${p.slug}`} data-label="open" key={p.slug}>
              <Bar title={p.file} />
              <Thumb p={p} />
              <div className="pk-name">{p.name}</div>
            </Link>
          ))}
          <Link className="pk more-pk" href="/work" data-label="see all">
            <b>all {projects.length}</b>
            <span>projects on the<br />work page →</span>
          </Link>
        </div>
      </div>
      <WorkFloaties />
    </section>
  );
}
