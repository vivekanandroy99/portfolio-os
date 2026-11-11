// The long-form story behind each project, keyed by the project's slug in projects.ts.
// A project without an entry here still gets a page at /work/<slug>, showing a "case study coming soon" note.
//
// Images and videos: drop files in /public/work/<slug>/ and point at them, e.g. "/work/xros/hero.jpg".
// Remote urls work too while we migrate off the old framer site.

export type Media = {
  type: "image" | "video" | "youtube";
  src: string; // for youtube, the video id or embed url
  alt?: string;
  caption?: string;
  wide?: boolean; // spans the full width in a gallery
  crop?: boolean; // tall screenshots: show the top part only
};

type Item = { title: string; body: string };

export type Block =
  | { kind: "text"; heading: string; kicker?: string; body: string[] }
  | { kind: "features"; heading: string; kicker?: string; items: Item[] }
  | { kind: "pipeline"; heading: string; kicker?: string; items: Item[] }
  | { kind: "steps"; heading: string; kicker?: string; items: Item[] }
  | { kind: "list"; heading: string; kicker?: string; items: string[] }
  | { kind: "skills"; heading: string; kicker?: string; items: (Item & { tags: string[] })[] }
  | { kind: "stack"; heading: string; kicker?: string; groups: { label: string; items: string[] }[] }
  | { kind: "stats"; heading?: string; items: { value: string; label: string }[] }
  | { kind: "quote"; text: string; who?: string }
  | { kind: "gallery"; heading?: string; kicker?: string; items: Media[] };

/** Each project page wears its own colours. Leave it out to get a light theme in the project's tint. */
export type Theme = {
  mode: "dark" | "light";
  bg: string;
  surface: string; // cards and frames
  ink: string;
  accent: string;
  accent2?: string; // second gradient stop; defaults to accent
};

export type CaseStudy = {
  client?: string; // who it was made for, e.g. "altcore"
  year?: string;
  role?: string;
  team?: string;
  duration?: string;
  status?: string; // e.g. "live in showrooms"
  tools?: string[];
  links?: { label: string; href: string }[];
  theme?: Theme;
  tagline?: string; // the big product headline; falls back to the project name
  intro?: string; // the line under the headline; falls back to the blurb
  facts?: { value: string; label: string }[]; // the strip under the hero
  cover?: Media; // big media in the hero; falls back to the project thumbnail
  blocks: Block[];
};

// Media below is pulled from the old framer case studies. Those pages had no write-up,
// so the text sections are waiting on the real story (role, problem, process, outcome).
const OLD = "https://vivekanand.framer.website";

export const caseStudies: Record<string, CaseStudy> = {
  // ---------- altcore products ----------
  // Drafted from the project repos. Everything marked TODO is a guess or a gap to fill in.
  altbot: {
    client: "altcore",
    year: "2026",
    role: "creative technologist: design, 3d, ai + unity engineering",
    status: "in use at altcore",
    theme: { mode: "dark", bg: "#0e0f12", surface: "#17191e", ink: "#f3efe8", accent: "#ff6a1a", accent2: "#c81e00" },
    tagline: "a 3d front-desk host that listens, answers and talks back. fully offline.",
    intro:
      "altbot is a life-size, lip-syncing 3d character for showrooms and front desks. visitors just talk to it in english or hindi, and it answers out loud from the company's own documents. no cloud, no internet, no making things up.",
    facts: [
      { value: "100%", label: "offline by default" },
      { value: "~1 s", label: "to start speaking a reply" },
      { value: "en + hi", label: "hears and speaks hindi, english and hinglish" },
      { value: "6", label: "characters with their own voice and personality" },
    ],
    cover: { type: "image", src: "/work/altbot/kiosk.webp", alt: "maya, one of the altbot characters, standing in the kiosk view with a talk button", caption: "kiosk view" },
    blocks: [
      {
        kind: "text",
        kicker: "the brief",
        heading: "a host that never goes off script",
        body: [
          "showrooms and exhibitions need someone at the front who can answer the same hundred questions all day, in hindi and english, without a network and without ever inventing an answer about the company.",
          "so altbot only talks about what's in its documents. ask it about the weather and it gives a polite, in-character nudge back to what it does know.",
        ],
      },
      {
        kind: "pipeline",
        kicker: "how it works",
        heading: "from a question to a spoken answer",
        items: [
          { title: "hears", body: "whisper large-v3 turbo runs inside unity, works out hindi vs english, then transcribes." },
          { title: "checks", body: "the question is matched against the bot's documents first. off-topic? polite refusal, no llm call." },
          { title: "thinks", body: "gemma 3 4b (llama.cpp) answers only from the matching passages." },
          { title: "double-checks", body: "the draft reply is matched against the documents again before a word is spoken." },
          { title: "speaks", body: "kokoro for english, veena for natural indian hindi, streamed sentence by sentence." },
          { title: "lip-syncs", body: "uLipSync drives the face live from the audio, plus nods, smiles and glances." },
        ],
      },
      {
        kind: "features",
        kicker: "what it does",
        heading: "built for a busy front desk",
        items: [
          { title: "knowledge-only answers", body: "each bot gets a folder of pdfs, decks and docs. three checks keep every answer grounded in them." },
          { title: "shows, not just tells", body: "it can pull up slides, pictures, videos, web pages and qr codes on a screen beside itself and talk through them." },
          { title: "a cast of characters", body: "maya, ethan, iris, leo, pearl and peter, each with a look, voice, personality and their own knowledge." },
          { title: "the owner stays in charge", body: "conversation logs, a report of what people asked, and taught answers for the questions it couldn't answer." },
          { title: "kiosk-ready", body: "touch-first menu, on-screen keyboard, staff sign-in, camera, lighting and backdrop presets per bot." },
          { title: "windows and mac", body: "one project for both. an optional online brain and voices can switch on, with local fallback." },
        ],
      },
      {
        kind: "gallery",
        kicker: "inside the app",
        heading: "the control room",
        items: [
          { type: "image", src: "/work/altbot/bots.webp", alt: "menu listing the bots and their settings", caption: "bots", crop: true },
          { type: "image", src: "/work/altbot/look-voice.webp", alt: "look and voice settings for a bot", caption: "look + voice", crop: true },
          { type: "image", src: "/work/altbot/listening.webp", alt: "listening and language settings", caption: "listening + language", crop: true },
          { type: "image", src: "/work/altbot/new-bot.webp", alt: "making a new bot", caption: "new bot", crop: true },
          { type: "image", src: "/work/altbot/models.webp", alt: "ai model choices", caption: "ai models", crop: true },
          { type: "image", src: "/work/altbot/lighting.webp", alt: "lighting presets", caption: "lighting", crop: true },
        ],
      },
      {
        kind: "skills",
        kicker: "what i did",
        heading: "design, 3d and engineering, end to end",
        items: [
          { title: "product + ux", body: "designed the visitor flow, the refusal tone and a touch-first admin menu with a help guide on every page.", tags: ["ux", "ui toolkit", "touch"] },
          { title: "ai engineering", body: "picked and benchmarked the models, built the document search with a reranker and the three-step topic gate.", tags: ["llm", "rag", "whisper", "tts"] },
          { title: "3d characters", body: "set up character creator actors, lip-sync, lighting and code-driven facial reactions in unity.", tags: ["unity", "cc4", "animation"] },
          { title: "performance", body: "tuned gpu use and audio streaming so hindi speech never stutters, even at 4k.", tags: ["profiling", "audio"] },
        ],
      },
      {
        kind: "stack",
        kicker: "stack",
        heading: "under the hood",
        groups: [
          { label: "engine", items: ["unity 6", "urp", "ui toolkit"] },
          { label: "ai", items: ["whisper large-v3 turbo", "gemma 3 4b", "llama.cpp / llmunity", "bge-m3 + reranker"] },
          { label: "voice", items: ["kokoro-82m", "veena (hindi)", "uLipSync"] },
          { label: "characters", items: ["character creator", "actorcore", "animation rigging"] },
          { label: "sidecar", items: ["python", "onnxruntime"] },
        ],
      },
    ],
  },

  "kiosk-launcher": {
    client: "altcore",
    year: "2026",
    role: "creative technologist: product design + full-stack build",
    status: "v1.6 live on showroom pcs",
    theme: { mode: "light", bg: "#f5efe8", surface: "#fffaf5", ink: "#1b1411", accent: "#f36f00", accent2: "#b00400" },
    tagline: "one launcher for every altcore experience.",
    intro:
      "a branded, touch-first home for altcore's unity, unreal and web experiences. it turns any showroom or customer pc into a locked-down kiosk, and the apps, licences and updates all come from the cloud.",
    facts: [
      { value: "3", label: "screens driven at once in the showroom" },
      { value: "offline", label: "licences keep working until they expire" },
      { value: "unity, unreal, web", label: "all launched from one library" },
      { value: "v1.6", label: "shipped with signed auto-updates" },
    ],
    cover: { type: "image", src: "/work/kiosk-launcher/library-showcase.webp", alt: "the launcher's showcase library with a big featured app", caption: "showcase library" },
    blocks: [
      {
        kind: "text",
        kicker: "the brief",
        heading: "demos shouldn't start with a windows desktop",
        body: [
          "altcore builds a lot of experiences: games, xr, simulations and web apps. on a showroom floor each one used to mean a different exe, a different folder and someone who knew which buttons to press.",
          "the launcher puts them all behind one tap: a big, branded library that runs the show, keeps the pc locked, and only lets each customer open what they've licensed.",
        ],
      },
      {
        kind: "gallery",
        heading: "browse, tap, play",
        kicker: "the library",
        items: [
          { type: "image", src: "/work/kiosk-launcher/library-gallery.webp", alt: "gallery layout of the app library", caption: "gallery layout", wide: true },
          { type: "image", src: "/work/kiosk-launcher/launch-loading.webp", alt: "launch screen while an app opens", caption: "opening an app" },
          { type: "image", src: "/work/kiosk-launcher/launch-running.webp", alt: "launch screen once the app is running", caption: "app running" },
        ],
      },
      {
        kind: "features",
        kicker: "what it does",
        heading: "a games-console feel for a showroom pc",
        items: [
          { title: "big picture kiosk", body: "the launcher becomes the whole pc: full screen, no taskbar, starts with windows, secret pin to get out." },
          { title: "multi-screen shows", body: "pick which screen each app opens on, mirror to a second screen, and run a three-screen showroom in sync." },
          { title: "any kind of app", body: "unity and unreal builds, web apps in a built-in frame, and web apps that need their own local server or docker." },
          { title: "cloud accounts + licences", body: "an online portal for users, devices and app access. licences work offline until they expire, and pcs can be locked remotely." },
          { title: "downloads + updates", body: "apps are uploaded once and downloaded, paused, resumed and updated on each pc. the launcher updates itself, signed." },
          { title: "protected apps", body: "apps are encrypted on disk on a hidden drive, and a small unity / unreal add-on checks they were opened from the launcher." },
        ],
      },
      {
        kind: "gallery",
        kicker: "kiosk mode",
        heading: "locked down, but friendly",
        items: [
          { type: "image", src: "/work/kiosk-launcher/kiosk-pin.webp", alt: "pin pad to leave kiosk mode", caption: "leave kiosk mode" },
          { type: "image", src: "/work/kiosk-launcher/kiosk-choices.webp", alt: "choices after entering the pin", caption: "where to?" },
          { type: "image", src: "/work/kiosk-launcher/login.webp", alt: "sign-in screen", caption: "sign in" },
        ],
      },
      {
        kind: "skills",
        kicker: "what i did",
        heading: "from mockup to installer",
        items: [
          { title: "product design", body: "designed the brand, the showcase and gallery layouts and a touch-first flow, from an html mockup to the real app.", tags: ["ui", "brand", "motion"] },
          { title: "desktop engineering", body: "built the app in tauri: rust for sign-in, launching, kiosk mode and encryption, react for everything you see.", tags: ["rust", "react", "tauri"] },
          { title: "cloud", body: "accounts, licences, device check-ins and app downloads on cloudflare workers and r2, plus the admin portal.", tags: ["cloudflare", "api", "security"] },
          { title: "docs + launch", body: "in-app help on every page, a pdf manual from real screenshots, and a trailer made entirely in code.", tags: ["docs", "video"] },
        ],
      },
      {
        kind: "stack",
        kicker: "stack",
        heading: "under the hood",
        groups: [
          { label: "app", items: ["tauri", "rust", "react", "typescript"] },
          { label: "ui", items: ["tailwind", "shadcn / radix", "framer motion", "dm sans"] },
          { label: "cloud", items: ["cloudflare workers", "r2 storage", "signed updates"] },
          { label: "security", items: ["argon2id", "encrypted app drive", "unity + unreal launch check"] },
        ],
      },
      {
        kind: "gallery",
        kicker: "admin",
        heading: "the boring bits, done properly",
        items: [
          { type: "image", src: "/work/kiosk-launcher/admin-apps.webp", alt: "admin list of apps", caption: "apps", wide: true },
          { type: "image", src: "/work/kiosk-launcher/settings.webp", alt: "settings page", caption: "settings" },
          { type: "image", src: "/work/kiosk-launcher/screens.webp", alt: "screen setup for multiple monitors", caption: "screens" },
        ],
      },
    ],
  },

  "altcore-xr": {
    client: "altcore",
    year: "2026",
    role: "creative technologist", // TODO
    theme: { mode: "dark", bg: "#0b0d17", surface: "#151a2a", ink: "#eef1ff", accent: "#7cf3d0", accent2: "#8a7dff" },
    tagline: "a mixed reality demo for altcore.", // TODO: the real one-liner
    intro: "placeholder: what it is, who tries it, and what happens when they put the headset on.",
    facts: [
      { value: "mr", label: "TODO: headset / platform" },
      { value: "unity", label: "urp" },
    ],
    blocks: [],
  },

  xros: {
    tools: ["unity"],
    links: [{ label: "old case study", href: `${OLD}/mixedreality` }],
    cover: { type: "youtube", src: "aBXUb4oh4Eg", caption: "xros walkthrough" },
    blocks: [
      { kind: "gallery", heading: "prototype clips", items: [
      { type: "video", src: "https://framerusercontent.com/assets/ouC4z2OKSVRb5u8h3rZMxLPplA.mp4", alt: "xros prototype clip 1" },
      { type: "video", src: "https://framerusercontent.com/assets/PEf6DFIIzLp23c10W5cTSOjyk.mp4", alt: "xros prototype clip 2" },
      { type: "video", src: "https://framerusercontent.com/assets/IW105RDK3PrfXJWYr1n3hlc8Kc.mp4", alt: "xros prototype clip 3" },
      { type: "video", src: "https://framerusercontent.com/assets/5zOh9a5ptrvfoH6EE3rKaiNEFk.mp4", alt: "xros prototype clip 4" }
      ] },
      { kind: "gallery", heading: "screens", items: [
      { type: "image", src: "https://framerusercontent.com/images/3yQ43UWFYq1dwV4ebHuNhWGCFJo.png", alt: "xros screen 1" },
      { type: "image", src: "https://framerusercontent.com/images/rmx0LkDA6n8iEnWnODRlJZ7bE.png", alt: "xros screen 2" },
      { type: "image", src: "https://framerusercontent.com/images/weIbATPXQgyQU3P8U24uuwoYcE.png", alt: "xros screen 3" },
      { type: "image", src: "https://framerusercontent.com/images/I9mAXAJI7dWJv8IoVN2aYhP621A.png", alt: "xros screen 4" },
      { type: "image", src: "https://framerusercontent.com/images/G9pnYriPc5Qm5j3mFMj4i3cifw.png", alt: "xros screen 5" },
      { type: "image", src: "https://framerusercontent.com/images/fojpyPM0fOzYLjXM9DgsUR72s.png", alt: "xros screen 6" },
      { type: "image", src: "https://framerusercontent.com/images/WLXLSX35FAQ4zmC0Hc1UxhGfeRo.png", alt: "xros screen 7" },
      { type: "image", src: "https://framerusercontent.com/images/1djzPUYyftsUUg0JVg8X579V6dA.png", alt: "xros screen 8" },
      { type: "image", src: "https://framerusercontent.com/images/7pSI2bkagVQCLsCPKAXtY6176E8.png", alt: "xros screen 9" },
      { type: "image", src: "https://framerusercontent.com/images/MDke1UG0GJEL1lrJOCrNDAxasW8.png", alt: "xros screen 10" },
      { type: "image", src: "https://framerusercontent.com/images/zQpi1whyMWFyBsmcYWiFsCWc.png", alt: "xros screen 11" },
      { type: "image", src: "https://framerusercontent.com/images/WeRKAVhjLhj42TE0Td3NfnujrZc.png", alt: "xros screen 12" },
      { type: "image", src: "https://framerusercontent.com/images/zARujPpBXrQlW2SZM5fteYQqM.png", alt: "xros screen 13" },
      { type: "image", src: "https://framerusercontent.com/images/uGAylzbqGnmrjpMr8e90rAOkO0.png", alt: "xros screen 14" },
      { type: "image", src: "https://framerusercontent.com/images/qXQM8wsCNWPNrL4qD4crrF3keM.png", alt: "xros screen 15" },
      { type: "image", src: "https://framerusercontent.com/images/jUHwglErnAhsR2YLhnFy4rWR2Vw.png", alt: "xros screen 16" },
      { type: "image", src: "https://framerusercontent.com/images/4Oo3HLmeZoKsccOajK022VF3YM.png", alt: "xros screen 17" },
      { type: "image", src: "https://framerusercontent.com/images/0bPoNTyOEsLH5DvXYCWpFr3NE.png", alt: "xros screen 18" },
      { type: "image", src: "https://framerusercontent.com/images/IBvYZyr6GqcesBL4JaT4ZLUkZg.png", alt: "xros screen 19" },
      { type: "image", src: "https://framerusercontent.com/images/4qsCqVSUBsNUhJHjbf2pJCPk.png", alt: "xros screen 20" },
      { type: "image", src: "https://framerusercontent.com/images/fCabpRkkjYJcy6LnHd5DKYrAVg.png", alt: "xros screen 21" },
      { type: "image", src: "https://framerusercontent.com/images/J6jX7HMvyH7aRezXwJuN2XwVso.png", alt: "xros screen 22" },
      { type: "image", src: "https://framerusercontent.com/images/ZWdgAI34EetIAYbDFRyxEKIC0LU.png", alt: "xros screen 23" },
      { type: "image", src: "https://framerusercontent.com/images/hmbi3PwYMee0MrT74HWV3duNy8.png", alt: "xros screen 24" },
      { type: "image", src: "https://framerusercontent.com/images/4RQtU3QRyjwWZoCyt4GDndDFLk.png", alt: "xros screen 25" }
      ] },
    ],
  },
  chorespace: {
    tools: ["unity"],
    links: [{ label: "old case study", href: `${OLD}/chorespace` }],
    cover: { type: "youtube", src: "yVrFMF_iwxY", caption: "chorespace demo" },
    blocks: [
      { kind: "gallery", heading: "screens", items: [
      { type: "image", src: "https://framerusercontent.com/images/UDy4SgD1jLwiOhqIC7si8Ash8.png", alt: "chorespace screen 1" },
      { type: "image", src: "https://framerusercontent.com/images/bphSEBy7y3TmFAqK7m8E6n6Cps.png", alt: "chorespace screen 2" },
      { type: "image", src: "https://framerusercontent.com/images/hyxoAjNLBA12Pvb1yz2js2QkJ0.png", alt: "chorespace screen 3" },
      { type: "image", src: "https://framerusercontent.com/images/FO6rGpauSIcMDNDNKMiCtuBCGvY.png", alt: "chorespace screen 4" },
      { type: "image", src: "https://framerusercontent.com/images/CT9x0KA5oOHelB5eQvEre3Ly5P8.png", alt: "chorespace screen 5" },
      { type: "image", src: "https://framerusercontent.com/images/O83IxFZoQB10oCe0YuRQ7JanoG4.png", alt: "chorespace screen 6" },
      { type: "image", src: "https://framerusercontent.com/images/acBFvgYKYiX89s44VAUguevGhU.png", alt: "chorespace screen 7" },
      { type: "image", src: "https://framerusercontent.com/images/hqIzHbYgyOF1FXUQGhSvHYP3A.png", alt: "chorespace screen 8" },
      { type: "image", src: "https://framerusercontent.com/images/UQzdvehcYtP0PorpnclunyjSE.png", alt: "chorespace screen 9" },
      { type: "image", src: "https://framerusercontent.com/images/UxOMxf3Dr0mAO4jV3VEnAWqUZE.png", alt: "chorespace screen 10" },
      { type: "image", src: "https://framerusercontent.com/images/eHjiljRQw2sfeTmb7WYSqsap48.png", alt: "chorespace screen 11" },
      { type: "image", src: "https://framerusercontent.com/images/adA8qcqEjnHCxY0yZjREflpXOuM.png", alt: "chorespace screen 12" },
      { type: "image", src: "https://framerusercontent.com/images/76gGNm6G6igLuEhsbPYI7KUkko.png", alt: "chorespace screen 13" }
      ] },
    ],
  },
  "stewart-platform": {
    tools: ["arduino", "c++"],
    links: [{ label: "old case study", href: `${OLD}/stewartplatform` }],
    cover: { type: "youtube", src: "6BB8TpbHCN0", caption: "stewart platform in motion" },
    blocks: [
      { kind: "gallery", heading: "build", items: [
      { type: "image", src: "https://framerusercontent.com/images/DEhH95FDAc8ZIxCsJ7RQXpt1hs.png", alt: "stewart platform screen 1" },
      { type: "image", src: "https://framerusercontent.com/images/WJtWTI15MdIZOqWqDOZL3COZTC8.png", alt: "stewart platform screen 2" },
      { type: "image", src: "https://framerusercontent.com/images/E708PuomVzOZ0N5MRZ3cNYEK4.png", alt: "stewart platform screen 3" },
      { type: "image", src: "https://framerusercontent.com/images/ifjS1IhQHETwwLHFhONbnWUDw.png", alt: "stewart platform screen 4" },
      { type: "image", src: "https://framerusercontent.com/images/ycEv5Bnkq6TGElD41yI8TYF1fW4.png", alt: "stewart platform screen 5" }
      ] },
    ],
  },
  "game-showreel": {
    tools: ["unity"],
    cover: { type: "youtube", src: "w3JkzSgb3Cc", caption: "game design showreel" },
    blocks: [],
  },
  error: {
    cover: { type: "youtube", src: "ektV0BSIR40", caption: "error !!!" },
    blocks: [],
  },
};
