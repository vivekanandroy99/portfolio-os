"use client";

import Link from "next/link";
import { useState } from "react";
import { categoryLabels, projects, type Category } from "@/data/projects";
import { Bar } from "./Win";
import { Thumb } from "./Thumb";

export function WorkGrid() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const cats = Object.keys(categoryLabels) as Category[];
  const shown = projects.filter((p) => filter === "all" || p.categories.includes(filter));

  return (
    <>
      <div className="filters">
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>all</button>
        {cats.map((c) => (
          <button type="button" key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {categoryLabels[c]}
          </button>
        ))}
      </div>
      <div className="wgrid">
        {shown.map((p) => (
          <Link key={p.slug} className="wcard win" href={`/work/${p.slug}`} data-label="open">
            <Bar title={p.file} />
            <Thumb p={p}>{p.isNew && <span className="ph">new</span>}</Thumb>
            <div className="wmeta">
              <h3>{p.name}</h3>
              <p>{p.short}</p>
              <div className="tags2">
                {p.categories.map((c) => <span key={c}>{categoryLabels[c]}</span>)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
