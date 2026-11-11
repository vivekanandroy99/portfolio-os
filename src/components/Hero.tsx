import { site } from "@/data/site";
import { Bar } from "./Win";
import { HeroFloaties } from "./Floaties";

/** Every lowercase "a" in the name becomes a googly eye that follows the cursor. */
function NameWithEyes({ name }: { name: string }) {
  return (
    <em className="eye-name">
      {name.split("").map((ch, i) =>
        ch === "a" ? (
          <span className="eye-a" key={i}>
            a<span className="eye"><i /></span>
          </span>
        ) : (
          <span key={i}>{ch}</span>
        )
      )}
    </em>
  );
}

export function Hero() {
  return (
    <div className="hero">
      <canvas id="mat" className="mat-cv" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 aria-label={`hi, i'm ${site.firstName}`}>
              <span aria-hidden="true">
                <span className="h1-hi">hi, i&apos;m</span>
                <NameWithEyes name={site.firstName} />
              </span>
            </h1>
            <p className="lede">{site.lede}</p>
            <div className="chips">
              {site.chips.map((c, i) => (
                <span className={`chip c${i % 6}`} key={c}>
                  <i aria-hidden="true" />
                  {c}
                </span>
              ))}
            </div>
            <div className="ctas">
              <a className="btn" href="#work" data-jump="work" data-label="scroll">
                see my work <small>↓</small>
              </a>
              <a className="btn ghost" href="#say-hi" data-jump="say-hi" data-label="say hi">
                get in touch
              </a>
              <a className="btn dark" href={site.links.resume} data-resume data-label="preview">
                resume <small>⌕</small>
              </a>
            </div>
          </div>
          <div className="win reel" data-label="watch" data-tilt>
            <Bar title="showreel.mov" />
            <canvas id="reel" width={960} height={540} aria-label="animated showreel placeholder" />
            <div className="cap">
              <span>placeholder: your showreel goes here</span>
              <span id="tc">00:00:00</span>
            </div>
          </div>
        </div>

        {/* stickers: drag them around on desktop */}
        <div className="sticker s-name" style={{ left: "1%", top: "45%" }} data-label="drag me">
          <div className="top">hello<small>my name is</small></div>
          <div className="white">{site.firstName}</div>
        </div>
        <div className="sticker s-badge" style={{ right: "8%", top: "27%" }} data-label="drag me">
          open to<br />work!
        </div>
        <div className="sticker s-face" style={{ right: "4%", top: "9%" }} data-label="drag me">
          ( ˘ ᵕ ˘ )
        </div>
        <div className="sticker s-cursor" style={{ left: "10%", top: "66%" }} data-label="drag me">
          <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
            <path d="M4 2l15 11-6.5 1.2L16 21l-3 1.4-3.4-6.9L4 19z" fill="#16181a" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span>click stuff</span>
        </div>

        {/* bubble pop arcade: score, combo, a strip of bubble wrap that fills up a level, and a rank */}
        <div className="sticker pop-arcade" style={{ left: "-4%", top: "5%" }} data-label="pop the bubbles">
          <div className="pa-top">
            <span className="pa-logo">bubble<b>pop</b></span>
            <span className="pa-lvl">lvl <b data-pop-lvl>1</b></span>
            <button type="button" className="pa-snd" data-pop-sound aria-label="sound on" data-label="sound">
              <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path d="M3 8h3l4-3.5v11L6 12H3z" fill="currentColor" /><path className="w1" d="M13 7.5a3.5 3.5 0 0 1 0 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path className="w2" d="M15.2 5.2a6.6 6.6 0 0 1 0 9.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path className="x" d="M13.5 7.5l4 5m0-5l-4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div className="pa-screen">
            <b data-pop-count>0</b>
            <span className="pa-combo" data-pop-combo />
          </div>
          <div className="pa-wrap" data-pop-wrap aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => <i key={i} />)}
          </div>
          <small className="pa-rank" data-pop-rank>pop a bubble to start</small>
        </div>

        <HeroFloaties />

      </div>
    </div>
  );
}

export function Marquee() {
  const once = site.marquee.flatMap((w) => [w, "✦"]);
  const items = [...once, ...once];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {items.map((w, i) => (
          <span key={i} className={w === "✦" ? "star" : undefined}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
