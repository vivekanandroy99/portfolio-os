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
              <a className="btn dark" href={site.links.resume} target="_blank" rel="noopener" data-label="open pdf">
                resume <small>↗</small>
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
        <div className="sticker s-face" style={{ left: "8%", top: "6%" }} data-label="drag me">
          ( ˘ ᵕ ˘ )
        </div>
        <div className="sticker s-star" style={{ right: "1%", top: "7%" }} data-label="drag me">
          <span>wow!</span>
        </div>
        <div className="sticker s-cursor" style={{ left: "10%", top: "66%" }} data-label="drag me">
          <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
            <path d="M4 2l15 11-6.5 1.2L16 21l-3 1.4-3.4-6.9L4 19z" fill="#16181a" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span>click stuff</span>
        </div>
        <div className="sticker s-tape" style={{ right: "1%", top: "75%" }} data-label="drag me">
          new site, who dis?
        </div>
        <div className="sticker s-keycap" style={{ left: "10%", top: "93%" }} data-label="try it" data-os-open>
          <kbd>⌘</kbd>
          <kbd>O</kbd>
        </div>

        <div className="sticker s-counter" style={{ left: "3%", top: "33%" }} data-label="drag me">
          <span className="pc-bubble" aria-hidden="true" />
          <span className="pc-text">
            <b data-pop-count>0</b>
            <small>bubbles popped</small>
          </span>
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
