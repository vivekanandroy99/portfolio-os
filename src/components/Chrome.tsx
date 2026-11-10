import Link from "next/link";
import { site } from "@/data/site";

/** Top menu bar, shared by every page. */
export function Menubar() {
  return (
    <header className="menubar">
      <div className="wrap">
        <Link className="logo" href="/" data-jump="top">
          portfolio<b>-</b>os
        </Link>
        <nav className="menu" aria-label="sections">
          <a href="/#work" data-jump="work">work</a>
          <button type="button" className="os-btn" data-os-open data-label="boot it up">
            os mode
          </button>
          <a href="/#notes" data-jump="notes">notes</a>
          <a href="/#hire" data-jump="hire">hire me</a>
          <Link href="/work">all work</Link>
        </nav>
        <div className="status">
          <span className="now">
            <i className="dot" />
            currently: vibe coding
          </span>
          <span>
            IST <span className="clock" data-clock>--:--</span>
          </span>
        </div>
      </div>
      <div className="progress" id="progress" />
    </header>
  );
}

export function Footer() {
  return (
    <footer id="say-hi">
      <div className="wrap">
        <p className="big-hi">
          say hi<span>.</span>
        </p>
        <div className="mail">
          <code id="email">{site.email}</code>
          <button className="btn" type="button" id="copy" data-label="copy">
            copy email
          </button>
        </div>
        <div className="foot-cols">
          <div>
            <h4>sections</h4>
            <ul>
              <li><a href="/#work" data-jump="work">work</a></li>
              <li><a href="/#playground" data-jump="playground">os mode</a></li>
              <li><Link href="/work">all work</Link></li>
            </ul>
          </div>
          <div>
            <h4>elsewhere</h4>
            <ul>
              <li><a href={site.links.github} target="_blank" rel="noopener">github</a></li>
              <li><a href={site.links.linkedin} target="_blank" rel="noopener">linkedin</a></li>
              <li><a href={site.links.oldSite} target="_blank" rel="noopener">old portfolio</a></li>
            </ul>
          </div>
          <div>
            <h4>right now</h4>
            <ul>
              <li>IST <span className="clock" data-clock>--:--</span></li>
              <li>vibe coding this site</li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <span>© {site.name} {new Date().getFullYear()}</span>
          <span>built with too much curiosity</span>
        </div>
      </div>
    </footer>
  );
}

/** Things that float above every page: cursor, toast. */
export function Overlays() {
  return (
    <>
      <div className="cur" id="cur" />
      <div className="cur-label" id="curLabel" />
      <div className="toast" id="toast" role="status" aria-live="polite" />
    </>
  );
}
