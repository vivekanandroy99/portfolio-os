import type { CSSProperties } from "react";
import { site } from "@/data/site";

/*
  Desktop "files" that float around the page. Drag them anywhere; a click (without dragging) opens them.
  Clips: drop a short muted .mp4 into /public/clips and set `src` below. Until then a looping placeholder plays.
*/

type Pos = CSSProperties;

export function FileIcon({ label, ext, href, style, color, external, resume }: { label: string; ext: string; href: string; style: Pos; color?: string; external?: boolean; resume?: boolean }) {
  return (
    <a
      className="sticker floaty f-file"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      {...(resume ? { "data-resume": "" } : {})}
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
    <div className={`sticker floaty f-clip clip-${size}`} style={style} data-label="watch">
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
      <FileIcon label="resume.pdf" ext="PDF" href={site.links.resume} resume style={{ left: "4%", top: "19%", rotate: "-7deg" }} />
      <FolderIcon label="work" href="/work" color="#c9b8ff" style={{ right: "9%", top: "46%", rotate: "8deg" }} />
      <Clip name="xros.mp4" tint="t4" size="m" style={{ left: "1%", top: "77%", rotate: "-3deg" }} />
      <Clip name="altbot.mov" tint="t1" size="s" style={{ right: "0%", top: "59%", rotate: "5deg" }} />
      <Clip name="paint.mp4" tint="t3" size="m" style={{ right: "2%", top: "86%", rotate: "-2deg" }} />
    </>
  );
}

export function WorkFloaties() {
  return (
    <>
      <FolderIcon label="photos" href={site.links.paintings} color="#ffb59a" style={{ left: "7%", top: "37%", rotate: "6deg" }} />
      <Clip name="game.mp4" tint="t2" size="m" style={{ right: "1%", top: "25%", rotate: "-4deg" }} />
      <Clip name="kiosk.mp4" tint="t3" size="m" style={{ left: "0%", top: "58%", rotate: "3deg" }} />
      <Clip name="stewart.mp4" tint="t1" size="s" style={{ left: "2%", top: "12%", rotate: "-5deg" }} />
      <Clip name="clay.mov" tint="t4" size="s" style={{ right: "8%", top: "51%", rotate: "6deg" }} />
      <FileIcon label="moodboard.png" ext="PNG" href="/work" style={{ right: "2%", top: "73%", rotate: "-6deg" }} />
    </>
  );
}
