# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Project

Wesley Tran's personal portfolio site (`wesleytran.me`). The repo is a monorepo: a statically
exported Next.js frontend (deployed to GitHub Pages) plus a Rust backend.

## Repo layout

- `frontend/` — Next.js 15 + React 19 + Tailwind v4 site. **See `frontend/CLAUDE.md`** for its
  commands, architecture, styling and formatting rules. All npm commands run from there.
- `backend/` — Rust backend (Cargo project, freshly created with `cargo new`).
- `docs/example-api.ts` — standalone TypeScript reference backend illustrating API design principles
  (not part of any build).
- Root: `CLAUDE.md`, `todo.txt`, `claude/` prompt logs, `.github/workflows/`.

## Deployment

`.github/workflows/deploy.yml` deploys the frontend to GitHub Pages on push to `main` when
`frontend/**` (or the workflow) changes: `npm ci` → `npm run build` (in `frontend/`) → upload
`frontend/build/` as a Pages artifact → deploy. GitHub Pages is static-only, so the Rust backend
will need its own workflow and host.

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
