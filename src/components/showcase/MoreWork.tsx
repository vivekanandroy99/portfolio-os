import Link from "next/link";
import { projects } from "@/data/projects";
import { Thumb } from "../Thumb";

/** Previous / next project cards at the bottom of a showcase page. Styled by .sc-next in each page's css. */
export function MoreWork({ slug }: { slug: string }) {
  const i = projects.findIndex((x) => x.slug === slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return (
    <nav className="sc-next" aria-label="more projects">
      {[
        { label: "← previous", q: prev },
        { label: "next →", q: next },
      ].map(({ label, q }) => (
        <Link key={label} className="sc-nextcard" href={`/work/${q.slug}`} data-label={label}>
          <Thumb p={q} />
          <span>
            <small>{label}</small>
            {q.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}
