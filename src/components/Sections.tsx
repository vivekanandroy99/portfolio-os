import { Bar, Win } from "./Win";

export function OsTeaser() {
  return (
    <section className="play os-tease" id="playground">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2>prefer to <em>click around?</em></h2>
          </div>
          <p>switch this site into a little desktop. drag windows, paint, squash bugs and poke at toys.</p>
        </div>
        <button type="button" className="os-launch" data-os-open data-label="boot it up">
          <span className="mini" aria-hidden="true">
            <i className="w1" />
            <i className="w2" />
            <i className="w3" />
          </span>
          <span className="txt">
            enter os mode <kbd>⌘ O</kbd>
          </span>
        </button>
      </div>
    </section>
  );
}

export function Notes() {
  return (
    <section className="notes deco-host" id="notes">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2>a little <em>letter</em></h2>
          </div>
        </div>
        <Win title="notes.txt · draft">
          <div className="letter">
            <p>hey, thanks for scrolling this far.</p>
            <p>
              i&apos;ve never fit in one box. some days i&apos;m pushing pixels in figma, some days i&apos;m wiring
              sensors for an exhibition, and some nights i&apos;m vibe coding a tiny game at 2am because an idea
              wouldn&apos;t let me sleep.
            </p>
            <p>
              what ties it together is simple: i like making things people want to touch. good design should feel
              alive, a bit playful and very human.
            </p>
            <p>if you&apos;ve got something weird, ambitious or half-formed, i&apos;d love to hear about it.</p>
            <div className="sign">
              vivekanand<small>creative technologist · draft copy, rewrite in your own words</small>
            </div>
          </div>
        </Win>
      </div>
      <div className="sticker s-polaroid" style={{ left: "5%", top: "30%" }} data-label="drag me">
        <span className="pic" />
        <span className="cap">me, probably</span>
      </div>
      <div className="sticker s-note" style={{ right: "5%", top: "56%" }} data-label="drag me">
        todo:<br />reply to you ✓
      </div>
    </section>
  );
}

const ways = [
  {
    file: "collab.zip",
    title: "collab",
    sub: "a fun side quest together.",
    items: ["game jams + hackathons", "art and installation pieces", "open source experiments"],
    cta: "let's jam",
  },
  {
    file: "freelance.app",
    title: "freelance",
    sub: "one project, start to ship.",
    items: ["ui / ux and product design", "interactive websites", "prototypes that actually run"],
    cta: "start a project",
    feat: true,
  },
  {
    file: "fulltime.pkg",
    title: "full-time",
    sub: "all the hands you need.",
    items: ["design engineer roles", "creative tech teams", "studios + agencies"],
    cta: "talk roles",
  },
];

export function Ways() {
  return (
    <section id="hire" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2>vivekanand, <em>your way</em></h2>
          </div>
          <p>three ways we can team up. no forms, just say hi.</p>
        </div>
        <div className="ways">
          {ways.map((w) => (
            <div className={`win way${w.feat ? " feat" : ""}`} key={w.title}>
              <Bar title={w.file} />
              <div className="in">
                {w.feat && <span className="pill">most asked</span>}
                <h3>{w.title}</h3>
                <p className="sub">{w.sub}</p>
                <ul>{w.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <a className={`btn ${w.feat ? "dark" : "ghost"}`} href="#say-hi" data-jump="say-hi" data-label="say hi">
                  {w.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const quotes = [
  { q: "placeholder: a line about how the project felt to work on together.", who: "client name", role: "role · company", c: "var(--lilac)" },
  { q: "placeholder: something about turning a rough idea into a thing people could actually play with in a week.", who: "teammate name", role: "role · studio", c: "var(--butter)" },
  { q: "placeholder: short and punchy.", who: "collaborator", role: "exhibition partner", c: "var(--peach)" },
  { q: "placeholder: a longer quote about process, communication and how the final experience landed with visitors.", who: "founder name", role: "startup", c: "var(--mint)" },
  { q: "placeholder: one more nice thing.", who: "friend of the studio", role: "designer", c: "var(--lilac)" },
  { q: "placeholder: a quote about the game, the prototype or the vibe.", who: "player one", role: "playtester", c: "var(--butter)" },
];

export function Words() {
  return (
    <section className="words" id="words">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2>people <em>said</em> stuff</h2>
          </div>
          <p>placeholder quotes. swap in real ones from clients, teammates and collaborators.</p>
        </div>
        <div className="wall">
          {quotes.map((q, i) => (
            <figure className="win quote" key={i}>
              <div className="in">
                <blockquote>&ldquo;{q.q}&rdquo;</blockquote>
                <figcaption className="who">
                  <span className="avatar" style={{ background: q.c }}>{String.fromCharCode(97 + i)}</span>
                  <span>{q.who}<small>{q.role}</small></span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
