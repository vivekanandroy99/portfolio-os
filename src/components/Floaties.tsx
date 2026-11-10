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

export function Clip({ name, src, style, tint }: { name: string; src?: string; style: Pos; tint: string }) {
  return (
    <div className="sticker floaty f-clip" style={style} data-label="drag me">
      <div className="bar">
        <div className="lights"><i /><i /><i /></div>
        <div className="title">{name}</div>
      </div>
      {src ? (
        <video src={src} autoPlay muted loop playsInline />
      ) : (
        <div className={`clip-ph ${tint}`}>
          <span className="play-dot" />
          <span className="clip-tc">00:{String(name.length * 3).padStart(2, "0")}</span>
        </div>
      )}
    </div>
  );
}

/** The set of floaties used in the hero. */
export function HeroFloaties() {
  return (
    <>
      <FileIcon label="resume.pdf" ext="PDF" href={site.links.resume} external style={{ left: "6%", top: "22%" }} />
      <FolderIcon label="work" href="/work" color="#c9b8ff" style={{ right: "5%", top: "40%" }} />
      <Clip name="xros.mp4" tint="t4" style={{ left: "2%", top: "84%" }} />
    </>
  );
}

export function WorkFloaties() {
  return (
    <>
      <FolderIcon label="photos" href={site.links.paintings} color="#ffb59a" style={{ left: "3%", top: "38%" }} />
      <Clip name="game.mp4" tint="t2" style={{ right: "2%", top: "34%" }} />
      <Clip name="kiosk.mp4" tint="t3" style={{ left: "1%", top: "62%" }} />
      <FileIcon label="moodboard.png" ext="PNG" href="/work" style={{ right: "4%", top: "74%" }} />
    </>
  );
}
