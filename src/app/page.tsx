import { Hero, Marquee } from "@/components/Hero";
import { WorkSection } from "@/components/Work";
import { Notes, OsTeaser, Ways } from "@/components/Sections";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Marquee />
      <WorkSection />
      <OsTeaser />
      <Notes />
      <Ways />
    </main>
  );
}
