// All the little behaviours: custom cursor, stickers, tilt, os mode, mini games, canvases.
// init() wires everything to the current page and returns a cleanup function,
// so it can re-run on every client-side navigation.

const moods = {
  tangerine: { hue: [18, 40], spark: ["#ff7a3d", "#ffe680", "#fff"] },
  lilac: { hue: [250, 290], spark: ["#c9b8ff", "#fff", "#ff7a3d"] },
  mint: { hue: [140, 170], spark: ["#bfe8d4", "#9fe0c2", "#fff"] },
  disco: { hue: [0, 360], spark: ["#ff7a3d", "#c9b8ff", "#ffe680", "#9fe0c2"] },
};

export function init() {
  const ac = new AbortController();
  const signal = ac.signal;
  const timers = [];
  const rafs = new Set();
  let alive = true;
  const on = (el, ev, fn, opts = {}) => el && el.addEventListener(ev, fn, { ...opts, signal });
  const every = (fn, ms) => timers.push(setInterval(fn, ms));
  const loop = (fn) => {
    const step = (t) => { if (!alive) return; fn(t); const id = requestAnimationFrame(step); rafs.add(id); };
    rafs.add(requestAnimationFrame(step));
  };

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const fine = () => matchMedia("(min-width:861px) and (pointer:fine)").matches;
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;

  // clocks
  const tick = () => {
    const t = new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).toLowerCase();
    $$("[data-clock]").forEach((c) => (c.textContent = t));
  };
  tick();
  every(tick, 10000);

  // toast
  const toast = $("#toast");
  let tt;
  const say = (m) => {
    if (!toast) return;
    toast.textContent = m;
    toast.classList.add("on");
    clearTimeout(tt);
    tt = setTimeout(() => toast.classList.remove("on"), 1800);
  };

  // in-page jumps: smooth scroll when the target is on this page, normal link otherwise
  $$("[data-jump]").forEach((a) =>
    on(a, "click", (e) => {
      const t = document.getElementById(a.dataset.jump);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: calm ? "auto" : "smooth" }); }
    })
  );

  // scroll progress
  const prog = $("#progress");
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    if (prog) prog.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  on(window, "scroll", onScroll, { passive: true });
  onScroll();

  // copy email
  on($("#copy"), "click", () => {
    const el = $("#email");
    const fallback = () => {
      const r = document.createRange(); r.selectNodeContents(el);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      say("selected. press copy");
    };
    try { navigator.clipboard.writeText(el.textContent).then(() => say("copied ✓"), fallback); } catch { fallback(); }
  });

  // googly eyes
  const pupils = $$(".eye i");
  on(window, "pointermove", (e) => {
    pupils.forEach((p) => {
      const r = p.parentElement.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const a = Math.atan2(e.clientY - cy, e.clientX - cx);
      const d = Math.min(r.width * 0.22, Math.hypot(e.clientX - cx, e.clientY - cy) / 12);
      p.style.transform = `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`;
    });
  });

  // 3d tilt
  $$("[data-tilt]").forEach((c) => {
    on(c, "pointermove", (e) => {
      if (!fine() || calm) return;
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    });
    on(c, "pointerleave", () => (c.style.transform = ""));
  });

  // magnetic buttons
  $$(".btn").forEach((b) => {
    on(b, "pointermove", (e) => {
      if (!fine() || calm) return;
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    on(b, "pointerleave", () => (b.style.transform = ""));
  });

  // draggable stickers + floating files. a click without a drag still opens links.
  $$(".sticker").forEach((s) => {
    const base = getComputedStyle(s).transform;
    on(s, "pointerdown", (e) => {
      if (!fine()) return;
      e.preventDefault();
      const host = s.offsetParent.getBoundingClientRect(), r = s.getBoundingClientRect();
      const ox = e.clientX - r.left, oy = e.clientY - r.top, sx = e.clientX, sy = e.clientY;
      s.setPointerCapture(e.pointerId);
      s.dataset.moved = "";
      let lx = e.clientX;
      const mv = (ev) => {
        if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 4 && !s.dataset.moved) return;
        s.dataset.moved = "1";
        s.style.right = "auto"; s.style.zIndex = "50";
        s.style.left = ev.clientX - host.left - ox + "px";
        s.style.top = ev.clientY - host.top - oy + "px";
        const tilt = Math.max(-14, Math.min(14, (ev.clientX - lx) * 0.8)); lx = ev.clientX;
        s.style.transform = `rotate(${tilt}deg) scale(1.08)`;
      };
      const up = () => {
        s.style.transform = base === "none" ? "" : base;
        s.removeEventListener("pointermove", mv); s.removeEventListener("pointerup", up);
      };
      s.addEventListener("pointermove", mv); s.addEventListener("pointerup", up);
    });
  });
  // swallow the click that ends a drag
  on(window, "click", (e) => {
    const s = e.target.closest && e.target.closest(".sticker");
    if (s && s.dataset.moved) { e.preventDefault(); e.stopImmediatePropagation(); s.dataset.moved = ""; }
  }, { capture: true });

  // custom cursor, labels, sparks
  const cur = $("#cur"), lab = $("#curLabel");
  let mx = -99, my = -99, cx = -99, cy = -99;
  on(window, "pointermove", (e) => {
    if (e.pointerType !== "mouse" || !lab) return;
    mx = e.clientX; my = e.clientY;
    lab.style.left = mx + "px"; lab.style.top = my + "px";
    const t = e.target.closest("[data-label],a,button,summary");
    const text = t && t.dataset.label ? t.dataset.label : "";
    lab.textContent = text; lab.classList.toggle("on", !!text); cur.classList.toggle("big", !!t);
  });
  if (cur) {
    if (fine() && !calm) {
      document.documentElement.classList.add("no-cursor");
      cur.style.display = "";
      loop(() => { cx += (mx - cx) * 0.22; cy += (my - cy) * 0.22; cur.style.transform = `translate(${cx}px,${cy}px)`; });
    } else {
      document.documentElement.classList.remove("no-cursor");
      cur.style.display = "none";
    }
  }
  let mood = "tangerine";
  on(window, "click", (e) => {
    if (!fine() || calm) return;
    const p = moods[mood].spark;
    for (let i = 0; i < 10; i++) {
      const s = document.createElement("i");
      s.className = "spark"; s.style.background = p[i % p.length];
      s.style.left = e.clientX + "px"; s.style.top = e.clientY + "px";
      document.body.appendChild(s);
      const a = Math.random() * Math.PI * 2, d = 30 + Math.random() * 40;
      s.animate(
        [{ transform: "translate(0,0) rotate(0)", opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) rotate(200deg)`, opacity: 0 }],
        { duration: 600, easing: "cubic-bezier(.2,.8,.3,1)" }
      ).onfinish = () => s.remove();
    }
  });

  // work rows: the one nearest the middle of the screen is in focus
  const rowsEl = $$(".row");
  const focusRows = () => {
    const mid = innerHeight / 2;
    let best = null, bd = 1e9;
    rowsEl.forEach((r) => { const b = r.getBoundingClientRect(); const d = Math.abs(b.top + b.height / 2 - mid); if (d < bd) { bd = d; best = r; } });
    rowsEl.forEach((r) => r.classList.toggle("dim", r !== best));
  };
  if (rowsEl.length) {
    on(window, "scroll", focusRows, { passive: true });
    on(window, "resize", focusRows);
    focusRows();
  }
  every(() => {
    $$("[data-axis]").forEach((b) => {
      if (b.closest(".row")?.classList.contains("dim")) return;
      b.textContent = (+b.dataset.axis + (Math.random() - 0.5) * 0.08).toFixed(2);
    });
  }, 700);
  $$("[data-soon]").forEach((a) => on(a, "click", (e) => { e.preventDefault(); say("case study coming soon"); }));

  // ---------- os mode ----------
  const os = $("#os");
  if (os) {
    let oz = 20, lastFocus = null;
    const osFront = (w) => (w.style.zIndex = String(++oz));
    const openOS = () => { lastFocus = document.activeElement; os.hidden = false; document.body.style.overflow = "hidden"; $(".os-exit")?.focus(); say("welcome to vivek.os"); };
    const closeOS = (after) => {
      os.hidden = true; document.body.style.overflow = "";
      if (after) { const t = document.getElementById(after); if (t) t.scrollIntoView({ behavior: "auto" }); else location.href = "/#" + after; }
      else if (lastFocus) lastFocus.focus();
    };
    $$("[data-os-open]").forEach((b) => on(b, "click", openOS));
    $$("[data-os-close]").forEach((b) => on(b, "click", () => closeOS(b.dataset.jumpAfter)));
    on(window, "keydown", (e) => {
      if (e.key === "Escape" && !os.hidden) closeOS();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "o") { e.preventDefault(); os.hidden ? openOS() : closeOS(); }
    });
    const showWin = (id) => {
      const w = document.getElementById(id); if (!w) return;
      w.hidden = false; w.classList.remove("min"); osFront(w);
      if (!fine()) w.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    $$("#os [data-win]").forEach((b) => on(b, "click", () => showWin(b.dataset.win)));
    $$("#os [data-toast]").forEach((b) => on(b, "click", () => say(b.dataset.toast)));
    const desk = $("#osDesk");
    $$("#os .win").forEach((w) => {
      on(w, "pointerdown", () => osFront(w));
      on(w.querySelector(".c"), "click", (e) => { e.stopPropagation(); w.hidden = true; });
      on(w.querySelector(".m"), "click", (e) => { e.stopPropagation(); w.classList.toggle("min"); });
      on(w.querySelector(".z"), "click", (e) => { e.stopPropagation(); osFront(w); });
      const bar = w.querySelector(".bar");
      on(bar, "pointerdown", (e) => {
        if (!fine() || e.target.closest(".lights")) return;
        e.preventDefault(); osFront(w);
        const dr = desk.getBoundingClientRect(), r = w.getBoundingClientRect();
        const ox = e.clientX - r.left, oy = e.clientY - r.top;
        let lx = e.clientX;
        w.classList.add("dragging"); bar.setPointerCapture(e.pointerId);
        const mv = (ev) => {
          w.style.left = Math.min(Math.max(ev.clientX - dr.left - ox, -r.width + 80), dr.width - 80) + "px";
          w.style.top = Math.min(Math.max(ev.clientY - dr.top - oy, 0), dr.height - 40) + "px";
          const tilt = Math.max(-8, Math.min(8, (ev.clientX - lx) * 0.6)); lx = ev.clientX;
          w.style.transform = `rotate(${tilt}deg)`;
        };
        const up = () => { w.classList.remove("dragging"); w.style.transform = ""; bar.removeEventListener("pointermove", mv); bar.removeEventListener("pointerup", up); };
        bar.addEventListener("pointermove", mv); bar.addEventListener("pointerup", up);
      });
    });

    // paint.app
    const pc = $("#paint");
    if (pc) {
      const px = pc.getContext("2d");
      let color = "#16181a", drawing = false, last = null;
      px.lineCap = "round"; px.lineJoin = "round";
      const ppos = (e) => { const r = pc.getBoundingClientRect(); return [((e.clientX - r.left) * pc.width) / r.width, ((e.clientY - r.top) * pc.height) / r.height]; };
      on(pc, "pointerdown", (e) => { drawing = true; last = ppos(e); pc.setPointerCapture(e.pointerId); });
      on(pc, "pointermove", (e) => {
        if (!drawing) return;
        const p = ppos(e);
        px.strokeStyle = color; px.lineWidth = +$("#brush").value;
        px.beginPath(); px.moveTo(...last); px.lineTo(...p); px.stroke(); last = p;
      });
      on(window, "pointerup", () => (drawing = false));
      $$("#paintTools [data-c]").forEach((b) => on(b, "click", () => { color = b.dataset.c; $$("#paintTools [data-c]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); }));
      on($("#paintClear"), "click", () => px.clearRect(0, 0, pc.width, pc.height));
    }

    // bug-squash.exe
    const field = $("#bugField");
    if (field) {
      const names = ["404", "NaN", "undefined", "null", "segfault", "typo", "merge conflict", "off-by-one", "cors", "z-index"];
      let score = 0, timeLeft = 0, spawnT, clockT;
      const stop = () => { clearInterval(spawnT); clearInterval(clockT); };
      timers.push({ clear: stop });
      const spawn = () => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "bug";
        b.textContent = names[Math.floor(Math.random() * names.length)];
        b.style.left = Math.random() * 70 + 5 + "%"; b.style.top = Math.random() * 75 + 5 + "%";
        b.onclick = (e) => {
          e.stopPropagation();
          if (b.classList.contains("squashed")) return;
          b.classList.add("squashed"); score++; $("#bugScore").textContent = score;
          setTimeout(() => b.remove(), 250);
        };
        field.appendChild(b);
        setTimeout(() => b.isConnected && !b.classList.contains("squashed") && b.remove(), 1500);
      };
      on($("#bugStart"), "click", () => {
        stop(); score = 0; timeLeft = 20;
        $("#bugScore").textContent = "0"; $("#bugTime").textContent = "20"; $("#bugMsg").hidden = true;
        $$(".bug").forEach((b) => b.remove());
        spawnT = setInterval(spawn, 550);
        clockT = setInterval(() => {
          timeLeft--; $("#bugTime").textContent = timeLeft;
          if (timeLeft <= 0) {
            stop(); $$(".bug").forEach((b) => b.remove());
            const m = $("#bugMsg"); m.hidden = false;
            m.textContent = score > 20 ? `${score} bugs squashed. ship it!` : `${score} bugs squashed. prod is still on fire, try again?`;
            $("#bugStart").textContent = "again";
          }
        }, 1000);
      });
    }

    // moods + dots.sim
    $$("#moods button").forEach((b) => on(b, "click", () => { mood = b.dataset.mood; $$("#moods button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); }));
    const cv = $("#sim");
    if (cv) {
      const ctx = cv.getContext("2d"), W = cv.width, H = cv.height, dots = [];
      for (let y = 20; y < H; y += 26) for (let x = 20; x < W; x += 26) dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 });
      let px = -999, py = -999, ripples = [];
      const pos = (e) => { const r = cv.getBoundingClientRect(); return [((e.clientX - r.left) * W) / r.width, ((e.clientY - r.top) * H) / r.height]; };
      on(cv, "pointermove", (e) => ([px, py] = pos(e)));
      on(cv, "pointerleave", () => (px = py = -999));
      on(cv, "pointerdown", (e) => { const [x, y] = pos(e); ripples.push({ x, y, r: 0 }); });
      loop((t) => {
        if (os.hidden) return;
        ctx.fillStyle = "#1c1f1e"; ctx.fillRect(0, 0, W, H);
        ripples = ripples.filter((r) => (r.r += 10) < 900);
        const [h0, h1] = moods[mood].hue;
        for (const d of dots) {
          const dx = d.x - px, dy = d.y - py, dist = Math.hypot(dx, dy);
          if (dist < 110 && dist > 0) { const f = ((110 - dist) / 110) * 3.4; d.vx += (dx / dist) * f; d.vy += (dy / dist) * f; }
          for (const r of ripples) { const rx = d.x - r.x, ry = d.y - r.y, rd = Math.hypot(rx, ry); if (Math.abs(rd - r.r) < 16 && rd > 0) { d.vx += (rx / rd) * 2.6; d.vy += (ry / rd) * 2.6; } }
          d.vx += (d.hx - d.x) * 0.06; d.vy += (d.hy - d.y) * 0.06; d.vx *= 0.82; d.vy *= 0.82; d.x += d.vx; d.y += d.vy;
          const sp = Math.min(1, Math.hypot(d.vx, d.vy) / 6);
          const hue = mood === "disco" ? (d.hx + d.hy + t / 8) % 360 : h0 + sp * (h1 - h0);
          ctx.fillStyle = sp > 0.12 ? `hsl(${hue},95%,${62 + sp * 8}%)` : "rgba(255,255,255,.45)";
          ctx.beginPath(); ctx.arc(d.x, d.y, 2.4 + sp * 3.2, 0, Math.PI * 2); ctx.fill();
        }
      });
    }
  }

  // wavy mat: the grid stays a grid, but every line ripples like a plucked string,
  // harder near the cursor. Floating gradient bubbles can be popped to wash the grid in their colours.
  const gc = $("#mat");
  if (gc && fine() && !calm) {
    const host = gc.parentElement;
    const g = gc.getContext("2d");
    const STEP = 46, R = 180, SAMPLE = 8;
    const schemes = [
      ["#ff7a3d", "#ffb59a", "#ff7a3d"],
      ["#9b84ff", "#ff5fa2", "#3aa0ff"],
      ["#2fb67c", "#3aa0ff", "#9b84ff"],
      ["#f2b600", "#ff7a3d", "#ff5fa2"],
      ["#2fb67c", "#f2b600", "#ff5fa2"],
      ["#3aa0ff", "#2fb67c", "#ff7a3d"],
    ];
    const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const rgba = (h, a) => { const [r, gg, b] = hex(h); return `rgba(${r},${gg},${b},${a})`; };
    let W = 0, H = 0, dpr = 1, cols = 0, rows = 0, nodes = [], strokes = [];
    let mx = -9999, my = -9999, tx = -9999, ty = -9999, inView = true;
    let wash = null, cur = 0, bubbles = [], bits = [];
    const rnd = (a, b) => a + Math.random() * (b - a);
    const newBubble = (fromBottom) => ({ x: rnd(40, W - 40), y: fromBottom ? H + rnd(20, 140) : rnd(60, H - 60), r: rnd(16, 32), s: 1 + Math.floor(Math.random() * (schemes.length - 1)), ph: rnd(0, 6.28), sp: rnd(0.25, 0.55), pop: 0 });
    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = host.clientWidth; H = host.clientHeight;
      gc.width = W * dpr; gc.height = H * dpr;
      cols = Math.ceil(W / STEP) + 2; rows = Math.ceil(H / STEP) + 2;
      nodes = [];
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) nodes.push({ hx: i * STEP, hy: j * STEP, ox: 0, oy: 0, vx: 0, vy: 0, c: cur });
      // one stroke style per colour scheme: a soft diagonal gradient across the hero
      strokes = schemes.map((sc) => { const lg = g.createLinearGradient(0, 0, W, H); sc.forEach((c, k) => lg.addColorStop(k / (sc.length - 1), rgba(c, 0.16))); return lg; });
      if (!bubbles.length) bubbles = Array.from({ length: 7 }, () => newBubble(false));
    };
    size();
    host.classList.add("mat-live");
    on(window, "resize", size);
    const local = (e) => { const r = host.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    const blocked = (e) => e.target.closest("a,button,.sticker,.win,.chip");
    on(host, "pointermove", (e) => {
      [tx, ty] = local(e);
      if (mx < -999) { mx = tx; my = ty; }
      document.body.classList.toggle("on-bubble", !blocked(e) && bubbles.some((b) => !b.pop && Math.hypot(b.x - tx, b.y - ty) < b.r + 6));
    });
    on(host, "pointerleave", () => { tx = ty = mx = my = -9999; document.body.classList.remove("on-bubble"); });
    on(host, "pointerdown", (e) => {
      if (blocked(e)) return;
      const [x, y] = local(e);
      const hit = bubbles.find((b) => !b.pop && Math.hypot(b.x - x, b.y - y) < b.r + 8);
      if (!hit) return;
      hit.pop = 1; cur = hit.s;
      wash = { x: hit.x, y: hit.y, r: 0, s: hit.s };
      const sc = schemes[hit.s];
      for (let k = 0; k < 20; k++) { const a = (k / 20) * Math.PI * 2 + rnd(-0.2, 0.2), v = rnd(2, 6); bits.push({ x: hit.x, y: hit.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, c: sc[k % sc.length] }); }
      for (const n of nodes) { const dx = n.hx - hit.x, dy = n.hy - hit.y, d = Math.hypot(dx, dy) || 1; if (d < 220) { const f = (1 - d / 220) * 8; n.vx += (dx / d) * f; n.vy += (dy / d) * f; } }
      document.body.classList.remove("on-bubble");
    });
    const io = new IntersectionObserver(([en]) => (inView = en.isIntersecting));
    io.observe(host);
    signal.addEventListener("abort", () => { io.disconnect(); host.classList.remove("mat-live"); document.body.classList.remove("on-bubble"); });

    loop((now) => {
      if (!inView) return;
      const t = now / 1000;
      mx += (tx - mx) * 0.15; my += (ty - my) * 0.15;
      if (tx < -999) mx = my = -9999;
      if (wash) { wash.r += 14; if (wash.r > Math.hypot(W, H) + 100) wash = null; }
      // nodes stay on the grid; they only get nudged by the cursor and spring back
      for (const n of nodes) {
        const dx = n.hx + n.ox - mx, dy = n.hy + n.oy - my, d = Math.hypot(dx, dy);
        if (d < R && d > 0) { const f = (1 - d / R) ** 2 * 1.6; n.vx += (dx / d) * f; n.vy += (dy / d) * f; }
        n.vx += -n.ox * 0.07; n.vy += -n.oy * 0.07; n.vx *= 0.85; n.vy *= 0.85; n.ox += n.vx; n.oy += n.vy;
        if (wash && n.c !== wash.s && Math.hypot(n.hx - wash.x, n.hy - wash.y) < wash.r) n.c = wash.s;
      }
      const at = (i, j) => nodes[j * cols + i];
      // ripple amplitude: a gentle base, swelling near the cursor
      const amp = (x, y) => { const d2 = (x - mx) ** 2 + (y - my) ** 2; return 2.2 + 7 * Math.exp(-d2 / (R * R * 0.6)); };
      const paths = schemes.map(() => new Path2D());
      // horizontal lines: travelling sine along x, offset in y
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = at(i, j), b = at(i + 1, j), p = paths[a.c];
          for (let s = 0; s <= STEP; s += SAMPLE) {
            const u = s / STEP, x = a.hx + a.ox + (b.hx + b.ox - a.hx - a.ox) * u, yb = a.hy + a.oy + (b.hy + b.oy - a.hy - a.oy) * u;
            const y = yb + Math.sin(x * 0.045 - t * 2.2 + j * 0.9) * amp(x, yb);
            s === 0 ? p.moveTo(x, y) : p.lineTo(x, y);
          }
        }
      }
      // vertical lines: same idea along y
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows - 1; j++) {
          const a = at(i, j), b = at(i, j + 1), p = paths[a.c];
          for (let s = 0; s <= STEP; s += SAMPLE) {
            const u = s / STEP, y = a.hy + a.oy + (b.hy + b.oy - a.hy - a.oy) * u, xb = a.hx + a.ox + (b.hx + b.ox - a.hx - a.ox) * u;
            const x = xb + Math.sin(y * 0.045 - t * 1.8 + i * 0.7) * amp(xb, y);
            s === 0 ? p.moveTo(x, y) : p.lineTo(x, y);
          }
        }
      }
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);
      g.lineWidth = 1.2;
      for (let k = 0; k < paths.length; k++) { g.strokeStyle = strokes[k]; g.stroke(paths[k]); }

      if (wash) {
        const ring = g.createLinearGradient(wash.x - wash.r, wash.y, wash.x + wash.r, wash.y);
        const sc = schemes[wash.s], a = Math.max(0, 0.3 - wash.r / 3200);
        sc.forEach((c, k) => ring.addColorStop(k / (sc.length - 1), rgba(c, a)));
        g.strokeStyle = ring; g.lineWidth = 3; g.beginPath(); g.arc(wash.x, wash.y, wash.r, 0, Math.PI * 2); g.stroke();
      }
      if (mx > -999) {
        const glow = g.createRadialGradient(mx, my, 0, mx, my, R * 1.2);
        glow.addColorStop(0, rgba(schemes[cur][0], 0.14)); glow.addColorStop(1, rgba(schemes[cur][0], 0));
        g.fillStyle = glow; g.fillRect(mx - R * 1.2, my - R * 1.2, R * 2.4, R * 2.4);
      }

      // gradient bubbles: iridescent fill that slowly turns, drifting up with a wobble
      for (let k = 0; k < bubbles.length; k++) {
        const b = bubbles[k];
        if (b.pop) { b.pop += 0.08; if (b.pop > 1.6) bubbles[k] = newBubble(true); continue; }
        b.y -= b.sp; b.x += Math.sin(t * 0.8 + b.ph) * 0.35;
        const near = Math.hypot(b.x - mx, b.y - my);
        if (near < b.r + 50 && near > 0) { b.x += ((b.x - mx) / near) * 0.6; b.y += ((b.y - my) / near) * 0.6; }
        if (b.y < -b.r * 2) bubbles[k] = newBubble(true);
        const rr = b.r * (1 + Math.sin(t * 2 + b.ph) * 0.04), sc = schemes[b.s], ang = t * 0.6 + b.ph;
        const lg = g.createLinearGradient(b.x + Math.cos(ang) * rr, b.y + Math.sin(ang) * rr, b.x - Math.cos(ang) * rr, b.y - Math.sin(ang) * rr);
        sc.forEach((c, i) => lg.addColorStop(i / (sc.length - 1), rgba(c, 0.85)));
        g.fillStyle = lg; g.beginPath(); g.arc(b.x, b.y, rr, 0, Math.PI * 2); g.fill();
        const shine = g.createRadialGradient(b.x - rr * 0.35, b.y - rr * 0.4, 0, b.x - rr * 0.2, b.y - rr * 0.2, rr * 1.05);
        shine.addColorStop(0, "rgba(255,255,255,.85)"); shine.addColorStop(0.35, "rgba(255,255,255,.15)"); shine.addColorStop(1, "rgba(255,255,255,0)");
        g.fillStyle = shine; g.fill();
        g.strokeStyle = "rgba(255,255,255,.75)"; g.lineWidth = 1.2; g.stroke();
        g.fillStyle = "rgba(255,255,255,.9)"; g.beginPath(); g.ellipse(b.x - rr * 0.38, b.y - rr * 0.42, rr * 0.22, rr * 0.12, -0.6, 0, Math.PI * 2); g.fill();
      }
      bits = bits.filter((d) => (d.life -= 0.03) > 0);
      for (const d of bits) {
        d.x += d.vx; d.y += d.vy; d.vy += 0.12; d.vx *= 0.97;
        g.fillStyle = rgba(d.c, d.life); g.beginPath(); g.arc(d.x, d.y, 2.5 * d.life + 1, 0, Math.PI * 2); g.fill();
      }
    });
  }

  // showreel placeholder
  const rc = $("#reel");
  if (rc) {
    const rx = rc.getContext("2d"), RW = rc.width, RH = rc.height, tc = $("#tc");
    const colors = ["#c9b8ff", "#ffe680", "#ff7a3d", "#bfe8d4", "#ffc7b0"];
    const shapes = Array.from({ length: 9 }, (_, i) => ({ x: Math.random() * RW, y: Math.random() * RH, s: 50 + Math.random() * 110, k: i % 3, c: colors[i % 5], vx: (Math.random() - 0.5) * 1.4, vy: (Math.random() - 0.5) * 1.4, a: Math.random() * 6 }));
    const start = performance.now();
    let visible = true;
    const io = new IntersectionObserver((es) => (visible = es[0].isIntersecting));
    io.observe(rc);
    signal.addEventListener("abort", () => io.disconnect());
    loop((now) => {
      if (!visible) return;
      rx.fillStyle = "#121413"; rx.fillRect(0, 0, RW, RH);
      for (const s of shapes) {
        if (!calm) { s.x += s.vx; s.y += s.vy; s.a += 0.01; }
        if (s.x < -s.s) s.x = RW + s.s; if (s.x > RW + s.s) s.x = -s.s; if (s.y < -s.s) s.y = RH + s.s; if (s.y > RH + s.s) s.y = -s.s;
        rx.save(); rx.translate(s.x, s.y); rx.rotate(s.a); rx.fillStyle = s.c; rx.beginPath();
        if (s.k === 0) rx.arc(0, 0, s.s / 2, 0, Math.PI * 2);
        else if (s.k === 1) rx.roundRect(-s.s / 2, -s.s / 2, s.s, s.s, 16);
        else { rx.moveTo(0, -s.s / 2); rx.lineTo(s.s / 2, s.s / 2); rx.lineTo(-s.s / 2, s.s / 2); rx.closePath(); }
        rx.fill(); rx.restore();
      }
      rx.fillStyle = "#fff"; rx.font = '800 92px "Bricolage Grotesque", Arial, sans-serif'; rx.textAlign = "center"; rx.textBaseline = "middle";
      rx.fillText("showreel", RW / 2, RH / 2);
      const sec = Math.floor((now - start) / 1000), f = Math.floor(((now - start) % 1000) / 41.6);
      if (tc) tc.textContent = `00:${String(Math.floor(sec / 60) % 60).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
    });
  }

  return () => {
    alive = false;
    ac.abort();
    timers.forEach((t) => (typeof t === "object" ? t.clear() : clearInterval(t)));
    rafs.forEach((id) => cancelAnimationFrame(id));
    clearTimeout(tt);
    document.body.style.overflow = "";
  };
}
