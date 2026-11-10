# portfolio-os

Vivekanand Roy's portfolio. A light, scrollable site with a mac-window look, cursor toys, draggable stickers and files, and an **OS mode** desktop with mini games.

Built with Next.js (App Router) + TypeScript. Styling is plain CSS in `src/app/globals.css`.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Where things live

| What | File |
| --- | --- |
| Projects (add new ones here) | `src/data/projects.ts` |
| Name, email, links, marquee words | `src/data/site.ts` |
| Home sections | `src/components/Hero.tsx`, `Work.tsx`, `Sections.tsx` |
| Floating files and clips | `src/components/Floaties.tsx` |
| All-work page with filters | `src/app/work/page.tsx`, `src/components/WorkGrid.tsx` |
| OS mode desktop | `src/components/OsMode.tsx` |
| Cursor, drag, tilt, games, canvases | `src/lib/interactions.js` |

### Adding a project

Add an object to `projects` in `src/data/projects.ts`. Set `featured: true` to show it as a big row on the home page; everything appears on `/work`.

### Adding a floating video clip

Put a short, muted `.mp4` in `public/clips/` and pass `src="/clips/name.mp4"` to a `<Clip>` in `Floaties.tsx`.

## Deploy (Vercel, free)

1. Sign in at vercel.com with GitHub.
2. **Add New → Project**, import `portfolio-os`. Vercel detects Next.js; keep the defaults.
3. Deploy. Every push to `main` redeploys, and every pull request gets its own preview link.
