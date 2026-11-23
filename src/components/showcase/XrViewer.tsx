"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type * as THREE from "three";

/*
  The exploded view from the headset, in the browser. The bikes are the project's own models, made
  lighter for the web, with each part baked as its own piece from the same part maps the Quest app
  uses: every piece carries its name, its system, one line on what it does, and where it moves when
  the bike comes apart (glTF extras: part, category, info, offset, delay). three.js loads only when
  the window scrolls into view, and it stops drawing when it scrolls away.
*/

const MODELS = "/work/xr-bike-showroom/models";

export const VIEWER_BIKES = [
  { id: "yamaha-yzf-r1", name: "yamaha r1", title: "Yamaha YZF-R1 RACE", author: "dragos12_", src: "https://sketchfab.com/3d-models/yamaha-yzf-r1-race-8a020dc63e3e41139a4d5eea651bdcbc" },
  { id: "bmw-s1000rr", name: "bmw s1000rr", title: "2008 BMW S1000RR", author: "dragos12_", src: "https://sketchfab.com/3d-models/2008-bmw-s1000rr-bb6af20f81d1473ea9f064a6e41d352c" },
  { id: "ducati-desmosedici-gp26", name: "ducati gp26", title: "Ducati Lenovo Team - MotoGP26", author: "Kenny3D89", src: "https://sketchfab.com/3d-models/ducati-lenovo-team-motogp26-497ac78767344110a0046a3ab4a5d058" },
];

type PartInfo = { part: string; category: string; info: string };

type Api = {
  setBike: (id: string) => void;
  setExplode: (v: number) => void;
  clearPick: () => void;
  dispose: () => void;
};

const DURATION = 1;
const LEAD = 0.35;
const smooth = (t: number) => t * t * (3 - 2 * t);

export function XrViewer() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const api = useRef<Api | null>(null);
  const [bike, setBike] = useState(VIEWER_BIKES[0].id);
  const [explode, setExplode] = useState(0);
  const [loading, setLoading] = useState<number | null>(0);
  const [failed, setFailed] = useState(false);
  const [picked, setPicked] = useState<PartInfo | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const anim = useRef<number | null>(null);
  const explodeRef = useRef(0);

  // start three.js once the window is near the screen
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || !canvasHost.current) return;
    let cancelled = false;
    (async () => {
      try {
        const made = await makeViewer(canvasHost.current!, {
          onProgress: (p) => !cancelled && setLoading(p),
          onLoaded: () => !cancelled && setLoading(null),
          onPick: (p) => !cancelled && setPicked(p),
          onHover: (n) => !cancelled && setHover(n),
          onError: () => !cancelled && setFailed(true),
        });
        if (cancelled) { made.dispose(); return; }
        api.current = made;
        made.setExplode(explodeRef.current);
        made.setBike(VIEWER_BIKES[0].id);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => { cancelled = true; api.current?.dispose(); api.current = null; };
  }, [started]);

  const apply = useCallback((v: number) => {
    explodeRef.current = v;
    setExplode(v);
    api.current?.setExplode(v);
  }, []);

  const toggle = () => {
    if (anim.current) cancelAnimationFrame(anim.current);
    const from = explodeRef.current;
    const to = from > 0.5 ? 0 : 1;
    const t0 = performance.now();
    const len = 900 * Math.abs(to - from) + 200;
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / len);
      apply(from + (to - from) * k);
      anim.current = k < 1 ? requestAnimationFrame(step) : null;
    };
    anim.current = requestAnimationFrame(step);
  };

  const pickBike = (id: string) => {
    if (id === bike) return;
    setBike(id);
    setPicked(null);
    setLoading(0);
    api.current?.setBike(id);
  };

  const current = VIEWER_BIKES.find((b) => b.id === bike)!;

  return (
    <figure className="xr-viewer" ref={wrap}>
      <div className="xr-win">
        <div className="xr-win-bar">
          <span className="xr-win-dots" aria-hidden><i /><i /><i /></span>
          <span className="xr-win-title">passthrough · {current.name}</span>
          <div className="xr-win-bikes" role="tablist" aria-label="pick a bike">
            {VIEWER_BIKES.map((b) => (
              <button key={b.id} role="tab" aria-selected={b.id === bike} className={b.id === bike ? "on" : ""} onClick={() => pickBike(b.id)}>
                {b.name}
              </button>
            ))}
          </div>
        </div>
        <div className="xr-win-stage" ref={canvasHost}>
          {loading !== null && !failed && (
            <div className="xr-win-load" aria-live="polite">
              <span style={{ ["--p" as string]: `${Math.round(loading * 100)}%` }} />
              loading the {current.name} · {Math.round(loading * 100)}%
            </div>
          )}
          {failed && <div className="xr-win-load">this browser can&apos;t show 3d here. the clip above shows the same thing in the headset.</div>}
          {hover && !picked && <span className="xr-win-hover">{hover}</span>}
          {picked && (
            <div className="xr-win-card" aria-live="polite">
              <button className="xr-win-x" onClick={() => { setPicked(null); api.current?.clearPick(); }} aria-label="close">×</button>
              {picked.category && <small>{picked.category}</small>}
              <b>{picked.part}</b>
              {picked.info && <p>{picked.info}</p>}
            </div>
          )}
          <span className="xr-win-hint" aria-hidden>drag to turn · tap a part</span>
        </div>
        <div className="xr-win-controls">
          <button className="xr-win-go" onClick={toggle}>{explode > 0.5 ? "put it back" : "take it apart"}</button>
          <label className="sr-only" htmlFor="xr-viewer-range">how far apart</label>
          <input id="xr-viewer-range" type="range" min={0} max={1} step={0.005} value={explode}
            onChange={(e) => { if (anim.current) cancelAnimationFrame(anim.current); anim.current = null; apply(Number(e.target.value)); }}
            style={{ ["--p" as string]: `${explode * 100}%` }} />
        </div>
      </div>
      <figcaption>
        the same exploded view as in the headset, running in your browser. every part moves as one real assembly and knows its name, from part maps checked by hand.
        <small className="xr-credit">
          3d models: {VIEWER_BIKES.map((b, i) => (
            <span key={b.id}>
              <a href={b.src} target="_blank" rel="noreferrer">{b.title}</a> by {b.author}{i < VIEWER_BIKES.length - 1 ? ", " : ""}
            </span>
          ))}{" "}
          (<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">cc by 4.0</a>), split into parts and made lighter for the web.
        </small>
      </figcaption>
    </figure>
  );
}

/* ---------- three.js ---------- */

type Callbacks = {
  onProgress: (p: number) => void;
  onLoaded: () => void;
  onPick: (p: PartInfo | null) => void;
  onHover: (name: string | null) => void;
  onError: () => void;
};

async function makeViewer(host: HTMLElement, cb: Callbacks): Promise<Api> {
  const T = await import("three");
  const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
  const { MeshoptDecoder } = await import("three/examples/jsm/libs/meshopt_decoder.module.js");
  const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");

  const renderer = new T.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x15161b, 1);
  const canvas = renderer.domElement;
  canvas.className = "xr-win-canvas";
  host.prepend(canvas);

  const scene = new T.Scene();
  scene.fog = new T.Fog(0x15161b, 6, 14);
  const pmrem = new T.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.9;

  const key = new T.DirectionalLight(0xffffff, 1.6);
  key.position.set(2.5, 4, 3);
  scene.add(key, new T.HemisphereLight(0xffffff, 0x222226, 0.5));

  // the showroom floor: a grid that fades out, and a soft shadow under the bike
  const floor = new T.Mesh(new T.CircleGeometry(7, 64), new T.MeshBasicMaterial({ color: 0x1b1c22 }));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
  const grid = new T.GridHelper(14, 56, 0x3a3b44, 0x26272e);
  grid.position.y = 0.001;
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.55;
  scene.add(grid);
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 128;
  const g = shadowCanvas.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(0,0,0,0.7)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const shadow = new T.Mesh(new T.PlaneGeometry(1, 1), new T.MeshBasicMaterial({ map: new T.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.002;
  shadow.scale.set(1.3, 2.6, 1);
  scene.add(shadow);

  const camera = new T.PerspectiveCamera(32, 1, 0.05, 40);
  const target = new T.Vector3(0, 0.55, 0);
  let yaw = -0.85, pitch = 0.2, dist = 5.2;
  let spin = true;

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);

  type Part = { obj: THREE.Object3D; home: THREE.Vector3; offset: THREE.Vector3; delay: number; info: PartInfo; meshes: THREE.Mesh[] };
  const cache = new Map<string, { root: THREE.Object3D; parts: Part[] }>();
  let current: { root: THREE.Object3D; parts: Part[] } | null = null;
  let explode = 0;
  let wanted = "";
  let picked: Part | null = null;
  const glow = new Map<THREE.Material, THREE.Material>();

  const layout = () => {
    if (!current) return;
    const time = explode * DURATION;
    const move = DURATION * (1 - LEAD);
    for (const p of current.parts) {
      const t = smooth(Math.min(1, Math.max(0, (time - p.delay) / move)));
      p.obj.position.copy(p.home).addScaledVector(p.offset, t);
    }
    dirty = true;
  };

  const highlight = (p: Part | null) => {
    if (picked) for (const m of picked.meshes) m.material = m.userData.base;
    picked = p;
    if (p) for (const m of p.meshes) {
      const base = m.userData.base as THREE.Material;
      let h = glow.get(base);
      if (!h) {
        h = base.clone();
        const hm = h as THREE.MeshStandardMaterial;
        if (hm.emissive) { hm.emissive = new T.Color(0xf36f00); hm.emissiveIntensity = 0.55; hm.emissiveMap = null; }
        glow.set(base, h);
      }
      m.material = h;
    }
    dirty = true;
  };

  const show = (id: string) => {
    wanted = id;
    const have = cache.get(id);
    if (have) { swap(have); cb.onLoaded(); return; }
    loader.load(`${MODELS}/${id}.glb`, (gltf) => {
      const root = gltf.scene;
      const parts: Part[] = [];
      root.traverse((o) => {
        const d = o.userData as { part?: string; category?: string; info?: string; offset?: number[]; delay?: number };
        if (!d.part) return;
        const meshes: THREE.Mesh[] = [];
        o.traverse((m) => { if ((m as THREE.Mesh).isMesh) { const mm = m as THREE.Mesh; mm.userData.base = mm.material; mm.userData.partObj = o; meshes.push(mm); } });
        parts.push({
          obj: o, home: o.position.clone(), offset: new T.Vector3(...(d.offset ?? [0, 0, 0])), delay: d.delay ?? 0,
          info: { part: d.part, category: d.category ?? "", info: d.info ?? "" }, meshes,
        });
      });
      const entry = { root, parts };
      cache.set(id, entry);
      if (wanted === id) { swap(entry); cb.onLoaded(); }
    }, (e) => { if (e.total) cb.onProgress(Math.min(0.99, e.loaded / e.total)); }, () => cb.onError());
  };

  const swap = (entry: { root: THREE.Object3D; parts: Part[] }) => {
    highlight(null);
    cb.onPick(null);
    if (current) scene.remove(current.root);
    current = entry;
    scene.add(entry.root);
    layout();
  };

  // ---- input: drag turns the bike (touch: sideways only, so the page still scrolls), tap picks a part
  const ray = new T.Raycaster();
  const ndc = new T.Vector2();
  const partAt = (x: number, y: number): Part | null => {
    if (!current) return null;
    const r = canvas.getBoundingClientRect();
    ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObject(current.root, true)[0];
    if (!hit) return null;
    const obj = hit.object.userData.partObj as THREE.Object3D | undefined;
    return current.parts.find((p) => p.obj === obj) ?? null;
  };
  let down: { x: number; y: number; yaw: number; pitch: number; id: number; moved: boolean; touch: boolean } | null = null;
  canvas.style.touchAction = "pan-y";
  const onDown = (e: PointerEvent) => {
    down = { x: e.clientX, y: e.clientY, yaw, pitch, id: e.pointerId, moved: false, touch: e.pointerType === "touch" };
    spin = false;
  };
  const onMove = (e: PointerEvent) => {
    if (down && e.pointerId === down.id) {
      const dx = e.clientX - down.x, dy = e.clientY - down.y;
      if (!down.moved && Math.hypot(dx, dy) > 6) { down.moved = true; try { canvas.setPointerCapture(e.pointerId); } catch {} }
      if (down.moved) {
        yaw = down.yaw - dx * 0.008;
        if (!down.touch) pitch = Math.min(0.9, Math.max(0.02, down.pitch + dy * 0.005));
        dirty = true;
      }
      return;
    }
    if (e.pointerType === "mouse") {
      const p = partAt(e.clientX, e.clientY);
      canvas.style.cursor = p ? "pointer" : "grab";
      cb.onHover(p ? p.info.part : null);
    }
  };
  const onUp = (e: PointerEvent) => {
    if (!down || e.pointerId !== down.id) return;
    if (!down.moved) {
      const p = partAt(e.clientX, e.clientY);
      const same = p && picked === p;
      highlight(same ? null : p);
      cb.onPick(same || !p ? null : p.info);
    }
    down = null;
  };
  const onCancel = () => { down = null; };
  const onLeave = () => cb.onHover(null);
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onCancel);
  canvas.addEventListener("pointerleave", onLeave);

  // ---- size, draw only when needed and only while on screen
  let dirty = true;
  let visible = true;
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // fit the exploded bike (about 3.2 m across) whatever the shape of the window
    camera.fov = camera.aspect < 1.2 ? 36 : 30;
    dist = Math.max(4.9, 1.55 / (Math.tan((camera.fov * Math.PI) / 360) * camera.aspect));
    camera.updateProjectionMatrix();
    dirty = true;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();
  const vis = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  vis.observe(host);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) spin = false;

  let raf = 0, last = performance.now();
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!visible || document.hidden) return;
    if (spin && current) { yaw -= dt * 0.18; dirty = true; }
    if (!dirty) return;
    dirty = false;
    camera.position.set(
      target.x + dist * Math.cos(pitch) * Math.sin(yaw),
      target.y + dist * Math.sin(pitch),
      target.z + dist * Math.cos(pitch) * Math.cos(yaw),
    );
    camera.lookAt(target);
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(loop);

  return {
    setBike: (id) => show(id),
    setExplode: (v) => { explode = v; layout(); },
    clearPick: () => highlight(null),
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      vis.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      canvas.removeEventListener("pointerleave", onLeave);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) { m.geometry.dispose(); (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => x.dispose()); }
      });
      for (const c of cache.values()) c.root.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) m.geometry.dispose(); });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
