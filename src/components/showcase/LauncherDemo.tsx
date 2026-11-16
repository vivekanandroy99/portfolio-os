"use client";

import { useEffect, useRef, useState } from "react";

/*
  A clickable stand-in for the altcore launcher, with made-up apps for a made-up showroom.
  It mimics the real flows: two layouts, per-person app lists, the launch steps, the hidden kiosk exit
  (hold the logo 5 s, then a PIN), and the settings sheet. Nothing is launched for real.
*/

type Role = "visitor" | "staff" | "admin";
type App = { id: string; name: string; made: string; kind: "program" | "web" | "server"; cat: string; blurb: string; art: [string, string]; shape: "orb" | "ring" | "pill"; who: Role[] };

const APPS: App[] = [
  { id: "skyline", name: "skyline tower", made: "unreal", kind: "program", cat: "walkthroughs", blurb: "walk the 40th-floor show flat in real time, before it's built.", art: ["#ff8a3d", "#c81e00"], shape: "orb", who: ["visitor", "staff", "admin"] },
  { id: "nova", name: "nova drift", made: "unity", kind: "program", cat: "games", blurb: "a two-minute hover-racing game for the queue.", art: ["#5aa9ff", "#2c3fd6"], shape: "ring", who: ["visitor", "staff", "admin"] },
  { id: "planner", name: "room planner", made: "web app + server", kind: "server", cat: "tools", blurb: "drag furniture into a floor plan. its own server starts and stops with it.", art: ["#ffc65a", "#f36f00"], shape: "pill", who: ["visitor", "staff", "admin"] },
  { id: "story", name: "brand story", made: "web address", kind: "web", cat: "walkthroughs", blurb: "the company film and timeline, inside the launcher.", art: ["#f6a5c0", "#b0306a"], shape: "orb", who: ["visitor", "staff", "admin"] },
  { id: "quiz", name: "kids quiz", made: "unity", kind: "program", cat: "games", blurb: "tap-to-answer quiz for younger visitors.", art: ["#7be0b0", "#13866a"], shape: "ring", who: ["visitor", "staff", "admin"] },
  { id: "deck", name: "sales configurator", made: "web app + server", kind: "server", cat: "tools", blurb: "pricing and unit picker for the sales team only.", art: ["#c9b8ff", "#5b3fd6"], shape: "pill", who: ["staff", "admin"] },
];

const STEPS: Record<App["kind"], string[]> = {
  program: ["checking access", "starting the app", "waiting for its window"],
  web: ["checking access", "opening the page"],
  server: ["checking access", "starting its server", "waiting for the page"],
};

const PIN = "2580";

function Art({ a, big }: { a: App; big?: boolean }) {
  return (
    <span className={`kd-art ${a.shape}${big ? " big" : ""}`} style={{ background: `linear-gradient(140deg, ${a.art[0]}, ${a.art[1]})` }} aria-hidden="true">
      <i />
    </span>
  );
}

export function LauncherDemo() {
  const [role, setRole] = useState<Role>("visitor");
  const [layout, setLayout] = useState<"showcase" | "gallery">("showcase");
  const [cat, setCat] = useState("all");
  const [sel, setSel] = useState(APPS[0].id);
  const [modal, setModal] = useState(false);
  const [launch, setLaunch] = useState<{ app: App; step: number; running: boolean } | null>(null);
  const [toast, setToast] = useState("");
  const [locked, setLocked] = useState(true);
  const [hold, setHold] = useState(0);
  const [pinOpen, setPinOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [pinBad, setPinBad] = useState(false);
  const [where, setWhere] = useState(false);
  const [settings, setSettings] = useState(false);
  const [osk, setOsk] = useState<"auto" | "always" | "off">("auto");
  const [kiosk, setKiosk] = useState<"off" | "kiosk" | "bigpicture">("kiosk");
  const [touched, setTouched] = useState(false);
  const holdRef = useRef<number | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    // switching roles = a different person signs in
    setLocked(role === "visitor" && kiosk !== "off");
    setModal(false);
    setSettings(false);
    setCat("all");
  }, [role, kiosk]);

  const mine = APPS.filter((a) => a.who.includes(role));
  const cats = ["all", ...Array.from(new Set(mine.map((a) => a.cat)))];
  const list = mine.filter((a) => cat === "all" || a.cat === cat);
  const app = mine.find((a) => a.id === sel) ?? mine[0];
  const chrome = !locked;

  function say(t: string) {
    setToast(t);
    timers.current.push(window.setTimeout(() => setToast(""), 2600));
  }

  function play(a: App) {
    setModal(false);
    const steps = STEPS[a.kind];
    setLaunch({ app: a, step: 0, running: false });
    steps.forEach((_, i) => timers.current.push(window.setTimeout(() => setLaunch((l) => (l ? { ...l, step: i + 1 } : l)), 700 * (i + 1))));
    timers.current.push(window.setTimeout(() => setLaunch((l) => (l ? { ...l, running: true } : l)), 700 * steps.length + 400));
  }

  function stop() {
    if (!launch) return;
    const n = launch.app.name;
    setLaunch(null);
    say(`${n} closed. everything it started was stopped too.`);
  }

  function holdStart() {
    if (!locked) return;
    const t0 = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - t0) / 5000);
      setHold(p);
      if (p >= 1) {
        holdEnd();
        setPinOpen(true);
        setPin("");
        return;
      }
      holdRef.current = requestAnimationFrame(tick);
    };
    holdRef.current = requestAnimationFrame(tick);
  }
  function holdEnd() {
    if (holdRef.current) cancelAnimationFrame(holdRef.current);
    holdRef.current = null;
    setHold(0);
  }

  function key(k: string) {
    setPinBad(false);
    if (k === "⌫") return setPin((p) => p.slice(0, -1));
    if (k === "ok") {
      if (pin === PIN) {
        setPinOpen(false);
        setWhere(true);
      } else {
        setPinBad(true);
        setPin("");
      }
      return;
    }
    setPin((p) => (p.length < 6 ? p + k : p));
  }

  return (
    <div className="kd" onPointerDownCapture={() => setTouched(true)}>
      <div className="kd-bar" role="group" aria-label="demo settings">
        <div className="kd-seg" role="radiogroup" aria-label="who is using it">
          <span>signed in as</span>
          {(["visitor", "staff", "admin"] as Role[]).map((r) => (
            <button key={r} role="radio" aria-checked={role === r} className={role === r ? "on" : ""} onClick={() => setRole(r)} data-label={r}>
              {r === "visitor" ? "kiosk visitor" : r}
            </button>
          ))}
        </div>
        <p className="kd-hint">
          {locked ? (
            <>visitors only see the logo and the apps. to get out, press and hold the logo for 5 seconds (pin <b>{PIN}</b>).</>
          ) : role === "admin" ? (
            <>admins see everything: the admin panel, the online status, help and settings.</>
          ) : (
            <>staff see the apps given to them, plus help and settings. the sales configurator only shows up for staff and admins.</>
          )}
        </p>
      </div>

      <div className="kd-tags" aria-hidden="true">
        <span>the app · a showroom pc</span>
      </div>
      <div className={`kd-screen ${locked ? "locked" : ""}`}>
        {/* header */}
        <header className="kd-top">
          <button
            className="kd-logo"
            onPointerDown={holdStart}
            onPointerUp={holdEnd}
            onPointerLeave={holdEnd}
            onPointerCancel={holdEnd}
            onContextMenu={(e) => e.preventDefault()}
            onKeyDown={(e) => {
              if (locked && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                setPinOpen(true);
                setPin("");
              }
            }}
            aria-label={locked ? "kiosk exit: press and hold for 5 seconds" : "altcore"}
            data-label={locked ? "hold 5 s" : "altcore"}
          >
            altcore<sup>™</sup>
            <span className="kd-holdline" style={{ transform: `scaleX(${hold})` }} />
          </button>
          <nav className="kd-cats" aria-label="categories">
            {cats.map((c) => (
              <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </nav>
          {chrome && (
            <div className="kd-tools">
              {role === "admin" && <span className="kd-pill online">● online</span>}
              {role === "admin" && <button className="kd-pill" onClick={() => say("the admin panel: apps, people, pcs, screens, sound, kiosk.")}>admin</button>}
              <button className="kd-pill" onClick={() => say("every page has a guide with numbered pictures.")} aria-label="help">?</button>
              <button className="kd-pill" onClick={() => setSettings(true)} aria-label="settings">⚙</button>
              {kiosk !== "off" && role !== "visitor" && (
                <button className="kd-pill dark" onClick={() => setLocked(true)}>
                  lock again
                </button>
              )}
            </div>
          )}
        </header>

        {/* library */}
        {layout === "showcase" ? (
          <div className="kd-show">
            <div className="kd-hero">
              <Art a={app} big />
              <div className="kd-hero-copy">
                <small>{app.made}</small>
                <b>{app.name}</b>
                <span>{app.blurb}</span>
                <div className="kd-hero-btns">
                  <button className="kd-play" onClick={() => play(app)} data-label="play">
                    <i>▶</i> {app.kind === "program" ? "launch" : "open"}
                  </button>
                  <button className="kd-more" onClick={() => setModal(true)}>
                    about
                  </button>
                  {!touched && (
                    <span className="kd-finger" aria-hidden="true">
                      <b>👈</b>
                      <em>tap launch</em>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ul className="kd-list" aria-label="apps">
              {list.map((a) => (
                <li key={a.id}>
                  <button className={a.id === app.id ? "on" : ""} onClick={() => setSel(a.id)}>
                    <Art a={a} />
                    <span>
                      {a.name}
                      <small>{a.made}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="kd-gallery">
            <b className="kd-gtitle">all worlds</b>
            <ul aria-label="apps">
              {list.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() => {
                      setSel(a.id);
                      setModal(true);
                    }}
                  >
                    <Art a={a} />
                    <span>{a.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* about popup */}
        {modal && (
          <div className="kd-scrim" onClick={() => setModal(false)}>
            <div className="kd-modal" role="dialog" aria-label={app.name} onClick={(e) => e.stopPropagation()}>
              <Art a={app} big />
              <b>{app.name}</b>
              <span>{app.blurb}</span>
              <div className="kd-hero-btns">
                <button className="kd-play" onClick={() => play(app)}>
                  <i>▶</i> {app.kind === "program" ? "launch" : "open"}
                </button>
                <button className="kd-more" onClick={() => setModal(false)}>
                  close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* launching */}
        {launch && (
          <div className="kd-scrim">
            {launch.running && launch.app.kind !== "program" ? (
              <div className="kd-frame" role="dialog" aria-label={launch.app.name}>
                <div className="kd-glass">
                  <button onClick={stop}>‹ back</button>
                  <span>{launch.app.name}</span>
                  <small>no address bar, no way out to the web</small>
                </div>
                <div className="kd-page" style={{ background: `linear-gradient(140deg, ${launch.app.art[0]}33, ${launch.app.art[1]}22)` }}>
                  <b>{launch.app.name}</b>
                  <span>{launch.app.kind === "server" ? "its server is running in the background, and stops when you go back." : "a web page, shown inside the launcher."}</span>
                </div>
              </div>
            ) : (
              <div className="kd-load" role="dialog" aria-label={`opening ${launch.app.name}`}>
                <div className="kd-load-art" style={{ background: `linear-gradient(140deg, ${launch.app.art[0]}, ${launch.app.art[1]})` }} />
                <b>{launch.running ? `${launch.app.name} is running` : `opening ${launch.app.name}…`}</b>
                <ul>
                  {STEPS[launch.app.kind].map((s, i) => (
                    <li key={s} className={launch.step > i ? "done" : launch.step === i ? "now" : ""}>
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="kd-load-foot">
                  <small>{launch.running ? "it's open in its own window. close it to come back here." : "please wait…"}</small>
                  <button className={launch.running ? "kd-stop" : "kd-more"} onClick={stop}>
                    {launch.running ? "stop app" : "cancel"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* kiosk exit */}
        {pinOpen && (
          <div className="kd-scrim">
            <div className="kd-pin" role="dialog" aria-label="leave kiosk mode">
              <b>leave kiosk mode</b>
              <small className={pinBad ? "bad" : ""}>{pinBad ? "that's not it. try " + PIN : "enter your pin, or an admin pin"}</small>
              <div className="kd-dots" aria-label={`${pin.length} digits entered`}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <i key={i} className={i < pin.length ? "on" : ""} />
                ))}
              </div>
              <div className="kd-pad">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "ok"].map((k) => (
                  <button key={k} onClick={() => key(k)} className={k === "ok" ? "ok" : ""} aria-label={k === "⌫" ? "delete" : k}>
                    {k}
                  </button>
                ))}
              </div>
              <button className="kd-more" onClick={() => setPinOpen(false)}>
                cancel
              </button>
            </div>
          </div>
        )}
        {where && (
          <div className="kd-scrim">
            <div className="kd-where" role="dialog" aria-label="where to?">
              <b>where to?</b>
              <small>the pin was right. choose what happens now.</small>
              <button
                onClick={() => {
                  setWhere(false);
                  setLocked(false);
                  setRole("admin");
                  timers.current.push(window.setTimeout(() => setLocked(false), 0));
                }}
              >
                <span>unlock for now</span>
                <small>admin, settings and help come back. tap “lock again” when you&apos;re done.</small>
              </button>
              <button
                onClick={() => {
                  setWhere(false);
                  say("(demo) here the windows desktop would open. the launcher locks again on its next start.");
                }}
              >
                <span>back to windows desktop</span>
                <small>unlocks and shows the desktop.</small>
              </button>
              <button
                onClick={() => {
                  setWhere(false);
                  setKiosk("off");
                  setRole("admin");
                }}
              >
                <span>turn kiosk mode off</span>
                <small>stays off until an admin turns it on again.</small>
              </button>
            </div>
          </div>
        )}

        {/* settings sheet */}
        {settings && (
          <div className="kd-scrim" onClick={() => setSettings(false)}>
            <div className="kd-settings" role="dialog" aria-label="settings" onClick={(e) => e.stopPropagation()}>
              <b>settings</b>
              <section>
                <span>interface layout</span>
                <div className="kd-opts">
                  {(["showcase", "gallery"] as const).map((l) => (
                    <button key={l} className={layout === l ? "on" : ""} onClick={() => setLayout(l)}>
                      {l}
                      <small>{l === "showcase" ? "one big featured world with a list beside it" : "a scrolling carousel of every world"}</small>
                    </button>
                  ))}
                </div>
              </section>
              <section>
                <span>on-screen keyboard</span>
                <div className="kd-mini">
                  {(["auto", "always", "off"] as const).map((o) => (
                    <button key={o} className={osk === o ? "on" : ""} onClick={() => setOsk(o)}>
                      {o}
                    </button>
                  ))}
                </div>
                <small>auto pops it up when a text box is tapped with a finger.</small>
              </section>
              <section>
                <span>kiosk &amp; big picture</span>
                <div className="kd-mini">
                  {(["off", "kiosk", "bigpicture"] as const).map((o) => (
                    <button key={o} className={kiosk === o ? "on" : ""} onClick={() => setKiosk(o)}>
                      {o === "bigpicture" ? "big picture" : o}
                    </button>
                  ))}
                </div>
                <small>kiosk: full screen and locked. big picture: replaces the windows desktop, like a games console.</small>
              </section>
              <button className="kd-play" onClick={() => setSettings(false)}>
                done
              </button>
            </div>
          </div>
        )}

        {toast && (
          <div className="kd-toast" role="status">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
