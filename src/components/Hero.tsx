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
            <span className="eye"><i /></span>
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
                <span className={`chip c${i % 4}`} key={c}>
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
            </div>
          </div>
          <div className="win reel" data-label="watch">
            <Bar title="showreel.mov" />
            <canvas id="reel" width={960} height={540} aria-label="animated showreel placeholder" />
            <div className="cap">
              <span>placeholder: your showreel goes here</span>
              <span id="tc">00:00:00</span>
            </div>
          </div>
        </div>

        {/* stickers: drag them around on desktop */}
        <div className="sticker s-name" style={{ left: "3%", top: "40%" }} data-label="drag me">
          <div className="top">hello<small>my name is</small></div>
          <div className="white">{site.firstName}</div>
        </div>
        <div className="sticker s-badge" style={{ right: "4%", top: "22%" }} data-label="drag me">
          open to<br />work!
        </div>
        <div className="sticker s-face" style={{ left: "9%", top: "6%" }} data-label="drag me">
          ( ˘ ᵕ ˘ )
        </div>
        <div className="sticker s-star" style={{ right: "10%", top: "4%" }} data-label="drag me">
          <span>wow!</span>
        </div>
        <div className="sticker s-cursor" style={{ left: "12%", top: "64%" }} data-label="drag me">
          <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
            <path d="M4 2l15 11-6.5 1.2L16 21l-3 1.4-3.4-6.9L4 19z" fill="#16181a" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span>click stuff</span>
        </div>
        <div className="sticker s-tape" style={{ right: "3%", top: "70%" }} data-label="drag me">
          new site, who dis?
        </div>
        <div className="sticker s-keycap" style={{ left: "5%", top: "94%" }} data-label="try it" data-os-open>
          <kbd>⌘</kbd>
          <kbd>O</kbd>
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
