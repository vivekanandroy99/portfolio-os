import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { WorkGrid } from "@/components/WorkGrid";

export const metadata: Metadata = { title: "work · vivekanand roy" };

export default function WorkPage() {
  return (
    <main id="allwork" className="allwork">
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2>everything i&apos;ve <em>made</em></h2>
            </div>
            <p>xr, ai, games, physical builds and art. filter it, or scroll it all.</p>
          </div>
          <WorkGrid />
          <div className="all-cta">
            <Link className="btn ghost" href="/" data-label="back">← back home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
