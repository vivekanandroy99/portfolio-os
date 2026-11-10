// All projects live here. Add a new one by adding an object to this list.
// `featured: true` puts it in the big scrolling rows on the home page.
// Everything shows on /work.

export type Category = "xr" | "ai" | "games" | "physical" | "art" | "ui";

export type Accent =
  | { kind: "chat"; text: string }
  | { kind: "kiosk" }
  | { kind: "xyz" }
  | { kind: "compass"; text: string }
  | { kind: "none" };

export type Project = {
  slug: string;
  name: string; // shown as the card title
  file: string; // the fake file name in the window title bar
  word: string; // big word on the placeholder thumbnail
  tint: "t1" | "t2" | "t3" | "t4"; // lilac, butter, peach, mint
  blurb: string;
  short: string; // one-liner for the /work grid
  tags: string[];
  categories: Category[];
  url?: string; // case study link; leave out for "coming soon"
  cursorLabel: string;
  featured?: boolean;
  isNew?: boolean;
  accent?: Accent;
};

const OLD = "https://vivekanand.framer.website";

export const categoryLabels: Record<Category, string> = {
  xr: "xr / mr",
  ai: "ai",
  games: "games",
  physical: "physical",
  art: "art",
  ui: "ui / ux",
};

export const projects: Project[] = [
  {
    slug: "altbot",
    name: "altbot",
    file: "altbot.app",
    word: "altbot",
    tint: "t1",
    blurb: "placeholder: your ai chatbot project. tell me what it does, who it is for and what you built.",
    short: "ai chatbot. details coming soon.",
    tags: ["ai", "chatbot", "product"],
    categories: ["ai"],
    cursorLabel: "say hi to it",
    featured: true,
    isNew: true,
    accent: { kind: "chat", text: "hey altbot, what can you do?" },
  },
  {
    slug: "kiosk-launcher",
    name: "kiosk launcher",
    file: "kiosk-launcher.exe",
    word: "kiosk",
    tint: "t2",
    blurb: "placeholder: one touch screen that launches every experience on the floor. add the real story here.",
    short: "one touch screen that launches every experience. details coming soon.",
    tags: ["touch ui", "kiosk", "launcher"],
    categories: ["physical", "ui"],
    cursorLabel: "tap to start",
    featured: true,
    isNew: true,
    accent: { kind: "kiosk" },
  },
  {
    slug: "xros",
    name: "mixed reality workspace",
    file: "xros.unity",
    word: "xros",
    tint: "t4",
    blurb: "an immersive mixed reality workspace that blends digital and physical space for multitasking and productivity.",
    short: "immersive mr workspace for multitasking and productivity.",
    tags: ["ui/ux", "xr", "unity", "research"],
    categories: ["xr", "ui"],
    url: `${OLD}/mixedreality`,
    cursorLabel: "step inside",
    featured: true,
    accent: { kind: "xyz" },
  },
  {
    slug: "chorespace",
    name: "chorespace",
    file: "chorespace.ar",
    word: "chores",
    tint: "t3",
    blurb: "a spatial task manager. your to-dos live in real space, and ar pointers plus a compass guide you to each one.",
    short: "spatial to-dos with ar pointers and a compass.",
    tags: ["ar", "productivity", "unity"],
    categories: ["xr"],
    url: `${OLD}/chorespace`,
    cursorLabel: "find a task",
    featured: true,
    accent: { kind: "compass", text: "next task · 2.4m north" },
  },
  {
    slug: "stewart-platform",
    name: "stewart platform",
    file: "stewart.ino",
    word: "6dof",
    tint: "t4",
    blurb: "a 6dof stewart motion platform built with arduino and c++.",
    short: "a 6dof motion platform. arduino and c++.",
    tags: ["mechatronics", "arduino", "c++"],
    categories: ["physical"],
    url: `${OLD}/stewartplatform`,
    cursorLabel: "open ↗",
  },
  {
    slug: "game-showreel",
    name: "game design showreel",
    file: "showreel.unity",
    word: "play",
    tint: "t2",
    blurb: "concept prototypes and gameplay clips built in unity.",
    short: "concept prototypes and gameplay built in unity.",
    tags: ["game design", "prototyping", "unity"],
    categories: ["games"],
    url: `${OLD}/showreel`,
    cursorLabel: "open ↗",
  },
  {
    slug: "error",
    name: "error !!!",
    file: "error.mov",
    word: "error!!!",
    tint: "t3",
    blurb: "a claymation stop-motion short.",
    short: "a claymation stop-motion short.",
    tags: ["stop motion", "claymation"],
    categories: ["art"],
    url: `${OLD}/stopmotion`,
    cursorLabel: "open ↗",
  },
  {
    slug: "paintings",
    name: "my paintings",
    file: "paintings.jpg",
    word: "paint",
    tint: "t1",
    blurb: "an endless scroll of paintings and adventures.",
    short: "an endless scroll of paintings and adventures.",
    tags: ["painting", "illustration"],
    categories: ["art"],
    url: `${OLD}/mypaintings`,
    cursorLabel: "open ↗",
  },
  {
    slug: "decks",
    name: "decks",
    file: "decks.fig",
    word: "decks",
    tint: "t4",
    blurb: "slides and pitch prototypes.",
    short: "slides and pitch prototypes.",
    tags: ["slides", "figma"],
    categories: ["ui"],
    url: `${OLD}/decks`,
    cursorLabel: "open ↗",
  },
];

export const featured = projects.filter((p) => p.featured);
export const notFeatured = projects.filter((p) => !p.featured);
