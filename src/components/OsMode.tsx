import type { CSSProperties, ReactNode } from "react";

function OsWin({ id, title, dark, style, children }: { id: string; title: string; dark?: boolean; style: CSSProperties; children: ReactNode }) {
  return (
    <section className={`win${dark ? " dark" : ""}`} id={id} style={style}>
      <div className="bar">
        <div className="lights">
          <button className="c" aria-label="close">×</button>
          <button className="m" aria-label="minimise">−</button>
          <button className="z" aria-label="bring to front">+</button>
        </div>
        <div className="title">{title}</div>
      </div>
      {children}
    </section>
  );
}

const paints = [
  ["#16181a", "ink"],
  ["#ff7a3d", "tangerine"],
  ["#c9b8ff", "lilac"],
  ["#2c6e57", "green"],
  ["#ffe680", "butter"],
];

/** Full-screen desktop that opens over the site. Behaviour lives in lib/interactions.js. */
export function OsMode() {
  return (
    <div className="os" id="os" hidden role="dialog" aria-label="os mode">
      <div className="os-bar">
        <span className="logo">vivek<b>.</b>os</span>
        <nav className="os-menu" aria-label="apps">
          <button type="button" data-win="w-hello">about</button>
          <button type="button" data-win="w-sim">dots</button>
          <button type="button" data-win="w-paint">paint</button>
          <button type="button" data-win="w-bugs">bug squash</button>
        </nav>
        <button type="button" className="os-exit" data-os-close data-label="back to the site">exit os mode ✕</button>
      </div>
      <div className="os-desk" id="osDesk">
        <OsWin id="w-hello" title="hello.txt" style={{ left: "4%", top: "6%", width: "min(380px,30vw)" }}>
          <div className="os-hello">
            <h3>hi, i&apos;m <em>vivekanand</em></h3>
            <p>welcome to my desktop. everything here is draggable. try the apps, or exit to see the work.</p>
          </div>
        </OsWin>
        <OsWin id="w-sim" title="dots.sim" dark style={{ left: "35%", top: "24%", width: "min(440px,34vw)" }}>
          <canvas id="sim" width={960} height={600} data-label="stir it" />
          <div className="mood" style={{ padding: "12px 14px" }}>
            <div className="mrow" id="moods" style={{ marginTop: 0 }}>
              {["tangerine", "lilac", "mint", "disco"].map((m, i) => (
                <button type="button" key={m} data-mood={m} aria-pressed={i === 0}>{m}</button>
              ))}
            </div>
          </div>
        </OsWin>
        <OsWin id="w-paint" title="paint.app" style={{ left: "3%", top: "44%", width: "min(400px,30vw)" }}>
          <div className="paint-tools" id="paintTools">
            {paints.map(([c, name], i) => (
              <button type="button" key={c} style={{ background: c }} data-c={c} aria-label={name} aria-pressed={i === 0} />
            ))}
            <input type="range" id="brush" min={2} max={28} defaultValue={6} aria-label="brush size" />
            <button type="button" className="clear" id="paintClear">clear</button>
          </div>
          <canvas id="paint" width={800} height={533} data-label="paint" />
        </OsWin>
        <OsWin id="w-bugs" title="bug-squash.exe" dark style={{ left: "63%", top: "44%", width: "min(340px,26vw)" }}>
          <div className="bugs-head">
            <span>score <b id="bugScore">0</b> · <b id="bugTime">20</b>s</span>
            <button type="button" id="bugStart">start</button>
          </div>
          <div className="bugs-field" id="bugField">
            <div className="msg" id="bugMsg">bugs escaped into prod. squash as many as you can in 20 seconds.</div>
          </div>
        </OsWin>
        <nav className="os-icons" aria-label="desktop icons">
          <button type="button" className="os-icon" data-os-close data-jump-after="work"><i className="folder" style={{ "--c": "#c9b8ff" } as CSSProperties} /><span>work</span></button>
          <button type="button" className="os-icon" data-win="w-paint"><i className="folder" style={{ "--c": "#ffe680" } as CSSProperties} /><span>paint</span></button>
          <button type="button" className="os-icon" data-win="w-bugs"><i className="folder" style={{ "--c": "#ffb59a" } as CSSProperties} /><span>games</span></button>
          <button type="button" className="os-icon" data-win="w-sim"><i className="folder" style={{ "--c": "#9fe0c2" } as CSSProperties} /><span>toys</span></button>
          <button type="button" className="os-icon" data-win="w-hello"><i className="file" data-ext="TXT" /><span>hello.txt</span></button>
          <button type="button" className="os-icon" data-toast="trash: old-portfolio.framer ( ˘ ᵕ ˘ )"><i className="file" data-ext="BIN" /><span>trash</span></button>
        </nav>
      </div>
    </div>
  );
}
