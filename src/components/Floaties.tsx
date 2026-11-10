import type { CSSProperties } from "react";
import { site } from "@/data/site";

/*
  Desktop "files" that float around the page. Drag them anywhere; a click (without dragging) opens them.
  Clips: drop a short muted .mp4 into /public/clips and set `src` below. Until then a looping placeholder plays.
*/

type Pos = CSSProperties;

export function FileIcon({ label, ext, href, style, color, external }: { label: string; ext: string; href: string; style: Pos; color?: string; external?: boolean }) {
  return (
    <a
      className="sticker floaty f-file"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      style={style}
      data-label={`open ${label}`}
      draggable={false}
    >
      <i className="file" data-ext={ext} style={color ? ({ "--fx": color } as CSSProperties) : undefined} />
      <span>{label}</span>
    </a>
  );
}

export function FolderIcon({ label, href, style, color }: { label: string; href: string; style: Pos; color: string }) {
  return (
    <a className="sticker floaty f-file" href={href} style={style} data-label={`open ${label}`} draggable={false}>
      <i className="folder" style={{ "--c": color } as CSSProperties} />
      <span>{label}</span>
    </a>
  );
}

export function Clip({ name, src, style, tint, size = "m" }: { name: string; src?: string; style: Pos; tint: string; size?: "s" | "m" | "l" }) {
  return (
    <div className={`sticker floaty f-clip clip-${size}`} style={style} data-label="drag me">
      <div className="bar">
        <div className="lights"><i /><i /><i /></div>
        <div className="title">{name}</div>
      </div>
      {src ? <video src={src} autoPlay muted loop playsInline /> : <div className={`clip-ph ${tint}`} />}
    </div>
  );
}

/** The set of floaties used in the hero. */
export function HeroFloaties() {
  return (
    <>
      <FileIcon label="resume.pdf" ext="PDF" href={site.links.resume} external style={{ left: "6%", top: "22%" }} />
      <FolderIcon label="work" href="/work" color="#c9b8ff" style={{ right: "5%", top: "40%" }} />
      <Clip name="xros.mp4" tint="t4" size="m" style={{ left: "0%", top: "80%" }} />
      <Clip name="altbot.mov" tint="t1" size="s" style={{ right: "3%", top: "54%" }} />
      <Clip name="paint.mp4" tint="t3" size="m" style={{ right: "-1%", top: "84%" }} />
    </>
  );
}

export function WorkFloaties() {
  return (
    <>
      <FolderIcon label="photos" href={site.links.paintings} color="#ffb59a" style={{ left: "3%", top: "38%" }} />
      <Clip name="game.mp4" tint="t2" size="m" style={{ right: "0.5%", top: "30%" }} />
      <Clip name="kiosk.mp4" tint="t3" size="m" style={{ left: "1%", top: "60%" }} />
      <Clip name="stewart.mp4" tint="t1" size="s" style={{ left: "4%", top: "16%" }} />
      <Clip name="clay.mov" tint="t4" size="s" style={{ right: "6%", top: "56%" }} />
      <FileIcon label="moodboard.png" ext="PNG" href="/work" style={{ right: "4%", top: "74%" }} />
    </>
  );
}
