# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project

Wesley Tran's personal portfolio site (`wesleytran.me`), deployed to GitHub Pages. Originally a
SvelteKit site, fully rewritten to **Next.js 15 (App Router) + React 19 + Tailwind CSS v4**. The
`README.md` is stale SvelteKit boilerplate — do not trust it.

## Commands

- `npm run dev` — dev server on port 3000
- `npm run build` — static export to `build/` (this is what CI deploys)
- `npm run start` — serve the production build
- `npm run format` — Prettier write across the repo
- `npm run lint` — Prettier check only (there is **no ESLint / no test runner** in this project)

Node 20 is used in CI, and `.npmrc` sets `engine-strict=true`.

## Deployment

`.github/workflows/deploy.yml` runs on push to `main`: `npm ci` → `npm run build` → upload the
`build/` directory as a Pages artifact → deploy. Because `next.config.ts` sets `output: "export"`,
everything is static — there is no server runtime, so no route handlers, server actions, or
`fetch`-at-request-time. All data must be read at build time. `distDir` is `build/` (not the default
`.next/`), `trailingSlash: true`, and images are `unoptimized` (required for static export).

## Architecture

### Content is filesystem-driven markdown

Projects and blog posts live as markdown-with-frontmatter under `src/content/projects/<slug>/`. The
`src/lib/*.ts` modules read them at build time using `node:fs`, `gray-matter` (frontmatter), and
`marked` (markdown → HTML). These lib functions run **only** in Server Components / build-time code
— never import them into a `"use client"` file.

- `src/lib/projects.ts` — one directory per project slug, each containing `<slug>.md`. Key fns:
  `getAllProjects` (sorted newest-first by `date`), `getFeaturedProjects` (only projects with a
  non-empty `frontPageDescription`, sorted by `order` then date, capped at 4), `getProjectBySlug`,
  `getAllProjectSlugs` (feeds `generateStaticParams`). Media resolution is convention-based within
  the slug dir: thumbnail is `<slug>.{png,jpg,jpeg,webp}` (imported via `require` for a
  `StaticImageData`), and video is `public/projects/<slug>/<slug>.mp4` with optional `<slug>.webp`
  poster. Frontmatter fields map to the `Project` interface — add new fields there.
- `src/lib/blogs.ts` — blog posts are markdown files inside `src/content/projects/homelab/`
  (excluding `homelab.md` itself), driven by `BLOG_DIRS`. Uses a custom `marked` `Renderer` that
  adds slugified `id`s to headings (for anchor links). Title comes from the first `# h1`, then
  frontmatter `title`, then a title-cased slug.

Rendered markdown HTML is injected with `dangerouslySetInnerHTML` and styled by the `.prose-project`
/ `.prose-blog` classes in `globals.css` (Next.js has no built-in prose styling here).

### Routing (App Router)

- `/` (`app/page.tsx`) — Hero + SelectedWork (featured projects)
- `/projects` and `/projects/[slug]` — list + detail, `generateStaticParams` from slugs
- `/blogs` and `/blogs/[slug]` — same pattern
- Dynamic route `params` are a `Promise` (Next 15) — always `await params`.

### Layout & interaction shell

`src/components/PageShell.tsx` is a `"use client"` wrapper used by every page. It owns Navbar,
Footer, the Contact/Help modals, and global keyboard navigation. Keys are handled by
`useKeyboardNav` (`1` about, `2` projects, `3` contact, `?` help; ignored while typing in
inputs/textareas). `useScrollSpy` drives the active nav marker via IntersectionObserver on section
ids (`about`, `work`). `Modal.tsx` is the shared dialog primitive (Esc to close, backdrop button).

## Styling conventions

- **Tailwind v4, CSS-first config.** There is no `tailwind.config.js`. The theme is defined in
  `src/app/globals.css` under `@theme` as `--color-*` / `--font-*` tokens (astrodark palette,
  Figtree sans + JetBrains Mono). Reference them as Tailwind utilities (`text-accent`, `bg-surface`,
  `border-border-soft`, `font-mono`, etc.) — add a token to `@theme` before using a new color rather
  than hardcoding hex.
- Tag → color mapping lives in `src/lib/tagColors.ts` (`tagClass(tag)`, falls back to `text-muted`).
- `design_spec.md` is the source of truth for the visual design (palette, type, spacing, layout
  intent). Consult it before making design changes.
- Path alias `@/*` → `src/*`.

## Formatting (Prettier — enforced by `npm run lint`)

Tabs for indentation, double quotes, no trailing commas, `printWidth` 100, `proseWrap: always`
(markdown wraps). `prettier-plugin-tailwindcss` auto-sorts class lists. Run `npm run format` before
committing.

## todo.txt convention

Track incidental work discovered while coding in `todo.txt` at the repo root, in
[todo.txt](https://github.com/todotxt/todo.txt) / tuxedo TUI style, one item per line:

```
(A) YYYY-MM-DD <description> +bug
(B) YYYY-MM-DD <description> +feature
```

- Bugs → priority **`(A)`** + `+bug` tag.
- New features → priority **`(B)`** + `+feature` tag.

Append new items as they come up; mark done items by prefixing the line with `x ` and a completion
date.

## Prompt logging (`claude/`)

Whenever you make changes and/or commits, also write a short overview of what you did for that
prompt into the `claude/` folder, one file per prompt, grouped into a folder per day:

```
claude/<YYYY-MM-DD>/<YYYY-MM-DD>-<HHMM>-<short-desc>.md
```

`<short-desc>` is a kebab-case description of 3 words max. Each file should summarize the prompt and
what was done.
