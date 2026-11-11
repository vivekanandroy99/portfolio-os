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
          <a href={site.links.resume} data-resume data-label="preview">resume</a>
          <a href="/#notes" data-jump="notes">notes</a>
          <a href="/#hire" data-jump="hire">hire me</a>
          <Link href="/work">all work</Link>
          <button type="button" className="os-btn" data-os-open data-label="boot it up">
            os mode
          </button>
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
      {/* resume preview window, opened by anything with data-resume */}
      <div className="resume-modal" id="resumeModal" hidden role="dialog" aria-modal="true" aria-label="resume">
        <div className="win resume-win">
          <div className="bar">
            <span className="lights"><i data-close title="close" /><i /><i /></span>
            <span className="ttl">vivekanand-roy-resume.pdf</span>
          </div>
          <div className="resume-body">
            <div className="resume-loading">loading resume…</div>
            <iframe data-src={site.resume.preview} title="resume preview" />
          </div>
          <div className="resume-tools">
            <a className="btn" href={site.resume.download} download data-label="save it">download <small>↓</small></a>
            <button type="button" className="btn ghost" data-resume-share data-url={site.resume.share} data-label="share">share <small>↗</small></button>
            <a className="btn ghost" href={site.resume.share} target="_blank" rel="noopener" data-label="new tab">open in new tab</a>
            <button type="button" className="btn ghost resume-x" data-close aria-label="close">close <small>esc</small></button>
          </div>
        </div>
      </div>
      {/* custom cursor: one shape per mode, the active one is chosen from what you hover */}
      <div className="cur" id="cur" data-mode="arrow" aria-hidden="true">
        <svg className="c c-arrow" width="22" height="34" viewBox="0 0 11 17" shapeRendering="crispEdges">
          <rect x="0" y="0" width="1" height="1" fill="#fff" /><rect x="0" y="1" width="1" height="1" fill="#fff" /><rect x="1" y="1" width="1" height="1" fill="#fff" /><rect x="0" y="2" width="1" height="1" fill="#fff" /><rect x="1" y="2" width="1" height="1" fill="#000" /><rect x="2" y="2" width="1" height="1" fill="#fff" /><rect x="0" y="3" width="1" height="1" fill="#fff" /><rect x="1" y="3" width="1" height="1" fill="#000" /><rect x="2" y="3" width="1" height="1" fill="#000" /><rect x="3" y="3" width="1" height="1" fill="#fff" /><rect x="0" y="4" width="1" height="1" fill="#fff" /><rect x="1" y="4" width="1" height="1" fill="#000" /><rect x="2" y="4" width="1" height="1" fill="#000" /><rect x="3" y="4" width="1" height="1" fill="#000" /><rect x="4" y="4" width="1" height="1" fill="#fff" /><rect x="0" y="5" width="1" height="1" fill="#fff" /><rect x="1" y="5" width="1" height="1" fill="#000" /><rect x="2" y="5" width="1" height="1" fill="#000" /><rect x="3" y="5" width="1" height="1" fill="#000" /><rect x="4" y="5" width="1" height="1" fill="#000" /><rect x="5" y="5" width="1" height="1" fill="#fff" /><rect x="0" y="6" width="1" height="1" fill="#fff" /><rect x="1" y="6" width="1" height="1" fill="#000" /><rect x="2" y="6" width="1" height="1" fill="#000" /><rect x="3" y="6" width="1" height="1" fill="#000" /><rect x="4" y="6" width="1" height="1" fill="#000" /><rect x="5" y="6" width="1" height="1" fill="#000" /><rect x="6" y="6" width="1" height="1" fill="#fff" /><rect x="0" y="7" width="1" height="1" fill="#fff" /><rect x="1" y="7" width="1" height="1" fill="#000" /><rect x="2" y="7" width="1" height="1" fill="#000" /><rect x="3" y="7" width="1" height="1" fill="#000" /><rect x="4" y="7" width="1" height="1" fill="#000" /><rect x="5" y="7" width="1" height="1" fill="#000" /><rect x="6" y="7" width="1" height="1" fill="#000" /><rect x="7" y="7" width="1" height="1" fill="#fff" /><rect x="0" y="8" width="1" height="1" fill="#fff" /><rect x="1" y="8" width="1" height="1" fill="#000" /><rect x="2" y="8" width="1" height="1" fill="#000" /><rect x="3" y="8" width="1" height="1" fill="#000" /><rect x="4" y="8" width="1" height="1" fill="#000" /><rect x="5" y="8" width="1" height="1" fill="#000" /><rect x="6" y="8" width="1" height="1" fill="#000" /><rect x="7" y="8" width="1" height="1" fill="#000" /><rect x="8" y="8" width="1" height="1" fill="#fff" /><rect x="0" y="9" width="1" height="1" fill="#fff" /><rect x="1" y="9" width="1" height="1" fill="#000" /><rect x="2" y="9" width="1" height="1" fill="#000" /><rect x="3" y="9" width="1" height="1" fill="#000" /><rect x="4" y="9" width="1" height="1" fill="#000" /><rect x="5" y="9" width="1" height="1" fill="#000" /><rect x="6" y="9" width="1" height="1" fill="#000" /><rect x="7" y="9" width="1" height="1" fill="#000" /><rect x="8" y="9" width="1" height="1" fill="#000" /><rect x="9" y="9" width="1" height="1" fill="#fff" /><rect x="0" y="10" width="1" height="1" fill="#fff" /><rect x="1" y="10" width="1" height="1" fill="#000" /><rect x="2" y="10" width="1" height="1" fill="#000" /><rect x="3" y="10" width="1" height="1" fill="#000" /><rect x="4" y="10" width="1" height="1" fill="#000" /><rect x="5" y="10" width="1" height="1" fill="#000" /><rect x="6" y="10" width="1" height="1" fill="#fff" /><rect x="7" y="10" width="1" height="1" fill="#fff" /><rect x="8" y="10" width="1" height="1" fill="#fff" /><rect x="9" y="10" width="1" height="1" fill="#fff" /><rect x="10" y="10" width="1" height="1" fill="#fff" /><rect x="0" y="11" width="1" height="1" fill="#fff" /><rect x="1" y="11" width="1" height="1" fill="#000" /><rect x="2" y="11" width="1" height="1" fill="#000" /><rect x="3" y="11" width="1" height="1" fill="#fff" /><rect x="4" y="11" width="1" height="1" fill="#000" /><rect x="5" y="11" width="1" height="1" fill="#000" /><rect x="6" y="11" width="1" height="1" fill="#fff" /><rect x="0" y="12" width="1" height="1" fill="#fff" /><rect x="1" y="12" width="1" height="1" fill="#000" /><rect x="2" y="12" width="1" height="1" fill="#fff" /><rect x="4" y="12" width="1" height="1" fill="#fff" /><rect x="5" y="12" width="1" height="1" fill="#000" /><rect x="6" y="12" width="1" height="1" fill="#000" /><rect x="7" y="12" width="1" height="1" fill="#fff" /><rect x="0" y="13" width="1" height="1" fill="#fff" /><rect x="1" y="13" width="1" height="1" fill="#fff" /><rect x="4" y="13" width="1" height="1" fill="#fff" /><rect x="5" y="13" width="1" height="1" fill="#000" /><rect x="6" y="13" width="1" height="1" fill="#000" /><rect x="7" y="13" width="1" height="1" fill="#fff" /><rect x="0" y="14" width="1" height="1" fill="#fff" /><rect x="5" y="14" width="1" height="1" fill="#fff" /><rect x="6" y="14" width="1" height="1" fill="#000" /><rect x="7" y="14" width="1" height="1" fill="#000" /><rect x="8" y="14" width="1" height="1" fill="#fff" /><rect x="5" y="15" width="1" height="1" fill="#fff" /><rect x="6" y="15" width="1" height="1" fill="#000" /><rect x="7" y="15" width="1" height="1" fill="#000" /><rect x="8" y="15" width="1" height="1" fill="#fff" /><rect x="6" y="16" width="1" height="1" fill="#fff" /><rect x="7" y="16" width="1" height="1" fill="#fff" />
        </svg>
        <svg className="c c-point" width="28" height="30" viewBox="0 0 28 30">
          <path d="M9 2.5c1.4 0 2.4 1 2.4 2.4v8l1.1-.2c.2-1.2 1.2-2 2.3-1.9 1 .1 1.7.8 1.9 1.6.5-.6 1.3-1 2.1-.9 1 .1 1.8.9 1.9 1.9.5-.4 1.1-.5 1.7-.4 1.2.2 2 1.2 2 2.4v5.3c0 4.6-3.6 8.2-8.2 8.2h-1.8c-2.6 0-5-1.2-6.6-3.3L3.3 18.6c-.8-1-.6-2.4.4-3.1.9-.7 2.2-.6 3 .3l.1.1V4.9C6.6 3.5 7.6 2.5 9 2.5z" fill="#fff" stroke="#16181a" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <svg className="c c-grab" width="30" height="30" viewBox="0 0 30 30">
          <path d="M8 13V7.5a2 2 0 014 0V12m0-6a2 2 0 014 0v6m0-5a2 2 0 014 0v6m0-3a2 2 0 014 0v8c0 5-3.5 8.5-8.5 8.5H15c-2.6 0-4.6-1-6.2-3l-4-5.2a2 2 0 013-2.6L8 17" fill="#fff" stroke="#16181a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="c c-pin" width="40" height="40" viewBox="0 0 40 40">
          <path d="M4 36l14-14" stroke="#9aa1a6" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M4 36l14-14" stroke="#fff" strokeWidth=".8" strokeLinecap="round" opacity=".8" />
          <circle cx="25" cy="15" r="9.5" fill="#ff5f57" stroke="#16181a" strokeWidth="1.6" />
          <ellipse cx="22" cy="11.5" rx="3.4" ry="2.2" fill="#fff" opacity=".75" transform="rotate(-35 22 11.5)" />
        </svg>
        <span className="c c-play"><i /></span>
        <span className="c c-peek">↗</span>
        <svg className="c c-pencil" width="36" height="36" viewBox="0 0 36 36">
          <path d="M3 33l3-10L26 3l7 7-20 20z" fill="#ffd95a" stroke="#16181a" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M3 33l3-10 7 7z" fill="#f6d7b0" stroke="#16181a" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M3 33l1.3-4.4 3.1 3.1z" fill="#16181a" />
          <path d="M22 7l7 7" stroke="#16181a" strokeWidth="1.5" />
          <path d="M26 3l7 7 1-1c1-1 1-2.6 0-3.6l-3.4-3.4c-1-1-2.6-1-3.6 0z" fill="#ff8fb1" stroke="#16181a" strokeWidth="1.5" />
        </svg>
        <svg className="c c-swat" width="44" height="44" viewBox="0 0 44 44">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="rgba(47,182,124,.85)" stroke="#16181a" strokeWidth="1.5" />
          <path d="M7 2v20M12 2v20M17 2v20M2 7h20M2 12h20M2 17h20" stroke="#16181a" strokeWidth=".8" opacity=".45" />
          <path d="M20 20l20 20" stroke="#16181a" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <div className="cur-label" id="curLabel" />
      <div className="toast" id="toast" role="status" aria-live="polite" />
    </>
  );
}
