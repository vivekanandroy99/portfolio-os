import type { Project } from "@/data/projects";

/** A project's thumbnail: muted looping video, gif, image, or the coloured placeholder word. */
export function Thumb({ p, children }: { p: Project; children?: React.ReactNode }) {
  const m = p.media;
  return (
    <div className={`thumb ${p.tint}${m ? " has-media" : ""}`}>
      {m?.type === "video" ? (
        <video className="thumb-media" src={m.src} poster={m.poster} muted loop playsInline preload="metadata" data-inview-play aria-label={m.alt ?? p.name} />
      ) : m ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="thumb-media" src={m.src} alt={m.alt ?? p.name} loading="lazy" decoding="async" />
      ) : (
        <b>{p.word}</b>
      )}
      {children}
    </div>
  );
}
