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
  | { kind: "gallery"; heading?: string; kicker?: string; items: Media[] }
  // text beside one picture; flip puts the picture on the left
  | { kind: "split"; heading: string; kicker?: string; body: string[]; points?: string[]; media: Media; flip?: boolean }
  // before / after, e.g. "without it" vs "with it"
  | { kind: "compare"; heading: string; kicker?: string; before: { title: string; items: string[] }; after: { title: string; items: string[] } };

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

  // ---------- old portfolio projects ----------
  // Written from the slides on the old framer case studies (text was baked into the images).
  // Slide images are copied into /public/work/<slug>/.

  xros: {
    theme: { mode: "dark", bg: "#081413", surface: "#10201e", ink: "#e8fbf5", accent: "#5ff0c4", accent2: "#3aa0ff" },
    year: "2024",
    role: "ux research, spatial ui design, prototyping",
    tools: ["unity"],
    links: [{ label: "old case study", href: `${OLD}/mixedreality` }],
    tagline: "a workspace that lives in the room around you.",
    intro:
      "headsets like the vision pro give you infinite screen space, then make you work on one giant mirrored mac screen. xros is my take on a proper spatial workspace: windows, widgets and a dock you can work in all day, with the keyboard and mouse you already know.",
    facts: [
      { value: "3", label: "xr users in a think-aloud contextual enquiry" },
      { value: "2", label: "personas: a 3d modeller and a quant analyst" },
      { value: "8", label: "how-might-we questions that shaped the system" },
      { value: "2d + 3d", label: "windows and volumetric widgets in one space" },
    ],
    cover: { type: "youtube", src: "aBXUb4oh4Eg", caption: "xros walkthrough" },
    blocks: [
      {
        kind: "split",
        kicker: "the brief",
        heading: "great hardware, not much to work with",
        body: [
          "the apple vision pro already nails the hardware: eye and hand tracking, full colour pass-through, spatial windows and 3d objects, a high quality display and spatial tracking. apple even pitched it to companies like ibm, deloitte and sap as a \"work face computer\".",
          "but the software lags behind. the app library is short on proper work tools, and plugging in a mac only mirrors its screen. so all that space ends up as one big monitor floating in the room.",
        ],
        media: { type: "image", src: "/work/xros/wsj.webp", alt: "slide: the apple vision pro pitched to businesses, with a wall street journal headline", caption: "the current xr scenario" },
      },
      {
        kind: "features",
        kicker: "research",
        heading: "what actually goes wrong",
        items: [
          { title: "2d apps in a 3d world", body: "traditional desktop apps simply fail to use the xr environment. people don't get the extra spatial dimension or a more immersive way to handle information." },
          { title: "window wrangling", body: "resizing, moving and arranging windows on the mirrored desktop is hard, and there are no virtual desktops to organise work." },
          { title: "one giant screen", body: "a single huge screen feels less efficient than a multi-monitor setup or virtual desktops." },
          { title: "eyes aren't a mouse", body: "eye tracking isn't as precise as a mouse and keyboard for detailed work, and it gives no tactile feedback." },
          { title: "steep learning curve", body: "mastering eye-tracking controls takes time and effort, so new users get frustrated early." },
          { title: "missing apps", body: "many popular productivity and creative apps have no interface built for the vision pro's controls." },
        ],
      },
      {
        kind: "text",
        kicker: "how i found that",
        heading: "a contextual enquiry, then two people to design for",
        body: [
          "i ran a contextual enquiry with 3 xr users doing productivity tasks and had them think aloud. the same pain points kept coming back, and they became the six above.",
          "from there i wrote two personas. maya is a 3d modeller at a game studio who wants precise, tactile control to sculpt models in space, and still falls back to a normal desk for detailed work. jessica is a quant analyst at a hedge fund who juggles spreadsheets, data feeds and charting tools across several monitors, and wants them in one customisable 3d layout without the information overload.",
        ],
      },
      {
        kind: "gallery",
        items: [
          { type: "image", src: "/work/xros/persona-maya.webp", alt: "persona: maya, 3d modeller", caption: "maya, 3d modeller" },
          { type: "image", src: "/work/xros/persona-jessica.webp", alt: "persona: jessica, quant analyst", caption: "jessica, quant analyst" },
        ],
      },
      {
        kind: "quote",
        text: "traditional monitors limit professionals in research, coding, 3d modelling and more. xr offers expansive screens, but mirroring desktops hinders multitasking, and new controls like eye tracking and hand gestures come with a learning curve.",
        who: "the problem statement",
      },
      {
        kind: "list",
        kicker: "how might we",
        heading: "the questions i designed against",
        items: [
          "manage multiple windows and apps in xr, beyond a mirrored desktop?",
          "blend eye tracking, hand gestures and traditional controls into flexible interfaces for existing apps?",
          "bring the keyboard and mouse into xr for efficient interaction?",
          "carry 2d menus and toolbars into xr apps so they still feel intuitive?",
          "let people switch between 2d and 3d views when a task needs both?",
          "let people customise the layout of a spatial workspace for their own workflow?",
          "use spatial awareness for sticky notes and whiteboards to help brainstorming?",
          "use spatial awareness to improve collaboration in shared workspaces?",
        ],
      },
      {
        kind: "split",
        kicker: "design",
        heading: "everything in focus, everything at arm's reach",
        body: [
          "the workspace curves around you. 2d app windows sit on a curved band in front, and 3d volumetric apps and widgets sit closer, on and around the desk.",
          "so the whole system comes down to two kinds of things you can see and touch: 2d window elements and 3d volumetric elements.",
        ],
        media: { type: "image", src: "/work/xros/workspace-sketch.webp", alt: "sketch of a person at a desk surrounded by curved windows and 3d widgets", caption: "the first workspace sketch" },
      },
      {
        kind: "split",
        flip: true,
        kicker: "problem solving",
        heading: "how does a mouse work in 3d?",
        body: [
          "keyboard and mouse should stay the go-to for 2d windows. people already know them, and they're precise. but a mouse is made for flat screens, and tracking it along several axes in 3d space gets messy fast.",
          "my fix: fixed window areas. the pointer only moves on a 2d plane where the app windows live, so it behaves exactly like a normal desktop. that plane can curve around you, or split into several planes, depending on what you like.",
        ],
        media: { type: "image", src: "/work/xros/window-plane.webp", alt: "sketch of the mouse pointer moving on a fixed 2d window plane", caption: "the 2d plane / window area" },
      },
      {
        kind: "features",
        kicker: "the system",
        heading: "a dock you already know how to use",
        items: [
          { title: "taskbar / dock", body: "apps, recent apps and open apps, plus search, control centre, the voice assistant, window arrangement and workspace navigation, all in one strip." },
          { title: "search", body: "apps and widgets, files, documents, images and videos, emails, contacts and calendar events, web search, dictionary, maths and system settings." },
          { title: "control centre", body: "quick access to wi-fi, bluetooth and connectivity, screen recording, camera, display brightness, volume and music, and notifications." },
          { title: "status, alerts and privacy", body: "status updates and notifications in the dock, with clear indicators whenever something is using the camera or mic." },
          { title: "windows", body: "every window gets window controls, a focus mode and a bottom nav bar to grab and move it." },
          { title: "app extensions", body: "traditional 2d work apps get spatial extras, for better usability, collaboration and productivity." },
        ],
      },
      {
        kind: "gallery",
        items: [
          { type: "image", src: "/work/xros/dock.webp", alt: "the dock, labelled", caption: "the dock", wide: true },
          { type: "image", src: "/work/xros/search.webp", alt: "search panel above the dock", caption: "search" },
          { type: "image", src: "/work/xros/control-center.webp", alt: "control centre panel", caption: "control centre" },
          { type: "image", src: "/work/xros/status.webp", alt: "status menu and privacy indicators", caption: "status + privacy" },
          { type: "image", src: "/work/xros/window.webp", alt: "a window with controls, focus button and nav bar", caption: "window anatomy" },
        ],
      },
      {
        kind: "gallery",
        kicker: "prototype",
        heading: "in motion",
        items: [
          { type: "video", src: "https://framerusercontent.com/assets/ouC4z2OKSVRb5u8h3rZMxLPplA.mp4", alt: "xros prototype clip 1" },
          { type: "video", src: "https://framerusercontent.com/assets/PEf6DFIIzLp23c10W5cTSOjyk.mp4", alt: "xros prototype clip 2" },
          { type: "video", src: "https://framerusercontent.com/assets/IW105RDK3PrfXJWYr1n3hlc8Kc.mp4", alt: "xros prototype clip 3" },
          { type: "video", src: "https://framerusercontent.com/assets/5zOh9a5ptrvfoH6EE3rKaiNEFk.mp4", alt: "xros prototype clip 4" },
        ],
      },
      {
        kind: "list",
        kicker: "what's next",
        heading: "future propositions",
        items: [
          "a system of work widgets in the spatial environment",
          "turning tabs into resizable windows for traditional work apps",
          "a set of mini-game widgets to make the workspace playful",
          "a workflow management assistant",
          "a task / focus timer that uses eye tracking to measure focus accurately",
        ],
      },
      {
        kind: "skills",
        heading: "what this shows",
        items: [
          { title: "ux research", body: "contextual enquiry with a think-aloud protocol, pain-point synthesis, personas and how-might-we framing.", tags: ["contextual enquiry", "think-aloud", "personas"] },
          { title: "spatial interaction design", body: "a layout for 2d and 3d elements in one space, and a way to keep the mouse useful in 3d.", tags: ["xr", "interaction design"] },
          { title: "ui systems", body: "a full set of os parts: dock, search, control centre, status, windows.", tags: ["ui design", "design systems"] },
          { title: "prototyping", body: "taking the ideas from sketches to a working prototype in unity.", tags: ["unity", "sketching"] },
        ],
      },
    ],
  },

  chorespace: {
    theme: { mode: "light", bg: "#fff4ee", surface: "#ffffff", ink: "#2a1712", accent: "#ff6a3d", accent2: "#ffb03d" },
    role: "research, spatial ui design, unity development",
    tools: ["unity", "xr interaction toolkit", "meta quest 3"],
    links: [{ label: "old case study", href: `${OLD}/chorespace` }],
    tagline: "your to-do list, pinned to the real world.",
    intro:
      "chorespace is a mixed reality app that puts spatial anchors in your space and attaches tasks to real places and objects. walk into a room and its chores show up right where they need doing.",
    facts: [
      { value: "3", label: "phases: research, design, prototype" },
      { value: "6", label: "features built and working on headset" },
      { value: "quest 3", label: "tested and validated on meta quest 3" },
    ],
    cover: { type: "youtube", src: "yVrFMF_iwxY", caption: "chorespace demo" },
    blocks: [
      {
        kind: "features",
        kicker: "the problem",
        heading: "reminders know when, never where",
        items: [
          { title: "context-free reminders", body: "most daily tasks get forgotten because reminders have no spatial context. they live in a phone, away from the places where the work actually happens." },
          { title: "the missing \"where\"", body: "calendar alerts tell you when to do something, not where. that time-only focus skips the part that matters for actually getting it done." },
          { title: "real-world impact", body: "missed chores, clunky workflows and frustration, at home and at work. the cost runs from household stress to wasted time in businesses." },
        ],
      },
      {
        kind: "compare",
        heading: "so what changes?",
        before: { title: "traditional reminders", items: ["no spatial context", "no visual cues", "no location triggers"] },
        after: { title: "chorespace", items: ["context-aware reminders", "spatial anchors", "visual task indicators"] },
      },
      {
        kind: "steps",
        kicker: "01 · research",
        heading: "talking to people, then checking the market",
        items: [
          { title: "user interviews + surveys", body: "in-depth interviews with homeowners, office workers and facility managers about how they manage tasks, focused on spatial memory and location-based failures. people forget location-specific tasks because nothing visual reminds them, and team tasks suffer from unclear locations and miscommunication." },
          { title: "competitive analysis", body: "i looked at task managers across platforms, from normal apps to existing vr/xr apps. the gaps: time-based reminders only, no spatial context, little awareness of the surroundings, complex setup and no persistent visual cues." },
        ],
      },
      {
        kind: "features",
        kicker: "opportunities",
        heading: "where chorespace can win",
        items: [
          { title: "spatial context", body: "bridge digital task lists and the physical world with precise spatial anchoring and location-aware interfaces." },
          { title: "team coordination", body: "close the gap in shared spaces with a shared spatial context, so everyone can see which task lives where." },
          { title: "across environments", body: "one way of working that fits homes, offices and industrial sites, each with an interface that suits it." },
        ],
      },
      {
        kind: "pipeline",
        kicker: "02 · design",
        heading: "the core user flow",
        items: [
          { title: "environment entry", body: "you walk into a space, and the app detects the location and context." },
          { title: "task discovery", body: "the tasks that belong to that place appear around you." },
          { title: "interaction + completion", body: "you work through them with spatial ui and tick them off." },
        ],
      },
      {
        kind: "features",
        heading: "spatial ui elements",
        items: [
          { title: "spatial markers", body: "context-aware markers that only show up when they matter for where you are and what's due." },
          { title: "directional markers", body: "arrows and visual trails that lead you to a task, with clear cues for which way to turn." },
          { title: "target indicators", body: "clear visual targets that show exactly where to act on a physical object." },
        ],
      },
      {
        kind: "quote",
        text: "spatial interfaces should act as intelligent assistants that understand both your environment and your tasks. clear guidance without obstruction, respect for physical space, and digital interactions that feel like natural extensions of your real-world movements.",
        who: "the design philosophy",
      },
      {
        kind: "split",
        kicker: "03 · prototype",
        heading: "built in unity, tested on a quest 3",
        body: [
          "i built the prototype in unity with the xr interaction toolkit handling hand tracking, eye tracking and input. i tested and validated it on a meta quest 3 in a real home.",
        ],
        points: [
          "spatial anchoring: tasks stay pinned to real spots",
          "virtual compass: a ring on the floor points to the next task",
          "visual feedback: a hand-held chores list shows what's done",
          "hand ui: menus that live on your hand",
          "spatial ui canvas: task cards floating at the task",
          "proximity detection: the task wakes up as you walk close",
        ],
        media: { type: "image", src: "/work/chorespace/features.webp", alt: "headset captures of spatial anchoring, the virtual compass and the feedback system", caption: "spatial anchoring, compass, feedback" },
      },
      {
        kind: "gallery",
        items: [{ type: "image", src: "/work/chorespace/prototype.webp", alt: "headset captures of hand ui, spatial canvas and proximity detection", caption: "hand ui, spatial canvas, proximity detection", wide: true }],
      },
      {
        kind: "compare",
        kicker: "market applications",
        heading: "hotel maintenance, before and after",
        before: { title: "no chorespace", items: ["staff carry clipboards and printed checklists", "room numbers get confused and tasks get missed between shifts", "more time per room inspection", "more mistakes in tracking what's done"] },
        after: { title: "with chorespace", items: ["tasks appear by themselves as staff enter each room", "visual arrows guide them to each maintenance point", "less time per room", "fewer errors, thanks to voice and visual confirmation"] },
      },
      {
        kind: "skills",
        heading: "what this shows",
        items: [
          { title: "research to product", body: "interviews, surveys and a competitive scan, turned into clear opportunities and one core flow.", tags: ["user interviews", "competitive analysis"] },
          { title: "spatial ui design", body: "markers, trails, targets and hand ui that guide without getting in the way.", tags: ["mixed reality", "interaction design"] },
          { title: "xr development", body: "spatial anchors, a compass, proximity triggers and hand tracking, all working on a headset.", tags: ["unity", "xr interaction toolkit", "meta quest 3"] },
          { title: "product thinking", body: "taking a home idea to hotels and other workplaces where missed tasks cost money.", tags: ["use cases", "business value"] },
        ],
      },
    ],
  },

  biasai: {
    theme: { mode: "dark", bg: "#121214", surface: "#1c1c21", ink: "#f2efe9", accent: "#ff6a1f", accent2: "#2ec5d3" },
    role: "research, ux, dashboard design",
    links: [{ label: "old case study", href: `${OLD}/aibiases` }],
    tagline: "unveiling the bias inside generative ai.",
    intro:
      "genai is the new internet search, and it learns our biases along the way. biasai starts as a visual explainer of bias in generative ai and ends as a dashboard that helps ai teams find, understand and fix it.",
    facts: [
      { value: "10+", label: "peer-reviewed studies analysed" },
      { value: "2021–24", label: "research window" },
      { value: "3", label: "focus areas: text-to-image, vlms, lmms" },
      { value: "10", label: "fairness measures mapped out" },
    ],
    cover: { type: "youtube", src: "z9-AiQk1nms", caption: "biasai walkthrough" },
    blocks: [
      {
        kind: "split",
        kicker: "the why",
        heading: "ask for \"a scientist working in a lab\"",
        body: [
          "we've moved from google search to chatgpt, and we lean on ai like never before. but just like search results, ai outputs can be skewed, and the skew comes from the data the models were trained on.",
          "what we expect and what we get are often different. ask an image model for a scientist in a lab and the ideal answer is diverse in gender, race and age. the real answer was mostly male, white and much less diverse.",
        ],
        media: { type: "image", src: "/work/biasai/ideal-vs-real.webp", alt: "slide comparing the ideal diverse output with the real, mostly male, white output", caption: "ideal outcome vs real outcome" },
      },
      {
        kind: "text",
        kicker: "groundwork",
        heading: "explain the machine before blaming it",
        body: [
          "the project starts by making the topic easy to follow. today's ai is task-specific intelligence, not the human-like general intelligence (agi) people imagine, which is still theoretical.",
          "models learn patterns from huge datasets by nudging internal weights to cut prediction error. language models predict the next token, and diffusion models denoise an image step by step. so when the real world is biased, the model takes that bias in and amplifies it.",
        ],
      },
      {
        kind: "gallery",
        items: [
          { type: "image", src: "/work/biasai/training.webp", alt: "slide: how genai models are trained" },
          { type: "image", src: "/work/biasai/types.webp", alt: "slide: types of biases" },
        ],
      },
      {
        kind: "list",
        kicker: "types of bias",
        heading: "what it looks like in practice",
        items: [
          "racial / ethnic: misidentification and stereotyping in facial recognition, hiring and loans",
          "gender: professions tied to genders, and misclassification of non-binary people",
          "age, disability and appearance: stereotyped depictions and people left out",
          "socioeconomic, geographic and cultural: western-centric values and underrepresented regions",
          "gender activity binding: activities linked to gender stereotypes from training data",
        ],
      },
      {
        kind: "features",
        kicker: "research findings",
        heading: "what the papers say",
        items: [
          { title: "text-to-image", body: "models mirror stereotypes (\"nurse\" comes out female). prompt modifiers aren't enough to fix deep biases." },
          { title: "gender classification", body: "higher misclassification for darker-skinned women and trans people, which leads to discrimination against non-stereotypical looks." },
          { title: "gender activity binding", body: "a 13.2% accuracy drop in vlms for unexpected gender-activity pairs, which feeds harmful stereotypes in hiring and media." },
          { title: "text embeddings", body: "models link professions to gender (\"ceo\" to male), so bias has to be weighed alongside model performance." },
          { title: "conversational ai", body: "llms infer user attributes, which leads to biased recommendations and privacy concerns." },
          { title: "open-source platforms", body: "nsfw content on civitai jumped from 55% to 73% in 6 months, reinforcing stereotypes and western-centric bias." },
        ],
      },
      {
        kind: "split",
        flip: true,
        kicker: "the gap",
        heading: "plenty of tools, no clear picture",
        body: [
          "i mapped the bias-detection tools out there: open-source kits like fairlearn, ai fairness 360, fairness indicators and the what-if tool; specialised ones like aequitas, fairtest and themis; cloud options like azure ml fairness, sagemaker clarify and google cloud ai platform; and newer research tools like faircomp and linkedin's lift.",
          "they're powerful, but they need real technical skill, they're hard to explain to stakeholders, and many lock you in or lack documentation. what's missing is an intuitive, visual dashboard that lets people detect, understand and mitigate bias. that became the focus of the project.",
        ],
        media: { type: "image", src: "/work/biasai/landscape.webp", alt: "slide: current landscape of bias detection tools", caption: "the current tool landscape" },
      },
      {
        kind: "split",
        kicker: "who it's for",
        heading: "two people who live with this problem",
        body: [
          "an ai model trainer: a data scientist with 6+ years of curating datasets for text-to-image models. she struggles to spot subtle bias at scale, has few visuals to show stakeholders, and loses time to manual annotation. she wants automated flagging, heatmaps and exportable reports.",
          "an ai developer: a model engineer who fine-tunes text-to-image models with python, pytorch, fairlearn and aif360. he struggles to measure intersectional bias, has no standard bias-test prompts, and has to trade fairness against performance. he wants prompt suites and fairness metrics he can track over iterations.",
        ],
        media: { type: "image", src: "/work/biasai/personas.webp", alt: "slide: two personas, an ai model trainer and an ai developer", caption: "personas" },
      },
      {
        kind: "pipeline",
        kicker: "use case",
        heading: "check, improve, retrain",
        items: [
          { title: "check for biases", body: "connect a model or upload training data, run bias checks across many dimensions, and see which biases show up and how bad they are." },
          { title: "improve datasets", body: "get clear insights on underrepresented groups, add diverse data to balance it, and track the metrics over time." },
          { title: "retrain models", body: "apply mitigation strategies from the dashboard, retrain on better data, and keep monitoring that fairness improves." },
        ],
      },
      {
        kind: "features",
        kicker: "under the hood",
        heading: "how the dashboard measures bias",
        items: [
          { title: "demographic parity + equalized odds", body: "equal outcome rates and equal accuracy across groups. e.g. 60% of both men and women get hired." },
          { title: "equal opportunity + calibration", body: "equal true-positive rates for qualified people, and predicted probabilities that match real outcomes." },
          { title: "counterfactual + individual fairness", body: "the decision stays the same when a sensitive attribute changes, and similar people get similar predictions." },
          { title: "word embeddings + word weights", body: "shows stereotyped word links (\"doctor\" closer to \"man\") and which prompt words drive the output." },
          { title: "simpson's diversity index", body: "the chance of picking different categories. balanced gender output scores 0.5, male-dominated 0.095." },
          { title: "shannon entropy", body: "higher means more diverse. 50/50 male-female images score 1.0, 95/5 scores 0.29." },
        ],
      },
      {
        kind: "split",
        flip: true,
        kicker: "features",
        heading: "diversity you can actually see",
        body: [
          "the diversity index view turns those numbers into charts anyone can read: bar charts of diversity scores per attribute, heatmaps for intersectionality (like race × gender), and line charts that track the trend across model versions.",
          "from there it points to fixes at every stage: before training (diverse data, bias audits, augmentation, feature selection), during training (fairness constraints, adversarial debiasing, reweighting) and after (threshold tuning, calibration, output adjustment).",
        ],
        media: { type: "image", src: "/work/biasai/diversity.webp", alt: "dashboard slide: diversity index bar chart, heatmap and historical trend", caption: "diversity index view" },
      },
      {
        kind: "gallery",
        kicker: "walkthrough",
        heading: "part two",
        items: [{ type: "youtube", src: "a_XdNDbemv8", caption: "biasai, part two" }],
      },
      {
        kind: "skills",
        heading: "what this shows",
        items: [
          { title: "research synthesis", body: "10+ papers turned into clear findings, a bias taxonomy and a gap in the market.", tags: ["literature review", "synthesis"] },
          { title: "making the complex readable", body: "explaining how genai works and how bias gets in, for people who aren't ml engineers.", tags: ["information design", "storytelling"] },
          { title: "dashboard ux", body: "personas, a check-improve-retrain flow and fairness metrics shown as charts people can act on.", tags: ["ui/ux", "data viz", "dashboard"] },
          { title: "responsible ai", body: "fairness metrics and mitigation strategies across the whole model lifecycle.", tags: ["genai", "fairness"] },
        ],
      },
    ],
  },

  "fit-mate": {
    theme: { mode: "light", bg: "#f1f4f8", surface: "#ffffff", ink: "#15202e", accent: "#33475f", accent2: "#19b45b" },
    role: "ux research, ui design, prototype",
    links: [{ label: "old case study + video", href: "https://vivekanandr.myportfolio.com/workout-app" }],
    tagline: "a workout buddy with an ai brain.",
    intro:
      "fit-mate is an ai-assisted workout app. it uses your camera to coach your form in real time, chats with you to plan a session, and gives nutrition advice, so training at home feels less like guessing.",
    facts: [
      { value: "camera", label: "real-time form coaching" },
      { value: "chat", label: "an ai coach that plans your session" },
      { value: "insights", label: "trends, recovery and strength progress" },
    ],
    cover: { type: "image", src: "/work/fit-mate/screens.webp", alt: "fit-mate screens: chat coach, form analysis and insights", caption: "fit-mate" },
    blocks: [
      {
        kind: "features",
        kicker: "the app",
        heading: "three screens that do the heavy lifting",
        items: [
          { title: "a coach you can text", body: "\"short on time but still want a workout?\" it suggests a quick no-equipment session, like a 15-minute bodyweight circuit, right in the chat." },
          { title: "form analysis", body: "the camera tracks your pose and rates your form per set and rep, with notes like \"your back might be sagging during the push-up, keep a straight line\"." },
          { title: "insights", body: "performance trends, session time, recovery time, calories burned, weights lifted and reps done, plus a monthly goal." },
        ],
      },
      {
        kind: "skills",
        heading: "what this shows",
        items: [
          { title: "ux research", body: "starting from how people actually train on their own.", tags: ["ux research"] },
          { title: "ai-first ux", body: "camera-based image recognition and a chat coach built into a calm, simple ui.", tags: ["genai", "image recognition"] },
          { title: "design system + prototype", body: "one clean visual language across every screen, taken to a clickable prototype.", tags: ["design system", "prototype"] },
        ],
      },
    ],
  },

  "stewart-platform": {
    theme: { mode: "dark", bg: "#08090c", surface: "#12141b", ink: "#eceaf2", accent: "#8f8cff", accent2: "#2fe6a8" },
    role: "design, fabrication, electronics, code",
    tools: ["arduino", "c++", "cad", "3d printing", "laser cutting"],
    links: [{ label: "old case study", href: `${OLD}/stewartplatform` }],
    tagline: "six legs, six degrees of freedom.",
    intro:
      "a stewart platform is a parallel manipulator: six legs between a fixed base and a moving top give precise control over position and angle in 3d space. i designed, built and coded a small one from scratch.",
    facts: [
      { value: "6", label: "actuators" },
      { value: "6dof", label: "x, y, z + roll, pitch, yaw" },
      { value: "∞", label: "positions" },
      { value: "1954", label: "year the design was invented" },
    ],
    cover: { type: "youtube", src: "6BB8TpbHCN0", caption: "stewart platform in motion" },
    blocks: [
      {
        kind: "split",
        kicker: "what is it?",
        heading: "imagine a table with 6 adjustable legs",
        body: [
          "extend or retract each leg on its own and you can set the table to any angle or height you want. that's a stewart platform, also called a hexapod or gough-stewart platform.",
        ],
        points: ["top platform: the moving surface", "6 legs: struts that change length", "base platform: the fixed foundation"],
        media: { type: "image", src: "/work/stewart-platform/what.webp", alt: "explainer: what a stewart platform is, with a leg diagram", caption: "the explainer" },
      },
      {
        kind: "pipeline",
        kicker: "how it works",
        heading: "from \"tilt 10°\" to motion",
        items: [
          { title: "you want to move", body: "you pick where the platform should be, e.g. \"tilt forward by 10 degrees\"." },
          { title: "math does the work", body: "the controller works out exactly how long each of the 6 legs needs to be." },
          { title: "motors move the legs", body: "each motor extends or retracts its leg to that length, all in sync." },
          { title: "platform moves", body: "the top glides smoothly to the exact pose you asked for." },
        ],
      },
      {
        kind: "features",
        kicker: "problem solving",
        heading: "the math behind it",
        items: [
          { title: "inverse kinematics", body: "\"figure out how long each leg should be to reach this pose.\" like solving a puzzle where you know the answer and need the steps." },
          { title: "real-time calculations", body: "the maths runs hundreds of times a second, so movement stays smooth and responsive." },
          { title: "why 6 legs?", body: "six is the minimum to control all 6 degrees of freedom on their own: full control, still simple and cheap, and stable support." },
        ],
      },
      {
        kind: "features",
        heading: "types of motion",
        items: [
          { title: "translation", body: "moving up/down, left/right and forward/back." },
          { title: "rotation", body: "rolling, pitching and yawing around the axes." },
          { title: "combined", body: "mixing several motions at once." },
        ],
      },
      {
        kind: "pipeline",
        kicker: "build journey",
        heading: "design, build, code, test",
        items: [
          { title: "design", body: "cad modelling and the calculations." },
          { title: "build", body: "3d printing, laser cutting and assembly." },
          { title: "code", body: "programming the controller." },
          { title: "test", body: "fine-tuning and calibration." },
        ],
      },
      {
        kind: "gallery",
        kicker: "the build",
        heading: "from print bed to moving platform",
        items: [{ type: "image", src: "/work/stewart-platform/build.webp", alt: "build photos: printed hexagon frames, servos, an arduino and joystick, a laser-cut top plate and a model train carriage riding on top", caption: "printed frames, servo legs, arduino + joystick control, and a test ride for a model train carriage", wide: true }],
      },
      {
        kind: "skills",
        heading: "what this shows",
        items: [
          { title: "mechanical design", body: "cad, then 3d-printed hexagon frames and a laser-cut top plate.", tags: ["cad", "3d printing", "laser cutting"] },
          { title: "electronics", body: "six servos driven from an arduino, with a joystick for live control.", tags: ["arduino", "servos"] },
          { title: "control code", body: "inverse kinematics in c++, fast enough for smooth real-time motion.", tags: ["c++", "kinematics"] },
          { title: "explaining it", body: "turning parallel-manipulator maths into something anyone can follow.", tags: ["storytelling"] },
        ],
      },
    ],
  },

  "game-showreel": {
    theme: { mode: "dark", bg: "#120d1f", surface: "#1d1630", ink: "#f3edff", accent: "#b28cff", accent2: "#ff5fa2" },
    tagline: "press start: concepts, prototypes and gameplay.",
    facts: [
      { value: "game design", label: "concept prototypes" },
      { value: "unity", label: "gameplay built in unity" },
    ],
    tools: ["unity"],
    cover: { type: "youtube", src: "w3JkzSgb3Cc", caption: "game design showreel" },
    blocks: [],
  },
  error: {
    theme: { mode: "light", bg: "#fbf3e4", surface: "#fffaf0", ink: "#2b1d12", accent: "#e8423b", accent2: "#ffb703" },
    tagline: "error !!! a claymation short, one frame at a time.",
    facts: [
      { value: "stop motion", label: "shot frame by frame" },
      { value: "clay", label: "hand-made characters and sets" },
    ],
    cover: { type: "youtube", src: "ektV0BSIR40", caption: "error !!!" },
    blocks: [],
  },
};
