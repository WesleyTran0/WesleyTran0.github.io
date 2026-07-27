# wesleytran.me

Wesley Tran's personal portfolio site — CS + Cybersecurity student in Boston. Built with Next.js and
statically exported to GitHub Pages.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4** (CSS-first `@theme` config in `src/app/globals.css`)
- **TypeScript**
- Markdown content via `gray-matter` + `marked`
- **Prettier** for formatting (no ESLint, no test runner)

## Developing

```sh
npm install
npm run dev      # dev server on http://localhost:3000
```

Other scripts:

```sh
npm run build    # static export to build/
npm run start    # serve the production build
npm run format   # Prettier write
npm run lint     # Prettier check
```

## Adding content

Projects and blog posts are filesystem-driven markdown.

- **Projects** live in `src/content/projects/<slug>/<slug>.md` with YAML frontmatter (`title`,
  `shortDescription`, `tags`, `date`, optional `frontPageDescription`, `repo`, `href`, `order`). A
  matching `<slug>.{png,jpg,jpeg,webp}` in the same folder becomes the thumbnail; an `<slug>.mp4` in
  `public/projects/<slug>/` becomes an inline video. Projects with a `frontPageDescription` are
  featured on the homepage.
- **Blog posts** are markdown files under `src/content/projects/homelab/` (see `src/lib/blogs.ts`).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export (`build/`)
and publishes it to GitHub Pages.

## Project notes

See [`CLAUDE.md`](./CLAUDE.md) for architecture details and conventions, and
[`design_spec.md`](./design_spec.md) for the visual design system.
