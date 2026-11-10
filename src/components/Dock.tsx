import { site } from "@/data/site";

/* A mac-style dock pinned to the bottom of the screen (desktop only). Icons magnify on hover. */

type Item = { label: string; glyph: string; tint: string; href?: string; jump?: string; os?: boolean; external?: boolean };

const items: Item[] = [
  { label: "home", glyph: "⌂", tint: "linear-gradient(160deg,#fff,#e9e7e0)", href: "/#top", jump: "top" },
  { label: "work", glyph: "▦", tint: "linear-gradient(160deg,#d9ccff,#a993ff)", href: "/work" },
  { label: "os mode", glyph: "⌘", tint: "linear-gradient(160deg,#3b8a6c,#1f5241)", os: true },
  { label: "notes", glyph: "✎", tint: "linear-gradient(160deg,#fff0a8,#ffd95a)", href: "/#notes", jump: "notes" },
  { label: "hire me", glyph: "✦", tint: "linear-gradient(160deg,#ffb48a,#ff7a3d)", href: "/#hire", jump: "hire" },
  { label: "resume", glyph: "pdf", tint: "linear-gradient(160deg,#fff,#f1efe9)", href: site.links.resume, external: true },
  { label: "say hi", glyph: "@", tint: "linear-gradient(160deg,#c9f0dd,#8fd6b4)", href: "/#say-hi", jump: "say-hi" },
];

export function Dock() {
  return (
    <nav className="dock" aria-label="dock">
      {items.map((it, i) => {
        const inner = (
          <>
            <span className="dock-tile" style={{ background: it.tint }}>
              <span className={it.glyph.length > 1 ? "g small" : "g"}>{it.glyph}</span>
            </span>
            <span className="dock-tip">{it.label}</span>
          </>
        );
        const sep = i === 5 ? <span className="dock-sep" aria-hidden="true" key={`s${i}`} /> : null;
        if (it.os)
          return (
            <button type="button" className="dock-item" data-os-open key={it.label} aria-label={it.label}>
              {inner}
            </button>
          );
        return [
          sep,
          <a
            className="dock-item"
            href={it.href}
            key={it.label}
            aria-label={it.label}
            {...(it.jump ? { "data-jump": it.jump } : {})}
            {...(it.external ? { target: "_blank", rel: "noopener" } : {})}
          >
            {inner}
          </a>,
        ];
      })}
    </nav>
  );
}
