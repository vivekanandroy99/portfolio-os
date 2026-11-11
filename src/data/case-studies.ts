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
};

export type Block =
  | { kind: "text"; heading: string; body: string[] }
  | { kind: "steps"; heading: string; items: { title: string; body: string }[] }
  | { kind: "list"; heading: string; items: string[] }
  | { kind: "stats"; heading?: string; items: { value: string; label: string }[] }
  | { kind: "quote"; text: string; who?: string }
  | { kind: "gallery"; heading?: string; items: Media[] };

export type CaseStudy = {
  year?: string;
  role?: string;
  team?: string;
  duration?: string;
  tools?: string[];
  links?: { label: string; href: string }[];
  cover?: Media; // big media at the top; falls back to the project thumbnail
  intro?: string; // a longer opener than the blurb
  blocks: Block[];
};

// Media below is pulled from the old framer case studies. Those pages had no write-up,
// so the text sections are waiting on the real story (role, problem, process, outcome).
const OLD = "https://vivekanand.framer.website";

export const caseStudies: Record<string, CaseStudy> = {
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
