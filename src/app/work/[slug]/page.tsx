import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import { ProjectPage } from "@/components/ProjectPage";
import { AltbotShowcase } from "@/components/showcase/AltbotShowcase";
import { LauncherShowcase } from "@/components/showcase/LauncherShowcase";
import "./project.css";
import "./altbot.css";
import "./launcher.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} · vivekanand roy`, description: p.short };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  // the altcore products get their own hand-built showcase pages
  if (slug === "altbot") return <AltbotShowcase />;
  if (slug === "kiosk-launcher") return <LauncherShowcase />;
  return <ProjectPage p={p} cs={caseStudies[slug]} />;
}
